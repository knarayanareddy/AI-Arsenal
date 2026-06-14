---
id: "lora"
title: "LoRA: Low-Rank Adaptation of Large Language Models"
authors:
  - "Hu, E."
  - "Shen, Y."
  - "Wallis, P."
published_date: "2021-06-17"
venue: "ICLR 2022"
arxiv_id: "2106.09685"
arxiv_url: "https://arxiv.org/abs/2106.09685"
pdf_url: "https://arxiv.org/pdf/2106.09685"
tags:
  - fine-tuning
  - llm
  - efficiency
category: "training"
importance: "foundational"
citation_count: 0
has_code: true
code_url: "https://github.com/microsoft/LoRA"
benchmark_improvements: []
tldr: "Introduced low-rank adapters for parameter-efficient fine-tuning of large models"
why_it_matters: "The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed."
added_date: "2026-06-14"
added_by: "maintainer"
---

> **TL;DR:** Introduced low-rank adapters for parameter-efficient fine-tuning of large models.
> **Why it matters:** The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed.

## The Problem It Solved

Solved the cost of updating all model weights for adaptation tasks.

## Key Contribution

Introduced low-rank adapters for parameter-efficient fine-tuning of large models.

## Results / Key Numbers

Showed comparable or better task performance while training far fewer parameters.

Do not reuse these numbers as current SOTA claims without checking newer leaderboards; they describe the paper's reported results and context.

## How to Apply This Today

Use LoRA adapters for task/style adaptation when full fine-tuning is too expensive.

## Code / Implementation

- [Implementation / code](https://github.com/microsoft/LoRA)
- [arXiv abstract](https://arxiv.org/abs/2106.09685)
- [PDF](https://arxiv.org/pdf/2106.09685)

## Further Reading

- [Must-read papers guide](../must-read-papers.md)
- [SOTA benchmarks](../sota-benchmarks.md)
- [Emerging techniques](../emerging-techniques.md)

---
*Last reviewed: 2026-06-14 by @maintainer*

