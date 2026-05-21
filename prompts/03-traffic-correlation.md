# Prompt 3 — Traffic Correlation (GA4)

**When to use:** When something material changed (new homepage, new product launch, repositioning, AI-themed content). Skip on routine weeks.
**Time:** 10–15 minutes.
**What it produces:** Updates `reports-archive/traffic-analysis/homepage-launch-impact-analysis.html` with the latest week of data, plus week-over-week comparison.

---

## Copy-paste this prompt into Claude Code

```
Pull GA4 data for the last 7 days and update the rolling traffic correlation dashboard at reports-archive/traffic-analysis/homepage-launch-impact-analysis.html.

DATE WINDOWS:
- Pull last 35 days from today: [today minus 35] through [today]
- Or extend the existing dashboard window from where it left off

GA4 QUERIES (run in parallel):

1. Active users + new users daily:
   mcp__google-analytics__getActiveUsers
   startDate: [35 days ago], endDate: [today]

2. User behavior (bounce rate, session duration):
   mcp__google-analytics__getUserBehavior
   startDate: [35 days ago], endDate: [today]

3. Homepage / PVs:
   mcp__google-analytics__runReport
   dimensions: [{"name": "date"}]
   metrics: [{"name": "screenPageViews"}]
   dimensionFilter: {"filter": {"fieldName": "pagePath", "stringFilter": {"matchType": "EXACT", "value": "/"}}}

4. /ai/ PVs:
   Same as #3 but matchType: "BEGINS_WITH", value: "/ai/"

5. /compare/ PVs:
   Same with matchType: "BEGINS_WITH", value: "/compare/"

6. Channel sessions (direct + google + AI referrers):
   dimensions: [{"name": "date"}, {"name": "sessionSource"}]
   metrics: [{"name": "sessions"}]
   dimensionFilter (orGroup with 7 sources):
     (direct), google, chatgpt.com, gemini.google.com, copilot.microsoft.com, perplexity.ai, claude.ai

7. Hostname breakdown (signups proxy):
   dimensions: [{"name": "date"}, {"name": "hostName"}]
   metrics: [{"name": "sessions"}, {"name": "newUsers"}]
   dimensionFilter (orGroup): auth.tidbcloud.com, tidbcloud.com

DEFINITIONS (use consistently):
- Pre baseline = Apr 5–11 (clean week before Apr 12-13 homepage launch)
- DO NOT use Mar 29-Apr 4 as baseline — that week had a Mar 30 article-cleanup recrawl spike
- Signups proxy = auth.tidbcloud.com newUsers (Click_to_Cloud event tracking has been broken since Mar 18)
- AI referrer total = sum of chatgpt.com + claude.ai + perplexity.ai + copilot.microsoft.com + gemini.google.com (most LLM traffic strips referrer and lands in (direct), so this is just the visible tip)

WEEKLY WINDOWS (for rolling 6-week analysis):
- Anchor on Apr 12-13 launch date
- Each window = 7 days starting Tuesday
- Pre W-1 = Apr 5-11
- Post W1 = Apr 14-20
- Post W2 = Apr 21-27
- Post W3 = Apr 28-May 4
- Post W4 = May 5-11
- ... and so on
- ⚠️ REMINDER: Add a new window row each week. The windows above are hardcoded examples — extend them forward from today's date when running this prompt.

OUTPUT:

1. Update reports-archive/traffic-analysis/homepage-launch-impact-analysis.html — extend the daily data arrays in the script section to include new days. Add a new row in the WoW summary table. Update headline stats. Re-run the AEO score timeline interpolation if AEO changed.

2. Save a fresh markdown summary at reports-archive/traffic-analysis/launch-impact-summary-YYYY-MM-DD.md with:
   - Top-line numbers (3-4 stats)
   - Week-over-week deltas
   - AEO correlation read (any score moves this week)
   - 3 things to watch next week

KEY ANALYSIS QUESTIONS TO ANSWER:

1. Has the post-launch lift held, accelerated, or settled? (Compare each week to Pre W-1.)
2. Is signup conversion still climbing? (auth.tidbcloud.com newUsers daily average)
3. Are AI referrers responding to recent content launches? (e.g., /what-is-tidb/ went live Apr 30 — should drive AI referral lift in W4-W6 as LLMs recrawl)
4. Any channel showing decay? (Direct often spikes then settles — track durability of each channel separately)
5. Engagement: bounce rate and session duration trend (audience-broadening trade-off)

CAVEATS TO REMEMBER:
- Click_to_Cloud and form_trial events broken since Mar 18. Don't use them for conversion analysis.
- Most AI traffic is hidden in (direct). Direct traffic ≈ branded search + dark social + AI assistants.
- Calendar mix matters. Compare matched windows (Tue-Mon vs Tue-Mon), not arbitrary 7-day chunks.
- Google organic = ranking signal. Direct = mixed bag. Treat them differently.

If GA4 MCP isn't available, paste in raw GA4 data manually from the web UI for these dimensions.
```

---

## Fallback: GA4 web UI export

If MCP isn't available, you can pull the same data manually:

1. Open https://analytics.google.com/analytics/web/
2. Select pingcap.com property
3. Reports → Acquisition → Traffic Acquisition (for source breakdown)
4. Reports → Engagement → Pages and Screens (for /ai/, /compare/, homepage PVs)
5. Custom report: hostName breakdown across tidbcloud.com / auth.tidbcloud.com / zero.tidbcloud.com
6. Export each as CSV
7. Paste the CSVs into a Claude Code session and ask Claude to do the analysis with hardcoded data

The dashboard regeneration is the same — just data pasted as Python literals or JS constants instead of pulled live.

## Verifying the dashboard

After update:

```bash
open reports-archive/traffic-analysis/homepage-launch-impact-analysis.html
```

Charts should render with the new days extending to the right. Headline stats at top should reflect the new week. If anything looks broken (chart cuts off, missing data points), check that the `DATES`, `USERS`, `DIRECT`, `GOOGLE`, etc. arrays in the JavaScript all have the same length.
