---
id: izacard-2021-contriever
title: "Unsupervised Dense Information Retrieval with Contrastive Learning (Contriever)"
phase: retrieval-and-memory
venue: arxiv-preprint
year: 2021
authors:
  - "Izacard, G."
  - "Caron, M."
  - "Hosseini, L."
  - "Riedel, S."
  - "Bojanowski, P."
  - "Joulin, A."
  - "Grave, E."
arxiv_id: "2112.09118"
arxiv_url: "https://arxiv.org/abs/2112.09118"
pdf_url: "https://arxiv.org/pdf/2112.09118"
code_url: "https://github.com/facebookresearch/contriever"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 1500

tldr: "Trained a competitive dense retriever with no labeled query-document pairs, using contrastive learning over automatically-constructed positive pairs — strong zero-shot retrieval and a much better fine-tuning starting point than BM25 or random init."
key_contribution: "Showed dense retrievers can be pretrained purely unsupervised via contrastive learning (independent cropping / inverse cloze-style positives, MoCo-style negatives), matching or beating BM25 zero-shot and transferring well across domains — removing the labeled-data bottleneck that had made dense retrieval brittle out-of-domain."

builds_on:
  - "karpukhin-2020-dpr"
implemented_in: []

tags:
  - "rag"
  - "embeddings"
  - "retrieval"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Contriever is a dense passage retriever trained without any labeled query-document supervision. It builds positive training pairs automatically from unlabeled text (e.g. two crops of the same document) and uses contrastive learning with a large queue of negatives (MoCo-style momentum encoder) to learn embeddings where semantically related passages are close. The result is a retriever that is competitive with BM25 in zero-shot settings and a strong initialization for supervised fine-tuning.

## Why it's in the Arsenal

- Contriever answered a core RAG pain point: dense retrievers trained on one domain (e.g. Natural Questions) generalize poorly, while Contriever's unsupervised pretraining transfers across domains far better
- It is the intellectual basis for the strong open embedding models teams rely on today — the "contrastive pretraining then fine-tune" recipe is now standard for retrieval encoders

## Core Contribution

Demonstrating that the labeled-data requirement for dense retrieval is not fundamental: contrastive learning over cheaply-generated positive pairs yields high-quality retrieval embeddings. The paper's ablations show unsupervised Contriever beating BM25 on a majority of BEIR zero-shot tasks and providing a better fine-tuning start than starting from a masked-LM checkpoint.

## Key Results

- Outperformed BM25 on 11 of 15 BEIR zero-shot retrieval datasets in recall@100 without any supervised training (paper, 2021)
- As an initialization, Contriever improved downstream supervised retrieval and cross-lingual transfer over standard BERT init (2021)

## Methodology

Positives are two independently sampled spans from the same document (independent cropping); negatives come from a momentum-updated encoder's queue (MoCo). The model is a bi-encoder producing a single dense vector per passage/query, trained with the InfoNCE contrastive loss on large unlabeled corpora, then optionally fine-tuned on MS MARCO for supervised gains. Evaluation is primarily zero-shot on the BEIR benchmark.

## Practical Applicability

When you build RAG for a domain without labeled retrieval data — which is most real deployments — Contriever's lesson is directly actionable: prefer a contrastively-pretrained embedding model over one fine-tuned only on a narrow QA dataset, because it will generalize to your corpus. In practice you now reach for its descendants (E5, GTE, BGE) that industrialized this recipe, but Contriever is the reference point for why they work zero-shot.

## Limitations & Critiques

- Single-vector bi-encoder representations lose fine-grained term interactions that late-interaction models (ColBERT) and cross-encoders capture, capping precision on hard queries
- Independent-cropping positives are a heuristic; the pairs are noisier than curated supervision, so supervised fine-tuning still helps materially
- Zero-shot gains over BM25 are dataset-dependent — BM25 remains competitive or better on some keyword-heavy tasks

## Reproductions & Follow-up Work

Reproduced via facebookresearch/contriever with released checkpoints. Its contrastive-pretraining approach was scaled and refined by E5, GTE, and BGE embedding models, and it complements late-interaction retrieval (`khattab-2020-colbert`) and the DPR line (`karpukhin-2020-dpr`) it builds on.

## Relation to the Arsenal

Retrieval-and-memory paper; builds on `karpukhin-2020-dpr`, complements `khattab-2020-colbert`, and underpins the embedding models used across the RAG tool and project entries.

## Resources

- [Contriever paper](https://arxiv.org/abs/2112.09118)
- [facebookresearch/contriever](https://github.com/facebookresearch/contriever)
