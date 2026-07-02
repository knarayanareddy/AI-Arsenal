---
id: "replay-the-same-trace-with-one-variable-changed"
title: "Replay a Failing Trace With Exactly One Variable Changed"
category: "debugging-llm-apps"
tags:
  - observability
  - tracing
difficulty: "intermediate"
impact: "high"
time_to_implement: "30 minutes"
phase: debugging-and-observability
effort: hours
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (controlled-replay debugging discipline)"
applies_to:
  - debugging-workflows
gotchas:
  - "Changing multiple variables at once (prompt and model, or retrieval and temperature) when replaying a failing trace makes it impossible to attribute the resulting behavior change to a specific cause"
  - "Replay requires the original trace to be complete enough to reconstruct exactly (prompt version, retrieved context, model parameters) -- an incomplete trace can't be replayed faithfully, which is itself an argument for thorough tracing upstream"
metrics: []
related_tips:
  - add-a-minimal-reproduction-prompt
  - store-prompt-version-in-every-trace
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

When investigating a failure, replay the exact original trace with only one variable changed at a time (the prompt, the model, the temperature, the retrieved context), rather than changing several things at once. Changing multiple variables simultaneously makes it impossible to know which change actually caused the resulting behavior difference.

## Before / After

**Before:** a failing case is re-run with a new prompt version and a different model simultaneously, then the change is judged to have "fixed" the issue with no way to tell which change mattered.

**After:** the failing trace is replayed first with only the prompt changed (model and context held constant), evaluated, and only then is a second isolated variable changed if needed.

## Implementation

Reconstruct the exact original trace conditions (prompt version, retrieved context, model, parameters), change exactly one variable, re-run, and record the outcome before considering any further changes.

## Gotchas

- Changing multiple variables at once makes it impossible to attribute the resulting behavior change to a specific cause
- Replay requires the original trace to be complete enough to reconstruct exactly — an incomplete trace can't be replayed faithfully

## When NOT to Apply

- Skip single-variable isolation for exploratory debugging where the goal is a fast directional signal, not a rigorous causal attribution
- Not practical if trace completeness (see `store-prompt-version-in-every-trace`) isn't in place yet — fix that gap first

## Verification

Community-reported: controlled, single-variable replay is a widely repeated debugging discipline in software engineering generally, directly applicable to LLM application debugging, not independently benchmarked here against a named production system.
