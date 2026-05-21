# PingCAP.com SEO / AEO Progress Report — April 6, 2026

> **Baseline:** Mar 29, 2026 (AEO 8.0/10, 52/100 SEO Health)
> All data verified via live HTTP requests on April 6, 2026.

---

## AEO Score: 8.5/10 (+0.5 from Mar 29)

## SEO Health Score: 75/100 (+8 from estimated Mar 29)

---

## Signal-by-Signal Tracker: Mar 29 → Apr 6

| # | Signal | Mar 29 | Apr 6 | Delta |
|---|--------|--------|-------|-------|
| 1 | AI bot rules (robots.txt) | 5 bots allowed | 5 bots allowed | No change |
| 2 | llms.txt | Live (2,406 B) | Live (2,406 B) | No change |
| 3 | /.well-known/llms.txt | 404 | **404** | Still missing |
| 4 | /what-is-tidb/ | 404 | **404** | **Still missing (4 weeks)** |
| 5 | Glossary | 13 terms | **17 headings** (+4) | Expanded |
| 6 | Comparison pages | 9 | **9** | No change |
| 7 | FAQs page | 30 Q&As | 30 Q&As | No change |
| 8 | FAQPage schema | Removed from HP/pricing | **Removed from all checked pages** | Fully cleaned |
| 9 | AggregateRating | Only on /tidb/ | **Only on /tidb/** (1 instance) | No change |
| 10 | SoftwareApplication schema | Only on /tidb/ | Only on /tidb/ | No change |
| 11 | Security headers | 6 of 7 | **6 of 7** | No change (CSP still report-only) |
| 12 | Named blog authors | Real people | Real people | No change |
| 13 | Thank-you pages | Removed from sitemap | **Still removed** | Confirmed |
| 14 | **Article sitemap** | **560** | **242** (-318 more removed!) | **MAJOR cleanup** |
| 15 | /solutions/ hub | 301 redirect | 301 redirect | No change |
| 16 | /product/ | 301 → /tidb/ | 301 → /tidb/ | No change |
| 17 | /compare/ hub | 301 → mysql-vs-tidb | 301 → mysql-vs-tidb | No change |
| 18 | **Render-blocking scripts** | **10** | **5** (-5 removed!) | **MAJOR improvement** |
| 19 | Deferred/async scripts | ~3 | **8** (+5 converted) | Scripts moved to defer |
| 20 | master.js cache headers | no-store (regressed) | **Still no-store** | Regression persists |
| 21 | Blog Article schema | Missing | **Article type detected on /blog/** | Partial fix |

---

## Scoring Update

| Category | Weight | Mar 9 | Mar 29 | Apr 6 | Delta (4 wk) |
|----------|--------|-------|--------|-------|--------------|
| Technical SEO | 25% | 68 | 73 | **80** | **+12** |
| Content Quality | 25% | 62 | 70 | **72** | **+10** |
| On-Page SEO | 20% | 65 | ~72 | **72** | **+7** |
| Schema | 10% | 32 | 55 | **60** | **+28** |
| Performance | 10% | 50 | ~55 | **65** | **+15** |
| Visual/Mobile | 5% | 62 | 62 | **62** | 0 |
| AI Search Readiness | 5% | 52 | 65 | **68** | **+16** |
| **Weighted Total** | | **52** | **~67** | **~75** | **+23** |

| AEO-Specific | Mar 9 | Mar 29 | Apr 6 | Delta |
|--------------|-------|--------|-------|-------|
| AEO Score | 3.5/10 | 8.0/10 | **8.5/10** | **+5.0** |
| vs CockroachDB (5.5) | -2.0 | +2.5 | **+3.0** | Clear leader |

---

## What Improved Since Mar 29 (This Week)

| # | Change | Impact | Evidence |
|---|--------|--------|----------|
| 1 | **318 more mass-gen articles removed (560 → 242)** | CRITICAL — 74% total reduction from original 943 | article-sitemap.xml now 242 URLs |
| 2 | **5 render-blocking scripts removed/deferred** (10 → 5) | HIGH — major CWV improvement. 8 scripts now defer/async vs 3 before | Only 5 blocking remain |
| 3 | **Glossary expanded 13 → 17 headings** | MEDIUM — closer to target of 25+ | /glossary/ now shows 17 heading elements |
| 4 | **FAQPage schema fully removed** from all checked pages | HIGH — compliance risk eliminated | 0 FAQPage on homepage, /tidb/, /pricing/ |
| 5 | **Blog Article schema detected** on /blog/ listing | MEDIUM — partial restoration of Article markup | "Article" type found in schema |

---

## Items Still Open

### CRITICAL (1)

| Issue | Since | Notes |
|-------|-------|-------|
| **No /what-is-tidb/ page — still 404** | Mar 9 (4 weeks) | #1 gap for 4 consecutive audits. Only Vitess has a definitional page among competitors. This is the single highest-impact page PingCAP could create |

### HIGH (2)

| Issue | Since | Notes |
|-------|-------|-------|
| **242 articles remain in article-sitemap** | Mar 9 (was 943) | 74% removed — but remaining 242 should be audited for quality |
| **master.js/master.css cache headers still no-store** | Mar 22 (regression) | File has content hash in name — should be immutable. 1.5MB re-downloaded per visit |

### MEDIUM (7)

| Issue | Notes |
|-------|-------|
| No /compare/ hub page | 301 redirect only, no real landing linking all 9 comparison pages |
| Glossary at 17 terms (target 25+) | CockroachDB has 50+ |
| About page missing leadership | No founder names, CEO, investors |
| CSP still report-only | Not enforced |
| 24 images still use JS data-src | Hero fixed, but rest still lazy-loaded via JS |
| 21/30 homepage images lack width/height | CLS risk |
| Solutions pages 404 | /solutions/scalable-transactional-processing/ etc. |

### LOW (2)

| Issue | Notes |
|-------|-------|
| /.well-known/llms.txt still 404 | Easy first-mover win |
| No VideoObject schema | /videos/ page exists but no markup |

---

## 4-Week Progress Arc

| Date | AEO | SEO Health | Articles | Blocking Scripts | Key Achievement |
|------|-----|-----------|----------|-----------------|-----------------|
| Mar 9 | 3.5 | 52 | 943 | 11 | Baseline (34 items identified) |
| Mar 15 | ~6.5 | 68 | 943 | 11 | Security headers, AI bot rules, caching |
| Mar 22 | ~7.5 | 67 | 943 | 10 | Schema cleanup, hero image, GTM |
| Mar 29 | 8.0 | ~67 | 560 | 10 | FAQ expansion, article cleanup begins |
| **Apr 6** | **8.5** | **~75** | **242** | **5** | **Major article + script cleanup** |

### Cumulative Stats

| Metric | Mar 9 | Apr 6 | Change |
|--------|-------|-------|--------|
| Total items identified | 34 | 34 | — |
| Items fixed (cumulative) | 0 | **22** | 65% resolved |
| Critical items remaining | 10 | **1** | 90% resolved |
| Mass-gen articles | 943 | **242** | **-74%** |
| Render-blocking scripts | 11 | **5** | **-55%** |
| Security headers | 0/7 | **6/7** | +6 |
| Comparison pages | 4 | **9** | +125% |
| FAQ questions | ~22 | **30** | +36% |
| Glossary terms | 0 | **17** | New |
| AEO Score | 3.5/10 | **8.5/10** | **+143%** |

---

## Top 3 Actions for Next Week

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | **Create /what-is-tidb/ page** | +0.5-1.0 AEO pts, fills #1 gap for 4 weeks | 1 day |
| 2 | **Fix master.js/master.css cache headers** | +5 Performance pts, saves 1.5MB/visit | 30 min |
| 3 | **Audit remaining 242 articles** for quality | Prevents HCU penalty on residual content | 1-2 days |

---

*Progress report generated April 6, 2026. All findings verified via live HTTP requests.*
*Baseline: Mar 29, 2026 report*
