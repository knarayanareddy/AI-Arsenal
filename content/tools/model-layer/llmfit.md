---
id: llmfit
name: llmfit
type: tool
job: [fine-tuning]
description: "Rust CLI and TUI that profiles your hardware and ranks open-weight models by fit, speed and context for local use"
url: "https://github.com/AlexsJones/llmfit"
cost_model: open-source
pricing_detail: "Free and self-hostable; no paid tier required"
tags: [edge, quantization, local, evaluation, inference]
maturity: beta
stack: [rust]
free_tier: true
self_hostable: true
open_source: true
docs_url: "https://github.com/AlexsJones/llmfit"
github_url: "https://github.com/AlexsJones/llmfit"
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
verdict: recommended
verdict_rationale: "Turns an undifferentiated model list into a ranked shortlist sized to the exact CPU, RAM, VRAM and unified memory you have."
status: active
phase: model-layer
audience: [prototype]
best_when:
  - "You are about to download a model and need to know whether it will actually fit your VRAM or unified memory before spending an hour on the transfer."
  - "You have mixed hardware, a workstation with several GPUs, or Apple Silicon with a shared memory pool, and you need a planner that understands the difference."
  - "You are choosing between GGUF, AWQ, GPTQ and EXL2 quantizations and want the memory and throughput tradeoff laid out per option."
avoid_when:
  - "You are selecting a model for a production cluster where a load test, not an estimate, is what determines capacity."
  - "You need a quality ranking that reflects your own evaluation data, because fit and speed are its own signals and quality is a coarse dimension taken from published sources."
  - "You cannot tolerate a planning step that depends on a bundled model catalog that goes stale as new releases land."
---

## Overview

llmfit is a single Rust binary, published on crates.io and MIT licensed, that answers a narrow question: which open-weight models can this machine run well. It auto-detects CPU cores, system RAM, discrete and integrated GPUs, VRAM, and the unified-memory architecture used by Apple Silicon, covering NVIDIA CUDA, Apple Silicon, AMD ROCm and Intel OneAPI. Its compatibility engine takes parameter counts, context lengths and quantization format, including GGUF, AWQ, GPTQ and EXL2, and projects a memory footprint and tokens-per-second estimate for each. Output is available three ways: a zero-dependency terminal interface, a classic non-interactive CLI mode, and a feature-rich web dashboard, plus a REST API at /api/v1/system and /api/v1/models for wiring into deployment automation. It also understands multi-GPU setups and mixture-of-experts architectures, and it names the local runtimes it plans for, including Ollama, llama.cpp, MLX, Docker Model Runner and LM Studio. A newer benchmarking flow measures real tokens per second on your own machine and files the results back as a pull request from the TUI.

## Why It's in the Arsenal

Model selection is usually argued in the abstract, in units of parameter count, when the real constraint is a specific number of gigabytes on a specific interconnect. A 70B model is either obviously fine or obviously impossible until you account for quantization, the KV cache a long context demands, and whether the memory is discrete VRAM or a shared pool. That arithmetic is exactly what goes wrong, and it goes wrong silently right before a multi-gigabyte download. llmfit moves the check to the front of the process and reduces it to a single command. The recurring decision it removes is whether to discover a model's fit by trial and error, having already spent the disk and the bandwidth to find out.

## Key Features

- Vendor coverage is broad for a small binary, spanning NVIDIA CUDA, Apple Silicon unified memory, AMD ROCm and Intel OneAPI.
- Understands multiple quantization formats instead of assuming one memory model, so the same model gets four different realistic answers.
- Three output surfaces plus a REST API, so one analysis serves both a human at a terminal and a pipeline reading JSON.
- A measurement path that replaces its own estimates with your tok/s and then feeds the numbers back to everyone else.

## Architecture / How It Works

The tool is a compiled Rust crate with a detection layer and a projection layer. Detection probes CPU core counts, total and available system RAM, enumerates GPUs and their vendor-specific memory, and distinguishes unified memory architectures from discrete VRAM so the same model size means different things on an M-series Mac and a workstation card. The projection layer consumes a catalog of models with their parameter counts, context windows and available quantization variants, computes resident weight memory per quantization plus a KV cache allowance derived from the context length, and estimates throughput from the memory bandwidth of the detected accelerator and the arithmetic intensity of the chosen format. Scoring combines fit, speed, quality and context dimensions into a ranked table, and the TUI can simulate a different hardware profile before you commit to a download. A benchmark mode replaces the estimates with measured tokens per second, persisting runs locally first so results are yours before they are contributed upstream through a pull request.

## Getting Started

Install from crates.io or build from source, then run the default TUI. Non-interactive use is a flag away, and the same analysis is exposed over REST for automation.

```bash
cargo install llmfit
llmfit
```

```bash
# non-interactive mode, and the API surface for pipelines
llmfit --no-ui
curl -s http://localhost:8080/api/v1/system | jq
```

The README documents a step-by-step benchmarking guide under docs/benchmarking.md if you want to replace the estimates with measured tokens per second from your own machine and contribute them back to the project.

## Use Cases

1. Pre-download triage: decide which GGUF or AWQ variant of a model will fit in the VRAM you actually have before committing to a large transfer.
2. Hardware planning: simulate another machine's memory and accelerator profile to decide whether a planned upgrade changes which models are runnable.
3. Pipeline integration: call the REST API from deployment automation so a serving stack can size model selection to the node it lands on.

## Strengths

It overlaps with the local-runtime tooling in the catalogue, notably ollama, llama-cpp, lmdeploy and MLX-based serving, but it is not a runtime: it tells you which model and quantization to hand to one of them. Compared with an LLM leaderboard it answers a different question, since a leaderboard ranks models in the abstract and llmfit ranks them against a machine you can name. It is an alternative to hand-rolling a spreadsheet of parameter counts and VRAM budgets, and it complements rather than duplicates the inference engines in content/projects/inference-engines, which are what will actually load the weights once the fit question is settled. Its own sister projects, covering agent management on Kubernetes and a separate serving TUI, indicate where the author's ambition sits: planning first, serving second.

## Limitations / When NOT to Use

Every number except the hardware detection is a projection. Throughput estimates come from memory bandwidth and arithmetic intensity rather than from running the model on your card, and quantized kernels vary widely in real performance, so treat tokens per second as a planning aid rather than a benchmark. The quality dimension is derived from published sources rather than your own data, which means two models with equal fit and speed can be ranked on a signal you cannot tune. The catalog is bundled data that goes stale as new releases land, and unlike the model hubs it is not a live query against a registry. It plans for local runtimes rather than measuring them, so it cannot tell you that a particular engine is misconfigured for a particular model. Hardware detection is also least reliable exactly where setups are unusual, such as multi-GPU nodes with non-trivial topology or containers with cgroup memory limits.

## Integration Patterns

This is a model-layer tool, and its natural counterpart is the weight catalogue in content/projects/foundation-models: one says what exists, the other says what will run here. Its output feeds the serving entries in content/projects/inference-engines and the local runtimes, while content/tools/dx-and-tooling handles the surrounding developer loop rather than the hardware question. Where content/tools/serving-and-deployment deals with packaging and orchestration, llmfit is the pre-flight check that precedes it. Read it before the benchmarking entries in content/projects/benchmarks-and-evals if you want to move from estimated tok/s to measured tok/s on your specific node.

## Resources

- [Repository and usage notes](https://github.com/AlexsJones/llmfit)
- [crates.io package llmfit](https://crates.io/crates/llmfit)
- [Benchmarking guide](https://github.com/AlexsJones/llmfit/blob/main/docs/benchmarking.md)

## Buzz & Reception

Turns an undifferentiated model list into a ranked shortlist sized to the exact CPU, RAM, VRAM and unified memory you have.

