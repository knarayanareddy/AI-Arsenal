---
id: "correlate-llm-traces-with-request-ids"
title: "Propagate Application Request IDs Into Every LLM Trace"
category: "debugging-llm-apps"
tags:
  - observability
  - tracing
difficulty: "beginner"
impact: "high"
time_to_implement: "2-4 hours"
phase: debugging-and-observability
effort: hours
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "community reports (distributed tracing practice; LLM observability tooling docs)"
applies_to:
  - production-llm-systems
gotchas:
  - "Generating a fresh ID inside the LLM service instead of propagating the caller's ID defeats the purpose — the correlation must start at the edge (gateway/frontend) and flow through every hop"
  - "Async and queued work drops context silently; make sure the ID survives job serialization, not just in-process call chains"
metrics: []
related_tips:
  - trace-tool-inputs-and-outputs
  - store-prompt-version-in-every-trace
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Carry the application's request/correlation ID into every LLM span, log line, and eval record, so a single user complaint can be traced from the frontend click through retrieval, each model call, and the final response. LLM observability tools and application APM often live in separate systems; without a shared ID, debugging means timestamp archaeology — matching a 14:32:07 support ticket against thousands of anonymous traces. With it, "user X got a wrong answer at 14:32" resolves to the exact trace in seconds.

## Before / After

**Before:** Support ticket says "the bot told me to cancel my subscription to fix billing" — engineers grep logs by approximate time and hope the user's request stands out among hundreds.

**After:** The ticket carries `request_id=abc123`; one query returns the full trace — the retrieved chunks, the prompt version, the model response — and the bad retrieved document is identified in one minute.

## Implementation

Accept/generate the correlation ID at the edge, propagate it via context (HTTP headers, job payloads, async task metadata), and attach it as a standard attribute on every LLM span and structured log line — OpenTelemetry trace context does this for free if your LLM instrumentation joins the existing trace instead of starting its own.

## Gotchas

- The ID must originate at the edge and be propagated, not regenerated per service
- Async/queued work drops context silently — verify the ID survives job serialization

## When NOT to Apply

- Rarely skip-worthy; the only real exception is throwaway prototypes with no users, where there is nothing to correlate yet

## Verification

Community-reported: request-ID correlation is standard distributed-tracing practice extended to LLM spans, recommended across LLM observability tooling documentation; not independently benchmarked here against a named production system.
