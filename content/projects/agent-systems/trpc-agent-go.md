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
org_or_maintainer: trpc-group
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 3
trending_score: 30
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
status: active
id: trpc-agent-go
name: trpc-agent-go
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Go framework for production agent systems with graph workflows, tools, memory, MCP, A2A, AG-UI, evaluation, and observability
github_url: https://github.com/trpc-group/trpc-agent-go
license: Apache-2.0
primary_language: Go
tags:
  - agents
  - graphs
  - memory
  - tool-use
  - orchestration
  - observability
maturity: beta
cost_model: open-source
github_stars: 1565
last_commit: '2026-07-20'
docs_url: https://trpc-group.github.io/trpc-agent-go/
phase: agent-system
domain:
  - language
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - Go alternative to Python agent frameworks, spanning graph orchestration, protocols, evaluation, and observability
best_for:
  - Building a typed Go service with tool-calling and graph workflows
  - Connecting agents to MCP, A2A, or AG-UI protocols in a production backend
avoid_if:
  - Your team is committed to Python-only model and evaluation libraries
  - You need a stable narrow API rather than a rapidly expanding protocol surface
enrichment_notes: Apache-2.0 framework with broad, fast-moving features; interoperability and persistence require validation. Draft pending review.
---

## Overview

trpc-agent-go is a Go framework for assembling production-oriented agents from graph workflows, tools, memory, and model providers. Its scope extends beyond a chat loop: the repository includes MCP, A2A, AG-UI, evaluation, and observability integrations so a Go service can keep orchestration and operations in one language.

## Why it's in the Arsenal

It earns an Arsenal entry because Go teams otherwise have to bridge into Python to obtain modern agent protocols and workflow primitives. The project offers a typed, service-friendly alternative with enough breadth to prototype real tool systems while keeping deployment aligned with Go infrastructure.

## Architecture

The framework models agent execution as graph workflows with nodes for model calls, tools, memory, and control flow. Provider adapters produce messages and tool calls, MCP exposes external capabilities, and A2A/AG-UI connect the runtime to neighboring agent interfaces; evaluation and tracing hooks observe the resulting trajectories.

## Ecosystem Position

trpc-agent-go competes with Python graph frameworks such as LangGraph and complements model gateways, MCP servers, and Go service infrastructure. Its broad protocol surface is an alternative for Go teams, but also means compatibility and persistence behavior must be tested rather than inferred from type definitions.

## Getting Started

Add the Go module from `trpc.group/trpc-go/trpc-agent-go`, follow the documentation quickstart, configure a model provider, and run the example workflow. Start with one tool and an in-memory graph, then enable MCP, persistence, or observability integrations individually.

## Key Use Cases

Use it for customer-support agents embedded in Go services, graph-based business workflows, protocol-connected tool agents, and evaluation of multi-step trajectories. It is also a reasonable foundation for teams standardizing agent infrastructure around Go.

## Strengths

Go-native deployment, graph workflows, memory, tool use, MCP/A2A/AG-UI support, and built-in evaluation/observability give the framework a notably broad systems boundary.

## Limitations

The breadth is still evolving, and adapters may differ in feature completeness. Persistence semantics, protocol interoperability, cancellation, retries, and trace durability need validation under production concurrency rather than only example workloads.

## Relation to the Arsenal

It complements the Arsenal's agent systems and observability entries while competing with Python-first orchestration frameworks. Unlike a model entry, it is the workflow and protocol layer that drives models, tools, and memory together.

## Resources

- [GitHub](https://github.com/trpc-group/trpc-agent-go)
- [Documentation](https://trpc-group.github.io/trpc-agent-go/)
