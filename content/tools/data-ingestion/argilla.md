---
id: argilla
name: Argilla
type: tool
job: [data-labeling, evaluation]
description: Open-source platform for human and AI feedback, data curation, and evaluation datasets
url: "https://github.com/argilla-io/argilla"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [data, evaluation, llm]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/argilla-io/argilla"
docs_url: "https://github.com/argilla-io/argilla"
github_url: "https://github.com/argilla-io/argilla"
alternatives: [label-studio, prodigy, scale-ai]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [research, production]
best_when:
  - You need to collect human and/or AI feedback to build evaluation or fine-tuning datasets, open-source and self-hostable
  - You want annotation workflows tightly integrated with the Hugging Face ecosystem
avoid_when:
  - You need enterprise-managed labeling operations with outsourced annotators at scale (consider Scale AI)
  - Your labeling need is a one-off, small task where a spreadsheet would suffice
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** Open-source platform for human and AI feedback, data curation, and evaluation datasets. Open source or free to start. Best for human feedback datasets.

## Overview

An open-source platform for collecting human and/or AI feedback to build evaluation and fine-tuning datasets, tightly integrated with the Hugging Face ecosystem.

## Why It's in the Arsenal

Argilla earns a place in the Arsenal because it directly addresses a recurring decision point: you need to collect human and/or AI feedback to build evaluation or fine-tuning datasets, open-source and self-hostable. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Human + AI feedback collection workflows
- Self-hostable, open-source annotation platform
- Tight integration with Hugging Face datasets/models

## Architecture / How It Works

Records to be annotated are loaded into configurable annotation workspaces; completed annotations are exported as structured datasets ready for evaluation or fine-tuning.

## Getting Started

```bash
pip install argilla
```

## Use Cases

1. **Scenario**: you need to collect human and/or AI feedback to build evaluation or fine-tuning datasets, open-source and self-hostable
2. **Scenario**: you want annotation workflows tightly integrated with the Hugging Face ecosystem
3. **Scenario where this is NOT the right fit**: you need enterprise-managed labeling operations with outsourced annotators at scale (consider Scale AI) — evaluate an alternative instead

## Strengths

- You need to collect human and/or AI feedback to build evaluation or fine-tuning datasets, open-source and self-hostable
- You want annotation workflows tightly integrated with the Hugging Face ecosystem

## Limitations / When NOT to Use

- You need enterprise-managed labeling operations with outsourced annotators at scale (consider Scale AI)
- Your labeling need is a one-off, small task where a spreadsheet would suffice

## Integration Patterns

- Compare against [Label Studio](./label-studio.md), [Prodigy](./prodigy.md), [Scale AI](./scale-ai.md) before adopting — they solve the same job in this phase.
- Link this tool from job guides using its canonical ID `argilla`.
- Record pricing, hosting, and data-retention assumptions before production adoption.


## Resources

- [Primary site](https://github.com/argilla-io/argilla)
- [Documentation](https://github.com/argilla-io/argilla)
- [Source](https://github.com/argilla-io/argilla)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for data-labeling, evaluation.

---
*Last reviewed: 2026-06-30 by @maintainer*

