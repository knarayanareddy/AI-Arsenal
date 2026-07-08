---
id: ainslie-2023-gqa
title: "GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints"
phase: architectures
venue: emnlp
year: 2023
authors:
  - "Ainslie, J."
  - "Lee-Thorp, J."
  - "de Jong, M."
  - "Zemlyanskiy, Y."
  - "Lebrón, F."
  - "Sanghai, S."
arxiv_id: "2305.13245"
arxiv_url: "https://arxiv.org/abs/2305.13245"
pdf_url: "https://arxiv.org/pdf/2305.13245"
code_url: null
venue_url: "https://aclanthology.org/2023.emnlp-main.298/"

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: false
citation_count_approx: 1500

tldr: "Introduced grouped-query attention — sharing each key/value head across a group of query heads — cutting KV-cache memory several-fold with near-zero quality loss; now the default attention configuration in almost every open LLM"
key_contribution: "Interpolated between multi-head and multi-query attention by grouping query heads over shared KV heads, plus a cheap uptraining recipe to convert existing MHA checkpoints — hitting multi-query speed at multi-head quality, which made it the universal deployment default (Llama 2/3, Mistral, Qwen, Gemma)"

builds_on:
  - "vaswani-2017-attention"
implemented_in:
  - "vllm"
  - "sglang"
  - "llama-cpp"

tags:
  - "transformers"
  - "attention"
  - "efficiency"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Grouped-query attention divides query heads into groups that share a single key/value head each, occupying the design space between full multi-head attention (one KV head per query head; high quality, huge KV cache) and multi-query attention (one KV head total; small cache, measurable quality loss). The paper showed GQA with a modest number of KV groups recovers essentially all of MHA's quality while retaining most of MQA's inference speedup, and provided a recipe to convert existing checkpoints with ~5% additional training.

## Why it's in the Arsenal

- KV-cache size is the binding constraint in LLM serving economics, and GQA is the single architecture choice that most reduced it — the `num_key_value_heads` field in every model config is this paper
- Understanding the MHA→GQA→MQA→MLA progression is required background for comparing modern model families' serving costs

## Core Contribution

Two practical contributions: (1) the grouping interpolation itself, giving a tunable quality/memory dial where an intermediate setting (e.g. 8 KV heads) empirically dominates both extremes for deployment; and (2) 'uptraining' — mean-pooling existing MHA key/value heads into grouped heads and continuing pretraining for ~5% of original steps — which made adoption nearly free for model developers rather than requiring from-scratch retraining.

## Key Results

- GQA-8 on T5-XXL matched multi-head attention quality across summarization/QA benchmarks while achieving inference speed close to multi-query attention (paper Figures 3-5, 2023)
- Uptraining with only 5% of original pretraining compute sufficed to convert MHA checkpoints to high-quality GQA models (2023)
- Adopted in Llama 2 70B, then essentially all subsequent open models (Llama 3, Mistral, Qwen, Gemma) — KV-cache reductions of 4-8x versus MHA at matched hidden size (post-publication adoption)

## Methodology

Query heads are partitioned into G groups, each sharing one KV projection; converted checkpoints initialize each group's KV head as the mean of its constituent MHA heads, followed by brief continued pretraining. Experiments on T5 Large/XXL measure quality (CNN/DM, arXiv, PubMed summarization, WMT, TriviaQA) against inference time per sample, sweeping the number of groups to map the quality/speed frontier.

## Practical Applicability

When sizing a serving deployment, KV-cache-per-token = 2 × layers × kv_heads × head_dim × bytes — GQA is why that number is 4-8x smaller than the naive calculation on modern models, which directly sets max batch size and long-context feasibility. When comparing model families or configuring quantized KV caches, `num_key_value_heads` is the field to read; models that skipped GQA (older 7B-class checkpoints) pay proportionally in throughput.

## Limitations & Critiques

GQA trades a real, if small, capability cost: aggressive grouping measurably hurts tasks sensitive to attention precision, and the paper's evaluation (T5, summarization-heavy) predates the long-context era where the trade-offs bite hardest. It has since been superseded at the frontier by DeepSeek's multi-head latent attention (MLA), which compresses KV further via low-rank projection with better quality retention — GQA remains the default, but is no longer the frontier of the KV-compression line it started.

## Reproductions & Follow-up Work

Universally reproduced — GQA ships in nearly every open model since Llama 2 and every inference engine implements it natively. Follow-up work includes MLA (DeepSeek-V2/V3) as the next step in KV compression, per-layer heterogeneous KV sharing, and KV-cache quantization schemes that compound with GQA's savings.

## Relation to the Arsenal

Refines the attention design of `vaswani-2017-attention` (foundational/). Its KV-cache savings compound with `kwon-2023-pagedattention` (inference-and-efficiency/) — GQA shrinks the cache, PagedAttention manages it — together explaining most of modern serving throughput. Present in effectively every model in projects/foundation-models/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2305.13245)
- [arXiv](https://arxiv.org/abs/2305.13245)
- [Venue](https://aclanthology.org/2023.emnlp-main.298/)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
