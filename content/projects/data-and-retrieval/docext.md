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
org_or_maintainer: "NanoNets"
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
id: docext
name: "docext"
artifact_type: tool
category: data-pipelines
subcategory: document-processing
description: "On-premises vision-language document extraction, Markdown conversion, and benchmarking toolkit from Nanonets"
github_url: https://github.com/NanoNets/docext
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "vision"
  - "multimodal"
  - "data"
  - "benchmark"
  - "self-hosted"
maturity: beta
cost_model: open-source
github_stars: 2032
last_commit: "2026-03-17"
docs_url: https://github.com/NanoNets/docext
phase: data-and-retrieval
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
  - "On-prem document-intelligence tool that complements OCR/VLM models and competes with hosted extraction APIs"
best_for:
  - "Extracting structured fields and Markdown from sensitive documents on-premises"
  - "Benchmarking OCR-free VLM extraction across tables and long documents"
avoid_if:
  - "You need a continuously maintained connector and workflow platform"
  - "Your compliance policy disallows vendor-associated model or benchmark components"
enrichment_notes: "Last commit 2026-03-17; do not mark actively-maintained. Nanonets-OCR-s and leaderboard claims are vendor-associated. Draft pending review."
---

## Overview

docext is an on-premises document-intelligence toolkit for turning complex files into Markdown and structured information. It uses vision-language models for OCR-free extraction and pairs the extraction path with a benchmark suite covering classification, key information extraction, tables, and long documents.

## Why it's in the Arsenal

It earns a slot because it combines document processing and evaluation in a package that can stay inside a controlled environment. That makes it relevant to teams handling sensitive PDFs and to engineers who need to compare document VLMs rather than trust a single OCR demo.

## Architecture

The toolkit provides separate workflows for PDF-to-Markdown and extraction tasks, model adapters, structured outputs, and benchmark datasets. The README highlights Nanonets-OCR-s, a compact 3B image-to-Markdown model, alongside evaluation categories such as tables, signatures, watermarks, and long-context documents; local deployment keeps the model and source files on the operator's infrastructure.

## Ecosystem Position

docext complements the Arsenal's OCR and multimodal foundation models and competes with hosted document APIs and classical OCR-plus-layout pipelines. Its benchmark component makes it more than a parser, but it does not replace a complete ingestion, review, or records-governance system.

## Getting Started

Install the `docext` package from PyPI or clone the repository, then follow the PDF2MD and extraction README for model setup. Start with the provided Colab or local example on a small document set, and use the benchmark commands to compare extraction categories before wiring it into ingestion.

## Key Use Cases

Use it for private PDF-to-Markdown conversion, table and key-field extraction, document classification, and local comparison of VLM document models. The benchmark directory is useful when selecting a model for a specific document failure mode.

## Strengths

On-premises execution, OCR-free VLM extraction, Markdown conversion, and a multi-task leaderboard provide a clear path from experiment to internal evaluation. Apache-2.0 licensing covers the repository code.

## Limitations

The default-branch last commit is 2026-03-17, so maintenance should not be represented as active. Nanonets-OCR-s performance and leaderboard claims are vendor-associated; model access, GPU memory, parsing edge cases, and business-document accuracy need independent testing.

## Relation to the Arsenal

It belongs downstream of multimodal models and upstream of RAG ingestion and document workflows. Compared with GLM-OCR or DeepSeek-OCR, docext is a toolkit and benchmark surface rather than a single foundation checkpoint.

## Resources

- [GitHub](https://github.com/NanoNets/docext)
- [PyPI](https://pypi.org/project/docext/)
