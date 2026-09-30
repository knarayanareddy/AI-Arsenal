---
id: mindee-doctr
name: "doctr"
version_tracked: null
artifact_type: library
category: rag
subcategory: document-processing
description: "OCR library for documents that pairs a text-detection backend with a recognizer and reconstructs word-level geometry for downstream extraction"
github_url: "https://github.com/mindee/doctr"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "mindee"
tags: [vision, pytorch, rag]
maturity: production
cost_model: open-source
github_stars: 6366
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-09-28"
docs_url: "https://mindee.github.io/doctr/"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [vision, language]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Document text recognition library with OCR predictors and post-processing for word-level geometry, used as a deterministic OCR baseline against VLM extractors."
best_for:
  - "You need bounding boxes and per-word confidence for every recognized token, because a downstream component consumes geometry rather than just text."
  - "You are building a key-information-extraction pipeline where a layout classifier consumes recognized spans and their positions."
  - "You want to serve OCR from either PyTorch or TensorFlow, or export a model to ONNX, and one maintained codebase covers all three."
avoid_if:
  - "You are indexing scanned PDFs that need only searchable text and can live with word order confusion, where a page-level extractor is simpler and often better."
  - "You need handwriting, low-light, or heavily degraded captures where a modern vision-language model is stronger."
  - "You need GPU-batched throughput on millions of pages and have tuned a leaner pipeline already, since docTR optimizes for accuracy per page and clarity, not raw pages per second."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (6366), Apache-2.0 license, last commit 2026-09-28, primary language Python, and all nine topics were read from the GitHub API. Model families, the 32-pixel alignment detail, KIE scope, and ONNX export come from the official README and docs; no checkpoint was downloaded and no page was processed here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/mindee/doctr", "date": "2026-09-28", "description": "6,366 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

docTR is a document text recognition library from Mindee, maintained as a fork lineage of the original Footnote project. It composes two model families: detection, with DBNet and its fast variant DBNet++, and link prediction, which links character-level boxes into words and lines. Recognition covers a broad checkpoint catalog including CRNN variants, SAR, MASTER, ViTSTR, PARSeq, and TrOCR, and it also ships a pretrained key-information-extraction model for predefined document templates. Both PyTorch and TensorFlow 2 backends are supported, and models can be exported to ONNX through the standard torch export path. The processing pipeline is explicit about resizing, padding, normalization, and batching, so a caller can reproduce exactly what the network saw.

## Why it's in the Arsenal

The decision docTR resolves is whether a text-extraction stage should be an opaque black box or a set of inspectable primitives. Most vision-language extractors return a JSON of fields with no indication of where the text came from or how confident the read was, which makes both human review and automatic routing impossible. docTR returns word polygons, character boxes, geometry-aware post-processing, and confidence scores, so you can threshold, route to a human, or feed a layout model. That is what makes it the sensible deterministic baseline to beat before deciding a vision-language model is worth the cost and the opacity.

## Architecture

A predictor is assembled from a detection model, a recognition model, and a post-processor. At inference, the input document is resized to a multiple of 32 to keep the DBNet feature maps aligned, normalized, and collated into a batch. Detection produces word-level probability maps, thresholds, and bounding boxes that NMS and shape refinement convert into polygons. Each cropped word region is then batched separately, aspect-ratio bucketed, normalized, and passed through the recognizer, which emits per-character probabilities and an argmax sequence. Post-processing decodes CTC or attention outputs, reattaches each word box to its text, and can reorder words geometrically for column layouts, and the end-to-end OCR predictor composes all of this while also producing a confidence score from the mean of word confidences.

## Ecosystem Position

docTR competes directly with PaddleOCR and the Tesseract family, and compared to PaddleOCR it offers a smaller, cleaner, more research-oriented model zoo with easier backend switching, while PaddleOCR wins on language coverage of its recognition models and on deployment tooling. It is an alternative to feeding page images straight to a vision-language model for extraction, trading some accuracy on hard layouts for geometry, batching control, and per-word confidence. It is not a document layout parser: the key-information-extraction model here targets predefined templates, so for general layout understanding the Docling and Unstructured entries in the data-and-retrieval phase are closer. It also overlaps with RapidOCR, which wraps PaddlePaddle inference for a lightweight CPU path where docTR's model zoo is heavier.

## Getting Started

Install the library and run OCR on an image or a PDF page:

```bash
pip install python-doctr[torch]
```

```python
from doctr.io import DocumentFile
from doctr.models import ocr_predictor

model = ocr_predictor(pretrained=True)
doc = DocumentFile.from_images(["receipt.jpg"])
result = model(doc)
for geometry, value, confidence in result.pages[0].blocks[0].lines[0].words:
    print(round(confidence, 3), value, geometry)
```

```python
# export a recognizer for a lighter serving path
torch.onnx.export(recognizer, dummy_input, "crnn.onnx")
```

Use the TensorFlow build with `pip install python-doctr[tf]` when the rest of your stack is TF, and the CPU-only extra with `[torch-cpu]`.

## Key Use Cases

1. Key information extraction from invoices, receipts, and forms, where a recognition span must be tied back to a bounding box for review.
2. Building a gold-standard OCR baseline that a vision-language extractor has to beat before it is allowed into production.
3. Serving OCR through ONNX on a constrained device where the model must be exported rather than run from the full framework.

## Strengths

- Returns word-level geometry and confidence rather than a flat string, which enables review queues, routing, and layout-aware downstream steps.
- Two supported backends, PyTorch and TensorFlow 2, plus ONNX export, so it fits an existing stack without a rewrite.
- A wide recognition checkpoint catalog, including sequence-to-sequence models such as PARSeq and TrOCR alongside classic CRNN.
- Clear, documented preprocessing and batching internals, which makes results reproducible and performance tunable.

## Limitations

Accuracy degrades on handwriting, photographs of screens, low-contrast captures, and non-Latin scripts, where a vision-language model is clearly ahead. The Python processing path is not designed for maximum throughput, so very large document batches need profiling and often a raw-tensor or ONNX path. Model downloads are substantial and the default predictor pulls a detection and a recognition checkpoint together, which matters on disk-constrained deployments. It provides no general-purpose layout understanding, and tuning quality is highly dependent on the input resolution you choose, which is a parameter you have to own yourself.

## Relation to the Arsenal

This is an inference-engine phase entry in the document-processing subcategory, sitting alongside PaddleOCR, RapidOCR, and the Tesseract family in the same phase. Upstream it consumes images produced by the parsing entries such as Docling and Unstructured, and downstream its text and geometry feed the chunking and vector-index entries in data-and-retrieval. For layout-aware extraction that docTR's templates do not cover, the ColPali entry shows the vision-language alternative to an OCR-first pipeline.

## Resources

- [docTR GitHub repository](https://github.com/mindee/doctr)
- [docTR documentation](https://mindee.github.io/doctr/)
- [docTR pretrained model zoo](https://github.com/mindee/doctr)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (6,366 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
