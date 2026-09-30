---
id: "this-week"
title: "This Week in AI Arsenal"
entry_type: "trend"
kind: "weekly-snapshot"
status: "draft"
as_of: "2026-07-06"
window:
  start: "2026-06-29"
  end: "2026-07-06"
signals_used:
  - github-stars-velocity
  - github-stars-total
  - github-activity
sources:
  - source: "github"
    url: "https://github.com/trending"
    last_checked: "2026-07-06"
    notes: "GitHub Trending is the primary star-velocity signal."
ranked_entries:
  - rank: 1
    entry_id: "deepeval"
    entry_type: "project"
    why_here: "Trending score 70/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 70
  - rank: 2
    entry_id: "dspy"
    entry_type: "project"
    why_here: "Trending score 70/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 70
  - rank: 3
    entry_id: "gemma"
    entry_type: "project"
    why_here: "Trending score 70/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 70
  - rank: 4
    entry_id: "langchain"
    entry_type: "project"
    why_here: "Trending score 70/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 70
  - rank: 5
    entry_id: "phi-cookbook"
    entry_type: "project"
    why_here: "Trending score 70/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 70
  - rank: 6
    entry_id: "pydantic-ai"
    entry_type: "project"
    why_here: "Trending score 70/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 70
  - rank: 7
    entry_id: "qwen"
    entry_type: "project"
    why_here: "Trending score 70/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 70
  - rank: 8
    entry_id: "semantic-kernel"
    entry_type: "project"
    why_here: "Trending score 70/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 70
  - rank: 9
    entry_id: "surrealdb"
    entry_type: "project"
    why_here: "Trending score 60/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 60
  - rank: 10
    entry_id: "microsoft-agent-framework"
    entry_type: "project"
    why_here: "Trending score 50/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 50
last_reviewed: "2026-07-06"
added_date: "2026-07-06"
added_by: "maintainer"
enrichment_status: "draft"
tags:
  - trending
---

## Overview

This weekly draft summarizes notable project movement and ecosystem signals for maintainer review.

## What this snapshot covers

Top projects by trending score (GitHub star velocity, recency, and buzz sources) over the trailing 7-day window (2026-06-29 → 2026-07-06).

## Method (signals + caveats)

Trending scores are computed by `scripts/calculate-trending.js` from structured project metadata. Star velocity is noisy and community buzz is anecdotal; scores are only as good as source metadata and must be human-verified before publishing.

## Ranked entries (with why)

1. [DeepEval](../projects/benchmarks-and-evals/deepeval.md) — An open-source evaluation framework for testing LLM applications in CI
2. [DSPy](../projects/frameworks/dspy.md) — A framework for programming and optimizing language model pipelines
3. [Gemma](../projects/foundation-models/gemma.md) — Google open model family designed for efficient language and multimodal applications
4. [LangChain](../projects/frameworks/langchain.md) — A framework for composing LLM applications, retrieval flows, tools, and agents
5. [Phi Cookbook](../projects/foundation-models/phi-cookbook.md) — Microsoft examples and recipes for building with the Phi model family
6. [Pydantic AI](../projects/frameworks/pydantic-ai.md) — A Python agent framework built around typed models and structured outputs
7. [Qwen](../projects/foundation-models/qwen.md) — Alibaba open-weight model family covering language, coding, and multimodal use cases
8. [Semantic Kernel](../projects/frameworks/semantic-kernel.md) — An SDK for integrating AI orchestration into production applications
9. [SurrealDB](../projects/data-and-retrieval/surrealdb.md) — Multi-model database combining graph, document, vector, and time-series for AI agents
10. [Microsoft Agent Framework](../projects/frameworks/microsoft-agent-framework.md) — Microsoft framework for Python and .NET agents, workflows, and production orchestration

## Notable changes to watch

- Re-run `pnpm run update:trending` and `node scripts/draft-trending.js` before publishing; verify external buzz sources.

## How to use this (links into the Arsenal)

Link the weekly draft from monthly digests and launch posts once reviewed. Pair with the [Hall of Fame](./hall-of-fame.md) for evergreen context.

## Sources

- [GitHub Trending](https://github.com/trending) (last_checked: 2026-07-06)
