---
id: "set-temperature-by-decision-risk"
title: "Set Temperature by the Cost of Being Wrong, Not a Generic Default"
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
verified_by: "community reports (temperature-tuning discussions)"
applies_to:
  - decision-support
  - creative-generation
gotchas:
  - "A single global temperature setting applied to every call type in an application ignores that different calls have very different error costs -- a low-temperature default hurts creative-generation quality, a high-temperature default hurts factual/decision tasks"
  - "Temperature is not the only source of output variance -- top-p/top-k settings and prompt phrasing also affect diversity, so tuning temperature alone doesn't guarantee the desired behavior"
metrics: []
related_tips: []
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Choose the sampling temperature based on the cost of an incorrect or inconsistent answer for that specific call, not a single generic value applied everywhere. High-stakes, factual, or decision-support calls benefit from low temperature (consistency, minimal invention); creative or brainstorming calls benefit from higher temperature (diversity of output).

## Before / After

**Before:** `temperature=0.7` applied uniformly to both a medical-triage classification call and a marketing-copy brainstorm call.

**After:** `temperature=0.1` for the classification call, `temperature=0.9` for the brainstorm call — set per call type based on error cost.

## Implementation

Classify each distinct LLM call type in your application by the cost of an inconsistent or wrong answer, and set temperature per call type accordingly — low (0.0-0.2) for high-stakes/factual calls, higher (0.6-1.0) for creative/exploratory calls.

## Gotchas

- A single global temperature ignores that different calls have very different error costs
- Temperature is not the only source of output variance — top-p/top-k and prompt phrasing also matter, so tuning temperature alone doesn't guarantee desired behavior

## When NOT to Apply

- Skip per-call tuning if your application only has one call type with a stable, already-appropriate temperature
- Not meaningful for models/providers where temperature has limited effect on the specific task (e.g. some constrained-decoding or schema-enforced outputs)

## Verification

Community-reported: setting temperature based on decision risk rather than a fixed default is a commonly repeated recommendation in temperature-tuning writeups, not independently benchmarked here against a named production system.
