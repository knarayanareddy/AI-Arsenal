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
github_stars: 22942
github_stars_last_30d: 40
trending_score: 18
last_commit: '2026-10-26'
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
last_reviewed: '2026-10-25'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

An open-source LLM evaluation and observability platform from Comet, extending Comet's established machine learning experiment-tracking product into tracing and evaluation for LLM and agent applications.

## Why it's in the Arsenal

Opik appears in this catalog as a reference point for the benchmark-and-eval phase; the useful question is whether the number it produces would change a decision you are actually facing. The sections below state what it claims to do and what adopting it would commit you to.

## Architecture

Provides tracing instrumentation for LLM application calls, an evaluation framework with both heuristic and LLM-graded metrics, and a dashboard shared conceptually with Comet's broader ML experiment-tracking platform, available as both open-source self-hosted and managed cloud offerings.

The engineering question with Opik is not whether it works but what it commits you to unlike `langfuse`, `langsmith-platform`; in the benchmark-and-eval phase; under a open-source cost model; with `opik`, `name`, `version`: hardware or spend, a version to track, and a failure mode to handle. Those three are usually absent from the documentation and present in production.

## Ecosystem Position

Upstream: built by Comet, leveraging their existing ML platform infrastructure and experience. Downstream: none of particular note. Competing: Langfuse, LangSmith, Braintrust. Complementary: shares an ecosystem with Comet's classic ML experiment tracking for teams already using that product.

Compared with unlike `langfuse`, `langsmith-platform`; in the benchmark-and-eval phase; under a open-source cost model; with `opik`, `name`, `version`, Opik overlaps on what it does and diverges on how it is run. A feature comparison between the two will understate the difference; a deployment and cost comparison will not, and that is the comparison that should decide it.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Running Opik on your own workload**: the published score conditions on someone else's tasks, harness and prompt, so reproduce it on a slice of your data before treating it as a decision input.
2. **What to measure first**: `already`, `using`, `comet`, `classic` decide whether Opik works for you; measure them on your own data because the published numbers are conditioned on someone else's setup.
3. **Choosing between candidates**: compare Opik against `langfuse`, `langsmith-platform`, `phoenix` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- Apache-2.0 across the whole product, not an open core with the useful half licensed — rare among observability platforms and the reason it is usable in a procurement-constrained environment.
- The evaluation library is the differentiator: heuristic metrics and LLM-graded ones (hallucination, moderation, answer relevance, G-Eval-style rubrics) ship as code, so an experiment is a function call rather than a build.
- Prompt optimisation is included, which most competitors stop short of — a candidate prompt can be improved against a dataset automatically, then scored on the same set.
- Guardrails alongside tracing mean a policy decision can reference the traces that motivated it, and the rule runs in the same stack rather than in a second vendor.
- Comet's experiment-tracking heritage shows in the comparison views: experiments, datasets and prompt versions are first-class objects with dashboards, not an afterthought bolted onto traces.
- Apache-2.0 with 22,902 stars and a push the day before review; both the self-hosted and cloud paths are actively developed.
## Limitations

- **The self-hosted stack is heavier than a single container.** A columnar store, a relational database and a queue all have to run, and the operational burden lands on whoever adopted it for the evaluation features.
- **Evaluation rigour is still yours.** The metrics are provided; the dataset design, the judge model choice and the calibration that makes a score trustworthy are not, and an uncalibrated judge produces confident nonsense at scale.
- **Product surface moves quickly.** Guardrails, optimisation and agent features arrived in rapid succession, so documentation, SDKs and server versions drift and a tutorial written a quarter ago may not run.
- **174 open issues is good for the size, but support is community-first.** A blocker in a specific integration is a GitHub thread, and Comet's commercial priorities set the roadmap.
- **Framework coverage is broad, not exhaustive.** The popular integrations are first-class; an unusual stack needs manual instrumentation, and a half-instrumented agent trace misleads more than it explains.
- **Cost at volume is the same trap as every observability platform.** Tracing every call on a busy service produces storage and ingestion costs that nobody budgeted, and sampling changes what you can debug after the fact.
## Relation to the Arsenal

Read it against `langfuse` (the most adopted self-hostable option, with a ClickHouse-backed analytics path), `phoenix` (Arize, OTel-native with a strong notebook workflow) and `langsmith-platform` (managed, deepest if you are already on LangChain). The axis that separates them is what you need after tracing: Opik's advantage is the bundled evaluation and optimisation tooling under a permissive licence; Langfuse's is operational maturity and adoption; Phoenix's is standards-first tracing with evaluation inside a notebook.

For the tracing contract itself, see the OTel discussion in `openlit` and `openllmetry`. For what to evaluate with, see [Benchmarks and Evals](../benchmarks-and-evals/_index.md) and the dataset tools in `label-studio`.
## Resources

- [GitHub](https://github.com/comet-ml/opik)
- [Documentation](https://www.comet.com/docs/opik/)
