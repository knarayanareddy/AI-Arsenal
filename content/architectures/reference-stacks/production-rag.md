---
id: "production-rag"
title: "Production RAG Stack"
entry_type: "guide"
section: "architectures"
description: "Reference architecture for reliable retrieval-augmented generation"
tags:
  - rag
  - retrieval
  - evaluation
  - observability
related_entries: []
added_date: "2026-06-13"
last_reviewed: "2026-06-13"
added_by: "maintainer"
status: "active"
---

## Overview

Production RAG requires ingestion, retrieval, generation, evaluation, monitoring, and feedback loops as separate concerns.


### Production Checklist

| Layer | Requirement | Failure Mode Prevented |
|---|---|---|
| Ingestion | deterministic parsing, chunking, metadata | unreproducible retrieval changes |
| Retrieval | hybrid search, filters, reranking | irrelevant or stale context |
| Generation | prompt versioning, structured outputs | silent behavior drift |
| Evaluation | golden sets and regression runs | shipping degraded retrieval |
| Observability | traces, cost, latency, feedback | inability to debug production failures |

### Minimum Launch Bar

A production RAG system should not launch without trace capture, source attribution, a fallback path when retrieval confidence is low, and at least one task-specific evaluation set.

## Why It's in the Arsenal

This guide turns scattered AI engineering tradeoffs into a repeatable decision process. It keeps recommendations structured enough for humans to browse and agents to route.

## Key Features

- Document pipeline with chunking and metadata
- Vector search with reranking and filters
- Tracing, evals, and cost tracking

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

