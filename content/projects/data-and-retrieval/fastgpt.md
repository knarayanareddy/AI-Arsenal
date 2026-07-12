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
org_or_maintainer: "labring"
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
id: fastgpt
name: "FastGPT"
artifact_type: platform
category: rag
subcategory: platforms
description: "Open-source knowledge-base and RAG platform with visual workflow orchestration for building question-answering and agent applications over your own data"
github_url: https://github.com/labring/FastGPT
license: "Other"
primary_language: "TypeScript"
tags:
  - "rag"
  - "retrieval"
  - "chunking"
  - "orchestration"
  - "agents"
  - "self-hosted"
maturity: production
cost_model: open-source
github_stars: 28911
last_commit: "2026-07-10"
docs_url: https://doc.fastgpt.io
phase: data-and-retrieval
domain:
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "community-driven"
  - "org-backed"
ecosystem_role:
  - "A self-hostable RAG platform that combines document ingestion, chunking, vector retrieval, and a visual flow builder for QA and agent pipelines."
best_for:
  - "You need a deployable knowledge-base/QA system over private documents with a UI for ingestion, retrieval tuning, and workflow design."
  - "You want visual orchestration of retrieval, LLM calls, and tools without building the RAG plumbing from scratch."
avoid_if:
  - "You need a lightweight embeddable retrieval library rather than a full platform with its own database and UI."
  - "You require guaranteed answer correctness; retrieval quality still depends on your chunking, embeddings, and evaluation."
enrichment_notes: "Official repository and 2026-07-10 activity were reviewed on 2026-07-12; the license is a modified open-source license (verify terms before commercial redeployment). Retrieval quality claims remain draft."
---

## Overview

FastGPT is a platform for building retrieval-augmented QA and agent applications over private data. It bundles document import and chunking, embedding-based vector retrieval, a visual workflow editor that wires retrieval to LLM and tool nodes, and an API/embed layer for shipping the result as a chatbot.

## Why it's in the Arsenal

It packages the full RAG lifecycle—ingest, index, retrieve, orchestrate, serve—into one deployable system. That makes it a useful reference for teams comparing 'assemble your own stack' against an integrated platform, and for studying how ingestion and retrieval knobs are surfaced to non-experts.

## Architecture

The system runs as a Next.js/TypeScript application backed by a database and a vector store (PostgreSQL/pgvector or compatible). Documents are parsed and chunked into a dataset, embedded, and indexed; a flow engine composes nodes for retrieval, prompt templating, model calls, and tool/HTTP steps. MCP and OpenAI-compatible model endpoints are supported, and applications are exposed via API or an embeddable widget.

## Ecosystem Position

FastGPT competes with other RAG platforms (Dify, RAGFlow) and, compared to framework-only options like LangChain or LlamaIndex, trades code flexibility for an integrated database, UI, and deployment story. It complements standalone vector databases and embedding models rather than replacing them. Evaluate it against a hand-built pipeline on ingestion control, retrieval observability, and lock-in.

## Getting Started

Deploy via the provided Docker Compose, create a dataset, upload a few documents, and confirm chunking and embedding succeeded. Build a minimal workflow (retrieve then answer), test a question, and inspect retrieved chunks and scores before tuning chunk size, top-k, and the prompt.

## Key Use Cases

- Internal document QA and support assistants over private corpora.
- Visual prototyping of RAG and tool-using agent workflows.
- Serving a knowledge base as an API or embeddable chat widget.

## Strengths

- End-to-end RAG lifecycle in one self-hostable platform.
- Visual workflow builder lowers the barrier to composing retrieval and tools.
- Active development, large community, and multi-provider model support.

## Limitations

- As an integrated platform it is heavier to operate than a library, and it owns its data model and storage.
- The license is a modified open-source license with conditions—review before commercial redeployment.
- Answer quality still depends on chunking, embedding choice, and evaluation you must own.

## Relation to the Arsenal

FastGPT is a platform-level counterpart to the retrieval libraries, vector databases, and RAG-tuning tips catalogued elsewhere. Use the Arsenal's chunking and retrieval-evaluation guidance to tune it rather than trusting defaults.

## Resources

- [Official source](https://github.com/labring/FastGPT)
- [Documentation](https://doc.fastgpt.io)
