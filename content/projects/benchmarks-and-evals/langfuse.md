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
github_stars: 36439
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-10-25"
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
last_reviewed: "2026-10-25"
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

Langfuse is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

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

1. **Running it in anger**: the first real evaluation of Langfuse is your own traffic, not the documentation's example; instrument latency, error rate and quality on a representative slice of data before the choice is load-bearing.
2. **What the Langfuse scenarios have in common**: each describes a measurement that would change a decision rather than a number that is merely interesting.
3. **Choosing between candidates**: compare Langfuse against `langsmith-platform`, `phoenix`, `helicone` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- The self-hosted stack is the same product as the cloud, not a reduced edition: docker compose brings up the web app, Postgres, ClickHouse, Redis and an S3-compatible store, and the traces you see locally are the traces the managed version would show.
- Trace-to-prompt-to-dataset linkage is the real design win: a prompt version is attached to the traces it produced, those traces can be promoted into a dataset, and an experiment can score the candidate version against them — one chain rather than three tools joined by IDs.
- ClickHouse behind the analytics is what makes it viable at volume; the dashboards stay responsive on millions of observations in a way a Postgres-only store does not manage.
- Ingestion is OTel-compatible alongside the native SDKs, so instrumentation can be shared with an existing observability estate instead of duplicated.
- Cost tracking uses model definitions you can correct, which matters because provider pricing changes and a cost dashboard that silently uses stale prices is worse than none.
- MIT core with 36,000 stars and commits on the day of review: the community edition is genuinely developed, not a funnel left to rot.
## Limitations

- **Self-hosting is a real stack, not a container.** Postgres, ClickHouse, Redis and object storage all need operating, backing up and upgrading together; the ClickHouse disk is the one that grows without warning and the one whose migration is least forgiving.
- **Enterprise features are licensed.** SSO, RBAC, audit logs and several governance controls sit behind the commercial edition, and a security review that expects them will find the community edition short.
- **Volume is a cost line in both directions.** Units-based pricing means the bill tracks traces, observations and scores, so instrumenting everything is expensive on cloud and disk-hungry when self-hosted — sampling is a decision, not an option.
- **1,134 open issues against a fast-moving codebase.** SDK and server versions must move together; a pinned Python client against a newer server is a routine source of silent ingestion gaps.
- **Evaluation depth is workflow, not statistics.** LLM-as-a-judge, datasets and experiments are well covered; judge calibration, confidence intervals and inter-rater agreement are not, and for claims that need rigour a dedicated eval tool is still required.
- **It records what you instrument.** Framework integrations cover the popular paths, but a bespoke agent loop needs manual span structure, and a trace with the wrong nesting is harder to read than no trace.
## Relation to the Arsenal

This project entry documents Langfuse's architecture and ecosystem position as an open-source observability platform. For usage-oriented guidance on Langfuse's prompt-management surface specifically, see [Langfuse Prompts](../../tools/dx-and-tooling/langfuse-prompts.md) in the tools vertical — that entry does not repeat this one's best_for/avoid_if verbatim, since the frames differ: this entry is about what Langfuse IS as a platform, the tool entry is about WHEN you'd reach for its prompt-management feature specifically.

## Resources

- [GitHub](https://github.com/langfuse/langfuse)
- [Documentation](https://langfuse.com/docs)
