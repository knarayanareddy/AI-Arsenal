---
id: instructor
name: Instructor
type: tool
job: [structured-output]
description: A library for extracting typed structured outputs from language models
url: "https://github.com/instructor-ai/instructor"
cost_model: open-source
pricing_detail: Open-source repository
tags: [structured-output, llm, openai]
maturity: production
stack: [python, typescript]
free_tier: true
free_tier_limits: See official pricing page; limits may change
self_hostable: true
open_source: true
source_url: "https://github.com/instructor-ai/instructor"
docs_url: null
github_url: "https://github.com/instructor-ai/instructor"
alternatives: [guidance, outlines, pydantic-ai-tool]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - You want typed, Pydantic-validated structured output from an LLM with automatic retry-on-validation-failure
  - You're calling a hosted API (OpenAI, Anthropic, etc.) and want the simplest path to reliable structured data, not constrained decoding
avoid_when:
  - You need hard guarantees (not just retries) that output matches a schema/grammar — use Outlines for constrained decoding on open-weight models
  - You don't use Python/Pydantic-style typed models in your stack
version_tracked: null
verdict: best-in-class
verdict_rationale: Useful option for structured-output workflows when it matches your stack and cost constraints
status: active
buzz_sources: [{"source":"newsletter","url":"https://toolradar.com/featured/techpresso","date":"2026-06-14","description":"Featured in Techpresso as a structured-output library used by AI engineers"}]
---

## Overview

A lightweight Python library for extracting typed, Pydantic-validated structured output from an LLM call, with automatic retries when the model's output fails validation.

## Why It's in the Arsenal

The entry exists because Instructor is A library for extracting typed structured outputs from language models. Read it beside `guidance`, `outlines`, `pydantic-ai-tool`: the choice between them is a deployment and cost decision before it is a capability one.

## Key Features

- Pydantic-validated typed LLM outputs
- Automatic retry-on-validation-failure
- Works with hosted APIs (OpenAI, Anthropic, etc.) without constrained decoding

## Architecture / How It Works

Wraps a standard LLM API call, asking the model to produce output matching a Pydantic model's schema, validating the response, and re-prompting automatically on validation errors.

## Getting Started

```bash
# Visit the official documentation for installation and setup.
# URL: https://github.com/instructor-ai/instructor
```

## Use Cases

1. **Where it fits**: You want typed, Pydantic-validated structured output from an LLM with automatic retry-on-validation-failure.
2. **Adoption checkpoint**: compare Instructor against `guidance`, `outlines`, `pydantic-ai-tool` on the same `structured-output` task and the same traffic shape, and measure the two numbers this entry does not give you — end-to-end latency and the error rate when the dependency is degraded.

## Strengths

- Beyond the feature list, Instructor's own implementation notes give the specifics — wraps a standard LLM API call, asking the model to produce output matching a Pydantic model's schema, validating the response, and re-prompting automatically on validation errors — which is where a capability claim either holds or does not for your workload.
- Weighing Instructor against `guidance`, `outlines`, `pydantic-ai-tool` comes down to one question you should answer first: who runs the process when it breaks, you or the vendor.
- Instructor is a service call rather than a dependency you vendor, so nothing about its failure mode is yours to fix: timeouts, quotas and key expiry are the failure surface you design around.
- Capability is documented; behaviour is not. For Instructor, measure end-to-end latency and the error rate under a degraded upstream before this reaches production traffic.

## Limitations / When NOT to Use

- Depending on Instructor means depending on someone else's availability and pricing, and the exit cost rises with how deeply it is wired into your call sites.
- Documentation for Instructor describes capability rather than behaviour at your request shape, so latency, concurrency and failure handling are the parts you have to measure yourself.

## Integration Patterns

- Compare against [Guidance](../model-layer/guidance.md), [Outlines](../model-layer/outlines.md), [Pydantic AI](../orchestration/pydantic-ai-tool.md) before adopting — they solve the same job in this phase.
- Link this tool from job guides using its canonical ID `instructor`.
- Record pricing, hosting, and data-retention assumptions before production adoption.


## Resources

- [Official Site](https://github.com/instructor-ai/instructor)

## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-06-30 by @maintainer*

