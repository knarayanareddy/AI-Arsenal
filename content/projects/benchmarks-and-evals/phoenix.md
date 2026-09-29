---
id: phoenix
name: Phoenix
version_tracked: null
artifact_type: platform
category: observability
subcategory: tracing
description: Arize Phoenix open-source observability and evaluation platform for LLM, RAG, and agent systems
github_url: "https://github.com/Arize-ai/phoenix"
license: Elastic-2.0
primary_language: Python
org_or_maintainer: null
tags: [observability, tracing, evaluation, monitoring]
maturity: production
cost_model: open-source
github_stars: 10124
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-06-13"
docs_url: "https://arize.com/docs/phoenix"
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
domain: [language, multimodal]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, community-driven, actively-maintained]
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
alternatives: [langfuse, langsmith-platform, helicone, opik]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Backed by Arize AI, an established ML observability company with a broader commercial platform beyond Phoenix, giving credible org-backing and production-tooling-experience signal even though a specific named third-party production case study for Phoenix itself was not independently confirmed during this migration's research.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Arize AI's open-source LLM observability and evaluation platform, notable for a notebook-first development experience and OpenTelemetry-based instrumentation, extending from ML observability into LLM/agent tracing.

## Why it's in the Arsenal

Phoenix is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

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

1. **Depending on it safely**: the work is the boundary — which calls go through Phoenix, what happens when it is slow, and what your system does instead, since those three answers determine whether adopting it is cheap or expensive.
2. **What the Phoenix scenarios have in common**: each describes a measurement that would change a decision rather than a number that is merely interesting.
3. **Choosing between candidates**: compare Phoenix against `langfuse`, `langsmith-platform`, `helicone` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- Beyond the headline description, Phoenix's architecture section is the honest source: built on OpenTelemetry for tracing instrumentation, with a strong notebook-first UX for exploring traces and evaluation results during development (via the Arize Phoenix Python package), plus a production deployment mode for ongoing monitoring; evaluation combines heuristic and LLM-graded metrics.
- It is a benchmark-and-eval entry in this catalog, so the comparison that matters is against the other benchmark-and-eval projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the Phoenix footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- Documentation describes intended behaviour, not observed behaviour: latency, memory and failure rates for Phoenix at your scale need measuring before this informs a production decision.
- Where Phoenix overlaps `langfuse`, `langsmith-platform`, `helicone`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

This is the benchmark-and-eval entry for Phoenix in this phase, and the honest way to use it is as one candidate among the alternatives listed in the phase index rather than as a default. Read the Strengths and Limitations sections before adopting it: the operational cost, the model or service dependencies, and the failure behaviour are what decide whether it fits your workload, and none of those are settled by the feature list alone.

## Resources

- [GitHub](https://github.com/Arize-ai/phoenix)
- [Documentation](https://arize.com/docs/phoenix)
