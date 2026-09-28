---
id: pixelrag
name: PixelRAG
version_tracked: null
artifact_type: library
category: rag
subcategory: vector-databases
description: "Renders documents as screenshot tiles and retrieves over the images, with an 8.28M-page Wikipedia index and a pixelbrowse agent skill"
github_url: "https://github.com/StarTrail-org/PixelRAG"
license: Apache-2.0
primary_language: Python
tags: [retrieval, multimodal, rag, chunking]
maturity: alpha
cost_model: freemium
github_stars: 10111
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-27"
docs_url: "https://pixelrag.ai/docs"
demo_url: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Keeps table, chart, and layout structure that HTML-to-text conversion discards, then retrieves on the visual form."
best_for:
  - "You are answering questions about documents where the answer lives in a chart, table, or diagram rather than in prose."
  - "You are building a coding agent that reads documentation sites and keep getting tables flattened into unusable text."
  - "You are evaluating whether visual retrieval beats text retrieval for your corpus before committing to an indexing pipeline."
avoid_if:
  - "You are processing millions of pages yourself, because rendering and indexing at that scale is what the hosted index exists to avoid."
  - "You need exact text extraction with byte fidelity, since the pipeline deliberately trades text for pixels and back."
  - "You cannot send document content to a hosted index, because the production path renders and indexes outside your network."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 10111, Apache-2.0, Python, last commit 2026-09-27, topics, homepage. From README: arXiv 2606.28344, Berkeley affiliations, pixelshot command, api.pixelrag.ai endpoint, 8.28M page index, image-as-query, pixelbrowse skill, Colab demo. Paper numbers not reproduced."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

PixelRAG is the official codebase for the paper Web Screenshots Beat Text for Retrieval-Augmented Generation, from Berkeley SkyLab, BAIR, and Berkeley NLP. The premise is that HTML parsing throws away the visual structure a document uses to convey meaning - table alignment, chart series, column hierarchy, infographics - so the page is rendered to screenshot tiles and the retrieval model operates on those images directly. Two operations matter: pixelshot renders any page, PDF, or image into tiles on disk, and search queries a visual index, optionally accepting an image as the query itself for visual search. A hosted endpoint at api.pixelrag.ai serves a pre-built index of 8.28 million Wikipedia pages with no API key and no setup, and a Colab demo renders a page and searches that index with images inline. The renderer also ships as a Claude Code plugin called the pixelbrowse skill, so an agent screenshots a page and reads the image rather than fetching raw HTML.

## Why it's in the Arsenal

The recurring decision in document RAG is whether to parse to text or to preserve the rendered document. Text extraction wins on token cost, cacheability, and grep, and loses anything whose meaning is positional - a table cell without its header row, a bar chart whose series are only distinguished by color. PixelRAG argues that for a meaningful share of real queries, the visual form is the only form that survives, and that a vision-language reader model can answer from the rendered page when the parse would have discarded the answer. The pixelbrowse skill makes the same argument operational for coding agents, which is where document-structure loss bites most often.

## Architecture

The pipeline has three stages. Rendering uses a headless browser to produce page screenshots, then a tiling step cuts each capture into tiles so a long document becomes a set of independently retrievable images sized for a vision encoder rather than one enormous image. Indexing embeds those tiles and stores the vectors with a pointer back to source position, so a hit can be traced to a region of a page. Retrieval returns candidate tiles, and a vision-language reader consumes the tile image plus the question to produce an answer - which is why the visual form is preserved all the way to inference rather than converted back to text in between. The hosted index applies this pipeline to Wikipedia at 8.28 million pages; the local path gives you the same renderer and lets you build an index over your own corpus.

## Ecosystem Position

PixelRAG competes with text-first document parsers such as Docling, Marker, and Unstructured, and the trade is explicit: they optimize for extracted text and token efficiency while this optimizes for structural fidelity. Compared with a vision-language model applied to page images without a retrieval step - what OCR-style VLM pipelines do - PixelRAG adds the index and the tile-level retrieval that make the approach scale to a corpus rather than a single page. It overlaps with the multimodal document handling in content/projects/data-and-retrieval, but its retrieval target is pixels rather than embeddings of text, so a text vector store cannot substitute for it. The reading step is a vision-language model call, which puts a real inference cost on every question and ties the economics to content/projects/inference-engines. As a research codebase it sits alongside the evaluation entries in content/projects/benchmark-and-eval, where the paper's comparison numbers would need reproducing.

## Getting Started

Install the package, render a page to tiles, and query the hosted index with no API key.

```bash
pip install pixelrag
pixelshot https://en.wikipedia.org/wiki/Python --output ./tiles
curl -X POST https://api.pixelrag.ai/search \
  -H "Content-Type: application/json" \
  -d '{"queries": [{"text": "What is the capital of France?"}], "n_docs": 5}'
```

The Colab quickstart notebook renders a page and searches the hosted index with images inline.

## Key Use Cases

1. Answer questions from charts and tables: retrieve the rendered region rather than a flattened parse that lost the column structure.
2. Give a coding agent document vision: install the pixelbrowse skill so the agent screenshots a page and reads the image instead of scraping raw HTML.
3. Prototype visual retrieval: run the hosted Wikipedia index end to end before investing in your own render-and-index pipeline.

## Strengths

- Preserves tables, charts, and layout that every HTML-to-text pipeline discards, which is the actual failure this targets.
- Tile-level rendering makes a long document into independently retrievable units sized for a vision encoder.
- Hosted 8.28M-page Wikipedia index with no API key, so the approach is evaluable in minutes.
- Accepts an image as the query for visual search, which enables find-a-diagram lookups text retrieval cannot serve.

## Limitations

Cost per query is structurally higher than text RAG: every question runs a vision-language reader over tile images, so latency and token spend both scale with visual tokens rather than text tokens. Rendering your own corpus at scale is expensive - a headless browser per page plus embedding per tile - which is why the hosted index exists and why self-indexing a large private corpus is a real infrastructure project. Accuracy claims come from one paper, and the repository is research code, so expect rough edges around chunk boundaries, dynamic pages, and pages that render differently per load. Apache-2.0 covers the code, but the paper's authors retain the method, and there is no production SLA on the hosted endpoint.

## Relation to the Arsenal

This data-and-retrieval-phase entry deliberately departs from the text-embedding pattern that dominates the other retrieval entries in this phase, which makes it a deliberate outlier worth comparing against them. Its reader model call makes vision inference cost the deciding factor from content/projects/inference-engines, and it consumes MCP-adjacent tool access through the Claude Code plugin pattern seen among the framework entries in content/projects/frameworks. Its reported retrieval gains are exactly the kind of claim that needs reproduction with the tooling in content/projects/benchmark-and-eval.

## Resources

- [Repository](https://github.com/StarTrail-org/PixelRAG)
- [Paper on arXiv](https://arxiv.org/abs/2606.28344)
- [Live demo and API docs](https://pixelrag.ai)
