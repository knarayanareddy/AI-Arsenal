---
id: yao-2023-tree-of-thoughts
title: "Tree of Thoughts: Deliberate Problem Solving with Large Language Models"
phase: agents-and-reasoning
venue: neurips
year: 2023
authors:
  - "Yao, S."
  - "Yu, D."
  - "Zhao, J."
  - "Shafran, I."
  - "et al."
arxiv_id: "2305.10601"
arxiv_url: "https://arxiv.org/abs/2305.10601"
pdf_url: "https://arxiv.org/pdf/2305.10601"
code_url: "https://github.com/princeton-nlp/tree-of-thought-llm"
venue_url: "https://papers.nips.cc/paper_files/paper/2023/hash/271db9922b8d1f4dd7aaef84ed5ac703-Abstract-Conference.html"

practical_applicability: medium
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 1600

tldr: "Showed exploring and backtracking across multiple candidate reasoning paths beats single-chain CoT on hard search-style problems -- reach for ToT for problems needing exploration/backtracking, not as a default CoT replacement"
key_contribution: "Generalized chain-of-thought's single linear reasoning path into an explicit tree of intermediate 'thoughts,' with self-evaluation of partial solutions and the ability to look ahead or backtrack, enabling deliberate search-based problem solving"

builds_on:
  - wei-2022-chain-of-thought
implemented_in: []

tags:
  - reasoning
  - agents
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper generalized chain-of-thought's single linear reasoning path into an explicit tree of intermediate "thoughts," with the model self-evaluating partial solutions and the ability to look ahead or backtrack — enabling deliberate, search-based problem solving on tasks where a single greedy reasoning chain tends to fail. This remains a current, valid technique for the specific class of hard, search-requiring problems it targets, but it has not become the default reasoning technique for most production use cases, since its multi-path exploration is substantially more expensive (more model calls) than single-chain chain-of-thought, and most production reasoning-heavy systems now increasingly use dedicated reasoning-trained models (the o1/R1-style lineage, see `deepseek-ai-2025-r1`) rather than orchestrating explicit tree search themselves.

## Why it's in the Arsenal

- Tree of Thoughts directly addresses a real limitation of single-chain chain-of-thought: some problems (like the paper's own Game of 24 and creative writing tasks) require exploring multiple candidate approaches and backtracking from dead ends, which a single greedy left-to-right reasoning chain structurally cannot do.
- `practical_applicability: medium` is an honest, non-inflated classification: this technique's exploration is valuable specifically for search-heavy problems, but its higher cost (multiple model calls per step, evaluating multiple branches) means it is not the default choice for most reasoning tasks, where simpler chain-of-thought or a dedicated reasoning-trained model is more cost-effective.

## Core Contribution

Chain-of-thought prompting (`wei-2022-chain-of-thought`) commits to a single, left-to-right reasoning chain with no mechanism to reconsider an early step that turns out to be a dead end. This paper's contribution is structuring the reasoning process as an explicit tree: at each step, the model generates multiple candidate "thoughts" (partial solution steps), self-evaluates how promising each candidate is, and a search algorithm (breadth-first or depth-first search, controlled externally) decides which branches to expand further and which to abandon — allowing the system to look ahead, compare alternatives, and backtrack from unpromising paths, which a single greedy chain cannot do. In engineering terms: this converts reasoning from "commit to one path and hope it's right" into "actively search a space of candidate reasoning paths, using the model's own self-evaluation to prune bad ones."

## Key Results

- On the Game of 24 (a math puzzle requiring combining four numbers via arithmetic to reach 24), chain-of-thought prompting with GPT-4 solved only 4% of problems, while Tree of Thoughts solved 74% (2023) — the paper's most dramatic and most-cited comparison, on a task specifically chosen to require exploration and backtracking
- Tree of Thoughts substantially outperformed chain-of-thought prompting on creative writing and mini crosswords tasks in the paper's own evaluation (2023), tasks the authors selected specifically because they require exploring multiple candidate continuations rather than committing to one
- These results are strongest specifically on tasks the paper selected because they require search and backtracking; the paper does not claim (and subsequent practice has not found) that Tree of Thoughts provides a comparable advantage on tasks that are already well-suited to single-chain reasoning, where the added cost of multi-path exploration provides little benefit

## Methodology

At each step of the search, the model generates several candidate next "thoughts" (partial solution continuations) rather than committing to just one (paper Section 3). Each candidate is then evaluated — either by having the model directly assign a value/likelihood-of-success score to the partial solution, or by having the model vote across candidates — and a search strategy (the paper implements both breadth-first search, keeping the best few candidates at each level, and depth-first search, exploring one promising path deeply before backtracking) uses these evaluations to decide which branches to continue expanding and which to prune. This is explicitly external orchestration around the underlying language model calls — the tree search algorithm itself is standard search (BFS/DFS), with the language model providing both the candidate generation and the self-evaluation signal that guides the search, meaning implementing ToT requires you to build (or use existing) search-orchestration code around your model calls, not just change your prompt.

## Practical Applicability

If you are solving a problem where a single greedy reasoning chain is prone to getting stuck in a locally-reasonable-looking but ultimately wrong path — puzzles, planning problems, or creative tasks requiring genuine exploration of alternatives — Tree of Thoughts' explicit search-with-backtracking is a validated technique that directly outperforms chain-of-thought on exactly this class of problem, at the cost of substantially more model calls per solved instance (since you're generating and evaluating multiple candidates at each step, not just one). If you are working on a task well-served by a single reasoning chain (most everyday multi-step reasoning tasks), the added implementation complexity and cost of building or using a tree-search orchestration layer is unlikely to be worth it — reach for `wei-2022-chain-of-thought`'s simpler technique, or for open-ended difficult reasoning, consider a dedicated reasoning-trained model (see `deepseek-ai-2025-r1`) that internalizes search-like behavior through training rather than requiring you to orchestrate it externally.

## Limitations & Critiques

The technique's cost is its most significant practical limitation, one the paper's own framing (focused on solve-rate improvements) does not emphasize as heavily as later practitioner experience has: generating and evaluating multiple candidates at each search step multiplies the number of model calls required per solved problem, often substantially, compared to a single chain-of-thought pass — a real tradeoff that must be weighed against the accuracy gains for any specific use case. The paper's own evaluation deliberately selected tasks (Game of 24, creative writing, crosswords) chosen specifically because they benefit from exploration; this is methodologically sound for demonstrating the technique's value, but means the reported gains should not be extrapolated to reasoning tasks generally, most of which do not have the same explicit branching-and-backtracking structure these evaluation tasks do. Since this paper's publication, dedicated reasoning-trained models (trained via RL on verifiable rewards, as in `deepseek-ai-2025-r1`) have emerged as an alternative way to get search-like exploratory reasoning behavior — internalized through training rather than orchestrated externally at inference time — and for many practitioners this has become the preferred approach where available, since it avoids ToT's explicit multi-call orchestration cost, though ToT remains directly useful when you specifically need transparent, inspectable, externally-controllable search rather than an opaque reasoning-trained model's internal process. No credible failed-replication challenge to the paper's core empirical claims has been identified as of `last_reviewed: 2026-07-01`.

## Reproductions & Follow-up Work

The paper's authors released official code, and Tree of Thoughts has been independently reproduced and used as a baseline or building block in numerous follow-up papers on structured reasoning and search-augmented prompting. Reasoning-trained models like `deepseek-ai-2025-r1` (training-and-alignment/) represent a related but architecturally distinct line of follow-up work: rather than orchestrating explicit tree search externally at inference time as this paper does, they train the model itself (via RL on verifiable rewards) to internalize exploratory, self-correcting reasoning behavior — addressing a similar underlying problem (single-chain reasoning getting stuck) through a different mechanism (training vs. inference-time orchestration).

## Relation to the Arsenal

This paper builds directly on `wei-2022-chain-of-thought` (this phase folder), generalizing that paper's single reasoning chain into an explicit tree — read that entry first. It is a useful contrasting case alongside `deepseek-ai-2025-r1` (training-and-alignment/): both address the problem of single-pass reasoning getting stuck on hard problems, but this paper solves it via external inference-time search orchestration, while DeepSeek-R1 solves a related problem via training the model itself to reason more robustly, and understanding both approaches clarifies a real architectural choice (orchestrate search yourself, or train/use a model that internalizes it) engineers face when building for hard reasoning tasks.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2305.10601)
- [arXiv](https://arxiv.org/abs/2305.10601)
- [Official Code](https://github.com/princeton-nlp/tree-of-thought-llm)
- [Venue Proceedings](https://papers.nips.cc/paper_files/paper/2023/hash/271db9922b8d1f4dd7aaef84ed5ac703-Abstract-Conference.html)
- [Papers With Code](https://paperswithcode.com/paper/tree-of-thoughts-deliberate-problem-solving)
- [Key Reproduction / Analysis](https://lilianweng.github.io/posts/2023-06-23-agent/) — independent survey situating Tree of Thoughts alongside other structured-reasoning and agent-planning techniques, including its relationship to search algorithms more broadly
