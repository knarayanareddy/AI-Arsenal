---
id: orca
name: Orca
type: tool
job: [orchestration]
description: Desktop "agent development environment" for running fleets of coding agents (Codex, Claude Code, OpenCode, Pi) in parallel, each in its own git worktree
url: "https://github.com/stablyai/orca"
cost_model: open-source
pricing_detail: Free and open source (MIT); agents run on your own subscriptions/API keys
tags: [agents, orchestration, code-gen]
maturity: beta
stack: [typescript]
free_tier: true
free_tier_limits: Fully free; you pay only for the underlying agent subscriptions you already have
self_hostable: true
open_source: true
source_url: "https://github.com/stablyai/orca"
docs_url: "https://onorca.dev"
github_url: "https://github.com/stablyai/orca"
alternatives: []
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - You already run multiple coding agents in parallel via ad-hoc terminal tabs and manual worktrees — Orca makes the fleet a first-class object with per-agent worktrees, unified status tracking, and mobile monitoring/steering
  - You use different agents for different strengths (Codex for review, Claude Code for implementation) and want them side-by-side on the same repo without branch collisions
avoid_when:
  - You run one agent on one task at a time — a desktop orchestrator adds a layer without payoff
  - You need headless/CI orchestration — Orca is a desktop (Electron-style) app for interactive use, not a server-side fleet scheduler
version_tracked: null
enrichment_status: draft
enrichment_notes: Star count (14.0k), MIT license, and active development (last push 2026-07-08) verified via the GitHub API on 2026-07-08; on GitHub weekly trending the same day. Repo created 2026-03 by Stably AI. Worktree-per-agent architecture and mobile companion from the project README; not independently exercised here.
verdict: watching
verdict_rationale: Real mechanism (worktree isolation per agent, unified fleet tracking) for an increasingly standard workflow, but young (~4 months) in a crowded, consolidating category
status: active
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending?since=weekly","date":"2026-07-08","description":"On GitHub weekly trending; 14.0k stars"}
---

> **TL;DR:** Open-source desktop app (macOS/Windows/Linux) for running a fleet of coding agents — Codex, Claude Code, OpenCode, Pi — in parallel, each isolated in its own git worktree, tracked in one dashboard, with a mobile companion for monitoring and steering. MIT; agents run on your own subscriptions. Best when parallel-agent work is already your workflow; skip if you run one agent at a time.

## Overview

Orca positions itself as an "ADE" (agent development environment): a desktop application that launches and manages multiple coding agents concurrently against the same repository. Each agent gets its own git worktree, so parallel runs cannot clobber each other's changes; a unified view tracks every agent's status, and a mobile companion app notifies you when agents finish and lets you send follow-ups remotely.

## Why It's in the Arsenal

Parallel multi-agent coding is shifting from power-user trick to default workflow, and the limiting factor is coordination overhead: manual worktree juggling, lost track of which terminal holds which task. Orca's mechanism is worktree-per-agent isolation plus centralized fleet state — it removes the git-collision and attention-fragmentation costs that cap how many agents one engineer can usefully run. It's also harness-neutral: it orchestrates the agents you already pay for rather than replacing them.

## Key Features

- Runs Codex, Claude Code, OpenCode, and Pi side-by-side, each in an isolated git worktree
- Unified dashboard of all running agents and their task states
- Mobile companion (iOS) for notifications, monitoring, and steering agents away from the desk
- Bring-your-own-subscription: no proxying of model access

## Architecture / How It Works

A cross-platform desktop app that shells out to the installed agent CLIs. For each task it creates a dedicated git worktree and launches the chosen agent inside it; agent lifecycle and output are tracked centrally, and completed work lands as normal branches for review and merge. Isolation is at the worktree level — agents share the machine but not the working tree.

## Getting Started

```bash
# Download the desktop app for macOS/Windows/Linux:
#   https://onorca.dev/download
# Prerequisite: the agent CLIs you want to orchestrate
# (codex, claude, opencode, ...) installed and logged in.
```

## Use Cases

1. **Scenario**: fan out three independent bug fixes to three agents in parallel worktrees, review each branch as it completes
2. **Scenario**: kick off a long refactor before leaving, get a mobile notification when the agent finishes, and send a follow-up instruction from your phone

## Strengths

- Worktree-per-agent isolation solves the actual failure mode of parallel agents (working-tree collisions), not just the UI problem
- Agent-agnostic and MIT-licensed in a category where most fleet orchestrators are proprietary SaaS (14.0k stars as of 2026-07-08)

## Limitations / When NOT to Use

- Interactive desktop tool — no headless or CI/server mode for automated fleet scheduling
- Young (created 2026-03) in a fast-consolidating category; expect churn in features and conventions

## Integration Patterns

- Layer on top of your existing agents unchanged — Orca manages processes and worktrees, your agents keep their own configs and skills
- Combine with cross-model review (e.g. [Codex Plugin for Claude Code](./codex-plugin-cc.md)): implement in parallel with one agent family, review with another

## Resources

- [GitHub](https://github.com/stablyai/orca)
- [Documentation](https://onorca.dev)

## Buzz & Reception

On GitHub weekly trending with 14.0k stars as of 2026-07-08, about four months after creation — part of a visible 2026 wave of parallel-agent orchestration tooling ("agent fleet" desktop apps) gaining rapid adoption.
