# SEO Project Memory

## Last Audit
- **Date:** 2026-05-13
- **Baseline:** Apr 30 (AEO 9.0/10, SEO ~82/100, 0 Critical Open)
- **Site:** pingcap.com (www.pingcap.com)
- **CMS:** WordPress + Yoast SEO
- **AEO Score:** 9.2/10 (up from 9.0 on Apr 30, 3.5 on Mar 9)
- **SEO Health Score:** ~84/100 (up from ~82 on Apr 30, 52 on Mar 9)
- **🎉 May 13 BIG WIN: Glossary 17 → 49 headings** — 3× growth, surpasses CockroachDB depth, far exceeds 25+ target
- **🎉 May 13: /compare/ hub LIVE** — /compare/ returns 200 "TiDB Database Comparisons" (was 301)
- **🎉 May 13: TTFB recovered** — 265ms → ~94ms (Apr 30 regression resolved)
- **🎉 May 13: data-src images eliminated** — 10 → 0 JS-lazy-loaded images
- **⚠️ May 13 REGRESSION: CSP header completely absent** — was report-only at Apr 30, now 0 headers; count 6 → 5
- **Comparison pages:** 11 (stable since Apr 30)
- **Articles in sitemap:** 242 (stable since Apr 6)
- **Critical items open:** 0
- **Items resolved:** 27 of 34 (79%)
- **Glossary terms:** 49 headings (was 17 on Apr 30)
- **Render-blocking scripts:** 5
- **Schema cleanup:** FAQPage on /what-is-tidb/ intentionally added (confirm with Udi); AggregateRating only on /tidb/; SoftwareApp on /tidb/ + homepage; Article JSON-LD still missing on /what-is-tidb/
- **Security headers:** 5 of 7 (CSP absent — was 6 at Apr 30)
- **GTM:** Single container (GTM-TPX49SBK)
- **Cache:** master.js/master.css confirmed `public,max-age=31536000,immutable` on static.pingcap.com
- **Reports folder:** /Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator/

## Items Still Open (May 13)
- **HIGH:** CSP header completely absent (was report-only) — restore immediately
- **HIGH:** 242 articles remain in sitemap — quality audit needed
- **MEDIUM:** About page missing leadership (no founder/CEO names)
- **LOW:** /.well-known/llms.txt still 404 (easy first-mover; nobody in market has it)
- **LOW:** /what-is-tidb/ Article JSON-LD wrapper still missing (FAQPage present)

## Brand Authority Snapshot — 2026-05-14

- **Tool used:** Semrush REST API + DataForSEO Labs + live HTTP
- **Semrush Authority Score (AS):** 43/100
- **Total backlinks:** 234,849
- **Referring domains:** 4,548
- **Dofollow / Nofollow:** 207,741 / 26,809 (88.5% dofollow ratio)
- **Toxic link %:** Not measured (DataForSEO backlinks subscription not active; top referring domains are low-quality Chinese sites: pingkai.cn AS 14, sitestack.cn AS 2, tidb.net AS 21)
- **G2 rating / review count:** 4.5 / 71 reviews (confirmed from schema on /tidb/)
- **Gartner Peer Insights:** Unconfirmed (site returns 403 to curl)
- **Capterra:** Unconfirmed (site returns 403 to curl)
- **GitHub stars (tidb repo):** 40,089 stars, 6,185 forks (via GitHub API)
- **About page founders/CEO:** NOT found — Max Liu not in page text
- **Investor logos on About page:** NOT found
- **SOC 2 badge (homepage + about):** NOT found
- **Customer logos on homepage:** CONFIRMED (Square, "Trusted by" section present)
- **About page word count:** 1,551 words

### Sub-category scores

| Sub-category | Weight | Score | Weighted | Key evidence |
|---|---|---|---|---|
| Backlink profile | 40% | 62 | 24.8 | AS 43, 4,548 ref domains (>1,000 top-band threshold), 88.5% dofollow |
| Brand mentions & press | 25% | 50 | 12.5 | 71 G2 reviews (>50), no analyst coverage detected, some tech press |
| Review platform presence | 20% | 72 | 14.4 | G2 4.5/5 with 71 reviews meets 50+ criterion; Gartner status unconfirmed |
| On-site authority signals | 15% | 28 | 4.2 | Customer logos ✅; no founders named, no SOC 2, no investor logos |
| **Composite Brand Authority** | | | **55.9 ≈ 56/100** | |

- **Contribution to SEO Health:** 56% × 12 = **6.7 pts** (corrected from 7.8 pts at 65/100 placeholder)
- **SEO Health Score correction:** 84 → **~83/100** (−1 pt from Brand Authority correction)
- **Delta vs previous:** First real measurement — replaces estimated baseline of ~37 (framework estimate) and 65 (May 13 placeholder)
- **Note:** The 65/100 in the May 13 report was a carry-forward placeholder with no data. Real measured composite is 56/100.

### Priority actions (updated from audit framework)

| Priority | Action | Impact |
|---|---|---|
| HIGH | Add named founders (Max Liu) + C-suite bios to About page | On-site authority: 28 → 55+ |
| HIGH | Add SOC 2 badge to homepage + About page | On-site authority + trustworthiness |
| MEDIUM | Activate DataForSEO backlinks subscription for toxic link % measurement | Complete backlink profile scoring |
| MEDIUM | Confirm Gartner Peer Insights listing; solicit reviews to 100+ on G2 | Review platform: 72 → 85+ |
| LOW | Pursue analyst citations (Gartner Magic Quadrant, Forrester Wave) | Brand mentions: step-change |
| LOW | Display GitHub stars (40K) on About/homepage | On-site authority signal |

## Competitive Snapshot (May 14)
- **Last competitive analysis:** 2026-05-14 (baseline: 2026-04-06)
- **PingCAP AEO lead vs CockroachDB:** +1.7 pts (9.2 vs 7.5)
- **Key competitive change:** CockroachDB grew comparison pages 5→9 incl. tidb-vs-cockroachdb
- **Key competitive change:** Vitess "What Is Vitess?" restored (404 in April, now at /docs/22.0/)
- **Market opportunity:** /.well-known/llms.txt is 0/6 adoption across all competitors
- **PingCAP exclusive signals:** /what-is-tidb/ definitional page, 49-term glossary (sole main-domain leader — CRDB /docs/ glossary now 404)

## Workflow Rules

- [Scoring weights source of truth](feedback_scoring_weights_source.md) — always read weights from reference/audit-framework.md, not prompt templates

## SEO Skill
- Installed: claude-seo from AgriciDaniel/claude-seo (Mar 9)
- Python: /opt/homebrew/bin/python3.12 (system python3 is 3.9, too old)
- PATH note: /opt/homebrew/bin must be on PATH for skill to work
- Playwright Chromium installed for visual analysis
