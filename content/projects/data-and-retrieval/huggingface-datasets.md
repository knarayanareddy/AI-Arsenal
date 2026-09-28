---
id: huggingface-datasets
name: "datasets"
version_tracked: null
artifact_type: library
category: data-pipelines
subcategory: datasets
description: "Loads, caches, and streams Hugging Face Hub corpora as Arrow-backed map-style or iterable datasets"
github_url: "https://github.com/huggingface/datasets"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "huggingface"
tags: [data, streaming, evaluation]
maturity: production
cost_model: open-source
github_stars: 22014
github_stars_last_30d: 0
trending_score: 35
last_commit: "2026-09-28"
docs_url: "https://huggingface.co/docs/datasets"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Dataset loading, caching, and streaming library that hides Parquet/Arrow/streaming format differences behind one map API, and is the standard ingestion path for evaluation corpora."
best_for:
  - "You are building an evaluation harness and need versioned benchmark corpora with a pinned revision hash so results reproduce next quarter."
  - "You are fine-tuning on a corpus larger than machine memory and need iterable streaming with shuffle and shard-level parallelism instead of a local download."
  - "You are moving between raw Parquet on object storage and a NumPy/PyArrow training loop and want one loader that handles caching, resumption, and format quirks."
avoid_if:
  - "You need low-latency random writes or a mutable dataset, since Dataset objects are immutable and regeneration goes through a new cache entry."
  - "You must guarantee that a remote dataset script never runs on your host, because load_dataset still honours dataset scripts in legacy repositories."
  - "Your storage cost is the binding constraint: the default cache fingerprints every distinct transform, and unpruned map calls accumulate many full copies on disk."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (22014), Apache-2.0 license, last commit 2026-09-28, Python as primary language, and the topic list were verified via the GitHub API. Fingerprinting, Arrow storage, and streaming internals are described from official docs and the README; no local install or benchmark was run for this entry."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/huggingface/datasets", "date": "2026-09-28", "description": "22,014 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

datasets turns a Hub repository name plus config and split into a DatasetDict of Dataset or IterableDataset objects. Under the hood a row is a Python dict backed by a memory-mapped Apache Arrow table, so a JSONL or Parquet export is converted once into Arrow on first use and every later load reuses that file after a cache-fingerprint match. The public surface is small: load_dataset, load_from_disk, Dataset.map with batched and num_proc parallelism, filter, select, sort, shuffle, train_test_split, concatenate_datasets, and push_to_hub. Setting streaming=True switches the ArrowReader for an HTTP range-request reader that yields shuffled shards with no local materialisation, and set_transform lets you project a dict into torch tensors lazily without baking the transform into the cache key.

## Why it's in the Arsenal

The recurring decision this library settles is where a corpus physically lives and how its bytes reach a training loop. Teams otherwise end up with a pile of per-project download scripts, each with its own retry logic, its own silent partial-download failure, and its own idea of what constitutes row 0 of the validation split. datasets makes the corpus a named, versioned object with a content-addressed cache, so a rerun three weeks later either hits the same Arrow file or recomputes deterministically from the same transform spec.

## Architecture

The pipeline is a three-layer stack. At the bottom sits a Hub downloader that resolves a dataset repo's parquet exports or a custom loading script, then a Builder that materialises raw bytes into a cached Arrow file per split. A fingerprint hash over the builder name, config, split, and every transform argument becomes the cache key, so datasets that differ only by shuffle seed or batch size still recompute. The middle layer is the table: Arrow columns with a `data_files` manifest describing sharded remote URLs, exposed through a Table wrapper. The top layer is a query engine that fuses filter, select, and map into per-shard sequential execution, with num_proc spawning one Python worker per shard; the streaming path replaces eager table loading with an iter_arrow generator that reads byte ranges on demand and buffers a shuffle window.

## Ecosystem Position

datasets is the ingestion layer that precedes everything else, and it overlaps with fsspec for remote I/O and with webdataset for sharded image streams, but it is not a query engine — DuckDB and polars sit downstream reading the same Parquet files. Compared to TensorFlow Datasets, which grew a richer pipeline-compilation story, datasets trades some graph flexibility for a far smaller API and native PyTorch support; it is an alternative to writing bespoke download-and-preprocessing scripts, and it complements hf-training-loop style trainers that expect a torch DataLoader. Against Dask or Ray Data it makes a different bet: single-node, cache-backed simplicity rather than cluster-scale elasticity.

## Getting Started

Install the library and pull a corpus without touching disk beyond the Arrow cache:

```bash
pip install datasets
```

```python
from datasets import load_dataset

corpus = load_dataset(
    "wikimedia/wikipedia",
    "20231101.simple",
    split="train",
    streaming=True,
    revision="main",
)
for doc in corpus.take(2):
    print(doc["id"], doc["url"])
```

For a private corpus, push a folder of Parquet or JSONL files and load it with load_dataset("parquet", data_files=...) or load_from_disk on a previously saved save_to_disk output.

## Key Use Cases

1. Streaming a multi-terabyte text corpus for continued pretraining, shuffling shard order and skipping to a resume checkpoint without materialising the whole dataset.
2. Assembling a benchmark suite where each eval set is pinned to a commit hash so a leaderboard number can be re-derived months later.
3. Applying a shared preprocessing function to a training split, caching the mapped Arrow output once and reusing it across many training runs and num_proc settings.

## Strengths

- One API spans JSON, JSONL, CSV, Parquet, Arrow, and webdataset-style archives, plus legacy loading scripts for older Hub repos.
- Streaming keeps memory flat and disk optional, which is what makes hundred-billion-token corpora reachable from a laptop.
- The fingerprint cache makes transform cost amortised across runs and seeds deterministic by default.
- Native torch, pandas, Polars, and NumPy export paths avoid a bespoke collate layer.

## Limitations

The default cache is a growth risk: each distinct map or num_proc combination produces another full Arrow copy, and there is no built-in eviction, so a long-lived training box can quietly fill its disk. Legacy repositories with loading scripts execute arbitrary remote code, which is a supply-chain risk in CI, and trust_remote_code must be opted into per dataset. Column-level casting and nested-list schemas occasionally hit Arrow limits on oversized strings, requiring a cast_column fix. Arrow's memory mapping also means deleting the cache directory while a process holds the file open produces confusing segfaults, and row-wise iteration stays slow — you should stay in batched map form throughout.

## Relation to the Arsenal

This is the upstream data contract for content/projects/data-and-retrieval siblings such as chroma, qdrant, and docling: documents land in a dataset first, then get chunked, embedded, and indexed. For the orchestration side of ingestion, dbt covers warehouse-shaped SQL, while Ray and Dask own cluster-scale transforms. Readers who need the raw tabular engine underneath the Arrow layer should jump to apache-arrow and polars; readers who need vector search over the result should read the vector-database entries rather than this one.

## Resources

- [Hugging Face Datasets documentation](https://huggingface.co/docs/datasets)
- [Datasets GitHub repository](https://github.com/huggingface/datasets)
- [Dataset viewer and Hub search](https://huggingface.co/datasets)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (22,014 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
