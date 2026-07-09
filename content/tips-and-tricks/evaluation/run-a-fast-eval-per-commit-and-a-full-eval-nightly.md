---
id: "run-a-fast-eval-per-commit-and-a-full-eval-nightly"
title: "Run a Fast Eval Per Commit and a Full Eval Nightly"
category: "production-gotchas"
tags:
  - evaluation
  - llm
difficulty: "intermediate"
impact: "medium"
time_to_implement: "half a day"
phase: evaluation
effort: hours
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "community reports (CI/CD eval practice)"
applies_to:
  - evaluation-pipelines
gotchas:
  - "The fast smoke set must include your known past failures, or a regression can slip through the per-commit gate and only surface at night"
  - "If the nightly full eval has no owner who triages failures, it becomes a red badge everyone ignores -- assign triage, not only the job"
metrics: []
related_tips:
  - add-evals-before-refactors
  - use-golden-questions-for-every-bug-fix
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

A full eval suite is often too slow and too expensive to run on every commit, so teams either run it rarely (regressions land silently) or run it every time (CI becomes glacial and costly). The resolution is tiered: a small, fast smoke eval — a few dozen high-value cases including every known past failure — gates every commit in seconds, while the full suite runs on a schedule (nightly) and on release candidates. You get fast per-commit protection against obvious breaks plus thorough periodic coverage.

## Before / After

**Before:** The 2,000-case eval runs only before releases; a prompt change three weeks ago quietly regressed a whole category and nobody knew until launch.

**After:** A 40-case smoke set runs per commit (catches the obvious break immediately); the full 2,000-case suite runs nightly and flags subtler drift with an owner to triage it.

## Implementation

Curate the smoke set deliberately: cover the critical paths and include the golden cases from past bug fixes, keeping it fast and cheap enough to gate every PR. Wire the full suite to a nightly schedule and to release branches. Make both report against a baseline, and assign a human owner to triage nightly failures so results drive action rather than badge blindness.

## Gotchas

- A smoke set that omits past failures gives false confidence — seed it from your bug-fix golden cases
- A scheduled eval with no triage owner rots into ignored noise

## When NOT to Apply

- If your full suite is already fast and cheap enough to run per commit, run it and skip the tiering
- Very early prototypes without CI may not need the split yet — start with any eval at all

## Verification

Community-reported: tiered smoke-vs-full test suites are standard CI/CD practice, applied directly to LLM eval by many teams. Cadence and set sizes are context-dependent.
