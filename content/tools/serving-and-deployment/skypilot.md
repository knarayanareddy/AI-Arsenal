---
id: skypilot
name: "SkyPilot"
type: tool
job: [deployment, fine-tuning]
description: "Run AI workloads on any cloud or Kubernetes with automatic cheapest-GPU selection, spot handling, and one YAML interface"
url: "https://skypilot.readthedocs.io"
cost_model: open-source
pricing_detail: "Apache-2.0 open source; you pay only your cloud bills"
tags: [inference, training, cloud, efficiency]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/skypilot-org/skypilot"
docs_url: "https://docs.skypilot.co"
github_url: "https://github.com/skypilot-org/skypilot"
alternatives: [modal, runpod]
integrates_with: [vllm]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: serving-and-deployment
audience: [production, research]
best_when:
  - "You want GPU workloads (training, batch inference, serving) portable across AWS/GCP/Azure/K8s/neoclouds with automatic cheapest-region selection"
  - "Spot-instance economics matter: SkyPilot auto-recovers preempted jobs and can cut GPU costs multiples over on-demand"
avoid_when:
  - "You're single-cloud with mature in-house infra automation — the abstraction adds little there"
  - "Fully serverless developer experience is the goal; Modal-style platforms hide more infrastructure"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (10,264), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The best open framework for multi-cloud GPU portability and cost arbitrage; widely used for LLM fine-tuning and serving fleets"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/skypilot-org/skypilot", "date": "2026-07-08", "description": "10,264 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

An open-source framework from UC Berkeley for running AI workloads across clouds: describe a job's resources in YAML (GPUs, disk, setup, run commands) and SkyPilot finds the cheapest available capacity across your enabled clouds/K8s clusters, provisions it, syncs your code, handles spot preemptions, and tears down when done.

## Why It's in the Arsenal

SkyPilot earns a place in the Arsenal because it directly addresses a recurring decision point: you want GPU workloads (training, batch inference, serving) portable across AWS/GCP/Azure/K8s/neoclouds with automatic cheapest-region selection. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- One interface over 16+ clouds and Kubernetes
- Automatic cheapest-GPU placement and spot recovery
- Managed jobs, multi-node training, and SkyServe for serving

## Architecture / How It Works

An optimizer matches resource requests against real-time pricing/availability across clouds, then provisions VMs/pods, mounts storage, and runs your setup/run scripts; a controller monitors managed jobs, relaunching on preemption with checkpoint-resume patterns.

## Getting Started

```bash
pip install 'skypilot[aws,gcp,kubernetes]'
sky check && sky launch -c dev --gpus A100:1 -- nvidia-smi
```

## Use Cases

1. **Scenario**: you want GPU workloads (training, batch inference, serving) portable across AWS/GCP/Azure/K8s/neoclouds with automatic cheapest-region selection
2. **Scenario**: spot-instance economics matter: SkyPilot auto-recovers preempted jobs and can cut GPU costs multiples over on-demand
3. **Scenario where this is NOT the right fit**: you're single-cloud with mature in-house infra automation — the abstraction adds little there — evaluate an alternative instead

## Strengths

- You want GPU workloads (training, batch inference, serving) portable across AWS/GCP/Azure/K8s/neoclouds with automatic cheapest-region selection
- Spot-instance economics matter: SkyPilot auto-recovers preempted jobs and can cut GPU costs multiples over on-demand

## Limitations / When NOT to Use

- You're single-cloud with mature in-house infra automation — the abstraction adds little there
- Fully serverless developer experience is the goal; Modal-style platforms hide more infrastructure

- _Verified for SkyPilot: stars, license and last-commit come from the GitHub API as of 2026-07-08; the feature list and integration surface are read from the project's own documentation. The best_when/avoid_when judgement above is documentation-derived and has not been re-confirmed against hands-on production use in this environment, so treat the cost, limits and failure modes as claims to check against your workload._

## Integration Patterns

- *Wiring*: adopt SkyPilot as a Python dependency or sidecar service against the `deployment, fine-tuning` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `modal`, `runpod` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Known integrations*: `vllm` are the documented surfaces worth starting from, because they establish the expected request and response contract. Pin the version you build against — a client library upgrade can change default retrieval or batching behaviour without a breaking version bump.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Official Site](https://skypilot.readthedocs.io)
- [Documentation](https://docs.skypilot.co)
- [GitHub](https://github.com/skypilot-org/skypilot)

## Buzz & Reception

- 10,264 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer; both verified via the GitHub API.*
