---
name: Scoring weights source of truth
description: When generating the Scoring Update table in progress reports, always read weights from reference/audit-framework.md — not from the prompt template or hardcoded values
type: feedback
---

Always read SEO Health Score category weights from `reference/audit-framework.md` when generating the Scoring Update table. Do not use weights hardcoded in prompt templates (e.g., `prompts/02-progress-report.md`).

**Why:** The framework doc is the authoritative source and gets updated when methodology changes. Prompt templates may lag behind. Trusting stale template values causes silent inconsistencies in week-over-week comparisons.

**How to apply:** Before writing the Scoring Update table in any progress report, read `reference/audit-framework.md` and extract the weight table. Use those values. If the template and the framework doc disagree, the framework doc wins — and flag the discrepancy so the template can be updated.

Current weights (as of audit-framework.md, Apr 30 2026 revision):
- Technical SEO: 19%
- Content Quality: 19%
- On-Page SEO: 18%
- AI Search Readiness: 15%
- Brand Authority & Backlinks: 12%
- Schema: 10%
- Performance: 4%
- Visual/Mobile: 3%
