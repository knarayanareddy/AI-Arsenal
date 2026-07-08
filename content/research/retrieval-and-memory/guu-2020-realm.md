---
id: guu-2020-realm
title: "REALM: Retrieval-Augmented Language Model Pre-Training"
phase: retrieval-and-memory
venue: icml
year: 2020
authors:
  - "Guu, K."
  - "Lee, K."
  - "Tung, Z."
  - "Pasupat, P."
  - "Chang, M.-W."
arxiv_id: "2002.08909"
arxiv_url: "https://arxiv.org/abs/2002.08909"
pdf_url: "https://arxiv.org/pdf/2002.08909"
code_url: "https://github.com/google-research/language/tree/master/language/realm"
venue_url: null

practical_applicability: medium
reproduction_status: code-available
result_status: superseded
superseded_by: "lewis-2020-rag"
has_code: true
citation_count_approx: 3000

tldr: "First model to pretrain a language model jointly with a learned neural retriever over Wikipedia, backpropagating through retrieval — establishing that external knowledge can be a trained component of an LM rather than a bolt-on"
key_contribution: "Made retrieval differentiable and part of the pretraining objective: a latent-variable formulation where the retriever's document distribution is trained end-to-end via masked-language-modeling signal, with asynchronous MIPS index refreshes — the founding architecture of learned retrieval augmentation"

builds_on:
  - "devlin-2018-bert"

tags:
  - "retrieval"
  - "rag"
  - "training"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Before REALM, retrieval systems and language models were separate artifacts glued together at inference. REALM treated the retrieved document as a latent variable and trained retriever and reader jointly during pretraining: the model learns *what to retrieve* purely from whether retrieval helps predict masked tokens. It required solving a genuinely hard systems problem — the retrieval index goes stale as the encoder trains — via asynchronous index rebuilding, and set open-domain QA state of the art at a fraction of the parameters of closed-book models.

## Why it's in the Arsenal

- It is the intellectual origin of the retrieval-augmentation lineage: RAG, FiD, RETRO, and Atlas are all elaborations of REALM's "retrieval as a trained latent variable" framing
- Its central trade-off — joint training gives better retrieval but couples you to an index-refresh loop — is the same build-vs-simplicity decision teams face today when considering fine-tuned embedders versus off-the-shelf ones

## Core Contribution

A retrieve-then-predict architecture where p(y|x) marginalizes over retrieved documents z: p(y|x) = Σ p(y|x,z)p(z|x). Because p(z|x) is a dense inner-product retriever, the MLM gradient flows into the retriever, rewarding documents that improve prediction. Training tricks that made it work: asynchronous MIPS index refresh, salient-span masking (masking entities/dates so retrieval actually matters), and a null-document path.

## Key Results

- Open-domain QA SOTA at the time: 40.4 EM on NaturalQuestions-Open, beating T5-11B (36.6) with ~30× fewer parameters (2020)
- Outperformed both closed-book LMs and pipelines with frozen retrievers (ORQA), isolating the value of end-to-end retriever training (2020)
- Salient-span masking ablation: generic random masking largely fails to train the retriever — the pretraining signal must require external knowledge (2020)

## Methodology

BERT-base-scale encoders for retriever and reader, pretrained on Wikipedia with the marginal-likelihood MLM objective, MIPS over ~13M passage embeddings with periodic asynchronous re-embedding, then fine-tuned on open-domain QA benchmarks (NQ, WebQuestions, CuratedTrec).

## Practical Applicability

Nobody deploys REALM itself today; production RAG uses frozen or separately-trained embedders with in-context reading (`lewis-2020-rag` and beyond) because index-refresh-coupled training is operationally expensive. Its applicable exports: contrastively fine-tuning retrievers on task signal (the practical descendant of its end-to-end idea), designing training/eval data so retrieval is actually necessary (salient-span logic), and understanding when joint optimization is worth the systems cost.

## Limitations & Critiques

Masked-token prediction limits it to extractive/short-answer tasks — no generation. Scale was small (BERT-base era), the asynchronous index refresh is costly and fragile, and marginalizing over only k retrieved documents biases training toward what the current retriever already finds. Superseded in results by FiD, RAG, and Atlas, and in practice by frozen-retriever in-context RAG.

## Reproductions & Follow-up Work

Official TensorFlow code released; the architecture was reproduced and extended rather than re-run — DPR (`karpukhin-2020-dpr`) simplified retriever training to supervised contrastive learning, RAG (`lewis-2020-rag`) added generation, FiD (`izacard-2020-fid`) scaled the reader over many passages, and Atlas revisited full joint training at scale.

## Relation to the Arsenal

Reads as the opening chapter before `karpukhin-2020-dpr` and `lewis-2020-rag` (retrieval-and-memory/); the retriever-training trade-off it exposes is background for the embedding-model decision guidance in architectures/data-strategy/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2002.08909)
- [arXiv](https://arxiv.org/abs/2002.08909)
- [Code](https://github.com/google-research/language/tree/master/language/realm)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
