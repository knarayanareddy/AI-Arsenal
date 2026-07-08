---
id: "track-refusal-rates-as-a-regression-signal"
title: "Track Refusal and Non-Answer Rates as a First-Class Regression Signal"
category: "debugging-llm-apps"
tags:
  - observability
  - monitoring
  - evaluation
difficulty: "intermediate"
impact: "medium"
time_to_implement: "half a day"
phase: debugging-and-observability
effort: hours
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "community reports (production LLM monitoring writeups; over-refusal regressions after provider model updates)"
applies_to:
  - production-llm-systems
gotchas:
  - "Keyword matching ('I cannot', 'I'm sorry') misses paraphrased refusals and false-positives on legitimate answers quoting those phrases — a small classifier or LLM judge on a sampled stream is more reliable"
  - "Some refusals are correct behavior (genuinely unsafe requests); track refusal rate per intent segment so you can distinguish 'refusing more attacks' from 'refusing more customers'"
metrics: []
related_tips:
  - separate-model-errors-from-app-errors
  - slice-eval-metrics-by-input-segment
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Classify responses as answered / refused / hedged-non-answer, and monitor that rate over time with alerts on shifts. Refusal regressions are among the most common silent failures in production LLM systems: a provider model update, a prompt tweak, or a guardrail change can double refusals on legitimate queries overnight while every latency and error dashboard stays green — because refusing is, technically, a successful 200 response. Users experience it as the product breaking; standard monitoring can't see it.

## Before / After

**Before:** Provider silently updates the underlying model; refusals on a legitimate insurance-question intent jump from 2% to 15%; the team learns about it from a week of angry tickets.

**After:** The refusal-rate dashboard spikes within an hour of the model change, segmented to the affected intent, and the team rolls back / adjusts the prompt the same day.

## Implementation

Run a lightweight refusal classifier (small model or LLM judge over a sampled stream; regex only as a first pass) on production responses, emit refusal-rate metrics per intent segment and per prompt/model version, and alert on relative shifts against a rolling baseline rather than absolute thresholds.

## Gotchas

- Keyword matching both misses paraphrased refusals and false-positives — classify, don't grep
- Segment by intent: rising refusals on attack traffic is success; on customer traffic it's an incident

## When NOT to Apply

- Systems with structured-only outputs where a refusal manifests as a validation failure you already count
- Very low-traffic internal tools where per-conversation human review is feasible anyway

## Verification

Community-reported: over-refusal regressions after model/prompt updates are a widely documented production failure mode, and refusal-rate monitoring is a recurring recommendation in LLM production-monitoring writeups; not independently benchmarked here against a named production system.
