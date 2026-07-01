---
id: openllmetry
name: OpenLLMetry
version_tracked: null
artifact_type: library
category: observability
subcategory: tracing
description: OpenTelemetry instrumentation for GenAI and LLM applications from Traceloop
github_url: "https://github.com/traceloop/openllmetry"
license: Apache-2.0
primary_language: Python
org_or_maintainer: null
tags: [observability, tracing, monitoring, self-hosted]
maturity: production
cost_model: open-source
github_stars: 7000
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-04-08"
docs_url: "https://www.traceloop.com/docs/openllmetry"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
approach: otel-native
phase: benchmark-and-eval
domain: [language]
relation_to_stack: [build-on-top]
health_signals: [org-backed, community-driven, actively-maintained]
ecosystem_role:
  - Traceloop's OpenTelemetry-native instrumentation library for GenAI/LLM applications
best_for:
  - You want standardized, OpenTelemetry-based instrumentation for LLM applications specifically, backed by Traceloop, with broad framework/provider auto-instrumentation coverage
  - You need traces to flow into an existing OTel-compatible observability backend rather than adopting a new dedicated LLM-observability platform
avoid_if:
  - You want an all-in-one platform combining tracing with prompt management and evaluation UI — OpenLLMetry is instrumentation-focused; pair it with a platform like Langfuse or Traceloop's own hosted product for the full workflow
  - You're not using or planning to use OpenTelemetry-based observability — a purpose-built platform may have a simpler onboarding path
upstream_dependencies: []
downstream_consumers: []
alternatives: [langfuse, langsmith-platform, phoenix, helicone]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Backed by Traceloop (a named company with a commercial hosted product built on the same open-source instrumentation), giving credible org-backing signal distinct from a purely community project.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

An open-source OpenTelemetry-native instrumentation library from Traceloop for GenAI and LLM applications, providing standardized tracing across a wide range of LLM providers, frameworks, and vector databases.

## Why it's in the Arsenal

Traceloop's OpenTelemetry-native instrumentation library for GenAI/LLM applications. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want standardized, OpenTelemetry-based instrumentation for LLM applications specifically, backed by Traceloop, with broad framework/provider auto-instrumentation coverage. See Strengths / Limitations below before adopting it.

## Architecture

Provides auto-instrumentation packages following OpenTelemetry semantic conventions for GenAI, automatically capturing spans for LLM calls, embedding operations, and vector database queries across supported providers/frameworks without requiring manual instrumentation of each call site.

## Ecosystem Position

Upstream: built on the OpenTelemetry SDK and semantic conventions. Downstream: powers Traceloop's own commercial observability platform. Competing: OpenLIT occupies a very similar OTel-native niche. Complementary: exports to any OTel-compatible backend, including Langfuse, Grafana, or Traceloop's hosted platform.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Scenario**: you want standardized, OpenTelemetry-based instrumentation for LLM applications specifically, backed by Traceloop, with broad framework/provider auto-instrumentation coverage
2. **Scenario**: you need traces to flow into an existing OTel-compatible observability backend rather than adopting a new dedicated LLM-observability platform

## Strengths

- You want standardized, OpenTelemetry-based instrumentation for LLM applications specifically, backed by Traceloop, with broad framework/provider auto-instrumentation coverage
- You need traces to flow into an existing OTel-compatible observability backend rather than adopting a new dedicated LLM-observability platform

## Limitations

- You want an all-in-one platform combining tracing with prompt management and evaluation UI — OpenLLMetry is instrumentation-focused; pair it with a platform like Langfuse or Traceloop's own hosted product for the full workflow
- You're not using or planning to use OpenTelemetry-based observability — a purpose-built platform may have a simpler onboarding path

## Relation to the Arsenal

This is a benchmark-and-eval entry: it documents an evaluation, tracing, or observability platform. For job-based tool comparisons (evaluation, tracing, monitoring), see [tools/evaluation-and-observability/](../../tools/evaluation-and-observability/_index.md).

## Resources

- [GitHub](https://github.com/traceloop/openllmetry)
- [Documentation](https://www.traceloop.com/docs/openllmetry)
