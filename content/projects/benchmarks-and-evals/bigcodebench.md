---
id: bigcodebench
name: BigCodeBench
version_tracked: null
artifact_type: dataset
category: evaluation
subcategory: evaluation
description: Code-generation benchmark testing diverse function calls and complex instructions across 139 libraries — the harder successor to HumanEval
github_url: https://github.com/bigcode-project/bigcodebench
license: Apache-2.0
primary_language: Python
org_or_maintainer: BigCode
tags:
  - evaluation
  - code-gen
  - llm
maturity: production
cost_model: open-source
github_stars: 515
github_stars_last_30d: 2
trending_score: 39
last_commit: '2026-01-03'
docs_url: https://bigcode-bench.github.io/
demo_url: null
paper_url: https://arxiv.org/abs/2406.15877
paper_id: null
phase: benchmark-and-eval
domain:
  - language
  - reasoning
relation_to_stack:
  - study-and-reference
health_signals:
  - research-origin
  - org-backed
  - actively-maintained
ecosystem_role:
  - 'The ''HumanEval is saturated'' answer for practical code generation: 1,140 tasks requiring real library usage (pandas, requests, matplotlib across 139 libraries) with branch-coverage test suites, measuring whether models can compose APIs rather than write algorithmic toy functions.'
best_for:
  - You are comparing code models on realistic library-composition tasks — average 5.6 test cases per task with ~99% branch coverage makes pass@k scores far more meaningful than HumanEval's
  - You want both completion and instruction-following variants — BigCodeBench-Complete (docstring-driven) and -Instruct (NL-driven) separate raw coding ability from instruction alignment
avoid_if:
  - You need repo-scale, multi-file evaluation — tasks are single-function; SWE-bench and Terminal-Bench cover repository and operational settings
  - You need contamination-proof scoring for the newest models — the dataset is public and static; LiveCodeBench's rolling problems address recency better
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - swe-bench
  - livecodebench
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (513), primary language, license, and last commit (2026-01-03) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/bigcode-project/bigcodebench
    date: '2026-07-08'
    description: 513 stars on GitHub as of 2026-07-08 (GitHub API)
featured: false
status: active
---

## Overview

A benchmark for code generation with diverse function calls and complex instructions: 1,140 Python tasks that require composing calls across 139 libraries and 7 domains, each verified by rigorous test suites. It was built by the BigCode community (the org behind StarCoder and The Stack) explicitly to replace saturated algorithm-puzzle benchmarks with practically-flavored tasks.

## Why it's in the Arsenal

The 'HumanEval is saturated' answer for practical code generation: 1,140 tasks requiring real library usage (pandas, requests, matplotlib across 139 libraries) with branch-coverage test suites, measuring whether models can compose APIs rather than write algorithmic toy functions. It earns a place in the Arsenal because it directly addresses a recurring decision point: you are comparing code models on realistic library-composition tasks — average 5.6 test cases per task with ~99% branch coverage makes pass@k scores far more meaningful than HumanEval's. See Strengths / Limitations below before adopting it.

## Architecture

Each task couples a natural-language-rich prompt (Complete: full docstring; Instruct: terse instruction; Hard: a curated difficult subset) with a hidden test suite averaging 5.6 cases at ~99% branch coverage, executed in a sandboxed evaluation harness. Scoring is calibrated pass@k; an Evaluation-as-a-Service leaderboard (with Hugging Face-hosted execution) keeps results comparable across submissions.

## Ecosystem Position

Upstream: BigCode's open-governance data/model ecosystem. Competing/complementary: HumanEval/MBPP (predecessors, now saturated), LiveCodeBench (contamination-resistant rolling problems), SWE-bench (repo-level fixes). Model releases from Qwen, DeepSeek and Meta routinely cite BigCodeBench-Hard scores, making it part of the standard code-model report card.

## Getting Started

```bash
pip install bigcodebench
bigcodebench.generate --model <model-id> --split complete --subset hard --backend vllm
bigcodebench.evaluate --split complete --subset hard --samples <generated>.jsonl
```

## Key Use Cases

1. **Scenario**: you are comparing code models on realistic library-composition tasks — average 5.6 test cases per task with ~99% branch coverage makes pass@k scores far more meaningful than HumanEval's
2. **Scenario**: you want both completion and instruction-following variants — BigCodeBench-Complete (docstring-driven) and -Instruct (NL-driven) separate raw coding ability from instruction alignment

## Strengths

- You are comparing code models on realistic library-composition tasks — average 5.6 test cases per task with ~99% branch coverage makes pass@k scores far more meaningful than HumanEval's
- You want both completion and instruction-following variants — BigCodeBench-Complete (docstring-driven) and -Instruct (NL-driven) separate raw coding ability from instruction alignment

## Limitations

- You need repo-scale, multi-file evaluation — tasks are single-function; SWE-bench and Terminal-Bench cover repository and operational settings
- You need contamination-proof scoring for the newest models — the dataset is public and static; LiveCodeBench's rolling problems address recency better

## Relation to the Arsenal

This is a benchmark-and-eval entry: it documents an evaluation, tracing, or observability platform. For job-based tool comparisons (evaluation, tracing, monitoring), see [tools/evaluation-and-observability/](../../tools/evaluation-and-observability/_index.md).

## Resources

- [GitHub](https://github.com/bigcode-project/bigcodebench)
- [Documentation](https://bigcode-bench.github.io/)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (513 stars, last commit 2026-01-03, verified via GitHub API on 2026-07-08)*
