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
org_or_maintainer: "datalab-to"
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
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: chandra-ocr
name: "Chandra"
artifact_type: model
category: computer-vision
subcategory: document-processing
description: "An OCR model from Datalab that handles complex tables, forms, and handwriting with full layout understanding, output as structured Markdown/HTML/JSON"
github_url: https://github.com/datalab-to/chandra
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "multimodal"
  - "self-hosted"
  - "inference"
  - "data"
maturity: beta
cost_model: open-source
github_stars: 11465
last_commit: "2026-06-26"
docs_url: https://www.datalab.to
phase: data-and-retrieval
domain:
  - "vision"
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "A layout-aware OCR model that reconstructs tables, forms, and reading order into structured output."
best_for:
  - "You need accurate extraction of complex tables, forms, and handwriting with preserved layout and reading order"
  - "You want a self-hostable, Apache-2.0 document model that emits Markdown, HTML, or JSON"
avoid_if:
  - "You only need simple printed-text extraction, where lighter engines are cheaper"
  - "You lack a GPU and need very high throughput, since layout models are compute-heavy"
enrichment_notes: "Repository, Apache-2.0 license, and 2026-06-26 activity verified via the GitHub API on 2026-07-12. From the Datalab team behind Marker; accuracy claims are project-reported."
---

## Overview

Chandra is an OCR model from Datalab (the team behind Marker) designed for hard documents: it reads complex tables, forms, and handwriting while reconstructing the page's layout and reading order. Rather than emitting a flat text stream, it produces structured Markdown, HTML, or JSON that preserves the document's semantics.

## Why it's in the Arsenal

Layout-aware extraction that keeps tables and reading order intact is exactly what downstream retrieval and analytics need, and Chandra is a current, permissively licensed model focused on that problem, which makes it a strong document-processing entry.

## Architecture

Chandra is a vision-language model trained for document understanding: an image encoder feeds a decoder that jointly recognizes text and predicts structural elements (table cells, form fields, headings), so the output carries layout rather than just characters. It runs on GPU for practical throughput and exposes output serializers for Markdown, HTML, and JSON to fit different pipelines.

## Ecosystem Position

Chandra competes with vision-LLM approaches like Zerox and with classic engines like Tesseract, differentiating as a purpose-trained document model that is self-hostable and deterministic relative to a general LLM. Compared with Tesseract it is far stronger on tables and handwriting but heavier, and compared with prompting a general vision LLM it trades flexibility for a focused, reproducible extraction model.

## Getting Started

Install from the repository, download the model weights, and run the provided inference script or API on a document image or PDF, selecting the Markdown, HTML, or JSON serializer; GPU is recommended for speed.

## Key Use Cases

Extracting complex tables and forms for analytics; converting handwritten or mixed documents to structured data; high-fidelity ingestion for RAG; replacing brittle template-based extractors.

## Strengths

Strong on tables, forms, and handwriting, preserves layout and reading order, structured multi-format output, self-hostable, active org backing, and an Apache-2.0 license.

## Limitations

It is compute-heavy and benefits from a GPU, overkill for simple printed text, quality figures are project-reported rather than independently benchmarked here, and very unusual layouts may still need review.

## Relation to the Arsenal

It is the layout-aware model in the document-processing area alongside engine- and LLM-based approaches.

## Resources

- [GitHub repository](https://github.com/datalab-to/chandra)
- [Datalab](https://www.datalab.to)
