---
id: cline
name: "Cline"
type: tool
job: [prototyping]
description: "Open-source autonomous coding agent for VS Code with plan/act modes and human-in-the-loop approval of every action"
url: "https://cline.bot"
cost_model: open-source
pricing_detail: "Free extension; bring your own API key (or use its provider marketplace)"
tags: [code-gen, agents, tool-use]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/cline/cline"
docs_url: "https://docs.cline.bot/cline-overview"
github_url: "https://github.com/cline/cline"
alternatives: [continue-dev, claude-code, cursor]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - "You want an agentic coding assistant inside VS Code with explicit approval of every file edit and command"
  - "You want open-source transparency plus bring-your-own-key model choice, including local models"
avoid_when:
  - "You want fast inline tab-completion — Cline is a task agent, not an autocomplete engine"
  - "Very large monorepos where its whole-file edit strategy burns tokens; terminal CLIs with repo maps may be cheaper"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (64,446), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The leading open-source in-IDE agent; the plan/act split plus per-action approvals is a strong safety default"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/cline/cline", "date": "2026-07-08", "description": "64,446 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

An open-source VS Code extension that turns the editor into an agentic workspace: Cline plans a task, then executes it step-by-step — creating/editing files, running terminal commands, even driving a browser — asking permission at each step.

## Why It's in the Arsenal

Cline earns a place in the Arsenal because it directly addresses a recurring decision point: you want an agentic coding assistant inside VS Code with explicit approval of every file edit and command. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Plan mode / Act mode split for reviewable task execution
- Per-action human approval for edits, commands, and browser use
- MCP support and any-provider model configuration

## Architecture / How It Works

The extension maintains a task loop: the model proposes the next tool action (file diff, shell command, browser step), the user approves, and results feed back. Checkpoints let you roll the workspace back to any step in the task.

## Getting Started

```bash
# Install 'Cline' from the VS Code marketplace, then set your provider API key
code --install-extension saoudrizwan.claude-dev
```

## Use Cases

1. **Scenario**: you want an agentic coding assistant inside VS Code with explicit approval of every file edit and command
2. **Scenario**: you want open-source transparency plus bring-your-own-key model choice, including local models
3. **Scenario where this is NOT the right fit**: you want fast inline tab-completion — Cline is a task agent, not an autocomplete engine — evaluate an alternative instead

## Strengths

- You want an agentic coding assistant inside VS Code with explicit approval of every file edit and command
- You want open-source transparency plus bring-your-own-key model choice, including local models

## Limitations / When NOT to Use

- You want fast inline tab-completion — Cline is a task agent, not an autocomplete engine
- Very large monorepos where its whole-file edit strategy burns tokens; terminal CLIs with repo maps may be cheaper

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `continue-dev`, `claude-code`, `cursor` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `cline`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://cline.bot)
- [Documentation](https://docs.cline.bot/cline-overview)
- [GitHub](https://github.com/cline/cline)

## Buzz & Reception

- 64,446 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
