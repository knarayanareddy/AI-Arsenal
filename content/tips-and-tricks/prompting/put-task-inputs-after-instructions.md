---
id: "put-task-inputs-after-instructions"
title: "Place Task Inputs After Stable Instructions, Not Before"
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
verified_by: "community reports (prompt-structure ordering discussions)"
applies_to:
  - templated-prompts
gotchas:
  - "Interleaving variable task data with stable instructions makes prompt-template diffs noisy and increases the chance that an instruction edit accidentally alters adjacent task-data formatting"
  - "For prompt-caching-sensitive workloads, the stable prefix (instructions) needs to be byte-identical across calls to get cache hits -- variable content must come strictly after it, not interspersed"
metrics: []
related_tips:
  - cache-stable-system-prompts
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Place stable, reusable instructions first in the prompt and variable, per-call task data after them, rather than interleaving the two. This keeps the instruction block byte-identical across calls (a prerequisite for prompt-prefix caching) and keeps prompt-template diffs limited to the part that actually changes.

## Before / After

**Before:** `f"For this {task_type} task with input {user_input}, follow these rules: {rules}"` — instructions and task data interleaved.

**After:** `f"{stable_rules}\n\nTask input:\n{user_input}"` — stable instructions form a fixed prefix, task input follows.

## Implementation

Restructure prompt templates so the instruction block is a fixed string assembled independently of any per-call variables, and concatenate the variable task content strictly after it.

## Gotchas

- Interleaving variable task data with stable instructions makes template diffs noisy and risks instruction edits accidentally altering task-data formatting
- For prompt-caching-sensitive workloads, the stable prefix must be byte-identical across calls — variable content must come strictly after it

## When NOT to Apply

- Skip restructuring for single-use, non-templated prompts with no reuse across calls
- Not necessary if your provider's prompt caching is insensitive to ordering (rare) or you have no caching or diffing concerns

## Verification

Community-reported: placing stable instructions before variable task data is a widely repeated prompt-structuring recommendation and the documented prerequisite for several providers' prompt-prefix caching features.
