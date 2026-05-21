# Prompt 5 — Update Memory (Final Step)

**When to use:** Last prompt in every weekly run. Do not skip — next week's analysis depends on it.
**Time:** 1 minute.
**What it produces:** Updated `memory/MEMORY.md` reflecting today's readings.

---

## Copy-paste this prompt into Claude Code

```
Update memory/MEMORY.md with this week's readings. Replace the entire file with a fresh snapshot reflecting:

1. Today's date as the new "Last Audit"
2. The prior week's date as the new "Baseline"
3. Updated AEO score and SEO Health score
4. Updated values for all 24 tracked signals
5. Any new "big wins" from this week (highlight with 🎉 emoji)
6. Any new regressions (highlight with ⚠️)
7. Items still open (just the count + the most critical 2-3 by name)
8. Cumulative resolution stats (X of 34 items)

Use the structure of the existing memory file as the template. Keep it concise — this is a snapshot, not an essay.

Also update the project-level Claude Code memory at the appropriate path (~/.claude/projects/.../memory/MEMORY.md) so the next session loads the new state by default.

Confirm the file was written by showing me the first 20 lines.
```

---

## Memory file template

For reference, the memory file should look roughly like:

```markdown
# SEO Project Memory

## Last Audit
- **Date:** YYYY-MM-DD
- **Baseline:** [Prior week date] (AEO X.X/10, SEO ~XX/100, Y critical open)
- **Site:** pingcap.com (www.pingcap.com)
- **CMS:** WordPress + Yoast SEO
- **AEO Score:** X.X/10 (up/down from X.X on prior, 3.5 on Mar 9)
- **SEO Health Score:** ~XX/100 (up/down from ~XX on prior, 52 on Mar 9)
- **🎉 [This week's big win, if any]**
- **⚠️ [This week's regression, if any]**
- **Comparison pages:** X (up/down from X on prior)
- **Articles in sitemap:** X (down from 943 on Mar 9)
- **Critical items open:** X
- **Items resolved:** X of 34 (XX%)
- **Glossary terms:** X
- **FAQ questions:** X
- **Render-blocking scripts:** X (down from 11 on Mar 9)
- **Schema cleanup:** [current state]
- **Security headers:** X of 7
- **GTM:** [container ID]
- **Cache:** master.js/master.css confirmed `public,max-age=31536000,immutable` on static.pingcap.com
- **Reports folder:** /Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator/

## SEO Skill
- (Same as before — not used in routine weekly runs)
- Python: /opt/homebrew/bin/python3.12
- PATH note: /opt/homebrew/bin must be on PATH
```

## After memory is updated

You're done with the weekly run. Run the Drive upload, then optionally commit and share:

**1. Run Brand Authority pull (always do this weekly)**
```bash
cd "/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator"

# First time only
npm install googleapis

node scripts/brand-authority-pull.js
```
Pulls backlink + mention data, calculates week-on-week deltas automatically, appends snapshot to `memory/MEMORY.md`.

**2. Upload reports to Google Drive (always do this)**
```bash
node scripts/upload-report-to-drive.js
```
Uploads both `.md` and `.docx` for today's date to the `SEO_AEO_weekly_report` folder:
https://drive.google.com/drive/folders/10n88MEowXKf2ZL6pL5Q46WDiFmZ-HLaO

**2. Commit to git** (if version-controlled):
```bash
cd "/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator"
git add -A
git commit -m "Weekly audit YYYY-MM-DD — [one-line summary]"
```

**3. Plan next week** — note any "things to watch" in your calendar so you remember to verify them.

## What "fresh memory" enables

When you start next week's audit (Prompt 1), Claude Code reads `memory/MEMORY.md` first to know what last week's values were. Without an updated memory file, every weekly run looks like a "first run" with no baseline — you lose the WoW comparison.

So: **always end the run with this prompt**.
