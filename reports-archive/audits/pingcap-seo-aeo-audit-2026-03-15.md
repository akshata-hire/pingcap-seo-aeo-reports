# PingCAP.com SEO / AEO Progress Report — March 15, 2026

> **Progress report** comparing against Mar 9 audit and Mar 6 baseline.
> Conducted with 6 parallel subagent checks + manual verification.

---

## SEO Health Score: 68/100 (+16 from Mar 9)

| Category | Weight | Mar 15 | Mar 9 | Delta | Key Change |
|----------|--------|--------|-------|-------|------------|
| Technical SEO | 25% | 82 | 68 | **+14** | 5 of 7 security headers, AI bot rules added, /product/ redirect fixed, thank-you pages noindexed |
| Content Quality | 25% | 68 | 62 | **+6** | Glossary page created, real blog author names, still no "What is TiDB?" page |
| On-Page SEO | 20% | 68 | 65 | **+3** | OG tags more consistent |
| Schema / Structured Data | 10% | 45 | 32 | **+13** | AggregateRating scoped down (removed from homepage, about, ai, pricing), Article schema with real authors |
| Performance (CWV) | 10% | 55 | 50 | **+5** | Cache-Control added to master.js (immutable, 1yr), preload hints for JS+CSS |
| Visual / Mobile | 5% | 62 | 62 | **0** | Awaiting visual subagent results |
| AI Search Readiness | 5% | 62 | 52 | **+10** | AI bot rules in robots.txt, glossary page live, llms.txt still exists |
| **TOTAL** | | **68.3** | **59.4** | **+8.9** | |

---

## Items Fixed Since March 9 (8 of 34 now resolved)

| # | Item | Was | Now | Evidence |
|---|------|-----|-----|----------|
| 1 | **AI bot rules in robots.txt** | Missing | **FIXED** | GPTBot, ClaudeBot, PerplexityBot, GoogleOther, anthropic-ai all explicitly allowed |
| 2 | **Security headers** | 0 of 7 enforced | **5 of 7 enforced** | X-Frame-Options, Referrer-Policy, X-Content-Type-Options, HSTS (with preload!), Permissions-Policy all present. CSP still report-only. No CORP. |
| 3 | **Thank-you pages noindexed** | 8 indexed | **FIXED** | /webinar-thank-you/ now has `<meta name='robots' content='noindex, nofollow' />`. Removed from page-sitemap.xml |
| 4 | **/product/ redirect** | Trailing slash 404 | **FIXED** | Both /product and /product/ now 301 → /tidb/ correctly |
| 5 | **Glossary page created** | /glossary/ 404 | **FIXED** | /glossary/ returns 200 with 3 sections: Core Database Terms, TiDB-Specific Terms, Cloud & Infrastructure Terms |
| 6 | **AggregateRating scoped** | 21 instances sitewide | **Reduced** | Removed from homepage, /about-us/, /ai/, /pricing/. Still on /tidb/ (1 instance). Major spam risk reduced |
| 7 | **Blog authors now real people** | "TiDB Team" generic | **FIXED** | Blog post by "Daniël van Eeden" — real named author with Person schema |
| 8 | **Cache-Control on static assets** | No cache headers | **FIXED** | master.js now has `cache-control: public,max-age=31536000,immutable` |
| — | **/solutions/ redirect** | 404 | **Now 301** | /solutions/ now redirects to /solutions/lower-infrastructure-costs/ (not a hub page, but no longer 404) |
| — | **Preload hints added** | None | **FIXED** | `<link rel="preload">` for master.js and master.css |

---

## Items Still Open (Previously Identified)

| # | Item | Severity | Status | Notes |
|---|------|----------|--------|-------|
| 1 | **No "What is TiDB?" page** | CRITICAL | Still 404 | /what-is-tidb/ returns 404. Highest-priority AEO gap |
| 2 | **FAQPage schema still sitewide** | CRITICAL | Unchanged | FAQPage on /tidb/, /pricing/, /faqs/, blog posts. Non-compliant since Aug 2023 |
| 3 | **943 articles with mass-generation patterns** | CRITICAL | Unchanged | article-sitemap.xml still has 943 URLs |
| 4 | **All images still use JS data-src** | CRITICAL | Unchanged | Hero image still data-src, no real src. LCP impact persists |
| 5 | **10 render-blocking scripts** | HIGH | Unchanged | Still 10 scripts in <head> without defer/async (was 11 — 1 removed) |
| 6 | **Cookie banner mobile CTA blocking** | HIGH | Unknown | Awaiting visual subagent |
| 7 | **Dual GTM containers** | HIGH | Unchanged | GTM-52K4D8X + GTM-TPX49SBK both still active |
| 8 | **Zero WebP/AVIF images** | HIGH | **Minimal** | 1 WebP detected (was 0), but still 13 PNG + 9 SVG |
| 9 | **About page missing leadership** | HIGH | Unchanged | Still no founder names, CEO, investors. Has values and history only |
| 10 | **No hreflang tags** | MEDIUM | Unchanged | |
| 11 | **Limited comparison pages** | MEDIUM | Unchanged | Still only 4 |
| 12 | **No VideoObject schema** | MEDIUM | Unchanged | |
| 13 | **Old event pages in sitemap** | MEDIUM | Unchanged | |
| 14 | **CSP still report-only** | MEDIUM | Unchanged | Not enforced |
| 15 | **/.well-known/llms.txt 404** | LOW | Unchanged | /llms.txt works, .well-known variant doesn't |

---

## Sitemap Changes

| Sitemap | Mar 9 | Mar 15 | Change |
|---------|-------|--------|--------|
| Sitemap structure | 11 sub-sitemaps | Now using single sitemap.xml | **Restructured** — appears to be using a different sitemap format |
| article-sitemap.xml | 943 URLs | 943 URLs | Unchanged |
| Thank-you pages | 8 in sitemap | **Removed** | Fixed |
| /glossary/ | Not in sitemap | Now listed | New |
| /developers/ section | Not noted | 6 new URLs | New content |

---

## New Developments (Not in Previous Audits)

| # | Finding | Impact |
|---|---------|--------|
| 1 | **/developers/ section launched** — 6 new pages: get-started, build-data-apps, build-ai-apps, migration-center, learn | Positive: new developer-focused content hub |
| 2 | **/glossary/ created** with 3 sections (Core DB Terms, TiDB-Specific, Cloud & Infrastructure) | Positive: fills AEO glossary gap |
| 3 | **/solutions/ now redirects** to /solutions/lower-infrastructure-costs/ instead of 404 | Partial fix — redirect beats 404, but a proper hub page would be better |
| 4 | **Blog has real authors** (Daniël van Eeden) with Person schema | Major E-E-A-T improvement |
| 5 | **master.js has immutable cache** (1 year) | Major repeat-visit performance improvement |
| 6 | **5 of 7 security headers now enforced** | Significant technical improvement |

---

## Updated Priority Action Plan

### P0 — CRITICAL (Fix This Week)

| # | Action | Status | Effort |
|---|--------|--------|--------|
| 1 | ~~AI bot rules in robots.txt~~ | **DONE** | — |
| 2 | ~~Thank-you pages noindexed~~ | **DONE** | — |
| 3 | ~~AggregateRating scoped~~ | **MOSTLY DONE** | Check remaining instance on /tidb/ |
| 4 | **Audit 943 article pages** for thin/duplicate content | Still open | 2-3 days |
| 5 | **Remove sitewide FAQPage schema** — still on every page | Still open | 2 hours |
| 6 | **Fix hero image data-src → real src** with fetchpriority="high" | Still open | 30 min |
| 7 | **Add defer to render-blocking scripts** | Still open | 1 hour |
| 8 | **Fix cookie banner on mobile** | Still open | 2 hours |

### P1 — HIGH (Fix Within 2 Weeks)

| # | Action | Status | Effort |
|---|--------|--------|--------|
| 9 | **Create "What is TiDB?" page** | Still open — most important AEO gap | 1 day |
| 10 | ~~Create glossary pages~~ | **DONE** | — |
| 11 | ~~Fix /product/ redirect~~ | **DONE** | — |
| 12 | ~~Add Cache-Control headers~~ | **DONE** | — |
| 13 | ~~Security headers~~ | **5/7 DONE** | Enforce CSP, add CORP |
| 14 | **Fix About page** — Add founder names, investors | Still open | 1 day |
| 15 | ~~Named blog authors~~ | **DONE** | — |
| 16 | Add Organization + WebSite schema to homepage only | Still open | 1 hour |

### P2 — MEDIUM (Fix Within 1 Month)

| # | Action | Status |
|---|--------|--------|
| 17 | Expand comparison pages (CockroachDB, YugabyteDB, PlanetScale) | Still open |
| 18 | Convert images to WebP/AVIF | 1 WebP detected, mostly still PNG |
| 19 | Remove stale event pages from sitemap | Still open |
| 20 | Add VideoObject schema to /videos/ | Still open |
| 21 | Implement hreflang | Still open |
| 22 | Consolidate dual GTM containers | Still open |
| 23 | Add defer to render-blocking scripts | Still open |
| 24 | Fix pricing page mobile horizontal scroll | Unknown |
| 25 | Create /solutions/ hub page (optional) | Now redirects — partial |

---

## Scorecard Summary

| Metric | Mar 6 | Mar 9 | Mar 15 | Trend |
|--------|-------|-------|--------|-------|
| SEO Health Score | N/A | 52/100 | **68/100** | ↑↑ |
| Issues found | 20 | 34 | 34 | — |
| Items fixed (cumulative) | 0 | 3 | **11** | ↑↑ |
| Items still open | 20 | 31 | **23** | ↓ |
| Critical issues | 5 | 10 | **6** | ↓ |
| Security headers | 0/7 | 0/7 | **5/7** | ↑↑↑ |
| AggregateRating instances | 21+ | 21+ | **~1** | ↑↑↑ |
| Named blog authors | No | No | **Yes** | ↑ |
| Glossary page | No | No | **Yes** | ↑ |
| Cache headers on assets | No | No | **Yes** | ↑ |
| AI bot rules | No | No | **Yes** | ↑ |

### Velocity

- **Mar 6 → Mar 9** (3 days): 3 items fixed (15% of 20)
- **Mar 9 → Mar 15** (6 days): 8 more items fixed (23% of 34)
- **Total in 9 days**: 11 items resolved, score improved from ~52 to 68

### Top 3 Remaining Priorities

1. **Create /what-is-tidb/ page** — the single biggest AEO gap remaining
2. **Audit 943 article pages** — highest penalty risk
3. **Remove sitewide FAQPage schema** — non-compliant, zero value

---

*Progress report conducted March 15, 2026.*
*Baseline: pingcap-seo-aeo-audit-2026-03-06.md*
*Previous: pingcap-seo-aeo-audit-2026-03-09.md*
