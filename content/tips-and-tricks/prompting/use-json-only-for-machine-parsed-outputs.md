---
id: "use-json-only-for-machine-parsed-outputs"
title: "Request JSON Only When a Parser Will Consume the Output"
category: "prompting"
tags:
  - llm
  - structured-output
difficulty: "beginner"
impact: "medium"
time_to_implement: "20 minutes"
phase: prompting
effort: minutes
estimated_time: "~20 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (output-format-selection discussions)"
applies_to:
  - api-integrations
gotchas:
  - "Requesting JSON for outputs that a human will actually read produces a worse reading experience than readable prose or markdown, with no corresponding benefit"
  - "Requesting JSON increases the chance the model spends effort on formatting mechanics (quoting, escaping) rather than content quality on tasks where that formatting isn't actually needed downstream"
metrics: []
related_tips:
  - use-json-schema-for-outputs
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Request JSON output only when a downstream parser will actually consume it programmatically; for human-facing output, prefer readable prose or markdown instead. Defaulting to JSON for every output type adds formatting overhead and produces a worse experience wherever a human is the actual consumer.

## Before / After

**Before:** every LLM call, including ones that render output directly to a human-facing chat UI, requests `{"answer": "..."}` JSON.

**After:** JSON requested only for calls whose output feeds a parser or downstream automation; human-facing chat responses request plain, readable text.

## Implementation

Classify each call site by its actual consumer (parser vs. human reader) and set the output format instruction accordingly — JSON schema mode for the former, plain prose for the latter.

## Gotchas

- Requesting JSON for human-read outputs produces a worse reading experience with no corresponding benefit
- Requesting JSON increases formatting-mechanics overhead on tasks where that structure isn't actually needed downstream

## When NOT to Apply

- Skip this distinction if your application has only one output type and one consumer, with no ambiguity about format needs
- Not relevant if your output always needs to be both human-readable and machine-parseable — in that case, consider a structured format with a rendering layer instead of choosing one exclusively

## Verification

Community-reported: matching output format (JSON vs. prose) to the actual downstream consumer is a widely repeated prompting recommendation, not independently benchmarked here against a named production system.
