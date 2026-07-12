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
org_or_maintainer: labring
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
id: fastgpt
name: FastGPT
artifact_type: platform
category: rag
subcategory: platforms
description: Knowledge-based LLM application platform for data processing, RAG retrieval, and visual AI workflow orchestration
github_url: https://github.com/labring/FastGPT
license: Apache-2.0 with additional conditions
primary_language: TypeScript
tags:
  - rag
  - retrieval
  - orchestration
  - agents
  - structured-output
  - data
maturity: beta
cost_model: open-source
github_stars: 28900
last_commit: '2026-07-10'
docs_url: https://github.com/labring/FastGPT
phase: data-and-retrieval
domain:
  - language
  - reasoning
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - fork-and-adapt
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A visual application and RAG platform combining knowledge ingestion, retrieval, model routing, and workflows.
best_for:
  - You need a self-hosted RAG or AI workflow application with a visual surface.
  - You can review its additional license conditions and operational components.
avoid_if:
  - You need a small retrieval library or a narrowly scoped API.
  - You cannot operate or audit model, data, plugin, and workflow permissions.
enrichment_notes: Official repository, custom Apache-derived license, and 2026-07-10 activity were checked on 2026-07-11. The additional license conditions and production fit require workload-specific review.
---

## Overview

FastGPT is a knowledge-based LLM application platform covering data processing, RAG retrieval, model providers, and visual AI workflow orchestration. It targets users who want a deployable application surface rather than only a library.

## Why it's in the Arsenal

It represents the all-in-one RAG platform tradeoff: faster assembly and a visible workflow model in exchange for more application state, permissions, and platform assumptions. The repository is active and its license is verified, but the additional conditions matter for distribution and use.

## Architecture

The platform combines a TypeScript application surface with knowledge ingestion, chunking and embedding paths, retrieval, model/provider access, workflow nodes, and application configuration. Each boundary—data loading, model calls, plugin/workflow execution, and storage—needs its own access and audit policy.

## Ecosystem Position

FastGPT sits in the data-and-retrieval application layer above models and storage. It overlaps with RAG platforms and visual AI builders, and can be complemented by independent evaluation and observability.

## Getting Started

Read the repository’s license and deployment documentation first, pin a release, and import a non-sensitive test corpus. Evaluate parsing, chunking, retrieval, answer grounding, workflow permissions, and backup/restore before connecting production data.

## Key Use Cases

- Self-hosted knowledge-base and RAG applications
- Visual prototyping of LLM workflows and retrieval-backed assistants

## Strengths

- Broad RAG and workflow surface in one deployable application
- Active development and substantial documentation/community signal

## Limitations

- Platform breadth increases upgrade, data, and permission complexity
- The Apache-derived license carries additional conditions that must be reviewed separately

## Relation to the Arsenal

This is an application platform, not a neutral RAG primitive. Pair it with source-grounded evaluation, data governance, and explicit tool/workflow policy.

## Resources

- [Official source](https://github.com/labring/FastGPT)
- [Official license](https://github.com/labring/FastGPT/blob/main/LICENSE)
