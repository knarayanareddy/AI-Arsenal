---
id: wei-2023-jailbroken
title: "Jailbroken: How Does LLM Safety Training Fail?"
phase: evaluation-and-safety
venue: neurips
year: 2023
authors:
  - "Wei, A."
  - "Haghtalab, N."
  - "Steinhardt, J."
arxiv_id: "2307.02483"
arxiv_url: "https://arxiv.org/abs/2307.02483"
pdf_url: "https://arxiv.org/pdf/2307.02483"
code_url: null
venue_url: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/fd6613131889a4b656206c50a8bd7790-Abstract-Conference.html"

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: false
citation_count_approx: 1500

tldr: "Explained why jailbreaks work via two failure modes — competing objectives (helpfulness vs safety) and mismatched generalization (safety training doesn't cover what pretraining can do) — and showed scale alone won't fix them; the conceptual framework behind LLM red-teaming"
key_contribution: "Provided the first principled taxonomy of jailbreak root causes: safety objectives competing with capability objectives (prefix-injection, refusal-suppression) and safety training failing to generalize across domains pretraining covers (base64, ciphers) — validated by new attacks succeeding on 96%+ of harmful prompts against GPT-4 and Claude v1.3"

builds_on:
  - "ouyang-2022-instructgpt"
  - "bai-2022-constitutional-ai"

tags:
  - "security"
  - "guardrails"
  - "evaluation"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Rather than cataloging jailbreak tricks, this paper asks why safety-trained models remain vulnerable and answers with two mechanisms: competing objectives — pretraining/instruction-following pressure and safety training pull in opposite directions, so prompts that make refusal 'expensive' (forcing a compliant prefix, forbidding refusal words) win; and mismatched generalization — pretraining grants capabilities (base64, ciphers, low-resource languages) that safety training never covered, creating unguarded paths to harmful behavior. New attacks designed from these principles defeated GPT-4 and Claude v1.3 on essentially all tested harmful prompts.

## Why it's in the Arsenal

- Every guardrail product and red-teaming tool in this catalog is engineering against exactly these two failure modes — the paper supplies the causal model that turns jailbreak whack-a-mole into a design discipline
- Its 'safety-capability parity' argument (safety mechanisms must be as capable as the model they guard) is the standing design principle behind classifier-based defenses and remains the frame for evaluating them

## Core Contribution

The two-failure-mode taxonomy itself, plus the demonstration that it is generative: attacks derived from the framework (combination attacks stacking prefix-injection, refusal suppression, and encoding) reached ~96-100% success on a curated harmful-prompt set, outperforming ad-hoc jailbreaks from the wild. The paper's conceptual conclusion — these are training-objective problems, so scaling model size does not resolve them and can worsen mismatched generalization by adding uncovered capabilities — reframed jailbreak robustness as requiring safety mechanisms as sophisticated as the underlying model ('safety-capability parity').

## Key Results

- Combination attacks constructed from the two principles succeeded on 96%+ of curated harmful prompts against GPT-4 and Claude v1.3, versus much lower rates for previously known ad-hoc jailbreaks (paper Table 1, 2023)
- Base64-encoded harmful requests — trivially decodable by GPT-4 but absent from safety training — bypassed refusals, isolating mismatched generalization experimentally (2023)
- Attack effectiveness persisted across both RLHF-trained (GPT-4) and constitutional-AI-trained (Claude) models, indicating the failure modes are properties of the safety-training paradigm rather than one vendor's recipe (2023)

## Methodology

A curated set of harmful prompts (drawn from red-teaming guidelines) is run against GPT-4, GPT-3.5, and Claude v1.3 under ~30 attack conditions: existing wild jailbreaks, plus principle-derived attacks (prefix injection, refusal suppression, base64 and other encodings, style/persona constraints, and combinations). Outcomes are labeled good bot / bad bot / unclear by human review, and results are analyzed per failure mode with ablations separating each mechanism's contribution.

## Practical Applicability

For anyone shipping LLM features, the taxonomy converts directly into a red-team checklist: test refusal-suppression and compliant-prefix framings (competing objectives), and test encodings, translations, and formats your safety layer never saw (mismatched generalization). It also explains the defense architecture the industry converged on — input/output classifiers and constitutional classifiers exist precisely because in-model safety training alone cannot achieve safety-capability parity; guardrail tools in this catalog operationalize that lesson.

## Limitations & Critiques

Evaluation predates current frontier models and modern layered defenses; absolute attack-success numbers are historical, and several specific attacks (raw base64) are now patched — though the failure modes themselves demonstrably persist in successor attacks. The harmful-prompt set is small and curated; success labeling is manual; and the paper offers a diagnosis, not a defense — it demonstrates why the problem is hard rather than solving it, and adaptive attacks against the defenses it inspired remain an active arms race.

## Reproductions & Follow-up Work

Reproduced and extended heavily: automated jailbreak generation (GCG's adversarial suffixes, PAIR, TAP), standardized robustness benchmarks (HarmBench, JailbreakBench), and defense work (Constitutional Classifiers, prompt-injection hierarchies) all build on its failure-mode framing. Low-resource-language jailbreaks confirmed mismatched generalization at scale. It remains the standard citation for why safety fine-tuning is insufficient by construction.

## Relation to the Arsenal

Diagnoses the failure modes of the alignment methods documented in `ouyang-2022-instructgpt` and `bai-2022-constitutional-ai` (training-and-alignment/); supplies the threat model for the security-and-guardrails tooling in tools/by-job/security-and-guardrails and for red-teaming projects in projects/agent-systems/ (e.g. penetration-testing agents like `strix`).

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2307.02483)
- [arXiv](https://arxiv.org/abs/2307.02483)
- [Venue](https://proceedings.neurips.cc/paper_files/paper/2023/hash/fd6613131889a4b656206c50a8bd7790-Abstract-Conference.html)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
