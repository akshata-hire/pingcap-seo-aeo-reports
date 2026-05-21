#!/usr/bin/env node
/**
 * brand-authority-pull.js
 * Weekly Brand Authority data pull for pingcap.com
 * Uses DataForSEO (backlinks) + Semrush (brand mentions)
 *
 * Setup:
 *   export DATAFORSEO_LOGIN="your_email"
 *   export DATAFORSEO_PASSWORD="your_password"
 *   export SEMRUSH_API_KEY="your_api_key"
 *
 * Run:
 *   node scripts/brand-authority-pull.js
 *
 * Output:
 *   - Prints Brand Authority snapshot with week-on-week deltas to console
 *   - Appends snapshot to memory/MEMORY.md automatically
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

// ─── Config ───────────────────────────────────────────────────────────────────

const TARGET_DOMAIN = "pingcap.com";
const COMPETITORS = ["cockroachlabs.com", "yugabyte.com", "planetscale.com"];
const MEMORY_PATH = path.join(__dirname, "../memory/MEMORY.md");

// Credentials from environment — never hardcode these
const DATAFORSEO_LOGIN = process.env.DATAFORSEO_LOGIN;
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD;
const SEMRUSH_API_KEY = process.env.SEMRUSH_API_KEY;

// ─── Credential check ─────────────────────────────────────────────────────────

function checkCredentials() {
  const missing = [];
  if (!DATAFORSEO_LOGIN) missing.push("DATAFORSEO_LOGIN");
  if (!DATAFORSEO_PASSWORD) missing.push("DATAFORSEO_PASSWORD");
  if (!SEMRUSH_API_KEY) missing.push("SEMRUSH_API_KEY");
  if (missing.length) {
    console.error(`\n❌ Missing environment variables: ${missing.join(", ")}`);
    console.error(`\nSet them before running:`);
    missing.forEach((v) => console.error(`  export ${v}="your_value"`));
    process.exit(1);
  }
}

// ─── Prior snapshot reader ────────────────────────────────────────────────────

function readLastSnapshot() {
  try {
    const memory = fs.readFileSync(MEMORY_PATH, "utf8");
    // Find the most recent Brand Authority Snapshot block
    const blocks = memory.split(/## Brand Authority Snapshot —/);
    if (blocks.length < 2) return null;

    const last = blocks[blocks.length - 1];
    const extract = (key) => {
      const match = last.match(new RegExp(`${key}[:\\s]+([\\d.]+)`));
      return match ? parseFloat(match[1]) : null;
    };

    return {
      date: (last.match(/^[\s]*([\d]{4}-[\d]{2}-[\d]{2})/) || [])[1] || "unknown",
      domainRank: extract("Domain Rank \\(DataForSEO\\)"),
      referringDomains: extract("Referring domains"),
      spamScore: extract("Spam score"),
      organicKeywords: extract("Organic keywords"),
      mentionCount: extract("Brand mentions"),
      backlinkScore: extract("Backlink sub-score"),
      mentionScore: extract("Brand mentions sub-score"),
      automatedComposite: extract("Automated composite"),
    };
  } catch {
    return null;
  }
}

function delta(current, prior, lowerIsBetter = false) {
  if (prior == null || current == null) return "n/a";
  const diff = current - prior;
  if (diff === 0) return "→ stable";
  const sign = diff > 0 ? "+" : "";
  const arrow = lowerIsBetter
    ? diff < 0 ? "✅ " : "⚠️ "
    : diff > 0 ? "✅ " : "⚠️ ";
  return `${arrow}${sign}${diff}`;
}

function deltaScore(current, prior) {
  if (prior == null || current == null) return "n/a (first run)";
  const diff = current - prior;
  if (diff === 0) return "→ stable";
  const sign = diff > 0 ? "+" : "";
  const arrow = diff > 0 ? "✅ " : "⚠️ ";
  return `${arrow}${sign}${diff.toFixed(0)}`;
}

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve(data); }
      });
    }).on("error", reject);
  });
}

function httpsPost(hostname, path, body, headers) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    const options = {
      hostname, path, method: "POST",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(postData), ...headers },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve(data); }
      });
    });
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

// ─── DataForSEO — Backlink summary ────────────────────────────────────────────

async function getBacklinkSummary(domain) {
  console.log(`\n📡 DataForSEO: fetching backlink summary for ${domain}...`);
  const auth = Buffer.from(`${DATAFORSEO_LOGIN}:${DATAFORSEO_PASSWORD}`).toString("base64");
  const result = await httpsPost("api.dataforseo.com", "/v3/backlinks/summary/live",
    [{ target: domain, include_subdomains: true }],
    { Authorization: `Basic ${auth}` }
  );
  if (!result?.tasks?.[0]?.result?.[0]) throw new Error(`DataForSEO error: ${JSON.stringify(result)}`);
  const r = result.tasks[0].result[0];
  return {
    domain,
    domainRank: r.rank ?? null,
    referringDomains: r.referring_domains ?? null,
    backlinks: r.backlinks ?? null,
    dofollowBacklinks: r.referring_domains_dofollow ?? null,
    nofollowBacklinks: r.referring_domains_nofollow ?? null,
    spamScore: r.spam_score ?? null,
  };
}

// ─── DataForSEO — Competitor comparison ───────────────────────────────────────

async function getCompetitorBacklinks(domains) {
  console.log(`\n📡 DataForSEO: fetching competitor backlink data...`);
  const auth = Buffer.from(`${DATAFORSEO_LOGIN}:${DATAFORSEO_PASSWORD}`).toString("base64");
  const result = await httpsPost("api.dataforseo.com", "/v3/backlinks/summary/live",
    domains.map((d) => ({ target: d, include_subdomains: true })),
    { Authorization: `Basic ${auth}` }
  );
  if (!result?.tasks) throw new Error(`DataForSEO competitor error: ${JSON.stringify(result)}`);
  return result.tasks.map((task) => {
    const r = task?.result?.[0] ?? {};
    return { domain: task.data?.target ?? "unknown", domainRank: r.rank ?? null, referringDomains: r.referring_domains ?? null, spamScore: r.spam_score ?? null };
  });
}

// ─── Semrush — Brand mentions ─────────────────────────────────────────────────

async function getBrandMentions(brand) {
  console.log(`\n📡 Semrush: fetching brand mentions for "${brand}"...`);
  const url = `https://api.semrush.com/reports/v1/projects/brand-monitoring?key=${SEMRUSH_API_KEY}&query=${encodeURIComponent(brand)}&export_columns=Dt,Url,Title,Score&display_limit=50`;
  const result = await httpsGet(url);
  if (typeof result === "string") {
    const lines = result.trim().split("\n").filter(Boolean);
    return { brand, totalMentions: Math.max(0, lines.length - 1), raw: lines.slice(1, 11) };
  }
  return { brand, totalMentions: result?.total ?? 0, raw: result?.data ?? [] };
}

// ─── Semrush — Authority score ────────────────────────────────────────────────

async function getSemrushAuthorityScore(domain) {
  console.log(`\n📡 Semrush: fetching Authority Score for ${domain}...`);
  const url = `https://api.semrush.com/?type=domain_rank&key=${SEMRUSH_API_KEY}&export_columns=Db,Dn,Rk,Or,Ot,Oc,Ad&domain=${domain}&database=us`;
  const result = await httpsGet(url);
  if (typeof result === "string") {
    const lines = result.trim().split("\n");
    if (lines.length >= 2) {
      const values = lines[1].split(";");
      return { domain, semrushRank: values[2] ? parseInt(values[2]) : null, organicKeywords: values[3] ? parseInt(values[3]) : null, organicTraffic: values[4] ? parseInt(values[4]) : null };
    }
  }
  return { domain, semrushRank: null, organicKeywords: null, organicTraffic: null };
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

function scoreBacklinkProfile({ domainRank, referringDomains, spamScore }) {
  let rankScore = 0;
  if (domainRank && domainRank < 100000) rankScore = 80;
  else if (domainRank && domainRank < 300000) rankScore = 60;
  else if (domainRank && domainRank < 600000) rankScore = 40;
  else if (domainRank && domainRank < 1000000) rankScore = 20;

  let rdScore = 0;
  if (referringDomains >= 1000) rdScore = 100;
  else if (referringDomains >= 500) rdScore = 80;
  else if (referringDomains >= 200) rdScore = 60;
  else if (referringDomains >= 50) rdScore = 40;
  else rdScore = 20;

  const spamPenalty = spamScore > 45 ? 20 : spamScore > 25 ? 10 : 0;
  return Math.max(0, Math.min(100, Math.round((rankScore * 0.5 + rdScore * 0.5) - spamPenalty)));
}

function scoreBrandMentions(mentionCount) {
  if (mentionCount >= 30) return 80;
  if (mentionCount >= 15) return 60;
  if (mentionCount >= 5) return 40;
  if (mentionCount >= 1) return 20;
  return 0;
}

function compositeScore(backlink, mentions) {
  return Math.round((backlink * 0.40 + mentions * 0.25) / 0.65);
}

// ─── Memory update ────────────────────────────────────────────────────────────

function appendToMemory(snapshot, prior) {
  const today = new Date().toISOString().split("T")[0];

  const d = (curr, priorVal, lowerIsBetter = false) => delta(curr, priorVal, lowerIsBetter);
  const ds = (curr, priorVal) => deltaScore(curr, priorVal);
  const priorDate = prior ? prior.date : "none";

  const block = `
## Brand Authority Snapshot — ${today}
- Tool used: DataForSEO (backlinks) + Semrush (mentions)
- Prior snapshot: ${priorDate}
- Domain Rank (DataForSEO): ${snapshot.domainRank ?? "n/a"}  ${d(snapshot.domainRank, prior?.domainRank, true)}
- Referring domains: ${snapshot.referringDomains ?? "n/a"}  ${d(snapshot.referringDomains, prior?.referringDomains)}
- Spam score: ${snapshot.spamScore ?? "n/a"}/100  ${d(snapshot.spamScore, prior?.spamScore, true)}
- Organic keywords (Semrush): ${snapshot.organicKeywords ?? "n/a"}  ${d(snapshot.organicKeywords, prior?.organicKeywords)}
- Brand mentions (last 50 results): ${snapshot.mentionCount ?? "n/a"}  ${d(snapshot.mentionCount, prior?.mentionCount)}
- Backlink sub-score: ${snapshot.backlinkScore}/100  ${ds(snapshot.backlinkScore, prior?.backlinkScore)}
- Brand mentions sub-score: ${snapshot.mentionScore}/100  ${ds(snapshot.mentionScore, prior?.mentionScore)}
- Review platform score: [manual — check G2/Gartner]
- On-site authority score: [manual — check About page]
- Automated composite (65% of category): ${snapshot.automatedComposite}/100  ${ds(snapshot.automatedComposite, prior?.automatedComposite)}
`;

  try {
    fs.appendFileSync(MEMORY_PATH, block, "utf8");
    console.log(`\n✅ Snapshot appended to memory/MEMORY.md`);
  } catch (e) {
    console.warn(`\n⚠️  Could not write to MEMORY.md: ${e.message}`);
    console.log("\nSnapshot to paste manually:\n" + block);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  checkCredentials();

  const today = new Date().toISOString().split("T")[0];
  console.log(`\n🔍 Brand Authority Pull — ${today}`);
  console.log(`   Target: ${TARGET_DOMAIN}`);
  console.log("─".repeat(50));

  // Load prior snapshot for delta comparison
  const prior = readLastSnapshot();
  if (prior) console.log(`   Prior snapshot: ${prior.date}`);
  else console.log(`   Prior snapshot: none (first run)`);

  try {
    const backlinks = await getBacklinkSummary(TARGET_DOMAIN);
    const competitorData = await getCompetitorBacklinks(COMPETITORS);
    const semrush = await getSemrushAuthorityScore(TARGET_DOMAIN);
    const mentions = await getBrandMentions("PingCAP");

    const backlinkScore = scoreBacklinkProfile(backlinks);
    const mentionScore = scoreBrandMentions(mentions.totalMentions);
    const automatedComposite = compositeScore(backlinkScore, mentionScore);

    const d = (curr, priorVal, lowerIsBetter = false) => {
      const raw = delta(curr, priorVal, lowerIsBetter);
      return raw === "n/a" ? "" : `  (${raw})`;
    };

    console.log("\n━━━ BACKLINK PROFILE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`  Domain Rank:        ${backlinks.domainRank ?? "n/a"}${d(backlinks.domainRank, prior?.domainRank, true)}`);
    console.log(`  Referring domains:  ${backlinks.referringDomains ?? "n/a"}${d(backlinks.referringDomains, prior?.referringDomains)}`);
    console.log(`  Total backlinks:    ${backlinks.backlinks ?? "n/a"}`);
    console.log(`  Spam score:         ${backlinks.spamScore ?? "n/a"}/100${d(backlinks.spamScore, prior?.spamScore, true)}`);
    console.log(`  ▶ Backlink score:   ${backlinkScore}/100${d(backlinkScore, prior?.backlinkScore)}`);

    console.log("\n━━━ SEMRUSH ORGANIC ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`  Semrush Rank:       ${semrush.semrushRank ?? "n/a"}`);
    console.log(`  Organic keywords:   ${semrush.organicKeywords ?? "n/a"}${d(semrush.organicKeywords, prior?.organicKeywords)}`);
    console.log(`  Organic traffic:    ${semrush.organicTraffic ?? "n/a"}`);

    console.log("\n━━━ BRAND MENTIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`  Total mentions:     ${mentions.totalMentions}${d(mentions.totalMentions, prior?.mentionCount)}`);
    console.log(`  ▶ Mentions score:   ${mentionScore}/100${d(mentionScore, prior?.mentionScore)}`);

    console.log("\n━━━ COMPETITOR COMPARISON ━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`  ${"Domain".padEnd(25)} ${"DR Rank".padEnd(12)} ${"Ref Domains".padEnd(14)} Spam`);
    console.log(`  ${"-".repeat(60)}`);
    console.log(`  ${TARGET_DOMAIN.padEnd(25)} ${String(backlinks.domainRank ?? "n/a").padEnd(12)} ${String(backlinks.referringDomains ?? "n/a").padEnd(14)} ${backlinks.spamScore ?? "n/a"}`);
    competitorData.forEach((c) => {
      console.log(`  ${c.domain.padEnd(25)} ${String(c.domainRank ?? "n/a").padEnd(12)} ${String(c.referringDomains ?? "n/a").padEnd(14)} ${c.spamScore ?? "n/a"}`);
    });

    console.log("\n━━━ MANUAL CHECKS STILL NEEDED ━━━━━━━━━━━━━━━━━━━");
    console.log("  Review platform (20%):  G2 rating + review count, Gartner Peer Insights");
    console.log("  On-site authority (15%): About page — founder names, investor logos, SOC 2 badge");

    console.log("\n━━━ COMPOSITE SCORE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`  Backlink (40%):     ${backlinkScore}/100${d(backlinkScore, prior?.backlinkScore)}`);
    console.log(`  Mentions (25%):     ${mentionScore}/100${d(mentionScore, prior?.mentionScore)}`);
    console.log(`  Review (20%):       [manual]`);
    console.log(`  On-site (15%):      [manual]`);
    console.log(`  Automated composite: ${automatedComposite}/100${d(automatedComposite, prior?.automatedComposite)}`);
    if (prior) console.log(`  Prior composite:    ${prior.automatedComposite ?? "n/a"}/100  (${prior.date})`);

    appendToMemory({
      domainRank: backlinks.domainRank,
      referringDomains: backlinks.referringDomains,
      spamScore: backlinks.spamScore,
      organicKeywords: semrush.organicKeywords,
      mentionCount: mentions.totalMentions,
      backlinkScore,
      mentionScore,
      automatedComposite,
    }, prior);

  } catch (err) {
    console.error(`\n❌ Error during pull: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  }
}

main();

 *
 * Setup:
 *   export DATAFORSEO_LOGIN="your_email"
 *   export DATAFORSEO_PASSWORD="your_password"
 *   export SEMRUSH_API_KEY="your_api_key"
 *
 * Run:
 *   node scripts/brand-authority-pull.js
 *
 * Output:
 *   - Prints Brand Authority snapshot to console
 *   - Appends snapshot to memory/MEMORY.md automatically
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

// ─── Config ───────────────────────────────────────────────────────────────────

const TARGET_DOMAIN = "pingcap.com";
const COMPETITORS = ["cockroachlabs.com", "yugabyte.com", "planetscale.com"];
const MEMORY_PATH = path.join(__dirname, "../memory/MEMORY.md");

// Credentials from environment — never hardcode these
const DATAFORSEO_LOGIN = process.env.DATAFORSEO_LOGIN;
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD;
const SEMRUSH_API_KEY = process.env.SEMRUSH_API_KEY;

// ─── Credential check ─────────────────────────────────────────────────────────

function checkCredentials() {
  const missing = [];
  if (!DATAFORSEO_LOGIN) missing.push("DATAFORSEO_LOGIN");
  if (!DATAFORSEO_PASSWORD) missing.push("DATAFORSEO_PASSWORD");
  if (!SEMRUSH_API_KEY) missing.push("SEMRUSH_API_KEY");
  if (missing.length) {
    console.error(`\n❌ Missing environment variables: ${missing.join(", ")}`);
    console.error(`\nSet them before running:`);
    missing.forEach((v) => console.error(`  export ${v}="your_value"`));
    process.exit(1);
  }
}

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve(data); }
      });
    }).on("error", reject);
  });
}

function httpsPost(hostname, path, body, headers) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    const options = {
      hostname,
      path,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
        ...headers,
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve(data); }
      });
    });
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

// ─── DataForSEO — Backlink summary ────────────────────────────────────────────

async function getBacklinkSummary(domain) {
  console.log(`\n📡 DataForSEO: fetching backlink summary for ${domain}...`);

  const auth = Buffer.from(`${DATAFORSEO_LOGIN}:${DATAFORSEO_PASSWORD}`).toString("base64");

  const body = [{ target: domain, include_subdomains: true }];

  const result = await httpsPost(
    "api.dataforseo.com",
    "/v3/backlinks/summary/live",
    body,
    { Authorization: `Basic ${auth}` }
  );

  if (!result?.tasks?.[0]?.result?.[0]) {
    throw new Error(`DataForSEO error: ${JSON.stringify(result)}`);
  }

  const r = result.tasks[0].result[0];

  return {
    domain,
    domainRank: r.rank ?? null,                          // DataForSEO domain rank (proxy for DR)
    referringDomains: r.referring_domains ?? null,
    backlinks: r.backlinks ?? null,
    dofollowBacklinks: r.referring_domains_dofollow ?? null,
    nofollowBacklinks: r.referring_domains_nofollow ?? null,
    spamScore: r.spam_score ?? null,                     // 0–100; >45 = high risk
  };
}

// ─── DataForSEO — Competitor comparison ───────────────────────────────────────

async function getCompetitorBacklinks(domains) {
  console.log(`\n📡 DataForSEO: fetching competitor backlink data...`);

  const auth = Buffer.from(`${DATAFORSEO_LOGIN}:${DATAFORSEO_PASSWORD}`).toString("base64");
  const body = domains.map((d) => ({ target: d, include_subdomains: true }));

  const result = await httpsPost(
    "api.dataforseo.com",
    "/v3/backlinks/summary/live",
    body,
    { Authorization: `Basic ${auth}` }
  );

  if (!result?.tasks) throw new Error(`DataForSEO competitor error: ${JSON.stringify(result)}`);

  return result.tasks.map((task) => {
    const r = task?.result?.[0] ?? {};
    return {
      domain: task.data?.target ?? "unknown",
      domainRank: r.rank ?? null,
      referringDomains: r.referring_domains ?? null,
      spamScore: r.spam_score ?? null,
    };
  });
}

// ─── Semrush — Brand mentions ─────────────────────────────────────────────────

async function getBrandMentions(brand) {
  console.log(`\n📡 Semrush: fetching brand mentions for "${brand}"...`);

  // Semrush Brand Monitoring API — returns mention count and sentiment
  const url = `https://api.semrush.com/reports/v1/projects/brand-monitoring?key=${SEMRUSH_API_KEY}&query=${encodeURIComponent(brand)}&export_columns=Dt,Url,Title,Score&display_limit=50`;

  const result = await httpsGet(url);

  // Semrush returns CSV for some endpoints; handle both
  if (typeof result === "string") {
    const lines = result.trim().split("\n").filter(Boolean);
    const mentions = lines.slice(1); // skip header
    return {
      brand,
      totalMentions: mentions.length,
      raw: mentions.slice(0, 10), // first 10 for inspection
    };
  }

  return {
    brand,
    totalMentions: result?.total ?? 0,
    raw: result?.data ?? [],
  };
}

// ─── Semrush — Domain Authority proxy (Semrush Authority Score) ───────────────

async function getSemrushAuthorityScore(domain) {
  console.log(`\n📡 Semrush: fetching Authority Score for ${domain}...`);

  const url = `https://api.semrush.com/?type=domain_rank&key=${SEMRUSH_API_KEY}&export_columns=Db,Dn,Rk,Or,Ot,Oc,Ad&domain=${domain}&database=us`;

  const result = await httpsGet(url);

  if (typeof result === "string") {
    const lines = result.trim().split("\n");
    if (lines.length >= 2) {
      const values = lines[1].split(";");
      return {
        domain,
        semrushRank: values[2] ? parseInt(values[2]) : null,
        organicKeywords: values[3] ? parseInt(values[3]) : null,
        organicTraffic: values[4] ? parseInt(values[4]) : null,
      };
    }
  }

  return { domain, semrushRank: null, organicKeywords: null, organicTraffic: null };
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

function scoreBacklinkProfile(data) {
  const { domainRank, referringDomains, spamScore } = data;

  // Domain rank bands (DataForSEO rank is inverse — lower = better; we normalise)
  // DataForSEO rank: 1 = strongest. Roughly: <100k = strong, <500k = ok, >1M = weak
  let rankScore = 0;
  if (domainRank && domainRank < 100000) rankScore = 80;
  else if (domainRank && domainRank < 300000) rankScore = 60;
  else if (domainRank && domainRank < 600000) rankScore = 40;
  else if (domainRank && domainRank < 1000000) rankScore = 20;

  // Referring domain bands
  let rdScore = 0;
  if (referringDomains >= 1000) rdScore = 100;
  else if (referringDomains >= 500) rdScore = 80;
  else if (referringDomains >= 200) rdScore = 60;
  else if (referringDomains >= 50) rdScore = 40;
  else rdScore = 20;

  // Spam penalty
  const spamPenalty = spamScore > 45 ? 20 : spamScore > 25 ? 10 : 0;

  const raw = (rankScore * 0.5 + rdScore * 0.5) - spamPenalty;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

function scoreBrandMentions(mentionCount) {
  if (mentionCount >= 30) return 80;
  if (mentionCount >= 15) return 60;
  if (mentionCount >= 5) return 40;
  if (mentionCount >= 1) return 20;
  return 0;
}

function compositeScore(backlink, mentions) {
  // Weights: backlink 40%, mentions 25%, review 20% (manual), on-site 15% (manual)
  // We score what we can automate (65% of the total) and flag the rest as manual
  const automated = (backlink * 0.40 + mentions * 0.25) / 0.65;
  return Math.round(automated);
}

// ─── Memory update ────────────────────────────────────────────────────────────

function appendToMemory(snapshot) {
  const today = new Date().toISOString().split("T")[0];
  const block = `
## Brand Authority Snapshot — ${today}
- Tool used: DataForSEO (backlinks) + Semrush (mentions)
- Domain Rank (DataForSEO): ${snapshot.domainRank ?? "n/a"}
- Referring domains: ${snapshot.referringDomains ?? "n/a"}
- Spam score: ${snapshot.spamScore ?? "n/a"}/100
- Organic keywords (Semrush): ${snapshot.organicKeywords ?? "n/a"}
- Brand mentions (last 50 results): ${snapshot.mentionCount ?? "n/a"}
- Backlink sub-score: ${snapshot.backlinkScore}/100
- Brand mentions sub-score: ${snapshot.mentionScore}/100
- Review platform score: [manual — check G2/Gartner]
- On-site authority score: [manual — check About page]
- Automated composite (65% of category): ${snapshot.automatedComposite}/100
- Delta vs last snapshot: [compare manually]
`;

  try {
    fs.appendFileSync(MEMORY_PATH, block, "utf8");
    console.log(`\n✅ Snapshot appended to memory/MEMORY.md`);
  } catch (e) {
    console.warn(`\n⚠️  Could not write to MEMORY.md: ${e.message}`);
    console.log("\nSnapshot to paste manually:\n" + block);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  checkCredentials();

  const today = new Date().toISOString().split("T")[0];
  console.log(`\n🔍 Brand Authority Pull — ${today}`);
  console.log(`   Target: ${TARGET_DOMAIN}`);
  console.log("─".repeat(50));

  try {
    // 1. Backlink summary for target
    const backlinks = await getBacklinkSummary(TARGET_DOMAIN);

    // 2. Competitor comparison
    const competitorData = await getCompetitorBacklinks(COMPETITORS);

    // 3. Semrush authority score
    const semrush = await getSemrushAuthorityScore(TARGET_DOMAIN);

    // 4. Brand mentions
    const mentions = await getBrandMentions("PingCAP");

    // 5. Score
    const backlinkScore = scoreBacklinkProfile(backlinks);
    const mentionScore = scoreBrandMentions(mentions.totalMentions);
    const automatedComposite = compositeScore(backlinkScore, mentionScore);

    // ── Print report ──────────────────────────────────────────────────────────

    console.log("\n━━━ BACKLINK PROFILE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`  Domain Rank (DataForSEO):  ${backlinks.domainRank ?? "n/a"}`);
    console.log(`  Referring domains:         ${backlinks.referringDomains ?? "n/a"}`);
    console.log(`  Total backlinks:           ${backlinks.backlinks ?? "n/a"}`);
    console.log(`  Dofollow referring:        ${backlinks.dofollowBacklinks ?? "n/a"}`);
    console.log(`  Nofollow referring:        ${backlinks.nofollowBacklinks ?? "n/a"}`);
    console.log(`  Spam score:                ${backlinks.spamScore ?? "n/a"}/100`);
    console.log(`  ▶ Backlink sub-score:      ${backlinkScore}/100`);

    console.log("\n━━━ SEMRUSH ORGANIC ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`  Semrush Rank:              ${semrush.semrushRank ?? "n/a"}`);
    console.log(`  Organic keywords:          ${semrush.organicKeywords ?? "n/a"}`);
    console.log(`  Estimated organic traffic: ${semrush.organicTraffic ?? "n/a"}`);

    console.log("\n━━━ BRAND MENTIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`  Total mentions found:      ${mentions.totalMentions}`);
    console.log(`  ▶ Mentions sub-score:      ${mentionScore}/100`);

    console.log("\n━━━ COMPETITOR COMPARISON ━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`  ${"Domain".padEnd(25)} ${"DR Rank".padEnd(12)} ${"Ref Domains".padEnd(14)} Spam`);
    console.log(`  ${"-".repeat(60)}`);
    // Target first
    console.log(`  ${TARGET_DOMAIN.padEnd(25)} ${String(backlinks.domainRank ?? "n/a").padEnd(12)} ${String(backlinks.referringDomains ?? "n/a").padEnd(14)} ${backlinks.spamScore ?? "n/a"}`);
    // Competitors
    competitorData.forEach((c) => {
      console.log(`  ${c.domain.padEnd(25)} ${String(c.domainRank ?? "n/a").padEnd(12)} ${String(c.referringDomains ?? "n/a").padEnd(14)} ${c.spamScore ?? "n/a"}`);
    });

    console.log("\n━━━ MANUAL CHECKS STILL NEEDED ━━━━━━━━━━━━━━━━━━━");
    console.log("  Review platform score (20%):  Check G2 rating + review count");
    console.log("                                Check Gartner Peer Insights");
    console.log("  On-site authority score (15%): Check About page for founder names,");
    console.log("                                investor logos, SOC 2 badge");

    console.log("\n━━━ COMPOSITE SCORE (automated 65%) ━━━━━━━━━━━━━━");
    console.log(`  Backlink score (40%):      ${backlinkScore}/100`);
    console.log(`  Mentions score (25%):      ${mentionScore}/100`);
    console.log(`  Review score (20%):        [manual]`);
    console.log(`  On-site score (15%):       [manual]`);
    console.log(`  Automated composite:       ${automatedComposite}/100`);

    // 6. Append to memory
    appendToMemory({
      domainRank: backlinks.domainRank,
      referringDomains: backlinks.referringDomains,
      spamScore: backlinks.spamScore,
      organicKeywords: semrush.organicKeywords,
      mentionCount: mentions.totalMentions,
      backlinkScore,
      mentionScore,
      automatedComposite,
    });

  } catch (err) {
    console.error(`\n❌ Error during pull: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  }
}

main();
