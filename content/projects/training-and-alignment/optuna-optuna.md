---
id: optuna-optuna
name: "optuna"
version_tracked: null
artifact_type: library
category: tooling
subcategory: frameworks
description: "Define-by-run hyperparameter optimization with pruning, distributed trials, and a study-based API"
github_url: "https://github.com/optuna/optuna"
license: "MIT"
primary_language: Python
org_or_maintainer: "optuna"
tags: [retrieval, training]
maturity: production
cost_model: open-source
github_stars: 14854
github_stars_last_30d: 0
trending_score: 33
last_commit: "2026-09-25"
docs_url: "https://optuna.org"
demo_url: null
paper_url: null
paper_id: null
phase: training-and-alignment
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Define-by-run hyperparameter optimization with pruning, whose trial API fits prompt, LoRA, and quantization sweeps better than fixed grid search."
best_for:
  - "You are tuning a LoRA or full fine-tune and want learning-rate and rank trials pruned early when the loss is not going anywhere."
  - "You are sweeping prompt templates or few-shot orderings, where the search space is a Python list of choices rather than a numeric grid."
  - "You have a cluster or many GPUs and need a distributed study that shares the pruning decision across workers."
avoid_if:
  - "You need a single fast deterministic grid and have no compute budget for search overhead, because every trial costs a full training run."
  - "Your objective is noisy and non-monotonic, where pruning will cut off good regions and you need many more trials to compensate."
  - "You need reproducible exact results with a documented search path, since a TPE study is stochastic and only the sampler seed makes it repeatable."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (14854), MIT license, last commit 2026-09-25, Python as primary language and the topic list were API-verified. Sampler and pruner names, storage modes, define-by-run semantics, and the callback wiring are from official docs; the compute-cost warnings are engineering judgement rather than measurements for this entry."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/optuna/optuna", "date": "2026-09-28", "description": "14,854 stars and last commit 2026-09-25 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Optuna organizes a search as a Study that owns a sampler and a pruner, wrapped around Trials. Inside a trial you call suggest_float, suggest_int, suggest_categorical, and suggest_bool; each call declares a distribution and the sampler decides the next point. The defining choice over grid and random search is define-by-run: distributions are created at call time, so conditional spaces, such as a different learning rate when LoRA rank exceeds 16, need no config file, and search runs can be resumed because the parameter set is recorded per trial. Sampling strategies split into independent samplers (RandomSampler, GridSampler, a QMC variant) and conditional ones (TPE for algorithm-driven optimisation, CmaEsSampler, GP-based variants, Hyperband and successive halving for multi-fidelity). Pruners such as MedianPruner, HyperbandPruner, SuccessiveHalvingPruner, NopPruner, and PatientPruner read intermediate values from a user callback and report should_prune(). Persistence is file-based study storage or an RDB backend, so a study survives restarts, and dashboards render from the same storage.

## Why it's in the Arsenal

The recurring decision is what to spend compute on when a training run is expensive and the search space is not a box. A grid wastes most of its budget on combinations that are obviously worse than what you already have; random search wastes it on duplicates; Bayesian TPE spends it where the promise is. Beyond the sampler, the recurring cost is early termination: most trials are bad by epoch two, and manually early-stopping every run means babysitting. Optuna makes both first-class, since pruning is a return value you check in the training callback and conditional spaces are expressed as ordinary Python control flow, so the same study runner drives LoRA rank sweeps, quantisation bit sweeps, and prompt-variant searches without being rewritten per experiment type.

## Architecture

A Study is a registry of Trials plus a sampler that maps observed trial results to the next suggestion. The TPE sampler maintains separate density estimates over good and bad regions of the observed space and samples from the good one, so it keeps a strictly positive search distribution with no restarts and no exploration deficit. The pruner receives the trial's step index and the best result at comparable steps, returning True to halt; the training code implements this by calling the study and checking should_prune inside its own loop or through a callback hook. Multi-fidelity works by making fidelity a trial parameter such as epochs, dataset fraction, or image resolution, and having the pruner compare a short run against the best value seen at the same fidelity so a promising-but-short run is not compared against a long one. RDB storage persists trials in a relational database so a multi-node study shares state, while in-memory and file storage cover single-node runs. Storage also enables the dashboard and the study history a later analysis step reads.

## Ecosystem Position

Optuna competes with Ray Tune, Weights and Biases Sweeps, and mlflow, with Ray Tune winning on multi-node orchestration and W&B sweeps winning when a hosted UI and shared team features already exist; it overlaps with Ray Tune's callback surface and can hand studies to Ray for execution. It is an alternative to a hand-rolled grid or a Hydra sweep, and a complement to the model trainer it optimises, since it never trains anything itself and only observes an objective. Compared to hyperopt, it is define-by-run rather than a declarative space object, which is easier for dynamically shaped problems and less portable between workers. It also contrasts with neural architecture search tooling: the search space is unconstrained, and success depends on pruning and compute rather than a search algorithm specialised for architectures.

## Getting Started

Minimise a simple objective, with pruning wired into a training loop:

```bash
pip install optuna
```

```python
import optuna

def objective(trial):
    lr = trial.suggest_float("lr", 1e-5, 1e-3, log=True)
    rank = trial.suggest_int("lora_rank", 4, 64, step=8)
    if rank > 32:                       # conditional space, declared inline
        trial.suggest_float("lora_alpha", 0.5, 2.0)
    return train_and_score(lr=lr, lora_rank=rank)   # reports via callbacks

study = optuna.create_study(
    direction="minimize",
    sampler=optuna.samplers.TPESampler(seed=0),
)
study.optimize(objective, n_trials=50,
               prune=optuna.pruners.MedianPruner(n_warmup_steps=2))
print(study.best_params, study.best_value)
```

Add `storage="postgresql://..."` to share a study across machines and open the same URI in the dashboard.

## Key Use Cases

1. LoRA or full fine-tune sweeps across learning rate, rank, alpha, and dropout, pruned by validation loss at a fixed epoch rather than waiting for convergence.
2. Prompt and few-shot template search where the parameter space is a list of strings and a categorical variable, and every trial is a scored eval run.
3. Quantisation and batch-size tuning where training time is a material cost and multi-fidelity pruning lets short runs eliminate bad configurations before long ones start.

## Strengths

- Define-by-run makes conditional and dynamically shaped search spaces ordinary Python, with no config file to regenerate per study.
- Pruning is a single boolean check in a callback, so early termination of expensive trials is nearly free to adopt.
- Log-scale and categorical distributions are first-class, which matters because learning rates are log-uniform and template choice is not numeric.
- Persistent study storage plus a built-in dashboard means results survive restarts and are inspectable without a third-party service.

## Limitations

Every trial is a full run of whatever you pass in, so the tool multiplies compute cost rather than reducing it, and a 50-trial study on a 7B fine-tune is a real GPU bill. Pruning assumes the intermediate metric is predictive, and on a noisy or non-monotonic objective it can discard genuinely good regions. TPE needs a reasonable number of trials before its density estimates beat random search, and categorical-heavy spaces with many levels can need hundreds of evaluations. Multiprocess objectives either have to be re-entered or run in a fresh interpreter, which complicates interactive notebooks, and the dashboard is useful rather than a replacement for a proper experiment store. There is no built-in constraint handling in the classic sampler set, and reproducing a result requires recording the sampler seed, version, and storage alongside the study.

## Relation to the Arsenal

This is the search layer in content/projects/training-and-alignment: the fine-tuning and alignment entries in that folder are exactly what an Optuna study calls into. The evaluation entries in the same catalog supply the objective function, so a study that tunes a prompt is really a study over an eval harness. Downstream, the serving entries in content/projects/inference-engines are where the winning configuration is finally pinned, and dvc or the ray entry in content/projects/frameworks are the better fits when you need artefact tracking or distributed execution rather than a search algorithm.

## Resources

- [Optuna documentation](https://optuna.readthedocs.io/en/stable/)
- [Optuna GitHub repository](https://github.com/optuna/optuna)
- [Optuna website and tutorials](https://optuna.org)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (14,854 stars, last commit 2026-09-25, license MIT, verified via GitHub API on 2026-09-28)*
