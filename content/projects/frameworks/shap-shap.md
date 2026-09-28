---
id: shap-shap
name: "shap"
version_tracked: null
artifact_type: library
category: evaluation
subcategory: evaluation
description: "MIT-licensed explainability library computing Shapley-value attributions for any model, including black-box scorers and rankers"
github_url: "https://github.com/shap/shap"
license: "MIT"
primary_language: Python
org_or_maintainer: "shap"
tags: [evaluation]
maturity: production
cost_model: open-source
github_stars: 25781
github_stars_last_30d: 0
trending_score: 35
last_commit: "2026-09-27"
docs_url: "https://shap.readthedocs.io"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Game-theoretic explainability library computing Shapley attributions for any model output, including black-box LLM scorers and retrieval rankers."
best_for:
  - "A model made a decision someone is disputing, and you need per-feature contributions that add up to the prediction and can be shown as a local explanation."
  - "You are shipping a black-box component - an LLM-as-judge, a reranker, a wrapped API - and stakeholders require attributable explanations even though the internals are not inspectable."
  - "You are checking a global behavior claim, such as whether a credit or hiring model is leaning on a protected attribute, and need a population-level summary rather than anecdotes."
avoid_if:
  - "You need real-time explanations on a high-throughput path, because exact Shapley computation is expensive and the approximations add latency you may not have."
  - "You need a causal account of why a decision happened, because Shapley values quantify model attribution within the model's own assumptions and are not causal identification."
  - "Your features are free-form text or images with no meaningful feature decomposition, because a value per feature requires a feature representation to attribute against."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 25781 stars, MIT license, Python primary language, last commit 2026-09-27, 8 GitHub topics including explainability, shapley, gradient-boosting, interpretability. Explainer variants, masker abstraction, kernel weighting, and global plots are from official docs; the code sample was not executed and no timing was measured."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/shap/shap", "date": "2026-09-28", "description": "25,781 stars and last commit 2026-09-27 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

SHAP computes attributions in the framework of cooperative game theory: features are treated as players, the model output as the payoff, and the Shapley value for a feature is its average marginal contribution across every possible ordering of the other features. That definition gives the two properties practitioners need - consistency, where a feature credited with changing the prediction appears in every explanation, and a local accuracy guarantee in the sense that the attributions sum to the prediction minus the baseline. Because the definition is model-agnostic, the library offers several explainers tuned to what you can afford: exact enumeration over a small feature set, permutation sampling over subsets for tree ensembles, path-dependent expectations for tree models, a sampling-based approach for any black box, a local surrogate that fits a linear model to a sample of evaluations, and a gradient-based explainer for differentiable models. It also provides global summaries - mean absolute attribution by feature, dependence plots, and interaction values - and a decision-tree visualization of a single prediction.

## Why it's in the Arsenal

The recurring decision this library resolves is explaining a prediction rather than trusting it. Once a model affects someone - a credit decision, a resume screen, a medical screen, a content ranking - a score is not a sufficient answer, and a plausible-sounding narrative is not either. The Shapley framing is what makes the explanation defensible: the value is defined by a fairness axiom set rather than chosen for convenience, and the efficiency property means the attributions actually account for the output instead of approximately resembling it. It also solves the black-box problem honestly, which matters more now than it used to: a model wrapped in an API or a reranker inside a pipeline is opaque by construction, and a sampling-based explainer needs only inputs and outputs, so a deployment you cannot introspect can still be explained. The cost is the same honest trade-off - computation is not free, and an attribution is a statement about the model, not about the world.

## Architecture

The library is Python with C-accelerated kernels in the core explainer implementations, built around a masker abstraction that supplies the background distribution - typically a sample from the training data or an explicit reference dataset. Given a model function that maps a masked array of features to a scalar, each explainer produces the Shapley values by its own algorithm. The exact explainer enumerates all subsets of a small feature set and evaluates the model on every permutation, which is exponential and appropriate below roughly a dozen features. The permutation explainer for tree ensembles samples permutations of the features and accumulates marginal contributions from the tree's own path-dependent expectation values, which is far cheaper because it exploits the tree structure. KernelSHAP is the general case: it fits a weighted linear regression over masked samples with Shapley kernel weights, so it works for any model but costs many forward passes. The sampling explainer does the same with simpler weights and more samples, while the local surrogate fits a model on perturbed inputs and reads off coefficients, trading fidelity for a small model you can inspect. For differentiable models, the gradient explainer computes attribution through the model with a chosen baseline, and the interventional variant marginalizes over the background data instead of using a single baseline. Global aggregation - a mean absolute value plot, a dependence scatter, an interaction matrix - is computed from the per-instance explanations by the same library, and the tree visualization renders the local explanation as a decision tree with path contributions annotated.

## Ecosystem Position

SHAP competes with LIME-style local approximators and with the model-specific importance tools that ship inside tree libraries, and compared with those it wins on a formal definition and on model-agnostic coverage, while the model-specific tools are faster and adequate when the model is a plain booster. It overlaps with the gradient-boosting entry in this batch, whose native feature-importance output is the cheaper answer for a model whose internals are already inspectable, and it is rather than a debugging tool: compared with an observability tool in content/projects/evaluation/, SHAP answers why a model decided, not what the service did. It is an alternative to writing your own perturbation harness, and the primary consumer of the evaluation tooling in content/projects/evaluation/ is exactly this question. It complements the classical machine-learning entry in this batch, where leakage and a global feature story are the concern, and it is the piece a regulated deployment in content/projects/data-and-retrieval/ needs before a feature can be used. Where the LLM tooling in this batch and the batch's black-box scorers are concerned, it is the bridge from a plausible narrative to a quantified attribution.

## Getting Started

Install the library and explain a model with the sampling explainer, which works on any black box:

```bash
python3 -m pip install shap
```

```python
import numpy as np, shap

def score(x):
    return float(np.sum(x * np.array([3.0, -1.0, 0.5])))

explainer = shap.Explainer(score, background=np.zeros((50, 3)))
explanation = explainer(np.array([[1.0, 2.0, 3.0]]))
print(explanation)
```

## Key Use Cases

1. Defending an individual decision to a reviewer or regulator, where a local explanation attributing the outcome to specific features is required.
2. Auditing a black-box component - an LLM-as-judge, a reranker, a wrapped API - from inputs and outputs alone, with no need for internal access.
3. Testing a global claim about model behavior, such as dependence on a particular attribute across a population, with a dependence plot and mean-attribution summary rather than sampled anecdotes.

## Strengths

- Attributions grounded in a formal definition with consistency and efficiency properties, rather than in a chosen approximation.
- Model-agnostic: the sampling and kernel explainers need only inputs and outputs, so an opaque deployed component can still be explained.
- Several algorithms matched to budget, from exact enumeration for a handful of features to fast path-dependent values for tree ensembles.
- Rich aggregation in the same library, from global mean attribution and dependence plots to interaction values and a decision-tree rendering of one prediction.

## Limitations

Computation is real: exact enumeration is exponential in the feature count, and the sampling approaches cost many model evaluations, so explanations on a high-throughput path need caching or an approximate budget. Correlated features make the split of credit between them ambiguous, and the values will be stable while the interpretation of any one of them is not - which is a property of the method, not a bug, and a frequent source of overconfident readings. An attribution explains what the model did, not what would happen if the world changed, so it is not a causal claim and will not support one. For text and image inputs you must supply the feature representation - tokens, regions, or an embedding decomposition - and the result is only as meaningful as that choice. And global summaries can hide slice-level disparities, so a single mean plot is a weak compliance artifact even when it is the right starting point.

## Relation to the Arsenal

The explainability layer that the evaluation phase in content/projects/evaluation/ depends on when a metric is not enough for a stakeholder. The gradient-boosting entry in this batch produces the models whose native importance is the cheaper first look and whose per-prediction attributions are what this library is for; the classical machine-learning entry in this batch is the other common model family explained here. In content/projects/data-and-retrieval/ a reranker's ranking decisions are a natural target for a sampling explainer, since the scorer is often a black box. Where the LLM tooling in this batch produces narrative justifications, this library quantifies attribution instead - and the two should be read together, because a generated rationale is not an explanation in this sense. For observability of systems rather than models, the tracing and metrics entries in content/projects/evaluation/ are the other tool.

## Resources

- [GitHub — shap/shap](https://github.com/shap/shap)
- [SHAP documentation](https://shap.readthedocs.io)
- [Shapley values and the original paper](https://arxiv.org/abs/1705.07874)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (25,781 stars, last commit 2026-09-27, license MIT, verified via GitHub API on 2026-09-28)*
