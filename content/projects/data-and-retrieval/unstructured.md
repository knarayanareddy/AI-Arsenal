---
id: unstructured
name: Unstructured
version_tracked: null
artifact_type: library
category: rag
subcategory: document-processing
description: Open-source document ETL for converting complex files into structured data for LLM pipelines
github_url: https://github.com/Unstructured-IO/unstructured
license: Apache-2.0
primary_language: Other
org_or_maintainer: null
tags:
  - rag
  - data
  - retrieval
maturity: production
cost_model: open-source
github_stars: 15169
github_stars_last_30d: 269
trending_score: 37
last_commit: '2026-07-20'
docs_url: https://docs.unstructured.io/
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
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - org-backed
  - community-driven
  - actively-maintained
ecosystem_role:
  - Open-source (with managed API option) library for parsing diverse document formats into structured, LLM-ready elements
best_for:
  - You need to parse a very wide range of document formats (PDF, DOCX, HTML, emails, images) with one consistent library rather than assembling format-specific parsers
  - You want both an open-source self-hosted path and a managed API option from the same project, giving flexibility as your scale or operational preferences change
avoid_if:
  - You need the highest-fidelity layout preservation for complex tables/figures specifically — Docling's layout-analysis models are more specialized for that particular challenge
  - Your document format needs are narrow and well-defined — a lighter, format-specific parser may be simpler than Unstructured's broader abstraction layer
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: 'production-proven requires third-party adoption evidence; only a RevOps/growth-marketing story was found (Reo.Dev customer story), not a genuine production-usage case study. Not claimed. Last reviewed: 2026-07-01.'
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

An open-source library (with an optional managed API) for parsing a wide range of document formats — PDF, Word, HTML, email, images, and more — into structured, normalized elements suitable for RAG ingestion pipelines.

## Why it's in the Arsenal

Open-source (with managed API option) library for parsing diverse document formats into structured, LLM-ready elements. It earns a place in the Arsenal because it directly addresses a recurring decision point: you need to parse a very wide range of document formats (PDF, DOCX, HTML, emails, images) with one consistent library rather than assembling format-specific parsers. See Strengths / Limitations below before adopting it.

## Architecture

Provides format-specific parsing strategies unified under a common element-based output model (titles, narrative text, tables, list items, etc.), with both a fast/rule-based parsing path and slower, more accurate model-based parsing (e.g. for scanned documents requiring OCR) selectable based on accuracy/speed tradeoffs.

## Ecosystem Position

Upstream: none of particular note. Downstream: officially integrated as a document loader in both LangChain and LlamaIndex. Competing: Docling (more specialized layout analysis), LlamaParse (managed-only, LlamaIndex-specific). Complementary: commonly used as the document-ingestion step in a broader RAG pipeline.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Scenario**: you need to parse a very wide range of document formats (PDF, DOCX, HTML, emails, images) with one consistent library rather than assembling format-specific parsers
2. **Scenario**: you want both an open-source self-hosted path and a managed API option from the same project, giving flexibility as your scale or operational preferences change

## Strengths

- You need to parse a very wide range of document formats (PDF, DOCX, HTML, emails, images) with one consistent library rather than assembling format-specific parsers
- You want both an open-source self-hosted path and a managed API option from the same project, giving flexibility as your scale or operational preferences change

## Limitations

- You need the highest-fidelity layout preservation for complex tables/figures specifically — Docling's layout-analysis models are more specialized for that particular challenge
- Your document format needs are narrow and well-defined — a lighter, format-specific parser may be simpler than Unstructured's broader abstraction layer

_Enrichment status: draft — architecture/production claims above are based on the vendor's own description or limited third-party sourcing; not yet independently verified. Last reviewed: 2026-07-01._

## Relation to the Arsenal

This is a data-and-retrieval entry: it documents a vector database, document-processing tool, or RAG platform. For job-based tool comparisons (e.g. web-scraping, vector-search), see [tools/data-ingestion/](../../tools/data-ingestion/_index.md).

## Resources

- [GitHub](https://github.com/Unstructured-IO/unstructured)
- [Documentation](https://docs.unstructured.io/)
