---
id: "attention-is-all-you-need"
title: "Attention Is All You Need"
authors:
  - "Vaswani, A."
  - "Shazeer, N."
  - "Parmar, N."
published_date: "2017-06-12"
venue: "NeurIPS 2017"
arxiv_id: "1706.03762"
arxiv_url: "https://arxiv.org/abs/1706.03762"
pdf_url: "https://arxiv.org/pdf/1706.03762"
tags:
  - transformers
  - attention
  - foundational
  - llm
category: "architecture"
importance: "foundational"
citation_count: 0
has_code: true
code_url: "https://github.com/tensorflow/tensor2tensor"
benchmark_improvements: []
tldr: "Introduced the Transformer architecture that became the foundation for modern LLMs"
why_it_matters: "The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed."
added_date: "2026-06-14"
added_by: "maintainer"
---

> **TL;DR:** Introduced the Transformer architecture that became the foundation for modern LLMs.
> **Why it matters:** The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed.

## The Problem It Solved

Removed recurrence and convolution in favor of attention-only sequence modeling.

## Key Contribution

Introduced the Transformer architecture that became the foundation for modern LLMs.

## Results / Key Numbers

Set state-of-the-art translation quality with better parallelization than recurrent models.

Do not reuse these numbers as current SOTA claims without checking newer leaderboards; they describe the paper's reported results and context.

## How to Apply This Today

Use Transformer concepts to understand attention, context windows, and modern model scaling.

## Code / Implementation

- [Implementation / code](https://github.com/tensorflow/tensor2tensor)
- [arXiv abstract](https://arxiv.org/abs/1706.03762)
- [PDF](https://arxiv.org/pdf/1706.03762)

## Further Reading

- [Must-read papers guide](../must-read-papers.md)
- [SOTA benchmarks](../sota-benchmarks.md)
- [Emerging techniques](../emerging-techniques.md)

---
*Last reviewed: 2026-06-14 by @maintainer*

