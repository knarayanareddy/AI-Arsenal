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

DSPy is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

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

1. **Adopting the abstraction**: for DSPy, the question is whether the control-flow model it imposes is one you want in your codebase permanently, since every step written against it is a step you own later.
2. **What dominates the decision**: `treat`, `prompt`, `engineering`, `optimization` are the variables that actually move the outcome for DSPy in this phase, and none of them appear in a feature comparison.
3. **Before committing**: pick the criterion that would make you abandon this choice, write it down, and check it against a representative slice of your own data — a catalog entry can tell you what is claimed, only a run tells you what is true.

## Strengths

- What DSPy gives you that reading the feature list does not: developers define a pipeline's structure (modules like 'retrieve' and 'generate') and a target metric; DSPy's compiler then automatically searches over prompt formulations, few-shot examples, and even fine-tuning to optimize the pipeline's performance against that metric, separating pipeline logic from prompt engineering, which is the part you have to evaluate against your own workload.
- Sits in the framework phase alongside the alternatives named in its Ecosystem Position section; cross-phase comparison is usually a category error rather than a useful alternative.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- Adoption risk for DSPy is mostly operational rather than technical — resource cost at your scale, dependency failure behaviour, and the upgrade path when interfaces move.
- Nothing in this entry substitutes for running DSPy against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- No alternative is catalogued alongside DSPy here, so the entry cannot tell you what it is better than; treat that absence as a gap in the comparison rather than as a verdict.

## Relation to the Arsenal

DSPy is Stanford's framework for programming — not prompting — LMs, compiling declarative modules into optimized prompts. This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/stanfordnlp/dspy)
- [Documentation](https://github.com/stanfordnlp/dspy)
