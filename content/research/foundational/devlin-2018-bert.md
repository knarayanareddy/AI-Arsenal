---
id: devlin-2018-bert
title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
phase: foundational
venue: other
year: 2018
authors:
  - "Devlin, J."
  - "Chang, M.-W."
  - "Lee, K."
  - "Toutanova, K."
arxiv_id: "1810.04805"
arxiv_url: "https://arxiv.org/abs/1810.04805"
pdf_url: "https://arxiv.org/pdf/1810.04805"
code_url: "https://github.com/google-research/bert"
venue_url: "https://aclanthology.org/N19-1423/"

practical_applicability: medium
reproduction_status: reproduced
result_status: challenged
has_code: true
citation_count_approx: 108000

tldr: "Showed bidirectional masked-language-model pretraining beats left-to-right pretraining, meaning you should reach for an encoder-only model (not a decoder-only LLM) for classification/embedding tasks"
key_contribution: "Established masked-language-model pretraining (predicting randomly masked tokens using both left and right context) as a way to pretrain deep bidirectional representations, where prior approaches could only pretrain unidirectionally or shallowly-bidirectionally"

builds_on:
  - vaswani-2017-attention
implemented_in: []

tags:
  - transformers
  - training
  - foundational
  - llm
added_date: "2026-06-14"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper established masked-language-model pretraining as the way to get genuinely bidirectional representations from a Transformer, which pushed state-of-the-art results across eleven NLP tasks in 2018 and made "pretrain then fine-tune" the standard recipe for a few years. Note: the specific BERT model and training recipe described in this paper have been directly challenged — RoBERTa (Liu et al., 2019) showed BERT was significantly undertrained and could match or exceed every model published after it with only more careful hyperparameter tuning and longer training on the same architecture, meaning some of BERT's originally reported performance gap versus contemporaries reflected under-training rather than an architectural limit. Separately, encoder-only bidirectional pretraining itself has become a narrower niche as decoder-only generative LLMs (the GPT-3 lineage) became the default architecture for most new LLM development.

## Why it's in the Arsenal

- BERT is one of the handful of papers every AI engineer is expected to know by name — it's the reference point for "encoder-only" as a model family, still relevant when your task is classification, retrieval embeddings, or sequence labeling rather than open-ended generation.
- `practical_applicability: medium` (not `high`) reflects an honest assessment: most new LLM development in 2026 uses decoder-only architectures (the GPT-3 lineage), so BERT-style encoder-only pretraining is the right choice specifically when you need bidirectional context for a discriminative task (classification, NER, embeddings), not the default choice for most new LLM engineering work.
- Understanding BERT's masking objective is also a prerequisite for understanding why encoder-only embedding models (used throughout this catalog's retrieval-and-memory research entries and vector-database tooling) are trained differently from the generative decoder-only models most people mean when they say "LLM."

## Core Contribution

Prior pretraining approaches were either unidirectional (predict the next word given only left context, as in GPT-1) or shallowly bidirectional (concatenating separately-trained left-to-right and right-to-left models, as in ELMo). BERT's masked-language-model objective randomly masks ~15% of input tokens and trains the model to predict them using both left and right context simultaneously, at every layer — a genuinely deep bidirectional representation rather than a concatenation of two directional ones. In engineering terms: this means the pretrained representation actually encodes what comes both before and after a token, which is why BERT-style embeddings work well for tasks like question answering (where the answer span's context includes tokens on both sides) in a way that a purely left-to-right pretrained model's representations do not, without task-specific architecture changes.

## Key Results

- 80.5% GLUE score (2018) — a 7.7 percentage point absolute improvement over the prior state of the art at publication; GLUE has since been considered largely saturated by later models and is no longer a meaningful differentiator between modern LLMs
- 93.2 F1 on SQuAD v1.1, 83.1 F1 on SQuAD v2.0 (2018) — both state-of-the-art at the time; SQuAD is likewise now considered a solved benchmark for current-generation models
- 86.7% MultiNLI accuracy (2018), a 4.6 percentage point absolute improvement at publication
- All of these numbers describe 2018-era state of the art and should not be read as current performance claims — every benchmark BERT was evaluated on here is now considered saturated or superseded by newer, harder benchmarks designed for larger generative models.

## Methodology

BERT is a stack of Transformer encoder layers (see `vaswani-2017-attention`) pretrained with two objectives jointly: masked language modeling (randomly mask 15% of input tokens, predict them from bidirectional context) and next sentence prediction (predict whether two given text segments are consecutive in the source document). After pretraining on unlabeled text, the model is fine-tuned for a specific downstream task by adding a single task-specific output layer — no substantial task-specific architecture changes are needed (paper Section 3), which was itself a notable simplification versus prior task-specific NLP architectures. Note that next-sentence-prediction specifically was later shown (by RoBERTa, among others) to contribute little to downstream performance and is omitted or replaced in most successor encoder models.

## Practical Applicability

If you are building a classification, sequence-labeling, or semantic-similarity system rather than a text-generation system, this paper's masked-language-model pretraining approach is why you should reach for an encoder-only model (a BERT-family or BERT-successor model) instead of a decoder-only generative LLM — bidirectional context genuinely improves discriminative task performance, and encoder-only models are typically far smaller and cheaper to run for these tasks than using a full generative LLM. If you are building or fine-tuning an embedding model for retrieval (relevant to this catalog's `retrieval-and-memory` research entries and vector-database tooling), understanding BERT's masking objective is why embedding models are trained differently from generation-focused decoder-only models, and why "embedding model" and "chat model" are not interchangeable even when built on similar Transformer components.

## Limitations & Critiques

RoBERTa (Liu et al., 2019) is the most consequential post-publication challenge to this paper's specific claims: it found BERT was significantly undertrained, and that a more carefully tuned and longer-trained version of the same architecture — with next-sentence-prediction removed, larger batches, and more data — could match or exceed every model published after BERT, "raising questions about the source of recently reported improvements" (RoBERTa paper abstract). This means some fraction of BERT's originally reported gap versus contemporaries and some fraction of later papers' claimed improvements over BERT reflect training-recipe differences rather than genuine architectural advances. Separately, the paper's own scope was English-language understanding tasks; it made no claim about generation quality, and encoder-only bidirectional pretraining does not straightforwardly extend to open-ended text generation, which is why the decoder-only lineage (GPT) rather than the encoder-only lineage (BERT) became the dominant architecture for general-purpose LLMs. `has_code: true` — Google released official pretrained weights and code — but reproducing the exact original training recipe faithfully (rather than an improved one like RoBERTa's) requires access to BooksCorpus and English Wikipedia at the exact preprocessing state used, which introduces minor practical reproduction friction.

## Reproductions & Follow-up Work

RoBERTa (Liu et al., 2019) is the most significant reproduction-and-critique: a careful replication study of BERT pretraining that found BERT was significantly undertrained and could be improved substantially with the same architecture and more careful training, without any new modeling contribution. ALBERT (Lan et al., 2019) and DistilBERT (Sanh et al., 2019) are notable follow-ups focused on parameter efficiency and distillation respectively, both treating BERT's exact recipe as a well-established baseline to compress rather than to challenge architecturally. The broader encoder-only lineage (RoBERTa, ALBERT, DeBERTa, and current embedding-model architectures used throughout this catalog's vector-database tooling) all trace their pretraining objective directly to this paper.

## Relation to the Arsenal

This paper builds directly on `vaswani-2017-attention` (foundational/), applying the Transformer's encoder half specifically to bidirectional masked-language-model pretraining. It is one of the two major branches of that architecture covered in `foundational/` — the other being `brown-2020-gpt3`'s decoder-only, scale-driven branch — and understanding both branches side by side is why they're grouped together here rather than split by training technique into `training-and-alignment/`. No tool or project entry in this catalog directly implements BERT itself, since encoder-only embedding models used in this catalog's vector-database and retrieval tooling are BERT-successors (RoBERTa/DeBERTa-lineage or purpose-built embedding architectures) rather than BERT itself; `implemented_in` is intentionally empty rather than force-fitting an approximate match.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/1810.04805)
- [arXiv](https://arxiv.org/abs/1810.04805)
- [Official Code](https://github.com/google-research/bert)
- [Venue Proceedings](https://aclanthology.org/N19-1423/)
- [Papers With Code](https://paperswithcode.com/paper/bert-pre-training-of-deep-bidirectional)
- [Key Reproduction / Analysis](https://huggingface.co/papers/1907.11692) — RoBERTa's replication study finding BERT was significantly undertrained, matching or exceeding every model published after it once training recipe issues were fixed
