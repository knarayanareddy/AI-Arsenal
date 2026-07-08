---
id: bird-sql
title: "BIRD (Big Bench for Large-Scale Database Grounded Text-to-SQL)"
entry_type: benchmark
category: code
modality: [text, code]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Whether a model can translate a natural-language question into correct, executable SQL over large, messy real-world databases — including the 'dirty data', domain knowledge, and efficiency concerns that earlier academic text-to-SQL sets (e.g. Spider) omitted."
metrics:
  - name: "execution accuracy (EX)"
    direction: higher
    notes: "Fraction of questions whose generated SQL, when executed, returns the same result set as the gold query"
  - name: "valid efficiency score (VES)"
    direction: higher
    notes: "Rewards correct queries that also run efficiently relative to the gold query — penalizes correct-but-slow SQL"
protocol:
  dataset: "BIRD (12,751 question-SQL pairs over 95 large databases spanning 37+ domains, ~33 GB)"
  dataset_url: "https://bird-bench.github.io/"
  evaluation_setup: "Given a question, database schema, and external-knowledge hints, generate SQL; execute it against the database and compare result sets (EX) and runtime (VES). Test databases are held out."
  version: "BIRD (2023) + ongoing leaderboard"
leaderboards:
  - name: "BIRD leaderboard"
    url: "https://bird-bench.github.io/"
    last_checked: "2026-07-08"
known_issues:
  - "Execution accuracy is result-set based, so a semantically wrong query can pass if it coincidentally returns the same rows"
  - "Provided 'external knowledge' hints strongly affect scores; results with vs. without hints are not comparable"
  - "Databases are large and messy by design, so tokenization of schema/values interacts with model context limits"
  - "Public dev set is contaminable; the private test set behind the leaderboard is the trustworthy number"
recommended_usage:
  - "Use it (over Spider) when you need realistic text-to-SQL on large, dirty databases, not clean academic schemas"
  - "Report EX and VES together — correctness without efficiency is a partial result for production analytics"
  - "State whether external-knowledge hints were used; it is one of the biggest score levers"
  - "Validate top models on your own schema — BIRD rank does not guarantee performance on your database"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["humaneval", "swe-bench"]
enrichment_status: draft
enrichment_notes: "Authored from the BIRD paper (arXiv:2305.03111), bird-bench.github.io, and the DAMO-ConvAI repo; URLs verified 2026-07-08."
tags: [evaluation, code-gen, benchmark, llm]
---

## Overview

BIRD (Li et al., 2023) is the text-to-SQL benchmark that moved the field from clean academic schemas toward production reality. Its 12,751 question/SQL pairs run over 95 large databases (~33 GB) across 37+ domains, with the noisy values, domain knowledge, and scale that real analytics databases have. Beyond correctness, it introduces the Valid Efficiency Score, rewarding SQL that is not just right but fast — a concern Spider-era benchmarks ignored. It has become the standard yardstick for natural-language-to-SQL systems.

## What it Measures (and what it doesn’t)

Measures grounded text-to-SQL generation on large, messy databases — schema understanding, value grounding, use of external knowledge, and query efficiency.

Does not measure: multi-turn conversational querying, non-SQL data backends, data-pipeline construction, or correctness beyond matching a result set. It is single-shot question→SQL over a provided database.

## Dataset & Protocol

- **Dataset:** 12,751 question-SQL pairs over 95 databases, 37+ domains, ~33 GB
- **Dataset URL:** https://bird-bench.github.io/
- **Evaluation setup:** execute generated SQL, compare result sets (EX) and runtime (VES); held-out test databases
- **Version:** BIRD (2023) + ongoing leaderboard

## Metrics

- **execution accuracy (EX)** — higher is better — result-set match after execution
- **valid efficiency score (VES)** — higher is better — correctness weighted by runtime efficiency

## How to Run

```bash
git clone https://github.com/AlibabaResearch/DAMO-ConvAI
# cd bird ; follow README to load the databases
# generate SQL per question, then run the EX and VES evaluators against the DBs
```

## Known Issues, Leakage & Gaming Risks

- Result-set matching can pass semantically incorrect queries by coincidence
- External-knowledge hints materially change scores — disclose their use
- Large messy schemas stress context limits and value tokenization
- Dev set contamination is likely; trust the private-test leaderboard

## How to Interpret Scores

- Report EX and VES together: as of **2026-07-08**, top systems reach high execution accuracy while VES lags, showing correct-but-inefficient SQL remains common.
- A big gap between hinted and unhinted runs indicates reliance on provided domain knowledge rather than schema reasoning.
- Because databases are large and dirty, BIRD scores transfer to production far better than Spider scores, but still validate on your own schema.

## Recommended Usage

- Prefer BIRD over Spider for realistic text-to-SQL evaluation
- Track EX and VES jointly for production analytics use cases
- Always disclose external-knowledge-hint usage
- Confirm shortlisted models on your own database schema

## Related Benchmarks

- [HumanEval](./humaneval.md) — general code generation (non-SQL)
- [SWE-bench](./swe-bench.md) — repository-level software engineering tasks

## Relation to the Arsenal

Text-to-SQL benchmark in the code category; informs model selection for data-pipeline, analytics, and RAG-over-structured-data tools and projects in the Arsenal.

## Resources

- [BIRD leaderboard](https://bird-bench.github.io/)
- [DAMO-ConvAI repo (BIRD)](https://github.com/AlibabaResearch/DAMO-ConvAI)
- [BIRD paper — Li et al., 2023](https://arxiv.org/abs/2305.03111)
