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
org_or_maintainer: CodeBendKit
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
id: codeseek
name: CodeSeek
artifact_type: tool
category: tooling
subcategory: tools
description: Rust code-intelligence CLI building call graphs and hybrid semantic search indexes for coding agents
github_url: https://github.com/CodeBendKit/codeseek
license: Apache-2.0
primary_language: Rust
tags:
  - agents
  - code-gen
  - retrieval
  - efficiency
  - local
maturity: beta
cost_model: open-source
github_stars: 636
last_commit: '2026-07-11'
docs_url: https://github.com/CodeBendKit/codeseek
phase: data-and-retrieval
domain:
  - language
  - reasoning
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A code-context indexing candidate for agents that need symbol, call-graph, and semantic retrieval.
best_for:
  - You need the CodeSeek problem space covered by an open-source component
  - You can evaluate the current release against your own data, deployment, and operational constraints
avoid_if:
  - You need an independently verified production guarantee rather than a candidate component
  - You cannot review licenses, permissions, model dependencies, and failure behavior before adoption
enrichment_notes: Repository metadata, license, language, and latest activity were reviewed on 2026-07-11. Capability, maturity, and production-fit claims remain draft.
---

## Overview

CodeSeek is rust code-intelligence cli building call graphs and hybrid semantic search indexes for coding agents.

## Why it's in the Arsenal

CodeSeek is a fresh candidate for the data-and-retrieval layer because it addresses a concrete engineering decision and has an inspectable open-source implementation.

## Architecture

The repository provides the implementation and integrations described by its official documentation. This entry keeps the summary high-level until a hands-on run confirms the exact execution, storage, model, and deployment boundaries.

## Ecosystem Position

It complements adjacent AI model, data, agent, serving, and evaluation components. Compare it by operational surface, evidence, compatibility, and license—not by star count alone.

## Getting Started

Follow the official repository setup, pin versions, run a minimal example, and measure the behavior that matters for your workload before enabling real data or side effects.

## Key Use Cases

- You need the CodeSeek problem space covered by an open-source component
- You can evaluate the current release against your own data, deployment, and operational constraints

## Strengths

- Clear problem focus and inspectable source
- Open license and active repository development

## Limitations

- Independent production evidence is not established in this first pass
- Compatibility, operational cost, and security boundaries require workload-specific testing

## Relation to the Arsenal

This data-and-retrieval project should be evaluated alongside the relevant AI Arsenal tools, architectures, build examples, and research entries.

## Resources

- [Official source](https://github.com/CodeBendKit/codeseek)
