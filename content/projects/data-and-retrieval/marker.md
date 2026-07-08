---
id: marker
name: "Marker"
version_tracked: null
artifact_type: tool
category: data-pipelines
subcategory: document-processing
description: "Deep-learning PDF-to-markdown converter that handles tables, equations, and layout with optional LLM-assisted accuracy boosts"
github_url: "https://github.com/datalab-to/marker"
license: "GPL-3.0"
primary_language: Python
org_or_maintainer: "Datalab (Surya lineage)"
tags: [data, rag, llm]
maturity: production
cost_model: open-source
github_stars: 37280
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-07-07"
docs_url: "https://github.com/datalab-to/marker#readme"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [language, vision]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - "The model-pipeline approach to PDF conversion: purpose-trained layout/OCR models (the Surya stack) rather than heuristics, sitting between fast-but-lossy converters (MarkItDown) and heavy full-service extractors — a standard choice for scientific-PDF RAG ingestion."
best_for:
  - "You ingest scientific papers or technical PDFs where equations (to LaTeX), tables, and multi-column layout must survive conversion — Marker's benchmark suite specifically targets these failure modes"
  - "You need batch throughput on GPUs — pages process in parallel with reported ~100+ pages/sec on H100-class hardware in batch mode"
avoid_if:
  - "GPL-3.0 (plus revenue-conditional commercial terms for the models) conflicts with your product's licensing — Docling (MIT) or MarkItDown (MIT) are safer embeds"
  - "Your documents are simple digital-native PDFs — pdfplumber-class text extraction is orders of magnitude cheaper than running layout models"
upstream_dependencies: []
downstream_consumers: []
alternatives: [docling, mineru, markitdown]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (37,280), primary language, license, and last commit (2026-07-07) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/datalab-to/marker", "date": "2026-07-08", "description": "37,280 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

A document-conversion tool that turns PDFs, images, EPUBs, and office documents into clean Markdown, JSON, or HTML using a pipeline of purpose-trained deep-learning models: layout detection, OCR, reading-order resolution, table structure recovery, and LaTeX equation conversion. An optional --use_llm mode merges model output with LLM passes for the hardest structures (complex merged-cell tables, inline math).

## Why it's in the Arsenal

The model-pipeline approach to PDF conversion: purpose-trained layout/OCR models (the Surya stack) rather than heuristics, sitting between fast-but-lossy converters (MarkItDown) and heavy full-service extractors — a standard choice for scientific-PDF RAG ingestion. It earns a place in the Arsenal because it directly addresses a recurring decision point: you ingest scientific papers or technical PDFs where equations (to LaTeX), tables, and multi-column layout must survive conversion — Marker's benchmark suite specifically targets these failure modes. See Strengths / Limitations below before adopting it.

## Architecture

Built on the Surya model family (detection, recognition, layout, table-rec): pages are segmented into typed blocks, each processed by specialized models, then assembled by a reading-order and post-processing stage into structured output with extracted images. Hybrid mode routes low-confidence blocks to an LLM (Gemini/local) for correction; a FastAPI server and Python API cover service and library use.

## Ecosystem Position

Upstream: PyTorch, the Surya OCR/layout models (same maintainer). Competing: MinerU (closest in scope), Docling (IBM, MIT-licensed, RAG-framework integrations), MarkItDown (fast heuristics, no layout models). Complementary: output feeds chunkers in any RAG stack; Datalab offers a hosted API with SLAs for teams that outgrow self-hosting.

## Getting Started

```bash
pip install marker-pdf
marker_single document.pdf --output_format markdown
# batch a folder:
marker in_folder/ --workers 4
```

## Key Use Cases

1. **Scenario**: you ingest scientific papers or technical PDFs where equations (to LaTeX), tables, and multi-column layout must survive conversion — Marker's benchmark suite specifically targets these failure modes
2. **Scenario**: you need batch throughput on GPUs — pages process in parallel with reported ~100+ pages/sec on H100-class hardware in batch mode

## Strengths

- You ingest scientific papers or technical PDFs where equations (to LaTeX), tables, and multi-column layout must survive conversion — Marker's benchmark suite specifically targets these failure modes
- You need batch throughput on GPUs — pages process in parallel with reported ~100+ pages/sec on H100-class hardware in batch mode

## Limitations

- GPL-3.0 (plus revenue-conditional commercial terms for the models) conflicts with your product's licensing — Docling (MIT) or MarkItDown (MIT) are safer embeds
- Your documents are simple digital-native PDFs — pdfplumber-class text extraction is orders of magnitude cheaper than running layout models

## Relation to the Arsenal

This is a data-and-retrieval entry: it documents a vector database, document-processing tool, or RAG platform. For job-based tool comparisons (e.g. web-scraping, vector-search), see [tools/data-ingestion/](../../tools/data-ingestion/_index.md).

## Resources

- [GitHub](https://github.com/datalab-to/marker)
- [Documentation](https://github.com/datalab-to/marker#readme)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (37,280 stars, last commit 2026-07-07, verified via GitHub API on 2026-07-08)*
