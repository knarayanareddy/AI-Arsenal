---
id: "order-few-shot-examples-by-similarity"
title: "Order Few-Shot Examples by Similarity to the Actual Task"
category: "prompting"
tags:
  - llm
  - structured-output
difficulty: "beginner"
impact: "medium"
time_to_implement: "20 minutes"
phase: prompting
effort: minutes
estimated_time: "~20 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (few-shot example ordering discussions)"
applies_to:
  - classification-tasks
gotchas:
  - "Recency effects mean examples placed closest to the actual task carry more influence -- an unrelated or dissimilar example placed last can pull the output away from the intended pattern"
  - "Similarity-based ordering requires a similarity measure (embedding distance, category match) -- static example sets with no per-request reordering don't benefit from this"
metrics: []
related_tips:
  - add-output-examples-for-edge-cases
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

When few-shot examples vary in format or domain, place the example most similar to the actual task closest to the task itself, rather than in arbitrary or alphabetical order. Models weight recent context more heavily, so the example nearest the task has outsized influence on the output pattern.

## Before / After

**Before:** three few-shot examples in a fixed, task-independent order regardless of which one resembles the current request.

**After:** examples re-ranked per request by similarity to the current task, with the most similar example placed immediately before the task.

## Implementation

Compute a similarity score (embedding distance or category match) between the current task and each candidate few-shot example, sort by that score, and place the most similar example last in the prompt, immediately before the task input.

## Gotchas

- Recency effects mean the example closest to the task has outsized influence — a dissimilar example placed last can pull the output off-pattern
- Similarity-based ordering requires a similarity measure; a static example set with no per-request reordering doesn't benefit from this

## When NOT to Apply

- Skip this if all your few-shot examples are already uniformly similar to every task instance
- Not worth the added complexity for a fixed, single-domain task where example order has no measurable effect on your eval set

## Verification

Community-reported: similarity-based few-shot example ordering leveraging recency effects is a commonly discussed pattern in prompting writeups, not independently benchmarked here against a named production system.
