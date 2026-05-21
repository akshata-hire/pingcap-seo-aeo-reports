# PingCAP Brand Authority & Backlinks Audit — May 14, 2026

> **First real measurement** of the Brand Authority & Backlinks category.
> Previous May 13 report carried a placeholder score of 65/100 with no underlying data.
> All data collected via: Semrush REST API, DataForSEO Labs (organic), GitHub API, live HTTP checks.
> Date: 2026-05-14

---

## Summary Score

| Sub-category | Weight | Score | Weighted |
|---|---|---|---|
| Backlink Profile | 40% | 62/100 | 24.8 |
| Brand Mentions & Press | 25% | 50/100 | 12.5 |
| Review Platform Presence | 20% | 72/100 | 14.4 |
| On-site Authority Signals | 15% | 28/100 | 4.2 |
| **Composite Brand Authority** | **100%** | **56/100** | **55.9** |

**SEO Health Score impact:** 56/100 × 12% weight = **6.7 pts**
**vs May 13 placeholder:** 65/100 × 12% = 7.8 pts → **corrected SEO Health Score: ~83/100** (−1 from 84)

---

## 1. Backlink Profile (40% of category) — Score: 62/100

### Raw data (Semrush, May 14 2026)

| Metric | Value |
|---|---|
| Semrush Authority Score (AS) | **43** |
| Total backlinks | 234,849 |
| Referring domains | **4,548** |
| Unique IPs | 4,348 |
| Dofollow backlinks | 207,741 (**88.5%**) |
| Nofollow backlinks | 26,809 (11.5%) |
| Toxic / spam % | Not measured (DataForSEO backlinks subscription not active) |

### Top 5 referring domains by link volume

| Domain | Authority Score | Backlinks from domain | Note |
|---|---|---|---|
| pingkai.cn | 14 | 109,707 | Low quality — Chinese ecosystem |
| sitestack.cn | 2 | 16,423 | Very low quality |
| tidb.net | 21 | 13,923 | Community/forum — acceptable |
| bookstack.cn | 25 | 12,440 | Low quality |
| idiks.com | 2 | 5,764 | Very low quality |

> **Note:** The top referring domains are heavily weighted toward low-authority Chinese sites. While the *volume* of referring domains is excellent, the quality of top linkers is concerning. Bulk of links (109K from pingkai.cn alone) may be low-value.

### Scoring rationale

Framework bands:
- **80–100:** DR/DA ≥ 60, 1,000+ referring domains, <5% toxic, strong dofollow
- **60–79:** DR/DA 45–59, 500–999 referring domains, <10% toxic
- **40–59:** DR/DA 30–44, 200–499 referring domains, <20% toxic

PingCAP position:
- AS 43 ≈ DR/DA 40-50 range → **straddles 40-59 and 60-79 bands**
- 4,548 referring domains → **far exceeds even the 80-100 band's 1,000+ threshold**
- 88.5% dofollow → **excellent, top-band quality**
- Top linkers are low-quality → quality discount applied

**Score: 62/100** — volume is outstanding but AS and link quality pull it down from the 60-79 band midpoint.

---

## 2. Brand Mentions & Press (25% of category) — Score: 50/100

### Data collected

| Signal | Status |
|---|---|
| Gartner Magic Quadrant / Forrester Wave citations | ❌ Not detected |
| G2 review count | ✅ **71 reviews** (>50 threshold met) |
| Tech press coverage (TechCrunch, The New Stack, InfoQ) | ℹ️ Some coverage exists — not quantified per quarter |
| Analyst citations (Gartner Peer Insights category listing) | ❓ Unconfirmed |
| Press mentions per quarter | Not measured (requires manual press search) |

### Scoring rationale

Framework bands:
- **80–100:** 3+ analyst reports (Gartner/Forrester/IDC), 10+ press/quarter, 50+ reviews
- **60–79:** 1–2 analyst mentions, 5–9 press hits/quarter, 20–49 reviews on 1+ platform
- **40–59:** No analyst coverage, regular tech press (TechCrunch/InfoQ/The New Stack), 10–19 reviews
- **20–39:** Occasional press, <10 reviews

PingCAP has:
- G2 reviews: **71** — exceeds 50+ threshold (partial 80-100 band qualification)
- No analyst coverage confirmed
- Some tech press (not quantified)

**Score: 50/100** — G2 review count is 80-100 band quality, but no analyst citations keeps this at top of 40-59 band. Upside is significant if analyst coverage is obtained.

---

## 3. Review Platform Presence (20% of category) — Score: 72/100

### Data collected

| Platform | Status | Details |
|---|---|---|
| G2 | ✅ Confirmed | **4.5/5 stars, 71 reviews** (from JSON-LD schema on /tidb/) |
| Gartner Peer Insights | ❓ Unconfirmed | Site returned 403 — cannot scrape |
| Capterra | ❓ Unconfirmed | Site returned 403 — cannot scrape |
| TrustRadius | Not checked | |

**Source verification:** G2 rating confirmed from structured data on pingcap.com/tidb/:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.5",
  "ratingCount": "71",
  "bestRating": "5",
  "url": "https://www.g2.com/products/tidb/reviews"
}
```

> ⚠️ **Known issue:** The AggregateRating schema is only on /tidb/, not the homepage. The review URL points to G2 but the schema is not linked to a live verified G2 source — flagged in prior audit as manual action risk.

### Scoring rationale

Framework bands:
- **80–100:** G2 ≥ 4.5 stars with 50+ reviews **AND** active Gartner Peer Insights
- **60–79:** G2 ≥ 4.0 stars with 20–49 reviews, or equivalent on Capterra/TrustRadius
- **40–59:** Rating present but <20 reviews or last review >6 months old

PingCAP has G2 4.5/5 with 71 reviews → **meets the first criterion of the 80-100 band** but Gartner Peer Insights status is unconfirmed (the "AND" condition).

**Score: 72/100** — strong G2 profile, unknown Gartner. If Gartner Peer Insights is confirmed, score should rise to 82-85.

---

## 4. On-site Authority Signals (15% of category) — Score: 28/100

### Data collected

| Signal | Status | Evidence |
|---|---|---|
| Named founders + C-suite bios on About page | ❌ NOT FOUND | Searched for "Max Liu", "founder", "co-founder", "CEO", "Edward", "Morgan" — none found in About page HTML |
| Investor logos | ❌ NOT FOUND | No Series A/B/C mentions, no VC logos detected |
| SOC 2 compliance badge (homepage) | ❌ NOT FOUND | grep for SOC, HIPAA, ISO 27001 returned 0 results on homepage |
| SOC 2 compliance badge (About page) | ❌ NOT FOUND | Same |
| GitHub stars displayed on website | ❓ Unconfirmed | TiDB repo has **40,089 stars** (GitHub API), but not confirmed displayed on pingcap.com pages |
| Customer logos with named references | ✅ CONFIRMED | "Square", "Trusted by" section on homepage confirmed |
| About page length | ✅ OK | 1,551 words (above 500-word minimum) |

### Scoring rationale

Framework bands (signals scored out of 5):
- **80–100:** 5 of 5 signals present
- **60–79:** 3 of 5 present
- **40–59:** 2 of 5 present
- **20–39:** 1 of 5 present
- **0–19:** About page thin (<500 words), no external validation

Confirmed signals: Customer logos (1/5). About page is not thin (1,551 words, so not 0-19 band).

**Score: 28/100** — 1 of 5 authority signals confirmed. All highest-impact signals are missing: no founder names is the single biggest gap (one paragraph naming Max Liu would move this to 2/5 immediately).

---

## Competitor Comparison (Backlink Profile)

| Domain | AS | Referring Domains | Dofollow % | Notes |
|---|---|---|---|---|
| pingcap.com | **43** | **4,548** | 88.5% | Primary domain |
| cockroachdb.com | 5 | 227 | 97% | Likely secondary domain — main: cockroachlabs.com |

> CockroachDB's cockroachdb.com has very low metrics — this is likely not their primary SEO domain. A fair comparison requires checking cockroachlabs.com. However, pingcap.com's 4,548 referring domains is a strong signal regardless of competitor.

**DataForSEO Labs organic (US, May 14):**
- pingcap.com ranked for **2,242 keywords** in US Google
- Positions: 18 at #1, 60 at #2-3, 485 at #4-10
- Estimated traffic value: **$42,193/mo** (based on paid equivalent)
- Monthly organic visits (Semrush): **7,740**

---

## SEO Health Score Correction

| Category | Weight | May 13 (placeholder) | May 14 (real) | Delta |
|---|---|---|---|---|
| Brand Authority & Backlinks | 12% | 65/100 → 7.8 pts | **56/100 → 6.7 pts** | **−1.1 pts** |
| **SEO Health Score** | | **~84** | **~83** | **−1** |

The May 13 SEO Health Score of ~84 should be restated as **~83** once this Brand Authority measurement is applied. AEO Score of 9.2 is unchanged.

---

## Priority Actions (Ranked by Impact)

| # | Action | Impact on BA score | Effort | Owner |
|---|---|---|---|---|
| 1 | **Add Max Liu (CEO/co-founder) + C-suite bios to /about-us/** | On-site authority: 28 → ~55 (+4 pts weighted BA) | 1 hr copy + 30 min dev | Content |
| 2 | **Add SOC 2 compliance badge to homepage + about page** | On-site authority: additional signal (+3-5 pts) | 2 hrs (requires badge asset + placement) | Marketing/Dev |
| 3 | **Verify + upgrade AggregateRating schema** | Review platform score + removes manual action risk | 30 min | Dev |
| 4 | **Confirm Gartner Peer Insights listing** | Review platform: 72 → 82-85 (+1 pt SEO Health) | Manual check | Marketing |
| 5 | **Activate DataForSEO backlinks subscription** | Enables toxic link % measurement | Subscription cost | SEO |
| 6 | **Display GitHub stars (40K) on About/homepage** | On-site authority: additional signal | 2 hrs dev | Dev |
| 7 | **Solicit G2 reviews to 100+ (currently 71)** | Review platform: incremental improvement | Ongoing | CS/Marketing |

---

## Data Sources & Methods

| Data point | Source | Method |
|---|---|---|
| Authority Score (AS 43) | Semrush REST API | `backlinks_overview` endpoint |
| Referring domains (4,548) | Semrush REST API | `backlinks_overview` endpoint |
| Total backlinks (234,849) | Semrush REST API | `backlinks_overview` endpoint |
| Dofollow ratio (88.5%) | Semrush REST API | follows_num / total |
| Top referring domains (quality) | Semrush REST API | `backlinks_refdomains` endpoint |
| Organic rank distribution | DataForSEO Labs MCP | `dataforseo_labs_google_domain_rank_overview` |
| G2 rating (4.5/71) | Live HTTP | JSON-LD schema on pingcap.com/tidb/ |
| Gartner / Capterra | Live HTTP | Both returned 403 — cannot confirm |
| GitHub stars (40,089) | GitHub REST API | `/repos/pingcap/tidb` |
| About page content | Live HTTP | curl + text extraction |
| SOC 2 / compliance badges | Live HTTP | grep on homepage + about page HTML |
| Toxic link % | NOT measured | DataForSEO backlinks subscription required |

---

*Audit conducted May 14, 2026. Tools: Semrush REST API (key on file), DataForSEO Labs MCP, GitHub API, live curl.*
*Next Brand Authority check: June 2026 (monthly cadence per audit-framework.md)*
