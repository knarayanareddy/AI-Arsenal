---
id: zheng-2023-llm-as-a-judge
title: "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"
phase: evaluation-and-safety
venue: neurips
year: 2023
authors:
  - "Zheng, L."
  - "Chiang, W.-L."
  - "Sheng, Y."
  - "Zhuang, S."
  - "et al."
arxiv_id: "2306.05685"
arxiv_url: "https://arxiv.org/abs/2306.05685"
pdf_url: "https://arxiv.org/pdf/2306.05685"
code_url: "https://github.com/lm-sys/FastChat"
venue_url: "https://papers.nips.cc/paper_files/paper/2023/hash/91f18a1287b398d378ef22505bf41832-Abstract-Datasets_and_Benchmarks.html"

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 5000

tldr: "Showed strong LLM judges agree with human judgments over 80% of the time, matching human-human agreement -- use LLM-as-judge for scalable open-ended evaluation, but mitigate its documented position, verbosity, and self-enhancement biases"
key_contribution: "Demonstrated that strong LLM judges achieve over 80% agreement with human preference judgments (the same level of agreement humans have with each other), validating LLM-as-judge as a scalable substitute for expensive human evaluation, while also documenting specific, named biases (position, verbosity, self-enhancement) the technique is prone to"

builds_on: []
implemented_in: []

tags:
  - evaluation
  - llm
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: verified
---

## Overview

This paper showed that strong LLM judges (the paper's own experiments used GPT-4) agree with human preference judgments over 80% of the time — the same level of agreement humans have with each other — establishing LLM-as-judge as a scalable, validated substitute for expensive human evaluation of open-ended chat model outputs. This remains current, dominant practice: LLM-as-judge is the default open-ended evaluation technique across the field, directly underlying evaluation tools cataloged elsewhere in this vertical (opik, deepeval, ragas), though the paper's own documented biases (position, verbosity, self-enhancement) remain real, unresolved caveats that must be actively mitigated, not just acknowledged.

## Why it's in the Arsenal

- LLM-as-judge is the dominant technique for evaluating open-ended LLM outputs at scale — human evaluation doesn't scale to the volume of comparisons needed for iterative development, and this paper is the primary evidence justifying LLM judges as a valid substitute, not just a convenient shortcut.
- `practical_applicability: high` is direct and non-inflated: nearly every production LLM evaluation pipeline in this catalog's tooling uses some form of LLM-as-judge, making this one of the most operationally central papers in the entire evaluation-and-safety phase.

## Core Contribution

Prior to this paper, evaluating open-ended chat model quality required either expensive, slow human evaluation or narrow, automatic metrics (like BLEU or ROUGE) that correlate poorly with actual human preference for conversational quality. This paper's contribution is a rigorous validation of using a strong LLM itself as a judge — presenting it with model outputs and asking it to score or compare them — by directly measuring how often the LLM judge's verdict agrees with human judges' verdicts on the same comparisons, finding over 80% agreement, matching typical human-human inter-rater agreement. In engineering terms: this paper is the reason "just have GPT-4 (or an equivalent strong model) score the outputs" became a defensible, validated evaluation methodology rather than an ad hoc shortcut, while also being explicit and specific about the technique's documented failure modes so practitioners know what to guard against.

## Key Results

- Strong LLM judges (GPT-4 in the paper's experiments) achieved over 80% agreement with both controlled and crowdsourced human preference judgments (2023) — the paper's central validating claim, and the number most frequently cited to justify LLM-as-judge as a methodology
- This 80%+ agreement rate is reported by the paper as comparable to the level of agreement between different human judges on the same task (2023) — the specific comparison that elevates this from "LLM judges are somewhat useful" to "LLM judges are approximately as reliable as adding another human judge"
- The paper released MT-Bench (a curated multi-turn question set) and Chatbot Arena (a crowdsourced, anonymous head-to-head comparison platform) alongside 3K expert votes and 30K human-preference conversations as public resources (2023) — Chatbot Arena in particular has since become an ongoing, continuously updated public benchmark rather than a one-time paper artifact, constituting continuous, live, large-scale validation of the broader LLM-evaluation ecosystem this paper helped establish

## Methodology

The paper evaluates LLM-as-judge in two complementary ways (paper Section 3): first, using MT-Bench, a curated set of challenging, multi-turn open-ended questions designed to differentiate models on reasoning, writing, and instruction-following ability, with a strong LLM (GPT-4) scoring or comparing model responses, checked against separately collected human preference judgments on the same responses; second, using Chatbot Arena, a live, crowdsourced platform where real users engage in blind, randomized head-to-head comparisons between two anonymous chatbots and vote on which response they prefer, providing a much larger and more naturalistic dataset of human preferences to validate LLM-judge agreement against. The paper explicitly identifies and analyzes specific bias categories the LLM-as-judge technique exhibits: position bias (favoring whichever response is presented first or second, independent of quality), verbosity bias (favoring longer responses even when they aren't better), and self-enhancement bias (a model favoring its own outputs over other models' outputs when used to judge a comparison including its own generations) — and proposes specific mitigations for each, including randomizing response order to cancel out position bias and using multiple judge models to reduce self-enhancement effects.

## Practical Applicability

If you need to evaluate open-ended LLM output quality at any meaningful scale — comparing prompt variants, model versions, or fine-tuning checkpoints — LLM-as-judge is the validated, scalable default technique this paper established, and it's directly implemented in this catalog's evaluation tooling (`opik`, `deepeval`, and the RAG-specific evaluation approach in `ragas-paper`/`ragas-rag-evaluation`) rather than something you need to build from scratch. You must actively apply this paper's own documented bias mitigations rather than assuming a naive "ask GPT-4 to score this" implementation is unbiased: randomize response order to control for position bias, be skeptical of length-correlated quality judgments (verbosity bias), and avoid or specifically account for a model judging its own outputs (self-enhancement bias) — these are not edge cases, they are the paper's own headline caveats, and ignoring them is a common and avoidable evaluation mistake.

## Limitations & Critiques

The paper is unusually transparent about its own technique's limitations, naming and analyzing position bias, verbosity bias, self-enhancement bias, and limited reasoning ability directly in its own text rather than leaving these to be discovered by later critics — but the paper's own proposed mitigations (position randomization, using multiple judges) reduce rather than eliminate these biases, meaning practitioners must remain vigilant even when following the paper's own recommendations. Subsequent research beyond this paper's own scope has continued to document and analyze these same bias categories in more depth (e.g. work specifically on self-preference bias finding LLM evaluators can recognize and favor their own generations even under conditions designed to obscure authorship) — this is confirmation and extension of the original paper's own documented concerns, not a challenge to its core validating claim (LLM judges achieve high agreement with humans on average). No credible failed-replication challenge to the paper's central 80%+ agreement claim has been identified as of `last_reviewed: 2026-07-01` — the ongoing research direction is refining bias mitigation, not disputing whether the core technique works.

## Reproductions & Follow-up Work

Chatbot Arena, released alongside this paper, has become an ongoing, continuously operated, large-scale public benchmark rather than a static one-time research artifact — constituting continuous, live validation of the broader human-preference-measurement ecosystem this paper helped establish, at a scale far beyond what a traditional academic reproduction study could achieve. MT-Bench and its associated evaluation code are integrated into the FastChat codebase and widely used as a standard evaluation harness in subsequent model releases and research. Follow-up bias-focused research (including dedicated work on self-preference bias in LLM evaluators) has extended and confirmed this paper's own documented bias concerns in more depth, representing refinement of the original findings rather than a challenge to them.

## Relation to the Arsenal

This paper does not build on another entry in this catalog's research vertical (it introduces LLM-as-judge largely as a standalone evaluation methodology contribution), but it is the direct methodological foundation for `es-2023-ragas` (this phase folder), which applies related evaluation principles specifically to RAG pipeline quality, and for this catalog's evaluation tooling more broadly (`opik`, `deepeval`, `ragas-rag-evaluation` project entries all build on LLM-as-judge-style evaluation in some form). Read this entry first before `es-2023-ragas`, since RAGAS's reference-free metrics build on the general validity of using an LLM to judge quality that this paper establishes.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2306.05685)
- [arXiv](https://arxiv.org/abs/2306.05685)
- [Official Code](https://github.com/lm-sys/FastChat)
- [Venue Proceedings](https://papers.nips.cc/paper_files/paper/2023/hash/91f18a1287b398d378ef22505bf41832-Abstract-Datasets_and_Benchmarks.html)
- [Papers With Code](https://paperswithcode.com/paper/judging-llm-as-a-judge-with-mt-bench-and)
- [Key Reproduction / Analysis](https://lmarena.ai/) — Chatbot Arena's live, continuously operated successor platform, an ongoing large-scale real-world validation of the human-preference-measurement approach this paper established
