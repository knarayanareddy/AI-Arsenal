---
id: "drop-unused-conversation-history"
title: "Keep Only Relevant Conversation History, Not the Whole Transcript"
category: "cost-reduction"
tags:
  - memory
  - efficiency
difficulty: "intermediate"
impact: "high"
time_to_implement: "45 minutes"
phase: cost-and-performance
effort: hours
estimated_time: "~45 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (conversation-history-trimming cost-optimization discussions)"
applies_to:
  - chat-applications
gotchas:
  - "Dropping history too aggressively can lose context the current turn actually depends on -- validate against real multi-turn conversations that references to earlier turns still resolve correctly"
  - "This is related to but distinct from summarize-repeated-conversation-blocks -- dropping removes content entirely (for genuinely irrelevant history), summarizing preserves a compressed version (for relevant-but-old history)"
metrics: []
related_tips:
  - summarize-repeated-conversation-blocks
  - set-token-budgets-per-feature
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Send only the conversation history relevant to the current turn, rather than the full transcript accumulated so far. As conversations grow, sending the entire history on every turn means paying for the same old tokens repeatedly, even when most of it has no bearing on the current question.

## Before / After

**Before:** every turn sends the full accumulated conversation history, regardless of relevance to the current question.

**After:** a relevance filter (recency window, topic-change detection, or explicit reference resolution) determines which prior turns are actually needed, and only those are sent.

## Implementation

Add a relevance filter to conversation history assembly (a simple recency window is a reasonable starting point) that determines which prior turns are included for the current call, dropping turns that have no bearing on the current question.

## Gotchas

- Dropping history too aggressively can lose context the current turn depends on — validate against real multi-turn conversations
- This is distinct from `summarize-repeated-conversation-blocks` — dropping removes irrelevant content entirely, summarizing preserves a compressed version of relevant-but-old content

## When NOT to Apply

- Skip aggressive trimming for short conversations that never accumulate enough history to matter for cost
- Not appropriate if your application genuinely requires full conversation context for correctness (e.g. legal or compliance transcripts where nothing can be dropped)

## Verification

Community-reported: trimming conversation history to only relevant turns is a widely repeated recommendation in conversational cost-optimization writeups, not independently benchmarked here against a named production system.
