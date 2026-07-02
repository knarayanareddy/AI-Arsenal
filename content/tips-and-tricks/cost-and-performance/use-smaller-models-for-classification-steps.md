---
id: "use-smaller-models-for-classification-steps"
title: "Use Small Models or Rules for Routing, Classification, and Extraction Sub-Steps"
category: "latency-optimization"
tags:
  - inference
  - routing
difficulty: "intermediate"
impact: "medium"
time_to_implement: "1 hour"
phase: cost-and-performance
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: community-reported
verified_by: "community reports (small-model-for-subtask discussions)"
applies_to:
  - multi-step-pipelines
gotchas:
  - "This is a narrower, sub-task-specific instance of route-simple-tasks-to-smaller-models -- the distinction is that classification/routing/extraction sub-steps within a larger pipeline are almost always simpler than the pipeline's main generation task, making them reliable candidates even when overall task routing isn't yet in place"
  - "A small model or rule-based classifier still needs accuracy validation against a labeled set -- a misclassifying router degrades the whole downstream pipeline silently"
metrics: []
related_tips:
  - route-simple-tasks-to-smaller-models
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

For routing, classification, and extraction sub-steps within a larger pipeline (deciding which downstream path to take, tagging a category, pulling out a structured field), use a small model or a rule-based approach rather than the same large model used for the pipeline's main generation task. These sub-steps are typically much simpler than the main task and rarely need frontier-model capability.

## Before / After

**Before:** a single large model handles both the classification/routing decision and the main generation task in every pipeline step.

**After:** a small model or rule-based classifier handles the routing/classification/extraction sub-step, and the large model is reserved for the main generation task that actually needs its capability.

## Implementation

Identify sub-steps in your pipeline that are classification, routing, or simple extraction rather than open-ended generation, replace the large-model call for those specific steps with a small model or rule-based approach, and validate accuracy against a labeled sample before deployment.

## Gotchas

- This is a narrower, sub-task-specific instance of `route-simple-tasks-to-smaller-models` — sub-steps within a pipeline are reliable candidates even before whole-task routing is in place
- A small model or rule-based classifier still needs accuracy validation — a misclassifying router silently degrades the whole downstream pipeline

## When NOT to Apply

- Skip this if the "classification" step is actually nuanced enough to require larger-model reasoning capability — validate this rather than assuming simplicity
- Not worth the added pipeline complexity for low-volume features where the cost/latency savings are negligible

## Verification

Community-reported: using small models or rules for routing/classification/extraction sub-steps is a widely repeated recommendation in multi-step pipeline optimization writeups, not independently benchmarked here against a named production system.
