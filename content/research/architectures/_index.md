---
title: "Architectures Research"
section: "research/architectures"
auto_generated: false
---

# Architectures Research

## What belongs here

Model design contributions: attention variants, mixture-of-experts routing, positional encoding schemes, context-length extension techniques, efficient-transformer alternatives, and state-space models (Mamba and successors) — papers whose primary contribution is a change to model architecture itself, not to how a model is trained or served.

## What does NOT belong here

A paper whose primary contribution is field-defining enough to redefine how the field thinks (not just how models are built) belongs in `foundational/` instead — see `vaswani-2017-attention.md` there, whose core contribution is architectural but which is classified as foundational because it is a required-knowledge paper, not merely an architecture paper. A paper about accelerating inference for an existing architecture (quantization, speculative decoding, KV-cache tricks) belongs in `inference-and-efficiency/`.

## Engineering frame

When I am choosing or evaluating a model architecture (attention mechanism, MoE vs. dense, context-extension approach), which papers established the tradeoffs I'm actually weighing?

## Reading order guidance

- This folder is currently empty — a genuine content gap in the existing catalog, not an oversight (see `.migration/research-audit-report.md` for the audit finding: zero existing entries have a primary contribution that is architecture-design-specific without also being field-defining enough for `foundational/`).
- Candidate future additions flagged for a maintainer to evaluate against the Pre-authoring Gate: Mixture-of-Experts routing papers (e.g. Switch Transformer, Mixtral's routing approach), RoPE/ALiBi positional encoding papers, and Mamba/state-space-model papers — none of these are yet in the catalog.

## Papers in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Architectures in This Phase

### Recently Added

- [GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints](./ainslie-2023-gqa.md)
- [DeepSeek-V3 Technical Report](./deepseek-ai-2024-deepseek-v3.md)
- [Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity](./fedus-2021-switch-transformer.md)
- [Gemma 4 Technical Report](./gemma-team-2026-gemma4.md)
- [Mamba: Linear-Time Sequence Modeling with Selective State Spaces](./gu-2023-mamba.md)
- [Mixtral of Experts](./jiang-2024-mixtral.md)
- [Visual Instruction Tuning (LLaVA)](./liu-2023-llava.md)
- [Learning Transferable Visual Models From Natural Language Supervision](./radford-2021-clip.md)
- [Robust Speech Recognition via Large-Scale Weak Supervision](./radford-2022-whisper.md)
- [RoFormer: Enhanced Transformer with Rotary Position Embedding](./su-2021-rope.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints](./ainslie-2023-gqa.md) — Introduced grouped-query attention — sharing each key/value head across a group of query heads — cutting KV-cache memory several-fold with near-zero quality loss; now the default attention configuration in almost every open LLM
- [DeepSeek-V3 Technical Report](./deepseek-ai-2024-deepseek-v3.md) — DeepSeek-V3: a 671B-parameter MoE (37B active) trained for a reported ~$5.6M of GPU time that matched frontier closed models — proof that systems co-design (MLA, FP8 training, aux-loss-free MoE routing, MTP) collapses the frontier cost curve
- [Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity](./fedus-2021-switch-transformer.md) — Simplified mixture-of-experts to top-1 routing (one expert per token), showing sparse models reach the same quality as dense ones up to 7× faster per FLOP — the recipe that made MoE the standard architecture for frontier-scale efficiency
- [Gemma 4 Technical Report](./gemma-team-2026-gemma4.md) — Open-weight, natively multimodal model family (2.3B-31B, dense + MoE) with a thinking mode and an encoder-free 12B that ingests raw audio and image patches -- the strongest open-weight option at small/mid scale as of mid-2026
- [Mamba: Linear-Time Sequence Modeling with Selective State Spaces](./gu-2023-mamba.md) — Introduced selective state-space models with input-dependent dynamics and a hardware-aware parallel scan, achieving Transformer-quality language modeling with linear-time inference — the strongest attention alternative, now shipping in hybrid production models
- [Mixtral of Experts](./jiang-2024-mixtral.md) — Proved sparse mixture-of-experts works at open-weights scale: Mixtral 8x7B matched or beat Llama 2 70B while activating only 13B parameters per token, making MoE the default architecture for efficient frontier models
- [Visual Instruction Tuning (LLaVA)](./liu-2023-llava.md) — Connected a frozen CLIP vision encoder to a LLaMA-family LLM with just a linear projection, trained on GPT-4-generated visual instruction data — establishing the minimal recipe (encoder + projector + LLM) behind most open vision-language models
- [Learning Transferable Visual Models From Natural Language Supervision](./radford-2021-clip.md) — CLIP: contrastive training on 400M web image-text pairs yields a shared vision-language embedding space enabling zero-shot classification — the component that underlies multimodal LLM vision encoders, text-to-image guidance, and cross-modal retrieval
- [Robust Speech Recognition via Large-Scale Weak Supervision](./radford-2022-whisper.md) — Whisper: a plain encoder-decoder transformer trained on 680K hours of weakly-labeled web audio achieves human-competitive, zero-shot-robust speech recognition across 96+ languages — and its released weights became the default open ASR component
- [RoFormer: Enhanced Transformer with Rotary Position Embedding](./su-2021-rope.md) — Introduced rotary position embeddings (RoPE), which encode positions by rotating query/key vectors so attention depends on relative distance — now the position encoding of essentially every open LLM and the mechanism behind most context-extension tricks
