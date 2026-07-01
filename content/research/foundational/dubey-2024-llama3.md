---
id: dubey-2024-llama3
title: "The Llama 3 Herd of Models"
phase: foundational
venue: arxiv-preprint
year: 2024
authors:
  - "Dubey, A."
  - "Jauhri, A."
  - "Pandey, A."
  - "Kadian, A."
  - "et al."
arxiv_id: "2407.21783"
arxiv_url: "https://arxiv.org/abs/2407.21783"
pdf_url: "https://arxiv.org/pdf/2407.21783"
code_url: "https://github.com/meta-llama/llama-models"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: foundational
has_code: true
citation_count_approx: 4500

tldr: "Documented Meta's dense 405B-parameter Llama 3 herd as an open-weight family competitive with GPT-4 -- the reference technical report for an open-weight family, though Meta's current line has moved to Llama 4's MoE design"
key_contribution: "Documented that a dense (non-MoE) Transformer scaled to 405B parameters, trained with a heavy emphasis on data quality and a straightforward training recipe rather than architectural novelty, can match leading closed frontier models like GPT-4 on a broad range of tasks while remaining fully open-weight"

superseded_by: null
builds_on:
  - vaswani-2017-attention
implemented_in: []
corresponding_project_entry: llama-3

tags:
  - training
  - llm
  - multimodal
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This technical report documents the Llama 3 herd — a dense (non-mixture-of-experts) Transformer family topping out at 405B parameters, trained with an emphasis on data quality and scale rather than architectural novelty, that Meta reported as delivering quality comparable to GPT-4 across a broad range of tasks while remaining fully open-weight. `result_status: foundational` here specifically means "superseded in practice but still required knowledge," not "current state of the art": Meta's own subsequent Llama 4 release (Scout and Maverick, April 2025) introduced Meta's first mixture-of-experts architecture and is the vendor's own recommended path for new projects, as already documented in this catalog's `llama-3` project entry. This research entry is intentionally not marked `result_status: superseded` with a fabricated `superseded_by` ID, since no Llama 4 technical-report paper entry yet exists in this catalog to point to — adding one is future work, not something to invent a placeholder ID for here.

## Why it's in the Arsenal

- This is the reference technical report for how a large, dense, open-weight foundation model family is actually built and evaluated end-to-end — training data curation, multi-stage post-training, safety evaluation, and multimodal extension — making it a template worth understanding even for teams not using Llama 3 specifically.
- `practical_applicability: high` reflects that Llama 3.x remains, as of this catalog's own `llama-3` project entry, the most widely deployed and tooled open-weight generation despite not being Meta's current architecture — the ecosystem depth (inference engine support, quantization tooling, fine-tuning framework compatibility) documented in this paper's release is a genuine, current engineering consideration when choosing a foundation model, not merely historical interest.

## Core Contribution

Rather than proposing an architectural novelty, this paper's contribution is empirical and methodological: it shows that scaling a standard dense Transformer (not a mixture-of-experts design) to 405B parameters, combined with a heavy emphasis on training-data quality and quantity (Meta reports significantly more effort on data curation than on architecture search) and a straightforward multi-stage post-training pipeline (supervised fine-tuning, rejection sampling, and direct preference optimization), can close the gap with leading closed frontier models. In engineering terms: this paper is evidence that for a team without access to novel architecture research, investing in data quality and post-training recipe design produces more reliable gains than architectural experimentation — a lesson independent of whether you use Llama 3 itself.

## Key Results

- Llama 3 405B reported comparable quality to GPT-4 across a broad range of standard benchmarks (2024), per the paper's own extensive empirical evaluation section — this was Meta's headline claim and drove significant adoption of the open-weight family
- The herd spans multiple sizes (8B, 70B, 405B in the original release, later extended down to 1B/3B and up through multimodal 11B/90B variants) with a 128K-token context window at release (2024)
- Later, independent 2026-era benchmark comparisons (used across this catalog's inference-engine entries, e.g. `sglang`/`vllm` project entries) treat Llama 3.x as a widely-adopted but no longer frontier baseline, since Meta's own Llama 4 (April 2025) and other vendors' 2025-2026 releases have since surpassed its reported benchmark scores — cite this paper's specific benchmark numbers only as 2024-era reference points, not current state-of-the-art claims

## Methodology

Llama 3 uses a standard dense Transformer decoder architecture (the `vaswani-2017-attention` lineage, decoder-only branch), deliberately avoiding mixture-of-experts or other architectural novelty in favor of scale and data-quality investment (paper Section 3). Training proceeds in stages: large-scale pretraining on a data mixture Meta reports curating heavily for quality (Section 3.3), followed by multi-round post-training combining supervised fine-tuning, rejection sampling, and Direct Preference Optimization (see `rafailov-2023-dpo` in this catalog's `training-and-alignment/` phase, which this paper's post-training pipeline directly uses) rather than full RLHF-with-PPO. Multimodal capability (image, video, and speech understanding) is added via a compositional approach — separately trained encoders adapted onto the pretrained text backbone — rather than joint multimodal pretraining from scratch (paper Section 7), a design choice the paper frames as reducing the risk of degrading the model's core text capability while extending it to new modalities.

## Practical Applicability

If you are choosing an open-weight foundation model for a project prioritizing ecosystem maturity and broad inference/tooling compatibility over having the absolute latest architecture, this paper documents why Llama 3.x remains a defensible choice — the breadth of quantization, fine-tuning, and serving-tool support built up around this specific model family (documented across this catalog's `content/tools/model-layer/` and inference-engine entries) is a genuine current-day advantage even though the underlying architecture is not Meta's newest. If you are designing your own foundation-model training pipeline, this paper's core lesson — that data curation and post-training recipe investment can matter more than architectural novelty for closing the gap with frontier closed models — is directly actionable regardless of which model family you use. If you specifically need Meta's current-generation architecture (their first mixture-of-experts design, a 10M-token context window on Scout, and EU-specific licensing considerations), see this paper's own successor generation (Llama 4, April 2025) instead, as already flagged in this catalog's `llama-3` project entry's `avoid_if` field.

## Limitations & Critiques

The paper's own safety section is extensive but, like all vendor-authored safety evaluations, is not a substitute for independent red-teaming — this catalog does not have independent evidence beyond Meta's self-reported findings to confirm or challenge those specific safety claims. Llama 3's custom license (not a standard open-source license like Apache/MIT) carries usage restrictions that require review before commercial use, a limitation this paper's own text does not emphasize but that is directly relevant to any engineering decision to adopt it — already flagged in this catalog's corresponding `llama-3` project entry. The most significant post-publication development is Meta's own supersession: Llama 4 (April 2025) introduced a mixture-of-experts architecture Meta's public materials position as the recommended path for new projects, and reports of an internal "Muse Spark" successor (per Wikipedia, April 2026) suggest Llama 3.x is not Meta's current frontier line as of mid-2026 — though it remains, per the same project entry's health-signal evidence, the most widely deployed and tooled open-weight generation due to ecosystem maturity, not because it is architecturally current.

## Reproductions & Follow-up Work

Llama 3's official weights and code were released by Meta and have been independently validated at scale by the broader open-source ecosystem — every major inference engine in this catalog (`llama-cpp`, `vllm`, `sglang`, `ollama`, `text-generation-inference`) serves Llama 3 as a first-class supported model, which constitutes an extensive, ongoing, real-world validation of the release rather than a single controlled reproduction. The most significant follow-up is Meta's own Llama 4 (Scout and Maverick, April 2025), which directly supersedes this paper's architecture with a mixture-of-experts design; no separate research-entry technical report for Llama 4 exists yet in this catalog as of `last_reviewed: 2026-07-01`.

## Relation to the Arsenal

This paper builds on `vaswani-2017-attention` (foundational/) for its core decoder-only architecture and directly uses the post-training technique described in `rafailov-2023-dpo` (training-and-alignment/) as part of its multi-stage fine-tuning pipeline. Its `corresponding_project_entry`, `llama-3` (in `content/projects/foundation-models/`), documents the model family's ongoing ecosystem position, health signals, and production-deployment evidence — this research entry focuses on the paper's own technical claims and their currency, while the project entry tracks the model's evolving real-world status; the two are intentionally not redundant, per the same frame-decision discipline established in the projects-vertical reorganisation for tool/project pairs. It is grouped in `foundational/` rather than `training-and-alignment/` because it documents an entire foundation-model family (architecture, training recipe, safety work, evaluations bundled together as one release), closer in kind to `vaswani-2017-attention` or `devlin-2018-bert` than to a single reusable training technique — see the non-obvious placement rationale in `.migration/research-audit-report.md`.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2407.21783)
- [arXiv](https://arxiv.org/abs/2407.21783)
- [Official Code](https://github.com/meta-llama/llama-models)
- [Papers With Code](https://paperswithcode.com/paper/the-llama-3-herd-of-models)
- [Key Reproduction / Analysis](https://techcrunch.com/2025/04/05/meta-releases-llama-4-a-new-crop-of-flagship-ai-models/) — coverage of Llama 4's April 2025 release, confirming Meta's own move to a mixture-of-experts architecture as the successor to this paper's dense-Transformer design
