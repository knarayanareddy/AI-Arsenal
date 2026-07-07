---
id: "inference-optimization"
title: "Inference Optimization"
entry_type: "guide"
section: "skills"
description: "Conceptual guide to LLM serving performance: batching, KV cache, speculative decoding, and latency metrics"
tags:
  - inference
  - batching
  - caching
  - streaming
  - efficiency
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

Inference optimization is the discipline of making LLM serving fast and cheap. The core insight: LLM decoding is memory-bandwidth-bound, not compute-bound, so most wins come from batching requests, reusing the KV cache, and reducing wasted decode steps — not from faster GPUs.

## Why It's in the Arsenal

Serving costs and latency budgets decide which AI features are viable. A shared vocabulary (prefill vs decode, TTFT vs TPOT, continuous batching) lets engineers reason about performance instead of cargo-culting engine flags.

## Key Features

### Core Concepts

- Two phases: prefill (process the prompt, compute-bound, sets time-to-first-token) and decode (generate tokens one by one, bandwidth-bound, sets per-token latency).
- Continuous batching interleaves many requests through the GPU and is the single biggest throughput multiplier — it is why vLLM-class engines dominate naive serving.
- PagedAttention-style KV-cache management avoids memory fragmentation, allowing larger effective batch sizes.
- Prefix/prompt caching skips prefill for shared prompt prefixes — order prompts so stable content comes first.
- Speculative decoding drafts tokens with a small model and verifies with the large one, cutting latency without quality loss.

### Key Metrics

1. TTFT (time to first token) — user-perceived responsiveness; dominated by queue time + prefill.
2. TPOT (time per output token) — streaming smoothness; dominated by decode bandwidth.
3. Throughput (tokens/sec across the fleet) — cost; traded against tail latency via batch size.
4. Queue time — measure it separately or capacity problems masquerade as model slowness.

## Architecture / How It Works

Each decode step reads all model weights from GPU memory to produce one token per sequence. Batching amortizes that weight traffic across sequences, converting a bandwidth-bound workload toward a compute-bound one. Everything else — quantization, cache reuse, speculative decoding — reduces bytes moved or steps taken.

## Getting Started

```text
Optimization order (do not skip ahead):
1. Measure TTFT / TPOT / queue time with production-shaped inputs
2. Use a real serving engine (vLLM, SGLang, TGI) with continuous batching
3. Enable prefix caching; restructure prompts for cache hits
4. Quantize (int8 → int4 with quality tests)
5. Tune batch size against tail latency
6. Add speculative decoding for latency-critical paths
```

## Use Cases

1. **Scenario**: A chat feature whose first-token latency is driving users away
2. **Scenario**: Cutting a self-hosted inference bill that scales linearly with traffic
3. **Scenario**: Separating an offline batch workload from latency-sensitive chat serving

## Strengths

- Framework-agnostic mental model — applies to any engine or provider
- Metrics-first approach prevents optimizing the wrong bottleneck
- Compounding levers: batching x caching x quantization multiply

## Limitations / When NOT to Use

- Provider-hosted APIs expose few of these knobs — there, prompt structure and model choice are your levers
- Micro-optimizing before product-market fit wastes time; a managed API is fine early
- Benchmark numbers do not transfer across hardware, context lengths, or batch shapes

## Integration Patterns

- Serve with [vLLM](../../projects/inference-engines/vllm.md), [SGLang](../../projects/inference-engines/sglang.md), or [text-generation-inference](../../projects/inference-engines/text-generation-inference.md).
- Apply [tune batch size against tail latency](../../tips-and-tricks/inference-and-serving/tune-batch-size-against-tail-latency.md) and [measure queue time separately](../../tips-and-tricks/cost-and-performance/measure-queue-time-separately.md).
- Read [speculative decoding](../../research/inference-and-efficiency/leviathan-2022-speculative-decoding.md) for the primary source.

## Resources

- [Speculative decoding paper](../../research/inference-and-efficiency/leviathan-2022-speculative-decoding.md)
- [Measure first token latency](../../tips-and-tricks/cost-and-performance/measure-first-token-latency.md)
- [Stream user-facing responses](../../tips-and-tricks/inference-and-serving/stream-user-facing-responses.md)
- [Quantization](./quantization.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-07-07 by @maintainer*
