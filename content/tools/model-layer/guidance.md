---
id: guidance
name: Guidance
type: tool
job: [structured-output]
description: Microsoft guidance library for controlling and constraining language model generation
url: "https://github.com/guidance-ai/guidance"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [structured-output, llm, guardrails]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/guidance-ai/guidance"
docs_url: "https://github.com/guidance-ai/guidance"
github_url: "https://github.com/guidance-ai/guidance"
alternatives: [instructor, outlines, pydantic-ai-tool]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [research, prototype]
best_when:
  - You want fine-grained, token-level control over generation structure (interleaving control flow with model output)
  - You're building advanced prompting patterns that need more control than a templating library offers
avoid_when:
  - You just need typed structured output extraction with retries (Instructor is simpler for that)
  - You need a small, stable dependency surface — Guidance's API has changed significantly across versions, so pin carefully
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** Microsoft guidance library for controlling and constraining language model generation. Open source or free to start. Best for constrained generation experiments.

## Overview

A library for fine-grained, token-level control over LLM generation, letting you interleave control-flow logic directly with model output rather than relying purely on prompt text.

## Why It's in the Arsenal

Guidance earns a place in the Arsenal because it directly addresses a recurring decision point: you want fine-grained, token-level control over generation structure (interleaving control flow with model output). It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Token-level control over generation structure
- Interleaves program logic with model sampling
- Useful for advanced, non-standard prompting patterns

## Architecture / How It Works

Generation is expressed as a program mixing literal text, control flow, and model-generated spans; the library drives the underlying model step by step according to that program.

## Getting Started

```bash
pip install guidance
```

## Use Cases

1. **Scenario**: you want fine-grained, token-level control over generation structure (interleaving control flow with model output)
2. **Scenario**: you're building advanced prompting patterns that need more control than a templating library offers
3. **Scenario where this is NOT the right fit**: you just need typed structured output extraction with retries (Instructor is simpler for that) — evaluate an alternative instead

## Strengths

- You want fine-grained, token-level control over generation structure (interleaving control flow with model output)
- You're building advanced prompting patterns that need more control than a templating library offers

## Limitations / When NOT to Use

- You just need typed structured output extraction with retries (Instructor is simpler for that)
- You need a small, stable dependency surface — Guidance's API has changed significantly across versions, so pin carefully

## Integration Patterns

- Compare against [Instructor](../dx-and-tooling/instructor.md), [Outlines](./outlines.md), [Pydantic AI](../orchestration/pydantic-ai-tool.md) before adopting — they solve the same job in this phase.
- Link this tool from job guides using its canonical ID `guidance`.
- Record pricing, hosting, and data-retention assumptions before production adoption.


## Resources

- [Primary site](https://github.com/guidance-ai/guidance)
- [Documentation](https://github.com/guidance-ai/guidance)
- [Source](https://github.com/guidance-ai/guidance)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for structured-output.

---
*Last reviewed: 2026-06-30 by @maintainer*

