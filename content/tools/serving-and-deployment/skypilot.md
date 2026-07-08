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

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `modal`, `runpod` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `skypilot`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://skypilot.readthedocs.io)
- [Documentation](https://docs.skypilot.co)
- [GitHub](https://github.com/skypilot-org/skypilot)

## Buzz & Reception

- 10,264 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
