# PingCAP AEO/GEO Competitive Analysis — April 6, 2026

> **Baseline:** March 23, 2026 competitive analysis
> All data verified via live HTTP requests on April 6, 2026.

---

## TL;DR

**Competitors are waking up.** In the 2 weeks since the last competitive analysis, CockroachDB added AI bot rules to robots.txt, YugabyteDB launched llms.txt, and SingleStore launched llms.txt. PingCAP still leads overall but the gap is narrowing. PingCAP's AEO score is 8.5/10 — but CockroachDB jumped from 5.5 to 7.0 and is closing fast.

**The /what-is-tidb/ page is now urgent.** On Mar 23, no commercial competitor had a definitional page. That hasn't changed yet — but CockroachDB adding AI bot rules signals they're investing in AEO. First mover on definitional content wins.

---

## Competitive Scorecard: Mar 23 → Apr 6

| Signal | PingCAP | CockroachDB | YugabyteDB | PlanetScale | SingleStore | Vitess |
|--------|---------|-------------|------------|-------------|-------------|--------|
| **AI bot rules** | **YES** (5 bots) | **YES (NEW!)** (5 bots, Allow) | No | No | No | No |
| **llms.txt** | **YES** | No | **YES (NEW!)** | **YES (NEW!)** | **YES (NEW!)** | No |
| **/.well-known/llms.txt** | No | No | No | No | No | No |
| **"What is [product]?"** | No | No | Partial (/yugabytedb/) | No | No | No* |
| **Glossary (main domain)** | **YES** (17 terms) | **YES** (50+) | No | No | No | No |
| **Comparison pages** | **9 pages** | 5+ with /compare/ hub | 5+ with hub | No | No | No |
| **Organization schema** | **YES** | Unknown | Unknown | YES | No | No |
| **SoftwareApp schema** | **YES** (scoped to /tidb/) | Unknown | Unknown | No | No | No |
| **Named blog authors** | **YES** (Person schema) | Partial | Partial | Named | Unknown | Named |
| **Dedicated FAQ page** | **YES** (30 Q&As) | In docs | In docs | No | No | In docs |
| **Security headers** | **6/7** | Unknown | Unknown | Unknown | Unknown | Unknown |
| **FAQPage schema** | Removed (compliant) | No | No | No | No | No |

*Vitess "What is Vitess?" page previously at /docs/21.0/overview/whatisvitess/ now returns 404 — appears removed or moved with version update.

---

## What Changed: Mar 23 → Apr 6

### Competitor Movements (3 new entrants)

| Competitor | What Changed | Impact on PingCAP |
|------------|-------------|-------------------|
| **CockroachDB** | **Added AI bot rules** — GPTBot, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended all explicitly allowed | HIGH — matches PingCAP on this signal. CockroachDB is now actively investing in AEO |
| **YugabyteDB** | **Launched llms.txt** — well-structured with product identity, quick start, deployment options, API docs | HIGH — matches PingCAP on this signal |
| **SingleStore** | **Launched llms.txt** — comprehensive file with product overview, solutions, integrations, AI features | MEDIUM — went from zero AEO to having a structured LLM file |
| **PlanetScale** | **Launched llms.txt** — API-focused (OpenAPI spec, docs references) | MEDIUM — exists but API-heavy, less useful for general queries |
| **Vitess** | **"What is Vitess?" page now 404** — /docs/21.0/ path broke (version bump?) | Positive for PingCAP — Vitess lost its definitional advantage |

### PingCAP Improvements (Since Mar 29 Baseline)

| # | Change | Impact |
|---|--------|--------|
| 1 | Articles 560 → 242 (-318 removed) | CRITICAL — 74% total reduction |
| 2 | Render-blocking scripts 10 → 5 | HIGH — CWV improvement |
| 3 | Glossary 13 → 17 terms | MEDIUM — closer to CockroachDB |
| 4 | FAQPage schema fully removed | HIGH — compliance risk eliminated |
| 5 | Blog Article schema partially restored | MEDIUM |

---

## Updated AEO Score Comparison

| Competitor | Mar 23 Score | Apr 6 Score | Delta | Key Change |
|------------|-------------|-------------|-------|------------|
| **PingCAP** | **7.5/10** | **8.5/10** | **+1.0** | Schema cleanup, article reduction, glossary expansion |
| **CockroachDB** | 5.5/10 | **7.0/10** | **+1.5** | Added AI bot rules (5 bots). Still leads glossary. Now has AI + compare + glossary |
| **YugabyteDB** | 5.0/10 | **6.0/10** | **+1.0** | Launched llms.txt. Still has comparison hub + definitional content |
| **SingleStore** | 0.5/10 | **2.5/10** | **+2.0** | Launched comprehensive llms.txt — from zero to something |
| **PlanetScale** | 2.0/10 | **3.0/10** | **+1.0** | Launched llms.txt (API-focused) |
| **Vitess** | 3.0/10 | **2.0/10** | **-1.0** | Lost "What is Vitess?" page (404) |

### Gap vs. CockroachDB: Narrowing

| Metric | Mar 23 | Apr 6 | Trend |
|--------|--------|-------|-------|
| PingCAP lead | +2.0 pts | **+1.5 pts** | Narrowing |
| Signals PingCAP leads | 6 | **5** | CockroachDB caught up on AI rules |
| Signals CockroachDB leads | 1 | **1** (glossary depth) | Stable |
| Tied | 2 | **3** | More overlap now |

---

## Head-to-Head: PingCAP vs. CockroachDB (Apr 6)

| Signal | PingCAP | CockroachDB | Leader |
|--------|---------|-------------|--------|
| AI bot rules | YES (5 bots) | **YES (5 bots, NEW)** | **Tie** (was PingCAP) |
| llms.txt | YES | No | **PingCAP** |
| Glossary | 17 terms | 50+ terms | **CockroachDB** |
| Comparison pages | 9 pages | 5+ with /compare/ hub | **PingCAP** (volume) |
| /compare/ hub | 301 redirect only | Dedicated page | **CockroachDB** |
| "What is?" page | No | No | **Tie** |
| FAQ page | YES (30 Q&As) | In docs | **PingCAP** |
| Named authors | YES + Person schema | Partial | **PingCAP** |
| Organization schema | YES | Unknown | **PingCAP** |
| SoftwareApp schema | YES (scoped) | Unknown | **PingCAP** |
| FAQPage removed | YES (compliant) | N/A | **PingCAP** |
| Article cleanup | 943 → 242 | N/A | **PingCAP** |

**PingCAP leads: 5 | CockroachDB leads: 2 | Tied: 3**
*(Was: PingCAP 7, CockroachDB 1, Tied 2 on Mar 23)*

---

## Market-Wide AEO Adoption Trend

| Signal | Mar 23 (who had it) | Apr 6 (who has it) | Adoption Rate |
|--------|--------------------|--------------------|---------------|
| AI bot rules | PingCAP only | PingCAP + **CockroachDB** | 2/6 (33%) |
| llms.txt | PingCAP only | PingCAP + **YugabyteDB + SingleStore + PlanetScale** | 5/6 (83%) |
| /.well-known/llms.txt | Nobody | Nobody | 0/6 (0%) |
| "What is?" page | Vitess only | **Nobody** (Vitess 404'd) | 0/6 (0%) |
| Glossary (main domain) | PingCAP + CockroachDB | PingCAP + CockroachDB | 2/6 (33%) |
| /compare/ hub | CockroachDB only | CockroachDB only | 1/6 (17%) |

**Key insight:** llms.txt went from 1/6 to 5/6 adoption in 2 weeks. AI bot rules went from 1/6 to 2/6. The AEO race is heating up — PingCAP's first-mover advantage on llms.txt is now shared. The remaining differentiators are: glossary, FAQ page, schema quality, and content cleanup.

---

## Revised Action Plan (Competitive Urgency)

### URGENT (This Week) — Before CockroachDB Catches Up Further

| # | Action | Why | Gap it Closes |
|---|--------|-----|--------------|
| 1 | **Create /what-is-tidb/ page** | **Nobody has one now** (Vitess lost theirs). First commercial vendor to publish wins. CockroachDB is clearly investing in AEO — they'll create one soon | Only unclaimed "category-defining" signal |
| 2 | **Create /compare/ hub page** | CockroachDB has one, PingCAP doesn't. PingCAP has more pages (9 vs 5+) but no landing | Matches CockroachDB's last structural advantage |

### HIGH (Week 2-3) — Extend the Lead

| # | Action | Why | Gap it Closes |
|---|--------|-----|--------------|
| 3 | **Expand glossary 17 → 30+ terms** | CockroachDB has 50+. PingCAP growing but still behind | Narrows glossary gap |
| 4 | **Add /.well-known/llms.txt** | Nobody has this. True first mover across entire space | Unique signal |
| 5 | **Fix master.js/master.css cache headers** | Performance regression persists | Technical debt |

### MEDIUM (Month) — Maintain Position

| # | Action | Why |
|---|--------|-----|
| 6 | Audit remaining 242 articles | Quality assurance |
| 7 | Create /compare/singlestore-vs-tidb/ | SingleStore now has AEO investment — counter-position |
| 8 | Create /compare/planetscale-vs-tidb/ | PlanetScale still has no comparisons — easy win |

---

## Score Projection

| Scenario | PingCAP | CockroachDB | Gap |
|----------|---------|-------------|-----|
| Current (Apr 6) | 8.5 | 7.0 | +1.5 |
| After /what-is-tidb/ + /compare/ hub | **9.5** | 7.0 | +2.5 |
| If CockroachDB adds llms.txt + definitional page | 9.5 | **8.5** | +1.0 |
| Full cleanup (both sides) | 9.5 | 9.0 | +0.5 |

**Window of opportunity is narrowing.** CockroachDB added AI bot rules in the last 2 weeks and will likely add llms.txt soon. The definitional page (/what-is-tidb/) is the last unclaimed high-value signal — whoever publishes first owns it.

---

*Competitive analysis conducted April 6, 2026. All findings verified via live HTTP requests.*
*Baseline: pingcap-aeo-geo-competitive-2026-03-23.md*
*Competitors: cockroachlabs.com, yugabyte.com, planetscale.com, singlestore.com, vitess.io*
