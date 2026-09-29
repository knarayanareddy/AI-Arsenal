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

Install the npm package, then make one call to confirm the credentials, network path and configuration are reachable before wiring Gemini CLI into anything else. The command below calls the hosted service against the `prototyping` job and returns a result you can inspect directly.

```bash
npm install -g @google/gemini-cli
gemini
```

Follow the official documentation at https://google-gemini.github.io/gemini-cli/ for the authentication and configuration options, because the defaults in the quickstart are the ones most likely to need changing for real traffic.

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

- _Verified for Gemini CLI: stars, license and last-commit come from the GitHub API as of 2026-07-08; the feature list and integration surface are read from the project's own documentation. The best_when/avoid_when judgement above is documentation-derived and has not been re-confirmed against hands-on production use in this environment, so treat the cost, limits and failure modes as claims to check against your workload._

## Integration Patterns

- *Wiring*: adopt Gemini CLI as a TypeScript package in the same runtime as your API against the `prototyping` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `claude-code`, `aider`, `openai-codex-cli` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Deployment and cost*: Confirm which tier you are on before committing: free-tier limits change, and a self-hosted option usually exists if the hosted quota becomes the constraint.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Official Site](https://github.com/google-gemini/gemini-cli)
- [Documentation](https://google-gemini.github.io/gemini-cli/)
- [GitHub](https://github.com/google-gemini/gemini-cli)

## Buzz & Reception

- 105,843 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer; both verified via the GitHub API.*
