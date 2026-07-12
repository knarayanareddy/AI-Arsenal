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
org_or_maintainer: omnigent-ai
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
id: omnigent
name: Omnigent
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Agent meta-harness for orchestrating coding agents with policy enforcement, sandboxing, and collaboration
github_url: https://github.com/omnigent-ai/omnigent
license: Apache-2.0
primary_language: Python
tags:
  - agents
  - orchestration
  - security
  - guardrails
  - tool-use
maturity: beta
cost_model: open-source
github_stars: 7077
last_commit: '2026-07-11'
docs_url: https://github.com/omnigent-ai/omnigent
phase: agent-system
domain:
  - language
  - reasoning
  - general-purpose
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A meta-harness that standardizes orchestration and policy across multiple coding-agent runtimes instead of binding an application to one harness
best_for:
  - You operate several coding-agent backends and want a common orchestration or policy surface
  - You need to compare harnesses while retaining a central sandbox and governance layer
avoid_if:
  - You only use one agent and want the lowest possible integration complexity
  - You need independently verified isolation guarantees beyond the project documentation
enrichment_notes: Repository metadata, Apache-2.0 license, and active July 2026 development were reviewed on 2026-07-11. Cross-harness policy and sandbox guarantees remain draft.
---

## Overview

Omnigent is agent meta-harness for orchestrating coding agents with policy enforcement, sandboxing, and collaboration.

## Why it's in the Arsenal

Omnigent is a fresh candidate for the agent-system layer because it addresses a concrete engineering decision rather than only presenting a model or marketing surface.

## Architecture

The repository's implementation, integrations, and operational boundaries should be read from the official source before production adoption. This entry records the high-level position without claiming independent verification.

## Ecosystem Position

It complements adjacent model, data, agent, serving, or evaluation components and should be compared by deployment surface, evidence, and tradeoffs rather than star count.

## Getting Started

Follow the official repository setup, pin versions, run a minimal example, and measure the behavior that matters for your workload before enabling real data or side effects.

## Key Use Cases

- A focused engineering use case aligned with the repository description
- A controlled evaluation or integration experiment

## Strengths

- Active official repository and a clear problem focus
- Explicit tradeoffs are documented rather than presented as unconditional recommendations

## Limitations

- Independent production evidence is not established in this first pass
- Compatibility, operational cost, and security boundaries need workload-specific testing

## Relation to the Arsenal

This is a agent-system project and should be evaluated alongside the relevant AI Arsenal tools, architectures, and build examples.

## Resources

- [Official source](undefined)
