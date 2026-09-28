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
org_or_maintainer: "datalab-to"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: chandra-ocr
name: "Chandra"
artifact_type: model
category: computer-vision
subcategory: document-processing
description: "Document OCR model from Datalab that renders pages to HTML, Markdown or JSON with layout, and runs locally on Hugging Face or against a vLLM server"
github_url: "https://github.com/datalab-to/chandra"
license: Apache-2.0
primary_language: Python
tags: [multimodal, data, self-hosted]
maturity: production
cost_model: self-hostable
github_stars: 12338
last_commit: "2026-06-26"
docs_url: "https://documentation.datalab.to"
phase: data-and-retrieval
domain:
  - "vision"
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "A layout-aware OCR model that reconstructs tables, forms, and reading order into structured output."
best_for: ["You are building a retrieval pipeline over scanned documents and you need tables, math, checkboxes and handwriting preserved rather than flattened into a text blob.", "You need a single self-hosted OCR model covering 90+ languages, because the multilingual benchmark table shows a 77.8% average against Gemini 2.5 Flash at 67.6% on 43 languages.", "You want to choose your own serving stack, because the same weights run through a local Hugging Face path or a vLLM server you control with an OpenAI-style endpoint."]
avoid_if: ["You need unrestricted commercial self-hosting, because the weights carry a modified OpenRAIL-M licence that is free for research, personal use and startups under $2M and cannot be used competitively against Datalab's own API.", "You need high-volume throughput on a modest budget, because the measured figure is 1.44 pages per second at 96 concurrent sequences on a single H100 80GB with a 60-second average latency and 156-second P95.", "You need a light CPU or laptop path, because the model is a GPU inference workload served through vLLM or Hugging Face rather than a lightweight binary."]
enrichment_notes: "Repository, Apache-2.0 license, and 2026-06-26 activity verified via the GitHub API on 2026-07-12. From the Datalab team behind Marker; accuracy claims are project-reported."
---

## Overview

Chandra OCR 2 is Datalab's document-understanding model, released March 2026 after Chandra 1 in October 2025, that turns page images and PDFs into HTML, Markdown or JSON while keeping layout information. The code is Apache-2.0; the weights are a modified OpenRAIL-M licence. Feature claims are specific: it tops the external olmOCR benchmark in Datalab's own comparison at 85.8 overall against dots.ocr 1.5 at 83.9 and olmOCR 2 at 82.4, supports 90+ languages, handles handwriting and form checkboxes, and extracts images and diagrams with captions and structured data. Two inference modes are offered, a local Hugging Face path and a remote vLLM server, and the default checkpoint is `datalab-to/chandra-ocr-2`. Output is a per-file subdirectory containing `.md`, `.html` and `_metadata.json` alongside extracted images, and the CLI exposes page ranges, per-page token caps, worker counts, header/footer inclusion and batch sizing.

## Why it's in the Arsenal

The engineering problem is that RAG fails on structure. A scanned financial table, a handwritten formula and a filled lease form all reduce to a stream of characters under a conventional OCR engine, and the embedding you build on top inherits the damage. Chandra treats layout as a first-class output, which is what makes the downstream chunker able to keep a table header attached to its rows. The second decision is operational: the model is heavy enough that you have to choose between a vLLM server you operate and Datalab's managed API, and the README is candid that the managed service runs a more accurate variant than the open weights.

## Architecture

The CLI resolves an inference backend from `--method hf|vllm`, defaulting to vLLM. The vLLM path launches a container with the model served behind `VLLM_API_BASE` (default `http://localhost:8000/v1`), `VLLM_MODEL_NAME` and `VLLM_GPUS`, so the OCR call is an ordinary OpenAI-style completion against a locally hosted model. The Hugging Face path loads `MODEL_CHECKPOINT` directly and pulls in torch and transformers, with flash attention recommended for throughput. Page-level work is batched (28 pages per batch on vLLM, 1 on the HF path) with `MAX_OUTPUT_TOKENS` defaulting to 12384 per page, and `MAX_WORKERS` controls vLLM parallelism. Every page is rendered to HTML with positional structure and then serialised into Markdown and JSON, with `_metadata.json` recording page information and token counts; the underlying stack credits Hugging Face Transformers, vLLM, olmocr and Qwen 3.5.

## Ecosystem Position

Chandra competes with Marker, Docling, dots.ocr and the olmOCR family in content/projects/data-and-retrieval, and the benchmark table is unusually useful because it scores the open weights and the hosted API on the same columns. It leads on tables (92.1) and on tiny-text density (93.7), and it is weakest where older scans and headers dominate, with 51.1 on old scans against DeepSeek OCR at 33.3. Compared with Datalab's own Marker, which appears in the same table at 76.5 overall, the choice within one vendor's line is layout fidelity versus speed. Unlike the pure text extractors such as pymupdf or unstructured, this model reads pixels, so it is the fallback for a page that has no text layer rather than a replacement for fast vector extraction. Where content/projects/inference-engines supplies the vLLM server, this project supplies the checkpoint that server hosts.

## Getting Started

Install the package, start the bundled vLLM-backed server once, then convert a file or a directory:

```bash
pip install chandra-ocr
chandra_vllm                    # launches the optimized vLLM container
chandra input.pdf ./output     # default method is vllm
# local Hugging Face path instead:
pip install 'chandra-ocr[hf]' && chandra input.pdf ./output --method hf
```

`pip install chandra-ocr[app]` adds the interactive Streamlit demo via `chandra_app`.

## Key Use Cases

1. Table-heavy ingestion: extract a scanned financial or statistical table into structured HTML that a downstream parser can read cell by cell instead of guessing at column boundaries.
2. Mixed-language archives: process Arabic, Japanese, Hindi, Russian or Chinese pages through one model rather than routing by language.
3. Form and handwriting capture: reconstruct filled forms including checkbox state and cursive notes for review pipelines that need the field layout, not just the text.

## Strengths

- Layout is part of the output contract, with HTML, Markdown and JSON emitted together so downstream consumers pick their granularity.
- Breadth of structure handled in one pass: tables, math notation, multi-column layouts, form checkboxes and handwriting.
- 90+ languages with a published per-language comparison, which is rare and lets you check your own languages before committing.
- Serving is your choice: a local Hugging Face run for a one-off or a vLLM server with batched page throughput for a pipeline.

## Limitations

Licensing splits the project in two: Apache-2.0 for the code, a modified OpenRAIL-M for the weights, free for research, personal use and startups under $2M in funding or revenue, and explicitly not usable to compete with Datalab's API. That is a real constraint if you plan to build a commercial document service out of it. Throughput is the other wall: 1.44 pages per second at 96 concurrent sequences on an H100 80GB, 60-second mean latency and 156-second P95, with Datalab estimating 2 pages per second in real-world use. Accuracy is uneven by document type, and old scans and header/footer-heavy pages are the weak columns even for the hosted API. Datalab also states the managed service runs an improved model with higher accuracy than the open weights, so the hosted and self-hosted paths are not the same system.

## Relation to the Arsenal

This is the learned-OCR entry in content/projects/data-and-retrieval and the natural upstream step for anything you build in content/projects/benchmarks-and-evals on document corpora. Read it beside the conventional extractors (Docling, Marker, pymupdf, unstructured) to decide whether a page needs pixels or a text layer, and beside the table-handling alternatives (RapidOCR, PaddleOCR, Tesseract) which are far cheaper and adequate for clean born-digital pages. The vLLM server it depends on is the serving entry in content/projects/inference-engines, and the structured JSON it emits feeds the vector stores and chunkers covered in the same phase. For a hosted OCR API rather than weights, the Datalab managed platform is the same vendor with different terms.

## Resources

- [GitHub — datalab-to/chandra](https://github.com/datalab-to/chandra)
- [Vendor docs and playground — datalab.to](https://documentation.datalab.to)
- [Full 90-language benchmark — FULL_BENCHMARKS.md](https://github.com/datalab-to/chandra/blob/master/FULL_BENCHMARKS.md)
