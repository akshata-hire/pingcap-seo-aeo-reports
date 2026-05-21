# SEO/AEO Weekly Analysis — Handoff Package

> **For:** [Team Member Name]
> **From:** Udi Gotlieb
> **Last audit run:** April 30, 2026 (AEO 9.0/10, SEO Health ~82/100, 0 critical items open)
> **Site under audit:** pingcap.com

---

## What this is

You're inheriting a weekly SEO + AEO (Answer Engine Optimization) auditing program that has tracked pingcap.com from March 6 through April 30, 2026. The program has:

- **Run 9 progress reports** (.md + .docx) showing week-over-week SEO/AEO improvements
- **Resolved 23 of 34 originally identified issues** (68%) — 0 critical items now remain
- **Improved AEO score from 3.5/10 to 9.0/10** in 8 weeks
- **Tracked 11 comparison pages, 17 glossary terms, 6 of 7 security headers**
- **Correlated traffic impact** of the Apr 12-13 homepage repositioning ("Database for AI Agents")

You'll continue the weekly cadence, comparing each new run against the prior baseline.

---

## What's in this package

```
handoff-package/
├── README.md                    ← You are here
├── SETUP.md                     ← One-time setup on your machine
├── WEEKLY-RUNBOOK.md            ← The 30-min weekly workflow
├── prompts/                     ← Copy-paste prompts for Claude Code
│   ├── 01-weekly-audit.md
│   ├── 02-progress-report.md
│   ├── 03-traffic-correlation.md
│   ├── 04-competitive-check.md
│   └── 05-update-memory.md
├── templates/                   ← Reusable report generators
│   ├── gen-progress-docx.js     (Word doc template)
│   ├── gen-dashboard-html.html  (Interactive dashboard template)
│   └── progress-report.md       (Markdown template)
├── reports-archive/             ← All 9 historical reports + audits
│   ├── audits/                  (initial deep audits)
│   ├── progress-reports/        (weekly progress)
│   ├── competitive/             (vs CockroachDB, Yugabyte, etc.)
│   └── traffic-analysis/        (GA4 correlation reports)
├── memory/
│   └── MEMORY.md                ← Latest state snapshot (Apr 30)
└── reference/
    ├── audit-framework.md       ← The scoring methodology
    ├── ai-bot-list.md           ← Which AI bots we explicitly allow
    └── 34-item-tracker.csv      ← Original issue list with status
```

---

## Three-minute orientation

1. **Read this README** (you're doing it). Then:
2. **Read `SETUP.md`** (~10 min) — install Node, npm packages, configure your Claude Code, verify GA4 MCP access.
3. **Read `WEEKLY-RUNBOOK.md`** (~5 min) — the actual workflow you run each week.
4. **Skim `memory/MEMORY.md`** — current state of the site.
5. **First run:** Schedule for May 7 (next Wednesday). Use the prompts in `prompts/` directly in Claude Code.

---

## What requires you to have

- **Claude Code installed** ✓ (you do)
- **Mac/Linux/WSL with bash** ✓
- **Node.js 18+** (install via Homebrew if missing)
- **Python 3.12+** (for any data processing)
- **GA4 MCP access** — needs to be added to your Claude Code config (see SETUP.md). Asia/Shanghai timezone is the default.
- **Read-only access to pingcap.com** (it's public — `curl` is enough)

You do **NOT** need a dedicated SEO tool subscription. All audits are based on (a) live HTTP requests to pingcap.com, (b) GA4 data via MCP, (c) your own Claude Code reasoning.

---

## How to handle handoff

For your first weekly run:
1. Compare against the **Apr 30 baseline** (last reading: `reports-archive/progress-reports/pingcap-seo-aeo-progress-2026-04-30.md`).
2. Use **PRE W-1 = Apr 5–11** as the long-term traffic baseline if you do correlation analysis (PRE W-2 had a Mar 30 article-cleanup recrawl anomaly — see `reference/audit-framework.md`).
3. **Memory updates are crucial** — at the end of each weekly run, update `memory/MEMORY.md` with the new readings. The next run depends on it.

---

## Questions / handoff sync

If you hit anything unclear:
- **Site context** (why we made certain decisions, what the team prioritized) → ask Udi
- **Tooling** (Claude Code, MCP, scripts) → check SETUP.md, then ask Udi
- **Methodology** (how scoring works, what's a regression vs false positive) → see `reference/audit-framework.md`

The cleanest handoff is: do one full run together with Udi watching, then run solo from week 2 onward.

---

*Generated May 6, 2026. Latest data through May 2.*
