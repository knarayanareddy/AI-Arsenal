---
id: docling
name: Docling
version_tracked: null
artifact_type: library
category: rag
subcategory: document-processing
description: IBM-origin open-source toolkit for parsing and exporting documents for generative AI
github_url: https://github.com/docling-project/docling
license: MIT
primary_language: Python
org_or_maintainer: null
tags:
  - rag
  - data
  - retrieval
maturity: production
cost_model: open-source
github_stars: 63499
github_stars_last_30d: 2004
trending_score: 55
last_commit: '2026-07-20'
docs_url: https://docling-project.github.io/docling/
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: data-and-retrieval
domain:
  - language
  - vision
relation_to_stack:
  - build-on-top
health_signals:
  - org-backed
  - community-driven
  - actively-maintained
ecosystem_role:
  - IBM's open-source document conversion library, specializing in high-fidelity parsing of complex document formats (PDF, DOCX) into structured, LLM-ready representations
best_for:
  - You need high-fidelity parsing of complex documents (PDFs with tables, figures, multi-column layouts) into structured formats preserving that structure, not just flattened text
  - You want an open-source, self-hostable document-parsing library backed by an established organization (IBM Research) rather than a closed-source managed API
avoid_if:
  - You need the simplest possible plain-text extraction from straightforward documents — a lighter-weight library may be unnecessary overhead if your documents don't have complex layouts, tables, or figures
  - You need managed, zero-infrastructure document parsing — a hosted service like LlamaParse trades self-hosting control for operational simplicity
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Docling is developed and backed by IBM Research, giving credible org-backing signal; it's increasingly cited alongside Unstructured and LlamaParse as a leading open-source document-parsing option specifically for RAG pipelines dealing with complex layouts.
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

An open-source document conversion library from IBM Research, specializing in accurately parsing complex document formats (PDF, DOCX, PPTX) into structured representations that preserve tables, figures, and layout information for downstream RAG use.

## Why it's in the Arsenal

IBM's open-source document conversion library, specializing in high-fidelity parsing of complex document formats (PDF, DOCX) into structured, LLM-ready representations. It earns a place in the Arsenal because it directly addresses a recurring decision point: you need high-fidelity parsing of complex documents (PDFs with tables, figures, multi-column layouts) into structured formats preserving that structure, not just flattened text. See Strengths / Limitations below before adopting it.

## Architecture

Uses layout-analysis and table-structure-recognition models to parse documents beyond simple text extraction, producing a structured document representation (preserving reading order, tables, and figure references) that can be exported to Markdown, JSON, or other formats for ingestion into RAG pipelines.

## Ecosystem Position

Upstream: none of particular note. Downstream: none of particular note. Competing: Unstructured, LlamaParse — all three target the 'complex document parsing for RAG' niche with different architectural approaches and licensing/hosting models. Complementary: commonly used as the document-ingestion step feeding a vector database and RAG framework like LlamaIndex or Haystack.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Scenario**: you need high-fidelity parsing of complex documents (PDFs with tables, figures, multi-column layouts) into structured formats preserving that structure, not just flattened text
2. **Scenario**: you want an open-source, self-hostable document-parsing library backed by an established organization (IBM Research) rather than a closed-source managed API

## Strengths

- You need high-fidelity parsing of complex documents (PDFs with tables, figures, multi-column layouts) into structured formats preserving that structure, not just flattened text
- You want an open-source, self-hostable document-parsing library backed by an established organization (IBM Research) rather than a closed-source managed API

## Limitations

- You need the simplest possible plain-text extraction from straightforward documents — a lighter-weight library may be unnecessary overhead if your documents don't have complex layouts, tables, or figures
- You need managed, zero-infrastructure document parsing — a hosted service like LlamaParse trades self-hosting control for operational simplicity

## Relation to the Arsenal

This is a data-and-retrieval entry: it documents a vector database, document-processing tool, or RAG platform. For job-based tool comparisons (e.g. web-scraping, vector-search), see [tools/data-ingestion/](../../tools/data-ingestion/_index.md).

## Resources

- [GitHub](https://github.com/docling-project/docling)
- [Documentation](https://docling-project.github.io/docling/)
