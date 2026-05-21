# PingCAP.com Performance & Core Web Vitals Audit

**Date:** 2026-03-09
**Auditor:** Automated CLI-based analysis (curl, HTML inspection)
**Pages tested:** Homepage, /tidb/, /pricing/
**Estimated Performance Score: 45-55 / 100**

---

## 1. Executive Summary

The site has a fast server (TTFB ~80ms) served over HTTP/2 via CloudFront CDN with gzip compression. However, there are severe client-side performance bottlenecks: **11 render-blocking scripts in the `<head>`**, a **1.14 MB uncompressed JavaScript bundle** (master.js), **no image lazy-loading via native browser APIs**, **all images use JS-based lazy loading that harms LCP**, **zero WebP/AVIF images**, and **no Cache-Control headers on HTML documents**. Two separate GTM containers compound the third-party script burden.

---

## 2. Page Load Metrics (Server-Side)

| Metric | Homepage | /tidb/ | /pricing/ |
|--------|----------|--------|-----------|
| HTTP Status | 200 | 200 | 200 |
| TTFB | 72-92ms | 64ms | 83ms |
| Total Download | 103-142ms | 96ms | 103ms |
| HTML Size (uncompressed) | 124,713 bytes (122 KB) | 121,923 bytes (119 KB) | 105,995 bytes (104 KB) |
| Gzip Transfer Size | ~26 KB | ~26 KB | ~23 KB |
| Compression Ratio | 78.9% | ~78% | ~78% |
| Protocol | HTTP/2 | HTTP/2 | HTTP/2 |

**Verdict:** Server performance is excellent. TTFB is well under the 200ms threshold. Gzip compression is active. HTTP/2 is enabled. The bottlenecks are entirely on the client side.

---

## 3. Core Web Vitals Assessment

### 3a. LCP (Largest Contentful Paint) -- LIKELY POOR (estimated >4.0s)

**Critical Finding: All images use JS-dependent lazy loading that blocks LCP.**

Every `<img>` tag on the homepage uses this pattern:
```html
<img src="data:image/png;base64,iVBORw0KGgo..."
     data-src="https://static.pingcap.com/files/..."
     class="lazy" />
```

The browser sees a 1x1 transparent pixel as `src`. The real image URL is in `data-src` and only loads after JavaScript executes and swaps the attribute. This means:

1. The browser's preload scanner cannot discover the LCP image early
2. The LCP image must wait for: HTML parse -> JS download -> JS execute -> image request -> image download
3. With 11 render-blocking scripts in `<head>`, JS execution is significantly delayed

**Additional LCP concerns:**
- **0 images with `fetchpriority="high"`** -- the LCP image is not prioritized
- **0 images with native `loading="lazy"`** -- all lazy loading is JS-based
- **0 images use `<picture>` with WebP/AVIF** -- no modern format optimization
- **0 preconnect hints** for image CDN (static.pingcap.com only has dns-prefetch)
- **Homepage: 0/29 images have width/height attributes**
- **/tidb/: 0/31 images have width/height attributes**
- **/pricing/: 9/15 images have width/height attributes** (best of the three)

### 3b. INP (Interaction to Next Paint) -- LIKELY NEEDS IMPROVEMENT (estimated 200-400ms)

**Risk factors for poor INP:**

1. **master.js is 1.14 MB (uncompressed)** -- this is a single monolithic JavaScript bundle that likely creates long tasks on the main thread
2. **jQuery 3.7.1 (87 KB)** loaded synchronously in `<head>` -- blocks parsing
3. **11 render-blocking scripts in `<head>`** with no defer/async
4. **81 KB of inline JavaScript** across 18 script blocks
5. **Two GTM containers** (GTM-TPX49SBK, GTM-52K4D8X) -- each loads additional scripts
6. **HubSpot forms (v2.js + v2-legacy.js)** loaded synchronously -- both are render-blocking
7. **dotlottie-player.mjs** from unpkg.com loaded as module
8. **CookieYes banner** executes in `<head>`
9. **devtools-detect.js** -- a security plugin script that runs continuously

### 3c. CLS (Cumulative Layout Shift) -- LIKELY NEEDS IMPROVEMENT (estimated 0.1-0.2)

**Risk factors for layout shift:**

1. **Homepage: 29 images with 0 having width/height** -- when JS swaps `data-src` to `src`, images load without reserved space
2. **/tidb/: 31 images with 0 having width/height** -- same issue
3. **JS-based lazy loading** means content appears asynchronously, causing shifts
4. **5 Lottie animations** (dotlottie-player) -- animated elements without reserved space
5. **No font-display property** and no @font-face declarations in HTML -- fonts loaded via CSS bundle may cause FOUT
6. **CookieYes consent banner** injected dynamically
7. **HubSpot forms** injected dynamically

---

## 4. Render-Blocking Resources (CRITICAL)

### 4a. Render-Blocking CSS (4 stylesheets in `<head>`)

| File | Size | Impact |
|------|------|--------|
| quickcreator/quickcreatorblog-front.css | 173 bytes | Negligible but unnecessary |
| ultimate-blocks/style.css | 250 bytes | Negligible but unnecessary |
| easy-table-of-contents/screen.min.css | 5,892 bytes | Low |
| **master.css (static.pingcap.com)** | **437,564 bytes (427 KB)** | **HIGH** |

The master.css file at **427 KB is extremely large** for a single CSS bundle. It is preloaded (good), but still render-blocking. Critical CSS should be inlined, with the rest deferred.

### 4b. Render-Blocking Scripts (11 scripts in `<head>` without defer/async)

| Script | Size | Blocking? |
|--------|------|-----------|
| devtools-detect.js | 1,439 bytes | YES - synchronous |
| **jquery.min.js** | **87,553 bytes (86 KB)** | **YES - synchronous** |
| **track.min.js** | **1,558 bytes** | **YES - synchronous** |
| **cookieyes/script.js** | unknown | **YES - synchronous** |
| **dotlottie-player.mjs (@latest)** | unknown | **YES - module** |
| **hsforms/v2-legacy.js** | unknown | **YES - synchronous** |
| **hsforms/v2.js** | unknown | **YES - synchronous** |
| smooth_scroll.min.js | small | YES - synchronous |
| js.cookie.min.js | small | YES - synchronous |
| jquery.sticky-kit.min.js | small | YES - synchronous |
| front.min.js (ez-toc) | small | YES - synchronous |

**Only 2 scripts use `defer` and 1 uses `async`** out of 13 external scripts. The remaining 10 are fully render-blocking.

---

## 5. Third-Party Script Audit

### Third-Party Script Inventory

| Service | Scripts | Blocking? | Purpose |
|---------|---------|-----------|---------|
| **Google Tag Manager** | 2 containers (GTM-TPX49SBK, GTM-52K4D8X) | Async | Analytics |
| **HubSpot** | hs-scripts.com/4466002.js + hsforms v2 + v2-legacy | **YES (forms are blocking)** | Marketing/Forms |
| **CookieYes** | cdn-cookieyes.com/script.js | **YES** | Consent |
| **Crisp** | Referenced in HTML | Unknown | Chat |
| **DotLottie** | unpkg.com/@dotlottie/player-component@latest | **YES** | Animations |
| **Algolia** | Config inline (JS) | Inline config | Search |

**Key concern:** Loading **both** `v2-legacy.js` AND `v2.js` for HubSpot forms is redundant. The v2.js file includes legacy support and the legacy file should be removed.

---

## 6. Image Optimization Audit

### Format Usage (all three pages combined)

| Format | Count | Optimal? |
|--------|-------|----------|
| PNG | 63 references | NO -- should be WebP/AVIF |
| SVG | 50 references | OK for icons/logos |
| JPG/JPEG | 2 references | NO -- should be WebP/AVIF |
| WebP | 0 | MISSING |
| AVIF | 0 | MISSING |

### Image Loading Issues

| Issue | Homepage | /tidb/ | /pricing/ |
|-------|----------|--------|-----------|
| Total `<img>` tags | 29 | 31 | 15 |
| Using JS lazy-load (data-src) | 27 | 23 | 4 |
| Using native loading="lazy" | 0 | 0 | 0 |
| With width attribute | 0 | 0 | 9 |
| With height attribute | 0 | 0 | 9 |
| With fetchpriority="high" | 0 | 0 | 0 |
| Using `<picture>` element | 0 | 0 | 0 |

---

## 7. Caching Audit

### HTML Documents

**No Cache-Control header** is set on any HTML page. The CloudFront headers show `x-cache: Miss from cloudfront` consistently, suggesting either:
- Cache-Control is not configured for HTML responses
- Pages are always fetched from origin (nginx/WordPress)

This means every visitor triggers a full origin request.

### Static Assets

| Asset | Cache-Control | Issue |
|-------|---------------|-------|
| master.js (1.14 MB) | **NONE** | No Cache-Control header despite content-hash in filename |
| master.css (427 KB) | **NONE** | No Cache-Control header despite content-hash in filename |
| Images on static.pingcap.com | max-age=31536000 (1 year) | Good |
| jQuery (self-hosted) | ETag only, no Cache-Control | Suboptimal |
| HubSpot forms v2.js | max-age=300 (5 min) | Low cache duration |
| HubSpot embed | max-age=90 (90 sec) | Very low cache duration |
| dotlottie player | max-age=31536000 | Good, but @latest tag forces redirect |

**Critical:** The two largest assets (master.js at 1.14 MB and master.css at 427 KB) have **no Cache-Control header**. They have content hashes in their filenames, making them safe for long-term caching (max-age=31536000). This is a major missed optimization.

---

## 8. Additional Findings

### Positive Findings
- HTTP/2 enabled via CloudFront
- HSTS header with preload directive
- Gzip compression active (78.9% compression ratio)
- Good TTFB (72-92ms)
- Speculation Rules API for prefetch detected
- DNS prefetch for static.pingcap.com
- Preload hints for master.js and master.css
- Content Security Policy (report-only mode)
- Permissions-Policy header present

### Negative Findings
- **No Brotli compression** (only gzip, despite `Accept-Encoding: br` in request) -- Brotli provides 15-20% better compression
- **No preconnect** to any third-party origin (static.pingcap.com, js.hsforms.net, cdn-cookieyes.com, unpkg.com, etc.)
- **Two GTM containers** double the tag management overhead
- **@latest tag on unpkg.com URL** means version resolution on every page load plus no long-term CDN caching
- **Easy Table of Contents plugin** loads 4 scripts + 1 CSS on the homepage where there is no table of contents
- **devtools-detect.js** runs continuously checking if dev tools are open -- wastes CPU cycles in production
- **WordPress WP-JSON link headers exposed** -- reveals CMS and page IDs

---

## 9. Prioritized Recommendations

### CRITICAL (Expected impact: 20-40 points on Lighthouse)

**C1. Fix LCP image loading -- remove JS-based lazy loading for above-the-fold images**
- Replace `data-src` with native `src` for the hero/above-fold LCP element
- Add `fetchpriority="high"` to the LCP image
- Add `loading="eager"` (or omit loading attribute) for above-fold images
- Keep `loading="lazy"` (native) for below-fold images
- Expected LCP improvement: 1-3 seconds

**C2. Defer or async all render-blocking scripts**
- Add `defer` to jQuery, all Easy-TOC scripts, track.min.js
- Add `defer` to HubSpot forms scripts (or load them only on pages with forms)
- Move CookieYes to async loading
- Remove devtools-detect.js entirely (security-through-obscurity provides no real benefit)
- Expected improvement: 0.5-2 seconds reduction in render-blocking time

**C3. Add Cache-Control headers to master.js and master.css**
- Both files have content hashes in filenames, so set `Cache-Control: public, max-age=31536000, immutable`
- This eliminates repeat downloads of 1.57 MB of assets for returning visitors
- Expected improvement: 50-70% faster repeat visits

**C4. Add width and height to all images**
- Homepage: 29 images need dimensions
- /tidb/: 31 images need dimensions
- Prevents CLS from layout shifts during image load
- Expected CLS improvement: 0.05-0.15 reduction

### IMPORTANT (Expected impact: 10-20 points)

**I1. Convert images to WebP/AVIF with `<picture>` fallback**
- 63 PNG references across audited pages, 0 use modern formats
- WebP saves 25-35% over PNG; AVIF saves 50%+ over PNG
- Implement via WordPress plugin (ShortPixel, Imagify) or CDN transformation

**I2. Split master.js (1.14 MB) into chunks**
- Code-split by route/page -- the homepage does not need all 1.14 MB
- Lazy-load non-critical modules (Algolia search, form handlers, animations)
- Target <200 KB initial JS bundle per page

**I3. Split master.css (427 KB) and inline critical CSS**
- Extract critical above-fold CSS (~15-20 KB) and inline it in `<head>`
- Load full CSS asynchronously via `media="print" onload="this.media='all'"`
- Remove unused CSS per page (homepage likely uses <30% of 427 KB bundle)

**I4. Enable Brotli compression**
- CloudFront supports Brotli -- enable it in distribution settings
- Expected savings: ~15-20% over gzip for text assets
- Reduces master.css transfer from ~85 KB gzip to ~70 KB Brotli
- Reduces HTML transfer from ~26 KB to ~21 KB

**I5. Add preconnect hints for critical third-party origins**
```html
<link rel="preconnect" href="https://static.pingcap.com">
<link rel="preconnect" href="https://js.hsforms.net">
<link rel="preconnect" href="https://cdn-cookieyes.com">
<link rel="preconnect" href="https://www.googletagmanager.com">
```

**I6. Consolidate GTM containers**
- Two containers (GTM-TPX49SBK, GTM-52K4D8X) each load separate tag bundles
- Merge into a single container to reduce HTTP requests and JS execution

**I7. Remove unnecessary plugin assets from homepage**
- Easy Table of Contents loads 4 JS files + 1 CSS on the homepage, which has no TOC
- Conditionally load these assets only on blog/documentation pages
- quickcreator-styles (173 bytes) and ultimate-blocks style (250 bytes) may also be unnecessary on the homepage

### NICE-TO-HAVE (Expected impact: 5-10 points)

**N1. Pin dotlottie-player version instead of @latest**
```html
<!-- Before -->
<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module">
<!-- After -->
<script src="https://unpkg.com/@dotlottie/player-component@2.7.0/dist/dotlottie-player.mjs" type="module" defer>
```
- Eliminates version-resolution redirect on every page load
- Enables long-term CDN caching

**N2. Self-host critical third-party scripts**
- Self-host jQuery (already doing this -- good)
- Consider self-hosting CookieYes and dotlottie-player to avoid DNS lookups and reduce connection overhead

**N3. Remove HubSpot v2-legacy.js**
- The v2.js file includes legacy browser support
- Loading both is redundant and adds unnecessary bytes

**N4. Set Cache-Control for HTML pages**
- Add `Cache-Control: public, s-maxage=300, max-age=60, stale-while-revalidate=86400`
- Allows CloudFront to serve cached HTML for 5 minutes, reducing origin load
- stale-while-revalidate provides instant responses while revalidating in background

**N5. Lazy-load Lottie animations**
- 5 dotlottie references on the homepage
- Use Intersection Observer to load the player only when animations are near the viewport

**N6. Implement resource hints for navigation**
- Speculation Rules API is already present (good) -- verify it covers key user journeys
- Add `<link rel="prefetch">` for likely next-page assets

---

## 10. Estimated Core Web Vitals (Lab)

| Metric | Estimated Value | Status | Threshold |
|--------|----------------|--------|-----------|
| **LCP** | 3.5-5.5s | POOR | <=2.5s good |
| **INP** | 200-400ms | NEEDS IMPROVEMENT | <=200ms good |
| **CLS** | 0.1-0.25 | NEEDS IMPROVEMENT | <=0.1 good |
| **TTFB** | 72-92ms | GOOD | <=200ms good |

**Estimated Lighthouse Performance Score: 45-55 / 100**

This estimate reflects excellent server performance dragged down by:
- Massive render-blocking JS/CSS payload (1.14 MB JS + 427 KB CSS)
- 11 render-blocking scripts in `<head>`
- JS-dependent image loading killing LCP
- No modern image formats
- No image dimensions causing CLS

### Quick Wins (implement in 1-2 days, biggest impact)
1. Add `defer` to all scripts in `<head>` (+10-15 points)
2. Fix LCP image to use native `src` with `fetchpriority="high"` (+5-10 points)
3. Add Cache-Control to master.js and master.css (+5 points for repeat visits)
4. Add width/height to all images (+3-5 points from CLS improvement)
5. Add preconnect hints (+2-3 points)

These five changes alone could bring the score to **65-75** with minimal development effort.

---

## Appendix: Raw Data

### External Scripts Loaded (Homepage)
```
1. //www.pingcap.com/core/plugins/wp-hide-security-enhancer/assets/js/devtools-detect.js (1.4 KB, blocking)
2. https://www.pingcap.com/lib/js/jquery/jquery.min.js (86 KB, blocking)
3. https://static.pingcap.com/dist/js/track.min.js (1.6 KB, blocking)
4. https://cdn-cookieyes.com/client_data/.../script.js (blocking)
5. https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs (module, blocking)
6. //js.hsforms.net/forms/v2-legacy.js (blocking)
7. //js.hsforms.net/forms/v2.js (blocking)
8. https://www.pingcap.com/core/plugins/easy-table-of-contents/.../smooth_scroll.min.js (blocking)
9. https://www.pingcap.com/core/plugins/easy-table-of-contents/.../js.cookie.min.js (blocking)
10. https://www.pingcap.com/core/plugins/easy-table-of-contents/.../jquery.sticky-kit.min.js (blocking)
11. https://www.pingcap.com/core/plugins/easy-table-of-contents/.../front.min.js (blocking)
12. https://static.pingcap.com/dist/js/master.be1e53d92c82d17b1cf1.js (1.14 MB, defer)
13. //js.hs-scripts.com/4466002.js (defer)
```

### CSS Files Loaded (Homepage)
```
1. quickcreator/quickcreatorblog-front.css (173 bytes, render-blocking)
2. ultimate-blocks/style.css (250 bytes, render-blocking)
3. easy-table-of-contents/screen.min.css (5.9 KB, render-blocking)
4. master.4c8afead26372d3acc5f.css (427 KB, render-blocking, preloaded)
5. 5 inline <style> blocks (~10 KB total)
```

### Third-Party Domains
```
cdn-cookieyes.com (consent)
js.hsforms.net (HubSpot forms)
js.hs-scripts.com (HubSpot analytics)
www.googletagmanager.com (GTM x2)
unpkg.com (dotlottie player)
static.pingcap.com (CDN - first-party equivalent)
```
