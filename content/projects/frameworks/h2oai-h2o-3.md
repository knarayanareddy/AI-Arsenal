---
id: h2oai-h2o-3
name: "h2o-3"
version_tracked: null
artifact_type: platform
category: evaluation
subcategory: tools
description: "Distributed ML platform spanning AutoML, GLM, GBM, and model serving across data frames and Spark"
github_url: "https://github.com/h2oai/h2o-3"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "h2oai"
tags: [efficiency, inference, evaluation]
maturity: production
cost_model: open-source
github_stars: 7510
github_stars_last_30d: 0
trending_score: 31
last_commit: "2026-09-25"
docs_url: "http://h2o.ai"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Distributed ML platform spanning AutoML, feature engineering, and model serving, notable for a single GLM that is unusually easy to serve and explain."
best_for:
  - "You need a model you can explain to a risk or compliance audience, since a GLM with elastic net and a GAM give per-feature contributions without a post-hoc explainer."
  - "Your table is larger than memory and you want to train GLMs, gradient boosting, or random forests across a cluster with a single interface."
  - "You want AutoML that trains and stacks a broad model set automatically and hands back something you can serve from the same platform."
avoid_if:
  - "Your data fits comfortably in memory on a laptop, where a single-node library is simpler and faster than a distributed platform and a JVM-backed runtime."
  - "You need state-of-the-art accuracy on a competitive tabular benchmark, where LightGBM or CatBoost usually beat the H2O defaults for less effort."
  - "You want a Python-native model object, since the models are Java objects reached through a Python client and the ecosystem of third-party tooling is thinner."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (7510), Apache-2.0 license, last commit 2026-09-25, Python as primary language and the topic list were API-verified. KeyedFrame storage, the algorithm set, AutoML with stacking, and the MOJO format are from official documentation; the single-node-versus-distributed performance judgement and ONNX export coverage caveats are engineering assessment, not benchmarks run here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/h2oai/h2o-3", "date": "2026-09-28", "description": "7,510 stars and last commit 2026-09-25 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

h2o-3 is a distributed, in-memory machine-learning platform whose client libraries in R and Python talk to a JVM cluster. Data is ingested into a KeyedFrame, a distributed columnar table with an XGBoost-style DMatrix, and that representation is shared across algorithms, which is why the AutoML, the cross-validation, and the model export all work over the same in-memory data without conversion. The algorithm list is unusually broad for a platform: generalised linear models with elastic net, gradient boosting machines, random forests, deep learning on multiple frameworks, k-means, PCA, generalised additive models, support vector machines, rule-based models, and stacked ensembles. H2O AutoML runs a leaderboard-style search over those families with cross-validation and stopping criteria, then optionally stacks the leaders. On the serving side, MOJO is a self-contained model format that a lightweight Java predictor evaluates without the h2o-3 jar and without the training cluster, which is the deployment story the rest of the stack is built around. The distributed execution model is column-partitioned with a columnar chunked frame, so scaling is a matter of adding nodes with more memory.

## Why it's in the Arsenal

The recurring decision is how to handle a table too large for memory while keeping the model auditable. Distributed frameworks tend to force a choice between scale and interpretability: the scalable learners are trees and ensembles, and the models you can defend to a regulator are the ones with a coefficient per feature. h2o-3 is unusual in taking both seriously, because a GLM with elastic net and a GAM run on the same distributed KeyedFrame as a GBM, and MOJO carries either one to production without dragging the cluster along. The second reason to reach for it is AutoML with stacking built in, which is a defensible way to answer what the best model is here without hand-running a benchmark sweep across libraries.

## Architecture

An H2O cluster runs a JVM coordinator plus workers, and the KeyedFrame is stored in column-partitioned compressed chunks with a global row count and a key column; algorithms operate on it in parallel across workers by splitting columns and rows, and the distributed implementations use map-reduce and AllReduce to combine partial gradients. A model algorithm implements a distributed gradient-descent loop over the frame, so GBM, GLM, and deep learning share the same execution skeleton with different loss and regularisation; the GLM path adds coordinate descent with elastic net penalties and drop constraints for correlated features, and the GAM path uses a distributed binned-spline or tensor-product basis so a nonlinear term stays a curve you can plot. Cross-validation is a first-class operation that reuses the in-memory frame across folds rather than reloading it. AutoML builds validation frames, trains a configured set of algorithms with time and memory limits, ranks them on the validation metrics, and optionally trains a stacked ensemble over the top models. Serving separates from training: MOJO serialises the model as a key-value binary plus a compact runtime library, so a predictor evaluates it standalone — which is how the platform avoids requiring the training cluster in production.

## Ecosystem Position

h2o-3 competes with AutoGluon on AutoML, with LightGBM, CatBoost, and XGBoost on tabular accuracy, and with distributed platforms like Spark MLlib on scale. The distinctive comparison is with Spark MLlib: h2o-3's algorithms are implemented in a distributed JVM, so it can train a GLM or a GAM in a way Spark's estimator API does not, while Spark wins when your transformation graph is the hard part rather than the learner. Against LightGBM, h2o-3 is the option when the data does not fit in memory or when the model must be explainable, and LightGBM is the better answer for a single-node tabular leaderboard push. It overlaps with AutoML tools like tpot and mljar in the same search space, and it is a complement to the serving entries in this catalog, since MOJO is a separate inference path rather than an ONNX export — though ONNX export exists for parts of the model set, which is the bridge to onnxruntime.

## Getting Started

Start a local cluster, upload a frame, and let AutoML pick a model:

```bash
pip install h2o
```

```python
import h2o
h2o.init(nthreads=8, max_mem_size="8G")

train = h2o.import_file("train.csv")
target = "class"

aml = h2o.auto_ml(x=train.drop(target), y=train[target],
                  max_models=20, max_runtime_secs=600)
print(aml.leaderboard)

best = aml.leader
print(best.coef_table() if "GLM" in best.name else best.rf_coefficients_table())
print(best.mojo)   # self-contained artefact for the lightweight predictor
```

The R and Java clients speak the same REST protocol, so one cluster serves all three languages.

## Key Use Cases

1. **Where it fits**: "You need a model you can explain to a risk or compliance audience, since a GLM with elastic net and a GAM give per-feature contributions without a post-hoc explainer
2. **Adoption checkpoint**: before building on h2o-3, reproduce the specific claim you are relying on — install it, run it against a representative slice of your data, and record the number that would make you abandon the choice. A project entry can tell you what is claimed; only your own run tells you what is true.

## Strengths

- Beyond the headline description, h2o-3's architecture section is the honest source: an H2O cluster runs a JVM coordinator plus workers, and the KeyedFrame is stored in column-partitioned compressed chunks with a global row count and a key column; algorithms operate on it in parallel across workers by splitting columns and rows, and the distributed implementations use map-reduce and AllReduce to combine partial gradients. A model algorithm implements a distributed gradient-descent loop over the frame, so GBM, GLM, and deep learning share the same execution skeleton with different loss and regularisation; the GLM path adds coordinate descent with elastic net penalties and drop constraints for correlated features, and the GAM path uses a distributed binned-spline or tensor-product basis so a nonlinear term stays a curve you can plot. Cross-validation is a first-class operation that reuses the in-memory frame across folds rather than reloading it. AutoML builds validation frames, trains a configured set of algorithms with time and memory limits, ranks them on the validation metrics, and optionally trains a stacked ensemble over the top models. Serving separates from training: MOJO serialises the model as a key-value binary plus a compact runtime library, so a predictor evaluates it standalone — which is how the platform avoids requiring the training cluster in production.
- It is a framework entry in this catalog, so the comparison that matters is against the other framework projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- Adoption risk for h2o-3 is mostly operational rather than technical — resource cost at your scale, dependency failure behaviour, and the upgrade path when interfaces move.
- Documentation describes intended behaviour, not observed behaviour: latency, memory and failure rates for h2o-3 at your scale need measuring before this informs a production decision.
- No alternative is catalogued alongside h2o-3 here, so the entry cannot tell you what it is better than; treat that absence as a gap in the comparison rather than as a verdict.

## Relation to the Arsenal

This is the distributed platform entry in content/projects/frameworks, and the comparison worth reading is with the LightGBM, CatBoost, and AutoGluon entries in the same folder — the same problems at different scales. Its input is the feature table built by dbt and the batch transforms in the frameworks phase, while Spark, Dask, and Ray in that phase own the general distributed compute it would sit inside. For deployment, MOJO is a self-contained alternative to exporting to onnxruntime or running a vLLM-style server, and the serving entries in content/projects/inference-engines are the comparison. Where it is genuinely the right answer is a table too big to fit locally with a model that has to be explainable, which is narrower than the platform's feature list suggests.

## Resources

- [H2O-3 documentation](https://docs.h2o.ai/)
- [H2O-3 GitHub repository](https://github.com/h2oai/h2o-3)
- [MOJO model format documentation](https://mojoml.ai/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (7,510 stars, last commit 2026-09-25, license Apache-2.0, verified via GitHub API on 2026-09-28)*
