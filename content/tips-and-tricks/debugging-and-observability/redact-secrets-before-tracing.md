---
id: "redact-secrets-before-tracing"
title: "Redact Secrets and Sensitive Data Before Writing to Traces"
category: "security-best-practices"
tags:
  - security
  - observability
difficulty: "intermediate"
impact: "high"
time_to_implement: "1 hour"
phase: debugging-and-observability
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (trace-data redaction as standard observability practice)"
applies_to:
  - production-tracing
gotchas:
  - "Redaction has to happen before data is written to the trace store, not after -- once sensitive data lands in a log aggregator or trace database, deleting it after the fact is unreliable and can miss replicated or cached copies"
  - "A regex-based redaction pass can miss sensitive data in unexpected formats (e.g. a credential embedded in an unusual field or encoding) -- validate redaction coverage against real sample traces, rather than an assumed pattern list alone"
metrics: []
related_tips:
  - log-raw-and-parsed-model-outputs
  - review-data-retention-for-prompts
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Strip API keys, credentials, and sensitive user data from prompts, tool inputs/outputs, and model responses before they are written to a trace or logging store, not after. Traces are frequently retained for extended periods and accessed by more people (debugging, analytics) than the original request path, making them a high-exposure surface for any secret that flows through unredacted.

## Before / After

**Before:** `trace.log({"prompt": raw_prompt, "tool_output": raw_tool_response})` with no redaction step, potentially capturing API keys or PII embedded in either.

**After:** `trace.log({"prompt": redact(raw_prompt), "tool_output": redact(raw_tool_response)})` — a redaction pass runs before anything is persisted to the trace store.

## Implementation

Add a redaction step (pattern-based for known secret formats like API keys, plus a PII detector if applicable) that runs on every field before it's written to the trace store, and validate its coverage against a sample of real traces containing known sensitive patterns.

## Gotchas

- Redaction has to happen before data reaches the trace store — deleting sensitive data after the fact is unreliable and can miss replicated copies
- Regex-based redaction can miss sensitive data in unexpected formats — validate coverage against real sample traces, rather than an assumed pattern list alone

## When NOT to Apply

- Skip elaborate redaction if your system genuinely never handles secrets or sensitive user data in prompts, tool calls, or responses
- Not a substitute for proper secrets management (e.g. never embedding API keys in prompts in the first place) — redaction is a safety net, not a reason to be careless about what enters the pipeline

## Verification

Production-verified: redacting secrets and sensitive data before persisting to trace/logging stores is a standard, widely documented observability security practice.
