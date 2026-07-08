---
id: composio
name: "Composio"
type: tool
job: [orchestration]
description: "Integration platform providing 250+ managed, authenticated tools (Gmail, Slack, GitHub...) to any AI agent framework"
url: "https://composio.dev"
cost_model: freemium
pricing_detail: "Free tier; usage-based paid plans for higher tool-call volumes and enterprise auth"
tags: [tool-use, agents, orchestration]
maturity: beta
stack: [python, typescript]
free_tier: true
free_tier_limits: "Free tier with monthly tool-call quota"
self_hostable: false
open_source: true
source_url: "https://github.com/ComposioHQ/composio"
docs_url: "https://docs.composio.dev/docs"
github_url: "https://github.com/ComposioHQ/composio"
alternatives: [chrome-devtools-mcp]
integrates_with: [langchain, crewai, openai-agents-sdk]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, production]
best_when:
  - "Your agent needs authenticated access to many SaaS apps and you don't want to build/maintain OAuth flows per app"
  - "You want tools that work identically across frameworks (OpenAI SDK, LangChain, CrewAI) and via MCP"
avoid_when:
  - "Strict data-control requirements — tool calls and tokens transit Composio's managed auth layer"
  - "You only need 1-2 integrations; wiring those APIs directly avoids a platform dependency"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (29,134), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: watching
verdict_rationale: "Strongest managed tool-catalog play for agents; the category (vs raw MCP servers) is still shaking out"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/ComposioHQ/composio", "date": "2026-07-08", "description": "29,134 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A managed tool layer for AI agents: Composio handles the OAuth/auth lifecycle and API surface for 250+ applications, exposing them as agent-callable tools with per-user connected accounts, so an agent can read Gmail or file a Jira ticket without custom integration code.

## Why It's in the Arsenal

Composio earns a place in the Arsenal because it directly addresses a recurring decision point: your agent needs authenticated access to many SaaS apps and you don't want to build/maintain OAuth flows per app. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- 250+ prebuilt tools with managed auth (OAuth, API keys)
- Per-user connected accounts and permission scoping
- Framework adapters (LangChain, CrewAI, OpenAI) + MCP endpoint

## Architecture / How It Works

Composio stores per-user credentials in its auth vault, translates each app's API into normalized tool schemas, and executes tool calls server-side on behalf of a connected account; SDK adapters render the same catalog into each framework's native tool format.

## Getting Started

```bash
pip install composio
# then: composio login && composio add github
```

## Use Cases

1. **Scenario**: your agent needs authenticated access to many SaaS apps and you don't want to build/maintain OAuth flows per app
2. **Scenario**: you want tools that work identically across frameworks (OpenAI SDK, LangChain, CrewAI) and via MCP
3. **Scenario where this is NOT the right fit**: strict data-control requirements — tool calls and tokens transit Composio's managed auth layer — evaluate an alternative instead

## Strengths

- Your agent needs authenticated access to many SaaS apps and you don't want to build/maintain OAuth flows per app
- You want tools that work identically across frameworks (OpenAI SDK, LangChain, CrewAI) and via MCP

## Limitations / When NOT to Use

- Strict data-control requirements — tool calls and tokens transit Composio's managed auth layer
- You only need 1-2 integrations; wiring those APIs directly avoids a platform dependency

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `chrome-devtools-mcp` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `composio`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://composio.dev)
- [Documentation](https://docs.composio.dev/docs)
- [GitHub](https://github.com/ComposioHQ/composio)

## Buzz & Reception

- 29,134 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
