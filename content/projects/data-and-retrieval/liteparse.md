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
org_or_maintainer: "run-llama"
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
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: liteparse
name: "Liteparse"
artifact_type: library
category: data-pipelines
subcategory: document-processing
description: "A fast open-source document parser from LlamaIndex, written in Rust, that converts PDFs and documents into structured, LLM-ready output"
github_url: https://github.com/run-llama/liteparse
license: "Apache-2.0"
primary_language: "Rust"
tags:
  - "data"
  - "llm"
  - "self-hosted"
  - "rag"
maturity: beta
cost_model: open-source
github_stars: 11495
last_commit: "2026-07-11"
docs_url: https://developers.llamaindex.ai/liteparse/
phase: data-and-retrieval
domain:
  - "language"
  - "vision"
relation_to_stack:
  - "build-on-top"
  - "deploy-as-is"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "A Rust-based document parser that produces clean, structured text for LLM and RAG ingestion as a self-hostable alternative to hosted parsing APIs."
best_for:
  - "You want a fast, self-hostable document parser producing LLM-ready structured text without a per-page cloud fee"
  - "You are in the LlamaIndex ecosystem and want tight integration for RAG ingestion"
avoid_if:
  - "You need the most accurate extraction on highly complex scanned layouts, where heavier vision models may do better"
  - "You need a mature, long-stable API, since the project is young and evolving"
enrichment_notes: "Repository, Apache-2.0 license, and 2026-07-11 activity verified via the GitHub API on 2026-07-12. Young project; the hosted LlamaParse is the managed counterpart."
---

## Overview

Liteparse is an open-source document parser from the LlamaIndex team, written in Rust for speed, that converts PDFs and other documents into clean, structured output suitable for large language models. It is positioned as a fast, self-hostable parsing layer for retrieval pipelines and as an open counterpart to the hosted LlamaParse service.

## Why it's in the Arsenal

High-quality document parsing is the bottleneck in most RAG systems, and a fast, Apache-2.0, self-hostable parser from a major retrieval-framework team is a timely, distinct entry for the data-and-retrieval area.

## Architecture

Liteparse is implemented in Rust and parses document structure into a normalized representation (text blocks, headings, tables) that serializes to Markdown or structured objects for downstream chunking and embedding. The Rust core gives it high throughput and low memory use, and it is designed to plug into LlamaIndex ingestion so parsed content flows directly into indexes and retrievers.

## Ecosystem Position

Liteparse competes with libraries like PyMuPDF and Marker and with hosted parsers such as LlamaParse and Unstructured, differentiating on being Rust-fast, open, and self-hostable while integrating natively with LlamaIndex. Compared with born-digital extractors it aims at LLM-ready structure rather than raw text dumps, and compared with the hosted API it trades managed convenience for control and zero per-page cost.

## Getting Started

Install the package or build from the repository, run the parser on a document to obtain structured Markdown/objects, and feed the result into a LlamaIndex ingestion pipeline or your own chunker; a CLI and library API are provided.

## Key Use Cases

Parsing documents for RAG ingestion; self-hosted alternative to cloud parsing APIs; high-throughput batch document conversion; structured extraction inside LlamaIndex apps.

## Strengths

Fast Rust core, LLM-ready structured output, self-hostable and Apache-2.0, and first-class integration with the LlamaIndex retrieval ecosystem.

## Limitations

It is a young project with an evolving API, may trail specialized vision models on very complex scanned layouts, and its ecosystem and documentation are still maturing relative to long-established parsers.

## Relation to the Arsenal

It complements PyMuPDF and the OCR models in document-processing and links to RAG framework and ingestion entries.

## Resources

- [GitHub repository](https://github.com/run-llama/liteparse)
- [Documentation](https://developers.llamaindex.ai/liteparse/)
