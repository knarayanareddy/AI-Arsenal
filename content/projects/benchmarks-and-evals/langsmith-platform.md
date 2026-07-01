---
id: langsmith-platform
name: LangSmith
version_tracked: null
artifact_type: service
category: observability
subcategory: tracing
description: Managed LangChain platform for tracing, evaluation, prompt workflows, and deployment feedback
github_url: "https://smith.langchain.com"
license: Proprietary
primary_language: Other
org_or_maintainer: null
tags: [observability, tracing, evaluation, langchain]
maturity: production
cost_model: freemium
github_stars: 0
github_stars_last_30d: 0
trending_score: 15
last_commit: "2026-06-13"
docs_url: "https://docs.smith.langchain.com/"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
approach: platform
phase: benchmark-and-eval
domain: [language]
relation_to_stack: [deploy-as-is]
health_signals: [org-backed, production-proven]
ecosystem_role:
  - LangChain's managed observability and evaluation platform, with the deepest first-party integration for LangChain/LangGraph applications
best_for:
  - You're building with LangChain or LangGraph and want first-party tracing/evaluation with minimal integration work, maintained by the same team as those frameworks
  - You want managed, polished tracing dashboards without operating your own observability backend
avoid_if:
  - You want a framework-agnostic or fully open-source/self-hostable observability stack — Langfuse is the more natural choice for either of those requirements
  - Cost at high trace volume is a concern and you haven't compared pricing against self-hosted alternatives — LangSmith is a managed-only, closed-source product
upstream_dependencies: []
downstream_consumers: []
alternatives: [langfuse, phoenix, helicone, opik]
integrates_with: [langchain, langgraph]
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Documents the LangSmith platform as a project; the tools/by-job/langsmith.md entry covers usage guidance. Production usage is evidenced via its tight LangChain coupling -- LangChain's own frameworks-phase evidence (Rakuten's production use of LangChain+LangSmith together) applies here too.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"conference","url":"https://www.ibm.com/think/topics/langsmith","date":"2025-11-17","description":"IBM documents Factory's production use of LangSmith (integrated with AWS CloudWatch) for secure, reliable LLM operations, doubling iteration speed and reducing open-to-merge time by 20%"}
featured: false
status: active
---

## Overview

LangChain's managed platform for tracing, evaluating, and monitoring applications, with first-party integration for LangChain and LangGraph specifically, requiring minimal setup for applications already built on those frameworks.

## Why it's in the Arsenal

LangChain's managed observability and evaluation platform, with the deepest first-party integration for LangChain/LangGraph applications. It earns a place in the Arsenal because it directly addresses a recurring decision point: you're building with LangChain or LangGraph and want first-party tracing/evaluation with minimal integration work, maintained by the same team as those frameworks. See Strengths / Limitations below before adopting it.

## Architecture

LangChain/LangGraph applications emit trace data automatically via the integration; the managed backend stores and renders traces alongside evaluation runs, prompt versions (via LangSmith Hub), and monitoring dashboards, with a closed-source, cloud-hosted architecture.

## Ecosystem Position

Upstream: tightly coupled to LangChain/LangGraph's instrumentation hooks. Downstream: none of particular note. Competing: Langfuse (open-source, framework-agnostic alternative), Braintrust, Helicone. Complementary: the natural pairing for any LangChain or LangGraph-based application, as documented in the frameworks-phase langchain.md and langgraph.md entries.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Scenario**: you're building with LangChain or LangGraph and want first-party tracing/evaluation with minimal integration work, maintained by the same team as those frameworks
2. **Scenario**: you want managed, polished tracing dashboards without operating your own observability backend

## Strengths

- You're building with LangChain or LangGraph and want first-party tracing/evaluation with minimal integration work, maintained by the same team as those frameworks
- You want managed, polished tracing dashboards without operating your own observability backend

## Limitations

- You want a framework-agnostic or fully open-source/self-hostable observability stack — Langfuse is the more natural choice for either of those requirements
- Cost at high trace volume is a concern and you haven't compared pricing against self-hosted alternatives — LangSmith is a managed-only, closed-source product

## Relation to the Arsenal

This is a benchmark-and-eval entry: it documents an evaluation, tracing, or observability platform. For job-based tool comparisons (evaluation, tracing, monitoring), see [tools/evaluation-and-observability/](../../tools/evaluation-and-observability/_index.md).

## Resources

- [GitHub](https://smith.langchain.com)
- [Documentation](https://docs.smith.langchain.com/)
