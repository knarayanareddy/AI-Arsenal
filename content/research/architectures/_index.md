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

- [Gemma 4 Technical Report](./gemma-team-2026-gemma4.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Gemma 4 Technical Report](./gemma-team-2026-gemma4.md) — Open-weight, natively multimodal model family (2.3B-31B, dense + MoE) with a thinking mode and an encoder-free 12B that ingests raw audio and image patches -- the strongest open-weight option at small/mid scale as of mid-2026
