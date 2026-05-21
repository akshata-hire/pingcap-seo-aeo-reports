# PingCAP.com SEO / AEO Audit — March 9, 2026

> **Comparison audit** against baseline from March 6, 2026.
> Conducted with 6 parallel subagents: technical, content, schema, sitemap, performance, visual.

---

## SEO Health Score: 52/100

| Category | Weight | Score | Weighted | Baseline (Mar 6) | Delta |
|----------|--------|-------|----------|-------------------|-------|
| Technical SEO | 25% | 68 | 17.0 | ~70 (est.) | -2 |
| Content Quality | 25% | 62 | 15.5 | ~65 (est.) | -3 |
| On-Page SEO | 20% | 65 | 13.0 | ~65 (est.) | 0 |
| Schema / Structured Data | 10% | 32 | 3.2 | ~55 (est.) | -23 |
| Performance (CWV) | 10% | 50 | 5.0 | N/A (not measured) | NEW |
| Visual / Mobile | 5% | 62 | 3.1 | N/A (not measured) | NEW |
| AI Search Readiness | 5% | 52 | 2.6 | ~50 (est.) | +2 |
| **TOTAL** | | | **59.4** | | |

> **Note on schema score drop:** The March 6 baseline noted schema as a "major strength." This audit applies stricter quality gates: Google restricted FAQ rich results to government/healthcare in Aug 2023, and sitewide identical schema injection is penalized. The underlying data hasn't changed — the scoring methodology is more rigorous.

---

## Baseline Comparison: What Changed in 3 Days

### FIXED (Confirmed Resolved)

| # | Baseline Issue (Mar 6) | Status Mar 9 | Evidence |
|---|------------------------|------------|----------|
| 1 | **Blog posts may be JS-rendered (404 on fetch)** | **FIXED** | Blog posts return 200 with full HTML content, 73+ paragraph tags, headings, and schema in raw server response. SSR confirmed. |
| 2 | **Missing OG/Twitter tags on product pages** | **PARTIALLY FIXED** | OG and Twitter cards now present on homepage and blog posts. Still inconsistent on some pages (og:type="article" on non-article pages like /pricing/) |
| 3 | **No Article/BlogPosting schema on blog** | **FIXED** | Yoast Article schema now appears on blog posts with author, datePublished, dateModified, publisher |

### UNCHANGED (Still Open from Baseline)

| # | Baseline Issue | Severity | Status |
|---|----------------|----------|--------|
| 4 | **/solutions/ has no hub page (returns 404)** | MEDIUM | No traffic loss — nothing links to /solutions/ directly. Child pages are linked from nav and sitemap. Creating a hub would improve internal linking and topical clustering but nothing is broken |
| 5 | **No "What is TiDB?" definitional page** | CRITICAL | /what-is-tidb/ still 404, no glossary exists |
| 6 | **Duplicate FAQ schema sitewide** | CRITICAL | Same 23 Q&As on every page (now flagged as non-compliant: FAQ rich results restricted to govt/health since Aug 2023) |
| 7 | **Thank-you pages in sitemap** | HIGH | 8 thank-you pages still indexed, no noindex tags |
| 8 | **No hreflang tags** | MEDIUM | Still no internationalization |
| 9 | **Limited comparison coverage** | MEDIUM | Still only 4 comparison pages. No CockroachDB, YugabyteDB, PlanetScale |
| 10 | **No glossary pages** | MEDIUM | /glossary/ returns 404 |
| 11 | **AggregateRating sitewide** | HIGH | Same 4.5/5 (71 reviews) on every page, unlinked to verifiable source. Now appears 21 times across site |
| 12 | **No VideoObject schema** | MEDIUM | /videos/ still has no VideoObject markup |
| 13 | **Old event pages in sitemap** | MEDIUM | 35 stale events from 2022-2023 still present |
| 14 | **Thin solution page coverage** | MEDIUM | Still only 6 solution pages |
| 15 | **/product/ (with trailing slash) returns 404** | MEDIUM | /product (no slash) correctly 301s to /tidb/ via Redirection plugin, but /product/ returns 404. Fix: update redirect rule to match both variants |

### NEW FINDINGS (Not in Baseline)

| # | Finding | Severity | Category |
|---|---------|----------|----------|
| 16 | **943 articles in article-sitemap show mass-generation patterns** | CRITICAL | Sitemap/Content |
| 17 | **All images use JS-dependent lazy loading — LCP killer** | CRITICAL | Performance |
| 18 | **11 render-blocking scripts in `<head>` with no defer/async** | CRITICAL | Performance |
| 19 | **master.js is 1.14 MB, master.css is 427 KB — no caching headers** | CRITICAL | Performance |
| 20 | **Cookie banner blocks primary CTAs on mobile (25.6% of viewport)** | CRITICAL | Visual/Mobile |
| 21 | **"Please accept cookies" blocks hero video — Googlebot can't see it** | CRITICAL | Visual/Mobile |
| 22 | **Dual GTM containers** (GTM-TPX49SBK + GTM-52K4D8X) | HIGH | Performance |
| 23 | **Zero security headers enforced** (CSP is report-only) | HIGH | Technical |
| 24 | **58 of 75 images have no width/height attributes (CLS)** | HIGH | Performance |
| 25 | **Zero WebP/AVIF images — all PNG** | HIGH | Performance |
| 26 | **About page missing founder/leadership names** | HIGH | Content/E-E-A-T |
| 27 | **Blog posts use generic "TiDB Team" author** | HIGH | Content/E-E-A-T |
| 28 | **Product page thin at 1,151 words, no feature tables** | HIGH | Content |
| 29 | **Pricing page has 67px horizontal scroll on mobile** | HIGH | Visual/Mobile |
| 30 | **Mobile logo renders as 1px placeholder** | MEDIUM | Visual/Mobile |
| 31 | **Schema is 100% sitewide template injection — no page-specific markup** | CRITICAL | Schema |
| 32 | **No Organization schema detected** (contradicts baseline — may be inside sitewide block but not as standalone proper schema) | HIGH | Schema |
| 33 | **llms.txt exists but /.well-known/llms.txt returns 404** | LOW | AEO |
| 34 | **No AI-specific robots.txt rules** (GPTBot, ClaudeBot, etc.) | MEDIUM | AEO |

---

## Category Deep Dives

### 1. Technical SEO — 68/100

**Strengths:** HTTPS + HSTS clean, www redirect works, robots.txt + sitemap reference correct, TTFB excellent (72-92ms via CloudFront), HTTP/2 enabled, mobile viewport correct, llms.txt exists.

**Critical:** /solutions/ 404, /product/ 404, 8 thank-you pages indexed, blog post URL from baseline now 404 (content may have been moved).

**High:** Dual GTM containers, CSP report-only (no enforcement), no AI bot directives in robots.txt.

### 2. Content Quality — 62/100 (E-E-A-T: 64.25)

**Strengths:** MySQL vs TiDB comparison page is excellent (3,317 words, named author, reviewer attribution, balanced framing). 62 case studies. 319 blog posts. Education section with certifications.

**Critical:** No "What is TiDB?" page. About page missing leadership info. Sitewide duplicate FAQ.

**High:** Generic blog authors ("TiDB Team"). Product page thin (1,151 words). 53% of AI page images missing alt text.

**AI Citation Readiness: 52/100** — no clear quotable definition of TiDB in body text, no glossary, limited comparison coverage.

### 3. Schema / Structured Data — 32/100

**This is the biggest scoring change from baseline.** The March 6 audit noted schema as a "major strength" because FAQPage, SoftwareApplication, Organization etc. were detected on every page. This deeper audit reveals:

- All schema is **identical sitewide template injection** — not page-specific
- **FAQPage provides zero value** since Aug 2023 rich result restriction
- **AggregateRating appears 21 times** across the site with no verifiable source
- Schema quality ≠ schema quantity

**What works:** SoftwareApplication has good detail (pricing, features). BreadcrumbList structure is correct where present. Blog Article schema is now properly implemented via Yoast.

### 4. Sitemap — 62/100

**Strengths:** 11 sub-sitemaps, valid XML, no deprecated changefreq/priority, lastmod dates are genuine, clean Yoast generation.

**Critical:** 943 articles show mass-generation patterns (highest risk finding). 8 thank-you pages indexed.

**Medium:** 35 stale event pages, no video sitemap, session-replay-sitemap has only 1 URL.

### 5. Performance — 50/100

**Strengths:** Server-side is excellent — TTFB 72-92ms, gzip compression, HTTP/2, CloudFront CDN.

**Critical:** Client-side is poor. All images lazy-loaded via JS (LCP killer). 11 render-blocking scripts. 1.14 MB JS + 427 KB CSS monolithic bundles with no cache headers. Zero modern image formats.

**Estimated CWV:** LCP 3.5-5.5s (POOR), INP 200-400ms (NEEDS IMPROVEMENT), CLS 0.1-0.25 (NEEDS IMPROVEMENT).

### 6. Visual / Mobile — 62/100

**Strengths:** Clear H1 above fold on all pages, correct viewport meta, 16px base font, hamburger menu present.

**Critical:** Cookie banner blocks CTAs on mobile. Hero video gated behind cookie consent (invisible to Googlebot).

**High:** Pricing page horizontal overflow. Hero images have empty alt text. Mobile logo is a 1px placeholder.

---

## Priority Action Plan

### P0 — CRITICAL (Fix This Week)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | **Audit 943 article pages for thin/duplicate content** — If mass-generated, noindex or remove. This is the highest-risk finding (Google Helpful Content penalty) | Prevents penalty | 2-3 days |
| 2 | **Remove sitewide FAQPage schema** — No longer eligible for rich results. Replace with page-specific schema only where relevant | Removes spam risk | 2 hours |
| 3 | **Remove or scope AggregateRating** — Keep only on product pages, link to verifiable source (G2, Gartner) | Removes manual action risk | 1 hour |
| 4 | **Fix LCP: Give hero image a real `src` with `fetchpriority="high"`** instead of data-src placeholder | +15-25 LCP improvement | 30 min |
| 5 | **Add `defer` to all render-blocking scripts** in `<head>` | Immediate CWV improvement | 1 hour |
| 6 | **Fix cookie banner blocking CTAs on mobile** — Move CTA higher or reduce banner height | Conversion recovery | 2 hours |

### P1 — HIGH (Fix Within 2 Weeks)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 7 | **Create /solutions/ hub page** (optional — no current traffic loss) | Internal linking + topical clustering | 1 day |
| 8 | **Create "What is TiDB?" definitional page** at /what-is-tidb/ | AEO + informational queries | 1 day |
| 9 | **Noindex 8 thank-you pages** via Yoast | Index cleanup | 30 min |
| 10 | **Add `width`/`height` to all images** | CLS improvement | 2 hours |
| 11 | **Add `Cache-Control` headers** to master.js/master.css | Repeat visit performance | 30 min |
| 12 | **Fix About page** — Add founder names, investors, team credentials | E-E-A-T | 1 day |
| 13 | **Assign named authors to blog posts** instead of "TiDB Team" | E-E-A-T | Ongoing |
| 14 | **Redirect /product/ to /tidb/** | Recover lost traffic | 5 min |
| 15 | **Add Organization + WebSite schema** to homepage only | Knowledge Panel | 1 hour |

### P2 — MEDIUM (Fix Within 1 Month)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 16 | Add CockroachDB, YugabyteDB, PlanetScale comparison pages | AEO + competitive SEO | 3 days each |
| 17 | Create glossary pages (HTAP, distributed SQL, NewSQL, TiKV, TiFlash) | AEO targets | 2 days |
| 18 | Convert images to WebP/AVIF with `<picture>` fallback | Performance | 1 week |
| 19 | Remove stale 2022-2023 event pages from sitemap | Index hygiene | 1 hour |
| 20 | Add VideoObject schema to /videos/ | Video rich results | 2 hours |
| 21 | Implement hreflang for Japanese market | International SEO | 1 day |
| 22 | Add AI bot rules to robots.txt (GPTBot, ClaudeBot, etc.) | AEO control | 30 min |
| 23 | Consolidate or remove dual GTM containers | Performance | 1 day |
| 24 | Add `<link rel="preconnect">` for third-party domains | Performance | 15 min |
| 25 | Fix pricing page mobile horizontal scroll | Mobile UX | 2 hours |

---

## Detailed Subagent Reports

Individual reports saved in `/Users/udi@pingcap.com/Downloads/seo/`:
- `pingcap-technical-seo-audit-2026-03-09.md`
- `pingcap-content-quality-eeat-audit-2026-03-09.md`
- `pingcap-schema-audit-2026-03-09.md`
- `sitemap-audit-2026-03-09.md`
- `pingcap-performance-audit-2026-03-09.md`
- `pingcap-visual-mobile-audit-2026-03-09.md`
- `screenshots/` (12 desktop + mobile screenshots)

---

## Baseline Comparison Summary

| Metric | Mar 6 (Baseline) | Mar 9 (Current) | Change |
|--------|-------------------|------------------|--------|
| Issues found | 20 | 34 | +14 (deeper audit) |
| Critical issues | 5 | 10 | +5 |
| Items fixed | — | 3 of 20 | 15% resolved |
| Items unchanged | — | 12 of 20 | 60% still open |
| New findings | — | 14 | Deeper coverage |
| Schema score | ~55 (lenient) | 32 (strict) | -23 (methodology) |
| Performance score | Not measured | 50 | NEW |
| Visual/Mobile score | Not measured | 62 | NEW |

### 3 Things That Improved Since Baseline
1. Blog posts confirmed SSR (not JS-rendered) — baseline concern resolved
2. OG/Twitter tags added to homepage + blog posts
3. Article schema now on blog posts via Yoast

### 3 Biggest New Risks Discovered
1. 943 articles with mass-generation patterns (Helpful Content penalty risk)
2. Entire frontend performance is poor (LCP 3.5-5.5s) due to JS-only image loading
3. Cookie consent blocks CTAs on mobile and hero content from Googlebot

---

*Audit conducted March 9, 2026. 6 subagents deployed. Next audit recommended in 30 days.*
*Baseline: pingcap-seo-aeo-audit-2026-03-06.md*
