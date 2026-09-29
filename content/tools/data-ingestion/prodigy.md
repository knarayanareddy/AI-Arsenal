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

Install the Python package and its runtime dependencies first, then make one call to confirm the credentials, network path and configuration are reachable before wiring Prodigy into anything else. The command below calls the hosted service against the `data-labeling` job and returns a result you can inspect directly.

```bash
# Install via paid Prodigy license instructions
```

Follow the official documentation at https://prodi.gy/docs/ for the authentication and configuration options, because the defaults in the quickstart are the ones most likely to need changing for real traffic.

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

- *Wiring*: adopt Prodigy as a Python dependency or sidecar service against the `data-labeling` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `argilla`, `label-studio`, `scale-ai` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Deployment and cost*: This is a paid line item, so the unit economics belong in the same review as latency: check whether a self-hosted or open-source substitute covers the same job.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Primary site](https://prodi.gy/)
- [Documentation](https://prodi.gy/docs/)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for data-labeling.

---
*Last reviewed: 2026-06-30 by @maintainer*

