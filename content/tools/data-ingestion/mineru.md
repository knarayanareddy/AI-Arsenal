---
id: mineru
name: "MinerU"
type: tool
job: [data-labeling]
description: "OpenDataLab's high-fidelity PDF-to-Markdown/JSON extraction tool built on layout, formula, and table recognition models"
url: "https://mineru.net"
cost_model: open-source
pricing_detail: "AGPL-3.0 open source; hosted API on mineru.net"
tags: [data, rag, multimodal]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/opendatalab/MinerU"
docs_url: "https://opendatalab.github.io/MinerU/"
github_url: "https://github.com/opendatalab/MinerU"
alternatives: [docling, llamaparse]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [production, research]
best_when:
  - "Scientific/technical PDFs where formulas (to LaTeX), tables (to HTML), and multi-column layouts must survive extraction"
  - "Corpus-scale document processing on your own GPUs with a permissively usable pipeline (model weights are open)"
avoid_when:
  - "AGPL is a problem for your product's licensing posture"
  - "Simple digital-native PDFs — lighter converters (MarkItDown, pypdf) are much cheaper to run"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (73,903), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "Among the strongest open PDF-extraction stacks, especially for scientific documents; AGPL and GPU needs are the tradeoffs"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/opendatalab/MinerU", "date": "2026-07-08", "description": "73,903 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A document-extraction pipeline from Shanghai AI Lab's OpenDataLab: purpose-built vision models handle layout detection, reading order, formula recognition (to LaTeX), and table structure (to HTML), converting difficult PDFs into faithful Markdown/JSON — originally developed to produce LLM pretraining corpora.

## Why It's in the Arsenal

MinerU earns a place in the Arsenal because it directly addresses a recurring decision point: scientific/technical PDFs where formulas (to LaTeX), tables (to HTML), and multi-column layouts must survive extraction. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Layout-aware extraction with reading-order recovery
- Formula-to-LaTeX and table-to-HTML recognition
- Handles scanned docs via OCR (100+ languages); local or hosted API

## Architecture / How It Works

A cascade of detection models segments each page (text, titles, figures, tables, formulas), specialized recognizers process each region, and a reading-order model reassembles results into linear Markdown — with the VLM-backed 2.x pipeline consolidating steps into a single multimodal model.

## Getting Started

```bash
pip install 'mineru[core]'
mineru -p paper.pdf -o output/
```

## Use Cases

1. **Scenario**: scientific/technical PDFs where formulas (to LaTeX), tables (to HTML), and multi-column layouts must survive extraction
2. **Scenario**: corpus-scale document processing on your own GPUs with a permissively usable pipeline (model weights are open)
3. **Scenario where this is NOT the right fit**: aGPL is a problem for your product's licensing posture — evaluate an alternative instead

## Strengths

- Scientific/technical PDFs where formulas (to LaTeX), tables (to HTML), and multi-column layouts must survive extraction
- Corpus-scale document processing on your own GPUs with a permissively usable pipeline (model weights are open)

## Limitations / When NOT to Use

- AGPL is a problem for your product's licensing posture
- Simple digital-native PDFs — lighter converters (MarkItDown, pypdf) are much cheaper to run

- _Verified for MinerU: stars, license and last-commit come from the GitHub API as of 2026-07-08; the feature list and integration surface are read from the project's own documentation. The best_when/avoid_when judgement above is documentation-derived and has not been re-confirmed against hands-on production use in this environment, so treat the cost, limits and failure modes as claims to check against your workload._

## Integration Patterns

- *Wiring*: adopt MinerU as a Python dependency or sidecar service against the `data-labeling` job.  For a RAG pipeline this is the retrieval leg: keep the embedding model and the index in separate services so you can re-embed the corpus without touching the query path, and re-run the benchmark after any change to the chunking or the vector store.
- *Alternatives*: `docling`, `llamaparse` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Official Site](https://mineru.net)
- [Documentation](https://opendatalab.github.io/MinerU/)
- [GitHub](https://github.com/opendatalab/MinerU)

## Buzz & Reception

- 73,903 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer; both verified via the GitHub API.*
