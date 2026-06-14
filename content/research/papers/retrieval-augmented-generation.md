---
id: "retrieval-augmented-generation"
title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
authors:
  - "Lewis, P."
  - "Perez, E."
  - "Piktus, A."
published_date: "2020-05-22"
venue: "NeurIPS 2020"
arxiv_id: "2005.11401"
arxiv_url: "https://arxiv.org/abs/2005.11401"
pdf_url: "https://arxiv.org/pdf/2005.11401"
tags:
  - rag
  - retrieval
  - foundational
category: "rag"
importance: "foundational"
citation_count: 0
has_code: true
code_url: "https://github.com/huggingface/transformers"
benchmark_improvements: []
tldr: "Introduced retrieval-augmented generation as a way to combine parametric models with external knowledge"
why_it_matters: "The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed."
added_date: "2026-06-14"
added_by: "maintainer"
---

> **TL;DR:** Introduced retrieval-augmented generation as a way to combine parametric models with external knowledge.
> **Why it matters:** The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed.

## The Problem It Solved

Addressed knowledge-intensive tasks where model weights alone were insufficient or stale.

## Key Contribution

Introduced retrieval-augmented generation as a way to combine parametric models with external knowledge.

## Results / Key Numbers

Improved results on open-domain QA and knowledge-heavy generation tasks.

Do not reuse these numbers as current SOTA claims without checking newer leaderboards; they describe the paper's reported results and context.

## How to Apply This Today

Use RAG when answers need private, fresh, or citeable knowledge.

## Code / Implementation

- [Implementation / code](https://github.com/huggingface/transformers)
- [arXiv abstract](https://arxiv.org/abs/2005.11401)
- [PDF](https://arxiv.org/pdf/2005.11401)

## Further Reading

- [Must-read papers guide](../must-read-papers.md)
- [SOTA benchmarks](../sota-benchmarks.md)
- [Emerging techniques](../emerging-techniques.md)

---
*Last reviewed: 2026-06-14 by @maintainer*

