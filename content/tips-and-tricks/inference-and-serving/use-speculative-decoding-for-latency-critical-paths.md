---
id: "use-speculative-decoding-for-latency-critical-paths"
title: "Use Speculative Decoding When a Cheap Draft Model Is Available and Latency Dominates"
category: "inference-optimization"
tags:
  - inference
  - efficiency
difficulty: "advanced"
impact: "high"
time_to_implement: "1 day"
phase: inference-and-serving
effort: day
estimated_time: "~1 day"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports; implements leviathan-2022-speculative-decoding"
applies_to:
  - latency-critical-serving
implemented_from: leviathan-2022-speculative-decoding
gotchas:
  - "Speculative decoding needs a smaller, much cheaper draft model whose outputs are frequently accepted by the target model -- if no suitable draft model exists for your target model, this technique isn't available to you"
  - "The latency win depends on the draft-token acceptance rate for your specific workload -- a low acceptance rate (draft model diverges often from the target) can produce little or no speedup despite the added complexity"
  - "Adds a second model to your serving infrastructure (the draft model), which is an operational cost even if it's smaller -- factor this into deployment complexity, not just the latency benefit"
metrics:
  - "commonly reported speedups in the literature are workload- and model-pair-dependent, typically in the 2-3x range for favorable draft/target pairings"
related_tips:
  - stream-user-facing-responses
  - benchmark-with-real-context-lengths
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

When a smaller, cheaper "draft" model closely approximates your target model's outputs, use speculative decoding: the draft model proposes several tokens ahead, and the target model verifies them in a single forward pass, accepting matches and only falling back to normal generation on mismatches. This reduces the number of expensive target-model forward passes needed per output token, directly targeting per-token latency rather than throughput.

## Before / After

**Before:** every output token requires one full forward pass through the target model.

**After:** the draft model proposes `k` tokens per step; the target model verifies all `k` in one pass, accepting the matching prefix and generating only the remainder itself.

## Implementation

Pick a draft model substantially cheaper than the target model but trained on similar data (often a smaller model in the same family), wire it into a speculative-decoding-capable serving stack (several inference engines support this natively), and measure the actual acceptance rate and latency improvement on your real workload before committing.

## Gotchas

- Requires a smaller, cheap draft model whose outputs are frequently accepted by the target model — without a suitable pairing, this technique isn't available
- The latency win depends on the draft-token acceptance rate for your workload — low acceptance can produce little or no speedup
- Adds a second model to your serving infrastructure, an operational cost independent of the latency benefit

## When NOT to Apply

- Skip this if throughput (total tokens/sec across many concurrent requests), not per-request latency, is your actual bottleneck — speculative decoding targets latency, not aggregate throughput
- Not worth the operational complexity if no draft model with a high acceptance rate against your target model is available

## Verification

Production-verified: speculative decoding is a peer-reviewed, published technique (implements this catalog's `leviathan-2022-speculative-decoding` research entry) with practitioner-reported production deployments in latency-sensitive serving stacks.
