---
id: huang-2023-hallucination-survey
title: "A Survey on Hallucination in Large Language Models: Principles, Taxonomy, Challenges, and Open Questions"
phase: surveys
venue: other
year: 2023
authors:
  - "Huang, L."
  - "Yu, W."
  - "Ma, W."
  - "Zhong, W."
  - "Feng, Z."
  - "Wang, H."
  - "Chen, Q."
  - "Peng, W."
  - "Feng, X."
  - "Qin, B."
  - "Liu, T."
arxiv_id: "2311.05232"
arxiv_url: "https://arxiv.org/abs/2311.05232"
pdf_url: "https://arxiv.org/pdf/2311.05232"
code_url: "https://github.com/LuckyyySTA/Awesome-LLM-hallucination"
venue_url: "https://dl.acm.org/doi/10.1145/3703155"

practical_applicability: high
reproduction_status: no-code
result_status: current
has_code: true
citation_count_approx: 2000

tldr: "The reference taxonomy for hallucination: splits it into factuality vs faithfulness, traces causes through data, training, and inference, and catalogs detection benchmarks and mitigation strategies — the structured map behind grounding and guardrail engineering"
key_contribution: "Defined the now-standard factuality-hallucination (output contradicts or fabricates world knowledge) versus faithfulness-hallucination (output contradicts provided context or instructions) distinction, with a causal analysis spanning data, training, and inference stages and a systematic review of detection benchmarks and mitigations per cause"

builds_on:
  - "brown-2020-gpt3"

tags:
  - "evaluation"
  - "guardrails"
  - "llm"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

This survey (arXiv 2023, published in ACM TOIS 2025) systematizes LLM hallucination end to end: definition — refining the classic intrinsic/extrinsic split into factuality hallucinations (conflicts with verifiable world knowledge) and faithfulness hallucinations (conflicts with user instructions or provided context); causes — flawed or missing data knowledge, architectural and exposure-bias issues in training, and decoding randomness or attention decay at inference; detection — benchmarks and methods for both types; and mitigation — organized by which cause each addresses, from data curation and RLHF variants to retrieval augmentation and decoding interventions.

## Why it's in the Arsenal

- Hallucination is the operating risk every production LLM system manages, and this survey's factuality/faithfulness split is the load-bearing distinction: RAG grounding, faithfulness metrics (RAGAS-style), and citation-checking tools each target one side, and conflating them produces mis-aimed mitigations
- Its cause taxonomy (data, training, inference) maps mitigations to root causes — the difference between adding a reranker and adding a decoding constraint — which is exactly the engineering decision structure

## Core Contribution

Two structural moves the field adopted: (1) the factuality/faithfulness bifurcation, which cleanly separates 'the model doesn't know' from 'the model ignored what it was given' — different phenomena with different detectors and fixes; and (2) cause-aligned mitigation review, which organizes the sprawling countermeasure literature (curation, editing, RAG, decoding constraints, self-consistency) by mechanism rather than by publication order, making it usable as an engineering decision aid rather than a reading list.

## Key Results

- Established the two-type taxonomy with sub-types (factual contradiction vs fabrication; instruction, context, and logical inconsistency) now used across the evaluation literature (survey Section 2, 2023)
- Traced hallucination causally through the LLM lifecycle — pretraining data (misinformation, knowledge gaps, biases), training (exposure bias, capability misalignment from RLHF), inference (sampling randomness, softmax bottleneck, attention decay over long context) (2023)
- Cataloged detection benchmarks (TruthfulQA, FActScore, HaluEval lineage) and matched mitigation families to causes, including analysis of when RAG helps (knowledge gaps) versus doesn't (faithfulness failures persist with perfect retrieval) (2023)

## Methodology

Systematic survey: definitions are fixed first with worked examples per hallucination sub-type; causes are analyzed per lifecycle stage with supporting empirical literature; detection methods are classified by target (fact-checking against external knowledge vs consistency/uncertainty-based internal signals); mitigations are reviewed against the cause taxonomy; open challenges (hallucination in long-form generation, self-verification limits, knowledge boundaries) close the analysis. A maintained companion reading list tracks the area.

## Practical Applicability

The taxonomy is directly operational: production grounding failures split into retrieval problems (factuality side — fix knowledge access) and generation problems (faithfulness side — the model contradicts retrieved context, requiring faithfulness metrics, citation enforcement, or entailment checking, not better retrieval). Evaluation stacks in this catalog implement exactly this split (context-adherence vs correctness metrics), and the survey's inference-stage causes explain practitioner observations like hallucination increasing with context length and temperature.

## Limitations & Critiques

It predates the strongest recent results it would need to cover: reasoning-model hallucination dynamics, abstention training, and the 2025-era work formalizing why calibrated models must sometimes hallucinate under current training objectives (OpenAI's 'why language models hallucinate' line), so its mitigation frontier is dated. As with most surveys, it catalogs without benchmarking — few controlled comparisons across mitigations — and its faithfulness sub-taxonomy overlaps awkwardly with instruction-following evaluation, a boundary the field still hasn't settled.

## Reproductions & Follow-up Work

Published in ACM TOIS (2025) after wide citation as a preprint; its taxonomy structures subsequent hallucination benchmarks and surveys, and the factuality/faithfulness vocabulary is embedded in evaluation frameworks and observability products. Follow-up research it frames includes uncertainty-based detection (semantic entropy), abstention/refusal training, and domain-specific hallucination suites (medical, legal, code).

## Relation to the Arsenal

Supplies the risk taxonomy behind this catalog's evaluation and guardrails coverage: faithfulness metrics in `es-2023-ragas` (evaluation-and-safety/) operationalize its faithfulness side, RAG entries (`lewis-2020-rag`, `gao-2023-rag-survey`) are its principal factuality mitigation, and the observability/eval tooling in tools/evaluation-and-observability/ ships detectors for both hallucination types it defines.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2311.05232)
- [arXiv](https://arxiv.org/abs/2311.05232)
- [Code](https://github.com/LuckyyySTA/Awesome-LLM-hallucination)
- [Venue](https://dl.acm.org/doi/10.1145/3703155)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
