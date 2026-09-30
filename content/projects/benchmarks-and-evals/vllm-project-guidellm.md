---
id: vllm-project-guidellm
name: "guidellm"
version_tracked: null
artifact_type: tool
category: evaluation
subcategory: evaluation
description: "Benchmark driver that sweeps concurrency against a live endpoint and reports the first-token and inter-token latency a real user waits on"
github_url: "https://github.com/vllm-project/guidellm"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "vllm-project"
tags: [benchmark, efficiency, inference, evaluation]
maturity: production
cost_model: open-source
github_stars: 1652
github_stars_last_30d: 0
trending_score: 26
last_commit: "2026-09-28"
docs_url: "https://vllm-project.github.io/guidellm/"
demo_url: null
paper_url: null
paper_id: null
phase: benchmark-and-eval
domain: [language]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Serving-oriented inference benchmark that measures time-to-first-token and inter-token latency under realistic concurrency, rather than offline tokens-per-second."
best_for:
  - "You are choosing between serving configurations and need to know which one improves time to first token at your real concurrency."
  - "You are sizing a deployment and need the point on the latency-throughput curve where your user-facing SLO breaks."
  - "You want to compare model or quantization choices under a request pattern rather than a synthetic fixed-length prompt."
avoid_if:
  - "You need output quality measured, since this measures serving performance and says nothing about what the model produced."
  - "You are benchmarking training throughput or a training kernel, where this is the wrong tool entirely."
  - "You have a single prompt and no concurrency, since the interesting behaviour only appears once requests overlap."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (1652), Apache-2.0 license, last commit 2026-09-28, and primary language Python were read from the GitHub API; the topics array is empty upstream. Time-to-first-token and inter-token latency metrics, concurrency sweeping, request profiles, OpenAI-compatible targeting, and offline mode come from the official README and docs; no server was started and no benchmark was run here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/vllm-project/guidellm", "date": "2026-09-28", "description": "1,652 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

guidellm is a benchmarking tool from the vLLM project aimed at evaluating LLM deployments against real serving expectations. Where a synthetic throughput benchmark sends fixed-length prompts at a server as fast as it can and reports tokens per second, guidellm is built around a request profile: it drives a server with a dataset of prompts at a specified concurrency, for a specified number of seconds, and reports the metrics that describe an interactive service. The headline numbers are mean time to first token and mean inter-token latency, reported alongside the throughput at each concurrency level, plus a latency distribution rather than just an average. It supports OpenAI-compatible HTTP servers and offline execution against a local model, and it can sweep concurrency to trace the full curve, which is what makes it useful for a capacity decision rather than a marketing number.

## Why it's in the Arsenal

The decision it resolves is which configuration to deploy under a latency target. Average throughput hides the distribution: a server that is fast on average can have a p99 that makes a product feel broken, and a configuration with lower throughput may be the right one if it holds first-token latency under load. guidellm forces you to state a request profile and a concurrency level, then reads the curve, so the choice is made against the metric your users experience instead of a throughput figure that optimizes for batch jobs. It also exposes the shape of the degradation, because sweeping concurrency shows where the server saturates and where queuing delay starts to dominate, and that point is usually not where a single-load benchmark suggested it was.

## Architecture

The tool runs a client-side request generator against a target, which is either an OpenAI-compatible HTTP endpoint or an in-process model runner for offline mode. The generator reads a dataset of prompts, applies a sampling strategy to produce a request mix, and issues requests with a configurable number of concurrent workers, recording per-request start time, first token arrival, and inter-token arrival timestamps. On completion it aggregates into time to first token, inter-token latency, output tokens per second, request success rate, and percentile distributions, and it can repeat across a concurrency sweep to produce the curve. Results are written to a JSON output file with a schema, so a run can be compared to another or fed into a dashboard, and a performance profile can be supplied to control prompt and output length distributions rather than using whatever a dataset happens to contain.

## Ecosystem Position

guidellm is a rather than an alternative to a general load-testing tool such as k6 or Locust: it speaks the OpenAI streaming protocol, understands per-token arrival times, and knows what inter-token latency means, which a generic HTTP generator cannot measure. It overlaps with the vLLM project's own benchmark scripts, which are engine-specific and therefore not portable to SGLang or a hosted endpoint, whereas this drives anything with an OpenAI-compatible interface. It is a complement to the engines in the inference-engine phase, which it measures rather than replaces, and to the observability phase, which is where the same numbers come from in production. The nearest competitor for a quick sanity check is a hand-written concurrency script, which produces numbers you cannot compare to anything later.

## Getting Started

Install and benchmark a served endpoint at a fixed concurrency:

```bash
pip install guidellm
```

```bash
# benchmark a running OpenAI-compatible server
guidellm benchmark \
    --model meta-llama/Llama-3.1-8B-Instruct \
    --endpoint http://localhost:8000/v1/completions \
    --dataset sharegpt \
    --rate 64 \
    --max-concurrency 32 \
    --output results.json
```

```bash
# sweep concurrency to trace the latency-throughput curve
guidellm benchmark --model my-model --endpoint http://localhost:8000/v1/completions \
    --data sharegpt.txt --profile sweep --rate-guess 64
```

```python
# offline mode: no server, same metrics, useful for a regression check on a code change
from guidellm.benchmark import benchmark, modes

result = benchmark(
    "meta-llama/Llama-3.1-8B-Instruct",
    mode=modes.OFFLINE,
    prompt="Summarize the following in one sentence:\n{prompt}",
    prompt_seq_len=512,
    output_seq_len=128,
    run_size=2000,
)
print(result.output.metrics.mean_time_to_first_token)
```

```bash
# the performance profile controls the request mix so results are comparable across runs
ls profiles/
guidellm run --profile llama-3.1-8b-instruct.prompt --data sharegpt.txt --endpoint $URL
```

```python
import json
# inspect the distribution, not just the mean
r = json.load(open("results.json"))
print(r["mean_time_to_first_token_ms"], r["output_tokens_per_second"])
```

## Key Use Cases

1. Choosing a configuration, such as tensor parallelism, quantization, or a different engine build, by measured first-token latency at your concurrency.
2. Capacity planning, where the concurrency sweep shows the saturation point and the queuing delay that appears before it.
3. A performance regression check in CI, since offline mode gives the same metrics without a server and catches an accidental slowdown in a change.

## Strengths

- Measures time to first token and inter-token latency under concurrency, which is what an interactive user experiences.
- Concurrency sweeps produce the full latency-throughput curve, so saturation and queuing delay are visible rather than inferred.
- Works against any OpenAI-compatible endpoint, so it benchmarks whatever you are actually running rather than a reference implementation.
- Emits a structured JSON result, so runs are diffable and a regression can be caught by comparing files.

## Limitations

It measures serving performance and says nothing about output quality, so a fast configuration that produces worse answers looks identical to a good one, and the two must be evaluated separately. Results are only as realistic as the request profile, and a synthetic prompt-length distribution is a common source of optimistic numbers that do not transfer to real traffic. Latency is highly sensitive to batch size, KV-cache pressure, and the client itself, so a number measured on a different machine or a different client concurrency is not comparable, and warm-up effects have to be handled or the first requests distort the mean. The original vLLM project has moved on and versions of the tool have renamed flags and output schemas, so a script written against one release breaks on another. It also adds client load that competes with the server for the same machine when you benchmark a local deployment, which biases small-scale results.

## Relation to the Arsenal

This is a benchmarks-and-evals phase entry and is the serving-performance counterpart to the evaluation and benchmark entries in the same phase, which measure quality rather than latency. It is designed to be pointed at the engines in the inference-engine phase, so a configuration change in vLLM or SGLang is measured here rather than argued about. Its metrics are the ones a capacity decision needs before the agent-systems and serving phases go live, and the tracker entries in the frameworks phase are where a series of these runs should be recorded for comparison over time.

## Resources

- [guidellm GitHub repository](https://github.com/vllm-project/guidellm)
- [guidellm documentation](https://vllm-project.github.io/guidellm/)
- [vLLM benchmarking documentation](https://docs.vllm.ai/en/latest/benchmarking/cli.html)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (1,652 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
