---
id: "track-cost-per-successful-outcome"
title: "Track Cost Per Successful Outcome, Not Just Cost Per Model Call"
category: "cost-reduction"
tags:
  - observability
  - efficiency
difficulty: "intermediate"
impact: "high"
time_to_implement: "1 hour"
phase: cost-and-performance
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (outcome-based cost tracking discussions)"
applies_to:
  - production-cost-monitoring
gotchas:
  - "Cost-per-call alone can look like it's improving (cheaper model, fewer tokens) while cost-per-successful-outcome gets worse, if the cheaper approach requires more retries or produces more failures that need human intervention"
  - "Defining 'successful outcome' requires an actual success signal (task completion, user acceptance, resolution without escalation) -- without one, this metric can't be computed and cost-per-call remains the only available proxy"
metrics: []
related_tips:
  - route-simple-tasks-to-smaller-models
  - track-cost-per-feature
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Measure and optimize cost per successfully completed task, in addition to cost per individual model call. A cheaper model or shorter prompt that requires more retries, more escalations, or more failed attempts can have a lower per-call cost while actually costing more per resolved task — cost-per-call alone hides this tradeoff.

## Before / After

**Before:** cost dashboards report only `total_api_cost / total_calls`, which improves when switching to a cheaper model even if that model fails more often and requires retries.

**After:** cost dashboards report `total_cost_including_retries / count_of_successful_outcomes`, capturing the true cost of getting to a resolved task.

## Implementation

Define a clear success signal for the task (completion, user acceptance, resolution without escalation), track total cost across all attempts (including retries and failures) per task, and compute cost-per-successful-outcome as the primary cost metric alongside — not instead of — cost-per-call.

## Gotchas

- Cost-per-call can look like it's improving while cost-per-successful-outcome gets worse, if the cheaper approach requires more retries or produces more failures
- Defining "successful outcome" requires an actual success signal — without one, this metric can't be computed

## When NOT to Apply

- Skip this for features with no clear, measurable success/failure signal to attach cost to
- Not necessary for very low-stakes, low-volume features where the analysis overhead isn't justified by the modest cost involved

## Verification

Production-verified: tracking cost per successful outcome rather than cost per call alone is a standard, widely documented practice in outcome-based cost monitoring for production LLM applications.
