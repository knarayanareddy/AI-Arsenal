---
id: "scope-and-rotate-api-keys-with-least-privilege"
title: "Scope and Rotate LLM API Keys With Least Privilege"
category: "security-best-practices"
tags:
  - security
  - guardrails
  - monitoring
difficulty: "beginner"
impact: "high"
time_to_implement: "2-3 hours"
phase: inference-and-serving
effort: hours
estimated_time: "~2-3 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (secrets-management best practice applied to LLM provider keys)"
applies_to:
  - production-llm-systems
  - llm-serving
  - production-deployment
gotchas:
  - "One shared key across every service means a single leak forces you to rotate everything at once and take an outage -- per-service keys let you revoke the leaked one in isolation"
  - "A key with no spend cap is a blank cheque -- set provider-side usage/budget limits per key so a leaked or looping key can't run up an unbounded bill before you notice"
  - "Keys leak most often through client bundles, logs, and git history, not API calls -- keep keys server-side, scrub them from traces, and scan commits, or rotation alone won't save you"
metrics: []
related_tips:
  - redact-secrets-before-tracing
  - rate-limit-and-cap-spend-per-user
  - set-a-token-and-cost-budget-per-agent-run
added_date: "2026-07-09"
added_by: maintainer
last_reviewed: "2026-07-09"
enrichment_status: draft
---

## What & Why

Give each service (and ideally each environment) its own LLM provider API key with the narrowest scope the provider allows, a spend cap, and a rotation schedule. LLM keys are bearer credentials that map directly to money and data access — treating them like any other production secret (least privilege, per-consumer isolation, rotation, monitoring) limits both the cost and the blast radius of a leak.

## Before / After

**Before:** one root API key with full access, shared across prod, staging, and every service, embedded in config, never rotated.

**After:** distinct keys per service/environment, each with a provider-side spend cap and the minimum project/model scope, stored in a secrets manager, rotated on a schedule and immediately on suspected exposure.

## Implementation

Create separate keys per service and environment; apply the tightest provider-side scope available (project, model, and usage/budget limits). Store keys in a secrets manager or platform secret store — never in client-side bundles or committed files. Wire up rotation (scheduled plus on-incident) and, where the provider exposes it, per-key usage alerts so anomalous spend triggers a page. Add a secret scanner to CI to catch keys before they land in git history.

## Gotchas

- One shared key across every service means a single leak forces you to rotate everything at once and take an outage — per-service keys let you revoke the leaked one in isolation
- A key with no spend cap is a blank cheque — set provider-side usage/budget limits per key so a leaked or looping key can't run up an unbounded bill before you notice
- Keys leak most often through client bundles, logs, and git history, not API calls — keep keys server-side, scrub them from traces, and scan commits, or rotation alone won't save you

## When NOT to Apply

- For a throwaway local prototype with a spend-capped personal key, full per-service key management is overkill — the spend cap is the one control still worth keeping
- If your provider genuinely offers no sub-scoping or budget controls, per-service isolation and rotation still apply even though least-privilege scoping can't — don't skip the parts you *can* do

## Verification

Community-reported: least-privilege, per-consumer, rotated secrets are foundational security practice, applied here to LLM provider keys; provider docs and LLM gateways expose per-key scoping, budgets, and rotation for this reason. Not tied to a specific named incident here, so flagged `enrichment_status: draft`.
