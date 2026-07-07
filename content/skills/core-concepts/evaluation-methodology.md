---
id: "evaluation-methodology"
title: "Evaluation Methodology"
entry_type: "guide"
section: "skills"
description: "How to evaluate LLM systems: golden sets, LLM-as-judge, benchmarks vs task evals, and common pitfalls"
tags:
  - evaluation
  - llm
  - benchmark
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

Evaluation methodology is how you know an LLM system works — and keeps working after every prompt tweak, model upgrade, and retrieval change. It is the skill that separates teams who ship confidently from teams who ship and pray.

## Why It's in the Arsenal

Every other skill in this vertical (prompting, RAG, fine-tuning, agents) is only tunable if you can measure it. Evals are the feedback loop for all of them.

## Key Features

### Core Concepts

- Public benchmarks (MMLU, arena Elo) rank models in general; they say almost nothing about YOUR task — build task evals.
- A golden set is a small, versioned collection of real inputs with known-good outputs; it is the unit test suite of LLM systems.
- LLM-as-judge scales grading of open-ended outputs but has biases (position, verbosity, self-preference) — calibrate against human labels before trusting it.
- Deterministic checks (schema validity, required fields, exact facts, refusal correctness) are cheaper and more trustworthy than judged scores; use them wherever possible.
- Contamination: models may have trained on public test sets — treat suspiciously high benchmark scores accordingly.

### Practical Workflow

1. Collect 50-200 real examples; label expected outcomes; version the dataset.
2. Layer checks: deterministic assertions first, then judged criteria for the subjective remainder.
3. Run evals on every prompt/model/pipeline change — wire them into CI.
4. Add every production bug as a new eval case (regression tests for behavior).
5. Track results over time; a score without history is a vibe.

## Architecture / How It Works

An eval harness maps (input, expected) pairs through your actual pipeline, applies scorers, and aggregates. The hard engineering is in scorer design — decomposing "good answer" into checkable criteria — and in keeping the eval data honestly separated from anything used for prompting or tuning.

## Getting Started

```text
Minimum viable eval stack:
- golden set: 50 real cases in a versioned JSONL file
- scorers: JSON-schema check + 2-3 binary judged criteria
- gate: run on every PR that touches prompts or pipeline code
- report: pass-rate trend, not a single number
```

## Use Cases

1. **Scenario**: Deciding whether a cheaper model can replace the current one without quality loss
2. **Scenario**: Catching a prompt "improvement" that fixes one case and breaks five
3. **Scenario**: Grading RAG output for faithfulness to retrieved context

## Strengths

- Converts subjective quality arguments into evidence
- Small golden sets deliver most of the value at low cost
- Compounds: every incident becomes a permanent regression test

## Limitations / When NOT to Use

- Evals measure what you encode; blind spots persist until a failure reveals them
- Judge models drift with model versions — pin and re-calibrate
- Offline evals do not replace production monitoring; pair with tracing

## Integration Patterns

- Choose tooling via [choose an eval framework](../../architectures/evaluation-strategy/choose-eval-framework.md); [Ragas](../../projects/benchmarks-and-evals/ragas-rag-evaluation.md) covers RAG-specific metrics.
- Apply [use golden questions for every bug fix](../../tips-and-tricks/evaluation/use-golden-questions-for-every-bug-fix.md) and [version your eval datasets](../../tips-and-tricks/evaluation/version-your-eval-datasets.md).
- Read [LLM-as-a-judge](../../research/evaluation-and-safety/zheng-2023-llm-as-a-judge.md) before automating grading.

## Resources

- [LLM-as-a-judge paper](../../research/evaluation-and-safety/zheng-2023-llm-as-a-judge.md)
- [Ragas paper](../../research/evaluation-and-safety/es-2023-ragas.md)
- [Add evals before refactors](../../tips-and-tricks/evaluation/add-evals-before-refactors.md)
- [Choose an eval framework](../../architectures/evaluation-strategy/choose-eval-framework.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-07-07 by @maintainer*
