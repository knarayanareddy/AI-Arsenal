---
id: scikit-learn-scikit-learn
name: "scikit-learn"
version_tracked: null
artifact_type: library
category: evaluation
subcategory: libraries
description: "BSD-3-Clause classical ML library defining the estimator, transformer, and Pipeline contracts that tabular and structured stages still use"
github_url: "https://github.com/scikit-learn/scikit-learn"
license: "BSD-3-Clause"
primary_language: Python
org_or_maintainer: "scikit-learn"
tags: [data, evaluation]
maturity: production
cost_model: open-source
github_stars: 67407
github_stars_last_30d: 0
trending_score: 38
last_commit: "2026-09-24"
docs_url: "https://scikit-learn.org"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained, community-driven]
ecosystem_role:
  - "Classical ML baseline that still wins on tabular data: the estimator, preprocessing, and pipeline contracts every LLM system falls back to for regression, ranking, and structured-feature stages."
best_for:
  - "You are predicting a numeric or categorical target from mixed numeric, categorical, and text columns and need a leakage-safe Pipeline with cross-validation in one object."
  - "2. You are building a ranking or retrieval feature stage and want `ColumnTransformer` to handle scaling, encoding, and imputation per column type without custom glue."
  - "3. You need a defensible baseline in a day - fit a `HistGradientBoostingClassifier` and know exactly what the neural alternative has to beat."
avoid_if:
  - "Your task is image, audio, or long-form sequence modeling, where the relevant libraries are deep frameworks rather than a tabular estimator API."
  - "2. You are building deep learning, differentiable, or reinforcement-learning systems, because there is no autograd and no tensor graph anywhere in the library."
  - "3. Your dataset is far larger than fits in memory and training is the bottleneck, because most estimators here require an in-memory matrix even when the loop is chunked."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 67407 stars, BSD-3-Clause license, Python primary language, last commit 2026-09-24, 5 GitHub topics, homepage scikit-learn.org. Claims about estimator tags, __data__ protocol, joblib memmapping, and _partial_fit are from official docs and release notes; no models were trained locally."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/scikit-learn/scikit-learn", "date": "2026-09-28", "description": "67,407 stars and last commit 2026-09-24 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

scikit-learn is the reference implementation of classical machine learning in Python, and its real contribution is the contract layer: every model implements `fit`, `transform` or `predict`, exposes get/set params, and composes with `Pipeline`, `ColumnTransformer`, and `GridSearchCV` without adapters. The estimator catalog spans linear models, SVMs, neighbors, trees, ensembles, naive Bayes, and clustering, plus a full preprocessing library - imputation, scaling, encoding, discretization, text vectorization - and a metrics module where `roc_auc`, `average_precision`, and `nll_loss` are the versions everyone compares against. Estimator tags added in recent releases let meta-estimators and model-selection helpers reason about what each estimator supports.

## Why it's in the Arsenal

The recurring decision scikit-learn resolves is honest comparison. Any claim that a model is better needs the same preprocessing, the same folds, and a metric nobody quietly changed, and the Pipeline plus cross-validation design makes that the default rather than an aspiration. The second decision is leakage: fitting a scaler or encoder on the full dataset before splitting is the single most common way tabular results become fiction, and `Pipeline` inside `cross_val_score` makes that mistake structurally impossible. A third, less-discussed value is iteration speed - a fitted logistic regression or random forest on a million rows takes seconds, so you can spend the day on features and the compute budget on the model you actually believe in.

## Architecture

The Cython core is a set of `fit`, `predict`, and `transform` methods compiled against typed memoryviews, which is what makes `LogisticRegression.saga` and `KNeighborsClassifier` fast without a runtime dependency on a compiler for the pure-Python layer. Preprocessing is a `Transformer` contract with `fit_transform`, and the C API `__data__`/`__features__` protocol plus a `_get_tags` system lets a third-party estimator declare whether it accepts sparse input, multiclass, or sample weights - data that meta-estimators such as `Pipeline` and `GridSearchCV` read to validate combinations at fit time. `ColumnTransformer` holds a per-column-name or per-selector list of transformers and concatenates the results, optionally weighting them, which is why heterogeneous tabular handling is a config object rather than branching code. `Pipeline` chains steps with caching through `joblib.Memory` so a repeated fit does not recompute an expensive transform, and joblib's memmapping is what lets a fitted pipeline serialize to disk cheaply enough to ship to an inference container. Incremental learners implement `_partial_fit` and `partial_fit`, so `SGDClassifier` and `PassiveAggressiveClassifier` can stream from a generator instead of materializing the matrix.

## Ecosystem Position

scikit-learn is the estimator API that gradient-boosting libraries target: XGBoost, which appears in this batch, exposes a scikit-learn-compatible `XGBClassifier` so it drops into the same `Pipeline` and `GridSearchCV` structure, and it is the library the tooling ecosystem builds around. It overlaps with dask-ml for out-of-core and distributed variants of the same estimators, and it is the conventional alternative to writing preprocessing by hand, not to deep frameworks - compared with a neural model on tabular data it is often the one that wins. It is not a GPU library and not a training framework; the MLX and JAX entries in this batch cover the array-programming end. In the Arsenal it is the evaluation-side counterpart to the explainability and RAG tooling, supplying the retrieval-ranking and classifier stages those systems measure with.

## Getting Started

Install the library and fit a leakage-safe pipeline that scales numeric columns and one-hot encodes categoricals inside a cross-validated search:

```bash
python -m pip install scikit-learn pandas
```

```python
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

num = ["tenure", "monthly_charge"]
cat = ["plan", "region"]
pre = ColumnTransformer([("num", StandardScaler(), num), ("cat", OneHotEncoder(handle_unknown="ignore"), cat)])
pipe = Pipeline([("pre", pre), ("clf", LogisticRegression(max_iter=2000))])

search = GridSearchCV(pipe, {"clf__C": [0.1, 1.0, 10.0]}, cv=5, scoring="roc_auc")
search.fit(train[num + cat], train["churn"])
print(search.best_score_, search.best_params_)
```

## Key Use Cases

1. Ship a churn or demand model where the honest baseline is a gradient-boosted tree over a handful of engineered features, delivered in a week.
2. Build the feature stage of a retrieval system: TF-IDF or hashing over text, one-hot over categoricals, scaled numerics, all inside a single fitted Pipeline you version and reload.
3. Run model selection as part of CI, using cross-validated scores and `permutation_importance` as a gate that a candidate model must clear before it replaces the incumbent.

## Strengths

- The contract layer is the product: `Pipeline`, `ColumnTransformer`, and cross-validation compose correctly with third-party estimators, so nothing is a special case.
- Leakage-safe by construction, since every transform is fitted inside the fold rather than before the split.
- Exceptionally fast iteration: most estimators fit in seconds on a laptop-class dataset, which buys back the days you would otherwise spend waiting on runs.
- A stable, conservative API with a rigorous deprecation process, and documentation that tells you when an algorithm is the wrong choice instead of only how to call it.

## Limitations

Single-process and mostly CPU: most estimators need the full feature matrix in memory, and the out-of-core and distributed paths live in separate projects. There is no autodiff, no GPU kernels, and no model-parallel training, so anything generative or high-dimensional is out of scope. The neural-network story is deliberately thin - `MLPClassifier` is a research reference implementation rather than something you would deploy - and the `partial_fit` streaming path covers a narrow set of linear models. Documentation quality varies across estimator families, and a few niche modules still carry a research-project feel. A large but real chunk of the ecosystem is built on older scikit-learn APIs, so version pinning in an existing data platform is a deliberate decision.

## Relation to the Arsenal

The tabular and evaluation baseline that the rest of the Arsenal measures against: content/projects/evaluation/ entries define the LLM-specific metrics it does not cover, and the XGBoost entry in this same batch is its gradient-boosting counterpart with a distributed and GPU story. In content/projects/foundation-models/ and content/projects/training-and-alignment/ the relevant relationship is adversarial - a boosted tree on structured features is the bar a fine-tuned LLM has to clear on mixed-feature tasks. It also supplies the classical scoring and ranking stages that retrieval and ranking pipelines in content/projects/data-and-retrieval/ reuse, and the vector stores there handle the unstructured-feature counterpart.

## Resources

- [GitHub — scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn)
- [User guide and API reference](https://scikit-learn.org/stable/user_guide.html)
- [Common pitfalls and API changes](https://scikit-learn.org/stable/common_pitfalls.html)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (67,407 stars, last commit 2026-09-24, license BSD-3-Clause, verified via GitHub API on 2026-09-28)*
