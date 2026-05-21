# PingCAP.com SEO / AEO Progress Report — April 12, 2026

> **Baseline:** April 6, 2026 (AEO 8.5/10, SEO Health ~75/100)
> All data verified via live HTTP requests on April 12, 2026.

---

## AEO Score: 8.5/10 (unchanged from Apr 6)

## SEO Health Score: ~77/100 (+2 from Apr 6)

---

## Signal-by-Signal Tracker: Apr 6 → Apr 12

| # | Signal | Apr 6 | Apr 12 | Delta |
|---|--------|-------|--------|-------|
| 1 | AI bot rules (robots.txt) | 5 bots allowed | 5 bots allowed | No change |
| 2 | llms.txt | Live (2,406 B) | Live (2,406 B) | No change |
| 3 | /.well-known/llms.txt | 404 | **404** | Still missing |
| 4 | /what-is-tidb/ | 404 | **404** | **Still missing (5 weeks)** |
| 5 | Glossary | 17 headings | **17 headings** | No change |
| 6 | Comparison pages | 9 | **10** (+1 new) | NEW: /compare/best-database-building-ai-apps/ |
| 7 | FAQs page | 30 Q&As | **30 Q&As** | No change |
| 8 | FAQPage schema | Removed from all pages | **Still removed** | Stable (clean) |
| 9 | AggregateRating | Only on /tidb/ | **Only on /tidb/** | No change |
| 10 | SoftwareApplication schema | Only on /tidb/ | Only on /tidb/ | No change |
| 11 | Security headers | 6 of 7 | **6 of 7** | No change (CSP still report-only) |
| 12 | Named blog authors | Real people | Real people | No change |
| 13 | Thank-you pages | Removed from sitemap | **Still removed** | Confirmed |
| 14 | Article sitemap | 242 | **242** | No change |
| 15 | /solutions/ hub | 301 redirect | 301 redirect | No change |
| 16 | /product/ | 301 → /tidb/ | 301 → /tidb/ | No change |
| 17 | /compare/ hub | 301 → mysql-vs-tidb | 301 → mysql-vs-tidb | No change |
| 18 | Render-blocking scripts | 5 | **5** | No change |
| 19 | Deferred/async scripts | 8 | **8** | No change |
| 20 | **master.js/master.css cache** | **Reported as no-store** | **CORRECTED: Actually public,max-age=31536000,immutable** | **FALSE POSITIVE resolved** — assets served from static.pingcap.com (S3+CloudFront) with perfect cache headers. Prior audits checked wrong URL (www.pingcap.com 404 page) |
| 21 | Blog Article schema | Partial | **Not present on blog listing** | Blog listing lacks Article; need to check individual posts |

---

## Correction: Cache Header "Regression" Was a False Positive

**The #1 finding from this week's audit is a correction, not a new issue.**

Since Mar 22, every audit reported that master.js and master.css had `cache-control: no-cache, must-revalidate, max-age=0, no-store, private`. This was listed as a regression and carried forward for 3 weeks.

**Root cause:** The audit script was checking the wrong URL:
- **Wrong:** `https://www.pingcap.com/wp-content/themes/developer/dist/master.*.js` → WordPress 404 page → `no-store` headers (correct for a 404)
- **Right:** `https://static.pingcap.com/dist/js/master.*.js` → actual asset → `public,max-age=31536000,immutable`

The HTML source has always pointed to `static.pingcap.com`. The real assets have had perfect cache headers the entire time. **There was never a regression.** This resolves the last tracked regression from the Mar 22 report and removes 1 HIGH item from the open list.

---

## What Changed Since Apr 6

| # | Change | Impact |
|---|--------|--------|
| 1 | **+1 comparison page** (/compare/best-database-building-ai-apps/) | MEDIUM — 10th comparison page, extends AI database positioning |
| 2 | **master.css hash changed** (0b2d9e02 → eb88996f) | CSS was updated/rebuilt — confirms active development |
| 3 | **Cache false positive resolved** | HIGH — removes the last tracked "regression" from all reports |
| 4 | **Page count 135 → 137** (+2 new pages) | Minor content additions |

---

## Scoring Update

| Category | Weight | Apr 6 | Apr 12 | Delta | Notes |
|----------|--------|-------|--------|-------|-------|
| Technical SEO | 25% | 80 | **82** | **+2** | Cache headers confirmed correct (was scored as regression) |
| Content Quality | 25% | 72 | **72** | 0 | No change — about page still missing leadership |
| On-Page SEO | 20% | 72 | **72** | 0 | Stable |
| Schema | 10% | 60 | **60** | 0 | Stable — clean state maintained |
| Performance | 10% | 65 | **68** | **+3** | Cache correction (+3), TTFB 75ms (excellent) |
| Visual/Mobile | 5% | 62 | **62** | 0 | Not re-tested |
| AI Search Readiness | 5% | 68 | **70** | **+2** | 10th comparison page |
| **Weighted Total** | | **~75** | **~77** | **+2** | |

| AEO-Specific | Mar 9 | Apr 6 | Apr 12 | Delta (5 wk) |
|--------------|-------|-------|--------|--------------|
| AEO Score | 3.5/10 | 8.5/10 | **8.5/10** | **+5.0** |
| vs CockroachDB (7.0) | -2.0 | +1.5 | **+1.5** | From behind to leading |

---

## Items Still Open

### CRITICAL (1)

| Issue | Since | Notes |
|-------|-------|-------|
| **No /what-is-tidb/ page — still 404** | Mar 9 (5 weeks) | #1 gap for 5 consecutive audits. Competitors still don't have one either — but CockroachDB is investing in AEO and will likely create one soon |

### HIGH (1)

| Issue | Since | Notes |
|-------|-------|-------|
| ~~master.js/master.css cache no-store~~ | ~~Mar 22~~ | **CLOSED — false positive.** Assets on static.pingcap.com have correct immutable headers |
| 242 articles remain in article-sitemap | Mar 9 (was 943) | 74% removed. Remaining 242 need quality audit |

### MEDIUM (7)

| Issue | Notes |
|-------|-------|
| No /compare/ hub page | 301 redirect only; 10 pages need a central landing |
| Glossary at 17 terms (target 25+) | CockroachDB has 50+ |
| About page missing leadership | No founder names, CEO, investors |
| CSP still report-only | Not enforced |
| 24 images still use JS data-src | Hero fixed; rest lazy via JS |
| 21/30 homepage images lack width/height | CLS risk |
| Blog Article schema inconsistent | /blog/ listing lacks Article type |

### LOW (2)

| Issue | Notes |
|-------|-------|
| /.well-known/llms.txt still 404 | Easy first-mover (nobody has it) |
| No VideoObject schema | /videos/ page has no markup |

---

## 5-Week Progress Arc

| Date | AEO | SEO Health | Articles | Blocking Scripts | Comparisons | Key Achievement |
|------|-----|-----------|----------|-----------------|-------------|-----------------|
| Mar 9 | 3.5 | 52 | 943 | 11 | 4 | Baseline |
| Mar 15 | ~6.5 | 68 | 943 | 11 | 4 | Security, AI rules, glossary |
| Mar 22 | ~7.5 | 67 | 943 | 10 | 8 | Schema cleanup, hero, GTM |
| Mar 29 | 8.0 | ~67 | 560 | 10 | 9 | Article cleanup begins |
| Apr 6 | 8.5 | ~75 | 242 | 5 | 9 | Major article + script cleanup |
| **Apr 12** | **8.5** | **~77** | **242** | **5** | **10** | **Cache false-positive resolved, +1 comparison** |

### Cumulative Stats

| Metric | Mar 9 | Apr 12 | Change |
|--------|-------|--------|--------|
| Items fixed (of 34) | 0 | **22** | 65% resolved |
| Regressions | 0 | **0** | All resolved or false positive |
| Critical remaining | 10 | **1** | 90% resolved |
| Mass-gen articles | 943 | 242 | **-74%** |
| Render-blocking scripts | 11 | 5 | **-55%** |
| Security headers | 0/7 | 6/7 | +6 |
| Comparison pages | 4 | **10** | **+150%** |
| FAQ questions | ~22 | 30 | +36% |
| Glossary terms | 0 | 17 | New |
| AEO Score | 3.5/10 | **8.5/10** | **+143%** |

---

## Top 3 Actions

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | **Create /what-is-tidb/ page** | +0.5–1.0 AEO pts, fills the only CRITICAL gap | 1 day |
| 2 | **Create /compare/ hub page** linking all 10 comparisons | Matches CockroachDB's last structural advantage | 1 day |
| 3 | **Expand glossary 17 → 30+ terms** | Narrows gap vs CockroachDB (50+) | 1 day |

---

*Progress report generated April 12, 2026. All findings verified via live HTTP requests.*
*Baseline: pingcap-seo-aeo-progress-2026-04-06.md*
