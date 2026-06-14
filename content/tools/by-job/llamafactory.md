---
id: "llamafactory"
name: "LLaMA-Factory"
type: "tool"
job:
  - "fine-tuning"
description: "Unified fine-tuning framework and UI for many LLMs and training methods"
url: "https://github.com/hiyouga/LLaMA-Factory"
cost_model: "open-source"
pricing_detail: "Open source or free to start"
tags:
  - fine-tuning
  - llm
  - pytorch
maturity: "production"
stack:
  - python
free_tier: true
free_tier_limits: "Free/open-source use or free tier; verify current limits before production"
self_hostable: true
open_source: true
source_url: "https://github.com/hiyouga/LLaMA-Factory"
docs_url: "https://github.com/hiyouga/LLaMA-Factory"
github_url: "https://github.com/hiyouga/LLaMA-Factory"
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

> **TL;DR:** Unified fine-tuning framework and UI for many LLMs and training methods. Open source or free to start. Best for fine-tuning with UI and many model recipes.

## Overview

LLaMA-Factory is included as a tool for fine-tuning workflows in AI engineering systems.

## Why It's in the Arsenal

It solves a recurring job in the AI engineering lifecycle and is useful to compare by cost, stack, open-source status, and operational model.

## Key Features

- CLI and web UI workflows
- SFT, DPO, and related recipes
- Broad model support

## Architecture / How It Works

LLaMA-Factory provides training recipes and interfaces for common post-training workflows.

## Getting Started

```bash
pip install llamafactory
```

## Use Cases

1. **Scenario**: Instruction tuning experiments
2. **Scenario**: Preference optimization trials
3. **Scenario**: Teams wanting a UI around fine-tuning

## Strengths

- Broad recipe coverage
- Accessible UI path
- Active model support

## Limitations / When NOT to Use

- Can hide training complexity
- Production training still needs eval/versioning
- Resource requirements vary widely

## Integration Patterns

- Link this tool from job guides using its canonical ID `llamafactory`.
- Record pricing, hosting, and data-retention assumptions before production adoption.
- Pair with tracing and evaluation for production LLM workflows.

## Resources

- [Primary site](https://github.com/hiyouga/LLaMA-Factory)
- [Documentation](https://github.com/hiyouga/LLaMA-Factory)
- [Source](https://github.com/hiyouga/LLaMA-Factory)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for fine-tuning.

---
*Last reviewed: 2026-06-13 by @maintainer*

