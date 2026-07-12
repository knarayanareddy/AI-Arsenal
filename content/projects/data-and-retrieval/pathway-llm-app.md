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
org_or_maintainer: pathwaycom
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
id: pathway-llm-app
name: Pathway LLM App
artifact_type: platform
category: rag
subcategory: platforms
description: Ready-to-run RAG and AI pipeline templates that stay synchronized with live enterprise data sources
github_url: https://github.com/pathwaycom/llm-app
license: MIT
primary_language: Other
tags:
  - rag
  - retrieval
  - data
  - streaming
  - self-hosted
  - multimodal
maturity: beta
cost_model: open-source
github_stars: 59063
last_commit: '2026-07-05'
docs_url: https://github.com/pathwaycom/llm-app
phase: data-and-retrieval
domain:
  - language
  - multimodal
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - fork-and-adapt
health_signals:
  - org-backed
  - actively-maintained
  - community-driven
ecosystem_role:
  - A template/application layer for live-data RAG, enterprise search, and multimodal pipelines built on Pathway’s incremental processing model.
best_for:
  - You need a starting point for RAG over changing SharePoint, Drive, S3, Kafka, PostgreSQL, or API data.
  - You can operate a streaming pipeline and validate freshness, deletion, permissions, and index updates.
avoid_if:
  - You only need a static document index or a small batch RAG script.
  - You cannot define source permissions, connector failure behavior, cost limits, and stale-data SLOs.
enrichment_notes: Official repository, MIT license, live-source scope, and 2026-07-05 activity were reviewed on 2026-07-12. Template production fit remains workload-specific.
---

## Overview

Pathway LLM App is a collection of ready-to-run RAG and AI-pipeline templates for data that changes after the initial ingestion. It targets enterprise search and assistants where the source may be SharePoint, Google Drive, S3, Kafka, PostgreSQL, or a live API, and where the index should follow updates rather than be rebuilt manually.

## Why it's in the Arsenal

A static RAG demo often omits the hardest production behavior: new documents, deletes, connector outages, and permission changes. Pathway LLM App is included as a template/application reference for incremental RAG. The tradeoff is that a live-data pipeline is a continuously operated system, not simply a better chunker.

## Architecture

The repository organizes templates and cookbooks around ingestion, incremental transformations, embeddings/retrieval, and answer or agent interfaces. Source connectors feed a continuously updated pipeline; downstream indexes and responses must reflect additions, updates, and deletions. Video RAG templates add media-specific extraction and retrieval. The relevant control points are source checkpoints, connector credentials, document identity, deletion propagation, embedding/index updates, and backpressure when a source or model provider slows down.

## Ecosystem Position

Pathway LLM App sits above data connectors and retrieval infrastructure as a runnable RAG application layer. It overlaps with batch RAG templates, vector-search frameworks, and enterprise-search products, while its differentiator is live/incremental processing. Compare it with a scheduled rebuild on freshness, recovery, connector coverage, permission fidelity, and cost.

## Getting Started

Choose one source and one template, run it with a small corpus, and deliberately modify and delete source records. Measure source-to-index freshness, duplicate behavior, recovery after connector failure, embedding cost, query latency, and permission propagation. Keep source credentials and model/provider keys out of the template defaults before deployment.

## Key Use Cases

- Enterprise RAG over changing files, databases, streams, and APIs.
- Reference implementations for live document ingestion and multimodal retrieval.
- Prototyping self-updating search or assistant pipelines.

## Strengths

- Starts from concrete RAG applications rather than an abstract orchestration API.
- MIT templates and active development cover multiple source and multimodal patterns.

## Limitations

- A template cannot decide whether source access, deletion, or permissions are correct for an organization.
- Streaming connectors and model calls create ongoing compute, storage, and failure-recovery costs.
- The template may encode Pathway-specific assumptions that require adaptation before production use.

## Relation to the Arsenal

Pathway LLM App belongs in data-and-retrieval as an application/template project. Pair it with source governance, retrieval evaluation, connector monitoring, and a clear freshness SLO.

## Resources

- [Official source](https://github.com/pathwaycom/llm-app)
