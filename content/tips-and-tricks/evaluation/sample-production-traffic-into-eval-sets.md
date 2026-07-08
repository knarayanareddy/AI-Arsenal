---
id: "sample-production-traffic-into-eval-sets"
title: "Continuously Sample Production Traffic Into Your Eval Sets"
category: "debugging-llm-apps"
tags:
  - evaluation
  - observability
difficulty: "intermediate"
impact: "high"
time_to_implement: "1-2 days"
phase: evaluation
effort: day
estimated_time: "~1-2 days"
reversible: true
verification_status: community-reported
verified_by: "community reports (LLMOps eval-set maintenance writeups)"
applies_to:
  - llm-evaluation-pipelines
  - production-llm-systems
gotchas:
  - "Production samples contain PII — route sampled traffic through the same redaction pipeline as your traces before it enters an eval set anyone can read"
  - "Random sampling over-represents the head of the distribution; stratify by intent/segment or deliberately oversample failures (thumbs-down, retries, escalations) to keep the set discriminative"
  - "Never auto-promote samples into the frozen holdout set — new samples go into the dev eval set; the holdout only changes deliberately"
metrics: []
related_tips:
  - version-your-eval-datasets
  - slice-eval-metrics-by-input-segment
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Set up a recurring pipeline that samples real production requests — especially failures — labels them, and adds them to your eval sets. Hand-written eval sets describe the traffic you *imagined* at design time; real traffic drifts (new phrasings, new intents, adversarial users), and an eval set that never refreshes measures your system against last quarter's world. The failure-oversampling variant is the highest-value part: every thumbs-down or escalation is a free, maximally informative eval candidate.

## Before / After

**Before:** A 300-example eval set written before launch, unchanged for six months, scoring 92% while support tickets about a new query pattern pile up.

**After:** A weekly job samples ~50 production requests stratified by intent plus all negative-feedback cases; a human labels them; the dev eval set tracks reality and the new query pattern shows up as a failing slice within a week.

## Implementation

Sample from traces (stratified by segment, oversampling negative-feedback and retry cases), redact PII, queue for human labeling, and append to the versioned dev eval set — keeping the frozen holdout untouched.

## Gotchas

- Redact PII before samples enter a human-readable eval set
- Pure random sampling over-represents easy head traffic — stratify and oversample failures
- New samples go to the dev set only; the frozen holdout changes deliberately or not at all

## When NOT to Apply

- Pre-launch systems with no production traffic yet — build the synthetic set first, add this pipeline at launch
- Domains where data-retention policy forbids reusing user content, unless you have an approved anonymization path

## Verification

Community-reported: continuous eval-set refresh from production traffic (with failure oversampling) is a recurring recommendation in LLMOps writeups and eval tooling guides; not independently benchmarked here against a named production system.
