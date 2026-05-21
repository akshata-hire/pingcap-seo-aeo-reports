# Prompt 1 — Weekly SEO/AEO Audit

**When to use:** Every week, first prompt in the workflow.
**Time:** ~10 minutes (Claude does the work; you just review).
**What it produces:** A structured findings table you'll feed into Prompt 2.

---

## Copy-paste this prompt into Claude Code

```
Run the weekly SEO/AEO audit on pingcap.com. Compare the current state against the last audit recorded in memory/MEMORY.md.

For each of the 24 tracked signals below, run the live HTTP check, capture the current reading, and compare to the prior value in memory. Output a structured Markdown table with columns: # | Signal | Last week | This week | Delta.

Group findings into:
- IMPROVEMENTS (signal got better)
- REGRESSIONS (signal got worse — flag these prominently)
- STABLE (no change)
- NEW FINDINGS (something not previously tracked)

Then propose top 3 actions for next week.

THE 24 SIGNALS:

1. Homepage <title> — curl -s https://www.pingcap.com/ | grep -oE '<title>[^<]+</title>'
2. Homepage schema types — curl -s https://www.pingcap.com/ | grep -oE '"@type"\s*:\s*"[^"]*"' | sort -u
3. FAQPage on homepage — should be 0 — curl -s https://www.pingcap.com/ | grep -c 'FAQPage'
4. AggregateRating on homepage — should be 0 — curl -s https://www.pingcap.com/ | grep -c 'AggregateRating'
5. AggregateRating on /tidb/ — should be 1 — curl -s https://www.pingcap.com/tidb/ | grep -c 'AggregateRating'
6. /what-is-tidb/ status — should be 200 — curl -sI https://www.pingcap.com/what-is-tidb/ | head -1
7. Glossary heading count — curl -s https://www.pingcap.com/glossary/ | grep -oE '<h[2-4][^>]*>[^<]+</h' | wc -l
8. Comparison pages count — curl -s https://www.pingcap.com/page-sitemap.xml | grep -c '<loc>[^<]*compare[^<]*</loc>'
9. Articles in sitemap — curl -s https://www.pingcap.com/article-sitemap.xml | grep -c '<url>'
10. AI bot rules in robots.txt — curl -s https://www.pingcap.com/robots.txt | grep -E 'GPTBot|ClaudeBot|PerplexityBot|GoogleOther|anthropic-ai' | wc -l
11. llms.txt status — curl -sI https://www.pingcap.com/llms.txt | head -1
12. /.well-known/llms.txt status — curl -sI https://www.pingcap.com/.well-known/llms.txt | head -1
13. Hero fetchpriority count — curl -s https://www.pingcap.com/ | grep -c 'fetchpriority="high"'
14. Render-blocking scripts — curl -s https://www.pingcap.com/ | grep -oE '<script[^>]*src="[^"]*"[^>]*>' | grep -v 'defer\|async' | wc -l
15. data-src images — curl -s https://www.pingcap.com/ | grep -c 'data-src='
16. Image format mix — curl -s https://www.pingcap.com/ | grep -oE 'src="[^"]*\.(png|jpg|jpeg|webp|avif|svg|gif)"' | grep -oE '\.[a-z]+\"' | sort | uniq -c
17. master.js cache headers — find the URL in homepage HTML, then check it directly:
    MASTERJS=$(curl -s https://www.pingcap.com/ | grep -oE 'https?://[^"]*master\.[a-f0-9]+\.js' | head -1)
    curl -sI "$MASTERJS" | grep -i cache-control
    (Should be public, max-age=31536000, immutable. If you see no-store, ONLY trust this if the URL is on static.pingcap.com — the WordPress path returns a 404 with no-store, which is a false positive.)
18. Security headers — curl -sI https://www.pingcap.com/ | grep -ciE 'strict-transport|x-frame|x-content-type|referrer-policy|permissions-policy|content-security-policy'
19. Thank-you pages indexed — curl -s https://www.pingcap.com/page-sitemap.xml | grep -c 'thank-you'
20. Solutions pages broken — Pull all /solutions/ URLs from the sitemap and check each for 404s:
    SOLUTIONS=$(curl -s https://www.pingcap.com/page-sitemap.xml | grep -oE '<loc>[^<]*/solutions/[^<]+</loc>' | sed 's/<\/?loc>//g')
    for URL in $SOLUTIONS; do STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$URL"); if [ "$STATUS" = "404" ]; then echo "404: $URL"; fi; done
    NOTE: Only flag a 404 as a REGRESSION if the URL appeared in a prior audit or has GSC impressions. A 404 on a URL with no GSC history is LOW priority cleanup, not a regression.
21. About page leadership — curl -s https://www.pingcap.com/about-us/ | grep -oiE '\b(CEO|CTO|founder|co-founder|chief)\b[^<]{0,80}' | head -3
    NOTE: Use \b word boundaries to avoid false positives where 'cto' appears inside other words (e.g. 'Vector', 'directory'). If no results, report as "No leadership titles found" — do not report a false positive as stable.
22. TTFB — curl -o /dev/null -s -w "%{time_starttransfer}\n" https://www.pingcap.com/
23. GTM container count — curl -s https://www.pingcap.com/ | grep -oE 'GTM-[A-Z0-9]+' | sort -u | wc -l
24. New comparison pages — curl -s https://www.pingcap.com/page-sitemap.xml | grep -oE '<loc>[^<]*compare[^<]*</loc>' | sort

KEY GOTCHAS (read carefully):
- Cache header check on master.js: MUST use the full URL from the homepage HTML (which lives on static.pingcap.com). Never test the wp-content path — it returns a 404 with no-store and creates false-positive regression alerts.
- /solutions/ at root level is a 301 redirect, not a 404 — that's expected.
- /product/ is a 301 to /tidb/ — also expected.
- AggregateRating count 1 on /tidb/ is GOOD (intentional, scoped). Anything more than 1 across the site is a regression.
- FAQPage anywhere is BAD (Google restricted FAQ rich results to gov/health since Aug 2023).
- Signal 21 word boundaries: always use \b anchors in the grep pattern — without them, 'cto' inside words like 'Vector' or 'directory' produces false positives.
- Signal 20 404 triage: a 404 on a URL with no prior audit history and no GSC impressions is LOW priority cleanup, not a regression. Only flag as REGRESSION if the URL was previously returning 200 in memory or has visible GSC traffic.
- NEW BASELINE signals: if memory/MEMORY.md has no stored value for a signal, record the current reading as the new baseline in your output AND remind the operator to run Prompt 5 to persist it. Do not mark these as regressions or improvements — they are starting points.

OPEN ITEMS RESOLUTION CHECK:

After the 24-signal table, read the most recent progress report in reports-archive/progress-reports/ and extract every open item (CRITICAL, HIGH, MEDIUM, LOW). For each one, check whether it has been resolved, regressed further, or is still open based on today's live readings. Output a second table:

| # | Item | Prior severity | Status | Evidence |
|---|------|---------------|--------|----------|
| 1 | CSP still report-only | MEDIUM | ⚠️ REGRESSED — now completely absent | Signal 18: 5 headers vs 6 |
| 2 | No /compare/ hub page | MEDIUM | Still open | No /compare/ landing found |
| 3 | Glossary at 17 terms | MEDIUM | ✅ RESOLVED — now 49 terms | Signal 7: 49 headings |
| ... | ... | ... | ... | ... |

Mark each item as:
- ✅ RESOLVED — clearly fixed, remove from open list
- ⚠️ REGRESSED — got worse since last report
- 🔄 IN PROGRESS — partially improved but not done
- ⏸ STILL OPEN — no change
- ❓ NEEDS MANUAL CHECK — can't verify via curl (e.g. image-based content, JS-rendered)

This section feeds directly into the "Items Still Open" section of Prompt 2, so be thorough. Do not skip items just because they aren't covered by the 24 signals — use targeted curl checks or note them as needing manual verification.

Run all checks in parallel where possible (multiple Bash invocations in the same message). Output the comparison table at the end.
```

---

## Expected Claude Code response

Claude will:
1. Read `memory/MEMORY.md` to get last week's values
2. Run ~24 `curl` commands in parallel
3. Parse the output and compare each signal to memory
4. Produce a structured table:

```
| # | Signal | Last week | This week | Delta |
|---|---|---|---|---|
| 5 | /what-is-tidb/ | 200 (3K words) | 200 | Stable |
| 8 | Comparison pages | 11 | 12 | +1 NEW |
| 21 | TTFB | 265ms | 92ms | RECOVERED ✓ |
| ... | ... | ... | ... | ... |

IMPROVEMENTS: ...
REGRESSIONS: ...
STABLE: ...
NEW FINDINGS: ...

TOP 3 ACTIONS:
1. ...
2. ...
3. ...
```

You'll review this. If something looks wrong (a false-positive regression, an unexpected change), spot-check by re-running that specific `curl` yourself before flagging it in the report.

## What to do after Prompt 1

If everything looks reasonable → proceed to **Prompt 2** (`02-progress-report.md`) to generate the polished `.md` + `.docx`.

If something is anomalous → investigate before generating reports. Common gotchas:
- A "regression" that's actually a false positive (cache header URL bug — see Pitfalls in WEEKLY-RUNBOOK.md)
- A page redirect interpreted as a 404
- A schema count change that's actually a Yoast plugin update, not an intentional move

When in doubt, ask Udi.
