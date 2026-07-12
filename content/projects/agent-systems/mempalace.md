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
org_or_maintainer: MemPalace
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
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: mempalace
name: MemPalace
artifact_type: platform
category: agents
subcategory: autonomous
description: Open-source AI memory system for persistent agent context, recall, and memory-tool integrations
github_url: https://github.com/MemPalace/mempalace
license: MIT
primary_language: Python
tags:
  - agents
  - memory
  - retrieval
  - evaluation
  - tool-use
  - orchestration
maturity: beta
cost_model: open-source
github_stars: 57230
last_commit: '2026-07-10'
docs_url: https://github.com/MemPalace/mempalace
phase: agent-system
domain:
  - language
  - reasoning
  - general-purpose
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A persistent-memory layer with recall, storage, deletion, and agent-integration surfaces for long-running assistants.
best_for:
  - You need to compare persistent memory behavior across agent workflows and can run the project’s benchmark/evaluation paths.
  - You want memory integrations for coding or assistant agents rather than a full model or orchestration runtime.
avoid_if:
  - You need authorization-aware multi-tenant memory without implementing and testing the policy boundary yourself.
  - You cannot measure stale-memory, deletion, prompt-injection, latency, and token-cost behavior on your workload.
enrichment_notes: Official repository, MIT license, benchmark positioning, and 2026-07-10 activity were reviewed on 2026-07-12. Comparative claims and production fit remain draft.
---

## Overview

MemPalace is an open-source memory system for persistent AI-agent context. It focuses on storing, recalling, managing, and integrating memories across sessions and agent surfaces. Its high adoption makes it a useful candidate for comparison, but adoption is not evidence that a memory policy is correct for a particular user, tenant, or regulated workflow.

## Why it's in the Arsenal

Memory changes an agent’s future inputs, so it changes behavior in ways that ordinary prompt tests may not reveal. MemPalace belongs in the Arsenal as a component to benchmark for recall quality, stale facts, deletion, prompt injection, and token cost—not as a drop-in guarantee of “long-term memory.”

## Architecture

The system provides a memory store and retrieval/tool integration surface around an agent. The important data path is write, extraction or normalization, storage, recall, injection, and eventual update/deletion. Each stage can introduce a different failure: a useful fact may not be written, a stale fact may outrank current evidence, a deletion may remove one representation but leave another, and a retrieved memory may be trusted without an authorization or provenance check. The integration protocol and storage backend should be pinned when comparing results.

## Ecosystem Position

MemPalace sits between an agent runtime and its persistent storage/retrieval layer. It overlaps with memory libraries and personal-agent platforms, while a dedicated memory component lets teams evaluate the policy independently of the rest of the agent. Compare it with a simple transcript summary and a domain-specific store on answer quality, stale-memory rate, deletion semantics, latency, and tokens.

## Getting Started

Run the official quick start with a small synthetic conversation set. Create tests for new facts, updates, contradictions, irrelevant memories, explicit deletion, and memory poisoning. Record what was written and retrieved, what the agent saw, and the end-to-end token/latency cost before connecting production identities or documents.

## Key Use Cases

- Persistent context for personal, coding, or research agents.
- Comparative memory evaluation on long-running conversations and tasks.
- Experiments with memory tools and recall policies outside a full agent platform.

## Strengths

- Directly targets the persistent-memory layer rather than hiding it inside an application.
- MIT licensing, active development, and a large benchmark-oriented community provide a useful evaluation target.

## Limitations

- Memory quality is application-specific; benchmark scores can reward a particular task or judge.
- Persistent memory creates privacy, deletion, authorization, and stale-fact obligations that the library cannot solve by itself.
- Memory injection can increase prompt cost and can amplify a bad write across future sessions.

## Relation to the Arsenal

MemPalace is an agent-system memory component. Pair it with provenance, access control, deletion tests, and memory-safety benchmarks such as shared-principal and sycophancy evaluations.

## Resources

- [Official source](https://github.com/MemPalace/mempalace)
