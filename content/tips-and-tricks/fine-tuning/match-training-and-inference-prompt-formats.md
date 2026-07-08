---
id: "match-training-and-inference-prompt-formats"
title: "Match Training and Inference Prompt Formats Exactly"
category: "production-gotchas"
tags:
  - fine-tuning
  - inference
  - llm
difficulty: "intermediate"
impact: "high"
time_to_implement: "2 hours"
phase: fine-tuning
effort: hours
estimated_time: "~2 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (chat-template mismatch bug reports)"
applies_to:
  - fine-tuning-workflows
  - llm-apps
gotchas:
  - "Different libraries apply different default chat templates for the same base model -- the trainer and the serving engine must be checked against each other, not against documentation"
  - "System-prompt presence/absence is part of the format: training with one and serving without one (or vice versa) is a silent mismatch"
metrics: []
related_tips:
  - inspect-your-training-data-by-hand
  - pin-model-and-runtime-versions
added_date: "2026-07-07"
added_by: maintainer
last_reviewed: "2026-07-07"
enrichment_status: draft
---

## What & Why

The serialized token sequence at inference must match the training format exactly: chat template, special tokens, system-prompt convention, and stop tokens. Chat-template mismatch is the most common cause of a fine-tune that scored well offline behaving erratically in production — the model was trained on one framing and is being queried in another, and nothing errors; quality degrades in ways that look like model failure.

## Before / After

**Before:** Training data serialized with one chat template; the serving engine applies the base model's default template, which differs in special tokens. The fine-tune rambles past turn boundaries and ignores the system prompt.

**After:** One template definition is shared by the training serializer and the serving engine; a round-trip test asserts byte-identical rendering before deployment.

## Implementation

Treat the chat template as a versioned artifact owned by the project, not a library default. Render a fixed test conversation through the training pipeline's serializer and through the serving engine's template path, and assert token-level equality in CI. Re-run the assertion whenever the trainer, serving engine, or tokenizer version changes.

## Gotchas

- Trainer and server defaults can disagree for the same model family — verify against each other empirically
- System-prompt convention (always present, never present, or variable) is part of the format contract and must match

## When NOT to Apply

- Not relevant for base-model (non-chat) completion-style fine-tunes with a single flat format — though the stop-token discipline still applies
- Deliberate format transfer experiments (training on one format to serve another) are research territory, not production practice

## Verification

Community-reported: template-mismatch failures are among the most frequently reported fine-tuning bugs across trainer and serving-engine issue trackers; the round-trip CI check is the standard prevention.
