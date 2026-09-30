---
id: deepseek-reasonix
name: DeepSeek-Reasonix
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Single-binary Go coding agent organised around prefix-cache stability, with plan mode, checkpoints and one engine reachable four ways"
github_url: "https://github.com/esengine/DeepSeek-Reasonix"
license: MIT
primary_language: Go
tags: [code-gen, llm, caching, training]
maturity: beta
cost_model: open-source
github_stars: 35704
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://github.com/esengine/DeepSeek-Reasonix/blob/main/docs/ARCHITECTURE.md"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Keeps DeepSeek's cacheable prefix intact across long runs so a session left open keeps costing cents, with per-turn checkpoints to make that safe."
best_for:
  - "You want to leave a long agent run going overnight and you need the token bill to stay flat rather than grow as context accumulates."
  - "You want one engine reachable from a terminal, a desktop app, a browser and your editor over ACP, so the same session does not fragment across surfaces."
  - "You need plan mode, an explicit permission stack and a workspace sandbox before an agent is allowed to write to your repo unattended."
avoid_if:
  - "You need multi-provider support, because the README frames cache stability as the reason the tool is DeepSeek-only rather than a portable feature."
  - "You installed the npm package expecting current behaviour, because the TypeScript 0.x line is in maintenance mode and development moved to a Go rewrite on a separate default branch."
  - "You want a general assistant for chat and non-coding tasks, because the subcommands are scoped to code, with plain chat as a deliberately tool-free aside."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language (Go), topics and issue count came from the GitHub API. Install commands, subcommands, ACP support, maintenance-mode notice and the 435M-token case-study figures are read from the official README and architecture doc; the cost case study was not independently reproduced."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Reasonix is a Go rewrite distributed as a single binary, npm-published as reasonix with dsnix as a shorter alias. The whole design is organised around one invariant: the DeepSeek prefix-cache must stay byte-stable, so the loop is engineered so it does. The published case study reports a real single-day user session of 435M input tokens at 99.82% cache hit, roughly $12 where the same workload without cache would have cost about $61. Safety comes from plan mode, a permission stack, a workspace sandbox and per-turn checkpoints. One engine is exposed four ways: terminal TUI, desktop app, browser, and editor over the Agent Client Protocol. Additional subcommands cover one-shot runs, replay, diff, events, stats and session pruning.

## Why it's in the Arsenal

The engineering problem is that long-running agents are where prefix caching usually dies: anything that mutates the system prompt or tool table between turns turns a hit into a miss and the bill inverts. Reasonix treats stability as an architectural constraint and then builds the safety features that make leaving it running acceptable, which is the combination that actually matters operationally. The cost is a narrow remit: DeepSeek only, and a project that has already changed language once, so the migration story matters.

## Architecture

The TUI is an Ink-based frontend over a Go core that manages the request cycle and keeps the cacheable prefix constant; docs/ARCHITECTURE.md describes four mechanisms under a cache-first pillar as the means of preserving that prefix. Plan mode runs the agent without write or execute permissions, a workspace sandbox bounds filesystem access, and per-turn checkpoints record enough state to step back through a long run. The same core serves the terminal, the web surface, the desktop client and ACP editor integrations, so permissions and checkpoints behave identically whichever client is attached. Auxiliary subcommands replay recorded runs and diff the resulting state for post-hoc review.

## Ecosystem Position

Reasonix competes directly with dao-code and Whale, the other DeepSeek-optimised coding agents in content/projects/agent-systems, and differs from both in mechanics: dao-code leans on forks for memory and reflection, Whale on JavaScript workflow scripting, while this one leans on prefix invariants plus checkpoints. Against Claude Code it offers the same loop with no vendor account and one binary instead of a Node toolchain, but with no multi-provider fallback. Compared with content/projects/frameworks entries such as LangGraph, it is a product with a fixed architecture rather than a graph you define, and its inference dependency is a single hosted provider rather than the content/projects/inference-engines stack.

## Getting Started

Node 22 or newer is needed for the npm distribution; the Go binary installs the same way. Paste a DeepSeek API key on first run:

```bash
npm install -g reasonix
reasonix code my-project
# one-shot, streams to stdout
reasonix run "refactor the parser and run the tests"
```

Use reasonix doctor to check Node, API key and MCP wiring; reasonix update upgrades the tool itself.

## Key Use Cases

1. Overnight unattended refactor: start a checkpointed run in work mode, leave the terminal open, and return to a resumable state rather than an opaque diff.
2. Cost-controlled long context: hold a 1M-token session at a cache-hit rate high enough that the run costs single-digit dollars instead of tens.
3. Cross-surface continuation: begin in the terminal, continue in the browser or the editor over ACP, and keep the same session, permissions and checkpoint history.

## Strengths

- Cache-first architecture with published, specific numbers (435M tokens, 99.82% hit rate, ~$12 vs ~$61) rather than a vague efficiency claim.
- Per-turn checkpoints plus plan mode and a workspace sandbox make leaving an agent running a defensible choice.
- One binary serving terminal, desktop, browser and ACP editor clients, so the session does not fragment.
- Auxiliary tooling for post-hoc work: replay, diff, events, stats and session pruning.

## Limitations

DeepSeek-only is the central constraint: there is no provider fallback, so an outage, a rate limit or a regional unavailability stops the agent, and the README treats that narrowness as a feature. The project has migrated from TypeScript to Go, so the TypeScript line is in maintenance mode and current development sits on a different default branch; anyone tracking issues or docs on the old line is looking at a stale surface. Checkpoint storage grows with run length and is not characterised. The published cost case study is one user's single day, which is evidence but not a benchmark. A moderate open-issue count on a fast-moving repo signals active churn.

## Relation to the Arsenal

This is the checkpoint-and-prefix member of the DeepSeek cluster inside content/projects/agent-systems, and the natural companion read to dao-code and Whale when choosing between cache-stability strategies. Where dao-code prices its claim with per-task logs and Whale with workflow scripting, this one prices it with a single-day real-user trace and answers the safety question with checkpoints, which is the differentiator if you plan to leave agents running. It complements the provider-neutral entries (Zero, Codewhale) rather than replacing them if you need model flexibility, and for orchestration you build yourself the frameworks phase is the layer above this.

## Resources

- [GitHub — esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)
- [Architecture doc — docs/ARCHITECTURE.md](https://github.com/esengine/DeepSeek-Reasonix/blob/main/docs/ARCHITECTURE.md)
- [npm — reasonix](https://www.npmjs.com/package/reasonix)
