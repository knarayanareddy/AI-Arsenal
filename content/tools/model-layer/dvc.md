---
id: dvc
name: DVC
type: tool
job: [model-registry]
description: Git-native version control for datasets and models — pointer files in Git, content in a cache, and a pipeline graph that reproduces only what changed
url: "https://github.com/treeverse/dvc"
cost_model: open-source
pricing_detail: Apache-2.0 and free; storage costs are whatever your remote (S3, GCS, Azure, SSH) charges
tags: [data, monitoring]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Unlimited; you pay your object store, and DVC Studio's hosted UI has its own free tier
self_hostable: true
open_source: true
source_url: "https://github.com/treeverse/dvc"
docs_url: "https://dvc.org/doc"
github_url: "https://github.com/treeverse/dvc"
alternatives: [hugging-face-hub, mlflow, weights-biases]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [production, research]
best_when:
  - Datasets or checkpoints are too large for Git but the branch, review and history workflow around them should stay the same
  - A pipeline has expensive stages (feature extraction, training, evaluation) and re-running everything to change one parameter is wasteful
  - You need reproducibility that a colleague can check out — a commit pins the data hashes, the pipeline definition and the parameters together
avoid_when:
  - You want a registry with stage promotion, approvals and a serving integration — DVC tracks artifacts, it does not manage model lifecycle
  - The team refuses to work from a terminal — the value is in the Git-adjacent CLI flow, and a UI-first product will fit better
  - Your data lives in a warehouse and never lands as files — DVC versions files, and a table-level tool (or the warehouse's own snapshots) is the right layer
verdict: recommended
verdict_rationale: The best answer to "version the data without putting it in Git"; it stops short of a model registry by design, which is the main thing to plan around
status: active
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-25: repo is treeverse/dvc (15,942 stars, 226 open issues, Apache-2.0, last push 2026-10-19). Behaviour claims — .dvc pointer files, dvc.yaml/dvc.lock pipeline graph, dvc repro, exp run, metrics/plots, import/update registry pattern — are from the DVC documentation."
---

> **TL;DR:** Git for data, minus the pain: small pointer files in the repository, content in a cache and an object store, and a pipeline graph that tells you what to re-run.

## Overview

DVC solves one problem well and builds a workflow around it. Git cannot hold multi-gigabyte datasets or model weights, but the history, branching and review around those artifacts is exactly what Git is good at. DVC splits the two: `dvc add data/raw` writes a small `data.dvc` file containing content hashes, adds the directory to `.gitignore`, and stores the actual bytes in a local cache that `dvc push` copies to a remote — S3, GCS, Azure Blob, SSH, HDFS or a filesystem path.

Around that core sit three more capabilities. Pipelines describe stages in `dvc.yaml` with dependencies, outputs and commands; `dvc.lock` records the hashes each run produced, so `dvc repro` re-executes only the stages whose inputs or parameters changed. Experiments (`dvc exp run`) capture a run's parameters, metrics and artifacts on a throwaway branch without polluting history. And metrics/plots commands diff numbers across commits or experiments, which is what makes comparisons reviewable rather than remembered.

`dvc import` and `dvc update` add a registry pattern: consume a dataset or model from another DVC repository at a pinned version and pull updates deliberately.

## Why It's in the Arsenal

The catalog is full of tools that train and serve. Almost none address the question that determines whether any of it is reproducible: which exact data, in which exact preprocessing, produced which checkpoint.

DVC's answer is structural rather than procedural. Because the pointer file lives in Git, a commit determines the dataset hash; because `dvc.lock` records stage hashes, a commit also determines the pipeline that ran. Checking out a commit and running `dvc repro` reproduces the artifact or fails because the remote no longer has the content — and a failure is more useful than a silent mismatch. Most teams that "version their data" with a folder named `data-v2-final` are one rename away from an unreproducible result.

The pipeline half deserves equal credit. `dvc repro` on a graph with expensive stages turns "change a parameter and rerun the world" into "rerun the two stages downstream of the change", which is a real compute saving on any project with feature extraction or evaluation in the loop.

The boundary is worth stating as clearly as the strength: DVC is not a model registry. There is no stage promotion, no approval workflow, no serving endpoint. It versions artifacts; MLflow and Hub-style registries manage lifecycle.

## Key Features

- **Pointer files instead of blobs**: `.dvc` files carry md5 hashes and metadata, so the repository stays small and diffs stay readable.
- **Remote storage abstraction**: `dvc remote add` against S3, GCS, Azure, SSH, HDFS, HTTP or a local path, with `push`/`pull`/`status` and per-remote configuration.
- **Pipeline definition in `dvc.yaml`**: stages with `cmd`, `deps`, `outs` and `params`, plus `dvc.lock` pinning what each run produced.
- **Incremental reproduction**: `dvc repro` walks the DAG and re-runs only stale stages; `dvc dag` shows the graph and where the change propagates.
- **Experiments**: `dvc exp run` executes a variant on a temporary branch, `dvc exp show` compares metrics and parameters in a table, `dvc exp push` shares the result.
- **Metrics and plots**: `dvc metrics diff` and `dvc plots diff` compare numbers and charts across commits and experiments as reviewable text or HTML.
- **Data registry pattern**: `dvc import` a dataset or model from another repository, `dvc update` to move the pin deliberately.
- **Granular cache operations**: `dvc gc` to prune, shared cache across clones via `dvc cache dir`, and `--relink` to deduplicate working trees.
- **Python API**: `dvc.api.open`, `dvc.api.params_show` and `dvc.api.get_url` let notebooks read versioned data without checking it out.
- **CI integration**: `dvc pull` and `dvc repro` in a workflow, with `--force`-free comparisons failing when the lock file is stale.

## Architecture / How It Works

Content addressing is the foundation. Every file and directory added becomes one or more hashed objects in `.dvc/cache`, stored under a two-character fan-out directory. The `.dvc` file records the hash and size; Git tracks the `.dvc` file. `dvc push` transfers only cache objects the remote lacks, and `dvc pull` fetches only those the working tree is missing, so the network cost tracks the delta rather than the corpus.

Pipelines are a hash graph. Each stage hashes its command, dependencies, parameters and dependencies' hashes; `dvc.lock` stores the result. When anything upstream changes, the hash changes and `dvc repro` re-runs that stage and its descendants. That is why a parameter change in a training config triggers retraining but not re-extraction, and why the lock file is the object to review in a pull request.

Experiments use Git refs rather than commits: `dvc exp run` writes the workspace state to a ref, executes, and stores metrics and parameters in a separate cache. `dvc exp show` reads those refs to build a comparison table, which is why experiments do not appear in your branch history and why `dvc exp push` is needed to share them.

The failure modes follow from the design. A cache and a remote can disagree; a `.dvc` file can point at content the remote no longer holds; `dvc.lock` merges are painful when two people change the same stage; and a corpus of millions of tiny files makes hashing and pushes slow, which is why batching into archives is a common adaptation.

## Getting Started

```bash
pip install dvc dvc-s3          # add the extra for your remote
git init myproject && cd myproject && git init && dvc init
```

```bash
dvc add data/raw                     # writes data/raw.dvc, ignores the directory
dvc remote add -d storage s3://my-bucket/dvc-store
dvc push                             # upload cache objects to the remote
git add data/raw.dvc .gitignore .dvc/config && git commit -m "track raw data"
```

```yaml
# dvc.yaml
stages:
  prepare:
    cmd: python src/prepare.py --in data/raw --out data/prepared
    deps: [src/prepare.py, data/raw]
    outs: [data/prepared]
  train:
    cmd: python src/train.py --data data/prepared --out models/model.pt
    deps: [src/train.py, data/prepared, params.yaml]
    params: [train.lr, train.epochs]
    outs: [models/model.pt]
    metrics: [metrics.json]
```

```bash
dvc repro            # runs only what is stale
dvc exp run -S train.lr=3e-4 && dvc exp show --include-params train
```

Commit `dvc.lock` after every reproduction — it is the record that makes a later checkout reproducible, and reviewing it is how a data or config change gets caught in code review.

## Use Cases

1. **Reproducible training runs**: a commit pins data hashes, parameters and the pipeline; a colleague checks out, runs `dvc pull && dvc repro`, and gets the same artifact or a loud failure.
2. **Dataset evolution without repository bloat**: a new snapshot of a growing corpus is a new pointer file and a cache delta, not a second copy in Git LFS.
3. **Expensive preprocessing**: cache the feature-extraction stage and iterate only on the training stage, which is often the difference between a ten-minute and a two-hour loop.
4. **Parameter sweeps with reviewable results**: `dvc exp run` over a grid, then `dvc exp show` to compare metrics and parameters in one table instead of a spreadsheet.
5. **Data registry across teams**: one repository imports another's curated dataset at a pinned hash and updates deliberately, giving lineage without a platform.
6. **Model artifact handoff**: `dvc get` fetches a specific model version into a build step or a CI job without the consumer cloning the whole repository.
7. **Auditing an old result**: check out the commit, confirm the data hashes, reproduce the metric — the answer to "where did this number come from".

## Strengths

- The pointer-file design is the right split: Git keeps the history and review, the object store keeps the bytes, and neither is compromised.
- `dvc repro` with hash-based staleness is genuinely useful engineering, not just bookkeeping — it saves compute on every iteration.
- Remote support is broad enough that the tool outlives your current cloud, and the cache can be shared across clones or CI runners.
- Experiments as refs compare parameter sets without polluting history, and `exp show` is a better comparison surface than a notebook of printed tables.
- The Python API means notebooks and scripts read versioned data without a checkout, which keeps exploration inside the discipline.
- Apache-2.0 with a long-lived maintainer and a stable data format — the `.dvc` files you commit today will still be readable.

## Limitations / When NOT to Use

- **Not a model registry.** No stages, no approvals, no serving integration, no lineage UI beyond the pipeline graph; MLflow or a Hub-style registry covers that half.
- **Operational sharp edges.** Cache/remote mismatch, lock-file merge conflicts and stale pointers are routine and require understanding the model, not just the commands.
- **Many small files are slow.** Hashing, pushing and pulling a corpus of millions of tiny files is painful; archiving into bundles is the usual workaround, and it is a design decision made late by most teams.
- **The CLI is the product.** There is a hosted Studio UI, but the workflow is terminal-and-Git, and a team that lives in a browser will find it foreign.
- **No storage of its own.** You still choose and operate an object store, with its lifecycle rules, versioning, access control and egress costs.
- **Large file counts inflate the cache.** Local cache growth is easy to miss until a CI runner runs out of disk; `dvc gc` and shared caches are the answer and need to be planned.
- **Does not solve data quality.** A perfectly versioned dataset can be perfectly wrong, and nothing here validates content.

## Integration Patterns

- *Wiring*: one remote per environment, a shared cache for CI, and `dvc pull` as an explicit pipeline step rather than an implicit one — a job that silently runs without data is worse than one that fails.
- *Review discipline*: treat `dvc.lock` and `params.yaml` as code under review; a pull request that changes a data pointer without a lock change, or the reverse, is a mistake worth catching.
- *Storage layout*: archive many-small-file corpora into shards before `dvc add`, keep raw immutable inputs in a versioned bucket, and let the cache be disposable.
- *Alternative split*: `hugging-face-hub` when the artifacts are models or datasets with an ecosystem attached, `mlflow` when you need experiment tracking plus registry stages, `weights-biases` when the team wants hosted dashboards and sweeps.
- *Before production*: decide the remote, the cache retention policy and who may push to the default remote; those three decisions prevent most of the confusion teams hit at scale.
- *CI*: fail the build when `dvc status` reports staleness, not when a test fails — staleness is the cheap signal that a lock file was forgotten.

## Resources

- [Documentation](https://dvc.org/doc)
- [GitHub](https://github.com/treeverse/dvc)
- [Pipeline reference](https://dvc.org/doc/user-guide/pipelines/defining-pipelines)
- [Experiments](https://dvc.org/doc/user-guide/experiment-management)
- [Data registry pattern](https://dvc.org/doc/use-cases/data-registries)

## Buzz & Reception

- Long-standing default in MLOps toolchains, usually adopted for exactly one capability — data versioning — and kept because the pointer files make the rest of Git work as before.
- The recurring criticism is that it stops short of registry semantics, which is fair and is a scope decision rather than a defect.

---
*Last reviewed: 2026-10-25 by @maintainer*
