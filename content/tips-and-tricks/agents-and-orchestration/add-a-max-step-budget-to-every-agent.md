---
id: "add-a-max-step-budget-to-every-agent"
title: "Add A Max Step Budget To Every Agent Loop"
category: "agent-reliability"
tags:
  - agents
  - tool-use
  - monitoring
difficulty: "beginner"
impact: "high"
time_to_implement: "20 minutes"
phase: agents-and-orchestration
effort: minutes
estimated_time: "~20 minutes"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (ReAct-style agent loops)"
applies_to:
  - agent-tool-use
  - react-style-loops
  - autonomous-coding-agents
gotchas:
  - "Setting the budget too low truncates legitimate multi-step tasks before completion -- profile your p95 step count on real traces first, don't guess"
  - "A hard cutoff with no graceful exit leaves the user with silence instead of a partial answer -- return the best partial result instead of a bare error"
  - "Step count alone doesn't cap cost if individual steps call expensive tools -- pair with a token or dollar budget for tasks with expensive per-step actions"
metrics: []
related_tips:
  - cap-agent-tool-retries
  - detect-repeated-tool-calls
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Forcing an agent to terminate after a fixed maximum number of planning or tool-call steps prevents runaway loops from consuming unbounded API cost and hitting request timeouts. Without a budget, an agent stuck in a reasoning loop (repeatedly retrying a failing tool call, or oscillating between two plans) has no mechanism to stop itself — the budget is an external circuit breaker the agent cannot reason its way around.

## Before / After

**Before:**
```python
while not task_complete:
    action = agent.plan(state)
    state = execute(action)
```

**After:**
```python
MAX_STEPS = 15
for step in range(MAX_STEPS):
    if task_complete:
        break
    action = agent.plan(state)
    state = execute(action)
else:
    return partial_result(state, reason="step_budget_exceeded")
```

## Implementation

Set `MAX_STEPS` from the p95 step count observed on real production traces for the task type, not a guess — most well-scoped agent tasks complete in 5–10 steps; 15–20 is a reasonable starting ceiling. On budget exhaustion, return whatever partial progress exists with an explicit `step_budget_exceeded` reason rather than a bare error.

## Gotchas

- Setting the budget too low truncates legitimate multi-step tasks before completion — profile your p95 step count on real traces first, don't guess
- A hard cutoff with no graceful exit leaves the user with silence instead of a partial answer — return the best partial result instead of a bare error
- Step count alone doesn't cap cost if individual steps call expensive tools — pair with a token or dollar budget for tasks with expensive per-step actions

## When NOT to Apply

- Skip this if your agent already has a different termination guarantee (e.g. a tree-search algorithm with its own depth limit) — a redundant outer budget adds no safety and only risks conflicting cutoffs
- Skip this for single-shot, non-looping tool calls — there is no loop to bound

## Verification

Production-verified: step budgets are a standard, widely-documented safeguard in ReAct-style and tool-using agent loops, cited across practitioner post-mortems of runaway-cost and infinite-loop incidents in production agent deployments; this catalog's own `simple-react-agent` build example applies the same pattern.
