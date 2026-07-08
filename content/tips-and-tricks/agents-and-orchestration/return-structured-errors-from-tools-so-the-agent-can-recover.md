---
id: "return-structured-errors-from-tools-so-the-agent-can-recover"
title: "Return Structured Errors From Tools So the Agent Can Recover"
category: "agent-reliability"
tags:
  - agents
  - tool-use
  - monitoring
difficulty: "intermediate"
impact: "high"
time_to_implement: "half a day"
phase: agents-and-orchestration
effort: hours
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "practitioner reports (tool-use agent design)"
applies_to:
  - agent-tool-use
  - multi-tool-agents
gotchas:
  - "A raw stack trace or an opaque 500 returned to the agent gives it nothing actionable — it cannot tell a transient timeout (retry) from a bad argument (fix and retry) from a permanent failure (give up), so it flails or loops"
  - "Over-detailed errors leak internals and bloat context; the error should say what failed, whether it is retryable, and what to change — not dump the entire exception and SQL query"
metrics: []
related_tips:
  - cap-agent-tool-retries
  - define-fallbacks-for-tool-failures
  - validate-tool-arguments-before-execution
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Make tools return errors as structured, actionable messages the model can reason over, rather than raw exceptions or bare status codes. An agent decides its next move from the tool's response; when a failure comes back as an opaque stack trace or a generic "error", the model cannot distinguish a transient timeout (worth retrying) from an invalid argument (worth fixing) from a permanent condition (worth abandoning). The result is blind retries, loops, or premature give-ups. A structured error tells the agent what happened and what to do about it.

## Before / After

**Before:** A tool raises and the framework returns `"Error: 500 Internal Server Error"` — the agent retries the identical call five times and then hallucinates a result.

**After:** The tool returns `{"error": "invalid_argument", "retryable": false, "detail": "date must be YYYY-MM-DD", "field": "start_date"}` — the agent corrects the argument and succeeds on the next call.

## Implementation

Wrap tool execution so every failure returns a small structured object: an error category (e.g. `invalid_argument`, `not_found`, `rate_limited`, `transient`, `permanent`), a `retryable` boolean, and a concise human-readable `detail` naming what to change. Map exceptions to these categories at the tool boundary; never pass raw tracebacks to the model. Keep the payload short so it does not crowd the context window.

## Gotchas

- A raw stack trace or opaque 500 gives the agent nothing actionable — it cannot tell a transient failure from a bad argument from a permanent one, so it flails or loops.
- Over-detailed errors leak internals and bloat context; say what failed, whether it is retryable, and what to change — not the entire exception.

## When NOT to Apply

- Overkill for a single-tool agent where the one failure mode is already handled by a simple retry wrapper.
- Skip the elaborate taxonomy when tools are internal and their raw errors are already concise and categorized.

## Verification

Community-reported: structured, model-readable tool errors are a recurring agent-reliability recommendation; the recovery-rate improvement is agent- and task-specific and is not benchmarked here.
