---
id: "choose-deployment-target"
title: "Choosing a Deployment Target: Separating App Hosting From Model Serving"
category: "serving-patterns"
decision_type: "composition"
decision_summary: "Deploy your application and your model separately unless you are intentionally building a small all-in-one prototype — choose each by GPU need, traffic shape, cloud commitment, and operations maturity independently."
tags:
  - inference
  - cloud
  - serverless
  - self-hosted

approaches:
  - name: "Simple App Hosting (Railway, Fly.io, FastAPI on a basic host)"
    description: "Deploy the application layer (API, business logic) on a low-friction hosting platform, calling out to a separately hosted model (API or serving endpoint) rather than colocating model serving."
    when_to_use:
      - "MVP or small-scale application traffic where minimal setup and low friction matter more than fine-grained scaling control"
      - "The model is accessed via a hosted API, so the app layer has no GPU requirement of its own"
    when_not_to_use:
      - "Traffic is bursty enough that a simple always-on host is either wasteful (paying for idle capacity) or insufficient (can't handle spikes)"
      - "The application itself needs to host model inference, not just call out to it"
    tradeoffs:
      cost: "Low and predictable at small scale; can become inefficient if traffic is bursty and the host runs always-on."
      complexity: "Lowest setup complexity of any approach — minimal infrastructure to configure or operate."
      scalability: "Adequate for MVP/small-scale traffic; not designed for high-throughput or highly variable load without additional configuration."

  - name: "Serverless / Bursty Compute (Modal, serverless containers)"
    description: "Deploy application or lightweight model-serving logic on serverless infrastructure that scales to zero and back up automatically, paying only for actual compute time."
    when_to_use:
      - "Traffic is bursty or unpredictable, making always-on hosting cost-inefficient"
      - "Workloads are Python-native and benefit from a serverless platform designed around that (e.g. Modal specifically)"
    when_not_to_use:
      - "Traffic is steady and high enough that always-on infrastructure would be cheaper than per-invocation serverless pricing"
      - "Cold-start latency is unacceptable for the use case and cannot be mitigated with warm-pool configuration"
    tradeoffs:
      cost: "Pay-per-use, favorable for bursty/unpredictable traffic; can exceed always-on cost at high sustained volume."
      latency: "Cold-start latency is a real, measurable cost for the first request after an idle period — must be evaluated against your latency budget, not assumed away."
      scalability: "Scales automatically with load, removing manual capacity-planning burden for variable traffic."

  - name: "Enterprise Cloud Platform (AWS Bedrock, Azure AI Studio, Vertex AI)"
    description: "Use a managed AI platform tied to an existing enterprise cloud commitment, combining model access, deployment, and governance tooling within that cloud provider's ecosystem."
    when_to_use:
      - "The organization already has a deep commitment to a specific cloud provider (AWS, Azure, or GCP) and wants to stay within that provider's governance, billing, and compliance boundary"
      - "Enterprise requirements (audit trails, existing IAM integration, procurement processes) favor staying within an approved cloud platform"
    when_not_to_use:
      - "There is no existing enterprise cloud commitment — adopting one of these platforms purely for AI serving, without the surrounding enterprise context, adds unnecessary platform lock-in"
      - "Cost or model-selection flexibility outside that one cloud's catalog is a priority"
    tradeoffs:
      cost: "Often bundled with existing enterprise contracts/discounts, which can make it cost-effective specifically for organizations already committed, and less so for those evaluating on pure unit economics."
      complexity: "Lower integration complexity for teams already inside that cloud's ecosystem (existing IAM, networking, billing); higher complexity to adopt without that context."
      reliability: "Enterprise-grade SLA and support, which matters specifically for organizations with compliance/audit requirements."

  - name: "Self-Hosted High-Throughput Serving (vLLM, SGLang on GPU infrastructure)"
    description: "Deploy an open-weight model on GPU infrastructure you operate, using a production inference engine designed for high-throughput serving (batching, PagedAttention-style memory management, speculative decoding)."
    when_to_use:
      - "You need to self-host an open-weight model (per the model-selection decision) and require high query throughput"
      - "You have the operational capacity to run and tune GPU-backed serving infrastructure"
    when_not_to_use:
      - "You need a managed model endpoint without operating GPU infrastructure yourself — see Managed Model Endpoints instead"
      - "Query volume doesn't justify dedicated GPU capacity — prototype-scale GPU jobs are better served by on-demand/serverless GPU options"
    tradeoffs:
      cost: "GPU infrastructure cost regardless of utilization, but no per-token vendor fee — favors high, steady throughput."
      latency: "Highly tunable through batching and engine-specific optimizations, at the cost of real tuning effort."
      compute-requirements: "Requires dedicated GPU capacity, sized to the model and target throughput."

  - name: "Managed Model Endpoints (Hugging Face Inference Endpoints, Replicate)"
    description: "A managed endpoint that serves a chosen model without requiring you to operate the underlying GPU infrastructure."
    when_to_use:
      - "You want a managed model endpoint without operating your own serving infrastructure, but need more specific model control than a general-purpose cloud API provides"
      - "Prototype-to-small-production-scale GPU workloads where dedicated self-hosted infrastructure isn't yet justified"
    when_not_to_use:
      - "Sustained high-throughput production traffic where self-hosting would be more cost-effective at scale"
    tradeoffs:
      cost: "Usage-based, generally between a pure API and full self-hosting in cost profile, with no infrastructure to operate."
      complexity: "Low — a managed layer specifically designed to avoid GPU operational burden."

key_factors:
  - "Does the workload need GPU hosting for model serving, or does it call a hosted API? This is the first, most consequential fork"
  - "Traffic shape: steady vs bursty determines whether always-on, serverless, or self-hosted-with-headroom is the right cost model"
  - "Existing cloud commitment: a deep existing AWS/Azure/GCP commitment favors that provider's managed AI platform for governance and integration reasons"
  - "Throughput requirement: high sustained throughput favors self-hosted engines (vLLM/SGLang); lower or prototype-scale favors managed endpoints"
  - "Operational maturity: teams without capacity to tune GPU-backed serving infrastructure should weight managed/serverless options higher regardless of theoretical cost advantages"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Choosing where to deploy"] --> GPU{"Does this workload need to host model GPUs?"}
      GPU -->|"No, using a hosted model API"| Traffic{"App traffic shape?"}
      Traffic -->|"Small/MVP"| Simple["Railway / Fly.io / FastAPI on a simple host"]
      Traffic -->|"Bursty/serverless-shaped"| Serverless["Modal or another serverless container platform"]
      Traffic -->|"Enterprise cloud commitment"| CloudPlatform{"Existing cloud?"}
      CloudPlatform -->|"AWS"| Bedrock["AWS Bedrock + AWS app hosting"]
      CloudPlatform -->|"Azure"| Azure["Azure AI Studio"]
      CloudPlatform -->|"GCP"| Vertex["Vertex AI"]
      GPU -->|"Yes, self-hosting a model"| Throughput{"Need high-throughput production serving?"}
      Throughput -->|"Yes"| SelfHostServe["vLLM or SGLang on GPU infrastructure"]
      Throughput -->|"No, prototype-scale"| Managed["Hugging Face Inference Endpoints or Replicate"]

confidence: "emerging-consensus"
tradeoffs_as_of: "2026-07-06"

approach_implementations:
  - approach_name: "Simple App Hosting (Railway, Fly.io, FastAPI on a basic host)"
    tool_ids:
      - fastapi
      - railway
      - fly-io
    project_ids: []
    build_example_ids: []
  - approach_name: "Serverless / Bursty Compute (Modal, serverless containers)"
    tool_ids:
      - modal
    project_ids: []
    build_example_ids: []
  - approach_name: "Enterprise Cloud Platform (AWS Bedrock, Azure AI Studio, Vertex AI)"
    tool_ids:
      - aws-bedrock
      - azure-ai-studio
      - google-vertex-ai
    project_ids: []
    build_example_ids: []
  - approach_name: "Self-Hosted High-Throughput Serving (vLLM, SGLang on GPU infrastructure)"
    project_ids:
      - vllm
      - sglang
    tool_ids: []
    build_example_ids: []
  - approach_name: "Managed Model Endpoints (Hugging Face Inference Endpoints, Replicate)"
    tool_ids:
      - hf-inference-endpoints
      - replicate
      - bentoml
    project_ids: []
    build_example_ids: []

related_decisions:
  - choose-llm
  - choose-agent-framework

common_mistakes:
  - "Colocating application logic and model serving in one deployment when they have fundamentally different scaling characteristics — the app layer typically scales on request count, while model serving scales on GPU capacity; deploying them together means you can't scale each independently, and you pay for GPU-adjacent hosting even for pure app-logic traffic."
  - "Choosing an enterprise cloud AI platform without an existing enterprise commitment to that cloud, adding platform lock-in and integration overhead that a simpler, cloud-agnostic deployment would have avoided."
  - "Self-hosting high-throughput serving infrastructure (vLLM/SGLang) for prototype-scale traffic that a managed endpoint would have served adequately and far more simply, before the throughput requirement that justifies self-hosting actually exists."
  - "Ignoring cold-start latency in serverless deployments until it surfaces as a user-facing problem — cold starts are a real, measurable, and often addressable (via warm pools) cost that should be evaluated against your latency budget at design time, not discovered in production."

added_date: "2026-06-13"
last_reviewed: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: "reviewed"
---

## Overview

Deployment is where prototypes become expensive, slow, or unreliable. The single most important structural decision in this space is recognizing that AI systems typically need *separate* choices for app hosting, model serving, data stores, and observability — treating "deployment" as one monolithic decision is the root cause of most of the common mistakes below.

## The Decision

First resolve whether the workload needs to host model GPUs at all, or whether it calls a hosted model API — this fork determines almost everything downstream. If you're calling a hosted API, the deployment decision is really just an application-hosting decision, resolved by traffic shape (steady-small favors simple hosts, bursty favors serverless, enterprise-cloud-committed favors that provider's platform). If you are self-hosting a model, the decision shifts to a throughput question: high sustained throughput justifies dedicated GPU infrastructure with a production inference engine, while prototype-scale or infrequent GPU workloads are better served by a managed endpoint that removes GPU operational burden entirely.

## Decision Framework

The decision tree in this entry's frontmatter encodes the full branching logic; condensed as a quick-reference table:

| Need | Recommended Start | Canonical Entry |
|---|---|---|
| Simple API wrapper | FastAPI + Railway/Fly.io | [FastAPI](../../tools/serving-and-deployment/fastapi.md), [Railway](../../tools/serving-and-deployment/railway.md), [Fly.io](../../tools/serving-and-deployment/fly-io.md) |
| Serverless Python/GPU jobs | Modal | [Modal](../../tools/serving-and-deployment/modal.md) |
| Managed model endpoint | HF Endpoints / Replicate | [HF Inference Endpoints](../../tools/serving-and-deployment/hf-inference-endpoints.md), [Replicate](../../tools/serving-and-deployment/replicate.md) |
| AWS enterprise | Bedrock | [AWS Bedrock](../../tools/serving-and-deployment/aws-bedrock.md) |
| Azure enterprise | Azure AI Studio | [Azure AI Studio](../../tools/serving-and-deployment/azure-ai-studio.md) |
| GCP enterprise | Vertex AI | [Google Vertex AI](../../tools/serving-and-deployment/google-vertex-ai.md) |
| Self-host open models at scale | vLLM / SGLang | [vLLM](../../projects/inference-engines/vllm.md), [SGLang](../../projects/inference-engines/sglang.md) |

## Approach Deep-Dives

**Simple app hosting** is the right default for MVP and small-scale traffic calling a hosted model API — it deliberately avoids the operational surface of GPU infrastructure since none is needed. **Serverless/bursty compute** (Modal specifically, among others) trades a cold-start latency cost for automatic scale-to-zero economics, which is the correct tradeoff for genuinely bursty or unpredictable workloads but a poor one for steady high-volume traffic. **Enterprise cloud platforms** are not a compromise choice for organizations already committed to that cloud — the governance, billing, and IAM integration benefits are real and specific to that context, but adopting one without the surrounding enterprise commitment imports lock-in without the corresponding benefit. **Self-hosted high-throughput serving** (vLLM, SGLang) is justified specifically by sustained throughput requirements that make dedicated GPU capacity cost-effective; the tuning work (batching configuration, memory management) is real engineering investment that only pays off at meaningful scale. **Managed model endpoints** fill the gap between "call a general API" and "operate your own GPU serving stack," appropriate for prototype-to-small-production-scale workloads that need specific model control without the operational burden of self-hosting.

## Common Mistakes

- **Colocating application logic and model serving in one deployment.** These have different scaling characteristics (request count vs GPU capacity), and colocating them prevents independent scaling.
- **Choosing an enterprise cloud AI platform without an existing enterprise cloud commitment.** This adds lock-in without the governance/integration benefit that justifies the choice for already-committed organizations.
- **Self-hosting high-throughput serving infrastructure before the throughput requirement exists.** A managed endpoint would have served prototype-scale traffic more simply.
- **Ignoring cold-start latency in serverless deployments until it becomes a user-facing problem.** Evaluate it against your latency budget at design time.

## When This Guidance Might Be Outdated

Confidence is rated `emerging-consensus` because the serverless-vs-always-on cost crossover and the specific throughput threshold that justifies self-hosting are both sensitive to rapidly-changing GPU rental pricing and serverless platform capability — re-verify the specific provider/pricing recommendations in the Decision Framework table roughly every 6-12 months, since the underlying economics have shifted meaningfully within recent years and are likely to continue doing so.

## Related Decisions

This decision is directly downstream of [Choosing a Model](../model-selection/choose-llm.md), since whether you're self-hosting or calling an API determines most of this decision's branching logic. It also interacts with [Choosing an Agent Framework](../model-selection/choose-agent-framework.md), since agent framework choice can imply specific deployment patterns (e.g. provider-native SDKs often assume that provider's serving infrastructure).

## Resources

- [Modal](../../tools/serving-and-deployment/modal.md)
- [BentoML](../../tools/serving-and-deployment/bentoml.md)
- [Replicate](../../tools/serving-and-deployment/replicate.md)
- [Fly.io](../../tools/serving-and-deployment/fly-io.md)
- [Railway](../../tools/serving-and-deployment/railway.md)
- [AWS Bedrock](../../tools/serving-and-deployment/aws-bedrock.md)
- [Azure AI Studio](../../tools/serving-and-deployment/azure-ai-studio.md)
- [Google Vertex AI](../../tools/serving-and-deployment/google-vertex-ai.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
