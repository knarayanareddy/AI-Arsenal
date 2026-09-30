---
id: zylon-ai-private-gpt
name: "private-gpt"
version_tracked: null
artifact_type: framework
category: rag
subcategory: advanced-rag
description: "Apache-2.0 self-hosted API layer bundling RAG, tools, agent skills, MCP, and text-to-SQL over any OpenAI-compatible server"
github_url: "https://github.com/zylon-ai/private-gpt"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "zylon-ai"
tags: [rag, self-hosted, tool-use]
maturity: beta
cost_model: open-source
github_stars: 57548
github_stars_last_30d: 0
trending_score: 38
last_commit: "2026-09-22"
docs_url: "https://www.zylon.ai/private-gpt"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [language]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [actively-maintained, org-backed, community-driven]
ecosystem_role:
  - "Complete API layer for private local-model applications, bundling RAG, agent skills, tool calling, and MCP under one self-hosted contract for air-gapped deployments."
best_for:
  - "You are deploying an internal document assistant behind a firewall and need one container to own ingestion, retrieval, tool access, and the serving contract instead of four services you now operate."
  - "You want to change model providers without changing your application, because the project is written against the OpenAI-compatible API surface rather than one vendor's SDK."
  - "You need to give an internal assistant access to internal systems through a governed tool layer, and you would rather configure existing tool integrations than write a bespoke function-calling service."
avoid_if:
  - "You only need a vector index or a single retrieval step, because the project deliberately covers much more surface than that and the extra components are your responsibility to configure and keep current."
  - "You need a proven retrieval architecture you can tune, since the bundled pipeline exposes defaults and configuration rather than a researchable index implementation."
  - "You cannot run a server that holds models and document corpora in-process, because the entire value proposition is a self-hosted, stateful deployment."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 57548 stars, Apache-2.0 license, Python primary language, last commit 2026-09-22, 3 GitHub topics. Component list (RAG, skills, tools, MCP, text-to-SQL) and the OpenAI-compatible constraint come from the repository README; environment-variable names and module entry points were read from docs, not executed."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/zylon-ai/private-gpt", "date": "2026-09-28", "description": "57,548 stars and last commit 2026-09-22 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

private-gpt is a self-hosted application layer for local-model AI systems, packaged so that a team can assemble an internal assistant from components that already exist: document ingestion with chunking and embeddings, a vector store, a retrieval generator, function calling into a tool layer, agent skills for repeatable task patterns, MCP client support for external tool servers, and a text-to-SQL path for structured questions. The deliberate design constraint is that it talks to any OpenAI-compatible inference server, so the model layer is a deployment choice - a local vLLM, a managed private endpoint, or a self-hosted llama.cpp - rather than a hard dependency. The intended setting is a regulated or air-gapped environment where data must not leave the perimeter.

## Why it's in the Arsenal

The recurring decision private-gpt resolves is the gap between a working demo and a deployable internal service. A prototype is one retrieval script; production needs ingestion that survives re-scans, access control on which documents a user can retrieve, a tool layer with timeouts and error surfaces, and an API that other applications can call without knowing the internals. Assembling that is weeks of unglamorous work, and this project ships the assembly, including the parts teams usually skip. The other recurring decision is provider independence: writing to the OpenAI-compatible surface means you can move from a fully local model to a private cloud endpoint, or swap backends during an incident, without an application rewrite.

## Architecture

The service is organized as composable layers behind an API. Ingestion pulls documents from local paths or remote sources, splits them into overlapping chunks, produces embeddings, and upserts records with source metadata into a pluggable vector store - the supported backends cover the usual local options, so a deployment can stay on one machine. The retrieval stage combines a vector query with a lexical pass and an optional reranker before handing context to the generator, and the generator issues an OpenAI-style chat completion against whatever server is configured in the environment. A tool-calling layer exposes a registry of built-in functions, and an MCP client subscribes to external tool servers so the same registry mechanism covers both; agent skills sit one level up as reusable, named prompt-plus-tool patterns rather than bespoke code. A text-to-SQL task routes a natural-language question into a schema-aware query against a configured relational store and returns the result as context. State and per-user scoping live in a service database so document access and session history survive restarts.

## Ecosystem Position

private-gpt overlaps with self-hosted chat front ends and with the RAG frameworks in content/projects/data-and-retrieval/, competing for the same assembly job rather than for a single component. It is an alternative to hand-rolling a FastAPI service over a vector store, and it is rather than an inference engine: the model runs elsewhere and this talks to it over an OpenAI-compatible endpoint. It complements the serving entries in content/projects/inference-engines/ by defining the application contract they are plugged into, and it uses MCP for tools the same way the coding agents in this batch do. Where a local runtime such as llama-cpp provides a private endpoint and the vector stores provide the index, this is the layer that turns those into something you can hand a colleague as an application.

## Getting Started

Start the service with a local OpenAI-compatible endpoint configured through environment variables, then verify the API responds:

```bash
git clone https://github.com/zylon-ai/private-gpt.git
cd private-gpt
export PRIVATE_GPT_MODEL_NAME="local-model"
export PRIVATE_GPT_MODEL_API_BASE="http://127.0.0.1:8000/v1"
export PRIVATE_GPT_EMBEDDING_MODEL_NAME="local-embedding"
python -m private_gpt
```

The API is exposed on the configured host and port; point it at a running vLLM or llama.cpp server for the model and embedding calls.

## Key Use Cases

1. Stand up an internal document assistant on an air-gapped network, with ingestion, retrieval, and chat served from one deployable unit your security team can review.
2. Give a governed assistant access to internal systems through the built-in tool layer plus MCP servers, with one authentication boundary instead of scattered credentials.
3. Prototype against a local model today and move the same application to a private cloud endpoint later, since the OpenAI-compatible contract is the only coupling.

## Strengths

- Broad application coverage in one Apache-2.0 repository, which removes weeks of integration work for an internal-assistant build.
- Provider independence at the API surface, so the inference backend is a deployment decision and can be swapped during an incident.
- First-class MCP client support, so tools authored for the broader MCP ecosystem are usable without writing a wrapper.
- Self-hosted by design, with no telemetry dependency on an external service, which is what makes the air-gapped case possible.

## Limitations

Breadth is also the risk: many components mean many configuration surfaces, and each one is a version-compatibility question that surfaces as integration work rather than as a missing feature. The bundled retrieval path is deliberately conventional - chunk, embed, top-k, optional rerank - so if retrieval quality is the actual problem, you will likely end up replacing it with the vector-store and reranking entries in content/projects/data-and-retrieval/ anyway. Self-hosting also means you own the operational surface: model downloads, embedding index rebuilds, dependency pinning, and access-control logic, with no hosted tier to fall back to. Text-to-SQL and tool execution carry real prompt-injection exposure, and the guardrails in a self-hosted deployment are entirely the ones you write. The project is also younger and smaller than the frameworks it overlaps with, so the community pool of troubleshooting knowledge is thinner.

## Relation to the Arsenal

The application-layer entry for the data-and-retrieval phase: it consumes the document parsers in content/projects/data-and-retrieval/ as ingestion sources, the vector stores there as its index, and the serving engines in content/projects/inference-engines/ as its model backend. The agent-systems entries in content/projects/agent-systems/ address the same tool-calling problem from the coding side, and its skills layer is a cousin of the pattern libraries in this batch. The models it queries come from content/projects/foundation-models/, adapted through the model-definition layer in content/projects/frameworks/. If your requirement is one retrieval component rather than a whole stack, start with the storage entries instead of this.

## Resources

- [GitHub — zylon-ai/private-gpt](https://github.com/zylon-ai/private-gpt)
- [Project site and feature overview](https://www.zylon.ai/private-gpt)
- [Repository configuration and API docs](https://github.com/zylon-ai/private-gpt#readme)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (57,548 stars, last commit 2026-09-22, license Apache-2.0, verified via GitHub API on 2026-09-28)*
