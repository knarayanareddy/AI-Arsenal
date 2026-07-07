---
id: "quantization"
title: "Quantization"
entry_type: "guide"
section: "skills"
description: "Conceptual guide to model quantization: formats, quality tradeoffs, and when to use int8 vs int4"
tags:
  - quantization
  - inference
  - efficiency
  - local
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

Quantization stores model weights (and sometimes activations) at lower precision — 8-bit, 4-bit, or below — cutting memory and often increasing speed at some cost in quality. It is the single biggest lever for running capable models on modest hardware.

## Why It's in the Arsenal

Whether a model fits on your GPU, your laptop, or your budget is usually a quantization question. Engineers who understand the formats and their quality cliffs make deployment decisions with evidence instead of folklore.

## Key Features

### Core Concepts

- Memory rule of thumb: fp16 ≈ 2 bytes/parameter, int8 ≈ 1, int4 ≈ 0.5 — a 70B model goes from ~140GB to ~35GB at int4.
- int8 is generally near-lossless for inference; int4 is usually acceptable but task-dependent — degradation concentrates in reasoning, math, and edge cases.
- Post-training quantization (GPTQ, AWQ, GGUF k-quants) needs no retraining; quantization-aware approaches recover more quality at more effort.
- Format follows runtime: GGUF for llama.cpp/Ollama, GPTQ/AWQ for GPU servers like vLLM, plus provider-specific formats.
- KV-cache quantization is a separate lever for long-context memory savings.

### Practical Workflow

1. Start with the smallest quantized model that might work, not the largest that fits.
2. Prefer int8 when quality is critical and memory allows; test int4 before committing to it.
3. Evaluate the quantized model on YOUR task evals — perplexity deltas do not predict task regressions.
4. Benchmark on the actual deployment hardware; speedups vary widely by kernel support.

## Architecture / How It Works

Quantization maps float weights onto a small integer grid with per-group scale factors. Better methods (GPTQ's error-compensating rounding, AWQ's activation-aware scaling) choose the mapping to minimize output error rather than weight error, which is why they beat naive rounding at 4-bit.

## Getting Started

```text
Fits-in-memory estimate:
weights_gb ≈ params_b x bytes_per_param
+ kv_cache (grows with context length and batch)
+ runtime overhead (~1-2 GB)
Example: 8B model at int4 ≈ 4 GB weights → runs on a 8 GB GPU or M-series laptop
```

## Use Cases

1. **Scenario**: Running a local model for sensitive-data prototyping on developer laptops
2. **Scenario**: Halving GPU count for a self-hosted inference deployment
3. **Scenario**: Choosing between a small fp16 model and a larger int4 model at equal memory

## Strengths

- Order-of-magnitude memory savings with mature, well-tooled methods
- Enables local and edge deployment classes that are otherwise impossible
- Composable with other efficiency levers (batching, speculative decoding)

## Limitations / When NOT to Use

- Quality loss is task-dependent and invisible without your own evals
- Aggressive quantization (3-bit and below) degrades reasoning disproportionately
- Not a substitute for choosing the right model size in the first place

## Integration Patterns

- Follow [choose int4 only after quality tests](../../tips-and-tricks/inference-and-serving/choose-int4-only-after-quality-tests.md) and [use int8 for safer compression](../../tips-and-tricks/inference-and-serving/use-int8-for-safer-compression.md).
- Serve quantized models with [llama.cpp](../../projects/inference-engines/llama-cpp.md), [Ollama](../../projects/inference-engines/ollama.md), or [vLLM](../../projects/inference-engines/vllm.md).
- Read [GPTQ](../../research/inference-and-efficiency/frantar-2022-gptq.md) for the method that started modern 4-bit inference.

## Resources

- [GPTQ paper](../../research/inference-and-efficiency/frantar-2022-gptq.md)
- [Start with a smaller quantized model](../../tips-and-tricks/inference-and-serving/start-with-a-smaller-quantized-model.md)
- [Prefer GGUF for llama.cpp workflows](../../tips-and-tricks/inference-and-serving/prefer-gguf-for-llama-cpp-workflows.md)
- [Inference Optimization](./inference-optimization.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-07-07 by @maintainer*
