---
id: continue-dev
name: "Continue"
type: tool
job: [prototyping]
description: "Open-source IDE extension (VS Code/JetBrains) for building custom AI coding assistants with any model"
url: "https://continue.dev"
cost_model: freemium
pricing_detail: "Apache-2.0 extension free forever; optional hosted hub/teams plans"
tags: [code-gen, llm, tool-use]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/continuedev/continue"
docs_url: "https://docs.continue.dev"
github_url: "https://github.com/continuedev/continue"
alternatives: [cline, github-copilot, tabby-ml]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - "You want chat, autocomplete, and edit-in-place in the IDE with full control over which models power each"
  - "You need local/self-hosted models (Ollama, vLLM) behind the same UX as hosted ones — e.g. for air-gapped teams"
avoid_when:
  - "You want maximum out-of-the-box autonomy; Continue is assistant-first, with agent mode newer than Cline's"
  - "You don't want to spend any time on configuration — its flexibility comes with more knobs than Copilot"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (34,743), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The most configurable open IDE assistant; the default choice when local models must sit behind a Copilot-like UX"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/continuedev/continue", "date": "2026-07-08", "description": "34,743 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

An open-source alternative to GitHub Copilot for VS Code and JetBrains: chat, tab-autocomplete, inline edits, and agent mode, all configurable to any model provider — including fully local stacks via Ollama or vLLM.

## Why It's in the Arsenal

Continue earns a place in the Arsenal because it directly addresses a recurring decision point: you want chat, autocomplete, and edit-in-place in the IDE with full control over which models power each. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Chat, autocomplete, edit, and agent modes in one extension
- Any provider: hosted APIs or local models (Ollama, vLLM, llama.cpp)
- Shareable assistant configs and context providers

## Architecture / How It Works

Continue routes each mode (autocomplete vs chat vs edit) to independently configured models, assembles context from providers (files, docs, terminal, codebase index), and applies edits as diffs in the editor; a local index powers codebase-wide retrieval.

## Getting Started

```bash
# Install 'Continue' from the VS Code marketplace or JetBrains plugin repo
code --install-extension Continue.continue
```

## Use Cases

1. **Scenario**: you want chat, autocomplete, and edit-in-place in the IDE with full control over which models power each
2. **Scenario**: you need local/self-hosted models (Ollama, vLLM) behind the same UX as hosted ones — e.g. for air-gapped teams
3. **Scenario where this is NOT the right fit**: you want maximum out-of-the-box autonomy; Continue is assistant-first, with agent mode newer than Cline's — evaluate an alternative instead

## Strengths

- You want chat, autocomplete, and edit-in-place in the IDE with full control over which models power each
- You need local/self-hosted models (Ollama, vLLM) behind the same UX as hosted ones — e.g. for air-gapped teams

## Limitations / When NOT to Use

- You want maximum out-of-the-box autonomy; Continue is assistant-first, with agent mode newer than Cline's
- You don't want to spend any time on configuration — its flexibility comes with more knobs than Copilot

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `cline`, `github-copilot`, `tabby-ml` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `continue-dev`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://continue.dev)
- [Documentation](https://docs.continue.dev)
- [GitHub](https://github.com/continuedev/continue)

## Buzz & Reception

- 34,743 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
