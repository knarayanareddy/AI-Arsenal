---
id: "make-success-criteria-machine-checkable"
title: "Make Agent Success Criteria Machine-Checkable, Not Self-Reported"
category: "agent-reliability"
tags:
  - agents
  - evaluation
  - monitoring
difficulty: "intermediate"
impact: "high"
time_to_implement: "2-4 hours"
phase: agents-and-orchestration
effort: hours
estimated_time: "~3 hours"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (coding-agent and task-completion pipelines)"
applies_to:
  - autonomous-coding-agents
  - task-completion-agents
gotchas:
  - "A machine check that's too strict (exact string match) fails on semantically correct but differently-formatted output -- check the property that actually matters, not surface form"
  - "Machine checks add their own execution cost and latency (running a test suite, hitting an API to verify state) -- budget for this in the agent's step/time budget"
  - "If the check itself can be gamed (an agent that deletes a failing test instead of fixing the code it tests), the check isn't verifying what you think it is"
metrics: []
related_tips:
  - use-golden-questions-for-every-bug-fix
  - require-human-approval-for-irreversible-actions
added_date: "2026-06-13"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Define agent task completion as an explicit, externally verifiable check (a test suite passes, an API returns an expected value, a file matches a schema) instead of asking the agent to self-report "I'm done." Self-reported completion is unreliable because the model that performed the task is the same model judging whether it succeeded, with no independent signal to catch a wrong or incomplete result.

## Before / After

**Before:**
```python
response = agent.run(task)
if "task complete" in response.lower():
    mark_done()
```

**After:**
```python
response = agent.run(task)
success = run_verification_check(task.completion_check)
if success:
    mark_done()
else:
    return retry_with_feedback(task, failure=success.details)
```

## Implementation

Attach an explicit `completion_check` to each task type — for a coding agent, this is "the test suite exits 0"; for a data-entry agent, "the record matches the expected schema and required fields are non-null." Run this check independently of the agent's own output after each attempt, and only mark the task complete when the check passes.

## Gotchas

- A machine check that's too strict (exact string match) fails on semantically correct but differently-formatted output — check the property that actually matters, not surface form
- Machine checks add their own execution cost and latency (running a test suite, hitting an API to verify state) — budget for this in the agent's step/time budget
- If the check itself can be gamed (an agent that deletes a failing test instead of fixing the code it tests), the check isn't verifying what you think it is — sandbox or restrict the agent's write access to the check itself

## When NOT to Apply

- Skip this for genuinely open-ended, subjective tasks with no objective completion criterion (creative writing, brainstorming) — use human or LLM-as-judge review instead, not a fabricated machine check
- Skip building a custom check if the task already has a natural one (a compiler exit code, an existing test suite) — wire into that directly rather than inventing a parallel mechanism

## Verification

Production-verified: machine-checkable completion criteria (test-suite-passes, schema-conformance) are the standard evaluation mechanism in coding-agent benchmarks (e.g. SWE-bench-style verification) and are directly cited in this catalog's own `use-golden-questions-for-every-bug-fix` tip and `yang-2024-swe-agent` research entry as the mechanism separating verifiable agent success from self-reported completion.
