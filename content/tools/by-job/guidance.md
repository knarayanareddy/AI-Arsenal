---
id: "guidance"
name: "Guidance"
type: "tool"
job:
  - "structured-output"
description: "Microsoft guidance library for controlling and constraining language model generation"
url: "https://github.com/guidance-ai/guidance"
cost_model: "open-source"
pricing_detail: "Open source or free to start"
tags:
  - structured-output
  - llm
  - guardrails
maturity: "production"
stack:
  - python
free_tier: true
free_tier_limits: "Free/open-source use or free tier; verify current limits before production"
self_hostable: true
open_source: true
source_url: "https://github.com/guidance-ai/guidance"
docs_url: "https://github.com/guidance-ai/guidance"
github_url: "https://github.com/guidance-ai/guidance"
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

> **TL;DR:** Microsoft guidance library for controlling and constraining language model generation. Open source or free to start. Best for constrained generation experiments.

## Overview

Guidance is included as a tool for structured-output workflows in AI engineering systems.

## Why It's in the Arsenal

It solves a recurring job in the AI engineering lifecycle and is useful to compare by cost, stack, open-source status, and operational model.

## Key Features

- Constrained generation
- Prompt/program templates
- Structured output control

## Architecture / How It Works

Guidance provides primitives for guiding model generation into desired structures and patterns.

## Getting Started

```bash
pip install guidance
```

## Use Cases

1. **Scenario**: Constrained output experiments
2. **Scenario**: Research prototypes
3. **Scenario**: Prompt-programming workflows

## Strengths

- Fine-grained control
- Useful structured generation ideas
- Open-source

## Limitations / When NOT to Use

- May be more specialized than JSON-schema tools
- Integration support varies by model backend
- Requires prompt/program design

## Integration Patterns

- Link this tool from job guides using its canonical ID `guidance`.
- Record pricing, hosting, and data-retention assumptions before production adoption.
- Pair with tracing and evaluation for production LLM workflows.

## Resources

- [Primary site](https://github.com/guidance-ai/guidance)
- [Documentation](https://github.com/guidance-ai/guidance)
- [Source](https://github.com/guidance-ai/guidance)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for structured-output.

---
*Last reviewed: 2026-06-13 by @maintainer*

