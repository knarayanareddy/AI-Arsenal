---
id: chen-2021-codex
title: "Evaluating Large Language Models Trained on Code (Codex / HumanEval)"
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2021
authors:
  - "Chen, M."
  - "Tworek, J."
  - "Jun, H."
  - "Yuan, Q."
  - "et al. (OpenAI)"
arxiv_id: "2107.03374"
arxiv_url: "https://arxiv.org/abs/2107.03374"
pdf_url: "https://arxiv.org/pdf/2107.03374"
code_url: "https://github.com/openai/human-eval"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: foundational
has_code: true
citation_count_approx: 5000

tldr: "Introduced Codex (the model behind GitHub Copilot) and HumanEval with the pass@k metric — establishing execution-based functional correctness, not text similarity, as the way to evaluate code generation"
key_contribution: "Two exports that outlived the model: HumanEval, 164 hand-written programming problems evaluated by running unit tests, and the unbiased pass@k estimator — replacing BLEU-style text matching with 'does the code actually work' as the field's code-eval standard"

builds_on:
  - "brown-2020-gpt3"

tags:
  - "evaluation"
  - "code-gen"
  - "llm"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

This is the paper behind GitHub Copilot — GPT models fine-tuned on public code — but its durable contribution is methodological: code should be evaluated by executing it against tests, and sampling multiple candidates changes what "accuracy" means. HumanEval's 164 hand-written problems (written fresh to avoid training-set contamination) and the numerically-stable pass@k estimator became the default code benchmark and metric for years, and the paper's hand-verified finding that sampling many candidates dramatically raises solve rates prefigured today's best-of-n and agentic retry loops.

## Why it's in the Arsenal

- pass@k and execution-based evaluation are the grammar of every code-model claim you will read; this is where they are defined, including the unbiased estimator most people cite without reading
- Its sampling result — pass@100 far exceeds pass@1 — is the original evidence that generation is search, motivating the sample-and-verify pattern used by coding agents whenever a test oracle exists

## Core Contribution

Three pieces: (1) Codex — GPT fine-tuned on 159GB of Python from public repos; (2) HumanEval — hand-written docstring→function problems with unit tests, evaluated in a sandbox; (3) pass@k defined properly, with an unbiased combinatorial estimator (sample n>k, compute expected fraction of k-subsets containing a pass) replacing the naive biased version. Also an unusually thorough hazard analysis (insecure code, bias, alignment of generated code with buggy prompts).

## Key Results

- Codex-12B: 28.8% pass@1 on HumanEval vs. 0% for GPT-3; 70.2% pass@100 with sampling — the gap that established generation-as-search (2021)
- Repeated sampling with temperature tuned per k beats greedy decoding decisively; mean-log-prob reranking recovers much of pass@100 at pass@1 cost (2021)
- Documented "alignment failure by imitation": conditioned on buggy context, models produce buggier code than they are capable of — an early, concrete miscalibration result (2021)

## Methodology

GPT-3-family models fine-tuned on filtered public Python; evaluation via sandboxed execution of generated function bodies against hand-written unit tests; contamination controlled by writing all problems from scratch; supervised fine-tuning variant (Codex-S) on curated competitive-programming-style data.

## Practical Applicability

Directly operational in three ways: evaluate generated code by running it (the principle behind every serious code eval, CI-gated agent loop, and SWE-bench); report pass@k with the unbiased estimator when sampling; and exploit sample-and-verify wherever you have a cheap oracle — the paper's pass@1→pass@100 gap is the economic argument for retry loops in coding agents. HumanEval itself is now saturated and contaminated, so treat scores on it as a smoke test, not a discriminator (per the benchmark-hygiene guidance in evaluation entries).

## Limitations & Critiques

HumanEval covers short, self-contained, algorithmic Python — nothing about repositories, dependencies, ambiguity, or maintenance, the gap SWE-bench (`jimenez-2023-swe-bench`) was built to close. Its problems leaked into later training corpora, making headline numbers incomparable across model generations. Unit tests are an imperfect oracle (passing ≠ correct or secure), and the paper's own broader-impacts section flags insecure-code generation that later work confirmed.

## Reproductions & Follow-up Work

HumanEval and the pass@k estimator were adopted universally and reproduced constantly (the eval harness is open source); extensions include MBPP, HumanEval+, MultiPL-E (multilingual), and execution-based suites culminating in repository-level benchmarks. The Codex model line itself was productized as Copilot and later absorbed into general frontier models.

## Relation to the Arsenal

The methodological ancestor of `jimenez-2023-swe-bench` (evaluation-and-safety/) and the code-gen project entries; its sample-and-verify economics underpin agent retry-loop guidance in tips-and-tricks/agents-and-orchestration/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2107.03374)
- [arXiv](https://arxiv.org/abs/2107.03374)
- [HumanEval harness](https://github.com/openai/human-eval)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
