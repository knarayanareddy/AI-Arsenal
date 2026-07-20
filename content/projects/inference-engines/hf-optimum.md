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
org_or_maintainer: huggingface
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 9
trending_score: 31
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: hf-optimum
name: Hugging Face Optimum
artifact_type: library
category: tooling
subcategory: libraries
description: Hugging Face's extension of Transformers that accelerates training and inference on specialized hardware via ONNX Runtime, TensorRT, OpenVINO
github_url: https://github.com/huggingface/optimum
license: Apache-2.0
primary_language: Python
tags:
  - inference
  - self-hosted
  - fine-tuning
maturity: production
cost_model: open-source
github_stars: 3447
last_commit: '2026-07-17'
docs_url: https://huggingface.co/docs/optimum/
phase: inference-engine
domain:
  - general-purpose
  - language
  - vision
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - actively-maintained
  - org-backed
ecosystem_role:
  - A bridge that exports and optimizes Transformers models onto hardware-accelerated inference backends.
best_for:
  - You use Hugging Face Transformers and want to export/optimize models to ONNX, TensorRT, or OpenVINO
  - You want a familiar Transformers-style API for quantization and accelerated inference
avoid_if:
  - You are not in the Transformers ecosystem, where using the backend runtimes directly may be simpler
  - You need a full serving stack rather than an optimization/export bridge
enrichment_notes: Repository, Apache-2.0 license, and 2026-07-07 activity verified via the GitHub API on 2026-07-12. A bridge layer; performance comes from the underlying backends.
---

## Overview

Optimum is Hugging Face's extension of the Transformers library that accelerates model training and inference on targeted hardware and runtimes. It provides a familiar Transformers-style API to export models to formats like ONNX, then optimize and run them via backends such as ONNX Runtime, NVIDIA TensorRT, Intel OpenVINO, and others, along with quantization utilities, so optimized inference stays close to the standard Transformers workflow.

## Why it's in the Arsenal

Moving a Transformers model to an optimized runtime is common but fiddly, and Optimum smooths that path with a consistent API across backends, making it a practical inference-optimization entry for the Hugging Face ecosystem.

## Architecture

Optimum offers `ORTModel`-style classes that mirror `AutoModel` but run on an accelerated backend: it exports a model to ONNX (or a backend-specific format), applies graph optimizations and post-training or dynamic/static quantization, and loads the result behind the same pipeline/generate interface. Backend-specific subpackages (onnxruntime, TensorRT, OpenVINO, Intel/Habana integrations) implement the export and runtime bindings under this unified surface.

## Ecosystem Position

Optimum sits between Transformers and inference runtimes like ONNX Runtime, TensorRT, and OpenVINO, differentiating by exposing them through the familiar Transformers API rather than requiring direct backend use. Compared with using those runtimes directly it lowers friction for Hugging Face users, and compared with a serving engine it optimizes and exports models rather than hosting them, so it complements servers like TGI or vLLM.

## Getting Started

Install the relevant extra (for example `pip install optimum[onnxruntime]`), replace `AutoModel...` with the corresponding `ORTModel...` class to export/run on ONNX Runtime, and apply the quantization utilities; other extras target TensorRT and OpenVINO.

## Key Use Cases

Exporting Transformers models to ONNX; quantizing models for faster inference; running on TensorRT/OpenVINO with a familiar API; hardware-accelerated training integrations.

## Strengths

Transformers-consistent API, multiple hardware/runtime backends, export and quantization tooling, Hugging Face maintenance, production use, and an Apache-2.0 license.

## Limitations

It is a bridge layer whose speedups come from the underlying backends, it is most useful inside the Transformers ecosystem, and it optimizes/exports models rather than providing a full serving stack.

## Relation to the Arsenal

It connects the Transformers-based model entries to the inference-optimization runtimes in the catalog.

## Resources

- [GitHub repository](https://github.com/huggingface/optimum)
- [Documentation](https://huggingface.co/docs/optimum/)
