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
org_or_maintainer: "zilliztech"
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
id: deep-searcher
name: "DeepSearcher"
artifact_type: framework
category: rag
subcategory: advanced-rag
description: "Deep research agent that searches a private corpus in Milvus and writes a cited report from the retrieved evidence"
github_url: "https://github.com/zilliztech/deep-searcher"
license: Apache-2.0
primary_language: Python
tags: [rag, retrieval, data, agents]
maturity: beta
cost_model: open-source
github_stars: 8287
last_commit: "2026-09-22"
docs_url: "https://zilliztech.github.io/deep-searcher/"
phase: data-and-retrieval
domain:
  - "language"
relation_to_stack:
  - "build-on-top"
  - "deploy-as-is"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "An agentic deep-research pipeline that decomposes questions and iteratively retrieves over private data to produce cited reports."
best_for: ["You are an enterprise team that needs research answers grounded in internal documents, because the pipeline loads local files and can add web results only when a question needs outside context.", "You already run Milvus or Zilliz Cloud, since that is the first-class vector backend and partitioning is the documented way to keep retrieval efficient across a large corpus.", "You want to choose the model per component, because embedding provider and LLM provider are configured separately rather than being welded to one vendor."]
avoid_if: ["You need report quality you can defend to a regulator, because the reasoning is model-generated over retrieved evidence and the excerpt publishes no citation-fidelity evaluation.", "You are on a tight schedule with no GPU budget, because the default LLM configuration is a hosted model and the reasoner does multi-step reasoning over a retrieved set.", "You need web crawling to work, because the README states web crawling capability is under development and the example path needs a third-party crawl API key."]
enrichment_notes: "Repository, Apache-2.0 license, and 2025-11-19 activity verified via the GitHub API on 2026-07-12. Agentic loops cost multiple LLM calls per query."
---

## Overview

DeepSearcher couples an LLM with a vector database to answer questions from private data and produce a full report rather than a paragraph. The loop has three named stages - search, evaluation and reasoning - so retrieved passages are assessed before they are reasoned over, which is the difference from plain RAG. The storage layer is Milvus or Zilliz Cloud, with data partitioning called out as the way to keep retrieval efficient. Embedding providers and LLM providers are configured independently, so you can use one vendor's embeddings and another's reasoner. Loading happens through an offline stage: a local-file loader for a directory, and a website loader when web support is available and a crawl API key is set. The query call takes a natural-language instruction and returns a generated report.

## Why it's in the Arsenal

The decision it addresses is answering hard questions over a corpus large enough that retrieval is not a top-k lookup. A single vector query returns the nearest documents; a research question needs to decide which source to consult, check whether it answers the question, and then synthesise. Adding an evaluation step between retrieval and generation is what makes that loop possible, and keeping the corpus in Milvus is what makes it usable in an enterprise where the data cannot leave. The trade is latency and cost: each question is several model calls plus retrieval, and there is no interactive feedback loop, so a badly framed question returns a confidently wrong report rather than a clarifying question.

## Architecture

Ingestion is an offline phase that chunks and embeds local files or crawled pages into a Milvus collection, with partitions available to scope retrieval by document type or corpus. Query time is a three-stage pipeline: a search step pulls candidate passages from the vector store, an evaluation step judges their relevance to the question, and a reasoning step feeds the surviving context to a configured LLM that writes the report. Providers are injected through a configuration object, so the LLM and the embedding model are separate settings and either can be a local endpoint. Configuration is applied before the offline loaders run, which keeps provider selection in one place rather than scattered through the call sites.

## Ecosystem Position

DeepSearcher overlaps with graph-based research tools such as GraphRAG and with the general RAG frameworks, and the distinguishing axis is where the reasoning happens: frameworks give you retrieval primitives and you compose the loop, while this ships a fixed search-evaluate-reason pipeline you configure. It competes with building the same loop on a general agent framework, which is more flexible and more work. Compared with a hosted research product, it is the version where the corpus never leaves your Milvus instance. It complements rather than replaces milvus and qdrant in content/projects/data-and-retrieval, which are the stores it queries, and it is a natural fit with the agent frameworks in content/projects/frameworks when a research result becomes an input to another step.

## Getting Started

Create a virtual environment, install, and configure the two providers before loading data:

```bash
python -m venv .venv
source .venv/bin/activate
pip install deepsearcher
```

```python
config.set_provider_config("llm", "OpenAI", {"model": "o1-mini"})
config.set_provider_config("embedding", "OpenAIEmbedding", {"model": "text-embedding-ada-002"})
init_config(config=config)
load_from_local_files(paths_or_directory=your_local_path)
result = query("Write a report about xxx.")
```

The README recommends Python 3.10 and uv for a development install.

## Key Use Cases

1. Internal knowledge research: ask a question about a document corpus and get a written report grounded in what was retrieved, with the data never leaving your infrastructure.
2. Multi-hop question answering: questions where the first retrieved page is not the answer but points to the second, which the evaluate-then-reason stage is shaped for.
3. Partitioned corpora: keep separate collections per product line or document type and let the search step scope retrieval rather than searching everything.

## Strengths

- The corpus stays in your own Milvus or Zilliz instance, so internal documents are not shipped to a research service.
- The evaluation stage between search and reasoning reduces the failure where an irrelevant top-k is synthesised confidently.
- Embedding and LLM providers are configured independently, so you can mix a local embedder with a hosted reasoner.
- Optional web supplement means a question that needs external context does not require a separate pipeline.

## Limitations

The web path is explicitly under development, so treat crawl-based ingestion as unavailable rather than slow. Report quality is entirely a function of the reasoner, and the README publishes no evaluation of citation fidelity or factual accuracy - a plausible-looking report is the expected output, and there is no way to grade it from the tool itself. Each query costs several model calls plus a vector search, so batch research over hundreds of questions is a budget item. The dependency on Milvus is real: an alternative store means writing around the partitioning and collection assumptions the query path makes.

## Relation to the Arsenal

This is a data-and-retrieval phase entry, and its nearest sibling in the same folder is GraphRAG, which is a different answer to the same question - graph-structured versus evaluate-then-reason over flat vectors. Read it with milvus, which it uses as its primary store, and with the retrieval framework entries in content/projects/frameworks if you would rather compose the loop yourself. The embedding models it defaults to sit in content/projects/model-layer, and the eval tooling in content/projects/benchmark-and-eval is where you would measure report quality rather than trusting it.

## Resources

- [GitHub - zilliztech/deep-searcher](https://github.com/zilliztech/deep-searcher)
- [Project page](https://zilliztech.github.io/deep-searcher/)
- [Configuration details in the README](https://github.com/zilliztech/deep-searcher#readme)
