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
description: "Knowledge-base and visual workflow platform for LLM apps with RAG retrieval, data processing and Flow orchestration"
github_url: "https://github.com/labring/FastGPT"
license: NOASSERTION
primary_language: TypeScript
tags: [self-hosted, retrieval]
maturity: production
cost_model: self-hostable
github_stars: 29765
last_commit: "2026-09-28"
docs_url: "https://doc.fastgpt.io"
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
best_for: ["You are building a Chinese-language or bilingual knowledge-base assistant and want a platform whose defaults match that corpus and UI ecosystem.", "You want RAG with configurable chunking and retrieval assembled through a visual flow rather than a Python script.", "You need one self-hostable deployment covering document processing, model routing and application flow instead of stitching three services together."]
avoid_if: ["You need the graph to be reviewable in version control, because the Flow canvas is the authoring surface and the JSON is the artefact.", "You cannot accept a Node and MongoDB stack, which is the typical deployment shape behind the Docker Compose path.", "You are building on a Python-only stack, because this is a TypeScript platform with its own API rather than a library you import."]
enrichment_notes: "Official repository and 2026-07-10 activity were reviewed on 2026-07-12; the license is a modified open-source license (verify terms before commercial redeployment). Retrieval quality claims remain draft."
---

## Overview

FastGPT is described in the README as an AI agent building platform with out-of-the-box data processing and model invocation capabilities, plus a visual Flow editor for orchestrating workflows that cover complex application scenarios. The project's own links point at a local development quickstart, an OpenAPI document, FastGPT-plugin for extensions, AI Proxy for model aggregation and load balancing, and Sealos for cluster deployment. The README is Chinese-first with English and several other translations, and the deployment path named first is Docker Compose with an interactive configuration prompt.

## Why it's in the Arsenal

The recurring decision for a team shipping an internal knowledge assistant is whether the pipeline is code or configuration. Chunking strategy, retrieval parameters, model routing and the fallback chain all live in a Flow you wire visually, so a non-engineer can adjust behaviour without a deploy. The tradeoff is that the flow becomes a second source of truth that lives outside your repository, which is manageable only if you decide deliberately who edits it.

## Architecture

A Node and TypeScript service stores datasets, chunks and application definitions, with a React canvas rendering the Flow graph and a Next.js front end serving the app UI. Document processing produces chunks that feed retrieval, and the model layer talks to providers through an aggregation path that handles routing and load balancing, which the AI Proxy component also exposes as a standalone service. The OpenAPI surface means the built application can be called from your own backend rather than only through the bundled UI.

## Ecosystem Position

It competes with Dify, Langflow and FastGPT's own OpenAPI ecosystem in the visual LLM-app platform category, and its distinguishing axis is the Chinese-first documentation and UI plus a bundled model proxy, which makes it the natural pick for a Chinese-language deployment. It overlaps with the visual builders in content/tools/orchestration such as Langflow, and it is a consumer rather than a competitor to the ingestion entries in content/tools/data-ingestion. Compared with a code-first RAG framework, it trades programmatic control for a configuration surface a broader team can operate.

## Getting Started

The documented quickstart pulls a configuration file with an interactive prompt and then brings the stack up with Compose:

```bash
bash <(curl -sL https://gpt.li/bash.sh)
docker compose up -d
```

Sealos is offered for cluster deployment, and the OpenAPI document is published for programmatic access.

## Key Use Cases

1. An internal documentation assistant where non-engineers tune chunking and retrieval settings without touching code.
2. A multi-model application that needs routing and load balancing across providers, which the bundled AI Proxy handles.
3. Calling a built application from an existing backend through the OpenAPI surface rather than embedding the bundled UI.
4. A Chinese-language customer-facing assistant where locale-specific retrieval and UI defaults matter.

## Strengths

- Data processing, model invocation and flow orchestration in one deployment, which reduces the number of services you operate.
- Visual Flow authoring makes retrieval and routing behaviour adjustable by a broader team.
- Published OpenAPI document, so an application you build here can serve your own backend.
- Model aggregation and load balancing bundled rather than bolted on as a separate proxy project.
- Strong Chinese-language documentation and UI, with English and several other translations.

## Limitations

The GitHub license field reports NOASSERTION, so licensing terms need confirming from the repository's own files before you build a product on it. Authoring in a visual Flow means the application definition lives outside your repository, which is a governance decision you have to make deliberately. A Node and MongoDB stack is real infrastructure, and the interactive configuration script is a poor fit for a fully declarative infrastructure-as-code pipeline. And at roughly 30k stars in a fast-moving area, release-to-release behaviour changes are likely enough that version pinning matters.

## Relation to the Arsenal

This is the visual RAG-application platform in content/projects/data-and-retrieval, and it is the closest thing in this catalog to Dify's category. Pair it with the ingestion entries in content/tools/data-ingestion for the source-side work and with content/tools/orchestration for the visual-builder comparison. Its model proxy story overlaps with the gateway entries in content/tools/serving-and-deployment, and its retrieval defaults are worth benchmarking against the vector stores in the same folder.

## Resources

- [GitHub — labring/FastGPT](https://github.com/labring/FastGPT)
- [Docs — doc.fastgpt.io](https://doc.fastgpt.io)
- [Site — fastgpt.io](https://fastgpt.io)
