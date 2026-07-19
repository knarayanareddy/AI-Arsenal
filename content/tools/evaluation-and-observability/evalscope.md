---
id: evalscope
name: EvalScope
type: tool
job:
- evaluation
description: ModelScope framework for LLM, VLM, AIGC, agent evaluation, stress testing,
  and reports
url: https://evalscope.readthedocs.io/en/latest/
cost_model: open-source
pricing_detail: Apache-2.0 software; model/API, GPU, and dataset costs are separate
tags:
- evaluation
- benchmark
- llm
- multimodal
- inference
maturity: production
stack:
- python
free_tier: true
free_tier_limits: Fully open source; you pay for models, endpoints, and compute
self_hostable: true
open_source: true
source_url: https://github.com/modelscope/evalscope
docs_url: https://evalscope.readthedocs.io/en/latest/
github_url: https://github.com/modelscope/evalscope
alternatives:
- lm-evaluation-harness
- openjudge
integrates_with: []
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience:
- prototype
- research
- production
best_when:
- You need one runner for capability benchmarks, OpenAI-compatible endpoint checks,
  agent traces, and inference performance metrics
- You are comparing LLM or VLM candidates across GSM8K, MMLU-style suites, custom
  datasets, or service-level TTFT and TPOT targets
avoid_when:
- Your acceptance decision depends on a private domain distribution that the built-in
  benchmarks do not represent
- You need a low-overhead production monitor rather than an offline evaluator that
  records and visualizes test runs
version_tracked: null
enrichment_status: draft
enrichment_notes: Metadata and feature claims are grounded in the project README and
  public repository state; draft pending maintainer review.
verdict: recommended
verdict_rationale: A broad, extensible evaluation runner with both model-quality and
  serving-performance paths
status: active
---

## Overview

EvalScope is a Python evaluation framework from the ModelScope community that puts capability tests, agent evaluation, inference stress tests, and report visualization behind one command-oriented workflow. It is useful when a team wants to compare models and serving endpoints without stitching together separate benchmark runners and load-test scripts.

## Why It's in the Arsenal

EvalScope earns a place because it covers a wider evaluation surface than a single benchmark harness: its README describes LLM, VLM, embedding, reranker, AIGC, and agent modes alongside TTFT and TPOT performance measurements. The extensible dataset, model, and metric interfaces also make it a practical bridge between public benchmark reproduction and a team's own regression suite.

## Key Features

The framework includes recognized suites such as MMLU, C-Eval, and GSM8K, an OpenAI-compatible backend, Docker-sandboxed agent loops with per-sample traces, stress testing, pairwise arena comparisons, and a web dashboard for score and prediction inspection. Those pieces let an evaluator keep quality results and service measurements in the same experiment record.

## Architecture / How It Works

EvalScope separates backends from datasets, model adapters, metrics, and report generation. A run selects a model or API endpoint, a dataset or agent task, and an evaluation backend; the runner emits structured predictions and metrics that the dashboard can compare across runs. Agent mode adds a controlled multi-turn loop and optional tools, while performance mode measures serving behavior rather than answer quality.

## Getting Started

Install the package and point the OpenAI-compatible backend at a reachable endpoint:

```bash
pip install evalscope
evalscope eval --model your-model-name --api-url "$OPENAI_API_BASE_URL" --api-key "$OPENAI_API_KEY" --eval-type openai_api --datasets gsm8k --limit 5
```

Start with a small limit, then replace the built-in dataset with a versioned internal set before treating the score as a release gate.

## Use Cases

Use EvalScope to compare several chat endpoints on the same reasoning suite, to run a VLM or embedding regression after changing a checkpoint, or to stress an OpenAI-compatible service while recording TTFT and TPOT. Its agent mode is a fit for measuring tool trajectories and failure traces in a sandbox, not for silently probing production users.

## Strengths

The combination of capability evaluation, agent traces, load testing, and interactive reports is the project's main advantage. Built-in support for multiple model modalities and custom extension points reduces the amount of glue code needed when an evaluation program grows beyond a single text benchmark.

## Limitations / When NOT to Use

A benchmark score remains conditional on prompts, model versions, sampling settings, backend adapters, and dataset contamination; EvalScope does not make those variables disappear. Agent evaluation can also require Docker and substantial model/API spend, while the dashboard is not a substitute for a production telemetry system or a carefully curated domain test set.

## Integration Patterns

Run EvalScope from a pinned environment in CI or a scheduled benchmark worker, store its reports with the model and prompt revision, and feed selected failures into a team-owned regression dataset. Pair it with an inference gateway for endpoint routing and with tracing when you need live request-level evidence beyond offline runs.

## Buzz & Reception

3,105 GitHub stars verified during the 2026-07-19 discovery sweep; ModelScope community project with active benchmark and dashboard development.

## Resources

- [Documentation](https://evalscope.readthedocs.io/en/latest/)
- [GitHub](https://github.com/modelscope/evalscope)
- [Visualization guide](https://evalscope.readthedocs.io/en/latest/get_started/visualization.html)
