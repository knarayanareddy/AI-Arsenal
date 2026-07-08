---
id: "cap-max-output-tokens-per-request"
title: "Set an Explicit max_tokens Cap Per Request Type Instead of Using Defaults"
category: "cost-reduction"
tags:
  - inference
  - observability
difficulty: "beginner"
impact: "medium"
time_to_implement: "1-2 hours"
phase: cost-and-performance
effort: minutes
estimated_time: "~1-2 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (provider API docs; cost-control writeups on runaway generation)"
applies_to:
  - production-llm-systems
gotchas:
  - "Too-tight caps truncate legitimate outputs mid-sentence (or mid-JSON, breaking parsers) — set caps from the observed output-length distribution per request type (e.g. p99 + margin), not from guesses"
  - "Hitting the cap is a signal worth logging: a rising truncation rate means either the cap is wrong or the model has started rambling after a prompt/model change"
metrics: []
related_tips:
  - set-token-budgets-per-feature
  - track-cost-per-feature
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Set `max_tokens` deliberately per request type — classification, extraction, summarization, chat — instead of leaving provider defaults (often thousands of tokens or the model maximum). Output tokens are the expensive ones (typically 3-5x input price), and unbounded generation is the failure mode that makes a single degenerate request expensive: a looping model or a prompt regression can emit thousands of junk tokens per call, multiplied across traffic. A cap converts "unbounded cost per failure" into "bounded and alertable."

## Before / After

**Before:** A yes/no classification endpoint runs with the default cap; a prompt regression makes the model explain its reasoning at length — output cost for the endpoint rises 40x before anyone notices.

**After:** The endpoint is capped at 16 tokens; the regression manifests as a truncation-rate alert within the hour, at negligible extra cost.

## Implementation

Measure the output-length distribution per request type from traces, set caps at p99 plus safety margin, log a metric whenever a response hits the cap, and alert on truncation-rate shifts.

## Gotchas

- Derive caps from observed distributions, not guesses — too-tight caps break outputs (especially JSON) mid-structure
- Log and alert on cap hits: rising truncation is a regression signal, not noise

## When NOT to Apply

- Genuinely open-ended generation (long-form writing, code generation) where legitimate output length is unbounded — use per-feature budgets and streaming with user control instead
- Reasoning-model calls where the provider counts hidden reasoning tokens against the cap; capping tightly can silently destroy answer quality

## Verification

Community-reported: explicit output caps as cost/failure containment is a recurring recommendation in provider documentation and cost-control post-mortems involving runaway generation; not independently benchmarked here against a named production system.
