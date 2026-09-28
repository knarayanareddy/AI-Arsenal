---
id: lightagent
name: LightAgent
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "A compact Python agent framework with hooks, durable sessions, graph memory, MCP adapters, and SQLite FTS5 retrieval"
github_url: "https://github.com/wanxingai/LightAgent"
license: Apache-2.0
primary_language: Python
tags: [agents, stateful, tool-use, pytorch]
maturity: beta
cost_model: open-source
github_stars: 1225
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-16"
docs_url: "https://sufe-aiflm-lab.github.io/LightAgent/"
demo_url: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Gives you the runtime discipline of a large framework in a small surface, with event-sourced durability and policy gates."
best_for:
  - "You need memory with an admission policy and audit trail rather than a vector store any agent can write to freely."
  - "You are wiring MCP over both stdio and SSE into an existing Python service and need one adapter for both transports."
  - "You are prototyping with several providers and need OpenAI-compatible streaming output without committing to one vendor's SDK."
avoid_if:
  - "You want a stable 1.0 contract, because the project publishes a public API compatibility inventory specifically to stabilize before 1.0.
"
  - "You are deploying something that must survive dependency churn, because the release cadence is roughly monthly with breaking changes."
  - "You need a graph database behind your agent memory, since shared graph memory is opt-in and fail-closed."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 1225, Apache-2.0, Python, last commit 2026-09-16, topics, homepage. From README: v0.10.0 event-sourced runtime with sessions, capability registry, budgets, compaction, FTS5; v0.9.x Connector, traces, LightFlow; max_tool_iterations; arXiv 2509.09292. Hook signatures not read."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

LightAgent presents itself as an ultra-lightweight Python framework that has grown into a runtime: v0.10.0 introduces a unified event-sourced Agent Runtime with durable Sessions, async execution, a Capability Registry and Policy, Inbox, Goals, and Budgets, compaction and recovery, jobs and subagents, standardized Skills and MCP adapters, and SQLite FTS5 retrieval. Earlier releases added trace summaries and exporters, deterministic evaluation, durable human approval for tools, handoffs, the LightFlow orchestration layer, a dependency-free Connector contract with offline validation, expanded Python executor security checks, and an opt-in Mem0 Graph security matrix. Hooks are a first-class lifecycle surface with consistent on_error and after_run handling and a max_tool_iterations bound on streaming tool safety, so a runaway loop terminates rather than spinning. Output is OpenAI-compatible streaming, which is what makes it drop-in for a chat frontend.

## Why it's in the Arsenal

The recurring decision is how much runtime machinery to adopt before your agent is real. Big frameworks give you durability, policy, and traceability but arrive with a large surface you must learn and a dependency tree you must audit. LightAgent argues those properties are separable: hook lifecycle, trace export, deterministic evaluation, and approval gates are each independently useful and each versioned against a published compatibility inventory. The fail-closed admission rule for shared graph memory is the sharpest example - by default nothing writes to shared memory without passing policy, which flips the usual assumption that memory availability is the feature.

## Architecture

Everything routes through one event-sourced runtime, so durable Sessions are the substrate rather than a checkpoint bolted onto a request handler. Context that outgrows the window is handled by compaction plus recovery rather than silent truncation, and Goals with Budgets bound what an agent may spend before it must stop. A Capability Registry and Policy layer mediates what the agent may invoke, which is where the durable human-approval path and the executor security checks sit. Retrieval is SQLite FTS5 in-process, so lexical memory needs no external service, while graph memory behind Mem0 is an opt-in extension with its own security matrix and fail-closed admission. MCP arrives through standardized adapters covering stdio and SSE, Skills are a first-class packaging format, and LightFlow handles multi-agent orchestration and handoffs.

## Ecosystem Position

LightAgent competes with LangGraph, CrewAI, and Pydantic AI for the same agent-framework slot, and its pitch is the narrow one: comparable runtime discipline at a much smaller footprint and dependency count. Compared with Pydantic AI, it invests in durability, policy, and graph-memory admission rather than in typed-output ergonomics. Compared with LangGraph's explicit state machine, it hides the graph behind an event log, which is easier to start and harder to reason about when a run goes sideways. It overlaps with the MCP servers in content/projects/data-and-retrieval as a client of them, adds native retrieval where those only add tools, and its trace exporters and deterministic evaluation target the same observability and eval tooling catalogued in content/projects/benchmark-and-eval. Model calls are provider-agnostic and sit above content/projects/inference-engines.

## Getting Started

Install from PyPI and write a small agent with a tool; the framework is a normal Python import. Python 3.9+ is the working assumption for recent releases.

```bash
pip install lightagent
```

Docs are published as a GitHub Pages site at sufe-aiflm-lab.github.io/LightAgent, and the package publishes an arXiv paper (2509.09292) covering its design.

## Key Use Cases

1. Gate agent memory: put shared graph memory behind LightAgent's policy and audit controls so writes fail closed instead of accumulating unvetted facts.
2. Add human approval to a tool path: use the durable approval hook so a gated call survives a restart instead of re-prompting.
3. Stream into an existing chat UI: emit OpenAI-compatible streaming responses so the frontend needs no framework-specific adapter.

## Strengths

- Unified event-sourced runtime gives durable sessions, compaction, and recovery from one substrate rather than three subsystems.
- Policy and Capability Registry mediate every invocation, with fail-closed admission as the default rather than the exception.
- Deterministic evaluation and trace exporters ship in the framework, so reliability work does not require a second stack.
- In-process SQLite FTS5 retrieval means lexical memory needs no external database for small deployments.

## Limitations

The API is not stable: the project publishes a compatibility inventory as part of its v1.0 stabilization work, which is a candid signal that breaking changes are still routine. Release cadence is fast and shallow, so pinned versions age quickly and transitive dependencies move under you. Multi-agent orchestration through LightFlow is newer than the core and less exercised. Graph memory is optional and depends on Mem0, adding a dependency exactly when you want fewer. The framework does not host models, so throughput and batching remain a separate decision in content/projects/inference-engines, and its evaluation tooling is narrow - regression suites for your own domain still need building.

## Relation to the Arsenal

This framework-phase entry is the runnable runtime among the frameworks in the sibling content/projects/frameworks phase, and its event log is the part worth comparing against LangGraph checkpoints. Its in-process retrieval and graph memory sit next to the stores in content/projects/data-and-retrieval, its trace and eval exports feed content/projects/benchmark-and-eval, and its provider-agnostic model calls are the client side of content/projects/inference-engines.

## Resources

- [Repository](https://github.com/wanxingai/LightAgent)
- [Documentation site](https://sufe-aiflm-lab.github.io/LightAgent/)
- [Design paper on arXiv](https://arxiv.org/abs/2509.09292)
