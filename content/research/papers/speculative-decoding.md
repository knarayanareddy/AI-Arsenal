---
id: "speculative-decoding"
title: "Fast Inference from Transformers via Speculative Decoding"
authors:
  - "Leviathan, Y."
  - "Kalman, M."
  - "Matias, Y."
published_date: "2022-11-30"
venue: "ICML 2023"
arxiv_id: "2211.17192"
arxiv_url: "https://arxiv.org/abs/2211.17192"
pdf_url: "https://arxiv.org/pdf/2211.17192"
tags:
  - inference
  - efficiency
  - llm
category: "inference"
importance: "foundational"
citation_count: 0
has_code: true
code_url: "https://github.com/google-research/google-research"
benchmark_improvements: []
tldr: "Introduced speculative decoding to accelerate generation using a faster draft model verified by a larger model"
why_it_matters: "The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed."
added_date: "2026-06-14"
added_by: "maintainer"
---

> **TL;DR:** Introduced speculative decoding to accelerate generation using a faster draft model verified by a larger model.
> **Why it matters:** The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed.

## The Problem It Solved

Addressed autoregressive decoding latency without changing the target model distribution.

## Key Contribution

Introduced speculative decoding to accelerate generation using a faster draft model verified by a larger model.

## Results / Key Numbers

Reported inference speedups while preserving exact output distribution under the method assumptions.

Do not reuse these numbers as current SOTA claims without checking newer leaderboards; they describe the paper's reported results and context.

## How to Apply This Today

Use speculative decoding when latency matters and a cheap draft model is available.

## Code / Implementation

- [Implementation / code](https://github.com/google-research/google-research)
- [arXiv abstract](https://arxiv.org/abs/2211.17192)
- [PDF](https://arxiv.org/pdf/2211.17192)

## Further Reading

- [Must-read papers guide](../must-read-papers.md)
- [SOTA benchmarks](../sota-benchmarks.md)
- [Emerging techniques](../emerging-techniques.md)

---
*Last reviewed: 2026-06-14 by @maintainer*

