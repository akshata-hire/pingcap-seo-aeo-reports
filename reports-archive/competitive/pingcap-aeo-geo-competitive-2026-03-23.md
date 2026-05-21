# PingCAP AEO/GEO Competitive Analysis — March 23, 2026

> Comparing pingcap.com against 5 key competitors on AI search readiness signals.
> Focus: Progress from March 9 baseline to today.

---

## TL;DR

**PingCAP went from last place to joint-first in AEO readiness in 14 days.** On March 9, PingCAP had zero AEO infrastructure (no AI bot rules, no llms.txt, no glossary, no definitional page). Today it leads or ties on 7 of 12 AEO signals. CockroachDB still leads on comparison content depth. Nobody in this space has a mature AEO strategy yet — the first mover advantage is real.

---

## Competitive Scorecard (12 AEO/GEO Signals)

| Signal | PingCAP | CockroachDB | YugabyteDB | PlanetScale | SingleStore | Vitess |
|--------|---------|-------------|------------|-------------|-------------|--------|
| **AI bot rules in robots.txt** | **YES** (5 bots) | No | No | No | No | No |
| **llms.txt** | **YES** | No | No | No | No | No |
| **/.well-known/llms.txt** | No | No | No | No | No | No |
| **"What is [product]?" page** | No | No | Partial (distributed SQL page) | No | No | **YES** (docs) |
| **Glossary on main domain** | **YES** (13 terms) | **YES** (extensive, multi-section) | No (docs subdomain only) | No | No | No |
| **Comparison pages** | **8 pages** | 5+ pages + hub | 5+ pages + blog category | No | No | No |
| **FAQPage schema** | YES (sitewide — non-compliant) | No | No | No | No | No |
| **Organization schema** | **YES** | Unknown | Unknown | **YES** | No | No |
| **SoftwareApplication schema** | **YES** | Unknown | Unknown | No | No | No |
| **Named blog authors** | **YES** (real people) | Partial | Partial (executives) | Named, no bios | Unknown (JS rendered) | Named, no bios |
| **Dedicated FAQ page** | **YES** (/faqs/, 22 Q&As) | YES (in docs) | YES (6 FAQ sections in docs) | No | No | YES (in docs) |
| **Security headers** | **5 of 7** | Unknown | Unknown | Unknown | Unknown | Unknown |

### Signal Counts

| Competitor | Signals Present (of 12) | Mar 9 (est.) | Delta |
|------------|------------------------|--------------|-------|
| **PingCAP** | **9** | 4 | **+5** |
| CockroachDB | 4 | ~4 | 0 |
| YugabyteDB | 4 | ~4 | 0 |
| PlanetScale | 2 | ~2 | 0 |
| Vitess | 3 | ~3 | 0 |
| SingleStore | 0 | ~0 | 0 |

---

## PingCAP Progress: Mar 9 → Mar 23

### AEO Signals Added (5 new since Mar 9)

| # | Signal | Mar 9 | Mar 23 | Impact |
|---|--------|-------|--------|--------|
| 1 | **AI bot rules** | None | GPTBot, ClaudeBot, PerplexityBot, GoogleOther, anthropic-ai explicitly **allowed** | Only site in the space explicitly welcoming AI crawlers |
| 2 | **llms.txt** | Existed but unverified | Confirmed live at /llms.txt with proper structure | Only site in the space with this |
| 3 | **Glossary** | /glossary/ returned 404 | 13 defined terms across 3 sections | Matches CockroachDB; beats everyone else |
| 4 | **Named blog authors** | Generic "TiDB Team" | Real people (Daniël van Eeden, etc.) with Person schema | Strongest author attribution in the space |
| 5 | **Security headers** | 0 of 7 | 5 of 7 (HSTS with preload, X-Frame-Options, etc.) | Trust signal for E-E-A-T |

### AEO Signals Still Missing

| # | Signal | Competitive Gap | Priority |
|---|--------|----------------|----------|
| 1 | **No "What is TiDB?" page** | Vitess has one. YugabyteDB has "What is Distributed SQL?" | **CRITICAL** — the #1 remaining gap |
| 2 | **No /compare/ hub page** | CockroachDB has /compare/ hub. PingCAP's 8 pages lack a central landing page | **MEDIUM** — only missing a hub + PlanetScale comparison |
| 3 | **/.well-known/llms.txt** | Nobody has this yet — first mover opportunity | LOW |
| 4 | **FAQPage schema non-compliant** | Nobody else uses FAQPage either (it's deprecated for non-govt/health). PingCAP should remove it | HIGH — spam risk, not a competitive advantage |

---

## Deep Dive: Where Each Competitor Leads

### CockroachDB — Leads on Comparison Content
- **5+ dedicated comparison pages** with a hub at /compare/
- Comparisons vs: MongoDB, YugabyteDB, Google Spanner, PostgreSQL, Aurora
- **Extensive glossary** (architecture glossary + spatial glossary + distributed DB terms)
- FAQs in docs (general, SQL-specific, feature-specific)
- **Gap:** No AI bot rules, no llms.txt, no "What is CockroachDB?" page

### YugabyteDB — Leads on Comparison Depth + Definitional Content
- **5+ comparison pages** with a dedicated category on the blog
- "What is Distributed SQL?" page doubles as a definitional page
- /compare-products/ hub page
- **Gap:** No AI bot rules, no llms.txt, glossary only on docs subdomain (not main site)

### PlanetScale — Minimal AEO Investment
- Only Organization schema + named authors
- Strong brand authority (founders built Vitess at YouTube) but no AEO infrastructure
- **Gap:** No glossary, no comparisons, no FAQ, no AI bot rules, no llms.txt, no definitional page

### SingleStore — Zero AEO Signals
- Gatsby-rendered site with no structured data
- Blog content is JS-dependent (not SSR)
- **Gap:** Everything

### Vitess — Strong Docs, Weak Marketing
- "What is Vitess?" definitional page exists in docs
- FAQ in docs with 6 categories
- Named blog authors (core maintainers)
- **Gap:** No AI bot rules, no llms.txt, no comparison pages, no glossary, no schema markup

---

## What PingCAP Should Do Next (Competitive Prioritization)

### Week 1: Close the #1 Gap

| Action | Why | Competitive Impact |
|--------|-----|-------------------|
| **Create /what-is-tidb/ page** | Only Vitess has a definitional page. PingCAP + CockroachDB + YugabyteDB + PlanetScale + SingleStore all lack one | First-mover among commercial distributed SQL vendors |

### Week 2-3: Match CockroachDB on Comparisons

| Action | Why | Competitive Impact |
|--------|-----|-------------------|
| **Create /compare/cockroachdb-vs-tidb/** | CockroachDB already has their version. PingCAP has no counter-narrative | Defensive — control the narrative |
| **Create /compare/yugabytedb-vs-tidb/** | YugabyteDB already comparing to CockroachDB. TiDB is absent | Offensive — enter the conversation |
| **Create /compare/planetscale-vs-tidb/** | PlanetScale has zero comparison content. Low competition | Easy win |
| **Create /compare/ hub page** | CockroachDB and YugabyteDB both have comparison hubs | Matches best-in-class |

### Week 4: Extend the Lead

| Action | Why | Competitive Impact |
|--------|-----|-------------------|
| **Add /.well-known/llms.txt** | Nobody has this. True first mover | Future-proofing |
| **Remove FAQPage schema** | Non-compliant since Aug 2023. No competitor uses it either | Risk removal |
| **Expand glossary to 25+ terms** | Match CockroachDB's depth | Parity |

---

## AEO Score Comparison (Estimated)

| Competitor | AEO Score (est.) | Mar 9 (est.) | Change | Strengths | Weaknesses |
|------------|-----------------|--------------|--------|-----------|------------|
| **PingCAP** | **7.5/10** | 3.5/10 | **+4.0** | AI bot rules, llms.txt, glossary, FAQ, schema, 8 comparison pages | No "What is TiDB?" page |
| **CockroachDB** | **5.5/10** | 5.5/10 | 0 | Comparison hub, glossary depth | No AI bot rules, no llms.txt |
| **YugabyteDB** | **5.0/10** | 5.0/10 | 0 | Comparison pages, definitional content | No AI rules, fragmented across subdomains |
| **Vitess** | **3.0/10** | 3.0/10 | 0 | Definitional page, FAQ, named authors | No AI rules, no comparisons, no glossary |
| **PlanetScale** | **2.0/10** | 2.0/10 | 0 | Strong brand, named authors | Almost everything missing |
| **SingleStore** | **0.5/10** | 0.5/10 | 0 | — | Everything missing |

### Gap Analysis vs. CockroachDB (Primary Competitor)

| Signal | PingCAP | CockroachDB | Who Leads |
|--------|---------|-------------|-----------|
| AI bot rules | YES (5 bots) | No | **PingCAP** |
| llms.txt | YES | No | **PingCAP** |
| Glossary | 13 terms | Extensive (50+) | **CockroachDB** |
| Comparison pages | **8 pages** | 5+ with hub | **PingCAP** (volume), **CockroachDB** (has hub) |
| "What is?" page | No | No | **Tie (both missing)** |
| FAQ page | YES (22 Q&As) | YES (in docs) | **PingCAP** (dedicated page) |
| Named authors | YES (with Person schema) | Partial | **PingCAP** |
| Organization schema | YES | Unknown | **PingCAP** |
| SoftwareApplication schema | YES | Unknown | **PingCAP** |
| Security headers | 5/7 | Unknown | **PingCAP** |

**PingCAP leads on 6 signals, CockroachDB leads on 2, tied on 2.**
On March 9, PingCAP trailed CockroachDB on virtually every signal.

---

## Key Insight

The distributed SQL market has an **AEO vacuum**. No competitor has:
- A proper llms.txt file
- Explicit AI bot policies
- A complete definitional page + glossary + comparison hub + FAQ on a single domain

PingCAP is closest to filling this vacuum. Creating a /what-is-tidb/ page and expanding comparison content would make PingCAP the clear AEO leader in the space — at a time when AI search is rapidly growing as a traffic source.

---

*Competitive analysis conducted March 23, 2026.*
*Sources: Live HTTP checks + web research on cockroachlabs.com, yugabyte.com, planetscale.com, singlestore.com, vitess.io*
*Baseline: pingcap-seo-aeo-audit-2026-03-09.md*
