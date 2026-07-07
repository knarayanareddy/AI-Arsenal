---
id: "evals-in-production"
title: "Evals in Production"
entry_type: "guide"
section: "skills"
description: "Operationalizing LLM evaluation: CI gates, online monitoring, feedback loops, and regression discipline"
tags:
  - evaluation
  - monitoring
  - tracing
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

Evals in production is the operational half of evaluation methodology: wiring golden sets into CI, sampling live traffic for online scoring, converting incidents into regression tests, and knowing when a metric shift means a real quality change. It is the difference between having evals and being protected by them.

## Why It's in the Arsenal

Most teams write evals once and let them rot. The operational disciplines here — gates, sampling, feedback loops, dataset versioning — are what keep an LLM system's quality observable release after release.

## Key Features

### Core Concepts

- Two loops: offline (golden set in CI, blocks bad changes before ship) and online (sampled production traffic scored continuously, catches drift after ship). You need both.
- Every incident becomes a test: the fix for a production failure is not complete until the failing case is in the golden set.
- Judged metrics drift when the judge model changes — pin judge versions and re-calibrate on upgrade.
- Score trends beat score values: alert on deltas against a baseline, not on absolute thresholds.
- Segment metrics by feature, prompt version, and model version — aggregates hide regressions.

### Practical Workflow

1. Gate: run the golden set on every PR touching prompts, pipeline code, or model config.
2. Sample: score 1-10% of production traces with cheap deterministic checks plus a judged criterion.
3. Feed back: route thumbs-down and support escalations into a labeling queue; graduate labeled cases into the golden set.
4. Version: eval datasets, scorers, and judge prompts live in git alongside the code they protect.
5. Review: a weekly look at score trends and failure clusters — evals unread are evals abandoned.

## Architecture / How It Works

The CI gate replays the versioned golden set through the real pipeline and fails on regression. The online path taps the tracing pipeline: sampled traces flow to scorers asynchronously, results land in the same dashboard as latency and cost. The connective tissue is trace metadata — prompt version and model version stamped on every trace makes every regression attributable.

## Getting Started

```text
Rollout order:
week 1: golden set (50 cases) + deterministic scorers, run manually
week 2: wire into CI as a blocking check
week 3: trace sampling + async online scoring
week 4: feedback → labeling → golden-set graduation loop
```

## Use Cases

1. **Scenario**: Safely rolling out a cheaper model behind a feature flag with eval evidence
2. **Scenario**: Detecting quality drift after a provider silently updates a model
3. **Scenario**: Proving to stakeholders that this month's prompt changes improved resolution rate

## Strengths

- Converts LLM quality from anecdote to observable, trend-tracked signal
- Regression discipline compounds — the golden set gets stronger with every incident
- Reuses existing tracing infrastructure; marginal cost is low

## Limitations / When NOT to Use

- Online judged scoring adds cost and latency to the scoring path — sample, do not score everything
- Feedback data is biased (angry users click thumbs-down more); balance with random sampling
- Do not gate CI on noisy judged metrics — gate on deterministic checks, trend the rest

## Integration Patterns

- Build on [Evaluation Methodology](../core-concepts/evaluation-methodology.md) — this page assumes a golden set exists.
- Instrument with a tracing platform: [Langfuse](../../projects/benchmarks-and-evals/langfuse.md), [Phoenix](../../projects/benchmarks-and-evals/phoenix.md), or [Opik](../../projects/benchmarks-and-evals/opik.md).
- Apply [do not launch without trace sampling](../../tips-and-tricks/debugging-and-observability/do-not-launch-without-trace-sampling.md) and [store prompt version in every trace](../../tips-and-tricks/debugging-and-observability/store-prompt-version-in-every-trace.md).

## Resources

- [Evaluation Methodology](../core-concepts/evaluation-methodology.md)
- [Choose an observability tool](../../architectures/evaluation-strategy/choose-observability-tool.md)
- [Version your eval datasets](../../tips-and-tricks/evaluation/version-your-eval-datasets.md)
- [LLM Observability](./llm-observability.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-07-07 by @maintainer*
