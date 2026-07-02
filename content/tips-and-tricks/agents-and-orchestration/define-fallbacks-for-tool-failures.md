---
id: "define-fallbacks-for-tool-failures"
title: "Define Explicit Fallbacks for Tool Failures"
category: "agent-reliability"
tags:
  - agents
  - tool-use
  - monitoring
difficulty: "intermediate"
impact: "high"
time_to_implement: "1 hour"
phase: agents-and-orchestration
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: community-reported
verified_by: "community reports (production agent reliability writeups)"
applies_to:
  - agent-tool-use
gotchas:
  - "A fallback that silently substitutes a lower-quality result without informing the user (or the agent's own downstream reasoning) can produce confidently wrong final answers"
  - "Fallback logic itself needs testing -- an untested fallback path is often the least reliable part of the system precisely because it runs rarely"
metrics: []
related_tips:
  - cap-agent-tool-retries
  - checkpoint-agent-state-after-each-tool-call
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

For each tool an agent depends on, define what should happen when it times out, returns invalid data, or is unavailable — a cached/stale result, a simpler alternative tool, or an explicit "I can't complete this part" message — rather than letting the failure propagate as an unhandled exception that crashes the whole task.

## Before / After

**Before:** `result = call_tool(name, args)` with no handling if the call raises or times out.

**After:** `result = call_tool(name, args) or FALLBACKS[name](args)`, where each tool has an explicit, tested fallback behavior defined ahead of time, not improvised at failure time.

## Implementation

Maintain a fallback registry keyed by tool name, invoked when the primary tool call fails after its retry budget (see `cap-agent-tool-retries`) is exhausted; the fallback should be conservative by default (surface a clear "could not complete X" to the agent's context) unless a genuinely safe degraded alternative exists.

## Gotchas

- A fallback that silently substitutes a lower-quality result without informing the user or the agent's downstream reasoning can produce confidently wrong final answers
- Fallback logic itself needs testing — an untested fallback path is often the least reliable part of the system precisely because it runs rarely

## When NOT to Apply

- Skip this for tools with no meaningful degraded alternative and where failure should always halt the task (e.g. a payment-processing call — there is no safe fallback for "payment maybe went through")
- Skip building a fallback registry if your framework already provides configurable retry-then-fail behavior that meets your needs without a custom layer

## Verification

Community-reported: explicit per-tool fallback definitions are a commonly recommended reliability pattern in production agent writeups, though this specific entry has not yet been independently verified against a named deployment — flagged `enrichment_status: draft` pending stronger evidence.
