---
id: openllmetry
name: OpenLLMetry
version_tracked: null
artifact_type: library
category: observability
subcategory: tracing
description: OpenTelemetry instrumentation for GenAI and LLM applications from Traceloop
github_url: https://github.com/traceloop/openllmetry
license: Apache-2.0
primary_language: Python
org_or_maintainer: null
tags:
  - observability
  - tracing
  - monitoring
  - self-hosted
maturity: production
cost_model: open-source
github_stars: 7509
github_stars_last_30d: 3
trending_score: 15
last_commit: '2026-10-19'
docs_url: https://www.traceloop.com/docs/openllmetry
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
domain:
  - language
relation_to_stack:
  - build-on-top
health_signals:
  - org-backed
  - community-driven
  - actively-maintained
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
alternatives:
  - langfuse
  - langsmith-platform
  - phoenix
  - helicone
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Backed by Traceloop (a named company with a commercial hosted product built on the same open-source instrumentation), giving credible org-backing signal distinct from a purely community project.
added_date: '2026-06-13'
last_reviewed: '2026-10-25'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

An open-source OpenTelemetry-native instrumentation library from Traceloop for GenAI and LLM applications, providing standardized tracing across a wide range of LLM providers, frameworks, and vector databases.

## Why it's in the Arsenal

OpenLLMetry is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

## Architecture

Provides auto-instrumentation packages following OpenTelemetry semantic conventions for GenAI, automatically capturing spans for LLM calls, embedding operations, and vector database queries across supported providers/frameworks without requiring manual instrumentation of each call site.

## Ecosystem Position

Upstream: built on the OpenTelemetry SDK and semantic conventions. Downstream: powers Traceloop's own commercial observability platform. Competing: OpenLIT occupies a very similar OTel-native niche. Complementary: exports to any OTel-compatible backend, including Langfuse, Grafana, or Traceloop's hosted platform.

Read OpenLLMetry beside the entries it overlaps in this phase rather than alone: the meaningful comparison is what each option asks you to operate, not what its feature list contains unlike `langfuse`, `langsmith-platform`; in the benchmark-and-eval phase; under a open-source cost model; with `openllmetry`, `name`, `version`. Where capability is similar, the deciding axis is deployment model, cost structure and the failure behaviour you inherit rather than fix.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Running OpenLLMetry on your own workload**: the published score conditions on someone else's tasks, harness and prompt, so reproduce it on a slice of your data before treating it as a decision input.
2. **What the OpenLLMetry scenarios have in common**: each describes a measurement that would change a decision rather than a number that is merely interesting.
3. **Choosing between candidates**: compare OpenLLMetry against `langfuse`, `langsmith-platform`, `phoenix` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- Instrumentation is the product, so nothing is decided about where the data goes: the same spans can be sent to Datadog, Grafana/Tempo, Jaeger, Honeycomb or an LLM-specific backend, and switching is a collector configuration change.
- Package-per-provider design means you install only the instrumentor for the libraries you actually call — `opentelemetry-instrumentation-openai`, `-anthropic`, `-langchain`, `-vectorstore` — rather than a monolith that patches everything.
- It emits OpenTelemetry spans following the GenAI semantic conventions, so LLM calls sit in the same trace as your HTTP and database spans instead of in a parallel silo.
- The wrapper SDK (`traceloop-sdk`) is thin enough to be removable — it configures exporters and adds workflow decorators, and dropping back to raw OTel is not a rewrite.
- Apache-2.0, 7,506 stars, and active development with a push in October 2026; the instrumentation packages track upstream SDK releases closely, which is the maintenance work that matters.
- Zero-cost adoption for a team that already runs an OTel collector: the change is a package install and a provider registration, not a new vendor.
## Limitations

- **It is not an observability platform.** There is no UI, no dataset, no evaluator and no prompt registry in this repository — you get spans and you own the backend, which is either the point or a disappointment depending on what you expected.
- **The vendor's own product is a separate thing.** Traceloop's hosted platform is the commercial surface, so "add the platform later" is a purchase, and the open-source path stays a library.
- **809 open issues against 7,506 stars.** A large fraction are integration-specific breakages after an upstream SDK release, and the volume tells you how much of the maintenance is version-chasing.
- **Semantic conventions are still moving.** Attribute names for GenAI spans have changed during the standard's development; a dashboard or alert built on attribute names needs re-checking across upgrades.
- **Auto-instrumentation has a coverage ceiling.** It captures calls that go through instrumented libraries; bespoke HTTP calls to a provider, hand-rolled streaming, or a framework without an instrumentor are invisible until you add manual spans.
- **Patching at import time is order-sensitive.** An instrumentor registered after the library has already been imported can silently capture nothing, and the symptom is an empty dashboard rather than an error.
## Relation to the Arsenal

This is the instrumentation half of the observability cluster: `openlit` bundles a platform around the same OTel approach, `langfuse` and `opik` provide the backend and evaluation layer, and `phoenix` shares the OTel foundation with a notebook-centric workflow. Choose OpenLLMetry when an OTel backend already exists and you want LLM spans to join it; choose a platform when you have nowhere to put the spans yet.

For the standard the spans follow, the GenAI semantic conventions in OpenTelemetry are the reference, and `openlit` documents the practical consequences of adopting them.
## Resources

- [GitHub](https://github.com/traceloop/openllmetry)
- [Documentation](https://www.traceloop.com/docs/openllmetry)
