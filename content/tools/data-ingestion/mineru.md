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

MinerU is catalogued here on the strength of its own documentation and public record rather than an independent measurement, so treat the claims below as what the project states about itself until you have run it.

## Key Features

- Layout-aware extraction with reading-order recovery
- Formula-to-LaTeX and table-to-HTML recognition
- Handles scanned docs via OCR (100+ languages); local or hosted API

## Architecture / How It Works

A cascade of detection models segments each page (text, titles, figures, tables, formulas), specialized recognizers process each region, and a reading-order model reassembles results into linear Markdown — with the VLM-backed 2.x pipeline consolidating steps into a single multimodal model.

## Getting Started

Install the Python package and its runtime dependencies first, then make one call to confirm the credentials, network path and configuration are reachable before wiring MinerU into anything else. The command below runs against the `data-labeling` job and returns a result you can inspect directly.

```bash
pip install 'mineru[core]'
mineru -p paper.pdf -o output/
```

Follow the official documentation at https://opendatalab.github.io/MinerU/ for the authentication and configuration options, because the defaults in the quickstart are the ones most likely to need changing for real traffic.

## Use Cases

1. **Where it sits**: on the data-labeling leg, which means the decisions that matter are timeout, retry and degraded-mode behaviour, plus an interface boundary so MinerU can be swapped without touching callers.
2. **Measuring it**: the two numbers this entry does not give you are end-to-end latency at your real request shape and the error rate when the upstream is degraded; both are worth recording before you depend on MinerU.
3. **Choosing between candidates**: MinerU's comparison set is `docling`, `llamaparse`; the axis that separates them is what you operate, so answer that before reading the feature lists.

## Strengths

- The implementation detail worth reading before adopting MinerU is specific — a cascade of detection models segments each page (text, titles, figures, tables, formulas), specialized recognizers process each region, and a reading-order model reassembles results into linear Markdown — with the VLM-backed 2.x pipeline consolidating steps into a single multimodal model — and that is where a capability claim either survives contact with your data or does not.
- Against `docling`, `llamaparse`, the difference that decides this is deployment model and cost rather than the feature list, and MinerU sits at the hosted end of that axis.
- Depending on MinerU means depending on a service rather than a package, which makes substitution easy and outage handling someone else's.
- What this entry cannot give you is measured behaviour: measure MinerU's latency and its error rate under a degraded upstream before it carries production traffic.

## Limitations / When NOT to Use

- Depending on MinerU means depending on someone else's availability and pricing, and the exit cost rises with how deeply it is wired into your call sites.
- Documentation for MinerU describes capability, not behaviour at your request shape; latency, concurrency and failure handling are the parts you must measure yourself.
- Where MinerU overlaps `docling`, `llamaparse`, choosing on feature lists alone is the mistake; the deciding axis is operational.

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
