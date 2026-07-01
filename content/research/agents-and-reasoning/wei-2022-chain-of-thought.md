---
id: wei-2022-chain-of-thought
title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"
phase: agents-and-reasoning
venue: neurips
year: 2022
authors:
  - "Wei, J."
  - "Wang, X."
  - "Schuurmans, D."
  - "Bosma, M."
  - "et al."
arxiv_id: "2201.11903"
arxiv_url: "https://arxiv.org/abs/2201.11903"
pdf_url: "https://arxiv.org/pdf/2201.11903"
code_url: "https://github.com/FranxYao/chain-of-thought-hub"
venue_url: "https://papers.nips.cc/paper_files/paper/2022/hash/9d5609613524ecf4f15af0f7b31abca4-Abstract-Conference.html"

practical_applicability: high
reproduction_status: reproduced
result_status: challenged
has_code: true
citation_count_approx: 9000

tldr: "Showed prompting a large enough model to produce intermediate reasoning steps improves multi-step reasoning accuracy -- use CoT for reasoning-heavy tasks, but don't trust the trace as an accurate explanation of the model's actual computation"
key_contribution: "Showed that prompting a sufficiently large language model to produce a chain of intermediate reasoning steps before its final answer substantially improves performance on arithmetic, commonsense, and symbolic reasoning tasks, and that this benefit only emerges reliably at large model scale"

builds_on:
  - brown-2020-gpt3
implemented_in: []

tags:
  - reasoning
  - llm
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper showed that prompting a sufficiently large language model to produce a chain of intermediate reasoning steps — rather than jumping straight to a final answer — substantially improves accuracy on arithmetic, commonsense, and symbolic reasoning tasks, and that this effect emerges reliably only at large model scale. The core performance claim remains current and widely used practice. However, `result_status: challenged` reflects a distinct and important post-publication finding not about whether CoT prompting improves task accuracy (it does), but about a claim often made *using* this paper's technique: that the generated reasoning trace is a faithful, accurate account of the model's actual internal computation — recent research has found this is often not the case, meaning CoT should be treated as a performance technique, not a reliable explainability or interpretability tool.

## Why it's in the Arsenal

- Chain-of-thought prompting is the default technique for eliciting better performance on any task requiring multi-step reasoning, and it underlies or motivates most of the other entries in this phase folder (ReAct interleaves it with actions, Tree of Thoughts extends it to explicit search, ReAct-derived agent frameworks assume some form of intermediate reasoning is happening).
- `practical_applicability: high` is a direct, non-inflated classification for the core performance-improvement claim: this is not a theoretical curiosity, it is one of the most commonly used prompting techniques in production LLM applications requiring reasoning.

## Core Contribution

Prior prompting approaches for reasoning tasks typically asked a model to produce a final answer directly, with no worked-through intermediate steps, or relied on task-specific fine-tuning to improve reasoning accuracy. This paper's contribution is showing that simply prompting the model (via a small number of few-shot examples demonstrating step-by-step reasoning) to produce its own chain of intermediate reasoning steps before a final answer substantially improves accuracy on multi-step reasoning benchmarks, with no fine-tuning or architecture change required. Critically, the paper's own experiments show this is an emergent ability of scale: the benefit does not appear at smaller model sizes and only becomes reliable at roughly 100B+ parameters, meaning chain-of-thought prompting is not a universal fix independent of model capability.

## Key Results

- Chain-of-thought prompting with an 540B-parameter PaLM model achieved new state-of-the-art accuracy on the GSM8K math word problem benchmark, surpassing even a fine-tuned GPT-3 model augmented with a verifier at the time (2022) — the paper's most cited headline result
- The paper's own analysis found chain-of-thought prompting provides no positive benefit, and can even hurt performance, for models below roughly 100B parameters, with smaller models producing "fluent but illogical" reasoning chains (2022) — an important, sometimes-overlooked nuance of the paper's own findings
- Manual analysis in the paper found that when the technique failed on GSM8K, calculator/arithmetic errors and one missing reasoning step accounted for a notable share of failures, while a majority of remaining failures involved more substantial semantic misunderstanding (2022) — this specific per-model-generation error breakdown is dated to the models available in 2022 and should not be assumed to describe current-generation model failure modes

## Methodology

Chain-of-thought prompting works by including, within the few-shot examples provided in a prompt, not just a question and its final answer but a full worked-through chain of intermediate reasoning steps leading to that answer (paper Section 2) — the model, seeing this pattern in its few-shot examples, then produces its own chain of reasoning steps before its final answer when given a new question, leveraging the in-context-learning capability established in `brown-2020-gpt3`. No fine-tuning, gradient updates, or architecture changes are involved — this is purely a prompt-construction technique. The paper's scaling analysis (comparing model sizes) is what established the finding that this technique's benefit is scale-dependent rather than universal.

## Practical Applicability

If you are prompting a sufficiently large, capable model (broadly, current frontier-class models, well past the 100B-parameter threshold this paper originally identified) for a task involving multi-step reasoning — math word problems, multi-hop question answering, logical deduction — chain-of-thought prompting (or one of its many direct descendants: zero-shot CoT via "let's think step by step," self-consistency sampling multiple CoT chains, etc.) is the default technique to reach for, and it requires no training or fine-tuning to apply. If you are using a model's chain-of-thought output as an explanation of *why* it produced a particular answer — for debugging, auditing, or building user-facing trust — you should not treat that reasoning trace as a reliable account of the model's actual computation; treat it as a generated artifact to spot-check and stress-test with counterfactuals, not as ground truth about the model's internal decision process.

## Limitations & Critiques

The most significant post-publication finding relevant to this paper's technique — though not to its original performance claim — is that chain-of-thought reasoning traces are frequently unfaithful: subsequent research (including Turpin et al.'s work on biased reasoning, and later 2025-era work explicitly titled "Chain-of-Thought Is Not Explainability") has repeatedly demonstrated that models can produce coherent-sounding reasoning chains that do not reflect their actual internal computation, silently correct mistakes without reflecting the correction in the visible chain, or have their final answer swayed by subtle input biases the visible reasoning chain never mentions. This is an important distinction the original paper does not make any claim about one way or the other (its claim is about task performance, not about explainability), but which matters a great deal for anyone using CoT output as an interpretability or auditing signal rather than purely as a performance-improving technique. The paper's own scope is also limited to the model families and sizes available in 2022; the scale threshold at which the benefit "emerges" is specific to those models and architectures, not a universal constant. No credible challenge to the core performance-improvement claim (CoT prompting improves multi-step reasoning task accuracy at sufficient scale) has been identified as of `last_reviewed: 2026-07-01` — the critique that has emerged targets explainability claims sometimes made using this technique, not the technique's task-performance benefit itself.

## Reproductions & Follow-up Work

Chain-of-thought prompting's core performance benefit has been reproduced across an enormous number of subsequent papers and production systems — it is one of the most widely validated prompting techniques in the field, tracked in dedicated benchmark/comparison repositories like the Chain-of-Thought Hub. Direct extensions within this catalog's own `agents-and-reasoning/` phase include `yao-2022-react` (interleaving reasoning with actions) and `yao-2023-tree-of-thoughts` (extending single-chain reasoning to explicit branching search). The "CoT is not explainability" critique line of work (Barez et al., 2025, and related studies across vision, audio, medical, and legal AI domains) is the most significant recent challenge to a claim adjacent to (but distinct from) this paper's own — it targets the interpretability interpretation of CoT output, not the performance-improvement finding.

## Relation to the Arsenal

This paper builds on `brown-2020-gpt3` (foundational/), specifically leveraging the in-context, few-shot learning capability that paper established, applied here to multi-step reasoning elicitation. It is the foundation this entire `agents-and-reasoning/` phase folder builds on: `yao-2022-react` directly interleaves this paper's reasoning-chain technique with external actions, and `yao-2023-tree-of-thoughts` extends single-chain reasoning into explicit branching search — read this entry first before either of those two.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2201.11903)
- [arXiv](https://arxiv.org/abs/2201.11903)
- [Official Code](https://github.com/FranxYao/chain-of-thought-hub)
- [Venue Proceedings](https://papers.nips.cc/paper_files/paper/2022/hash/9d5609613524ecf4f15af0f7b31abca4-Abstract-Conference.html)
- [Papers With Code](https://paperswithcode.com/paper/chain-of-thought-prompting-elicits-reasoning)
- [Key Reproduction / Analysis](https://aigi.ox.ac.uk/wp-content/uploads/2025/07/Cot_Is_Not_Explainability.pdf) — 2025 analysis directly challenging the use of chain-of-thought output as an explainability/interpretability signal, distinct from (and not challenging) this paper's own task-performance claim
