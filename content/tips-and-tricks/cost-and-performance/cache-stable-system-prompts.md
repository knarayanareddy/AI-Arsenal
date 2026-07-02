---
id: "cache-stable-system-prompts"
title: "Use Prompt Caching for Long, Stable System Prompt Prefixes"
category: "cost-reduction"
tags:
  - caching
  - inference
difficulty: "beginner"
impact: "high"
time_to_implement: "30 minutes"
phase: cost-and-performance
effort: minutes
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (provider-native prompt-prefix caching features)"
applies_to:
  - production-serving
gotchas:
  - "Provider prompt caching typically requires the cached prefix to be byte-identical across calls -- any variation (even whitespace) in the 'stable' portion breaks the cache hit, so the prefix must genuinely be fixed, not just usually the same"
  - "Prompt caching benefits scale with prefix length and call volume -- for short system prompts or low-volume features, the savings may be negligible relative to the setup effort"
metrics: []
related_tips:
  - put-task-inputs-after-instructions
added_date: "2026-06-13"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

For long, stable system prompt prefixes reused across many calls, use your provider's native prompt caching (or an application-level cache) rather than reprocessing the full prefix on every request. Providers that support prefix caching charge less (or process faster) for cached prefix tokens, and a long stable system prompt is the ideal case since it's identical across calls.

## Before / After

**Before:** every call sends the full system prompt, incurring full processing cost even though the prefix is byte-identical to the previous call.

**After:** the stable system prompt prefix is registered with the provider's caching feature (or cached at the application layer), so repeated calls only pay full cost for the variable task-specific portion.

## Implementation

Structure your prompt so the stable, reusable portion (persona, policy, format rules) forms a fixed prefix, enable your provider's native prompt-caching feature for that prefix, and verify the byte-identical requirement is actually met across calls (see `put-task-inputs-after-instructions` for the structural prerequisite).

## Gotchas

- Provider caching typically requires a byte-identical prefix — any variation breaks the cache hit, so the prefix must genuinely be fixed
- Benefits scale with prefix length and call volume — for short prompts or low-volume features, savings may be negligible

## When NOT to Apply

- Skip this for short system prompts where the caching setup overhead exceeds the marginal savings
- Not useful if your provider doesn't support native prompt caching and an application-level cache isn't feasible for your architecture

## Verification

Community-reported: prompt-prefix caching for stable system prompts is a documented, generally-available feature across several major LLM provider APIs, not independently benchmarked here against a named production system's actual savings.
