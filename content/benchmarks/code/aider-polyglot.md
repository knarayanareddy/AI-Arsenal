---
id: aider-polyglot
title: "Aider Polyglot Coding Benchmark"
entry_type: benchmark
category: code
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "How well a model performs real code *editing* — modifying existing files to pass a hidden test suite — across many programming languages, using an agentic edit/apply loop rather than writing a function from scratch."
metrics:
  - name: "percent solved"
    direction: higher
    notes: "Fraction of the 225 exercises whose hidden tests pass after the model edits the provided files (typically with up to two attempts)"
  - name: "edit-format adherence"
    direction: higher
    notes: "Fraction of responses whose diffs applied cleanly; measures whether the model can produce well-formed edits, not just correct logic"
protocol:
  dataset: "225 hard Exercism exercises across C++, Go, Java, JavaScript, Python, and Rust"
  dataset_url: "https://aider.chat/docs/leaderboards/"
  evaluation_setup: "The model must edit existing source files (via Aider's diff/edit formats) so a hidden test suite passes; scored by percent of exercises solved and by how reliably its edits applied."
  version: "polyglot leaderboard (2024-2025, updated per model release)"
leaderboards:
  - name: "Aider LLM leaderboards"
    url: "https://aider.chat/docs/leaderboards/"
    last_checked: "2026-07-08"
known_issues:
  - "Score conflates coding ability with edit-format compliance; a capable model can lose points purely by producing malformed diffs"
  - "Tied to Aider's harness and prompting, so numbers are Aider-specific, not a neutral model property"
  - "Exercism problems are public and contaminable"
  - "Two-attempt protocol and edit formats have changed across versions — compare only within the same leaderboard revision"
recommended_usage:
  - "Use it to compare models for *code-editing agents* specifically, which is closer to real IDE assistant use than function synthesis"
  - "Read both metrics: a high solve rate with low edit adherence means you'll need a robust apply/repair layer"
  - "Prefer it when choosing a backend model for Aider or similar diff-based coding tools"
  - "Compare only scores from the same leaderboard revision and edit format"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: ["aider"]
related_benchmarks: ["swe-bench", "livecodebench", "humaneval"]
enrichment_status: draft
enrichment_notes: "Authored from the Aider polyglot leaderboard docs and Aider-AI/aider repo; URLs verified 2026-07-08."
tags: [evaluation, code-gen, agents, benchmark]
---

## Overview

The Aider Polyglot benchmark measures something most code benchmarks ignore: the ability to *edit* existing code across languages via an agentic loop. It uses 225 of the hardest Exercism exercises in six languages, and the model must modify the provided files (using Aider's diff/edit formats) until a hidden test suite passes. Because it scores both correctness and whether the model's edits applied cleanly, it has become a popular practitioner leaderboard for choosing the backend model of a coding assistant.

## What it Measures (and what it doesn’t)

Measures real code-editing competence — multi-language problem solving plus the discipline to emit well-formed, applicable edits within an agent loop.

Does not measure: repository-scale, multi-file feature work (SWE-bench is closer), long-horizon planning, or model quality independent of Aider's harness and prompting.

## Dataset & Protocol

- **Dataset:** 225 hard Exercism exercises across C++, Go, Java, JavaScript, Python, Rust
- **Dataset URL:** https://aider.chat/docs/leaderboards/
- **Evaluation setup:** edit provided files via Aider's edit formats until hidden tests pass; report percent solved and edit-format adherence, typically with up to two attempts
- **Version:** polyglot leaderboard, updated per model release

## Metrics

- **percent solved** — higher is better — hidden tests pass after editing
- **edit-format adherence** — higher is better — diffs applied cleanly

## How to Run

```bash
pip install aider-install && aider-install
# clone the polyglot benchmark repo referenced in the leaderboard docs
# ./benchmark/benchmark.py --model <model> --edit-format <format>
```

## Known Issues, Leakage & Gaming Risks

- Edit-format compliance is bundled into the score — malformed diffs cost points regardless of logic
- Aider-harness-specific: not a neutral, model-intrinsic measure
- Public Exercism problems are contaminable
- Protocol/edit-format changes across versions break cross-revision comparisons

## How to Interpret Scores

- As of **2026-07-08**, top models solve a large majority of the polyglot set, and the ranking is a widely-cited signal for coding-assistant model choice.
- If a model's edit-adherence is low despite high raw capability, budget for an edit-repair/apply-retry layer in production.
- Because scores are harness-bound, treat them as "best model *for Aider-style editing*," not an absolute coding rank.

## Recommended Usage

- Use when selecting a backend model for diff-based coding agents
- Inspect both metrics before deciding whether you need a robust apply layer
- Compare only within one leaderboard revision/edit format
- Escalate to SWE-bench for multi-file repository tasks

## Related Benchmarks

- [SWE-bench](./swe-bench.md) — repository-level, multi-file issue resolution
- [LiveCodeBench](./livecodebench.md) — contamination-resistant competitive coding
- [HumanEval](./humaneval.md) — self-contained function generation

## Relation to the Arsenal

Code-editing benchmark in the code category; directly relevant to choosing backend models for the code-generation tools and agent projects (including Aider itself) catalogued in the Arsenal.

## Resources

- [Aider LLM leaderboards](https://aider.chat/docs/leaderboards/)
- [Aider-AI/aider repo](https://github.com/Aider-AI/aider)
