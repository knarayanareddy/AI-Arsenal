---
id: marker
name: "Marker"
version_tracked: null
artifact_type: tool
category: data-pipelines
subcategory: document-processing
description: "Apache-2.0 document converter: model-based layout, tables and equations to Markdown/JSON across PDF, Office, HTML and EPUB, with optional LLM hybrid mode"
github_url: "https://github.com/datalab-to/marker"
license: "Apache-2.0 (code); OpenRAIL-M weights"
primary_language: Python
org_or_maintainer: "Datalab (Surya lineage)"
tags: [data, rag, llm]
maturity: production
cost_model: open-source
github_stars: 40650
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-10-22"
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
  - "You need to redistribute the model weights commercially at scale — the code is Apache-2.0, but the weights carry a modified OpenRAIL-M licence that is free only for research, personal use and startups under $5M funding or revenue"
  - "Your documents are simple digital-native PDFs — pdfplumber-class text extraction is orders of magnitude cheaper than running layout models"
upstream_dependencies: []
downstream_consumers: []
alternatives: [docling, mineru, markitdown]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Re-verified 2026-10-26: 40,650 stars, 494 open issues, pushed 2026-10-22. Licence corrected — the code is Apache-2.0 (the entry claimed GPL-3.0), weights are modified AI Pubs OpenRAIL-M free below $5M funding/revenue. Formats now include PDF, image, PPTX, DOCX, XLSX, HTML and EPUB; olmocr-bench 76.0% balanced, 83.5% born-digital."
added_date: "2026-07-08"
last_reviewed: "2026-10-26"
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

Upstream: PyTorch, the Surya OCR/layout models (same maintainer). Competing: MinerU (closest in scope), Docling (IBM, MIT-licensed, RAG-framework integrations), MarkItDown (fast heuristics, no layout models). Complementary: output feeds chunkers in any RAG stack; Datalab offers a hosted platform (running a newer model, Chandra) with a batch service for teams that outgrow self-hosting — which also means the open tool is the on-ramp to a paid product.

## Getting Started

```bash
pip install marker-pdf          # PDFs and images
pip install "marker-pdf[full]"  # adds Office, HTML and EPUB support
marker_single document.pdf --output_format markdown
# batch a folder, with LLM correction on the hard pages:
marker in_folder/ --workers 4 --use_llm
```

## Key Use Cases

1. **Scientific-paper corpora**: equations to LaTeX, multi-column reading order and table structure are the failure modes that matter for arXiv-shaped PDFs, and they are what the model pipeline is trained on.
2. **Mixed-format document estates**: one tool for PDF, DOCX, PPTX, XLSX, HTML and EPUB means a corpus does not need a format-dispatch layer in front of the converter.
3. **Table recovery for structured extraction**: tables come out as structured output rather than flattened text, which is the precondition for turning a filing into rows.
4. **Hybrid accuracy where it pays**: routing only the low-confidence regions through an LLM keeps most pages on the cheap local path, which is the difference between a per-page cost of cents and one of fractions of a cent.
5. **Batch backfills on a GPU node**: pages process in parallel, so a corpus rebuild is a job that finishes rather than a queue that grows.
6. **Chunking-aware output**: JSON output with block structure lets a RAG pipeline chunk on semantic boundaries instead of on character counts.
7. **Scanned-document ingestion**: the OCR path handles image-only pages that a text-extraction tool returns empty for.

## Strengths

- Model-based layout beats heuristics on the hard cases: multi-column papers, tables that span pages and inline maths survive conversion in a way rule-based extractors do not manage.
- The code licence is a genuine change in adoptability — Apache-2.0 means it can be embedded in a commercial product without a copyleft review, which was not true when this entry first recorded the project as GPL-3.0.
- Output is not just Markdown: JSON with typed blocks and extracted images gives downstream chunking something to work with.
- Format coverage beyond PDF (Office, HTML, EPUB) removes a dispatch layer from a document pipeline.
- Hybrid mode is opt-in and provider-agnostic (Gemini, Claude, OpenAI-compatible, Azure, Vertex, OpenRouter, Ollama), so LLM correction is a configuration rather than a vendor commitment.
- CPU, GPU and Apple Metal all work, so the same pipeline runs on a laptop and on a batch node.
- Third-party benchmark reporting (olmocr-bench, 1,403 PDFs) is more useful than a vendor suite, and it publishes per-category numbers rather than one average.
## Limitations

- **The weights are not Apache-2.0.** The code is free to use commercially; the models are modified OpenRAIL-M, free only below $5M in funding or revenue. A product that grows past that threshold inherits a licensing decision it did not make, and the licence is on the weights, not the repository.
- **Accuracy is benchmark-shaped.** 76.0% overall on olmocr-bench is good and still means roughly one page in four has a defect somewhere; the born-digital figure (83.5%) is higher than the scan figure for a reason.
- **Model downloads and GPU memory are a real footprint.** First run pulls a model stack measured in gigabytes, and a CPU-only deployment is slow enough to change how you batch.
- **Hybrid mode sends content to an LLM provider.** The accuracy gain is real; so is the data-residency question, and a local Ollama endpoint is the only answer that keeps pages inside your network.
- **The commercial pull is explicit.** The managed platform runs a newer model (Chandra) with a documented accuracy advantage, plus a batch service at billion-page scale — so the open tool is the on-ramp, and that is worth knowing before standardising on it.
- **494 open issues.** Fast-moving project with a substantial bug surface; pin the version and test on your own corpus rather than trusting a changelog.
- **Layout models drift between releases.** A version bump can change chunk boundaries, which silently changes what the RAG index contains — re-run a fixed sample after every upgrade.

## Relation to the Arsenal

Compare with `docling` (IBM, permissively licensed, similar model-based approach), `mineru` (strong on scientific PDFs), and `markitdown` (fast, heuristic, far cheaper for simple digital-native files). `surya` is the underlying OCR and layout model family, published separately.

Downstream, it feeds the chunking and indexing layers: `llamaindex` and `langchain` for pipelines, `qdrant` and `chroma` for the stores, and `ragas` for checking that the conversion actually improved retrieval rather than only the text.

## Resources

- [GitHub](https://github.com/datalab-to/marker)
- [Documentation](https://github.com/datalab-to/marker#readme)

---
*Last reviewed: 2026-10-26 by @maintainer; github_stars 40,650 as of 2026-10-26; last commit 2026-10-22; both verified via the GitHub API.*
