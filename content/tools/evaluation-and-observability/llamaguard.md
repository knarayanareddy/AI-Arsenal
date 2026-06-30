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

Llama Guard earns a place in the Arsenal because it directly addresses a recurring decision point: you need an open-weight safety classifier to moderate LLM inputs/outputs and can self-host the model. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Open-weight, self-hostable safety classification
- Classifies both inputs and outputs against safety categories
- Multiple model sizes for different latency/cost tradeoffs

## Architecture / How It Works

Runs as a separate classifier model alongside the primary LLM; inputs and/or outputs are passed through Llama Guard before being accepted, flagging or blocking unsafe content.

## Getting Started

```bash
# See PurpleLlama model cards and examples
```

## Use Cases

1. **Scenario**: you need an open-weight safety classifier to moderate LLM inputs/outputs and can self-host the model
2. **Scenario**: you want a model-based moderation layer rather than only keyword/regex filtering
3. **Scenario where this is NOT the right fit**: you need a fully managed moderation API with no self-hosting (most major model providers offer one) — evaluate an alternative instead

## Strengths

- You need an open-weight safety classifier to moderate LLM inputs/outputs and can self-host the model
- You want a model-based moderation layer rather than only keyword/regex filtering

## Limitations / When NOT to Use

- You need a fully managed moderation API with no self-hosting (most major model providers offer one)
- Your latency budget can't absorb running an additional classifier model per request without optimization

## Integration Patterns

- Compare against [Guardrails AI](./guardrails-ai.md), [NeMo Guardrails](./nemo-guardrails.md), [Rebuff](./rebuff.md) before adopting — they solve the same job in this phase.
- Link this tool from job guides using its canonical ID `llamaguard`.
- Record pricing, hosting, and data-retention assumptions before production adoption.


## Resources

- [Primary site](https://github.com/meta-llama/PurpleLlama)
- [Documentation](https://www.llama.com/docs/model-cards-and-prompt-formats/llama-guard-3/)
- [Source](https://github.com/meta-llama/PurpleLlama)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for security-and-guardrails.

---
*Last reviewed: 2026-06-30 by @maintainer*

