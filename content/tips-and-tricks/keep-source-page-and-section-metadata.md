---
id: "keep-source-page-and-section-metadata"
title: "Keep Source Page and Section Metadata"
category: "rag-tuning"
tags:
  - rag
  - retrieval
  - embeddings
difficulty: "intermediate"
impact: "high"
time_to_implement: "45 minutes"
applies_to: []
added_date: "2026-06-14"
added_by: "maintainer"
verified_by: "maintainer"
source_url: null
---

## Overview

> **TL;DR:** Store page, heading, and source URL metadata so generated answers can cite evidence.

RAG tuning should be driven by representative questions and retrieved evidence, not global defaults.

## Why It's in the Arsenal

This tip captures a repeatable AI engineering practice that reduces failures, cost, latency, or debugging time. It is intentionally short and implementation-oriented.

## Key Features

- **Impact:** High
- **Time to implement:** 45 minutes
- **Applies to:** rag, retrieval, embeddings

## Architecture / How It Works

The practice changes one controllable part of the system—prompting, retrieval, evaluation, memory, serving, or logging—so teams can measure whether behavior improves.

## Getting Started

```python
retrieval_config = {"top_k": 8, "filters": {"doc_type": "manual"}}
```

## Use Cases

1. **Scenario**: When this failure mode appears in a prototype or production trace
2. **Scenario**: When you need a low-risk improvement before changing major architecture

## Strengths

- Small enough to test quickly
- Easy to roll back if metrics do not improve
- Works best when paired with traces and evals

## Limitations / When NOT to Use

- Do not apply blindly without checking quality, cost, and latency impact
- Re-evaluate after changing model, prompt, retriever, or deployment target

## Integration Patterns

- Add a trace or eval before and after applying the tip.
- Record the change in prompt/config/version history.
- Promote failures into an evaluation dataset when possible.

## Resources

- [AI Arsenal evaluation pipelines](../observability/evaluation-pipelines.md)
- [AI Arsenal observability overview](../observability/overview.md)

## Buzz & Reception

This is a practical field tip distilled from common LLM application failure modes and should be refined with project-specific evidence.

---
*Last reviewed: 2026-06-14 by @maintainer*

