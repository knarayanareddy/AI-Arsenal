---
id: catboost-catboost
name: "catboost"
version_tracked: null
artifact_type: library
category: evaluation
subcategory: libraries
description: "Gradient-boosting library with native categorical features and ordered target statistics"
github_url: "https://github.com/catboost/catboost"
license: "Apache-2.0"
primary_language: C++
org_or_maintainer: "catboost"
tags: [evaluation]
maturity: production
cost_model: open-source
github_stars: 9119
github_stars_last_30d: 0
trending_score: 32
last_commit: "2026-09-28"
docs_url: "https://catboost.ai"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [actively-maintained]
ecosystem_role:
  - "Gradient-boosting library with native categorical handling and ordered target statistics, which removes most encoding bugs on mixed-feature ranking problems."
best_for:
  - "You have categorical features — user, product, country, device — that carry much of the signal and integer-encoding them is distorting the model."
  - "You are building a click-through or recommendation model where target encoding leakage is a real risk and ordered statistics give a leakage-resistant alternative."
  - "You want a competitive GBDT baseline with minimal feature engineering, since native categoricals mean almost no preprocessing before training."
avoid_if:
  - "Your data is almost entirely numeric, where LightGBM or XGBoost are often marginally faster and equally accurate with a much wider tuning literature."
  - "You need the widest set of objectives, since the set is smaller than XGBoost's and some ranking and custom-objective workflows are less flexible."
  - "You are on a heavily constrained device, because categorical handling adds overhead and model size relative to a plain numeric booster."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (9119), Apache-2.0 license, last commit 2026-09-28, C++ as primary language and the topic list were API-verified. Symmetric oblivious trees, ordered target statistics, MaxCatToOnehot, max_ctr_complexity, and the objective set come from the official docs; performance and memory caveats reflect documented behaviour and engineering judgement, not measurements run here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/catboost/catboost", "date": "2026-09-28", "description": "9,119 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

CatBoost is a GBDT library in C++ with Python, R, Java, and C APIs, and its defining contribution is native categorical feature support. Rather than encoding a category as an integer, which imposes an artificial order on an unordered set, CatBoost uses ordered target statistics: for each training row it computes the average target of the rows that came before it in a randomised permutation of the category group, so the encoding of a category value is derived from the other rows in its group rather than from the whole dataset. The permutation is what prevents leakage — a row never contributes to its own encoding. The library also applies symmetric oblivious trees, a tree structure with the same split at every level, which enables efficient categorical handling and fast GPU training, plus one-hot thresholds for low-cardinality features and a MaxCatToOnehot policy that switches strategy automatically. Objective functions cover regression, classification, ranking with several pairwise and listwise losses, and survival analysis. The Python API adds ordered boosting mode, several boosting types, categorical feature declaration by name, a cross-validation helper, and SHAP value computation on the trained model.

## Why it's in the Arsenal

The recurring decision is how to get categorical features into a gradient-boosted model. The standard path is one-hot, target encoding, or count encoding, and each has a specific failure: one-hot blows up dimensionality at high cardinality, count encoding throws away the target relationship, and target encoding leaks unless you compute it out-of-fold or with strict ordering — a bug that produces a validation score that does not survive contact with production. CatBoost resolves this by making the encoding internal and ordered, so there is no preprocessing step to get wrong and no leakage to guard against. That is why it is the default recommendation for ranking and CTR problems where a user or item ID column carries a large part of the signal.

## Architecture

The training loop is symmetric-tree boosting: at each iteration, the current leaf values are the scores, the gradient and hessian are computed, and one oblivious tree is fitted where every node at a given depth tests the same feature and threshold. Continuous features are binned into a fixed number of borders once. Categorical features are handled by partition-based statistics: rather than splitting a category directly, it builds CTR tables of target statistics over combinations of categories, and a split selects a subset of categories in a partition, with a one-hot split used for categories below a cardinality threshold. The ordered statistic is computed against a random permutation, so each row's CTR is built from a prefix of the permutation and never includes itself; at prediction time the CTR is the full-group average. This is what makes the feature usable without leakage. The implementation runs as OpenMP-parallel C++ on CPU with a separate GPU kernel path, and the categorical CTR tables and binned continuous histograms are the main memory consumers, which is why a model with many high-cardinality categories is physically larger. The Python layer wraps the C API, adding the fit, predict, cv, and feature-importance surface plus a plotting helper.

## Ecosystem Position

CatBoost is the categorical-first member of the GBDT trio and competes most directly with LightGBM, which is usually faster on wide numeric data, and with XGBoost, which has the broadest objective and tooling support. Against LightGBM the choice is usually data shape: if the signal lives in the categories, CatBoost wins on accuracy and on preprocessing simplicity; if it is numeric and wide, LightGBM's histogram path is faster. It overlaps with target-encoder-style libraries because that is essentially what it does internally, but as part of the model rather than a preprocessing step, which removes a whole category of leakage bugs. Compared with h2o-3 it is a single fast learner rather than a distributed platform, and against deep tabular models it is usually the stronger baseline on modest data, which is the usual argument for reaching for it first.

## Getting Started

Train on a mixed-type frame with no encoding step:

```bash
pip install catboost
```

```python
from catboost import CatBoostClassifier, Pool

cat_cols = ["user_id", "country", "device"]
train = Pool(X_train, y_train, cat_features=cat_cols)

model = CatBoostClassifier(
    iterations=2000, learning_rate=0.05, depth=8,
    loss_function="Logloss", eval_metric="AUC",
    early_stopping_rounds=200, verbose=200,
)
model.fit(train, eval_set=Pool(X_valid, y_valid, cat_features=cat_cols))
print(model.get_feature_importance(prettified=True).head())
```

Set `one_hot_max_size` and `max_ctr_complexity` to trade CTR precision against model size and training time; the defaults suit most tables.

## Key Use Cases

1. A CTR or recommendation model with user, item, and contextual categories, where ordered target statistics give leakage-free encoding with no preprocessing.
2. A mixed-type tabular problem with several high-cardinality columns, where one-hot is not viable and manual target encoding is a leak waiting to happen.
3. A fast strong baseline for a competition-style tabular problem, where CatBoost handles categoricals and reaches competitive scores with little tuning.

## Strengths

- Native categorical handling with ordered target statistics, which removes both the preprocessing step and the leakage risk of manual target encoding.
- Symmetric oblivious trees make GPU training practical for a GBDT, a genuine speed advantage on large datasets.
- Little feature engineering needed: a small typed table goes straight into a competitive model.
- Good defaults for depth, learning rate, and CTR settings, so a small dataset trains well without a long search.
  

## Limitations

Ordered statistics cost more than plain histogram binning, so on wide numeric data CatBoost is often slower to train and its models are larger than LightGBM's. The objective set is narrower than XGBoost's, and custom objectives and some ranking variants are less flexible, so exotic losses push you toward a different library. Categorical CTR combinations can explode: max_ctr_complexity and the number of categoricals interact to make memory grow fast, and a table with many high-cardinality columns needs these capped deliberately. The GPU path has constraints on task type and does not support every CPU feature, so an offline and an online model can differ. And it is still a GBDT: on high-dimensional data such as raw text or images a neural model is the better tool.

## Relation to the Arsenal

This is the categorical-first tabular learner in content/projects/frameworks and the direct comparison for the LightGBM and h2o-3 entries in the same folder; reading all three is how you pick for a given table's shape. It also sits in the ensemble picture: AutoGluon trains CatBoost as one of its base learners, so the same table can be a quick CatBoost run and a later AutoGluon experiment. Its input is the feature table built by dbt, and its predictions feed ranking models and the serving stack, where the exported model runs through onnxruntime or a native service. The training entries in content/projects/training-and-alignment are the alternative when the data is too high-dimensional for a tree.

## Resources

- [CatBoost documentation](https://catboost.ai/docs/)
- [CatBoost GitHub repository](https://github.com/catboost/catboost)
- [CatBoost categorical features handling guide](https://catboost.ai/docs/en/features/categorical-features)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (9,119 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
