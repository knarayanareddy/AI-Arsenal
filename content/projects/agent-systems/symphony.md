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
description: "OpenAI engineering preview that monitors a work tracker and spawns isolated agent runs that deliver pull requests with proof of work"
github_url: "https://github.com/openai/symphony"
license: Apache-2.0
primary_language: Other
tags: [agents, observability]
maturity: experimental
cost_model: open-source
github_stars: 27456
last_commit: "2026-09-15"
docs_url: "https://github.com/openai/symphony/blob/main/SPEC.md"
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
  - "Elixir reference orchestrator for autonomous Codex work-board tasks"
  - "Proof-of-work workflow for monitored coding-agent operations"
best_for: ["You already run coding agents per ticket and want the loop moved up a level, so a board item becomes an isolated implementation run with a pull request at the end.", "You want to read a specification and build your own orchestrator in your preferred language, because the repository ships a SPEC.md and explicitly invites implementation by any coding agent.", "You are experimenting with harness engineering practices and want a reference implementation in Elixir to read alongside the specification."]
avoid_if: ["You need a supported production tool, because the README carries an explicit warning that Symphony is a low-key engineering preview for testing in trusted environments.", "You need agents to work without repository and tracker write access, because the design has agents completing tasks and landing pull requests, which implies real write credentials.", "You are not already using harness engineering practices, because the README states it works best in codebases that have adopted them."]
enrichment_notes: "Symphony is explicitly an engineering preview; the Elixir reference implementation and Codex coupling make maturity and portability important caveats. Draft pending review."
---

## Overview

Symphony turns project work into isolated, autonomous implementation runs so that teams manage work rather than supervising coding agents. In the demonstrated flow it monitors a Linear board, spawns agents to handle the tasks, and the agents complete them while producing proof of work: CI status, PR review feedback, complexity analysis and walkthrough videos. When the work is accepted, the agents land the pull request safely. The repository's own position is explicit about its status: a low-key engineering preview for testing in trusted environments, and the stated prerequisite is a codebase that has already adopted harness engineering, with Symphony framed as the next step from managing coding agents to managing work. It ships a specification and an experimental Elixir reference implementation rather than a single canonical tool.

## Why it's in the Arsenal

The decision it addresses is the supervision tax. One agent plus one human reviewer does not scale past a handful of parallel tasks, because a human has to watch each run, notice when it has drifted, and decide when it is done. Symphony's answer is to make the unit of work a board item and push the judgement to acceptance: the agent works in isolation, produces artefacts a reviewer can inspect, and the human decision narrows to accept or reject rather than to babysit a session. Proof of work is the load-bearing idea, since an autonomous run that lands a pull request with only a summary is unauditable.

## Architecture

A controller watches a work tracker, in the demonstrated case a Linear board, and maps items to isolated implementation runs. Each run spawns a coding agent in its own working environment, gives it the task, and collects its outputs: a CI status, review feedback, a complexity analysis and a walkthrough video that together constitute the proof of work. Once a reviewer accepts, the run lands the pull request, which is the step the design treats as the safety boundary rather than the agent's own commit. The repository intentionally does not ship one required implementation: SPEC.md is the normative document and the Elixir tree is described as an experimental reference implementation, with both READMEs framing the setup as something a coding agent can do for you. That is a deliberate distribution choice, and it means the concrete scheduler, isolation mechanism and tracker integration in a given deployment come from whoever implemented the spec.

## Ecosystem Position

Symphony is adjacent to the coding agents in content/projects/dx-and-tooling rather than competing with them, because it is the orchestration layer that spawns them and decides what work they get. It overlaps with the workflow orchestrators in content/projects/orchestration on the scheduling question, but with a narrower unit of work, an isolated run per item, and a pull-request-shaped result rather than a DAG of tasks. Compared with a CI platform it is the thing that creates pull requests, not the thing that builds them. It complements rather than replaces the agent frameworks in content/projects/framework, since Symphony assumes an agent that can do implementation work and supplies the work management around it, and it is worth reading next to the Codex-specific tooling in the same developer-tooling phase.

## Getting Started

There is no single install path by design. The documented options are to implement Symphony from the specification, or to run the Elixir reference implementation:

```bash
git clone https://github.com/openai/symphony.git
cd symphony
# follow elixir/README.md for environment setup and run instructions
```

The repository's own suggested workflow is to hand the setup or the implementation to a coding agent: implement Symphony per SPEC.md in a language of your choice, or set up the Elixir implementation per elixir/README.md. Expect to supply your own agent runtime, tracker credentials and repository access.

## Key Use Cases

1. Board-driven implementation: point it at a Linear board and let isolated agent runs take items through to a reviewable pull request without a human watching each session.
2. Harness practice adoption: read SPEC.md and the Elixir reference implementation as a worked example of moving from supervising agents to managing work.
3. Custom orchestrator build: use the specification as the contract for implementing a work-item orchestrator in your own language and against your own tracker.

## Strengths

- Shifts the human's job from supervising sessions to accepting work, which is the only version of multi-agent development that scales past a few parallel tasks.
- Proof-of-work artefacts, including CI status, complexity analysis and a walkthrough video, make an autonomous run auditable instead of a claim.
- Specification-first distribution means you can implement it in your own language and against your own tracker rather than adopting a fixed runtime.
- Apache-2.0 licensed and explicitly aimed at trusted internal environments, which matches how a team would pilot it.

## Limitations

The README is unambiguous that this is a low-key engineering preview for trusted environments, so nothing here should be read as a supported product with an SLA, a security model or a compatibility promise. It requires write access to your forge and your tracker, and it lets agents land pull requests, so the blast radius of a misconfigured preview is your repository history. The concrete implementation is not a given: with a spec and an experimental Elixir reference, every deployment differs, which makes bugs hard to report and fixes impossible to share. The harness engineering prerequisite means a team without those practices in place gets a workflow that exposes the gaps rather than solving them, and the demonstration relies on a single tracker integration, so Linear is the path of least resistance and others are unspecified.

## Relation to the Arsenal

This belongs in content/projects/agent-systems as the work-management layer above coding agents, and it should be read alongside the coding agents in content/projects/dx-and-tooling that it spawns and the forge and CI tooling it defers to. The batch-oriented orchestrators in content/projects/orchestration are the closest comparison, with the difference that Symphony's unit of work is a pull request rather than a task dependency. It sits downstream of the framework entries in content/projects/framework, which supply the agent implementations it assumes exist. If your question is whether you need this at all, the honest test is whether you already run several agents in parallel and lose time supervising them.

## Resources

- [GitHub — openai/symphony](https://github.com/openai/symphony)
- [Specification — SPEC.md](https://github.com/openai/symphony/blob/main/SPEC.md)
- [Announcement — open-source Codex orchestration](https://openai.com/index/open-source-codex-orchestration-symphony/)
