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
org_or_maintainer: "openai"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: symphony
name: "Symphony"
artifact_type: platform
category: agents
subcategory: autonomous
description: "OpenAI's engineering-preview specification and Elixir reference system for spawning autonomous Codex agents from a work board"
github_url: https://github.com/openai/symphony
license: "Apache-2.0"
primary_language: "Other"
tags:
  - "agents"
  - "orchestration"
  - "planning"
  - "code-gen"
maturity: alpha
cost_model: open-source
github_stars: 26046
last_commit: "2026-07-18"
docs_url: https://openai.com/index/open-source-codex-orchestration-symphony/
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "build-on-top"
  - "study-and-reference"
health_signals:
  - "org-backed"
  - "experimental"
ecosystem_role:
  - "Provides a focused building block for downstream AI workflows"
best_for:
  - "Autonomous software work queues with proof-of-work"
  - "Studying orchestration patterns for coding agents"
avoid_if:
  - "You need a stable production control plane today"
  - "Your organization cannot supervise agents making repository changes"
enrichment_notes: "Symphony is explicitly an engineering preview; the Elixir reference implementation and Codex coupling make maturity and portability important caveats. Draft pending review."
---

## Overview

Symphony frames autonomous coding as a work-board control problem: tasks become isolated agent runs, progress is monitored, and completion is accompanied by evidence such as CI, PR review, or walkthrough videos. That proof-of-work orientation is more operationally concrete than a chat wrapper that merely emits patches.

## Why it's in the Arsenal

This entry adds a concrete, currently relevant building block to the Arsenal: its README exposes a runnable workflow rather than only a paper, while its open repository makes the integration boundary inspectable for engineers. Symphony is especially useful because queue-driven autonomous coding experiments.

## Architecture

The reference implementation is written in Elixir and implements a specification around task selection, agent spawning, status monitoring, and result collection. Codex agents perform repository work while Symphony supplies workflow state and observability; teams should expect to adapt board, sandbox, and provider interfaces to their environment.

## Ecosystem Position

Symphony overlaps with coding-agent orchestrators and complements issue trackers, CI, and repository policy systems. Rather than replacing an agent runtime, it coordinates agents above the task boundary; its value is the explicit workflow contract and evidence loop, not a new foundation model.

## Getting Started

Begin with the linked README and documentation, install the project in an isolated environment, and reproduce the smallest supplied example before connecting it to production data or an agent loop. For Symphony, consult the GitHub entry first.

## Key Use Cases

The strongest fits are Queue-driven autonomous coding experiments; Auditable multi-task Codex operations. These scenarios keep the project's intended interface visible and avoid implying capabilities that the README does not promise.

## Strengths

Clear specification, reference implementation, work-board orchestration, and proof-of-work artifacts make the preview valuable for agent-platform design.

## Limitations

The project is an engineering preview, Elixir is a less common language for AI platform teams, and the reference flow is tied to Codex assumptions. Autonomous edits still need sandboxing, secrets isolation, budget limits, and human review; proof artifacts can show process without proving semantic correctness.

## Relation to the Arsenal

Symphony sits at a distinct boundary in the catalog: provides a focused building block for downstream ai workflows. Teams can connect its outputs to adjacent model, tool, or workflow entries, while retaining ownership of deployment policy and workload-specific evaluation.

## Resources

- [GitHub](https://github.com/openai/symphony)
- [OpenAI overview](https://openai.com/index/open-source-codex-orchestration-symphony/)
