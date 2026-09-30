---
id: autogluon-autogluon
name: "autogluon"
version_tracked: null
artifact_type: tool
category: evaluation
subcategory: tools
description: "AutoML that fits, tunes, and ensembles models behind a few lines and returns a fitted predictor"
github_url: "https://github.com/autogluon/autogluon"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "autogluon"
tags: [evaluation]
maturity: production
cost_model: open-source
github_stars: 10751
github_stars_last_30d: 0
trending_score: 32
last_commit: "2026-09-28"
docs_url: "https://auto.gluon.ai/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained]
ecosystem_role:
  - "Automated AutoML that ensembles and stacks models with a small API, and the fastest way to get a defensible classical baseline before custom modelling."
best_for:
  - "You need a defensible baseline on a tabular problem this week and want the library to return a stacked ensemble rather than one model you have to trust."
  - "You want to compare several model families on identical folds with a consistent interface, which is the comparison a leaderboard decision needs."
  - "You are prototyping a text, image, or time-series task and want a strong default pipeline without assembling a feature and training recipe."
avoid_if:
  - "You need to control or explain the final model, since a stacked ensemble of bagged folds is the opposite of a single auditable artefact."
  - "Your data is large and the budget is tight, since the default search trains many models across several families and a big dataset makes that expensive fast."
  - "You are in production and need a stable, versioned training path, because the presets and the search space change between releases."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (10751), Apache-2.0 license, last commit 2026-09-28, Python as primary language and the topic list were API-verified. Preset names, bagging and stacking behaviour, SequentialPredictor, leaderboard(), SHAP, and the modality-specific predictors are from official docs; cost scaling and release-stability caveats are engineering judgement, not measured here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/autogluon/autogluon", "date": "2026-09-28", "description": "10,751 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

AutoGluon provides a unified fit API across tabular, text, image, and time-series data, and its defining feature is what happens after tuning: models are trained across several families — gradient boosting, random forests, extra trees, linear models, and neural nets — and the resulting predictors are combined by both bagging (repeated training across folds, averaged) and stacking (a meta-model trained on out-of-fold predictions). TabularPredictor handles structured data, with presets trading time for accuracy: medium_quality for a fast run, good_quality as the default, best_quality for a long search, and higher_quality presets for extended tuning time. SequentialPredictor exists for the case where a model family can be trained on GPUs in sequence so several models fit within one device's memory. Text and image predictors wrap transformer and CNN backbones with data loaders and augmentation, and TimeSeriesPredictor handles covariate-aware forecasting with a quantile loss for uncertainty. The Predictor object is the deliverable: fit returns a predictor that can predict, explain with SHAP, and be saved and reloaded, and leaderboard() returns the fold-by-fold validation scores for every model it trained.

## Why it's in the Arsenal

The recurring decision is how much modelling effort a problem deserves before the answer stops improving. Teams routinely over-invest in a custom architecture for a tabular problem a boosted ensemble solves, and routinely under-invest by shipping a logistic baseline nobody checked. AutoGluon resolves this by making the strong-answer cheap: the library does the cross-validation, the family sweep, the bagging, and the stacking, and returns the ensemble, so the number you take into a planning meeting is one the library selected on validation folds rather than one you chose. The second payoff is comparability — leaderboard() gives every model it tried on the same folds, which turns model selection into a table instead of an argument.

## Architecture

fit is a sequence of stages. Data is loaded and inferred: a frame with datetime columns is checked for temporal structure, a label column is identified, and columns are typed as numeric, categorical, datetime, or text. Then a set of models is generated according to the preset — each is a fit call carrying a feature pipeline (imputation, encoding, and for text a sub-vectoriser and transformer) and a learner configuration. Models are validated with k-fold cross-validation and each fold's out-of-fold predictions are retained. Training is parallel across models and, within a model, across folds, with SequentialPredictor serialising the fold models of one architecture so they fit in a single GPU. Once base models are trained, a second layer is fitted: the out-of-fold predictions become features, and a meta-learner such as a weighted ensemble or a boosted stacker combines them, with weights fitted on the validation scores. The Predictor serialises the base models, their weights, and the stacker to disk, and predict() applies the same preprocessing and stacker. explain_shap() runs SHAP on the stacked predictor, and for time series a quantile objective produces prediction intervals alongside point forecasts.

## Ecosystem Position

AutoGluon competes with h2o-3 on AutoML breadth and is the closer match on tabular ensembles, while FLAML and hyperopt-style tools compete on tuning efficiency rather than end-to-end pipelines. It overlaps with LightGBM, CatBoost, and scikit-learn because it trains those same learners under the hood, but the deliverable is a fitted Predictor rather than a model you wire up yourself, which is the real distinction. Compared with a hand-rolled PyTorch search it is far less flexible and far more likely to beat you in the first hour. It is a complement to dbt and the feature-engineering entries, since it consumes a prepared table rather than building one, and a complement to the evaluation entries, which are how you check whether the ensemble's validation score is honest.

## Getting Started

Fit a tabular predictor and read the leaderboard:

```bash
pip install autogluon.tabular
```

```python
from autogluon.tabular import TabularPredictor

predictor = TabularPredictor(label="class", eval_metric="roc_auc").fit(
    train_data="train.csv",
    presets="medium_quality",      # or good_quality / best_quality
    time_limit=1800,
)

leaderboard = predictor.leaderboard(silent=True)
print(leaderboard[["model", "score_val", "fit_time"]].head(10))
predictor.predict(test_data)
predictor.save("./ag_predictor")
```

Swap TabularPredictor for TextPredictor, ImagePredictor, or TimeSeriesPredictor depending on the modality; the shape of the call is the same.

## Key Use Cases

1. Establishing a tabular baseline in an afternoon, so a modelling project starts from a stacked ensemble rather than a hand-rolled logistic regression.
2. Comparing model families on identical validation folds, using leaderboard() to make the architecture decision a data question.
3. Getting a quick prototype for text, image, or time-series data where assembling the loading, feature, and training pipeline would be most of the work.

## Strengths

- Bagged and stacked ensembles as the default deliverable, which usually beat the single model a manual sweep would have chosen.
- One API across tabular, text, image, and time-series, so a prototype rarely needs a second library.
- leaderboard() on shared folds makes model selection a table rather than a subjective choice.
- SHAP explanation and save/load on the fitted Predictor, so an ensemble is not a black box you cannot inspect or ship.
  

## Limitations

The default is to train many models across several families, so cost and time scale badly with dataset size, and a time_limit is a blunt instrument that can cut a family off mid-way. The deliverable is a stacked ensemble, which is harder to serve, harder to explain to a regulator, and harder to keep stable than a single model. Interpretability, versioning, and reproducibility are awkward because the search space and presets change between releases, so a result is pinned to a library version. Coverage is broad rather than deep: it will not beat a specialist pipeline on a domain task, and hyperparameter control is coarser than in LightGBM or PyTorch directly. GPU support is uneven across modalities, so some paths are much slower than expected.

## Relation to the Arsenal

This is the AutoML entry in content/projects/frameworks, and it is the natural next step after the LightGBM, CatBoost, and h2o-3 entries in the same folder that it wraps or competes with. Its input is the feature table built by dbt and the local transforms in polars or duckdb, and its output is what the evaluation entries then validate. Where the data lives in content/projects/data-and-retrieval — a document or embedding corpus rather than a table — the RAG entries there are the right starting point instead. For the fundamental model entries in content/projects/foundation-models, this is the automation layer that runs their architectures for you.

## Resources

- [AutoGluon documentation](https://auto.gluon.ai/stable/index.html)
- [AutoGluon GitHub repository](https://github.com/autogluon/autogluon)
- [AutoGluon tabular quickstart](https://auto.gluon.ai/stable/tutorials/tabular/quickstart.html)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (10,751 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
