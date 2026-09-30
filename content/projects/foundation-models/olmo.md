---
id: olmo
name: "OLMo"
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: "AI2's fully-open language model family: weights, training data, code, and checkpoints all released — the reference for reproducible LLM science"
github_url: "https://github.com/allenai/OLMo"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "Allen Institute for AI"
tags: [llm, research, training]
maturity: production
cost_model: open-source
github_stars: 6574
github_stars_last_30d: 0
trending_score: 50
last_commit: "2025-11-24"
docs_url: "https://allenai.org/olmo"
demo_url: null
paper_url: "https://arxiv.org/abs/2501.00656"
paper_id: null
phase: foundation-model
domain: [language]
relation_to_stack: [study-and-reference, fork-and-adapt]
health_signals: [org-backed, research-origin, actively-maintained]
ecosystem_role:
  - "The only major model family that is open in the full sense — weights, pretraining data (Dolma), training code, intermediate checkpoints, and logs — making it the substrate for research on training dynamics, data attribution, and memorization that closed-weights 'open' models cannot support."
best_for:
  - "You do research that needs the full training story — intermediate checkpoints, exact data ordering, and training code let you study learning dynamics and data attribution rigorously"
  - "You need a truly-auditable model for provenance-sensitive deployments — every token of training data is inspectable, unlike open-weights-only releases"
avoid_if:
  - "You just want the best open-weights model per parameter at inference time — Qwen, Llama, and Gemma families typically lead OLMo on capability benchmarks at matched sizes"
  - "You need multimodal or very large scale options — the OLMo line focuses on fully-open text models at small-to-mid scales (Molmo covers vision separately)"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (6,574), primary language, license, and last commit (2025-11-24) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/allenai/OLMo", "date": "2026-07-08", "description": "6,574 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

Allen Institute for AI's Open Language Model project: a model family (OLMo, OLMo 2, and successors) released with everything required to reproduce it — the Dolma pretraining corpus, training and evaluation code, hundreds of intermediate checkpoints, and ablation logs. OLMo's contribution is less about leaderboard position and more about making LLM training itself a reproducible object of study.

## Why it's in the Arsenal

OLMo appears in this catalog as a reference point for the foundation-model phase; the useful question is what hosting and licence terms it commits you to beyond the weights themselves. The sections below state what it claims to do and what adopting it would commit you to.

## Architecture

Decoder-only transformers with the OLMo 2 generation adopting reordered norm placement, QK-norm for stability, and staged training (long pretraining followed by mid-training on high-quality Dolmino data mixes). The release discipline is the differentiator: every checkpoint ships with its exact data order, enabling counterfactual data-ablation research; Tülu-recipe post-training produces the instruct variants.

## Ecosystem Position

Upstream: the Dolma open corpus and AI2's OLMo-core training stack. Downstream: a research ecosystem of interpretability, memorization, and data-attribution work builds specifically on OLMo's openness; the Tülu post-training recipes generalize to other base models. It competes with Llama, Qwen, and Gemma models on raw capability, but compared to them its differentiator is total openness rather than benchmark scores; the closest alternative in spirit is Pythia (EleutherAI), the prior fully-open research suite.

## Getting Started

```bash
pip install transformers
# python:
from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained('allenai/OLMo-2-1124-7B-Instruct')
tok = AutoTokenizer.from_pretrained('allenai/OLMo-2-1124-7B-Instruct')
```

## Key Use Cases

1. **Running it in anger**: the first real evaluation of OLMo is your own traffic, not the documentation's example; instrument latency, error rate and quality on a representative slice of data before the choice is load-bearing.
2. **What the OLMo scenarios have in common**: each turns on licence, context behaviour or hosting — the constraints a set of weights does not negotiate away.
3. **Before committing**: pick the criterion that would make you abandon this choice, write it down, and check it against a representative slice of your own data — a catalog entry can tell you what is claimed, only a run tells you what is true.

## Strengths

- The implementation detail worth checking before adopting OLMo is specific — decoder-only transformers with the OLMo 2 generation adopting reordered norm placement, QK-norm for stability, and staged training (long pretraining followed by mid-training on high-quality Dolmino data mixes). The release discipline is the differentiator: every checkpoint ships with its exact data order, enabling counterfactual data-ablation research; Tülu-recipe post-training produces the instruct variants — because that is where the capability claim either survives contact with your data or does not.
- It is a foundation-model entry in this catalog, so the comparison that matters is against the other foundation-model projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- Adoption risk for OLMo is mostly operational rather than technical — resource cost at your scale, dependency failure behaviour, and the upgrade path when interfaces move.
- The claims here come from the project's own documentation and public record, not from independent measurement on your workload; benchmark numbers in particular are point-in-time and harness-dependent.
- No alternative is catalogued alongside OLMo here, so the entry cannot tell you what it is better than; treat that absence as a gap in the comparison rather than as a verdict.

## Relation to the Arsenal

As a foundation-model entry this documents OLMo's fully-open weights, data, and training artifacts, not serving. Its value is the reproducible training story (Dolma corpus, intermediate checkpoints, ordering) more than deployment; for hosted/managed access paths to models, see [tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/allenai/OLMo)
- [Documentation](https://allenai.org/olmo)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (6,574 stars, last commit 2025-11-24, verified via GitHub API on 2026-07-08)*
