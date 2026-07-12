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
org_or_maintainer: withastro
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
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: flue
name: Flue
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Sandbox-oriented agent framework with durable conversations, SDK surfaces, and explicit execution state
github_url: https://github.com/withastro/flue
license: Apache-2.0
primary_language: TypeScript
tags:
  - agents
  - orchestration
  - stateful
  - tool-use
  - security
maturity: beta
cost_model: open-source
github_stars: 7243
last_commit: '2026-07-09'
docs_url: https://github.com/withastro/flue
phase: framework
domain:
  - language
  - reasoning
  - general-purpose
relation_to_stack:
  - build-on-top
  - fork-and-adapt
health_signals:
  - org-backed
  - actively-maintained
  - community-driven
ecosystem_role:
  - A TypeScript-first runtime for agents whose conversation state, submissions, tool lifecycle, and sandbox boundaries need explicit contracts
best_for:
  - You are building TypeScript agent products and need durable execution and SDK/CLI integration
  - You value explicit state transitions, persistence contracts, and sandbox-oriented runtime design
avoid_if:
  - You need a mature stable release with little schema churn
  - You cannot operate or audit the persistence, sandbox, and execution lifecycle assumptions
enrichment_notes: Repository activity, Apache-2.0 license metadata, and recent contract/state changes were reviewed on 2026-07-11. External adoption and production maturity remain draft.
---

## Overview

Flue is an Apache-2.0 TypeScript sandbox-agent framework from the Astro organization. Its repository emphasizes durable conversations, explicit submission lifecycle, SDK/CLI surfaces, and contract-oriented execution state.

## Why it's in the Arsenal

It is a useful addition for engineers evaluating agent runtimes as durable software systems rather than prompt wrappers: state transitions, persistence, tool lifecycle, and sandbox boundaries are first-class concerns.

## Architecture

The repository spans runtime, SDK, React, CLI, examples, skills, and persistence adapters. Its design uses validated message/submission contracts and explicit terminalization/resume behavior to keep agent state inspectable across interruptions.

## Ecosystem Position

Flue is a framework for building agent products and can be paired with model providers, tool protocols, persistence backends, and external observability. It is not itself an inference engine or a hosted agent service.

## Getting Started

Follow the official monorepo setup and package-specific examples. Pin the schema/runtime version, test the persistence adapter you will use, and exercise interruption, retry, resume, and terminalization paths before production adoption.

## Key Use Cases

- TypeScript agent products with durable conversations and explicit runtime contracts
- Systems where interrupted work, tool state, and replayability must be auditable

## Strengths

- Strong attention to lifecycle correctness and durable execution state
- Multiple developer-facing surfaces for runtime, SDK, React, and CLI integration

## Limitations

- Active API/schema evolution
- Persistence and sandbox behavior must be evaluated against the selected deployment topology

## Relation to the Arsenal

This is a framework project for building agent applications. Its primary differentiator is runtime correctness and durability, not model quality or a hosted catalog of tools.

## Resources

- [Official source](https://github.com/withastro/flue)
