---
id: "separate-planner-and-executor-permissions"
title: "Separate Planner and Executor Permissions in Multi-Step Agents"
category: "agent-reliability"
tags:
  - agents
  - tool-use
  - security
difficulty: "advanced"
impact: "high"
time_to_implement: "2-4 hours"
phase: agents-and-orchestration
effort: hours
estimated_time: "~3 hours"
reversible: true
verification_status: theoretical
applies_to:
  - multi-agent-systems
  - agent-tool-use
gotchas:
  - "If the executor trusts the planner's output unconditionally, this pattern provides no actual isolation -- the executor must independently validate that a proposed action is within its allowed operations, not just execute whatever the planner sends"
  - "Splitting planner and executor adds an extra round trip (and potentially an extra model call) per action -- measure the added latency against the isolation benefit for your use case"
metrics: []
related_tips:
  - allowlist-tools-per-agent-role
  - validate-tool-arguments-before-execution
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Split an agent into a planner (which proposes actions but has no direct tool access) and an executor (which has tool access but only accepts a constrained, validated set of operations from the planner). This limits the damage a compromised or hallucinating planner can cause, since it can only ever propose actions — it cannot directly execute anything the executor's own validation would reject.

## Before / After

**Before:** a single agent both decides what to do and directly calls the tool to do it, with no independent check between decision and execution.

**After:** `plan = planner.propose(state)` followed by `result = executor.validate_and_run(plan)`, where the executor independently checks the proposed action against an allowlist before running it, rather than trusting the planner's output unconditionally.

## Implementation

Give the executor its own explicit validation step (schema check, allowlist check per `allowlist-tools-per-agent-role`) that runs regardless of what the planner proposed; the planner should have no direct tool-calling capability at all, only the ability to emit a structured proposed-action object the executor evaluates independently.

## Gotchas

- If the executor trusts the planner's output unconditionally, this pattern provides no actual isolation — the executor must independently validate that a proposed action is within its allowed operations
- Splitting planner and executor adds an extra round trip (and potentially an extra model call) per action — measure the added latency against the isolation benefit for your use case

## When NOT to Apply

- Skip this for simple, low-risk single-agent tasks where the overhead of a planner/executor split outweighs the isolation benefit
- Skip this if your executor cannot meaningfully validate proposed actions independently of the planner (e.g. actions are too open-ended to check against a fixed policy) — the split provides no real safety in that case

## Verification

Theoretical: the isolation argument (a planner with no direct tool access cannot itself cause unchecked side effects) follows directly from standard least-privilege security reasoning, but this specific entry has not yet been backed by a named production case study — flagged `enrichment_status: draft` pending verification.
