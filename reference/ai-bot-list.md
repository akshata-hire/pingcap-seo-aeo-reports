# AI Bot List — Currently Allowed in robots.txt

PingCAP's `robots.txt` explicitly allows these 5 AI crawlers, in addition to the standard `User-agent: *` block.

| User-Agent | Operator | What it powers |
|---|---|---|
| `GPTBot` | OpenAI | ChatGPT, GPT-4 grounding |
| `ClaudeBot` | Anthropic | Claude.ai web search |
| `PerplexityBot` | Perplexity | Perplexity AI search |
| `GoogleOther` | | Search & SGE |
| `anthropic-ai` | Anthropic (older UA) | Legacy Claude grounding |

## Live verification

```bash
curl -s https://www.pingcap.com/robots.txt
```

Expected output includes:
```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: anthropic-ai
Allow: /
```

## Why each matters

- **GPTBot** — ChatGPT search grounding. Most-used LLM.
- **ClaudeBot** — Claude.ai's web search citation source.
- **PerplexityBot** — Perplexity is the fastest-growing AI search engine for technical queries.
- **GoogleOther** — Google's experimental crawlers (SGE, AI Overviews).
- **anthropic-ai** — Older Anthropic crawler, kept for backwards compatibility.

## Bots NOT explicitly listed (but allowed via wildcard)

The `User-agent: *` block at top has `Disallow:` (empty), meaning all crawlers are allowed by default. Adding explicit blocks for the 5 above signals affirmative welcome — useful for AI-bot-cautious organizations that may default to blocking.

## Bots we deliberately don't list

- `CCBot` (CommonCrawl) — used by some LLMs but allowed via wildcard
- `Bytespider` (TikTok) — allowed via wildcard
- `Amazonbot` — allowed via wildcard
- `OAI-SearchBot` — newer OpenAI crawler; consider adding when verified

## When to add a new bot

If a new AI search engine launches with significant traction, add its bot to robots.txt. Examples to watch:

- `Mistralbot` (if Mistral launches a search product)
- `xAI` related bots (Grok)
- `OAI-SearchBot` (newer OpenAI)
- `CodyBot` (Sourcegraph Cody)

Adding more is harmless. Removing one is risky — the LLM may already have a grounding entry that depends on the explicit allow.

## Audit signal

The weekly audit (`prompts/01-weekly-audit.md`, signal #9) checks the count of explicit bot allows. Currently 5. If it drops below 5, that's a regression.
