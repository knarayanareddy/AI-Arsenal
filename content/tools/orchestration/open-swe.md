---
id: open-swe
name: "Open-SWE"
type: tool
job: [orchestration, evaluation]
description: "Asynchronous software-engineering agent that plans, edits and tests against a repository in an inspectable loop"
url: "https://github.com/langchain-ai/open-swe"
cost_model: open-source
pricing_detail: "MIT-licensed source; you pay the model provider for every planning, editing and repair turn"
tags: [agents, code-gen, orchestration, tool-use]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "MIT source is free; token spend on the reasoning model is the real cost and scales with retries"
self_hostable: true
open_source: true
source_url: "https://github.com/langchain-ai/open-swe"
docs_url: null
github_url: "https://github.com/langchain-ai/open-swe"
alternatives: []
integrates_with: []
added_date: "2026-10-04"
last_reviewed: "2026-10-04"
added_by: repo-maintainer
reviewed_by: null
verdict: solid-choice
verdict_rationale: "The execution graph is open and editable, which matters when an agent has to fit your test harness; the token cost of the plan-execute-verify loop is the thing to bound first"
status: active
phase: orchestration
audience: [production, prototype]
best_when:
  - "Your repository has a fast, deterministic test command the agent can run to verify its own edits"
  - "You want to change what the agent reads, which tools it has and when it stops, rather than accept a vendor's fixed loop"
avoid_when:
  - "The test suite takes long enough that each verification round costs more than the issue is worth"
  - "You need a managed service with repository access controls and compliance attestations already in place"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Behaviour described from the repository and project documentation; no issue-resolution benchmark was reproduced for this entry."
buzz_sources: []
---

## Overview

Open-SWE is an asynchronous software-engineering agent: it takes a repository and an issue, locates the relevant code, proposes edits, runs the checks and iterates until something passes or it gives up. What distinguishes it from a hosted coding agent is that the loop itself is ordinary code — a cyclic state graph built on LangChain and LangGraph primitives — so the prompts, tools and stop conditions are all editable.

Asynchrony is a design requirement rather than a nicety. Test suites and builds take minutes, and a synchronous loop would hold a worker idle while it waits. Here the graph pauses on long operations, keeps its state, and resumes when the environment returns a result, which is also what allows one orchestrator to supervise several repository tasks.

Execution happens inside isolated containers, so shell commands and test runs cannot touch the host.

## Why It's in the Arsenal

The Arsenal treats coding agents as a distinct category because their evaluation signal is unusually clean: the repository's own tests answer whether the work succeeded. That makes the verification loop the interesting design surface, and this project exposes it.

It is also the counterexample to sealed coding agents. When an agent fails on your codebase, the useful question is which step chose the wrong file or the wrong fix; an editable graph lets you answer that and change it.

## Key Features

- A cyclic state graph covering planning, tool execution, observation and reflection, with state persisted between steps.
- Asynchronous orchestration of long-running commands, so a test suite does not block other work.
- Container-isolated execution of shell commands, file edits and test runs.
- Provider-agnostic model access, with structured tool calling and prompts tuned for strong reasoning models.
- Execution traces over state transitions and tool payloads, including token accounting per step.

## Architecture / How It Works

The graph starts by indexing the repository, either through semantic search over a vector index or by traversing the file tree, and produces a working set of candidate files. The planning node converts the issue into a task list; the editing node applies targeted patches; the execution node runs the configured test command inside a container and returns stdout, stderr and an exit status. Observations feed back into state, and the loop continues until the checks pass or a budget is exhausted.

Because state is explicit, an interrupted run resumes from the last completed node instead of restarting. Because the container boundary is where permissions are enforced, the agent gains no more filesystem or network reach than the sandbox grants it.

## Getting Started

Point the agent at a repository that has a single, fast verification command — `pytest -q` on a subset, or a scoped test target — and run it against a small, well-specified issue before trying anything larger. Budget limits should be set on the first run: turn count, token ceiling and wall clock. Inspect the trace after that first issue; it shows which files the agent opened and where it wasted turns.

## Use Cases

1. Grinding through labelled issues such as dependency bumps, lint failures or flaky-test fixes, where the verification signal is unambiguous.
2. Test-driven repair: hand the agent a failing test and let it iterate until the suite is green, then review the diff.
3. Repository triage, using the planning step to locate the affected modules and producing a diagnosis without applying a patch.
4. Comparing two reasoning models on the same issue backlog, since the loop is fixed and only the model changes.

## Strengths

- The verification loop is the product: edits are validated against the repository's own checks rather than judged by a model.
- State persistence makes long tasks resumable, which matters when a build takes longer than a request timeout.
- Container isolation bounds what a wrong command can damage, and is the layer a security review will look at.
- Prompts, tools and transitions are editable, so the agent can be fitted to a monorepo's conventions instead of the reverse.

## Limitations / When NOT to Use

- Token consumption compounds: plan, edit, test and reflect can run several rounds per issue, and a hard debugging task can consume millions of tokens without converging.
- Quality tracks the reasoning model. Weaker or open-weight models struggle with the long-context instruction following and strict tool schemas the loop depends on.
- A slow or flaky test suite poisons the loop: the agent treats infrastructure noise as a code failure and starts chasing phantoms.
- Running it safely means operating container infrastructure and the credentials that let it clone and test repositories — real work beyond installing a package.

## Integration Patterns

Wire it to your issue tracker through a queue so each task is bounded and attributable, and mount only the repositories and secrets the task needs into the sandbox. Emit the trace to your existing observability pipeline, keyed by issue identifier, so cost per resolved issue becomes a query rather than an estimate. Gate merges on human review: the agent's own test pass is evidence, not approval.

## Resources

- [GitHub — langchain-ai/open-swe](https://github.com/langchain-ai/open-swe)

## Buzz & Reception

Reception for this entry rests on repository activity and the visibility of the LangChain/LangGraph lineage rather than an independent resolve-rate benchmark; no such measurement is reproduced here. The number to establish yourself is cost and time per merged change on your own backlog.
