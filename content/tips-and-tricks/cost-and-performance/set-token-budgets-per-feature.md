---
id: "set-token-budgets-per-feature"
title: "Set a Maximum Input/Output Token Budget Per Feature and Alert on Overruns"
category: "cost-reduction"
tags:
  - efficiency
  - observability
difficulty: "beginner"
impact: "high"
time_to_implement: "45 minutes"
phase: cost-and-performance
effort: hours
estimated_time: "~45 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (per-feature token-budget cost-governance discussions)"
applies_to:
  - multi-feature-applications
gotchas:
  - "Without a per-feature budget, one feature's cost regression (e.g. a prompt change that silently increases token usage) can go unnoticed until the aggregate bill spikes, with no easy way to attribute which feature caused it"
  - "A hard cap that's too aggressive can degrade quality by truncating legitimately-needed content -- set the budget based on measured typical usage plus headroom, not an arbitrary round number"
metrics: []
related_tips:
  - track-cost-per-feature
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Assign each distinct feature in your application an explicit maximum input and output token budget, and alert when a feature's actual usage approaches or exceeds it. Without per-feature budgets, a cost regression in one feature (a prompt change, a retrieval change that adds more context) can go unnoticed in the aggregate bill until it's a large, hard-to-attribute problem.

## Before / After

**Before:** token usage is tracked only in aggregate across the whole application, with no per-feature attribution or alerting.

**After:** each feature has an explicit token budget (e.g. `support_bot: max_input=4000, max_output=500`), with alerts firing when actual usage trends toward or exceeds it.

## Implementation

Measure current typical token usage per feature, set a budget with reasonable headroom above that baseline, instrument usage tracking per feature, and configure alerts for usage approaching or exceeding the budget.

## Gotchas

- Without per-feature budgets, a cost regression in one feature can go unnoticed until the aggregate bill spikes
- A budget set too aggressively can degrade quality by truncating needed content — base it on measured typical usage plus headroom, not an arbitrary number

## When NOT to Apply

- Skip per-feature budgeting for a single-feature application where aggregate tracking is already equivalent to per-feature tracking
- Not necessary if cost is not currently a meaningful constraint and the operational overhead of budget-setting isn't justified yet

## Verification

Community-reported: per-feature token budgets with overrun alerting are a widely repeated recommendation in LLM application cost-governance writeups, not independently benchmarked here against a named production system.
