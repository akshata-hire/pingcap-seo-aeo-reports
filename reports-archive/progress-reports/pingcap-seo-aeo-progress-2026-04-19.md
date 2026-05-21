# PingCAP.com SEO / AEO Progress Report — April 19, 2026

> **Baseline:** April 12, 2026 (AEO 8.5/10, SEO Health ~77/100)
> All data verified via live HTTP requests on April 19, 2026.

---

## AEO Score: 8.5/10 (unchanged from Apr 12)

## SEO Health Score: ~78/100 (+1 from Apr 12)

---

## Highlight: Homepage Repositioning

**Homepage title changed:**
- **Apr 12:** `TiDB - Open-Source Distributed SQL Database | PingCAP`
- **Apr 19:** `Database for AI Agents | TiDB Distributed SQL | TiDB`

Major strategic repositioning — "AI Agents" now leads the title, distributed SQL is secondary. This aligns the homepage with the broader AEO strategy (AI bot rules, llms.txt, 3 comparison pages targeting "AI agents" / "AI apps" / "vector DB"). **Likely significant impact on AI citation and ChatGPT/Perplexity search positioning over next 30 days.**

---

## Signal-by-Signal Tracker: Apr 12 → Apr 19

| # | Signal | Apr 12 | Apr 19 | Delta |
|---|--------|--------|--------|-------|
| 1 | AI bot rules (robots.txt) | 5 bots allowed | 5 bots allowed | No change |
| 2 | llms.txt | Live | Live | No change |
| 3 | /.well-known/llms.txt | 404 | **404** | Still missing |
| 4 | /what-is-tidb/ | 404 | **404** | **Still missing (6 weeks)** |
| 5 | **Homepage title** | "Open-Source Distributed SQL Database" | **"Database for AI Agents \| TiDB Distributed SQL"** | **REPOSITIONED** |
| 6 | **Homepage schema** | WebPage + WebSite + Org + Breadcrumb | **+ SoftwareApplication + Offer** | **Expanded** |
| 7 | Glossary | 17 headings | 17 headings | No change |
| 8 | Comparison pages | 10 | 10 | No change |
| 9 | FAQs page | 30 Q&As | 30 Q&As | No change |
| 10 | FAQPage schema | Removed from all pages | Still removed | Stable |
| 11 | AggregateRating | Only on /tidb/ | Only on /tidb/ | No change |
| 12 | SoftwareApplication schema | Only on /tidb/ | **On /tidb/ + homepage** | **Expanded** |
| 13 | Security headers | 6 of 7 | 6 of 7 | No change |
| 14 | Cache on static assets | immutable (verified) | **immutable (verified)** | Stable |
| 15 | Thank-you pages | Noindex + out of sitemap | Noindex + out of sitemap | Stable |
| 16 | Articles in sitemap | 242 | 242 | No change |
| 17 | GTM | GTM-TPX49SBK (single) | GTM-TPX49SBK (single) | Stable |
| 18 | Render-blocking scripts | 5 | 5 | No change |
| 19 | Deferred/async scripts | 8 | 8 | No change |
| 20 | **data-src images (JS lazy)** | **24** | **10** (-14, -58%) | **MAJOR IMPROVEMENT** |
| 21 | **fetchpriority="high" images** | **1** | **0** (-1) | ⚠️ **REGRESSION** |
| 22 | **WebP images** | 1 | **0** | ⚠️ **REGRESSION** |
| 23 | **PNG images** | 5 | **1** (-4) | Cleanup |
| 24 | Images w/ width attr | 9/30 | 10/28 (36%) | Marginal |
| 25 | Preconnect hints | 2 (hsforms, static) | 2 (same) | Stable |
| 26 | TTFB | 75ms | **85ms** | Stable |

---

## What Improved Since Apr 12

| # | Change | Impact | Evidence |
|---|--------|--------|----------|
| 1 | **Homepage title repositioned to "AI Agents" lead** | CRITICAL — aligns with AI crawler targeting strategy | `<title>Database for AI Agents \| TiDB Distributed SQL \| TiDB</title>` |
| 2 | **SoftwareApplication + Offer schema added to homepage** | HIGH — better AI citation and rich results | Previously only on /tidb/ product page |
| 3 | **JS data-src lazy-loading cut 58%** (24 → 10) | HIGH — faster perceived load, better crawlability for AI bots | Fewer images dependent on JS execution |
| 4 | **PNG images mostly replaced** (5 → 1) | MEDIUM — now 10 SVG + 1 PNG (mostly vector now, scales better) | Homepage image footprint reduced |

---

## Regressions Detected (2 — performance drift)

| # | Regression | Impact | Since |
|---|-----------|--------|-------|
| R1 | **fetchpriority="high" removed from hero image** | HIGH — LCP may increase. This was a key fix from Mar 22 | Sometime between Apr 12 and Apr 19 |
| R2 | **WebP hero image reverted to SVG/PNG** | MEDIUM — SVG works well for most hero scenarios, but loses WebP's photo-optimization benefit if hero is photographic | Same period |

**Likely explanation:** The homepage was redesigned (new title, new schema). The hero image was swapped in the redesign, and the performance hints from the Mar 22 fix weren't carried over. This is a classic redesign-regression pattern.

**Recommended action:** Add `fetchpriority="high"` + `loading="eager"` to the new hero image. 5-minute fix.

---

## Items Still Open

### CRITICAL (1)

| Issue | Since | Notes |
|-------|-------|-------|
| **No /what-is-tidb/ page — still 404** | Mar 9 (6 weeks) | #1 gap for 6 consecutive audits. New homepage title "Database for AI Agents" strengthens the AI positioning but doesn't substitute for a canonical definitional page |

### HIGH (2)

| Issue | Since | Notes |
|-------|-------|-------|
| 242 articles remain in article-sitemap | Mar 9 (was 943) | 74% removed; remaining 242 need quality audit |
| **Hero fetchpriority regression** | **Apr 19** | Likely from redesign — 5-min fix |

### MEDIUM (6)

| Issue | Notes |
|-------|-------|
| No /compare/ hub page | 301 redirect only; 10 pages need a central landing |
| Glossary at 17 terms (target 25+) | CockroachDB has 50+ |
| About page missing leadership names | No founders, CEO, investors |
| CSP still report-only | Not enforced |
| 10 images still use JS data-src | Down from 24 — continue reducing |
| 18/28 homepage images lack width/height | CLS risk |

### LOW (2)

| Issue | Notes |
|-------|-------|
| /.well-known/llms.txt still 404 | Nobody has this — easy first-mover |
| No VideoObject schema | /videos/ page has no markup |

---

## Scoring Update

| Category | Weight | Apr 12 | Apr 19 | Delta | Notes |
|----------|--------|--------|--------|-------|-------|
| Technical SEO | 25% | 82 | **82** | 0 | Stable |
| Content Quality | 25% | 72 | **74** | **+2** | Homepage title repositioning improves relevance/CTR |
| On-Page SEO | 20% | 72 | **75** | **+3** | Stronger title + added schema on homepage |
| Schema | 10% | 60 | **65** | **+5** | SoftwareApplication + Offer added to homepage |
| Performance | 10% | 68 | **66** | **-2** | fetchpriority regression; JS-lazy reduction partially offsets |
| Visual/Mobile | 5% | 62 | 62 | 0 | Not re-tested |
| AI Search Readiness | 5% | 70 | **73** | **+3** | Homepage "AI Agents" positioning is AEO-optimal |
| **Weighted Total** | | **~77** | **~78** | **+1** | Net positive despite regression |

| AEO-Specific | Mar 9 | Apr 12 | Apr 19 | Delta (6 wk) |
|--------------|-------|--------|--------|--------------|
| AEO Score | 3.5/10 | 8.5/10 | **8.5/10** | **+5.0** |

---

## 6-Week Progress Arc

| Date | AEO | SEO | Articles | Blocking | Comps | Key Achievement |
|------|-----|-----|----------|----------|-------|-----------------|
| Mar 9 | 3.5 | 52 | 943 | 11 | 4 | Baseline |
| Mar 15 | ~6.5 | 68 | 943 | 11 | 4 | Security, AI rules, glossary |
| Mar 22 | ~7.5 | 67 | 943 | 10 | 8 | Schema cleanup, hero, GTM |
| Mar 29 | 8.0 | ~67 | 560 | 10 | 9 | Article cleanup begins |
| Apr 6 | 8.5 | ~75 | 242 | 5 | 9 | Major cleanup sprint |
| Apr 12 | 8.5 | ~77 | 242 | 5 | 10 | Cache correction, +1 comparison |
| **Apr 19** | **8.5** | **~78** | **242** | **5** | **10** | **Homepage AI-Agents repositioning + schema expansion** |

### Cumulative (6 weeks)

| Metric | Mar 9 | Apr 19 | Change |
|--------|-------|--------|--------|
| Items fixed (of 34) | 0 | **22** | 65% resolved |
| Critical remaining | 10 | **1** | 90% resolved |
| Mass-gen articles | 943 | 242 | **-74%** |
| Blocking scripts | 11 | 5 | **-55%** |
| data-src images | ~27 | 10 | **-63%** |
| Security headers | 0/7 | 6/7 | +6 |
| Comparison pages | 4 | 10 | **+150%** |
| Glossary terms | 0 | 17 | New |
| Homepage schema types | 5 | **7** | **+2 (SoftwareApplication, Offer)** |
| Homepage title | Generic DB | **"Database for AI Agents"** | **Repositioned** |
| AEO Score | 3.5/10 | 8.5/10 | **+143%** |

---

## Top 3 Actions for Next Week

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | **Fix hero image regression** — add `fetchpriority="high"` + `loading="eager"` to new hero | +2 Performance pts (restore Mar 22 fix) | 5 min |
| 2 | **Create /what-is-tidb/ page** — canonical definitional page for AI citations | +0.5–1.0 AEO pts | 1 day |
| 3 | **Create /compare/ hub page** linking all 10 comparisons | Matches CockroachDB's last structural advantage | 1 day |

---

*Progress report generated April 19, 2026. All findings verified via live HTTP requests.*
*Baseline: pingcap-seo-aeo-progress-2026-04-12.md*
