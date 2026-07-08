---
id: great-expectations
name: Great Expectations (GX Core)
type: tool
job: [orchestration]
description: The standard open data-quality framework — declarative Expectations validate pipeline data, guarding the datasets your models train and retrieve on
url: "https://greatexpectations.io"
cost_model: open-source
pricing_detail: GX Core is open source (Apache-2.0); GX Cloud is a paid hosted platform
tags: [data, evaluation, self-hosted]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: GX Core fully open source; GX Cloud has separate pricing
source_url: "https://github.com/great-expectations/great_expectations"
docs_url: "https://docs.greatexpectations.io/docs/home"
github_url: "https://github.com/great-expectations/great_expectations"
self_hostable: true
open_source: true
alternatives: [dvc]
integrates_with: [airflow, dagster, prefect]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [production]
best_when:
  - You need contract-style guarantees on data feeding AI systems — Expectations ("column X non-null", "values in set", "row count within N% of last run") run as validation gates inside Airflow/Dagster/Prefect pipelines and fail loudly on drift
  - You want data-quality checks that document themselves — validation results render into Data Docs, giving stakeholders a browsable record of what was checked and when
avoid_when:
  - You need lightweight schema checks inside application code — a JSON-schema or pydantic validation is simpler than standing up a GX project
  - Your data-quality problem is semantic (label noise, annotation disagreement) — that's data-labeling/curation territory (Argilla, Cleanlab-class tools), not tabular assertions
version_tracked: null
verdict: recommended
verdict_rationale: The most widely adopted open data-validation framework, and the piece most AI pipelines are missing — silent upstream data drift is a top cause of model and RAG quality regressions
status: active
---

## Overview

Great Expectations (GX Core) is the standard open-source framework for data quality: you declare Expectations — assertions about your data such as null rates, value sets, distributions, and volume bounds — and GX validates batches against them wherever the data lives (pandas, Spark, SQL warehouses), producing machine-readable results and human-readable Data Docs. In AI systems it's the gate between raw sources and the training sets, embedding corpora, and feature tables downstream.

## Why It's in the Arsenal

Model and RAG regressions are frequently data regressions in disguise — an upstream schema change, a silently emptied column, a doubled row count — and none of the catalog's model-side eval tools can see them. GX fills the data-ingestion slot with the same philosophy the Arsenal applies to prompts and models: declarative, versioned assertions enforced in CI/pipelines instead of tribal knowledge.

## Key Features

- Large library of built-in Expectations plus custom ones; suites are versionable YAML/JSON artifacts
- Executes against pandas, Spark, and SQL backends (Snowflake, BigQuery, Postgres, Databricks) without moving data
- Checkpoints bundle suites + data for scheduled/pipeline runs; native Airflow/Dagster/Prefect operators
- Data Docs: auto-generated HTML documentation of expectations and validation history

## Architecture / How It Works

An Expectation Suite is a declarative contract; a Checkpoint binds suites to Batch Definitions (how to slice the data source) and runs validation through the backend's own engine — SQL expectations compile to SQL, Spark to Spark — so checks scale with the warehouse rather than pulling data out. Results feed actions (fail the pipeline, notify, update docs).

## Getting Started

```bash
pip install great_expectations
```

```python
import great_expectations as gx
context = gx.get_context()
batch = context.data_sources.pandas_default.read_csv("corpus_manifest.csv")
batch.validate(gx.expectations.ExpectColumnValuesToNotBeNull(column="doc_text"))
```

## Use Cases

1. **Scenario**: gating a nightly embedding-refresh pipeline — validate document counts, null rates, and dedup ratios before re-indexing the vector store
2. **Scenario**: contracting fine-tuning datasets — enforce schema, length distributions, and label-set membership before a training run spends GPU budget
3. **Scenario where this is NOT the right fit**: validating a single API payload in application code — use pydantic; GX is pipeline-scale infrastructure

## Strengths

- Declarative, versioned data contracts catch the silent upstream changes that model-side evals can't
- Pushes validation down to the data engine, so it works at warehouse scale

## Limitations / When NOT to Use

- Real setup and maintenance cost (contexts, suites, checkpoints) — overkill below pipeline scale
- Asserts on structure and statistics, not semantics; label quality needs different tooling

## Integration Patterns

Link this tool from reference stacks, decision trees, and project entries using its canonical ID `great-expectations` rather than duplicating details.

## Resources

- [Official Site](https://greatexpectations.io)
- [GitHub](https://github.com/great-expectations/great_expectations)
- [Docs](https://docs.greatexpectations.io/docs/home)

## Buzz & Reception

11.6k GitHub stars (verified via API 2026-07-08); Apache-2.0; actively maintained (GX, now under Fivetran). The default answer to "how do we test our data" across the data-engineering ecosystem.

---
*Last reviewed: 2026-07-08 by @maintainer*
