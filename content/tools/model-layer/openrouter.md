---
id: openrouter
name: "OpenRouter"
type: tool
job: [production-serving, prototyping]
description: "Unified API over 400+ models from all major providers with automatic fallbacks and pass-through pricing"
url: "https://openrouter.ai"
cost_model: usage-based
pricing_detail: "Pass-through provider pricing + ~5% fee on credits; some free model variants"
tags: [llm, routing, inference]
maturity: production
stack: [typescript, python, polyglot]
free_tier: true
free_tier_limits: "Free-tier variants of some models with daily request caps"
self_hostable: false
open_source: false
source_url: null
docs_url: "https://openrouter.ai/docs/quickstart"
github_url: null
alternatives: [litellm, portkey]
integrates_with: [litellm]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [prototype, production]
best_when:
  - "You want one API key and one OpenAI-compatible endpoint for every frontier and open model, with instant access to new releases"
  - "You need provider redundancy: automatic routing/fallback across providers hosting the same open model"
avoid_when:
  - "Enterprise data agreements with a specific provider are mandatory — an aggregator adds a party to your data path"
  - "Cost-sensitive high volume on one model: direct provider contracts beat aggregator fees at scale"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Closed-source/hosted product; capabilities described from official documentation and public reception as of 2026-07-08, not hands-on verified here."
verdict: recommended
verdict_rationale: "The de facto model aggregator; unbeatable for model-shopping and resilience, at a small routing premium"
status: active
buzz_sources: []
---

## Overview

A model marketplace/gateway: one OpenAI-compatible API fronts hundreds of models across OpenAI, Anthropic, Google, Meta hosts, and dozens of inference providers, with uptime-aware routing, price/latency-based provider selection, and unified billing — the fastest way to try any new model the day it ships.

## Why It's in the Arsenal

The entry exists because OpenRouter is a unified API over 400+ models from all major providers with automatic fallbacks and pass-through pricing. Read it beside `litellm`, `portkey`: the choice between them is a deployment and cost decision before it is a capability one.

## Key Features

- 400+ models behind one OpenAI-compatible API
- Provider routing: fallbacks, price/latency preferences, uptime awareness
- Unified credits, usage analytics, and BYOK options

## Architecture / How It Works

Requests hit OpenRouter's edge, which normalizes them to each provider's API, selects a provider per your routing preferences (or its default ranking), streams the response back, and meters usage against prepaid credits — abstracting provider-specific auth, formats, and outages.

## Getting Started

```bash
# OpenAI SDK, base_url swap:
# client = OpenAI(base_url='https://openrouter.ai/api/v1', api_key=OPENROUTER_API_KEY)
```

## Use Cases

1. **Where it fits**: "You want one API key and one OpenAI-compatible endpoint for every frontier and open model, with instant access to new releases.
2. **Adoption checkpoint**: compare OpenRouter against `litellm`, `portkey` on the same `production-serving, prototyping` task and the same traffic shape, and measure the two numbers this entry does not give you — end-to-end latency and the error rate when the dependency is degraded.

## Strengths

- The distinguishing implementation detail for OpenRouter is worth reading before adopting: requests hit OpenRouter's edge, which normalizes them to each provider's API, selects a provider per your routing preferences (or its default ranking), streams the response back, and meters usage against prepaid credits — abstracting provider-specific auth, formats, and outages.
- OpenRouter overlaps `litellm`, `portkey` in this phase. Read the alternatives' entries before choosing: the feature comparison is usually closer than the deployment and cost comparison, and the latter is what you inherit.
- Pin the client library rather than the API: OpenRouter is reachable through `litellm`, and those adapters change defaults — retrieval, batching, retries — without a major version bump.
- Capability is documented; behaviour is not. For OpenRouter, measure end-to-end latency and the error rate under a degraded upstream before this reaches production traffic.

## Limitations / When NOT to Use

- There is no self-hosted path to OpenRouter, so availability, quota and rate-limit changes are the vendor's to make and yours to absorb.
- OpenRouter's billing makes your workload an input: retries, verbose prompts and agent loops multiply spend quietly, so the metering point determines which optimisations are worth building.

## Integration Patterns

- *Wiring*: adopt OpenRouter over an HTTP endpoint from whichever service owns the call site against the `production-serving, prototyping` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `litellm`, `portkey` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Known integrations*: `litellm` are the documented surfaces worth starting from, because they establish the expected request and response contract. Pin the version you build against — a client library upgrade can change default retrieval or batching behaviour without a breaking version bump.
- *Deployment and cost*: Usage-based billing makes request volume the cost driver, so model the token or call volume before committing the integration.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Official Site](https://openrouter.ai)
- [Documentation](https://openrouter.ai/docs/quickstart)


## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-07-08 by @maintainer; both verified via the GitHub API.*
