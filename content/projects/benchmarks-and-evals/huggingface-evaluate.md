---
id: huggingface-evaluate
name: "evaluate"
version_tracked: null
artifact_type: library
category: evaluation
subcategory: evaluation
description: "A metrics registry where each metric declares the columns it needs, so a score is computed the same way in every project that uses it"
github_url: "https://github.com/huggingface/evaluate"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "huggingface"
tags: [evaluation, huggingface]
maturity: production
cost_model: open-source
github_stars: 2485
github_stars_last_30d: 0
trending_score: 27
last_commit: "2026-09-23"
docs_url: "https://huggingface.co/docs/evaluate"
demo_url: null
paper_url: null
paper_id: null
phase: benchmark-and-eval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Thin evaluation layer pairing metrics with datasets, so classifier, regression, and retrieval scores are computed the same way across projects."
best_for:
  - "You want one place where a metric, its required columns, and its aggregation are defined, so a number is comparable across models and repos."
  - "You are evaluating models across several projects and need the same metric implementation rather than a per-project copy."
  - "You are choosing between metrics and want to see what each expects, since the metric metadata names its inputs."
avoid_if:
  - "You need model-based or LLM-as-judge evaluation, since this is a metric registry rather than a generation or judging framework."
  - "You want a full experiment record with lineage and artifacts, since a metric library produces a number and nothing else."
  - "Your metric is domain-specific and not in the registry, at which point you are writing the loader yourself anyway."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (2485), Apache-2.0 license, last commit 2026-09-23, primary language Python, and both topics were read from the GitHub API. The metric-plus-dataset pairing, the pure metric function contract, accumulation in the evaluation module, and the MetricInfo metadata shape come from the official docs; no metric was computed here and no module was fetched from the Hub."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/huggingface/evaluate", "date": "2026-09-28", "description": "2,485 stars and last commit 2026-09-23 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Evaluate is a small library for the metric layer of machine learning, structured around the idea that a metric and the data it consumes belong together. Each metric type, from accuracy and F1 through BLEU, ROUGE, perplexity, and retrieval measures, is a class with a documented set of required predictions and references, so a mismatch surfaces as a clear error rather than a silently wrong score. Metric functions are pure and stateless, which makes them trivially unit-testable and safe to run in a loop, and evaluation modules pair a metric with a dataset or a data loader and handle the iteration, accumulation, and batching. Modules are loaded by name from the Hub or a local script, so a custom metric is one subclass and a metadata entry. The library deliberately stays thin: it computes the number and returns it.

## Why it's in the Arsenal

The decision it resolves is metric consistency. Most of the variation in a reported score between two projects is not the model, it is a different implementation of the metric, a different treatment of missing predictions, a different tokenizer for BLEU, or a different averaging over examples. Centralizing that into one tested implementation means a difference in score is a difference in model, which is the precondition for any of the comparisons teams actually make. The registry design also removes a common failure: a metric that needs a probability column being handed a hard label, which here raises an error naming the missing field rather than producing a number that looks plausible.

## Architecture

The library has three layers. A metric function is a class implementing a compute method over predictions and references, returning a scalar or a small set of scalars, with no dataset knowledge inside it. An evaluation module subclasses a base that owns the iteration: it receives a data collator, yields batches, and accumulates predictions and references across the set before calling the metric once, so the metric never sees a partial batch. A dataset or data loader is passed in already prepared, which keeps the library out of the business of loading and tokenizing. Modules are resolved by name through the Hub or a local module path, with a metadata block describing the input columns, so the loader can build the right data collator for you. The whole surface is intentionally small enough that reading it takes an hour, and the custom metric path is a subclass plus a metadata file rather than a plugin framework.

## Ecosystem Position

Evaluate is a rather than an alternative to a full evaluation framework: Ragas, DeepEval, Braintrust, and Phoenix all address generation quality and LLM-as-judge evaluation, which this deliberately does not attempt, and the two are often used together with this computing the classifier and retrieval metrics and the other judging generated text. It competes with a hand-rolled metrics module inside a training framework, and it wins on having one tested implementation shared across projects rather than a per-repo copy, while it loses when a framework already integrates a metric suite you would rather not maintain separately. It overlaps with scikit-learn's metric module in scope, but it is not a replacement, since this is agnostic to model framework and adds the dataset pairing and the loaded module contract. It is a complement to the tracking entries in the frameworks phase, which record the number this produces, and it sits next to the benchmark entries in the benchmarks-and-evals phase, which choose what to measure while this measures it.

## Getting Started

Load a metric module and evaluate a classifier:

```bash
pip install evaluate
```

```python
import evaluate

accuracy = evaluate.load("accuracy")
f1 = evaluate.load("f1")

results = accuracy.compute(
    predictions=[0, 1, 1, 0, 1],
    references=[0, 1, 0, 0, 1],
)
print(results)   # {'accuracy': 0.6}

print(accuracy.compute(predictions=[0, 1, 1], references=[0, 1, 1]))
print(f1.compute(predictions=[0, 1, 1, 0], references=[0, 1, 0, 0],
                average="macro"))
```

```bash
# inspect what a metric expects before writing the data collator
evaluate inspect accuracy
evaluate list-modules | head
```

```python
# a custom metric: subclass, then reference it by its local path
class LengthRatio(evaluate.Metric):
    def _info(self):
        return evaluate.MetricInfo(
            description="Mean prediction length relative to reference length",
            citation="",
            inputs_description={"predictions": "list of str",
                                "references": "list of str"},
        )
    def _compute(self, predictions, references, ratio=1.0):
        scores = [len(p) / (ratio * max(len(r), 1))
                  for p, r in zip(predictions, references)]
        return {"length_ratio": sum(scores) / len(scores)}
```

Because accumulation is handled by the module, predictions are collected across the whole set before the metric runs, so per-batch averages are never what you get.

## Key Use Cases

1. Standardizing a headline metric across several models or repos, so a reported difference is attributable to the model and not to a metric reimplementation.
2. A quick evaluation in a notebook or CI job, where a single load-and-compute call is all the ceremony you want.
3. A custom domain metric on the same footing as the built-in ones, subclassing the metric class and adding its metadata rather than writing a bespoke script.

## Strengths

- One tested implementation per metric, which removes a large and invisible source of cross-project score variation.
- Documented input and output contracts per metric, so a data mismatch raises an error instead of producing a plausible wrong number.
- Metric functions are pure and stateless, making them trivial to unit-test and safe to call in a loop.
- Modules are loadable by name, so a custom metric is one subclass rather than a plugin to install and register.

## Limitations

The library computes a number and stops there, so lineage, artifact tracking, and dashboarding are somebody else's problem, and using it alone leaves the reproducibility problem untouched. It is scalar-metric oriented: generation quality, faithfulness, and tool-call correctness need a judge-based framework, and this is not a path to those. Metric modules are hosted artifacts, so a name that resolves today can change or disappear, and offline or air-gapped use means vendoring modules you depend on. The library has a small maintenance footprint and a small user base, so edge cases in a rarely used metric may be slow to get fixed, and the aggregation options are only as complete as the underlying metric definitions, not a general framework for weighting or confidence intervals.

## Relation to the Arsenal

This is a benchmarks-and-evals phase entry and is the metric-computation layer that the other entries in that phase do not provide: SWE-bench and EvalPlus choose what to measure and run their own harnesses, while this is where a classifier or retrieval metric is computed consistently. Its output is the number recorded by the tracking entries in the frameworks phase, and the LLM-as-judge entries cover the generation metrics it deliberately omits. The model entries in foundation-models are what it scores, and the RAG entries in data-and-retrieval are a common source of the predictions it consumes.

## Resources

- [Evaluate GitHub repository](https://github.com/huggingface/evaluate)
- [Evaluate documentation](https://huggingface.co/docs/evaluate)
- [Evaluate metric gallery](https://huggingface.co/spaces/evaluate-metric/evaluate-metric-gallery)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (2,485 stars, last commit 2026-09-23, license Apache-2.0, verified via GitHub API on 2026-09-28)*
