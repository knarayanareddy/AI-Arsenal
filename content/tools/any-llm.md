---
id: any-llm
name: any-llm
type: tool
job:
  - Provide a unified, vendor-agnostic Python interface for invoking diverse LLM provider APIs
description: Communicate with an LLM provider using a single interface
url: https://github.com/mozilla-ai/any-llm
cost_model: open-source
pricing_detail: Free and open-source under Apache-2.0. Users pay underlying API provider costs or hosting fees for local models.
tags:
  - llm
  - python
  - developer-tools
  - inference
  - openai
  - anthropic
  - ai
maturity: alpha
stack: [python, pydantic, asyncio, httpx]
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-11-21
last_reviewed: 2026-11-21
added_by: repo-maintainer
verdict: solid-choice
verdict_rationale: any-llm provides a clean, minimal abstraction layer designed to unblock local vs. cloud provider switching without forcing developers to adopt heavyweight framework dependencies like LangChain or LlamaIndex. While still early in its lifecycle, its focused design makes it highly attractive for lightweight Python services.
status: active
phase: orchestration
audience:
  - ml-engineers
  - backend-developers
  - platform-engineers
best_when: You need a lightweight Python client to dynamically switch between proprietary cloud LLM APIs (OpenAI, Anthropic) and local/self-hosted inference backends (vLLM, Ollama) using a single standardized request/response schema.
avoid_when: You require complex multi-agent orchestration frameworks, advanced graph-based workflows, integrated vector search pipelines, or heavy client-side middleware abstractions.
github_url: https://github.com/mozilla-ai/any-llm
docs_url: null
---

## Overview

any-llm is an open-source Python library developed by Mozilla AI that unifies interaction with diverse Large Language Model (LLM) backends under a standard interface. Modern AI architectures frequently need to execute inference across disparate providers—such as OpenAI, Anthropic, or locally managed instances running vLLM or Ollama. Transitioning between these providers typically introduces friction due to mismatched request payloads, authentication mechanics, streaming response formats, and error structures.

To resolve this fragmentation, any-llm implements an abstraction layer that normalizes input parameters (such as prompt formatting, temperature, and token limits) and standardizes completion outputs across supported backends. By insulating application logic from provider-specific SDK implementation details, developers can swap backends or implement automated model failover without refactoring core code paths.

## Why It's in the Arsenal

Unlike massive orchestration frameworks (e.g., LangChain) that bring along heavy dependency graphs, complex abstractions, and opinionated agent patterns, any-llm limits its scope strictly to client-side API normalization. This laser focus minimizes runtime overhead, keeps dependency trees lightweight, and reduces supply-chain attack surfaces in production environments.

The library is designed for seamless switching between remote managed APIs and local or self-hosted inference servers. This facilitates local-first development and testing without network latency or API costs, alongside rapid production deployment to high-concurrency cloud endpoints or self-hosted GPU clusters using identical invocation semantics.

## Key Features

Unified Request and Response Types: Standardizes basic completion parameters, system instructions, and generation configurations across supported vendor SDKs and REST APIs.

Streaming Generation Support: Exposes clean async and sync generators for streaming token deltas uniformly across backends.

Provider-Agnostic Model Target Identifiers: Model selection uses structured strings or configurations, allowing backend target changes via environment variables or configuration files.

Extensible Plugin System: Designed to allow developers to implement custom provider adapters for internal or proprietary inference gateways.

Minimal External Dependencies: Relies primarily on standard Python async primitives and slim HTTP execution layers, avoiding heavy machine learning frameworks.

## Trade-offs

Early API Maturity: As an evolving library, client interfaces and provider-specific parameter mapping logic may undergo breaking changes between release versions.

Lowest-Common-Denominator Constraints: Normalizing requests across vendors means vendor-specific extensions (e.g., proprietary reasoning controls, unique tool-calling formats, or custom fine-tuning parameters) may require raw bypass hooks rather than unified methods.

Maintenance Overhead: Keeping pace with rapid updates across downstream provider APIs (OpenAI, Anthropic, Google, local runners) requires active maintenance to prevent adapter breakage.
