---
id: "rate-limit-and-cap-spend-per-user"
title: "Rate-Limit and Cap Spend Per User"
category: "security-best-practices"
tags:
  - security
  - guardrails
  - monitoring
difficulty: "intermediate"
impact: "high"
time_to_implement: "half a day"
phase: inference-and-serving
effort: day
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "community reports (abuse-prevention / cost-control practice for public LLM endpoints)"
applies_to:
  - production-llm-systems
  - chat-applications
  - llm-serving
gotchas:
  - "Request-count limits alone don't bound cost -- one request with a huge prompt or a large `max_tokens` can cost more than a hundred small ones, so cap tokens/cost per window, not only request count"
  - "Rate-limit by authenticated identity, not IP alone -- IPs are shared and rotatable, so IP-only limits both punish legitimate shared-network users and fail to stop a determined abuser"
  - "A per-user cap without a global cap still lets a botnet of many accounts drain your budget -- pair per-user limits with a global spend ceiling and alerting"
metrics: []
related_tips:
  - scope-and-rotate-api-keys-with-least-privilege
  - set-a-token-and-cost-budget-per-agent-run
  - cap-concurrent-requests-with-admission-control
added_date: "2026-07-09"
added_by: maintainer
last_reviewed: "2026-07-09"
enrichment_status: draft
---

## What & Why

Any authenticated or public LLM endpoint needs per-user rate and spend limits: each request costs real money, and one abusive or buggy client can generate unbounded load and bill. Limits protect availability, cost, and act as a first line against abuse. Because LLM cost scales with tokens, denominate the limit in tokens/cost, not only request count.

## Before / After

**Before:** the endpoint accepts unlimited requests per user, each with unbounded `max_tokens`, with no per-user accounting — one script can loop and drain the budget overnight.

**After:** each user has a requests-per-minute limit and a rolling token/cost budget per hour/day; over-limit requests get `429` with a `Retry-After`, and a global ceiling plus alerting backs the per-user limits.

## Implementation

Track usage per authenticated principal (user/API key/tenant) in a fast store (e.g. Redis) with a token-bucket or sliding-window counter keyed on both request count and tokens. Reject over-limit requests with `429` and `Retry-After`. Add a global spend ceiling and alerts so aggregate abuse across many accounts is still caught, and cap `max_tokens`/input size per request so a single call can't be pathologically expensive.

## Gotchas

- Request-count limits alone don't bound cost — one request with a huge prompt or a large `max_tokens` can cost more than a hundred small ones, so cap tokens/cost per window, not only request count
- Rate-limit by authenticated identity, not IP alone — IPs are shared and rotatable, so IP-only limits both punish legitimate shared-network users and fail to stop a determined abuser
- A per-user cap without a global cap still lets a botnet of many accounts drain your budget — pair per-user limits with a global spend ceiling and alerting

## When NOT to Apply

- For a purely internal endpoint behind trusted auth with predictable usage, heavy per-user metering may be more machinery than the risk warrants — a global cap and request-size bound may suffice
- Don't rely on client-side throttling as the control — it's a UX nicety; the enforceable limit must live server-side

## Verification

Community-reported: per-user rate limiting and spend caps are standard abuse-prevention and cost-control practice for metered APIs, applied here to token-denominated LLM cost; LLM gateways expose these controls. Not tied to a specific named incident here, so flagged `enrichment_status: draft`.
