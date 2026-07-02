---
id: "store-prompt-version-in-every-trace"
title: "Store the Exact Prompt Version in Every Trace"
category: "debugging-llm-apps"
tags:
  - observability
  - tracing
difficulty: "beginner"
impact: "high"
time_to_implement: "20 minutes"
phase: debugging-and-observability
effort: minutes
estimated_time: "~20 minutes"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (prompt-version-in-trace as standard practice)"
applies_to:
  - production-tracing
gotchas:
  - "Without a prompt version recorded on the trace, a failure investigated weeks after the fact can't be reliably tied to the prompt that actually produced it, since the prompt has likely since been edited"
  - "This requires prompts to actually be versioned in the first place (see store-prompts-with-release-versions / version-system-prompts-like-code) -- there's no version to record on the trace if the prompt itself isn't versioned"
metrics: []
related_tips:
  - replay-the-same-trace-with-one-variable-changed
  - separate-model-errors-from-app-errors
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Record the exact prompt version identifier on every trace, in addition to the model name and parameters. A trace without a prompt version is difficult to reproduce or debug after the fact, since the prompt has likely been edited by the time anyone investigates, and there's no way to reconstruct exactly what was in effect at request time.

## Before / After

**Before:** `trace.log({"model": "gpt-4", "response": ...})` — no reference to which prompt version generated the request.

**After:** `trace.log({"model": "gpt-4", "prompt_version": "support-rag-v12", "response": ...})` — the trace pins down the exact prompt version used.

## Implementation

Add a `prompt_version` field to your trace schema, populate it from your prompt versioning system (see `store-prompts-with-release-versions`) on every request, and ensure it's queryable so failures can be filtered or grouped by prompt version.

## Gotchas

- Without a prompt version on the trace, a later investigation can't reliably tie a failure to the prompt that actually produced it
- This requires prompts to already be versioned — there's no version to record if the prompt itself isn't versioned in the first place

## When NOT to Apply

- Skip this if prompts never change after initial deployment for a given feature (rare, but possible for very stable pipelines)
- Not meaningful without an underlying prompt-versioning system in place — set that up first

## Verification

Production-verified: recording prompt version on every trace is a standard, widely documented practice for reproducible LLM application debugging.
