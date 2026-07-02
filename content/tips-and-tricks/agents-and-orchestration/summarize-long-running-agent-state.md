---
id: "summarize-long-running-agent-state"
title: "Summarize Long-Running Agent State Instead of Keeping Full History"
category: "context-window-management"
tags:
  - agents
  - memory
  - stateful
difficulty: "intermediate"
impact: "medium"
time_to_implement: "1-2 hours"
phase: agents-and-orchestration
effort: hours
estimated_time: "~1.5 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (long-horizon agent memory practices)"
applies_to:
  - long-running-agents
gotchas:
  - "Summarizing too aggressively can drop details a later step actually needs -- keep the raw record of side-effecting actions (what was sent, what was paid) even when summarizing reasoning text"
  - "Each summarization pass is itself an LLM call with its own cost and potential to introduce errors -- don't summarize more often than the context growth actually requires"
metrics: []
related_tips:
  - checkpoint-agent-state-after-each-tool-call
  - summarize-repeated-conversation-blocks
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

For agents that run many steps, periodically compress the accumulated history (past reasoning, tool results) into a shorter summary that preserves what's needed for future decisions, rather than keeping every step's full text in context indefinitely. Left unmanaged, a long-running agent's context grows linearly with step count until it exceeds the model's window or drowns the most recent, most relevant information in old detail.

## Before / After

**Before:** full transcript of every step kept in context indefinitely, growing without bound as the task continues.

**After:** every N steps, the oldest portion of history is replaced with an LLM-generated summary of what happened and why, with the most recent few steps kept verbatim for immediate context.

## Implementation

Trigger summarization when the running context exceeds a token threshold (not on a fixed step count, since steps vary in verbosity); preserve raw records of side-effecting actions and their identifiers explicitly, separate from the summarized reasoning text, so `checkpoint-agent-state-after-each-tool-call`'s resumption logic still has exact data to work from.

## Gotchas

- Summarizing too aggressively can drop details a later step actually needs — keep the raw record of side-effecting actions even when summarizing reasoning text
- Each summarization pass is itself an LLM call with its own cost and potential to introduce errors — don't summarize more often than the context growth actually requires

## When NOT to Apply

- Skip this for short-lived agents that complete well within the model's context window — there is no growth problem to solve
- Skip this if losing older reasoning detail would break the task (some tasks genuinely need exact recall of everything said, not a summary) — extend the context window or restructure the task instead

## Verification

Community-reported: periodic history summarization is a commonly discussed pattern for long-horizon agent memory management, though this entry has not yet been independently verified against a named production deployment — flagged `enrichment_status: draft` pending stronger evidence.
