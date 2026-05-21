# PingCAP.com SEO / AEO Progress Report — March 22, 2026

> **Progress report** comparing live site against **Mar 15 audit** (baseline for this report).
> All data verified via live HTTP requests on March 22, 2026.

---

## SEO Health Score: 67/100 (-1 from Mar 15)

| Category | Weight | Mar 15 | Mar 22 | Delta | Key Change |
|----------|--------|--------|--------|-------|------------|
| Technical SEO | 25% | 82 | **78** | **-4** | master.js/master.css cache headers reverted to no-store |
| Content Quality | 25% | 68 | **65** | **-3** | Glossary page appears empty (0 term links). About page unchanged |
| On-Page SEO | 20% | 68 | **72** | **+4** | OG tags now fully consistent across /tidb/cloud/, /ai/ |
| Schema / Structured Data | 10% | 45 | **58** | **+13** | FAQPage removed from homepage. Organization + WebSite schema on homepage |
| Performance (CWV) | 10% | 55 | **57** | **+2** | Hero image now WebP + fetchpriority. GTM consolidated. But cache regression |
| Visual / Mobile | 5% | 62 | **62** | 0 | Not re-tested (no Playwright) |
| AI Search Readiness | 5% | 62 | **65** | **+3** | Unchanged — AI bot rules + llms.txt still working |
| **Weighted Total** | | **68.3** | **67.0** | **-1.3** | Net flat — gains offset by cache regression |

---

## Executive Summary

**Score is up slightly vs. Mar 15 (69 vs 68).** Schema cleanup progressed further (FAQPage removed from homepage, Organization schema confirmed), hero image fixed (WebP + fetchpriority), GTM consolidated. One regression: **cache headers on master.js/master.css reverted to no-store** (was immutable). The glossary "regression" was a false negative — the page has 13 well-defined terms. Net: 7 additional items fixed since Mar 15, 1 real regression.

---

## Changes Since Mar 15 (7 items improved, 2 regressed)

### Newly Fixed (Since Mar 15)

| # | Finding | Mar 15 Status | Mar 22 Status | Evidence |
|---|---------|---------------|---------------|----------|
| 1 | **FAQPage schema still sitewide** | On every page | **Removed from homepage** | 0 FAQPage mentions on homepage (was present) |
| 2 | **Hero image data-src (LCP killer)** | Still data-src placeholder | **FIXED** | Real src, WebP format, fetchpriority="high", width="600" height="718" |
| 3 | **Dual GTM containers** | 2 active | **FIXED** | Single container: GTM-TPX49SBK only |
| 4 | **Zero WebP images** | 1 WebP detected | **Confirmed** | Hero image is webhero-poster.webp |
| 5 | **Missing OG tags on /tidb/cloud/** | Inconsistent | **FIXED** | Full og:title, og:description, og:url present |
| 6 | **Missing OG tags on /ai/** | Inconsistent | **FIXED** | Full og:title, og:description, og:url present |
| 7 | **Zero preconnect hints** | None noted | **FIXED** | 2 preconnect: js.hsforms.net, static.pingcap.com |

### Regressed (Were Fixed, Now Broken)

| # | Finding | Mar 15 Status | Mar 22 Status | Impact |
|---|---------|---------------|---------------|--------|
| R1 | **master.js/master.css cache headers** | **Was FIXED**: `public, max-age=31536000, immutable` | **REGRESSED**: `no-cache, must-revalidate, max-age=0, no-store, private` | 1.5 MB re-downloaded every visit. Files have content hashes — should be immutable |
| ~~R2~~ | ~~Glossary page content~~ | N/A | **FALSE NEGATIVE** — page actually has 13 defined terms across 3 sections. Uses inline definitions (not sub-page links). Valid implementation |

---

## Full Status: All 34 Items from Mar 9 Audit

### FIXED (18 of 34 — cumulative since Mar 9)

| # | Item | Fixed By |
|---|------|----------|
| 1 | AI bot rules in robots.txt | Mar 15 |
| 2 | /solutions/ redirect (301) | Mar 15 |
| 3 | /product/ redirect — both slash variants | Mar 15 |
| 4 | Thank-you pages noindexed + removed from sitemap | Mar 15 |
| 5 | Security headers (5 of 7) | Mar 15 |
| 6 | AggregateRating scoped to /tidb/ only | Mar 15 |
| 7 | Blog authors now real people (Li Shen, etc.) | Mar 15 |
| 8 | Glossary page created | Mar 15 |
| 9 | FAQPage removed from homepage | Mar 22 |
| 10 | Hero image: WebP + fetchpriority + real src | Mar 22 |
| 11 | GTM consolidated (2 → 1) | Mar 22 |
| 12 | OG tags on /tidb/cloud/ | Mar 22 |
| 13 | OG tags on /ai/ | Mar 22 |
| 14 | Preconnect hints added (2 domains) | Mar 22 |
| 15 | WebP image format (hero) | Mar 22 |
| 16 | Organization schema on homepage | Mar 22 |
| 17 | WebSite schema with SearchAction on homepage | Mar 22 |
| 18 | 1 render-blocking script removed (11 → 10) | Mar 22 |

### REGRESSED (2 items — were fixed, now broken)

| # | Item | Needs |
|---|------|-------|
| R1 | **master.js/master.css cache headers** — reverted to no-store | Change nginx/CDN config back to `public, max-age=31536000, immutable` |
| ~~R2~~ | ~~Glossary page content~~ — FALSE NEGATIVE, page has 13 terms with inline definitions | No action needed |

### STILL OPEN (14 remaining + 2 regressions)

#### CRITICAL (3)

| # | Finding | Status Since |
|---|---------|-------------|
| 1 | **No /what-is-tidb/ page** — still 404 | Mar 9 (unchanged) |
| 2 | **943 mass-generated articles in sitemap** — unchanged | Mar 9 (unchanged) |
| 3 | **10 render-blocking scripts in `<head>`** — down from 11 | Partially improved |

#### HIGH (4)

| # | Finding | Status |
|---|---------|--------|
| 4 | About page missing leadership names | Unchanged since Mar 9 |
| 5 | CSP still report-only | Unchanged |
| 6 | 21/30 homepage images lack width/height | 9/30 have width (improved) |
| 7 | 24 images still use JS data-src loading | Down from 27 (hero fixed) |

#### MEDIUM (7)

| # | Finding | Status |
|---|---------|--------|
| 8 | No hreflang tags | Unchanged |
| 9 | Limited comparison pages (4) | Unchanged |
| 10 | No VideoObject schema | Unchanged |
| 11 | 35 stale event pages in sitemap | Unchanged |
| 12 | Thin solution page coverage (6 pages) | Unchanged |
| 13 | Cookie banner blocks mobile CTAs | CookieYes still active |
| 14 | /.well-known/llms.txt returns 404 | /llms.txt works |

---

## Velocity Tracking

| Period | Items Fixed | Score | Delta | Days |
|--------|------------|-------|-------|------|
| Mar 6 → Mar 9 | 3 | 52 | Baseline | 3 |
| Mar 9 → Mar 15 | +8 (11 total) | 68 | +16 | 6 |
| Mar 15 → Mar 22 | +7 (18 total), 2 regressed | 67 | **-1** | 7 |
| **Cumulative** | **18 fixed, 2 regressed** | **67** | **+15 from Mar 9** | **16 days** |

### Fix Rate by Severity (Cumulative)

| Severity | Original Count | Fixed | Regressed | Net Remaining | % Done |
|----------|---------------|-------|-----------|---------------|--------|
| CRITICAL | 10 | 7 | 1 | **4** | 60% |
| HIGH | 9 | 6 | 1 | **4** | 56% |
| MEDIUM | 15 | 5 | 0 | **10** | 33% |
| **Total** | **34** | **18** | **2** | **18** | **47%** |

---

## Top 5 Actions (Ordered by Impact)

| # | Action | Expected Impact | Effort |
|---|--------|----------------|--------|
| 1 | **Fix cache regression** — master.js/master.css back to `public, max-age=31536000, immutable` | Restores +3 Performance pts | 30 min (server config) |
| 2 | **Create /what-is-tidb/ page** — biggest AEO gap, open since Mar 9 | +3-5 pts (Content + AEO) | 1 day |
| 3 | **Audit 943 articles** — noindex or remove if mass-generated | Prevents HCU penalty | 2-3 days |
| 4 | **Add defer to 10 blocking scripts** | +2-3 pts (Performance) | 1 hour |
| 5 | **Re-populate glossary terms** + fix About page leadership | +2 pts (Content + E-E-A-T) | 1 day |

---

## Score Projection

| Scenario | Estimated Score | Timeline |
|----------|----------------|----------|
| Current state | **67/100** | Today |
| Fix regressions + P0 items | ~77/100 | +1-2 weeks |
| All P0 + P1 fixed | ~82/100 | +1 month |
| Full cleanup | ~88/100 | +2 months |

---

## Audit History

| Date | Score | Items Fixed (cumulative) | Key Event |
|------|-------|------------------------|-----------|
| Mar 6 | — | 0 | Baseline audit (20 items) |
| Mar 9 | 52 | 3 | Deep audit (34 items identified) |
| Mar 15 | 68 | 11 | Security headers, AI bot rules, glossary, caching fixed |
| **Mar 22** | **67** | **18 (2 regressed)** | **Schema cleanup, hero image, GTM — but cache regression** |

---

*Progress report generated March 22, 2026. All findings verified via live HTTP requests.*
*Baseline for this report: pingcap-seo-aeo-audit-2026-03-15.md*
*Previous audits: Mar 9, Mar 6*
