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
org_or_maintainer: "langchain4j"
upstream_dependencies: []
downstream_consumers: []
alternatives: [spring-ai, haystack]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-12"
last_reviewed: "2026-10-26"
added_by: maintainer
status: active
id: langchain4j
name: "LangChain4j"
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: "An idiomatic Java library for building LLM applications on the JVM, with a unified API over providers and vector stores plus tool calling, MCP, agents, and RAG"
github_url: https://github.com/langchain4j/langchain4j
license: "Apache-2.0"
primary_language: "Java"
tags:
  - "agents"
  - "rag"
  - "llm"
  - "self-hosted"
maturity: beta
cost_model: open-source
github_stars: 13304
last_commit: "2026-10-26"
docs_url: "https://docs.langchain4j.dev/"
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
  - "The de facto LLM-application framework for the JVM, integrating with enterprise Java stacks like Quarkus and Spring Boot."
best_for:
  - "You are building LLM features in Java/Kotlin and want idiomatic APIs plus Quarkus/Spring Boot integration"
  - "You need tool calling, MCP, agents, and RAG in a JVM stack without shelling out to Python"
avoid_if:
  - "Your stack is Python-first, where the original LangChain/LlamaIndex ecosystems are more mature"
  - "You want a no-code visual builder rather than a code-first library"
enrichment_notes: "Repository, Apache-2.0 license, and 2026-07-12 activity verified via the GitHub API on 2026-07-12. Independent project inspired by LangChain, not an official port."
---

## Overview

LangChain4j is an idiomatic, open-source Java library for building LLM-powered applications on the JVM. It offers a unified API over popular LLM providers and vector stores and makes tool calling (including MCP support), agents, and retrieval-augmented generation straightforward, integrating cleanly with enterprise Java frameworks like Quarkus and Spring Boot.

## Why it's in the Arsenal

Most LLM tooling is Python-first, so a mature, idiomatic JVM framework fills a real gap for the large enterprise Java ecosystem, making LangChain4j a distinct and valuable agents-and-frameworks entry.

## Architecture

LangChain4j provides abstractions, `ChatModel`, `EmbeddingModel`, `EmbeddingStore`, tools, and AI Services, that wrap concrete providers and vector databases behind Java interfaces. Its AI Services feature lets developers declare a Java interface annotated with prompts and tools and have the library generate an implementation that handles chat memory, tool invocation, structured output, and RAG retrieval, and it ships Quarkus and Spring Boot integrations for dependency injection and configuration.

## Ecosystem Position

LangChain4j is the JVM counterpart to Python frameworks like LangChain and LlamaIndex and it competes with Spring AI, differentiating by being idiomatic Java with deep Quarkus/Spring Boot support. Compared with calling a Python service from Java it keeps everything in one JVM process and toolchain, and compared with the Python ecosystem it trades some cutting-edge breadth for native enterprise-Java ergonomics.

## Getting Started

Add the LangChain4j dependency (plus a provider module) to Maven/Gradle, configure a model with an API key, and either call `ChatModel` directly or define an annotated AI Service interface; Quarkus/Spring Boot starters wire configuration automatically.

## Key Use Cases

1. **Adding a summariser or extractor to a service that already exists**: the smallest useful integration is a single AI Service bean behind an existing endpoint, and that path avoids a new deployable entirely.
2. **Deciding who owns the model plumbing**: a shared `ChatModel` bean is usually the moment a platform team takes model credentials away from product teams — worth naming before the first feature ships, because retrofitting it means touching every call site.
3. **Migrating off a provider's native SDK**: the unified API makes the migration a mechanical replacement of client construction, provided the features you use exist on the new provider; check that first, since the abstraction does not cover everything.
4. **Java teams adding RAG to an existing search stack**: `EmbeddingStore` covers 30+ vector stores, which means the existing Elasticsearch or pgvector install can be reused instead of adding a new datastore.
5. **Tool calling and MCP on the JVM**: tool schemas are derived from Java methods and records, and MCP support means an existing Java service can expose tools without a Python bridge.
6. **Typed structured output**: returning POJOs and records from a chat call rather than parsing JSON strings is the difference between a validated object and a stringly-typed guess.
7. **Multi-step agents with observability hooks**: the toolbox includes agents, chat memory and listeners, so a tool loop can be instrumented using the JVM's existing logging and tracing rather than a parallel telemetry stack.

## Strengths

- The AI Services pattern is the strongest idea in the library: an annotated interface becomes a working, tool-enabled, memory-carrying implementation, which is far less code than wiring the same behaviour by hand.
- It is genuinely idiomatic Java — annotations, fluent builders, dependency injection, records — rather than a transliteration of a Python API. The README is explicit that it is not a LangChain port.
- Breadth of integrations (20+ model providers, 30+ embedding stores) with a single abstraction over each, which is the actual value of a framework on the JVM.
- First-class Quarkus, Spring Boot, Helidon and Micronaut integrations, so configuration and lifecycle follow the framework conventions a Java team already uses.
- Apache-2.0 with a real community: 13.3k stars over 1,054 open issues is a large, active codebase rather than a vendor demo.
- Independent API and release cycle from Python LangChain, which means one ecosystem's churn does not propagate into the JVM build.

## Limitations

- **The maturity label in this entry says beta, and the project's own README says the library is under active development.** Core abstractions are stable in practice, and the surface changes: pin versions, read release notes, and keep the framework behind your own interface.
- **1,054 open issues** is the honest measure of a project this broad: coverage is uneven across integrations, and a niche provider or vector store can be thinly maintained.
- **Abstractions cost debuggability.** A unified API hides provider-specific features and parameters, so the option you need may not be reachable without dropping to the provider's own client.
- **The JVM's ecosystem is thinner on AI evaluation.** `ragas` and similar tools are Python-first, so an evaluation loop usually means exporting data to Python or building the harness yourself.
- **Not a LangChain port, despite the name.** Teams arriving from Python expect module parity that does not exist; approaching it as a new library is faster than mapping concepts across.
- **Documentation is improving unevenly.** Examples lag the API in places, and the fastest path is often the `langchain4j-examples` repository rather than the docs.

## Relation to the Arsenal

It is the JVM answer to the Python frameworks in this catalog: `langgraph` and `crewai` for orchestration, `haystack` for pipeline composition, `dspy` for prompt optimisation — none of which solve the "our service is Java" constraint. The ingestion and storage entries (`pgvector`, `weaviate`, `qdrant`) are reachable through its `EmbeddingStore` abstraction rather than as separate integrations to write.

The realistic split is organisational: choose LangChain4j because the team and the deployment target are on the JVM, not because its abstractions are better than the Python alternatives'.

## Resources

- [GitHub repository](https://github.com/langchain4j/langchain4j)
- [Documentation](https://docs.langchain4j.dev/)
