---
id: "allowlist-tools-per-agent-role"
title: "Allowlist Tools Per Agent Role"
category: "security-best-practices"
tags:
  - security
  - guardrails
  - tool-use
difficulty: "intermediate"
impact: "high"
time_to_implement: "30 minutes"
phase: agents-and-orchestration
effort: minutes
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (multi-agent tool-security discussions)"
applies_to:
  - multi-agent-systems
  - agent-tool-use
gotchas:
  - "A role-based allowlist only helps if roles are actually distinct -- if every agent shares one generic role, this collapses to giving every agent every tool"
  - "Allowlists must be enforced at the execution layer, not merely omitted from the prompt -- a determined or confused model can still attempt to call a tool it wasn't given if the executor doesn't reject it"
metrics: []
related_tips:
  - separate-planner-and-executor-permissions
  - require-human-approval-for-irreversible-actions
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Give each agent (or agent role, in a multi-agent system) an explicit allowlist of the tools it needs for its job, and deny every other tool by default. A researcher agent that only needs `search` should not also be able to call `send_email` or `delete_record` — restricting the tool surface per role limits the damage a single agent's mistake or a prompt-injection attack can cause.

## Before / After

**Before:** a single shared tool registry passed to every agent, regardless of role: `agent = Agent(tools=ALL_TOOLS)`.

**After:** `ALLOWED_TOOLS = {"researcher": ["search", "read_file"], "writer": ["read_file"]}` with the executor rejecting any tool call not in the calling agent's allowlist.

## Implementation

Enforce the allowlist at the tool-execution layer (the function that actually dispatches a tool call), not only by omitting tools from the prompt — a model can still attempt to reference a tool name it has seen elsewhere in context, and the executor must reject it regardless of what the model asked for.

## Gotchas

- A role-based allowlist only helps if roles are actually distinct — if every agent shares one generic role, this collapses to giving every agent every tool
- Allowlists must be enforced at the execution layer, not merely omitted from the prompt — a confused model can still attempt to call a tool it was not given if the executor fails to reject it

## When NOT to Apply

- Skip this for single-agent systems with no role distinction — there's only one tool surface to define, and per-role allowlisting adds no value
- Skip this if your tools are all equally low-risk read-only operations — the isolation benefit is proportional to how much damage a misused tool could cause

## Verification

Community-reported: tool-scoping-per-role is a commonly recommended pattern in multi-agent security discussions, though this specific entry has not yet been independently verified in a named production deployment — flagged `enrichment_status: draft` pending a stronger evidence source.
