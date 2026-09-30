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

Marker appears in this catalog as a reference point for the data-and-retrieval phase; the useful question is what your corpus does to it that its own test data does not. The sections below state what it claims to do and what adopting it would commit you to.

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

1. **Integrating Marker**: treat it as a dependency with its own failure modes rather than a library call — decide timeout, retry and degraded-mode behaviour before the first query goes through it, and put it behind an interface so it can be replaced without a rewrite.
2. **What to measure first**: `ingest`, `scientific`, `papers`, `technical` decide whether Marker works for you; measure them on your own data because the published numbers are conditioned on someone else's setup.
3. **Choosing between candidates**: compare Marker against `docling`, `mineru`, `markitdown` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- What Marker gives you that reading the feature list does not: built on the Surya model family (detection, recognition, layout, table-rec): pages are segmented into typed blocks, each processed by specialized models, then assembled by a reading-order and post-processing stage into structured output with extracted images. Hybrid mode routes low-confidence blocks to an LLM (Gemini/local) for correction; a FastAPI server and Python API cover service and library use, which is the part you have to evaluate against your own workload.
- Sits in the data-and-retrieval phase alongside the alternatives named in its Ecosystem Position section; cross-phase comparison is usually a category error rather than a useful alternative.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- Adoption risk for Marker is mostly operational rather than technical — resource cost at your scale, dependency failure behaviour, and the upgrade path when interfaces move.
- Nothing in this entry substitutes for running Marker against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- Where Marker overlaps `docling`, `mineru`, `markitdown`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

This sits in content/projects/data-and-retrieval as a document-to-markdown converter, which places it upstream of every entry in this phase that consumes parsed text: an extraction step like this one runs before chunking, and chunking runs before the vector stores such as chroma, qdrant and weaviate. Compared with the RAG platform entries in the same phase it is not a retrieval system at all, so the honest boundary is that you would pair it with one rather than choose between them.

## Resources

- [GitHub](https://github.com/datalab-to/marker)
- [Documentation](https://github.com/datalab-to/marker#readme)

---
*Last reviewed: 2026-07-08 by @maintainer; github_stars 37280 as of 2026-07-08; last commit 2026-07-07; both verified via the GitHub API.*
