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
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: openai-swarm
name: "OpenAI Swarm"
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: "An educational, lightweight framework from OpenAI exploring ergonomic multi-agent orchestration through simple agents and handoffs, precursor to the Agents SDK"
github_url: https://github.com/openai/swarm
license: "MIT"
primary_language: "Python"
tags:
  - "agents"
  - "llm"
  - "self-hosted"
maturity: experimental
cost_model: open-source
github_stars: 21789
last_commit: "2026-04-15"
docs_url: https://github.com/openai/swarm
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "study-and-reference"
health_signals:
  - "research-origin"
  - "org-backed"
ecosystem_role:
  - "An educational reference for lightweight multi-agent orchestration via agents, routines, and handoffs."
best_for:
  - "You want to learn multi-agent orchestration concepts (handoffs, routines) from a minimal reference"
  - "You are prototyping simple agent-to-agent delegation patterns before adopting a production SDK"
avoid_if:
  - "You need a production-supported framework, where OpenAI directs users to the Agents SDK"
  - "You need built-in state persistence, retries, and observability rather than a teaching sample"
enrichment_notes: "Repository, MIT license, and 2026-04-15 activity verified via the GitHub API on 2026-07-12. Explicitly educational and not for production; superseded by the OpenAI Agents SDK."
---

## Overview

OpenAI Swarm is an intentionally lightweight, educational framework exploring ergonomic multi-agent orchestration. Built by OpenAI's Solutions team, it models a system as a set of simple agents, each with instructions and tools, that can hand off control to one another, and it is meant to teach the patterns of coordination rather than to be a production runtime.

## Why it's in the Arsenal

Swarm crisply illustrates the core primitives of multi-agent systems, agents, routines, and handoffs, and as the conceptual precursor to the OpenAI Agents SDK it is an influential study-and-reference entry for understanding agent orchestration.

## Architecture

Swarm centers on two primitives: an Agent (instructions plus callable tool functions) and a handoff (a tool call that transfers the active conversation to another agent). A stateless client runs the loop, calling the model, executing any tool or handoff it returns, and continuing until an agent responds without a handoff, with lightweight context variables passed along. Because it holds no server-side state, it is simple to read and reason about.

## Ecosystem Position

Swarm sits alongside multi-agent frameworks like AutoGen, CrewAI, and LangGraph as the minimal, teaching-oriented reference, and OpenAI explicitly points production users to the newer Agents SDK. Compared with those frameworks it deliberately omits persistence, retries, and observability, so it complements them as a conceptual primer rather than competing as a runtime.

## Getting Started

Install from the repository, define a few `Agent` objects with instructions and tool functions plus handoff functions between them, then run the Swarm client loop with an initial message and observe the handoffs in action.

## Key Use Cases

Learning multi-agent orchestration; prototyping handoff-based delegation; teaching agent design primitives; sketching a flow before moving to the Agents SDK.

## Strengths

Minimal, readable primitives, clear handoff model, stateless simplicity, OpenAI provenance, and an MIT license that makes it easy to study and fork.

## Limitations

It is explicitly educational and not production-supported, lacks state persistence, retries, and observability, is superseded by the OpenAI Agents SDK, and needs additional engineering for real deployments.

## Relation to the Arsenal

It is the conceptual primer for multi-agent orchestration alongside the production agent frameworks in the catalog.

## Resources

- [GitHub repository](https://github.com/openai/swarm)
