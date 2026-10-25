---
id: google-vertex-ai
name: Google Vertex AI
type: tool
job: [deployment]
description: Google Cloud's managed AI platform — Gemini and Model Garden endpoints, custom training, Model Registry, pipelines, Vector Search and batch prediction
url: "https://cloud.google.com/vertex-ai"
cost_model: usage-based
pricing_detail: Per-hour accelerator and endpoint uptime, per-request prediction charges, plus training, pipeline and storage costs on the same GCP bill
tags: [cloud, llm, evaluation]
maturity: production
stack: [polyglot]
free_tier: true
free_tier_limits: GCP trial credits cover experiments; there is no permanent free tier for GPU endpoints, which bill while deployed whether or not they serve traffic
self_hostable: false
open_source: false
source_url: null
docs_url: "https://cloud.google.com/vertex-ai/docs"
github_url: null
alternatives: [aws-bedrock, azure-ai-studio, hf-inference-endpoints, modal, replicate]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
phase: serving-and-deployment
audience: [production]
best_when:
  - You are already on Google Cloud and want the model API, the training job and the data to share identity, networking and billing rather than crossing a boundary per step
  - The serving requirement includes governance that a hosted inference API cannot give — VPC-Service-Controls, CMEK keys, audit logs and regional endpoints
  - "You need the managed pieces around a model rather than the model alone: Vector Search for retrieval, Pipelines for orchestration, Model Registry for versions, batch prediction for offline scoring"
avoid_when:
  - You are prototyping a single endpoint — a container on Cloud Run or a provider API is cheaper in both money and attention than a Vertex deployment
  - Your workload is latency-sensitive token generation and you have no GCP footprint — the same model is often available from a provider with no platform to learn
  - You need multi-cloud neutrality by policy — every capability here is expressed in GCP primitives, and portability is a rewrite
verdict: solid-choice
verdict_rationale: The right platform when the rest of the estate is GCP and governance matters; expensive and slow to adopt when it is not
status: active
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-25: SDK repo googleapis/python-aiplatform at 910 stars, push 2026-10-23. Surfaces taken from Google Cloud docs; the billing trap that matters is an endpoint charging while its minimum replica sits idle."
---

> **TL;DR:** Google's managed AI platform — excellent if your estate is already GCP and your requirements include governance; a large amount of platform to adopt if all you wanted was an endpoint.

## Overview

Vertex AI is where Google Cloud puts managed model access and managed model operations in one place. On the access side there is Gemini through the Vertex API and Model Garden, which lists first-party and third-party models with deployable or API-served variants. On the operations side there is custom training on managed containers and accelerators, a Model Registry, Endpoints for online prediction, batch prediction, Pipelines for orchestration, Experiments for tracking, Vector Search for retrieval and Feature Store for serving features.

The unifying property is that all of it runs under a GCP project: the same IAM identity, the same VPC and Private Service Connect paths, the same audit logs, the same billing line, the same quota system. That integration — not any single capability — is the product.

The client surface is broad: the `google-cloud-aiplatform` Python SDK, gcloud, REST, and the OpenAI-compatible endpoint that Vertex exposes for Gemini, which lets existing OpenAI-shaped application code point at Google with a base-URL change.

## Why It's in the Arsenal

The catalog's other serving entries answer "how do I run this model". Vertex answers a different question: "how does a model get into a regulated enterprise without becoming a shadow IT project".

Concretely, the things a security review asks for — private networking, customer-managed encryption keys, audit trails on every prediction, regional data residency, quota isolation per team — exist here as configuration. On a self-managed inference stack they are a project; on a consumer model API they may not exist at all. That is why large organisations end up here even when a cheaper path exists.

The trade is equally concrete: an Endpoint bills while it is deployed, whether or not it serves traffic; the platform's own abstractions (pipelines, registries, endpoints, feature stores) must be learned; and a team that wanted `docker run` will find itself reading IAM documentation instead.

## Key Features

- **Gemini and Model Garden access**: first-party Gemini models plus third-party and open models, some as API endpoints and some as deployable containers.
- **Online Endpoints**: deploy a model to a managed endpoint with autoscaling, traffic splitting between model versions, and private networking.
- **Batch prediction**: offline scoring over large inputs at a substantially lower cost than online endpoints, which is the right path for backfills and evaluations.
- **Custom training**: managed training jobs on GPUs and TPUs with custom containers, distributed reduction, and hyperparameter tuning.
- **Model Registry**: versioned models with aliases, tied to the training pipeline that produced them.
- **Vertex AI Pipelines**: Kubeflow-style orchestration as a managed service, so a training pipeline is a repeatable artifact rather than a notebook sequence.
- **Vector Search**: managed vector indexing and querying for retrieval, with streaming and batch index updates.
- **Feature Store**: online and offline feature serving, useful when the same features serve training and inference.
- **Evaluation and tuning**: managed evaluation runs and supervised fine-tuning or distillation for supported models.
- **OpenAI-compatible Gemini endpoint**: existing chat-completion client code can target Vertex by changing the base URL and auth, which lowers the cost of trying it.
- **Governance controls**: IAM, VPC-Service-Controls, CMEK, audit logging and regional endpoints — the features that decide enterprise adoption.
- **Quotas as a first-class constraint**: per-project and per-region accelerator quotas determine whether a deployment can exist at all, and they are requested, not assumed.

## Architecture / How It Works

A deployment takes an artifact from the Model Registry and serves it at an Endpoint: Google provisions instances of the chosen machine type, runs your container or a prebuilt model server, and routes prediction requests through an authenticated endpoint URL. Autoscaling has a minimum replica count, and that minimum is what bills — the classic surprise on a first bill is a min-replica of one on a GPU type that was never scaled down.

Batch prediction runs the same model over a set of input files with no endpoint at all, writing outputs to a bucket. For anything that is not interactive, this is an order of magnitude cheaper, and it is underused.

Pipelines compile a graph of containerised steps and run it on managed infrastructure, with artifacts flowing through the registry and metadata store. That is what makes a training run reproducible: the pipeline definition, the container digests and the input artifacts are all recorded.

Request path and auth are GCP-standard: a service account or workload identity obtains a token, the SDK or REST call carries it, and audit logs record the caller. Private connectivity replaces the public endpoint where policy requires it, which is also where the operational complexity concentrates.

## Getting Started

```bash
pip install google-cloud-aiplatform
gcloud auth application-default login
gcloud config set project my-project
```

```python
from google.cloud import aiplatform

aiplatform.init(project="my-project", location="europe-west4")

# Gemini through the Vertex API with the OpenAI-compatible client
from openai import OpenAI
client = OpenAI(
    base_url="https://europe-west4-aiplatform.googleapis.com/v1/projects/my-project/"
              "locations/europe-west4/endpoints/openapi",
    api_key=token,   # a short-lived GCP access token
)
r = client.chat.completions.create(model="google/gemini-3.8-flash",
                                  messages=[{"role": "user", "content": "hello"}])

# bring a model in the registry to an endpoint
model = aiplatform.Model("projects/my-project/locations/europe-west4/models/1234")
endpoint = model.deploy(machine_type="n1-standard-8",
                        min_replica_count=1, max_replica_count=2,
                        accelerator_type="NVIDIA_L4", accelerator_count=1)
print(endpoint.predict(instances=[{"prompt": "hello"}]))
```

Two decisions to make before the first deploy: whether the workload is interactive at all (if not, use `BatchPredictionJob`), and whether the minimum replica count can be zero-ish through a scaled-down schedule — an idle GPU endpoint is the single most common cost mistake on this platform.

## Use Cases

1. **Passing a security review**: a deployment that answers the questionnaire with existing controls — private path in, customer-managed keys at rest, every prediction attributable to an identity in the audit log, data staying in the named region.
2. **Offline scoring at scale**: batch prediction over a document corpus for classification or extraction, where interactive latency is irrelevant and cost per item dominates.
3. **Managed training then managed serving**: a custom training job registers a model, the registry aliases it, an endpoint serves it, and the lineage is a platform record rather than a wiki page.
4. **Retrieval that never leaves the perimeter**: embeddings built from warehouse data, indexed and queried inside the same project, so the retrieval leg inherits the access rules the warehouse already enforces.
5. **Evaluation and tuning as a service**: supervised fine-tuning and managed evaluation for Gemini models when the team does not want to run RL or SFT infrastructure.
6. **Traffic-split model rollouts**: deploy a second version behind the same endpoint and shift a percentage of traffic, which is the cheapest canary available on a managed platform.
7. **BigQuery-adjacent AI features**: models invoked from data pipelines where the data never leaves the warehouse's security boundary.

## Strengths

- Governance depth is the differentiator: private networking, CMEK, audit logs, regional endpoints and quota isolation are product features rather than projects.
- The managed pieces compose — registry, pipelines, endpoints and batch prediction share lineage, so a deployed model can be traced to the run that made it.
- Gemini access with an OpenAI-compatible surface means existing client code can try it with a base-URL change.
- Batch prediction makes large offline jobs affordable in a way online endpoints never will, and most teams do not use it early enough.
- Custom training on GPUs and TPUs with the same IAM means no separate cluster to secure.
- Enterprise support and documentation are real, which matters when a quota request is blocking a launch.

## Limitations / When NOT to Use

- **Deployed endpoints bill by uptime, not usage.** A minimum replica of one on a GPU is a continuous charge, and scale-to-zero is not a default.
- **Adoption cost is real.** IAM roles, quota requests, VPC configuration, service accounts and regional availability are prerequisites, and each one can take days.
- **Abstraction stacking.** Pipelines, registries, endpoints and feature stores are Google's vocabulary; a team that wants a container and a load balancer will fight all of it.
- **Portability is near zero.** Everything is expressed in GCP primitives, and moving off means rebuilding the orchestration and the identity model.
- **Quotas gate feasibility.** Accelerator quota is per-project and per-region and must be granted; a launch date that ignores this slips.
- **Pricing is hard to model in advance.** Accelerator hours, prediction requests, storage, egress, pipeline runs and training jobs are separate meters, and the estimator requires knowing all of them.
- **Latency depends on proximity and path.** Private connectivity adds hops, cold starts exist on scaled endpoints, and the token-generation latency of a managed endpoint is not always the model's best case.

## Integration Patterns

- *Wiring*: one project per environment, endpoints deployed from registry artifacts by CI, and service accounts scoped per workload rather than a shared default.
- *Cost control*: default to batch prediction for anything non-interactive, set explicit min and max replicas with an autoscaling schedule, and alert on endpoint uptime cost rather than only on request volume.
- *Rollout*: deploy the new version, split a small traffic percentage, compare evaluation metrics and latency, then shift — and keep the previous version deployed until the rollback window closes.
- *Data path*: keep the source corpus in GCS or BigQuery, batch-predict into a bucket, and only put an endpoint behind what humans actually wait for.
- *Alternatives in the same job*: `aws-bedrock` and `azure-ai-studio` for the equivalent in another cloud, `hf-inference-endpoints` for a smaller managed footprint, `modal` and `replicate` when the need is a GPU endpoint without a platform, and a self-hosted `vllm` when the model is open and the volume justifies owning it.
- *Before production*: request quota early, confirm the region has the accelerator you need, verify whether the security review requires private connectivity, and model the idle cost of the minimum replica count.

## Resources

- [Vertex AI documentation](https://cloud.google.com/vertex-ai/docs)
- [Python SDK](https://cloud.google.com/python/docs/reference/aiplatform/latest)
- [Model Garden](https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models)
- [Pricing](https://cloud.google.com/vertex-ai/pricing)
- [Vector Search](https://cloud.google.com/vertex-ai/docs/vector-search/overview)

## Buzz & Reception

- Enterprise adoption is driven by governance and existing GCP spend rather than by any single capability, which is also why teams outside GCP rarely choose it.
- The complaints are consistent: quota friction, abstraction weight and bills from endpoints nobody remembered to scale down.

---
*Last reviewed: 2026-10-25 by @maintainer*
