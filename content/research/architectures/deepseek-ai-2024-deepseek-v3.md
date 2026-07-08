---
id: deepseek-ai-2024-deepseek-v3
title: "DeepSeek-V3 Technical Report"
phase: architectures
venue: technical-report
year: 2024
authors:
  - "DeepSeek-AI"
  - "Liu, A."
  - "Feng, B."
  - "et al."
arxiv_id: "2412.19437"
arxiv_url: "https://arxiv.org/abs/2412.19437"
pdf_url: "https://arxiv.org/pdf/2412.19437"
code_url: "https://github.com/deepseek-ai/DeepSeek-V3"
venue_url: null

practical_applicability: high
reproduction_status: code-available
result_status: current
has_code: true
citation_count_approx: 3000

tldr: "DeepSeek-V3: a 671B-parameter MoE (37B active) trained for a reported ~$5.6M of GPU time that matched frontier closed models — proof that systems co-design (MLA, FP8 training, aux-loss-free MoE routing, MTP) collapses the frontier cost curve"
key_contribution: "Demonstrated frontier-class capability at an order-of-magnitude lower reported training cost via co-designed innovations: Multi-head Latent Attention (KV-cache compression), auxiliary-loss-free MoE load balancing, multi-token prediction, and validated large-scale FP8 mixed-precision training — with open weights and an unusually detailed systems writeup"

builds_on:
  - "jiang-2024-mixtral"
  - "hoffmann-2022-chinchilla"

tags:
  - "llm"
  - "training"
  - "efficiency"
  - "sota"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

DeepSeek-V3 is the systems paper of the current era: a 671B-total, 37B-active mixture-of-experts model trained on 14.8T tokens for a reported 2.788M H800 GPU-hours (~$5.6M at rental prices) that reached parity with frontier closed models on most benchmarks. The result reset expectations about what frontier training costs — and the report, unusually, explains *how* in enough engineering detail (attention design, routing, precision, parallelism, even hardware suggestions) to be studied rather than merely cited.

## Why it's in the Arsenal

- It is the strongest public evidence that frontier capability is a systems-engineering problem, not only a budget problem — the reference point for every "efficient frontier training" discussion and the base model beneath R1's reasoning breakthrough
- The individual techniques (MLA, aux-loss-free balancing, FP8 training, MTP) are each independently influential and now appear across open-model designs and inference stacks

## Core Contribution

Four co-designed innovations: Multi-head Latent Attention compresses the KV cache into low-rank latents, cutting inference memory dramatically versus GQA at comparable quality; auxiliary-loss-free load balancing steers MoE routing with per-expert bias adjustments instead of a balance loss that degrades the main objective; multi-token prediction densifies the training signal (and enables speculative decoding); and validated FP8 mixed-precision training at unprecedented scale, halving compute cost with fine-grained quantization and higher-precision accumulation. DualPipe parallelism hides most communication behind computation.

## Key Results

- Matched or approached GPT-4o/Claude-3.5-class results across MMLU, coding, and reasoning benchmarks, with standout math performance — the strongest open-weight base model at release (2024)
- Full training run: 2.788M H800 GPU-hours (~$5.57M reported GPU cost), with no unrecoverable loss spikes or rollbacks reported across 14.8T tokens (2024)
- Remarkably stable training claimed for FP8 at this scale — the first public validation of FP8 pretraining on a frontier-size run (2024)

## Methodology

Architecture: 61-layer MoE with 256 routed + 1 shared experts per layer (8 active), MLA attention, trained on 14.8T curated tokens, then context-extended to 128K and post-trained (SFT + GRPO-based RL, including distillation from R1-series reasoning traces). The report's methodology sections read as an engineering playbook: precision recipes per operation class, pipeline schedule design, and expert-parallel deployment strategy for inference.

## Practical Applicability

High on two axes: the open weights are directly deployable (served widely, including on vLLM/SGLang with MLA and MTP support upstreamed by the inference community), and the techniques transfer — MLA-style cache compression and aux-loss-free balancing have entered the general design vocabulary. The reported cost figure also recalibrated build-vs-API planning discussions, though the number needs its caveats (below).

## Limitations & Critiques

The $5.6M figure covers the final training run's GPU rental only — excluding research, ablations, failed runs, data acquisition, and staff — and was widely misread as total cost; treat it as a lower bound on marginal cost, not replication cost. Training data composition is only coarsely described. The 671B parameter footprint makes self-hosting genuinely hard despite 37B activation (multi-node deployment required), and the report's benchmark contamination controls are self-reported.

## Reproductions & Follow-up Work

Weights and inference code are open (training code/data are not); the architecture has been validated externally through widespread deployment and through follow-on models building on it — most notably `deepseek-ai-2025-r1`, which trains reasoning on top of the V3 base. MLA has been adopted and studied independently, FP8 training recipes have propagated to other labs, and the release materially shifted the open-vs-closed capability conversation.

## Relation to the Arsenal

The architectural substrate of `deepseek-ai-2025-r1` (training-and-alignment/) and the current endpoint of the MoE lineage from `jiang-2024-mixtral` (architectures/). Its inference innovations connect to the serving entries: `vllm` and `sglang` (projects/inference-engines/) both implement MLA/MTP support that this model motivated.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2412.19437)
- [arXiv](https://arxiv.org/abs/2412.19437)
- [Code + weights (deepseek-ai/DeepSeek-V3)](https://github.com/deepseek-ai/DeepSeek-V3)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
