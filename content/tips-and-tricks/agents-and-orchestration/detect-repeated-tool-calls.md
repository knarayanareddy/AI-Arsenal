---
id: "detect-repeated-tool-calls"
title: "Detect and Stop Repeated Identical Tool Calls"
category: "agent-reliability"
tags:
  - agents
  - tool-use
  - monitoring
difficulty: "beginner"
impact: "medium"
time_to_implement: "30 minutes"
phase: agents-and-orchestration
effort: minutes
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (agent loop debugging writeups)"
applies_to:
  - agent-tool-use
gotchas:
  - "Near-identical isn't always identical -- normalize arguments (whitespace, key order, float precision) before comparing, or you'll miss loops that vary only in formatting"
  - "Some legitimate tasks genuinely require calling the same tool with the same arguments more than once (polling for a status change) -- distinguish polling from a stuck loop by checking whether the RESULT changes, not just the call"
metrics: []
related_tips:
  - add-a-max-step-budget-to-every-agent
  - cap-agent-tool-retries
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Track the (tool name, normalized arguments) pairs an agent has called recently, and intervene — stop, escalate to a human, or force a different approach — when the same call repeats beyond a small threshold with no progress. This catches a specific failure mode that a step budget alone doesn't: an agent that is technically still within its step budget but stuck in a tight loop making no forward progress.

## Before / After

**Before:** every tool call is executed as requested, with no check for whether it duplicates a recent call.

**After:** `if (tool_name, normalize(args)) in recent_calls: escalate_or_break()` checked before executing each call, with `recent_calls` a short rolling window (e.g. last 5 calls).

## Implementation

Normalize tool arguments (consistent key ordering, whitespace trimming, rounding floats) before comparing, since a loop can present as "different" calls that are semantically identical; track a rolling window of the last N calls per task and trigger escalation when a normalized call repeats within that window with no change in the result.

## Gotchas

- Near-identical isn't always identical — normalize arguments (whitespace, key order, float precision) before comparing, or you will miss loops that vary only in formatting
- Some legitimate tasks genuinely require calling the same tool with the same arguments more than once (polling for a status change) — distinguish polling from a stuck loop by checking whether the result changes, not only whether the call repeats

## When NOT to Apply

- Skip this for agents whose normal operation legitimately involves many repeated identical calls (a polling loop waiting on an external job) — this check will produce false positives there unless you explicitly allow for polling patterns
- Skip building custom detection if your framework already surfaces a "no progress" signal you can hook into directly

## Verification

Community-reported: repeated-tool-call detection is a commonly discussed debugging and safety pattern in agent-loop writeups, though this entry has not yet been independently verified against a named production deployment — flagged `enrichment_status: draft` pending stronger evidence.
