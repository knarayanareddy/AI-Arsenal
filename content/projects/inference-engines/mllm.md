---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: UbiquitousLearning
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: mllm
name: mllm
artifact_type: framework
category: multimodal
subcategory: inference-engines
description: C++ multimodal LLM runtime for mobile and edge devices with vision and inference benchmarks
github_url: https://github.com/UbiquitousLearning/mllm
license: MIT
primary_language: C++
tags:
  - multimodal
  - vision
  - inference
  - efficiency
  - local
  - edge
maturity: beta
cost_model: open-source
github_stars: 1559
last_commit: '2026-06-26'
docs_url: https://github.com/UbiquitousLearning/mllm
phase: inference-engine
domain:
  - vision
  - multimodal
relation_to_stack:
  - deploy-as-is
  - fork-and-adapt
health_signals:
  - actively-maintained
  - community-driven

ecosystem_role:
  - A native multimodal inference candidate for mobile, embedded, and edge hardware with model runners, cache work, and performance benchmarks.
best_for:
  - You need to study or deploy supported multimodal models on mobile, Jetson, or other constrained devices.
  - You can build the C++ runtime and benchmark the exact model, processor, and accelerator target.
avoid_if:
  - You need a broad hosted model API or a mature server-side multimodal platform.
  - You cannot own native build, memory, delegate, and device-specific performance debugging.
enrichment_notes: Official repository, MIT license, C++ scope, and 2026-06-26 activity were reviewed on 2026-07-11. Model coverage and device performance remain draft.
---

## Overview

mllm is a C++ multimodal LLM runtime aimed at mobile and edge devices. Its engineering problem is different from server inference: memory capacity, native build constraints, accelerator delegates, KV/prefix cache behavior, and device thermal limits can matter more than aggregate GPU throughput.

## Why it's in the Arsenal

Edge multimodal inference is often evaluated with desktop hardware and then fails on the target device. mllm is included as a native-runtime reference for that constraint. The project should be compared with platform-specific mobile runtimes and model-serving libraries using the actual device, not only a desktop benchmark.

## Architecture

The repository contains a C++ runtime, model/operator implementations, multimodal algorithms, cache and scheduler work, platform build configurations, and benchmark assets. The runtime must translate model execution and visual inputs into device-appropriate memory and compute paths. The important boundaries are model conversion, tokenizer/vision preprocessing, KV or prefix cache allocation, backend selection, and device-specific fallback behavior.

## Ecosystem Position

mllm sits below multimodal applications and above mobile/edge hardware. It overlaps with native inference engines and model-specific runtimes, while its value is the inspectable C++ path and device-oriented performance work. A team should compare supported models, memory use, build portability, and output parity rather than assuming server-side API compatibility.

## Getting Started

Choose one supported model and target device, build the minimal example, and record compiler, accelerator, model format, peak memory, first-token latency, throughput, and thermal behavior. Compare output against a trusted reference runtime before optimizing cache or delegate settings.

## Key Use Cases

- Local vision-language or multimodal inference on mobile and edge hardware.
- Native-runtime research into cache, scheduling, and device performance.

## Strengths

- Native C++ implementation exposes the device-level tradeoffs hidden by hosted APIs.
- MIT licensing and recent cache/build/performance work make it practical to inspect and adapt.

## Limitations

- Model and platform support is narrower than a server-side runtime ecosystem.
- Native builds and device-specific acceleration create a high debugging burden.
- Quality, memory, and latency must be tested on each target device and model combination.

## Relation to the Arsenal

mllm is an inference-engine project for constrained multimodal deployment. Pair it with model conversion checks, on-device evaluation, and a server fallback when device coverage is incomplete.

## Resources

- [Official source](https://github.com/UbiquitousLearning/mllm)
