---
id: "choose-llm"
title: "Choose an LLM"
entry_type: "guide"
section: "architectures"
description: "Decision tree for choosing hosted, open-weight, local, or fine-tuned models"
tags:
  - llm
  - inference
  - self-hosted
  - cloud
related_entries: []
added_date: "2026-06-13"
last_reviewed: "2026-06-13"
added_by: "maintainer"
status: "active"
---

## Overview

Choose the smallest model family and hosting pattern that satisfies quality, latency, privacy, and cost requirements.


### Decision Matrix

| Constraint | Default Choice | Why |
|---|---|---|
| Highest quality, fastest launch | Hosted frontier model API | Minimizes model operations and maximizes reasoning quality |
| Sensitive/private data | Self-hosted open-weight model | Keeps data inside controlled infrastructure |
| Offline/local app | Ollama or llama.cpp | Simple local runtime with predictable cost |
| High throughput serving | vLLM or Text Generation Inference | Continuous batching and production serving controls |
| Repeated narrow task | Fine-tuned open or hosted model | Reduces prompt length and improves task consistency |

### Recommended Flow

1. Define the acceptance eval before comparing models.
2. Start with the smallest model that passes quality.
3. Benchmark latency and cost with production-shaped prompts.
4. Add routing only after simple single-model operation is understood.

## Why It's in the Arsenal

This guide turns scattered AI engineering tradeoffs into a repeatable decision process. It keeps recommendations structured enough for humans to browse and agents to route.

## Key Features

- Start with hosted frontier APIs when quality matters more than cost control
- Choose open-weight models when privacy, control, or unit economics dominate
- Use local models when offline operation or data locality is mandatory

## Architecture / How It Works

Use the constraints first: privacy, latency, budget, team skill, data sensitivity, expected traffic, and operational maturity. Then select the simplest stack that satisfies the hard constraints before optimizing optional dimensions.

## Getting Started

```bash
# Read this guide, identify your constraints, then compare the linked tools and projects.
```

## Use Cases

1. **Scenario**: When selecting components for a new AI application
2. **Scenario**: When reviewing an existing architecture for missing pieces

## Strengths

- Compresses common decision paths into a single reviewable artifact
- Encourages explicit tradeoffs instead of trend-following

## Limitations / When NOT to Use

- Does not replace hands-on benchmarking for production workloads
- Must be revisited when latency, privacy, or scale requirements change

## Integration Patterns

Use this guide alongside the generated data layer and relevant project/tool entries. For agent workflows, load `AGENT.md` first, then this file, then only the specific entries referenced by the decision.

## Resources

- [AI Arsenal Taxonomy](../../../TAXONOMY.md)
- [AI Arsenal Agent Map](../../../AGENT.md)

## Buzz & Reception

This is a foundational guidance page intended to evolve as the ecosystem changes.

---
*Last reviewed: 2026-06-13 by @maintainer*

