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
org_or_maintainer: Eventual-Inc
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 20
trending_score: 32
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: daft
name: Daft
artifact_type: framework
category: data-pipelines
subcategory: libraries
description: High-performance data engine for AI and multimodal workloads across images, audio, video, and structured data
github_url: https://github.com/Eventual-Inc/Daft
license: Apache-2.0
primary_language: Rust
tags:
  - data
  - multimodal
  - embeddings
  - batching
  - streaming
  - efficiency
maturity: beta
cost_model: open-source
github_stars: 5640
last_commit: '2026-07-17'
docs_url: https://github.com/Eventual-Inc/Daft
phase: data-and-retrieval
domain:
  - language
  - vision
  - multimodal
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - A dataframe/dataflow engine for multimodal AI preparation, UDF execution, and distributed data processing.
best_for:
  - You need to batch, transform, or inspect images, audio, video, and structured data before training or retrieval.
  - You can benchmark lazy execution, UDF scheduling, storage connectors, and cluster behavior on your corpus.
avoid_if:
  - You need a transactional database or a simple in-memory dataframe for small data.
  - You cannot isolate user-defined functions, control object-store access, or manage distributed data costs.
enrichment_notes: Official repository, Apache-2.0 license, Rust implementation, and 2026-07-10 activity were reviewed on 2026-07-12. Multimodal performance and production fit remain draft.
---

## Overview

Daft is a Rust-backed data engine aimed at AI and multimodal workloads. It provides a dataframe/dataflow surface for processing images, audio, video, and structured records, with lazy execution and user-defined functions intended to scale beyond a single local script.

## Why it's in the Arsenal

The data layer is often the hidden bottleneck in multimodal AI: decoding, embedding, augmentation, filtering, and metadata joins can dominate the model itself. Daft is included as a candidate when a team needs one execution model for heterogeneous data, but it should be compared with a simpler batch framework or distributed dataframe on the exact UDF and storage pattern.

## Architecture

The engine combines a Python-facing API with Rust execution components, lazy query planning, data-type/schema handling, object-storage connectors, and UDF execution. A multimodal pipeline can scan files, decode media, invoke a model or transform, and materialize results as a new dataset. The critical boundaries are UDF isolation, serialization, partitioning, spill behavior, and remote storage access; a fast local scan does not establish distributed or failure-recovery behavior.

## Ecosystem Position

Daft sits between object storage/datasets and training, retrieval, or evaluation systems. It overlaps with dataframe engines and multimodal preprocessing frameworks, while its differentiator is an AI-oriented execution surface across media and structured data. Compare it with the existing data stack on lazy planning, UDF cost, connector support, reproducibility, and operational overhead.

## Getting Started

Start with a representative media partition and one deterministic transformation. Measure scan/decoding throughput, memory, partition skew, UDF execution time, retries, and output reproducibility. Add distributed execution only after the local plan and storage access are understood.

## Key Use Cases

- Preprocessing multimodal datasets for training, retrieval, or evaluation.
- Running batched model or embedding UDFs over large image/audio/video collections.

## Strengths

- AI-oriented data abstractions cover media alongside ordinary tabular records.
- Apache-2.0 project with an active Rust implementation and explicit performance focus.

## Limitations

- User-defined model/data functions can dominate cost and create side effects that the engine cannot reason about.
- Distributed execution adds scheduling, storage, skew, and retry behavior that must be validated on real data.
- It is a processing engine, not a dataset-rights registry or a model-evaluation framework.

## Relation to the Arsenal

Daft belongs in the data-and-retrieval layer below multimodal training and RAG. Pair it with data lineage, sandboxed UDF execution, storage governance, and pipeline-level evaluation.

## Resources

- [Official source](https://github.com/Eventual-Inc/Daft)
