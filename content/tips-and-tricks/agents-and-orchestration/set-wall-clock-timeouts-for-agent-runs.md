---
id: "set-wall-clock-timeouts-for-agent-runs"
title: "Set Wall-Clock Timeouts for Agent Runs, Not Just Step Budgets"
category: "agent-reliability"
tags:
  - agents
  - orchestration
difficulty: "beginner"
impact: "high"
time_to_implement: "1-2 hours"
phase: agents-and-orchestration
effort: hours
estimated_time: "~1-2 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (agent runaway post-mortems; orchestration framework timeout features)"
applies_to:
  - agent-systems
gotchas:
  - "A step budget alone doesn't bound time or money: one step can hang on a slow tool for 20 minutes or stream an enormous response — you need per-step timeouts, a run-level wall clock, and ideally a token/cost budget as three separate limits"
  - "Timeout handling must be graceful: kill the run mid-tool-call without checkpointing and you can leave external side effects half-applied — time out at step boundaries where possible"
metrics: []
related_tips:
  - add-a-max-step-budget-to-every-agent
  - checkpoint-agent-state-after-each-tool-call
  - cap-agent-tool-retries
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Bound every agent run with a wall-clock timeout (and per-step tool timeouts) in addition to a max-step budget. Step budgets bound *iterations*; they don't bound *time or cost per iteration* — a hung tool call, a slow provider, or a single step that streams a massive response can burn 20 minutes and real money while remaining safely "within budget" at step 3 of 20. The three limits fail differently, so production agents need all three: steps (loop containment), wall clock (time containment), tokens/cost (spend containment).

## Before / After

**Before:** An agent with a 25-step budget calls a scraping tool that hangs on an unresponsive site; the run sits at step 7 for 40 minutes, holding a worker and a user's patience.

**After:** The tool call times out at 60s, the step is marked failed with a fallback, and the run itself is hard-capped at 10 minutes — worst case is now bounded and predictable.

## Implementation

Set per-tool-call timeouts sized to each tool's latency profile, a run-level wall-clock deadline enforced by the orchestrator, and time out at step boundaries where possible — checkpointing state so a timed-out run can report partial progress or resume rather than vanish.

## Gotchas

- Steps, wall clock, and token/cost budgets bound different failure modes — set all three, don't treat any one as covering the others
- Time out gracefully at step boundaries with checkpointed state; mid-tool kills can leave external side effects half-applied

## When NOT to Apply

- Deliberately long-horizon background agents — they still need timeouts, merely sized in hours with checkpoint/resume, not removed
- Hard-realtime paths where an agent loop shouldn't exist at all; a timeout is not a substitute for the right architecture

## Verification

Community-reported: run-level and per-step timeouts are standard features of agent orchestration frameworks and a recurring lesson in runaway-agent post-mortems; not independently benchmarked here against a named production system.
