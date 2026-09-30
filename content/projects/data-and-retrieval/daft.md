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
github_stars_last_30d: 0
trending_score: 0
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: daft
name: Daft
artifact_type: framework
category: data-pipelines
subcategory: libraries
description: "Python-native distributed data engine in Rust that processes images, audio, video and structured data together with LLM and embedding operations"
github_url: "https://github.com/Eventual-Inc/Daft"
license: Apache-2.0
primary_language: Rust
tags: [multimodal, embeddings]
maturity: beta
cost_model: open-source
github_stars: 5789
last_commit: "2026-09-26"
docs_url: "https://docs.daft.ai/"
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
best_for: ["You are building an ETL or scoring pipeline over a mix of structured records and media files, because Daft processes images, audio, video and embeddings alongside structured data in one framework.", "You want inference to run inside your data pipeline rather than as a separate batch job, because prompts, embedding generation and classification are built-in operations using OpenAI, Transformers or a custom model.", "You are in Python and want distributed execution without a JVM, since Daft is Python at the API and Rust under the hood, scaling to Ray or Kubernetes."]
avoid_if: ["Your workload is purely relational SQL analytics, because Daft is built for AI and multimodal data rather than as a SQL engine replacement.", "You cannot add a dependency that shells into Rust binaries, because the performance story depends on the compiled engine rather than being a pure-Python library.", "You need a fully mature production history across many distributed deployments, because the project is young and its scaling story is built on Ray or Kubernetes rather than its own scheduler."]
enrichment_notes: Official repository, Apache-2.0 license, Rust implementation, and 2026-07-10 activity were reviewed on 2026-07-12. Multimodal performance and production fit remain draft.
---

## Overview

Daft is described as a high-performance data engine for AI and multimodal workloads that processes images, audio, video and structured data at any scale. Native multimodal processing means media and structured rows are handled in a single framework rather than exported and reprocessed elsewhere. Built-in AI operations run LLM prompts, generate embeddings and classify data at scale against OpenAI, Transformers or custom models, so inference is a step in a data pipeline rather than a separate system. The implementation is Python-native and Rust-powered: the API is Python and the engine underneath is Rust, which is the stated alternative to JVM-based engines. Scaling goes from local to distributed clusters on Ray or Kubernetes, and connectivity is described as universal across S3, GCS, Iceberg, Delta Lake, Hugging Face and Unity Catalog, with intelligent memory management and sensible defaults doing the reliability work. Installation is pip with Python 3.10 or higher.

## Why it's in the Arsenal

The recurring decision in a multimodal ML pipeline is where media lives relative to the data that describes it. The usual path exports a table of URLs, copies files, runs inference in a separate framework, and joins the results back, which means a second copy of the data and a reconciliation step every time the source changes. Daft's premise is that bytes and rows belong in the same dataset, so a scoring job reads an image and its metadata together, runs a model, and writes the result in one pass. The second decision is language: Python at the API means the team writing the pipeline does not need JVM expertise, while the Rust engine is what makes that convenience affordable.

## Architecture

A DataFrame-style API in Python defines datasets whose schema can mix structured columns with media references, and the Rust engine underneath executes that plan. The execution model is pushdown-aware: work is pushed down to the storage and format layer where possible, so a filter applied after reading object storage avoids reading what it does not need. AI operations are first-class UDFs, with LLM prompt execution, embedding generation and classification implemented against OpenAI, Transformers or a custom model, meaning inference is scheduled as part of the same execution plan as the transformations around it. Memory management is handled internally rather than through explicit partitioning configuration, which is the claimed reliability default. Distribution is by plugging into Ray or Kubernetes rather than a bespoke scheduler, so the scaling story is that of the underlying engine. The connectivity layer spans object stores, table formats and dataset hubs, so a pipeline can read from a lakehouse or a Hugging Face dataset without a separate integration.

## Ecosystem Position

Daft occupies a position that overlaps the query engines in content/projects/data-and-retrieval and the data-processing frameworks, and the differentiator is that media is a first-class column type with inference attached rather than a blob you fetch in user code. It compares to Spark not on relational features, where Spark is the more mature answer, but on multimodal AI workloads where a JVM engine is a liability. It overlaps with the embedding and vector entries in content/projects/data-and-retrieval in that it generates embeddings, but as a pipeline operator rather than as a search index. The model it calls for prompts and embeddings lands in content/projects/foundation-models or a served model from content/projects/inference-engines, and its Ray-based distribution is the same dependency the orchestration entries in content/projects/orchestration use. It complements rather than replaces the ingestion entries in content/projects/data-ingestion, which supply the extracted text and metadata this engine then processes.

## Getting Started

Install the package into a Python 3.10-or-newer environment and load a dataset with media and structured columns:

```bash
pip install daft
```

```python
import daft

df = daft.from_glob("s3://bucket/products/*/*.jpg")
df = df.with_column("caption", daft.func.llm_predict(
    "Describe this product photo in one line", df("path"), model="gpt-4o"))
df.write_parquet("s3://bucket/captions/")
```

The README's quickstart loads a real-world e-commerce dataset, processes product images and runs AI inference; extra dependencies for Ray and AWS utilities install through the installation guide.

## Key Use Cases

1. Multimodal dataset scoring: read images, audio or video alongside their metadata rows and write model outputs back in a single pass without an export-and-join step.
2. Bulk embedding generation: compute embeddings for a large corpus inside a data pipeline, with the model choice as configuration rather than a separate service contract.
3. Data preparation for training: assemble and shuffle multimodal training data from object storage, a lakehouse table format or a Hugging Face dataset in one declarative pipeline.

## Strengths

- Media and structured data in one dataset, which removes the export, copy and reconciliation steps that dominate multimodal pipelines.
- AI operations are pipeline primitives, so prompts, embeddings and classification schedule alongside ordinary transformations.
- Python API over a Rust engine, giving distributed execution without requiring JVM expertise from the team.
- Broad connectivity across object stores, Iceberg, Delta Lake, Unity Catalog and Hugging Face, with automatic memory management as a default.

## Limitations

The project is young, with roughly six thousand stars, so its production history across many distributed deployments is shorter than the established query engines it is sometimes compared against. Distribution depends on Ray or Kubernetes rather than a self-contained scheduler, which means the operational surface is the one you already have plus this engine. Inference inside the pipeline means model calls and data movement are coupled: a token-price change or a rate limit becomes a pipeline reliability problem, and you need retry and cost policies where a stateless scoring service would not. The Python-plus-Rust build means platform wheels and compatibility are a real consideration on unusual architectures. If your workload is relational SQL rather than media and inference, this is the wrong tool and a mature SQL engine is the better buy.

## Relation to the Arsenal

This belongs in content/projects/data-and-retrieval as the multimodal data-processing engine, and it sits between the ingestion entries in content/projects/data-ingestion that produce extracted text and the vector and retrieval entries in the same phase that consume the results. Its model dependencies live in content/projects/foundation-models or are served from content/projects/inference-engines, and its distribution story intersects the orchestration entries in content/projects/orchestration through Ray. Where the framework entries in content/projects/framework build retrieval pipelines over text, this one is the layer that processes bytes at scale, which is the boundary to check before adopting both. Read it against the query engines in the same phase if your data is mostly structured.

## Resources

- [GitHub — Eventual-Inc/Daft](https://github.com/Eventual-Inc/Daft)
- [Documentation — daft.ai/docs](https://docs.daft.ai/)
- [Project site — daft.ai](https://daft.ai)
