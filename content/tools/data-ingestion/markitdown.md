---
id: markitdown
name: "MarkItDown"
type: tool
job: [web-scraping, data-labeling]
description: "Microsoft's utility for converting Office files, PDFs, images, and audio into LLM-friendly Markdown"
url: "https://github.com/microsoft/markitdown"
cost_model: open-source
pricing_detail: "MIT open source"
tags: [data, rag, llm]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/microsoft/markitdown"
docs_url: "https://github.com/microsoft/markitdown#readme"
github_url: "https://github.com/microsoft/markitdown"
alternatives: [docling, unstructured, llamaparse]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype, production]
best_when:
  - "You need one dependency that converts the whole Office zoo (docx/xlsx/pptx), PDFs, HTML, and even audio into Markdown for LLM ingestion"
  - "Token-efficient conversion where Markdown structure (headings, tables, lists) matters more than pixel-perfect layout"
avoid_when:
  - "Complex PDFs (multi-column, scanned, tables) are your core input — layout-aware parsers (Docling, MinerU, LlamaParse) extract far more faithfully"
  - "You need chunking, element metadata, or OCR pipelines built in; MarkItDown is conversion-only"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (163,979), license, and last push (2026-06-24) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: solid-choice
verdict_rationale: "The pragmatic default for quick file-to-Markdown conversion; step up to layout-aware parsers when PDF fidelity matters"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/microsoft/markitdown", "date": "2026-07-08", "description": "163,979 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A lightweight Microsoft utility that became a standard preprocessing tool: convert files (PDF, Word, Excel, PowerPoint, images with EXIF/OCR, audio with transcription, HTML, CSV, ZIP...) to clean Markdown, on the thesis that Markdown is the most token-efficient, LLM-native document representation.

## Why It's in the Arsenal

MarkItDown earns a place in the Arsenal because it directly addresses a recurring decision point: you need one dependency that converts the whole Office zoo (docx/xlsx/pptx), PDFs, HTML, and even audio into Markdown for LLM ingestion. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Converts Office, PDF, images, audio, HTML, and archives to Markdown
- Optional LLM-powered image descriptions and audio transcription
- CLI, Python API, and MCP server for agent integration

## Architecture / How It Works

Per-format converters (mammoth for docx, pdfminer for PDF, speech recognition for audio) normalize content into a common Markdown stream; an extensible converter registry lets you add formats, and the MCP server exposes conversion directly to agents like Claude.

## Getting Started

```bash
pip install 'markitdown[all]'
markitdown report.pdf > report.md
```

## Use Cases

1. **Scenario**: you need one dependency that converts the whole Office zoo (docx/xlsx/pptx), PDFs, HTML, and even audio into Markdown for LLM ingestion
2. **Scenario**: token-efficient conversion where Markdown structure (headings, tables, lists) matters more than pixel-perfect layout
3. **Scenario where this is NOT the right fit**: complex PDFs (multi-column, scanned, tables) are your core input — layout-aware parsers (Docling, MinerU, LlamaParse) extract far more faithfully — evaluate an alternative instead

## Strengths

- You need one dependency that converts the whole Office zoo (docx/xlsx/pptx), PDFs, HTML, and even audio into Markdown for LLM ingestion
- Token-efficient conversion where Markdown structure (headings, tables, lists) matters more than pixel-perfect layout

## Limitations / When NOT to Use

- Complex PDFs (multi-column, scanned, tables) are your core input — layout-aware parsers (Docling, MinerU, LlamaParse) extract far more faithfully
- You need chunking, element metadata, or OCR pipelines built in; MarkItDown is conversion-only

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `docling`, `unstructured`, `llamaparse` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `markitdown`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://github.com/microsoft/markitdown)
- [Documentation](https://github.com/microsoft/markitdown#readme)
- [GitHub](https://github.com/microsoft/markitdown)

## Buzz & Reception

- 163,979 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
