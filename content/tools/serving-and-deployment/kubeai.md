---
id: kubeai
name: "KubeAI"
type: tool
job: [deployment, production-serving]
description: "Kubernetes operator for serving LLMs and embeddings: an OpenAI-compatible endpoint with autoscaling (scale-from-zero) over vLLM/Ollama backends"
url: "https://www.kubeai.org"
cost_model: open-source
pricing_detail: "Apache-2.0 open source; free (you pay for your own Kubernetes/GPU infrastructure)"
tags: [inference, self-hosted, kubernetes]
maturity: beta
stack: [go]
free_tier: true
free_tier_limits: "Open source and free; you run it on your own cluster"
self_hostable: true
open_source: true
source_url: "https://github.com/kubeai-project/kubeai"
docs_url: "https://www.kubeai.org/"
github_url: "https://github.com/kubeai-project/kubeai"
alternatives: [kserve, ray-serve, bentoml]
integrates_with: [vllm, ollama]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: serving-and-deployment
audience: [production]
best_when:
  - "You self-host models on Kubernetes and want an OpenAI-compatible gateway with GPU autoscaling and scale-from-zero without wiring it yourself"
  - "You want to declare models as K8s custom resources and let an operator manage vLLM/Ollama backends"
avoid_when:
  - "You're not on Kubernetes — the operator model adds cluster complexity a single-node server (vLLM/Ollama directly) avoids"
  - "You need a general model-serving platform for arbitrary Python models, not just LLM/embedding backends"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (1,221), Apache-2.0 license, and last push (2026-07-03) verified via the GitHub API on 2026-07-08. Feature claims from official docs; not hands-on verified here."
verdict: solid-choice
verdict_rationale: "Focused, ops-friendly way to serve LLMs on K8s with autoscaling; value is tied to already running on Kubernetes"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/kubeai-project/kubeai", "date": "2026-07-08", "description": "1,221 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

KubeAI is a Kubernetes operator for serving LLMs and embedding models. It exposes an OpenAI-compatible API in front of inference backends (vLLM, Ollama), manages them as native Kubernetes resources, and adds LLM-aware autoscaling — including scaling to zero when idle and back up on demand — so self-hosting on a cluster requires far less bespoke glue.

## Why It's in the Arsenal

It earns a place because self-hosting LLMs on Kubernetes usually means hand-assembling serving, autoscaling, and an OpenAI-compatible shim; KubeAI packages that as an operator. It is a comparison point against other serving platforms in the serving-and-deployment phase, not an unconditional recommendation — see Strengths / Limitations.

## Key Features

- OpenAI-compatible `/v1` endpoint for chat and embeddings
- Model-as-CRD: declare models, KubeAI provisions backends
- LLM-aware autoscaling with scale-from-zero
- Manages vLLM and Ollama backends; no per-model plumbing

## Architecture / How It Works

KubeAI installs as an operator watching `Model` custom resources. For each model it schedules the appropriate backend (e.g. a vLLM deployment) with GPU requests, routes requests through an OpenAI-compatible proxy, and scales replicas based on load — spinning pods down to zero when idle and cold-starting them when traffic returns.

## Getting Started

```bash
helm repo add kubeai https://www.kubeai.org
helm install kubeai kubeai/kubeai
# then apply a Model CRD; call the OpenAI-compatible endpoint it exposes
```

## Use Cases

1. **Scenario**: serve open-weight LLMs on your own GPU cluster behind an OpenAI-compatible API
2. **Scenario**: cut idle GPU cost with scale-from-zero for bursty internal workloads
3. **Scenario where this is NOT the right fit**: single-node or non-K8s deployment — run vLLM/Ollama directly instead

## Strengths

- Turns K8s into an LLM-serving platform with minimal glue
- Autoscaling incl. scale-to-zero for cost control
- Drop-in OpenAI API compatibility

## Limitations / When NOT to Use

- Requires and assumes Kubernetes expertise
- Scoped to LLM/embedding backends, not arbitrary models
- Cold starts from zero add first-request latency

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `kserve`, `ray-serve`, and `bentoml` before adopting — they compete for the same deployment job.
- Link this tool from job guides using its canonical ID `kubeai`.
- Record cluster, GPU, and cold-start assumptions before production adoption.

## Resources

- [Official Site & Docs](https://www.kubeai.org/)
- [GitHub](https://github.com/kubeai-project/kubeai)

## Buzz & Reception

- 1,221 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
