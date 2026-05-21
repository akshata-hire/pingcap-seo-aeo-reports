# Audit Framework — Methodology Reference

## Scoring methodology

The **SEO Health Score (0–100)** is a weighted aggregate of 8 categories:

| Category | Weight | What's measured |
|----------|--------|-----------------|
| Technical SEO | 19% | Crawlability, indexability, security headers, redirects, URL structure |
| Content Quality | 19% | E-E-A-T signals, definitional content, depth, named authors, FAQ |
| On-Page SEO | 18% | Titles, meta descriptions, H1/H2 hierarchy, OG tags, image alt |
| AI Search Readiness | 15% | AI bot rules, llms.txt, comparison content, definitional pages |
| Brand Authority & Backlinks | 12% | Referring domains, domain authority, branded mentions, analyst/press coverage, review platform presence |
| Schema | 10% | JSON-LD presence and quality (Organization, SoftwareApplication, WebPage, BreadcrumbList) |
| Performance | 4% | TTFB, LCP signals, render-blocking scripts, image loading |
| Visual/Mobile | 3% | Mobile rendering (only when Playwright run; otherwise carried forward) |

> **Note on weights:** AI Search Readiness raised to 15% to reflect AEO differentiation as a primary program goal. Brand Authority & Backlinks set at 12% as a new strategic category. Performance (4%) and Visual/Mobile (3%) retained to ensure regressions are still scored. The 24-signal weekly check is unchanged — Brand Authority uses a separate monthly cadence (see below).

**The AEO Score (0–10)** is a separate, AI-search-specific score. It's the focus of this program because it's how PingCAP differentiates from CockroachDB and other competitors. AEO points come from:

- AI bot rules in robots.txt (+1.0)
- llms.txt (+0.5)
- Glossary on main domain (+0.5)
- Comparison pages: 1+ adds 0.5, 5+ adds 1.0, 10+ adds 1.5
- FAQ page (+0.5)
- Named blog authors with Person schema (+0.5)
- Organization schema (+0.5)
- Security headers (+0.5)
- Schema cleanup (FAQPage compliance, AggregateRating scoping) (+1.0)
- Article cleanup (mass-gen reduction) (+0.5)
- Thank-you page noindex (+0.5)
- /what-is-tidb/ definitional page (+1.0)
- /.well-known/llms.txt (-0.25 currently, +0.5 if launched)

## Brand Authority & Backlinks scoring (12% of SEO Health Score)

This category is **not part of the weekly 24-signal check** — it requires an external tool (Ahrefs, Moz, or Semrush) and is run **monthly**, or whenever a major PR/campaign event occurs. Record the snapshot in MEMORY.md under a `## Brand Authority Snapshot` heading so month-on-month comparisons remain valid.

### Sub-categories and weights within Brand Authority (total: 12 points toward SEO Health)

| Sub-category | Weight within category | Signals measured |
|---|---|---|
| Backlink profile | 40% | Total referring domains, domain authority/rating (DA/DR), dofollow vs nofollow ratio, toxic/spammy link % |
| Brand mentions & press | 25% | Unlinked brand mentions, press/news coverage volume, analyst citations (Gartner, Forrester, G2, TrustRadius) |
| Review platform presence | 20% | G2 rating + review count, Gartner Peer Insights, Capterra — recency and volume |
| On-site authority signals | 15% | About page completeness (founders, investors, leadership bios), compliance badges (SOC 2, HIPAA), third-party logos, GitHub stars |

### How to score each sub-category (0–100, then weight)

**Backlink profile (0–100)**

| Score band | Criteria |
|---|---|
| 80–100 | DR/DA ≥ 60, 1,000+ referring domains, <5% toxic, strong dofollow ratio |
| 60–79 | DR/DA 45–59, 500–999 referring domains, <10% toxic |
| 40–59 | DR/DA 30–44, 200–499 referring domains, <20% toxic |
| 20–39 | DR/DA 15–29, 50–199 referring domains, or >20% toxic |
| 0–19 | DR/DA <15, <50 referring domains, or significant toxic link issue |

**Brand mentions & press (0–100)**

| Score band | Criteria |
|---|---|
| 80–100 | Cited in 3+ analyst reports (Gartner/Forrester/IDC), 10+ press mentions/quarter, active G2/TrustRadius profiles with 50+ reviews |
| 60–79 | 1–2 analyst mentions, 5–9 press hits/quarter, 20–49 reviews on at least one platform |
| 40–59 | No analyst coverage but regular tech press (TechCrunch, InfoQ, The New Stack), 10–19 reviews |
| 20–39 | Occasional press, <10 reviews across all platforms |
| 0–19 | No meaningful third-party coverage or reviews |

**Review platform presence (0–100)**

| Score band | Criteria |
|---|---|
| 80–100 | G2 ≥ 4.5 stars with 50+ reviews AND active Gartner Peer Insights profile |
| 60–79 | G2 ≥ 4.0 stars with 20–49 reviews, or equivalent on Capterra/TrustRadius |
| 40–59 | Rating present but <20 reviews or last review >6 months old |
| 20–39 | Profile exists but thin (<10 reviews) |
| 0–19 | No presence on major review platforms |

**On-site authority signals (0–100)**

| Score band | Criteria |
|---|---|
| 80–100 | About page has named founders + C-suite bios, investor logos, compliance badges (SOC 2 at minimum), GitHub stars displayed, customer logos with named references |
| 60–79 | 3 of the above 5 present |
| 40–59 | 2 of the above 5 present |
| 20–39 | 1 of the above 5 present |
| 0–19 | About page is thin (<500 words), no external validation signals |

### Current baseline (as of Apr 30, 2026 — estimated, no tool access yet)

| Sub-category | Estimated score | Basis |
|---|---|---|
| Backlink profile | ~45 | No tool data; estimated from domain age, GitHub presence, and customer count |
| Brand mentions & press | ~35 | No Gartner/Forrester citation detected. G2 AggregateRating (4.5/71 reviews) present in schema but unlinked. |
| Review platform presence | ~40 | 71 reviews inferred from AggregateRating schema; recency unknown |
| On-site authority signals | ~25 | About page 688 words, no founder names, no investor logos, no compliance badges detected (Mar 9 audit) |
| **Composite Brand Authority** | **~37/100** | Weighted average |
| **Contribution to SEO Health** | **~4.4/12 pts** | 37% × 12 |

> This is the biggest gap in the current SEO Health score. Even moderate improvements here (getting to 60/100) would add ~3–4 points to the overall SEO Health Score — equivalent to the full value of the Performance or Schema categories.

### Priority actions to improve Brand Authority score

| Priority | Action | Expected impact | Owner |
|---|---|---|---|
| HIGH | Link AggregateRating schema to verified G2/Gartner source page | Removes manual action risk; boosts Trustworthiness sub-score | Dev/SEO |
| HIGH | Add founder names, investor logos, and C-suite bios to About page | On-site authority: 25 → 60+ | Content |
| HIGH | Add SOC 2 compliance badge to homepage and About page | Trustworthiness + on-site authority | Marketing |
| MEDIUM | Run Ahrefs/Semrush pull to establish real DR and referring domain baseline | Replaces estimates with actuals in MEMORY.md | SEO |
| MEDIUM | Actively solicit G2 reviews from existing customers (target: 100+ reviews) | Review platform: 40 → 70+ | CS/Marketing |
| LOW | Pursue The New Stack, InfoQ, or similar tech press coverage | Brand mentions: 35 → 50+ | PR |
| LOW | Submit for Gartner Peer Insights category listing | Brand mentions: step-change if achieved | Marketing |

### What to track monthly in MEMORY.md

Add a `## Brand Authority Snapshot` section each month with:

```
## Brand Authority Snapshot — [YYYY-MM-DD]
- Tool used: [Ahrefs / Semrush / Moz]
- Domain Rating (DR): [value]
- Referring domains: [value]
- Toxic link %: [value]
- G2 rating / review count: [value]
- Gartner Peer Insights: [present / not present]
- Press mentions this quarter: [count + notable outlets]
- Composite Brand Authority score: [0–100]
- Delta vs last snapshot: [+/- X]
```

## Severity levels

- **CRITICAL** — Blocks indexing or causes penalties. Fix immediately.
- **HIGH** — Significantly impacts rankings. Fix within 1 week.
- **MEDIUM** — Optimization opportunity. Fix within 1 month.
- **LOW** — Nice to have. Backlog.

## What "regression" means

A regression is when a previously **resolved** item goes back to broken. NOT every score drop. Examples:

- ✅ Real regression: `/what-is-tidb/` was 200, now returns 404. Fix → bump back to LIVE.
- ❌ Not a regression: AEO score is 8.5 vs 9.0 — but no items got broken; the 9.0 was from adding a new feature, and the feature is still there.
- ⚠️ False positive: Cache headers showing `no-store` because the auditor checked `www.pingcap.com/wp-content/master.js` (404 page) instead of `static.pingcap.com/dist/js/master.de2e30391a4361733b0b.js` (real CDN URL with immutable headers).

When in doubt, manually verify the regression before flagging.

## What "improvement" means

A new positive change since the last audit. Examples:
- A previously-CRITICAL item moves to RESOLVED
- A new AEO signal added (e.g., new comparison page, new Article schema on blog)
- A score in any category goes up by 2+ points
- A page like `/what-is-tidb/` previously 404 is now LIVE

## How to handle ambiguous changes

If a signal moved but you're unsure if it's positive/negative/expected:

1. **Cross-check with another source** — e.g., new comparison pages: re-query sitemap; new articles: count again with grep.
2. **Compare against the previous audit's verbatim wording** — if the prior audit said "Comparison pages: 11", and you see 12 today, that's an improvement.
3. **Ask Udi** if you can't tell whether something is intentional. The team often makes changes without flagging the audit program.

## Treating "AEO score" as a step function, not a gradient

AEO scores have moved like this in the program: 3.5 → 6.5 → 7.5 → 8.0 → 8.5 → 8.5 → 8.5 → 8.5 → 9.0.

Notice:
- Long flat periods (8.5 for 4 weeks) followed by step changes (8.5 → 9.0 from /what-is-tidb/).
- The score increments are deliberate — each 0.5-point jump should map to a specific shipping event (a new page, a schema cleanup, a security header set).
- Don't fudge it. If nothing material shipped this week, don't claim "+0.1". Hold the score.

## When to do a fresh deep audit (not just weekly)

The original Mar 9 audit identified 34 distinct items via 6 parallel subagents. This deep audit is the heaviest lift. Re-do it when:

- A major redesign happens (e.g., a new homepage like Apr 12-13 — actually the Mar 9 audit caught most of the issues that landed in Apr)
- Quarterly, regardless
- A new SEO tool or audit framework is adopted

For routine weekly runs, the 24-signal check from `prompts/01-weekly-audit.md` is sufficient.

## False positives we've encountered (avoid)

1. **Cache header on master.js — FALSE POSITIVE for 3 weeks.** Always check the URL on `static.pingcap.com`, not the WP path.
2. **Glossary "empty" — FALSE NEGATIVE.** The glossary uses inline definitions (no sub-page links), so a script counting links found 0. The page actually has 13–17 well-defined terms.
3. **"943 articles in sitemap" — was a real finding, not a false positive.** Resolved over 4 weeks of cleanup, ending at 242.

## Things that aren't in the audit but should be (future work)

- Conversion tracking (Click_to_Cloud, form_trial — broken since Mar 18)
- Visual/mobile rendering (Playwright not always run)
- Backlink profile — **now formally scoped** in the Brand Authority & Backlinks category above. Pending Ahrefs/Semrush tool access to replace estimated baseline with actuals.
- Content depth scoring (we count words but don't assess quality)

These aren't blockers for the weekly audit, but worth raising to Udi if you're building out the program.

## When to scrap the framework

Don't. The 8-week arc that took AEO from 3.5 to 9.0 was driven by this exact framework. The discipline of weekly comparison + memory + structured findings is what made progress visible to the rest of the marketing team. If you change the framework mid-stream, the WoW comparison breaks and the program loses credibility.

If the framework needs evolution (e.g., new signals to track), add them — but keep the historical 24-signal core intact for continuity.
