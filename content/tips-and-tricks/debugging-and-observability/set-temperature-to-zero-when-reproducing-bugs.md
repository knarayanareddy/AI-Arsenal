---
id: "set-temperature-to-zero-when-reproducing-bugs"
title: "Set Temperature to Zero When Reproducing Bugs"
category: "debugging-llm-apps"
tags:
  - observability
  - llm
difficulty: "beginner"
impact: "medium"
time_to_implement: "minutes"
phase: debugging-and-observability
effort: minutes
estimated_time: "~5 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (LLM debugging practice)"
applies_to:
  - production-deployment
gotchas:
  - "Temperature 0 reduces but does not fully eliminate nondeterminism -- batching, hardware, and MoE routing can still vary outputs slightly across runs and providers"
  - "You are debugging a different configuration than production runs at; confirm the fix at the production temperature before closing the bug"
metrics: []
related_tips:
  - add-a-minimal-reproduction-prompt
  - replay-the-same-trace-with-one-variable-changed
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Debugging a nondeterministic system is painful: you change one thing, the output changes for ten reasons, and you cannot tell whether your fix helped. Setting temperature to 0 (greedy decoding) removes most of the sampling randomness, so the same prompt tends to yield the same output run to run. That lets you isolate the variable you actually changed. Reproduce and iterate at temperature 0, then re-verify the fix at the real production temperature — because a fix that only works under greedy decoding is not a fix.

## Before / After

**Before:** A flaky formatting bug appears "sometimes"; each debugging run produces a different output, so you cannot confirm whether your prompt tweak addressed it.

**After:** At temperature 0 the bug reproduces consistently, you change one instruction, the output changes predictably, and you confirm the fix — then re-check at production temperature.

## Implementation

Set temperature to 0 (and fix seed where the provider supports it) in your debugging harness. Change one variable at a time and compare outputs. Once you believe the bug is fixed, run the case several times at the production temperature to confirm the fix holds under sampling, since that is how users hit it.

## Gotchas

- Temperature 0 is not fully deterministic across batching/hardware/providers — expect occasional variation even greedy
- You are testing a non-production config; always re-validate at the real temperature before closing

## When NOT to Apply

- Bugs that only manifest under sampling diversity (e.g. mode collapse, repetition) must be studied at the production temperature
- Evaluating creative-generation quality needs realistic sampling, not greedy decoding

## Verification

Community-reported: greedy decoding for reproducibility is standard LLM debugging advice. Residual nondeterminism at temperature 0 is documented across providers and not eliminated here.
