---
id: "rag-vs-fine-tuning"
title: "RAG vs Fine-Tuning"
entry_type: "guide"
section: "architectures"
description: "Decision tree for choosing retrieval, fine-tuning, or both"
tags:
  - rag
  - fine-tuning
  - retrieval
  - evaluation
related_entries: []
added_date: "2026-06-13"
last_reviewed: "2026-06-13"
added_by: "maintainer"
status: "active"
---

## Overview

RAG and fine-tuning solve different problems. RAG injects knowledge; fine-tuning changes behavior, style, or task performance.


### Decision Matrix

| Need | Prefer | Reason |
|---|---|---|
| Fresh/private knowledge | RAG | Knowledge can update without retraining |
| Style, format, or policy consistency | Fine-tuning | Behavior is learned rather than repeated in every prompt |
| Lower prompt cost for repeated tasks | Fine-tuning | Reduces instruction and example tokens |
| Explainable source-grounded answers | RAG | Retrieved chunks can be shown and audited |
| Domain behavior plus private knowledge | RAG + fine-tuning | Separates knowledge injection from behavioral adaptation |

### Anti-Patterns

- Fine-tuning to memorize fast-changing facts.
- Adding RAG before measuring whether retrieval improves answers.
- Evaluating only the final answer while ignoring retrieved context quality.

## Why It's in the Arsenal

This guide turns scattered AI engineering tradeoffs into a repeatable decision process. It keeps recommendations structured enough for humans to browse and agents to route.

## Key Features

- Use RAG for fresh or private knowledge
- Use fine-tuning for repeated format/style/task behavior
- Combine both when domain knowledge and specialized behavior are required

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

