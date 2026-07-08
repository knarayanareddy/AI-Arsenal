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

OpenRouter earns a place in the Arsenal because it directly addresses a recurring decision point: you want one API key and one OpenAI-compatible endpoint for every frontier and open model, with instant access to new releases. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

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

1. **Scenario**: you want one API key and one OpenAI-compatible endpoint for every frontier and open model, with instant access to new releases
2. **Scenario**: you need provider redundancy: automatic routing/fallback across providers hosting the same open model
3. **Scenario where this is NOT the right fit**: enterprise data agreements with a specific provider are mandatory — an aggregator adds a party to your data path — evaluate an alternative instead

## Strengths

- You want one API key and one OpenAI-compatible endpoint for every frontier and open model, with instant access to new releases
- You need provider redundancy: automatic routing/fallback across providers hosting the same open model

## Limitations / When NOT to Use

- Enterprise data agreements with a specific provider are mandatory — an aggregator adds a party to your data path
- Cost-sensitive high volume on one model: direct provider contracts beat aggregator fees at scale

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `litellm`, `portkey` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `openrouter`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://openrouter.ai)
- [Documentation](https://openrouter.ai/docs/quickstart)


## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-07-08 by @maintainer*
