---
id: cleanlab
name: cleanlab
version_tracked: null
artifact_type: library
category: data-pipelines
subcategory: libraries
description: "Data-centric AI library that finds label errors, duplicates and outliers using your own trained model's predictions"
github_url: "https://github.com/cleanlab/cleanlab"
license: Apache-2.0
primary_language: Python
org_or_maintainer: Cleanlab
tags: [embeddings, llm]
maturity: production
cost_model: open-source
github_stars: 11682
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-01-13"
docs_url: "https://docs.cleanlab.ai"
demo_url: null
paper_url: "https://arxiv.org/abs/1911.00068"
paper_id: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [research-origin, production-proven]
ecosystem_role:
  - The standard open implementation of confident learning — it cross-examines a model's out-of-sample predicted probabilities against given labels to statistically flag mislabeled, ambiguous, and outlier examples, model-agnostically
best_for: ["You have labeled data and a trained model whose validation score is lower than the data quality deserves, and you suspect label noise is the cause.", "You want to find mislabeled rows in text, image, audio or tabular data using a model you already have, rather than paying for manual relabeling.", "You are doing multi-annotator work and need consensus labels plus a per-annotator quality estimate before you trust an agreement score."]
avoid_if: ["You have no trained model and no predicted probabilities, because cleanlab's issue detection is built on out-of-sample predictions from a model you fit first.", "You cannot accept the compute, because the workflow requires training at least two models on cross-validated folds and scoring the whole dataset.", "You are on an unsupported platform version, because the library runs on Python 3.10+ on Linux, macOS and Windows and nothing older."]
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: 11.6k stars, AGPL-3.0, last push 2026-01-13 verified via the GitHub API on 2026-07-08. Cadence has slowed as the company focuses on its commercial platform; the library remains the reference confident-learning implementation. Backed by the peer-reviewed confident-learning paper (Northcutt et al.).
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"arxiv","url":"https://arxiv.org/abs/1911.00068","date":"2026-07-08","description":"Confident Learning: Estimating Uncertainty in Dataset Labels"}
featured: false
status: active
---

## Overview

Cleanlab's open-source library detects issues in a machine-learning dataset using models you have already trained: you fit a model, obtain feature embeddings and predicted probabilities, and hand both to the library, which estimates which labels are wrong rather than relying on a hand-written heuristic. Datalab is the main entry point, wrapping data and a label column, with find_issues taking features and pred_probs and report producing a prioritised issue list. Beyond label errors it covers outliers, duplicates and near-duplicates, data validation and profiling, out-of-distribution detection, active learning suggestions, and consensus plus annotator-quality inference for multi-annotator datasets.

## Why it's in the Arsenal

The recurring modelling decision is whether to retrain with a better model or clean the data first, and the honest answer is usually that you cannot tell because label noise and model capacity produce the same symptom. Cleanlab's confident-learning approach scores each label by how confidently your model would have predicted it given the feature neighbourhood, which turns a vague suspicion into a ranked list of rows. That converts a research detour into a triage task: fix the top-ranked labels, retrain, and measure the delta.

## Architecture

The core method computes a self-confidence for every label from cross-validated out-of-sample predicted probabilities, then flags a label as suspect where that confidence undercuts the model's overall accuracy. Because the neighbourhood matters, feature embeddings supplied alongside probabilities let the library weight similar examples, which improves detection on hard classes. Datalab layers issue detection and reporting on top: each detector, whether for label errors, outliers, duplicates or near-duplicates, produces a ranked set, and report renders priorities with per-issue scores rather than a single boolean.

## Ecosystem Position

It competes with data-quality tooling and hand-written validation pipelines, and it is distinct from Label Studio in this catalog, where that project owns the annotation interface and cleanlab decides what deserves annotation. It overlaps with content/projects/training-and-alignment entries such as TRL because a clean dataset is a precondition for every fine-tuning run downstream. Compared with a vector database approach to quality, cleanlab works on labels and model behaviour rather than embedding similarity alone, and it complements content/tools/evaluation-and-observability by explaining why a metric is low.

## Getting Started

Install from PyPI with uv, pip or conda on Python 3.10 or newer, then run the three-line detection loop:

```bash
pip install cleanlab
```

```python
import cleanlab
lab = cleanlab.Datalab(data=dataset, label="column_name_for_labels")
lab.find_issues(features=feature_embeddings, pred_probs=pred_probs)
lab.report()
```

Developers tracking the bleeding edge should follow the master branch documentation.

## Key Use Cases

1. Label-noise triage on a web-scraped or crowdsourced image set where the reported ceiling is far below what the data should support.
2. Validation-set cleaning before a fine-tuning run, so the first experiment is not distorted by corrupted labels.
3. Annotator quality analysis: infer consensus labels and per-annotator accuracy when you have overlapping human labels rather than one gold set.
4. Active learning: rank unlabelled rows by the model's uncertainty so labelling effort goes where it changes the model most.

## Strengths

- Works across modalities: the same approach applies to text, image, audio and tabular data.
- Reuses your existing model rather than demanding a new annotation contract or a labelling budget.
- Finds label errors, outliers, duplicates and near-duplicates in one Datalab report with per-issue priority scores.
- Apache-2.0 licensed with Python 3.10+ support across Linux, macOS and Windows.

## Limitations

The method's accuracy is bounded by the model you feed it: a badly fit model produces confident-learning scores that are confidently wrong, so the workflow assumes at least two cross-validated training runs before detection. That compute is real on large datasets, and finding issues is only half the job since you still pay for relabeling. Detection is not remediation; cleanlab ranks rows and hands the decision back to you or to an annotation queue. And a class with few examples produces less reliable scores than a well-populated one, so rare classes need their own treatment.

## Relation to the Arsenal

This belongs in content/projects/data-and-retrieval as the data-quality layer that decides what your training set contains. Its natural counterpart is label-studio in content/tools/data-ingestion, which supplies the annotation interface cleanlab's output should flow into, and its output is a precondition for the fine-tuning entries in content/projects/training-and-alignment. If your metrics look wrong, this is the entry to reach for before you blame the model.

## Resources

- [GitHub — cleanlab/cleanlab](https://github.com/cleanlab/cleanlab)
- [Docs — cleanlab.ai/docs](https://docs.cleanlab.ai)
- [Datalab example notebooks](https://github.com/cleanlab/cleanlab/tree/master/docs)
