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
org_or_maintainer: agentscope-ai
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 290
trending_score: 53
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: agentscope
name: AgentScope
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Python framework for building observable, multi-agent, and multimodal agent systems
github_url: https://github.com/agentscope-ai/agentscope
license: Apache-2.0
primary_language: Python
tags:
  - agents
  - orchestration
  - tool-use
  - multimodal
  - tracing
  - stateful
maturity: beta
cost_model: open-source
github_stars: 28048
last_commit: '2026-07-20'
docs_url: https://github.com/agentscope-ai/agentscope
phase: framework
domain:
  - language
  - reasoning
  - multimodal
relation_to_stack:
  - build-on-top
  - fork-and-adapt
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A Python agent framework that makes agent interaction, teams, tools, workspaces, and service operations inspectable.
best_for:
  - You need Python abstractions for multi-agent composition, tool use, multimodal input, and observable message flow.
  - You can define the persistence, workspace, credential, and approval policies around the framework.
avoid_if:
  - You need a deterministic workflow engine with no model-generated coordination.
  - You cannot test the rapidly expanding service, workspace, and plugin surfaces independently.
enrichment_notes: Official repository, Apache-2.0 license, and 2026-07-10 activity were reviewed on 2026-07-11. Cross-provider behavior and production fit remain draft.
---

## Overview

AgentScope is a Python framework for building agent systems that can be inspected rather than treated as one opaque prompt loop. Its scope includes agent messages, tools, teams, multimodal interactions, service features, and workspace backends. Recent repository work adds shared resources and Kubernetes/OpenSandbox-oriented workspace paths, increasing both its deployment usefulness and its operational surface.

## Why it's in the Arsenal

The framework is relevant when the hard problem is coordinating several model-backed roles while keeping messages, tool calls, and state visible. It should be compared with a simple graph/workflow framework: AgentScope buys agent-oriented composition and service features, but it also introduces more model-driven control flow to test and govern.

## Architecture

AgentScope’s core abstractions represent agents and messages, with model/provider adapters, tool invocation, agent teams, and multimodal content flowing through the runtime. Workspace backends provide a boundary for files and execution; the repository includes Kubernetes pod/PVC lifecycle work, tar-stream transfer, MCP gateway support, and OpenSandbox-based backends. Those are materially different trust surfaces, so a deployment should choose one workspace mode and validate its filesystem, network, credentials, and cleanup behavior rather than assuming all backends are equivalent.

## Ecosystem Position

AgentScope sits above model providers and below an application’s domain workflow. It overlaps with Python agent frameworks and multi-agent orchestration libraries, while its emphasis on visibility, teams, and workspaces makes it closer to an operated agent runtime than a prompt helper. Teams should compare the message/event model and failure recovery with their existing workflow engine before adopting both.

## Getting Started

Start with a single agent and one read-only tool. Capture messages, model calls, tool arguments, and state transitions, then add an agent team or workspace only after the single-agent trace is understandable. Pin the provider adapters and test a denied tool call, a failed model call, a workspace cleanup, and a repeated run.

## Key Use Cases

- Python multi-agent prototypes with observable message and tool flows.
- Multimodal or tool-using agents that need a reusable workspace boundary.
- Research into team coordination, agent service, and execution isolation.

## Strengths

- Makes agent communication and composition first-class framework concepts.
- Apache-2.0 project with active development and explicit workspace/service work.

## Limitations

- The breadth of agents, teams, models, tools, and workspace backends creates a large compatibility matrix.
- A framework-level trace does not prove that a tool call was safe or that a workspace was isolated; those claims need deployment tests.

## Relation to the Arsenal

AgentScope is a framework for constructing agent systems. Pair it with explicit policy, sandboxing, state storage, and evaluation rather than treating its observability abstractions as a security boundary.

## Resources

- [Official source](https://github.com/agentscope-ai/agentscope)
