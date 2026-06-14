---
id: "qlora"
title: "QLoRA: Efficient Finetuning of Quantized LLMs"
authors:
  - "Dettmers, T."
  - "Pagnoni, A."
  - "Holtzman, A."
published_date: "2023-05-23"
venue: "NeurIPS 2023"
arxiv_id: "2305.14314"
arxiv_url: "https://arxiv.org/abs/2305.14314"
pdf_url: "https://arxiv.org/pdf/2305.14314"
tags:
  - fine-tuning
  - quantization
  - llm
category: "training"
importance: "foundational"
citation_count: 0
has_code: true
code_url: "https://github.com/artidoro/qlora"
benchmark_improvements: []
tldr: "Enabled fine-tuning quantized LLMs with low memory using 4-bit quantization plus LoRA"
why_it_matters: "The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed."
added_date: "2026-06-14"
added_by: "maintainer"
---

> **TL;DR:** Enabled fine-tuning quantized LLMs with low memory using 4-bit quantization plus LoRA.
> **Why it matters:** The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed.

## The Problem It Solved

Made high-quality fine-tuning accessible on smaller GPU setups.

## Key Contribution

Enabled fine-tuning quantized LLMs with low memory using 4-bit quantization plus LoRA.

## Results / Key Numbers

Reported Guanaco models reaching strong chatbot benchmark performance with efficient training.

Do not reuse these numbers as current SOTA claims without checking newer leaderboards; they describe the paper's reported results and context.

## How to Apply This Today

Use QLoRA when adapting open models under tight GPU memory constraints.

## Code / Implementation

- [Implementation / code](https://github.com/artidoro/qlora)
- [arXiv abstract](https://arxiv.org/abs/2305.14314)
- [PDF](https://arxiv.org/pdf/2305.14314)

## Further Reading

- [Must-read papers guide](../must-read-papers.md)
- [SOTA benchmarks](../sota-benchmarks.md)
- [Emerging techniques](../emerging-techniques.md)

---
*Last reviewed: 2026-06-14 by @maintainer*

