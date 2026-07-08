---
id: claude-code
name: "Claude Code"
type: tool
job: [prototyping]
description: "Anthropic's terminal-based agentic coding assistant that edits files, runs commands, and works across whole repositories"
url: "https://code.claude.com/docs"
cost_model: usage-based
pricing_detail: "Requires a Claude subscription (Pro/Max) or Anthropic API key; billed by usage"
tags: [code-gen, agents, tool-use, anthropic]
maturity: production
stack: [typescript]
free_tier: false
free_tier_limits: null
self_hostable: false
open_source: false
source_url: "https://github.com/anthropics/claude-code"
docs_url: "https://code.claude.com/docs"
github_url: "https://github.com/anthropics/claude-code"
alternatives: [aider, openai-codex-cli, gemini-cli]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - "You want a terminal-native agentic coding loop (read repo, edit files, run tests, iterate) with strong multi-file reasoning"
  - "Your team already pays for Claude and wants deep integrations: MCP servers, hooks, subagents, and reusable skills"
avoid_when:
  - "You need an open-source or self-hostable assistant for compliance — the agent loop and model are closed"
  - "You want IDE-embedded inline completions rather than a conversational terminal agent"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (136,859), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: best-in-class
verdict_rationale: "The reference implementation of terminal agentic coding; the skills/MCP/hooks ecosystem documented across this catalog largely originated here"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/anthropics/claude-code", "date": "2026-07-08", "description": "136,859 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A command-line agentic coding tool from Anthropic: you converse with it in the terminal, and it plans, edits files, runs shell commands and tests, and iterates until the task is done, with permissions gating each capability.

## Why It's in the Arsenal

Claude Code earns a place in the Arsenal because it directly addresses a recurring decision point: you want a terminal-native agentic coding loop (read repo, edit files, run tests, iterate) with strong multi-file reasoning. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Agentic loop with file edits, shell execution, and test-driven iteration
- Extensible via MCP servers, hooks, subagents, and agent skills
- Repository-scale context management (CLAUDE.md project memory)

## Architecture / How It Works

Runs an agent loop against Anthropic models: the model receives repo context and tool schemas (file read/write, bash, search), proposes tool calls, and the CLI executes them under a user-approval permission model. Project conventions persist in CLAUDE.md; skills and MCP servers extend the toolset.

## Getting Started

```bash
npm install -g @anthropic-ai/claude-code
cd your-repo && claude
```

## Use Cases

1. **Scenario**: you want a terminal-native agentic coding loop (read repo, edit files, run tests, iterate) with strong multi-file reasoning
2. **Scenario**: your team already pays for Claude and wants deep integrations: MCP servers, hooks, subagents, and reusable skills
3. **Scenario where this is NOT the right fit**: you need an open-source or self-hostable assistant for compliance — the agent loop and model are closed — evaluate an alternative instead

## Strengths

- You want a terminal-native agentic coding loop (read repo, edit files, run tests, iterate) with strong multi-file reasoning
- Your team already pays for Claude and wants deep integrations: MCP servers, hooks, subagents, and reusable skills

## Limitations / When NOT to Use

- You need an open-source or self-hostable assistant for compliance — the agent loop and model are closed
- You want IDE-embedded inline completions rather than a conversational terminal agent

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `aider`, `openai-codex-cli`, `gemini-cli` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `claude-code`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://code.claude.com/docs)
- [Documentation](https://code.claude.com/docs)
- [GitHub](https://github.com/anthropics/claude-code)

## Buzz & Reception

- 136,859 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
