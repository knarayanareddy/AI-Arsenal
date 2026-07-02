---
id: "classify-failures-before-fixing-prompts"
title: "Classify Failures by Root Cause Before Changing Prompts"
category: "debugging-llm-apps"
tags:
  - observability
  - evaluation
difficulty: "beginner"
impact: "high"
time_to_implement: "30 minutes"
phase: debugging-and-observability
effort: hours
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (root-cause-classification debugging discussions)"
applies_to:
  - debugging-workflows
gotchas:
  - "Editing the prompt in response to a failure that's actually a retrieval, tool, or parsing failure wastes effort and can make the prompt worse for cases it previously handled correctly, without fixing the real problem"
  - "Classification requires enough tracing detail to actually distinguish the failure categories (retrieved context, tool calls, parsed output all visible) -- without that visibility, classification degrades into guessing"
metrics: []
related_tips:
  - separate-model-errors-from-app-errors
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Before editing a prompt in response to a failure, classify what actually caused it — retrieval miss, reasoning error, tool failure, output-parsing failure, or policy violation — using trace data. Editing the prompt blind, without classification, risks fixing the wrong layer of the system and can degrade previously-working cases.

## Before / After

**Before:** every reported failure triggers a prompt edit, regardless of whether the actual cause was retrieval, tooling, or parsing.

**After:** each failure is first classified by root cause using trace data (was the right context retrieved? did tools return correctly? did parsing succeed?), and only failures actually caused by prompt/reasoning issues result in a prompt change.

## Implementation

Add failure-category tagging to your trace review process (retrieval / reasoning / tool / parsing / policy), inspect the relevant trace fields to determine the actual category before acting, and route the fix to the corresponding layer rather than defaulting to a prompt edit.

## Gotchas

- Editing the prompt for a failure that's actually a retrieval, tool, or parsing failure wastes effort and can degrade previously-working cases
- Classification requires enough tracing detail to distinguish the categories — without that visibility, it degrades into guessing

## When NOT to Apply

- Skip formal classification for a single, clearly prompt-caused failure with unambiguous evidence already in hand
- Not useful without adequate tracing infrastructure in place first — see `trace-tool-inputs-and-outputs` and `log-retrieved-context` as prerequisites

## Verification

Community-reported: classifying failures by root cause before making prompt changes is a widely repeated recommendation in LLM debugging writeups, not independently benchmarked here against a named production system.
