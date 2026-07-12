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
org_or_maintainer: Aden
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
id: hive
name: Hive
artifact_type: framework
category: agents
subcategory: autonomous
description: Production-oriented multi-agent harness with state isolation, checkpoint recovery, cost controls, observability, and human oversight
github_url: https://github.com/aden-hive/hive
license: Apache-2.0
primary_language: Python
tags:
  - agents
  - orchestration
  - memory
  - planning
  - observability
  - guardrails
maturity: beta
cost_model: open-source
github_stars: 10674
last_commit: '2026-05-29'
docs_url: https://adenhq.com/
phase: agent-system
domain:
  - language
  - reasoning
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - actively-maintained
  - community-driven
ecosystem_role:
  - A runtime harness for production agent systems that adds state, recovery, observability, budget controls, and human-in-the-loop behavior around agent graphs
best_for:
  - You need long-running business-process agents with session isolation and recovery
  - You want a harness layer rather than only an orchestration API
avoid_if:
  - You are building a small one-shot agent or simple scripted chain
  - You cannot independently validate generated graphs, tool permissions, cost controls, and recovery behavior
enrichment_notes: Official repository, Apache-2.0 license, and production-harness positioning were reviewed on 2026-07-11. The project’s production claims and self-evolving behavior remain draft.
---

## Overview

Hive is production-oriented multi-agent harness with state isolation, checkpoint recovery, cost controls, observability, and human oversight.

## Why it's in the Arsenal

Hive is a fresh candidate for the agent-system layer because it addresses a concrete engineering decision and has an inspectable primary source.

## Architecture

The repository provides the implementation and integrations described by its official documentation. This entry keeps the architecture summary deliberately high-level until independent reproduction confirms exact operational boundaries.

## Ecosystem Position

It complements adjacent AI model, data, agent, serving, and evaluation components. Compare it by evidence, protocol, compatibility, and license—not by popularity alone.

## Getting Started

Follow the official source, pin versions, run a minimal example, and measure the behavior that matters for your workload before enabling real data or side effects.

## Key Use Cases

- You need long-running business-process agents with session isolation and recovery
- You want a harness layer rather than only an orchestration API

## Strengths

- Clear problem focus and inspectable primary source
- Explicit tradeoffs are documented rather than presented as unconditional recommendations

## Limitations

- Independent production evidence is not established in this first pass
- Compatibility, operational cost, and security boundaries require workload-specific testing

## Relation to the Arsenal

This agent-system project should be evaluated alongside the relevant AI Arsenal tools, architectures, build examples, and research entries.

## Resources

- [Primary source](https://github.com/aden-hive/hive)
