---
id: outlines
name: Outlines
type: tool
job: [structured-output]
description: A library for constrained generation and structured outputs with LLMs
url: "https://github.com/dottxt-ai/outlines"
cost_model: open-source
pricing_detail: Open-source repository
tags: [structured-output, llm, inference]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: See official pricing page; limits may change
self_hostable: true
open_source: true
source_url: "https://github.com/dottxt-ai/outlines"
docs_url: null
github_url: "https://github.com/dottxt-ai/outlines"
alternatives: [guidance, instructor, pydantic-ai-tool]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [production, prototype]
best_when:
  - You need to guarantee an LLM's output matches a JSON schema, regex, or grammar at generation time (not just via prompting)
  - You're using an open-weight model locally and want constrained decoding integrated into the generation loop
avoid_when:
  - You're calling a hosted API that already supports native structured output / JSON mode (often simpler than client-side constrained decoding)
  - Your structured-output needs are simple enough that a parsing/retry library like Instructor is sufficient
version_tracked: null
verdict: recommended
verdict_rationale: Useful option for structured-output workflows when it matches your stack and cost constraints
status: active
---

## Overview

An open-source library for constrained generation, guaranteeing that an LLM's output matches a JSON schema, regex, or context-free grammar by controlling token sampling at generation time, not just by prompting.

## Why It's in the Arsenal

Outlines earns a place in the Arsenal because it directly addresses a recurring decision point: you need to guarantee an LLM's output matches a JSON schema, regex, or grammar at generation time (not just via prompting). It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Hard guarantees on output structure via constrained decoding
- Supports JSON schema, regex, and grammar constraints
- Integrates with local/open-weight model inference

## Architecture / How It Works

Outlines builds a finite-state machine (or equivalent) from the target schema/grammar and masks the model's logits at each generation step so only valid next tokens can be sampled.

## Getting Started

```bash
# Visit the official documentation for installation and setup.
# URL: https://github.com/dottxt-ai/outlines
```

## Use Cases

1. **Scenario**: you need to guarantee an LLM's output matches a JSON schema, regex, or grammar at generation time (not just via prompting)
2. **Scenario**: you're using an open-weight model locally and want constrained decoding integrated into the generation loop
3. **Scenario where this is NOT the right fit**: you're calling a hosted API that already supports native structured output / JSON mode (often simpler than client-side constrained decoding) — evaluate an alternative instead

## Strengths

- You need to guarantee an LLM's output matches a JSON schema, regex, or grammar at generation time (not just via prompting)
- You're using an open-weight model locally and want constrained decoding integrated into the generation loop

## Limitations / When NOT to Use

- You're calling a hosted API that already supports native structured output / JSON mode (often simpler than client-side constrained decoding)
- Your structured-output needs are simple enough that a parsing/retry library like Instructor is sufficient

## Integration Patterns

- Compare against [Guidance](./guidance.md), [Instructor](../dx-and-tooling/instructor.md), [Pydantic AI](../orchestration/pydantic-ai-tool.md) before adopting — they solve the same job in this phase.
- Link this tool from job guides using its canonical ID `outlines`.
- Record pricing, hosting, and data-retention assumptions before production adoption.


## Resources

- [Official Site](https://github.com/dottxt-ai/outlines)

## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-06-30 by @maintainer*

