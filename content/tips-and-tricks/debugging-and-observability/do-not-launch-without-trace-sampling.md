---
id: "do-not-launch-without-trace-sampling"
title: "Capture Sampled Traces Before Real Users Hit the System"
category: "production-gotchas"
tags:
  - observability
  - tracing
difficulty: "beginner"
impact: "high"
time_to_implement: "1 hour"
phase: debugging-and-observability
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: community-reported
verified_by: "community reports (pre-launch observability checklists)"
applies_to:
  - production-launches
gotchas:
  - "Launching without any trace capture means the first real failures have no diagnostic record at all -- by the time tracing is added reactively, the specific failing conditions are often already gone"
  - "100% trace sampling can be cost-prohibitive at scale -- a reasonable sampling rate (not zero) is the actual goal, not necessarily full capture from day one"
metrics: []
related_tips:
  - trace-tool-inputs-and-outputs
  - store-prompt-version-in-every-trace
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Set up at least sampled trace capture (prompts, responses, key intermediate steps) before a system goes live with real user traffic, rather than adding tracing reactively after the first production incident. Without any pre-launch trace capture, early failures leave no diagnostic record, and by the time tracing is added the specific failing conditions are often gone.

## Before / After

**Before:** a feature launches with no tracing infrastructure in place; tracing gets added only after the first significant production incident.

**After:** trace sampling (even at a modest rate, e.g. 10-20% of requests) is wired in before launch, capturing enough real traffic to diagnose early issues.

## Implementation

Wire trace capture into the request path before launch, set an initial sampling rate that balances cost against diagnostic coverage, and adjust the rate upward temporarily around launch if early issue volume warrants closer visibility.

## Gotchas

- Launching without trace capture means early failures leave no diagnostic record, and reactive tracing often can't reconstruct the failing conditions
- 100% sampling can be cost-prohibitive at scale — the goal is a reasonable non-zero rate, not necessarily full capture from day one

## When NOT to Apply

- Skip elaborate sampling infrastructure for an internal-only prototype with no real user traffic or reliability requirement
- Not necessary if a mature tracing platform is already standard across your organization's launches and this is already satisfied by default

## Verification

Community-reported: capturing sampled traces before launch is a widely repeated recommendation in pre-launch observability checklists, not independently benchmarked here against a named production system.
