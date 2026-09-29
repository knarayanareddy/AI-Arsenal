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

> **TL;DR:** Reducto, for the structured-output job. Read Strengths and Limitations together: this entry states what it claims to do, and what adopting it would commit you to operating.

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
# Hosted API — request an API key from the dashboard, then POST a document
# to the parse endpoint with your key and the file:
#   curl -X POST "$REDUCTO_API_BASE/parse" \
#     -H "Authorization: Bearer $REDUCTO_API_KEY" \
#     -F "document=@filing.pdf"
# See the docs (Resources) for SDKs and the current endpoint/response schema.
```

## Use Cases

1. **Integrating Reducto**: the structured-output call is a dependency with its own failure modes, not a library call — settle timeout, retry and what happens when it is unavailable before the first request goes through.
2. **Validating the choice**: put Reducto and its named alternatives on the same task with the same data, and record the number that would make you switch — that criterion, not the feature list, is the decision.
3. **Choosing between candidates**: Reducto's comparison set is `unstructured`, `llamaparse`, `mineru`; the axis that separates them is what you operate, so answer that before reading the feature lists.

## Strengths

- Beyond the marketing, Reducto's own notes are the useful part: you submit a document to the API; Reducto performs layout analysis and OCR/parsing server-side, reconstructs reading order and table structure, and returns structured blocks (with tables preserved) plus optional chunking. The value is that layout understanding and table reconstruction — the parts that are hard to build and maintain — are handled as a service.
- Reducto overlaps `unstructured`, `llamaparse`, `mineru` in this phase. Read those entries before choosing: the feature comparison is usually closer than the deployment comparison, and the latter is what you inherit.
- Reducto is a service call, so its failure surface is timeouts, quotas and key expiry rather than anything you can patch.
- Marked beta, so Reducto's interface may still move; pin the version you build against rather than tracking latest.

## Limitations / When NOT to Use

- Depending on Reducto means depending on someone else's availability and pricing, and the exit cost rises with how deeply it is wired into your call sites.
- Reducto's billing makes your workload an input: retries, verbose prompts and agent loops multiply spend quietly, so the metering point decides which optimisations are worth building.
- Reducto is beta, so interface churn is expected; read the changelog before an upgrade rather than after one breaks you.

## Integration Patterns

- Slot in as the parsing stage before chunking/embedding in a RAG pipeline, replacing a naive PDF loader
- Compare against open parsers [Unstructured](../../projects/data-and-retrieval/unstructured.md) and [MinerU](./mineru.md) and against [LlamaParse](../../projects/data-and-retrieval/llamaparse.md); use Reducto where their fidelity on your hardest documents falls short
- Feed structured output into a vector store (Qdrant, Chroma, pgvector) for retrieval

## Resources

- [Website](https://reducto.ai)
- [Documentation](https://docs.reducto.ai/overview)

## Buzz & Reception

Reducto is frequently cited among the managed document-parsing options teams evaluate when open parsers underperform on complex layouts; as a closed API it has no public repo, so adoption signal comes from case studies rather than stars.
