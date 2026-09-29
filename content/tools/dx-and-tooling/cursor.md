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

The case for Cursor rests on its documentation and observed adoption rather than a controlled comparison here; the sections below state what it claims and what depending on it would commit you to.

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

1. **Integrating Cursor**: the prototyping call is a dependency with its own failure modes, not a library call — settle timeout, retry and what happens when it is unavailable before the first request goes through.
2. **Validating the choice**: put Cursor and its named alternatives on the same task with the same data, and record the number that would make you switch — that criterion, not the feature list, is the decision.
3. **Choosing between candidates**: Cursor's comparison set is `windsurf`, `github-copilot`; the axis that separates them is what you operate, so answer that before reading the feature lists.

## Strengths

- Beyond the marketing, Cursor's own notes are the useful part: cursor indexes your repository into embeddings for retrieval, routes completions to its custom Tab model and chat/agent requests to selected frontier models, and executes agent plans with editor-native diffs; privacy mode can disable code retention.
- Cursor overlaps `windsurf`, `github-copilot` in this phase. Read those entries before choosing: the feature comparison is usually closer than the deployment comparison, and the latter is what you inherit.
- Cursor is a service call, so its failure surface is timeouts, quotas and key expiry rather than anything you can patch.
- What this entry cannot give you is measured behaviour: measure Cursor's latency and its error rate under a degraded upstream before it carries production traffic.

## Limitations / When NOT to Use

- There is no self-hosted path to Cursor, so quota and rate-limit changes are the vendor's to make and yours to absorb.
- Documentation for Cursor describes capability, not behaviour at your request shape; latency, concurrency and failure handling are the parts you must measure yourself.
- Where Cursor overlaps `windsurf`, `github-copilot`, choosing on feature lists alone is the mistake; the deciding axis is operational.

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
