---
id: browsecomp
title: "BrowseComp"
entry_type: benchmark
category: agents
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Agentic web-browsing research ability – 1,266 questions whose short factual answers are deliberately hard to find, requiring persistent multi-hop search across many websites."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "Judge-graded exact match of the short answer; calibration also reported"
protocol:
  dataset: "BrowseComp"
  dataset_url: "https://github.com/openai/simple-evals"
  evaluation_setup: "Agent with browsing/search tools answers each question; judge model grades against gold answer. Trainers verified answers are hard to find (not solvable by first-page search) but easy to verify."
  version: "2025 release (1,266 questions)"
leaderboards:
  - name: "openai/simple-evals (reference results)"
    url: "https://github.com/openai/simple-evals"
    last_checked: "2026-07-08"
known_issues:
  - "Scores depend heavily on the scaffold: search backend, browsing budget, and tool design move results more than the base model"
  - "The live web changes – pages get deleted or created, so answer findability drifts over time"
  - "Inverted-question design (start from a fact, write an obscuring question) rewards needle-hunting over synthesis or report quality"
  - "Judge-graded answers add grader dependence"
recommended_usage:
  - "Use to compare deep-research/browsing agents under a fixed scaffold and browsing budget"
  - "Report the search/browsing stack alongside the model – numbers are scaffold+model, never model-only"
  - "Pair with GAIA for general tool-use and with task-completion evals for end-to-end usefulness"
  - "Re-run baselines periodically; web drift silently shifts difficulty"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["gaia", "webarena"]
enrichment_status: draft
enrichment_notes: "Authored from the BrowseComp paper (arXiv:2504.12516) and openai/simple-evals; URLs verified 2026-07-08."
tags: [evaluation, agents, benchmark]
---

## Overview

BrowseComp (OpenAI, 2025) is a 1,266-question benchmark for browsing agents built on an inversion trick: authors start from an obscure verified fact and write a question that makes it hard to find – e.g. constraints spanning several entities that no single page answers. Human trainers verified each question resists first-page search, while the short answer remains trivially checkable.

## What it Measures (and what it doesn’t)

Measures persistent, creative multi-hop web search: reformulating queries, following weak leads across many sites, and knowing when the answer is confirmed.

Does not measure: long-form research report quality, source reliability judgment, UI-level web interaction (forms, clicking – that's WebArena territory), or general tool use beyond search.

## Dataset & Protocol

- **Dataset:** BrowseComp – 1,266 questions with short verifiable answers
- **Dataset URL:** https://github.com/openai/simple-evals
- **Evaluation setup:** browsing-capable agent; judge-graded exact match; calibration reported
- **Version:** 2025 release

## Metrics

- **accuracy** — higher is better — judge-graded short-answer match

## How to Run

```bash
git clone https://github.com/openai/simple-evals
# python -m simple-evals.simple_evals --eval=browsecomp --model=<model>
# Requires a browsing/search tool wired into the agent; see repo README
```

## Known Issues, Leakage & Gaming Risks

- Scaffold dominance: a stronger search backend or larger browse budget can outweigh model differences
- Web drift: findability of answers changes as pages appear/disappear
- Answers are public in the repo → contamination risk for future training runs
- Aggressive-abstention gaming is possible; calibration reporting partially counters it

## How to Interpret Scores

- At release (**2025**, per the paper), GPT-4o-class models with browsing scored under 2% and even early deep-research agents stayed well below 60% – BrowseComp remains far from saturation as of **2026-07-08**.
- Compare only runs with identical search backends and browsing budgets.
- Rising accuracy with flat calibration error is genuine capability; rising accuracy with worse calibration suggests guessing.

## Recommended Usage

- Benchmark deep-research agent iterations under a frozen scaffold
- Ablate scaffold components (search API, budget, memory) with the model held constant
- Combine with GAIA and real task evals before concluding an agent is production-ready
- Date all numbers and note the web-access method

## Related Benchmarks

- [GAIA](./gaia.md) – general assistant tool-use questions
- [WebArena](./webarena.md) – interactive web-task completion in sandboxed sites

## Relation to the Arsenal

Agentic browsing benchmark in the agents category; complements deep-research agent projects in `content/projects/agent-systems/` and evaluation tooling in `content/tools/evaluation-and-observability/`.

## Resources

- [BrowseComp paper – Wei et al., 2025](https://arxiv.org/abs/2504.12516)
- [openai/simple-evals – dataset and harness](https://github.com/openai/simple-evals)
