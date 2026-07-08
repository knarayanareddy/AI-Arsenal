---
id: radford-2019-gpt2
title: "Language Models are Unsupervised Multitask Learners (GPT-2)"
phase: foundational
venue: technical-report
year: 2019
authors:
  - "Radford, A."
  - "Wu, J."
  - "Child, R."
  - "Luan, D."
  - "Amodei, D."
  - "Sutskever, I."
pdf_url: "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf"
code_url: "https://github.com/openai/gpt-2"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: foundational
has_code: true
citation_count_approx: 12000

tldr: "Scaled a decoder-only Transformer LM to 1.5B params on WebText and showed it performs many NLP tasks zero-shot from a natural-language prompt alone — the paper that established prompting and task-agnostic pretraining as the path forward."
key_contribution: "Demonstrated that a single large language model trained only to predict the next token can perform translation, summarization, and QA zero-shot when the task is described in the input — reframing NLP from task-specific fine-tuning to prompting a general model, and providing the first strong evidence for the scaling thesis GPT-3 later confirmed."

builds_on:
  - "vaswani-2017-attention"
implemented_in: []

tags:
  - "llm"
  - "foundational"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

GPT-2 is a decoder-only Transformer language model (up to 1.5B parameters) trained on WebText, a 40GB corpus scraped from outbound Reddit links. Its central claim is that language modeling at scale is implicitly multitask learning: prompted appropriately in natural language, the model performs translation, summarization, reading comprehension, and question answering without any task-specific training or architecture. It is the paper that turned "prompt the model" into a paradigm.

## Why it's in the Arsenal

- GPT-2 is the origin of prompting as we practice it — every zero/few-shot prompt today is a direct descendant of its "describe the task in the input" framing
- It is the architectural template (decoder-only, next-token, scale the data and params) that GPT-3, Llama, and essentially all modern LLMs follow — reading it clarifies why the whole field converged on this recipe

## Core Contribution

The demonstration that task-agnostic pretraining on a large, diverse web corpus produces a model whose capabilities emerge from conditioning, not fine-tuning. GPT-2 showed monotonic improvement in zero-shot task performance as model size grew from 117M to 1.5B, foreshadowing scaling laws, and it argued that supervised task-specific datasets are narrow slices of the general language-modeling objective.

## Key Results

- Set state-of-the-art on 7 of 8 tested language-modeling datasets in a zero-shot setting at 1.5B parameters (paper, 2019)
- Zero-shot task performance (summarization, translation, QA) improved log-linearly with model size across the four scales tested (2019), the empirical hook for later scaling-law work

## Methodology

Standard decoder-only Transformer with pre-layernorm and modified initialization, trained with a byte-level BPE vocabulary on WebText. Evaluation is zero-shot: tasks are induced by prompt formatting (e.g. appending "TL;DR:" for summarization) with no gradient updates. The paper deliberately withholds task-specific supervision to isolate what pretraining alone confers.

## Practical Applicability

Engineers should internalize that GPT-2 established the interface you use daily: a single generalist model steered by prompt text. Its byte-level BPE tokenizer is still the lineage behind modern tokenizers, and its decoder-only recipe is the default you inherit when you pick any GPT/Llama-class model. When designing prompts, you are exploiting exactly the multitask-from-conditioning behavior this paper first isolated.

## Limitations & Critiques

- Zero-shot numbers, while SOTA for their time, were far below task-specific fine-tuned systems in 2019 — the paper proved feasibility, not parity
- WebText's Reddit-sourced curation bakes in demographic and topical biases, acknowledged by the authors as a concern for downstream use
- The staged/limited release of the largest model (over misuse fears) was contested by parts of the community as overcautious

## Reproductions & Follow-up Work

Fully reproduced: OpenAI released the model weights and code (github.com/openai/gpt-2), and independent reimplementations (nanoGPT, Hugging Face Transformers) train GPT-2-class models routinely. GPT-3 (Brown et al., 2020) directly extended the thesis to few-shot in-context learning at 175B parameters.

## Relation to the Arsenal

Foundational LLM paper; direct ancestor of `brown-2020-gpt3` and the Llama line (`touvron-2023-llama`). Its decoder-only recipe is reproduced in the `nanogpt` project entry.

## Resources

- [GPT-2 paper (PDF)](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)
- [openai/gpt-2 code and weights](https://github.com/openai/gpt-2)
