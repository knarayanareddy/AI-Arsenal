---
id: "alert-on-streaming-latency-slos"
title: "Define Streaming Latency SLOs on TTFT and Inter-Token Time, Not Total Request Duration"
entry_type: observability
category: monitoring-alerting
scope: production
signal_types:
  - latency
  - throughput
  - reliability
verification_status: production-verified
data_sensitivity:
  - internal
last_reviewed: "2026-07-07"

instrumentation_contract:
  sampling: "100% — latency fields are numeric span attributes with negligible cost, and tail percentiles (p95/p99) are meaningless on sampled data"
  retention: "30 days at full per-request resolution; 13 months as pre-aggregated percentile rollups (p50/p95/p99 per model, endpoint, and prompt-length bucket) for capacity planning and seasonality comparison"
  correlation:
    - trace_id
    - request_id
    - model_id
  redaction: "No content fields in this contract — latency events carry only numeric timings, token counts, and routing metadata, which is why 100% capture is safe"
  events:
    - name: "llm_latency_measured"
      when_emitted: "At stream completion (or request failure/timeout) for every LLM call, computed from stream-consumer-side timestamps"
      required_fields:
        - trace_id
        - model_id
        - ttft_ms
        - output_tokens
        - total_duration_ms
        - status
      optional_fields:
        - mean_inter_token_ms
        - p95_inter_token_ms
        - input_tokens
        - queue_time_ms
        - served_by
      pii_risk: internal

related_projects:
  - vllm
  - langfuse
  - openlit
related_tools:
  - litellm
dashboards: []
alert_rules:
  - "Page if p95 ttft_ms exceeds the SLO threshold for 10 consecutive minutes, evaluated per model_id and per prompt-length bucket — unbucketed TTFT alerts either flap on long-prompt traffic or miss regressions on short-prompt traffic"
  - "Page if p95 mean_inter_token_ms exceeds its SLO for 10 minutes while request rate is within normal range — rising inter-token time at steady load indicates serving saturation (batch queue growth) before errors appear"
  - "Ticket (non-paging) if the stalled-stream rate (any inter-token gap > 10s on a stream that eventually completed) exceeds 0.5% over 6 hours — the leading indicator of provider-side instability that total-duration monitoring cannot see"
common_failure_modes:
  - "Monitoring only total request duration for streaming endpoints -- total duration is dominated by output length, so a model that takes 8s to emit its first token and one that streams smoothly for 8s are indistinguishable, and the user-experience regression (frozen UI before first token) never fires an alert"
  - "Alerting on mean latency instead of percentiles -- LLM latency distributions are heavy-tailed, and the mean stays flat while p99 doubles; SLOs must be defined on p95/p99 from 100% of events, not means or sampled tails"
added_date: "2026-07-07"
added_by: "maintainer"
status: "active"
enrichment_status: draft
---

## Overview

Streaming changes what latency means: users experience time-to-first-token (TTFT) as responsiveness and inter-token time as fluency, while total request duration — the metric most HTTP monitoring gives you by default — is dominated by output length and hides both. This entry defines the latency event, the SLO structure, and the alert rules for streaming LLM endpoints, whether the backend is a managed API or a self-hosted engine.

## What to Capture

- `ttft_ms`: time from request dispatch to first content token, measured at the stream consumer (not the provider's claimed server-side number)
- `mean_inter_token_ms` and `p95_inter_token_ms` within each stream — the fluency metrics; the per-stream p95 catches mid-stream stalls that the mean hides
- `total_duration_ms` and `output_tokens`, kept for cost/throughput analysis but explicitly not used as the SLO metric
- `status` distinguishing completed / failed / timed-out / stalled-then-completed streams
- Routing metadata: `model_id`, `served_by` (provider or replica), and `queue_time_ms` where the serving engine exposes it (vLLM and similar engines report queue and prefill timing separately)
- Prompt-length bucket (from `input_tokens`), because TTFT scales with prefill length and every TTFT threshold is only meaningful per bucket

## Instrumentation Contract

One event per LLM call at stream completion, computed from consumer-side timestamps:

```json
{
  "event_name": "llm_latency_measured",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "model_id": "llama-4-70b",
  "served_by": "vllm-pool-a/replica-3",
  "ttft_ms": 412,
  "mean_inter_token_ms": 28,
  "p95_inter_token_ms": 55,
  "input_tokens": 1830,
  "output_tokens": 512,
  "queue_time_ms": 90,
  "total_duration_ms": 14840,
  "status": "completed"
}
```

## Implementation

```python
import time

def measure_stream(stream, emit, trace_id, model_id, input_tokens):
    t0 = time.monotonic()
    first_token_at = None
    gaps, last = [], None
    n = 0
    for chunk in stream:
        now = time.monotonic()
        if first_token_at is None:
            first_token_at = now
        elif last is not None:
            gaps.append(now - last)
        last = now
        n += 1
        yield chunk
    gaps_ms = sorted(g * 1000 for g in gaps)
    emit({
        "event_name": "llm_latency_measured",
        "trace_id": trace_id,
        "model_id": model_id,
        "ttft_ms": round((first_token_at - t0) * 1000) if first_token_at else None,
        "mean_inter_token_ms": round(sum(gaps_ms) / len(gaps_ms)) if gaps_ms else None,
        "p95_inter_token_ms": round(gaps_ms[int(len(gaps_ms) * 0.95)]) if gaps_ms else None,
        "input_tokens": input_tokens,
        "output_tokens": n,
        "total_duration_ms": round((last - t0) * 1000) if last else None,
        "status": "completed",
    })
```

Gateways and observability SDKs (LiteLLM's callbacks, OpenLIT's and Langfuse's instrumentations) emit TTFT and per-token timing without hand-rolling this wrapper; the wrapper matters when you need consumer-side truth independent of what the provider reports.

## Dashboards & Alerts

- Dashboard: p50/p95/p99 `ttft_ms` per `model_id` and prompt-length bucket; the same percentiles for `mean_inter_token_ms`
- Dashboard: `queue_time_ms` and request rate against inter-token p95 for self-hosted pools — the saturation panel that shows batch-queue growth as the cause of fluency regressions
- Alert rule: p95 TTFT over SLO for 10 minutes, per model and length bucket (frontmatter rule 1)
- Alert rule: p95 inter-token time over SLO at normal request rate — saturation before errors (frontmatter rule 2)
- Alert rule: stalled-stream rate above 0.5% over 6 hours as a ticket (frontmatter rule 3)

## Common Failure Modes

- **Total-duration SLOs on streaming endpoints.** Output length dominates the number; frozen-UI TTFT regressions never fire, and healthy long generations page on-call for nothing.
- **Mean-based alerting on heavy-tailed distributions.** The mean is stable while p99 doubles; percentile SLOs computed from 100% of events are the only faithful representation, which is why this contract samples nothing.

## Privacy & Governance

This contract is deliberately content-free — timings, token counts, and routing metadata only — which is what makes 100% capture and 13-month rollup retention safe without redaction machinery. The one governance edge: `served_by` and queue metrics can reveal infrastructure topology, so latency dashboards shared outside the operating team should expose model-level aggregates rather than per-replica detail. Access to raw per-request latency events (which join to full traces via trace_id) follows the trace store's access policy — the serving/on-call team; percentile dashboards are readable org-wide.

## Validation Checklist

- [ ] TTFT is measured at the stream consumer and disagrees with provider-reported values by a known, explained margin
- [ ] Every latency panel and alert is segmented by `model_id` and prompt-length bucket (verified by inspecting alert queries, not dashboard titles)
- [ ] A deliberate load test on the self-hosted pool moves `queue_time_ms` and inter-token p95 in the expected direction before error rates move
- [ ] Stalled-stream detection fires on a synthetic stream with an injected 15s mid-stream gap
- [ ] Percentiles are computed from unsampled data (confirmed in the metrics pipeline config)
- [ ] SLO thresholds were set from measured baseline distributions (documented before/after), not copied from another team's runbook

## Relation to the Arsenal

The latency event extends the per-call record from [Capture a Structured Event for Every LLM Call](../instrumentation/capture-the-llm-call-event.md) with stream-timing fields, and joins the trace tree from [Trace Every Retrieval, Tool Call, and Agent Transition](../tracing/trace-every-agent-and-rag-step.md) so slow requests decompose into queue, prefill, and decode contributions. Quality-side regression alerting is covered by [Alert on Quality and Cost Regressions](./alert-on-quality-and-cost-regressions.md); the serving-stack decisions that determine achievable TTFT and inter-token floors are in [Choosing an LLM Serving Stack](../../architectures/serving-patterns/choose-serving-stack.md) and the engine entries ([vLLM](../../projects/inference-engines/vllm.md)).

## Resources

Evidence for `verification_status: production-verified`: TTFT and inter-token time (TPOT) are the standard latency decomposition for production LLM serving — they are the primary metrics in vLLM's own benchmarking and metrics endpoints and in every major serving-engine performance guide, and are first-class fields in the observability platforms in this catalog (OpenLIT, Langfuse) and in LiteLLM's gateway telemetry.

- [vLLM](../../projects/inference-engines/vllm.md) — exposes TTFT/TPOT and queue-time metrics natively
- [OpenLIT](../../projects/benchmarks-and-evals/openlit.md) — OpenTelemetry GenAI metrics including streaming timings
- [Langfuse](../../projects/benchmarks-and-evals/langfuse.md) — per-generation latency capture with TTFT
- [LiteLLM](../../tools/serving-and-deployment/litellm.md) — gateway-level latency callbacks across providers

---
*Last reviewed: 2026-07-07 by @maintainer*
