---
id: nakano-2021-webgpt
title: "WebGPT: Browser-assisted question-answering with human feedback"
phase: agents-and-reasoning
venue: arxiv-preprint
year: 2021
authors:
  - "Nakano, R."
  - "Hilton, J."
  - "Balaji, S."
  - "Wu, J."
  - "et al. (OpenAI)"
arxiv_id: "2112.09332"
arxiv_url: "https://arxiv.org/abs/2112.09332"
pdf_url: "https://arxiv.org/pdf/2112.09332"
code_url: null
venue_url: null

practical_applicability: medium
reproduction_status: not-reproduced
result_status: foundational
has_code: false
citation_count_approx: 1500

tldr: "Trained GPT-3 to operate a text-based web browser — searching, clicking, quoting — and answer questions with citations, using imitation learning plus human-preference RL; the first serious tool-using LLM agent and the origin of citation-grounded answers"
key_contribution: "Established the recipe for tool-using assistants before 'agents' existed as a category: represent tool use as text commands in an environment, bootstrap with human demonstrations, optimize with preference-based rejection sampling/RL — and make the model collect quoted evidence so humans can verify answers they can't fact-check themselves"

builds_on:
  - "brown-2020-gpt3"
  - "christiano-2017-rlhf"

tags:
  - "agents"
  - "tool-use"
  - "rlhf"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Before ReAct, before function calling, WebGPT put GPT-3 in a text-rendered browser with commands like `Search`, `Click`, `Quote`, and `End`, and trained it end-to-end to answer long-form questions from the live web with citations. The training stack — behavior cloning from ~6,000 human browsing demonstrations, then a reward model from answer comparisons, then rejection sampling (best-of-n) against it — produced answers preferred over human demonstrators' 56% of the time. It is the direct ancestor of every search-augmented assistant and the origin of citations as an accountability mechanism.

## Why it's in the Arsenal

- The modern agent stack's core moves — tool calls as structured text, demonstration bootstrapping, preference-optimized behavior, best-of-n with a reward model — appear here first and assembled; it's the historical key to why agents are trained the way they are
- Its citation design principle (models should gather verifiable evidence *because* human overseers can't fact-check everything) is now a product norm from Perplexity to enterprise RAG, and the paper is its clearest articulation

## Core Contribution

An environment + training recipe: web browsing rendered as text observations and a small command vocabulary, letting a pure language model act by generating commands; supervised fine-tuning on human demonstrations for competence, reward modeling on answer preferences for quality, and a comparison of PPO vs. rejection sampling — finding best-of-n against the reward model as effective as RL and far simpler, an early result in the now-standard RL-vs-BoN trade-off.

## Key Results

- 175B best-of-64 model's answers preferred to human demonstrators' 56% of the time, and to Reddit ELI5 reference answers 69% of the time (2021)
- On TruthfulQA, WebGPT was substantially more truthful than base GPT-3 — evidence that retrieval + citation training moves factuality, not just style (2021)
- Rejection sampling matched PPO at matched inference budgets — an influential simplicity result for preference optimization (2021)

## Methodology

Text-based browsing environment over Bing search; ~6K human demonstrations for behavior cloning; ~21.5K answer comparisons for reward modeling; evaluation by human preference on ELI5 questions plus TruthfulQA, with careful protocols for citation-supported factual accuracy judgments.

## Practical Applicability

Nobody reuses WebGPT's specific environment, but its architecture decisions are the ones agent builders still make: constrain the action space to few, reliable commands rather than open-ended browsing; bootstrap tool competence with demonstrations before optimizing preferences; use best-of-n with a scorer when RL complexity isn't justified; and require evidence collection when outputs must be verifiable. Its finding that models cite plausible-but-unsupportive sources is the earliest documentation of citation-hallucination — still the failure mode to test for in any citing system.

## Limitations & Critiques

Never open-sourced — model, environment, and data all closed, so no direct reproduction exists (open efforts like WebGLM approximated it). Long-form human preference evaluation is noisy and style-sensitive; the paper itself flags that citations make answers *look* authoritative and coherent-but-wrong answers harder to spot — deepening, not solving, the oversight problem. Single-turn QA only; the multi-step task generality that defines modern agents came later.

## Reproductions & Follow-up Work

No faithful reproduction (closed everything), but massive conceptual descent: `yao-2022-react` (interleaved reasoning + acting, prompt-only), `schick-2023-toolformer` (self-supervised tool learning), OpenAI's browsing plugins and successors, and the search-cited assistant category (Perplexity, Bing Chat). WebGLM (2023) is the closest open re-implementation.

## Relation to the Arsenal

Bridges `christiano-2017-rlhf` (training-and-alignment/) and the agents lineage — `yao-2022-react`, `schick-2023-toolformer` (agents-and-reasoning/); its citation-grounding design anchors the answer-verifiability guidance in observability/ and RAG evaluation entries.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2112.09332)
- [arXiv](https://arxiv.org/abs/2112.09332)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
