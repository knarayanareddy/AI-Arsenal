---
id: "trace-tool-inputs-and-outputs"
title: "Trace Tool Call Arguments and Return Values, Not Just Final Answers"
category: "debugging-llm-apps"
tags:
  - observability
  - tracing
difficulty: "beginner"
impact: "high"
time_to_implement: "30 minutes"
phase: debugging-and-observability
effort: hours
estimated_time: "~30 minutes"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (agent tool-call tracing as standard observability practice)"
applies_to:
  - agentic-systems
gotchas:
  - "Without tool-level tracing, a wrong final answer from an agent gives no visibility into which tool call (or which step) actually produced the bad information -- the only record is the outcome, not the path that led to it"
  - "Tool inputs/outputs can contain sensitive data (the same concern as prompt tracing) -- apply the same redaction discipline (see redact-secrets-before-tracing) to tool traces"
metrics: []
related_tips:
  - log-raw-and-parsed-model-outputs
  - redact-secrets-before-tracing
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

For agentic systems, record the arguments passed to every tool call and the value returned, not only the agent's final answer. When an agent produces a wrong result, the final answer alone gives no visibility into which specific tool call in the chain introduced the error — full tool-level tracing is what makes that chain inspectable.

## Before / After

**Before:** trace logs record only the agent's final response, with no record of intermediate tool calls or their results.

**After:** trace logs record every tool call's name, arguments, and return value in sequence, so the full decision chain leading to the final answer is reconstructable.

## Implementation

Add tool-call-level trace entries (tool name, arguments, return value, timestamp) at every tool invocation point in your agent's execution loop, and apply redaction to sensitive fields the same way you would for prompt traces.

## Gotchas

- Without tool-level tracing, a wrong final answer gives no visibility into which tool call actually produced the bad information
- Tool inputs/outputs can contain sensitive data — apply the same redaction discipline used for prompt traces

## When NOT to Apply

- Skip this for systems with no tool-calling at all (pure text generation) — there's nothing at this layer to trace
- Not necessary at full fidelity for tools that are purely deterministic and side-effect-free with negligible failure risk, where the added tracing overhead outweighs the debugging benefit

## Verification

Production-verified: tracing tool call arguments and return values in agentic systems is a standard, widely documented observability practice.
