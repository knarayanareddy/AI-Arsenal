---
id: leviathan-2022-speculative-decoding
title: "Fast Inference from Transformers via Speculative Decoding"
phase: inference-and-efficiency
venue: icml
year: 2022
authors:
  - "Leviathan, Y."
  - "Kalman, M."
  - "Matias, Y."
arxiv_id: "2211.17192"
arxiv_url: "https://arxiv.org/abs/2211.17192"
pdf_url: "https://arxiv.org/pdf/2211.17192"
code_url: "https://github.com/google-research/google-research"
venue_url: "https://proceedings.mlr.press/v202/leviathan23a.html"

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 900

tldr: "Showed a small draft model's guesses can be verified in parallel by the full model with zero change to the output distribution, meaning production inference engines should implement speculative decoding to cut generation latency without sacrificing exactness"
key_contribution: "Demonstrated that a smaller, faster 'approximation' model can generate candidate tokens which the larger target model verifies in a single parallel forward pass, producing 2-3x generation speedups while provably preserving the target model's exact output distribution"

builds_on:
  - vaswani-2017-attention
implemented_in:
  - vllm
  - sglang
  - text-generation-inference
  - llama-cpp

tags:
  - inference
  - efficiency
  - transformers
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: verified
---

## Overview

This paper showed that a small, fast "approximation" (draft) model can propose several candidate tokens ahead, which the larger target model then verifies in a single parallel forward pass, accepting correct guesses and only falling back to standard autoregressive generation on mismatches — producing 2-3x speedups in generation latency while provably preserving the target model's exact output distribution, not an approximation of it. This remains current, standard practice: speculative decoding is implemented directly in every major inference engine in this catalog (vLLM, SGLang, TGI, llama.cpp), making this one of the most production-validated techniques covered anywhere in this vertical.

## Why it's in the Arsenal

- Speculative decoding is a default latency-reduction technique in production LLM serving, and understanding the draft-then-verify mechanism this paper establishes is directly relevant whenever you're configuring or debugging inference performance in any of this catalog's inference-engine tools and projects.
- `practical_applicability: high` is non-inflated here: this technique is implemented and actively used across all four major inference engines cataloged in this vertical, not a theoretical curiosity — it is closer to "already built into the tools you're using" than "a technique you'd implement yourself," but understanding why it works is what lets you reason about when it helps and when it doesn't (see Limitations).

## Core Contribution

Standard autoregressive generation produces exactly one token per forward pass through the full model, making generation latency proportional to output length regardless of how much spare compute capacity the hardware has per step. This paper's contribution is a mathematically exact method for using a smaller, faster draft model to propose multiple tokens speculatively, then verifying all of them in a single parallel forward pass of the full target model — using a rejection-sampling-based acceptance rule specifically constructed so that the final output distribution is provably identical to what standard autoregressive sampling from the target model alone would have produced (paper Section 2). In engineering terms: this means speculative decoding is a "free" speedup with no approximation or quality tradeoff when correctly implemented — the only cost is running the small draft model, which is far cheaper than the large target model, and if the draft model's guesses are wrong, you fall back to normal per-token generation with no correctness penalty.

## Key Results

- Reported approximately 2-3x speedups on a T5-XXL model using a much smaller approximation model within the same architecture family (2022) — the paper's own headline efficiency measurement
- Speedup is empirically dependent on how well the small draft model's predictions align with the larger target model's — the paper's own analysis shows the technique's benefit scales with "speculation accuracy," a property that varies by task and model pairing rather than being a fixed constant (2022)
- A concurrent, independently developed paper (Chen et al., 2023, DeepMind, "Accelerating Large Language Model Decoding with Speculative Sampling") demonstrated a very similar approach with 2-2.5x speedups on a 70B-parameter Chinchilla model — the two papers' authors later acknowledged each other's work as an independent, simultaneous discovery of essentially the same core idea, a notable case of convergent innovation on solving inference latency

## Methodology

At each decoding step, the draft model autoregressively generates a short sequence of `gamma` candidate tokens (a tunable parameter). The target model then processes the original context plus all `gamma` candidate tokens in a single forward pass, computing what its own probability distribution would have been at each of those positions. A rejection-sampling rule compares the draft model's proposal probabilities against the target model's actual probabilities: candidate tokens are accepted sequentially until the first point of disagreement, at which point the target model's own distribution (corrected for the rejection) is used to sample the next token directly, and everything after that point is discarded and re-attempted in the next round (paper Section 2, algorithm box). Because this acceptance/rejection procedure is constructed so that accepted tokens are distributed exactly as they would be under standard autoregressive sampling from the target model, the final output is provably identical in distribution to standard generation — not an approximation, which is the paper's key mathematical contribution beyond the general "draft small, verify large" idea itself (which several papers explored in various forms around the same time).

## Practical Applicability

If you are serving an LLM in production and generation latency matters, this paper's technique is why every major inference engine in this catalog supports speculative decoding as a configuration option — enabling it (with an appropriately chosen, well-aligned draft model) is one of the most reliable "free" latency wins available, since it changes nothing about the model's output distribution. If you are choosing a draft model for your target model, this paper's own analysis of "speculation accuracy" is the reason draft-model choice matters: a draft model that rarely agrees with the target model's predictions will provide little to no speedup, since most of its candidate tokens get rejected and regenerated normally — this is the practical tuning knob engineers actually need to reason about, not the underlying algorithm itself (which is already implemented for you).

## Limitations & Critiques

The technique's speedup is fundamentally bounded by how well-aligned the draft and target models are — the paper's own framing already acknowledges this is task- and pairing-dependent, and subsequent production experience has borne this out: a poorly chosen draft model provides negligible or even negative speedup once its own inference cost is accounted for, so draft-model selection is a real engineering decision with no universally correct default. The technique adds system complexity: production serving systems must maintain and route through both a draft and a target model, which the original paper's academic framing does not have to address but which later production-focused follow-up work (e.g. speculative decoding integration papers for vLLM-style serving systems) explicitly grapples with, including memory and compute pressure from running two models simultaneously. No known failed-replication challenge to the paper's core theoretical guarantee (distribution-preserving acceptance) exists, since that guarantee is a mathematical proof, not an empirical claim subject to replication failure — the open questions in the field are about deployment engineering (draft model selection, batching interactions, tree-based multi-candidate extensions like Medusa) rather than about whether the original claim holds.

## Reproductions & Follow-up Work

Speculative decoding as described in this paper (and the concurrent, independently-developed Chen et al. 2023 DeepMind paper) has been reproduced and integrated into every major production LLM inference engine: vLLM, SGLang, Hugging Face's Text Generation Inference, and llama.cpp all implement it directly, constituting an extensive, ongoing, real-world validation far beyond the original paper's own T5-XXL benchmark. Significant follow-up work extends the core idea with tree-based multi-candidate verification (Medusa, using multiple decoding heads instead of a separate draft model) and production-serving-specific optimizations (batched speculative decoding integrated into serving systems like vLLM, addressing interactions between speculation and request batching that the original single-request academic setting did not need to consider).

## Relation to the Arsenal

This paper builds on `vaswani-2017-attention` (foundational/) — both the draft and target models are Transformer-based, and the parallel verification step relies on the same parallelizable computation that architecture enables. It is directly implemented in four inference-engine entries in this catalog: `vllm`, `sglang`, `text-generation-inference`, and `llama-cpp` (all in `content/projects/inference-engines/`), reflected in `implemented_in` above — this is one of the most concretely, verifiably "implemented in the catalog" research entries in this entire vertical, since the technique's production adoption is directly checkable in each of those tools' own documentation.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2211.17192)
- [arXiv](https://arxiv.org/abs/2211.17192)
- [Venue Proceedings](https://proceedings.mlr.press/v202/leviathan23a.html)
- [Papers With Code](https://paperswithcode.com/paper/fast-inference-from-transformers-via)
- [Key Reproduction / Analysis](https://sifal.social/posts/Speculative-Decoding-Making-Language-Models-Generate-Faster-Without-Losing-Their-Minds/) — analysis covering both this paper and the concurrent, independently-developed Chen et al. (2023) DeepMind paper, and the production inference engines (vLLM, TensorRT-LLM) that have since integrated the technique
