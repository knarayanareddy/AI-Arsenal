---
id: gemma-team-2026-gemma4
title: "Gemma 4 Technical Report"
phase: architectures
venue: technical-report
year: 2026
authors:
  - "Gemma Team (Google DeepMind)"
arxiv_id: "2607.02770"
arxiv_url: "https://arxiv.org/abs/2607.02770"
pdf_url: "https://arxiv.org/pdf/2607.02770"
code_url: "https://github.com/google-deepmind/gemma"
venue_url: null

practical_applicability: high
reproduction_status: code-available
result_status: current
has_code: true
citation_count_approx: 0

tldr: "Open-weight, natively multimodal model family (2.3B-31B, dense + MoE) with a thinking mode and an encoder-free 12B that ingests raw audio and image patches -- the strongest open-weight option at small/mid scale as of mid-2026"
key_contribution: "A new generation of open-weight natively multimodal models spanning 2.3B-31B parameters with dense and Mixture-of-Experts variants, integrated thinking mode, improved long-context and inference efficiency, and a unified encoder-free architecture for the 12B model that consumes raw audio and image patches directly"

builds_on: []
implemented_in: []

tags:
  - llm
  - multimodal
  - self-hosted
  - inference
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Gemma 4 is Google DeepMind's fourth generation of open-weight models, released July 2026. The suite spans 2.3B to 31B parameters across dense and Mixture-of-Experts architectures, is natively multimodal (vision and audio encoders at all sizes), integrates a thinking mode that generates reasoning traces before responding, and — the architecturally novel piece — ships a unified, encoder-free 12B variant that ingests raw audio and image patches without separate modality encoders. The report claims large gains on STEM, multimodal, and long-context benchmarks, rivaling larger frontier open models on human-rated tasks.

## Why it's in the Arsenal

- Open-weight model selection is a recurring decision for every self-hosting team this catalog serves, and Gemma 4 resets the quality/size frontier at the 2B–31B scale where self-hosting is actually economical — sizes that fit single-GPU and edge deployments.
- The encoder-free 12B is a genuine architecture data point, not just a scale bump: if raw-patch/raw-audio ingestion holds up, it removes the modality-encoder complexity that multimodal serving stacks currently carry.

## Core Contribution

Three engineering threads. **Efficient multimodal at small scale**: native vision and audio across all sizes, with dense and MoE variants letting deployers trade active-parameter cost against quality. **Unified encoder-free architecture** (12B): raw audio and image patches enter the transformer directly, replacing the conventional encoder-plus-projector pipeline — a simplification with real serving implications. **Integrated thinking mode**: reasoning traces before responding, bringing the reasoning-model paradigm to open weights at these sizes, alongside design choices targeting inference speed, memory, and long-context ability.

## Key Results

- Reported leap across STEM, multimodal, and long-context benchmarks relative to prior Gemma generations (first-party numbers; see the report for the full tables)
- Claimed to rival larger frontier open models on human-rated tasks — the report's headline positioning claim, worth independent verification on your own workload before relying on it

## Methodology

A technical report rather than a hypothesis-driven paper: it documents architecture choices (dense vs. MoE configurations, encoder-free multimodal input for the 12B, long-context design), the thinking-mode integration, and evaluation across standard benchmark suites plus human-rated comparisons. Weights are released openly; training data and full training details follow the usual partial-disclosure pattern of frontier-lab reports.

## Practical Applicability

If you self-host at ≤31B, Gemma 4 belongs on your evaluation shortlist immediately — particularly the MoE variants for throughput-sensitive serving and the 12B encoder-free model if your workload is multimodal and you want a simpler serving path. The thinking mode gives open-weight deployments a controllable reasoning/latency dial. As always with vendor reports: benchmark on your own tasks; "rivals larger frontier open models" is a first-party claim.

## Limitations & Critiques

All headline numbers are first-party and, at `last_reviewed: 2026-07-08` (six days post-release), not yet independently replicated on neutral harnesses. The encoder-free approach is only offered at 12B — its scaling behavior above that is unshown. Gemma license terms differ from Apache-2.0-style licenses and deserve legal review for commercial deployment. Data transparency is limited, as is typical for frontier-lab reports.

## Reproductions & Follow-up Work

Weights and reference code are public (google-deepmind/gemma, actively pushed as of 2026-07-07), so community evaluation is underway but not yet published at `last_reviewed: 2026-07-08`. Expect third-party benchmark runs and quantized/fine-tuned derivatives quickly, as with prior Gemma generations; revisit at next review.

## Relation to the Arsenal

The current-generation counterpart to the model-selection guidance in [model selection guides](../../architectures/model-selection/_index.md) and the self-hosted serving stacks this catalog documents — pair it with the [inference engines](../../projects/inference-engines/_index.md) entries for deployment. Its thinking mode connects to the reasoning-training line in `../training-and-alignment/deepseek-ai-2025-r1.md`, which established the open reasoning-model paradigm Gemma 4 now packages at small scale.

## Resources

- [Technical Report (PDF)](https://arxiv.org/pdf/2607.02770)
- [arXiv](https://arxiv.org/abs/2607.02770)
- [Reference Code & Weights (GitHub)](https://github.com/google-deepmind/gemma)
