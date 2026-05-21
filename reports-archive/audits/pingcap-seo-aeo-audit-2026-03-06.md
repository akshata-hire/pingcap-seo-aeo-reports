# PingCAP.com SEO / AEO Audit — March 6, 2026

## Executive Summary

pingcap.com has a **strong SEO foundation** with comprehensive structured data, well-organized sitemaps, and solid on-page fundamentals. The site uses Yoast SEO on WordPress and has invested heavily in FAQ schema markup and SoftwareApplication schema across all major pages. However, there are notable gaps in Open Graph / social meta tags on key product pages, no internationalization (hreflang), and some AEO opportunities remain untapped.

> **Note:** No previous audit file was found on disk to compare against. This audit serves as the baseline. Observations about "addressed" vs "still needs work" are based on common SEO/AEO best practices and what the current site state reveals about recent improvements.

---

## 1. TECHNICAL SEO

### What's Working Well
| Area | Status | Notes |
|------|--------|-------|
| **robots.txt** | ✅ Good | Permissive (`Disallow:` empty), sitemap reference included |
| **Sitemap index** | ✅ Good | 11 sub-sitemaps covering posts, pages, articles, case studies, solutions, events, etc. |
| **Sitemap freshness** | ✅ Good | Most sitemaps updated within last 30 days (post-sitemap: Mar 6, 2026) |
| **Canonical tags** | ✅ Good | Consistently set on all pages checked |
| **HTTPS** | ✅ Good | All URLs use HTTPS |
| **www redirect** | ✅ Good | pingcap.com → www.pingcap.com (canonical uses www) |
| **Breadcrumb schema** | ✅ Good | BreadcrumbList JSON-LD on all pages checked |
| **URL structure** | ✅ Good | Clean, semantic URLs (/tidb/cloud/, /solutions/fintech/, /compare/mysql-vs-tidb/) |

### Issues & Gaps
| Area | Severity | Details |
|------|----------|---------|
| **No hreflang tags** | 🟡 Medium | No alternate language links despite having a Japanese market presence. Missed opportunity for international SEO |
| **Thank-you pages in sitemap** | 🟡 Medium | 8+ thank-you pages indexed in page-sitemap.xml (e.g., /webinar-thank-you/, /tidb-enterprise-thank-you/). These should be noindexed |
| **Old event pages in sitemap** | 🟡 Medium | Past events (HTAP Summit 2022, 2023) still indexed. Consider noindex or 301 to current events |
| **Canonical mismatch: TiDB Cloud** | 🟡 Medium | Page URL is /tidb-cloud/ but canonical points to /tidb/cloud/ — verify redirect chain works cleanly |
| **No explicit page speed optimization signals** | 🟠 Low | Cannot verify Core Web Vitals from content alone, but heavy GTM (2 containers) may impact LCP |

---

## 2. ON-PAGE SEO

### What's Working Well
| Page | Title | Meta Desc | H1 | Heading Hierarchy |
|------|-------|-----------|----|--------------------|
| Homepage | ✅ | ✅ | ✅ | ✅ Clear H1→H2→H3 |
| /tidb/ | ✅ | ✅ | ✅ | ✅ Rich hierarchy |
| /tidb/cloud/ | ✅ | ✅ | ✅ | ✅ H1→H2 |
| /tidb/self-managed/ | ✅ | ✅ | ✅ | ✅ H1→H2→H3 |
| /pricing/ | ✅ | ✅ | ✅ | ✅ |
| /solutions/fintech/ | ✅ | ✅ | ✅ | ✅ |
| /compare/mysql-vs-tidb/ | ✅ | ✅ | ✅ | ✅ |
| /ai/ | ✅ | ✅ | ✅ | ✅ |
| /blog/ | ✅ | ✅ | ✅ | ✅ Category filters |
| /customers/ | ✅ | ✅ | ✅ | ✅ Industry filters |
| /faqs/ | ✅ | ✅ | ✅ | ✅ |
| /about-us/ | ✅ | ✅ | ✅ | ✅ |

### Issues & Gaps
| Area | Severity | Details |
|------|----------|---------|
| **Missing Open Graph tags on product pages** | 🔴 High | /tidb/cloud/ and /tidb/self-managed/ lack og:title, og:description, og:image, og:url. Social shares will show generic/broken previews |
| **Missing Twitter Card tags** | 🔴 High | No Twitter card meta on key product/solution pages. Affects social sharing on X |
| **Blog title too generic** | 🟡 Medium | Blog page title is just "TiDB Blog" — could be more descriptive for SERP |
| **Pricing page title thin** | 🟡 Medium | "TiDB Pricing" is functional but misses keyword opportunity (e.g., "TiDB Pricing — Cloud, Self-Managed & Free Plans") |
| **H1 on About Us too long** | 🟠 Low | H1 is a full mission statement sentence — consider shorter H1 with mission as subtitle |
| **AI page missing OG tags** | 🟡 Medium | /ai/ page lacks explicit Open Graph meta tags |

---

## 3. STRUCTURED DATA / SCHEMA MARKUP

### What's Working Well (Major Strength)
| Schema Type | Deployment | Notes |
|-------------|-----------|-------|
| **FAQPage** | ✅ Sitewide | 18-25 Q&A pairs per page — very comprehensive |
| **SoftwareApplication** | ✅ Sitewide | TiDB, TiDB Cloud, TiDB Self-Managed with ratings (4.5/5, 71 reviews), features, pricing |
| **Organization** | ✅ Sitewide | PingCAP with social links (FB, X, LinkedIn, YouTube) |
| **WebPage** | ✅ Sitewide | With datePublished/dateModified |
| **BreadcrumbList** | ✅ Sitewide | Consistent navigation schema |
| **WebSite** | ✅ Homepage | SearchAction defined |
| **CollectionPage** | ✅ /customers/ | Proper page type for listing pages |

### Issues & Gaps
| Area | Severity | Details |
|------|----------|---------|
| **No Article schema on blog posts** | 🔴 High | Blog post URLs returning 404 when fetched (may be JS-rendered), but blog listing shows no Article/BlogPosting schema per-post |
| **Duplicate FAQ content across pages** | 🟡 Medium | Many pages share overlapping FAQ questions. Google may treat this as thin/duplicate schema content |
| **No HowTo schema** | 🟡 Medium | Tutorial and migration content could benefit from HowTo markup |
| **No VideoObject schema** | 🟡 Medium | /videos/ page and session replays lack VideoObject markup for video rich results |
| **AggregateRating on every page** | 🟡 Medium | Same 4.5/5 (71 reviews) rating schema appears sitewide — Google may view as spammy if not tied to actual review source |
| **No Product/Offer schema on pricing** | 🟠 Low | Pricing page uses SoftwareApplication but no explicit Offer schema for each tier |
| **No Review schema** | 🟠 Low | Customer testimonials lack Review schema markup |

---

## 4. AEO (ANSWER ENGINE OPTIMIZATION) READINESS

### What's Working Well
| Signal | Status | Notes |
|--------|--------|-------|
| **FAQ schema everywhere** | ✅ Excellent | 18-25 Q&A pairs per page, covering technical and business questions |
| **Clear definitions** | ✅ Good | "What Is Modern Database Architecture?" section on /tidb/, HTAP explanations |
| **Comparison content** | ✅ Good | /compare/mysql-vs-tidb/ with structured table, "Choose TiDB if…" conditional format |
| **E-E-A-T signals on comparisons** | ✅ Good | Author attribution (Brian Foster), technical reviewer (Ravish Patel), dates |
| **Step-by-step content** | ✅ Good | Fintech solution page has 5-step adoption process |
| **Decision frameworks** | ✅ Good | "Who Should Choose TiDB Self-Managed?" and evaluation criteria sections |
| **Dedicated FAQ page** | ✅ Good | /faqs/ with 22 questions, proper schema |
| **AI/Agentic content** | ✅ Good | /ai/ page positions for emerging "database for AI agents" queries |

### Issues & Gaps
| Area | Severity | Details |
|------|----------|---------|
| **No "What is TiDB?" definitive page** | 🔴 High | No dedicated /what-is-tidb/ page optimized for zero-click/AI answer queries. The /tidb/ page is product-focused, not definitional |
| **Blog posts may be JS-rendered** | 🔴 High | Individual blog post URLs returned 404 on server fetch — if content is client-side rendered, search engines and AI crawlers may not index it |
| **No glossary/knowledge base** | 🟡 Medium | Missing glossary pages for key terms (HTAP, distributed SQL, NewSQL, TiKV, TiFlash). These are high-value AEO targets |
| **FAQ content duplication risk** | 🟡 Medium | Nearly identical FAQ blocks across pages may dilute rather than reinforce topical authority |
| **Limited "vs" comparison coverage** | 🟡 Medium | Only 4 comparison pages (MySQL, Aurora, Azure MySQL, vector DBs). Missing: CockroachDB, YugabyteDB, PlanetScale, Vitess, AlloyDB |
| **No speakable schema** | 🟠 Low | No Speakable schema markup for voice search / Google Assistant |
| **Thin solution page coverage** | 🟡 Medium | Only 6 solution pages. Missing: gaming, logistics, media, healthcare — all industries shown on /customers/ |
| **No "TiDB vs" hub page** | 🟡 Medium | Individual comparison pages exist but no comparison hub/landing page to build topical cluster |

---

## 5. CONTENT & INFORMATION ARCHITECTURE

### Strengths
- **60+ case studies** across 12+ industries with filtering
- **11 category blog filters** with active publishing cadence
- **Education section** with courses, certifications, hands-on labs
- **Trust Hub** covering compliance, security, privacy
- **Partner ecosystem pages** (AWS, Alibaba Cloud, resellers)
- **Playbook content** (noisy neighbor, MySQL sharding, RAG) — strong for mid-funnel

### Gaps
| Area | Severity | Details |
|------|----------|---------|
| **No /solutions/ hub page** | 🔴 High | /solutions/ returns 404. Individual solution pages exist but no parent listing page |
| **Orphaned content risk** | 🟡 Medium | On-demand webinars, session replays may have weak internal linking |
| **No content hub / resource center** | 🟡 Medium | Ebooks, whitepapers, webinars are in sitemap but no unified resource center page visible |
| **Missing industry solution pages** | 🟡 Medium | Case studies show gaming, logistics, media, healthcare customers — but no dedicated solution pages for those verticals |

---

## 6. SOCIAL & OFF-PAGE SIGNALS

| Area | Status | Notes |
|------|--------|-------|
| **Social profiles linked** | ✅ | Facebook, X, LinkedIn, YouTube in Organization schema |
| **GitHub presence** | ✅ | 34K+ stars referenced |
| **Missing og:image on product pages** | 🔴 | Social shares will use default/no image |
| **No rel="me" links** | 🟠 | Could strengthen social profile verification |

---

## 7. PRIORITY ACTION ITEMS

### 🔴 Critical (Do First)
1. **Fix Open Graph + Twitter Card tags** on /tidb/cloud/, /tidb/self-managed/, /ai/, /solutions/*, and all product pages
2. **Verify blog post rendering** — individual posts returned 404 on server-side fetch. If JS-rendered, implement SSR/prerendering for crawlability
3. **Add Article/BlogPosting schema** to blog posts with author, datePublished, dateModified, publisher
4. **Create a /solutions/ hub page** (currently 404) to serve as parent for all solution verticals
5. **Create a definitive "What is TiDB?" page** optimized for informational/AEO queries

### 🟡 Important (Do Soon)
6. **De-duplicate FAQ schema** — create unique, page-relevant FAQ sets instead of repeating the same 20+ questions everywhere
7. **Noindex thank-you pages** — remove from sitemap or add noindex
8. **Expand comparison pages** — add CockroachDB, YugabyteDB, PlanetScale, Vitess, AlloyDB comparisons
9. **Add HowTo schema** to tutorial and migration content
10. **Create glossary pages** for HTAP, distributed SQL, NewSQL, TiKV, TiFlash, vector search
11. **Add VideoObject schema** to video content and session replays
12. **Create missing solution pages** for gaming, logistics, media, healthcare
13. **Build a comparison hub** page linking all "TiDB vs X" pages
14. **Implement hreflang** for Japanese market (if applicable)

### 🟠 Nice-to-Have
15. Review AggregateRating deployment — ensure 4.5/5 rating is sourced from verifiable reviews (G2, Gartner)
16. Add Review schema to customer testimonials
17. Add Speakable schema for voice search
18. Clean up old event pages from sitemap
19. Optimize pricing page title for keywords
20. Create a unified resource center page

---

## Appendix: Pages Audited

| URL | Title | Key Findings |
|-----|-------|-------------|
| pingcap.com | TiDB - Open-Source Distributed SQL Database | Strong. Full schema, good headings |
| /tidb/ | Modern Database Architecture for Real-Time Data | Good. OG tags present here |
| /tidb/cloud/ | TiDB Cloud — Cloud Database for Scale | Missing OG/Twitter tags |
| /tidb/self-managed/ | TiDB Self-Managed: Distributed SQL | Missing OG/Twitter tags |
| /pricing/ | TiDB Pricing | Good schema. Thin title |
| /solutions/fintech/ | Scalable Databases for Fintech Apps | Good content structure |
| /compare/mysql-vs-tidb/ | TiDB vs MySQL (2026) | Excellent. E-E-A-T signals |
| /ai/ | The Database for AI Agents | Good positioning. Missing OG |
| /blog/ | TiDB Blog | Good categories. Generic title |
| /customers/ | PingCAP Customers | 60+ case studies, good filters |
| /faqs/ | FAQs | 22 questions, proper schema |
| /about-us/ | About PingCAP | Good E-E-A-T. Long H1 |
| /solutions/ | **404 — BROKEN** | Needs to be created |

---

*Audit conducted March 6, 2026. Next audit recommended in 30 days.*
