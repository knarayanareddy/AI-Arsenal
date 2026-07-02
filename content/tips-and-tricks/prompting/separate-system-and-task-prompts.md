---
id: "separate-system-and-task-prompts"
title: "Separate System Rules From Task-Specific Instructions"
category: "prompting"
tags:
  - llm
  - structured-output
difficulty: "beginner"
impact: "high"
time_to_implement: "30 minutes"
phase: prompting
effort: minutes
estimated_time: "~30 minutes"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (system/user message role separation across major LLM APIs)"
applies_to:
  - chat-applications
  - multi-tenant-prompts
gotchas:
  - "Merging system rules and task instructions into one block makes it harder to reuse the same policy across different tasks, and harder to tell which change caused a behavior regression when only one half was edited"
  - "Some providers weight the system role differently from user/task content -- verify your provider's actual role-weighting behavior rather than assuming uniform treatment"
  - "This absorbs the narrower practice of separating policy constraints specifically from task instructions -- the same separation principle covers both: policy is a subset of system-level rules"
metrics: []
related_tips:
  - separate-user-content-from-system-instructions
  - use-json-schema-for-outputs
added_date: "2026-06-13"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Put stable rules that apply across every call (persona, output format, policy constraints) in the system message, and put per-call task specifics (the actual question, the specific document, the specific parameters) in a separate user/task message. Mixing the two means every prompt edit risks touching both the stable policy and the variable task, making regressions hard to isolate.

## Before / After

**Before:** `prompt = f"You are a support agent. Follow policy X. Answer: {user_question}"` — policy and task text concatenated into one block.

**After:** `messages = [{"role": "system", "content": policy_text}, {"role": "user", "content": user_question}]` — policy lives in the system role, task content lives in the user role.

## Implementation

Move all persona/format/policy language into the system message, keep it stable across calls to the same feature, and pass only the variable task content in the user message — verify your provider's chat-completion API supports distinct roles (all major providers do).

## Gotchas

- Merging system rules and task instructions makes it harder to reuse the same policy across tasks and harder to isolate which half caused a regression
- Providers may weight the system role differently from user content — verify your provider's actual behavior
- This absorbs the narrower "policy vs. task" separation practice — policy is a subset of system-level rules, the same separation principle covers both

## When NOT to Apply

- Skip this for single-shot, one-off scripts where there is no reuse of the same policy across multiple task instances
- Not meaningful for providers/APIs that only expose a single flat prompt string with no role structure — in that case, use explicit delimiters instead (see `use-delimiters-around-retrieved-context`)

## Verification

Production-verified: system/user role separation is the standard, documented message structure across OpenAI, Anthropic, and other major chat-completion APIs, and is the mechanism this catalog's `separate-user-content-from-system-instructions` tip builds on for injection defense.
