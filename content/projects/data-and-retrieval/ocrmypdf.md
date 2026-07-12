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
org_or_maintainer: "ocrmypdf"
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
id: ocrmypdf
name: "OCRmyPDF"
artifact_type: tool
category: computer-vision
subcategory: document-processing
description: "A command-line tool that adds a searchable OCR text layer to scanned PDFs using Tesseract while preserving the original page images and metadata"
github_url: https://github.com/ocrmypdf/OCRmyPDF
license: "MPL-2.0"
primary_language: "Python"
tags:
  - "multimodal"
  - "self-hosted"
  - "data"
maturity: production
cost_model: open-source
github_stars: 34139
last_commit: "2026-07-03"
docs_url: http://ocrmypdf.readthedocs.io/
phase: data-and-retrieval
domain:
  - "vision"
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "community-driven"
ecosystem_role:
  - "A production-grade PDF post-processor that overlays a searchable text layer onto scanned documents via Tesseract."
best_for:
  - "You need to make large archives of scanned PDFs searchable while keeping the original page images intact"
  - "You want a robust, scriptable CLI for batch PDF OCR with deskew, cleanup, and PDF/A output"
avoid_if:
  - "You need structured data extraction (tables, fields) rather than a searchable text overlay"
  - "Your inputs are images or non-PDF formats needing bespoke recognition rather than PDF-in/PDF-out"
enrichment_notes: "Repository, MPL-2.0 license, and 2026-07-03 activity verified via the GitHub API on 2026-07-12. Wraps Tesseract; recognition quality follows that engine."
---

## Overview

OCRmyPDF is a command-line tool that adds an invisible, searchable OCR text layer to scanned PDFs. It runs the Tesseract OCR engine on each page and overlays the recognized text tokens beneath the original image, so the PDF looks identical but becomes selectable, searchable, and indexable, and it can emit archival PDF/A output.

## Why it's in the Arsenal

It solves the very common, practical problem of making document archives searchable at scale without altering their appearance. Its robustness and scriptability make it a standard building block in document-ingestion pipelines.

## Architecture

OCRmyPDF orchestrates a pipeline: it rasterizes or extracts page images, optionally deskews and cleans them, runs Tesseract to produce hOCR, then uses PDF tooling to overlay a hidden layer of recognized text tokens aligned to the image while preserving resolution and metadata. It parallelizes across pages, skips pages that already contain text, and validates output as PDF/A for archiving.

## Ecosystem Position

OCRmyPDF is a workflow layer on top of the Tesseract engine rather than a competing recognizer, so it complements it and differs from vision-language document models that extract structured content: OCRmyPDF keeps the document visually unchanged and simply makes it searchable. Compared with cloud document services it is offline, free, and scriptable.

## Getting Started

Install with `pip install ocrmypdf` (plus Tesseract and Ghostscript), then run `ocrmypdf input.pdf output.pdf`; flags control language, deskew, image cleanup, redo-OCR, and PDF/A conformance for batch archival jobs.

## Key Use Cases

Making scanned-document archives searchable; preparing PDFs for full-text indexing and RAG ingestion; archival PDF/A conversion; automated intake of faxed or scanned paperwork.

## Strengths

Preserves original appearance, robust batch pipeline with deskew and cleanup, PDF/A output, idempotent skipping of already-OCR'd pages, active maintenance, and an MPL-2.0 license.

## Limitations

It produces a searchable text layer, not structured data such as tables or key-value fields; recognition quality is bounded by Tesseract; and it works page-image-in, PDF-out rather than handling arbitrary image formats or semantic extraction.

## Relation to the Arsenal

It is the PDF-workflow companion to Tesseract in the document-processing area and feeds text into retrieval pipelines.

## Resources

- [GitHub repository](https://github.com/ocrmypdf/OCRmyPDF)
- [Documentation](http://ocrmypdf.readthedocs.io/)
