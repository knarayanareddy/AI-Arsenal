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
org_or_maintainer: The-Pocket
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
id: pocketflow
name: PocketFlow
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Minimalist 100-line LLM framework for agents, workflows, RAG, and multi-agent patterns
github_url: https://github.com/The-Pocket/PocketFlow
license: MIT
primary_language: Python
tags:
  - agents
  - orchestration
  - rag
  - planning
  - tool-use
  - efficiency
maturity: beta
cost_model: open-source
github_stars: 10900
last_commit: '2026-07-04'
docs_url: https://the-pocket.github.io/PocketFlow/
phase: framework
domain:
  - language
  - reasoning
relation_to_stack:
  - build-on-top
  - fork-and-adapt
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A deliberately tiny flow/node abstraction for building LLM applications without a large vendor-specific framework layer
best_for:
  - You want a minimal, inspectable core for custom workflows or teaching agent patterns
  - You prefer to own provider, storage, and evaluation integrations directly
avoid_if:
  - You need built-in production persistence, governance, or extensive integrations
  - You mistake a small runtime for a complete application architecture
enrichment_notes: Official README, MIT license, documentation, and active repository metadata were reviewed on 2026-07-11. Production integration and ecosystem depth remain draft.
---

## Overview

PocketFlow is minimalist 100-line llm framework for agents, workflows, rag, and multi-agent patterns.

## Why it's in the Arsenal

PocketFlow is a fresh candidate for the framework layer because it addresses a concrete engineering decision and has an inspectable primary source.

## Architecture

The repository provides the implementation and integrations described by its official documentation. This entry keeps the architecture summary deliberately high-level until independent reproduction confirms exact operational boundaries.

## Ecosystem Position

It complements adjacent AI model, data, agent, serving, and evaluation components. Compare it by evidence, protocol, compatibility, and license—not by popularity alone.

## Getting Started

Follow the official source, pin versions, run a minimal example, and measure the behavior that matters for your workload before enabling real data or side effects.

## Key Use Cases

- You want a minimal, inspectable core for custom workflows or teaching agent patterns
- You prefer to own provider, storage, and evaluation integrations directly

## Strengths

- Clear problem focus and inspectable primary source
- Explicit tradeoffs are documented rather than presented as unconditional recommendations

## Limitations

- Independent production evidence is not established in this first pass
- Compatibility, operational cost, and security boundaries require workload-specific testing

## Relation to the Arsenal

This framework project should be evaluated alongside the relevant AI Arsenal tools, architectures, build examples, and research entries.

## Resources

- [Primary source](https://github.com/The-Pocket/PocketFlow)
