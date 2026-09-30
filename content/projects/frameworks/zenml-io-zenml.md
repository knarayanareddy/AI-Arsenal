---
id: zenml-io-zenml
name: "zenml"
version_tracked: null
artifact_type: platform
category: tooling
subcategory: platforms
description: "ML pipeline abstraction that keeps pipeline code portable across orchestrators through a stack of swappable integrations"
github_url: "https://github.com/zenml-io/zenml"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "zenml-io"
tags: [data, orchestration]
maturity: production
cost_model: open-source
github_stars: 5594
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-09-28"
docs_url: "https://docs.zenml.io"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "ML pipeline abstraction layer that ports pipeline code across orchestrators, and increasingly the place where agent steps become first-class pipeline artifacts."
best_for:
  - "You have a pipeline that must run locally today and on a managed orchestrator in six months, and you want that switch to be configuration."
  - "You keep a shared library of steps used by several teams and need a single place to version, cache, and wrap them."
  - "You are moving agent workflows into scheduled production jobs and want the agent runs tracked as pipeline artifacts with lineage."
avoid_if:
  - "You have a single simple pipeline on a single backend, where the abstraction layer and its YAML are more config than orchestration is worth."
  - "You need orchestrator-specific features like dynamic fan-out that the stack does not implement, forcing you to drop into raw backend code anyway."
  - "Your team has no interest in a self-hosted control plane, because the server is where all the operational cost and most of the complexity lives."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (5594), Apache-2.0 license, last commit 2026-09-28, primary language Python, and all 20 topics were read from the GitHub API. Stack components, materializers, step caching, and agent-step integration come from the official docs; no pipeline was run and no stack was deployed here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/zenml-io/zenml", "date": "2026-09-28", "description": "5,594 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

ZenML is an open-source framework that separates the definition of a machine-learning workflow from the infrastructure that runs it. A pipeline is a function decorated with step invocations, and each step is a function whose dependencies are declared as typed parameters and whose return values are tracked as artifacts. Instead of calling an orchestrator directly, ZenML passes the declared steps through a stack: a stack is a set of orchestrator, artifact store, metadata store, and step-operator components, and swapping the stack swaps the backend. Local execution runs steps in-process; remote stacks dispatch them to an orchestrator, a Kubernetes cluster, or a container runtime while the pipeline code stays identical.

## Why it's in the Arsenal

The recurring decision is which orchestrator commits your pipeline code to. Code written directly against an Airflow DAG or a Kubernetes operator set is portable only by rewriting, so an experiment that works locally is a separate artifact from the scheduled job that runs it, and the two drift until the production pipeline no longer reproduces the research result. ZenML makes the pipeline definition the stable artifact and the stack the variable, so the same function runs in a notebook, in CI, and in a production scheduler. A second benefit is composition: steps become reusable units with typed inputs and cached outputs, so an agent invocation is just a step whose output is an artifact rather than a special case.

## Architecture

Every step runs in an isolated environment, and ZenML tracks for each step the code version, the resolved parameters, the materialized input artifacts, and the output artifacts it produced, which is what enables content-addressed caching and skipping. Steps communicate through a materializer, a per-type serializer such as a pydantic materializer, a pickle fallback, or a cloudpickle-based variant that handles closures and classes the standard serializer cannot. The stack resolves a runtime, typically a Docker or conda environment, so a step declares its requirements and they are built once and cached. The ZenML server stores the metadata, artifacts, and pipeline runs, and clients authenticate to it, while the local client can run against a local daemon when the server is not yet stood up.

## Ecosystem Position

ZenML competes with Flyte, Metaflow, and Kubeflow Pipelines as a pipeline abstraction, and it is a lighter alternative to all three: it does not schedule anything itself, it delegates to the orchestrator you already run, so the operational burden is the backend's rather than an extra control plane's. It overlaps with Metaflow most directly, since both target data-science-authored pipelines with a metadata-driven UI, though Metaflow bundles its own execution engine and ZenML leans on integrations. It is a rather than an alternative to Airflow, since Airflow remains the right tool for a business data DAG with S3 dependencies while ZenML targets model training and agent runs. It complements the serving entries in the inference phase by producing the run records and artifacts that a deployment promotion step consumes.

## Getting Started

Install the client and the local server, then run a pipeline with the local stack:

```bash
pip install "zenml[server]"
zenml up
```

```bash
zenml service connect --url http://127.0.0.1:8237
zenml pipeline list
```

```python
from zenml import step, pipeline

@step
def load_data() -> str:
    return open("corpus.txt").read()

@step
def train(data: str) -> float:
    return 0.87

@pipeline
def my_pipeline():
    train(load_data())

my_pipeline().run()
```

```bash
# switch the same pipeline onto a real orchestrator
zenml stack set default kubernetes
zenml up
```

## Key Use Cases

1. A pipeline that must run in a notebook, in CI, and on a production scheduler without three codebases.
2. Shared step libraries reused by multiple teams, where typed parameters and versioned code artifacts give one place to change the logic.
3. Scheduling agent workloads as production jobs, with the agent run recorded as a pipeline artifact alongside its model, prompts, and metrics.

## Strengths

- The stack abstraction genuinely decouples pipeline code from the orchestrator, so backend migration is configuration rather than a rewrite.
- Content-addressed caching and step-level code versioning let you skip expensive steps when inputs are unchanged.
- Typed steps and pluggable materializers give reusable units rather than an opaque graph of stringly-typed task calls.
- Agent steps integrate as ordinary pipeline steps, so the same run history covers model training and agent execution.

## Limitations

ZenML ships a server, and that server is the piece you must run, back up, upgrade, and secure, so an abstraction that avoids vendor lock-in introduces an in-house component. Orchestrator features outside the integration surface require escaping to raw backend code, at which point the abstraction stops helping. Step isolation means every step pays container start cost, which is a poor fit for millisecond-scale functions. Configuration is verbose, and a real deployment often carries a large stack definition plus a customized orchestrator template. The ecosystem of ready-made steps is small, and the project is pre-1.0 enough that interfaces shift between minor versions.

## Relation to the Arsenal

This is a framework-phase entry that connects the pipeline-definition concern to whatever runs it, so it sits between the training-and-alignment phase, where fine-tuning jobs originate, and the backend schedulers outside the catalog. Its metadata and artifact records are the natural companion to the Aim tracker, which is the lighter option when you only need runs and metrics. It also relates to the agent-systems phase, where agent workflows need the same scheduling and lineage treatment as training jobs.

## Resources

- [ZenML GitHub repository](https://github.com/zenml-io/zenml)
- [ZenML documentation](https://docs.zenml.io)
- [ZenML stack integrations overview](https://docs.zenml.io/stack-components/integrations)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (5,594 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
