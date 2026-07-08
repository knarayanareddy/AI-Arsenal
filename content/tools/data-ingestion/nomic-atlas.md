---
id: nomic-atlas
name: Nomic Atlas
type: tool
job: [data-labeling]
description: Platform to embed, visualize, and explore large text/image datasets on an interactive map — surfacing clusters, duplicates, and outliers for dataset curation
url: "https://atlas.nomic.ai"
cost_model: freemium
pricing_detail: Free tier for smaller datasets/public maps; paid plans for larger private datasets and higher limits
tags: [embeddings, data, multimodal]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free tier supports smaller datasets and public maps; paid plans raise size/privacy limits
self_hostable: false
open_source: false
source_url: "https://github.com/nomic-ai/nomic"
docs_url: "https://docs.nomic.ai/"
github_url: "https://github.com/nomic-ai/nomic"
alternatives: [argilla, label-studio, spotlight-by-backplanes]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype, production]
best_when:
  - You need to actually see the structure of a large text/image dataset — clusters, near-duplicates, outliers, mislabeled regions — before training, fine-tuning, or building an index
  - You want an embeddings map you can explore interactively rather than staring at rows, to guide curation and slicing decisions
avoid_when:
  - You need row-level human annotation workflows with reviewer queues — a labeling tool (Argilla, Label Studio) fits better than a visualization map
  - Data must remain fully on-prem — the map platform is hosted (the client library is open, the Atlas service is not)
version_tracked: null
enrichment_status: draft
enrichment_notes: Open Python client (nomic-ai/nomic) verified ~1.9k stars, last push 2025-11-11 via GitHub API on 2026-07-08 (license reported NOASSERTION — verify before assuming permissive terms). The Atlas map service itself is a hosted product; free-tier dataset-size limits are directional.
verdict: solid-choice
verdict_rationale: Distinctive dataset-understanding tool — interactive embedding maps expose structure, duplicates, and outliers, a curation gap annotation and vector-store tools don't fill
status: active
---

> **TL;DR:** Nomic Atlas embeds and maps large text/image datasets into an interactive 2-D view so you can see clusters, near-duplicates, and outliers and curate accordingly. Freemium; a solid choice for dataset understanding before training or indexing.

## Overview

Nomic Atlas turns a large dataset into an explorable embedding map: it embeds your text or images, projects them into an interactive 2-D layout, and lets you pan, zoom, search, and color by metadata. The point is to make the *structure* of unstructured data visible — where it clusters, what is duplicated, and what is anomalous — which is otherwise invisible in a table of rows.

## Why It's in the Arsenal

Teams routinely train, fine-tune, or build RAG indexes on datasets they have never actually looked at, then discover duplication, contamination, or skew after the fact. Atlas fills the dataset-understanding gap upstream of those steps: it is not a labeling queue and not a vector database, but an exploration/curation surface that complements both, which is why it sits in the data-ingestion phase.

## Key Features

- Interactive 2-D embedding maps of large text and image datasets
- Cluster, duplicate, and outlier discovery via visual structure and search-over-embeddings
- Metadata coloring/filtering to inspect slices and spot skew or mislabeling
- Open Python client (`nomic`) to build, update, and query maps programmatically, including Nomic's own embedding models

## Architecture / How It Works

The `nomic` client uploads your data (or embeddings) to the Atlas service, which computes embeddings if needed, builds a nearest-neighbor structure, and generates a dimensionality-reduced interactive map served in the browser. You interact with the map visually and via the client API (search, tag, retrieve neighbors), so exploration and programmatic curation share the same index.

## Getting Started

```python
pip install nomic
# import nomic
# nomic.login("nk-...")
# from nomic import atlas
# ds = atlas.map_data(data=records, indexed_field="text")
# print(ds.maps[0])  # open the interactive map URL
```

## Use Cases

1. **Scenario**: auditing a fine-tuning dataset for near-duplicates and off-distribution clusters before spending training compute
2. **Scenario**: exploring a RAG corpus to see topic coverage and gaps, guiding what to add or down-sample before building the index

## Strengths

- Makes dataset structure visible — the single best way to catch duplication, skew, and outliers early
- Open client with Nomic's embedding models lowers the barrier to mapping your own data
- Complements labeling and vector tooling rather than overlapping it

## Limitations / When NOT to Use

- Not an annotation workflow tool: no reviewer queues or task assignment (use Argilla/Label Studio for that)
- Hosted map service — unsuitable where all data must remain on-prem; client license terms are ambiguous (NOASSERTION), so verify before relying on them
- Very large private datasets push you into paid tiers; free limits are modest

## Integration Patterns

- Run Atlas as a pre-training/pre-indexing audit step, then feed cleaned/curated data into training or a vector store
- Pair with annotation tools [Argilla](./argilla.md) or [Label Studio](./label-studio.md): map first to find what needs labeling, then label those slices
- Compare with data-debugging viewers like [Spotlight](../evaluation-and-observability/spotlight-by-backplanes.md) for tabular/embedding inspection

## Resources

- [Website](https://atlas.nomic.ai)
- [Documentation](https://docs.nomic.ai/)
- [GitHub (nomic-ai/nomic)](https://github.com/nomic-ai/nomic)

## Buzz & Reception

Nomic (maker of Atlas and the open Nomic Embed models) is a well-known name in open embeddings; the `nomic` client sits at ~1.9k stars (GitHub API, 2026-07-08), with the interactive map service as the hosted product on top.
