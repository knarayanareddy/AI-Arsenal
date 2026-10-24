---
id: docsgpt
name: "DocsGPT"
type: tool
job: [orchestration, vector-search]
description: "Self-hostable RAG platform with ingestion workers, an agent builder and a ready-made chat UI"
url: "https://github.com/arc53/DocsGPT"
cost_model: open-source
pricing_detail: "MIT-licensed source; the vendor sells cloud and support plans alongside it"
tags: [rag, retrieval, agents, self-hosted, cloud]
maturity: production
stack: [python, typescript]
free_tier: true
free_tier_limits: "MIT source is unrestricted; managed tiers are billed separately by the vendor"
self_hostable: true
open_source: true
source_url: "https://github.com/arc53/DocsGPT"
docs_url: null
github_url: "https://github.com/arc53/DocsGPT"
alternatives: [db-gpt, dust]
integrates_with: []
added_date: "2026-10-02"
last_reviewed: "2026-10-02"
added_by: repo-maintainer
reviewed_by: null
verdict: solid-choice
verdict_rationale: "Removes the ingestion-and-UI boilerplate that stalls most internal RAG projects; the trade is that deep retrieval customisation fights its abstractions"
status: active
phase: orchestration
audience: [production, prototype]
best_when:
  - "You need a working document assistant with upload, parsing and chat in days rather than a framework to assemble"
  - "The corpus is a documentation site or a PDF library and the retrieval strategy can be the platform's default"
avoid_when:
  - "Retrieval quality depends on custom chunking, graph traversal or a reranker the platform does not expose cleanly"
  - "Serving capacity is tight and adding Redis, Celery and a metadata database is not affordable"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Behaviour described from the repository and documentation; retrieval quality on a third-party corpus was not measured for this entry."
buzz_sources: []
---

## Overview

DocsGPT is a self-hostable retrieval platform rather than a retrieval library. The repository ships the whole path: parsers and chunkers for PDFs, Word files, Markdown and crawled documentation; an asynchronous ingestion pipeline; vector store adapters; a chat front end; and an agent builder on top.

The architectural commitment is componentisation at the infrastructure level, not the code level. Vector store, model provider and embedding backend are configuration choices, so a team can begin on OpenAI plus a local Chroma index and move to a self-hosted model and a distributed vector database without rewriting application code.

Celery and Redis carry ingestion, which matters more than it sounds: parsing a large PDF library is slow and bursty, and doing it in the request path degrades chat latency for everyone else.

## Why It's in the Arsenal

The Arsenal catalogues the gap between "framework" and "product": most RAG projects die in the plumbing — file parsing edge cases, re-indexing, a UI nobody planned for, an API for other teams. DocsGPT exists on the other side of that work and is honest about which defaults it chose.

It is also a useful baseline for retrieval comparison. When an entry claims a custom hybrid search or reranker is necessary, the starting point it improves on is usually something like this.

## Key Features

- Ingestion for PDF, Word, Markdown and crawled documentation sites, queued and processed asynchronously.
- Vector store adapters spanning local Chroma through Pinecone, Elasticsearch and Qdrant.
- An agent builder for instructions, tools and API connectors, with multi-step execution over the indexed corpus.
- Provider coverage across hosted APIs and local runtimes such as Ollama and llama.cpp.
- A REST API over upload, indexing, chat and agent execution, so other systems can drive it without the UI.

## Architecture / How It Works

A document upload writes metadata to MongoDB and enqueues a parsing job. Celery workers extract text, split it into chunks, compute embeddings through the configured provider and write vectors to the chosen store; the chat service then embeds the query, retrieves the top passages, assembles a prompt with conversation history and calls the model. The React client talks to the same backend API that external integrations use, so the UI is not a privileged path.

Because ingestion is a queue, indexing throughput scales by adding workers, and the API stays responsive while a large import runs. The cost is more moving parts: a broker, a worker fleet and a metadata store alongside the vector index.

## Getting Started

Run the provided Docker Compose stack, upload a small, well-structured corpus — a documentation site works better than a scanned PDF set — and inspect the retrieved passages for a handful of representative questions before tuning anything. Only then choose a production vector store and connect a self-hosted model, because retrieval quality problems are easier to diagnose before embedding and generation change underneath.

## Use Cases

1. A public documentation assistant that indexes a product's docs site and answers questions with links back to source pages.
2. An internal policy and handbook search where the corpus is PDF-heavy and must stay on company infrastructure.
3. Customer-facing support deflection, using the REST API to embed the assistant in an existing help centre.
4. A pilot that compares hosted and local models over the same indexed corpus before committing to inference spend.

## Strengths

- The ingestion pipeline is the unglamorous majority of RAG work, and it arrives already written, including crawl-based sources.
- Swapping vector store or model is configuration, which keeps a proof of concept from becoming a rewrite.
- Asynchronous processing isolates indexing load from query latency.
- The REST surface is the same one the UI uses, so integrating with other systems needs no reverse engineering.

## Limitations / When NOT to Use

- Retrieval customisation is constrained: non-standard chunking, hierarchical graphs or a bespoke reranker mean working around the platform rather than with it.
- The default footprint is five services, which is heavy for a single-team corpus and adds operational surface.
- Local model quality and latency depend entirely on the hardware you attach; the platform does not manage cold starts or autoscaling for inference.
- Defaults favour breadth over precision, so answer grounding should be evaluated on your own corpus rather than assumed.

## Integration Patterns

Treat DocsGPT as a service: index from your content pipeline through the API, and embed the widget or call the chat endpoint from the applications that need answers. Keep the agent's tools narrow — a search endpoint and a record lookup rather than broad database access — because the agent executes them without a human in the loop. For observability, log retrieved chunk identifiers with each answer; that single field turns an unsupported response into a diagnosable retrieval failure.

## Resources

- [GitHub — arc53/DocsGPT](https://github.com/arc53/DocsGPT)
- [DocsGPT documentation](https://docs.docsgpt.cloud/)

## Buzz & Reception

Reception here is inferred from repository activity and the platform's visible adoption rather than from an independent evaluation; no retrieval benchmark on a published corpus is recorded for this entry. The number that matters is answer grounding on your own documents, which is cheap to measure before committing to the stack.
