---
id: gaia
title: "GAIA"
entry_type: benchmark
category: agents
modality: [text, code, multimodal]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "General AI assistant capability – multi-step reasoning, web browsing, file handling, and tool use on real-world tasks that are conceptually simple for humans."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "Exact match, 3 difficulty levels reported separately"
protocol:
  dataset: "GAIA"
  dataset_url: "https://huggingface.co/datasets/gaia-benchmark/GAIA"
  evaluation_setup: "Agent with tool access (web browser, code interpreter, file readers). 0-shot. 466 questions total – 165 validation (public), 300 test (held-out, via leaderboard submission). Exact match accuracy."
  version: null
leaderboards:
  - name: "GAIA Leaderboard – Hugging Face"
    url: "https://huggingface.co/spaces/gaia-benchmark/leaderboard"
    last_checked: "2026-07-06"
known_issues:
  - "Small test set – 300 test questions across 3 levels – variance is non-trivial"
  - "Web-dependent tasks can break when target websites change – results are not perfectly reproducible over time"
  - "Human baseline is ~92% – top agents were ~65-67% in 2024-2025, rapidly improving"
  - "Leaderboard submissions are not always independently verified – check the methodology notes per submission"
recommended_usage:
  - "Use to compare end-to-end agent systems, not base LLMs"
  - "Report Level 1/2/3 breakdown separately – aggregate accuracy hides capability gaps"
  - "Run against the public validation split for development; reserve test split for final reporting via the official leaderboard"
  - "Pair with a domain-specific agent benchmark if your use case is narrow"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: []
enrichment_status: reviewed
tags: [evaluation, agents, benchmark, reasoning]
---

## Overview

GAIA is a benchmark for General AI Assistants – 466 real-world questions requiring multi-step reasoning, web browsing, file handling (PDFs, spreadsheets, images), and code execution. Conceptually simple for humans (~92% accuracy), hard for agents.

## What it Measures (and what it doesn’t)

Measures: end-to-end agent capability – tool use, web browsing, multimodal file handling, multi-step planning.

Does not measure: base LLM knowledge alone (tools are required), coding in isolation, safety, or instruction-following precision.

## Dataset & Protocol

- **Dataset:** GAIA – 466 questions, 3 difficulty levels
- **Dataset URL:** https://huggingface.co/datasets/gaia-benchmark/GAIA
- **Evaluation setup:** Agent with tool access (browser, code interpreter, file readers). 0-shot. Exact match accuracy. 165 validation (public), 300 test (held-out).
- **Version:** –

## Metrics

- **accuracy** — higher is better — exact match, reported per Level 1/2/3

## How to Run

```bash
# Download validation set from HF
# Submit test predictions via the leaderboard
# https://huggingface.co/spaces/gaia-benchmark/leaderboard
```

Dataset: https://huggingface.co/datasets/gaia-benchmark/GAIA

## Known Issues, Leakage & Gaming Risks

- Small test set – variance is non-trivial
- Web-dependent tasks can break when target websites change
- Human baseline ~92%; agent scores were ~65-67% in 2024-2025, improving rapidly – re-check current leaderboard
- Leaderboard submissions are not always independently verified

## How to Interpret Scores

- Report Level 1/2/3 separately – aggregate hides capability gaps
- As of **2026-07-06**, check the **GAIA Leaderboard – Hugging Face** for current scores – agent rankings turn over frequently
- Scores above ~60% were frontier-class in 2024-2025; expect higher in 2026 – always check the live table
- A model without tool access will score near zero – this is an agent-system benchmark, not a base-LLM benchmark
- Snapshot results go stale quickly

## Recommended Usage

- Use to compare end-to-end agent systems, not base LLMs
- Report Level 1/2/3 breakdown separately
- Run against validation split for development; test via official leaderboard
- Pair with a domain-specific agent benchmark if your use case is narrow

## Related Benchmarks

None yet in the Arsenal for agents.

## Relation to the Arsenal

Agent system evaluation benchmark. Complements agent frameworks in `content/projects/frameworks/` and agent reliability tips in `content/tips-and-tricks/agents-and-orchestration/`.

## Resources

- [Dataset – Hugging Face](https://huggingface.co/datasets/gaia-benchmark/GAIA)
- [Leaderboard – Hugging Face](https://huggingface.co/spaces/gaia-benchmark/leaderboard)
- Paper: Mialon et al., "GAIA: a benchmark for General AI Assistants", arXiv:2311.12983
