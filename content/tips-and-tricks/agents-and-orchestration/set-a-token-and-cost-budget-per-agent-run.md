---
id: "set-a-token-and-cost-budget-per-agent-run"
title: "Set a Token and Cost Budget Per Agent Run, Not Only a Step Limit"
category: "cost-reduction"
tags:
  - agents
  - efficiency
  - monitoring
difficulty: "beginner"
impact: "high"
time_to_implement: "an hour"
phase: agents-and-orchestration
effort: hours
estimated_time: "~1-2 hours"
reversible: true
verification_status: community-reported
verified_by: "practitioner reports (agent cost incidents)"
applies_to:
  - agent-tool-use
  - multi-tool-agents
gotchas:
  - "A step limit alone does not bound cost — a single step can grow the context to hundreds of thousands of tokens (a giant tool output pasted in), so ten expensive steps can cost more than a hundred cheap ones"
  - "Tracking spend only after the run ends means you discover a runaway agent from the invoice; the budget has to be checked during the run and halt the loop when exceeded"
metrics: []
related_tips:
  - add-a-max-step-budget-to-every-agent
  - set-wall-clock-timeouts-for-agent-runs
  - compact-tool-outputs-before-adding-to-context
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Bound each agent run by a cumulative token and dollar budget, checked live, in addition to a step count. Step limits cap how many times the loop runs but not how expensive each iteration is: one step that pastes a large document or grows a long transcript can dwarf many small steps, so a "20 step" cap can still produce a surprise bill. A running budget that halts the agent when tokens or cost cross a threshold is the control that actually bounds spend, and it doubles as a runaway-loop detector.

## Before / After

**Before:** The agent is capped at 25 steps; one step ingests a 300k-token file and the loop re-sends it every subsequent step, and the run costs 50x a normal one despite staying under the step cap.

**After:** The run tracks cumulative tokens/cost and aborts (or escalates to a human) at a set ceiling, so the expensive path is stopped mid-run instead of discovered on the invoice.

## Implementation

Accumulate prompt+completion tokens (and their cost) across every model call in a run, and check the total against a per-run ceiling before each step; when exceeded, stop the loop and return a partial result or escalate. Emit the running total to logs/traces so budgets can be tuned per task type. Combine with a step cap and a wall-clock timeout — the three bound different failure modes.

## Gotchas

- A step limit alone does not bound cost — one step can balloon the context to hundreds of thousands of tokens, so a few expensive steps can outcost many cheap ones.
- Tracking spend only after the run means discovering a runaway from the invoice; the budget must be checked during the run and halt the loop.

## When NOT to Apply

- Overkill for trivial, fixed-shape agents whose per-run cost is already small and bounded by their structure.
- Less urgent in development against a local or free model, though the instrumentation is still useful to carry into production.

## Verification

Community-reported: live token/cost budgets are a common defense against agent cost incidents; the savings depend on your workload's tail behavior and are not benchmarked here.
