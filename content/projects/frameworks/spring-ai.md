---
id: spring-ai
name: Spring AI
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: 'The Spring ecosystem''s official AI framework: portable LLM, RAG, tool-calling and MCP abstractions with Spring Boot auto-configuration for enterprise Java'
github_url: https://github.com/spring-projects/spring-ai
license: Apache-2.0
primary_language: Java
org_or_maintainer: Broadcom (Spring team)
tags:
  - agents
  - rag
  - structured-output
maturity: production
cost_model: open-source
github_stars: 9166
github_stars_last_30d: 80
trending_score: 46
last_commit: '2026-07-17'
docs_url: https://docs.spring.io/spring-ai/reference/
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain:
  - language
  - general-purpose
relation_to_stack:
  - build-on-top
health_signals:
  - org-backed
  - actively-maintained
  - production-proven
ecosystem_role:
  - 'The sanctioned on-ramp for AI in enterprise Java: ChatClient, vector-store, advisor (RAG/memory), tool-calling and MCP abstractions that follow Spring conventions exactly, so the millions of Spring Boot services can add LLM features without leaving their operational model.'
best_for:
  - Your organization runs on Spring Boot and needs LLM features inside existing services — auto-configured starters, Micrometer observability, and familiar dependency-injection patterns beat bolting on a Python sidecar
  - You need portable provider/vector-store abstractions with enterprise governance — one API across OpenAI/Anthropic/Bedrock/Azure/Ollama and 20+ vector stores, swappable via configuration
avoid_if:
  - You are starting greenfield and language-flexible — the Python/TypeScript ecosystems get new capabilities (and community answers) months earlier
  - You need cutting-edge agentic patterns — Spring AI's agent story (effectors/advisors, MCP) is solid but conservative; graph-style orchestration frameworks iterate faster
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - langchain
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (9,086), primary language, license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/spring-projects/spring-ai
    date: '2026-07-08'
    description: 9,086 stars on GitHub as of 2026-07-08 (GitHub API)
featured: false
status: active
---

## Overview

The Spring team's official framework for AI engineering in Java: portable abstractions for chat models, embeddings, image models, vector stores, RAG pipelines (advisors), function/tool calling, structured output mapping to POJOs, and Model Context Protocol servers and clients — all delivered as Spring Boot starters with the ecosystem's standard auto-configuration, observability, and testing support.

## Why it's in the Arsenal

The sanctioned on-ramp for AI in enterprise Java: ChatClient, vector-store, advisor (RAG/memory), tool-calling and MCP abstractions that follow Spring conventions exactly, so the millions of Spring Boot services can add LLM features without leaving their operational model. It earns a place in the Arsenal because it directly addresses a recurring decision point: your organization runs on Spring Boot and needs LLM features inside existing services — auto-configured starters, Micrometer observability, and familiar dependency-injection patterns beat bolting on a Python sidecar. See Strengths / Limitations below before adopting it.

## Architecture

ChatClient offers a fluent request API over provider-specific model implementations; Advisors compose cross-cutting concerns (chat memory, RAG retrieval, safety) around calls in interceptor style; VectorStore abstracts 20+ backends behind one similarity-search interface with portable metadata filtering; tool calling maps @Tool-annotated Java methods into schema-validated function calls, and MCP support covers both consuming and exposing tool servers.

## Ecosystem Position

Upstream: the Spring Boot/Framework platform (Broadcom-stewarded), all major model providers. Competing: LangChain4j (the community-driven Java alternative, often faster-moving), direct SDKs. Complementary: Micrometer tracing/metrics for LLM observability, Spring Security integration for governed deployments — the operational furniture enterprise Java teams already trust.

## Getting Started

```bash
# Spring Boot (Maven):
# <dependency>spring-ai-starter-model-openai</dependency>
# application.yml: spring.ai.openai.api-key=${OPENAI_API_KEY}
# java:
@Bean CommandLineRunner demo(ChatClient.Builder b) {
  return args -> System.out.println(b.build().prompt('Tell me a joke').call().content());
}
```

## Key Use Cases

1. **Scenario**: your organization runs on Spring Boot and needs LLM features inside existing services — auto-configured starters, Micrometer observability, and familiar dependency-injection patterns beat bolting on a Python sidecar
2. **Scenario**: you need portable provider/vector-store abstractions with enterprise governance — one API across OpenAI/Anthropic/Bedrock/Azure/Ollama and 20+ vector stores, swappable via configuration

## Strengths

- Your organization runs on Spring Boot and needs LLM features inside existing services — auto-configured starters, Micrometer observability, and familiar dependency-injection patterns beat bolting on a Python sidecar
- You need portable provider/vector-store abstractions with enterprise governance — one API across OpenAI/Anthropic/Bedrock/Azure/Ollama and 20+ vector stores, swappable via configuration

## Limitations

- You are starting greenfield and language-flexible — the Python/TypeScript ecosystems get new capabilities (and community answers) months earlier
- You need cutting-edge agentic patterns — Spring AI's agent story (effectors/advisors, MCP) is solid but conservative; graph-style orchestration frameworks iterate faster

## Relation to the Arsenal

This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/spring-projects/spring-ai)
- [Documentation](https://docs.spring.io/spring-ai/reference/)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (9,086 stars, last commit 2026-07-08, verified via GitHub API on 2026-07-08)*
