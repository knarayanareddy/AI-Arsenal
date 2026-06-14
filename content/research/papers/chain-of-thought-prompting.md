---
id: "chain-of-thought-prompting"
title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"
authors:
  - "Wei, J."
  - "Wang, X."
  - "Schuurmans, D."
published_date: "2022-01-28"
venue: "NeurIPS 2022"
arxiv_id: "2201.11903"
arxiv_url: "https://arxiv.org/abs/2201.11903"
pdf_url: "https://arxiv.org/pdf/2201.11903"
tags:
  - reasoning
  - llm
  - foundational
category: "training"
importance: "foundational"
citation_count: 0
has_code: true
code_url: "https://github.com/FranxYao/chain-of-thought-hub"
benchmark_improvements: []
tldr: "Showed that prompting models to produce intermediate reasoning improves multi-step reasoning tasks"
why_it_matters: "The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed."
added_date: "2026-06-14"
added_by: "maintainer"
---

> **TL;DR:** Showed that prompting models to produce intermediate reasoning improves multi-step reasoning tasks.
> **Why it matters:** The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed.

## The Problem It Solved

Addressed failures from forcing models to answer complex problems in one step.

## Key Contribution

Showed that prompting models to produce intermediate reasoning improves multi-step reasoning tasks.

## Results / Key Numbers

Reported large improvements on arithmetic, commonsense, and symbolic reasoning benchmarks.

Do not reuse these numbers as current SOTA claims without checking newer leaderboards; they describe the paper's reported results and context.

## How to Apply This Today

Use reasoning traces carefully for difficult tasks, while validating final answers and avoiding leakage of hidden reasoning when inappropriate.

## Code / Implementation

- [Implementation / code](https://github.com/FranxYao/chain-of-thought-hub)
- [arXiv abstract](https://arxiv.org/abs/2201.11903)
- [PDF](https://arxiv.org/pdf/2201.11903)

## Further Reading

- [Must-read papers guide](../must-read-papers.md)
- [SOTA benchmarks](../sota-benchmarks.md)
- [Emerging techniques](../emerging-techniques.md)

---
*Last reviewed: 2026-06-14 by @maintainer*

