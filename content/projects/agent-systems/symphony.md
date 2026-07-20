---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: openai
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 9
trending_score: 31
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
status: active
id: symphony
name: Symphony
artifact_type: platform
category: agents
subcategory: autonomous
description: OpenAI's engineering-preview specification and Elixir reference system for spawning autonomous Codex agents from a work board
github_url: https://github.com/openai/symphony
license: Apache-2.0
primary_language: Other
tags:
  - agents
  - orchestration
  - planning
  - code-gen
maturity: alpha
cost_model: open-source
github_stars: 26055
last_commit: '2026-07-18'
docs_url: https://openai.com/index/open-source-codex-orchestration-symphony/
phase: agent-system
domain:
  - language
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - org-backed
  - experimental
ecosystem_role:
  - Elixir reference orchestrator for autonomous Codex work-board tasks
  - Proof-of-work workflow for monitored coding-agent operations
best_for:
  - Autonomous software work queues with proof-of-work
  - Studying orchestration patterns for coding agents
avoid_if:
  - You need a stable production control plane today
  - Your organization cannot supervise agents making repository changes
enrichment_notes: Symphony is explicitly an engineering preview; the Elixir reference implementation and Codex coupling make maturity and portability important caveats. Draft pending review.
---

## Overview

Symphony frames autonomous coding as a work-board control problem: tasks become isolated agent runs, progress is monitored, and completion is accompanied by evidence such as CI, PR review, or walkthrough videos. That proof-of-work orientation is more operationally concrete than a chat wrapper that merely emits patches.

## Why it's in the Arsenal

Symphony earns a slot because it treats autonomous coding as an operational work-board system rather than a single prompt. Its specification and Elixir reference implementation connect Codex agent runs to monitoring and proof-of-work artifacts such as CI, PR review, and walkthrough videos.

## Architecture

The reference implementation is written in Elixir and implements a specification around task selection, agent spawning, status monitoring, and result collection. Codex agents perform repository work while Symphony supplies workflow state and observability; teams should expect to adapt board, sandbox, and provider interfaces to their environment.

## Ecosystem Position

Symphony overlaps with coding-agent orchestrators and complements issue trackers, CI, and repository policy systems. Rather than replacing an agent runtime, it coordinates agents above the task boundary; its value is the explicit workflow contract and evidence loop, not a new foundation model.

## Getting Started

Read the OpenAI specification and clone the Elixir reference implementation, then configure a disposable work board and Codex environment as shown by the repository. Run one small repository task with CI and review enabled, inspect the emitted proof artifacts, and only then broaden concurrency or permissions.

## Key Use Cases

Use Symphony to experiment with queues of independent engineering tasks, long-running Codex work, and evidence-backed completion reports. It is also a useful reference when designing an internal agent control plane that needs task status, retries, and review signals rather than chat transcripts alone.

## Strengths

The design makes task selection, agent spawning, board monitoring, and completion evidence explicit. CI, PR review, and walkthrough videos are treated as proof-of-work signals, giving autonomous coding operations a more inspectable contract than an untracked collection of shell sessions.

## Limitations

The project is an engineering preview, Elixir is a less common language for AI platform teams, and the reference flow is tied to Codex assumptions. Autonomous edits still need sandboxing, secrets isolation, budget limits, and human review; proof artifacts can show process without proving semantic correctness.

## Relation to the Arsenal

Symphony complements Codex, repository hosting, CI, and the coding-agent entries in the Arsenal, while overlapping with orchestration platforms for autonomous software work. It belongs above an individual agent runtime and below organizational policy, identity, and release governance.

## Resources

- [GitHub](https://github.com/openai/symphony)
- [OpenAI overview](https://openai.com/index/open-source-codex-orchestration-symphony/)
