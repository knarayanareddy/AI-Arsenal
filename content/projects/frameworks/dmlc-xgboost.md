---
id: dmlc-xgboost
name: "xgboost"
version_tracked: null
artifact_type: library
category: evaluation
subcategory: libraries
description: "Apache-2.0 gradient-boosted decision tree library with a scikit-learn API, GPU support, and distributed training"
github_url: "https://github.com/dmlc/xgboost"
license: "Apache-2.0"
primary_language: C++
org_or_maintainer: "dmlc"
tags: [pytorch, evaluation]
maturity: production
cost_model: open-source
github_stars: 28801
github_stars_last_30d: 0
trending_score: 36
last_commit: "2026-09-28"
docs_url: "https://xgboost.readthedocs.io/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Scalable gradient-boosted decision trees — the tabular accuracy baseline that LLM systems must beat on structured and mixed-feature tasks."
best_for:
  - "You are training a model on structured or mixed tabular features and need a strong, fast baseline in hours rather than days, since boosted trees remain difficult to beat on this data shape."
  - "You have a scikit-learn pipeline and want to swap in gradient boosting with the same interface, so a single search and cross-validation loop covers both model families."
  - "Your data does not fit comfortably in a single machine's memory and you have a distributed backend, because the library ships distributed trainers for common cluster frameworks and a GPU histogram path."
avoid_if:
  - "Your data is text, images, or audio, where a learned representation is required and a tree over raw features is the wrong inductive bias."
  - "You need to deploy on a runtime without the library, since a boosted-tree model is an executable artifact that consumers need an XGBoost-compatible runtime to score."
  - "You are optimizing peak single-node throughput on a small dataset, where the fixed overhead of the accelerated histogram path can exceed the gain on a few thousand rows."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 28801 stars, Apache-2.0 license, C++ primary language, last commit 2026-09-28, 6 GitHub topics (gbm, gbrt, gbdt, machine-learning, xgboost, distributed-systems). Split-finding, DMatrix, gpu_hist, and the distributed trainers are from official docs; the code sample was not executed here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/dmlc/xgboost", "date": "2026-09-28", "description": "28,801 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

XGBoost is a gradient-boosted decision tree implementation whose distinguishing feature is a regularized, second-order objective: each boosting round fits a tree to the negative gradient of the loss while a penalty term shrinks leaf weights, and the leaf values are computed from the Hessian information rather than from a leaf-count heuristic. Trees are built with a greedy approximate split-finding algorithm, choosing split points by evaluating loss reduction across a set of candidate thresholds drawn per feature, so the cost of a split search is decoupled from the number of unique values. Training runs on a `DMatrix` - a columnar, quantile-compressed representation with a sparsity-aware layout and a precomputed gradient and Hessian cache shared across iterations. The same design gives a regularized model that resists overfitting on small tabular data, and it exposes a scikit-learn-compatible estimator interface alongside native APIs, distributed training, and a GPU path that builds histograms in device memory.

## Why it's in the Arsenal

The recurring decision XGBoost resolves is what to do when your features are numbers and categories rather than tokens. A boosted tree finds interactions a linear model cannot, tolerates unscaled inputs and missing values without imputation, trains on a million rows in minutes, and gives you a permutation-importance story out of the box. It also fixes the reporting problem: any claim that a language model outperforms a model on a structured task has to beat a well-tuned boosted tree on the same folds, and that baseline is easy to produce and hard to argue with. The second recurring decision is scale - as data outgrows one machine, the DMatrix format, a distributed trainer, and the GPU histogram path keep the same algorithm rather than requiring a different one.

## Architecture

The core is `DMatrix`, a compressed columnar store with quantile sketches per feature, missing-value masks, and an external-memory mode for data larger than RAM; gradients and Hessians for the current boosting round are computed once into dense matrices and reused. Each boosting iteration runs a weighted tree-growth pass: split candidates are gathered per feature from the sketch, evaluated against a regularized gain formula, and chosen greedily with a depth limit, minimum child weight, and shrinkage applied to leaf values. The prediction for a row is the sum of tree outputs scaled by a learning rate, and training uses a first-order or second-order loss - squared error, logistic, or a custom objective evaluated through gradients and Hessians. Two tree construction modes exist: the exact greedy mode and the approximate mode with sketching for scale. A `gpu_hist` path moves partition building and histogram accumulation onto the device, which is where the large speedups come from. Distributed training supports Dask, Spark, and Flink, partitioning rows across workers with an allreduce so the trees stay globally consistent. The model saves to JSON or the older binary format, and scoring requires an XGBoost-compatible runtime, which is the deployment constraint to plan for.

## Ecosystem Position

XGBoost competes with LightGBM and CatBoost, and compared to those it wins on distributed flexibility and ecosystem integration while CatBoost wins on native categorical handling and LightGBM on histogram efficiency at scale. It overlaps with the classical ML entry in this batch, where the relationship is explicit: the scikit-learn estimator interface is implemented, so `XGBClassifier` drops straight into a `Pipeline` and `GridSearchCV` and the two are usually used together rather than as alternatives. It is an alternative to the linear and shallow-tree estimators that ship with the classical ML library, and rather than a neural framework it is the accuracy bar a neural model on tabular data must clear. It complements the vector stores in content/projects/data-and-retrieval/ when a learned model needs a reranker over retrieved candidates, and it is the natural second-stage model in the model-definition and serving work in content/projects/frameworks/ when structured features are joined to a neural prediction. The explainability entry in this batch is the tool you reach for when a booster's prediction needs to be defended to a reviewer.

## Getting Started

Install the library and fit a classifier with the scikit-learn interface, which lands directly in a pipeline:

```bash
python3 -m pip install xgboost scikit-learn
```

```python
import numpy as np
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier

X = np.random.rand(50000, 30).astype(np.float32)
y = (X[:, 0] * X[:, 1] > 0.3).astype(np.int32)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)

clf = XGBClassifier(n_estimators=400, max_depth=6, learning_rate=0.1,
                    subsample=0.8, colsample_bytree=0.8, tree_method="hist",
                    device="cuda", eval_metric="logloss")
clf.fit(X_tr, y_tr, eval_set=[(X_te, y_te)], early_stopping_rounds=20)
print(clf.best_score_, clf.predict_proba(X_te[:3])[:, 1])
```

## Key Use Cases

1. Establishing the tabular baseline a proposed LLM feature or model must beat, on the same folds and the same metric, before any claim is made.
2. Learning-to-rank over retrieved candidates, where features combine embedding similarity with structured signals and a pairwise or ranking objective fits directly.
3. Training on data that outgrows one machine, using the Dask or Spark distributed trainer or the GPU histogram path on a single accelerated node.

## Strengths

- Regularized second-order boosting that is a genuinely hard baseline on tabular data, not a formality in the comparison.
- The same algorithm scales up: quantile sketching, external memory, distributed trainers, and a GPU histogram path rather than a rewrite.
- Scikit-learn compatibility, so it participates in pipelines, cross-validation, and hyperparameter search with no adapter.
- Handles missing values and unscaled heterogeneous features natively, which removes a large class of preprocessing work.

## Limitations

The model artifact is opaque without a specific explanation tool and is not a set of human-readable rules, so a regulated decision needs the explainability entry alongside it. Deployment requires an XGBoost-compatible runtime, which is a constraint in environments standardized on one inference stack, and the JSON and binary formats have changed across major versions. Category features need explicit encoding configuration rather than the native handling a competing library provides. Training is single-machine and single-process by default, so a very large dataset or a very deep model needs distributed setup and the associated debugging. And on a small dataset the accelerated paths can cost more than they save, where the library's own gradient estimators and defaults are enough.

## Relation to the Arsenal

The tabular accuracy bar for the Arsenal: the classical ML entry in this batch is the estimator API it plugs into, and the neural and fine-tuning entries in content/projects/training-and-alignment/ are the alternatives it is measured against. The explainability entry in this batch is the tool for defending an individual prediction from one of these models. In content/projects/data-and-retrieval/ a booster is a common reranker over retrieved candidates and a bridge between the vector stores there and learned ranking. The model-definition layer in content/projects/frameworks/ is the other way to build a scorer, and choosing between them is usually a data-shape question. Keep it in the stack even after a neural model wins, as a cheap fallback and an ensemble member.

## Resources

- [GitHub — dmlc/xgboost](https://github.com/dmlc/xgboost)
- [XGBoost documentation](https://xgboost.readthedocs.io/)
- [Python package reference](https://xgboost.readthedocs.io/en/latest/python/python_api.html)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (28,801 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
