---
id: "measure-first-token-latency"
title: "Measure Time-to-First-Token Separately From Total Generation Time"
category: "latency-optimization"
tags:
  - inference
  - observability
difficulty: "beginner"
impact: "medium"
time_to_implement: "30 minutes"
phase: cost-and-performance
effort: hours
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (perceived-latency-metric discussions)"
applies_to:
  - chat-applications
gotchas:
  - "A dashboard tracking only total generation time can hide a time-to-first-token regression (e.g. from queueing or a slow first-pass compute step) that directly affects perceived responsiveness"
  - "Time-to-first-token and total generation time can move independently -- a change that improves one can worsen the other, so both need to be tracked rather than whichever is more convenient to measure"
metrics: []
related_tips:
  - stream-user-facing-responses
  - measure-queue-time-separately
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Track time-to-first-token as a distinct metric from total generation time, especially for streaming interfaces where perceived responsiveness depends on how quickly the first token appears, not how long the full response takes to complete. A dashboard tracking only total generation time can hide a first-token latency regression that directly harms perceived UX.

## Before / After

**Before:** latency dashboards report only `total_generation_time`, with no separate visibility into how long users wait before seeing any output.

**After:** `time_to_first_token` is tracked as its own metric alongside total generation time, surfaced separately on dashboards and alerts.

## Implementation

Instrument the streaming response path to record a timestamp at the first received token (separate from request start and completion), and track this as a distinct metric on your latency dashboards.

## Gotchas

- A dashboard tracking only total generation time can hide a first-token latency regression that directly harms perceived UX
- Time-to-first-token and total generation time can move independently — both need tracking, rather than whichever is more convenient

## When NOT to Apply

- Skip separate tracking for non-streaming, single-shot responses where users only ever see the complete output at once
- Not necessary if your traffic pattern makes total completion time the only metric that actually matters to users (e.g. batch/offline processing)

## Verification

Community-reported: tracking time-to-first-token as a distinct latency metric is a widely repeated recommendation in streaming-interface observability writeups, not independently benchmarked here against a named production system.
