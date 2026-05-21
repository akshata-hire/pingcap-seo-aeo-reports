# Weekly Runbook — 30–45 minutes

## Cadence

Run the SEO/AEO audit **once per week**, ideally on the same weekday (Wednesdays worked well for Udi). Each run:

1. Re-checks live state of pingcap.com
2. Compares to last week's baseline
3. Updates the GA4 traffic correlation if relevant
4. Generates `.md` + `.docx` progress report
5. Updates `memory/MEMORY.md` with the new readings
6. Uploads both files to Google Drive

## The 5-prompt workflow

Open Claude Code in `/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator`. Use these prompts in order. Each is in `prompts/`.

### Prompt 1 — Weekly SEO/AEO audit (10 min)

Open `prompts/01-weekly-audit.md`, copy its contents, paste into Claude Code. It will:
- Check 24 signals via `curl`/HTTP requests
- Compare to memory baseline
- Identify changes (improvements + regressions)
- Output a structured findings table

### Prompt 2 — Generate progress report (5–10 min)

Open `prompts/02-progress-report.md`. It takes the findings from Prompt 1 and produces:
- `pingcap-seo-aeo-progress-YYYY-MM-DD.md` in `reports-archive/progress-reports/`
- `pingcap-seo-aeo-progress-YYYY-MM-DD.docx` (Word doc, polished)

### Prompt 3 — Traffic correlation (optional, 10–15 min)

Skip in week-over-week runs unless something major changed (new homepage, new comparison page, etc.). Use `prompts/03-traffic-correlation.md` when you need to:
- Pull last week + this week of GA4 data
- Compare day-over-day or week-over-week
- Update the interactive HTML dashboard

### Prompt 4 — Competitive snapshot (run monthly, 5 min)

Use `prompts/04-competitive-check.md` once a month (or when CockroachDB / YugabyteDB / PlanetScale make notable moves). Checks AI bot rules, llms.txt, comparison pages, glossary on each competitor.

### Prompt 5 — Update memory (1 min)

Use `prompts/05-update-memory.md` last. Updates `memory/MEMORY.md` with the new readings so next week's run starts from the right baseline.

## Decision tree

```
Is this a normal week (no major site change)?
├── YES → Run Prompts 1, 2, 5 only (~20 min)
└── NO  → Run Prompts 1, 2, 3, 5 (~40 min)

Has it been ~30 days since last competitive check?
├── YES → Add Prompt 4 (5 min)
└── NO  → Skip

After Prompt 5 — always run both:
├── node scripts/brand-authority-pull.js  (~2 min — weekly, auto-calculates WoW delta)
└── node scripts/upload-report-to-drive.js  (~1 min)
    Uploads .md + .docx to: https://drive.google.com/drive/folders/10n88MEowXKf2ZL6pL5Q46WDiFmZ-HLaO
```

## What the audit checks each week

The 24 signals tracked weekly (from `prompts/01-weekly-audit.md`) — numbers match Prompt 1 exactly:

| # | Signal | What's checked | Current baseline |
|---|---|---|---|
| 1 | Homepage `<title>` | Captured for repositioning detection | "Database for AI Agents \| TiDB..." |
| 2 | Homepage schema types | JSON-LD `@type` list | Organization, SoftwareApplication, WebSite, WebPage, BreadcrumbList, SearchAction, Offer |
| 3 | FAQPage on homepage | Should be 0 (restricted since Aug 2023) | 0 ✓ |
| 4 | AggregateRating on homepage | Should be 0 | 0 ✓ |
| 5 | AggregateRating on /tidb/ | Should be exactly 1 | 1 ✓ |
| 6 | /what-is-tidb/ status | Should be 200 | 200 ✓ |
| 7 | Glossary heading count | Target 50+ (CockroachDB has 50+) | 49 |
| 8 | Comparison pages count | From `page-sitemap.xml` | 11 |
| 9 | Articles in sitemap | From `article-sitemap.xml` | 242 |
| 10 | AI bot rules in robots.txt | Count of bots explicitly allowed | 5 |
| 11 | llms.txt status | Should be 200 | 200 ✓ |
| 12 | /.well-known/llms.txt | Should be 200 — currently 404 | 404 ⚠️ |
| 13 | Hero fetchpriority="high" | Should be ≥1 | 2 ✓ |
| 14 | Render-blocking scripts | Lower is better | 5 |
| 15 | data-src images | Should be 0 | 0 ✓ |
| 16 | Image format mix | Track PNG/SVG/WebP ratio | 1 PNG, 27 SVG |
| 17 | master.js cache headers | Should be `public,max-age=31536000,immutable` on static.pingcap.com | ✓ immutable |
| 18 | Security headers | Count of 6 checked headers present | 5/7 ⚠️ (was 6, regressed May 13) |
| 19 | Thank-you pages indexed | Should be 0 | 0 ✓ |
| 20 | Solutions pages 404s | Dynamic check across all /solutions/ URLs in sitemap | Checked dynamically |
| 21 | About page leadership | \bCEO\|CTO\|founder\b match — word-boundary anchored | No titles found |
| 22 | TTFB | Target <200ms | 142ms (recovered May 13) |
| 23 | GTM container count | Should be 1 | 1 ✓ |
| 24 | New comparison pages | Full /compare/* list from sitemap | 11 pages |

## What gets logged each week

After each run, the following are committed to memory:

- AEO score (current /10)
- SEO Health score (estimated /100)
- 24 signal readings vs prior week
- Items resolved / items still open
- Any new regressions
- Top 3 next-week actions

## When to escalate to Udi

- A previously-resolved item regresses
- New CRITICAL severity item appears (e.g., site goes down, schema removed unexpectedly, /what-is-tidb/ returns 404 again)
- TTFB stays above 200ms for 2+ consecutive weeks
- AEO score drops by more than 0.5
- A competitor (CockroachDB especially) makes a major AEO move

## Where outputs go

| File | Location | Format |
|---|---|---|
| Weekly progress report (markdown) | `reports-archive/progress-reports/pingcap-seo-aeo-progress-YYYY-MM-DD.md` | .md |
| Weekly progress report (Word) | `reports-archive/progress-reports/pingcap-seo-aeo-progress-YYYY-MM-DD.docx` | .docx |
| Traffic correlation dashboard | `reports-archive/traffic-analysis/launch-impact-YYYY-MM-DD.html` | .html (open in browser) |
| Competitive analysis | `reports-archive/competitive/pingcap-aeo-geo-competitive-YYYY-MM-DD.md` | .md |
| Memory update | `memory/MEMORY.md` (overwrite) | .md |

## First week — what's special

For your **first run** (recommended: May 7):

1. **Use the Apr 30 audit as your "last checkpoint"** baseline. It's at `reports-archive/progress-reports/pingcap-seo-aeo-progress-2026-04-30.md`.
2. **Read the full audit history first** — `reference/audit-history.md` shows the 8-week arc.
3. **Run Prompt 3 (traffic correlation)** for your first run — there's interesting W4 data to capture (signups durability test, /what-is-tidb/ AI-referrer impact).
4. **Schedule a 30-min sync with Udi** after your first run to confirm interpretations are correct.

## Common pitfalls

| Pitfall | Avoidance |
|---|---|
| Reporting cache-header regression on master.js/master.css | Always check `static.pingcap.com/dist/...` URL, NOT `www.pingcap.com/wp-content/...`. The WP path returns 404 with no-store headers. The real CDN path has immutable headers. |
| Counting comparison pages from cached lists | Always re-query `page-sitemap.xml` — the team adds new ones frequently |
| Treating PreW2 (Mar 29–Apr 4) as a normal baseline for traffic | It had a Mar 30 article-cleanup recrawl spike. Use PreW1 (Apr 5–11) as the clean baseline. |
| Using the Mar 18 conversion event tracking as ground truth | `Click_to_Cloud` and `form_trial` events have been broken since Mar 18. Use `auth.tidbcloud.com` newUsers as the signup proxy instead. |
| Comparing against 5-day or partial weeks as if they were full weeks | Always compare daily averages, not totals. |

## Commit cadence (optional)

If you version-control this folder (recommended):

```bash
cd /Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator
git init  # first time only
git add -A
git commit -m "Weekly audit YYYY-MM-DD"
```

Past reports stay in `reports-archive/` indefinitely. The historical record is the most valuable artifact of this program.
