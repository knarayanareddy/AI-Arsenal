---
id: "toolformer"
title: "Toolformer: Language Models Can Teach Themselves to Use Tools"
authors:
  - "Schick, T."
  - "Dwivedi-Yu, J."
  - "Dessì, R."
published_date: "2023-02-09"
venue: "NeurIPS 2023"
arxiv_id: "2302.04761"
arxiv_url: "https://arxiv.org/abs/2302.04761"
pdf_url: "https://arxiv.org/pdf/2302.04761"
tags:
  - tool-use
  - agents
  - llm
category: "agents"
importance: "foundational"
citation_count: 0
has_code: true
code_url: "https://github.com/lucidrains/toolformer-pytorch"
benchmark_improvements: []
tldr: "Showed that language models can learn to call tools using self-supervised API-call annotations"
why_it_matters: "The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed."
added_date: "2026-06-14"
added_by: "maintainer"
---

> **TL;DR:** Showed that language models can learn to call tools using self-supervised API-call annotations.
> **Why it matters:** The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed.

## The Problem It Solved

Addressed how models can learn tool-use patterns without large manually labeled datasets.

## Key Contribution

Showed that language models can learn to call tools using self-supervised API-call annotations.

## Results / Key Numbers

Reported improved downstream task performance with learned tool calls in the paper experiments.

Do not reuse these numbers as current SOTA claims without checking newer leaderboards; they describe the paper's reported results and context.

## How to Apply This Today

Use Toolformer ideas when designing tool-call data generation or tool-use fine-tuning.

## Code / Implementation

- [Implementation / code](https://github.com/lucidrains/toolformer-pytorch)
- [arXiv abstract](https://arxiv.org/abs/2302.04761)
- [PDF](https://arxiv.org/pdf/2302.04761)

## Further Reading

- [Must-read papers guide](../must-read-papers.md)
- [SOTA benchmarks](../sota-benchmarks.md)
- [Emerging techniques](../emerging-techniques.md)

---
*Last reviewed: 2026-06-14 by @maintainer*

