---
id: goose
name: "Goose"
type: tool
job: [prototyping, orchestration]
description: "Block's open-source, extensible local AI agent that automates engineering tasks end-to-end via MCP extensions"
url: "https://block.github.io/goose/"
cost_model: open-source
pricing_detail: "Free and open source (Apache-2.0); pay your own model provider"
tags: [agents, tool-use, code-gen]
maturity: beta
stack: [rust]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/block/goose"
docs_url: "https://goose-docs.ai"
github_url: "https://github.com/block/goose"
alternatives: [claude-code, aider, openai-codex-cli]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - "You want an open-source agent that treats MCP as the native extension mechanism — every capability is an MCP server"
  - "You need both CLI and desktop-app form factors over the same agent, with any LLM provider"
avoid_when:
  - "You want the most battle-tested coding-specific loop; Claude Code and aider have deeper coding refinement"
  - "Environments where running an agent with broad local permissions is unacceptable without extra sandboxing"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (50,838), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The most MCP-native open agent, backed by Block's production usage; general-purpose rather than coding-only"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/block/goose", "date": "2026-07-08", "description": "50,838 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

An open-source AI agent from Block (Square) that runs locally as a CLI or desktop app: it plans and executes multi-step engineering tasks — coding, testing, debugging, workflow automation — with all capabilities delivered through MCP-based extensions and any LLM behind it.

## Why It's in the Arsenal

Goose earns a place in the Arsenal because it directly addresses a recurring decision point: you want an open-source agent that treats MCP as the native extension mechanism — every capability is an MCP server. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Extensible entirely via MCP servers (built-in and custom)
- CLI and desktop app; provider-agnostic model config
- Recipes for shareable, repeatable agent workflows

## Architecture / How It Works

A Rust agent core maintains the task loop and tool registry; extensions are MCP servers (developer tools, browser, memory, custom APIs), and the same core powers the CLI and the desktop app so workflows transfer between them.

## Getting Started

```bash
curl -fsSL https://github.com/block/goose/releases/download/stable/download_cli.sh | bash
goose configure && goose session
```

## Use Cases

1. **Scenario**: you want an open-source agent that treats MCP as the native extension mechanism — every capability is an MCP server
2. **Scenario**: you need both CLI and desktop-app form factors over the same agent, with any LLM provider
3. **Scenario where this is NOT the right fit**: you want the most battle-tested coding-specific loop; Claude Code and aider have deeper coding refinement — evaluate an alternative instead

## Strengths

- You want an open-source agent that treats MCP as the native extension mechanism — every capability is an MCP server
- You need both CLI and desktop-app form factors over the same agent, with any LLM provider

## Limitations / When NOT to Use

- You want the most battle-tested coding-specific loop; Claude Code and aider have deeper coding refinement
- Environments where running an agent with broad local permissions is unacceptable without extra sandboxing

- _Verified for Goose: stars, license and last-commit come from the GitHub API as of 2026-07-08; the feature list and integration surface are read from the project's own documentation. The best_when/avoid_when judgement above is documentation-derived and has not been re-confirmed against hands-on production use in this environment, so treat the cost, limits and failure modes as claims to check against your workload._

## Integration Patterns

- *Wiring*: adopt Goose as a Rust crate or a small compiled binary you can ship against the `prototyping, orchestration` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `claude-code`, `aider`, `openai-codex-cli` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Official Site](https://block.github.io/goose/)
- [Documentation](https://goose-docs.ai)
- [GitHub](https://github.com/block/goose)

## Buzz & Reception

- 50,838 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer; both verified via the GitHub API.*
