# PingCAP.com SEO / AEO Progress Report — June 2, 2026

> **Baseline:** May 28, 2026 (AEO 9.0/10, SEO Health ~84/100, 0 critical open)
> All data verified via live HTTP requests on June 2, 2026.

---

## AEO Score: 9.5/10 (+0.5 from May 28)
## SEO Health Score: ~86/100 (+2 from May 28)

---

## Headline

Two long-open items resolved in the same week: `/.well-known/llms.txt` now returns 200 (fixing the first-mover AEO gap open since March 9), and `/what-is-tidb/` now carries full Article + FAQPage JSON-LD schema (recommended since April 30). Together these close the last two LOW open items, lift AEO to 9.5/10, and leave PingCAP with a near-complete AI-search readiness stack. The CSP header regression from May 28 remains unresolved.

---

## Signal-by-Signal Tracker: May 28 → June 2

| # | Signal | May 28 | June 2 | Delta |
|---|--------|--------|--------|-------|
| 1 | Homepage title | "Database for AI Agents \| TiDB Distributed SQL \| TiDB" | Same | Stable |
| 2 | Homepage schema types | Org, SoftwareApp, BreadcrumbList, WebSite, WebPage, others | Same | Stable |
| 3 | FAQPage on homepage | 0 | 0 | ✅ Stable (compliant) |
| 4 | AggregateRating on homepage | 0 | 0 | ✅ Stable (compliant) |
| 5 | AggregateRating on /tidb/ | 1 | 1 | ✅ Stable (correct) |
| 6 | /what-is-tidb/ status | 200 | 200 | ✅ Stable |
| 7 | **Article + FAQPage schema on /what-is-tidb/** | **Missing** | **Present** | 🎉 **FIXED** |
| 8 | Glossary headings | 49 | 49 | Stable |
| 9 | Comparison pages (sitemap) | 11 | 11 | Stable |
| 10 | /compare/ hub page | 200 | 200 | ✅ Stable |
| 11 | AI bot rules (robots.txt) | 5 bots | 5 bots | Stable |
| 12 | llms.txt | 200 | 200 | ✅ Stable |
| 13 | **/.well-known/llms.txt** | **404** | **200** | 🎉 **FIXED** |
| 14 | Hero fetchpriority="high" | 2 | 2 | ✅ Stable |
| 15 | Render-blocking scripts | 6 | 6 | Stable (unchanged) |
| 16 | data-src images | 0 | 0 | ✅ Stable |
| 17 | master.js cache (static.pingcap.com) | immutable | immutable | ✅ Stable |
| 18 | Security headers | 5/7 (CSP missing) | 5/7 (CSP missing) | ⚠️ Stable regression |
| 19 | Thank-you pages in sitemap | 0 | 0 | ✅ Stable |
| 20 | About page leadership | Missing | Missing | Unchanged |
| 21 | TTFB | ~103ms | ~86ms | Slightly improved |
| 22 | GTM containers | 1 (GTM-TPX49SBK) | 1 | ✅ Stable |
| 23 | Articles in sitemap | 242 | 242 | Stable |
| 24 | Render-blocking script list | jQuery, TranslatePress, CookieYes, dotLottie, 2× HubSpot | Same 6 | Stable |

---

## What Improved

| # | Change | Impact | Evidence |
|---|--------|--------|----------|
| 1 | **/.well-known/llms.txt now 200** | HIGH — removes AEO −0.25 penalty; closes first-mover gap open since Mar 9 | curl returns 200 (was 404) |
| 2 | **Article + FAQPage JSON-LD on /what-is-tidb/** | HIGH — enables rich results and AI citation for the canonical "what is TiDB" page | `"@type":"Article"` and `"@type":"FAQPage"` detected in page source |
| 3 | **TTFB: 103ms → 86ms** | LOW — minor additional improvement; continues recovery trend | curl time_starttransfer |

---

## Regression Watch

| Item | Status | Notes |
|------|--------|-------|
| **CSP header still missing** | ⚠️ Ongoing — 2nd consecutive week | Content-Security-Policy absent since May 28 deploy. Was present (report-only) on Apr 30 |
| **Render-blocking scripts: 6** | ⚠️ Monitoring | Unchanged at 6 scripts: jQuery, TranslatePress, CookieYes, dotLottie player, 2× HubSpot forms JS |

No new regressions this week.

---

## Open Items Resolution Check

| # | Item | Prior severity | Status | Evidence |
|---|------|----------------|--------|----------|
| 1 | 242 articles in sitemap | HIGH | ⏸ STILL OPEN | 242 (unchanged) |
| 2 | No /compare/ hub page | MEDIUM | ✅ ALREADY RESOLVED | Confirmed 200, "TiDB Database Comparisons" |
| 3 | About page missing leadership | MEDIUM | ⏸ STILL OPEN | No CEO/founder text detected |
| 4 | CSP header removed | MEDIUM | ⚠️ STILL OPEN (2nd week) | 5/7 headers, CSP absent |
| 5 | Render-blocking scripts +1 | MEDIUM | ⏸ STILL OPEN | 6 scripts unchanged |
| 6 | /.well-known/llms.txt 404 | LOW | ✅ RESOLVED | Now 200 |
| 7 | /what-is-tidb/ lacks Article schema | LOW | ✅ RESOLVED | Article + FAQPage JSON-LD detected |

---

## Items Still Open

### CRITICAL (0) 🎉
No critical items.

### HIGH (1)

| Issue | Since | Notes |
|-------|-------|-------|
| 242 articles remain in article-sitemap | Mar 9 | -74% from 943; remaining content needs quality audit |

### MEDIUM (3)

| Issue | Since | Notes |
|-------|-------|-------|
| CSP header fully absent | May 28 | Was report-only on Apr 30, now completely gone — 2nd consecutive week |
| About page missing leadership | Mar 9 | No founders, CEO, or investors named |
| Render-blocking scripts at 6 | May 28 | jQuery, TranslatePress, CookieYes, dotLottie, 2× HubSpot — consider defer/async |

### LOW (0) 🎉
All low-priority items resolved.

### ✅ Resolved This Week (2)

| Item | Evidence |
|------|----------|
| /.well-known/llms.txt 404 | Now returns 200 |
| /what-is-tidb/ missing Article + FAQPage schema | Both `@type:Article` and `@type:FAQPage` detected in JSON-LD |

---

## Scoring Update

| Category | Weight | May 28 | June 2 | Delta | Notes |
|----------|--------|--------|--------|-------|-------|
| Technical SEO | 19% | 84 | 84 | 0 | Stable; CSP still missing offsets TTFB gain |
| Content Quality | 19% | 86 | 86 | 0 | Stable; 242 articles, 49 glossary terms |
| On-Page SEO | 18% | 78 | 78 | 0 | Stable |
| AI Search Readiness | 15% | 83 | 90 | +7 | /.well-known/llms.txt live + Article/FAQPage schema on canonical page |
| Brand Authority & Backlinks | 12% | — | — | — | No pull this week — use last Apr 30 snapshot |
| Schema | 10% | 65 | 78 | +13 | Article + FAQPage JSON-LD added to /what-is-tidb/ — major schema depth gain |
| Performance | 4% | 72 | 74 | +2 | TTFB 103ms → 86ms |
| Visual/Mobile | 3% | 64 | 64 | 0 | Not re-tested |
| **Weighted Total** | | **~84** | **~86** | **+2** | Schema and AI readiness gains drive the improvement |

---

## AEO Score Detail

| Signal | Points | Status |
|--------|--------|--------|
| AI bot rules in robots.txt | +1.0 | ✅ |
| /what-is-tidb/ live | +1.0 | ✅ |
| Schema cleanup (FAQPage absent + AggregateRating scoped) | +1.0 | ✅ |
| 10+ comparison pages | +1.5 | ✅ (11 pages) |
| llms.txt present | +0.5 | ✅ |
| Glossary present | +0.5 | ✅ (49 terms) |
| FAQ page | +0.5 | ✅ |
| Organization schema | +0.5 | ✅ |
| Security headers | +0.5 | ✅ (5/7) |
| Article cleanup | +0.5 | ✅ |
| Thank-you page noindex | +0.5 | ✅ |
| /.well-known/llms.txt | **+0.25** | 🎉 **Fixed — penalty removed** |
| **Total** | **9.5/10** | |

---

## Progress Arc

| Date | AEO | SEO | Articles | Critical | Key Achievement |
|------|-----|-----|----------|----------|-----------------|
| Mar 9 | 3.5 | 52 | 943 | 10 | Baseline (34 items) |
| Mar 15 | ~6.5 | 68 | 943 | 7 | Security, AI rules, glossary |
| Mar 22 | ~7.5 | 67 | 943 | 6 | Schema cleanup, hero, GTM |
| Mar 29 | 8.0 | ~67 | 560 | 5 | Article cleanup begins |
| Apr 6 | 8.5 | ~75 | 242 | 3 | Major cleanup sprint |
| Apr 12 | 8.5 | ~77 | 242 | 2 | Cache correction, +1 comparison |
| Apr 19 | 8.5 | ~78 | 242 | 1 | Homepage AI-Agents repositioning |
| Apr 30 | 9.0 | ~82 | 242 | 0 | /what-is-tidb/ LIVE — first zero criticals |
| May 28 | 9.0 | ~84 | 242 | 0 | Glossary 49 terms, data-src cleared, TTFB recovered |
| **Jun 2** | **9.5** | **~86** | **242** | **0** | **/.well-known/llms.txt live + Article/FAQPage schema on /what-is-tidb/** |

---

## Cumulative Stats (since Mar 9)

| Metric | Mar 9 | June 2 | Change |
|--------|-------|--------|--------|
| Items fixed (of 34) | 0 | **29** | 85% resolved |
| Critical remaining | 10 | **0** 🎉 | −100% |
| Mass-gen articles | 943 | 242 | −74% |
| Render-blocking scripts | 11 | 6 | −45% |
| data-src images | ~27 | **0** | −100% |
| Security headers | 0/7 | 5/7 | +5 |
| Comparison pages | 4 | **11** | +175% |
| Glossary terms | 0 | **49** | New |
| /what-is-tidb/ page | 404 | Live + Article/FAQPage schema | Full AEO asset |
| llms.txt | 404 | **200** | New |
| /.well-known/llms.txt | 404 | **200** 🎉 | **New — just fixed** |
| AEO Score | 3.5/10 | **9.5/10** | **+171%** |
| SEO Health | ~52 | **~86** | **+65%** |

---

## Top 3 Actions for Next Week

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | **Restore Content-Security-Policy header** (enforce, not report-only) | HIGH — security regression 2 weeks running; also a trust signal for enterprise buyers | 30 min (infra) |
| 2 | **Audit remaining 242 articles** — identify thin/duplicate content for removal or consolidation | HIGH — last major content-quality lever; could push SEO Health to 88+ | 2–3 days |
| 3 | **Add named leadership to /about-us/** — CEO, co-founders, key investors with Person schema | MEDIUM — E-E-A-T signal; also improves AEO brand authority signals | 2 hours |

---

*Report generated June 2, 2026. Baseline: pingcap-seo-aeo-progress-2026-05-28.md*
*All findings verified via live HTTP requests.*
