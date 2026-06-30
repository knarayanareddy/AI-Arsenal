---
id: portkey
name: Portkey
type: tool
job: [prompt-management, monitoring]
description: An AI gateway for routing, observability, guardrails, and prompt management
url: "https://portkey.ai"
cost_model: freemium
pricing_detail: Free and paid SaaS tiers
tags: [observability, guardrails, cloud]
maturity: production
stack: [python, typescript]
free_tier: true
free_tier_limits: See official pricing page; limits may change
self_hostable: false
open_source: false
source_url: null
docs_url: null
github_url: null
alternatives: []
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: serving-and-deployment
audience: [production]
best_when:
  - You want an AI gateway combining routing, caching, guardrails, and observability in front of multiple LLM providers
  - You need centralized cost and usage observability across teams calling many different model APIs
avoid_when:
  - You only need simple multi-provider routing without the gateway/guardrails layer (LiteLLM alone may be enough)
  - You need a fully open-source, self-hostable gateway with no managed-service dependency for advanced features
version_tracked: null
verdict: recommended
verdict_rationale: Useful option for prompt-management, monitoring workflows when it matches your stack and cost constraints
status: active
---

## Overview

An AI gateway that sits in front of multiple LLM providers, combining routing, caching, guardrails, and centralized observability into one layer.

## Why It's in the Arsenal

Portkey earns a place in the Arsenal because it directly addresses a recurring decision point: you want an AI gateway combining routing, caching, guardrails, and observability in front of multiple LLM providers. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Multi-provider routing with caching and guardrails
- Centralized cost/usage observability across teams
- Configurable fallback and retry policies

## Architecture / How It Works

Application traffic is routed through Portkey's gateway, which applies configured policies (caching, guardrails, routing rules) before forwarding requests to the underlying model provider and logging the result.

## Getting Started

```bash
# Visit the official documentation for installation and setup.
# URL: https://portkey.ai
```

## Use Cases

1. **Scenario**: you want an AI gateway combining routing, caching, guardrails, and observability in front of multiple LLM providers
2. **Scenario**: you need centralized cost and usage observability across teams calling many different model APIs
3. **Scenario where this is NOT the right fit**: you only need simple multi-provider routing without the gateway/guardrails layer (LiteLLM alone may be enough) — evaluate an alternative instead

## Strengths

- You want an AI gateway combining routing, caching, guardrails, and observability in front of multiple LLM providers
- You need centralized cost and usage observability across teams calling many different model APIs

## Limitations / When NOT to Use

- You only need simple multi-provider routing without the gateway/guardrails layer (LiteLLM alone may be enough)
- You need a fully open-source, self-hostable gateway with no managed-service dependency for advanced features

## Integration Patterns

Link this tool from reference stacks, decision trees, and project entries using its canonical ID `portkey` rather than duplicating details.

## Resources

- [Official Site](https://portkey.ai)

## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-06-30 by @maintainer*

