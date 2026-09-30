---
id: polyaxon-polyaxon
name: "polyaxon"
version_tracked: null
artifact_type: platform
category: tooling
subcategory: platforms
description: "Control plane that tracks runs, pipelines, and agents with full lineage from experiment through to deployment and restart"
github_url: "https://github.com/polyaxon/polyaxon"
license: "Apache-2.0"
primary_language: Other
org_or_maintainer: "polyaxon"
tags: [orchestration]
maturity: production
cost_model: open-source
github_stars: 3737
github_stars_last_30d: 0
trending_score: 28
last_commit: "2026-09-24"
docs_url: "https://polyaxon.com"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "AI control plane for orchestrating runs, promoting artifacts between environments, and tracking lineage across experiment and deployment stages."
best_for:
  - "You want one place that tracks experiments, pipelines, notebook runs, and agent sessions with links between them rather than separate tools."
  - "You need lineage from a training run to a registered model to a deployment, and must show which input produced which artifact."
  - "You run hyperparameter sweeps and distributed reinforcement learning on Kubernetes and want the sweep controller and dashboards in the same system."
avoid_if:
  - "You only need run-and-metric tracking, since a lighter tracker covers that with far less to operate."
  - "You cannot run and maintain a server plus Kubernetes integration, because the control plane is a service you own."
  - "Your team has standardized on Airflow for scheduling, since Polyaxon will want to own the orchestration layer instead of integrating with it."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (3737), Apache-2.0 license, last commit 2026-09-24, and the 20 topics were read from the GitHub API; upstream reports primary language as Other. The Kubernetes operator model, artifact lineage graph, matrix sweeps, and promotion flow come from the official docs and site; no server was installed and no run was tracked here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/polyaxon/polyaxon", "date": "2026-09-28", "description": "3,737 stars and last commit 2026-09-24 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Polyaxon positions itself as an AI control plane spanning experimentation, pipelines, agents, and deployment. The Python client wraps training code so a run reports its logs, metrics, artifacts, and metadata back to the server, and the server stores those records with lineage edges, so an artifact knows which run and which code version produced it. Pipelines and workflows are defined in Python or YAML and executed on Kubernetes through a dedicated operator, which means the same definition can express a DAG, an iteration, a matrix over hyperparameters, and a distributed reinforcement learning run. There is a UI for comparing runs, browsing artifacts, and promoting a version between environments, plus a CLI and REST and GraphQL APIs for automation. The project is a Kubernetes-centric platform rather than a library you embed.

## Why it's in the Arsenal

The decision it resolves is the gap between experimenting and operating. Most teams have a tracker for training and a separate deployment story, so the question of which model version is in production, what trained it, and what data it saw requires a human with log access. A control plane that records the whole chain makes that a query. The second motivation is consolidation: notebook experiments, scheduled pipelines, sweeps, and agent sessions otherwise scatter across four systems with four sets of credentials and four retention policies, and one control plane puts them under one audit model. The third is governance, since environment promotion with a recorded history is what regulated teams need to evidence a change.

## Architecture

The client instruments a run by wrapping the entry point, so the process reports status transitions, logs, metrics, and artifacts to the server over its REST API while the actual training runs in the user's environment. On the platform side, the server holds a relational metadata store plus object storage for artifacts, with the lineage graph linking runs, artifacts, environments, and deployments. Execution for pipelines and sweeps goes through a Kubernetes operator that materializes each run as a job, a pod, or a distributed set, with the operator reconciling desired state against the cluster, so the platform depends on a working cluster and a storage backend. Model registry and environment promotion are built on the same artifact records, which is why a deployment can point at an immutable run rather than a path. Access control and authentication are provided by the server, with optional SSO integrations.

## Ecosystem Position

Polyaxon competes with MLflow, Kubeflow Pipelines, and ClearML as a tracking-plus-orchestration platform, and it is a heavier alternative to a light tracker: you get lineage, a registry, sweeps, and Kubernetes-native execution in exchange for a server, an operator, and a storage backend to run. Against MLflow the difference is direction of travel, since MLflow centers on tracking and registry with orchestration delegated, while Polyaxon owns execution as well. It overlaps with the ZenML entry, which is the lighter abstraction that also decouples pipeline code from the orchestrator, and the two are genuine alternatives for the same team problem with opposite bets on who owns scheduling. Compared to Airflow, it is not a business data scheduler but an experiment and training control plane, so teams commonly run both. It complements the Aim entry, which covers the minimal case when a full control plane is unnecessary.

## Getting Started

Install the client, point it at a server, and instrument a run:

```bash
pip install polyaxon
polyaxon login --server https://your-polyaxon.host --token $POLYAXON_TOKEN
```

```python
import polyaxon
from polyaxon.polyflow import step, pipeline

@step
def train():
    polyaxon.log_metric_param(name="acc", value=0.91)
    polyaxon.log_model_ref(name="model", path="runs/3/best.pt")

@pipeline
def experiment():
    train()

experiment().run()
```

```bash
# hyperparameter sweep from the CLI, executed as a matrix on the cluster
polyaxon run --project my-project --name sweep \
    --file train.yml \
    --matrix "lr=[0.0001,0.0003,0.001];batch=[16,32]" \
    --max-workers 12

# promote a run between environments with its lineage attached
polyaxon run promote --run-id 3 --env production
```

Self-hosting requires the server, a Kubernetes cluster, and object storage, installed from the published Helm chart.

## Key Use Cases

1. Tracing a deployed model back through promotion history to the exact training run, code version, and hyperparameters that produced it.
2. Running large hyperparameter sweeps and distributed reinforcement learning jobs as cluster-managed workloads with dashboards.
3. Consolidating notebook experiments, scheduled pipelines, and agent sessions under one access-control and retention model for a regulated team.

## Strengths

- End-to-end lineage linking runs, artifacts, environments, and deployments, so the promotion path is queryable rather than reconstructed.
- Kubernetes-native execution through an operator, so sweeps and distributed jobs get real scheduling, preemption, and resource limits.
- Covers experiments, pipelines, sweeps, notebooks, and agent sessions in one system instead of forcing four separate tools.
- A REST and GraphQL API plus CLI, so automation and custom dashboards do not require the UI.

## Limitations

The operational footprint is the main cost: a server, a Kubernetes operator, a metadata store, and object storage all need upgrading and backups, and this is more to own than a lightweight tracker. Being Kubernetes-centric, it is a poor fit for teams on managed notebooks, a laptop, or a single VM, and the operator is the least pleasant part of the stack when jobs get stuck. The Python client instrumentation adds coupling to your training code, and a heavy import graph has broken across versions more than once. Feature breadth is uneven, with some areas more actively developed than others, and the open-source edition leaves the more advanced governance features to commercial offerings, which is a licensing cliff for exactly the regulated teams who want the lineage most.

## Relation to the Arsenal

This is a framework-phase entry in the tooling category, and it is the heavyweight end of the tracking-and-orchestration choice, to be read against the Aim entry as the minimal option and the ZenML entry as the portable-abstraction option. It executes the fine-tuning and agent workloads produced by the training-and-alignment and agent-systems phases, and its model registry feeds the serving deployments in the inference-engine phase. The evaluation entries in the benchmarks-and-evals phase supply the numbers that its tracking surfaces are meant to display.

## Resources

- [Polyaxon GitHub repository](https://github.com/polyaxon/polyaxon)
- [Polyaxon documentation](https://docs.polyaxon.com)
- [Polyaxon self-hosting guide](https://docs.polyaxon.com/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (3,737 stars, last commit 2026-09-24, license Apache-2.0, verified via GitHub API on 2026-09-28)*
