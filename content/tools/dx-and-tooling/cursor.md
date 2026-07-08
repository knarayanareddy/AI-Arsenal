---
id: cursor
name: "Cursor"
type: tool
job: [prototyping]
description: "AI-native code editor (VS Code fork) with agent mode, codebase-aware chat, and predictive multi-line edits"
url: "https://cursor.com"
cost_model: freemium
pricing_detail: "Free hobby tier; Pro from $20/mo; usage-based pricing on frontier models beyond included quota"
tags: [code-gen, agents, llm]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: "Hobby tier with limited agent requests and completions"
self_hostable: false
open_source: false
source_url: null
docs_url: "https://cursor.com/docs"
github_url: null
alternatives: [windsurf, github-copilot]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - "You want the most polished AI-editor experience: Tab predictions, background agents, and codebase-aware chat in one product"
  - "Your team is willing to pay per-seat for measurable coding-velocity gains and doesn't need self-hosting"
avoid_when:
  - "Strict data-residency or on-prem requirements — code context is processed by Cursor's cloud"
  - "You are budget-constrained; heavy agent usage on frontier models quickly exceeds the included quota"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Closed-source/hosted product; capabilities described from official documentation and public reception as of 2026-07-08, not hands-on verified here."
verdict: recommended
verdict_rationale: "Category-defining AI editor with the strongest Tab model; closed source and cloud-bound, so evaluate data policies first"
status: active
buzz_sources: []
---

## Overview

A proprietary AI-first fork of VS Code: Cursor layers predictive multi-line Tab completions, an agent mode that plans and executes multi-file changes, and codebase-indexed chat on top of the familiar editor, using frontier models plus its own custom models.

## Why It's in the Arsenal

Cursor earns a place in the Arsenal because it directly addresses a recurring decision point: you want the most polished AI-editor experience: Tab predictions, background agents, and codebase-aware chat in one product. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Tab: custom next-edit-prediction model across files
- Agent mode with terminal execution and background agents
- Codebase indexing for repo-aware chat and edits

## Architecture / How It Works

Cursor indexes your repository into embeddings for retrieval, routes completions to its custom Tab model and chat/agent requests to selected frontier models, and executes agent plans with editor-native diffs; privacy mode can disable code retention.

## Getting Started

```bash
# Download the editor and sign in:
# https://cursor.com/download
```

## Use Cases

1. **Scenario**: you want the most polished AI-editor experience: Tab predictions, background agents, and codebase-aware chat in one product
2. **Scenario**: your team is willing to pay per-seat for measurable coding-velocity gains and doesn't need self-hosting
3. **Scenario where this is NOT the right fit**: strict data-residency or on-prem requirements — code context is processed by Cursor's cloud — evaluate an alternative instead

## Strengths

- You want the most polished AI-editor experience: Tab predictions, background agents, and codebase-aware chat in one product
- Your team is willing to pay per-seat for measurable coding-velocity gains and doesn't need self-hosting

## Limitations / When NOT to Use

- Strict data-residency or on-prem requirements — code context is processed by Cursor's cloud
- You are budget-constrained; heavy agent usage on frontier models quickly exceeds the included quota

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `windsurf`, `github-copilot` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `cursor`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://cursor.com)
- [Documentation](https://cursor.com/docs)


## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-07-08 by @maintainer*
