# Setup — One-time, ~15 minutes

## Prerequisites checklist

| Requirement | Check command | If missing |
|---|---|---|
| Claude Code | `which claude` | Install from https://claude.com/claude-code |
| Node.js 18+ | `node --version` | `brew install node` |
| Python 3.12+ | `python3 --version` (or `python3.12 --version`) | `brew install python@3.12` |
| Homebrew (Mac) | `brew --version` | https://brew.sh |
| Git | `git --version` | comes with Xcode tools |

## Step 1: Place the handoff package

Decide where the working folder lives. Recommend:

```bash
mkdir -p "/Users/akshatahire/Desktop/Claude_Code/AEO"
# Package already located at: /Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator
cd /Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator
```

All paths in the prompts/runbook assume this location. If you put it elsewhere, do a find-and-replace on `/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator` in the prompts before running.

## Step 2: Install npm dependencies (one-time)

The Word doc and PowerPoint generators use `docx` and `pptxgenjs`:

```bash
cd "/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator"
npm install docx pptxgenjs
```

Verify:

```bash
node -e "console.log(require('docx').Document ? 'docx OK' : 'fail')"
node -e "console.log(require('pptxgenjs') ? 'pptx OK' : 'fail')"
```

## Step 3: GA4 MCP integration

The traffic-correlation reports depend on GA4 data via MCP. You need to:

1. **Get GA4 access** for the pingcap.com property. Ask Udi to add `your-email@pingcap.com` as a Viewer or Analyst role in Google Analytics.
2. **Configure Claude Code MCP**. Open `~/.claude/mcp_servers.json` (or use Claude Code's MCP UI):

```json
{
  "mcpServers": {
    "google-analytics": {
      "command": "npx",
      "args": ["-y", "@google/analytics-mcp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/Users/your-username/.claude/ga4-service-account.json"
      }
    }
  }
}
```

(Or use whatever GA4 MCP server your org has standardized on. Udi uses one that exposes `getActiveUsers`, `getUserBehavior`, `getEvents`, and `runReport`.)

3. **Verify MCP works**: in a Claude Code session, run:

```
List the available tools that start with mcp__google-analytics__
```

If you see `getActiveUsers`, `runReport`, etc., you're good.

If GA4 MCP isn't available, you can still run audits — only the traffic-correlation reports will need data pasted from the GA4 web UI manually. See `prompts/03-traffic-correlation.md` fallback section.

## Step 4: Optional — Install Claude SEO skill

The original audits used the `claude-seo` skill (from AgriciDaniel/claude-seo). It's not required for weekly runs (Udi stopped using it after the initial deep audit in March), but useful if you want to do a fresh deep audit at any point:

```bash
curl -fsSL https://raw.githubusercontent.com/AgriciDaniel/claude-seo/main/install.sh | bash
```

Requires Python 3.10+ and Playwright Chromium. The installer handles both.

## Step 5: Set up project memory

Claude Code keeps per-project memory in `~/.claude/projects/<project-hash>/memory/MEMORY.md`. The first time you run Claude Code in `/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator`, it creates this folder.

Copy the current memory snapshot in:

```bash
mkdir -p ~/.claude/projects/-Users-akshatahire-Desktop-Claude_Code-AEO-SEO report generator/memory
cp memory/MEMORY.md ~/.claude/projects/-Users-akshatahire-Desktop-Claude_Code-AEO-SEO report generator/memory/MEMORY.md
```

Replace the `-Users-akshatahire-Desktop-Claude_Code-AEO-SEO report generator` part with the actual project hash if your folder structure differs. Easiest way to find the right path: open Claude Code, run any command, then check `~/.claude/projects/` — there will be a folder named after your current working directory with dashes instead of slashes.

## Step 6: Test the toolchain

Run this end-to-end test from `/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator`:

```bash
# Test 1: live HTTP fetch on pingcap.com
curl -sI https://www.pingcap.com/ | head -5

# Test 2: schema check on homepage
curl -s https://www.pingcap.com/ | grep -oE '"@type"\s*:\s*"[^"]*"' | sort -u

# Test 3: comparison page count
curl -s https://www.pingcap.com/page-sitemap.xml | grep -c '<loc>[^<]*compare[^<]*</loc>'

# Test 4: Node + docx
cd "/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator"
node -e "const {Document} = require('docx'); console.log('docx loaded:', !!Document)"
```

All four should produce output (status codes, schema types, a number, "docx loaded: true").

## Step 7: Verify Claude Code is configured for this work

Open Claude Code in `/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator`, then ask:

```
What's in this folder? Show me the README and SETUP.
```

If Claude reads them and summarizes, you're set up correctly.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `node: command not found` | `brew install node` |
| `docx not found` | Run `npm install docx pptxgenjs` from `/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator` (parent folder) |
| GA4 MCP returns 0 rows | Verify the GA4 property ID is correct and your service-account JSON has access |
| Claude says it can't run Bash | Open Claude Code settings → enable Bash tool. The audits depend heavily on `curl` |
| Memory file not loading | Check the project-hash folder name in `~/.claude/projects/` and adjust accordingly |
| Smart quotes in DOCX look wrong | Use the smart-quote XML entities in `templates/gen-progress-docx.js`, e.g. `’` not `'` |

---

## Time budget for setup

- Environment install: 5–10 min
- GA4 MCP config: 5–10 min (depends on whether you have access)
- Memory + test runs: 5 min
- **Total: ~20 min one-time**

Once set up, weekly runs take 30–45 min. See `WEEKLY-RUNBOOK.md`.
