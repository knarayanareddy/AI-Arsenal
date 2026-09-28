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
org_or_maintainer: "NanoNets"
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
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: docext
name: "docext"
artifact_type: tool
category: data-pipelines
subcategory: document-processing
description: "On-premises document toolkit using vision-language models for image-to-markdown conversion, key information extraction, and IDP benchmarking"
github_url: "https://github.com/NanoNets/docext"
license: Apache-2.0
primary_language: Python
tags: [llm, training]
maturity: beta
cost_model: open-source
github_stars: 2085
last_commit: "2026-03-17"
docs_url: "https://nanonets.com/document-parsing-and-extraction"
phase: data-and-retrieval
domain:
  - "vision"
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "org-backed"
  - "research-origin"
ecosystem_role:
  - "On-prem document-intelligence tool that complements OCR/VLM models and competes with hosted extraction APIs"
best_for: ["You want to convert PDFs and images to markdown that preserves equations, tables, signatures and watermarks as semantic content, because that is the toolkit's primary conversion path.", "You need fields and tables extracted from invoices, passports and similar documents with a confidence score, because that is the OCR-free extraction capability with scoring.", "You are choosing a VLM for document work and want a leaderboard, because the project includes a benchmarking platform tracking OCR, key information extraction, classification and table extraction performance."]
avoid_if: ["You need a high-throughput, low-latency extraction service, because a VLM pass per page is substantially more expensive than a classic OCR engine on the same page.", "You are on hardware that cannot host a vision-language model, because the toolkit is explicitly on-premises and model-backed rather than a lightweight OCR binary.", "You need a mature, decades-old OCR engine with tuned accuracy on a single script, because the trade here is semantic understanding rather than character-recognition throughput."]
enrichment_notes: "Last commit 2026-03-17; do not mark actively-maintained. Nanonets-OCR-s and leaderboard claims are vendor-associated. Draft pending review."
---

## Overview

docext is an on-premises document information extraction and benchmarking toolkit powered by vision-language models, providing three capabilities. PDF and image to markdown conversion turns documents into structured markdown with content recognition covering LaTeX equations, signatures, watermarks, tables and semantic tagging, including inline and block equation recognition and intelligent image description. Document information extraction is OCR-free structured extraction of fields and tables from document types such as invoices and passports, with confidence scoring. Third, an intelligent document processing leaderbench is a benchmarking platform that tracks and evaluates vision-language model performance across OCR, key information extraction, document classification, table extraction and other IDP tasks. The toolkit is on-premises rather than a hosted API, and it is accompanied by the release of Nanonets-OCR-s, a compact three-billion-parameter model trained specifically for efficient image-to-markdown conversion with semantic understanding of images, signatures and watermarks.

## Why it's in the Arsenal

The decision it addresses is whether a document pipeline is going to be OCR plus templates or a vision-language model. OCR gives you characters, and everything after that, layout reconstruction, table structure, equation notation, is your problem. A VLM sees the page the way a person does and emits markdown, so the downstream contract is structure rather than text with coordinates. The second decision is which model to use, and the leaderboard is the unusual part: rather than asking you to trust a vendor benchmark, the project gives you a place to compare candidates on the tasks you actually have.

## Architecture

The toolkit sits on top of vision-language models rather than a classic OCR stack, which means the conversion step is a single model inference over a rendered page and the output is markdown with semantic structure. LaTeX equation handling is part of the model's competence rather than a separate formula recogniser, and signatures and watermarks are handled as recognised content and tagged rather than being noise to strip. Extraction is a separate capability layered on the same models: given a document type, fields and tables come back as structured data with a confidence score per value, which is what lets a pipeline route low-confidence documents to review instead of committing a bad extraction. The leaderboard is a benchmarking harness around the same models, scoring them on OCR, KIE, classification and table tasks so the choice is empirical. Nanonets-OCR-s is the compact model released for the conversion path, at three billion parameters, positioned for efficiency rather than maximum generality.

## Ecosystem Position

docext overlaps with the document-processing entries in content/projects/data-and-retrieval, and the honest comparison is model cost against structural quality: the classic OCR engines here are faster and cheaper per page and often better on clean single-script text, while a VLM pipeline gets semantic structure without layout heuristics. It also overlaps with the layout-aware extraction tools in the same phase, which are stronger where a page is a complex fixed template and this one is stronger where the layout varies. It is not a retrieval system, so it feeds content/projects/data-and-retrieval downstream rather than competing with the vector stores there. The vision-language models it depends on are foundation models in content/projects/foundation-models, and it has a model-size cost relationship with the serving entries in content/projects/inference-engines that you have to size yourself.

## Getting Started

Install the toolkit, and use the benchmark command to compare vision-language models on document tasks before choosing one:

```bash
pip install docext
docext benchmark --task ocr
```

For conversion, point the toolkit at a PDF or image to produce markdown with equations, tables and semantic tags, and for extraction pass a document type definition to get fields with confidence scores. The README links the Nanonets-OCR-s release announcement and its model weights for the compact conversion path.

## Key Use Cases

1. Documents to structured markdown: convert a technical PDF with equations, tables and figures into markdown that a retrieval pipeline can chunk without layout heuristics.
2. Key information extraction with triage: pull fields and tables from invoices or passports, and route documents whose confidence scores are low to human review.
3. Model selection for IDP: run the leaderboard across the tasks you have, OCR, KIE, classification or tables, and pick a vision-language model on your own numbers.

## Strengths

- Markdown output that preserves equations, tables, signatures and watermarks as tagged content rather than flattened text.
- Confidence scoring on extracted fields, which is what makes a human-review triage step possible rather than optional.
- A built-in IDP leaderbench across OCR, KIE, classification and table extraction, so model choice is empirical.
 - On-premises by design, with no page content leaving your infrastructure and a compact three-billion-parameter option for the conversion path.

## Limitations

A vision-language model pass per page is far more expensive and slower than a classic OCR engine, which is the dominant cost in any high-volume ingestion pipeline, and that cost scales with resolution and page complexity. On-premises means you host and size the model yourself, so this trades a hosted API's simplicity for hardware and a serving stack of your own. Confidence scores are the model's self-assessment and are not calibrated against your data, so treating them as a review threshold requires validation on real documents first. The leaderboard measures the maintainer's chosen tasks and models, and a leaderboard result does not transfer to a corpus with layouts or languages it did not test. Accuracy against a well-tuned OCR engine on clean, single-script, single-layout text is the case where this tool is most likely to lose.

## Relation to the Arsenal

This belongs in content/projects/data-and-retrieval as the VLM-based document conversion and extraction tool, and it is the direct comparison point for the classic OCR and layout-aware entries in the same phase. Its model dependency runs to content/projects/foundation-models, and the hardware and serving requirements meet content/projects/inference-engines. The markdown it produces is what the chunking and embedding steps in content/projects/data-and-retrieval consume, so read it together with a vector store entry when building an ingestion pipeline. If your documents are clean text scans rather than layout-rich or multilingual pages, the faster OCR entries are the better fit.

## Resources

- [GitHub — NanoNets/docext](https://github.com/NanoNets/docext)
- [Product and docs — nanonets.com](https://nanonets.com/document-parsing-and-extraction)
- [Nanonets-OCR-s model on Hugging Face](https://huggingface.co/nanonets/Nanonets-OCR-s)
