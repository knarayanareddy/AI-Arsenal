---
id: olmocr
name: olmOCR
type: tool
job: [data-labeling]
description: Open toolkit from AI2 that linearizes PDFs into clean text for LLM datasets and RAG ingestion
url: "https://github.com/allenai/olmocr"
cost_model: open-source
pricing_detail: Free and open source (Apache-2.0); requires GPU for the VLM pipeline
tags: [data, rag, multimodal]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Fully free; self-hosted GPU inference is the only cost
self_hostable: true
open_source: true
source_url: "https://github.com/allenai/olmocr"
docs_url: "https://github.com/allenai/olmocr"
github_url: "https://github.com/allenai/olmocr"
alternatives: []
integrates_with: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [production, research]
best_when:
  - You need high-quality text out of difficult PDFs (multi-column layouts, tables, equations, scanned pages) at scale — olmOCR uses a fine-tuned vision-language model rather than rule-based layout parsing
  - You're building LLM training datasets or large RAG corpora from PDF-heavy sources and want an open, self-hostable pipeline with published methodology from a research lab
avoid_when:
  - Your PDFs are simple, born-digital documents — lighter parsers (see the Docling project entry) extract them without GPU cost
  - You can't provision GPUs — the VLM pipeline is meaningfully more expensive per page than rule-based extraction
version_tracked: null
enrichment_status: draft
enrichment_notes: Star count (18.9k), Apache-2.0 license, and AI2 ownership verified via the GitHub API on 2026-07-07 (last push 2026-03-25); on GitHub weekly trending 2026-07-07. VLM-based approach and benchmark claims from AI2's own paper and documentation.
verdict: recommended
verdict_rationale: Research-lab-backed (AI2), open pipeline that handles the hard PDF cases rule-based parsers fail on; the GPU cost is the honest trade
status: active
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending?since=weekly","date":"2026-07-07","description":"On GitHub weekly trending; 18.9k stars"}
---

> **TL;DR:** AI2's open toolkit for linearizing PDFs with a fine-tuned vision-language model — handles multi-column layouts, tables, equations, and scans that rule-based parsers mangle. Free, Apache-2.0, needs GPU. Best for PDF-heavy dataset and RAG-corpus construction.

## Overview

An open-source toolkit from the Allen Institute for AI (AI2) that converts PDFs into clean, naturally ordered text using a fine-tuned vision-language model, built for constructing LLM training datasets and large document corpora from PDF-heavy sources.

## Why It's in the Arsenal

PDF extraction quality is the ceiling on any PDF-heavy RAG system — garbage layout parsing propagates into every retrieved chunk. olmOCR earns a place in the Arsenal because it takes the VLM approach to the hard cases (multi-column academic papers, tables, equations, scans) where rule-based parsers fail structurally, and because it's from a research lab that published its methodology and evaluation rather than a black-box API.

## Key Features

- Fine-tuned VLM reads rendered page images, producing naturally ordered text across complex layouts
- Handles tables, equations, handwriting, and scanned documents
- Batch pipeline built for scale (millions of pages) with self-hosted inference
- Open weights, code, and evaluation methodology (Apache-2.0)

## Architecture / How It Works

Pages are rendered to images and passed to a fine-tuned vision-language model along with anchor text extracted from the PDF internals; the model outputs linearized text in natural reading order. This sidesteps the fundamental limit of rule-based extraction — PDF is a rendering format with no reliable reading-order semantics — by reading the page the way a human does.

## Getting Started

```bash
pip install olmocr
# GPU-backed pipeline; see the README for batch-inference setup.
```

## Use Cases

1. **Scenario**: building a RAG corpus from thousands of academic papers or reports where multi-column layout and tables defeat conventional parsers
2. **Scenario**: constructing pretraining/fine-tuning datasets from PDF archives, where extraction quality directly bounds dataset quality

## Strengths

- Handles the document classes (complex layouts, scans, equations) that rule-based parsers mangle — a mechanism difference, not a tuning difference
- Research-lab provenance: open methodology and evaluation, not marketing benchmarks (18.9k stars as of 2026-07-07)

## Limitations / When NOT to Use

- GPU-backed VLM inference costs meaningfully more per page than rule-based extraction — overkill for simple born-digital PDFs
- Like all model-based OCR, output can contain hallucinated text on degraded inputs; spot-check quality on your document mix

## Integration Patterns

- Route by difficulty: simple PDFs through [Docling](../../projects/data-and-retrieval/docling.md)-style parsers, hard ones through olmOCR
- Feed output into your chunking and embedding pipeline like any other text source; extraction quality gains compound through retrieval

## Resources

- [GitHub](https://github.com/allenai/olmocr)

## Buzz & Reception

On GitHub weekly trending with 18.9k stars as of 2026-07-07; widely cited in dataset-construction discussions since its 2025 release by AI2.
