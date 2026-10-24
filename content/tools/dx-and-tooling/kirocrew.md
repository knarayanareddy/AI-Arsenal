---
id: kirocrew
name: "KiroCrew"
type: tool
job: [orchestration, prototyping]
description: "Agent workspace that keeps files, shell history and learned helper scripts across sessions"
url: "https://github.com/kirodotdev/KiroCrew"
cost_model: open-source
pricing_detail: "Apache-2.0 source; model spend depends on the provider, with local endpoints avoiding per-token cost"
tags: [agents, code-gen, orchestration, stateful, memory, local]
maturity: alpha
stack: [python]
free_tier: true
free_tier_limits: "Self-hosted and unrestricted; inference cost follows whichever model endpoint is configured"
self_hostable: true
open_source: true
source_url: "https://github.com/kirodotdev/KiroCrew"
docs_url: null
github_url: "https://github.com/kirodotdev/KiroCrew"
alternatives: [open-swe, gptme]
integrates_with: []
added_date: "2026-10-05"
last_reviewed: "2026-10-05"
added_by: repo-maintainer
reviewed_by: null
verdict: watching
verdict_rationale: "Persistence is the right instinct — rediscovering a project's test command every run is waste — but alpha maturity and host-level execution make it one to trial, not adopt"
status: active
phase: dx-and-tooling
audience: [prototype, research]
best_when:
  - "The same repository is worked on repeatedly and you want the agent to remember how to build, test and lint it between sessions"
  - "You are experimenting with agents that write their own helper tooling and want that tooling to persist"
avoid_when:
  - "Untrusted instructions reach the agent and a host-level shell with no VM boundary is the execution model"
  - "You need reproducible agent behaviour across machines, where a self-modifying workspace is a liability"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Architecture summarised from the repository README; the project is alpha, so behaviour described here is subject to change and was not benchmarked."
buzz_sources: []
---

## Overview

KiroCrew is an agent workspace built around a single observation: coding agents forget. A conventional session ends and the next one rediscovers the build command, the lint config and the shape of the failing test, paying the same tokens for the same discovery every time.

The remedy here is a persistent workspace. Files, shell history, notes and helper scripts the agent writes survive between runs, so a second session on the same repository starts from what the first learned. The framework also records execution telemetry, which is what lets it prefer approaches that worked.

Agents run against a target codebase through a tool-execution layer covering shell, filesystem and APIs, and multiple roles — developer, tester, reviewer — can share one workspace.

## Why It's in the Arsenal

The Arsenal tracks agents by the state they keep, because that choice determines cost and reliability more than prompt wording does. Almost everything catalogued is stateless per run; this entry represents the persistent-workspace alternative and its costs.

It is also a useful cautionary example. A workspace that rewrites itself is powerful and, by construction, hard to reproduce — which is exactly the tension a team must resolve before depending on it.

## Key Features

- Persistent workspace state across restarts, including files, shell history and agent-internal notes.
- A self-improvement loop where the agent writes helper scripts for repetitive operations and reuses them later.
- Role-specialised agents — developer, tester, reviewer — collaborating inside one workspace directory.
- Tool access to terminal, filesystem and external APIs with configurable guardrails.
- Model flexibility, including local OpenAI-compatible endpoints such as Ollama and vLLM.

## Architecture / How It Works

A session loads the workspace, composes the prompt from the task plus persisted notes, and runs an agent loop over the tool layer. Tool results and successful command sequences are written back into the workspace — as scripts, configuration or notes — so subsequent sessions can invoke them directly rather than reasoning from scratch. Memory beyond the filesystem is handled through stored vectors and execution traces.

Because the workspace is the memory, its contents are the behaviour: two machines with different workspace state will solve the same task differently, which is both the feature and the reproducibility problem.

## Getting Started

Run it against a scratch clone inside a container or VM, not on a working tree you care about, and watch which files the agent adds to the workspace across two consecutive sessions. That comparison shows whether the persistence is learning something useful about your repository or simply accumulating noise.

## Use Cases

1. Repeated maintenance on one repository — dependency bumps, flaky test triage — where the build and test invocations are stable.
2. A long refactor split across days, where the agent resumes with its plan and partial notes intact.
3. Experiments in agent-authored tooling: letting the agent write a script for a repetitive task and observing whether it reuses it correctly.
4. Isolated sandboxes for research on self-improving agent behaviour, with the workspace snapshotted between runs.

## Strengths

- Eliminates repeated rediscovery of a project's build, test and lint commands, which is pure token savings on every subsequent run.
- Persisted helper scripts turn a solved problem into a reusable tool rather than an anecdote in a transcript.
- Role separation inside one workspace allows a tester agent to verify what a developer agent changed without a second setup.
- Runs with local models, so exploratory work need not incur hosted inference costs.

## Limitations / When NOT to Use

- Alpha project: interfaces, configuration and workspace format can change between releases, and documentation is thin.
- Host-level shell access with no VM boundary is a genuine risk when the model hallucinates a destructive command.
- Persistent sessions accumulate history; without pruning, later runs slow down and cost more rather than less.
- Self-modifying state makes behaviour machine-dependent and hard to reproduce, which conflicts with debugging at scale.

## Integration Patterns

Snapshot the workspace between runs and treat the snapshot as an artefact you can diff, roll back and attach to a bug report. Run it in a container that mounts only the target repository, and keep credentials out of the workspace filesystem entirely. If the agent writes helper scripts, review them as you would a teammate's commit — they execute with the same privileges on the next run.

## Resources

- [GitHub — kirodotdev/KiroCrew](https://github.com/kirodotdev/KiroCrew)

## Buzz & Reception

No independent usage report is recorded for this entry; it is an alpha project whose visibility comes from repository activity rather than from published deployments. The question worth answering is whether persistence genuinely reduces cost on your repository or merely accumulates state.
