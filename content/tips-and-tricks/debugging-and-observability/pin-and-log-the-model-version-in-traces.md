---
id: "pin-and-log-the-model-version-in-traces"
title: "Pin and Log the Model Version in Every Trace"
category: "production-gotchas"
tags:
  - observability
  - llm
difficulty: "beginner"
impact: "high"
time_to_implement: "an hour"
phase: debugging-and-observability
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: community-reported
verified_by: "community reports (LLMOps versioning practice)"
applies_to:
  - production-deployment
gotchas:
  - "Aliases like 'latest' or an undated model name can silently repoint to a new snapshot, changing behavior with no deploy on your side -- pin explicit versions and record which one served each request"
  - "A pinned version can be deprecated and retired by the provider; monitor deprecation notices so a pin does not turn into an outage"
metrics: []
related_tips:
  - store-prompt-version-in-every-trace
  - track-refusal-rates-as-a-regression-signal
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Hosted models change under you. If you call a floating alias (e.g. an undated model name or "latest"), the provider can swap the underlying snapshot and your outputs shift with zero changes on your side — the hardest class of bug to diagnose because nothing in your repo moved. Pin an explicit model version in requests, and log the exact version that served each response. Then a behavior change correlates to a known model swap in your traces instead of a multi-day hunt through your own code.

## Before / After

**Before:** Answer quality degrades over a weekend; you bisect your own commits for two days before discovering the provider rotated the model behind the alias you were calling.

**After:** Every trace records the serving model version; the quality dip lines up exactly with a version change in the logs, and you pin back or adapt in minutes.

## Implementation

Specify an explicit, dated model version in your API calls rather than a floating alias. Capture the model version returned/echoed by the provider in every trace, alongside prompt version and request id. When behavior shifts, filter traces by model version to confirm or rule out a model change before touching your code. Track provider deprecation schedules so pins are refreshed deliberately.

## Gotchas

- Floating aliases repoint silently — pin explicit versions and record the served version per request
- Pins get deprecated; watch provider notices so a pin does not become a broken call

## When NOT to Apply

- Self-hosted models you deploy already have a known version — still log it, but the silent-swap risk is lower
- If you intentionally want auto-upgrades and can tolerate drift, document that choice; still log the served version

## Verification

Community-reported: version pinning and logging is standard LLMOps guidance precisely because hosted-model swaps cause silent regressions. Provider aliasing/deprecation behavior varies.
