# PingCAP.com SEO / AEO Progress Report — March 29, 2026

> **Baseline:** Mar 22, 2026 (AEO ~7.5/10, SEO Health 67/100)
> All data verified via live HTTP requests on March 29, 2026.

---

## AEO Score: 8.0/10 (+0.5 from Mar 22)

---

## Signal-by-Signal Tracker: Mar 9 → Mar 22 → Mar 29

| # | Signal | Mar 9 | Mar 22 | Mar 29 | Delta (Mar 22→29) |
|---|--------|-------|--------|--------|-------------------|
| 1 | AI bot rules (robots.txt) | None | 5 bots allowed | 5 bots allowed | No change |
| 2 | llms.txt | Existed, unverified | Live, proper structure | Live, 2,406 bytes | No change |
| 3 | /.well-known/llms.txt | 404 | 404 | 404 | Still missing |
| 4 | /what-is-tidb/ | 404 | 404 | **404** | Still missing (CRITICAL — 3 weeks) |
| 5 | Glossary | 404 | 13 terms | 13 terms | No change |
| 6 | Comparison pages | 4 | 8 | **9** (+1 new) | NEW: /compare/best-databases-for-saas-applications-at-scale/ |
| 7 | FAQs page | Existed | 22 Q&As | **30 Q&As** (+8) | Expanded: 15 TiDB + 15 TiDB Cloud |
| 8 | FAQPage schema sitewide | On every page | REMOVED from homepage | REMOVED from homepage/pricing/product | Partial cleanup continues |
| 9 | AggregateRating sitewide | Every page (4.5/5) | Every page | **Only on /tidb/ product page** | Mostly cleaned up |
| 10 | SoftwareApplication schema | Sitewide | Present | **Only on /tidb/** (1 instance) | Scoped correctly |
| 11 | Security headers | 0 of 7 | 6 of 7 | **6 of 7** | No change (CSP still report-only) |
| 12 | Named blog authors | "TiDB Team" | Real people | Still real people | No change |
| 13 | Thank-you pages in sitemap | 8 indexed | Removed | **Still removed** (0 found) | Confirmed |
| 14 | Article sitemap (mass-gen) | 943 | Not rechecked | **560** (-383 removed) | Significant cleanup |
| 15 | /solutions/ hub | 404 | 301 redirect | 301 → /solutions/lower-infrastructure-costs/ | No change |
| 16 | /product/ trailing slash | 404 | 301 to /tidb/ | 301 → /tidb/ | Fixed (stable) |
| 17 | /compare/ hub | N/A | 301 → mysql-vs-tidb | 301 → /compare/mysql-vs-tidb/ | Redirect only, no real hub |

---

## Scoring Update

| Category | Mar 9 | Mar 22 | Mar 29 | Delta (3 wk) |
|----------|-------|--------|--------|--------------|
| AEO Score | 3.5/10 | ~7.5/10 | **8.0/10** | **+4.5** |
| Schema Quality | 32/100 | ~58 | **55/100** | **+23** |
| Content/E-E-A-T | 62/100 | ~65 | **70/100** | **+8** |
| Technical SEO | 68/100 | ~78 | **73/100** | **+5** |

---

## What Improved Since Mar 22 (This Week)

| # | Change | Impact |
|---|--------|--------|
| 1 | +1 comparison page (best-databases-for-saas-applications-at-scale) — 8,500 words, named author (Akshata Hire) + reviewer (Kyle Cao) | HIGH — 9th comparison, strongest content library in the space |
| 2 | FAQ expanded 22 → 30 questions (added TiDB Cloud section) | MEDIUM — more surface area for AI citation |
| 3 | AggregateRating removed from most pages (only on /tidb/ now) | HIGH — eliminates schema spam risk |
| 4 | FAQPage schema removed from homepage, pricing | HIGH — moves toward compliance (FAQ schema restricted since Aug 2023) |
| 5 | Thank-you pages removed from sitemap | MEDIUM — clean index |
| 6 | 383 mass-gen articles removed (943 → 560) | HIGH — significant content quality signal |
| 7 | Permissions-policy header added (6th security header) | LOW — incremental security improvement |

---

## Critical Items Still Open

| # | Issue | Severity | Since | Notes |
|---|-------|----------|-------|-------|
| 1 | **No /what-is-tidb/ page** | CRITICAL | Mar 9 | #1 gap for 3 weeks. Single most impactful page PingCAP could create |
| 2 | **560 articles still in article-sitemap** | HIGH | Mar 9 (was 943) | Down 40% but patterns should be audited |
| 3 | **No /compare/ hub page** | MEDIUM | Mar 23 | /compare/ just 301s to mysql-vs-tidb. A real hub linking all 9 pages would boost internal linking |
| 4 | **Glossary still only 13 terms** | MEDIUM | Mar 23 | CockroachDB has 50+. Target: 25+ terms minimum |
| 5 | **/.well-known/llms.txt still 404** | LOW | Mar 9 | Nobody else has this either — easy first-mover win |
| 6 | **AggregateRating still on /tidb/** | MEDIUM | Mar 9 | Reduced from sitewide to 1 page — still unlinked to verifiable source |
| 7 | **CSP still report-only** | LOW | Mar 9 | Not enforced |
| 8 | **Blog schema missing Article type** | MEDIUM | Mar 29 | Blog posts show WebSite/Organization but no Article/BlogPosting schema — may have regressed |
| 9 | **Solutions pages 404** | MEDIUM | Mar 9 | /solutions/scalable-transactional-processing/ and /solutions/real-time-analytics/ return 404 |

---

## Audit History

| Date | AEO Score | SEO Health | Items Fixed | Key Achievement |
|------|-----------|-----------|-------------|-----------------|
| Mar 6 | — | — | 0 | Baseline audit (20 items) |
| Mar 9 | 3.5/10 | 52/100 | 3 | Deep audit (34 items identified) |
| Mar 15 | ~6.5/10 | 68/100 | 11 | Security headers, AI bot rules, caching, glossary |
| Mar 22 | ~7.5/10 | 67/100 | 18 | Schema cleanup, hero image, GTM consolidated |
| **Mar 29** | **8.0/10** | **~67/100** | **18** | **FAQ expansion, article cleanup, new comparison** |

### Cumulative Stats (Mar 9 → Mar 29)

| Metric | Mar 9 | Mar 29 | Change |
|--------|-------|--------|--------|
| Items fixed | 0/34 | 18/34 | 53% resolved |
| Critical remaining | 10 | 3 | -70% |
| Mass-gen articles | 943 | 560 | -41% |
| Security headers | 0/7 | 6/7 | +6 |
| Comparison pages | 4 | 9 | +125% |
| FAQ questions | ~22 | 30 | +36% |
| Glossary terms | 0 | 13 | New |

---

*Progress report generated March 29, 2026. All findings verified via live HTTP requests.*
*Baseline: pingcap-seo-aeo-progress-2026-03-22.md*
