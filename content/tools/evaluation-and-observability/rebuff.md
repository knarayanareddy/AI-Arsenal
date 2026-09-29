---
id: rebuff
name: Rebuff
type: tool
job: [security-and-guardrails]
description: Prompt injection detection and guardrail toolkit for LLM applications
url: "https://github.com/protectai/rebuff"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [security, guardrails, llm]
maturity: production
stack: [python, typescript]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/protectai/rebuff"
docs_url: "https://github.com/protectai/rebuff"
github_url: "https://github.com/protectai/rebuff"
alternatives: [guardrails-ai, llamaguard, nemo-guardrails]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [production]
best_when:
  - You need a dedicated, lightweight toolkit specifically for detecting prompt injection attacks
  - You want to layer injection detection on top of an existing LLM application with minimal integration
avoid_when:
  - You need a broader guardrails framework covering many safety dimensions, not just injection (consider Guardrails AI or NeMo Guardrails)
  - You require active, frequent maintenance guarantees — verify recent commit activity before adopting
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** Rebuff covers the security-and-guardrails leg. The capability is documented; the behaviour at your load is not, so measure latency and degraded-mode handling yourself before adopting it.

## Overview

A lightweight, open-source toolkit specifically focused on detecting prompt injection attacks, intended to be layered on top of an existing LLM application with minimal integration work.

## Why It's in the Arsenal

Rebuff is catalogued here on the strength of its own documentation and public record rather than an independent measurement, so treat the claims below as what the project states about itself until you have run it.

## Key Features

- Focused specifically on prompt injection detection
- Lightweight integration into existing LLM call paths

## Architecture / How It Works

Incoming prompts/content are scored against injection-detection heuristics and/or a classifier before being passed to the underlying LLM, flagging suspicious inputs.

The flow is request to span to aggregate: spans are written asynchronously, so a dashboard can lag the request that produced it, and any sampling or batching setting changes what the aggregate score represents. The execution model matters more than the feature surface for Rebuff unlike `guardrails-ai`, `llamaguard`; on the security-and-guardrails path; under a open-source cost model; with `rebuff`, `name`, `type`. A call either returns, times out, or is rate-limited, and which of those you get under load is what separates a working integration from a demo.

## Getting Started

Install the client for your language, then make one call to confirm the credentials, network path and configuration are reachable before wiring Rebuff into anything else. The command below runs against the `security-and-guardrails` job and returns a result you can inspect directly.

```bash
pip install rebuff
```

Follow the official documentation at https://github.com/protectai/rebuff for the authentication and configuration options, because the defaults in the quickstart are the ones most likely to need changing for real traffic.

## Use Cases

1. **What it does in a system**: Rebuff sits on the security-and-guardrails leg of the pipeline, so the work is deciding its timeout, retry and degraded-mode behaviour and putting it behind an interface that lets you replace it without a rewrite.
2. **Validating the choice**: put Rebuff and its named alternatives on the same task with the same data, and record the number that would make you switch — that criterion, not the feature list, is the decision.
3. **Choosing between candidates**: Rebuff's comparison set is `guardrails-ai`, `llamaguard`, `nemo-guardrails`; the axis that separates them is what you operate, so answer that before reading the feature lists.

## Strengths

- What Rebuff gives you that its headline description does not: incoming prompts/content are scored against injection-detection heuristics and/or a classifier before being passed to the underlying LLM, flagging suspicious inputs, which is the part to check against your own pipeline before trusting the feature list.
- Rebuff overlaps `guardrails-ai`, `llamaguard`, `nemo-guardrails` in this phase. Read those entries before choosing: the feature comparison is usually closer than the deployment comparison, and the latter is what you inherit.
- Rebuff is reached over an API rather than vendored, so replacing it is a client swap; the offset is that its availability and pricing are the vendor's to change.
- What this entry cannot give you is measured behaviour: measure Rebuff's latency and its error rate under a degraded upstream before it carries production traffic.

## Limitations / When NOT to Use

- There is no self-hosted path to Rebuff, so quota and rate-limit changes are the vendor's to make and yours to absorb.
- Documentation for Rebuff describes capability, not behaviour at your request shape; latency, concurrency and failure handling are the parts you must measure yourself.
- Where Rebuff overlaps `guardrails-ai`, `llamaguard`, `nemo-guardrails`, choosing on feature lists alone is the mistake; the deciding axis is operational.

## Integration Patterns

- *Wiring*: adopt Rebuff over an HTTP endpoint from whichever service owns the call site against the `security-and-guardrails` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `guardrails-ai`, `llamaguard`, `nemo-guardrails` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Primary site](https://github.com/protectai/rebuff)
- [Documentation](https://github.com/protectai/rebuff)
- [Source](https://github.com/protectai/rebuff)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for security-and-guardrails.

---
*Last reviewed: 2026-06-30 by @maintainer*

