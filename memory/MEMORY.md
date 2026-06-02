# SEO Project Memory

## Last Audit
- **Date:** 2026-06-02
- **Baseline:** May 28, 2026 (AEO 9.0/10, SEO ~84/100, 0 critical open)
- **Site:** pingcap.com (www.pingcap.com)
- **CMS:** WordPress + Yoast SEO
- **AEO Score:** 9.5/10 (up from 9.0 on May 28)
- **SEO Health Score:** ~86/100 (up from ~84 on May 28)
- **🎉 Jun 2 WIN: /.well-known/llms.txt now 200** — was 404 since Mar 9 audit program began; AEO penalty removed
- **🎉 Jun 2 WIN: Article + FAQPage JSON-LD on /what-is-tidb/** — both schema types now detected; enables rich results and AI citations
- **🎉 Jun 2: TTFB improved further to ~86ms** — continuing recovery trend (was 103ms on May 28)
- **⚠️ ONGOING REGRESSION: CSP header still absent** — 2nd consecutive week without Content-Security-Policy
- **⚠️ MONITORING: Render-blocking scripts at 6** — jQuery, TranslatePress, CookieYes, dotLottie, 2× HubSpot
- **Comparison pages:** 11 (unchanged)
- **Articles in sitemap:** 242 (unchanged since Apr 6)
- **Critical items open:** 0 (third consecutive week at zero)
- **Items resolved:** 29 of 34 (85%)

## 24-Signal Baseline (June 2, 2026)

| # | Signal | Value |
|---|--------|-------|
| 1 | Homepage title | "Database for AI Agents \| TiDB Distributed SQL \| TiDB" |
| 2 | Homepage schema types | Org, SoftwareApp, BreadcrumbList, WebSite, WebPage, Offer, EntryPoint, ImageObject, SearchAction, ReadAction |
| 3 | FAQPage on homepage | 0 (compliant) |
| 4 | AggregateRating on homepage | 0 (compliant) |
| 5 | AggregateRating on /tidb/ | 1 (correct) |
| 6 | /what-is-tidb/ status | 200 + Article + FAQPage JSON-LD 🎉 |
| 7 | Glossary headings | 49 |
| 8 | Comparison pages | 11 |
| 9 | Articles in sitemap | 242 |
| 10 | AI bot rules (robots.txt) | 5 bots allowed |
| 11 | llms.txt | 200 |
| 12 | /.well-known/llms.txt | **200** 🎉 (was 404) |
| 13 | Hero fetchpriority="high" | 2 |
| 14 | Render-blocking scripts | 6 ⚠️ (jQuery, TranslatePress, CookieYes, dotLottie, 2× HubSpot) |
| 15 | data-src images | 0 |
| 16 | Image formats | 2 PNG + 27 SVG |
| 17 | master.js cache (static.pingcap.com) | public,max-age=31536000,immutable |
| 18 | Security headers | 5/7 ⚠️ (CSP still absent — week 2) |
| 19 | Thank-you pages in sitemap | 0 |
| 20 | Solutions 404s | 0 |
| 21 | About page leadership | Missing |
| 22 | TTFB | ~86ms |
| 23 | GTM containers | 1 (GTM-TPX49SBK) |
| 24 | Comparison pages list | amazon-aurora, azure-mysql, best-database-building-ai-apps, best-database-for-ai-agents, best-databases-for-saas-applications-at-scale, best-distributed-sql-databases, best-vector-database, cockroachdb, mysql, tidb-vs-postgresql-2026, yugabytedb |

## Open Items (June 2, 2026)
- **HIGH (1):** 242 articles in sitemap
- **MEDIUM (3):** CSP header absent (week 2), About page leadership missing, render-blocking scripts at 6
- **LOW (0):** All low items resolved 🎉
- **CRITICAL (0):** None

## Most Critical Open Items
1. **CSP header absent — 2nd consecutive week** — restore and enforce immediately
2. **242 articles** — last major content-quality lever

## Audit Script Note
- `/compare/` hub confirmed 200 — check directly, not via redirect detection
- `/what-is-tidb/` now has Article + FAQPage JSON-LD — verify schema remains in future audits

## SEO Skill
- Installed: claude-seo from AgriciDaniel/claude-seo (Mar 9)
- Python: /opt/homebrew/bin/python3.12 (system python3 is 3.9, too old)
- PATH note: /opt/homebrew/bin must be on PATH for skill to work
- Playwright Chromium installed for visual analysis

## Progress Arc

| Date | AEO | SEO | Articles | Critical | Key Achievement |
|------|-----|-----|----------|----------|-----------------|
| Mar 9 | 3.5 | 52 | 943 | 10 | Baseline |
| Apr 30 | 9.0 | ~82 | 242 | 0 | /what-is-tidb/ LIVE — zero criticals |
| May 28 | 9.0 | ~84 | 242 | 0 | Glossary 49, data-src cleared, TTFB recovered |
| **Jun 2** | **9.5** | **~86** | **242** | **0** | **/.well-known/llms.txt live + Article/FAQPage schema** |

## Cumulative Stats (since Mar 9)
- Items fixed: 29/34 (85%)
- Critical remaining: 0 (down from 10)
- Articles: 242 (down from 943, -74%)
- data-src images: 0 (down from ~27, -100%)
- Security headers: 5/7 (CSP still absent)
- Comparison pages: 11 (up from 4, +175%)
- Glossary: 49 terms (up from 0)
- /.well-known/llms.txt: 200 (was 404)
- /what-is-tidb/ schema: Article + FAQPage JSON-LD (new)
- AEO: 9.5/10 (up from 3.5, +171%)
