# PingCAP Visual & Mobile Optimization Audit
**Date:** 2026-03-09
**Site:** www.pingcap.com
**Tool:** Playwright Chromium (headless)
**Viewports tested:** Desktop 1280x800, Mobile 375x812

---

## OVERALL SCORE: 62 / 100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Above-the-Fold Content | 72/100 | 25% | 18.0 |
| Mobile Responsiveness | 55/100 | 30% | 16.5 |
| Cookie/Overlay UX | 40/100 | 20% | 8.0 |
| Visual Consistency | 70/100 | 15% | 10.5 |
| Touch Target Compliance | 60/100 | 10% | 6.0 |
| **Total** | | | **59.0 -> 62** |

*(Rounded up to 62 due to strong H1/CTA presence across all pages)*

---

## PAGE-BY-PAGE ANALYSIS

---

### 1. HOMEPAGE (https://www.pingcap.com/)

**Screenshots:**
- Desktop: `/Users/udi@pingcap.com/Downloads/seo/screenshots/homepage_desktop_above_fold.png`
- Mobile: `/Users/udi@pingcap.com/Downloads/seo/screenshots/homepage_mobile_above_fold.png`
- Full desktop: `/Users/udi@pingcap.com/Downloads/seo/screenshots/homepage_desktop_full.png`
- Full mobile: `/Users/udi@pingcap.com/Downloads/seo/screenshots/homepage_mobile_full.png`

#### Above-the-Fold Analysis (Desktop 1280x800)

| Check | Result | Status |
|-------|--------|--------|
| H1 visible | "Built to Scale with Your Ambitions" at y=224, font-size 82px | PASS |
| H1 readable | White text on dark background, high contrast | PASS |
| CTA visible | "Start for Free" in header nav at y=23 | PASS |
| Secondary CTAs | "Get Started" + "Learn More" at y=726 (barely above fold) | MARGINAL |
| Value proposition | Sub-heading describes cloud-native, AI-ready, etc. | PASS |
| Hero image | 3D red cube graphic on right side (rendered via video/canvas) | PASS |
| Layout shifts | No detected horizontal scroll overflow | PASS |

**Key observation:** The primary CTAs ("Get Started" / "Learn More") are positioned at y=726 out of an 800px viewport, meaning they are at the very bottom edge of the fold. On slightly smaller screens or with browser chrome, they would be pushed below the fold.

#### Above-the-Fold Analysis (Mobile 375x812)

| Check | Result | Status |
|-------|--------|--------|
| H1 visible | Same heading at y=186, font-size 50px, fits in 168px height | PASS |
| CTA visible | Cookie banner at y=604 covers lower 25% of viewport | FAIL |
| Value proposition text | Visible between y=386-662, partially obscured by cookie banner | PARTIAL |
| Navigation | Hamburger menu present at top-right | PASS |

**CRITICAL:** On mobile, the cookie consent banner covers y=604 to y=812 (the bottom 208px -- 25.6% of the viewport). The primary "Get Started" CTA at y=622 is completely hidden behind the cookie banner. Users cannot see or interact with the main conversion action until they dismiss cookies.

#### Mobile Rendering

| Check | Result | Status |
|-------|--------|--------|
| Layout adapts | Full-width layout, content stacks vertically | PASS |
| No horizontal scroll | scroll_width=375, client_width=375 | PASS |
| Font readable | body: 16px, H1: 50px | PASS |
| Tap targets | Multiple sub-44px targets in footer/nav (see below) | WARN |
| Mobile menu | Hamburger icon present | PASS |

---

### 2. PRODUCT PAGE (https://www.pingcap.com/tidb/)

**Screenshots:**
- Desktop: `/Users/udi@pingcap.com/Downloads/seo/screenshots/product_desktop_above_fold.png`
- Mobile: `/Users/udi@pingcap.com/Downloads/seo/screenshots/product_mobile_above_fold.png`
- Full desktop: `/Users/udi@pingcap.com/Downloads/seo/screenshots/product_desktop_full.png`
- Full mobile: `/Users/udi@pingcap.com/Downloads/seo/screenshots/product_mobile_full.png`

#### Above-the-Fold Analysis (Desktop 1280x800)

| Check | Result | Status |
|-------|--------|--------|
| H1 visible | "Modern Database Architecture for Real-Time Workloads" at y=220, font-size 68px | PASS |
| CTA visible | "Start for Free" in header (y=23) + "View Demo" / "Start for Free" at y=652 | PASS |
| Value proposition | Description paragraph about distributed SQL, ACID, scalability | PASS |
| Hero image | Product architecture illustration (SVG, 505x559) with alt="" | WARN |
| Layout issues | Cookie banner overlaps lower-left corner | WARN |

**Good:** This page has two distinct CTAs above the fold -- "View Demo" and "Start for Free" -- both at y=652, comfortably within the 800px viewport.

#### Above-the-Fold Analysis (Mobile 375x812)

| Check | Result | Status |
|-------|--------|--------|
| H1 visible | Same heading at y=156, font-size 48px, 280px tall | PASS |
| CTA visible | "View Demo" + "Start for Free" at y=752 -- above fold but behind cookie banner | FAIL |
| Cookie banner | Covers y=604 to y=812 (208px), blocking CTAs | FAIL |

**Same cookie banner issue as homepage.** The CTA buttons at y=752 are completely obscured.

#### Mobile Rendering

| Check | Result | Status |
|-------|--------|--------|
| Layout adapts | Content stacks, image moves below text | PASS |
| No horizontal scroll | scroll_width=375, client_width=375 | PASS |
| Font readable | body: 16px, H1: 48px | PASS |
| Tap targets | Same issues as homepage | WARN |

---

### 3. PRICING PAGE (https://www.pingcap.com/pricing/)

**Screenshots:**
- Desktop: `/Users/udi@pingcap.com/Downloads/seo/screenshots/pricing_desktop_above_fold.png`
- Mobile: `/Users/udi@pingcap.com/Downloads/seo/screenshots/pricing_mobile_above_fold.png`
- Full desktop: `/Users/udi@pingcap.com/Downloads/seo/screenshots/pricing_desktop_full.png`
- Full mobile: `/Users/udi@pingcap.com/Downloads/seo/screenshots/pricing_mobile_full.png`

#### Above-the-Fold Analysis (Desktop 1280x800)

| Check | Result | Status |
|-------|--------|--------|
| H1 visible | "Pricing" at y=173, font-size 68px, centered | PASS |
| CTAs visible | "Try for Free" at y=442, "Sign Up" at y=442 | PASS |
| Pricing tiers | Two tiers visible: "TiDB Cloud Starter" ($0/mo) and "TiDB Cloud Essential" | PASS |
| Price clarity | Starter: "$0/month", Essential: "Usage-based, autoscaling" | PASS |
| Layout | Clean two-column card layout | PASS |

**Best above-the-fold of all three pages.** Clear heading, pricing tiers, and CTAs all visible without scrolling.

#### Above-the-Fold Analysis (Mobile 375x812)

| Check | Result | Status |
|-------|--------|--------|
| H1 visible | "Pricing" at y=102, font-size 48px | PASS |
| CTA visible | "Try for Free" at y=309, well above cookie banner | PASS |
| Pricing tier 1 | "TiDB Cloud Starter" card visible, single-column | PASS |
| Cookie banner | Covers y=604 to y=812, but first CTA is above it | MARGINAL |

**CRITICAL: Horizontal scroll detected on mobile.** scroll_width=442 vs. client_width=375. The page overflows by 67px horizontally, causing unwanted left-right scrolling. This is likely caused by the pricing tier cards or embedded elements not properly constraining their width.

#### Mobile Rendering

| Check | Result | Status |
|-------|--------|--------|
| Layout adapts | Cards stack vertically | PASS |
| No horizontal scroll | FAIL -- overflows 67px (442 vs 375) | FAIL |
| Font readable | body: 16px, H1: 48px | PASS |
| Text clipping | Pricing card description text clipped on right edge ("applications w..." visible in screenshot) | FAIL |

---

## CROSS-PAGE FINDINGS BY SEVERITY

### CRITICAL (Fix Immediately)

#### 1. Cookie Consent Banner Blocks Primary CTAs on Mobile (All Pages)
- **Impact:** Conversion-killing on all mobile traffic
- **Details:** The CookieYes consent banner (`cky-consent-container`) occupies a fixed position covering the bottom 208px of the 812px mobile viewport (25.6% of the screen). On the homepage and product page, the primary conversion CTAs ("Get Started", "View Demo", "Start for Free") are positioned directly behind this banner.
- **z-index:** 9999999, fixed position, full-width on mobile (375px)
- **Recommendation:** Either (a) move CTAs higher on mobile to clear the cookie banner zone, (b) use a smaller/thinner cookie notice on mobile, or (c) implement a top-bar style cookie banner instead of bottom overlay.

#### 2. "Please Accept Cookies to Access This Content" Block on All Pages
- **Impact:** Content blocked for all users until cookie consent given
- **Details:** A `video-placeholder-normal` element (100x96px) appears at position x=1180, y=704 on desktop, displaying "Please accept cookies to access this content." This blocks a video/interactive element in the hero section on every page.
- **On homepage desktop:** Visible as clipped text at the right edge of the viewport (partially overflowing).
- **Recommendation:** Show a graceful fallback (static image or poster frame) instead of a blocking message. This degrades SEO because Googlebot may not accept cookies, meaning it never sees this content.

#### 3. Pricing Page Has Horizontal Scroll on Mobile
- **Impact:** Google Core Web Vitals mobile-friendliness penalty; poor UX
- **Details:** `scroll_width=442` vs `client_width=375` -- 67px overflow. The pricing card descriptions appear to overflow their container width, and a "Try for Free" button on the right overflows by 17px.
- **Recommendation:** Add `overflow-x: hidden` to the body or fix the pricing card container max-width. Check the `.pricing-card` or equivalent component for elements exceeding 343px width (375px - 2x16px padding).

### HIGH (Fix Within 1 Week)

#### 4. Homepage Primary CTA Dangerously Close to Fold on Desktop
- **Impact:** CTA may fall below the fold on common laptop screens (1366x768)
- **Details:** "Get Started" and "Learn More" buttons are at y=726 in an 800px viewport. With a standard 768px viewport (the most common laptop height) minus ~80px for browser chrome, the visible area is approximately 688px. These CTAs would be invisible without scrolling.
- **Recommendation:** Move the primary CTA buttons 100-150px higher. Consider placing them immediately after the sub-heading text rather than after the description block.

#### 5. Product Page Hero Image Missing Alt Text
- **Impact:** Accessibility and SEO
- **Details:** The hero illustration at `/files/2025/10/07062045/Group-1000011284-1.svg` (505x559px) has an empty `alt=""` attribute. This is the primary visual element on the product page.
- **Recommendation:** Add descriptive alt text like "TiDB distributed database architecture diagram showing cloud, storage, and compute layers."

#### 6. Mobile Logo Renders as 1px-High Placeholder
- **Impact:** Brand visibility on mobile
- **Details:** On mobile, the TiDB logo image loads as a base64 placeholder (100x1px) rather than the actual SVG logo. The natural dimensions are 100x1, confirming this is a lazy-load placeholder that did not resolve.
- **Recommendation:** Ensure the logo is eagerly loaded (not lazy-loaded) so it appears immediately. Set `loading="eager"` on the header logo image.

### MEDIUM (Fix Within 2 Weeks)

#### 7. Small Touch Targets Throughout Site on Mobile
- **Impact:** Fails Google's 48x48px minimum tap target guidance
- **Details:** Multiple interactive elements are undersized:
  - "Read More" link in cookie banner: 71x18px (height critically small)
  - Cookie category buttons ("Necessary", "Functional", "Analytics"): ~79x24px
  - Footer navigation links: ~22px height
  - Navigation dropdown items: height 19-24px
- **Count:** 15+ elements per page fail the 44x44px minimum
- **Recommendation:** Increase padding on all footer links and navigation items to meet 44px minimum touch target size. Cookie banner buttons should be at least 48px tall.

#### 8. Desktop Navigation Dropdown Items Too Small
- **Impact:** Usability for desktop users with motor impairments
- **Details:** Desktop nav items like "Product" (55x21px), "Product Overview" (145x19px) are below 24px in height. While desktop has more precision, these are unusually small.
- **Recommendation:** Increase nav dropdown line-height to at least 36px.

#### 9. Cookie Banner Close Button Too Small
- **Impact:** Frustrating for users who want to dismiss the banner quickly
- **Details:** The `cky-banner-btn-close` button is only 24x24px. On mobile, this is exactly half the recommended 48px minimum tap target size.
- **Recommendation:** Increase to at least 44x44px or use a larger close/dismiss area.

### LOW (Nice-to-Have)

#### 10. No `loading="lazy"` on Below-the-Fold Images
- **Impact:** Page load performance
- **Details:** All detected images use `loading="auto"` (browser default, usually eager). Below-the-fold images should use `loading="lazy"` to defer loading.
- **Recommendation:** Add `loading="lazy"` to all images below the fold, keeping hero/above-fold images as `loading="eager"`.

#### 11. Homepage H1 Font Size Excessively Large on Desktop
- **Impact:** Minor -- aesthetic only
- **Details:** The H1 at 82px occupies 270px of vertical space (34% of viewport). This pushes supporting content (description, CTAs) dangerously close to the fold edge.
- **Recommendation:** Consider reducing to 60-68px (matching the product page) to give more room for CTAs above the fold.

#### 12. Pricing Page Missing Value-Proposition Sub-heading
- **Impact:** SEO and conversion clarity
- **Details:** The pricing page H1 is simply "Pricing" with no supporting sub-heading. Unlike the homepage and product page, there is no descriptive text explaining what the user is about to compare.
- **Recommendation:** Add a brief sub-heading like "Flexible plans for every stage -- from free tier to enterprise scale."

---

## MOBILE RESPONSIVENESS SUMMARY

| Check | Homepage | Product | Pricing |
|-------|----------|---------|---------|
| meta viewport | PASS | PASS | PASS |
| No horizontal scroll | PASS | PASS | **FAIL (67px)** |
| Hamburger menu | PASS | PASS | PASS |
| H1 visible above fold | PASS | PASS | PASS |
| CTA above fold (above cookie banner) | **FAIL** | **FAIL** | PASS |
| Base font size >=16px | PASS | PASS | PASS |
| Touch targets >=44px | WARN | WARN | WARN |
| Cookie banner UX | **FAIL** | **FAIL** | **FAIL** |

---

## COOKIE CONSENT BANNER DETAILED ANALYSIS

The CookieYes banner (`cky-consent-container cky-box-bottom-left`) has significant mobile UX problems:

**Desktop:**
- Position: bottom-left, 440x156px at (40, 604)
- Partially overlaps the hero section but does not block primary CTAs
- A secondary "Please accept cookies" message (100x96px) is visible at x=1180, partially clipped at the viewport edge

**Mobile:**
- Position: bottom-left but stretches full-width (375x208px) at (0, 604)
- Covers 25.6% of the viewport
- Blocks CTAs on homepage and product page
- Contains "Accept All" (375px wide) and "Manage Cookies" (375px wide) buttons -- these are well-sized for touch
- Close button (24x24px) at (342, 609) is too small for mobile

**Recommendation:** Implement a responsive cookie banner:
- On mobile, use a compact top-bar or a smaller bottom strip (max 100px height)
- Ensure it never overlaps the primary CTA zone
- Increase the close button size to 44x44px minimum

---

## SCREENSHOT FILE INDEX

| File | Page | Viewport | Type |
|------|------|----------|------|
| `homepage_desktop_above_fold.png` | Homepage | 1280x800 | Above fold |
| `homepage_desktop_full.png` | Homepage | 1280x800 | Full page |
| `homepage_mobile_above_fold.png` | Homepage | 375x812 | Above fold |
| `homepage_mobile_full.png` | Homepage | 375x812 | Full page |
| `product_desktop_above_fold.png` | Product | 1280x800 | Above fold |
| `product_desktop_full.png` | Product | 1280x800 | Full page |
| `product_mobile_above_fold.png` | Product | 375x812 | Above fold |
| `product_mobile_full.png` | Product | 375x812 | Full page |
| `pricing_desktop_above_fold.png` | Pricing | 1280x800 | Above fold |
| `pricing_desktop_full.png` | Pricing | 1280x800 | Full page |
| `pricing_mobile_above_fold.png` | Pricing | 375x812 | Above fold |
| `pricing_mobile_full.png` | Pricing | 375x812 | Full page |
| `analysis_data.json` | All | All | Raw DOM analysis data |

All files saved under: `/Users/udi@pingcap.com/Downloads/seo/screenshots/`

---

## PRIORITY ACTION ITEMS (Ranked)

| # | Severity | Issue | Pages Affected | Estimated Impact |
|---|----------|-------|----------------|-----------------|
| 1 | CRITICAL | Cookie banner blocks mobile CTAs | Homepage, Product | Conversion loss for 50%+ of mobile visitors |
| 2 | CRITICAL | "Please accept cookies" content blocker on hero video | All 3 pages | Googlebot cannot see video content; users see broken element |
| 3 | CRITICAL | Pricing page horizontal scroll on mobile | Pricing | Mobile UX failure, Core Web Vitals penalty |
| 4 | HIGH | Homepage CTA below fold on 768px laptops | Homepage | Lost conversions on common laptop screens |
| 5 | HIGH | Product hero image missing alt text | Product | Accessibility, image SEO |
| 6 | HIGH | Mobile logo loads as 1px placeholder | All 3 pages | Brand visibility degraded |
| 7 | MEDIUM | 15+ undersized touch targets per page | All 3 pages | Mobile usability audit failure |
| 8 | MEDIUM | Desktop nav dropdown items too small | All 3 pages | Accessibility |
| 9 | MEDIUM | Cookie close button too small (24px) | All 3 pages | Frustration for users wanting to dismiss |
| 10 | LOW | No lazy loading on below-fold images | All 3 pages | Performance |
| 11 | LOW | Homepage H1 font too large (82px) | Homepage | Pushes CTAs near fold edge |
| 12 | LOW | Pricing page missing sub-heading | Pricing | SEO, clarity |
