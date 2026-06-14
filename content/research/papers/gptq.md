---
id: "gptq"
title: "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers"
authors:
  - "Frantar, E."
  - "Ashkboos, S."
  - "Hoefler, T."
published_date: "2022-10-31"
venue: "ICLR 2023"
arxiv_id: "2210.17323"
arxiv_url: "https://arxiv.org/abs/2210.17323"
pdf_url: "https://arxiv.org/pdf/2210.17323"
tags:
  - quantization
  - inference
  - llm
category: "efficiency"
importance: "foundational"
citation_count: 0
has_code: true
code_url: "https://github.com/IST-DASLab/gptq"
benchmark_improvements: []
tldr: "Introduced accurate post-training quantization methods for large generative transformers"
why_it_matters: "The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed."
added_date: "2026-06-14"
added_by: "maintainer"
---

> **TL;DR:** Introduced accurate post-training quantization methods for large generative transformers.
> **Why it matters:** The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed.

## The Problem It Solved

Addressed memory and inference cost by quantizing models without retraining.

## Key Contribution

Introduced accurate post-training quantization methods for large generative transformers.

## Results / Key Numbers

Showed strong compression results with limited accuracy degradation in the paper setting.

Do not reuse these numbers as current SOTA claims without checking newer leaderboards; they describe the paper's reported results and context.

## How to Apply This Today

Use GPTQ-style quantization when serving models under memory constraints.

## Code / Implementation

- [Implementation / code](https://github.com/IST-DASLab/gptq)
- [arXiv abstract](https://arxiv.org/abs/2210.17323)
- [PDF](https://arxiv.org/pdf/2210.17323)

## Further Reading

- [Must-read papers guide](../must-read-papers.md)
- [SOTA benchmarks](../sota-benchmarks.md)
- [Emerging techniques](../emerging-techniques.md)

---
*Last reviewed: 2026-06-14 by @maintainer*

