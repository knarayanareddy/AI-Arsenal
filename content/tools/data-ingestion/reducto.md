---
id: reducto
name: Reducto
type: tool
job: [structured-output]
description: Document ingestion API that parses complex PDFs (tables, figures, multi-column) into clean, structured, chunk-ready output for RAG pipelines
url: "https://reducto.ai"
cost_model: usage-based
pricing_detail: Usage-based per-page pricing with starter credits; enterprise plans available
tags: [rag, data, structured-output]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: Starter credits for evaluation; usage-based per-page billing beyond them
self_hostable: false
open_source: false
source_url: "https://reducto.ai"
docs_url: "https://docs.reducto.ai/overview"
github_url: null
alternatives: [unstructured, llamaparse, mineru]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [production]
best_when:
  - Your RAG quality is bottlenecked by bad parsing of complex documents — tables, multi-column layouts, figures — where naive PDF-to-text loses structure that retrieval depends on
  - You want parsing plus layout-aware chunking as a managed API rather than maintaining an OCR/layout pipeline yourself
avoid_when:
  - Your documents are simple, born-digital text where a free parser (or plain PDF text extraction) already produces clean output — a paid API adds cost for no gain
  - You need an on-prem/self-hosted parser for data-residency reasons — it is a hosted API
version_tracked: null
enrichment_status: draft
enrichment_notes: Hosted document-parsing API (no public GitHub repo). Accuracy claims on complex tables/layouts are vendor-reported; evaluate on your own document mix. Pricing is usage-based per page — confirm current rates on the pricing page.
verdict: solid-choice
verdict_rationale: A strong managed option specifically for high-fidelity parsing of complex, table-heavy documents where open parsers underperform, though it is paid and hosted-only
status: active
---

> **TL;DR:** A hosted document-ingestion API focused on high-fidelity parsing of complex PDFs — tables, multi-column layouts, figures — into clean, layout-aware, chunk-ready output for RAG. Usage-based; a solid choice when parsing quality is your retrieval bottleneck.

## Overview

Reducto is a document-parsing API aimed at the hardest part of RAG ingestion: turning messy real-world documents (financial filings, scientific papers, forms) into faithful structured text. It extracts tables, respects multi-column and figure layouts, and returns layout-aware chunks, so downstream retrieval indexes accurate content instead of garbled text.

## Why It's in the Arsenal

RAG systems fail silently when ingestion mangles tables or column order — retrieval then returns correct-looking but wrong context. Reducto earns a place because it targets that specific, high-impact failure mode with a managed API, competing with open parsers (Unstructured, MinerU) and LlamaParse on parsing fidelity for complex documents rather than on breadth of features.

## Key Features

- High-fidelity extraction of tables and complex layouts from PDFs and scanned documents
- Layout-aware chunking that preserves structure for retrieval
- Structured JSON output (blocks, tables, reading order) rather than a flat text dump
- Managed API removing the need to run and tune an OCR/layout stack

## Architecture / How It Works

You submit a document to the API; Reducto performs layout analysis and OCR/parsing server-side, reconstructs reading order and table structure, and returns structured blocks (with tables preserved) plus optional chunking. The value is that layout understanding and table reconstruction — the parts that are hard to build and maintain — are handled as a service.

## Getting Started

```bash
# Hosted API — request an API key from the dashboard, then POST a document:
# curl -X POST https://api.reducto.ai/parse \
#   -H "Authorization: Bearer $REDUCTO_API_KEY" \
#   -F "document=@filing.pdf"
# See the docs (Resources) for SDKs and the current endpoint/response schema.
```

## Use Cases

1. **Scenario**: a finance RAG app ingesting 10-K filings whose tables must be extracted faithfully or answers become wrong
2. **Scenario**: a scientific-paper assistant that needs multi-column text and figure captions parsed in correct reading order before chunking

## Strengths

- Targets the highest-leverage RAG failure (bad parsing) rather than adding another orchestration layer
- Preserves tables and reading order, which flat PDF-to-text extraction routinely destroys
- Managed service removes the burden of maintaining OCR/layout models

## Limitations / When NOT to Use

- Paid and hosted-only: overkill for simple born-digital documents and unusable where data cannot leave your environment
- No public open-source implementation to inspect or self-host
- Accuracy claims are vendor-reported; real-world quality varies by document type, so benchmark on your own corpus

## Integration Patterns

- Slot in as the parsing stage before chunking/embedding in a RAG pipeline, replacing a naive PDF loader
- Compare against open parsers [Unstructured](../../projects/data-and-retrieval/unstructured.md) and [MinerU](./mineru.md) and against [LlamaParse](../../projects/data-and-retrieval/llamaparse.md); use Reducto where their fidelity on your hardest documents falls short
- Feed structured output into a vector store (Qdrant, Chroma, pgvector) for retrieval

## Resources

- [Website](https://reducto.ai)
- [Documentation](https://docs.reducto.ai/overview)

## Buzz & Reception

Reducto is frequently cited among the managed document-parsing options teams evaluate when open parsers underperform on complex layouts; as a closed API it has no public repo, so adoption signal comes from case studies rather than stars.
