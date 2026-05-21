# PingCAP Content Quality and E-E-A-T Audit
**Date:** 2026-03-09
**Site:** www.pingcap.com
**Analyst model:** Claude Opus 4.6 (Content Quality specialist)
**Framework:** Google September 2025 Quality Rater Guidelines

---

## Overall Content Quality Score: 62/100

The site demonstrates strong technical expertise and good structured data implementation but has critical E-E-A-T gaps: duplicate FAQ schema sitewide, no dedicated definitional page, thin author attribution, and missing glossary content that would strengthen AI citation readiness.

---

## E-E-A-T Aggregate Scores

| Factor | Weight | Score (0-100) | Weighted |
|--------|--------|---------------|----------|
| Experience | 20% | 48 | 9.6 |
| Expertise | 25% | 72 | 18.0 |
| Authoritativeness | 25% | 65 | 16.25 |
| Trustworthiness | 30% | 68 | 20.4 |
| **Weighted Total** | | | **64.25** |

---

## Page-by-Page Analysis

### 1. Homepage (https://www.pingcap.com/)

**Content Quality Score: 67/100**

| Metric | Value | Assessment |
|--------|-------|------------|
| Word count | ~1,179 | PASS (min 500) |
| H1 | 1 ("Built to Scale with Your Ambitions") | Good - single H1 |
| H2 | 7 | Good heading hierarchy |
| H3 | 16 | Good content structure |
| Tables | 0 | Missed opportunity for feature comparison |
| Images | 29 (27 with alt text) | Good |
| OG tags | Complete | Good |
| Twitter card | Present | Good |
| Canonical | Set correctly | Good |

**E-E-A-T Assessment:**
- **Experience (45/100):** Customer logos present (LinkedIn, Pinterest, Shopee, Square), but no customer quotes or metrics visible on the homepage itself. Testimonial elements are referenced in CSS/JS but actual social proof quotes are limited.
- **Expertise (70/100):** Strong SoftwareApplication schema (3 variants: TiDB, TiDB Cloud, TiDB Self-Managed). Technical claims about architecture are present but could be more specific with benchmarks.
- **Authoritativeness (65/100):** AggregateRating (4.5/5 from 71 reviews) present in schema. GitHub stars mentioned (34,000+). Missing: industry analyst mentions (Gartner, Forrester), awards, certifications on homepage.
- **Trustworthiness (70/100):** Privacy policy linked. Contact references present. Multiple CTAs (Get Started, Sign Up, Book Demo). Missing: Terms of Service link not detected, no SOC 2/compliance badges visible on homepage.

**AI Citation Readiness: 45/100**
- No clear "TiDB is [definition]" statement in visible page text. The meta description contains one ("TiDB is an open-source, MySQL compatible, distributed SQL database") but this is not in the body content.
- Schema description is excellent and quotable but not surfaced in page content.
- No structured decision framework or comparison table on the homepage.

**Key Issues:**
1. CRITICAL: No definitional "What is TiDB?" statement visible on the page
2. The H1 "Built to Scale with Your Ambitions" is brand-aspirational, not descriptive -- an AI system cannot extract what TiDB actually IS from this heading
3. Same 23 FAQ questions in schema as every other page (duplicate content risk)

---

### 2. Product Page -- TiDB (https://www.pingcap.com/tidb/)

**Content Quality Score: 63/100**

| Metric | Value | Assessment |
|--------|-------|------------|
| Word count | ~1,151 | PASS (min 800) but borderline thin for a primary product page |
| H1 | 1 ("Modern Database Architecture for Real-Time Workloads") | Descriptive but generic |
| H2 | 7 | Adequate |
| H3 | 29 | Good granularity |
| Tables | 0 | Missing -- a product page should have feature/spec tables |
| Lists | 2 UL | Minimal |
| Images | 31 (28 with alt) | Good |

**E-E-A-T Assessment:**
- **Experience (40/100):** No case studies or customer outcomes embedded. No "built by" or engineering context. The page reads like marketing copy without first-hand implementation stories.
- **Expertise (75/100):** Technical architecture claims are specific (mentions TiKV, TiFlash, Placement Driver). The one clear definition -- "TiDB is the database that keeps up" -- is a tagline, not a technical definition.
- **Authoritativeness (60/100):** No third-party validation visible. No analyst badges or awards. Same AggregateRating schema as homepage (expected for product).
- **Trustworthiness (65/100):** Security mentions present. No compliance certifications displayed (SOC 2, HIPAA, GDPR badges).

**AI Citation Readiness: 40/100**
- The only "TiDB is..." statement: "TiDB is the database that keeps up" -- not a useful definition for AI citation.
- No comparison tables, no feature spec table, no benchmark data.
- Architecture description exists but is spread across multiple short sections rather than one quotable block.

**Key Issues:**
1. CRITICAL: 1,151 words is technically passing but thin for the primary product page of a distributed database. Competitors (CockroachDB, PlanetScale, Vitess) typically have 2,000-4,000 words on equivalent pages.
2. No tabular feature comparison or specifications
3. No embedded benchmarks or performance data
4. Same 23 FAQ schema questions as every other page

---

### 3. Blog Post (https://www.pingcap.com/blog/why-distributed-sql-databases-elevate-modern-app-dev)

**Content Quality Score: 74/100**

| Metric | Value | Assessment |
|--------|-------|------------|
| Word count | ~3,758 (body ~3,381 per schema) | PASS (min 1,500) |
| H1 | 1 ("Distributed SQL Database: Architecture, Scale, and High Availability") | Excellent - keyword-rich, descriptive |
| H2 | 10 | Strong section structure |
| H3 | 22 | Good depth |
| Tables | 1 | Good |
| Lists | 14 UL | Extensive |
| Images | 13 (12 with alt) | Good |
| Article schema | Present (via Yoast @graph) | Good |
| Published date | 2025-12-10 | Good |
| Modified date | 2025-12-11 | Good |

**E-E-A-T Assessment:**
- **Experience (50/100):** Author is "TiDB Team" -- a generic team byline, not a named individual. This weakens experience signals significantly. There are some first-person signals ("I" appears 7 times, "we" once) but without a named author with credentials, these carry less weight.
- **Expertise (78/100):** The content is technically deep: covers Raft consensus, partitioning, replication, ACID transactions. "What is a Distributed SQL Database?" section provides a clear definition. Implementation checklist included. Keywords properly targeted (Distributed SQL, scalability, high availability).
- **Authoritativeness (65/100):** No external citations or links to research. No mention of where content was presented (conferences, whitepapers). The "Reviewed by" and "Author" fields exist but author is generic.
- **Trustworthiness (70/100):** Dates present. Structured data present. Canonical set. FAQs section at bottom.

**AI Citation Readiness: 72/100**
- "What is a Distributed SQL Database?" H2 section -- excellent for AI citation
- Clear definitional structure with H2/H3 hierarchy
- Implementation checklist adds practical value
- FAQ section at bottom with specific questions
- WEAKNESS: Still has the same 23 sitewide FAQ questions in schema, not page-specific ones

**Key Issues:**
1. IMPORTANT: Author is "TiDB Team" -- should be a named person with credentials (e.g., "Ravish Patel, Solutions Engineer" as seen on the comparison page)
2. The 23-question FAQ schema is identical to every other page, which dilutes the page-specific FAQ content
3. Article section is categorized as "What Is" which is good for topical classification

---

### 4. Comparison Page -- MySQL vs TiDB (https://www.pingcap.com/compare/mysql-vs-tidb/)

**Content Quality Score: 82/100** (Strongest page audited)

| Metric | Value | Assessment |
|--------|-------|------------|
| Word count | ~3,317 | PASS (well above 1,500 minimum) |
| H1 | 1 (detected in source) | Good |
| H2 | 19 | Excellent depth |
| H3 | 36 | Very thorough |
| Tables | 1 (comparison table) | Good |
| Lists | 9 UL | Good |
| Images | 15 (all with alt) | Good |

**E-E-A-T Assessment:**
- **Experience (68/100):** BEST on site. Has named author: "Ravish Patel (Solutions Engineer)". Has "Reviewed by" attribution. Has a "Customer Story" section. Has "Updated" date (March 3, 2026). This is the only page with proper author E-E-A-T signals.
- **Expertise (82/100):** Highly technical, well-structured comparison. Covers architecture, consistency, scaling, HTAP, multi-region, operations, ecosystem, migration, and pricing. POC checklist included. Pros/cons table for both products.
- **Authoritativeness (72/100):** Author with job title adds credibility. "Trusted by Innovation Leaders" section. Customer logos. Multiple definitive claims about TiDB vs MySQL backed by architectural explanations.
- **Trustworthiness (75/100):** Updated date visible. Reviewer attribution. Balanced "When TiDB Wins vs When MySQL Wins" framing (not purely self-promotional). "Choose MySQL if..." section shows intellectual honesty.

**AI Citation Readiness: 78/100**
- Multiple clear definitions: "TiDB is a next-generation, distributed relational database..."
- Side-by-side comparison table -- highly citable
- "Pros and Cons" section for both products
- "Who Should Choose" decision framework
- Page-specific FAQ section ("FAQs: TiDB vs MySQL")
- Jump-to-section navigation

**Key Issues:**
1. NICE-TO-HAVE: More external citations (benchmarks, TPC-C results, Jepsen test results) would strengthen authority
2. The sitewide 23-FAQ schema still appears alongside the page-specific FAQ content

---

### 5. About Page (https://www.pingcap.com/about-us/)

**Content Quality Score: 52/100**

| Metric | Value | Assessment |
|--------|-------|------------|
| Word count | ~688 | PASS (min 500) but thin |
| H1 | 1 | Good |
| H2 | 5 | Minimal |
| H3 | 6 | Minimal |
| Tables | 0 | N/A for about page |
| Lists | 0 | No lists at all |
| Images | 7 (all with alt) | Adequate |

**E-E-A-T Assessment:**
- **Experience (35/100):** Founding story mentioned ("three seasoned infrastructure engineers" in 2015) but no founder names visible on the page. No employee count. No office locations beyond founding year.
- **Expertise (55/100):** Mentions open-source heritage and 34,000+ GitHub stars. Company values section present. But no technical team bios, no engineering leadership profiles.
- **Authoritativeness (48/100):** No funding information displayed. No investor names. No board of directors/advisors. No industry awards. No analyst recognition. For a company that has raised significant venture capital, this is a notable omission.
- **Trustworthiness (55/100):** Has "Join Our Team" CTA. Has "Customers Love TiDB" section. Missing: address, phone number, investor logos, compliance certifications.

**AI Citation Readiness: 30/100**
- No quotable company description beyond the meta description
- No structured milestones or timeline data
- No leadership team with bios (critical for E-E-A-T)
- No investor or funding information

**Key Issues:**
1. CRITICAL: No founder or leadership names visible. Google's QRG specifically calls out "Who is responsible for this content/organization?" as a trust signal.
2. CRITICAL: 688 words is very thin for an About page of a well-funded enterprise software company. Comparable companies (CockroachDB, MongoDB, Snowflake) have 1,500-3,000 word About pages with leadership bios, milestones, investors, awards.
3. IMPORTANT: No funding history, investor names, or board members listed.
4. No address or physical location information visible.

---

### 6. FAQ Page (https://www.pingcap.com/faqs/)

**Content Quality Score: 58/100**

| Metric | Value | Assessment |
|--------|-------|------------|
| Word count | ~2,837 | PASS (min 800) |
| H1 | 1 | Good |
| H2 | 5 ("TiDB", "TiDB Cloud", etc.) | Adequate categorization |
| H3 | 0 | Missing -- individual questions should be H3s |
| Accordion elements | 213 | Heavy accordion UI |
| Questions in text | ~30 | Good volume |
| Images | 8 (all with alt) | Adequate |

**E-E-A-T Assessment:**
- **Experience (40/100):** Pure informational content. No real-world examples or implementation context in answers.
- **Expertise (65/100):** Answers cover technical topics well (HTAP, TiKV, TiFlash, Raft, etc.). Two sections: TiDB and TiDB Cloud.
- **Authoritativeness (55/100):** No source attribution. No links to documentation for deeper exploration.
- **Trustworthiness (60/100):** Questions are relevant and practical. Covers compatibility, security, migration.

**AI Citation Readiness: 55/100**
- FAQ content is substantial and well-organized
- Accordion UI means content may not be visible to crawlers by default (depends on rendering)
- Questions are well-phrased and cover real user concerns
- CRITICAL WEAKNESS: The same 23 FAQ questions appear in schema on EVERY page of the site. This dedicated FAQ page should have its own unique, comprehensive schema.

**Key Issues:**
1. CRITICAL: FAQ schema is identical across all 6+ pages (23 questions duplicated everywhere). This is a schema spam risk. Google has penalized sites for sitewide FAQ schema since the August 2023 FAQ rich result restrictions.
2. IMPORTANT: No H3 tags for individual questions -- questions are in accordion UI without semantic heading structure.
3. IMPORTANT: Should link out to relevant documentation, blog posts, or comparison pages from FAQ answers.

---

### 7. AI Page (https://www.pingcap.com/ai/)

**Content Quality Score: 65/100**

| Metric | Value | Assessment |
|--------|-------|------------|
| Word count | ~2,710 | PASS (min 800) |
| H1 | 1 | Good |
| H2 | 11 | Good breadth |
| H3 | 47 | Extensive |
| H4 | 6 | Good depth |
| Tables | 0 | Missing -- should have integration comparison table |
| Lists | 5 UL | Adequate |
| Images | 47 (only 22 with alt) | PROBLEM: 25 images missing alt text |

**E-E-A-T Assessment:**
- **Experience (55/100):** Has customer proof: "Dify consolidated hundreds of thousands of containers onto TiDB, cutting costs by 90%." Community contributions section. Hands-on labs and tutorials listed. Better first-hand signals than most pages.
- **Expertise (70/100):** Covers vector search, agentic scale, OLTP+OLAP+vector unification. Technical but accessible. Integration ecosystem listed (LangChain, LlamaIndex, OpenAI, Dify, Next.js). "Purpose-Built for Agentic Scale" is a strong differentiating claim.
- **Authoritativeness (60/100):** 500+ community contributions, 900+ mentioned. "Proven at Scale" section. But no external validation (no benchmark comparisons with Pinecone, pgvector, Milvus for vector performance).
- **Trustworthiness (65/100):** "Talk to our AI infrastructure expert" CTA shows specialization. Trust Hub referenced. Cloud platform support detailed.

**AI Citation Readiness: 58/100**
- Good definitional statement: "TiDB is a distributed database that supports OLTP, OLAP, HTAP and AI workloads"
- Agentic scale calculator (interactive) is interesting but not crawlable for text
- Integration list is useful for citation
- Missing: benchmark data vs alternatives, feature comparison table

**Key Issues:**
1. IMPORTANT: 25 of 47 images (53%) missing alt text -- accessibility and SEO issue
2. IMPORTANT: No comparison with competing vector database solutions (page /compare/best-vector-database/ exists but is not cross-linked)
3. Duplicate definitions: "TiDB is a distributed database..." and "TiDB is a Python library..." appear twice each (content repeated)
4. Same sitewide FAQ schema

---

## Cross-Page Findings

### CRITICAL: Duplicate FAQ Schema (Severity: Critical)

**Finding:** All 6 pages analyzed contain the IDENTICAL 23-question FAQPage schema. The questions are:
1. What companies are using TiDB in production?
2. How is TiDB different from other relational databases like MySQL?
3. What is the relationship between TiDB and TiDB Cloud?
4. Is TiDB compatible with MySQL?
... (23 total, split between TiDB and TiDB Cloud sections)

**Risk:** Since Google restricted FAQ rich results in August 2023 to government and health sites, this sitewide FAQ schema provides no rich result benefit. Worse, having identical structured data across every page signals low-quality implementation and could be treated as schema spam by quality raters.

**Recommendation:** Remove the sitewide FAQ schema. Add page-specific FAQ schema ONLY to the dedicated /faqs/ page and to pages with unique, page-relevant FAQ sections (like the comparison page's "FAQs: TiDB vs MySQL").

---

### CRITICAL: No "What is TiDB?" Definitional Page

**Finding:**
- No `/what-is-tidb/` page exists (404)
- No glossary section exists (404 on `/glossary/`)
- Zero "what-is" blog posts found in sitemap
- Zero glossary/definition posts found
- The homepage does not contain a clear "TiDB is [definition]" statement in body text
- The product page's only definition is the tagline "TiDB is the database that keeps up"

**Risk:** AI systems (Google SGE/AI Overviews, ChatGPT, Perplexity, Claude) need a clear, authoritative definitional source to cite. Without one, PingCAP loses control of how TiDB is defined in AI-generated answers. Competitors with clear definitional pages will be cited instead.

**Recommendation:** Create a dedicated `/what-is-tidb/` page (or `/tidb/overview/`) with:
- A clear, 1-2 sentence definition in the first paragraph
- Architecture overview
- Key features and differentiators
- Use cases
- How it compares to traditional databases
- FAQ section specific to "What is TiDB?"
- Target word count: 2,000-3,000 words

---

### IMPORTANT: Author Attribution Gaps

| Page | Author | Credentials | Assessment |
|------|--------|-------------|------------|
| Homepage | None | N/A | Expected |
| Product | None | N/A | Acceptable for product page |
| Blog post | "TiDB Team" | None | WEAK -- generic team byline |
| Comparison | Ravish Patel | Solutions Engineer | GOOD -- named person with title |
| About | None | N/A | Expected |
| FAQ | None | N/A | Could benefit from "Maintained by" |
| AI | None | N/A | Should have author/expert |

**Recommendation:** All blog posts should have named authors with visible credentials. Technical content (AI page, comparison pages) should list a subject matter expert. The comparison page is the model to follow.

---

### IMPORTANT: /solutions/ Index Returns 404

**Finding:** The parent `/solutions/` URL returns 404, though individual solution pages work (e.g., `/solutions/fintech/` returns 200). There are 6 solution pages in the sitemap.

**Risk:** Users and search engines navigating to the parent URL get a dead end. Internal links to `/solutions/` will waste crawl budget and link equity.

---

### Content Gap Analysis

| Content Type | Count | Assessment |
|-------------|-------|------------|
| Comparison pages | 4 | LOW -- competitors like PlanetScale have 15-20 |
| Blog posts | 319 | Good volume |
| Case studies | 62 | Strong |
| Solution pages | 6 | Adequate |
| Glossary pages | 0 | MISSING |
| "What is" pages | 0 | MISSING |
| Tutorial pages | Exists (sitemap found) | Positive |

**Missing comparison pages that should exist:**
- TiDB vs CockroachDB
- TiDB vs PlanetScale
- TiDB vs Vitess
- TiDB vs YugabyteDB
- TiDB vs PostgreSQL
- TiDB vs Google Cloud Spanner
- TiDB vs SingleStore (blog post exists but no /compare/ page)
- TiDB vs MongoDB (for document workloads)

**Missing glossary terms that should exist:**
- Distributed SQL
- HTAP (Hybrid Transactional/Analytical Processing)
- NewSQL
- Raft consensus
- Horizontal scaling
- TiKV
- TiFlash
- Database sharding

---

### AI Citation Readiness Score: 52/100

| Signal | Score | Notes |
|--------|-------|-------|
| Clear product definition | 30/100 | No single authoritative definition page |
| Structured comparison data | 70/100 | Comparison page is strong |
| FAQ structured data | 40/100 | Exists but duplicated sitewide, reducing trust |
| Quotable statistics | 55/100 | GitHub stars, customer count mentioned but not consistently |
| Decision frameworks | 65/100 | "When to choose" sections on comparison page |
| Schema markup quality | 60/100 | SoftwareApplication good, but FAQ schema is spammy |
| Heading hierarchy for extraction | 70/100 | Generally good H1-H3 structure |
| Author/source attribution | 40/100 | Mostly missing or generic |

---

## Prioritized Recommendations

### Critical (Fix within 2 weeks)

1. **Remove sitewide duplicate FAQ schema.** Keep FAQ schema only on /faqs/ and pages with unique FAQ content. This affects all 6+ pages analyzed. Estimated risk reduction: schema spam penalty avoidance.

2. **Create a "What is TiDB?" definitional page.** Target URL: `/what-is-tidb/` or `/tidb/what-is-tidb/`. Include a clear 1-2 sentence definition, architecture diagram, features, use cases, and comparison context. This is the single highest-impact content gap for AI citation readiness.

3. **Add founder and leadership names to the About page.** Include photos, titles, brief bios, and LinkedIn links. This is a core E-E-A-T trust signal that is completely absent.

4. **Fix /solutions/ index 404.** Either create a solutions landing page or redirect to a relevant parent page.

### Important (Fix within 4 weeks)

5. **Add named authors with credentials to all blog posts.** Replace "TiDB Team" with named individuals. Follow the comparison page pattern (name + title + "Reviewed by").

6. **Add alt text to all images on the AI page.** 25 of 47 images are missing alt text (53%).

7. **Expand the product page** from ~1,150 to 2,000-2,500 words. Add a feature specification table, performance benchmarks, and embedded customer proof points.

8. **Create 4-6 additional comparison pages** for CockroachDB, PlanetScale, Vitess, YugabyteDB, PostgreSQL, and Google Spanner. The MySQL vs TiDB page structure is excellent -- use it as a template.

9. **Expand the About page** from ~688 to 1,500+ words. Add funding history, investor names, timeline milestones, team size, office locations, and compliance certifications.

10. **Add page-specific FAQ sections** with unique questions per page (comparison pages already do this well; replicate across product, AI, and solution pages).

### Nice-to-Have (Fix within 8 weeks)

11. **Create a glossary section** (`/glossary/`) with definitional pages for key terms (distributed SQL, HTAP, Raft consensus, horizontal scaling, etc.). These are high-value AI citation targets.

12. **Add Terms of Service** link to footer (not currently detected).

13. **Add compliance badges** (SOC 2, GDPR, ISO 27001) visually on the homepage and product page. Trust Hub exists but certifications should be surfaced prominently.

14. **Add benchmark data** to the product and comparison pages (TPC-C results, latency numbers, throughput comparisons).

15. **Cross-link the /compare/best-vector-database/ page** from the AI page (currently not connected).

---

## Summary Table

| Page | Word Count | Min | Pass? | Content Score | E-E-A-T | AI Citation |
|------|-----------|-----|-------|---------------|---------|-------------|
| Homepage | 1,179 | 500 | Yes | 67 | 63 | 45 |
| Product (TiDB) | 1,151 | 800 | Yes | 63 | 60 | 40 |
| Blog Post | 3,758 | 1,500 | Yes | 74 | 66 | 72 |
| Comparison (MySQL vs TiDB) | 3,317 | 1,500 | Yes | 82 | 74 | 78 |
| About Us | 688 | 500 | Yes | 52 | 48 | 30 |
| FAQ | 2,837 | 800 | Yes | 58 | 55 | 55 |
| AI Page | 2,710 | 800 | Yes | 65 | 63 | 58 |
| **Site Average** | | | | **66** | **61** | **54** |

---

*Report generated 2026-03-09. Data collected via server-side fetch (curl). JavaScript-rendered content may differ from what Googlebot sees with full rendering.*
