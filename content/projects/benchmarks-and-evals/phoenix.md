---
id: phoenix
name: Phoenix
version_tracked: null
artifact_type: platform
category: observability
subcategory: tracing
description: Arize Phoenix open-source observability and evaluation platform for LLM, RAG, and agent systems
github_url: https://github.com/Arize-ai/phoenix
license: Elastic-2.0
primary_language: Python
org_or_maintainer: null
tags:
  - observability
  - tracing
  - evaluation
  - monitoring
maturity: production
cost_model: open-source
github_stars: 10636
github_stars_last_30d: 512
trending_score: 55
last_commit: '2026-07-19'
docs_url: https://arize.com/docs/phoenix
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
  - multimodal
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - community-driven
  - actively-maintained
ecosystem_role:
  - Arize AI's open-source LLM observability and evaluation platform, notebook-first and OpenTelemetry-based
best_for:
  - You want a notebook-first observability experience for ML/LLM engineers who iterate in Jupyter-style environments during development, extending into production monitoring
  - You want an OpenTelemetry-based, standards-aligned observability tool backed by Arize (an established ML-observability company) rather than a purpose-built proprietary format
avoid_if:
  - You need the deepest built-in LLM-specific evaluation metrics out of the box — evaluation-native platforms may require less configuration for common LLM eval scenarios
  - Your team doesn't work in a notebook-first development style — Phoenix's core UX strength is most valuable to teams that do
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - langfuse
  - langsmith-platform
  - helicone
  - opik
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Backed by Arize AI, an established ML observability company with a broader commercial platform beyond Phoenix, giving credible org-backing and production-tooling-experience signal even though a specific named third-party production case study for Phoenix itself was not independently confirmed during this migration's research.
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Arize AI's open-source LLM observability and evaluation platform, notable for a notebook-first development experience and OpenTelemetry-based instrumentation, extending from ML observability into LLM/agent tracing.

## Why it's in the Arsenal

Arize AI's open-source LLM observability and evaluation platform, notebook-first and OpenTelemetry-based. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want a notebook-first observability experience for ML/LLM engineers who iterate in Jupyter-style environments during development, extending into production monitoring. See Strengths / Limitations below before adopting it.

## Architecture

Built on OpenTelemetry for tracing instrumentation, with a strong notebook-first UX for exploring traces and evaluation results during development (via the Arize Phoenix Python package), plus a production deployment mode for ongoing monitoring; evaluation combines heuristic and LLM-graded metrics.

## Ecosystem Position

Upstream: built on OpenTelemetry conventions. Downstream: none of particular note. Competing: Langfuse, LangSmith, Opik. Complementary: shares Arize's broader ML observability expertise and can integrate with Arize's commercial platform for teams that outgrow the open-source tool alone.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Scenario**: you want a notebook-first observability experience for ML/LLM engineers who iterate in Jupyter-style environments during development, extending into production monitoring
2. **Scenario**: you want an OpenTelemetry-based, standards-aligned observability tool backed by Arize (an established ML-observability company) rather than a purpose-built proprietary format

## Strengths

- You want a notebook-first observability experience for ML/LLM engineers who iterate in Jupyter-style environments during development, extending into production monitoring
- You want an OpenTelemetry-based, standards-aligned observability tool backed by Arize (an established ML-observability company) rather than a purpose-built proprietary format

## Limitations

- You need the deepest built-in LLM-specific evaluation metrics out of the box — evaluation-native platforms may require less configuration for common LLM eval scenarios
- Your team doesn't work in a notebook-first development style — Phoenix's core UX strength is most valuable to teams that do

## Relation to the Arsenal

This is a benchmark-and-eval entry: it documents an evaluation, tracing, or observability platform. For job-based tool comparisons (evaluation, tracing, monitoring), see [tools/evaluation-and-observability/](../../tools/evaluation-and-observability/_index.md).

## Resources

- [GitHub](https://github.com/Arize-ai/phoenix)
- [Documentation](https://arize.com/docs/phoenix)
