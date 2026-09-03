---
id: opencompass
name: "OpenCompass"
version_tracked: null
artifact_type: platform
category: evaluation
subcategory: evaluation
description: "LLM evaluation platform that runs 100+ benchmark datasets against local and hosted models under one configuration"
github_url: "https://github.com/open-compass/opencompass"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "OpenCompass"
tags: [evaluation, benchmark, llm, batching]
maturity: production
cost_model: open-source
github_stars: 7392
github_stars_last_30d: 0
trending_score: 52
last_commit: "2026-09-03"
docs_url: "https://opencompass.readthedocs.io/en/latest/"
demo_url: "https://rank.opencompass.org.cn/home"
paper_url: null
paper_id: null
phase: benchmark-and-eval
domain: [language, general-purpose, reasoning]
relation_to_stack: [deploy-as-is, study-and-reference]
health_signals: [actively-maintained, community-driven, research-origin]
ecosystem_role:
  - "The broad-coverage evaluation platform: one config-driven runner that drives a large dataset corpus across many model families, so a comparison rests on a fixed harness rather than per-benchmark scripts."
best_for:
  - "You need one reproducible pass over a wide dataset corpus for several models at once, and care that every model saw the identical prompt template and scoring code"
  - "You are comparing open-weight checkpoints against hosted APIs and want the same harness driving both rather than trusting each vendor's own leaderboard submission"
avoid_if:
  - "You need to evaluate a narrow, application-specific behaviour — a 100+ dataset sweep costs compute you will not use, and a targeted suite answers the question faster"
  - "Your evaluation requires agentic multi-turn interaction or tool use, which sits outside a prompt-and-score harness and belongs in an agent-level benchmark"
upstream_dependencies: []
downstream_consumers: []
alternatives: [deepeval]
integrates_with: [ollama, vllm]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Stars (7,392), forks (860), licence (Apache-2.0), language (Python), created 2023-06-15, last commit (2026-09-03) verified via the GitHub API on 2026-09-03. Dataset-coverage and model-support claims come from the README. Architecture claims derive from README and docs, not hands-on verification."
added_date: "2026-09-03"
last_reviewed: "2026-09-03"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/open-compass/opencompass", "date": "2026-09-03", "description": "7,392 stars on GitHub as of 2026-09-03 (GitHub API), created 2023-06-15"}]
featured: false
status: active
---

## Overview

OpenCompass is an evaluation platform for large language models: a single configuration-driven runner that executes a corpus of more than a hundred benchmark datasets against many model families and reports comparable scores. Its value is uniformity — every model in a run sees the same prompt template, the same sampling settings, and the same scoring implementation, which is what makes a cross-model table defensible rather than merely suggestive. It drives open-weight checkpoints and hosted APIs through one code path, and publishes a public leaderboard alongside the code. It has been developed since 2023-06-15 and reached roughly 7,400 stars by 2026-09-03.

## Why it's in the Arsenal

The catalogue holds several evaluation tools, most of which are developer-facing: you point them at your own prompts and they score the output. OpenCompass answers a different question — where does this model sit against a broad public corpus, measured identically to every other model? Without an entry of this kind, the catalogue can tell a reader how to test their own application but not how to read a model-comparison table critically. The distinction matters because the two failure modes differ: a custom suite overfits to your use case, while a broad harness over-represents academic tasks that may not resemble your workload.

## Architecture

A run is described declaratively: the config names the models, the datasets, and the evaluation strategy, and the runner expands that into a batch of independent inference jobs. Dataset adapters handle prompt construction and answer extraction, so a multiple-choice benchmark, an open-ended generation task, and a code task share one execution path while keeping their own scoring logic. Model access is abstracted behind a common interface, which is how a local checkpoint served through an inference engine and a hosted API end up in the same result table. Results are written per dataset and then aggregated, and a subjective or judge-based mode allows model-graded scoring where exact-match is not meaningful.

## Ecosystem Position

It competes with [lm-evaluation-harness](../../tools/evaluation-and-observability/lm-evaluation-harness.md), which shares the broad-corpus intent but comes from a different lineage and dataset selection; teams commonly run both because dataset coverage differs. It sits above [DeepEval](./deepeval.md) in scope rather than replacing it — DeepEval targets application-level metrics on your own traces, while OpenCompass targets public corpus scores. It complements inference engines such as [vLLM](../inference-engines/vllm.md) and [Ollama](../inference-engines/ollama.md), which serve the models it evaluates. It is not an agent benchmark: [Terminal-Bench](./terminal-bench.md) measures multi-turn tool use, which a prompt-and-score harness cannot express.

## Getting Started

```bash
pip install opencompass
python -m opencompass.run configs/eval_demo.py
```

Configuration is Python, so a model set or dataset subset is swapped by editing the config rather than by command-line flag plumbing.

## Key Use Cases

1. **Model selection against a public corpus** — one reproducible run producing a comparable table across candidate models.
2. **Checkpoint comparison during fine-tuning** — scoring successive checkpoints on identical datasets so movement is attributable.
3. **Auditing vendor claims** — re-measuring a hosted model on the same harness rather than relying on a submitted leaderboard row.

## Strengths

- Dataset adapters centralise prompt construction and answer extraction, which is where most silent scoring discrepancies originate.
- One code path for local and hosted models removes the harness difference that otherwise contaminates a comparison.
- The published leaderboard means an external reader can see the protocol behind a score rather than inferring it.

## Limitations

- Broad-corpus scores correlate weakly with application performance; a model that leads on the corpus may not lead on your task distribution.
- A full sweep is compute-expensive, and partial runs make results non-comparable with the published leaderboard.
- Judge-based scoring modes introduce a second model as a dependency, which carries its own bias and cost.

## Relation to the Arsenal

Catalogued in the benchmark-and-eval phase because it is a harness you run rather than a library you embed. For application-level evaluation of your own prompts, see [tools/evaluation-and-observability](../../tools/evaluation-and-observability/_index.md); for the underlying benchmark datasets, see [Benchmarks](../../benchmarks/_index.md).

## Resources

- [GitHub](https://github.com/open-compass/opencompass)
- [Documentation](https://opencompass.readthedocs.io/en/latest/)
- [CompassRank leaderboard](https://rank.opencompass.org.cn/home)

---
*GitHub API verification by @maintainer on 2026-09-03 — enrichment_status: draft. 7,392 stars, 860 forks, Apache-2.0, Python, created 2023-06-15, last commit 2026-09-03.*
