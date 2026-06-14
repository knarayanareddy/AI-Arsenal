---
id: docling
name: Docling
type: library
category: rag
subcategory: document-processing
description: >-
  IBM-origin open-source toolkit for parsing and exporting documents for
  generative AI
github_url: 'https://github.com/docling-project/docling'
license: MIT
primary_language: Python
tags:
  - rag
  - data
  - retrieval
maturity: production
cost_model: open-source
github_stars: 61495
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-13'
docs_url: 'https://docling-project.github.io/docling/'
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
alternatives: []
integrates_with: []
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

> **TL;DR:** Docling parses documents and exports structured representations for gen-AI workflows. Use it when PDF/document conversion quality is a first-order RAG concern.

## Overview

Docling is a high-interest open-source document-processing project focused on making documents ready for generative AI pipelines.

## Why It's in the Arsenal

Document parsing quality is often the limiting factor in RAG; Docling gives teams another strong OSS parser to evaluate.

## Key Features

- Document conversion and export
- PDF/document parsing focus
- Python API and CLI
- MIT license
- Strong community momentum

## Architecture / How It Works

Docling converts source documents into structured outputs that can be chunked, enriched, embedded, and indexed.

## Getting Started

```bash
pip install docling
```

```python
from docling.document_converter import DocumentConverter

result = DocumentConverter().convert("example.pdf")
print(result.document.export_to_markdown()[:500])
```

## Use Cases

1. **Scenario**: PDF-to-Markdown workflows
2. **Scenario**: RAG ingestion quality tests
3. **Scenario**: Document AI preprocessing

## Strengths

- Simple Python API
- Strong parser-focused positioning
- Useful Markdown export path

## Limitations / When NOT to Use

- Parser quality varies by document type
- Still needs chunking/eval after conversion
- Large batch processing needs operational planning

## Integration Patterns

- Compare Docling and Unstructured on a real document sample
- Export Markdown before chunking for human review
- Keep page/section metadata for citations

## Resources

- [GitHub](https://github.com/docling-project/docling)
- [Docs](https://docling-project.github.io/docling/)

## Buzz & Reception

- Included because this project is frequently evaluated in production RAG architecture decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*

