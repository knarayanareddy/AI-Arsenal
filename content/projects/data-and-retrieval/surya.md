---
id: surya
name: Surya
version_tracked: null
artifact_type: library
category: computer-vision
subcategory: document-processing
description: Modern OCR toolkit with 90+ language text recognition, layout analysis, reading-order detection, and table recognition — the models behind Marker
github_url: https://github.com/datalab-to/surya
license: GPL-3.0
primary_language: Python
org_or_maintainer: Datalab
tags:
  - data
  - multimodal
  - llm
maturity: production
cost_model: open-source
github_stars: 21121
github_stars_last_30d: 64
trending_score: 45
last_commit: '2026-07-17'
docs_url: https://github.com/datalab-to/surya#readme
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain:
  - vision
  - language
relation_to_stack:
  - build-on-top
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - 'The transformer-era open OCR stack: purpose-trained models for detection, recognition, layout, reading order, and tables that benchmark competitively against cloud OCR APIs — and serve as the engine layer that Marker composes into document conversion.'
best_for:
  - You need OCR components (not a full converter) to embed in a custom document pipeline — each capability (detection, recognition, layout, order, tables, LaTeX) is a separately callable model with clean Python APIs
  - You process multilingual scanned documents — 90+ language support with self-reported benchmarks faster and more accurate than Tesseract, competitive with Google Cloud Vision
avoid_if:
  - You want an end-to-end PDF-to-markdown tool — that is Marker (built on Surya); using Surya directly means assembling the pipeline yourself
  - GPL-3.0 plus revenue-conditional model weights conflict with your commercial embedding plans — PaddleOCR (Apache-2.0) avoids the constraint
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - paddleocr
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (21,057), primary language, license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/datalab-to/surya
    date: '2026-07-08'
    description: 21,057 stars on GitHub as of 2026-07-08 (GitHub API)
featured: false
status: active
---

## Overview

An open-source OCR toolkit providing the model layer for modern document AI: text detection, text recognition across 90+ languages, layout analysis (tables, images, headers), reading-order detection, table-structure recognition, and LaTeX OCR. Built by Datalab as the foundation for Marker, but designed for standalone use in custom document-processing pipelines.

## Why it's in the Arsenal

The transformer-era open OCR stack: purpose-trained models for detection, recognition, layout, reading order, and tables that benchmark competitively against cloud OCR APIs — and serve as the engine layer that Marker composes into document conversion. It earns a place in the Arsenal because it directly addresses a recurring decision point: you need OCR components (not a full converter) to embed in a custom document pipeline — each capability (detection, recognition, layout, order, tables, LaTeX) is a separately callable model with clean Python APIs. See Strengths / Limitations below before adopting it.

## Architecture

Each task is a dedicated efficient transformer model: line-level detection feeds recognition; layout and reading-order models classify and sequence regions; table-rec recovers row/column structure. Models are trained for batch GPU throughput (with CPU/MPS fallback), exposed via Python predictor classes and a CLI; benchmarks in the repo compare against Tesseract and Google Cloud Vision with published methodology.

## Ecosystem Position

Upstream: PyTorch, Hugging Face model hosting. Downstream: Marker composes Surya models into document conversion; community projects embed the detector/recognizer independently. Competing: PaddleOCR (industrial breadth, permissive license), Tesseract (legacy baseline), docTR. The GPL+commercial-terms licensing mirrors Marker's — fine for internal use, needs review for shipped products.

## Getting Started

```bash
pip install surya-ocr
surya_ocr document.png  # detection + recognition
surya_layout document.png
surya_table document.png
```

## Key Use Cases

1. **Scenario**: you need OCR components (not a full converter) to embed in a custom document pipeline — each capability (detection, recognition, layout, order, tables, LaTeX) is a separately callable model with clean Python APIs
2. **Scenario**: you process multilingual scanned documents — 90+ language support with self-reported benchmarks faster and more accurate than Tesseract, competitive with Google Cloud Vision

## Strengths

- You need OCR components (not a full converter) to embed in a custom document pipeline — each capability (detection, recognition, layout, order, tables, LaTeX) is a separately callable model with clean Python APIs
- You process multilingual scanned documents — 90+ language support with self-reported benchmarks faster and more accurate than Tesseract, competitive with Google Cloud Vision

## Limitations

- You want an end-to-end PDF-to-markdown tool — that is Marker (built on Surya); using Surya directly means assembling the pipeline yourself
- GPL-3.0 plus revenue-conditional model weights conflict with your commercial embedding plans — PaddleOCR (Apache-2.0) avoids the constraint

## Relation to the Arsenal

This is a data-and-retrieval entry: it documents a vector database, document-processing tool, or RAG platform. For job-based tool comparisons (e.g. web-scraping, vector-search), see [tools/data-ingestion/](../../tools/data-ingestion/_index.md).

## Resources

- [GitHub](https://github.com/datalab-to/surya)
- [Documentation](https://github.com/datalab-to/surya#readme)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (21,057 stars, last commit 2026-07-08, verified via GitHub API on 2026-07-08)*
