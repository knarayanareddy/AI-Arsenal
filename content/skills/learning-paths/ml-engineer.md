---
id: "ml-engineer"
title: "ML Engineer to AI Engineer Bridge"
entry_type: "guide"
section: "skills"
description: "Bridge path for ML engineers moving from training workflows to production LLM applications"
tags:
  - llm
  - evaluation
  - inference
  - data
related_entries: []
added_date: "2026-06-14"
last_reviewed: "2026-06-14"
added_by: "maintainer"
status: "active"
---

## Overview

A path from data science toward owning the platform: the training, serving, registry and monitoring concerns that sit outside the modelling most ML engineers already do. The ordering is general by design, with the specialisation forks called out rather than silently assumed.

## Why It's in the Arsenal

The gap this addresses is specific: most ML engineers arrive from modelling and discover that deployment, monitoring and reproducibility are where the time goes. Sequencing those concerns explicitly is what turns a list of relevant tools into a plan, and pairing each stage with a buildable project is what makes progress visible.

## Key Features

- Separates the modelling you already do from the platform work that is new, which is the real gap.
- Front-loads deployment and monitoring rather than treating them as later-career topics.
- Calls out specialisation forks instead of presenting one general ordering as universal.

## Architecture / How It Works

This bridge path keeps the ML discipline of datasets, reproducibility, and metrics, but applies it to LLM system behavior instead of only model training.

## Getting Started

```bash
# Start by converting one existing ML eval habit into an LLM eval dataset.
pnpm run generate:all
```

## Use Cases

1. **Scenario**: you are a data scientist moving toward owning model deployment and monitoring rather than only notebook work.
2. **Scenario**: you need to know which training and serving concerns sit outside the modelling you already do well.
3. **Scenario**: you are designing what to learn next and want the shortest path to being useful on an ML platform team.

## Strengths

- Separates the modelling work most ML engineers already do from the platform work that is new to them, which is the actual gap this path fills.
- Front-loads deployment and monitoring rather than treating them as a later-career topic.
- Keeps the ordering general on purpose, with specialisation called out as a fork rather than silently assumed.

## Limitations / When NOT to Use

- Assumes you already have the modelling fundamentals; this path starts where a data-science curriculum ends.
- Much of the platform work is infrastructure rather than ML, and the resource estimates here do not reflect how long infrastructure takes to learn properly.
- Specialisations inside ML engineering (recommendation, NLP, CV) change the ordering substantially, and this path is deliberately general.

## Integration Patterns

- Link a skill here from a serving, registry or experiment-tracking entry so a reader arriving mid-task knows what to learn first.
- Keep the referenced build examples current: a learning path whose projects no longer run is worse than no path.

## Resources

- [Research Platform Stack](../../architectures/reference-stacks/research-platform.md)
- [Fine-tuning tools](../../tools/by-job/fine-tuning.md)
- [Evaluation tools](../../tools/by-job/evaluation.md)
- [vLLM](../../projects/inference-engines/vllm.md)
- [PEFT](../../tools/model-layer/peft.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-06-14 by @maintainer*

