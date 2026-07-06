---
id: "example-benchmark"
title: "Example Benchmark"
entry_type: benchmark
category: general-llm
modality:
  - text
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "What capability this benchmark measures, 1-2 sentences"
metrics:
  - name: "accuracy"
    direction: higher
    notes: "optional metric notes"
protocol:
  dataset: "Dataset Name"
  dataset_url: "https://example.com/dataset"
  evaluation_setup: "Few-shot / CoT / tool-use rules – be explicit – what must an evaluator do to get comparable numbers?"
  version: null
leaderboards:
  - name: "Official Leaderboard"
    url: "https://example.com/leaderboard"
    last_checked: "2026-06-13"
known_issues:
  - "Leakage / contamination / gaming risk – must not be empty"
  - "Second known issue"
recommended_usage:
  - "How to use this benchmark responsibly – must not be empty"
  - "Second usage recommendation"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: []
last_reviewed: "2026-06-13"
enrichment_status: draft
enrichment_notes: null
tags: [evaluation]
---

## Overview

One paragraph: what is this benchmark, who runs it, why it exists.

## What it Measures (and what it doesn’t)

- Measures: …
- Does not measure: …

Be explicit about scope boundaries.

## Dataset & Protocol

- **Dataset:** …
- **Dataset URL:** https://example.com/dataset
- **Evaluation setup:** few-shot / CoT / tool-use rules – be explicit
- **Version:** …

## Metrics

- **metric_name** — higher/lower is better — what it means

## How to Run

```bash
# Concrete command or harness reference – must include at least one runnable snippet
# e.g. git clone … / pip install … / lm_eval --tasks …
```

## Known Issues, Leakage & Gaming Risks

- Issue 1 – leakage / contamination / protocol ambiguity – must not be empty
- Issue 2
- Issue 3

This section must be specific – never leave empty.

## How to Interpret Scores

- Interpretation guidance bullet 1
- Interpretation guidance bullet 2
- Interpretation guidance bullet 3 – minimum 3 bullets required

**SOTA-safe wording – mandatory if mentioning top models:**

> As of **YYYY-MM-DD**, the **{leaderboard_name}** leaderboard for **{benchmark_name}** (protocol: **{protocol_variant}**) shows **{model_name}** at **{score}**. This is a **snapshot**, not a stable ranking.

Never write: "{model} is the best on {benchmark}" without date + leaderboard + protocol.

## Recommended Usage

- How to use this benchmark responsibly
- How NOT to misuse scores
- Pair with which other benchmarks

Minimum 1 bullet, preferably 3+.

## Related Benchmarks

- [Related Benchmark](./related-benchmark-id.md) – why it's related

If none, write: *No closely related benchmarks in the Arsenal yet.*

## Relation to the Arsenal

How does this benchmark fit into the broader AI Arsenal? Link to relevant tools, projects, papers, architectures, tips.

Example: "Use this benchmark alongside the evaluation tools in `content/tools/evaluation-and-observability/` and the evaluation-strategy guides in `content/architectures/evaluation-strategy/`."

## Resources

- [Dataset](https://example.com/dataset)
- [Leaderboard](https://example.com/leaderboard)
- [Paper](https://arxiv.org/abs/XXXX.XXXXX)
- [Evaluation Harness](https://github.com/example/harness)

---
*Last reviewed: 2026-06-13 by @github-username*
