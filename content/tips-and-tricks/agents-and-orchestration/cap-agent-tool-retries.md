---
id: "cap-agent-tool-retries"
title: "Cap Agent Tool Retries at a Fixed Count Per Tool"
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
verified_by: "practitioner reports (tool-use agent loops)"
applies_to:
  - agent-tool-use
  - multi-tool-agents
gotchas:
  - "A global retry counter across all tools masks a single misbehaving tool -- track retries per tool-call site, not per agent run"
  - "Retrying identical failing arguments wastes the budget -- only retry if the agent actually changes the arguments between attempts, otherwise fail fast"
  - "Exponential backoff between retries adds latency the user feels -- cap total retry wall-clock time, not only the count, for latency-sensitive paths"
metrics: []
related_tips:
  - validate-tool-arguments-before-execution
added_date: "2026-06-13"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Limit how many times an agent may retry a single failing tool call before giving up and surfacing the failure, tracked independently per tool rather than as one global counter. Without a per-tool cap, an agent that keeps calling a broken or misconfigured tool consumes its entire step budget on one failure instead of trying alternative approaches.

## Before / After

**Before:**
```python
while True:
    result = call_tool(name, args)
    if result.ok:
        break
```

**After:**
```python
MAX_RETRIES_PER_TOOL = 3
retries = {}
result = call_tool(name, args)
while not result.ok and retries.get(name, 0) < MAX_RETRIES_PER_TOOL:
    retries[name] = retries.get(name, 0) + 1
    result = call_tool(name, args)
if not result.ok:
    return ToolResult(error=result.error, exhausted=True)
```

## Implementation

Track a retry counter keyed by tool name (or tool-call site if a tool is invoked from multiple points), increment on each failed attempt, and once the cap is hit, return an `exhausted` result the agent's planner can use to try a different tool or give up gracefully rather than a silent hang.

## Gotchas

- A global retry counter across all tools masks a single misbehaving tool — track retries per tool-call site, not per agent run
- Retrying identical failing arguments wastes the budget — only retry if the agent actually changes the arguments between attempts, otherwise fail fast rather than burning all 3 retries on the same mistake
- Exponential backoff between retries adds latency the user feels — cap total retry wall-clock time, not only the count, for latency-sensitive paths

## When NOT to Apply

- Skip this for tools with no transient failure modes (a pure computation with no external dependency either always succeeds or always fails identically — retrying doesn't help)
- Skip a fixed numeric cap if your framework already provides adaptive retry-with-circuit-breaker behavior at the infrastructure layer — don't duplicate the mechanism

## Verification

Production-verified: per-tool retry caps are a standard defensive pattern in tool-using agent loops, referenced alongside `add-a-max-step-budget-to-every-agent` in practitioner writeups on bounding agent cost and preventing infinite retry loops in production deployments.
