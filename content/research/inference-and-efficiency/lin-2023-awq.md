---
id: lin-2023-awq
title: "AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration"
phase: inference-and-efficiency
venue: other
year: 2023
authors:
  - "Lin, J."
  - "Tang, J."
  - "Tang, H."
  - "Yang, S."
  - "Chen, W.-M."
  - "Wang, W.-C."
  - "Xiao, G."
  - "Dang, X."
  - "Gan, C."
  - "Han, S."
arxiv_id: "2306.00978"
arxiv_url: "https://arxiv.org/abs/2306.00978"
pdf_url: "https://arxiv.org/pdf/2306.00978"
code_url: "https://github.com/mit-han-lab/llm-awq"
venue_url: "https://proceedings.mlsys.org/paper_files/paper/2024/hash/42a452cbafa9dd64e9ba4aa95cc1ef21-Abstract-Conference.html"

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 1200

tldr: "Showed ~1% of weight channels are 'salient' — identified by activation magnitudes, not weight values — and protecting them via per-channel scaling enables accurate 4-bit weight quantization without backpropagation; AWQ is now a standard deployment format"
key_contribution: "Activation-aware saliency: scaling up the ~1% of weight channels with large activation magnitudes before 4-bit quantization preserves accuracy without any gradient-based reconstruction, generalizing better than GPTQ's Hessian-based approach (especially for instruction-tuned and multimodal models) and shipping with efficient kernels (TinyChat)"

builds_on:
  - "frantar-2022-gptq"
implemented_in:
  - "vllm"
  - "sglang"

tags:
  - "quantization"
  - "inference"
  - "efficiency"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

AWQ is a post-training weight-only quantization method built on one observation: weight importance is determined by the activations they meet, not by the weights' own magnitudes. Protecting the ~1% of channels facing large activations — implemented losslessly by scaling weights up and activations down — lets 4-bit (and 3-bit) quantization retain near-FP16 quality without any backpropagation or reconstruction, avoiding the calibration-set overfitting that gradient-based methods risk. With its TinyChat kernels it delivered ~3x speedups and became a standard deployment format.

## Why it's in the Arsenal

- AWQ is one of the two dominant post-training weight-quantization formats on every model hub and serving engine (the '-AWQ' suffix in thousands of HF repos) — choosing between AWQ/GPTQ/GGUF variants is a routine self-hosting decision this paper informs
- The activation-aware saliency insight (weights matter according to the activations they multiply) is a transferable principle used across the subsequent quantization literature

## Core Contribution

Two linked ideas: (1) saliency should be measured from activation statistics — keeping 1% of channels in FP16 selected by activation magnitude nearly closes the quantization gap, while selecting by weight magnitude does not; and (2) the mixed-precision inconvenience is avoided entirely by an equivalent per-channel scaling transformation, searched over a small grid to minimize output error. Because nothing is trained, the method preserves generalization across domains and modalities — the paper demonstrates this on instruction-tuned and multimodal models where reconstruction-based methods degrade.

## Key Results

- 4-bit AWQ matched or beat GPTQ across Llama-family models on perplexity, with the largest margins on instruction-tuned and multimodal (OpenFlamingo, LLaVA) models (paper Tables, 2023)
- Protecting just 0.1-1% of activation-salient channels recovered most of the quantization error — the core saliency finding (2023)
- TinyChat kernels achieved 3x+ speedup over FP16 on desktop and edge GPUs, enabling 70B-class models on consumer hardware (2023; MLSys 2024 Best Paper)

## Methodology

Using a small calibration set, per-channel average activation magnitudes identify salient weight channels; a per-channel scale s (searched over a 1-parameter grid balancing salient protection against non-salient error inflation) is applied to weights with the inverse folded into the previous layer, then standard group-wise INT4/INT3 quantization proceeds. No gradients, no layer-wise reconstruction; evaluation spans perplexity, zero-shot tasks, instruction-following, and multimodal benchmarks, plus kernel-level latency measurements.

## Practical Applicability

For self-hosted serving, weight-only 4-bit quantization is the default cost lever — it roughly quarters weight memory and accelerates the memory-bound decode phase — and AWQ is one of the two formats every engine (vLLM, SGLang, TGI, LMDeploy) supports natively. Practical guidance encoded in the paper: prefer AWQ over GPTQ when the model is instruction-tuned or will be used out-of-domain (less calibration overfitting), and always validate on your task rather than perplexity alone.

## Limitations & Critiques

Weight-only quantization accelerates memory-bound decoding but not compute-bound prefill, and 4-bit gains taper at large batch sizes where arithmetic dominates; activation quantization (W8A8, FP8) addresses a different regime and often wins in high-throughput serving. AWQ's grid-searched scaling is heuristic — subsequent methods (quantization-aware variants, rotation-based schemes like QuaRot/SpinQuant, and QTIP-style trellis quantization) surpass it at 2-3 bits. The 'AWQ vs GPTQ' quality gap is also model-dependent; on some checkpoints the difference is within noise.

## Reproductions & Follow-up Work

Reproduced across the ecosystem: native support in vLLM, SGLang, TGI, LMDeploy, and AutoAWQ tooling; thousands of pre-quantized AWQ checkpoints on Hugging Face. Won MLSys 2024 Best Paper. Follow-up quantization research (rotation-based outlier suppression, lower-bit trellis codes) builds on its activation-aware saliency framing.

## Relation to the Arsenal

Direct successor-competitor to `frantar-2022-gptq` (same phase) — the two define the standard post-training weight-quantization menu. Served by `vllm` and `sglang` (projects/inference-engines/); the local-inference stacks in tools (Ollama/llama.cpp ecosystems) apply the same principles via GGUF's quantization families.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2306.00978)
- [arXiv](https://arxiv.org/abs/2306.00978)
- [Code](https://github.com/mit-han-lab/llm-awq)
- [Venue](https://proceedings.mlsys.org/paper_files/paper/2024/hash/42a452cbafa9dd64e9ba4aa95cc1ef21-Abstract-Conference.html)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
