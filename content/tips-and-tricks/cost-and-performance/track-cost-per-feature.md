---
id: "track-cost-per-feature"
title: "Track LLM Cost Broken Down Per Feature, Not Only in Aggregate"
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
verified_by: "community reports (per-feature cost attribution discussions)"
applies_to:
  - multi-feature-applications
gotchas:
  - "Without per-feature attribution, a single expensive feature can be silently subsidized by cost savings elsewhere in the aggregate, hiding a real opportunity for targeted optimization"
  - "Attribution requires a feature identifier to be threaded through every LLM call at the point cost is recorded -- retrofitting this into an existing system without that identifier already present requires real instrumentation work"
metrics: []
related_tips:
  - set-token-budgets-per-feature
  - track-cost-per-successful-outcome
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Attribute LLM API cost to the specific feature or product surface that generated it, rather than tracking only a single aggregate cost figure. An aggregate number can mask which feature is actually driving cost, making it impossible to prioritize optimization effort toward the highest-cost feature specifically.

## Before / After

**Before:** a single dashboard number shows total monthly LLM spend, with no breakdown by which feature generated it.

**After:** each LLM call is tagged with a feature identifier at the point of the call, and cost dashboards break down spend by feature, making the highest-cost features visible.

## Implementation

Thread a feature identifier through every LLM call (as metadata passed to your cost-tracking/logging layer), aggregate cost by that identifier, and surface a per-feature cost breakdown on your cost dashboards.

## Gotchas

- Without per-feature attribution, an expensive feature can be silently subsidized by savings elsewhere in the aggregate, hiding an optimization opportunity
- Attribution requires threading a feature identifier through every call at the point cost is recorded — retrofitting this requires real instrumentation work

## When NOT to Apply

- Skip per-feature breakdown for a single-feature application where aggregate cost already equals per-feature cost
- Not necessary if cost isn't yet a meaningful constraint and the instrumentation effort isn't justified

## Verification

Community-reported: per-feature cost attribution is a widely repeated recommendation in LLM application cost-governance writeups, not independently benchmarked here against a named production system.
