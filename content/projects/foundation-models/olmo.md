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

The only major model family that is open in the full sense — weights, pretraining data (Dolma), training code, intermediate checkpoints, and logs — making it the substrate for research on training dynamics, data attribution, and memorization that closed-weights 'open' models cannot support. It earns a place in the Arsenal because it directly addresses a recurring decision point: you do research that needs the full training story — intermediate checkpoints, exact data ordering, and training code let you study learning dynamics and data attribution rigorously. See Strengths / Limitations below before adopting it.

## Architecture

Decoder-only transformers with the OLMo 2 generation adopting reordered norm placement, QK-norm for stability, and staged training (long pretraining followed by mid-training on high-quality Dolmino data mixes). The release discipline is the differentiator: every checkpoint ships with its exact data order, enabling counterfactual data-ablation research; Tülu-recipe post-training produces the instruct variants.

## Ecosystem Position

Upstream: the Dolma open corpus and AI2's OLMo-core training stack. Downstream: a research ecosystem of interpretability, memorization, and data-attribution work builds specifically on OLMo's openness; the Tülu post-training recipes generalize to other base models. Competing: Llama/Qwen/Gemma on capability; Pythia (EleutherAI) as the prior fully-open research suite.

## Getting Started

```bash
pip install transformers
# python:
from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained('allenai/OLMo-2-1124-7B-Instruct')
tok = AutoTokenizer.from_pretrained('allenai/OLMo-2-1124-7B-Instruct')
```

## Key Use Cases

1. **Scenario**: you do research that needs the full training story — intermediate checkpoints, exact data ordering, and training code let you study learning dynamics and data attribution rigorously
2. **Scenario**: you need a truly-auditable model for provenance-sensitive deployments — every token of training data is inspectable, unlike open-weights-only releases

## Strengths

- You do research that needs the full training story — intermediate checkpoints, exact data ordering, and training code let you study learning dynamics and data attribution rigorously
- You need a truly-auditable model for provenance-sensitive deployments — every token of training data is inspectable, unlike open-weights-only releases

## Limitations

- You just want the best open-weights model per parameter at inference time — Qwen, Llama, and Gemma families typically lead OLMo on capability benchmarks at matched sizes
- You need multimodal or very large scale options — the OLMo line focuses on fully-open text models at small-to-mid scales (Molmo covers vision separately)

## Relation to the Arsenal

This is a foundation-model entry: it documents model weights, architecture, and generational position. For hosted/managed access paths to models, see [tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/allenai/OLMo)
- [Documentation](https://allenai.org/olmo)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (6,574 stars, last commit 2025-11-24, verified via GitHub API on 2026-07-08)*
