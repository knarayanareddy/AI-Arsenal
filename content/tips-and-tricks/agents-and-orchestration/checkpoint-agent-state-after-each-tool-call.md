---
id: "checkpoint-agent-state-after-each-tool-call"
title: "Checkpoint Agent State After Each Side-Effecting Tool Call"
category: "agent-reliability"
tags:
  - agents
  - tool-use
  - monitoring
difficulty: "intermediate"
impact: "high"
time_to_implement: "45 minutes"
phase: agents-and-orchestration
effort: hours
estimated_time: "~45 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (long-running agent frameworks)"
applies_to:
  - long-running-agents
  - agent-tool-use
gotchas:
  - "Checkpointing every step (including pure reasoning steps with no side effect) adds write overhead for no safety benefit -- checkpoint only after side-effecting actions"
  - "A checkpoint that doesn't include enough state to resume (missing the agent's plan or partial results) forces a full restart anyway, defeating the purpose"
metrics: []
related_tips:
  - add-a-max-step-budget-to-every-agent
  - summarize-long-running-agent-state
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Persist an agent's state (plan, completed steps, side effects performed) to durable storage after each action that has a real-world effect (a write, a send, a payment), not only at the end of a run. If the process crashes or a step fails mid-task, a long-running agent can resume from the last checkpoint instead of restarting from scratch and risking duplicate side effects.

## Before / After

**Before:** agent state lives only in memory for the duration of the run; a crash loses all progress and risks re-running already-completed side-effecting steps on retry.

**After:** `save_checkpoint(agent_id, state)` called after each side-effecting tool call, with the executor checking for an existing checkpoint before starting a task and resuming from it if present.

## Implementation

Serialize the agent's plan, completed-steps log, and any side-effect identifiers (e.g. "email already sent with message ID X") to a durable store keyed by task ID; on restart, load this state and skip re-executing already-completed side-effecting steps.

## Gotchas

- Checkpointing every step (including pure reasoning steps with no side effect) adds write overhead for no safety benefit — checkpoint only after side-effecting actions
- A checkpoint that doesn't include enough state to resume (missing the agent's plan or partial results) forces a full restart anyway, defeating the purpose

## When NOT to Apply

- Skip this for short-lived agents that complete in a single request-response cycle with no crash-recovery requirement
- Skip this if none of your agent's tools have side effects (pure read/search/compute agents have nothing that needs idempotent resumption)

## Verification

Community-reported: checkpointing after side-effecting actions is a commonly cited pattern in long-running agent framework discussions, though this entry has not yet been independently verified against a named production system — flagged `enrichment_status: draft` pending stronger evidence.
