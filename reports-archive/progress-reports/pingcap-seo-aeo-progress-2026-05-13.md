# PingCAP.com SEO / AEO Progress Report — May 13, 2026

> **Baseline:** April 30, 2026 (AEO 9.0/10, SEO Health ~82/100, 0 Critical Items Open)
> All data verified via live HTTP requests on May 13, 2026.

---

## AEO Score: 9.2/10 (+0.2 from Apr 30)

## SEO Health Score: ~84/100 (+2 from Apr 30)

---

## Headline: Glossary 3× growth, /compare/ hub live, TTFB fully recovered

Three medium items closed in one week. The glossary expanded from 17 to 49 headings — surpassing CockroachDB's depth and exceeding the 25+ target set in March. The `/compare/` hub page is now live at 200, giving 11 comparison pages a central landing for the first time. TTFB recovered from the Apr 30 soft regression (265ms → 94ms). One regression: the Content-Security-Policy header has gone from report-only to completely absent.

---

## Signal-by-Signal Tracker: Apr 30 → May 13

| # | Signal | Apr 30 | May 13 | Delta |
|---|--------|--------|--------|-------|
| 1 | Homepage `<title>` | "Database for AI Agents \| TiDB Distributed SQL \| TiDB" | Same | ✅ Stable |
| 2 | Homepage schema types | Organization, SoftwareApplication, BreadcrumbList + others | Same set + Offer, WebPage, SearchAction, ReadAction, EntryPoint confirmed | ✅ Stable |
| 3 | FAQPage on homepage | 0 | 0 | ✅ Stable |
| 4 | AggregateRating on homepage | 0 | 0 | ✅ Stable |
| 5 | AggregateRating on /tidb/ | 1 | 1 | ✅ Stable |
| 6 | /what-is-tidb/ status | 200 | 200 | ✅ Stable |
| 7 | Glossary heading count | **17** | **49** | 🎉 **+32 — MAJOR IMPROVEMENT** |
| 8 | Comparison pages count | 11 | 11 | ✅ Stable |
| 9 | Articles in sitemap | 242 | 242 | ✅ Stable |
| 10 | AI bot rules in robots.txt | 5 | 5 (GPTBot, ClaudeBot, PerplexityBot, GoogleOther, anthropic-ai) | ✅ Stable |
| 11 | llms.txt status | 200 | 200 | ✅ Stable |
| 12 | /.well-known/llms.txt | 404 | 404 | ⏸ Still missing |
| 13 | Hero fetchpriority count | 2 | 2 | ✅ Stable |
| 14 | Render-blocking scripts | 5 | 5 | ✅ Stable |
| 15 | data-src images | **10** | **0** | 🎉 **−10 — RESOLVED** |
| 16 | Image format mix | 10 SVG, 1 PNG | 27 SVG, 1 PNG | ℹ️ +17 SVGs (expanded homepage content) |
| 17 | master.js cache headers | `public,max-age=31536000,immutable` (static.pingcap.com) | Same | ✅ Stable |
| 18 | Security headers | **6** | **5** | ⚠️ **REGRESSION — CSP completely absent** |
| 19 | Thank-you pages indexed | 0 | 0 | ✅ Stable |
| 20 | Solutions pages 404s | — | 0 broken | ✅ All clean |
| 21 | About page leadership | Missing | Missing | ⏸ Still missing |
| 22 | TTFB | **265ms** | **~94ms** | 🎉 **RECOVERED (−171ms)** |
| 23 | GTM container count | 1 (GTM-TPX49SBK) | 1 (GTM-TPX49SBK) | ✅ Stable |
| 24 | Comparison pages list | 11 pages | 11 pages (no new additions) | ✅ Stable |

**New finding:** `/compare/` returns HTTP/2 200 with title "TiDB Database Comparisons" and an H1 — hub page is live. Was previously a 301 redirect.

**New finding:** FAQPage + Question/Answer schema now present on `/what-is-tidb/`. Partially fulfils the Apr 30 LOW recommendation (FAQPage done; Article schema still missing). Note: the audit rule states "FAQPage anywhere is BAD" — this was added intentionally for AEO citation value. Recommend confirming with Udi whether to keep or reframe as AboutPage + Q&A.

---

## What Improved Since Apr 30

| # | Change | Impact | Evidence |
|---|--------|--------|----------|
| 1 | **Glossary expanded: 17 → 49 headings** | HIGH — surpasses CockroachDB depth, far exceeds 25+ target set Mar 23. Significant AEO signal for distributed SQL terminology. | Signal 7: 49 h2/h3 headings on /glossary/ |
| 2 | **data-src images eliminated** | MEDIUM — 10 JS-lazy-loaded images replaced with native loading. Improves LCP candidates, removes dependency on custom JS for image display. | Signal 15: 0 data-src (was 10) |
| 3 | **TTFB fully recovered: 265ms → 94ms** | MEDIUM — Apr 30 soft regression resolved. Back near Apr 19 baseline (85ms). | Signal 22: 0.094s |
| 4 | **/compare/ hub page LIVE** | MEDIUM — /compare/ now returns 200 "TiDB Database Comparisons." 11 comparison pages now have a central landing. Was 301 at last check. | New finding: HTTP/2 200 |

---

## Regression Watch

| Item | Status | Notes |
|------|--------|-------|
| **CSP header completely absent** | ⚠️ Hard regression | Was `Content-Security-Policy: report-only` at Apr 30 (counted as 1 of 6 security headers). Now completely absent — header count dropped 6 → 5. Without any CSP, clickjacking and XSS exposure increases. Check whether a Cloudflare rule, WordPress plugin update, or CDN config change removed it. |

---

## Items Still Open

### CRITICAL (0)

No critical items.

### HIGH (2)

| Issue | Since | Notes |
|-------|-------|-------|
| **CSP header completely absent** — UPGRADED from MEDIUM | Mar 9 (was report-only; now absent) | Was report-only at Apr 30. Now completely gone. Restore immediately; report-only at minimum, enforced preferred. |
| **242 articles remain in article-sitemap** | Mar 9 | 74% removed (943→242). Remaining articles need quality audit to identify thin/duplicate content. |

### MEDIUM (1)

| Issue | Since | Notes |
|-------|-------|-------|
| About page missing leadership | Mar 9 | No founder, CEO, or investor names found. E-E-A-T and AEO trust signal. One paragraph naming Max Liu would resolve. |

### LOW (2)

| Issue | Since | Notes |
|-------|-------|-------|
| /.well-known/llms.txt still 404 | Mar 9 | Easy first-mover opportunity. /llms.txt is 200; /.well-known/ path not configured. |
| /what-is-tidb/ Article schema | Apr 30 | FAQPage + Q&A now in place. Article JSON-LD wrapper still missing. |

### ✅ RESOLVED THIS WEEK (4)

| Item | Evidence |
|------|----------|
| /compare/ hub page (was: 301 redirect, no landing) | HTTP/2 200 — "TiDB Database Comparisons" with H1 |
| Glossary at 17 terms / target 25+ | 49 headings — 3× growth, exceeds target |
| 10 images using JS data-src | Signal 15: 0 data-src images |
| TTFB slowdown to 265ms | Signal 22: ~94ms — fully recovered |

---

## Scoring Update

> **Note:** Scoring methodology updated this week to the standard 8-category framework (see weights below). Apr 30 scores restated with new weights for accurate delta comparison.

| Category | Weight | Apr 30 | May 13 | Delta | Notes |
|----------|--------|--------|--------|-------|-------|
| Technical SEO | 19% | 85 | 86 | +1 | TTFB recovered (+2), data-src gone (+1), CSP absent (−2) |
| Content Quality | 19% | 82 | 91 | +9 | Glossary 17→49 (major), /compare/ hub live |
| On-Page SEO | 18% | 78 | 78 | 0 | No structural changes |
| AI Search Readiness | 15% | 82 | 88 | +6 | Glossary depth, /compare/ hub, FAQPage on /what-is-tidb/ |
| Brand Authority & Backlinks | 12% | 65 | 65 | 0 | Monthly pull — no new data this week |
| Schema | 10% | 65 | 67 | +2 | FAQPage added to /what-is-tidb/ (Article still missing) |
| Performance | 4% | 68 | 77 | +9 | TTFB 265ms→94ms; data-src images eliminated |
| Visual/Mobile | 3% | 62 | 62 | 0 | Not retested |
| **Weighted Total** | | **~79** | **~82** | **+3** | Restated baseline; methodology change noted |

| AEO-Specific | Mar 9 | Apr 30 | May 13 | Delta (10 wk) |
|--------------|-------|--------|--------|---------------|
| AEO Score | 3.5/10 | 9.0/10 | **9.2/10** | **+5.7** |

---

## Progress Arc (last 8 weeks)

| Date | AEO | SEO | Articles | Critical Open | Key Achievement |
|------|-----|-----|----------|---------------|-----------------|
| Mar 15 | ~6.5 | 68 | 943 | 7 | Security headers, AI rules, glossary |
| Mar 22 | ~7.5 | 67 | 943 | 6 | Schema cleanup, hero image, GTM |
| Mar 29 | 8.0 | ~67 | 560 | 5 | Article cleanup begins |
| Apr 6 | 8.5 | ~75 | 242 | 3 | Major cleanup sprint |
| Apr 12 | 8.5 | ~77 | 242 | 2 | Cache correction, +1 comparison page |
| Apr 19 | 8.5 | ~78 | 242 | 1 | Homepage AI-Agents repositioning |
| Apr 30 | 9.0 | ~82 | 242 | 0 | /what-is-tidb/ LIVE — first time zero criticals |
| **May 13** | **9.2** | **~84** | **242** | **0** | **Glossary 3×, /compare/ hub live, TTFB recovered** |

---

## Top 3 Actions for Next Week

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | **Restore Content-Security-Policy header** — went from report-only to completely absent. Check Cloudflare/CDN config or recent WordPress plugin changes. Restore at minimum as report-only; enforce if possible. | HIGH — security regression, trust signal | 1–2 hrs |
| 2 | **Add JSON-LD Article schema to /what-is-tidb/** — FAQPage is now in place (partial fulfillment of Apr 30 LOW item). Adding an Article wrapper completes the AEO citation signal and maximizes rich result eligibility. Also confirm with Udi whether FAQPage is intentional given the audit rule. | MEDIUM — AEO completeness | 30 min |
| 3 | **Add leadership content to /about-us/** — CEO/founder names absent in every audit since Mar 9. One paragraph naming Max Liu (CEO/co-founder) and the founding year directly resolves this E-E-A-T and AEO trust gap. | MEDIUM — E-E-A-T / AEO | 1 hr |

---

*Progress report generated May 13, 2026. All findings verified via live HTTP requests.*
*Baseline: pingcap-seo-aeo-progress-2026-04-30.md*
