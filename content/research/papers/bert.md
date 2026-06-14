---
id: "bert"
title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
authors:
  - "Devlin, J."
  - "Chang, M.-W."
  - "Lee, K."
published_date: "2018-10-11"
venue: "NAACL 2019"
arxiv_id: "1810.04805"
arxiv_url: "https://arxiv.org/abs/1810.04805"
pdf_url: "https://arxiv.org/pdf/1810.04805"
tags:
  - llm
  - training
  - foundational
category: "training"
importance: "foundational"
citation_count: 0
has_code: true
code_url: "https://github.com/google-research/bert"
benchmark_improvements: []
tldr: "Introduced bidirectional masked-language-model pretraining for language understanding"
why_it_matters: "The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed."
added_date: "2026-06-14"
added_by: "maintainer"
---

> **TL;DR:** Introduced bidirectional masked-language-model pretraining for language understanding.
> **Why it matters:** The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed.

## The Problem It Solved

Solved weak left-to-right context for many NLP understanding tasks.

## Key Contribution

Introduced bidirectional masked-language-model pretraining for language understanding.

## Results / Key Numbers

Reported large gains across GLUE, SQuAD, and other language-understanding benchmarks.

Do not reuse these numbers as current SOTA claims without checking newer leaderboards; they describe the paper's reported results and context.

## How to Apply This Today

Use BERT-style encoders for classification, retrieval encoders, reranking, and embedding baselines.

## Code / Implementation

- [Implementation / code](https://github.com/google-research/bert)
- [arXiv abstract](https://arxiv.org/abs/1810.04805)
- [PDF](https://arxiv.org/pdf/1810.04805)

## Further Reading

- [Must-read papers guide](../must-read-papers.md)
- [SOTA benchmarks](../sota-benchmarks.md)
- [Emerging techniques](../emerging-techniques.md)

---
*Last reviewed: 2026-06-14 by @maintainer*

