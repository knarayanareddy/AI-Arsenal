---
id: dspy
name: DSPy
version_tracked: null
artifact_type: framework
category: rag
subcategory: frameworks
description: Declarative Python framework that compiles LM pipelines against a metric, replacing hand-written prompts with optimised instructions and demos
github_url: "https://github.com/stanfordnlp/dspy"
license: MIT
primary_language: Python
org_or_maintainer: null
tags: [llm, rag, evaluation, reasoning]
maturity: production
cost_model: open-source
github_stars: 38800
github_stars_last_30d: 35010
trending_score: 70
last_commit: "2026-10-26"
docs_url: "https://dspy.ai/"
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
alternatives: [langgraph, haystack]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: DSPy originated from Stanford NLP research (research-origin confirmed by its academic authorship and continued Stanford affiliation) and has since been adopted by a substantial open-source community (35K+ GitHub stars), a credible dual signal of both research rigor and practical adoption.
added_date: "2026-06-13"
last_reviewed: "2026-10-26"
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

1. **Pipelines with an evaluation set but no prompt intuition**: DSPy's premise is that a metric plus examples is a better input than prose instructions, so a team that already has labelled data gets leverage immediately.
2. **Multi-stage RAG where prompt changes interact**: optimising each step against the end metric is the point — hand-tuning stage two usually breaks stage one, and a compiler that sees the whole program does not have that problem.
3. **Classifier and extraction tasks at scale**: signature-plus-module programs with a metric are a cleaner fit than a chat prompt when the output has to be a typed object.
4. **Cutting prompt-maintenance cost**: prompts become program artefacts compiled from data, so a model upgrade means recompiling rather than re-reading a thousand lines of instructions.
5. **Prompt optimisation as a research baseline**: GEPA and MIPRO are published methods with code, which makes DSPy a reasonable harness for comparing optimisation strategies rather than only using one.
6. **Agent loops that need retry discipline**: `Refine` and assertion-style modules turn a failed constraint into another attempt instead of a silently wrong answer, which is a different failure mode from a raw tool loop.

## Strengths

- The abstraction is the contribution: signatures describe what a step does, modules do it, and optimisers decide how — separating logic from prompt text is the thing most frameworks still do not offer.
- Optimisers are published research with code attached (DSPy's compiler paper, MIPRO for instructions and demonstrations, GEPA for reflective prompt evolution), so the method is inspectable rather than a magic `optimize()`.
- Optimising prompts and fine-tuning weights compose in the same program, which is the combination the "two great steps" paper argues for and few frameworks support.
- Model-agnostic by design: the same program can be compiled against different LMs, which turns model migration into a recompile plus a metric check.
- MIT licensed, Stanford-originated, and 38.8k stars — the community is large enough that examples for a given task shape usually exist.
- `pip install dspy` and the dspy.ai docs keep the entry cost low; a program can be a dozen lines before optimisation is introduced.

## Limitations

- **It is a paradigm, not a wrapper.** Thinking in signatures, modules and metrics is a real learning cost, and a team fluent in prompt strings will write worse DSPy than they wrote prompts for the first month.
- **Optimisation needs data and money.** A metric plus a training set plus many LM calls per compile; without a representative dev set the optimiser tunes to a metric that does not reflect your users.
- **Compiled prompts are opaque artefacts.** The optimiser can produce instructions nobody would write, which is fine until you have to debug why a specific input fails.
- **The abstraction leaks on non-text steps.** Retrieval, reranking and tool calls still need hand-written infrastructure around the modules, and the optimiser only reaches the LM-calling parts.
- **826 open issues** and a research-driven release cadence: APIs have moved substantially across versions, so pin one and read the changelog before upgrading.
- **The head-to-head numbers are the authors' own.** Gains over hand-written prompts depend on the task, the metric and the model; a weak metric can produce a program that is better at the metric and worse at the job.

## Relation to the Arsenal

It sits beside the orchestration frameworks rather than replacing them: `langgraph` gives you explicit state machines and human-in-the-loop control, `crewai` gives you role-based agents, and DSPy gives you optimisation of the LM steps inside whatever structure you chose. In practice a team picks LangGraph for control and drops DSPy modules inside the nodes.

Evaluation is the coupling point — `ragas`, `deepeval`-class tools and `langfuse` supply the metric that DSPy compiles against, which is why this entry is only as good as your eval set.

## Resources

- [GitHub](https://github.com/stanfordnlp/dspy)
- [Documentation](https://github.com/stanfordnlp/dspy)
