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

> **TL;DR:** Meta safety model family for classifying and moderating LLM inputs and outputs. Open source or free to start. Best for LLM safety classification.

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

1. **Where it fits**: You need an open-weight safety classifier to moderate LLM inputs/outputs and can self-host the model.
2. **Adoption checkpoint**: compare Llama Guard against `guardrails-ai`, `nemo-guardrails`, `rebuff` on the same `security-and-guardrails` task and the same traffic shape, and measure the two numbers this entry does not give you — end-to-end latency and the error rate when the dependency is degraded.

## Strengths

- In concrete terms, Llama Guard is a meta safety model family for classifying and moderating LLM inputs and outputs — the mechanism named in this entry's architecture is what to check against your own pipeline, because that is where the behaviour actually lives.
- Against `guardrails-ai`, `nemo-guardrails`, `rebuff`, the comparison that decides this is deployment model and operational cost rather than the feature list; Llama Guard sits at the hosted-or-embedded end of that axis.
- Llama Guard is reached over an API rather than vendored as a library, so replacing it later is a client swap; the offset is that its availability, rate limits and pricing are the vendor's to change.
- What this entry does not give you is behaviour under your load: measure Llama Guard's end-to-end latency and its error rate when the upstream dependency is degraded before you trust it in production.

## Limitations / When NOT to Use

- Depending on Llama Guard means depending on someone else's availability and pricing, and the exit cost rises with how deeply it is wired into your call sites.
- Documentation for Llama Guard describes capability rather than behaviour at your request shape, so latency, concurrency and failure handling are the parts you have to measure yourself.

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

