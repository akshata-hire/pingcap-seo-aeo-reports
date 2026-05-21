# PingCAP (www.pingcap.com) -- Full Technical SEO Audit
**Date:** 2026-03-09
**Auditor:** Claude Opus 4.6 (automated)
**CMS:** WordPress + Yoast SEO
**CDN:** Amazon CloudFront
**Server:** nginx

---

## OVERALL TECHNICAL SEO SCORE: 68 / 100

---

## Executive Summary

The site has a solid foundation (WordPress + Yoast, HTTPS, clean URLs, good structured data) but is undermined by several critical and high-severity issues: broken internal link paths, thank-you pages indexed in Google, missing AI crawler directives in robots.txt, zero lazy-loading on images, dual GTM containers, and a Content-Security-Policy that is report-only (not enforced). Blog posts are properly server-side rendered, which is a positive finding compared to the prior audit concern.

---

## 1. CRAWLABILITY

### 1.1 robots.txt

**Raw content fetched from** `https://www.pingcap.com/robots.txt`:

```
# START YOAST BLOCK
# ---------------------------
User-agent: *
Disallow:

Sitemap: https://www.pingcap.com/sitemap_index.xml
# ---------------------------
# END YOAST BLOCK
```

| Check | Result | Status |
|-------|--------|--------|
| robots.txt exists | Yes | PASS |
| Sitemap declared | Yes (`sitemap_index.xml`) | PASS |
| Disallow rules | None -- fully open | PASS |
| AI bot directives (GPTBot) | MISSING | FAIL |
| AI bot directives (ClaudeBot) | MISSING | FAIL |
| AI bot directives (PerplexityBot) | MISSING | FAIL |
| AI bot directives (Google-Extended) | MISSING | FAIL |
| AI bot directives (CCBot) | MISSING | FAIL |

**[MEDIUM] No AI crawler directives.** The robots.txt contains zero rules for any AI/LLM crawlers. While the site has an `llms.txt` file (positive), there is no explicit `Allow` or `Disallow` for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, or CCBot. This means:
- All AI crawlers are implicitly allowed to crawl the entire site.
- PingCAP has no documented policy on AI crawling.
- Recommendation: Add explicit directives. If the goal is to allow AI crawlers (given the llms.txt exists), add explicit `Allow: /` rules for each bot. If the goal is to restrict, add `Disallow` rules. Being explicit is better than being silent.

### 1.2 Sitemap Structure

**Sitemap index:** `https://www.pingcap.com/sitemap_index.xml` (11 sub-sitemaps)

| Sitemap | URL Count | Last Modified |
|---------|-----------|---------------|
| post | 319 | 2026-03-06 |
| page | 137 | 2026-03-09 |
| article | 943 | 2026-03-04 |
| case-study | 62 | 2026-02-06 |
| champion | 20 | 2025-10-13 |
| ebook-whitepaper | 21 | 2026-01-29 |
| event | 243 | 2026-03-06 |
| press-release | 66 | 2025-11-19 |
| session-replay | 1 | 2025-11-10 |
| solution | 6 | 2026-01-20 |
| tutorial | 5 | 2025-10-29 |
| **TOTAL** | **1,823** | |

**[MEDIUM] Event sitemap bloat.** 243 event pages in the sitemap is high. Many are past events that provide diminishing SEO value and dilute crawl budget.

### 1.3 Meta Robots

| Page | Meta Robots Value | Status |
|------|-------------------|--------|
| Homepage | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | PASS |
| Blog post | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | PASS |
| 404 page | `noindex, follow` | PASS |

The `max-image-preview:large` and `max-snippet:-1` directives are good -- they allow Google to show large image previews and full-length snippets.

### Crawlability Score: 14 / 20

---

## 2. INDEXABILITY

### 2.1 Canonical Tags

| Page | Canonical | Self-referencing? | Status |
|------|-----------|-------------------|--------|
| Homepage | `https://www.pingcap.com/` | Yes | PASS |
| Blog post | `https://www.pingcap.com/blog/singlestore-vs-tidb-...` | Yes | PASS |

### 2.2 Broken URLs / 404s

| URL | Status Code | Severity |
|-----|-------------|----------|
| `/solutions/` | **404** | **CRITICAL** |
| `/product/` | **404** | **CRITICAL** |
| `/blog/distributed-sql-database-architecture-scale-high-availability/` | **404** | HIGH |
| `/.well-known/llms.txt` | **404** | LOW |

**[CRITICAL] /solutions/ returns 404.** This is a key commercial path. The solution-sitemap.xml contains 6 solution URLs, but the parent index at `/solutions/` is broken. Any internal links or external references to `/solutions/` will hit a dead end.

**[CRITICAL] /product/ returns 404.** Another commercially important path. The actual product pages live at `/tidb/` (200 OK) and `/tidb/cloud/` (200 OK), but anyone navigating to the intuitive `/product/` URL gets a 404. This should either redirect to `/tidb/` or serve content.

**[HIGH] Blog post URL returns 404.** The URL `/blog/distributed-sql-database-architecture-scale-high-availability/` returns a 404. If this was ever a live page, it was removed without a redirect. The sitemap does NOT contain this URL, so it may have been deleted, but if any external backlinks point to it, link equity is being lost.

### 2.3 Index Bloat -- Thank-You Pages

**[HIGH] 8 thank-you pages are indexed.** These pages are in the page-sitemap.xml and have `index, follow` meta robots:

```
/hk-web3-event-thank-you-for-registering/
/thank-your-for-requesting-the-report/         (note: typo "your" vs "you")
/pingcap-partner-program-thank-you/
/odwebinar-thank-you-forrester-therightdb/
/webinar-thank-you/
/odwebinar-thank-you-tidb-cloud-import-data/
/mysql-tidb-stories-thank-you/
/tidb-enterprise-thank-you/
```

These pages provide zero SEO value and waste crawl budget. They should have `noindex` and be removed from the sitemap.

**Bonus finding:** The URL `/thank-your-for-requesting-the-report/` contains a typo ("your" instead of "you").

### 2.4 Index Bloat -- Old Event Pages

**[MEDIUM] Old event pages are indexed.** 243 event pages are in the sitemap, all with `index, follow`. Past events (e.g., conferences from 2024-2025) should be noindexed or consolidated into a past-events archive to preserve crawl budget.

### Indexability Score: 10 / 20

---

## 3. SECURITY

### 3.1 HTTPS & Redirects

| Check | Result | Status |
|-------|--------|--------|
| HTTPS enabled | Yes | PASS |
| HTTP -> HTTPS redirect | 301 redirect | PASS |
| non-www -> www redirect | 301 redirect | PASS |
| HSTS header | `max-age=31536000; includeSubDomains; preload` | PASS |

All four redirect/HTTPS checks pass cleanly.

### 3.2 Security Headers

```
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
strict-transport-security: max-age=31536000; includeSubDomains; preload
content-security-policy-report-only: default-src 'self'; script-src 'self' 'unsafe-inline' ...
permissions-policy: camera=(), payment=()
```

| Header | Present? | Value | Status |
|--------|----------|-------|--------|
| Strict-Transport-Security | Yes | max-age=31536000; includeSubDomains; preload | PASS |
| X-Content-Type-Options | Yes | nosniff | PASS |
| X-Frame-Options | Yes | DENY | PASS |
| Referrer-Policy | Yes | strict-origin-when-cross-origin | PASS |
| Permissions-Policy | Yes | camera=(), payment=() | PASS |
| Content-Security-Policy | **Report-Only** | See below | FAIL |
| X-XSS-Protection | Missing | -- | NOTE |

**[HIGH] CSP is report-only, not enforced.** The header is `content-security-policy-report-only` rather than `content-security-policy`. This means the CSP rules are being monitored but NOT enforced -- the browser will log violations but will not block them. This provides zero actual protection against XSS and data injection attacks.

Recommendation: Graduate from `report-only` to `content-security-policy` after verifying no legitimate resources are blocked.

**[LOW] X-XSS-Protection header missing.** This header is largely deprecated in modern browsers (Chrome removed support in 2019), so this is informational only. Modern CSP is the replacement.

### Security Score: 12 / 15

---

## 4. URL STRUCTURE

### 4.1 Clean URLs

| Check | Result | Status |
|-------|--------|--------|
| Clean URL format | Yes (no query params, no IDs) | PASS |
| Trailing slash consistency | Enforced via 301 redirect (e.g., `/pricing` -> `/pricing/`) | PASS |
| URL depth | Generally 2-3 levels deep (`/blog/slug/`, `/tidb/cloud/`) | PASS |
| Lowercase URLs | Yes | PASS |

### 4.2 URL Architecture

```
/                        200  (homepage)
/tidb/                   200  (product overview)
/tidb/cloud/             200  (cloud product)
/pricing/                200
/blog/                   200
/blog/{slug}/            200
/article/{slug}/         200  (separate from blog)
/case-study/{slug}/      200
/event/{slug}/           200
/solutions/              404  (BROKEN)
/product/                404  (BROKEN)
```

**[MEDIUM] Duplicate content taxonomy: /blog/ vs /article/.** The site has two separate content types -- 319 "posts" at `/blog/` and 943 "articles" at `/article/`. This creates potential confusion for search engines and users about the canonical content hub. The `article` CPT has nearly 3x the volume of blog posts.

### URL Structure Score: 8 / 10

---

## 5. MOBILE

### 5.1 Viewport & Responsive Signals

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

| Check | Result | Status |
|-------|--------|--------|
| Viewport meta tag | Present and correct | PASS |
| `width=device-width` | Yes | PASS |
| `initial-scale=1` | Yes | PASS |
| No `maximum-scale=1` or `user-scalable=no` | Correct (not present) | PASS |
| Responsive CSS framework | Custom CSS with media queries | PASS |

### Mobile Score: 10 / 10

---

## 6. CORE WEB VITALS (Source-Based Signals)

Note: These are potential CWV issues identified from HTML source inspection. Actual field data from CrUX/PageSpeed Insights would be needed for definitive scores.

### 6.1 LCP (Largest Contentful Paint) Signals

| Signal | Finding | Impact |
|--------|---------|--------|
| Hero images | Uses lazy-load pattern (`data-src` + `class="lazy"`) on ALL images | **NEGATIVE for LCP** |
| Image preload | None -- no `<link rel="preload">` for hero image | **NEGATIVE for LCP** |
| CSS preload | Yes (`master.css` is preloaded) | POSITIVE |
| JS preload | Yes (`master.js` is preloaded) | POSITIVE |
| Font preconnect | None detected | NEGATIVE |
| External stylesheets | 4 render-blocking stylesheets | MODERATE |

**[HIGH] ALL images use lazy loading, including above-the-fold hero images.** Every single `<img>` tag on the homepage uses the `data-src` lazy loading pattern with a 1x1px base64 placeholder. This means the LCP image cannot begin loading until JavaScript executes the lazy-load library. This is a well-known LCP anti-pattern.

Recommendation: The first visible (hero/above-the-fold) image should use `loading="eager"` (or simply omit lazy loading) and have a `<link rel="preload" as="image">` in the `<head>`.

**[MEDIUM] No `<link rel="preconnect">` for static.pingcap.com.** Images are served from `static.pingcap.com` but there is no `preconnect` hint. There is a `dns-prefetch` for `static.pingcap.com`, which helps but is less effective than `preconnect`.

### 6.2 INP (Interaction to Next Paint) Signals

| Signal | Finding | Impact |
|--------|---------|--------|
| GTM containers | **2 containers** (GTM-TPX49SBK, GTM-52K4D8X) | **NEGATIVE** |
| Script tags with src | 15 total | MODERATE |
| async/defer scripts | 4 of 15 | NEEDS WORK |
| HubSpot tracking | Present (`hs-scripts.com`) | MODERATE |

**[HIGH] Dual GTM containers.** Two separate Google Tag Manager containers are loaded on every page:
- `GTM-TPX49SBK`
- `GTM-52K4D8X`

Each container loads its own JS bundle and can inject additional scripts, event listeners, and DOM mutations. Dual containers are a common cause of elevated INP because they double the main-thread work for tag execution. Recommendation: Consolidate into a single GTM container.

**[MEDIUM] Only 4 of 15 script tags use async/defer.** The remaining 11 scripts are potentially render-blocking and add to main-thread work.

### 6.3 CLS (Cumulative Layout Shift) Signals

| Signal | Finding | Impact |
|--------|---------|--------|
| Image dimensions | 0 of 29 images have explicit `width`/`height` attributes | **NEGATIVE** |
| Lazy load placeholders | 1x1px base64 placeholder (no aspect ratio) | **NEGATIVE** |
| Inline styles | 5 `<style>` blocks, 16 inline `style=` attributes | MODERATE |
| Font loading | No `font-display` hints visible | MODERATE |

**[HIGH] No width/height attributes on any images.** None of the 29 `<img>` tags on the homepage include `width` or `height` attributes. Combined with the 1x1px lazy-load placeholder, this means the browser cannot reserve space for images before they load, causing layout shifts when images decode.

### Core Web Vitals Score: 5 / 15

---

## 7. JAVASCRIPT RENDERING

### 7.1 Blog Posts -- SSR vs CSR

**Test URL:** `https://www.pingcap.com/blog/singlestore-vs-tidb-distributed-sql-database-comparison-guide/`

| Check | Result | Status |
|-------|--------|--------|
| HTTP status | 200 | PASS |
| `<title>` in raw HTML | Yes: "SingleStore vs TiDB: Distributed SQL Comparison Guide" | PASS |
| `<p>` tags in raw HTML | 73 paragraph tags | PASS |
| `<h2>/<h3>` tags in raw HTML | 42 heading tags | PASS |
| OG tags present | Yes (title, description, image) | PASS |
| Article schema | Yes (`"@type":"Article"`) | PASS |
| Twitter cards | Yes (summary_large_image) | PASS |
| React/Vue SPA root | Not found (no `#app`, `#root`, `#__next`) | PASS |

**VERDICT: Blog posts are server-side rendered (SSR).** Full article content including headings, paragraphs, and structured data is present in the raw HTML response. This is a positive finding -- the prior audit flagged a concern about JS rendering on blog posts, but this appears to have been resolved or was a misidentification (the 404 on some blog URLs was mistaken for JS-rendering issues).

### 7.2 Blog Index -- SSR vs CSR

| Check | Result |
|-------|--------|
| Blog index status | 200 |
| Blog links in raw HTML | 20 references to `/blog/` |
| Article/post elements | 12 matches |
| SPA root elements | Not found |
| QuickCreator plugin | Detected (1 reference) |

**VERDICT: Blog index is server-side rendered.** Content is in the raw HTML.

### JavaScript Rendering Score: 9 / 10

(Docked 1 point for the heavy JS footprint with dual GTM and 15 script tags.)

---

## 8. STRUCTURED DATA

### 8.1 Homepage JSON-LD

The homepage contains **5 JSON-LD blocks** with the following schema types:

| Schema Type | Count | Source |
|-------------|-------|--------|
| Question | 23 | FAQPage block |
| Answer | 23 | FAQPage block |
| FAQPage | 1 | Custom JSON-LD |
| SoftwareApplication | 3 | Custom JSON-LD |
| Organization | 3 | Yoast + custom |
| AggregateRating | 3 | SoftwareApplication child |
| Offer | 4 | SoftwareApplication child |
| PriceSpecification | 1 | Offer child |
| WebPage | 1 | Yoast schema graph |
| WebSite | 1 | Yoast schema graph |
| BreadcrumbList | 1 | Yoast schema graph |
| SearchAction | 1 | Yoast schema graph |

**Positive findings:**
- Comprehensive FAQPage schema with 23 Q&As (up from 18-25 range noted in prior audit)
- SoftwareApplication schema with AggregateRating (good for rich results)
- Organization schema with sameAs social links
- SearchAction for sitelinks search box
- BreadcrumbList for breadcrumb rich results

### 8.2 Blog Post JSON-LD

The blog post contains **5 JSON-LD blocks** with:

| Schema Type | Present? |
|-------------|----------|
| Article | Yes |
| WebPage | Yes |
| BreadcrumbList | Yes |
| WebSite | Yes |
| Organization | Yes |
| Person (author) | Yes |

**[LOW] No FAQPage schema on blog posts.** Blog comparison articles (like SingleStore vs TiDB) would benefit from FAQ schema to capture "People Also Ask" results.

### Structured Data Score: 8 / 10

---

## SPECIAL CHECKS

### llms.txt

| Check | Result | Status |
|-------|--------|--------|
| `https://www.pingcap.com/llms.txt` | **200 OK** | PASS |
| Content-Type | `text/plain; charset=utf-8` | PASS |
| Content-Length | 2,406 bytes | PASS |
| Last-Modified | 2026-02-27 | PASS |
| `/.well-known/llms.txt` | **404** | NOTE |

The `llms.txt` file is well-structured with:
- Company and product identity
- Canonical sources (homepage, cloud, pricing, security)
- Authoritative documentation links (docs.pingcap.com)
- Use case categories
- Retrieval guidance for LLMs (prioritization rules)
- De-emphasis list (careers, events, campaigns)

**[LOW] No /.well-known/llms.txt.** The emerging convention places `llms.txt` at `/.well-known/llms.txt`. The root-level file is fine, but adding the well-known location as well (or a redirect) would be more future-proof.

### /solutions/ and /product/

| URL | Status | Finding |
|-----|--------|---------|
| `/solutions/` | **404** | Broken -- no parent index for solution pages |
| `/product/` | **404** | Broken -- product pages live at `/tidb/` instead |

---

## PRIORITIZED ISSUES

### CRITICAL (Fix Immediately)

1. **[C-1] /solutions/ returns 404.** Commercial landing page path is broken. Either create an index page or redirect to the appropriate destination. The solution-sitemap.xml has 6 solution pages that are accessible individually, but the parent path is dead.

2. **[C-2] /product/ returns 404.** High-intent commercial path. Should redirect (301) to `/tidb/` or serve a product overview page.

3. **[C-3] 8 thank-you pages are indexed and in sitemap.** These waste crawl budget and can appear in search results. Add `noindex` meta tag and remove from sitemap. Note the typo in `/thank-your-for-requesting-the-report/`.

### HIGH (Fix This Sprint)

4. **[H-1] ALL images lazy-loaded including hero/LCP images.** The 1x1px base64 placeholder + `data-src` pattern on above-the-fold images delays LCP. The hero image must load eagerly with a `<link rel="preload">`.

5. **[H-2] Dual GTM containers (GTM-TPX49SBK + GTM-52K4D8X).** Doubles main-thread tag-execution work, directly impacting INP. Consolidate into one container.

6. **[H-3] Zero images have width/height attributes.** 0 of 29 homepage images have explicit dimensions, causing CLS when images load. Add `width` and `height` attributes to all `<img>` tags.

7. **[H-4] Content-Security-Policy is report-only.** The CSP header is not enforced (`content-security-policy-report-only`). This provides no actual XSS protection. Graduate to enforced mode.

8. **[H-5] Blog post URL in sitemap returns 404.** `/blog/distributed-sql-database-architecture-scale-high-availability/` returns 404. Audit the post-sitemap for other dead URLs and implement 301 redirects for any with backlink value.

### MEDIUM (Fix This Month)

9. **[M-1] No AI crawler directives in robots.txt.** Add explicit `User-agent` / `Allow` or `Disallow` rules for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and CCBot. Being explicit about AI crawler policy is increasingly important.

10. **[M-2] 243 event pages in sitemap, all indexed.** Past events dilute crawl budget. Noindex events older than 6 months, or consolidate into an archive.

11. **[M-3] No preconnect for static.pingcap.com.** Images are served from this origin. Add `<link rel="preconnect" href="https://static.pingcap.com">` to the `<head>`.

12. **[M-4] 11 of 15 scripts lack async/defer.** Most scripts are synchronous and render-blocking. Audit each and add `async` or `defer` where possible.

13. **[M-5] Duplicate content taxonomy: /blog/ vs /article/.** Two separate content sections (319 posts + 943 articles) may confuse search engines about the canonical content hub. Consider consolidating or clearly differentiating their SEO purpose.

### LOW (Backlog)

14. **[L-1] No /.well-known/llms.txt.** Add a redirect from `/.well-known/llms.txt` to `/llms.txt`.

15. **[L-2] No FAQPage schema on blog posts.** Comparison and educational blog posts would benefit from FAQ structured data.

16. **[L-3] No hreflang tags.** If PingCAP targets multiple language/region audiences, hreflang should be implemented. Currently only `lang="en-US"` is set on the HTML element.

17. **[L-4] session-replay sitemap has 1 URL.** A sitemap with a single URL is unnecessary overhead. Either remove it or fold the URL into the page sitemap.

---

## SCORE BREAKDOWN

| Category | Score | Max | Notes |
|----------|-------|-----|-------|
| Crawlability | 14 | 20 | No AI bot directives, event sitemap bloat |
| Indexability | 10 | 20 | Critical 404s, thank-you pages indexed |
| Security | 12 | 15 | CSP report-only |
| URL Structure | 8 | 10 | Clean URLs, but /solutions/ and /product/ broken |
| Mobile | 10 | 10 | Perfect viewport setup |
| Core Web Vitals | 5 | 15 | Hero lazy-load, dual GTM, no image dimensions |
| Structured Data | 8 | 10 | Strong schema, minor gaps |
| JS Rendering | 9 | 10 | SSR confirmed, heavy JS footprint |
| **TOTAL** | **68** | **100** | |

---

## COMPARISON TO PRIOR AUDIT (2026-03-06)

| Issue | Prior Audit | Current Audit | Change |
|-------|-------------|---------------|--------|
| /solutions/ 404 | Flagged | Still broken | NO CHANGE |
| /product/ 404 | Not checked | NEW finding | NEW |
| OG/Twitter on homepage | Missing | Now present | FIXED |
| Blog SSR concern | Flagged as possibly JS-rendered | Confirmed SSR | RESOLVED |
| Article schema on blog | Missing | Now present | FIXED |
| Thank-you pages indexed | Not flagged | 8 pages found | NEW |
| Dual GTM containers | Not flagged | 2 containers found | NEW |
| All images lazy-loaded | Not flagged | 29/29 lazy | NEW |
| llms.txt | Not checked | Exists, well-structured | NEW |

---

## METHODOLOGY

All data was collected on 2026-03-09 via `curl` HTTP requests (no JavaScript execution). The audit examines raw HTML source, HTTP headers, sitemap XML, and robots.txt. Core Web Vitals assessments are based on source-code signals only; field data from Chrome User Experience Report (CrUX) should be consulted for actual LCP, INP, and CLS measurements.

---

*End of audit.*
