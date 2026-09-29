---
id: openai-codex-cli
name: "OpenAI Codex CLI"
type: tool
job: [prototyping]
description: "OpenAI's open-source terminal coding agent, written in Rust, that runs code changes in a sandboxed local environment"
url: "https://github.com/openai/codex"
cost_model: usage-based
pricing_detail: "Open-source CLI; usage billed through ChatGPT plans or the OpenAI API"
tags: [code-gen, agents, tool-use, openai]
maturity: production
stack: [rust]
free_tier: false
free_tier_limits: null
self_hostable: false
open_source: true
source_url: "https://github.com/openai/codex"
docs_url: "https://developers.openai.com/codex/cli"
github_url: "https://github.com/openai/codex"
alternatives: [claude-code, gemini-cli, aider]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - "You are on ChatGPT/OpenAI plans and want a terminal agent whose usage is covered by your existing subscription"
  - "You want OS-level sandboxing of agent actions (seatbelt/landlock) rather than approval prompts alone"
avoid_when:
  - "You need model choice beyond OpenAI models without adapters"
  - "You want a mature plugin/skill ecosystem — its extension surface is younger than Claude Code's"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (96,278), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "First-party OpenAI coding agent with the strongest sandboxing story among the big-three CLIs"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/openai/codex", "date": "2026-07-08", "description": "96,278 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

OpenAI's terminal coding agent: a Rust CLI that plans and applies code changes with configurable autonomy levels, executing commands inside OS-level sandboxes and integrating with ChatGPT subscriptions for usage.

## Why It's in the Arsenal

OpenAI Codex CLI earns a place in the Arsenal because it directly addresses a recurring decision point: you are on ChatGPT/OpenAI plans and want a terminal agent whose usage is covered by your existing subscription. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Approval modes from suggest-only to full-auto within a sandbox
- OS-level sandboxing (macOS Seatbelt, Linux Landlock) for command execution
- Runs against ChatGPT plan quota or API key

## Architecture / How It Works

The CLI drives an agent loop against OpenAI models; proposed shell commands and patches execute inside a sandbox with network disabled by default, and the autonomy level controls which actions require human approval.

## Getting Started

Add the crate to your project, then make one call to confirm the credentials, network path and configuration are reachable before wiring OpenAI Codex CLI into anything else. The command below calls the hosted service against the `prototyping` job and returns a result you can inspect directly.

```bash
npm install -g @openai/codex
codex
```

Follow the official documentation at https://developers.openai.com/codex/cli for the authentication and configuration options, because the defaults in the quickstart are the ones most likely to need changing for real traffic.

## Use Cases

1. **Scenario**: you are on ChatGPT/OpenAI plans and want a terminal agent whose usage is covered by your existing subscription
2. **Scenario**: you want OS-level sandboxing of agent actions (seatbelt/landlock) rather than approval prompts alone
3. **Scenario where this is NOT the right fit**: you need model choice beyond OpenAI models without adapters — evaluate an alternative instead

## Strengths

- You are on ChatGPT/OpenAI plans and want a terminal agent whose usage is covered by your existing subscription
- You want OS-level sandboxing of agent actions (seatbelt/landlock) rather than approval prompts alone

## Limitations / When NOT to Use

- You need model choice beyond OpenAI models without adapters
- You want a mature plugin/skill ecosystem — its extension surface is younger than Claude Code's

- _Verified for OpenAI Codex CLI: stars, license and last-commit come from the GitHub API as of 2026-07-08; the feature list and integration surface are read from the project's own documentation. The best_when/avoid_when judgement above is documentation-derived and has not been re-confirmed against hands-on production use in this environment, so treat the cost, limits and failure modes as claims to check against your workload._

## Integration Patterns

- *Wiring*: adopt OpenAI Codex CLI as a Rust crate or a small compiled binary you can ship against the `prototyping` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `claude-code`, `gemini-cli`, `aider` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Deployment and cost*: Usage-based billing makes request volume the cost driver, so model the token or call volume before committing the integration.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Official Site](https://github.com/openai/codex)
- [Documentation](https://developers.openai.com/codex/cli)
- [GitHub](https://github.com/openai/codex)

## Buzz & Reception

- 96,278 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer; both verified via the GitHub API.*
