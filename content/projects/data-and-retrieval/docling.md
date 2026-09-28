---
id: docling
name: Docling
version_tracked: null
artifact_type: library
category: rag
subcategory: document-processing
description: "IBM-originated document parser producing a unified DoclingDocument with layout, tables, formulas and OCR"
github_url: "https://github.com/docling-project/docling"
license: MIT
primary_language: Python
org_or_maintainer: null
tags: [vision, chunking]
maturity: production
cost_model: open-source
github_stars: 68132
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-09-28"
docs_url: "https://docling-project.github.io/docling"
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
domain: [language, vision]
relation_to_stack: [build-on-top]
health_signals: [org-backed, community-driven, actively-maintained]
ecosystem_role:
  - IBM's open-source document conversion library, specializing in high-fidelity parsing of complex document formats (PDF, DOCX) into structured, LLM-ready representations
best_for: ["You need PDFs parsed with table structure and reading order preserved, because chunkers that work on flat text destroy tabular content.", "You have scanned documents and need OCR in the same pipeline as native digital ones, without maintaining two extraction paths.", "You cannot send documents to a third-party service, because local execution is supported for air-gapped and sensitive data."]
avoid_if: ["You need a 95 percent-confidence parse of a clean native PDF and a simple extractor is enough, because Docling adds a heavier pipeline than a text dump needs.", "You cannot afford model-based layout analysis on large batches, because accuracy comes from layout models that cost GPU time per page.", "Your pipeline only handles web pages, since the web-to-Markdown entry in this catalog is a better fit for URLs than for files."]
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Docling is developed and backed by IBM Research, giving credible org-backing signal; it's increasingly cited alongside Unstructured and LlamaParse as a leading open-source document-parsing option specifically for RAG pipelines dealing with complex layouts.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Docling parses a wide range of formats, including advanced PDF understanding, and integrates with the generative AI ecosystem. Supported inputs include PDF, DOCX, PPTX, XLSX, HTML, EPUB, Apple Pages, WAV, MP3, WebVTT, Box Notes, email formats such as EML and MSG, images, LaTeX, DocLang and plain text. The advanced PDF path covers page layout, reading order, table structure, code, formulas and image classification. Everything is normalised into a single DoclingDocument representation, which exports to Markdown, HTML, WebVTT, DocLang, DocTags and lossless JSON, with support for application XML schemas including USPTO patents, JATS articles and XBRL financial reports.

## Why it's in the Arsenal

The decision it removes is how much of a document's meaning survives extraction. Text-only parsing flattens a two-column layout into the wrong order and turns a financial table into a run of numbers with no row structure, which is then silently misread by a model. Docling keeps layout and table structure as first-class attributes in one intermediate representation, so the chunker downstream has something meaningful to split and the retrieval team can reason about what it lost.

## Architecture

Each input format has a reader that produces the common DoclingDocument model, which carries text, layout regions, table structure, code blocks and formulas as structured content rather than as a flattened string. For PDFs and images, layout analysis identifies regions and their reading order, table-structure recognition reconstructs cells, and OCR fills in scanned pages, with those models optionally running locally. Serialisation is many-to-one, so the same document can be exported to Markdown for a RAG pipeline or to lossless JSON when you need the structure preserved.

## Ecosystem Position

It competes with Unstructured, Marker and the cloud parsing APIs, and the axis is structure fidelity and local execution: Docling emphasises layout, tables and formulas plus an air-gapped mode, while hosted parsers trade that for managed scale. It overlaps with content/projects/data-and-retrieval entries like MarkItDown, which converts to Markdown without the same layout modelling, and with the OCR entries such as PaddleOCR, which Docling calls as its OCR path. It complements the ingestion tools in content/tools/data-ingestion and ships ready integrations for LangChain, LlamaIndex, CrewAI and Haystack.

## Getting Started

Install from PyPI, with uv recommended, and convert a document:

```bash
pip install docling
```

```python
from docling.document_converter import DocumentConverter
converter = DocumentConverter()
result = converter.convert("paper.pdf")
print(result.document.export_to_markdown())
```

The README lists PyPI, uv and source installs with a badge per option.

## Key Use Cases

1. Financial and regulatory ingestion: parse XBRL reports and PDFs where table structure carries the meaning, not just the text.
2. Air-gapped document pipelines: run parsing entirely locally when documents cannot leave the environment.
3. Unified extraction across formats: point one converter at a mixed corpus of PDFs, decks, spreadsheets and emails and get one representation out.
4. RAG over scholarly or patent collections: reading order and formula recognition make chunking defensible on documents that defeat flat-text pipelines.

## Strengths

- Layout, reading order and table structure are modelled, which is what most extractors throw away.
- One representation and many exports, so downstream consumers can pick Markdown or lossless JSON from the same parse.
- Broad format coverage including audio, video captions and email alongside the usual office formats.
- Local execution for sensitive and air-gapped data, plus plug-and-play integrations with the major agent frameworks.

## Limitations

Layout and table models are the accurate path and they are also the expensive path, so per-page GPU cost becomes the dominant line item on a large corpus. Model coverage is uneven by document type, and a novel layout can still degrade where a human would read it correctly. The unified representation is the project's own model, which means you adopt its abstractions rather than a standard interchange format, and round-tripping through a different tool later is work. Model downloads on first use also matter for the air-gapped claim: plan the artefact transfer.

## Relation to the Arsenal

This is the document-parsing entry in content/projects/data-and-retrieval and the counterpart to the web crawlers in the same folder. It sits next to MarkItDown for lightweight conversion and to the OCR entries such as PaddleOCR for the scanned-document path, and its output feeds the ingestion tools in content/tools/data-ingestion. Its framework integrations connect it to content/projects/frameworks, which is often the fastest way to get a parsed document into a retrieval chain.

## Resources

- [GitHub — docling-project/docling](https://github.com/docling-project/docling)
- [Docs — docling-project.github.io/docling](https://docling-project.github.io/docling)
- [Supported formats and integrations](https://docling-project.github.io/docling)
