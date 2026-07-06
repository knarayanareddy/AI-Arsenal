---
title: "Data Pipelines Build Examples"
section: "build-examples/data-pipelines"
auto_generated: false
---

# Data Pipelines Build Examples

## What belongs here

End-to-end blueprints where the primary artifact is a data-processing pipeline that prepares content for downstream AI use: ingestion, chunking, and embedding pipelines; document processing at scale; knowledge-base construction; and data-quality/deduplication systems. The defining trait is that the output is a clean, indexed, versioned dataset or knowledge base — not a question-answering or agent system itself.

## What does NOT belong here

If parsing, chunking, and embedding are steps within a build whose primary goal is answering questions over the resulting index, the whole build belongs in `rag-systems/` instead (assign by the hardest, most novel part of the build — a bespoke ingestion pipeline feeding a trivial retrieval step should still be classified by what the finished *system* does for a user). A single tip about chunking strategy or metadata schema that doesn't require a full working pipeline belongs in `tips-and-tricks/rag-and-retrieval/`, not here.

## Quick-start: highest-signal build examples in this phase

- [Document Q&A Pipeline](./intermediate-document-qa-pipeline.md) — parsing, chunking, and indexing with pgvector, evaluated for parsing quality before it ever touches a chatbot

## Build examples in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Data Pipelines in This Phase

### Recently Added

- [Document Q&A Pipeline](./intermediate-document-qa-pipeline.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Document Q&A Pipeline](./intermediate-document-qa-pipeline.md) — Parse, chunk, and index documents into Postgres via pgvector, with provenance metadata and a citation-backed Q&A query
