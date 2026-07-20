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
org_or_maintainer: pymupdf
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 69
trending_score: 36
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: pymupdf
name: PyMuPDF
artifact_type: library
category: data-pipelines
subcategory: document-processing
description: A high-performance Python library binding the MuPDF engine for fast text, image, and table extraction and manipulation of PDFs and other document formats
github_url: https://github.com/pymupdf/PyMuPDF
license: AGPL-3.0
primary_language: Python
tags:
  - data
  - self-hosted
  - multimodal
maturity: production
cost_model: open-source
github_stars: 10270
last_commit: '2026-07-20'
docs_url: https://pymupdf.readthedocs.io/
phase: data-and-retrieval
domain:
  - language
  - vision
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A fast PDF/document toolkit for extracting text, images, and tables and for rendering pages to images in ingestion pipelines.
best_for:
  - You need fast, reliable extraction of digital-PDF text, images, and tables for RAG ingestion
  - You need to render PDF pages to images to feed OCR or vision-LLM extractors
avoid_if:
  - Your PDFs are scanned images with no text layer, which require an OCR engine rather than extraction
  - AGPL-3.0 copyleft is incompatible with your product and you cannot obtain a commercial MuPDF license
enrichment_notes: Repository, AGPL-3.0 license, and 2026-07-11 activity verified via the GitHub API on 2026-07-12. AGPL/commercial dual license from Artifex; review terms before proprietary use.
---

## Overview

PyMuPDF is a high-performance Python binding to the MuPDF engine for reading, extracting from, and manipulating PDFs and other document formats (XPS, EPUB, and images). It extracts text with positions, images, and tables, renders pages to pixmaps, and edits documents, and it is prized for being significantly faster than most pure-Python PDF libraries.

## Why it's in the Arsenal

Document ingestion for RAG almost always starts with pulling clean text and images out of PDFs, and PyMuPDF is one of the fastest, most capable libraries for that job, so it is a foundational data-pipeline entry.

## Architecture

PyMuPDF wraps the C-based MuPDF library, exposing a `Document`/`Page` API that reads the PDF content stream to recover text with coordinates and fonts, extract embedded images, detect simple tables, and rasterize pages to images at arbitrary DPI. Because the heavy lifting happens in native code, throughput is high, and it also supports annotations, redaction, and page manipulation for document workflows.

## Ecosystem Position

PyMuPDF competes with pdfplumber, pypdf, and pdfminer on extraction, differentiating on speed and breadth of features. It is complementary to OCR engines like Tesseract and vision models: PyMuPDF handles born-digital PDFs with a text layer and prepares page images that OCR models then read, so it often sits upstream of the recognition models cataloged nearby.

## Getting Started

Install with `pip install pymupdf`, open a file with `fitz.open('doc.pdf')`, then call `page.get_text()`, `page.get_images()`, `page.find_tables()`, or `page.get_pixmap()` to extract or render content.

## Key Use Cases

Extracting text and tables from digital PDFs for RAG; rendering pages to images for OCR/vision pipelines; splitting, merging, and redacting documents; building document-processing services.

## Strengths

Very fast native performance, rich extraction (text with coordinates, images, tables), page rendering, document editing, active maintenance, and production use across many projects.

## Limitations

It only extracts existing text layers, so scanned image-only PDFs need OCR first; the AGPL-3.0 license (or a paid Artifex commercial license) has real implications for proprietary software; and complex table detection is heuristic and may need validation.

## Relation to the Arsenal

It is the extraction front end that feeds OCR models and retrieval pipelines in the data-and-retrieval area.

## Resources

- [GitHub repository](https://github.com/pymupdf/PyMuPDF)
- [Documentation](https://pymupdf.readthedocs.io/)
