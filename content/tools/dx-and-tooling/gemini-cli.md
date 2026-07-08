---
id: gemini-cli
name: "Gemini CLI"
type: tool
job: [prototyping]
description: "Google's open-source terminal AI agent that brings Gemini models to the command line with a generous free tier"
url: "https://github.com/google-gemini/gemini-cli"
cost_model: freemium
pricing_detail: "Open-source CLI; generous free personal quota with a Google account, paid via API key beyond that"
tags: [code-gen, agents, tool-use]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: "Free personal usage quota with a Google account; limits may change"
self_hostable: false
open_source: true
source_url: "https://github.com/google-gemini/gemini-cli"
docs_url: "https://google-gemini.github.io/gemini-cli/"
github_url: "https://github.com/google-gemini/gemini-cli"
alternatives: [claude-code, aider, openai-codex-cli]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - "You want a free-tier agentic coding CLI to evaluate the workflow before committing to a paid tool"
  - "You are on the Google/Gemini stack and want MCP support plus built-in web search grounding in the terminal"
avoid_when:
  - "You need the model itself to be open or self-hostable — the CLI is Apache-2.0 but calls hosted Gemini"
  - "Your benchmark-critical workloads have only been validated on Claude/GPT-family coding models"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (105,843), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The lowest-friction free entry into terminal agentic coding, and fully open-source client code"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/google-gemini/gemini-cli", "date": "2026-07-08", "description": "105,843 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

An open-source (Apache-2.0) AI agent for the terminal from Google: a Gemini-powered agent loop with file editing, shell execution, MCP support, and web grounding, notable for its unusually generous free personal quota.

## Why It's in the Arsenal

Gemini CLI earns a place in the Arsenal because it directly addresses a recurring decision point: you want a free-tier agentic coding CLI to evaluate the workflow before committing to a paid tool. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Agent loop with built-in file, shell, and web-search tools
- MCP server support for custom tool integration
- Free personal quota; open-source client under Apache-2.0

## Architecture / How It Works

A Node.js CLI that streams a ReAct-style loop against Gemini models: built-in tools (grep, file edit, terminal, web fetch/search) plus user-configured MCP servers are exposed to the model, with user confirmation before mutating actions.

## Getting Started

```bash
npm install -g @google/gemini-cli
gemini
```

## Use Cases

1. **Scenario**: you want a free-tier agentic coding CLI to evaluate the workflow before committing to a paid tool
2. **Scenario**: you are on the Google/Gemini stack and want MCP support plus built-in web search grounding in the terminal
3. **Scenario where this is NOT the right fit**: you need the model itself to be open or self-hostable — the CLI is Apache-2.0 but calls hosted Gemini — evaluate an alternative instead

## Strengths

- You want a free-tier agentic coding CLI to evaluate the workflow before committing to a paid tool
- You are on the Google/Gemini stack and want MCP support plus built-in web search grounding in the terminal

## Limitations / When NOT to Use

- You need the model itself to be open or self-hostable — the CLI is Apache-2.0 but calls hosted Gemini
- Your benchmark-critical workloads have only been validated on Claude/GPT-family coding models

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `claude-code`, `aider`, `openai-codex-cli` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `gemini-cli`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://github.com/google-gemini/gemini-cli)
- [Documentation](https://google-gemini.github.io/gemini-cli/)
- [GitHub](https://github.com/google-gemini/gemini-cli)

## Buzz & Reception

- 105,843 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
