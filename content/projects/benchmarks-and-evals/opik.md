---
id: opik
name: Opik
version_tracked: null
artifact_type: platform
category: observability
subcategory: tracing
description: Open-source Comet platform for LLM tracing, evaluation, prompt optimization, and dashboards
github_url: https://github.com/comet-ml/opik
license: Apache-2.0
primary_language: Python
org_or_maintainer: null
tags:
  - observability
  - tracing
  - evaluation
  - monitoring
maturity: production
cost_model: open-source
github_stars: 20718
github_stars_last_30d: 1109
trending_score: 55
last_commit: '2026-07-20'
docs_url: https://www.comet.com/docs/opik/
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
domain:
  - language
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - community-driven
  - actively-maintained
ecosystem_role:
  - Comet's open-source LLM evaluation and observability platform, extending Comet's existing ML experiment-tracking product line into the LLM/agent space
best_for:
  - You're already using Comet for classic ML experiment tracking and want LLM observability/evaluation in the same ecosystem and vendor relationship
  - You want an open-source evaluation platform backed by an established ML-tooling company (Comet) with both self-hosted and managed options
avoid_if:
  - You're not already invested in the Comet ecosystem — a standalone tool like Langfuse may be a lighter-weight choice with a larger community specifically in the LLM-observability space
  - You need the deepest LangChain-specific integration — LangSmith, built by the LangChain team, has tighter native support for that specific framework
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - langfuse
  - langsmith-platform
  - phoenix
  - helicone
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Limited independent third-party production case studies found beyond Comet's own marketing; org-backing signal (Comet ML, an established experiment-tracking company) is solid, but a genuine named third-party production deployment specifically for Opik was not confirmed.
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

An open-source LLM evaluation and observability platform from Comet, extending Comet's established machine learning experiment-tracking product into tracing and evaluation for LLM and agent applications.

## Why it's in the Arsenal

Comet's open-source LLM evaluation and observability platform, extending Comet's existing ML experiment-tracking product line into the LLM/agent space. It earns a place in the Arsenal because it directly addresses a recurring decision point: you're already using Comet for classic ML experiment tracking and want LLM observability/evaluation in the same ecosystem and vendor relationship. See Strengths / Limitations below before adopting it.

## Architecture

Provides tracing instrumentation for LLM application calls, an evaluation framework with both heuristic and LLM-graded metrics, and a dashboard shared conceptually with Comet's broader ML experiment-tracking platform, available as both open-source self-hosted and managed cloud offerings.

## Ecosystem Position

Upstream: built by Comet, leveraging their existing ML platform infrastructure and experience. Downstream: none of particular note. Competing: Langfuse, LangSmith, Braintrust. Complementary: shares an ecosystem with Comet's classic ML experiment tracking for teams already using that product.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Scenario**: you're already using Comet for classic ML experiment tracking and want LLM observability/evaluation in the same ecosystem and vendor relationship
2. **Scenario**: you want an open-source evaluation platform backed by an established ML-tooling company (Comet) with both self-hosted and managed options

## Strengths

- You're already using Comet for classic ML experiment tracking and want LLM observability/evaluation in the same ecosystem and vendor relationship
- You want an open-source evaluation platform backed by an established ML-tooling company (Comet) with both self-hosted and managed options

## Limitations

- You're not already invested in the Comet ecosystem — a standalone tool like Langfuse may be a lighter-weight choice with a larger community specifically in the LLM-observability space
- You need the deepest LangChain-specific integration — LangSmith, built by the LangChain team, has tighter native support for that specific framework

_Enrichment status: draft — architecture/production claims above are based on the vendor's own description or limited third-party sourcing; not yet independently verified. Last reviewed: 2026-07-01._

## Relation to the Arsenal

This is a benchmark-and-eval entry: it documents an evaluation, tracing, or observability platform. For job-based tool comparisons (evaluation, tracing, monitoring), see [tools/evaluation-and-observability/](../../tools/evaluation-and-observability/_index.md).

## Resources

- [GitHub](https://github.com/comet-ml/opik)
- [Documentation](https://www.comet.com/docs/opik/)
