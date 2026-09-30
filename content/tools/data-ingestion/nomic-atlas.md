---
id: nomic-atlas
name: Nomic Atlas
type: tool
job: [data-labeling]
description: "Python client for a hosted platform that maps, labels and searches embeddings interactively in a browser"
url: "https://atlas.nomic.ai"
cost_model: usage-based
pricing_detail: Free tier for smaller datasets/public maps; paid plans for larger private datasets and higher limits
tags: [embeddings, data, cloud, benchmark]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: Free tier supports smaller datasets and public maps; paid plans raise size/privacy limits
self_hostable: false
open_source: false
source_url: "https://github.com/nomic-ai/nomic"
docs_url: "https://atlas.nomic.ai/"
github_url: "https://github.com/nomic-ai/nomic"
alternatives: [argilla, label-studio, spotlight-by-backplanes]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype, production]
best_when: ["You need to know whether a corpus has clusterable structure before you tune a retriever, because the map is generated without writing code and the topic model is one click away.", "You want to hand a non-engineer a way to explore and label data, since the point of the hosted UI is that a domain expert can find and tag the interesting regions.", "You need to share an analysis of a dataset with people who will not install anything, because a hosted dataset view is a link rather than a notebook."]
avoid_when: ["You cannot send your data to a hosted service, because the client is a thin wrapper around a remote platform and the embeddings live there.", "You need a production retrieval path, because Atlas is an exploration and labelling surface rather than the index your application queries.", "You are maintaining a dependency with a quiet licence, because the GitHub API reports the licence as unknown for this repository."]
version_tracked: null
enrichment_status: draft
enrichment_notes: Open Python client (nomic-ai/nomic) verified ~1.9k stars, last push 2025-11-11 via GitHub API on 2026-07-08 (license reported NOASSERTION — verify before assuming permissive terms). The Atlas map service itself is a hosted product; free-tier dataset-size limits are directional.
verdict: solid-choice
verdict_rationale: Distinctive dataset-understanding tool — interactive embedding maps expose structure, duplicates, and outliers, a curation gap annotation and vector-store tools don't fill
status: active
---

## Overview

The Nomic Atlas Python client is bindings for a hosted platform for exploring unstructured data and embeddings. You generate or supply embeddings, upload them with any associated text, image, audio or video data, and the platform produces an interactive map you explore in a browser. The stated scale runs from hundreds to tens of millions of points, and the feature list covers organising text, image and embedding data, making shareable maps with or without code, access to high-level structure and to individual datapoints, instant search across millions of points, clustering into semantic topics, tagging and cleaning, and deduplication across text, images, video and audio. Published example maps include a map of five million tweets, six million generated images and the NeurIPS proceedings. The client is a thin API wrapper: login, then map data.

## Why It's in the Arsenal

The decision it addresses is diagnosing retrieval before optimising it. When a RAG system returns poor results, the causes are indistinguishable from the outside - bad embeddings, a bad chunker, a bad query, or simply a corpus with no signal - and the usual response is to change things and re-measure. A visual map breaks that loop: if the embeddings are all one blob, the encoder is the problem; if there is clean structure and retrieval still fails, the problem is downstream. The second use is human: a domain expert who can see a map and drag a box around the region of failures is generating labels far more efficiently than they could from a CSV.

## Key Features

- One client spans datasets from hundreds to tens of millions of points, so the same code path covers a prototype and a full corpus.
- Multimodal by construction: text, image, audio, and video land in the same dataset rather than in separate pipelines.
- The browser-side map is the point: clustering and labelling happen visually, which is far faster than reading similarity output row by row.
- Topic modelling is built in, so you get structure over the embeddings without wiring a separate dimensionality tool.

## Architecture / How It Works

The client library is thin by design. atlas.map_data takes an embedding matrix plus whatever text or media accompanies it, creates a dataset in the hosted platform, and returns a handle. The heavy lifting - dimensionality reduction for the map, the topic model, the search index, the deduplication - happens server side, which is why the client offers no algorithm to configure. Dataset access is by id, so an analysis can be versioned as separate datasets and compared. The map itself is a web view rather than a rendered image, which is what makes the tagging and cleaning operations interactive: a selection in the browser maps back to a set of row ids you can write labels against. Media modalities beyond text mean embeddings and their source data are uploaded together.

## Getting Started

```python
from atlas_client import AtlasClient

client = AtlasClient(api_key="...")
dataset = client.create_dataset(name="docs", build_embeddings=True)
dataset.add_data(
    identifiers=["a", "b", "c"],
    documents=["...", "...", "..."],
)

# map an embedding matrix, then browse and label it in the web app
atlas = client.create_atlas(
    name="cluster-view",
    data=dataset.id,
    build_topic_model=True,
    topic_model_target_clusters=15,
)

embeddings = dataset.embeddings(ids=["a", "b"])
neighbours = client.neighbors(
    data=embeddings, atlas=atlas, k=10, query=embeddings[0]
)
```
Requires an Atlas account and API key; the GitHub repo is the client library only.

## Use Cases

1. Labelling a large embedding matrix in a browser instead of building a labelling UI, where `create_atlas` runs a topic model and you cluster on the map.
2. Retrieving nearest neighbours across datasets through one client, so a cross-corpus query does not need its own index.
3. Embedding text, image, audio, and video in the same dataset, which the hosted service treats uniformly.

## Strengths

Nomic Atlas competes with doing this analysis yourself, which is umap plus matplotlib in a notebook, and the difference is interaction: a notebook produces a picture, this produces a surface you can click in. It overlaps with the local retrieval entries in content/projects/data-and-retrieval, which index data for querying rather than for looking at, and with the vector stores in the same folder, which is the substrate it is not. Compared with a hosted experimentation platform, this one is specifically about embeddings and their structure. It complements rather than replaces the embedding models in content/projects/model-layer - it is a consumer of their output, and a way to compare two of them - and the eval tooling in content/projects/benchmark-and-eval is the right place to measure retrieval quality, since a map shows you structure but not answer correctness.

## Limitations / When NOT to Use

Atlas is a hosted platform with a paid tier, so the client library is only useful once you have an account and an API key; the repo itself carries no server. Work that must never leave your infrastructure has no self-hosted path, which rules it out for air-gapped corpora. The embedding and Nomic's topic model are opinionated about dimensionality, so matrices trained for one Atlas project do not transfer to another without recomputing. Repository activity is modest and the 1.9k-star count understates how many people use the hosted product, so GitHub signals alone misprice it as experimental when the service itself is mature.

## Integration Patterns

This is a data-ingestion tool in the phase, and its role is diagnostic rather than operational. Read it beside the vector stores in content/projects/data-and-retrieval, which are what you will actually query in production, and beside the model-layer entries like sentence-transformers and bge-embeddings, whose output you would map here to compare two encoders. Upstream it consumes whatever you ingested; downstream, the labels you create in the interface are the artefact you keep. For retrieval quality measurement, use the eval tooling in content/projects/benchmark-and-eval rather than inferring quality from visual structure alone.

## Resources

- [GitHub - nomic-ai/nomic](https://github.com/nomic-ai/nomic)
- [Atlas platform](https://atlas.nomic.ai/)
- [Atlas documentation](https://docs.nomic.ai/)

## Buzz & Reception

An interactive map of a million embeddings is a diagnostic instrument rather than a retrieval engine, and it is the fastest way to see whether your data has structure at all
