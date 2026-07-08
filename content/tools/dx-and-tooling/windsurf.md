---
id: windsurf
name: "Windsurf"
type: tool
job: [prototyping]
description: "Agentic AI code editor built around Cascade, a context-aware agent that keeps working across your whole repo"
url: "https://windsurf.com"
cost_model: freemium
pricing_detail: "Free tier with monthly prompt credits; Pro from $15/mo"
tags: [code-gen, agents, llm]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: "Free plan with limited monthly prompt credits"
self_hostable: false
open_source: false
source_url: null
docs_url: "https://docs.windsurf.com/windsurf/getting-started"
github_url: null
alternatives: [cursor, github-copilot, cline]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - "You want an agent-first editor at a lower per-seat price point than Cursor"
  - "You value Cascade's automatic context tracking — it follows your recent edits without manual context curation"
avoid_when:
  - "You need open-source or self-hostable tooling — Windsurf is proprietary and cloud-bound"
  - "Your org is sensitive to vendor risk: the company changed hands in 2025 and product direction has shifted"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Closed-source/hosted product; capabilities described from official documentation and public reception as of 2026-07-08, not hands-on verified here."
verdict: solid-choice
verdict_rationale: "Capable Cursor competitor with a strong agent UX; vendor turbulence keeps it a step behind on momentum"
status: active
buzz_sources: []
---

## Overview

A proprietary AI-native editor whose core is Cascade: an agent that maintains awareness of your recent actions and repo state, executes multi-step coding tasks, and previews/deploys apps, positioned as a more autonomous alternative to Copilot-style assistants.

## Why It's in the Arsenal

Windsurf earns a place in the Arsenal because it directly addresses a recurring decision point: you want an agent-first editor at a lower per-seat price point than Cursor. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Cascade agent with automatic context from your edit history
- Built-in preview, deploy, and MCP tool integrations
- Custom fast tab-completion models

## Architecture / How It Works

Cascade combines a repo index, a trace of your recent editor actions, and tool access (terminal, browser preview, MCP) so the agent can continue multi-step work with less prompt engineering; edits stream as reviewable diffs.

## Getting Started

```bash
# Download the editor and sign in:
# https://windsurf.com/download
```

## Use Cases

1. **Scenario**: you want an agent-first editor at a lower per-seat price point than Cursor
2. **Scenario**: you value Cascade's automatic context tracking — it follows your recent edits without manual context curation
3. **Scenario where this is NOT the right fit**: you need open-source or self-hostable tooling — Windsurf is proprietary and cloud-bound — evaluate an alternative instead

## Strengths

- You want an agent-first editor at a lower per-seat price point than Cursor
- You value Cascade's automatic context tracking — it follows your recent edits without manual context curation

## Limitations / When NOT to Use

- You need open-source or self-hostable tooling — Windsurf is proprietary and cloud-bound
- Your org is sensitive to vendor risk: the company changed hands in 2025 and product direction has shifted

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `cursor`, `github-copilot`, `cline` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `windsurf`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://windsurf.com)
- [Documentation](https://docs.windsurf.com/windsurf/getting-started)


## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-07-08 by @maintainer*
