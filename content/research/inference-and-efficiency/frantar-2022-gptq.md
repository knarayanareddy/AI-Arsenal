---
id: frantar-2022-gptq
title: "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers"
phase: inference-and-efficiency
venue: iclr
year: 2022
authors:
  - "Frantar, E."
  - "Ashkboos, S."
  - "Hoefler, T."
  - "Alistarh, D."
arxiv_id: "2210.17323"
arxiv_url: "https://arxiv.org/abs/2210.17323"
pdf_url: "https://arxiv.org/pdf/2210.17323"
code_url: "https://github.com/IST-DASLab/gptq"
venue_url: "https://openreview.net/forum?id=tcbBPnfwxS"

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 2000

tldr: "Showed one-shot post-training quantization to 3-4 bits is feasible for 100B+ param models in hours with minimal accuracy loss -- reach for GPTQ (or AWQ) as a default quantization option before more disruptive approaches"
key_contribution: "Demonstrated a layer-wise post-training quantization method using approximate second-order (Hessian) information that compresses generative Transformers to 3-4 bits per weight, running on models with hundreds of billions of parameters in a few GPU-hours, without significant accuracy loss"

builds_on:
  - vaswani-2017-attention
implemented_in: []

tags:
  - efficiency
  - quantization
  - inference
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper showed that one-shot post-training quantization to 3-4 bits per weight is feasible for generative Transformer models with hundreds of billions of parameters, running in only a few GPU-hours with minimal accuracy loss, at a time when prior quantization methods either couldn't scale to that size or lost significant accuracy at that compression level. This remains current practice: GPTQ is still one of the default post-training quantization methods in production use today, alongside AWQ as its most common alternative — over 5,000 GPTQ-quantized models are hosted on Hugging Face as of recent counts, and the technique is actively maintained through successor tooling (AutoGPTQ, GPTQModel).

## Why it's in the Arsenal

- GPTQ is one of the two most commonly used post-training quantization methods in production today (alongside AWQ), and understanding its layer-wise, Hessian-informed approach is directly useful for deciding how to compress a model for deployment on memory-constrained hardware.
- `practical_applicability: high` is a direct, non-inflated classification: this is a technique engineers actually reach for when deploying large models on limited hardware, not a theoretical result — it remains actively maintained and widely deployed rather than superseded.

## Core Contribution

Prior quantization approaches that reached low bit-widths (3-4 bits) either required expensive retraining (quantization-aware training) or degraded accuracy significantly when applied purely post-training. This paper's contribution is a layer-wise post-training quantization method that solves a per-layer weight-reconstruction problem using approximate second-order (Hessian) information from a small calibration dataset, building on prior Optimal Brain Quantization work but making it computationally efficient enough to run on generative models with hundreds of billions of parameters. In engineering terms: GPTQ lets you take an existing pretrained model and compress it to 3-4 bits per weight in a few hours on a single machine, with no additional training data beyond a small calibration set and no retraining loop — a dramatically lower-cost path to memory-efficient deployment than training a smaller model from scratch or doing quantization-aware training.

## Key Results

- Quantized OPT-175B and BLOOM-176B to 3-4 bits per parameter in approximately four GPU-hours, with minimal increase in perplexity — a notoriously sensitive metric for measuring quantization-induced quality loss (2022)
- More than doubled the compression ratio achievable relative to prior round-to-nearest (RTN) quantization baselines at similar accuracy levels on OPT models (2022)
- These specific perplexity numbers on OPT/BLOOM are 2022-era reference points; current practice compares GPTQ against its most common alternative, AWQ (Lin et al., 2023, MLSys Best Paper), rather than against the older RTN baselines this paper's own comparisons used — check current benchmarking work before treating this paper's specific numbers as the state of the art for a 2026-era model

## Methodology

GPTQ quantizes weights layer by layer: for each linear layer, given the layer's weight matrix and a small set of calibration inputs, it solves a reconstruction problem that minimizes the squared error introduced by quantization, using approximate second-order (Hessian) curvature information to decide the order in which weights are quantized and how to compensate remaining (not-yet-quantized) weights for the error introduced by already-quantized ones (paper Section 3, building on the paper's own prior Optimal Brain Quantization method). This is fundamentally a post-training, one-shot process — no gradient-based retraining loop over the full model is needed, only a lightweight calibration pass — which is what makes it computationally tractable at the scale of 100B+ parameter models, unlike quantization-aware training approaches that require a full retraining cycle.

## Practical Applicability

If you need to deploy a large model on memory-constrained hardware (a single GPU, an edge device, or simply to reduce serving costs) and cannot afford quantization-aware retraining, GPTQ is a direct, validated technique to compress the model to 3-4 bits with minimal accuracy loss in a few hours — this is not a niche technique, it is one of the two default choices (alongside AWQ) engineers reach for in this exact situation, and it's implemented in standard tooling (AutoGPTQ, GPTQModel, and Hugging Face's Transformers/Optimum integration) rather than requiring you to reimplement the paper yourself. If you have the option to choose between GPTQ and AWQ for a new project, current comparative literature suggests neither strictly dominates the other across all model families and tasks — evaluate both for your specific use case rather than assuming one is a strict upgrade.

## Limitations & Critiques

The paper's own scope is weight-only quantization; it does not address activation quantization, which some later methods (SmoothQuant, and aspects of AWQ) specifically target — meaning GPTQ alone may leave additional efficiency gains on the table for workloads where activation memory or compute, not just weight storage, is the bottleneck. GPTQ's per-layer sequential reconstruction process can be sensitive to the choice and size of the calibration dataset, a nuance the original paper's evaluation does not exhaustively explore across model families beyond OPT and BLOOM. AWQ (Lin et al., 2023) is a genuine competing alternative rather than a strict supersession — it earned a Best Paper award at MLSys and is now equally or more commonly used than GPTQ in some deployment contexts, meaning "GPTQ or AWQ" rather than "GPTQ, full stop" is the honest current recommendation. No independent, credible failed-replication challenge to GPTQ's own core empirical claims has been identified as of `last_reviewed: 2026-07-01`.

## Reproductions & Follow-up Work

GPTQ has been reproduced and integrated into standard production tooling extensively: AutoGPTQ was the original widely-used community implementation, since succeeded by GPTQModel (which explicitly documents supplanting AutoGPTQ and AutoAWQ for Hugging Face Transformers/Optimum/PEFT integration), and over 5,000 GPTQ-quantized transformer models are hosted on Hugging Face as of recent counts — a very large body of independent, real-world validation beyond the original paper's own benchmarks. AWQ (Lin et al., 2023) is the most significant related follow-up, proposing an activation-aware alternative quantization approach that is now commonly compared against and used alongside GPTQ rather than having replaced it outright.

## Relation to the Arsenal

This paper builds on `vaswani-2017-attention` (foundational/) by quantizing the weight matrices that architecture defines. It is closely related to `dettmers-2023-qlora` (training-and-alignment/), which uses a different quantization scheme (4-bit NormalFloat) specifically designed for fine-tuning rather than pure inference-time compression — the two papers solve related but distinct problems (fine-tuning-time memory reduction vs. inference-time compression of an already-trained model) and are worth reading together to understand the different quantization design points for training versus serving.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2210.17323)
- [arXiv](https://arxiv.org/abs/2210.17323)
- [Official Code](https://github.com/IST-DASLab/gptq)
- [Venue Proceedings](https://openreview.net/forum?id=tcbBPnfwxS)
- [Papers With Code](https://paperswithcode.com/paper/gptq-accurate-post-training-quantization-for)
- [Key Reproduction / Analysis](https://github.com/modelcloud/gptqmodel) — GPTQModel, the actively maintained successor to AutoGPTQ, documenting broad production integration (HF Transformers, vLLM, SGLang) and citing over 5,000 GPTQ-quantized models on Hugging Face
