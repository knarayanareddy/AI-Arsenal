---
id: natural-questions
title: "Natural Questions"
entry_type: benchmark
category: retrieval-rag
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Open-domain question answering over Wikipedia — 323K real Google Search queries with long and short human-written answers."
metrics:
  - name: "exact_match"
    direction: higher
    notes: "EM over short answers"
  - name: "f1"
    direction: higher
    notes: "Token-level F1 over short answers"
protocol:
  dataset: "Natural Questions (Google, 2019)"
  dataset_url: "https://github.com/google-research-datasets/natural-questions"
  evaluation_setup: "Open-domain QA over the full Wikipedia dump. Standard protocol scores short answers with exact-match (EM) and token-level F1; the open-retrieval variant (OpenNQ) requires retrieving the evidence passage before answering."
  version: null
leaderboards:
  - name: "Papers With Code — Natural Questions"
    url: "https://paperswithcode.com/dataset/natural-questions"
    last_checked: "2026-07-06"
  - name: "Natural Questions — Google Research"
    url: "https://ai.google.com/research/NaturalQuestions"
    last_checked: "2026-07-06"
known_issues:
  - "Released in 2019 and now widely incorporated into pretraining and fine-tuning corpora — contamination risk is high and largely unmeasured"
  - "Closed-book (answer from model parameters) vs open-book / RAG (retrieve then answer) are fundamentally different protocols — EM/F1 are not comparable across them"
  - "Long-answer (ROUGE) and short-answer (EM/F1) are different tasks; mixing them misleads comparisons"
  - "Answers are derived from Wikipedia — English-only and biased to Wikipedia coverage and 2018-and-earlier recency"
  - "OpenNQ (open-retrieval) adds a retrieval step; reported scores conflate retriever and reader quality unless isolated"
recommended_usage:
  - "Use to measure open-domain QA capability; always state closed-book vs open-book (RAG) protocol"
  - "Report EM and F1 separately, plus the answer-type split"
  - "Pair with a retrieval benchmark (e.g. BEIR) to separate reader skill from retriever quality"
  - "Re-check the live Papers With Code leaderboard before citing any 'SOTA' — rankings shift"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [beir]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official Google Research dataset repo and the Papers With Code / Google Research leaderboards. Contamination and protocol-variant notes emphasized per expansion-PR policy."
tags: [evaluation, retrieval, rag, benchmark]
---

## Overview

Natural Questions (NQ) is Google's open-domain QA dataset built from real anonymized Google Search queries, each paired with a Wikipedia page and human-written long and short answers. It is the de-facto standard for measuring both closed-book knowledge and retrieve-then-read (RAG) QA.

## What it Measures (and what it doesn’t)

Measures: the ability to answer real web queries, either from parameters (closed-book) or from a retrieved Wikipedia passage (open-book / RAG), scored by exact-match and token-level F1.

Does not measure: multilingual QA, recency/post-2018 facts, multi-hop reasoning depth beyond a single passage, or end-to-end RAG faithfulness.

## Dataset & Protocol

- **Dataset:** Natural Questions — 323K questions, Wikipedia-derived
- **Dataset URL:** https://github.com/google-research-datasets/natural-questions
- **Evaluation setup:** short-answer EM/F1 over the full Wikipedia dump; open-retrieval (OpenNQ) requires retrieving the evidence passage first
- **Version:** – (long-answer and short-answer variants)

## Metrics

- **exact_match** — higher is better — EM over short answers
- **f1** — higher is better — token-level F1 over short answers

## How to Run

```bash
# Official Natural Questions evaluation scorer
git clone https://github.com/google-research-datasets/natural-questions
# See nq_eval/ for the canonical EM/F1 scorer.
```

## Known Issues, Leakage & Gaming Risks

- 2019 release widely reused in pretraining/fine-tuning — contamination risk
- Closed-book vs open-book/RAG are different protocols — EM/F1 not comparable
- Long-answer (ROUGE) vs short-answer (EM/F1) are different tasks
- Wikipedia-only — English, biased to Wikipedia coverage and pre-2018 recency
- OpenNQ conflates retriever and reader quality unless isolated

## How to Interpret Scores

- Open-domain EM ranges widely by protocol: closed-book is far lower than retrieve-then-read RAG
- A 1-2 point EM gap is often within eval noise at the top — do not over-interpret
- Always state the protocol (closed-book vs RAG, long vs short answer)
- Good NQ does not guarantee good RAG on your corpus — run an in-domain eval

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **Papers With Code — Natural Questions (open-domain)** leaderboard for **Natural Questions** (protocol: **open-domain, EM over full Wikipedia**) shows strong RAG pipelines in the **~45-60% EM** range — e.g., Llama3-ChatQA-1.5-70B reported **47.0% EM** (zero-shot, 2024) and DPR+FiD variants exceed **59% EM**. This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Measure open-domain QA; always state closed-book vs open-book (RAG)
- Report EM and F1 separately, plus answer-type split
- Pair with BEIR to separate reader skill from retriever quality
- Re-check the live leaderboard before citing any 'SOTA'

## Related Benchmarks

- [BEIR](./beir.md) — zero-shot retrieval generalization (complements reader-vs-retriever analysis)

## Relation to the Arsenal

Retrieval / RAG evaluation benchmark. Complements RAG projects in `content/projects/data-and-retrieval/`, RAG tips in `content/tips-and-tricks/rag-and-retrieval/`, and evaluation tooling.

## Resources

- [Dataset – GitHub (google-research-datasets/natural-questions)](https://github.com/google-research-datasets/natural-questions)
- [Natural Questions – Google Research](https://ai.google.com/research/NaturalQuestions)
- [Papers With Code – Natural Questions](https://paperswithcode.com/dataset/natural-questions)
- Paper: Kwiatkowski et al., "Natural Questions: A Benchmark for Question Answering Research", TACL 2019

---

*Last reviewed: 2026-07-06 by @maintainer*
