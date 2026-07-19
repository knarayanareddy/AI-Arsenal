---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: "zai-org"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: glm-ocr
name: "GLM-OCR"
artifact_type: model
category: multimodal
subcategory: open-source-models
description: "Compact 0.9B multimodal OCR model from Z.ai (Zhipu) for complex document understanding, built on GLM-V"
github_url: https://github.com/zai-org/GLM-OCR
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "multimodal"
  - "vision"
  - "self-hosted"
maturity: beta
cost_model: open-source
github_stars: 7177
last_commit: "2026-04-21"
docs_url: https://docs.z.ai/guides/vlm/glm-ocr
phase: foundation-model
domain:
  - "vision"
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "org-backed"
  - "research-origin"
ecosystem_role:
  - "Competes with document VLMs and PaddleOCR-style pipelines; complementary to vLLM/SGLang/Ollama runtimes"
best_for:
  - "High-concurrency or edge document OCR where a 0.9B model keeps latency and cost low"
  - "Extracting tables, formulas, and structured fields from complex real-world layouts"
avoid_if:
  - "You need a large general VLM for open-ended visual reasoning beyond documents"
  - "Your documents are simple enough that a lightweight classical OCR already suffices"
enrichment_notes: "Verified via GitHub API + README; OmniDocBench V1.5 score self-reported (94.62). Draft pending review."
---

## Overview

GLM-OCR is a small (0.9B-parameter) multimodal OCR model aimed at complex document understanding — tables, formulas, code-heavy pages, seals, and irregular layouts. It is built on the GLM-V encoder-decoder architecture, combining a CogViT visual encoder, a lightweight cross-modal connector with token downsampling, and a GLM-0.5B language decoder, and it is trained with a Multi-Token-Prediction loss plus full-task reinforcement learning to raise recognition accuracy and generalization.

## Why it's in the Arsenal

It is an Apache-2.0, genuinely small OCR model that reports top-tier OmniDocBench results while remaining cheap enough for high-concurrency and edge serving — a practical point in the design space between heavyweight VLMs and classical OCR.

## Architecture

A two-stage pipeline runs layout analysis (based on PP-DocLayout-V3) followed by parallel recognition. The model itself downsamples visual tokens through a lightweight connector so the GLM-0.5B decoder handles a manageable sequence, and MTP loss plus RL stabilise training. It ships an SDK (`pip install glmocr`) with an agent-friendly "Skill" mode, and supports deployment via vLLM, SGLang, and Ollama.

## Ecosystem Position

GLM-OCR competes with document-focused VLMs and with layout-first pipelines like PaddleOCR, but differentiates on parameter count: at 0.9B it is far smaller than typical document VLMs, trading broad visual reasoning for OCR throughput. It is complementary to the serving runtimes (vLLM, SGLang, Ollama) that host it and to the RAG retrieval and ingestion pipelines downstream.

## Getting Started

Install the `glmocr` SDK and set an API key for hosted use, or download weights from Hugging Face / ModelScope and serve with vLLM, SGLang, or Ollama. A LLaMA-Factory fine-tuning tutorial is provided for domain adaptation.

## Key Use Cases

High-volume invoice/receipt/table extraction; edge OCR on constrained hardware; agent tool for reading documents; fine-tuned domain-specific OCR.

## Strengths

Small footprint, Apache-2.0, strong reported document benchmarks, multi-runtime support, and a ready SDK with fine-tuning recipes.

## Limitations

Benchmark numbers are vendor-reported and need independent verification on your own layouts; a 0.9B model is specialised for OCR and will not perform general visual reasoning; the two-stage layout+recognition pipeline adds a dependency (PP-DocLayout-V3) beyond a single forward pass. Non-Latin scripts and degraded scans still warrant testing.

## Relation to the Arsenal

Sits alongside DeepSeek-OCR and other document-processing projects, and above the RAG ingestion and inference-engine entries that serve or consume it.

## Resources

- [GitHub](https://github.com/zai-org/GLM-OCR)
- [Model weights](https://huggingface.co/zai-org/GLM-OCR)
- [API docs](https://docs.z.ai/guides/vlm/glm-ocr)
