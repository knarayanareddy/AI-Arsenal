---
id: ragflow
name: RAGFlow
version_tracked: null
artifact_type: platform
category: rag
subcategory: frameworks
description: Open-source RAG engine combining document understanding, retrieval, and agent capabilities
github_url: "https://github.com/infiniflow/ragflow"
license: Apache-2.0
primary_language: Python
org_or_maintainer: null
tags: [rag, retrieval, agents, cloud]
maturity: production
cost_model: open-source
github_stars: 82655
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-06-13"
docs_url: "https://ragflow.io/docs/dev/"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: data-and-retrieval
domain: [language]
relation_to_stack: [deploy-as-is, fork-and-adapt]
health_signals: [org-backed, community-driven, actively-maintained]
ecosystem_role:
  - Self-hosted, all-in-one RAG engine combining deep document understanding, retrieval, agent workflows, and a web UI in a single deployable stack
best_for:
  - You want a complete, self-hostable RAG platform (document parsing, retrieval, agent workflows, web UI) deployed as a single Docker Compose stack, rather than assembling a framework, vector database, and UI separately
  - You need deep document understanding (not just chunking) built into the ingestion pipeline as a core product feature
avoid_if:
  - You want a lightweight deployment — RAGFlow's full stack includes Elasticsearch (requiring 16GB+ RAM due to memory-lock behavior), MySQL, MinIO, and Redis, which is substantially heavier than a single vector database plus a thin application layer
  - You need fine-grained code-level control over the RAG pipeline — RAGFlow's all-in-one platform model trades some of that flexibility for out-of-the-box completeness
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: RAGFlow (maintained by InfiniFlow) shows active 2026 release activity (v0.25.1 and ongoing nightly builds per third-party deployment guides) and a documented public roadmap for 2026, confirming ongoing maintenance; independent named enterprise production deployments were not found beyond community self-hosting guides.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

An open-source, self-hosted RAG engine combining deep document understanding, retrieval, an agent workflow engine, memory storage, sandboxed code execution, and a web UI into a single deployable stack, maintained by InfiniFlow.

## Why it's in the Arsenal

RAGFlow is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

## Architecture

Deployed as a multi-container Docker Compose stack combining Elasticsearch (or the lighter Infinity engine) for document search, MySQL for metadata, MinIO for object storage, and Redis for task queuing, with a Python backend implementing document parsing, chunking, retrieval, and an agent workflow engine, plus an MCP server for agent-driven interaction and a web UI for knowledge-base management.

## Ecosystem Position

Upstream: integrates with Infinity, InfiniFlow's own AI-native database, as an alternative to Elasticsearch. Downstream: none of particular note. Competing: Dify (also an all-in-one platform, more agent/workflow-general-purpose than RAG-specific), assembling LangChain/LlamaIndex plus a vector database and custom UI. Complementary: works with a wide range of LLM providers and local models for its generation step.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Integrating RAGFlow**: treat it as a dependency with its own failure modes rather than a library call — decide timeout, retry and degraded-mode behaviour before the first query goes through it, and put it behind an interface so it can be replaced without a rewrite.
2. **What to measure first**: `complete`, `self-hostable`, `platform`, `document` decide whether RAGFlow works for you; measure them on your own data because the published numbers are conditioned on someone else's setup.
3. **Before committing**: pick the criterion that would make you abandon this choice, write it down, and check it against a representative slice of your own data — a catalog entry can tell you what is claimed, only a run tells you what is true.

## Strengths

- Beyond the headline description, RAGFlow's architecture section is the honest source: deployed as a multi-container Docker Compose stack combining Elasticsearch (or the lighter Infinity engine) for document search, MySQL for metadata, MinIO for object storage, and Redis for task queuing, with a Python backend implementing document parsing, chunking, retrieval, and an agent workflow engine, plus an MCP server for agent-driven interaction and a web UI for knowledge-base management.
- Sits in the data-and-retrieval phase alongside the alternatives named in its Ecosystem Position section; cross-phase comparison is usually a category error rather than a useful alternative.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- Adoption risk for RAGFlow is mostly operational rather than technical — resource cost at your scale, dependency failure behaviour, and the upgrade path when interfaces move.
- Nothing in this entry substitutes for running RAGFlow against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- No alternative is catalogued alongside RAGFlow here, so the entry cannot tell you what it is better than; treat that absence as a gap in the comparison rather than as a verdict.

## Relation to the Arsenal

This is the data-and-retrieval entry for RAGFlow in this phase, and the honest way to use it is as one candidate among the alternatives listed in the phase index rather than as a default. Read the Strengths and Limitations sections before adopting it: the operational cost, the model or service dependencies, and the failure behaviour are what decide whether it fits your workload, and none of those are settled by the feature list alone.

## Resources

- [GitHub](https://github.com/infiniflow/ragflow)
- [Documentation](https://ragflow.io/docs/dev/)
