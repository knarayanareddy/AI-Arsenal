---
id: "add-a-minimal-reproduction-prompt"
title: "Keep the Smallest Failing Prompt for Every Recurring Issue"
category: "debugging-llm-apps"
tags:
  - observability
  - tracing
difficulty: "beginner"
impact: "high"
time_to_implement: "20 minutes"
phase: debugging-and-observability
effort: minutes
estimated_time: "~20 minutes"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (minimal-reproduction debugging discipline)"
applies_to:
  - debugging-workflows
gotchas:
  - "A minimal reproduction has to actually be re-verified as still failing before use -- model or prompt updates can make an old 'minimal repro' stop reproducing the issue, silently making it useless"
  - "Reducing a failing case to its minimal form takes deliberate effort (removing unrelated context/history piece by piece) -- skipping this step and keeping the full original trace as the 'repro' makes future debugging slower, not faster"
metrics: []
related_tips:
  - classify-failures-before-fixing-prompts
  - replay-the-same-trace-with-one-variable-changed
added_date: "2026-06-13"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

When a failure is diagnosed, reduce it to the smallest prompt/context pair that still reproduces the issue, and keep that minimal version on hand rather than only the full original trace. A minimal reproduction isolates the actual cause from unrelated context, making it faster to verify a fix and faster for anyone else debugging the same class of issue later.

## Before / After

**Before:** the only record of a failure is the full original production trace, with a long conversation history and large retrieved-context block, most of which is unrelated to the actual failure.

**After:** the failure is reduced to the smallest input (often a single short prompt with minimal context) that still reliably reproduces it, stored alongside the original trace.

## Implementation

Starting from the original failing trace, remove pieces of context, history, or instructions one at a time, re-running after each removal, until removing anything further stops reproducing the failure — keep that reduced version as the canonical repro case.

## Gotchas

- A minimal reproduction needs re-verification as still failing before reuse — model or prompt updates can make it stop reproducing the issue
- Reducing to minimal form takes deliberate effort; skipping it and keeping the full original trace as the "repro" slows down future debugging

## When NOT to Apply

- Skip minimal-reduction effort for one-off, non-recurring failures that are unlikely to need future debugging reference
- Not worth the time investment if the failure is already trivially simple (a single short prompt with no extraneous context)

## Verification

Production-verified: reducing failures to minimal reproduction cases is a standard, widely documented debugging discipline across software engineering generally, directly applicable to LLM application debugging.
