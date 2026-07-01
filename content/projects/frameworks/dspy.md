---
id: dspy
name: DSPy
version_tracked: null
artifact_type: framework
category: rag
subcategory: frameworks
description: A framework for programming and optimizing language model pipelines
github_url: "https://github.com/stanfordnlp/dspy"
license: MIT
primary_language: Python
org_or_maintainer: null
tags: [llm, rag, evaluation, reasoning]
maturity: production
cost_model: open-source
github_stars: 35010
github_stars_last_30d: 35010
trending_score: 70
last_commit: "2026-06-11"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, reasoning]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [research-origin, org-backed, community-driven]
ecosystem_role:
  - Stanford NLP's framework for programmatically optimizing LLM pipelines rather than hand-tuning prompts
best_for:
  - You want to treat prompt engineering as an optimization problem — DSPy compiles and tunes prompts/few-shot examples automatically against a metric, rather than requiring manual prompt iteration
  - You're building a multi-step LLM pipeline (e.g. retrieve-then-generate) and want a framework that can jointly optimize the prompts across all steps against an end-to-end metric
avoid_if:
  - You need a simple, single-prompt integration — DSPy's programming model and compilation step add complexity that isn't worth it for straightforward use cases
  - Your team isn't prepared to invest in defining evaluation metrics and training/validation examples — DSPy's optimization approach depends on having those in place to be effective
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: DSPy originated from Stanford NLP research (research-origin confirmed by its academic authorship and continued Stanford affiliation) and has since been adopted by a substantial open-source community (35K+ GitHub stars), a credible dual signal of both research rigor and practical adoption.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

A framework from Stanford NLP for programming and automatically optimizing language model pipelines, treating prompt engineering as a compilable, metric-driven optimization problem rather than manual trial and error.

## Why it's in the Arsenal

Stanford NLP's framework for programmatically optimizing LLM pipelines rather than hand-tuning prompts. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want to treat prompt engineering as an optimization problem — DSPy compiles and tunes prompts/few-shot examples automatically against a metric, rather than requiring manual prompt iteration. See Strengths / Limitations below before adopting it.

## Architecture

Developers define a pipeline's structure (modules like 'retrieve' and 'generate') and a target metric; DSPy's compiler then automatically searches over prompt formulations, few-shot examples, and even fine-tuning to optimize the pipeline's performance against that metric, separating pipeline logic from prompt engineering.

## Ecosystem Position

Upstream: model-provider-agnostic, works with any LLM API. Downstream: none of particular note. Competing: manual prompt-engineering workflows within LangChain/LlamaIndex; conceptually distinct from agent frameworks since DSPy focuses on pipeline optimization rather than orchestration. Complementary: can optimize prompts for pipelines built with LangChain or LlamaIndex components.

## Getting Started

```bash
pip install dspy
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Scenario**: you want to treat prompt engineering as an optimization problem — DSPy compiles and tunes prompts/few-shot examples automatically against a metric, rather than requiring manual prompt iteration
2. **Scenario**: you're building a multi-step LLM pipeline (e.g. retrieve-then-generate) and want a framework that can jointly optimize the prompts across all steps against an end-to-end metric

## Strengths

- You want to treat prompt engineering as an optimization problem — DSPy compiles and tunes prompts/few-shot examples automatically against a metric, rather than requiring manual prompt iteration
- You're building a multi-step LLM pipeline (e.g. retrieve-then-generate) and want a framework that can jointly optimize the prompts across all steps against an end-to-end metric

## Limitations

- You need a simple, single-prompt integration — DSPy's programming model and compilation step add complexity that isn't worth it for straightforward use cases
- Your team isn't prepared to invest in defining evaluation metrics and training/validation examples — DSPy's optimization approach depends on having those in place to be effective

## Relation to the Arsenal

This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/stanfordnlp/dspy)
- [Documentation](https://github.com/stanfordnlp/dspy)
