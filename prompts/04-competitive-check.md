# Prompt 4 — Competitive AEO Snapshot

**When to use:** Once a month, or when one of the competitors makes a notable move.
**Time:** ~5 minutes.
**What it produces:** `reports-archive/competitive/pingcap-aeo-geo-competitive-YYYY-MM-DD.md`

---

## Copy-paste this prompt into Claude Code

```
Run a competitive AEO snapshot. Compare pingcap.com against these 5 competitors on 12 AEO/GEO signals:

COMPETITORS:
1. CockroachDB — cockroachlabs.com
2. YugabyteDB — yugabyte.com
3. PlanetScale — planetscale.com
4. SingleStore — singlestore.com
5. Vitess — vitess.io

SIGNALS TO CHECK FOR EACH (live HTTP):

1. AI bot rules in robots.txt — curl -s [domain]/robots.txt | grep -E 'GPTBot|ClaudeBot|PerplexityBot|anthropic-ai|Google-Extended'
2. llms.txt status — curl -sI [domain]/llms.txt | head -1
3. /.well-known/llms.txt status — curl -sI [domain]/.well-known/llms.txt | head -1
4. "What is [product]?" page — try [domain]/what-is-[product]/ and [domain]/docs/what-is-[product]/
5. Glossary on main domain — try [domain]/glossary/ and [domain]/glossary
6. Comparison pages count — check [domain]/sitemap.xml or [domain]/page-sitemap.xml or [domain]/sitemap_index.xml for /compare/ or /vs/ paths
7. Comparison hub page — try [domain]/compare/, [domain]/comparisons/, [domain]/vs/
8. Organization schema on homepage — curl -s [domain]/ | grep -c 'Organization'
9. SoftwareApplication schema — curl -s [domain]/ | grep -c 'SoftwareApplication'
10. Named blog authors — visit one recent blog post and check author byline
11. Dedicated FAQ page — try [domain]/faqs/, [domain]/faq/
12. Security headers on homepage — curl -sI [domain]/ | grep -ciE 'strict-transport|x-frame|x-content-type|referrer-policy|permissions-policy|content-security-policy'

For each competitor, capture:
- Yes/No/Partial for each of the 12 signals
- Notable URL or detail (e.g., comparison page count, glossary term count)
- Any change since the previous competitive snapshot (read reports-archive/competitive/ for the latest one)

Then update the comparative scoring table:

| Competitor | Last AEO Score | Current AEO Score | Delta | Strengths | Weaknesses |
|------------|---------------|-------------------|-------|-----------|------------|

OUTPUT MARKDOWN AT:
reports-archive/competitive/pingcap-aeo-geo-competitive-YYYY-MM-DD.md

Use the same structure as reports-archive/competitive/pingcap-aeo-geo-competitive-2026-04-06.md (the most recent one) — read it first to understand the format and to get the prior baseline numbers for comparison.

KEY THINGS TO WATCH:
- CockroachDB has been the closest competitor on AEO signals. They added AI bot rules between Mar 23 and Apr 6.
- YugabyteDB launched llms.txt around Apr 6.
- SingleStore launched llms.txt around Apr 6.
- PlanetScale launched API-focused llms.txt around Apr 6.
- If any of them publish a "What is [product]?" page or expand their comparison hub, that closes our advantage.

INTERPRET THE DATA:
- PingCAP's strongest AEO advantages right now: 11 comparison pages (most in space), /what-is-tidb/ LIVE (only commercial vendor with a dedicated definitional page), 49-term glossary (growing — CockroachDB still leads at 50+), AI bot rules, llms.txt, schema cleanup.
- PingCAP's remaining gaps: no /compare/ hub landing page, no /.well-known/llms.txt, glossary depth (target 50+ to match CRDB).

Report should end with: "Top 3 competitive moves to make this month" — actionable items.
```

---

## Verifying the output

```bash
ls -lh reports-archive/competitive/pingcap-aeo-geo-competitive-*.md | tail -3
```

Open the new .md and confirm:
- All 5 competitors checked
- All 12 signals captured for each
- Delta vs prior month is clear
- Top 3 moves are actionable, not vague

## Optional: Word doc version

If you want a Word version (useful for sharing in execs / board reports):

```
Generate a Word document version of the competitive analysis just produced. Use templates/gen-progress-docx.js as the structural template — copy it, swap out the data, run it. Save as reports-archive/competitive/pingcap-aeo-geo-competitive-YYYY-MM-DD.docx.
```
