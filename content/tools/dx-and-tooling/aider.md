---
id: aider
name: "Aider"
type: tool
job: [prototyping]
description: "Open-source AI pair-programming CLI that edits your local git repo with any LLM and auto-commits changes"
url: "https://aider.chat"
cost_model: open-source
pricing_detail: "Free open-source tool; you pay only your model provider's API costs"
tags: [code-gen, agents, llm]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/Aider-AI/aider"
docs_url: "https://aider.chat/docs/"
github_url: "https://github.com/Aider-AI/aider"
alternatives: [claude-code, openai-codex-cli, continue-dev]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - "You want a model-agnostic coding CLI — swap Claude, GPT, Gemini, DeepSeek, or local models freely"
  - "You value tight git integration: every AI edit lands as a reviewable auto-commit you can diff and revert"
avoid_when:
  - "You want a long-horizon autonomous agent — aider is deliberately a supervised pair-programmer, not a task runner"
  - "You expect IDE UI affordances; aider is terminal-first with optional editor watching"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (47,184), license, and last push (2026-05-22) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The most mature model-agnostic coding CLI; its repo-map + git-commit workflow remains the safest editing loop"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/Aider-AI/aider", "date": "2026-07-08", "description": "47,184 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A veteran open-source AI pair-programming tool: aider builds a concise map of your repository, sends only relevant context to the LLM of your choice, applies edits as git commits, and runs your tests/linters to validate each change.

## Why It's in the Arsenal

Aider earns a place in the Arsenal because it directly addresses a recurring decision point: you want a model-agnostic coding CLI — swap Claude, GPT, Gemini, DeepSeek, or local models freely. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Repo-map context selection that scales to large codebases
- Works with virtually any LLM API or local model via LiteLLM
- Automatic git commits per edit, with lint/test hooks

## Architecture / How It Works

Aider computes a tree-sitter-based repository map to give the model cheap structural context, requests edits in a diff format, applies them locally, and commits each change with a descriptive message; failing tests or lint output can be fed back automatically.

## Getting Started

```bash
python -m pip install aider-install && aider-install
cd your-repo && aider
```

## Use Cases

1. **Scenario**: you want a model-agnostic coding CLI — swap Claude, GPT, Gemini, DeepSeek, or local models freely
2. **Scenario**: you value tight git integration: every AI edit lands as a reviewable auto-commit you can diff and revert
3. **Scenario where this is NOT the right fit**: you want a long-horizon autonomous agent — aider is deliberately a supervised pair-programmer, not a task runner — evaluate an alternative instead

## Strengths

- You want a model-agnostic coding CLI — swap Claude, GPT, Gemini, DeepSeek, or local models freely
- You value tight git integration: every AI edit lands as a reviewable auto-commit you can diff and revert

## Limitations / When NOT to Use

- You want a long-horizon autonomous agent — aider is deliberately a supervised pair-programmer, not a task runner
- You expect IDE UI affordances; aider is terminal-first with optional editor watching

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `claude-code`, `openai-codex-cli`, `continue-dev` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `aider`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://aider.chat)
- [Documentation](https://aider.chat/docs/)
- [GitHub](https://github.com/Aider-AI/aider)

## Buzz & Reception

- 47,184 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
