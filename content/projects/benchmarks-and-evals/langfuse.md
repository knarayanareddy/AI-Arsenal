---
id: langfuse
name: Langfuse
version_tracked: null
artifact_type: platform
category: observability
subcategory: tracing
description: Open-source LLM observability platform for traces, evals, prompts, metrics, and datasets
github_url: "https://github.com/langfuse/langfuse"
license: MIT core / Enterprise
primary_language: TypeScript
org_or_maintainer: null
tags: [observability, tracing, evaluation, self-hosted]
maturity: production
cost_model: freemium
github_stars: 29021
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-06-13"
docs_url: "https://langfuse.com/docs"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
approach: sdk
phase: benchmark-and-eval
domain: [language]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, community-driven, actively-maintained, production-proven]
ecosystem_role:
  - Open-source LLM observability and evaluation platform, one of the most widely adopted self-hostable options with a fully-open-source product model
best_for:
  - You want a fully open-source (not open-core) observability and evaluation platform that scales to large event volumes, confirmed by the maintainers to run identically whether self-hosted or on their managed cloud
  - You need prompt management, tracing, and evaluation in one framework-agnostic platform with strong data-residency options (self-hosted, including Azure deployment via Terraform)
avoid_if:
  - You want the deepest first-party integration specifically with LangChain/LangGraph — LangSmith, being built by the same team as those frameworks, has tighter native integration
  - You need a fully managed-only experience with zero self-hosting operational responsibility — Langfuse's strength is precisely its self-hostable flexibility, which is not relevant if you always intend to use the managed cloud
upstream_dependencies: []
downstream_consumers: []
alternatives: [langsmith-platform, phoenix, helicone, opik]
integrates_with: [langchain, langgraph]
corresponding_tool_entry: langfuse-prompts
enrichment_status: reviewed
enrichment_notes: Langfuse's co-founder/CEO confirmed via a public July 2025 Reddit response that OSS Langfuse 'scales to billions of events' and runs the same backend as their largest self-hosted enterprise deployments -- primary-source confirmation, not marketing. A separate 'case study' found elsewhere was explicitly an anonymised composite, not used as evidence.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"reddit","url":"https://www.reddit.com/r/LangChain/comments/1m27js0/is_langfuse_selfhosted_really_equal_to_the/","date":"2025-07-17","description":"Langfuse co-founder/CEO confirms in a public reddit response that Langfuse OSS scales to billions of events and runs the same backend as their largest self-hosted enterprise deployments"}
featured: false
status: active
---

## Overview

An open-source LLM observability and evaluation platform offering tracing, prompt management, and evaluation, distinguished by a fully open-source (not open-core) product model where the self-hosted version has feature parity with the managed cloud offering.

## Why it's in the Arsenal

Open-source LLM observability and evaluation platform, one of the most widely adopted self-hostable options with a fully-open-source product model. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want a fully open-source (not open-core) observability and evaluation platform that scales to large event volumes, confirmed by the maintainers to run identically whether self-hosted or on their managed cloud. See Strengths / Limitations below before adopting it.

## Architecture

Provides SDK-based tracing instrumentation across major LLM frameworks and languages, a prompt registry with versioning tied to trace data, and an evaluation engine supporting both rule-based and LLM-graded scoring, all backed by a self-hostable stack (Postgres-based) that the maintainers confirm scales to billions of events in production.

## Ecosystem Position

Upstream: none of particular note. Downstream: Langfuse Prompts (in the tools vertical) is this same platform's prompt-management surface, documented as a separate tool entry for usage-oriented guidance. Competing: LangSmith (tighter LangChain integration but closed-source/managed-first), Helicone, Braintrust. Complementary: framework-agnostic; commonly paired with any LLM orchestration framework.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Scenario**: you want a fully open-source (not open-core) observability and evaluation platform that scales to large event volumes, confirmed by the maintainers to run identically whether self-hosted or on their managed cloud
2. **Scenario**: you need prompt management, tracing, and evaluation in one framework-agnostic platform with strong data-residency options (self-hosted, including Azure deployment via Terraform)

## Strengths

- You want a fully open-source (not open-core) observability and evaluation platform that scales to large event volumes, confirmed by the maintainers to run identically whether self-hosted or on their managed cloud
- You need prompt management, tracing, and evaluation in one framework-agnostic platform with strong data-residency options (self-hosted, including Azure deployment via Terraform)

## Limitations

- You want the deepest first-party integration specifically with LangChain/LangGraph — LangSmith, being built by the same team as those frameworks, has tighter native integration
- You need a fully managed-only experience with zero self-hosting operational responsibility — Langfuse's strength is precisely its self-hostable flexibility, which is not relevant if you always intend to use the managed cloud

## Relation to the Arsenal

This project entry documents Langfuse's architecture and ecosystem position as an open-source observability platform. For usage-oriented guidance on Langfuse's prompt-management surface specifically, see [Langfuse Prompts](../../tools/dx-and-tooling/langfuse-prompts.md) in the tools vertical — that entry does not repeat this one's best_for/avoid_if verbatim, since the frames differ: this entry is about what Langfuse IS as a platform, the tool entry is about WHEN you'd reach for its prompt-management feature specifically.

## Resources

- [GitHub](https://github.com/langfuse/langfuse)
- [Documentation](https://langfuse.com/docs)
