---
id: "llamaguard"
name: "Llama Guard"
type: "tool"
job:
  - "security-and-guardrails"
description: "Meta safety model family for classifying and moderating LLM inputs and outputs"
url: "https://github.com/meta-llama/PurpleLlama"
cost_model: "open-source"
pricing_detail: "Open source or free to start"
tags:
  - security
  - guardrails
  - llm
maturity: "production"
stack:
  - python
free_tier: true
free_tier_limits: "Free/open-source use or free tier; verify current limits before production"
self_hostable: true
open_source: true
source_url: "https://github.com/meta-llama/PurpleLlama"
docs_url: "https://www.llama.com/docs/model-cards-and-prompt-formats/llama-guard-3/"
github_url: "https://github.com/meta-llama/PurpleLlama"
alternatives: []
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-13"
added_by: "maintainer"
reviewed_by: "maintainer"
verdict: "recommended"
verdict_rationale: "Useful option when it matches your stack, cost, and operational constraints"
status: "active"
---

> **TL;DR:** Meta safety model family for classifying and moderating LLM inputs and outputs. Open source or free to start. Best for LLM safety classification.

## Overview

Llama Guard is included as a tool for security-and-guardrails workflows in AI engineering systems.

## Why It's in the Arsenal

It solves a recurring job in the AI engineering lifecycle and is useful to compare by cost, stack, open-source status, and operational model.

## Key Features

- Input/output safety classification
- Model-card driven usage
- Open model safety ecosystem

## Architecture / How It Works

Llama Guard is used as a safety classifier around LLM inputs and outputs.

## Getting Started

```bash
# See PurpleLlama model cards and examples
```

## Use Cases

1. **Scenario**: Moderating chat inputs
2. **Scenario**: Checking generated outputs
3. **Scenario**: Safety layers in open-model stacks

## Strengths

- Purpose-built safety model
- Works with open-model deployments
- Useful defense-in-depth layer

## Limitations / When NOT to Use

- Classifier is not complete safety
- Policy taxonomy must match product needs
- Latency/cost overhead

## Integration Patterns

- Link this tool from job guides using its canonical ID `llamaguard`.
- Record pricing, hosting, and data-retention assumptions before production adoption.
- Pair with tracing and evaluation for production LLM workflows.

## Resources

- [Primary site](https://github.com/meta-llama/PurpleLlama)
- [Documentation](https://www.llama.com/docs/model-cards-and-prompt-formats/llama-guard-3/)
- [Source](https://github.com/meta-llama/PurpleLlama)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for security-and-guardrails.

---
*Last reviewed: 2026-06-13 by @maintainer*

