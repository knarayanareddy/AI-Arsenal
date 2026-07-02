---
id: "log-raw-and-parsed-model-outputs"
title: "Log Both the Raw Model Output and the Parsed Result"
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
verified_by: "practitioner reports (raw+parsed logging discipline in structured-output pipelines)"
applies_to:
  - structured-output-pipelines
gotchas:
  - "Logging only the parsed result makes it impossible to tell whether a downstream failure came from the model's raw output being malformed or from a bug in your own parsing logic -- both need to be visible to distinguish them"
  - "Raw model output can contain sensitive content that needs the same redaction treatment as any other trace data before storage -- logging the raw output doesn't exempt it from data-retention/redaction policy"
metrics: []
related_tips:
  - separate-model-errors-from-app-errors
  - redact-secrets-before-tracing
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Store both the model's raw text output and the result of parsing it (e.g. the extracted JSON object), rather than only the parsed result. When a downstream consumer receives bad data, having only the parsed output makes it impossible to tell whether the model produced malformed output or your parser has a bug — both look identical from the parsed side alone.

## Before / After

**Before:** `trace.log(parsed_result)` — only the final parsed object is stored.

**After:** `trace.log({"raw_output": raw_text, "parsed_result": parsed_result, "parse_success": bool})` — both the raw text and parse outcome are stored alongside the parsed result.

## Implementation

Add both `raw_output` and `parsed_result` fields to your trace/log schema, populate both on every call, and include a `parse_success` flag so parse failures are queryable directly rather than requiring manual inspection of every trace.

## Gotchas

- Logging only the parsed result makes it impossible to distinguish a malformed model output from a parser bug — both need to be visible
- Raw model output needs the same redaction treatment as any other trace data before storage — it isn't exempt from data-retention policy

## When NOT to Apply

- Skip this for outputs with no parsing step at all (plain text passed through unchanged) — there's nothing distinct to log
- Not necessary if your provider's structured-output mode already guarantees schema-valid output with no parsing failure mode to debug

## Verification

Production-verified: logging both raw and parsed model outputs is a standard, widely documented practice in structured-output pipeline debugging.
