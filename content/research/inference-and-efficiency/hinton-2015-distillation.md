---
id: hinton-2015-distillation
title: "Distilling the Knowledge in a Neural Network"
phase: inference-and-efficiency
venue: arxiv-preprint
year: 2015
authors:
  - "Hinton, G."
  - "Vinyals, O."
  - "Dean, J."
arxiv_id: "1503.02531"
arxiv_url: "https://arxiv.org/abs/1503.02531"
pdf_url: "https://arxiv.org/pdf/1503.02531"
code_url: null
venue_url: "https://arxiv.org/abs/1503.02531"

practical_applicability: high
reproduction_status: reproduced
result_status: foundational
has_code: false
citation_count_approx: 22000

tldr: "Introduced knowledge distillation — training a small 'student' model to match the soft output distribution of a large 'teacher' — the basis for compressing large models into cheap, fast ones for deployment"
key_contribution: "Showed a teacher's softened probabilities (logits divided by a temperature) carry 'dark knowledge' about class similarities that lets a much smaller student learn better than training on hard labels alone"

builds_on: []
implemented_in: []

tags:
  - inference
  - fine-tuning
  - llm
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Knowledge distillation is the technique of training a small, cheap "student" model to imitate a large, expensive "teacher." The key insight is that the teacher's full output *distribution* — not just its top prediction — encodes rich information: the relative probabilities it assigns to wrong answers reveal which classes are similar, and training the student to reproduce these "soft targets" transfers that knowledge far more efficiently than hard labels. This is a foundational idea behind the many small, distilled models used for cheap inference throughout the LLM ecosystem (from DistilBERT to countless task-specific student models).

## Why it's in the Arsenal

- Distillation is a primary lever for the cost/latency side of the catalog: when a large model is too expensive to serve, you distill its behavior into a smaller model that is cheaper and faster.
- It underpins a common production pattern — use a strong (possibly proprietary) model to label or score data, then train a small model on those outputs — which is distillation in practice.
- `practical_applicability: high` — the technique is directly used to build deployable student models and is conceptually reused in RLHF-adjacent "learn from a stronger model's outputs" pipelines.

## Core Contribution

The paper formalized distillation with the temperature-scaled softmax. A model's logits `z_i` are converted to probabilities with a temperature `T`: `softmax(z_i / T)`. At `T = 1` this is the normal (often near one-hot) output; raising `T` softens the distribution, amplifying the small probabilities the teacher assigns to non-target classes — the "dark knowledge" about how classes relate. The student is trained to match these softened teacher probabilities (typically with a distillation loss at high `T`, optionally combined with the standard hard-label loss at `T = 1`). Because the soft targets carry more information per example than a single hard label, the student learns a better function than it could from the labels alone, often approaching teacher quality at a fraction of the size and cost. The paper also introduced distilling ensembles into a single model and specialist/generalist ensembles.

## Key Results

- On MNIST, a distilled student recovered almost all of the teacher's accuracy, including generalization to classes it saw few or no direct examples of, demonstrating transfer via soft targets
- Distilling a large ensemble of acoustic models for speech recognition into a single model captured most of the ensemble's gains at a fraction of the serving cost (2015)
- Introduced specialist models plus distillation for very large classification problems
- These are 2015 vision/speech results; their durable significance is establishing distillation as a general model-compression method, which the LLM era has scaled and relied on heavily.

## Methodology

The authors trained student networks against teacher soft targets produced at elevated temperature, combining a high-temperature distillation loss with an optional standard cross-entropy on true labels, and evaluated on MNIST digit classification and a large-scale speech-recognition system. Experiments varied temperature and studied transfer to under-represented classes and ensemble compression, isolating the contribution of soft targets over hard labels. The core recipe is model- and modality-agnostic, which is why it generalized to modern LLMs.

## Practical Applicability

Distillation is a go-to tool when inference cost or latency is the constraint. Practical patterns: (1) response/logit distillation — train a small model to match a large model's outputs on a representative data distribution; (2) data distillation — use a strong model to generate labels/rationales, then train a compact student on them; (3) task-specific compression — distill a general model into a small specialist for one workload. In the LLM era this shows up as small instruction-tuned models trained on outputs of larger ones. Temperature, the mix of soft/hard loss, and the coverage of the transfer data are the levers that determine how much teacher quality survives.

## Limitations & Critiques

- The student is bounded by the teacher and the transfer data: distillation cannot exceed teacher quality, and gaps appear where the transfer set doesn't cover the teacher's behavior.
- Distilling from proprietary model outputs raises licensing/terms-of-service and legal questions that are unresolved in many contexts.
- For generative LLMs, matching full next-token distributions or trajectories is more involved than the classification setting the paper studied; naive logit-matching has limits.
- It requires access to a good teacher and enough compute to run it over the transfer data.

## Reproductions & Follow-up Work

Distillation is ubiquitous and heavily reproduced; DistilBERT, TinyBERT, and many small instruction-tuned "student" LLMs are descendants. It complements quantization ([GPTQ](./frantar-2022-gptq.md), [AWQ](./lin-2023-awq.md)) and pruning as the main model-compression families, and relates to the "learn from a stronger model" idea underlying some alignment pipelines.

## Relation to the Arsenal

- Foundational to the catalog's inference-and-efficiency theme: the standard method for turning large models into cheap, deployable ones.
- Complements quantization papers ([GPTQ](./frantar-2022-gptq.md), [AWQ](./lin-2023-awq.md)) as an orthogonal axis of compression — distillation shrinks the model; quantization shrinks the representation.

## Resources

- [arXiv abstract](https://arxiv.org/abs/1503.02531)
- [PDF](https://arxiv.org/pdf/1503.02531)
