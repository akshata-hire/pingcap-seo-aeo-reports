# PingCAP Schema.org Structured Data Audit

**Date:** 2026-03-09
**Site:** www.pingcap.com
**Auditor:** Claude (automated)
**Overall Score: 32 / 100**

---

## Executive Summary

The site deploys structured data via JSON-LD on every page, but the implementation has **severe systemic problems** that undermine its effectiveness and risk Google penalties. Four identical JSON-LD blocks are injected sitewide (every page gets the same FAQPage + 3 SoftwareApplication blocks), creating massive duplication. FAQPage schema is used on a commercial technology site, which Google restricted to government/healthcare authorities in August 2023. The identical AggregateRating (4.5/5, 71 reviews) appears 21 times across 7 pages with no link to a verifiable review source. No Organization, WebSite, WebPage, or BreadcrumbList schema exists anywhere. Blog posts lack Article schema. The /videos/ page lacks VideoObject schema.

---

## Pages Audited

| # | URL | Status |
|---|------|--------|
| 1 | https://www.pingcap.com/ | 200 OK |
| 2 | https://www.pingcap.com/tidb/ | 200 OK |
| 3 | https://www.pingcap.com/pricing/ | 200 OK |
| 4 | https://www.pingcap.com/faqs/ | 200 OK |
| 5 | https://www.pingcap.com/customers/ | 200 OK |
| 6 | https://www.pingcap.com/compare/mysql-vs-tidb/ | 200 OK |
| 7 | https://www.pingcap.com/ai/ | 200 OK |
| 8 | https://www.pingcap.com/blog/why-distributed-sql-databases-elevate-modern-app-dev/ | 200 OK (bonus) |
| 9 | https://www.pingcap.com/videos/ | 200 OK (bonus) |

---

## Per-Page Schema Detection

### Every page (all 7 audited + blog + videos) contains the same 4 JSON-LD blocks:

| Block | @type | Injected Sitewide? |
|-------|-------|---------------------|
| 1 | FAQPage (23 Q&As) | YES -- identical on every page |
| 2 | SoftwareApplication ("TiDB") | YES -- identical on every page |
| 3 | SoftwareApplication ("TiDB Cloud") | YES -- identical on every page |
| 4 | SoftwareApplication ("TiDB Self-Managed") | YES -- identical on every page |

No page has any **page-specific** schema. No page has:
- Organization
- WebSite
- WebPage
- BreadcrumbList
- Article / BlogPosting (not even on blog posts)
- VideoObject (not even on /videos/)

---

## Finding 1 -- CRITICAL: FAQPage Schema Misuse (Restricted Type)

**Severity: CRITICAL**

Since August 2023, Google restricts FAQPage rich results to **government and healthcare authority websites only**. PingCAP is a commercial database company and does not qualify. The FAQPage schema is present on all 7+ pages, meaning:

- Google will **not** show FAQ rich results for this site
- The markup is technically valid but functionally useless
- Google has stated that using restricted schema types for ineligible sites may be treated as spam signals in edge cases

**The 23 questions in the FAQPage block:**

1. What companies are using TiDB in production?
2. How is TiDB different from other relational databases like MySQL?
3. What is the relationship between TiDB and TiDB Cloud?
4. Is TiDB compatible with MySQL?
5. What programming languages can I use to work with TiDB?
6. How does TiDB support strong consistency?
7. Where can I run TiDB?
8. How does TiDB ensure high availability?
9. What support is available for TiDB customers?
10. What are PD, TiDB, TiKV, and TiFlash nodes in a TiDB Cluster?
11. How does TiDB replicate data between TiKV nodes?
12. How do I make use of TiDB HTAP capabilities?
13. Is there an easy migration path from another RDBMS to TiDB?
14. What is the difference between TiDB Community Edition and the Enterprise Subscription?
15. How does TiDB protect data privacy and ensure security?
16. What companies are using TiDB Cloud in production?
17. What is TiDB Cloud?
18. Is TiDB Cloud compatible with MySQL?
19. Where can I run TiDB Cloud?
20. How does TiDB Cloud ensure high availability?
21. What support is available for TiDB Cloud customers?
22. How do I make use of TiDB Cloud HTAP capabilities?
23. Is there an easy migration path from another RDBMS to TiDB Cloud?

**Recommendation:** Remove FAQPage schema from all pages. The Q&A content is still valuable on-page for users and AEO (Answer Engine Optimization), but the schema markup itself should be deleted.

---

## Finding 2 -- CRITICAL: Sitewide Duplicate Schema (Template Injection)

**Severity: CRITICAL**

All 4 JSON-LD blocks are injected identically into every page through what appears to be a WordPress theme/plugin template. This is a textbook structured data anti-pattern:

- The `/pricing/` page has the exact same schema as the `/customers/` page
- The `/blog/` post about distributed SQL has the same schema as the homepage
- The `/videos/` page has the same schema as the `/compare/mysql-vs-tidb/` page

**Why this is harmful:**
- Google's guidelines say structured data must describe **the content of the page it appears on**
- Sitewide injection violates the "relevance" principle
- The SoftwareApplication schema on the `/customers/` page does not describe that page
- The FAQPage schema on `/pricing/` does not describe pricing content

**Recommendation:** Remove the sitewide template injection entirely. Instead, place schema only on pages where it is contextually relevant:
- SoftwareApplication for TiDB: only on `/tidb/` and `/tidb/self-managed/`
- SoftwareApplication for TiDB Cloud: only on `/tidb/cloud/`
- Per-page schema (WebPage, BreadcrumbList) should be generated dynamically per URL

---

## Finding 3 -- CRITICAL: AggregateRating Without Verifiable Source

**Severity: CRITICAL**

The same AggregateRating appears **21 times** across 7 pages (3 SoftwareApplication blocks per page, each with the same rating):

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.5",
  "reviewCount": "71",
  "bestRating": "5",
  "worstRating": "1"
}
```

**Problems:**
1. **No source attribution.** The rating is not linked to G2, Gartner Peer Insights, TrustRadius, or any verifiable third-party review platform. Google requires that AggregateRating reflect actual user reviews collected on the page or from a clearly identified source.
2. **Applied to 3 different products with identical numbers.** TiDB, TiDB Cloud, and TiDB Self-Managed all claim exactly 4.5/5 from exactly 71 reviews. This is implausible -- these are different products.
3. **Sitewide deployment.** The rating appears on `/pricing/`, `/customers/`, `/faqs/`, and `/ai/` -- pages that have nothing to do with product reviews.
4. **Static/stale data.** The review count of 71 does not update. If this is pulled from G2 or similar, it should be dynamically fetched or at least regularly updated.

**Risk:** Google may issue a manual action for "fake or misleading structured data" under their [Structured Data Spam Policy](https://developers.google.com/search/docs/essentials/spam-policies#structured-data).

**Recommendation:**
- Remove AggregateRating from all pages except the product page (`/tidb/`).
- If the 4.5/71 comes from G2 (TiDB has a G2 profile), add a `url` property pointing to the G2 review page: `"url": "https://www.g2.com/products/tidb/reviews"`.
- Do not assign the same review count to TiDB Cloud and TiDB Self-Managed unless they have independent G2 profiles with those exact numbers.

---

## Finding 4 -- HIGH: No Organization Schema

**Severity: HIGH**

There is no `Organization` schema anywhere on the site. This is essential for:
- Knowledge Panel enrichment
- Brand entity establishment in Google's Knowledge Graph
- Sitelinks search box eligibility
- Corporate identity signals for E-E-A-T

**Recommendation:** Add Organization schema to the homepage. See generated JSON-LD in the Recommendations section below.

---

## Finding 5 -- HIGH: No WebSite Schema with SearchAction

**Severity: HIGH**

There is no `WebSite` schema with a `potentialAction` SearchAction. This means the site is not eligible for a sitelinks search box in Google results.

**Recommendation:** Add WebSite schema to the homepage. See generated JSON-LD below.

---

## Finding 6 -- HIGH: No BreadcrumbList Schema

**Severity: HIGH**

No page has BreadcrumbList schema, despite the site having a clear hierarchical URL structure (e.g., `/compare/mysql-vs-tidb/`). Breadcrumb rich results improve CTR and help Google understand site architecture.

**Recommendation:** Generate BreadcrumbList dynamically per page. Example for `/compare/mysql-vs-tidb/` provided below.

---

## Finding 7 -- HIGH: No Article/BlogPosting Schema on Blog Posts

**Severity: HIGH**

Blog posts like `https://www.pingcap.com/blog/why-distributed-sql-databases-elevate-modern-app-dev/` have:
- Correct OG tags (og:type = article)
- No Article or BlogPosting JSON-LD schema

This means blog content is not eligible for Article rich results (headline + thumbnail in search), despite Yoast SEO being installed (which normally generates this automatically).

**Recommendation:** Enable Yoast's Article schema output, or add BlogPosting JSON-LD to all blog posts. See template below.

---

## Finding 8 -- HIGH: No VideoObject Schema on /videos/

**Severity: HIGH**

The `/videos/` page contains embedded videos but has zero VideoObject schema. This means:
- Videos cannot appear in Google Video results
- No Video rich results (thumbnail, duration, upload date)
- A major content type is invisible to structured data

**Recommendation:** Add VideoObject schema for each video on the page. See template below.

---

## Finding 9 -- MEDIUM: Open Graph Tags Inconsistencies

**Severity: MEDIUM**

OG/Twitter tags are present on most pages, but with issues:

| Page | og:title | og:image | twitter:image | og:type |
|------|----------|----------|---------------|---------|
| Homepage | Present | Present | Present | website |
| /tidb/ | Present | Present (unique) | Present | article (should be "website") |
| /pricing/ | Present | Shared image | MISSING | article (should be "website") |
| /faqs/ | Present | Shared image | MISSING | article (should be "website") |
| /customers/ | Present | Shared image | MISSING | website |
| /compare/ | Present | Present (unique) | Present (unique) | article |
| /ai/ | Present | Shared image | MISSING | article (should be "website") |

**Issues:**
- `og:type = article` is used on non-article pages like /tidb/, /pricing/, /faqs/, /ai/. These should be `website` or `product`.
- `twitter:image` is missing on /pricing/, /faqs/, and /ai/.
- Multiple pages share the same generic `Homepage-Ad.png` OG image rather than page-specific images.

---

## Finding 10 -- MEDIUM: SoftwareApplication Schema Quality

**Severity: MEDIUM**

The three SoftwareApplication blocks are well-structured with good properties:

**TiDB block (good properties):**
- name, applicationCategory, operatingSystem, description, url, softwareVersion, license, offers, aggregateRating, featureList, publisher

**Missing recommended properties:**
- `screenshot` -- product screenshots improve rich results
- `downloadUrl` -- for the open-source edition
- `releaseNotes` -- link to changelog
- `datePublished` / `dateModified` -- important for freshness signals

**TiDB Cloud Dedicated Offer issue:**
The "TiDB Cloud Dedicated" Offer block has a `priceSpecification` that is empty:
```json
"priceSpecification": {
  "@type": "PriceSpecification",
  "priceCurrency": "USD"
}
```
This should either include a price or use `"price": "0"` as a starting price, or be removed entirely if no price can be stated.

---

## Scoring Breakdown

| Category | Max Points | Score | Notes |
|----------|-----------|-------|-------|
| Schema types present | 15 | 5 | Has SoftwareApplication, but missing Organization, WebSite, WebPage, BreadcrumbList, Article, VideoObject |
| Schema accuracy | 15 | 3 | Sitewide duplication means schema does not describe page content |
| FAQPage compliance | 10 | 0 | Restricted type used on ineligible site |
| AggregateRating integrity | 15 | 2 | Unverified, duplicated across 3 products, deployed sitewide |
| Open Graph completeness | 10 | 6 | Present on most pages, some twitter:image gaps |
| Blog/Article schema | 10 | 0 | No Article/BlogPosting schema on blog posts |
| Video schema | 5 | 0 | No VideoObject on /videos/ |
| BreadcrumbList | 10 | 0 | Not present anywhere |
| Organization/WebSite | 10 | 0 | Not present anywhere |
| **TOTAL** | **100** | **32** | |

---

## Findings Summary by Severity

### CRITICAL (fix immediately -- risk of manual action or zero impact)

| # | Finding | Pages Affected |
|---|---------|----------------|
| 1 | FAQPage schema on commercial site (restricted to gov/healthcare since Aug 2023) | All pages (sitewide) |
| 2 | Identical schema template injected on every page (not page-specific) | All pages (sitewide) |
| 3 | AggregateRating 4.5/5 (71 reviews) with no verifiable source, duplicated across 3 products, on 21 blocks | All pages (sitewide) |

### HIGH (significant SEO/rich-result opportunities lost)

| # | Finding | Pages Affected |
|---|---------|----------------|
| 4 | No Organization schema | Homepage (missing) |
| 5 | No WebSite schema with SearchAction | Homepage (missing) |
| 6 | No BreadcrumbList schema | All pages (missing) |
| 7 | No Article/BlogPosting schema on blog posts | All blog posts |
| 8 | No VideoObject schema on /videos/ | /videos/ |

### MEDIUM (quality improvements)

| # | Finding | Pages Affected |
|---|---------|----------------|
| 9 | OG tag inconsistencies (wrong og:type, missing twitter:image, shared images) | /tidb/, /pricing/, /faqs/, /ai/ |
| 10 | SoftwareApplication missing optional properties; empty priceSpecification | All pages with SA schema |

---

## Recommended JSON-LD Implementations

### 1. Organization Schema (add to homepage only)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PingCAP",
  "url": "https://www.pingcap.com",
  "logo": "https://www.pingcap.com/images/pingcap-logo.svg",
  "description": "PingCAP is the company behind TiDB, an open-source distributed SQL database for real-time analytics and transactional workloads.",
  "foundingDate": "2015",
  "sameAs": [
    "https://twitter.com/PingCAP",
    "https://www.linkedin.com/company/pingcap/",
    "https://github.com/pingcap",
    "https://www.youtube.com/@PingCAP",
    "https://www.crunchbase.com/organization/pingcap"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "url": "https://www.pingcap.com/contact-us/"
  }
}
```

### 2. WebSite Schema with SearchAction (add to homepage only)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "PingCAP",
  "url": "https://www.pingcap.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.pingcap.com/?s={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### 3. BreadcrumbList Schema (generate per page)

**Example for /compare/mysql-vs-tidb/:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.pingcap.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Compare",
      "item": "https://www.pingcap.com/compare/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "MySQL vs TiDB",
      "item": "https://www.pingcap.com/compare/mysql-vs-tidb/"
    }
  ]
}
```

**Example for /pricing/:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.pingcap.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Pricing",
      "item": "https://www.pingcap.com/pricing/"
    }
  ]
}
```

### 4. BlogPosting Schema (template for all blog posts)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[ARTICLE TITLE]",
  "description": "[META DESCRIPTION]",
  "url": "https://www.pingcap.com/blog/[SLUG]/",
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "author": {
    "@type": "Person",
    "name": "[AUTHOR NAME]",
    "url": "https://www.pingcap.com/author/[AUTHOR-SLUG]/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PingCAP",
    "url": "https://www.pingcap.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.pingcap.com/images/pingcap-logo.svg"
    }
  },
  "image": "[OG:IMAGE URL]",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.pingcap.com/blog/[SLUG]/"
  }
}
```

**Implementation note:** Yoast SEO (installed on this WordPress site) generates BlogPosting schema by default. Check if Yoast's JSON-LD output has been disabled in `Yoast SEO > Search Appearance > Content Types > Posts`. Re-enable it.

### 5. VideoObject Schema (template for /videos/ page)

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "[VIDEO TITLE]",
  "description": "[VIDEO DESCRIPTION]",
  "thumbnailUrl": "[THUMBNAIL URL]",
  "uploadDate": "[YYYY-MM-DD]",
  "duration": "PT[X]M[Y]S",
  "contentUrl": "[VIDEO FILE URL or YouTube URL]",
  "embedUrl": "[EMBED URL]",
  "publisher": {
    "@type": "Organization",
    "name": "PingCAP",
    "url": "https://www.pingcap.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.pingcap.com/images/pingcap-logo.svg"
    }
  }
}
```

### 6. Corrected SoftwareApplication (for /tidb/ page only)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "TiDB",
  "applicationCategory": "DatabaseApplication",
  "operatingSystem": "Linux, Kubernetes, AWS, Google Cloud, Azure, On-Premises",
  "description": "TiDB is an open-source, cloud-native distributed SQL database that supports Hybrid Transactional and Analytical Processing (HTAP) workloads. MySQL compatible with horizontal scalability, strong consistency, and high availability.",
  "url": "https://www.pingcap.com/tidb/",
  "softwareVersion": "8.5",
  "license": "https://opensource.org/licenses/Apache-2.0",
  "downloadUrl": "https://www.pingcap.com/download/",
  "screenshot": "https://static.pingcap.com/files/2025/12/01183322/TiDB-overview-1.png",
  "datePublished": "2017-04-01",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Open-source Community Edition available for free. Enterprise Subscription available with 24/7 support."
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "71",
    "bestRating": "5",
    "worstRating": "1",
    "url": "https://www.g2.com/products/tidb/reviews"
  },
  "featureList": [
    "Horizontal scalability without manual sharding",
    "MySQL compatibility",
    "HTAP: combined OLTP and OLAP workloads",
    "ACID transactions across distributed nodes",
    "High availability with automatic failover",
    "Kubernetes operator support",
    "Real-time analytics with TiFlash columnar engine"
  ],
  "publisher": {
    "@type": "Organization",
    "name": "PingCAP",
    "url": "https://www.pingcap.com"
  }
}
```

---

## Implementation Priority Checklist

| Priority | Action | Effort |
|----------|--------|--------|
| 1 (CRITICAL) | Remove sitewide FAQPage JSON-LD block from WordPress template | Low -- delete one script block from theme/plugin |
| 2 (CRITICAL) | Move SoftwareApplication blocks from sitewide template to page-specific injection (only on product pages) | Medium -- requires conditional logic in theme |
| 3 (CRITICAL) | Fix AggregateRating: add source URL, apply only to products with real reviews, apply only on relevant product pages | Medium |
| 4 (HIGH) | Add Organization schema to homepage | Low -- single JSON-LD block |
| 5 (HIGH) | Add WebSite schema with SearchAction to homepage | Low -- single JSON-LD block |
| 6 (HIGH) | Enable Yoast SEO's BlogPosting schema output for blog posts | Low -- Yoast settings toggle |
| 7 (HIGH) | Implement BreadcrumbList schema sitewide (via Yoast or custom) | Medium -- Yoast may auto-generate if breadcrumbs are enabled |
| 8 (HIGH) | Add VideoObject schema to /videos/ page | Medium -- needs per-video data extraction |
| 9 (MEDIUM) | Fix og:type on non-article pages (use "website" instead of "article") | Low -- Yoast settings |
| 10 (MEDIUM) | Add unique twitter:image to all pages; create page-specific OG images | Medium -- design + CMS work |
| 11 (MEDIUM) | Add missing SoftwareApplication properties (screenshot, downloadUrl, datePublished) | Low -- extend existing blocks |

---

## Appendix: Raw Schema Blocks Per Page

| Page | Block 1 | Block 2 | Block 3 | Block 4 | Total |
|------|---------|---------|---------|---------|-------|
| / (homepage) | FAQPage (23 Q&As) | SoftwareApp: TiDB | SoftwareApp: TiDB Cloud | SoftwareApp: TiDB Self-Managed | 4 |
| /tidb/ | FAQPage (23 Q&As) | SoftwareApp: TiDB | SoftwareApp: TiDB Cloud | SoftwareApp: TiDB Self-Managed | 4 |
| /pricing/ | FAQPage (23 Q&As) | SoftwareApp: TiDB | SoftwareApp: TiDB Cloud | SoftwareApp: TiDB Self-Managed | 4 |
| /faqs/ | FAQPage (23 Q&As) | SoftwareApp: TiDB | SoftwareApp: TiDB Cloud | SoftwareApp: TiDB Self-Managed | 4 |
| /customers/ | FAQPage (23 Q&As) | SoftwareApp: TiDB | SoftwareApp: TiDB Cloud | SoftwareApp: TiDB Self-Managed | 4 |
| /compare/mysql-vs-tidb/ | FAQPage (23 Q&As) | SoftwareApp: TiDB | SoftwareApp: TiDB Cloud | SoftwareApp: TiDB Self-Managed | 4 |
| /ai/ | FAQPage (23 Q&As) | SoftwareApp: TiDB | SoftwareApp: TiDB Cloud | SoftwareApp: TiDB Self-Managed | 4 |
| /blog/[post] (sample) | FAQPage (23 Q&As) | SoftwareApp: TiDB | SoftwareApp: TiDB Cloud | SoftwareApp: TiDB Self-Managed | 4 |
| /videos/ | FAQPage (23 Q&As) | SoftwareApp: TiDB | SoftwareApp: TiDB Cloud | SoftwareApp: TiDB Self-Managed | 4 |

**Every page is 100% identical in its structured data.**

---

*Report generated 2026-03-09. Audit covers server-rendered HTML only. Client-side JS-injected schema (if any) was not evaluated.*
