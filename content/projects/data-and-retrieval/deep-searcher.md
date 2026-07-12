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
org_or_maintainer: "zilliztech"
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
id: deep-searcher
name: "DeepSearcher"
artifact_type: framework
category: rag
subcategory: advanced-rag
description: "An open deep-research framework from Zilliz that reasons over private data by iteratively planning sub-queries, searching a vector store"
github_url: https://github.com/zilliztech/deep-searcher
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "rag"
  - "agents"
  - "llm"
  - "self-hosted"
maturity: beta
cost_model: open-source
github_stars: 7939
last_commit: "2025-11-19"
docs_url: https://github.com/zilliztech/deep-searcher
phase: data-and-retrieval
domain:
  - "language"
relation_to_stack:
  - "build-on-top"
  - "deploy-as-is"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "An agentic deep-research pipeline that decomposes questions and iteratively retrieves over private data to produce cited reports."
best_for:
  - "You want an open, self-hostable deep-research agent over your own documents rather than a hosted service"
  - "You need multi-step, cited answers that iterate retrieval rather than a single-shot RAG lookup"
avoid_if:
  - "You need simple, low-latency single-turn RAG, where an iterative agent adds unnecessary cost and latency"
  - "You cannot supply an LLM and a vector database to back the pipeline"
enrichment_notes: "Repository, Apache-2.0 license, and 2025-11-19 activity verified via the GitHub API on 2026-07-12. Agentic loops cost multiple LLM calls per query."
---

## Overview

DeepSearcher is an open-source deep-research framework from Zilliz, positioned as a self-hostable alternative to hosted deep-research products, that reasons and searches over private data. Given a question it plans sub-queries, retrieves relevant chunks from a vector store, reflects on gaps, searches again, and finally synthesizes a cited answer or report.

## Why it's in the Arsenal

It exemplifies the agentic, iterative-retrieval evolution of RAG, going beyond single-shot lookup to plan-search-reflect loops over private corpora, which is a distinct and increasingly important pattern for the data-and-retrieval area.

## Architecture

DeepSearcher runs an agentic loop: an LLM decomposes the query into sub-questions, each sub-question is embedded and retrieved from a vector database (Milvus and others), a reflection step assesses whether the gathered context is sufficient and issues follow-up searches, and a final synthesis step composes an answer with citations back to the source chunks. It is provider-agnostic across LLMs, embedding models, and vector stores.

## Ecosystem Position

DeepSearcher builds on vector databases like Milvus and competes conceptually with hosted deep-research assistants and with single-shot RAG frameworks such as Haystack or LlamaIndex pipelines. Compared with basic RAG it adds iterative planning and reflection for harder questions, and compared with closed research agents it is transparent and self-hostable, trading turnkey convenience for control.

## Getting Started

Install with `pip install deepsearcher`, configure an LLM, an embedding model, and a vector database in the settings, load documents to index, then call the query API to receive an iterated, cited answer.

## Key Use Cases

Deep research over internal knowledge bases; cited report generation from private documents; complex multi-hop question answering; self-hosted alternatives to hosted research assistants.

## Strengths

Iterative plan-search-reflect retrieval, citations to sources, provider-agnostic across LLMs/embeddings/vector stores, self-hostable, and an Apache-2.0 license with Zilliz backing.

## Limitations

Agentic loops consume multiple LLM calls per query, raising cost and latency; answer quality depends on the underlying models and corpus; and it is overkill for simple single-turn retrieval needs.

## Relation to the Arsenal

It represents agentic RAG in the data-and-retrieval area alongside the retrieval libraries and vector databases.

## Resources

- [GitHub repository](https://github.com/zilliztech/deep-searcher)
