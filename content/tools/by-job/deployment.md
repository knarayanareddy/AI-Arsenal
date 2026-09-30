---
id: "deployment"
title: "Deployment Tools"
entry_type: "guide"
section: "tools"
description: "Curated tools for deployment workflows in AI engineering"
tags:
  - llm
  - data
related_entries: []
added_date: "2026-06-13"
last_reviewed: "2026-06-13"
added_by: "maintainer"
status: "active"
---

## Overview

This guide compares tools for the `deployment` job. Use it as a routing page, then open the linked canonical project or tool entry for full details.

## Why It's in the Arsenal

A model becomes a deployment through packaging, and the packaging choice is the one that shows up in code review and in rollback plans. Grouping by this job keeps the bundle, the registry and the hosting decision adjacent, so the platform-lock-in cost is visible before rather than after the first migration.

## Key Features

- Every entry records what the packaging actually pins: environment, weights, GPU and secrets, so the artefact is reviewable rather than implied.
- Managed platforms and self-hosted targets are listed together, because most models pass through both.
- The platform-lock-in cost is stated per entry, which the feature list does not show.

## Architecture / How It Works

The shortlist is derived from the deployment and packaging facets on each tool entry. The comparison axis is what the artefact pins and what the target owns: a bundle you review in git is a review mechanism, while a managed platform removes the cluster work and the configuration options together.

## Getting Started

```bash
# Pick one tool from the shortlist and validate it with a small proof of concept.
```

## Tool Shortlist

### Modal — 🔄

> **TL;DR:** Modal is a candidate for `deployment` workflows. Full details: [Modal](../serving-and-deployment/modal.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [Modal](../serving-and-deployment/modal.md)
**Alternatives:** Replicate, Hugging Face Inference Endpoints, AWS Bedrock, Azure AI Studio, Google Vertex AI

### Replicate — 🔄

> **TL;DR:** Replicate is a candidate for `deployment` workflows. Full details: [Replicate](../serving-and-deployment/replicate.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [Replicate](../serving-and-deployment/replicate.md)
**Alternatives:** Modal, Hugging Face Inference Endpoints, AWS Bedrock, Azure AI Studio, Google Vertex AI

### Hugging Face Inference Endpoints — 🔄

> **TL;DR:** Hugging Face Inference Endpoints is a candidate for `deployment` workflows. Full details: [Hugging Face Inference Endpoints](../serving-and-deployment/hf-inference-endpoints.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [Hugging Face Inference Endpoints](../serving-and-deployment/hf-inference-endpoints.md)
**Alternatives:** Modal, Replicate, AWS Bedrock, Azure AI Studio, Google Vertex AI

### AWS Bedrock — 🔄

> **TL;DR:** AWS Bedrock is a candidate for `deployment` workflows. Full details: [AWS Bedrock](../serving-and-deployment/aws-bedrock.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [AWS Bedrock](../serving-and-deployment/aws-bedrock.md)
**Alternatives:** Modal, Replicate, Hugging Face Inference Endpoints, Azure AI Studio, Google Vertex AI

### Azure AI Studio — 🔄

> **TL;DR:** Azure AI Studio is a candidate for `deployment` workflows. Full details: [Azure AI Studio](../serving-and-deployment/azure-ai-studio.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [Azure AI Studio](../serving-and-deployment/azure-ai-studio.md)
**Alternatives:** Modal, Replicate, Hugging Face Inference Endpoints, AWS Bedrock, Google Vertex AI

### Google Vertex AI — 🔄

> **TL;DR:** Google Vertex AI is a candidate for `deployment` workflows. Full details: [Google Vertex AI](../serving-and-deployment/google-vertex-ai.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [Google Vertex AI](../serving-and-deployment/google-vertex-ai.md)
**Alternatives:** Modal, Replicate, Hugging Face Inference Endpoints, AWS Bedrock, Azure AI Studio


<!-- AUTO-GENERATED MATCHING TOOLS BELOW — do not edit -->
This table is exhaustive for tools tagged with job = deployment.

| Tool | Phase | Cost model | Free tier | Self-hostable | Open source | Stack | Verdict |
|---|---|---|---|---|---|---|---|
| [Envoy AI Gateway](../serving-and-deployment/ai-gateway.md) | serving and deployment | open-source | Yes | Yes | Yes | go | recommended |
| [Anyscale](../serving-and-deployment/anyscale.md) | serving and deployment | usage-based | Yes | No | No | python | solid-choice |
| [AWS Bedrock](../serving-and-deployment/aws-bedrock.md) | serving and deployment | usage-based | Yes | No | No | polyglot | recommended |
| [Azure AI Studio](../serving-and-deployment/azure-ai-studio.md) | serving and deployment | usage-based | Yes | No | No | polyglot | recommended |
| [Baseten](../serving-and-deployment/baseten.md) | serving and deployment | usage-based | Yes | No | No | python | recommended |
| [BentoML](../serving-and-deployment/bentoml.md) | serving and deployment | freemium | Yes | Yes | Yes | python | recommended |
| [Cog (Replicate)](../serving-and-deployment/cog.md) | serving and deployment | open-source | Yes | Yes | Yes | python, go | solid-choice |
| [CubeSandbox](../serving-and-deployment/cubesandbox.md) | serving and deployment | open-source | Yes | Yes | Yes | rust | watching |
| [Empromptu AI](../orchestration/empromptu-ai.md) | orchestration | freemium | Yes | No | No | python | watching |
| [Fly.io](../serving-and-deployment/fly-io.md) | serving and deployment | usage-based | Yes | No | No | polyglot | recommended |
| [Google Vertex AI](../serving-and-deployment/google-vertex-ai.md) | serving and deployment | usage-based | Yes | No | No | polyglot | recommended |
| [Hugging Face Inference Endpoints](../serving-and-deployment/hf-inference-endpoints.md) | serving and deployment | usage-based | Yes | No | No | python, typescript | recommended |
| [KServe](../serving-and-deployment/kserve.md) | serving and deployment | open-source | Yes | Yes | Yes | go, python | solid-choice |
| [KubeAI](../serving-and-deployment/kubeai.md) | serving and deployment | open-source | Yes | Yes | Yes | go | solid-choice |
| [Modal](../serving-and-deployment/modal.md) | serving and deployment | usage-based | No | No | No | python | recommended |
| [NVIDIA NIM](../serving-and-deployment/nvidia-nim.md) | serving and deployment | paid | Yes | Yes | No | python, cpp | solid-choice |
| [Railway](../serving-and-deployment/railway.md) | serving and deployment | usage-based | Yes | No | No | polyglot | recommended |
| [RamaLama](../serving-and-deployment/ramalama.md) | serving and deployment | open-source | Yes | Yes | Yes | python | solid-choice |
| [Ray Serve](../serving-and-deployment/ray-serve.md) | serving and deployment | open-source | Yes | Yes | Yes | python | recommended |
| [Replicate](../serving-and-deployment/replicate.md) | serving and deployment | usage-based | No | No | No | python, typescript | solid-choice |
| [RunPod](../serving-and-deployment/runpod.md) | serving and deployment | usage-based | No | No | No | python, polyglot | solid-choice |
| [SkyPilot](../serving-and-deployment/skypilot.md) | serving and deployment | open-source | Yes | Yes | Yes | python | recommended |
| [ToolHive](../serving-and-deployment/toolhive.md) | serving and deployment | open-source | No | Yes | Yes | go | watching |
| [NVIDIA Triton Inference Server](../serving-and-deployment/triton-inference-server.md) | serving and deployment | open-source | Yes | Yes | Yes | cpp, python | recommended |
| [Vercel](../serving-and-deployment/vercel.md) | serving and deployment | freemium | Yes | No | No | typescript | best-in-class |
<!-- AUTO-GENERATED MATCHING TOOLS ABOVE — do not edit -->

## Use Cases

1. **Scenario**: you have a model artifact and need to decide how it becomes a versioned, rollback-able deployment.
2. **Scenario**: you are choosing between a managed platform and your own cluster, and want the operational difference stated plainly.
3. **Scenario**: you need container packaging for a model that has environment, GPU and weight requirements, and want them pinned rather than implied.

## Strengths

- Groups packaging tools separately from hosting platforms, because you often need one of each.
- States the platform-lock-in cost of the managed options, which is the part not visible in the pricing.
- Emphasises that a bundle reviewable in git is a review and audit mechanism, not just a packaging convenience.

## Limitations / When NOT to Use

- Deployment tooling decides how much of your runtime you control; a managed platform removes the cluster work and the configuration options with it.
- GPU configuration, secrets and autoscaling are usually the platform's responsibility, which means reproducing the environment elsewhere is your problem.
- A package format that is a directory is easy to review in git, which is the underrated reason to prefer one.

## Integration Patterns

- Link a deployment tool here from any project entry that has a Dockerfile or a serving config, so the packaging story is documented once.
- When a serving-and-deployment build example exists, reference it from the tool entries involved.

## Resources

- [Modal](../serving-and-deployment/modal.md)
- [Replicate](../serving-and-deployment/replicate.md)
- [Hugging Face Inference Endpoints](../serving-and-deployment/hf-inference-endpoints.md)
- [AWS Bedrock](../serving-and-deployment/aws-bedrock.md)
- [Azure AI Studio](../serving-and-deployment/azure-ai-studio.md)
- [Google Vertex AI](../serving-and-deployment/google-vertex-ai.md)

## Buzz & Reception

This page is maintained as a curated shortlist, not a popularity ranking.

---
*Last reviewed: 2026-06-13 by @maintainer*
