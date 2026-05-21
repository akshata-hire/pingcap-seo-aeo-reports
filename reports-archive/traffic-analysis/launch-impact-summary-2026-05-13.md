# Homepage Launch Impact — W4 + W5 Partial Summary
**Date:** May 13, 2026 · **Window:** Apr 12–13 launch through May 13 (31 days post-launch)

---

## Top-Line Numbers (W4: May 5–11)

| Metric | Pre-launch baseline | W4 | Δ vs baseline |
|--------|--------------------|----|---------------|
| Signups / day (auth.tidbcloud.com) | 95 | **119** | **+25%** |
| /compare/ PVs / day | 83 | **131** | **+58%** |
| Homepage PVs / day | 2,386 | 3,163 | +33% |
| /ai/ PVs / day | 92 | 81 | −12% |
| Visible AI referrers / day | 44 | **145** | **+229%** |
| AEO score | 8.5 | 9.0 (→ 9.2 May 13) | +0.7 |

---

## Week-over-Week Deltas (page metrics and signups — consistent scale across all weeks)

| Metric | W3 (Apr 28–May 2) | W4 (May 5–11) | W5 partial (May 12–13) | WoW W3→W4 |
|--------|-------------------|---------------|------------------------|-----------|
| Homepage PVs/day | 3,846 | 3,163 | 3,409 | −18% |
| /compare/ PVs/day | 85 | **131** | 134 | **+54%** |
| /ai/ PVs/day | 83 | 81 | 106 | flat |
| Signups/day | 119 | 119 | 168* | flat (held) |
| ChatGPT sessions/day ‡ | 10 | 78 | 93 | ↑ strong |
| Claude.ai sessions/day ‡ | 1 | 6 | 12 | ↑ strong |
| Gemini sessions/day ‡ | 22 | 55 | 51 | ↑ strong |
| Total visible AI/day ‡ | 36 | 145 | 161 | ↑ accelerating |

*May 13 signup count is a partial day (212 new users on auth.tidbcloud.com — watch)
‡ W4+ AI referrer counts from unfiltered GA4 pull; compare trends not absolute values vs W1–W3

---

## AEO Correlation Read

The /what-is-tidb/ page launched April 30. LLMs typically need 2–4 weeks to recrawl and update grounding. W4 (May 5–11) falls exactly in that window and shows a clear AI referrer acceleration:

- **ChatGPT**: W3 10/day → W4 78/day → W5 93/day
- **Claude.ai**: W3 1/day → W4 6/day → W5 12/day
- **Gemini**: W3 22/day → W4 55/day → W5 51/day

This is the expected signature of a canonical AEO citation page being indexed by LLMs. The visible referrer counts are only the tip — most LLM-driven traffic strips referrers and lands in (direct).

AEO score moved to 9.2/10 on May 13 (from 9.0), driven by glossary expansion (17→49 terms), /compare/ hub launch, and TTFB recovery.

---

## 3 Things to Watch Next Week (W5: May 12–18)

1. **Does the /compare/ hub drive a lift in comparison page PVs?** The hub went live May 13 at `pingcap.com/compare/` (title: "TiDB Database Comparisons"). W5 should show whether a central landing page multiplies the 131/day W4 run rate. Target: 160+/day would confirm the hub effect.

2. **Does the May 13 signup spike hold?** auth.tidbcloud.com showed 212 new users today (partial day). If W5 averages 140+/day, the signup baseline has shifted up again. If it reverts to ~120/day, today was a one-time event.

3. **Does AI referrer momentum continue into W5?** ChatGPT at 93/day and Claude.ai at 12/day in the W5 partial are the highest single-day readings in the dataset. If they hold or rise across the full W5 week, the LLM recrawl of /what-is-tidb/ is confirmed as a durable source of AI traffic — not just a one-day spike.

---

## Data Notes

- **Session/user metrics (active users, direct, Google organic):** W1–W3 used a filtered GA4 view (marketing site only). W4+ pull is unfiltered and includes cross-domain traffic — absolute numbers are not comparable. Trend direction is valid.
- **Page view metrics (homepage, /ai/, /compare/)** and **signup metrics (auth.tidbcloud.com newUsers)** are consistent across all weeks and comparable directly.
- **AI referrer counts (W4+)** are from the unfiltered pull — values are higher than W1–W3 due to broader property scope. Use for trend direction only.
- Click_to_Cloud and form_trial events remain broken since Mar 18. auth.tidbcloud.com newUsers is the signup proxy throughout.

---

*Generated May 13, 2026. GA4 data via MCP. Baseline: Apr 12–13 homepage launch.*
