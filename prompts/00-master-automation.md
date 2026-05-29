# PingCAP SEO/AEO Weekly Report — Master Automation Prompt

**Paste this entire prompt into Claude Code at the start of each weekly run.**
**Claude Code will execute the full workflow end-to-end without further input.**

---

## Context for Claude Code

You are running the weekly SEO/AEO audit and report generation for PingCAP (pingcap.com). This is a fully automated workflow — complete every step below without stopping to ask questions unless you hit a genuine blocker you cannot resolve yourself.

**Package location:** `/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator`
**Memory file:** `memory/MEMORY.md` — read this first, it contains last week's baseline
**Report archive:** `reports-archive/progress-reports/`
**Today's date:** Use the real system date for all filenames and report headers

---

## STEP 1 — Read memory baseline

Read `memory/MEMORY.md` in full. Note:
- Last audit date and scores (AEO, SEO Health, critical count)
- All 24 signal values from last week
- Open items list
- Brand Authority snapshot (if present)

This is your comparison baseline for the entire run.

---

## STEP 2 — Run all 24 live signal checks

Run all 24 checks **in parallel** (multiple bash calls in one message). For each signal, capture the current value and compare to last week's value in memory.

```bash
# Run these in parallel:

# 1. Homepage title
curl -s https://www.pingcap.com/ | grep -oE '<title>[^<]+</title>'

# 2. Homepage schema types
curl -s https://www.pingcap.com/ | grep -oE '"@type"\s*:\s*"[^"]*"' | sort -u

# 3. FAQPage on homepage (should be 0)
curl -s https://www.pingcap.com/ | grep -c 'FAQPage'

# 4. AggregateRating on homepage (should be 0)
curl -s https://www.pingcap.com/ | grep -c 'AggregateRating'

# 5. AggregateRating on /tidb/ (should be exactly 1)
curl -s https://www.pingcap.com/tidb/ | grep -c 'AggregateRating'

# 6. /what-is-tidb/ status (should be 200)
curl -o /dev/null -s -w "%{http_code}" https://www.pingcap.com/what-is-tidb/

# 7. Glossary heading count (target 50+)
curl -s https://www.pingcap.com/glossary/ | grep -oE '<h[2-4][^>]*>[^<]+</h' | wc -l

# 8. Comparison pages count
curl -s https://www.pingcap.com/page-sitemap.xml | grep -c '<loc>[^<]*compare[^<]*</loc>'

# 9. Articles in sitemap
curl -s https://www.pingcap.com/article-sitemap.xml | grep -c '<url>'

# 10. AI bot rules in robots.txt (count of bots allowed)
curl -s https://www.pingcap.com/robots.txt | grep -E 'GPTBot|ClaudeBot|PerplexityBot|GoogleOther|anthropic-ai' | wc -l

# 11. llms.txt status (should be 200)
curl -o /dev/null -s -w "%{http_code}" https://www.pingcap.com/llms.txt

# 12. /.well-known/llms.txt status (should be 200, currently 404)
curl -o /dev/null -s -w "%{http_code}" https://www.pingcap.com/.well-known/llms.txt

# 13. Hero fetchpriority="high" count (should be ≥1)
curl -s https://www.pingcap.com/ | grep -c 'fetchpriority="high"'

# 14. Render-blocking scripts (lower is better)
curl -s https://www.pingcap.com/ | grep -oE '<script[^>]*src="[^"]*"[^>]*>' | grep -v 'defer\|async' | wc -l

# 15. data-src images (should be 0)
curl -s https://www.pingcap.com/ | grep -c 'data-src='

# 16. Image format mix
curl -s https://www.pingcap.com/ | grep -oE 'src="[^"]*\.(png|jpg|jpeg|webp|avif|svg|gif)"' | grep -oE '\.[a-z]+"' | sort | uniq -c

# 17. master.js cache headers (MUST use static.pingcap.com URL from homepage HTML)
MASTERJS=$(curl -s https://www.pingcap.com/ | grep -oE 'https?://[^"]*master\.[a-f0-9]+\.js' | head -1)
curl -sI "$MASTERJS" | grep -i cache-control

# 18. Security headers count (should be 6+)
curl -sI https://www.pingcap.com/ | grep -ciE 'strict-transport|x-frame|x-content-type|referrer-policy|permissions-policy|content-security-policy'

# 19. Thank-you pages in sitemap (should be 0)
curl -s https://www.pingcap.com/page-sitemap.xml | grep -c 'thank-you'

# 20. Solutions pages 404 check (dynamic — check all /solutions/ URLs)
SOLUTIONS=$(curl -s https://www.pingcap.com/page-sitemap.xml | grep -oE '<loc>[^<]*/solutions/[^<]+</loc>' | sed 's/<\/?loc>//g')
for URL in $SOLUTIONS; do STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$URL"); if [ "$STATUS" = "404" ]; then echo "404: $URL"; fi; done

# 21. About page leadership (word-boundary grep)
curl -s https://www.pingcap.com/about-us/ | grep -oiE '\b(CEO|CTO|founder|co-founder|chief)\b[^<]{0,80}' | head -3

# 22. TTFB
curl -o /dev/null -s -w "%{time_starttransfer}\n" https://www.pingcap.com/

# 23. GTM container count (should be 1)
curl -s https://www.pingcap.com/ | grep -oE 'GTM-[A-Z0-9]+' | sort -u | wc -l

# 24. Full comparison pages list
curl -s https://www.pingcap.com/page-sitemap.xml | grep -oE '<loc>[^<]*compare[^<]*</loc>' | sort
```

### Signal check rules
- Signal 17 (cache headers): ONLY trust the URL on `static.pingcap.com`. The wp-content path returns `no-store` as a false positive — ignore it.
- Signal 20 (404s): Only flag as REGRESSION if the URL was previously 200 in memory. A URL with no prior history = LOW cleanup item, not a regression.
- Signal 21 (leadership): `\b` word boundaries are mandatory — without them, "cto" inside "Vector" or "directory" is a false positive.
- FAQPage anywhere = BAD (Google restricted since Aug 2023).
- AggregateRating = 0 on homepage, exactly 1 on /tidb/. Any other value = regression.
- NEW BASELINE: if memory has no prior value for a signal, record it as baseline. Do not call it a regression.

---

## STEP 3 — Open items resolution check

Read the most recent `.md` report in `reports-archive/progress-reports/`. Extract every open item (CRITICAL / HIGH / MEDIUM / LOW). For each, check whether it is resolved, regressed, in progress, or still open based on today's live readings.

Output a table:

| # | Item | Prior severity | Status | Evidence |
|---|------|----------------|--------|----------|
| 1 | Example item | MEDIUM | ✅ RESOLVED | Signal X now reads Y |
| 2 | Example item | HIGH | ⏸ STILL OPEN | No change detected |
| 3 | Example item | MEDIUM | ⚠️ REGRESSED | Was X, now Y |

Status options: ✅ RESOLVED / ⚠️ REGRESSED / 🔄 IN PROGRESS / ⏸ STILL OPEN / ❓ NEEDS MANUAL CHECK

---

## STEP 4 — Compile findings table

Output the full 24-signal comparison table:

| # | Signal | Last week | This week | Delta |
|---|--------|-----------|-----------|-------|
| 1 | ... | ... | ... | ... |

Then group into: IMPROVEMENTS / REGRESSIONS / STABLE / NEW FINDINGS

Then state TOP 3 ACTIONS FOR NEXT WEEK.

---

## STEP 5 — Generate markdown report

Write the full `.md` report to:
```
reports-archive/progress-reports/pingcap-seo-aeo-progress-[TODAY'S DATE].md
```

Use this exact structure:

```markdown
# PingCAP.com SEO / AEO Progress Report — [Date]

> **Baseline:** [Prior date] (AEO X.X/10, SEO ~XX/100, X critical open)
> All data verified via live HTTP requests on [Date].

---

## AEO Score: X.X/10
## SEO Health Score: ~XX/100

---

## Headline
[1-2 sentences on the most important change this week]

---

## Signal-by-Signal Tracker
[Full 24-signal table]

---

## What Improved
[Table: # | Change | Impact | Evidence]

---

## Regression Watch
[Table of regressions, or "No regressions detected."]

---

## Items Still Open

### CRITICAL (X)
### HIGH (X)
### MEDIUM (X)
### LOW (X)
### ✅ Resolved This Week (X)

---

## Scoring Update

| Category | Weight | Last Week | This Week | Delta | Notes |
|---|---|---|---|---|---|
| Technical SEO | 19% | | | | |
| Content Quality | 19% | | | | |
| On-Page SEO | 18% | | | | |
| AI Search Readiness | 15% | | | | |
| Brand Authority & Backlinks | 12% | | | [Use last snapshot from MEMORY.md] | |
| Schema | 10% | | | | |
| Performance | 4% | | | | |
| Visual/Mobile | 3% | | | | |
| **Weighted Total** | | | | | |

---

## Progress Arc
[Append new row to the running table. Keep all rows — do not truncate.]

| Date | AEO | SEO | Articles | Critical | Key Achievement |
|------|-----|-----|----------|----------|-----------------|

---

## Top 3 Actions for Next Week

| # | Action | Impact | Effort |
|---|--------|--------|--------|

---
*Report generated [Date]. Baseline: [Prior date].*
```

---

## STEP 6 — Generate Word document (.docx)

1. Read `templates/gen-progress-docx.js` — understand the DATA object structure (lines 20–120)
2. Copy it to `templates/gen-progress-[TODAY'S DATE].js`
3. Edit ONLY the DATA object — populate every field from the findings above:
   - `reportDate`, `baselineDate`, `aeoScore`, `seoScore`, `criticalCount`
   - `headlineTitle`, `headlineBody`
   - `improvements` array
   - `regressions` array
   - `scoring` array — 8 rows, weights locked (19/19/18/15/12/10/4/3%)
   - `openCritical`, `openHigh`, `openMedium`, `openLow` arrays
   - `resolvedThisWeek` array
   - `progressArc` — append this week's row
   - `cumulativeStats` — update current values
   - `topActions`
   - `outputPath` — update date in filename
4. Run from package root:
   ```bash
   cd "/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator"
   node templates/gen-progress-[TODAY'S DATE].js
   ```
5. Confirm output: `✅ Done: reports-archive/progress-reports/pingcap-seo-aeo-progress-[DATE].docx`

**Rules:**
- Do NOT edit anything below `DO NOT EDIT BELOW THIS LINE` in the template
- Do NOT leave any prior date strings in the DATA object
- Scoring weights in the DATA object must match exactly: 19/19/18/15/12/10/4/3

---

## STEP 7 — Update memory

Rewrite `memory/MEMORY.md` with a fresh snapshot. The file must contain:
- Today's date as the new "Last Audit"
- Prior date as the new "Baseline"
- Updated AEO and SEO Health scores
- Updated values for all 24 tracked signals
- Big wins flagged with 🎉, regressions flagged with ⚠️
- Open items count + the most critical 2–3 by name
- Cumulative resolution stats

Confirm the write by showing the first 20 lines of the updated file.

---

## STEP 8 — Run Brand Authority pull

```bash
cd "/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator"
node scripts/brand-authority-pull.js
```

This pulls backlink data from DataForSEO and brand mention data from Semrush, calculates week-on-week deltas, and appends a snapshot to `memory/MEMORY.md`. If credentials are missing, print the exact export commands needed and continue with the rest of the workflow.

---

## STEP 9 — Upload to Google Drive

```bash
cd "/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator"
node scripts/upload-report-to-drive.js
```

This uploads both the `.md` and `.docx` for today's date to the `SEO_AEO_weekly_report` folder. Confirm with the Drive link for each uploaded file.

If auth is needed (first time or token expired), follow the browser auth flow and paste the code back.

---

## STEP 10 — Final summary

After completing all steps, output a single summary block:

```
✅ Weekly run complete — [TODAY'S DATE]

SCORES:
  AEO:        X.X/10  ([+/-X] from prior)
  SEO Health: XX/100  ([+/-X] from prior)
  Critical:   X open

THIS WEEK:
  Improvements: X
  Regressions:  X
  New findings: X

OUTPUTS:
  ✅ reports-archive/progress-reports/pingcap-seo-aeo-progress-[DATE].md
  ✅ reports-archive/progress-reports/pingcap-seo-aeo-progress-[DATE].docx
  ✅ memory/MEMORY.md updated
  ✅ Google Drive uploaded: [link]
  ✅ Brand Authority snapshot appended

TOP 3 ACTIONS FOR NEXT WEEK:
  1. [Action]
  2. [Action]
  3. [Action]
```

---

## Error handling rules

- If a curl check fails or times out: retry once. If it fails again, record "CHECK FAILED" for that signal and continue — do not stop the whole run.
- If the docx script errors: show the error, fix it, and retry. Do not skip the docx output.
- If Google Drive upload fails: show the error but continue — the files are already saved locally.
- If Brand Authority credentials are missing: skip Steps 8 and note it in the final summary. All other steps still run.
- If memory/MEMORY.md can't be written: show the full intended content so it can be pasted manually.
- Never stop mid-run to ask clarifying questions unless you encounter a genuine ambiguity that cannot be resolved from the package files.

---

## Reference: scoring weights (locked — do not change)

| Category | Weight |
|---|---|
| Technical SEO | 19% |
| Content Quality | 19% |
| On-Page SEO | 18% |
| AI Search Readiness | 15% |
| Brand Authority & Backlinks | 12% |
| Schema | 10% |
| Performance | 4% |
| Visual/Mobile | 3% |

## Reference: AEO score signals

| Signal | Points |
|---|---|
| AI bot rules in robots.txt | +1.0 |
| /what-is-tidb/ live | +1.0 |
| Schema cleanup (FAQPage absent + AggregateRating scoped) | +1.0 |
| 10+ comparison pages | +1.5 |
| 5–9 comparison pages | +1.0 |
| 1–4 comparison pages | +0.5 |
| llms.txt present | +0.5 |
| Glossary present | +0.5 |
| FAQ page | +0.5 |
| Named authors with Person schema | +0.5 |
| Organization schema | +0.5 |
| Security headers | +0.5 |
| Article cleanup | +0.5 |
| Thank-you page noindex | +0.5 |
| /.well-known/llms.txt missing | −0.25 |
