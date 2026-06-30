---
id: litellm
name: LiteLLM
type: tool
job: [production-serving, prompt-management]
description: A proxy and SDK for routing requests across many LLM providers
url: "https://www.litellm.ai"
cost_model: open-source
pricing_detail: Open-source proxy with enterprise options
tags: [llm, cloud, monitoring]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: See official pricing page; limits may change
self_hostable: true
open_source: true
source_url: "https://github.com/BerriAI/litellm"
docs_url: null
github_url: "https://github.com/BerriAI/litellm"
alternatives: []
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: serving-and-deployment
audience: [prototype, production]
best_when:
  - You want a single OpenAI-compatible interface to call dozens of LLM providers, with built-in fallback and load balancing
  - You need to swap or route between model providers without rewriting application code
avoid_when:
  - You only ever call one provider's API directly and don't need a routing/abstraction layer
  - You need deep, provider-specific features that an abstraction layer would otherwise mask
version_tracked: null
verdict: recommended
verdict_rationale: Useful option for production-serving, prompt-management workflows when it matches your stack and cost constraints
status: active
---

## Overview

An open-source proxy and SDK that exposes a single OpenAI-compatible interface for calling dozens of different LLM providers, with built-in fallback and load-balancing logic.

## Why It's in the Arsenal

LiteLLM earns a place in the Arsenal because it directly addresses a recurring decision point: you want a single OpenAI-compatible interface to call dozens of LLM providers, with built-in fallback and load balancing. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- One interface for many LLM providers
- Built-in fallback and load balancing across providers/keys
- Usable as an embedded SDK or a standalone proxy server

## Architecture / How It Works

Requests are made against LiteLLM's unified API; it translates them into the target provider's native format and can route, retry, or fall back across multiple configured providers.

## Getting Started

```bash
# Visit the official documentation for installation and setup.
# URL: https://www.litellm.ai
```

## Use Cases

1. **Scenario**: you want a single OpenAI-compatible interface to call dozens of LLM providers, with built-in fallback and load balancing
2. **Scenario**: you need to swap or route between model providers without rewriting application code
3. **Scenario where this is NOT the right fit**: you only ever call one provider's API directly and don't need a routing/abstraction layer — evaluate an alternative instead

## Strengths

- You want a single OpenAI-compatible interface to call dozens of LLM providers, with built-in fallback and load balancing
- You need to swap or route between model providers without rewriting application code

## Limitations / When NOT to Use

- You only ever call one provider's API directly and don't need a routing/abstraction layer
- You need deep, provider-specific features that an abstraction layer would otherwise mask

## Integration Patterns

Link this tool from reference stacks, decision trees, and project entries using its canonical ID `litellm` rather than duplicating details.

## Resources

- [Official Site](https://www.litellm.ai)

## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-06-30 by @maintainer*

