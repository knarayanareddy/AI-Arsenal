---
id: peng-2023-rwkv
title: "RWKV: Reinventing RNNs for the Transformer Era"
phase: architectures
venue: emnlp
year: 2023
authors:
  - "Peng, B."
  - "Alcaide, E."
  - "Anthony, Q."
  - "Albalak, A."
  - "Zhu, R."
arxiv_id: "2305.13048"
arxiv_url: "https://arxiv.org/abs/2305.13048"
pdf_url: "https://arxiv.org/pdf/2305.13048"
code_url: "https://github.com/BlinkDL/RWKV-LM"
venue_url: null

practical_applicability: medium
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 0

tldr: "A linear-attention RNN that trains in parallel like a Transformer but runs inference like an RNN -- O(1) memory per token and no growing KV cache, trading some expressivity for constant-cost, unbounded-context generation"
key_contribution: "An architecture combining a Transformer-style parallelizable training formulation with an RNN-style recurrent inference formulation, giving linear time and constant memory in sequence length (no KV cache), demonstrating that attention-free recurrent models can scale to billions of parameters competitively"

builds_on: []
implemented_in: []

tags:
  - llm
  - efficiency
  - transformers
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

RWKV is an attention-free sequence model that can be written two equivalent ways: a parallelizable form for efficient training (like a Transformer) and a recurrent form for inference (like an RNN). The recurrent form carries a fixed-size state, so generation is O(1) memory per token with no KV cache that grows with context length.

## Why it's in the Arsenal

- It is a prominent member of the "linear-cost alternatives to attention" family (with Mamba/SSMs), directly attacking the Transformer's quadratic attention and growing KV cache — the two costs that dominate long-context serving.
- `practical_applicability: medium`: RWKV models are open, real, and deployable, but the ecosystem/tooling and peak quality still trail mainstream Transformers, so it is an efficiency-motivated alternative rather than a default.

## Core Contribution

Transformers pay quadratic attention cost and store a KV cache that grows with sequence length, hurting long-context inference. RWKV's contribution is a formulation whose training unrolls in parallel (so it trains at Transformer-like throughput) yet reduces at inference to a recurrence with a constant-size hidden state — the mechanism that removes the KV cache and makes per-token cost independent of context length. This reconciles the historical training/parallelism advantage of Transformers with the inference efficiency of RNNs.

## Key Results

- Scaled RWKV to billions of parameters with language-modeling quality competitive with similarly-sized Transformers, at constant inference memory (see the paper for benchmark tables)
- Demonstrated the parallel-train / recurrent-infer equivalence empirically at scale

## Methodology

Replace self-attention with a linear, time-mixing recurrence (the WKV operator) plus channel-mixing blocks; express it in a parallel scan form for training and a stepwise recurrent form for generation. Train as a standard autoregressive LM and evaluate on language-modeling and downstream benchmarks.

## Practical Applicability

RWKV is attractive when inference memory and long-context serving cost dominate — edge/streaming settings, or very long sequences where a Transformer's KV cache is prohibitive. The practical caveats are ecosystem maturity and that recurrent state can be weaker than full attention at precise long-range recall, so validate on your task rather than assuming parity.

## Limitations & Critiques

Constant-size state is a double-edged sword: it caps memory cost but can limit exact long-range retrieval that full attention handles. Tooling, quantization, and serving support are less mature than for Transformers, and peak benchmark quality has generally trailed the best attention models. It is a compelling efficiency direction, not a proven across-the-board replacement.

## Reproductions & Follow-up Work

RWKV is open-source with released weights across multiple versions (BlinkDL/RWKV-LM) and has an active community, so it is well reproduced. It belongs with Mamba/state-space models and other linear-attention work as part of the broader post-Transformer efficiency push.

## Relation to the Arsenal

Read with `gu-2023-mamba` (the SSM sibling in this folder) and `vaswani-2017-attention` / `dao-2022-flashattention` (the attention costs it avoids). Relevant to inference engines in the projects catalog (`llama-cpp`, `vllm`) where KV-cache memory is a serving bottleneck.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2305.13048)
- [arXiv](https://arxiv.org/abs/2305.13048)
- [Official Code](https://github.com/BlinkDL/RWKV-LM)
