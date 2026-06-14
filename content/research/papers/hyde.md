---
id: "hyde"
title: "Precise Zero-Shot Dense Retrieval without Relevance Labels"
authors:
  - "Gao, L."
  - "Ma, X."
  - "Lin, J."
published_date: "2022-12-20"
venue: "ACL 2023"
arxiv_id: "2212.10496"
arxiv_url: "https://arxiv.org/abs/2212.10496"
pdf_url: "https://arxiv.org/pdf/2212.10496"
tags:
  - rag
  - retrieval
  - embeddings
category: "rag"
importance: "incremental"
citation_count: 0
has_code: true
code_url: "https://github.com/texttron/hyde"
benchmark_improvements: []
tldr: "Introduced HyDE, which retrieves by embedding a hypothetical answer/document generated from the query"
why_it_matters: "The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed."
added_date: "2026-06-14"
added_by: "maintainer"
---

> **TL;DR:** Introduced HyDE, which retrieves by embedding a hypothetical answer/document generated from the query.
> **Why it matters:** The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed.

## The Problem It Solved

Improved zero-shot dense retrieval when no relevance labels are available.

## Key Contribution

Introduced HyDE, which retrieves by embedding a hypothetical answer/document generated from the query.

## Results / Key Numbers

Reported retrieval gains across several zero-shot retrieval settings.

Do not reuse these numbers as current SOTA claims without checking newer leaderboards; they describe the paper's reported results and context.

## How to Apply This Today

Use HyDE-style query transformation when user queries are short, vague, or semantically distant from documents.

## Code / Implementation

- [Implementation / code](https://github.com/texttron/hyde)
- [arXiv abstract](https://arxiv.org/abs/2212.10496)
- [PDF](https://arxiv.org/pdf/2212.10496)

## Further Reading

- [Must-read papers guide](../must-read-papers.md)
- [SOTA benchmarks](../sota-benchmarks.md)
- [Emerging techniques](../emerging-techniques.md)

---
*Last reviewed: 2026-06-14 by @maintainer*

