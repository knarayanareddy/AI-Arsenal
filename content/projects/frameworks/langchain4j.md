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
github_stars: 12578
last_commit: "2026-07-12"
docs_url: https://docs.langchain4j.dev/
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

1. **Where it fits**: "You are building LLM features in Java/Kotlin and want idiomatic APIs plus Quarkus/Spring Boot integration
2. **Adoption checkpoint**: before building on LangChain4j, reproduce the specific claim you are relying on — install it, run it against a representative slice of your data, and record the number that would make you abandon the choice. A project entry can tell you what is claimed; only your own run tells you what is true.

## Strengths

- What LangChain4j gives you that reading the feature list does not: langChain4j provides abstractions, ChatModel, EmbeddingModel, EmbeddingStore, tools, and AI Services, that wrap concrete providers and vector databases behind Java interfaces. Its AI Services feature lets developers declare a Java interface annotated with prompts and tools and have the library generate an implementation that handles chat memory, tool invocation, structured output, and RAG retrieval, and it ships Quarkus and Spring Boot integrations for dependency injection and configuration, which is the part you have to evaluate against your own workload.
- It is a framework entry in this catalog, so the comparison that matters is against the other framework projects rather than against projects in adjacent phases.
- Recorded as beta, so the capability is real while the interface is still moving; pin the version you depend on rather than tracking head.

## Limitations

- The cost this entry cannot quantify for you is operational: the LangChain4j footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- Documentation describes intended behaviour, not observed behaviour: latency, memory and failure rates for LangChain4j at your scale need measuring before this informs a production decision.
- LangChain4j is beta, so the interface and even the scope can change between minor versions; any code written against it should be isolated behind your own boundary rather than imported directly across your codebase.

## Relation to the Arsenal

It brings the agent/RAG framework pattern to the JVM alongside the Python-centric frameworks in the catalog.

## Resources

- [GitHub repository](https://github.com/langchain4j/langchain4j)
- [Documentation](https://docs.langchain4j.dev/)
