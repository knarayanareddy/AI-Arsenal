---
title: "RAG Systems Build Examples"
section: "build-examples/rag-systems"
auto_generated: false
---

# RAG Systems Build Examples

## What belongs here

End-to-end, reproducible blueprints where the primary system being built is a retrieval-augmented generation pipeline: basic single-corpus RAG chatbots, advanced/production RAG APIs, hybrid search, multi-document RAG, agentic RAG, and RAG with reranking or self-correction loops. The defining trait is that retrieval-then-generation over a document corpus is the system's core job, even if the build also touches an API layer, an eval harness, or an agent loop along the way — assign by the hardest, most novel part of the build (see Phase Assignment Rules in the vertical's migration notes).

## What does NOT belong here

If the primary artifact is an evaluation harness that happens to evaluate a RAG pipeline, it belongs in `evaluation-pipelines/`, not here. If the primary challenge is standing up production serving infrastructure (load balancing, gateway, autoscaling) around an already-working RAG system, it belongs in `production-deployment/`. If the build is really about parsing and indexing a document corpus with no question-answering component, it belongs in `data-pipelines/`. A single tip about chunk size or reranking that does not require building a full system belongs in `tips-and-tricks/rag-and-retrieval/`, not here.

## Quick-start: highest-signal build examples in this phase

- [Basic RAG Chatbot](./starter-basic-rag-chatbot.md) — the smallest complete RAG loop: LlamaIndex + Chroma + Gradio, source-grounded answers over a local document folder
- [Production RAG API](./intermediate-production-rag-api.md) — FastAPI + Qdrant + Langfuse + RAGAS, the shape most teams actually ship
- [Self-Correcting RAG](./advanced-self-correcting-rag.md) — adds a context-sufficiency grader and query-rewrite retry loop on top of a working baseline

## Build examples in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Rag Systems in This Phase

### Recently Added

- [Self-Correcting RAG](./advanced-self-correcting-rag.md)
- [Production RAG API](./intermediate-production-rag-api.md)
- [Basic RAG Chatbot](./starter-basic-rag-chatbot.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Self-Correcting RAG](./advanced-self-correcting-rag.md) — A RAG pipeline that grades retrieved context, rewrites the query on insufficient evidence, and falls back honestly after bounded retries
- [Production RAG API](./intermediate-production-rag-api.md) — A FastAPI RAG service backed by Qdrant with request-scoped tracing, source citations, and async ingestion
- [Basic RAG Chatbot](./starter-basic-rag-chatbot.md) — A document-grounded chatbot: LlamaIndex + Chroma + Gradio, source-grounded answers over a local folder of documents
