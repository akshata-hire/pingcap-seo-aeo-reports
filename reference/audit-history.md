# Audit History — March 6 → April 30, 2026

## The 8-week arc at a glance

| Date | AEO | SEO Health | Articles | Critical Open | Headline |
|------|-----|-----------|----------|---------------|----------|
| **Mar 6** | — | (baseline) | 943 | — | Initial audit (20 items) |
| **Mar 9** | 3.5/10 | 52/100 | 943 | 10 | Deep audit with 6 subagents — **34 items identified** |
| **Mar 15** | ~6.5 | 68 | 943 | 7 | Security headers (5 of 7), AI bot rules added, glossary page created |
| **Mar 22** | ~7.5 | 67 | 943 | 6 | Schema cleanup, hero image WebP+fetchpriority, GTM consolidated |
| **Mar 29** | 8.0 | ~67 | 560 | 5 | Article cleanup begins (943→560), FAQ expanded 22→30 |
| **Apr 6** | 8.5 | ~75 | 242 | 3 | Major cleanup sprint (560→242, blocking scripts 10→5) |
| **Apr 12** | 8.5 | ~77 | 242 | 2 | Cache regression resolved (was a false positive) |
| **Apr 13** | 8.5 | ~78 | 242 | 1 | Homepage repositioned to "Database for AI Agents" — went LIVE Apr 12-13 |
| **Apr 19** | 8.5 | ~78 | 242 | 1 | New homepage stable, hero fetchpriority regression detected |
| **Apr 30** | **9.0** | **~82** | 242 | **0** 🎉 | **/what-is-tidb/ LIVE** — first time zero criticals in audit history |

## Key shipping events

### March (foundation)

- **Mar 12-15:** AI bot rules added to robots.txt (5 explicit allows: GPTBot, ClaudeBot, PerplexityBot, GoogleOther, anthropic-ai)
- **Mar 15:** Security headers ramped from 0/7 to 5/7
- **Mar 15:** Glossary page created (13 terms, expanded to 17 by Apr)
- **Mar 18:** GTM event tracking broke (Click_to_Cloud, form_trial — never restored)
- **Mar 22:** Hero image fixed (WebP + fetchpriority + real src), GTM consolidated to 1 container
- **Mar 22-29:** 4 new comparison pages added (CockroachDB, YugabyteDB, best-distributed-sql, best-database-for-ai-agents)
- **Mar 30:** Major article cleanup — 943 → 560 mass-gen articles removed

### April (acceleration + repositioning)

- **Apr 1-6:** Article cleanup completes — 560 → 242
- **Apr 6:** Render-blocking scripts cut from 10 to 5
- **Apr 6:** FAQPage schema fully removed (compliance restoration)
- **Apr 12-13:** **Homepage repositioned** — title changed from "Open-Source Distributed SQL Database" to **"Database for AI Agents | TiDB Distributed SQL | TiDB"**. SoftwareApplication + Offer schema added to homepage.
- **Apr 14:** Homepage launch produces +43% homepage PVs day-1 vs prior daily average
- **Apr 19:** Hero fetchpriority regression detected (redesign dropped the Mar 22 fix)
- **Apr 30:** **/what-is-tidb/ goes LIVE** — closes the 6-week-old #1 critical gap. ~3,000 words, 7 H2 sections, FAQ block, clear definitional sentence ("TiDB is an open-source, distributed SQL database that supports HTAP workloads").
- **Apr 30:** Hero fetchpriority RESTORED. +1 comparison page (PostgreSQL).

## Why the program worked

The 8-week trajectory was driven by 4 things:

1. **Weekly cadence**, never skipped. 9 weekly progress reports.
2. **Hard prioritization** by severity (CRITICAL → HIGH → MEDIUM → LOW). The team knew which items to fix first.
3. **Memory file** preserving baselines across sessions — every week's audit could compare to last week's.
4. **Honest tracking** — including false positives (cache header bug) and false negatives (glossary "empty"). The audit's credibility came from acknowledging when it was wrong.

## What the team learned

- **Schema cleanup matters more than schema addition.** Removing FAQPage from every page was bigger than adding any new schema.
- **AEO infrastructure primes the pump; positioning fires it.** The Mar 9-Apr 6 work created the substrate (AI bot rules, llms.txt, comparison pages, glossary). The Apr 12-13 homepage repositioning was what activated all of it.
- **Conversion lag is real.** Top-of-funnel lifted +35% in Post W1 but signups stayed flat (+1%). By Post W3 (5 weeks later), signups had grown +25% — the audience-broadening trade-off paid off after a 2-3 week consideration cycle.
- **Direct traffic hides AI assistant clicks.** ChatGPT, Claude, Perplexity strip referrers. The +120% direct lift in Post W2 likely included substantial AI-driven traffic that's invisible in the AI-referrer bucket.
- **Most LLM traffic is invisible.** MS Copilot is the only AI source with reliable referrer attribution. If you want to measure AI-driven direct, add UTM-tagged links inside llms.txt.

## What's still open (as of Apr 30)

### CRITICAL: 0 (first time in program)

### HIGH (1)
- 242 articles still in article-sitemap — may need quality audit (74% removed but the remainder isn't certified safe)

### MEDIUM (6)
- No /compare/ hub page — 11 pages without a central landing
- Glossary at 17 terms (target 25+) — CockroachDB has 50+
- About page missing leadership names (no founders, CEO, investors)
- CSP still report-only (not enforced)
- 10 images still use JS data-src (down from 27)
- TTFB slowed 85ms → 265ms on Apr 30 — monitor

### LOW (2)
- /.well-known/llms.txt 404 — easy first-mover (nobody has it)
- /what-is-tidb/ lacks JSON-LD Article schema — add for max AEO citation eligibility

## Competitive context

As of Apr 6 (most recent competitive snapshot):

| Competitor | AEO Score | Lead/Lag vs PingCAP |
|---|---|---|
| **PingCAP** | **8.5/10** (now 9.0) | — |
| CockroachDB | 7.0/10 | Behind by 2.0 |
| YugabyteDB | 6.0/10 | Behind by 3.0 |
| PlanetScale | 3.0/10 | Behind by 6.0 |
| Vitess | 2.0/10 | Behind by 7.0 |
| SingleStore | 2.5/10 | Behind by 6.5 |

PingCAP is the only commercial distributed SQL vendor with all of: AI bot rules, llms.txt, glossary, definitional /what-is-tidb/ page, 11 comparison pages, FAQ page, named blog authors, security headers (6/7), immutable cache, and AI-aligned homepage.

CockroachDB is the closest competitor and the most likely to close the gap. They added AI bot rules between Mar 23 and Apr 6 — that was their first move into AEO. Watch for them to launch llms.txt and a definitional page next.

## Reference: what each report contains

For your weekly runs, the most useful reports to skim:

- **`reports-archive/audits/pingcap-seo-aeo-audit-2026-03-09.md`** — original deep audit with all 34 items
- **`reports-archive/progress-reports/pingcap-seo-aeo-progress-2026-04-30.md`** — most recent run, your true baseline
- **`reports-archive/competitive/pingcap-aeo-geo-competitive-2026-04-06.md`** — most recent competitive snapshot
- **`reports-archive/traffic-analysis/homepage-launch-impact-analysis.html`** — interactive dashboard with 35-day WoW data through May 2

The full report archive is at `reports-archive/`. Open these in any markdown viewer (or just `cat`) to skim the program's history.
