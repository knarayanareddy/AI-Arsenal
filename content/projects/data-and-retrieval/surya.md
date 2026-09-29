---
id: surya
name: "Surya"
version_tracked: null
artifact_type: library
category: computer-vision
subcategory: document-processing
description: "Modern OCR toolkit with 90+ language text recognition, layout analysis, reading-order detection, and table recognition — the models behind Marker"
github_url: "https://github.com/datalab-to/surya"
license: "GPL-3.0"
primary_language: Python
org_or_maintainer: "Datalab"
tags: [data, multimodal, llm]
maturity: production
cost_model: open-source
github_stars: 21057
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-07-08"
docs_url: "https://github.com/datalab-to/surya#readme"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [vision, language]
relation_to_stack: [build-on-top]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - "The transformer-era open OCR stack: purpose-trained models for detection, recognition, layout, reading order, and tables that benchmark competitively against cloud OCR APIs — and serve as the engine layer that Marker composes into document conversion."
best_for:
  - "You need OCR components (not a full converter) to embed in a custom document pipeline — each capability (detection, recognition, layout, order, tables, LaTeX) is a separately callable model with clean Python APIs"
  - "You process multilingual scanned documents — 90+ language support with self-reported benchmarks faster and more accurate than Tesseract, competitive with Google Cloud Vision"
avoid_if:
  - "You want an end-to-end PDF-to-markdown tool — that is Marker (built on Surya); using Surya directly means assembling the pipeline yourself"
  - "GPL-3.0 plus revenue-conditional model weights conflict with your commercial embedding plans — PaddleOCR (Apache-2.0) avoids the constraint"
upstream_dependencies: []
downstream_consumers: []
alternatives: [paddleocr]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (21,057), primary language, license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/datalab-to/surya", "date": "2026-07-08", "description": "21,057 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

An open-source OCR toolkit providing the model layer for modern document AI: text detection, text recognition across 90+ languages, layout analysis (tables, images, headers), reading-order detection, table-structure recognition, and LaTeX OCR. Built by Datalab as the foundation for Marker, but designed for standalone use in custom document-processing pipelines.

## Why it's in the Arsenal

Surya is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

## Architecture

Each task is a dedicated efficient transformer model: line-level detection feeds recognition; layout and reading-order models classify and sequence regions; table-rec recovers row/column structure. Models are trained for batch GPU throughput (with CPU/MPS fallback), exposed via Python predictor classes and a CLI; benchmarks in the repo compare against Tesseract and Google Cloud Vision with published methodology.

## Ecosystem Position

Upstream: PyTorch, Hugging Face model hosting. Downstream: Marker composes Surya models into document conversion; community projects embed the detector/recognizer independently. Competing: PaddleOCR (industrial breadth, permissive license), Tesseract (legacy baseline), docTR. The GPL+commercial-terms licensing mirrors Marker's — fine for internal use, needs review for shipped products.

## Getting Started

```bash
pip install surya-ocr
surya_ocr document.png  # detection + recognition
surya_layout document.png
surya_table document.png
```

## Key Use Cases

1. **Running it in anger**: the first real evaluation of Surya is your own traffic, not the documentation's example; instrument latency, error rate and quality on a representative slice of data before the choice is load-bearing.
2. **What dominates the decision**: `components`, `full`, `converter`, `embed` are the variables that actually move the outcome for Surya in this phase, and none of them appear in a feature comparison.
3. **Choosing between candidates**: compare Surya against `paddleocr` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- What Surya gives you that reading the feature list does not: each task is a dedicated efficient transformer model: line-level detection feeds recognition; layout and reading-order models classify and sequence regions; table-rec recovers row/column structure. Models are trained for batch GPU throughput (with CPU/MPS fallback), exposed via Python predictor classes and a CLI; benchmarks in the repo compare against Tesseract and Google Cloud Vision with published methodology, which is the part you have to evaluate against your own workload.
- Sits in the data-and-retrieval phase alongside the alternatives named in its Ecosystem Position section; cross-phase comparison is usually a category error rather than a useful alternative.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- Adoption risk for Surya is mostly operational rather than technical — resource cost at your scale, dependency failure behaviour, and the upgrade path when interfaces move.
- The claims here come from the project's own documentation and public record, not from independent measurement on your workload; benchmark numbers in particular are point-in-time and harness-dependent.
- Where Surya overlaps `paddleocr`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

This is the data-and-retrieval entry for Surya in this phase, and the honest way to use it is as one candidate among the alternatives listed in the phase index rather than as a default. Read the Strengths and Limitations sections before adopting it: the operational cost, the model or service dependencies, and the failure behaviour are what decide whether it fits your workload, and none of those are settled by the feature list alone.

## Resources

- [GitHub](https://github.com/datalab-to/surya)
- [Documentation](https://github.com/datalab-to/surya#readme)

---
*Last reviewed: 2026-07-08 by @maintainer; github_stars 21057 as of 2026-07-08; last commit 2026-07-08; both verified via the GitHub API.*
