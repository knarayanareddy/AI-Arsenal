---
id: paddleocr
name: "PaddleOCR"
version_tracked: "3.7"
artifact_type: library
category: computer-vision
subcategory: document-processing
description: "Baidu's OCR and document-parsing toolkit: PP-OCRv6 for 50-language text spotting and a 0.9B document VLM, with models small enough for edge deployment"
github_url: "https://github.com/PaddlePaddle/PaddleOCR"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "Baidu PaddlePaddle"
tags: [data, multimodal, llm]
maturity: production
cost_model: open-source
github_stars: 91703
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-09-16"
docs_url: "https://www.paddleocr.ai/latest/en/index.html"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [vision, language]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [org-backed, actively-maintained, production-proven]
ecosystem_role:
  - "The industrial open OCR baseline: PP-OCRv6's 1.5M-34.5M-parameter models run on CPU, mobile and accelerator hardware, while the PaddleOCR-VL line adds a 0.9B document parser that competes with general VLMs on page-level parsing."
best_for:
  - "You need OCR that runs where the data is — the PP-OCRv6 tiers span 1.5M to 34.5M parameters, so the same toolkit covers a browser, a phone and a GPU server without changing framework"
  - "You want page-level document parsing without a frontier-model budget — PaddleOCR-VL-1.6 is 0.9B parameters and reports 96.3% on OmniDocBench v1.6, with Markdown/JSON output"
  - "Your documents are multilingual by default — one PP-OCRv6 model covers 50 languages, and the VL line reports 111"
avoid_if:
  - "You need maximum-fidelity scientific PDF conversion with equations and citations — Marker and MinerU are built for that corpus specifically, while PaddleOCR's markdown target is a broader document set"
  - "Your stack is PyTorch-first and nobody wants to own PaddlePaddle — models are Paddle-native; Transformers and ONNX paths exist but become a second ecosystem to support"
upstream_dependencies: []
downstream_consumers: []
alternatives: [marker, mineru, surya]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Re-verified 2026-10-26 from the README and GitHub API: 91,703 stars, 257 open issues, pushed 2026-09-16, latest release v3.7.0 (2026-06-11). Entry updated from PP-OCRv5-era claims to PP-OCRv6 tiers, PaddleOCR-VL-1.6 (0.9B, 96.3% OmniDocBench v1.6), 111-language coverage, Office-to-Markdown conversion and HPD-Parsing."
added_date: "2026-07-08"
last_reviewed: "2026-10-26"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/PaddlePaddle/PaddleOCR", "date": "2026-10-26", "description": "91,703 stars on GitHub as of 2026-10-26 (GitHub API)"}]
featured: false
status: active
---

## Overview

Baidu's open OCR and document-parsing toolkit, built on PaddlePaddle. Two product lines share one repository: the PP-OCR series, a detector-plus-recogniser pipeline that has been the default industrial OCR for years and now ships in 1.5M / 7.7M / 34.5M-parameter tiers, and the PaddleOCR-VL series, a 0.9B vision-language model aimed at page-level parsing into Markdown and JSON. PP-StructureV3 sits between them, chaining layout detection, table recognition and text extraction while keeping coordinates down to the table cell.

## Why it's in the Arsenal

This is the entry that answers "how cheaply can competent OCR run?" The answer changed materially in 2026: a 1.5M-parameter model in a browser, a 34.5M model on a CPU that beats much larger VLMs on detection, and a 0.9B document parser that reports state-of-the-art page parsing. For anyone building a document pipeline, the question is no longer whether open OCR is good enough but which tier of it to put where.

## Architecture

The PP-OCR path is a two-stage pipeline: a DB-family detector localises text regions, then a recogniser (SVTR-lineage, now with a unified multilingual head) decodes them, with optional direction classification between the stages. Models are distilled and quantised, and the release notes describe the inference wins in concrete hardware terms — 5.2× CPU speedup with OpenVINO, 6.1× on an Apple M4 for the tiny model, 0.13s per image on an A100.

The VL path is different in kind: PaddleOCR-VL-1.6 pairs a NaViT-style dynamic-resolution visual encoder with an ERNIE-4.5-0.3B language decoder, so recognition, tables, formulas and charts are produced as markup by one model rather than by a chain of task-specific heads. PaddleOCR 3.5 added Office formats (Word, Excel, PowerPoint) to the Markdown conversion path and DOCX export for parsed results; 3.6/3.7 iterated on the VL model and PP-OCRv6.

Deployment surfaces are unusually broad for a research-adjacent project: Python API, C++ on Linux and Windows, a serving-oriented high-stability solution, Paddle Lite for mobile, an official browser SDK (`PaddleOCR.js`) for PP-OCRv5, and Hugging Face Transformers as an alternative inference backend for 20 major models.

## Ecosystem Position

Upstream: PaddlePaddle as the framework, with CUDA, OpenVINO, XPU and NPU backends. Downstream: the project cites Dify, RAGFlow, Pathway and Cherry Studio as integrations, which is a fair description of its role — it is the ingestion front-end in other people's RAG stacks rather than a destination product. Competing: Tesseract (weaker on layout and scans), EasyOCR, cloud OCR APIs, and on the document-parsing side `marker`, `mineru`, `surya`, `docling` and the general VLMs.

Against `surya`, the split is deployment shape rather than accuracy: Surya is one 650M VLM that wants a GPU or llama.cpp, and PaddleOCR gives you a size ladder from 1.5M parameters upward so the same pipeline can run on a laptop, a phone or a server. Against `marker`, the split is corpus: Marker is tuned for scientific PDFs and Markdown fidelity, PaddleOCR is tuned for breadth of document types and languages.

## Getting Started

```bash
pip install paddlepaddle paddleocr
paddleocr ocr -i document.jpg --lang en
# document parsing to Markdown:
paddleocr pp_structurev3 -i report.pdf
# the 0.9B VL parser:
paddleocr paddleocr_vl -i report.pdf
```

## Key Use Cases

1. **High-volume bulk OCR where cost per page decides the architecture**: the tiny and small tiers exist for exactly this — a pipeline that must process millions of pages a month cannot put a billion-parameter model on each one.
2. **Multilingual corpora without model switching**: the unified PP-OCRv6 head covers Chinese, English, Japanese and 46 Latin-script languages in one model, which removes the per-language routing layer such pipelines usually grow.
3. **Industrial and scene text, not just documents**: IDs, street views, dot-matrix prints, tyre stamps and digital displays are called out as first-class targets, and that is a different corpus from office paperwork.
4. **Forms, invoices and seals**: PP-StructureV3 keeps table-cell and text coordinates, which is the precondition for mapping an extracted value back to a field on a page.
5. **Scanned documents that defeat layout detection**: the PP-DocLayoutV3 line targets skew, warping, illumination and screen-photo capture — the failure modes that make a clean-scan pipeline collapse in the field.
6. **Edge and on-device OCR**: the 1.5M tiny model and the browser SDK mean recognition can run where the image is captured, so documents never leave the device.
7. **Long documents with cross-page structure**: automatic cross-page table merging and hierarchical heading identification are the two things naive page-by-page parsing gets wrong.

## Strengths

- A genuine size ladder in one toolkit: 1.5M to 34.5M parameters for recognition plus an optional 0.9B VLM, so the same code path scales from on-device to batch server.
- The reported numbers are specific and hardware-anchored (5.2× CPU speedup, 0.13s on an A100, 96.3% on OmniDocBench v1.6), which is more checkable than a generic state-of-the-art claim.
- Documentation in eight languages and a very large deployed base — 91k stars and the RAG frameworks that already ship integrations mean the failure modes are documented by other people.
- Coordinates everywhere: PP-StructureV3 exposes table cell and text coordinates, which downstream extraction needs and Markdown-only converters discard.
- Deployment breadth that most competitors do not attempt: C++, mobile via Paddle Lite, browser via PaddleOCR.js, and HF Transformers as an alternative backend.
- The pipeline and VLM lines coexist, so you can run the cheap path for most pages and escalate only the hard ones.

## Limitations

- **The framework is the real commitment.** PaddlePaddle is a second deep-learning ecosystem to own: not just installation, but version pinning, custom ops, and staff who know it. The Transformers and ONNX routes help at inference and do not remove that cost.
- **Benchmark claims are the project's own.** OmniDocBench figures, the detection/recognition deltas and the VLM comparison are self-reported; the harness and test set decide the number, so reproduce them on your corpus before citing them.
- **Two product lines with different quality profiles.** PP-OCRv6 is fast and cheap but is not a document parser; the VL line parses but costs GPU memory. Choosing wrong between them produces either bad layout or an unnecessary bill.
- **Release cadence is high and the API moves.** Eight releases in the period covered by this entry, each with new pipeline names and model variants; code written against 3.2 needs reading before it runs on 3.7.
- **The corpus skews toward Chinese and Asian-language documents**, which is a strength for those and also the explanation for how the model tiers were tuned. English-only scientific PDFs are better served by converters built for that corpus.
- **257 open issues** on a repository with this much surface area; the volume is proportionate, and it still means you are your own support unless you buy into Baidu's cloud.

## Relation to the Arsenal

The production-grade alternative to `surya` and the ingestion front-end that `marker`, `mineru` and `docling` are usually compared against. Output feeds chunking, then vector stores such as `chroma`, `qdrant` and `weaviate`; `ragas` is how you check that a change to the OCR stage improved retrieval rather than only the text.

It also appears in this catalog as an integration point rather than an endpoint: `dify` and RAGFlow-class platforms already embed it, so the decision is often made one layer above this entry.

## Resources

- [GitHub](https://github.com/PaddlePaddle/PaddleOCR)
- [Documentation](https://www.paddleocr.ai/latest/en/index.html)
- [PaddleOCR-VL-1.6 weights](https://huggingface.co/PaddlePaddle/PaddleOCR-VL-1.6)

---
*Last reviewed: 2026-10-26 by @maintainer; github_stars 91,703 as of 2026-10-26; last commit 2026-09-16; both verified via the GitHub API.*
