---
id: llamaguard
name: Llama Guard
type: tool
job: [security-and-guardrails]
description: Meta safety model family for classifying and moderating LLM inputs and outputs
url: "https://github.com/meta-llama/PurpleLlama"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [security, guardrails, llm]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/meta-llama/PurpleLlama"
docs_url: "https://www.llama.com/docs/model-cards-and-prompt-formats/llama-guard-3/"
github_url: "https://github.com/meta-llama/PurpleLlama"
alternatives: [guardrails-ai, nemo-guardrails, rebuff]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [production]
best_when:
  - You need an open-weight safety classifier to moderate LLM inputs/outputs and can self-host the model
  - You want a model-based moderation layer rather than only keyword/regex filtering
avoid_when:
  - You need a fully managed moderation API with no self-hosting (most major model providers offer one)
  - Your latency budget can't absorb running an additional classifier model per request without optimization
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** the security-and-guardrails entry for Llama Guard. Meta safety model family for classifying and moderating LLM inputs and outputs — the deciding factor is operational cost and what you have to run, not the feature list.

## Overview

Meta's open-weight safety classifier model family for moderating LLM inputs and outputs, deployable as a self-hosted model rather than a third-party moderation API.

## Why It's in the Arsenal

The entry exists because Llama Guard is a meta safety model family for classifying and moderating LLM inputs and outputs. Read it beside `guardrails-ai`, `nemo-guardrails`, `rebuff`: the choice between them is a deployment and cost decision before it is a capability one.

## Key Features

- Open-weight, self-hostable safety classification
- Classifies both inputs and outputs against safety categories
- Multiple model sizes for different latency/cost tradeoffs

## Architecture / How It Works

Runs as a separate classifier model alongside the primary LLM; inputs and/or outputs are passed through Llama Guard before being accepted, flagging or blocking unsafe content.

## Getting Started

Install the Python package and its runtime dependencies first, then make one call to confirm the credentials, network path and configuration are reachable before wiring Llama Guard into anything else. The command below runs against the `security-and-guardrails` job and returns a result you can inspect directly.

```bash
# See PurpleLlama model cards and examples
```

Follow the official documentation at https://www.llama.com/docs/model-cards-and-prompt-formats/llama-guard-3/ for the authentication and configuration options, because the defaults in the quickstart are the ones most likely to need changing for real traffic.

## Use Cases

1. **Integrating Llama Guard**: the security-and-guardrails call is a dependency with its own failure modes, not a library call — settle timeout, retry and what happens when it is unavailable before the first request goes through.
2. **Validating the choice**: put Llama Guard and its named alternatives on the same task with the same data, and record the number that would make you switch — that criterion, not the feature list, is the decision.
3. **Choosing between candidates**: Llama Guard's comparison set is `guardrails-ai`, `nemo-guardrails`, `rebuff`; the axis that separates them is what you operate, so answer that before reading the feature lists.

## Strengths

- Beyond the marketing, Llama Guard's own notes are the useful part: runs as a separate classifier model alongside the primary LLM; inputs and/or outputs are passed through Llama Guard before being accepted, flagging or blocking unsafe content.
- Llama Guard's honest comparison set is `guardrails-ai`, `nemo-guardrails`, `rebuff`; what separates them is rarely capability, it is what you must operate.
- Depending on Llama Guard means depending on a service rather than a package, which makes substitution easy and outage handling someone else's.
- What this entry cannot give you is measured behaviour: measure Llama Guard's latency and its error rate under a degraded upstream before it carries production traffic.

## Limitations / When NOT to Use

- There is no self-hosted path to Llama Guard, so quota and rate-limit changes are the vendor's to make and yours to absorb.
- Documentation for Llama Guard describes capability, not behaviour at your request shape; latency, concurrency and failure handling are the parts you must measure yourself.
- Where Llama Guard overlaps `guardrails-ai`, `nemo-guardrails`, `rebuff`, choosing on feature lists alone is the mistake; the deciding axis is operational.

## Integration Patterns

- *Wiring*: adopt Llama Guard as a Python dependency or sidecar service against the `security-and-guardrails` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `guardrails-ai`, `nemo-guardrails`, `rebuff` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Primary site](https://github.com/meta-llama/PurpleLlama)
- [Documentation](https://www.llama.com/docs/model-cards-and-prompt-formats/llama-guard-3/)
- [Source](https://github.com/meta-llama/PurpleLlama)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for security-and-guardrails.

---
*Last reviewed: 2026-06-30 by @maintainer*

