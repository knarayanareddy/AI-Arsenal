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

Install the npm package, then make one call to confirm the credentials, network path and configuration are reachable before wiring Cursor into anything else. The command below calls the hosted service against the `prototyping` job and returns a result you can inspect directly.

```bash
# Download the editor and sign in:
# https://cursor.com/download
```

Follow the official documentation at https://cursor.com/docs for the authentication and configuration options, because the defaults in the quickstart are the ones most likely to need changing for real traffic.

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

- _Verified for Cursor: stars, license and last-commit come from the GitHub API as of 2026-07-08; the feature list and integration surface are read from the project's own documentation. The best_when/avoid_when judgement above is documentation-derived and has not been re-confirmed against hands-on production use in this environment, so treat the cost, limits and failure modes as claims to check against your workload._

## Integration Patterns

- *Wiring*: adopt Cursor as a TypeScript package in the same runtime as your API against the `prototyping` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `windsurf`, `github-copilot` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Deployment and cost*: Confirm which tier you are on before committing: free-tier limits change, and a self-hosted option usually exists if the hosted quota becomes the constraint.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Official Site](https://cursor.com)
- [Documentation](https://cursor.com/docs)


## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-07-08 by @maintainer; both verified via the GitHub API.*
