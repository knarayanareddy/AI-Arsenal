---
id: "intermediate-vllm-serving-with-observability"
title: "Self-Hosted LLM Serving with vLLM, Metrics, and a Health Gate"
difficulty: "intermediate"
description: "Deploy an open-weight model behind vLLM's OpenAI-compatible server with Prometheus metrics, readiness gating, and cost-aware batching"
tags:
  - self-hosted
  - inference
  - observability
stack:
  - vllm
  - prometheus
estimated_time: "1-2 days"
repo_url: null
demo_url: null
added_date: "2026-07-08"
added_by: "maintainer"
last_reviewed: "2026-07-08"
status: "active"
phase: "production-deployment"
build_status: "untested"
outcome: "production-ready"
cost_estimate: "GPU-dominated: a single cloud GPU ~$0.5-3+/hr; near-zero per-token once running"
prerequisites:
  - "A GPU host (owned or cloud) sized for your chosen open-weight model"
  - "A decision that self-hosting is the right call — see the Self-Host vs Hosted API decision"
  - "Container/orchestration basics (Docker; Kubernetes optional) and a Prometheus scrape target"
related_tips:
  - "measure-first-token-latency"
implements_pattern: "self-host-vs-hosted-api"
enrichment_status: "draft"
enrichment_notes: "vLLM's OpenAI-compatible server flags (--max-model-len, --gpu-memory-utilization), the /metrics Prometheus endpoint, and /health readiness endpoint were checked against current vLLM docs during authoring. The deployment was NOT executed against a live GPU here -- build_status is honestly untested."
---

## What You're Building

A production-shaped serving deployment for an open-weight model: [vLLM](../../projects/inference-engines/vllm.md)'s OpenAI-compatible HTTP server, fronted by a readiness/health gate so traffic never hits a cold or OOM'd worker, with Prometheus metrics wired up so you can see queue depth, throughput, and latency. This is the concrete build behind the [Self-Host vs Hosted API](../../architectures/model-selection/self-host-vs-hosted-api.md) decision — it assumes you've already decided a constraint (data residency, sustained-volume economics, or control) justifies running your own GPU.

## Prerequisites

- [ ] A GPU host sized for your model — see [Choosing a Quantization Strategy](../../architectures/serving-patterns/choose-quantization-strategy.md) to decide precision vs VRAM
- [ ] Confirmation that self-hosting is warranted — [Self-Host vs Hosted API](../../architectures/model-selection/self-host-vs-hosted-api.md)
- [ ] Docker (Kubernetes optional) and a Prometheus instance that can scrape the server
- [ ] A target latency SLO (especially time-to-first-token) written down before you tune — see [Measure First-Token Latency Separately](../../tips-and-tricks/cost-and-performance/measure-first-token-latency.md)

## Architecture Overview

```mermaid
flowchart TD
    LB[Load balancer] --> READY{/health ready?}
    READY -->|Yes| VLLM[vLLM OpenAI-compatible server]
    READY -->|No| DRAIN[Kept out of rotation]
    VLLM --> GPU[(GPU: paged-attention KV cache)]
    VLLM --> METRICS[/metrics Prometheus endpoint]
    METRICS --> PROM[Prometheus]
    PROM --> ALERT[Alerts: queue depth, TTFT, GPU cache usage]
```

## Implementation

### 1. Run the vLLM OpenAI-compatible server

```bash
docker run --gpus all -p 8000:8000 \
  vllm/vllm-openai:latest \
  --model meta-llama/Llama-3.1-8B-Instruct \
  --max-model-len 8192 \
  --gpu-memory-utilization 0.90
```

`--gpu-memory-utilization` controls how much VRAM vLLM reserves for weights + KV cache; `--max-model-len` bounds context so the KV cache can't exceed memory under load. These two flags are the difference between stable serving and mid-traffic OOM.

### 2. Gate traffic on readiness

vLLM exposes `/health`. Wire it into your orchestrator so a worker only receives traffic once the model is loaded:

```yaml
# kubernetes deployment excerpt
readinessProbe:
  httpGet: { path: /health, port: 8000 }
  initialDelaySeconds: 30      # model load takes time; don't probe too early
  periodSeconds: 10
livenessProbe:
  httpGet: { path: /health, port: 8000 }
  periodSeconds: 20
```

### 3. Scrape metrics and alert on the signals that matter

vLLM serves Prometheus metrics at `/metrics`. The high-signal ones:

```yaml
# prometheus scrape_config excerpt
scrape_configs:
  - job_name: vllm
    metrics_path: /metrics
    static_configs:
      - targets: ["vllm-service:8000"]
```

Alert on: **number of requests waiting in queue** (rising queue = you're capacity-bound, add replicas), **GPU KV-cache usage %** (near 100% = requests will be preempted/rejected), and **time-to-first-token** (the number users feel — see the tip above). Total throughput alone hides a bad tail.

### 4. Call it like any OpenAI endpoint

```python
from openai import OpenAI
client = OpenAI(base_url="http://vllm-service:8000/v1", api_key="EMPTY")
resp = client.chat.completions.create(
    model="meta-llama/Llama-3.1-8B-Instruct",
    messages=[{"role": "user", "content": "Explain paged attention in one sentence."}],
    max_tokens=200,
    stream=True,   # stream for human-facing UIs — see the delivery-pattern decision
)
for chunk in resp:
    print(chunk.choices[0].delta.content or "", end="")
```

## Verify It Worked

Confirm three things, in order: (1) `/health` returns `200` only *after* the model finishes loading — probe it during startup and watch it flip, proving the readiness gate keeps traffic off cold workers; (2) `/metrics` returns vLLM counters and Prometheus is scraping them (check the target is `UP`); (3) under a small concurrent load test, the "requests waiting" metric rises and TTFT stays within your SLO — if TTFT blows past the SLO while the queue grows, you're capacity-bound and need another replica or a smaller/quantized model. A single happy-path curl is *not* verification for a serving deployment; the failure modes only show up under concurrency.

## What Can Go Wrong

- **Mid-traffic OOM from an unbounded KV cache.** Long contexts × high concurrency exhausts the KV cache even if weights fit. Bound `--max-model-len` and watch KV-cache-usage; a long-context workload may be cache-bound, not weight-bound (see [Choosing a Quantization Strategy](../../architectures/serving-patterns/choose-quantization-strategy.md)).
- **No readiness gate → cold-start 5xx storms.** Without `/health` gating, the load balancer sends traffic to a worker still loading the model, and every request errors until it's ready. Always gate.
- **Watching throughput, not tail latency or queue depth.** Aggregate tokens/sec looks healthy while p99 TTFT is terrible. Alert on queue depth and TTFT, not just throughput.
- **Treating a GPU service like a stateless web app.** Model load is slow, scaling is coarse (whole GPUs), and autoscaling reacts in minutes, not seconds — provision headroom rather than assuming instant scale-out.
- **Streaming errors after a 200.** For streamed responses, a mid-stream failure arrives after the header; a naive client treats a truncated stream as success — see [Synchronous vs Streaming vs Asynchronous](../../architectures/serving-patterns/choose-response-delivery-pattern.md).

## Cost

The GPU dominates: a single cloud GPU sized for a 7-8B model runs roughly $0.5-3+/hr, and larger models or higher throughput scale that up. Marginal cost per token is near-zero once running, which is exactly why the [Self-Host vs Hosted API](../../architectures/model-selection/self-host-vs-hosted-api.md) math only favors self-hosting at high, sustained utilization — an idle GPU here is pure loss.

## Extensions

Add horizontal replicas behind the load balancer and a metrics-driven autoscaler keyed on queue depth. Hot-swap [LoRA adapters](../fine-tuning-workflows/starter-lora-finetune-unsloth.md) to serve many fine-tuned variants from one base model. Layer in production observability — [streaming-latency SLO alerts](../../observability/monitoring-alerting/alert-on-streaming-latency-slos.md) and a [provider-outage/failover runbook](../../observability/incident-response/runbook-for-model-provider-outage-and-failover.md) adapted for a self-hosted fleet.

## Related Entries

- Decision: [Self-Host vs Hosted API](../../architectures/model-selection/self-host-vs-hosted-api.md)
- Decision: [Choosing a Quantization Strategy](../../architectures/serving-patterns/choose-quantization-strategy.md)
- Decision: [Synchronous vs Streaming vs Asynchronous](../../architectures/serving-patterns/choose-response-delivery-pattern.md)
- Project: [vLLM](../../projects/inference-engines/vllm.md)
- Observability: [Alert on Streaming Latency SLOs](../../observability/monitoring-alerting/alert-on-streaming-latency-slos.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
