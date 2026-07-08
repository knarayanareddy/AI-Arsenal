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
docs_url: "https://developers.openai.com/codex/cli/"
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

```bash
npm install -g @openai/codex
codex
```

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

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `claude-code`, `gemini-cli`, `aider` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `openai-codex-cli`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://github.com/openai/codex)
- [Documentation](https://developers.openai.com/codex/cli/)
- [GitHub](https://github.com/openai/codex)

## Buzz & Reception

- 96,278 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
