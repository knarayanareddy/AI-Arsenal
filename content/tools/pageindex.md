---
id: pageindex
name: PageIndex
type: tool
job:
  - Vectorless document indexing and reasoning-based retrieval for RAG pipelines
description: A document indexing framework that replaces vector embedding similarity searches with hierarchical, tree-structured reasoning indices for LLM-driven document r…
url: https://github.com/VectifyAI/PageIndex
cost_model: open-source
pricing_detail: Free and open-source under the MIT license; operational costs depend on external LLM inference usage during index construction and traversal.
tags:
  - rag
  - vectorless-rag
  - context-engineering
  - information-retrieval
  - reasoning
  - agents
  - llm
maturity: beta
stack:
  - python
  - llm-apis
  - json
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-10-27
last_reviewed: 2026-10-27
added_by: repo-maintainer
verdict: recommended
verdict_rationale: PageIndex addresses the core weakness of dense vector retrieval: semantic drift and loss of structural context in long-form, complex documents. By using structured document trees traversed via LLM reasoning, it trades raw query latency for significantly higher recall accuracy on multi-hop questions.
status: active
phase: orchestration
audience:
  - rag-architects
  - ai-engineers
  - enterprise-search-developers
best_when: Building RAG systems over complex, structured documents (financial prospectuses, legal contracts, technical manuals) where chunking destroys semantic context and precise structural navigation is required.
avoid_when: Low-latency (<200ms) vector search is required, or when querying unorganized unstructured corpora consisting of short, disconnected micro-documents.
github_url: https://github.com/VectifyAI/PageIndex
docs_url: null
---

## Overview

PageIndex is an open-source framework designed to replace or supplement vector-based Retrieval-Augmented Generation (RAG) with reasoning-based document traversal. Traditional RAG relies on splitting documents into uniform text chunks, mapping them into dense vector spaces using embedding models, and retrieving candidates via cosine similarity. While effective for simple semantic matching, vector RAG frequently fails on long-form, highly structured documents where global context, cross-references, and precise section hierarchies dictate the correct answer.

PageIndex constructs a structured, human-interpretable index of documents—analogous to an expanded table of contents overlaid with semantic node summaries—rather than flattening text into isolated embedding chunks. During document ingestion, the framework analyzes physical layouts, section headings, and content boundaries to build a hierarchical tree structure. Each node in the index represents a logical document segment with associated metadata, summaries, and structural relationships.

At query time, PageIndex utilizes an LLM agent to navigate this tree structure deterministically. Rather than comparing query vectors to chunk vectors, the system prompts an inference engine to reason over the index hierarchy, evaluating node descriptions to decide which branches to prune and which sub-trees to explore. This approach guarantees that retrieved context retains its native document position, section boundaries, and parent-child relationships.

## Why It's in the Arsenal

PageIndex eliminates chunk boundary corruption, a primary cause of context loss in standard vector database ingestion. In traditional chunking pipelines, critical context split across chunk boundaries must be reassembled using sliding windows or parent-retriever patterns, which introduce noise. PageIndex preserves natural layout boundaries, ensuring that tabular data, nested clauses, and multi-page sub-sections remain intact during retrieval.

The framework provides superior performance on complex, multi-hop queries over long texts (such as financial 10-K filings, legal contracts, and engineering specifications). Because retrieval relies on top-down tree search guided by reasoning rather than top-k embedding distance, PageIndex avoids 'semantic loss' where syntactically distant but logically connected facts are missed by standard vector similarity metrics.

Index structures created by PageIndex are fully inspectable JSON representations. Unlike black-box vector indices where individual dimensions cannot be audited, PageIndex trees can be serialized, visually debugged, manually edited, and cached. This gives engineers direct visibility into how document sections are categorized and pruned during an agentic search trace.

## Key Features

Hierarchical Index Generation: Ingests PDFs and Markdown sources to automatically generate nested JSON trees representing document chapters, sub-sections, and structural nodes.

Reasoning-Based Tree Search: Implements agentic traversal mechanisms where LLMs evaluate branch summaries to prune non-relevant branches, reducing search scope without scanning raw text.

Vectorless Navigation Primitives: Operates without requiring specialized vector databases or embedding models, simplifying infrastructure requirements to standard relational/document stores and LLM APIs.

Context-Preserving Node Formatting: Extracts and maintains explicit metadata including exact page numbers, parent section headers, and cross-reference links within each structural node.

Configurable Traversal Depth: Allows developers to configure search algorithms (e.g., depth-first, breadth-first, or branch-and-bound) based on computational budget and accuracy requirements.

## Trade-offs

Increased Query Latency: Navigating a document tree via successive LLM reasoning calls introduces significantly higher latency (often several seconds per query) compared to sub-100ms vector database ANN (approximate nearest neighbor) queries.

Higher Token Cost: Traversal requires feeding index node metadata and summaries into LLMs during query execution, leading to higher token consumption per request compared to standard vector lookup pipelines.

Preprocessing Sensitivity: The quality of the generated index depends heavily on document layout parsing. Poorly formatted PDFs without clear visual or structural cues can produce unbalanced or inaccurate document trees.

Scalability Limits per Index: While highly efficient within large individual documents or cohesive document sets, tree-based traversal scales differently across massive, heterogeneous multi-million document corpora compared to centralized vector indices.
