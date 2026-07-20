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
org_or_maintainer: 1Panel-dev
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 89
trending_score: 37
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: maxkb
name: MaxKB
artifact_type: platform
category: tooling
subcategory: platforms
description: Open-source platform for building enterprise-grade knowledge-base agents, pairing RAG over documents with workflow and tool orchestration
github_url: https://github.com/1Panel-dev/MaxKB
license: GPL-3.0
primary_language: Python
tags:
  - agents
  - rag
  - retrieval
  - orchestration
  - self-hosted
  - tool-use
maturity: production
cost_model: open-source
github_stars: 22142
last_commit: '2026-07-20'
docs_url: https://maxkb.cn
phase: agent-system
domain:
  - language
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - actively-maintained
  - org-backed
  - community-driven
ecosystem_role:
  - A self-hosted platform that combines document RAG, an agent/workflow engine, and model-backend abstraction for building internal knowledge assistants.
best_for:
  - You want a deployable, enterprise-oriented KB assistant with document ingestion, RAG, and a workflow builder out of the box.
  - You run models via Ollama, vLLM, or hosted APIs and want a UI to connect them to a governed knowledge base.
avoid_if:
  - You need a lightweight retrieval SDK to embed in an existing app rather than a standalone platform.
  - You cannot accept GPL-3.0 copyleft obligations for your deployment or derivatives.
enrichment_notes: Official repository, GPL-3.0 license, and 2026-07-10 activity were reviewed on 2026-07-12. Enterprise-grade claims remain draft pending your own security and scale testing.
---

## Overview

MaxKB is a platform for building knowledge-base agents: it ingests documents, indexes them for vector retrieval, and exposes a workflow/agent engine that combines retrieval with LLM calls and tools. It is packaged for self-hosting and connects to local runtimes (Ollama, vLLM) or hosted model APIs.

## Why it's in the Arsenal

It represents the integrated-platform approach to internal assistants, backed by the 1Panel project. It is worth cataloguing as a concrete point of comparison for teams deciding between a framework-based build and an off-the-shelf KB platform, and for its handling of ingestion, pgvector retrieval, and MCP tool wiring.

## Architecture

MaxKB is a Python application (with a web UI) backed by PostgreSQL/pgvector for embeddings and metadata. Documents are chunked and embedded into datasets; a workflow engine orchestrates retrieval, prompt construction, model inference, and function/MCP tool calls. Model backends are pluggable across local and hosted providers, and applications are published as chat endpoints or widgets.

## Ecosystem Position

MaxKB overlaps with FastGPT, Dify, and RAGFlow in the KB-platform space and, compared to a LangChain-style library build, favors an integrated UI and datastore over code-level control. It complements inference servers and embedding models rather than competing with them. Assess it against alternatives on retrieval transparency, workflow expressiveness, and licensing.

## Getting Started

Deploy the provided container, create a knowledge base, upload documents, and confirm chunking/embedding. Connect a model backend (for example Ollama), build a retrieve-then-answer application, and review retrieved passages and citations before adjusting chunking and top-k.

## Key Use Cases

- Internal documentation, HR, or support assistants over private corpora.
- RAG plus tool/workflow automation behind a single governed UI.
- Rapid deployment of a KB chatbot connected to local models.

## Strengths

- Integrated ingestion, RAG, workflow, and multi-backend model support.
- Org-backed with active maintenance and a broad user base.
- pgvector-based storage keeps retrieval infrastructure conventional and portable.

## Limitations

- Platform weight and its own datastore make it heavier than an embeddable library.
- GPL-3.0 licensing imposes copyleft obligations on derivatives.
- 'Enterprise-grade' security, scaling, and access control must be validated for your environment, not assumed.

## Relation to the Arsenal

MaxKB is a platform sibling to FastGPT and the retrieval tooling in the catalog. Combine it with the Arsenal's guidance on chunking, retrieval evaluation, and least-privilege tool policy to move from a demo to a defensible deployment.

## Resources

- [Official source](https://github.com/1Panel-dev/MaxKB)
- [Documentation](https://maxkb.cn)
