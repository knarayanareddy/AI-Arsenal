---
id: "ml-engineer-role"
title: "ML Engineer — Role Overview"
entry_type: "guide"
section: "skills"
description: "Role overview mapping the ML Engineer job to the Arsenal's training, serving, and efficiency content"
tags:
  - fine-tuning
  - training
  - inference
  - quantization
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

The ML Engineer in an LLM organization owns the model side: fine-tuning and adaptation, quantization, serving performance, and the infrastructure that keeps inference fast and affordable. This page routes that job to the Arsenal's training, efficiency, and serving content.

## Why It's in the Arsenal

The role is shifting: classical ML engineers increasingly maintain and serve foundation models rather than train models from scratch. The Arsenal's bridge path and core concepts map exactly that transition.

## Key Features

- Maps the role to the ML-to-AI bridge learning path plus model-side core concepts.
- Routes serving decisions to cataloged inference engines and benchmark-driven tips.
- Separates the tune-vs-retrieve decision so effort lands on the right lever.

## Architecture / How It Works

ML Engineers own the model layer of the stack: adaptation (SFT/LoRA), compression (quantization), and serving (batching, caching, engines). Application-layer concerns (prompts, RAG, agents) belong to the AI Engineer role; the interface between the two is evals and serving SLOs.

## Getting Started

1. **Serve a quantized model** — stand up [vLLM](../../projects/inference-engines/vllm.md) or [Ollama](../../projects/inference-engines/ollama.md) with an int4 model, benchmarking per [Inference Optimization](../core-concepts/inference-optimization.md).
2. **Run a pilot fine-tune** — QLoRA on a small open model following [Fine-Tuning Methods](../core-concepts/fine-tuning-methods.md), with an eval set built first.
3. **Prove the decision** — compare the tuned model against a prompted baseline using [Evaluation Methodology](../core-concepts/evaluation-methodology.md) and the [RAG vs Fine-Tuning](../../architectures/system-design/rag-vs-fine-tuning.md) framing.

## Use Cases

1. **Scenario**: A classical ML engineer moving onto an LLM platform team.
2. **Scenario**: Owning self-hosted inference cost and latency SLOs.
3. **Scenario**: Deciding whether a task needs fine-tuning, retrieval, or a bigger model.

## Strengths

- Focuses the role on the model-side levers it actually controls.
- Every milestone links to a canonical entry or build example.
- Bridges classical ML skills rather than discarding them.

## Limitations / When NOT to Use

- Not a pretraining curriculum — the Arsenal targets applied engineering, not lab-scale training.
- Hardware-specific serving numbers age fast; benchmark on your own stack.

## Integration Patterns

- Start with the [ML Engineer bridge learning path](../learning-paths/ml-engineer.md).
- Deepen the model side with [Quantization](../core-concepts/quantization.md), [Fine-Tuning Methods](../core-concepts/fine-tuning-methods.md), and [Alignment & RLHF](../core-concepts/alignment-and-rlhf.md).
- Choose serving infrastructure via [choose a deployment target](../../architectures/serving-patterns/choose-deployment-target.md).

## Resources

- [ML Engineer learning path](../learning-paths/ml-engineer.md)
- [Inference Optimization](../core-concepts/inference-optimization.md)
- [LoRA paper](../../research/training-and-alignment/hu-2021-lora.md)
- [Local-first reference stack](../../architectures/reference-stacks/local-first.md)
- [Tools for fine-tuning](../../tools/by-job/fine-tuning.md)

## Buzz & Reception

Role-based routing is evergreen; review quarterly as the learning paths and tool landscape change.

---
*Last reviewed: 2026-07-07 by @maintainer*
