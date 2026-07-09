---
id: "log-judge-rationales-not-only-scores"
title: "Log Judge Rationales, Not Only Scores"
category: "debugging-llm-apps"
tags:
  - evaluation
  - llm
  - observability
difficulty: "beginner"
impact: "medium"
time_to_implement: "an hour"
phase: evaluation
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: community-reported
verified_by: "community reports (LLM-judge debugging practice)"
applies_to:
  - evaluation-pipelines
gotchas:
  - "Rationales are debugging aids, not ground truth -- a judge can write a confident, well-argued rationale for a wrong verdict"
  - "Storing full rationales for large eval sets adds cost and storage; sample or store on failures if volume is a concern"
metrics: []
related_tips:
  - use-rubric-anchored-llm-judges
  - validate-llm-judges-against-human-labels
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

When an LLM judge returns only a number, a failing eval tells you *that* something is wrong but not *why*. Capturing the judge's short rationale alongside each verdict turns eval failures into actionable diagnostics: you can see whether the judge penalized a genuine error, misread the rubric, or tripped on formatting. Rationales also let you audit the judge itself — patterns of bad reasoning across cases reveal a miscalibrated judge prompt far faster than staring at aggregate scores.

## Before / After

**Before:** The eval shows category X dropped from 90% to 70%; you re-run and hand-inspect dozens of raw outputs to guess what changed.

**After:** The stored rationales for the newly-failing cases all say "answer omitted the required citation" — the cause is obvious in minutes, and you confirm it is a real regression, not a judge artifact.

## Implementation

Have the judge emit a structured verdict plus a one-to-two sentence rationale (and ideally the rubric criterion it keyed on). Store both with the case id and the model output. On a failing run, read the rationales for the changed cases first. Periodically sample rationales on *passing* cases too, to catch a judge that is passing things for the wrong reasons.

## Gotchas

- A fluent rationale is not proof of a correct verdict — validate the judge against human labels, don't trust its self-justification
- Full-rationale logging on huge sets costs tokens and storage; store on failures or a sample if needed

## When NOT to Apply

- Deterministic metrics (exact match, unit tests) already tell you exactly what failed and need no rationale
- Extremely high-volume online scoring where per-call rationale cost is prohibitive can sample instead of logging every one

## Verification

Community-reported: capturing judge reasoning is standard practice in LLM-as-judge tooling and debugging guides. Rationale reliability varies by judge and is not independently benchmarked here.
