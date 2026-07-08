---
id: touvron-2023-llama
title: "LLaMA: Open and Efficient Foundation Language Models"
phase: foundational
venue: arxiv-preprint
year: 2023
authors:
  - "Touvron, H."
  - "Lavril, T."
  - "Izacard, G."
  - "Martinet, X."
  - "et al. (Meta AI)"
arxiv_id: "2302.13971"
arxiv_url: "https://arxiv.org/abs/2302.13971"
pdf_url: "https://arxiv.org/pdf/2302.13971"
code_url: "https://github.com/meta-llama/llama"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: foundational
has_code: true
citation_count_approx: 12000

tldr: "Trained 7B–65B models on public data only, overtraining far past Chinchilla-optimal to optimize inference cost rather than training cost — LLaMA-13B beat GPT-3-175B, and the weights' release ignited the open-model ecosystem"
key_contribution: "Two shifts that defined the open-model era: optimizing for inference-time compute (train smaller models on many more tokens than training-optimal) and demonstrating GPT-3-class quality from exclusively public data — plus the de facto standard architecture recipe (RoPE, SwiGLU, RMSNorm) every open model since has copied"

builds_on:
  - "hoffmann-2022-chinchilla"
  - "vaswani-2017-attention"
  - "su-2021-rope"

tags:
  - "llm"
  - "foundational"
  - "training"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Chinchilla told the field how to allocate a *training* budget optimally; LLaMA pointed out that's the wrong objective if you'll serve the model billions of times. Meta trained 7B–65B models on 1–1.4T tokens of exclusively public data — several times past training-optimal — because a smaller model trained longer is cheaper at inference forever. LLaMA-13B outperforming GPT-3-175B validated the bet, and the weights (leaked, then embraced) seeded fine-tunes, llama.cpp, and effectively the entire self-hosted LLM ecosystem.

## Why it's in the Arsenal

- The overtrain-for-inference logic is now the default economics of every model trained for deployment — reading LLaMA against `hoffmann-2022-chinchilla` is the cleanest way to internalize the training-cost/serving-cost distinction
- Its architecture bundle (RoPE positional encoding, SwiGLU activations, RMSNorm pre-normalization) became the open-model reference design, and its public-data-only recipe is why reproducible open training pipelines exist at all

## Core Contribution

A deliberately conservative architecture assembled from proven components, trained on a documented mixture of CommonCrawl, C4, GitHub, Wikipedia, books, arXiv, and StackExchange — no proprietary data — at token counts (1T–1.4T) chosen by inference-aware rather than training-optimal reasoning. The contribution is the demonstrated trade: at 7–65B scale, quality competitive with much larger closed models, in a form factor individuals can run.

## Key Results

- LLaMA-13B outperforms GPT-3-175B on most zero/few-shot benchmarks at ~13× fewer parameters; LLaMA-65B is competitive with Chinchilla-70B and PaLM-540B (2023)
- Loss still improving at 1.4T tokens at all scales — direct evidence that Chinchilla-optimal stopping leaves deployable quality on the table (2023)
- Full training-data transparency enabled independent replication (RedPajama reproduced the corpus; OpenLLaMA the models) (2023)

## Methodology

Decoder-only transformers (RoPE, SwiGLU, RMSNorm, no biases) trained with AdamW on a documented public-data mixture; evaluation across 20+ zero/few-shot benchmarks against GPT-3, Gopher, Chinchilla, and PaLM; efficiency accounting in GPU-hours and inference cost framing the token-budget choice.

## Practical Applicability

The paper's reasoning is directly reusable whenever you choose or train a model for production: amortize training against lifetime inference, which favors smaller-heavily-trained models — the logic behind every subsequent "small but overtrained" release (Llama-2/3, Mistral, Qwen, Gemma). Its architecture choices are what llama.cpp, vLLM kernels, and most fine-tuning tooling are optimized around, so understanding them is background for practically all self-hosted work.

## Limitations & Critiques

The original release was research-license, non-commercial — openness arrived fully only with Llama-2 — and "public data" did not mean uncontroversial data (books3 litigation followed). Base models only, no instruction tuning (Alpaca et al. filled the gap within weeks), 2K context, English-dominant, and no MQA/GQA (13B–65B use plain multi-head attention, making them KV-cache-heavy by modern standards). All addressed in successors.

## Reproductions & Follow-up Work

Among the most-reproduced training recipes ever: RedPajama rebuilt the dataset, OpenLLaMA retrained the models, and the fine-tune explosion (Alpaca, Vicuna) plus llama.cpp/GGUF quantization built the self-hosting stack on its weights. Succeeded by `touvron-2023-llama2` (commercial license, GQA, RLHF chat variants) and Llama-3, with the overtraining philosophy pushed further each generation.

## Relation to the Arsenal

The inference-aware correction to `hoffmann-2022-chinchilla` and predecessor of `touvron-2023-llama2` (foundational/); its architecture bundle links to `su-2021-rope` (architectures/), and its ecosystem effect underlies most entries in projects/llms/ and the self-hosting guidance in tools/serving-and-deployment/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2302.13971)
- [arXiv](https://arxiv.org/abs/2302.13971)
- [Code](https://github.com/meta-llama/llama)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
