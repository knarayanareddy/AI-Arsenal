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
org_or_maintainer: getomni-ai
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 19
trending_score: 32
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: zerox
name: Zerox OCR
artifact_type: library
category: computer-vision
subcategory: document-processing
description: A document-extraction library that renders each page to an image and asks a vision LLM to return clean Markdown, handling complex layouts model-agnostically
github_url: https://github.com/getomni-ai/zerox
license: MIT
primary_language: TypeScript
tags:
  - multimodal
  - llm
  - self-hosted
  - data
maturity: beta
cost_model: open-source
github_stars: 12259
last_commit: '2025-05-20'
docs_url: https://getomni.ai/
phase: data-and-retrieval
domain:
  - vision
  - language
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - community-driven
  - research-origin
ecosystem_role:
  - A vision-LLM OCR pipeline that turns arbitrary document pages into structured Markdown regardless of layout complexity.
best_for:
  - You need clean Markdown from messy PDFs with tables and mixed layouts and can call a vision LLM per page
  - You want a model-agnostic extractor that works with GPT-4o-class, Claude, or local vision models
avoid_if:
  - You need cheap, offline, high-volume OCR, since per-page vision-LLM calls cost tokens and add latency
  - You require deterministic output, as generative extraction can vary run to run
enrichment_notes: Repository, MIT license, and 2025-05-20 activity verified via the GitHub API on 2026-07-12. Cost and accuracy depend on the chosen vision LLM.
---

## Overview

Zerox is a document-extraction library that takes a different approach to OCR: it renders each page of a PDF or document to an image and sends it to a vision-capable large language model with an instruction to return clean Markdown. Because a multimodal LLM does the reading, it copes with tables, columns, and mixed layouts that trip classic OCR engines.

## Why it's in the Arsenal

It exemplifies the shift from dedicated OCR engines to vision-LLM extraction, and its model-agnostic, Markdown-first design is a pragmatic pattern for feeding documents into RAG systems, making it a current and instructive entry.

## Architecture

The pipeline converts pages to images, then issues a per-page prompt to a configured vision model (OpenAI, Anthropic, or a local endpoint) asking for Markdown that preserves structure like tables and headings; results are concatenated into a document. It handles image resizing, concurrency across pages, and provider selection, treating the LLM as a swappable backend rather than shipping its own recognizer.

## Ecosystem Position

Zerox competes with layout-aware OCR models and libraries like the document models cataloged nearby, differentiating by delegating recognition to general vision LLMs rather than a trained OCR network. Compared with Tesseract-based pipelines it is far better on complex layouts but costs tokens and latency per page, so it complements cheap offline OCR rather than replacing it universally.

## Getting Started

Install with `npm install zerox` (or the Python port), set the API key for your chosen vision provider, and call `zerox({ filePath, model })` to receive Markdown; concurrency and model parameters are configurable.

## Key Use Cases

Converting complex PDFs to Markdown for RAG; extracting tables and forms from mixed layouts; quick document-to-text for LLM apps; provider-flexible OCR experimentation.

## Strengths

Handles complex layouts and tables well, model-agnostic across vision providers, Markdown output ideal for retrieval, simple API, and an MIT license.

## Limitations

Per-page vision-LLM calls incur token cost and latency, output is nondeterministic and can hallucinate, quality tracks the chosen model, and it is unsuitable for very high-volume or strictly offline workloads without a local model.

## Relation to the Arsenal

It represents the vision-LLM OCR pattern in the document-processing area and connects to RAG-ingestion tips.

## Resources

- [GitHub repository](https://github.com/getomni-ai/zerox)
- [OmniAI platform](https://getomni.ai/)
