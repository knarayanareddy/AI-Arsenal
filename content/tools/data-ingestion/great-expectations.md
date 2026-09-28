---
id: great-expectations
name: Great Expectations (GX Core)
type: tool
job: [orchestration]
description: "Data quality library where Expectations are unit tests for datasets, runnable in a pipeline or in CI"
url: "https://greatexpectations.io"
cost_model: open-source
pricing_detail: GX Core is open source (Apache-2.0); GX Cloud is a paid hosted platform
tags: [data, evaluation, local, benchmark]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: GX Core fully open source; GX Cloud has separate pricing
source_url: "https://github.com/great-expectations/great_expectations"
docs_url: "https://docs.greatexpectations.io/docs/core/introduction/gx_overview"
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
best_when: ["You are a data engineer whose pipelines fail downstream because a schema changed, and you want the failure to happen at ingest with a message naming the expectation that broke.", "You need data quality rules to be reviewable like code, because an Expectation Suite is a checked-in artefact that a reviewer can read and diff rather than a dashboard nobody trusts.", "You want validation to run in the same place as your tests, since GX Core installs into a virtual environment and the context object is created in-process alongside the rest of your suite."]
avoid_when: ["You need real-time row-by-row enforcement inside a write path, because GX Core is a validation framework that runs against batches rather than a constraint engine on a live table.", "You are on Python 3.14 or later and need a supported interpreter, because the documented range is 3.10 through 3.13 with 3.14 available only behind an experimental environment flag.", "You want a data-profiling tool, because the topics list profiling alongside quality and the two are different jobs, and an expectation suite is not a substitute for knowing the distribution of a column."]
version_tracked: null
verdict: recommended
verdict_rationale: The most widely adopted open data-validation framework, and the piece most AI pipelines are missing — silent upstream data drift is a top cause of model and RAG quality regressions
status: active
enrichment_status: draft
---

## Overview

GX Core is a data quality library whose central abstraction is an Expectation: an expressive, extensible unit test for data. Teams write Expectation Suites describing what a dataset should look like, run them against a data context, and get pass or fail results per expectation along with automatically generated documentation of each run. The framing is explicitly collaborative - the suite is a common language a data engineer, an analyst and a stakeholder can all read - and the documentation output is meant to preserve institutional knowledge about what a table is supposed to contain. GX Core supports Python 3.10 through 3.13 officially, with experimental 3.14 support gated behind an environment variable, and the README points to a compatibility reference for the list of supported data sources and integrations.

## Why It's in the Arsenal

The recurring decision is whether a data problem is a code problem. Most teams treat broken data as an incident, investigate by hand, and patch the downstream consumer - which fixes this week's failure and leaves the next one in place. Expectations invert that: they are assertions that fail the build, and because the suite is code, the fix is a reviewable change rather than a tribal-knowledge patch. The documentation output matters for a less obvious reason - the person who leaves needs their knowledge of what a column means to survive them, and a suite is the only artefact that reliably carries that.

## Key Features

- Expectations are a shared vocabulary rather than a config format, so a data quality rule is reviewable by the people who own the data.
- Validation results carry generated documentation, which preserves the why behind a column as institutional knowledge.
- In-process context model means it runs in a notebook, a test suite or a pipeline step with no server to deploy.
- Apache-2.0 with a maintained compatibility reference enumerating supported data sources and integrations.

## Architecture / How It Works

A Data Context is the root object, created with gx.get_context(), and it owns the connection to your data sources plus the store for validation results. Validation runs are described by an Expectation Suite, which is a serialisable set of expectations, and the result carries per-expectation outcomes plus rendered documentation. The design is layered: an expectation is reusable, a suite groups them, and a validation run binds a suite to a batch and produces a result object. Integrations are separated from the core, which is what lets the compatibility reference enumerate supported sources and keeps the expectation vocabulary independent of any one system. The in-process context model is what makes it usable from a notebook, a test suite or a pipeline step without a server.

## Getting Started

Install into a virtual environment, then create a context in-process:

```bash
pip install great_expectations
```

```python
import great_expectations as gx

context = gx.get_context()
```

GX recommends an empty base directory inside the virtual environment. For anything beyond Python 3.13, set the experimental environment variable at install time.

## Use Cases

1. Pipeline gate: run a suite at the end of an ingest job so a schema drift fails there rather than three joins downstream.
2. Contract as code: keep an Expectation Suite next to the pipeline that produces the table, so the contract is reviewed with the code that could break it.
3. Change documentation: publish the generated validation documentation so downstream teams can see what the data is supposed to contain without reading the pipeline.

## Strengths

GX competes with the newer data-contract and pipeline-test tools such as Great Expectations' own ecosystem neighbours, and with plain assertion libraries plus a schema registry, which is the honest comparison: a registry checks shape, GX checks meaning. It overlaps with the data-profiling category such as the tools in content/tools/data-ingestion, which tell you what a column looks like rather than what it should look like, and the two compose - profile first, then assert. Compared with dbt tests, which are SQL assertions in a transform, GX is language-agnostic about the data source and produces documentation rather than a red build. It complements rather than replaces the orchestration entry Temporal in content/tools/orchestration, which is what you would use to make a validation run retried and durable.

## Limitations / When NOT to Use

This is the current Core, not the earlier Cloud-era product, and the README's framing - a super-simple package for data teams - signals a deliberately narrower scope than the name suggests. It is batch validation, so it cannot stop a bad row entering a live table; that is a database constraint problem. The supported Python range is explicitly 3.10 to 3.13, with 3.14 behind an experimental flag, which narrows where you can run it in a modern environment. Value depends entirely on suite quality, and a suite nobody maintains becomes decoration - there is no mechanism that forces expectations to be revisited when the upstream source legitimately changes.

## Integration Patterns

This is a data-ingestion tool and it is the quality gate in the arsenal, sitting between the ingestion scripts that write data and everything downstream. Pair it with the data-and-retrieval projects such as duckdb and polars, which are where you will actually query the table once the suite passes. The Temporal entry in content/tools/orchestration is the natural host if validation needs to be retried and durable rather than a step in a notebook. For the AI-facing side, retrieval quality depends on the same assumptions these suites encode, so read it alongside the RAG entries in content/projects/data-and-retrieval.

## Resources

- [GitHub - fivetran/great_expectations](https://github.com/fivetran/great_expectations)
- [Introduction to GX Core documentation](https://docs.greatexpectations.io/docs/core/introduction/gx_overview)
- [Compatibility reference for data sources and integrations](https://docs.greatexpectations.io/docs/core/connect_to_data/dataframes/introduction)

## Buzz & Reception

Turns the informal sentence a data team already says about a column into a versioned, runnable assertion with a pass or fail, which is what stops pipeline debt from accumulating silently
