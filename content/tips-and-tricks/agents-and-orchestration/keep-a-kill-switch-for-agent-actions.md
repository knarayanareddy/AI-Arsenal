---
id: "keep-a-kill-switch-for-agent-actions"
title: "Keep a Kill Switch for Risky Agent Tools"
category: "production-gotchas"
tags:
  - monitoring
  - security
  - agents
difficulty: "beginner"
impact: "high"
time_to_implement: "30 minutes"
phase: agents-and-orchestration
effort: minutes
estimated_time: "~30 minutes"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (feature-flagged agent tool rollouts)"
applies_to:
  - production-agents
  - agent-tool-use
gotchas:
  - "A kill switch that requires a code deploy to flip is too slow for an active incident -- use a runtime feature flag, not a config file that needs a redeploy"
  - "If the kill switch disables a tool the agent doesn't know is disabled, it will keep trying to call it and burn retries/steps on a call that will never succeed -- surface the disabled state to the agent's context"
metrics: []
related_tips:
  - require-human-approval-for-irreversible-actions
  - allowlist-tools-per-agent-role
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Wire a runtime feature flag around each risky agent tool (one with real-world side effects) so it can be disabled instantly without a code deploy if the agent starts misbehaving in production. A kill switch is the fastest available mitigation during an active incident — faster than rolling back a deploy, faster than fixing the underlying prompt or logic bug.

## Before / After

**Before:** tool availability is hard-coded at deploy time; disabling a misbehaving tool requires a new release.

**After:** `if not feature_flags.is_enabled(f"tool.{name}"): return ToolResult(error="tool_disabled")` checked before every tool dispatch, flippable from a flag dashboard or config service in seconds.

## Implementation

Use an existing feature-flag service (LaunchDarkly, a database-backed flag table, or even an environment variable read on each request if your deploy cadence is fast enough) gating each risky tool's dispatch path; ensure the disabled state is also surfaced back to the agent's context so it stops retrying a tool call that will never succeed.

## Gotchas

- A kill switch that requires a code deploy to flip is too slow for an active incident — use a runtime feature flag, not a config file that needs a redeploy
- If the kill switch disables a tool the agent does not know is disabled, it will keep trying to call it and burn retries/steps on a call that will never succeed — surface the disabled state to the agent's context, not only to the executor

## When NOT to Apply

- Skip this for tools with no meaningful real-world side effect (pure read/search operations) — there's limited incident-response value in being able to kill a harmless tool quickly
- Skip building a custom flag system if your deployment pipeline is already fast enough (sub-minute) that a code-level disable is an acceptable incident response time for your risk tolerance

## Verification

Production-verified: feature-flagged tool disablement is a standard incident-response pattern reported by practitioners running agents with real-world side effects (payments, sends, deployments) in production, used specifically to allow near-instant mitigation without waiting on a deploy cycle.
