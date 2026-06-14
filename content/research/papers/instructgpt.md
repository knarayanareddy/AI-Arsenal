---
id: "instructgpt"
title: "Training Language Models to Follow Instructions with Human Feedback"
authors:
  - "Ouyang, L."
  - "Wu, J."
  - "Jiang, X."
published_date: "2022-03-04"
venue: "NeurIPS 2022"
arxiv_id: "2203.02155"
arxiv_url: "https://arxiv.org/abs/2203.02155"
pdf_url: "https://arxiv.org/pdf/2203.02155"
tags:
  - alignment
  - rlhf
  - llm
category: "alignment"
importance: "foundational"
citation_count: 0
has_code: true
code_url: "https://github.com/openai/following-instructions-human-feedback"
benchmark_improvements: []
tldr: "Introduced the InstructGPT RLHF recipe for making language models follow user instructions better"
why_it_matters: "The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed."
added_date: "2026-06-14"
added_by: "maintainer"
---

> **TL;DR:** Introduced the InstructGPT RLHF recipe for making language models follow user instructions better.
> **Why it matters:** The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed.

## The Problem It Solved

Addressed mismatch between next-token pretraining and user-intent following.

## Key Contribution

Introduced the InstructGPT RLHF recipe for making language models follow user instructions better.

## Results / Key Numbers

Showed smaller instruction-following models could be preferred over much larger base models.

Do not reuse these numbers as current SOTA claims without checking newer leaderboards; they describe the paper's reported results and context.

## How to Apply This Today

Use as the foundation for understanding supervised instruction tuning plus reward-model optimization.

## Code / Implementation

- [Implementation / code](https://github.com/openai/following-instructions-human-feedback)
- [arXiv abstract](https://arxiv.org/abs/2203.02155)
- [PDF](https://arxiv.org/pdf/2203.02155)

## Further Reading

- [Must-read papers guide](../must-read-papers.md)
- [SOTA benchmarks](../sota-benchmarks.md)
- [Emerging techniques](../emerging-techniques.md)

---
*Last reviewed: 2026-06-14 by @maintainer*

