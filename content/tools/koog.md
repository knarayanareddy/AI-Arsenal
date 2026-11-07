---
id: koog
name: Koog
type: tool
job:
  - Build multiplatform, enterprise-ready AI agents and workflows on the JVM and Kotlin Multiplatform
description: JetBrains Koog is a Kotlin Multiplatform framework designed for building predictable, fault-tolerant, and cross-platform AI agents across backend servers, mobi…
url: https://github.com/JetBrains/koog
cost_model: open-source
pricing_detail: Free and open-source under the Apache-2.0 License.
tags:
  - kotlin
  - jvm
  - agentic-ai
  - mcp
  - kotlin-multiplatform
  - multi-agent-systems
  - ktor
  - android
maturity: beta
stack: [Kotlin, JVM, Ktor, Gradle]
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-11-07
last_reviewed: 2026-11-07
added_by: repo-maintainer
verdict: recommended
verdict_rationale: Koog provides a robust type-safe runtime for agentic AI on the JVM and Kotlin Multiplatform. Its first-class support for stateful workflows, Kotlin coroutines, and native integration with Model Context Protocol (MCP) makes it an exceptional choice for enterprise JVM services and multi-target mobile apps.
status: active
phase: orchestration
audience:
  - JVM Engineers
  - Kotlin Multiplatform Developers
  - Android Engineers
  - Enterprise Backend Architects
best_when: Building stateful, deterministic, or tool-using AI agents on JVM backends (Spring/Ktor) or cross-platform mobile apps (Android/iOS) where type safety, structured concurrency, and native Model Context Protocol (MCP) integration are required.
avoid_when: Your entire infrastructure is strictly Python-native (e.g., heavily reliant on LangChain, LlamaIndex, or AutoGen hooks), or you do not target the JVM or Kotlin Multiplatform runtime ecosystem.
github_url: https://github.com/JetBrains/koog
docs_url: null
---

## Overview

Koog is JetBrains' open-source Kotlin Multiplatform (KMP) framework for building fault-tolerant, predictable, and enterprise-grade AI agents. Developed from JetBrains' experience building embedded AI capabilities into its IDEs and developer tools, Koog addresses the fragility, state management issues, and runtime untruths common in dynamically typed agent frameworks. It unifies backend microservices (via Ktor or Spring Boot) and client-side runtimes (Android, iOS, desktop, browser) under a single, strongly typed orchestration runtime.

At its core, Koog treats agentic executions as structured, suspendable coroutine state machines. Instead of relying on unconstrained text prompts and unstructured JSON blobs, Koog enforces strongly typed tool definitions, dynamic context injection, and precise state transitions. It native-hosts integration for external services via the Model Context Protocol (MCP), enabling agents to seamlessly inspect environments, invoke tools, and execute workflows across distributed boundaries while maintaining end-to-end tracing and lifecycle isolation.

By leveraging Kotlin's structured concurrency, Koog handles cancellation, timeout propagation, and retry loops out of the box. Agents can be composed into multi-agent topologies (such as supervisor-worker or hierarchical execution DAGs) without global lock contention or uncontrolled thread pool explosion.

## Why It's in the Arsenal

Most agent frameworks originate in Python or TypeScript, creating significant architectural friction when integrated into production JVM services or mobile client applications. Koog brings type safety, structured concurrency, and KMP target support to the agent engineering space, allowing developers to share agent logic across server backends and mobile clients without rewriting prompt flows or tool definitions.

Koog's key technical differentiator is its strict adherence to structured state machine execution. Unlike frameworks that blur the lines between LLM reasoning loops and side-effect operations, Koog decouples reasoning cycles, safety guardrails, and tool invocations into discrete runtime steps. This design allows engineers to intercept execution states, inject fallback logic during provider outages, and audit tool invocations with zero reflection overhead.

## Key Features

Kotlin Multiplatform Core: Write agent tools, state abstractions, and workflow control loops once in Kotlin and deploy seamlessly across JVM backends, Android, iOS (via Native), and JS/Wasm runtimes.

Model Context Protocol (MCP) Integration: Built-in support for MCP client and server constructs, allowing Koog agents to dynamically discover, bind, and execute context providers and tool definitions across process boundaries.

Type-Safe Tool Interop: Define agent tools directly as Kotlin functions or classes using compiler-verified schema generation, eliminating JSON schema drift and dynamic runtime parsing errors.

Structured Concurrency & Resiliency: Built natively on Kotlin Coroutines, offering explicit cancellation context propagation, backpressure management, dynamic timeouts, and configurable exponential backoff retry policies.

Pluggable LLM Provider Abstraction: Standardized interfaces for swapping underlying model engines (OpenAI, Anthropic, Ollama, local models) with minimal configuration changes.

Multi-Agent Composition DSL: Declarative primitives for chaining multi-agent systems, including delegation, worker pipelines, and supervisor loops.

## Trade-offs

Ecosystem Maturity vs. Python: While rapidly evolving, the wider tool, memory-store, and vector-database ecosystem in Kotlin/Java is smaller compared to Python's established ecosystem (LangChain, LlamaIndex, DSPy). Custom integrations may require wrapping Java APIs.

Multiplatform Runtime Boundaries: Running complex agent code on constrained client runtimes (e.g., iOS via Kotlin/Native or Wasm) requires careful memory management and payload size considerations compared to server-side JVM execution.

Learning Curve: Developers unfamiliar with Kotlin coroutines, suspend functions, and KMP build systems will face a steeper initial learning curve than when using scripting-focused Python frameworks.