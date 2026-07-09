---
id: "alarm-on-empty-and-unparseable-responses"
title: "Alarm on Empty and Unparseable Responses"
category: "production-gotchas"
tags:
  - observability
  - llm
difficulty: "intermediate"
impact: "high"
time_to_implement: "a few hours"
phase: debugging-and-observability
effort: hours
estimated_time: "~2-3 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (production LLM monitoring practice)"
applies_to:
  - production-deployment
gotchas:
  - "Empty/malformed rates often spike quietly after a model or prompt change while overall error rate stays green -- these are usually 200-OK responses, so HTTP monitoring misses them"
  - "A retry-on-parse-failure loop can mask the problem in metrics while multiplying cost and latency; count parse failures even when the retry eventually succeeds"
metrics: []
related_tips:
  - separate-model-errors-from-app-errors
  - log-raw-and-parsed-model-outputs
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

A large class of LLM production failures are not HTTP errors — they are successful 200 responses whose *body* is unusable: an empty completion, a truncated JSON, prose where a schema was required, a refusal where an answer was expected. Standard uptime monitoring sees these as healthy. If you do not explicitly count and alarm on empty and unparseable responses, a prompt or model change can silently break a downstream parser for a whole segment of traffic while every dashboard stays green. Make output-validity a first-class monitored metric.

## Before / After

**Before:** A model update starts wrapping JSON in prose; the parser fails on 15% of requests, users get errors, but the service dashboard is all green because every call returned 200.

**After:** An "unparseable response rate" metric spikes from 0.2% to 15% and pages on-call within minutes; the prompt is patched or the model pinned back.

## Implementation

Instrument the boundary where you consume the model output: increment a counter for empty completions and for parse/schema-validation failures, tagged by model and prompt version. Alert on rate thresholds and on sudden increases. Count a parse failure even when a retry later succeeds, so retries do not hide the regression. Sample and store the offending outputs for debugging.

## Gotchas

- These failures are 200-OK bodies; HTTP-level monitoring will not catch them — measure at the parse boundary
- Retry-until-success masks the failure in success metrics while inflating cost/latency; count the failures separately

## When NOT to Apply

- Free-form generation with no downstream parser has no "unparseable" state — monitor emptiness/refusals instead
- Very early prototypes may not warrant paging alerts yet, but the counter is cheap to add from day one

## Verification

Community-reported: monitoring output validity (empty/malformed/refusal rates) is emphasized in production LLM observability guides. Thresholds are application-specific.
