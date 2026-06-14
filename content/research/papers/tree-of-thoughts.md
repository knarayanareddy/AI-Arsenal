---
id: "tree-of-thoughts"
title: "Tree of Thoughts: Deliberate Problem Solving with Large Language Models"
authors:
  - "Yao, S."
  - "Yu, D."
  - "Zhao, J."
published_date: "2023-05-17"
venue: "NeurIPS 2023"
arxiv_id: "2305.10601"
arxiv_url: "https://arxiv.org/abs/2305.10601"
pdf_url: "https://arxiv.org/pdf/2305.10601"
tags:
  - reasoning
  - agents
  - planning
category: "agents"
importance: "foundational"
citation_count: 0
has_code: true
code_url: "https://github.com/princeton-nlp/tree-of-thought-llm"
benchmark_improvements: []
tldr: "Introduced search over multiple reasoning paths instead of a single left-to-right chain"
why_it_matters: "The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed."
added_date: "2026-06-14"
added_by: "maintainer"
---

> **TL;DR:** Introduced search over multiple reasoning paths instead of a single left-to-right chain.
> **Why it matters:** The practical implication for builders is that this paper changes how systems are designed, evaluated, tuned, or deployed.

## The Problem It Solved

Addressed tasks requiring exploration, backtracking, and strategic lookahead.

## Key Contribution

Introduced search over multiple reasoning paths instead of a single left-to-right chain.

## Results / Key Numbers

Reported major improvements on tasks such as Game of 24 and creative writing planning in the paper setting.

Do not reuse these numbers as current SOTA claims without checking newer leaderboards; they describe the paper's reported results and context.

## How to Apply This Today

Use tree/search-style reasoning for hard planning tasks where one-shot reasoning is brittle.

## Code / Implementation

- [Implementation / code](https://github.com/princeton-nlp/tree-of-thought-llm)
- [arXiv abstract](https://arxiv.org/abs/2305.10601)
- [PDF](https://arxiv.org/pdf/2305.10601)

## Further Reading

- [Must-read papers guide](../must-read-papers.md)
- [SOTA benchmarks](../sota-benchmarks.md)
- [Emerging techniques](../emerging-techniques.md)

---
*Last reviewed: 2026-06-14 by @maintainer*

