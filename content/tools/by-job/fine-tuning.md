---
id: "fine-tuning"
title: "Fine-Tuning Tools"
entry_type: "guide"
section: "tools"
description: "Curated shortlist of fine-tuning tools for open and hosted models"
tags:
  - fine-tuning
  - llm
  - pytorch
related_entries: []
added_date: "2026-06-13"
last_reviewed: "2026-06-13"
added_by: "maintainer"
status: "active"
---

## Overview

Fine-tuning tooling should match model family, hardware budget, and desired control over training loops.

## Why It's in the Arsenal

This guide turns scattered AI engineering tradeoffs into a repeatable decision process. It keeps recommendations structured enough for humans to browse and agents to route.

## Key Features

- Efficient open-model tuning: Unsloth, Axolotl, LlamaFactory
- Hosted workflows: provider fine-tuning APIs
- Track data and eval sets before tuning

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

