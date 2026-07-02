---
id: "detect-context-truncation-in-tests"
title: "Fail Tests When Important Context Sections Are Truncated"
category: "context-window-management"
tags:
  - llm
  - evaluation
difficulty: "intermediate"
impact: "medium"
time_to_implement: "30 minutes"
phase: evaluation
effort: hours
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (context-window regression-testing discussions)"
applies_to:
  - long-context-prompts
gotchas:
  - "Silent truncation (a provider or client library trimming context to fit the window with no error) can pass functional tests while quietly degrading answer quality -- an explicit assertion is needed to catch it, since it won't surface as a normal test failure otherwise"
  - "Detecting truncation requires actually checking token counts against the model's context window at test time, rather than checking only that a response was returned -- a truncated request can still return a plausible-looking (but wrong) answer"
metrics: []
related_tips:
  - use-context-budgets-per-section
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Add an explicit test assertion that fails when an important prompt section (instructions, critical retrieved context) is truncated to fit the context window, rather than allowing silent truncation to pass unnoticed. A truncated request can still return a plausible-looking response, masking a real quality problem that only an explicit check will catch.

## Before / After

**Before:** tests check only that a response was returned successfully, with no check on whether input context was silently trimmed to fit the window.

**After:** a test explicitly computes the token count of the assembled prompt and asserts it's within budget before the call, failing loudly if truncation would occur.

## Implementation

Add a pre-call assertion in your test suite that computes the total token count of the assembled prompt (instructions + context + history) and fails the test if it exceeds the model's context window, rather than relying on the provider to handle truncation silently.

## Gotchas

- Silent truncation can pass functional tests while quietly degrading answer quality — an explicit assertion is needed
- Detecting truncation requires checking token counts against the context window at test time, rather than checking only that a response was returned

## When NOT to Apply

- Skip this if your application's inputs are always well within the context window with no realistic truncation risk
- Not necessary if your provider already errors explicitly (rather than silently truncating) when the input exceeds the window

## Verification

Community-reported: explicit truncation-detection assertions in test suites are a repeated recommendation in context-window regression-testing writeups, not independently benchmarked here against a named production system.
