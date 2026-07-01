---
id: brown-2020-gpt3
title: "Language Models are Few-Shot Learners"
phase: foundational
venue: neurips
year: 2020
authors:
  - "Brown, T."
  - "Mann, B."
  - "Ryder, N."
  - "Subbiah, M."
  - "et al."
arxiv_id: "2005.14165"
arxiv_url: "https://arxiv.org/abs/2005.14165"
pdf_url: "https://arxiv.org/pdf/2005.14165"
code_url: null
venue_url: "https://papers.nips.cc/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html"

practical_applicability: theoretical
reproduction_status: not-reproduced
result_status: challenged
has_code: false
citation_count_approx: 52000

tldr: "Showed scaling a decoder-only Transformer to 175B params produces strong few-shot in-context learning with zero gradient updates, meaning you can often solve a new task via prompting instead of fine-tuning"
key_contribution: "Demonstrated that in-context learning (performing a task from a few prompt examples with no weight updates) emerges and improves predictably as model scale increases, without a scale-specific architectural change"

builds_on:
  - vaswani-2017-attention
implemented_in: []

tags:
  - training
  - foundational
  - llm
added_date: "2026-06-14"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper trained GPT-3, a 175-billion-parameter decoder-only Transformer, and showed that few-shot in-context learning — solving a new task from a handful of examples given purely as text in the prompt, with no gradient updates — improves substantially and fairly predictably as model scale increases. That single empirical finding is the reason prompting largely replaced task-specific fine-tuning as the default way to use an LLM. Note: the specific claim that 175B parameters was an efficient way to buy that capability has been directly challenged — Chinchilla (Hoffmann et al., 2022) showed GPT-3 was significantly undertrained for its parameter count, and that a compute-optimal model trained on far more data at a smaller size (70B) uniformly outperforms it, meaning GPT-3's specific scale/data tradeoff is not the recipe modern frontier labs use, even though its core finding (scale drives in-context learning) still holds.

## Why it's in the Arsenal

- Understanding why prompting works at all — why a large enough model can perform a new task from a few examples with no training — traces directly to this paper's central empirical claim, which underlies essentially every "prompt engineering" and in-context-learning technique documented elsewhere in this catalog (including `chain-of-thought-prompting`, which is itself a specific prompting technique that relies on the emergent capability this paper first demonstrated at scale).
- `practical_applicability: theoretical` reflects that no one reproduces GPT-3 itself directly today (its exact weights and training data were never fully released, and Chinchilla superseded its scale/compute tradeoff) — but the phenomenon it demonstrated, that capability emerges from scale in a roughly predictable way, remains the conceptual foundation for how frontier labs plan training runs and for why "just prompt it" is often a reasonable first approach before building a fine-tuning pipeline.

## Core Contribution

Prior NLP systems required task-specific fine-tuning datasets of thousands of labeled examples per task. This paper's central claim is that a sufficiently large autoregressive language model, given only a natural-language task description and a handful of examples in its input context — with no gradient updates at all — can perform competitively with fine-tuned systems on many tasks, and that this in-context, few-shot capability improves as a fairly smooth function of model scale (extending the scaling-law observations of Kaplan et al., 2020, two orders of magnitude further than prior work). In engineering terms: this is the empirical result that justified treating "make the model bigger" as a viable strategy for capability improvement, and it's why prompt-based task adaptation (rather than fine-tuning a separate model per task) became the default interaction pattern for LLMs.

## Key Results

- GPT-3 175B achieves competitive performance with prior fine-tuned state-of-the-art on several NLP benchmarks purely via few-shot prompting, with zero gradient updates (2020) — the paper's headline empirical claim, evaluated across dozens of NLP datasets
- Demonstrated qualitatively new few-shot capabilities not previously reported at smaller scale: 3-digit arithmetic, unscrambling words, and using a novel word correctly after a single example (2020) — evidence the paper itself frames as observational, not fully mechanistically explained
- The paper's own scaling curves show in-context learning ability increasing smoothly with parameter count from 125M to 175B (2020); this specific 175B-parameter data point has since been shown to be an inefficient point on the compute-optimal frontier by Chinchilla (2022), which achieved better downstream performance with a 70B model trained compute-optimally

## Methodology

GPT-3 is a decoder-only Transformer (the autoregressive, left-to-right half of the architecture from `vaswani-2017-attention`, following the GPT-1/GPT-2 lineage), scaled to 175B parameters — 10x larger than any non-sparse language model at the time — and trained on a large web-text-derived corpus with standard next-token-prediction pretraining, no additional fine-tuning stage. Evaluation is purely in-context: for each task, the model is given a natural-language task description plus zero, one, or a few input-output example pairs directly in its input, then asked to complete a new example, with the entire "learning" happening within a single forward pass over the prompt rather than through any weight update (paper Section 2). The paper is explicit that it cannot distinguish, mechanistically, whether few-shot performance reflects the model recognizing a task format seen during pretraining versus genuinely learning a new task on the fly — an open question the paper states as a limitation of its own analysis, not a settled finding.

## Practical Applicability

If you are deciding whether to fine-tune a model or solve a task via prompting, this paper's core finding is the reason "try prompting first" is a reasonable default: sufficiently capable models can perform many tasks competitively from in-context examples alone, avoiding the cost and complexity of building a fine-tuning pipeline for cases where prompting is sufficient. If you are trying to understand why scaling model size keeps producing capability gains — and why frontier labs keep training bigger models — this paper's empirical scaling result (not its specific model) is the origin of that expectation. It is `theoretical` rather than `high` applicability specifically because the exact scale/compute tradeoff this paper used is now known to be inefficient (see Limitations) — you should not use GPT-3's specific 175B-parameter, single-epoch training recipe as a template; you should understand the phenomenon it demonstrated.

## Limitations & Critiques

Chinchilla (Hoffmann et al., 2022) is the most consequential post-publication challenge: it found that GPT-3 and similar large models of that era were significantly undertrained relative to their parameter count, and that for a fixed compute budget, model size and training tokens should scale together — a 70B-parameter model trained compute-optimally (Chinchilla) uniformly and significantly outperformed 175B-parameter GPT-3 on a wide range of downstream tasks. This means GPT-3's specific scale is not evidence that "bigger is better" in isolation; the paper's true contribution (in-context learning emerges with scale) survives, but its specific model configuration does not represent efficient practice. Reproduction is also a genuine, structural limitation: OpenAI never released GPT-3's full weights or complete training code, so `has_code: false` and `reproduction_status: not-reproduced` reflect an honest state — the paper's exact 175B model has never been independently reproduced at the same scale with the same data, only approximated by later open efforts (GPT-Neo, GPT-J, and eventually fully open models like Llama) that are architecturally similar but not exact reproductions. The paper itself acknowledges (Section 4 and the "Broader Impacts" discussion) uncertainty about whether few-shot performance reflects genuine on-the-fly task learning versus pattern-matching to formats seen in pretraining — an open question the authors explicitly decline to resolve.

## Reproductions & Follow-up Work

No independent full-scale reproduction of GPT-3 175B with the original training data and recipe exists, since neither the weights nor the complete training corpus were released — approximate open efforts (EleutherAI's GPT-Neo and GPT-J) reproduce the general architecture and scale class but not the exact model. Chinchilla (Hoffmann et al., 2022) is the most significant follow-up: a systematic study across 400+ models that directly challenges GPT-3's compute allocation and establishes the compute-optimal scaling relationship that superseded it. The broader in-context-learning research area this paper opened includes `chain-of-thought-prompting` (in this catalog's `agents-and-reasoning/` phase), which extends in-context learning specifically to multi-step reasoning tasks.

## Relation to the Arsenal

This paper builds directly on `vaswani-2017-attention` (foundational/), applying the decoder-only half of that architecture at a scale that produces the emergent in-context learning this catalog's prompting-based tools and techniques depend on. It is grouped in `foundational/` alongside `devlin-2018-bert` as the second of the two major architectural branches worth understanding together — decoder-only/generative versus encoder-only/discriminative. `chain-of-thought-prompting` (agents-and-reasoning/) is a direct, specific application of the in-context learning capability this paper first demonstrated at scale. No tool or project in this catalog implements GPT-3 itself (it was never open-sourced); `implemented_in` is intentionally empty.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2005.14165)
- [arXiv](https://arxiv.org/abs/2005.14165)
- [Venue Proceedings](https://papers.nips.cc/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html)
- [Papers With Code](https://paperswithcode.com/paper/language-models-are-few-shot-learners)
- [Key Reproduction / Analysis](https://dl.acm.org/doi/10.5555/3600270.3602446) — Hoffmann et al.'s Chinchilla paper, showing GPT-3-class models were significantly undertrained and establishing the compute-optimal scaling relationship that superseded GPT-3's specific configuration
