---
id: surya
name: "Surya"
version_tracked: "0.22"
artifact_type: library
category: computer-vision
subcategory: document-processing
description: "650M-parameter OCR model with layout analysis, reading order and table recognition — Apache-2.0 code, OpenRAIL-M weights, the engine behind Marker"
github_url: "https://github.com/datalab-to/surya"
license: "Apache-2.0 (code); OpenRAIL-M weights"
primary_language: Python
org_or_maintainer: "Datalab"
tags: [data, multimodal, llm]
maturity: production
cost_model: open-source
github_stars: 21535
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-10-23"
docs_url: "https://github.com/datalab-to/surya#readme"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [vision, language]
relation_to_stack: [build-on-top]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - "The open model layer under Datalab's document stack: one 650M VLM does page OCR, layout and table structure, with separate small models for line detection and OCR-error detection, and Marker composes it into full document conversion."
best_for:
  - "You need OCR blocks rather than a finished Markdown file — per-block labels, HTML, polygons and confidences are what a custom document pipeline actually consumes, and Surya returns them directly"
  - "You are OCR'ing scanned pages at volume on your own hardware — 5 pages/s on an RTX 5090 with batched vLLM serving, or llama.cpp when there is no GPU"
  - "You need multilingual coverage without per-language model switching — a 91-language internal benchmark is published alongside the 87.2% score"
avoid_if:
  - "You want a finished PDF-to-Markdown conversion — that is Marker, which bundles these models with reading-order assembly and post-processing; using Surya directly means writing that assembly yourself"
  - "You plan to redistribute the model weights commercially past the threshold — code is Apache-2.0 but weights are modified OpenRAIL-M, free only under $5M funding or revenue"
  - "Your pages are digital-native text — a PDF text extractor is orders of magnitude cheaper than running a vision model over every page"
upstream_dependencies: []
downstream_consumers: []
alternatives: [paddleocr, marker]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Re-verified 2026-10-26: 21,535 stars, 201 open issues, pushed 2026-10-23, latest release v0.22.1 (2026-07-20). Rewritten for Surya v2 — the project is no longer five separately trained task models but a single 650M VLM served by vLLM or llama.cpp, and the licence is now Apache-2.0 code with OpenRAIL-M weights rather than GPL-3.0."
added_date: "2026-07-08"
last_reviewed: "2026-10-26"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/datalab-to/surya", "date": "2026-10-26", "description": "21,535 stars on GitHub as of 2026-10-26 (GitHub API)"}]
featured: false
status: active
---

## Overview

An OCR stack built around a single 650M-parameter vision-language model that reads a page, labels its regions, orders them and returns each block as HTML. Layout analysis, reading order and table structure come from the same model; text-line detection and OCR-error detection remain separate, smaller models. Datalab uses it as the engine inside Marker, and ships it for direct use when you want the blocks rather than a finished Markdown document.

## Why it's in the Arsenal

Surya matters for a different reason than the converter entries: it is the layer you reach for when the output of a converter is not the output you need. Reading order, block labels and per-block confidence are what make a document pipeline debuggable, and this is one of the few open stacks that exposes them as first-class outputs rather than as internals.

## Architecture

Surya v2 replaced the earlier design of five purpose-trained task models with one VLM that does layout, OCR and table recognition in a page-level call, optionally in block mode where layout runs first and each block is decoded separately (which lets the model spend a decode budget proportional to the block's estimated token count). The inference backend is auto-spawned: vLLM on an NVIDIA GPU, `llama-server` from llama.cpp on CPU or Apple Silicon, or an existing server named by `SURYA_INFERENCE_URL`. Output is `blocks` in reading order, each with a canonical label, HTML content (math wrapped in `<math>`, tables as `<table>`), polygon, bbox and confidence.

The migration from v1 is not automatic: `FoundationPredictor` became `SuryaInferenceManager`, `text_lines` became `blocks`, and table-rec cells lost `is_header`, `colspan` and `rowspan`. That is the kind of schema change worth pinning a version against.

## Ecosystem Position

Upstream: PyTorch plus a serving runtime (vLLM or llama.cpp), and Hugging Face for weights. Downstream: Marker composes the models into document conversion, and Datalab's hosted platform runs Surya alongside its newer Chandra model. Competing: PaddleOCR (broader industrial coverage, permissive code and weights, much larger community), Tesseract (free but far weaker on layout and scans), docTR, and the hosted OCR APIs.

The comparison that matters against `paddleocr` is not accuracy on a shared benchmark but the operational shape: PaddleOCR gives you a two-stage detector/recogniser you can shrink to 1.5M parameters for edge deployment, while Surya gives you one 650M VLM that needs a GPU or llama.cpp to be usable. Pick on where the model has to run, then compare accuracy within that constraint.

## Getting Started

```bash
pip install surya-ocr
# NVIDIA: needs Docker + NVIDIA Container Toolkit for the vLLM server
# CPU/macOS: brew install llama.cpp
surya_ocr data/ --keep_server
surya_layout data/      # attaches to the running server
surya_table data/
```

## Key Use Cases

1. **Custom ingestion pipelines that need block structure**: a RAG index built on heading/table/equation boundaries rather than fixed-size chunks needs the label and polygon for each block, and that is the primary output here.
2. **Scanned and photographed documents**: the model reads pages as images, so skew, phone photos and stamped forms are handled by the same path as clean scans.
3. **Table extraction into HTML**: tables come back as `<table>` markup rather than whitespace-preserved text, which is the difference between parsing rows and guessing at them.
4. **Reading-order recovery for multi-column layouts**: academic papers, newspapers and reports where extraction order determines whether the text is coherent at all.
5. **OCR quality telemetry**: per-block confidence plus a separate OCR-error-detection model gives you a signal for routing low-confidence pages to human review or a stronger model.
6. **Self-hosted document processing where pages cannot leave the network**: weights run locally through vLLM or llama.cpp, so the only outbound dependency is the initial download.

## Strengths

- One model for layout, OCR, tables and reading order means the page is read once and the outputs agree with each other, instead of four models disagreeing about the same region.
- Published, methodology-backed numbers rather than a marketing average: 83.3% on olmOCR-bench (reported as best under 3B parameters), 87.2% on an internal 91-language set, 5 pages/s on an RTX 5090.
- Structured output with confidence per block — the field that makes a pipeline debuggable and lets you route on quality rather than hope.
- `--keep_server` and `SURYA_INFERENCE_URL` make it deployable as a service: spawn per command for one-off work, or run one long-lived server and attach to it.
- CPU and Apple Silicon support through llama.cpp, which is unusual for a document VLM of this size.
- The code is Apache-2.0, so integration into a commercial codebase is not a licensing exercise; only the weights carry the OpenRAIL-M terms.

## Limitations

- **The weights are not open source in the OSI sense.** Modified OpenRAIL-M is free for research, personal use and startups under $5M funding or revenue; above that the answer is Datalab's pricing page. That threshold is a business decision imposed by a licence file, and it applies to redistribution, not to internal use.
- **A GPU is the intended deployment.** 5 pages/s on an RTX 5090 is the headline; a CPU-only path through llama.cpp is viable for modest volumes but changes the batching plan, and the first run pulls a model stack plus a serving runtime.
- **It is a component, not a converter.** No document-level assembly, no Markdown layout preservation, no header/footer stripping beyond what the model labels — that work is Marker's, and doing it yourself is where projects lose a month.
- **Schema churn between major versions.** The v1→v2 migration renamed predictors and reshaped every output schema; anything written against the old API needs rewriting, and nothing in the release signal communicates that to a downstream consumer.
- **The commercial pull is explicit.** The hosted platform bundles Surya with a stronger model (Chandra) and 5,000 free pages a month, so the open path is deliberately the less accurate one.
- **201 open issues** and a fast release cadence: pin the version, and re-run a fixed sample of your own pages after each upgrade, because a decode change can shift block boundaries and silently reshape your index.

## Relation to the Arsenal

Upstream of every consumer of parsed text: this is the OCR layer that `marker` wraps and that feeds chunking, then vector stores such as `chroma`, `qdrant` and `weaviate`, with `ragas` used to check whether a conversion change actually improved retrieval.

The closest entries are `paddleocr` (the permissive-weights, edge-friendly alternative) and `marker` (the finished-converter option built on this). `docling` and `mineru` sit at the converter level and compete with Marker rather than with Surya, so comparing Surya against them directly is a category error.

## Resources

- [GitHub](https://github.com/datalab-to/surya)
- [Documentation](https://github.com/datalab-to/surya#readme)
- [Datalab pricing and licensing](https://www.datalab.to/pricing)

---
*Last reviewed: 2026-10-26 by @maintainer; github_stars 21,535 as of 2026-10-26; last commit 2026-10-23; both verified via the GitHub API.*
