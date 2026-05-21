# PingCAP AEO/GEO Competitive Analysis — May 14, 2026

> **Baseline:** April 6, 2026 competitive analysis
> All data verified via live HTTP requests on May 14, 2026.

---

## TL;DR

**PingCAP's lead is widening on content signals; CockroachDB is investing in comparison pages.** PingCAP's AEO score jumped from 8.5 to 9.2 in the 38 days since the last competitive analysis — the largest single-period gain in the program's history. /what-is-tidb/ is LIVE (the only commercial vendor with a dedicated definitional page), the /compare/ hub launched May 13, and the glossary tripled to 49 terms. Meanwhile CockroachDB quietly grew their comparison portfolio from 5 to 9 pages and added a head-to-head "tidb-vs-cockroachdb" page directly targeting PingCAP. Vitess's "What Is Vitess?" page has also returned (was 404 in April). Two signals nobody in the market has yet: /.well-known/llms.txt is 0/6 adoption.

---

## Competitive Scorecard: Apr 6 → May 14

| Signal | PingCAP | CockroachDB | YugabyteDB | PlanetScale | SingleStore | Vitess |
|--------|---------|-------------|------------|-------------|-------------|--------|
| **AI bot rules** | **YES** (5 bots) | **YES** (5 bots) | No | No | No | No |
| **llms.txt** | **YES** | No (404) | **YES** | **YES** (→/docs/) | **YES** | No |
| **/.well-known/llms.txt** | No | No | No | No | No | No |
| **"What is [product]?"** | **YES** (/what-is-tidb/ ✅) | No | Partial (/yugabytedb/) | No | No | **YES (RESTORED)** |
| **Glossary (main domain)** | **YES** (49 terms) | YES (/glossary/ 200 — thin, previously 50+ at /docs/ now 404) | No | No | No | No |
| **Comparison pages** | **11 pages** | **9 pages (↑ from 5)** | 0 | 0 | Partial (/comparisons/) | 0 |
| **Comparison hub** | **YES** (NEW — May 13) | **YES** | No | No | Partial | No |
| **Organization schema** | **YES** | No | **YES** | **YES** | Unknown | Unknown |
| **SoftwareApp schema** | **YES** (scoped to /tidb/) | No | No | No | Unknown | No |
| **Named blog authors** | **YES** + Person schema | YES | YES | YES | YES | YES |
| **Dedicated FAQ page** | **YES** (/what-is-tidb/) | No | No | No | **YES** | No |
| **Security headers** | 5/6 ⚠️ (CSP absent) | 2/6 | 5/6 | **6/6** | 3/6 | 1/6 |

---

## What Changed: Apr 6 → May 14

### Competitor Movements

| Competitor | What Changed | Impact on PingCAP |
|------------|-------------|-------------------|
| **CockroachDB** | **Comparison pages grew 5 → 9.** New pages: cockroachdb-vs-oracle, cockroachdb-vs-singlestore, **tidb-vs-cockroachdb**, yugabyte-vs-cockroachdb, cockroachdb-vs-mongodb (+ existing). Now have dedicated page targeting PingCAP. | HIGH — CRDB is explicitly counter-positioning against TiDB. PingCAP should ensure /compare/tidb-vs-cockroachdb is thorough and ranks above CRDB's page. |
| **Vitess** | **"What Is Vitess?" page RESTORED.** Was 404 in April (version bump broke it). Now at /docs/22.0/overview/whatisvitess/ — 200, title: "The Vitess Docs \| What Is Vitess." | MEDIUM — Vitess reclaims the definitional signal. PingCAP still the only *commercial* vendor with this page. |
| **YugabyteDB** | No new AEO signals. /yugabytedb/ is a product marketing page, not a proper definitional "What is?" page. | LOW — No movement. |
| **PlanetScale** | No new AEO signals. llms.txt still redirects to /docs/llms.txt (API-focused). | LOW — No movement. |
| **SingleStore** | /comparisons/ section exists (redirects to /comparisons/oracle/) — has at least 1–3 comparison pages. | LOW — Limited scope, no hub yet. |

### PingCAP Improvements Since Apr 6

| # | Change | AEO Impact |
|---|--------|-----------|
| 1 | **/what-is-tidb/ LIVE** (Apr 30) — 3K words, 7 H2s, FAQ schema | **+1.0 to AEO score** |
| 2 | **Glossary 17 → 49 terms** (May 13) | **+0.2 to AEO score** |
| 3 | **/compare/ hub LIVE** (May 13) — 11 pages now have central landing | Schema/structural |
| 4 | Article sitemap 560 → 242 | Technical quality |
| 5 | TTFB recovered 265ms → 94ms | Performance |

### PingCAP Regression Since Apr 6

| # | Change | Impact |
|---|--------|--------|
| 1 | **CSP header absent** — was report-only, now completely missing | Security regression; security headers: 6 → 5 |

---

## Updated AEO Score Comparison

| Competitor | Apr 6 Score | May 14 Score | Delta | Key Change |
|------------|------------|--------------|-------|------------|
| **PingCAP** | **8.5/10** | **9.2/10** | **+0.7** | /what-is-tidb/ LIVE, glossary 3×, /compare/ hub |
| **CockroachDB** | 7.0/10 | **7.5/10** | **+0.5** | 9 comparison pages (up from 5), inc. tidb-vs-cockroachdb |
| **YugabyteDB** | 6.0/10 | **5.5/10** | **−0.5** | No new signals; /yugabytedb/ is product page not definitional |
| **SingleStore** | 2.5/10 | **3.0/10** | **+0.5** | /comparisons/ section live, FAQ page confirmed |
| **PlanetScale** | 3.0/10 | **3.0/10** | **0** | Stable — llms.txt redirects to /docs/ |
| **Vitess** | 2.0/10 | **2.5/10** | **+0.5** | "What Is Vitess?" page restored at v22 docs |

### Gap vs. CockroachDB: Holding Steady

| Metric | Apr 6 | May 14 | Trend |
|--------|-------|--------|-------|
| PingCAP AEO lead | +1.5 pts | **+1.7 pts** | Slightly wider |
| Signals PingCAP leads outright | 5 | **6** | PingCAP added /what-is-tidb/, hub, glossary 3× |
| Signals CockroachDB leads | 1 (glossary depth) | **0** | CRDB glossary at /docs/ now 404; /glossary/ thin |
| Tied | 3 | **3** | AI rules, /compare/ hub (now both have it) |

---

## Head-to-Head: PingCAP vs. CockroachDB (May 14)

| Signal | PingCAP | CockroachDB | Leader |
|--------|---------|-------------|--------|
| AI bot rules | YES (5 bots) | YES (5 bots) | **Tie** |
| llms.txt | YES | No | **PingCAP** |
| /.well-known/llms.txt | No | No | **Tie** |
| "What is?" page | **YES** (/what-is-tidb/) | No | **PingCAP** |
| Glossary | **49 terms** | Thin (/glossary/ 200, limited) | **PingCAP** (reversed from April) |
| Comparison pages | **11 pages** | 9 pages | **PingCAP** (volume) |
| /compare/ hub | **YES** (new May 13) | YES | **Tie** |
| Organization schema | YES | No | **PingCAP** |
| SoftwareApp schema | YES (scoped) | No | **PingCAP** |
| FAQ page | YES (/what-is-tidb/) | No | **PingCAP** |
| Named authors | YES + Person schema | Partial | **PingCAP** |
| Security headers | 5/6 ⚠️ | 2/6 | **PingCAP** (both need work) |

**PingCAP leads: 7 | CockroachDB leads: 0 | Tied: 3** *(Was: PingCAP 5, CockroachDB 2, Tied 3 on Apr 6)*

> **Notable:** CockroachDB published "tidb-vs-cockroachdb" as a comparison page — directly targeting TiDB. PingCAP already has a counter-page at /compare/tidb-vs-cockroachdb/. Ensure PingCAP's version outranks CRDB's in search and AI citations.

---

## Market-Wide AEO Adoption Trend

| Signal | Apr 6 (who had it) | May 14 (who has it) | Adoption Rate |
|--------|--------------------|--------------------|---------------|
| AI bot rules | PingCAP + CockroachDB | Same | 2/6 (33%) |
| llms.txt | PingCAP + YugabyteDB + SingleStore + PlanetScale | Same (PlanetScale redirects to /docs/) | 4/6 (67%) |
| /.well-known/llms.txt | Nobody | **Nobody** | 0/6 (0%) — true first mover opportunity |
| "What is?" page | Nobody (Vitess 404'd) | **PingCAP + Vitess** | 2/6 (33%) |
| Glossary (main domain) | PingCAP + CockroachDB | PingCAP (**CockroachDB glossary at /docs/ now 404**) | 1/6 (17%) — PingCAP now sole leader |
| /compare/ hub | CockroachDB only | **PingCAP + CockroachDB** | 2/6 (33%) |

**Key insight:** PingCAP has moved from shared first-mover on glossary to sole leader, as CockroachDB's /docs/stable/glossary/ is now 404. The /what-is-tidb/ page gives PingCAP an exclusive signal no commercial vendor has. /.well-known/llms.txt remains at 0/6 adoption — an easy first-mover signal nobody has claimed.

---

## Top 3 Competitive Moves This Month

| # | Action | Why | Urgency |
|---|--------|-----|---------|
| 1 | **Restore CSP header** — PingCAP's security headers dropped from 6 to 5 while PlanetScale and YugabyteDB now both score 5–6. A regression on a signal where competitors are ahead or tied damages both trust and score. | Security regression that competitors don't have | **THIS WEEK** |
| 2 | **Add /.well-known/llms.txt** — 0/6 adoption across the entire competitive set. Nobody has claimed this path. Takes <30 minutes to implement and gives PingCAP a unique signal. | True first mover — 0% adoption in market | **THIS WEEK** |
| 3 | **Publish a "What is CockroachDB vs TiDB?" knowledge-base post and ensure /compare/tidb-vs-cockroachdb/ outranks CRDB's own page** — CockroachDB's new "tidb-vs-cockroachdb" comparison page is a direct counter-position. PingCAP already has the comparison page; now ensure it's richer, more comprehensive, and cites /what-is-tidb/ as the canonical definitional source. | CockroachDB is explicitly targeting TiDB | **THIS MONTH** |

---

## Score Projection

| Scenario | PingCAP | CockroachDB | Gap |
|----------|---------|-------------|-----|
| Current (May 14) | 9.2 | 7.5 | **+1.7** |
| After /.well-known/llms.txt + CSP restore | **9.5** | 7.5 | **+2.0** |
| If CockroachDB adds /what-is-cockroachdb/ | 9.5 | **8.5** | +1.0 |
| If CockroachDB adds /what-is-cockroachdb/ + llms.txt | 9.5 | **9.0** | +0.5 |

**The definitional page advantage is PingCAP's clearest moat.** CockroachDB adding a "What is CockroachDB?" page is only a matter of time given their pattern of matching AEO signals. The current 38-day window where PingCAP is alone on this signal is valuable — ensure /what-is-tidb/ is deeply linked, cited in every comparison page, and its FAQ schema is fully built out.

---

*Competitive analysis conducted May 14, 2026. All findings verified via live HTTP requests.*
*Baseline: pingcap-aeo-geo-competitive-2026-04-06.md*
*Competitors: cockroachlabs.com, yugabyte.com, planetscale.com, singlestore.com, vitess.io*
