# SEO Project Memory

## Last Audit
- **Date:** 2026-05-28
- **Baseline:** Apr 30, 2026 (AEO 9.0/10, SEO ~82/100, 0 critical open)
- **Site:** pingcap.com (www.pingcap.com)
- **CMS:** WordPress + Yoast SEO
- **AEO Score:** 9.0/10 (stable from Apr 30)
- **SEO Health Score:** ~84/100 (up from ~82 on Apr 30)
- **🎉 May 28 WIN: Glossary 17 → 49 headings** — surpassed 25+ internal target; approaching CockroachDB's 50+ benchmark
- **🎉 May 28 WIN: data-src images 10 → 0** — all lazy-load images fully cleared from homepage
- **🎉 May 28 WIN: TTFB recovered 265ms → ~103ms** — Apr 30 soft regression reversed
- **⚠️ May 28 REGRESSION: CSP header removed** — Content-Security-Policy was report-only on Apr 30, now completely absent. Security headers: 6 → 5
- **⚠️ May 28 REGRESSION: Render-blocking scripts 5 → 6** — one new non-deferred/non-async script added
- **Comparison pages:** 11 (unchanged — same 11 pages as Apr 30)
- **Articles in sitemap:** 242 (unchanged since Apr 6)
- **Critical items open:** 0 (second consecutive week at zero)
- **Items resolved:** 26 of 34 (76%)

## 24-Signal Baseline (May 28, 2026)

| # | Signal | Value |
|---|--------|-------|
| 1 | Homepage title | "Database for AI Agents \| TiDB Distributed SQL \| TiDB" |
| 2 | Homepage schema types | Org, SoftwareApp, BreadcrumbList, WebSite, WebPage, Offer, EntryPoint, ImageObject, SearchAction, ReadAction |
| 3 | FAQPage on homepage | 0 (compliant) |
| 4 | AggregateRating on homepage | 0 (compliant) |
| 5 | AggregateRating on /tidb/ | 1 (correct) |
| 6 | /what-is-tidb/ status | 200 |
| 7 | Glossary headings | **49** (was 17 on Apr 30) 🎉 |
| 8 | Comparison pages | 11 |
| 9 | Articles in sitemap | 242 |
| 10 | AI bot rules (robots.txt) | 5 bots allowed |
| 11 | llms.txt | 200 |
| 12 | /.well-known/llms.txt | 404 |
| 13 | Hero fetchpriority="high" | 2 |
| 14 | Render-blocking scripts | **6** (was 5 on Apr 30) ⚠️ |
| 15 | data-src images | **0** (was 10 on Apr 30) 🎉 |
| 16 | Image formats | 2 PNG + 27 SVG |
| 17 | master.js cache (static.pingcap.com) | public,max-age=31536000,immutable |
| 18 | Security headers | **5** (was 6 — CSP removed) ⚠️ |
| 19 | Thank-you pages in sitemap | 0 |
| 20 | Solutions 404s | 0 |
| 21 | About page leadership | Missing |
| 22 | TTFB | **~103ms** (was 265ms on Apr 30) 🎉 |
| 23 | GTM containers | 1 (GTM-TPX49SBK) |
| 24 | Comparison pages list | amazon-aurora, azure-mysql, best-database-building-ai-apps, best-database-for-ai-agents, best-databases-for-saas-applications-at-scale, best-distributed-sql-databases, best-vector-database, cockroachdb, mysql, tidb-vs-postgresql-2026, yugabytedb |

## Open Items (May 28)
- **HIGH (1):** 242 articles in sitemap
- **MEDIUM (4):** No /compare/ hub, About page leadership missing, CSP header removed, render-blocking +1
- **LOW (2):** /.well-known/llms.txt 404, /what-is-tidb/ lacks Article schema
- **CRITICAL (0):** None

## Most Critical Open Items
1. **CSP header removed** — was report-only Apr 30, now completely absent. Restore immediately.
2. **242 articles** — still the last major content-quality lever

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
| **May 28** | **9.0** | **~84** | **242** | **0** | **Glossary 49, data-src cleared, TTFB recovered** |

## Cumulative Stats (since Mar 9)
- Items fixed: 26/34 (76%)
- Critical remaining: 0 (down from 10)
- Articles: 242 (down from 943, -74%)
- data-src images: 0 (down from ~27, -100%)
- Security headers: 5/7
- Comparison pages: 11 (up from 4, +175%)
- Glossary: 49 terms (up from 0)
- AEO: 9.0/10 (up from 3.5, +157%)
