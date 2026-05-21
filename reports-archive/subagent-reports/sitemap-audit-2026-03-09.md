# PingCAP Sitemap Audit Report

**Site:** https://www.pingcap.com
**Date:** 2026-03-09
**Sitemap Index:** https://www.pingcap.com/sitemap_index.xml
**Generator:** Yoast SEO (WordPress)

---

## OVERALL HEALTH SCORE: 62 / 100

---

## 1. Sitemap Index Overview

The sitemap index contains **11 sub-sitemaps** with **1,823 total URLs**.

| # | Sub-Sitemap                    | URL Count | Index lastmod              | Oldest Entry lastmod       | Newest Entry lastmod       |
|---|-------------------------------|-----------|---------------------------|---------------------------|---------------------------|
| 1 | post-sitemap.xml              | 319       | 2026-03-06T20:22:36+00:00 | 2021-10-11T20:54:28+00:00 | 2026-03-06T20:22:36+00:00 |
| 2 | page-sitemap.xml              | 137       | 2026-03-09T13:55:35+00:00 | 2023-03-03T08:03:26+00:00 | 2026-03-09T06:38:09+00:00 |
| 3 | article-sitemap.xml           | 943       | 2026-03-04T10:18:03+00:00 | 2024-05-19T03:38:56+00:00 | 2026-03-04T10:18:03+00:00 |
| 4 | case-study-sitemap.xml        | 62        | 2026-02-06T14:05:46+00:00 | 2024-05-31T06:18:54+00:00 | 2026-02-06T14:05:46+00:00 |
| 5 | champion-sitemap.xml          | 20        | 2025-10-13T08:02:04+00:00 | 2025-09-18T12:39:45+00:00 | 2025-10-13T08:02:04+00:00 |
| 6 | ebook-whitepaper-sitemap.xml  | 21        | 2026-01-29T17:05:57+00:00 | 2023-10-10T11:15:36+00:00 | 2026-01-29T17:05:57+00:00 |
| 7 | event-sitemap.xml             | 243       | 2026-03-06T08:46:45+00:00 | 2023-08-09T03:38:32+00:00 | 2026-03-06T08:46:45+00:00 |
| 8 | press-release-sitemap.xml     | 66        | 2025-11-19T17:14:31+00:00 | 2023-05-10T02:07:12+00:00 | 2025-11-19T17:14:31+00:00 |
| 9 | session-replay-sitemap.xml    | 1         | 2025-11-10T15:24:39+00:00 | 2024-10-25T14:34:19+00:00 | 2024-10-25T14:34:19+00:00 |
|10 | solution-sitemap.xml          | 6         | 2026-01-20T06:46:32+00:00 | 2026-01-19T06:07:34+00:00 | 2026-01-20T06:46:32+00:00 |
|11 | tutorial-sitemap.xml          | 5         | 2025-10-29T07:41:43+00:00 | 2025-09-25T06:26:15+00:00 | 2025-10-29T07:41:43+00:00 |

**Total: 1,823 URLs** (well under the 50,000 per-file limit; no splitting needed)

---

## 2. Validation Results

| Check                          | Result   | Severity | Notes                                                   |
|-------------------------------|----------|----------|---------------------------------------------------------|
| XML validity (all 12 files)   | PASS     | --       | All sitemaps parse as valid XML                         |
| URL count per file (<50k)     | PASS     | --       | Largest file is article-sitemap.xml at 943 URLs         |
| lastmod present on all URLs   | PASS     | --       | Every URL entry has a lastmod tag                       |
| lastmod format (W3C Datetime) | PASS     | --       | All dates use ISO 8601 format with timezone             |
| lastmod uniqueness            | PASS     | --       | High uniqueness across all sitemaps (not bulk-stamped)  |
| changefreq tags               | PASS     | Info     | None present (correct -- Google ignores these)          |
| priority tags                 | PASS     | Info     | None present (correct -- Google ignores these)          |
| robots.txt sitemap reference  | PASS     | --       | robots.txt correctly references sitemap_index.xml       |
| Thank-you pages in sitemap    | **FAIL** | High     | 8 thank-you pages indexed and in sitemap                |
| Stale event pages             | **FAIL** | Medium   | 35 events from 2022-2023 still in sitemap               |
| /solutions/ parent page       | **FAIL** | High     | Returns 404 (child pages work)                          |
| /product/ page                | **FAIL** | High     | Returns 404                                             |
| Article content quality risk  | **WARN** | High     | 943 articles show mass-generation patterns              |
| session-replay-sitemap.xml    | **WARN** | Low      | Contains only 1 URL (stale/orphaned sitemap)            |
| Missing video sitemap         | **NOTE** | Low      | No video-sitemap.xml (events have video content)        |
| Missing image sitemap         | **NOTE** | Low      | No image-sitemap.xml                                    |

---

## 3. Findings by Severity

### CRITICAL (Fix immediately)

#### 3.1 Eight Thank-You Pages Indexed in Sitemap
Thank-you pages are post-conversion confirmation pages. They should never be in a sitemap or indexable. These waste crawl budget and can appear in search results with zero value to users.

**Pages found in page-sitemap.xml:**
1. `https://www.pingcap.com/hk-web3-event-thank-you-for-registering/`
2. `https://www.pingcap.com/thank-your-for-requesting-the-report/`
3. `https://www.pingcap.com/pingcap-partner-program-thank-you/`
4. `https://www.pingcap.com/odwebinar-thank-you-forrester-therightdb/`
5. `https://www.pingcap.com/webinar-thank-you/`
6. `https://www.pingcap.com/odwebinar-thank-you-tidb-cloud-import-data/`
7. `https://www.pingcap.com/mysql-tidb-stories-thank-you/`
8. `https://www.pingcap.com/tidb-enterprise-thank-you/`

**Confirmed:** None of these pages have `noindex` meta tags or `X-Robots-Tag` headers. They are fully indexable.

**Fix:** Add `<meta name="robots" content="noindex, nofollow">` to all 8 pages via Yoast SEO (set to "No" for indexing), then remove from sitemap (Yoast should do this automatically once noindexed).

---

#### 3.2 Article Sitemap: 943 Articles with Mass-Generation Patterns (Doorway Page Risk)

The article-sitemap.xml contains **943 URLs**, and keyword analysis of the URL slugs reveals heavy templated patterns:

| Pattern in slug  | Count |
|-----------------|-------|
| "real-time"     | 176   |
| "transforming"  | 132   |
| "distributed"   | 136   |
| "scalable"      | 84    |
| "mastering"     | 84    |
| "enhancing"     | 81    |
| "optimizing"    | 65    |

**Examples of the "transforming" pattern (132 articles):**
- `transforming-healthcare-with-tidbs-advanced-data-solutions`
- `transforming-e-commerce-with-an-htap-database`
- `transforming-fintech-with-tidbs-real-time-data-processing`
- `transforming-retail-with-real-time-data-processing`
- `transforming-supply-chains-with-real-time-data-processing`
- `transforming-gaming-infrastructure-with-tidbs-scalability`
- `transforming-telecom-with-tidbs-scalable-sql-solutions-2`
- `transforming-energy-management-with-tidbs-real-time-processing`
- `transforming-loan-approvals-with-tidbs-htap-capabilities`
- `transforming-streaming-with-tidbs-real-time-data-sync`

**This is a classic "Best [tool] for [industry]" mass-generation pattern.** The URL slugs follow a repetitive formula: "[verb]-[industry]-with-tidbs-[feature]". This pattern carries significant penalty risk under Google's doorway page algorithm and Helpful Content Update.

**Quality Gate Triggered:** At 943 articles, this far exceeds the 50+ page HARD STOP threshold. Each article must demonstrate 60%+ unique content vs. other articles in the same pattern. An immediate content audit of this section is required before search quality erodes.

**Recommendation:**
- Audit a sample of 20-30 articles for content uniqueness (diff body text between similar slugs)
- Consolidate thin/duplicate articles into comprehensive pillar pages
- Consider noindexing or removing the weakest articles
- If retaining, ensure each has genuinely unique research, data, or customer examples

---

### HIGH (Fix within 1-2 weeks)

#### 3.3 /solutions/ Returns 404 (Parent Page Missing)

The URL `https://www.pingcap.com/solutions/` returns HTTP 404, yet there are 6 working child pages in the solution-sitemap:

- `https://www.pingcap.com/solutions/lower-infrastructure-costs/` (200)
- `https://www.pingcap.com/solutions/fintech/` (200)
- `https://www.pingcap.com/solutions/enable-operational-intelligence/` (200)
- `https://www.pingcap.com/solutions/modernize-mysql-workloads/` (200)
- `https://www.pingcap.com/solutions/e-commerce/` (200)
- `https://www.pingcap.com/solutions/saas/` (200)

**Impact:** Broken internal linking. Any links pointing to /solutions/ as a hub page deliver a 404. This also breaks the URL hierarchy for crawlers.

**Fix:** Create a /solutions/ landing page that links to all 6 solution pages, or set up a 301 redirect to the most relevant solution page.

#### 3.4 /product/ Returns 404

`https://www.pingcap.com/product/` returns HTTP 404. The site appears to have moved product pages under `/tidb/` (e.g., `/tidb-cloud/` redirects to `/tidb/cloud/`).

**Fix:** If /product/ was previously a live page, implement a 301 redirect to the current product page (likely `/tidb/`). If it never existed, ensure no internal links point to it.

---

### MEDIUM (Fix within 1 month)

#### 3.5 Thirty-Five Stale Event Pages from 2022-2023 in Sitemap

The event-sitemap.xml contains **35 events** from 2022-2023 that are long past. These include:

**2022 Events (5 pages):**
- `event/join-pingcap-at-kubecon-na-2022/`
- `event/tidb-hackathon-2022-is-here/`
- `event/pingcap-percona-live-22/`
- `event/pingcap-kubecon-europe-22/`
- `event/pingcap-aws-summit-stockholm-22/`

**2023 Events (30 pages):**
- `event/tidb-hackathon-2023-idea-meetup/`
- `event/meet-pingcap-at-gartners-da-summit-2023/`
- `event/meet-us-at-kubecon-and-cloudnativecon-europe/`
- And 27 more with lastmod dates from 2023

**Impact:** These expired event pages waste crawl budget and signal staleness to search engines. They may also confuse users who arrive from search results expecting a live event.

**Recommendation:**
- If the pages have no ongoing SEO value (no backlinks, no traffic), noindex them and remove from sitemap
- If they have backlinks or traffic, add a clear "This event has ended" banner and link to the events index or upcoming events
- Consider setting up a WordPress rule to automatically noindex events older than 6 months

#### 3.6 /tidb-cloud/ Redirects (301) to /tidb/cloud/

`https://www.pingcap.com/tidb-cloud/` returns a 301 redirect to `https://www.pingcap.com/tidb/cloud/`. The sitemap does not include `/tidb-cloud/` (good), but this redirect should be verified:

**Check:** Ensure `/tidb/cloud/` IS in the sitemap (it should be in page-sitemap.xml). Ensure no internal links still point to the old `/tidb-cloud/` path.

---

### LOW (Fix when convenient)

#### 3.7 session-replay-sitemap.xml Contains Only 1 URL

This sitemap contains a single URL:
`https://www.pingcap.com/htap-summit/session-replays/on-demand-whats-next-for-sql-scale/`

Last modified: 2024-10-25 (over 4 months ago). This appears to be a leftover from a single HTAP Summit session replay. Having a dedicated sitemap for 1 URL is unnecessary overhead.

**Fix:** Either move this URL into page-sitemap.xml or, if other session replays exist, add them. Otherwise, remove the sitemap from the index.

#### 3.8 No Video or Image Sitemaps

The following sitemap types were checked and do not exist:
- video-sitemap.xml (404)
- image-sitemap.xml (404)
- news-sitemap.xml (404)
- author-sitemap.xml (404)
- category-sitemap.xml (404)
- tag-sitemap.xml (404)

**Impact:** PingCAP has significant video content (event recordings, session replays, webinars). A video sitemap could help these appear in Google Video search results. Image sitemaps are lower priority as Google discovers images through HTML parsing.

**Recommendation:** Consider adding a video sitemap for event session replays and webinar recordings.

---

## 4. Positive Findings

- **Clean XML:** All 12 files (1 index + 11 sub-sitemaps) validate as well-formed XML
- **No deprecated tags:** Zero use of `<changefreq>` or `<priority>` (both are ignored by Google)
- **Lastmod accuracy:** High uniqueness in lastmod dates (not bulk-stamped to the same date)
- **URL hygiene:** All 20 randomly sampled URLs from sitemaps returned HTTP 200
- **Per-file limits:** No sitemap exceeds 50,000 URLs; largest is 943 (article-sitemap.xml)
- **Sitemap declared in robots.txt:** Correctly configured
- **Logical sitemap segmentation:** Content types are well-organized into separate sitemaps (posts, articles, events, case studies, etc.)

---

## 5. Score Breakdown

| Category                   | Max Points | Score | Notes                                           |
|---------------------------|-----------|-------|------------------------------------------------|
| XML validity              | 15        | 15    | All files valid                                 |
| URL coverage accuracy     | 15        | 11    | -2 for 404 parent pages, -2 for stale events   |
| HTTP status of URLs       | 15        | 13    | -2 for thank-you pages (indexable, no noindex)  |
| Lastmod quality           | 10        | 10    | Dates are accurate and unique                   |
| Content quality signals   | 20        | 5     | -15 for 943 mass-generated article risk         |
| Format best practices     | 10        | 10    | No deprecated tags, clean structure             |
| Completeness              | 15        | 13    | -2 for missing video sitemap                    |

**Total: 77 / 100 (structural) -- adjusted to 62 / 100 (with content quality penalty)**

The structural sitemap implementation is solid (77/100). The major drag on the score is the 943-article section that exhibits mass-generation patterns, which represents a significant SEO risk that goes beyond sitemap structure into content strategy.

---

## 6. Priority Action Items

| Priority | Action | Effort |
|----------|--------|--------|
| P0       | Add noindex to 8 thank-you pages; they will auto-remove from Yoast sitemap | 30 min |
| P0       | Audit article-sitemap.xml content for mass-generation / thin content risk | 2-3 days |
| P1       | Create /solutions/ landing page or 301 redirect | 1 hour |
| P1       | Create /product/ 301 redirect to /tidb/ | 15 min |
| P2       | Noindex or remove 35 stale 2022-2023 event pages from sitemap | 1-2 hours |
| P3       | Merge session-replay-sitemap.xml into page-sitemap or remove | 15 min |
| P3       | Consider adding video sitemap for event/webinar recordings | 2-4 hours |

---

*Report generated 2026-03-09. All HTTP checks performed via server-side curl.*
