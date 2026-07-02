---
id: "log-agent-state-transitions"
title: "Log Every Agent State Transition, Not Just Final Output"
category: "agent-reliability"
tags:
  - agents
  - tool-use
  - tracing
difficulty: "beginner"
impact: "medium"
time_to_implement: "30 minutes"
phase: agents-and-orchestration
effort: minutes
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (agent observability practices)"
applies_to:
  - agent-tool-use
  - agent-debugging
gotchas:
  - "Logging only the final answer makes it impossible to tell WHY an agent reached a wrong conclusion -- the intermediate reasoning and tool results are what actually explain a failure"
  - "Unstructured log lines are hard to query at scale -- log structured events (state, action, result) rather than free-text messages if you expect to debug more than a handful of traces"
metrics: []
related_tips:
  - checkpoint-agent-state-after-each-tool-call
  - trace-tool-inputs-and-outputs
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Record each state transition an agent makes (its reasoning at that step, the action chosen, and the result observed) as a structured log event, not only the final answer returned to the user. When an agent produces a wrong result, the transition log is what lets you determine which specific step introduced the error, rather than guessing from the final output alone.

## Before / After

**Before:** `logger.info(f"Agent finished: {final_answer}")` — only the end state is recorded.

**After:** `logger.info({"step": i, "thought": thought, "action": action, "result": result})` emitted at every step, queryable by task ID to reconstruct the full trace.

## Implementation

Emit one structured log event per step containing the agent's stated reasoning, the action taken, and the observed result, tagged with a task/run ID so all events for one execution can be reconstructed in order; route these into the same trace/observability pipeline used for other LLM calls rather than a separate ad hoc log.

## Gotchas

- Logging only the final answer makes it impossible to tell why an agent reached a wrong conclusion — the intermediate reasoning and tool results are what actually explain a failure
- Unstructured log lines are hard to query at scale — log structured events (state, action, result) rather than free-text messages if you expect to debug more than a handful of traces

## When NOT to Apply

- Skip per-step logging for extremely high-volume, low-stakes agent calls where the storage/query cost of full trace logging outweighs the debugging value — sample instead of logging every run in full
- Skip this if your orchestration framework already provides built-in step-level tracing you can query directly — don't duplicate the mechanism

## Verification

Community-reported: structured per-step logging is a widely recommended agent-observability practice, though this entry has not yet been independently verified against a named production system — flagged `enrichment_status: draft` pending stronger evidence.
