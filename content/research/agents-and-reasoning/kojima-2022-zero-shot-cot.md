---
id: kojima-2022-zero-shot-cot
title: "Large Language Models are Zero-Shot Reasoners"
phase: agents-and-reasoning
venue: neurips
year: 2022
authors:
  - "Kojima, T."
  - "Gu, S. S."
  - "Reid, M."
  - "Matsuo, Y."
  - "Iwasawa, Y."
arxiv_id: "2205.11916"
arxiv_url: "https://arxiv.org/abs/2205.11916"
pdf_url: "https://arxiv.org/pdf/2205.11916"
code_url: "https://github.com/kojima-takeshi188/zero_shot_cot"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 6000

tldr: "Appending the single trigger phrase 'Let's think step by step' elicits chain-of-thought reasoning zero-shot — no exemplars needed — showing that reasoning behavior in LLMs is latent and can be unlocked by prompt format alone"
key_contribution: "Demonstrated that chain-of-thought reasoning does not require few-shot exemplars: a two-stage prompt (reasoning trigger, then answer extraction) lifts InstructGPT from 17.7% to 78.7% on MultiArith zero-shot, establishing that CoT is a decodable latent capability rather than in-context imitation"

builds_on:
  - "wei-2022-chain-of-thought"
  - "brown-2020-gpt3"

tags:
  - "reasoning"
  - "research"
  - "llm"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Wei et al. had shown that chain-of-thought reasoning emerges when you show the model worked examples; this paper showed the examples were never the point. A single appended phrase — "Let's think step by step" — followed by a second answer-extraction pass, produces the same reasoning behavior zero-shot, with enormous accuracy gains on arithmetic and symbolic tasks. It reframed CoT from "in-context learning of a format" to "a latent capability you can trigger."

## Why it's in the Arsenal

- It is the cheapest known reasoning intervention: one sentence, no exemplar curation, no fine-tuning — and understanding *why* it works (decoding-path steering, not knowledge injection) is core prompting literacy
- Its two-stage structure (generate reasoning, then extract the answer) is the ancestor of the reasoning/answer separation now built into structured-output and reasoning-model APIs

## Core Contribution

Zero-shot-CoT: stage 1 appends a trigger phrase to elicit free-form reasoning; stage 2 re-prompts with the generated reasoning plus an extraction template to obtain the final answer. The contribution is the finding, not the machinery — task-agnostic, exemplar-free elicitation of multi-step reasoning, demonstrating the capability was latent in the pretrained distribution all along.

## Key Results

- MultiArith with InstructGPT (text-davinci-002): 17.7% → 78.7% accuracy from the trigger phrase alone (2022)
- GSM8K: 10.4% → 40.7% zero-shot, versus 46.9% for hand-crafted few-shot CoT — most of few-shot CoT's gain without any exemplars (2022)
- Gains scale with model size: small models produce fluent-but-wrong chains, mirroring the emergent-ability pattern of few-shot CoT (2022)

## Methodology

Evaluation across 12 benchmarks (arithmetic, symbolic, commonsense, logical) comparing zero-shot, zero-shot-CoT, few-shot, and few-shot-CoT prompting on GPT-3-family and PaLM models, plus an ablation over 8 trigger-phrase templates showing wording matters ("Let's think step by step" beat variants by wide margins).

## Practical Applicability

Directly actionable, with one large caveat: modern instruction-tuned and reasoning models (o-series, R1-style) have this behavior trained in, so the explicit trigger adds little on frontier models and mainly matters for smaller open models and base-model prompting. The durable lessons are that prompt format can unlock latent capabilities, that trigger wording is an empirical (testable) choice, and that reasoning tokens and answer extraction should be separated — all still standard practice.

## Limitations & Critiques

Gains concentrate in multi-step arithmetic/symbolic tasks; commonsense benchmarks showed little improvement. Later work showed generated chains are frequently unfaithful — right answers with wrong reasoning and vice versa — so the chain cannot be read as an explanation. The extraction stage is brittle without structured output. And on current reasoning-trained models the technique is largely subsumed, making it historically foundational rather than a frontier technique.

## Reproductions & Follow-up Work

Among the most-replicated prompting results; the trigger phrase became a cultural artifact. Direct descendants include self-consistency decoding (`wang-2022-self-consistency`), automatic prompt optimization work that rediscovered better triggers, and ultimately reasoning-RL training (`deepseek-ai-2025-r1`) that internalizes the behavior the trigger elicited.

## Relation to the Arsenal

Companion to `wei-2022-chain-of-thought` (agents-and-reasoning/) — few-shot and zero-shot elicitation of the same capability — and background for `wang-2022-self-consistency` and the prompting tips in tips-and-tricks/prompting/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2205.11916)
- [arXiv](https://arxiv.org/abs/2205.11916)
- [Code](https://github.com/kojima-takeshi188/zero_shot_cot)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
