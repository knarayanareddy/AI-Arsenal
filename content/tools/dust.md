---
id: dust
name: Dust
type: tool
job:
  - Orchestrate, build, and deploy custom enterprise AI agents with multi-provider model routing, RAG workflows, and application-level connectors.
description: Custom AI agent platform providing multi-model orchestration, vector indexing across enterprise data sources, and custom workflow execution via TypeScript and…
url: https://github.com/dust-tt/dust
cost_model: open-source
pricing_detail: Open-source under MIT license for self-hosted deployments; commercial multi-tenant SaaS plans available directly from Dust.
tags:
  - agents
  - large-language-models
  - llm
  - rust
  - typescript
  - rag
  - orchestration
maturity: production
stack: [typescript, rust, nextjs, postgresql, qdrant]
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-10-21
last_reviewed: 2026-10-21
added_by: repo-maintainer
verdict: best-in-class
verdict_rationale: Dust delivers a complete, enterprise-grade architecture for agent execution that bridges the gap between raw framework orchestration (like LangChain or AutoGen) and end-user enterprise workspaces. Its dual TypeScript/Rust core balances UI developer ergonomics with highly optimized document parsing and vector indexing pipelines.
status: active
phase: orchestration
audience:
  - AI Engineers
  - Platform Engineers
  - Enterprise Solution Architects
best_when: You need an end-to-end platform to construct, manage, and scale secure enterprise AI agents connected to proprietary data stores like Slack, Notion, Google Drive, and GitHub with fine-grained permission controls.
avoid_when: You only need lightweight, single-file LLM script execution, or you want a pure python-native library without multi-service infrastructure dependencies like PostgreSQL and Qdrant.
github_url: https://github.com/dust-tt/dust
docs_url: null
---

## Overview

Dust is an open-source enterprise platform for engineering, orchestrating, and deploying customized AI agents and retrieval-augmented generation (RAG) applications. Architecturally split into a front-end/application layer (built on Next.js/TypeScript) and high-performance background worker components (written in Rust), Dust handles the lifecycle of context retrieval, dynamic prompt synthesis, multi-model execution, and structured state management.

The core platform decoupling allows teams to connect heterogeneous enterprise data silos—such as Slack, Notion, Google Drive, and GitHub—into standardized, searchable vector structures managed by Qdrant and relational stores in PostgreSQL. The system exposes granular programming constructs to define prompt pipelines, enforce structured JSON or schema-driven outputs, and chain agent tools without locking the developer into a single model vendor backend.

By standardizing the interface between raw data connectors, model providers (OpenAI, Anthropic, Google, and self-hosted endpoints), and agent memory spaces, Dust allows platform engineering teams to maintain tight operational boundaries while offering business units a flexible platform to author specialized assistant workflows.

## Why It's in the Arsenal

Unlike lightweight developer abstractions that focus purely on Python chain primitives, Dust offers a fully integrated, production-grade agent system. Its primary strength lies in its production readiness: it provides built-in enterprise connectors, dynamic access control mechanisms, session management, and robust auditability out of the box.

The dual Rust and TypeScript architecture provides an optimal operational balance. Performance-heavy tasks such as parsing complex document trees, chunking, and calculating embeddings are decoupled into Rust microservices for high throughput and low memory footprint. Meanwhile, the orchestration logic, UI workflows, and REST APIs leverage TypeScript to enable rapid iteration and easy extensibility.

Furthermore, Dust treats model provider failover and context management as native platform primitives. It avoids vendor lock-in by maintaining an abstraction layer across modern foundation models, enabling real-time fallback routing, guardrail verification, and cost tracking across every deployed agent.

## Key Features

Multi-Source Enterprise Connectors: Synchronizes data continuously from Slack, Notion, Google Drive, and GitHub using incremental sync workers that handle rate limits and payload transformations.

Hybrid Retrieval Architecture: Combines vector similarity search with keyword search and metadata filtering using Qdrant and PostgreSQL to optimize retrieval-augmented prompt context.

Declarative Agent Specification: Defines agent behaviors, dynamic memory retrieval logic, tool-use signatures, and guardrails using programmatic TypeScript specs.

Model-Agnostic Abstraction Layer: Allows dynamic runtime switching and failover between OpenAI, Anthropic, Google Gemini, and local custom endpoints without modifying agent definitions.

Granular Access Control & Data Scoping: Integrates workspace-level permissions and OAuth tokens directly into vector query filters to guarantee strict data segregation across multi-tenant user contexts.

## Trade-offs

Deployment Operational Complexity: Running the complete open-source Dust stack locally or on Kubernetes requires managing multiple distributed subsystems, including Node.js web services, Rust background workers, PostgreSQL, and Qdrant instances.

Non-Python Native Core: Teams composed primarily of Python data scientists may face friction when extending core orchestration behaviors, as modifications require TypeScript and Rust proficiency.

Resource Overhead for Small Use Cases: For lightweight scripts or simple single-prompt completions, Dust introduces substantial architectural overhead compared to raw SDK clients or minimal micro-frameworks.
