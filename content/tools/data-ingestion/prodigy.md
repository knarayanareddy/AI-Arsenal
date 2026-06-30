---
id: prodigy
name: Prodigy
type: tool
job: [data-labeling]
description: Scriptable annotation tool for NLP, data labeling, and model-in-the-loop workflows
url: "https://prodi.gy/"
cost_model: paid
pricing_detail: Paid commercial license
tags: [data, evaluation]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: false
open_source: false
source_url: null
docs_url: "https://prodi.gy/docs/"
github_url: null
alternatives: [argilla, label-studio, scale-ai]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [research]
best_when:
  - You want a scriptable, model-in-the-loop annotation tool to actively improve labeling efficiency for NLP tasks
  - You're comfortable writing small Python recipes to customize the annotation workflow
avoid_when:
  - You need a free, open-source tool (Prodigy is a paid, one-time-license product)
  - You need multi-modal (image/video/audio) labeling beyond Prodigy's primary NLP focus
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** Scriptable annotation tool for NLP, data labeling, and model-in-the-loop workflows. Paid commercial license. Best for scriptable expert annotation.

## Overview

A scriptable, model-in-the-loop annotation tool for NLP tasks, where small Python 'recipes' can actively select the most useful examples to label next, improving annotation efficiency.

## Why It's in the Arsenal

Prodigy earns a place in the Arsenal because it directly addresses a recurring decision point: you want a scriptable, model-in-the-loop annotation tool to actively improve labeling efficiency for NLP tasks. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Model-in-the-loop active learning for annotation
- Scriptable recipes for custom workflows
- Paid, one-time-license desktop/server tool

## Architecture / How It Works

A recipe script controls what's shown to the annotator next (often guided by a model's uncertainty), and annotated examples can be fed back to retrain that model iteratively.

## Getting Started

```bash
# Install via paid Prodigy license instructions
```

## Use Cases

1. **Scenario**: you want a scriptable, model-in-the-loop annotation tool to actively improve labeling efficiency for NLP tasks
2. **Scenario**: you're comfortable writing small Python recipes to customize the annotation workflow
3. **Scenario where this is NOT the right fit**: you need a free, open-source tool (Prodigy is a paid, one-time-license product) — evaluate an alternative instead

## Strengths

- You want a scriptable, model-in-the-loop annotation tool to actively improve labeling efficiency for NLP tasks
- You're comfortable writing small Python recipes to customize the annotation workflow

## Limitations / When NOT to Use

- You need a free, open-source tool (Prodigy is a paid, one-time-license product)
- You need multi-modal (image/video/audio) labeling beyond Prodigy's primary NLP focus

## Integration Patterns

- Compare against [Argilla](./argilla.md), [Label Studio](./label-studio.md), [Scale AI](./scale-ai.md) before adopting — they solve the same job in this phase.
- Link this tool from job guides using its canonical ID `prodigy`.
- Record pricing, hosting, and data-retention assumptions before production adoption.


## Resources

- [Primary site](https://prodi.gy/)
- [Documentation](https://prodi.gy/docs/)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for data-labeling.

---
*Last reviewed: 2026-06-30 by @maintainer*

