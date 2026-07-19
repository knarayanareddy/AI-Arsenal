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
org_or_maintainer: "deepseek-ai"
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
id: deepseek-ocr
name: "DeepSeek-OCR"
artifact_type: model
category: multimodal
subcategory: open-source-models
description: "DeepSeek vision-language OCR model studying optical context compression by encoding long text as compact vision tokens"
github_url: https://github.com/deepseek-ai/DeepSeek-OCR
license: "MIT"
primary_language: "Python"
tags:
  - "multimodal"
  - "vision"
  - "self-hosted"
maturity: beta
cost_model: open-source
github_stars: 23609
last_commit: "2026-01-27"
docs_url: https://huggingface.co/deepseek-ai/DeepSeek-OCR
phase: foundation-model
domain:
  - "vision"
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "study-and-reference"
health_signals:
  - "org-backed"
  - "research-origin"
ecosystem_role:
  - "Alternative to layout-first OCR pipelines such as PaddleOCR and to VLM-based document readers"
best_for:
  - "Compressing long documents into few vision tokens before an LLM reads them"
  - "Self-hosted document OCR where a vision encoder replaces a text tokenizer"
avoid_if:
  - "You need a turnkey layout-analysis pipeline with table/formula post-processing out of the box"
  - "You lack a CUDA GPU and flash-attention build environment"
enrichment_notes: "Verified via GitHub API + repo README; arXiv 2510.18234. Draft pending human review."
---

## Overview

DeepSeek-OCR investigates how far visual-text compression can be pushed: instead of feeding a document's characters through a text tokenizer, it renders the page and lets a vision encoder emit a compact set of vision tokens that a language decoder reads back as text. The premise — dubbed "contexts optical compression" — is that a page of text carries a lot of redundancy that a vision encoder can represent in far fewer tokens than the equivalent character stream, shrinking the context budget for downstream LLMs. It ships open weights (MIT) plus vLLM and Transformers inference paths.

## Why it's in the Arsenal

It is a concrete, open-weight probe of an idea engineers increasingly care about — treating rendered text as an image to save context tokens — from a lab with a strong track record. The MIT license and upstream vLLM support make it directly usable rather than a paper artifact.

## Architecture

The model pairs a vision encoder with a language decoder in the standard VLM arrangement, but the design goal is compression ratio: how few vision tokens can still round-trip a dense page of text. Inference is supported through vLLM (a dedicated recipe) and through Hugging Face Transformers; the reference environment targets CUDA 11.8 with torch 2.6 and flash-attention. A successor, DeepSeek-OCR-2 ("Visual Causal Flow"), continues the line of work.

## Ecosystem Position

It competes with classical OCR stacks like PaddleOCR and Tesseract and with general document VLMs, but it is not a drop-in layout pipeline — it is a research-grade model that reframes OCR as token compression rather than bounding-box detection. It is complementary to serving runtimes like vLLM and SGLang, which host it, and sits upstream of RAG document-ingestion flows that would consume its output.

## Getting Started

Clone the repo, create the pinned conda environment, install the provided vLLM wheel plus flash-attn, and run the vLLM or Transformers inference scripts against your image/PDF inputs. Weights are on Hugging Face under `deepseek-ai/DeepSeek-OCR`.

## Key Use Cases

Compressing long PDFs into vision tokens ahead of an LLM; self-hosted document transcription; research on vision-token efficiency; feeding OCR output into retrieval pipelines.

## Strengths

Open MIT weights, upstream vLLM support, a genuinely novel compression angle, and backing from a lab that ships reproducible model releases.

## Limitations

It is a research release, not a productized document-understanding SDK: there is no built-in table/formula/reading-order post-processor, the environment is tightly pinned (CUDA 11.8, specific vLLM wheel, flash-attn), and GPU is effectively required. Accuracy on heavily structured layouts versus dedicated pipelines needs workload-specific evaluation.

## Relation to the Arsenal

Complements the OCR and document-processing projects already catalogued and the vLLM/SGLang inference engines that serve it; upstream of RAG ingestion entries.

## Resources

- [GitHub](https://github.com/deepseek-ai/DeepSeek-OCR)
- [Model weights](https://huggingface.co/deepseek-ai/DeepSeek-OCR)
- [Paper (arXiv 2510.18234)](https://arxiv.org/abs/2510.18234)
