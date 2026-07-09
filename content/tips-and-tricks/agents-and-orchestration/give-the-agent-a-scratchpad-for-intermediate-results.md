---
id: "give-the-agent-a-scratchpad-for-intermediate-results"
title: "Give the Agent a Scratchpad Instead of Carrying Everything in Context"
category: "agent-reliability"
tags:
  - agents
  - tool-use
  - memory
difficulty: "intermediate"
impact: "medium"
time_to_implement: "half a day"
phase: agents-and-orchestration
effort: hours
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "practitioner reports (long-horizon agent design)"
applies_to:
  - agent-tool-use
  - multi-tool-agents
gotchas:
  - "Keeping every intermediate tool output in the running context bloats the window, raises cost per step, and buries the current subgoal under stale detail — long-horizon agents degrade as the transcript grows"
  - "A scratchpad only helps if the agent is prompted to write to and read from it deliberately; a store the agent forgets to use is dead weight, and an unbounded scratchpad recreates the same bloat problem elsewhere"
metrics: []
related_tips:
  - compact-tool-outputs-before-adding-to-context
  - summarize-long-running-agent-state
  - budget-context-before-adding-tools
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Give the agent an external scratchpad — a file, a key-value store, a notes tool — to hold intermediate results, and keep only pointers and the current subgoal in the prompt. Carrying every tool output in the running context is the default that does not scale: the window fills with stale detail, cost per step climbs, and the model loses the thread of what it is currently doing under the weight of everything it has already done. Offloading working memory keeps the active context small and focused while nothing is actually lost.

## Before / After

**Before:** After 15 tool calls, the context holds all 15 full outputs; the model is paying for and re-reading a wall of stale data every step and starts to lose track of the goal.

**After:** Each output is written to the scratchpad under a key; the context holds the subgoal plus "results saved as `search_1`, `parse_2`"; the agent reads back only what a step needs.

## Implementation

Provide read/write tools (or a structured state object) the agent uses to persist intermediate artifacts, and prompt it explicitly to store bulky results there and reference them by key rather than pasting them into its reasoning. Keep the in-context view to the goal, a short plan, and pointers. Periodically compact or expire scratchpad entries so the external store does not become the new bloat.

## Gotchas

- Keeping every intermediate output in the running context bloats the window, raises per-step cost, and buries the current subgoal under stale detail.
- A scratchpad helps only if the agent is prompted to use it deliberately; an unused store is dead weight, and an unbounded scratchpad recreates the bloat elsewhere.

## When NOT to Apply

- Unnecessary for short agents (a handful of steps) whose entire transcript fits comfortably in context.
- Skip when every prior result genuinely must stay in active attention for the model to reason correctly across steps.

## Verification

Community-reported: externalizing agent working memory to a scratchpad is a common long-horizon design pattern; its effect on reliability and cost is task-specific and is not benchmarked here.
