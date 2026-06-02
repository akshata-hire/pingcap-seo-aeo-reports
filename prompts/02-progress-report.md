# Prompt 2 — Generate Progress Report (Markdown + Word)

**When to use:** After Prompt 1 produces the findings table.
**Time:** 5–10 minutes.
**What it produces:** `pingcap-seo-aeo-progress-YYYY-MM-DD.md` + `.docx` in `reports-archive/progress-reports/`.

---

## Copy-paste this prompt into Claude Code (in the same session as Prompt 1)

```
Now generate the formal progress report from the findings above. Two outputs needed:

1. Markdown file at:
   reports-archive/progress-reports/pingcap-seo-aeo-progress-YYYY-MM-DD.md
   (Replace YYYY-MM-DD with today's date, ISO format)

2. Word document at:
   reports-archive/progress-reports/pingcap-seo-aeo-progress-YYYY-MM-DD.docx

Use templates/gen-progress-docx.js as the docx template — copy it, update the data and date, then run with `node`.

REPORT STRUCTURE (markdown):

# PingCAP.com SEO / AEO Progress Report — [Date]

> **Baseline:** [Prior audit date] (AEO X.X/10, SEO Health ~XX/100)
> All data verified via live HTTP requests on [Date].

---

## AEO Score: X.X/10 ([change] from prior)
## SEO Health Score: ~XX/100 ([change] from prior)

---

## Headline (1-2 sentences on the most important change)

---

## Signal-by-Signal Tracker

[The full 24-signal comparison table from Prompt 1]

---

## What Improved Since [Prior Date]

[Table: # | Change | Impact | Evidence]

---

## Regression Watch

[Table or "No regressions detected." Be honest. If it's a false-positive (e.g., cache header URL bug), call it out as such, not as a real regression.]

---

## Items Still Open

[Pull directly from the Open Items Resolution table produced in Prompt 1. Include ALL items not marked ✅ RESOLVED. Update severity if anything regressed. Add any new items surfaced by today's audit. Format:]

### CRITICAL (count)
[List]

### HIGH (count)
[List]

### MEDIUM (count)
[List]

### LOW (count)
[List]

### ✅ RESOLVED THIS WEEK (count)
[List items that were open last week and are now closed — with evidence]

---

## Scoring Update

| Category | Weight | Last Week | This Week | Delta | Notes |
|----------|--------|-----------|-----------|-------|-------|
| Technical SEO | 19% | XX | XX | +/-X | ... |
| Content Quality | 19% | XX | XX | +/-X | ... |
| On-Page SEO | 18% | XX | XX | +/-X | ... |
| AI Search Readiness | 15% | XX | XX | +/-X | ... |
| Brand Authority & Backlinks | 12% | XX | XX | +/-X | Monthly pull — use last snapshot from MEMORY.md if no new pull this week |
| Schema | 10% | XX | XX | +/-X | ... |
| Performance | 4% | XX | XX | +/-X | ... |
| Visual/Mobile | 3% | XX | XX | +/-X | ... |
| **Weighted Total** | | XX | XX | +/-X | ... |

---

## Progress Arc (running history)

[Append a new row to the table from prior week's report. Pull last 8 weeks max, oldest at top.]

| Date | AEO | SEO | Articles | Critical Open | Key Achievement |
|------|-----|-----|----------|---------------|-----------------|

---

## Top 3 Actions for Next Week

| # | Action | Impact | Effort |
|---|--------|--------|--------|

---

*Progress report generated [Date]. All findings verified via live HTTP requests.*
*Baseline: pingcap-seo-aeo-progress-[prior-date].md*

GENERATING THE WORD DOC:

The template at templates/gen-progress-docx.js is a Node.js script using docx-js. Read it first to understand the structure, then:

## Generating the .docx

The template at `templates/gen-progress-docx.js` is **data-driven** — all content lives in the `DATA` object at the top of the file (lines 20–120). The rendering engine below it never needs to change.

Steps:
1. Copy `templates/gen-progress-docx.js` to `templates/gen-progress-YYYY-MM-DD.js`
2. **Edit ONLY the DATA object** — update every field using this week's audit findings:
   - `reportDate`, `baselineDate`, `aeoScore`, `seoScore`, `criticalCount`
   - `headlineTitle`, `headlineBody`
   - `improvements` array (from Prompt 1 IMPROVEMENTS section)
   - `regressions` array (from Prompt 1 REGRESSIONS section)
   - `scoring` array — 8 rows, weights are locked (19/19/18/15/12/10/4/3%)
   - `openCritical/High/Medium/Low` arrays (from Prompt 1 Open Items Resolution table)
   - `resolvedThisWeek` array
   - `progressArc` — append this week's row, keep all rows
   - `cumulativeStats` — update current values
   - `topActions` — replace with this week's top 3
   - `outputPath` — update date in filename
3. Run from the package root:
   ```bash
   node templates/gen-progress-YYYY-MM-DD.js
   ```
4. Verify the .docx appears in `reports-archive/progress-reports/`

**Do NOT edit anything below the "DO NOT EDIT BELOW THIS LINE" comment in the template.**

Make sure to:
- Use TiDB brand colors: dark BG #1A1A2E, accent #2E75B6, white text, card BG #232845
- Color-code severity: green #228B22, amber #CC7700, red #CC0000
- Use Arial font throughout
- Status badges colored by severity
- Include a header bar and page footer with page number

If the docx fails to render, common issues:
- Smart quotes broken: use ’ not '
- Color hex must NOT have # prefix in docx-js
- Table widths must be set with WidthType.DXA, not PERCENTAGE
- ShadingType must be CLEAR, not SOLID
```

---

## Verifying outputs

After Claude finishes:

```bash
ls -lh reports-archive/progress-reports/pingcap-seo-aeo-progress-*.md
ls -lh reports-archive/progress-reports/pingcap-seo-aeo-progress-*.docx
```

Both files should exist for today's date. Open the .docx in Word/Pages to confirm formatting looks clean (header bar, page numbers, severity colors visible).

If the .docx looks off, ask Claude:

> Verify the .docx file just generated. Use the docx skill to convert it to PDF, render the PDF to JPG, and visually inspect for issues (overlapping elements, text overflow, color contrast).

## What to do after Prompt 2

- If anything material happened (new homepage, big traffic spike, AEO step change) → run **Prompt 3** for traffic correlation.
- If it's a routine week → skip to **Prompt 5** to update memory.
- Around the start of each month → run **Prompt 4** for competitive snapshot.
