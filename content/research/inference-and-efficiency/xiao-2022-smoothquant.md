---
id: xiao-2022-smoothquant
title: "SmoothQuant: Accurate and Efficient Post-Training Quantization for Large Language Models"
phase: inference-and-efficiency
venue: icml
year: 2022
authors:
  - "Xiao, G."
  - "Lin, J."
  - "Seznec, M."
  - "Demouth, J."
  - "Han, S."
arxiv_id: "2211.10438"
arxiv_url: "https://arxiv.org/abs/2211.10438"
pdf_url: "https://arxiv.org/pdf/2211.10438"
code_url: "https://github.com/mit-han-lab/smoothquant"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 0

tldr: "Enables W8A8 (8-bit weight and activation) quantization of LLMs by migrating the quantization difficulty from hard-to-quantize activation outliers into the weights via a per-channel scaling, so both can use simple integer quantization"
key_contribution: "A training-free method that rescales activations and weights by a per-channel factor to 'smooth' activation outliers -- the specific obstacle to low-bit activation quantization in LLMs -- allowing accurate 8-bit weight+activation inference with hardware-friendly integer kernels and near-lossless accuracy"

builds_on: []
implemented_in: []

tags:
  - llm
  - quantization
  - efficiency
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

SmoothQuant is a post-training quantization method that makes 8-bit activation *and* weight (W8A8) inference work for large language models. The blocker for activation quantization in LLMs is a few extreme outlier channels; SmoothQuant mathematically shifts that difficulty from activations into weights via a per-channel scaling, so both tensors become easy to quantize with plain integer arithmetic.

## Why it's in the Arsenal

- Activation quantization (not just weights) is what unlocks integer matmul throughput on hardware, and outliers were the reason it failed for LLMs. SmoothQuant is the canonical fix and is integrated into mainstream inference stacks.
- `practical_applicability: high`: it is training-free, widely implemented, and directly reduces LLM serving memory and latency — a technique practitioners actually deploy.

## Core Contribution

Weight-only quantization (like GPTQ/AWQ) is comparatively easy; quantizing *activations* to 8-bit fails because certain channels have large-magnitude outliers that wreck the quantization range. SmoothQuant's contribution is an equivalence transformation: scale down the outlier-heavy activation channels by a per-channel factor and scale the corresponding weight channels up by its inverse, leaving the math unchanged but redistributing the dynamic range. Since weights quantize cleanly, both W and A can now use simple 8-bit integer quantization — enabling INT8 matmul kernels.

## Key Results

- Achieved near-lossless W8A8 quantization on large models (e.g. OPT/BLOOM/LLaMA-scale), with measured latency and memory reductions from integer inference (see the paper for accuracy/throughput tables)
- Showed the migration-strength hyperparameter trades activation vs weight quantization difficulty smoothly

## Methodology

Offline, compute per-channel activation scales from a small calibration set, fold the inverse scale into the preceding weights (a mathematically equivalent rewrite), then quantize weights and activations to INT8 and run with integer GEMM kernels. No retraining is required.

## Practical Applicability

Use SmoothQuant when you need higher serving throughput and lower memory than FP16 and can accept 8-bit, especially where activation quantization (for INT8 compute) matters, not just weight compression. It composes with standard serving engines; the main practical step is a good calibration set and choosing the migration strength. For 4-bit weight-only regimes, pair with or compare against GPTQ/AWQ.

## Limitations & Critiques

It targets 8-bit; pushing activations to 4-bit remains much harder and is outside its sweet spot. Results depend on calibration data representativeness, and the benefit is largest on hardware with fast INT8 paths. As a post-training method it does not recover accuracy lost to very aggressive quantization the way quantization-aware training can.

## Reproductions & Follow-up Work

Official code is released (mit-han-lab/smoothquant) and the method is integrated into widely used inference stacks and quantization toolkits, making it thoroughly reproduced. It sits alongside `frantar-2022-gptq`, `lin-2023-awq` (weight-only quantization) and `dettmers-2023-qlora` as core LLM-compression references.

## Relation to the Arsenal

Read with `frantar-2022-gptq` and `lin-2023-awq` (this folder) — SmoothQuant covers the weight+activation case they complement. Directly relevant to inference engines in the projects catalog (`llama-cpp`, `vllm`, `tensorrt-llm`) that implement quantized serving.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2211.10438)
- [arXiv](https://arxiv.org/abs/2211.10438)
- [Official Code](https://github.com/mit-han-lab/smoothquant)
