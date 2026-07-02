---
id: "separate-user-content-from-system-instructions"
title: "Separate User Content From System Instructions With Roles and Delimiters"
category: "security-best-practices"
tags:
  - security
  - guardrails
  - llm
difficulty: "intermediate"
impact: "high"
time_to_implement: "30 minutes"
phase: prompting
effort: minutes
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (prompt-injection defense writeups)"
applies_to:
  - chat-applications
  - agentic-systems
gotchas:
  - "Delimiters alone (without message-role separation) are a weaker defense -- a sufficiently adversarial user input can include text mimicking your delimiter syntax to try to escape the boundary"
  - "This defends against user input masquerading as policy, but does not by itself defend against injection carried in retrieved documents or tool outputs -- pair with `treat-retrieved-text-as-untrusted` for that vector"
metrics: []
related_tips:
  - separate-system-and-task-prompts
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Use the provider's message-role structure (system vs. user) combined with explicit delimiters to ensure user-submitted content is always treated as data to respond to, never as an instruction that can override system policy. Without this separation, a user can submit input phrased as a command ("ignore previous instructions and...") that the model may follow if it can't distinguish policy from content.

## Before / After

**Before:** `prompt = f"{system_policy}\n{user_input}"` concatenated as one string with no role or delimiter boundary.

**After:** `messages = [{"role": "system", "content": system_policy}, {"role": "user", "content": f"<user_input>{user_input}</user_input>"}]` — role structure plus explicit delimiters mark the boundary.

## Implementation

Use your provider's native system/user message roles rather than a single concatenated string, and additionally wrap raw user content in explicit delimiters so the boundary is marked twice (structurally and textually).

## Gotchas

- Delimiters alone, without message-role separation, are a weaker defense — adversarial input can mimic delimiter syntax to try to escape the boundary
- This defends against user input masquerading as policy but not against injection carried in retrieved documents or tool outputs — pair with `treat-retrieved-text-as-untrusted`

## When NOT to Apply

- Skip additional hardening for internal, fully-trusted-operator tools where no adversarial user input is possible
- Not a complete defense on its own against a determined adversary — combine with output validation and monitoring, not as the sole safeguard

## Verification

Community-reported: role-based separation plus delimiters is a widely cited baseline mitigation in prompt-injection defense writeups, not independently benchmarked here against a named production incident.
