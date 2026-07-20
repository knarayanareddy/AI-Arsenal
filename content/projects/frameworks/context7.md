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
org_or_maintainer: Upstash
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 533
trending_score: 70
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: context7
name: Context7
artifact_type: platform
category: tooling
subcategory: platforms
description: Up-to-date code documentation platform for LLMs and AI coding editors through retrieval and MCP access
github_url: https://github.com/upstash/context7
license: MIT
primary_language: TypeScript
tags:
  - retrieval
  - llm
  - structured-output
  - data
maturity: beta
cost_model: freemium
github_stars: 59467
last_commit: '2026-07-20'
docs_url: https://github.com/upstash/context7
phase: framework
domain:
  - language
  - general-purpose
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - A documentation-retrieval layer that injects current library and API context into model and coding-agent workflows through hosted or MCP-facing surfaces.
best_for:
  - You need version-aware library documentation available inside an AI coding workflow instead of asking a model to recall APIs.
  - You can measure retrieval coverage and citation usefulness on the libraries your team actually uses.
avoid_if:
  - You require a fully self-hosted documentation corpus with controlled ingestion and no hosted dependency.
  - You need guaranteed coverage or freshness for private libraries without maintaining and evaluating your own corpus.
enrichment_notes: Official repository, MIT license, and active development were reviewed on 2026-07-11. Hosted limits, corpus coverage, and version-selection behavior require workload-specific review.
---

## Overview

Context7 is a TypeScript documentation-retrieval platform for LLMs and AI coding editors. Its central promise is not general web search: it resolves a library or framework request and supplies model-readable documentation at the point where an agent is generating or modifying code. That makes documentation freshness and version selection the primary quality questions.

## Why it's in the Arsenal

Coding agents often fail because a model knows a familiar API but not the installed version. Context7 is a concrete response to that failure mode. It belongs in the Arsenal as a retrieval component to evaluate, not as proof that retrieved documentation is complete or correct.

## Architecture

The public workflow has two distinct steps: identify the requested library and retrieve documentation for the selected library context. The project exposes this capability through a hosted service and MCP-facing integrations, so the model or agent can call documentation retrieval as a tool. That separation matters operationally: a wrong library match, stale page, or overly broad result can be worse than no context. Teams should log the resolved library, version, retrieved documents, and downstream code changes.

## Ecosystem Position

Context7 sits between documentation sources and the model or coding-agent runtime. It overlaps with repository indexing and documentation-RAG systems, but its narrow focus is useful when the problem is public library/API context rather than arbitrary enterprise retrieval. A self-hosted team may prefer an internal index when private code, retention, or deterministic corpus versioning is more important than convenience.

## Getting Started

Connect the official integration to a disposable coding-agent workspace. Ask for a small set of known APIs across two library versions, inspect the returned documentation, and compare generated code with the pinned dependency. Measure hit rate, version correctness, citation or source visibility, latency, and behavior when the library is missing.

## Key Use Cases

- Supplying current public framework documentation to a coding agent before it writes code.
- Testing whether retrieval of API-specific context reduces version-mismatch and hallucinated-method failures.

## Strengths

- Targets a specific and common coding-agent failure mode rather than attempting to index every kind of context.
- TypeScript implementation, MIT licensing, and MCP-facing access make it easy to test as a separable retrieval dependency.

## Limitations

- Hosted corpus coverage, update timing, rate limits, and version disambiguation remain external dependencies.
- Documentation retrieval cannot verify that the installed package, local wrappers, or private extensions match the retrieved source.

## Relation to the Arsenal

Context7 is a framework/platform component for documentation retrieval. Pair it with repository-local search, dependency lockfiles, tests, and source citations; do not let it replace compilation or API-contract checks.

## Resources

- [Official source](https://github.com/upstash/context7)
