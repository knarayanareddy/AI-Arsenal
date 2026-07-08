---
id: cai-2024-medusa
title: "Medusa: Simple LLM Inference Acceleration Framework with Multiple Decoding Heads"
phase: inference-and-efficiency
venue: icml
year: 2024
authors:
  - "Cai, T."
  - "Li, Y."
  - "Geng, Z."
  - "Peng, H."
  - "Lee, J. D."
  - "Chen, D."
  - "Dao, T."
arxiv_id: "2401.10774"
arxiv_url: "https://arxiv.org/abs/2401.10774"
pdf_url: "https://arxiv.org/pdf/2401.10774"
code_url: "https://github.com/FasterDecoding/Medusa"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 700

tldr: "Speeds up decoding by adding a few extra prediction heads that guess several future tokens at once, verified in parallel with tree attention — no separate draft model, 2-3x faster, and self-contained enough to bolt onto an existing model."
key_contribution: "Made speculative decoding practical without a separate draft model: train lightweight extra heads on the base model's own hidden states to propose multiple continuations, then verify candidate token trees in a single forward pass via tree attention — retaining the base model's output distribution while cutting decoding steps."

builds_on:
  - "leviathan-2022-speculative-decoding"
implemented_in:
  - "tensorrt-llm"

tags:
  - "efficiency"
  - "inference"
  - "llm"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Medusa accelerates autoregressive LLM decoding by attaching several extra "Medusa heads" to the last hidden layer of a frozen (or lightly tuned) base model. Each head predicts a token a few positions into the future; their combined predictions form a tree of candidate continuations that is verified in one forward pass using a specialized tree-attention mask. Because the accepted tokens come from the base model's own verification, output quality is preserved while the number of sequential decoding steps drops.

## Why it's in the Arsenal

- Medusa is the speculative-decoding variant that avoids the biggest deployment headache of classic speculative decoding — sourcing, serving, and aligning a separate draft model
- It is directly integrated into production serving stacks (TensorRT-LLM and others), so it is a lever you can actually pull to cut latency on your own fine-tuned models

## Core Contribution

Reframing speculative decoding as multi-head self-drafting: instead of a smaller draft model, the base model grows a handful of cheap heads trained to predict tokens t+1, t+2, … from the same hidden state. Tree attention lets many candidate sequences be scored simultaneously, and a typical-acceptance scheme decides how many speculated tokens to keep. Two training regimes are offered — frozen backbone (Medusa-1) and joint tuning (Medusa-2).

## Key Results

- Achieved roughly 2.2-2.8x wall-clock decoding speedup on Vicuna models with no quality degradation from the base distribution (paper, 2024)
- Medusa-1 (frozen backbone) trains in hours on a single GPU while still delivering ~2x speedups (2024)

## Methodology

The base model is augmented with K residual-connected feed-forward heads predicting successive future tokens. At inference, each head emits top candidates, forming a token tree; a tree-attention mask evaluates all branches in one pass, and an acceptance criterion (exact or typical) selects the longest valid prefix. The paper studies acceptance schemes, head count, and the frozen-vs-jointly-tuned trade-off.

## Practical Applicability

If you serve a model whose latency is decode-bound (long generations, low batch size), adding Medusa heads is a concrete way to cut time-to-completion 2-3x without changing outputs, and without operating a second draft model. Practically, you fine-tune the heads on your target model, then enable Medusa in a supporting runtime (e.g. TensorRT-LLM). Weigh it against EAGLE and vanilla speculative decoding, which now often match or exceed it depending on workload.

## Limitations & Critiques

- Requires a per-model training step for the heads; it is not fully plug-and-play across arbitrary checkpoints
- Speedups shrink at high batch sizes where the GPU is already compute-bound rather than latency-bound
- Later methods (EAGLE / EAGLE-2, 2024) report higher acceptance lengths and speedups, making Medusa one option among several rather than the frontier

## Reproductions & Follow-up Work

Reproduced via the FasterDecoding/Medusa repo and integrated into serving frameworks. Part of a fast-moving line: it builds on `leviathan-2022-speculative-decoding` and was followed by EAGLE, Lookahead decoding, and other self-drafting schemes.

## Relation to the Arsenal

Inference-and-efficiency paper; a practical descendant of `leviathan-2022-speculative-decoding` and relevant to serving projects such as `tensorrt-llm` and `vllm`.

## Resources

- [Medusa paper](https://arxiv.org/abs/2401.10774)
- [FasterDecoding/Medusa](https://github.com/FasterDecoding/Medusa)
