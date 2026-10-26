---
id: gemma
name: Gemma
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: The 2024 Gemma 1 and Gemma 2 open-weight checkpoints (2B-27B, 8K context, text-only) that precede Gemma 3 and Gemma 4
github_url: https://github.com/google-deepmind/gemma
license: Custom
primary_language: Python
org_or_maintainer: null
tags:
  - llm
  - inference
  - multimodal
  - local
maturity: production
cost_model: open-source
github_stars: 5816
github_stars_last_30d: 0
trending_score: 15
last_commit: '2026-10-15'
docs_url: https://ai.google.dev/gemma/docs/core
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain:
  - language
  - multimodal
relation_to_stack:
  - deploy-as-is
  - build-on-top
  - study-and-reference
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - The 2024 Gemma 1 and Gemma 2 checkpoints, kept because a large body of fine-tunes, quantisations and benchmarks still targets exactly these weights
best_for:
  - You specifically need the original Gemma 1/2 generation for compatibility with existing pipelines or comparative research
  - You want Google's smallest, most local-deployment-friendly open-weight models rather than the larger, newer Gemma 3/4 variants
avoid_if:
  - You're starting a new project — Gemma 3 (128K context, multimodal input, 1B-27B) and Gemma 4 (2.3B-31B, dense and MoE, April 2026) supersede this generation at the same or smaller sizes
  - You need any multimodal input or a context longer than 8,192 tokens, both of which arrived with Gemma 3
  - Your legal review requires an OSI-approved licence, since the Gemma Terms of Use are a custom licence with use restrictions rather than an open-source licence
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: 'Re-verified 2026-10-25 (GitHub API: 5817 stars, last push 2026-10-15). Corrected a factual error: interleaved local/global attention shipped in Gemma 2, not Gemma 3 (arXiv:2408.00118). The entry documents the 2024 generation only; see gemma-3 and the gemma-4 report.'
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

The first generation of Google DeepMind's open-weight small language model family (Gemma 1/2), released in 2024 as dense decoder-only transformer checkpoints and positioned as a lighter-weight, locally-deployable counterpart to the closed Gemini models. It shipped in 2B/7B (Gemma 1) and 2B/9B/27B (Gemma 2) sizes under a custom license.

## Why it's in the Arsenal

This entry exists for the weights, not the generation: a large share of the quantised GGUF releases, LoRA fine-tunes and evaluation numbers circulating in 2026 were produced against `gemma-2-9b-it` and `gemma-2-27b-it`, and reproducing or extending any of them means running exactly those checkpoints. Deleting the entry in favour of Gemma 3 or Gemma 4 would break the reference for that work, so it is kept and labelled as the 2024 generation.

It is also the most instructive generation to read if you want to see how a lab improved a small model with architecture rather than scale: Gemma 2's gains over Gemma 1 came from interleaved local and global attention, grouped-query attention, logit soft-capping, and — for the 2B and 9B models — pretraining by knowledge distillation from a larger teacher instead of next-token prediction.

## Architecture

Gemma 1 (February 2024) is a dense decoder-only transformer in 2B and 7B sizes with an 8,192-token context: multi-head attention, RoPE, GeGLU feed-forward blocks, RMSNorm. Gemma 2 (June 2024, with the 2B following in July) keeps the 8,192-token context but changes the attention: every other layer uses a 4,096-token local sliding window and the layers between use full global attention over the 8,192-token span, which halves the cost of attention while preserving long-range mixing. Gemma 2 also adds grouped-query attention, caps attention and output logits with a scaled tanh to keep training numerically stable, and normalises both the input and output of each sub-layer.

Two details from the Gemma 2 report are worth carrying into any decision. The 2B and 9B models were pretrained with knowledge distillation — matching a larger teacher's full next-token distribution rather than a one-hot label — while the 27B was trained from scratch; the distilled 2B reportedly beats the same size trained from scratch by roughly seven points on a three-benchmark average. And the sliding-window size is a runtime lever, not a fixed property: shrinking it from 4,096 to 1,024 moved validation perplexity from 1.63 to 1.64 in the report's ablation, which is a cheap latency trade if your serving stack exposes it.

## Ecosystem Position

Upstream: shares research lineage with Google's Gemini models. Downstream: broad support across Ollama, llama.cpp, vLLM, and Hugging Face Transformers. It competes with Llama 3, Mistral 7B, and Qwen models at comparable sizes; compared to them, Gemma's niche was small, local-friendly Google models. Superseded by: Gemma 3 (longer context, multimodal, more efficient attention) and, as of April 2026, Gemma 4.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

# Gemma checkpoints are published under the google org on Hugging Face (gated; see Resources).
generate = pipeline("text-generation", model="google/gemma-2-9b-it")
print(generate("Explain retrieval augmented generation in one sentence.", max_new_tokens=64)[0]["generated_text"])
```

## Key Use Cases

1. **Reproducing or extending an existing fine-tune**: LoRA adapters, quantised GGUFs and benchmark results that name `gemma-2-9b-it` or `gemma-2-27b-it` require those exact weights — a newer generation is a different model with different behaviour, not a drop-in upgrade.
2. **A small text model on a single accelerator**: the 2B fits in a few GB at 4-bit and the 9B fits a 24GB card comfortably, which is still the practical shape for laptop and edge deployment when you do not need 128K context.
3. **Studying architecture improvements at fixed scale**: comparing Gemma 1 and Gemma 2 side by side isolates what interleaved attention, GQA and distillation actually bought, which is a cleaner experiment than comparing across labs.
4. **Research that must cite 2024 baselines**: papers and internal reports from that period use Gemma 2 numbers, and re-running the checkpoints is the only way to compare against them.

## Strengths

- The 2B and 9B Gemma 2 models are unusually strong for their size because of the distillation recipe, and the report's own ablation quantifies the effect — that is a documented mechanism rather than a leaderboard claim.
- Interleaved local/global attention gives Gemma 2 a genuinely cheaper attention path than a pure quadratic model at the same context, and the sliding-window size can be halved at inference for a small perplexity cost.
- Tooling support is settled: these checkpoints run in Hugging Face Transformers, llama.cpp, Ollama and vLLM, and quantisations exist for every size, so the integration work is already done by other people.
- The weights are frozen, which is a property worth having: a fine-tune pinned to `gemma-2-9b-it` will behave the same in 2027, while the current generation will keep receiving new revisions.
- The Gemma 2 report is candid about method and ablations, so the entry can point at why the model behaves as it does instead of only at what it scores.

## Limitations

- **Three generations have shipped since.** Gemma 3 moved to 128K context and multimodal input across 1B-27B, and the Gemma 4 report describes 2.3B-31B with dense and MoE variants, a thinking mode and an encoder-free 12B that ingests raw audio and image patches. For a new build the honest framing is that this generation costs more per unit of capability.
- **8,192 tokens is the ceiling**, and there is no multimodal path. Anything involving long documents, images or audio is out of scope here, not merely suboptimal.
- **The licence is not open source.** The Gemma Terms of Use are a custom licence with a prohibited-use policy and redistribution obligations attached; it is open-weight, and the distinction matters to legal review and to anyone repackaging the model.
- **The repository and the weights are different artifacts.** `google-deepmind/gemma` is reference implementation code (JAX), a few thousand stars and a slow cadence; the checkpoints live on Hugging Face under a gated licence with their own download flow. Star counts on the repository say nothing about adoption of the models.
- **No published production telemetry exists for either generation**, so latency, memory and quality at your prompt distribution remain measurements you take, and the 2024 benchmark numbers were produced on 2024 evaluation sets with older harnesses.

## Relation to the Arsenal

As a foundation-model entry this documents the original Gemma 1/2 weights and positioning, not serving. These small dense checkpoints suit local deployment — pair them with an inference stack from [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md); for new work prefer Gemma 3/4.

## Resources

- [GitHub](https://github.com/google-deepmind/gemma)
- [Documentation](https://github.com/google-deepmind/gemma)
