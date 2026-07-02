---
id: "ask-for-missing-inputs-before-solving"
title: "Instruct the Model to Ask for Missing Inputs Instead of Guessing"
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
verified_by: "community reports (underspecified-task prompting discussions)"
applies_to:
  - task-automation
gotchas:
  - "Without an explicit instruction to ask rather than guess, models tend to fill gaps with plausible-sounding assumptions that are silently wrong -- the failure is invisible until the output is used"
  - "This only works in interactive or human-in-the-loop contexts -- for fully automated pipelines with no one to answer, a fallback default or explicit error is needed instead"
metrics: []
related_tips: []
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

For tasks with genuinely underspecified inputs, explicitly instruct the model to ask a clarifying question rather than guess a plausible value. Left unconstrained, models fill gaps with confident-sounding assumptions that fail silently, since the output looks complete even when a key input was fabricated.

## Before / After

**Before:** `"Book a flight for the trip described."` with no departure city specified — the model may invent one.

**After:** `"Book a flight for the trip described. If any required field is missing, ask a clarifying question instead of assuming a value."`

## Implementation

Add an explicit instruction covering the ask-vs-guess behavior for the specific fields that are commonly missing, and verify with a few known-underspecified test inputs that the model actually asks instead of filling in a plausible guess.

## Gotchas

- Without an explicit instruction, models fill gaps with plausible-sounding assumptions that are silently wrong
- Only works in interactive contexts — fully automated pipelines need a fallback default or explicit error instead

## When NOT to Apply

- Skip this for fully automated, non-interactive pipelines where there is no human to answer a clarifying question
- Not needed for tasks where every required input is always structurally guaranteed to be present

## Verification

Community-reported: instructing models to ask rather than guess for underspecified tasks is a commonly cited pattern in prompting discussions, not independently benchmarked here against a named production system.
