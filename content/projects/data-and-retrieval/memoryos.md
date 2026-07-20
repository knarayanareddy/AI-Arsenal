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
org_or_maintainer: BAI-LAB
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 1
trending_score: 30
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
status: active
id: memoryos
name: MemoryOS
artifact_type: library
category: rag
subcategory: libraries
description: EMNLP 2025 memory operating system for personalized agents with hierarchical storage and retrieval
github_url: https://github.com/BAI-LAB/MemoryOS
license: Apache-2.0
primary_language: Python
tags:
  - memory
  - retrieval
  - agents
  - rag
  - research
maturity: beta
cost_model: open-source
github_stars: 1518
last_commit: '2026-07-07'
docs_url: https://bai-lab.github.io/MemoryOS/docs
phase: data-and-retrieval
domain:
  - language
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - research-origin
  - actively-maintained
ecosystem_role:
  - Hierarchical agent-memory library that complements RAG stacks and competes with ad hoc conversation-summary stores
best_for:
  - Adding persistent personalized memory to a conversational agent
  - Evaluating short-, mid-, and long-term memory retrieval policies
avoid_if:
  - Your application cannot retain user data under a clear consent and deletion policy
  - You need deterministic stateless responses with no memory side effects
enrichment_notes: EMNLP 2025 research system using OpenAI-compatible model APIs; privacy and memory-quality evaluation are required. Draft pending review.
---

## Overview

MemoryOS treats an agent's memory as an operating system rather than a single vector index. Its design organizes short-, mid-, and long-term information so a personalized assistant can retain conversation facts, consolidate them over time, and retrieve relevant history when a new interaction arrives.

## Why it's in the Arsenal

It earns a place because durable personalization is a central agent problem and the project offers a concrete hierarchical design to study. The Apache-2.0 implementation and EMNLP 2025 research framing make it useful for both prototyping memory behavior and comparing it with simpler conversation-summary approaches.

## Architecture

The system separates recent dialogue from consolidated mid-term memories and longer-term user knowledge, using model calls and retrieval policies to promote or recall information. The README configures model providers through an OpenAI-compatible API and documents local or Docker-oriented operation; the memory store and retrieval path sit beside, rather than inside, the agent model.

## Ecosystem Position

MemoryOS complements RAG libraries and agent frameworks and competes with flat vector memory, summary buffers, and bespoke user-profile databases. Its hierarchy is the distinguishing idea, but it also introduces more lifecycle and privacy behavior than a stateless prompt cache.

## Getting Started

Install the Python package or clone the repository, configure an OpenAI-compatible model base URL and key as shown in the README, then initialize a MemoryOS instance with the documented storage settings. Run the example conversation, inspect what is promoted into longer-term memory, and test retrieval before connecting real user data.

## Key Use Cases

Use it for personalized chat, long-running assistants that accumulate user preferences, and experiments on memory consolidation and recall. It is also a useful baseline when evaluating whether hierarchical memory improves over recent-window or summary-only context.

## Strengths

The explicit short/mid/long-term organization gives developers inspectable lifecycle stages instead of an opaque memory blob. Apache-2.0 licensing, Docker guidance, and support for multiple model providers make experimentation accessible.

## Limitations

Memory can leak sensitive facts, retain incorrect inferences, or surface stale context; deletion, consent, tenancy, and prompt-injection defenses need application-level design. The research results do not guarantee quality for a different model, language, or user population.

## Relation to the Arsenal

It connects the Arsenal's agent systems to retrieval and personalization libraries. Compared with RAGLite, MemoryOS focuses on evolving user history; compared with a plain vector store, it adds consolidation policy and memory lifecycle semantics.

## Resources

- [GitHub](https://github.com/BAI-LAB/MemoryOS)
- [Documentation](https://bai-lab.github.io/MemoryOS/docs)
- [Paper](https://arxiv.org/abs/2506.06326)
