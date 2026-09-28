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
org_or_maintainer: "trpc-group"
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
id: trpc-agent-go
name: "trpc-agent-go"
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: "Go-native agent framework with graph workflows, session memory, A2A, AG-UI, MCP and OpenTelemetry built in"
github_url: "https://github.com/trpc-group/trpc-agent-go"
license: Apache-2.0
primary_language: Go
tags: [retrieval, agents]
maturity: beta
cost_model: open-source
github_stars: 1829
last_commit: "2026-09-28"
docs_url: "https://trpc-group.github.io/trpc-agent-go/"
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "build-on-top"
  - "deploy-as-is"
health_signals:
  - "org-backed"
  - "actively-maintained"
ecosystem_role:
  - "Go alternative to Python agent frameworks, spanning graph orchestration, protocols, evaluation, and observability"
best_for: ["You run a Go service and want agent capability inside it, with streaming runners and context cancellation that fit your existing concurrency model.", "You need a graph runtime in Go with multi-conditional routing, because GraphAgent is positioned as the Go equivalent of LangGraph.", "You want agent-to-agent interoperability and a frontend protocol already wired, since A2A, AG-UI and MCP support are in the stack rather than add-ons."]
avoid_if: ["Your agent ecosystem is Python, because the ecosystem of retrievers, tools and tutorials in this space is overwhelmingly Python-first.", "You need the newest framework features on day one, because at roughly 1.8k stars the surface is still consolidating.", "You need to pin prompt-cache savings in your budget, because the caching claim is about a specific automatic behaviour you should measure rather than trust."]
enrichment_notes: "Apache-2.0 framework with broad, fast-moving features; interoperability and persistence require validation. Draft pending review."
---

## Overview

tRPC-Agent-Go is Tencent's Go framework for agent systems, bundling LLM agents, graph workflows, tool calling, session and memory state, knowledge retrieval, agent self-evolution, evaluation and OpenTelemetry observability. GraphAgent provides type-safe graph workflows with multi-conditional routing, and multi-agent composition supports chain, parallel and cycle patterns. Tools include function tools, MCP tools, web search and code execution. The README also lists reusable SKILL.md agent skills, Hermes-style session reviews that extract and gate reusable skills, automatic prompt caching, eval sets with metrics, and protocol integrations for AG-UI, A2A and MCP.

## Why it's in the Arsenal

The decision it removes is the polyglot agent tax. If your services are Go, the alternative is a Python agent microservice with its own deployment, its own types and a network hop on every tool call, plus a translation layer between Go structs and Python payloads. Putting the loop in Go keeps cancellation, tracing and error handling in the language your team already operates, and lets agent state live in the same database connection as the rest of the application.

## Architecture

An agent implements a common interface consumed by streaming runners that respect context cancellation. GraphAgent wires nodes and edges with multi-conditional routing to make control flow explicit, and chain, parallel and cycle combinators assemble multiple agents. Session state, memory, artifacts and knowledge retrieval sit behind persistent stores, MCP registers external tools, and OpenTelemetry spans cover each step. Skill authoring reuses the SKILL.md convention, with session reviews extracting candidate skills through a gate before they are published.

## Ecosystem Position

It competes with LangGraph in graph-based agent orchestration and, notably, the README positions GraphAgent as functionally equivalent to LangGraph for Go, which makes it the Go answer rather than a different design. It overlaps with content/projects/frameworks/langgraph on control-flow semantics while sitting in a different language ecosystem, and it complements the Go serving entries in content/tools/serving-and-deployment. Compared with AutoGen and CrewAI, which are Python role-team abstractions, its unit of composition is the graph and the runner.

## Getting Started

It is a Go module, so the dependency is fetched with go get and the README example composes agents with the chain combinator:

```bash
go get trpc.group/trpc-go/trpc-agent-go
```

```go
pipeline := chainagent.New("pipeline", chainagent.WithSubAgents([]agent.Agent{analyzer, processor, reporter}))
```

Docs are built with MkDocs and published at trpc-group.github.io.

## Key Use Cases

1. Adding agent capability to an existing Go service without introducing a Python runtime and a cross-language payload contract.
2. Explicit graph control flow where conditional routing and cycles must be auditable, rather than inferred by a planner.
3. Skill accumulation from real sessions: review past runs, extract a SKILL.md workflow, gate it, and publish it for reuse.

## Strengths

- Native Go concurrency with streaming runners and context cancellation, which is what a Go service already expects.
- Explicit graph routing makes multi-branch agent logic reviewable instead of emergent.
- Protocol coverage in the box: A2A for agent interoperability, AG-UI for frontends, MCP for tools.
- Observability and evaluation are part of the stack, so an agent ships with spans and an eval set rather than as an afterthought.

## Limitations

The Go agent ecosystem is young: at roughly 1.8k stars the API surface is still moving, so expect churn that a Python framework with ten times the usage does not have. Fewer third-party integrations exist, and anything not written in Go has to be bridged. The README claims prompt caching with a 90% saving on cached content, which is a workload-dependent number that needs measurement on your own traffic rather than adoption as a budget assumption. Self-evolution features that write skills are powerful and require the same review discipline you would apply to any agent that edits its own instructions.

## Relation to the Arsenal

This is the Go framework entry in content/projects/agent-systems and the language counterpart to content/projects/frameworks/langgraph, which it explicitly emulates in graph semantics. Its A2A and MCP support means it interoperates with the MCP tooling in content/tools/serving-and-deployment, and its OpenTelemetry story connects to the tracing entries in content/tools/evaluation-and-observability. The SKILL.md convention matches what hermes-agent and qwen-agent tooling in this catalog also read.

## Resources

- [GitHub — trpc-group/trpc-agent-go](https://github.com/trpc-group/trpc-agent-go)
- [Docs — trpc-group.github.io/trpc-agent-go](https://trpc-group.github.io/trpc-agent-go/)
- [Go reference — pkg.go.dev](https://pkg.go.dev/trpc.group/trpc-go/trpc-agent-go)
