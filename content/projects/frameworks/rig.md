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
org_or_maintainer: "0xPlaygrounds"
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
id: rig
name: "Rig"
artifact_type: library
category: agents
subcategory: agent-frameworks
description: "A Rust library for building modular, scalable LLM applications with typed abstractions for completions, embeddings, vector stores, tools, and agents"
github_url: https://github.com/0xPlaygrounds/rig
license: "MIT"
primary_language: "Rust"
tags:
  - "agents"
  - "rag"
  - "llm"
  - "self-hosted"
maturity: beta
cost_model: open-source
github_stars: 7904
last_commit: "2026-07-12"
docs_url: https://docs.rig.rs/
phase: framework
domain:
  - "language"
relation_to_stack:
  - "build-on-top"
  - "deploy-as-is"
health_signals:
  - "actively-maintained"
  - "community-driven"
ecosystem_role:
  - "A Rust-native LLM-application framework bringing typed agents, RAG, and tool calling to systems-level services."
best_for:
  - "You are building LLM features in Rust and want typed, async-native abstractions for agents and RAG"
  - "You need the performance, memory safety, and single-binary deployment of Rust for an LLM service"
avoid_if:
  - "Your team is Python-first and values ecosystem breadth over Rust's performance"
  - "You want a visual or no-code builder rather than a code-first typed library"
enrichment_notes: "Repository, MIT license, and 2026-07-12 activity verified via the GitHub API on 2026-07-12. Younger and smaller ecosystem than Python frameworks."
---

## Overview

Rig is a Rust library for building modular and scalable LLM applications. It provides typed, async-native abstractions for completions and embeddings, unified access to multiple model providers, vector-store integrations, tools, and agents, letting Rust developers build RAG systems and agentic services without leaving the language.

## Why it's in the Arsenal

Rust is increasingly used for high-performance AI infrastructure, and Rig is a leading native framework for LLM applications there, bringing type safety and performance to agents and RAG, which makes it a distinct frameworks entry.

## Architecture

Rig models the domain with Rust traits: a `CompletionModel`/`EmbeddingModel` abstraction wraps providers, an `Agent` composes a model with a preamble, tools, and optional RAG context, and vector-store adapters implement a common retrieval interface. Everything is async and strongly typed, so tool schemas and structured outputs are checked at compile time, and applications compile to a single efficient binary.

## Ecosystem Position

Rig competes with Python frameworks like LangChain and LlamaIndex and with the Rust-based rust-genai, differentiating on being idiomatic, typed Rust for systems-level deployment. Compared with the Python ecosystem it offers performance, memory safety, and easy deployment at the cost of a smaller integration catalog, so it suits teams already invested in Rust services.

## Getting Started

Add the `rig-core` crate (plus provider/vector-store crates) to Cargo, construct a provider client, build an `Agent` with tools and optional RAG context, and call it asynchronously; the docs include RAG and tool-calling examples.

## Key Use Cases

LLM services and agents written in Rust; high-performance RAG backends; tool-calling microservices; embedding LLM features into existing Rust systems.

## Strengths

Idiomatic typed Rust, async-native design, multi-provider and vector-store support, compile-time-checked tools and structured output, single-binary deployment, and an MIT license.

## Limitations

Its ecosystem and integration breadth are smaller than Python frameworks, it is a younger project with an evolving API, and it targets developers comfortable with Rust rather than rapid Python-style prototyping.

## Relation to the Arsenal

It is the Rust-native counterpart to the Python and JVM agent frameworks in the catalog.

## Resources

- [GitHub repository](https://github.com/0xPlaygrounds/rig)
- [Documentation](https://docs.rig.rs/)
