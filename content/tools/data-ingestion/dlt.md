---
id: dlt
name: "dlt"
type: tool
job: [data-labeling]
description: "Python ELT library that turns APIs, files and databases into declarative pipelines with schema inference"
url: "https://dlthub.com"
cost_model: open-source
pricing_detail: "Apache-2.0 open source; dltHub cloud offerings optional"
tags: [agents, inference]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/dlt-hub/dlt"
docs_url: "https://dlthub.com/docs"
github_url: "https://github.com/dlt-hub/dlt"
alternatives: [airbyte]
integrates_with: [langchain]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype, production]
best_when: ["You are pulling from an API with pagination and want schema inference to handle the typing instead of you writing a custom extractor.", "You need the same pipeline to run in a notebook, a Lambda function, an Airflow DAG and an AI coding agent, because dlt is a library rather than a platform.", "You want to move from a local DuckDB to BigQuery, Snowflake or Databricks by changing the destination rather than rewriting the load."]
avoid_when: ["You need a managed platform with hosted schedules and lineage UI, because dlt is a library you run yourself.", "You are on Python 3.14 and need every optional extra, because the README calls 3.14 support experimental for some extras.", "You need real-time streaming ingestion, because dlt is built around batch-style extraction with incremental state."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (5,578), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The best code-first ingestion library in the Python ecosystem; the natural ELT layer inside agentic/data apps"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/dlt-hub/dlt", "date": "2026-07-08", "description": "5,578 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

dlt, the data load tool, is an open-source Python library for automating data loading, designed to drop into a Google Colab notebook, a Lambda function, an Airflow DAG, a laptop or an AI coding agent. The core idea is declarative source description: you name the base URL and the resource endpoints, and the library handles requests, pagination, schema inference and typing. Destinations are chosen at pipeline construction, with extras covering DuckDB locally and BigQuery, Snowflake, Postgres, Redshift, Databricks or Athena in the cloud, plus filesystem, SQL source and hub extras. Python 3.10 through 3.14 are supported, with 3.14 experimental for some extras.

## Why It's in the Arsenal

The recurring data-engineering decision is whether an API integration deserves a bespoke extractor. The answer is usually that it does not, because the tedious parts are pagination, rate limiting and schema drift rather than the business logic, and those three get rewritten badly for every source. dlt makes the source a declaration so the plumbing is handled once, which means a new API takes an afternoon instead of a sprint and the schema is inferred rather than guessed.

## Key Features

- Declarative sources with schema inference eliminate the bulk of custom extractor code per API.
- Library-first, so the same pipeline runs in a notebook, a Lambda, a DAG or an agent with no platform dependency.
- Destination is a construction-time choice, which makes local DuckDB prototyping and warehouse promotion the same code.
- Incremental state is built in, which is the single biggest cause of needless re-ingestion in homegrown loaders.

## Architecture / How It Works

A source, such as the REST API source, is described with a client base URL and a list of resources each naming an endpoint. The extractor walks the declared resources, following pagination and issuing the requests, while inferring a schema from the observed payloads and typing columns accordingly. A pipeline binds that source to a destination and carries state so subsequent runs load incrementally rather than refetching everything. Because it is a library, the same code path runs in a notebook, a scheduled DAG or an agent invocation, with destination selection isolated in pipeline construction.

## Getting Started

Install the base library plus the extras for your source and destination:

```bash
pip install dlt
pip install "dlt[duckdb]"
```

Then declare the source with the REST API helper and bind it to a pipeline; `uv add "dlt[duckdb]"` is the documented uv equivalent.

## Use Cases

1. API to warehouse: describe a paginated REST endpoint, let dlt infer the schema, and land it in BigQuery or Snowflake by changing the destination.
2. Notebook-to-production: prototype the load in Colab, then import the same source object into a Lambda or Airflow task with no rewrite.
3. Incremental ingestion: rely on pipeline state so a rerun loads only new records instead of re-pulling the full history.
4. Agent-triggered loads: call a declared pipeline from a coding agent rather than maintaining a bespoke integration for each source.

## Strengths

It competes with Airbyte and Fivetran for the ingestion slot, but the axis is where the logic lives: dlt gives you a Python library you version and test, whereas those are platforms you configure and operate. It overlaps with content/tools/orchestration entries such as Prefect and Airflow, since a dlt pipeline is normally a task inside a workflow rather than a replacement for one. Compared with a hand-written requests-plus-pandas script, dlt trades a bit of magic for schema inference, incremental state and a destination abstraction you would otherwise rebuild.

## Limitations / When NOT to Use

You operate it, so schedules, alerting and lineage are yours to build rather than a product's job. Schema inference is convenient and occasionally wrong, and a source that returns polymorphic payloads will need explicit hints rather than the inferred shape. Support across a wide matrix of sources, destinations and Python versions means some combinations are uneven, and the README explicitly flags Python 3.14 as experimental for several extras. And for genuinely streaming sources the batch-oriented model is the wrong shape.

## Integration Patterns

This is the ELT entry in content/tools/data-ingestion, and it is the ingestion step you would call from the orchestrators in content/tools/orchestration such as Prefect. It lands data into the warehouses and vector stores in content/projects/data-and-retrieval, and its hub extras for data quality and transformation connect it to the pipeline tooling in the same folder. Read it against Airbyte in this catalog's coverage terms if you are choosing platform versus library.

## Resources

- [GitHub — dlt-hub/dlt](https://github.com/dlt-hub/dlt)
- [Docs — dlthub.com/docs](https://dlthub.com/docs)
- [Verified source marketplace](https://dlthub.com/docs/)

## Buzz & Reception

Declares a source once and infers its schema, handling pagination and typing so an API becomes a table in DuckDB or a warehouse without custom extract code.
