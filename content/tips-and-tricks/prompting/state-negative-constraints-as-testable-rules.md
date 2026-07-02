---
id: "state-negative-constraints-as-testable-rules"
title: "State Negative Constraints as Testable Rules, Not Vague Warnings"
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
verified_by: "community reports (constraint-phrasing prompting discussions)"
applies_to:
  - compliance-sensitive-outputs
gotchas:
  - "A vague constraint (\"don't be inappropriate\") gives the model no concrete criterion to check its own output against, and produces inconsistent enforcement across calls"
  - "A testable rule still needs downstream verification (a regex check, a classifier, a human review) for anything genuinely high-stakes -- stating the rule clearly improves compliance, it does not guarantee it"
metrics: []
related_tips:
  - add-output-examples-for-edge-cases
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Write negative constraints as concrete, checkable rules ("never include a phone number or email address in the output") rather than vague warnings ("be careful with personal information"). A testable rule gives the model (and a downstream verifier) a specific condition to check against; a vague warning gives no clear criterion, producing inconsistent enforcement.

## Before / After

**Before:** `"Don't share sensitive information."` — no concrete definition of what counts as sensitive.

**After:** `"Never include a phone number, email address, or physical address in the output, even if present in the source material."`

## Implementation

Rewrite each vague negative instruction into a specific, checkable condition naming the exact thing to avoid, and where the constraint is high-stakes, add a downstream check (regex, classifier) that verifies compliance rather than relying on the instruction alone.

## Gotchas

- A vague constraint gives no concrete criterion to check against, producing inconsistent enforcement
- A testable rule still needs downstream verification for genuinely high-stakes cases — stating it clearly improves compliance, it does not guarantee it

## When NOT to Apply

- Skip rewriting for genuinely subjective constraints (e.g. tone preferences) that cannot be reduced to a checkable rule
- Not a substitute for actual guardrail enforcement (classifiers, filters) on high-stakes constraints — pair the rule with verification, don't rely on wording alone

## Verification

Community-reported: phrasing negative constraints as testable rules rather than vague warnings is a commonly repeated prompting recommendation, not independently benchmarked here against a named production system.
