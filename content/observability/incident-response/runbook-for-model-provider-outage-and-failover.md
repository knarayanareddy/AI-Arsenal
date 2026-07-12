---
id: "runbook-for-model-provider-outage-and-failover"
title: "Runbook: Detect and Fail Over a Model-Provider Outage in Minutes, Because Your Uptime Is Now Capped by a Dependency You Do Not Control"
entry_type: observability
category: incident-response
scope: production
signal_types:
  - reliability
  - latency
  - cost
verification_status: production-verified
data_sensitivity:
  - internal
last_reviewed: "2026-07-08"

instrumentation_contract:
  sampling: "100% of provider call outcomes for the fields that drive failover (provider, model, outcome, http_status, latency_ms) -- outage detection is only as fast as your worst-sampled signal, so provider health must be measured on every call, not a sample; incident timeline events (declared, failed_over, recovered) are singletons and always captured"
  retention: "90 days of per-call provider outcomes for post-incident analysis and provider SLA reconciliation; 13 months of daily per-provider availability and failover-event rollups for vendor-reliability trending and contract review"
  correlation:
    - request_id
    - provider
    - model
    - incident_id
  redaction: "Provider health events carry provider identity, model, HTTP status, error class, and timing -- no prompt or response content -- so they need no content redaction; incident records may reference affected request_ids but not their payloads"
  events:
    - name: "provider_call_outcome"
      when_emitted: "After every call to an external model provider, recording success, the HTTP/error status, and latency, so provider-level availability is continuously measured"
      required_fields:
        - request_id
        - provider
        - model
        - outcome
        - latency_ms
      optional_fields:
        - http_status
        - error_class
        - retry_after_s
        - failed_over_to
      pii_risk: internal
    - name: "failover_event"
      when_emitted: "Whenever routing switches a provider/model from primary to fallback (or back), and when an incident is declared or resolved, capturing the state transition and its trigger"
      required_fields:
        - incident_id
        - from_provider
        - to_provider
        - trigger
        - timestamp
      optional_fields:
        - affected_feature
        - auto_or_manual
      pii_risk: internal
related_tools:
  - litellm
  - openrouter
  - portkey
related_projects: []
related_tips:
  - define-fallbacks-for-tool-failures
related_build_examples: []
dashboards:
  - "Per-provider availability (success rate) and p95 latency over a short rolling window, side by side across all configured providers, so a single provider degrading is instantly distinguishable from a problem in your own stack"
  - "Failover state board: which features are currently on primary vs fallback provider, with the active incident_id, so responders see blast radius at a glance"
alert_rules:
  - "Alert (page) if any primary provider's success rate over a rolling 5 minutes drops below a threshold (e.g. 90%) or p95 latency exceeds a hard ceiling, since provider outages are fast-onset and every minute of detection delay is user-facing downtime"
  - "Alert if a 429/rate-limit rate spikes with retry_after headers present, which is a distinct failure mode from a hard outage and calls for backoff/quota action rather than full failover"
  - "Alert if the system has been running on a fallback provider for longer than a set duration (e.g. 30 minutes) without a human acknowledging, so a silent long-term degradation on a cheaper/weaker fallback is not left in place indefinitely"
common_failure_modes:
  - "Having no health signal at the provider level, so an outage is first learned from user reports or a total end-to-end failure rather than from a per-provider success-rate drop that could have triggered failover minutes earlier"
  - "Configuring a fallback provider but never testing the failover path, so when it finally triggers the fallback is misconfigured (wrong model name, missing API key, different response schema) and the failover itself fails"
  - "Failing over silently and never alerting, so the system runs indefinitely on a weaker/more-expensive fallback -- the incident is 'resolved' from the user's view but the quality and cost impact persists unnoticed"
  - "Treating rate-limit (429) the same as a hard outage, triggering a full failover when backoff and quota management were the correct, cheaper response"
added_date: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: draft
---

## Overview

The moment your product depends on a hosted model API, your uptime is capped by a vendor you do not control — and hosted model providers do have outages, rate-limit events, and latency brownouts. Whether that becomes a full user-facing outage or a two-minute blip you barely notice depends entirely on whether you measured provider health at the provider level and rehearsed the failover path. This runbook defines the detection signals, the decision tree that distinguishes a hard outage from a rate-limit brownout, and the failover procedure — including the discipline of alerting *that you failed over* so the system does not silently live on a weaker fallback forever.

## What to Capture

- `provider`, `model`, and `outcome` on every external call — provider-level availability is the signal that detects an outage minutes before an end-to-end failure metric would
- `http_status` and `error_class`, so a `429` rate-limit (backoff) is distinguishable from a `5xx` outage (failover) — they demand different responses
- `retry_after_s` when the provider supplies it, to drive correct backoff instead of hammering a rate-limited endpoint
- `latency_ms` per call, since a latency brownout (calls succeed but slowly) is an outage in user terms and must trip the same SLO
- `failover_event` records (`from_provider`, `to_provider`, `trigger`, `auto_or_manual`) that form the incident timeline
- `incident_id` correlation tying affected calls, the failover event, and recovery together for post-incident analysis and SLA reconciliation

## Instrumentation Contract

Example `provider_call_outcome` during a provider outage, and the resulting `failover_event`:

```json
{
  "event_name": "provider_call_outcome",
  "timestamp": "2026-07-08T17:11:02.000Z",
  "request_id": "req_e5a1",
  "provider": "primary-llm-cloud",
  "model": "gpt-4o-mini",
  "outcome": "error",
  "http_status": 503,
  "error_class": "provider_outage",
  "latency_ms": 1200,
  "failed_over_to": "secondary-llm-cloud"
}
```
```json
{
  "event_name": "failover_event",
  "incident_id": "inc_2026_07_08_01",
  "from_provider": "primary-llm-cloud",
  "to_provider": "secondary-llm-cloud",
  "trigger": "success_rate<90% over 5m",
  "auto_or_manual": "auto",
  "affected_feature": "support-triage",
  "timestamp": "2026-07-08T17:11:30.000Z"
}
```

## Implementation

Failover decision tree responders (and the automated router) follow:

```text
provider success_rate < 90% over 5m  OR  p95_latency > ceiling
      |
      +-- errors dominated by 429 + retry_after present?
      |        --> BACKOFF: honor retry_after, shed load, DO NOT full-failover
      |
      +-- errors dominated by 5xx / timeouts / connection?
               --> FAILOVER: route to fallback provider, emit failover_event,
                   PAGE on-call, open incident_id
                        |
                        +-- fallback healthy?  --> monitor, plan failback
                        +-- fallback also down? --> degrade gracefully
                                                    (cached answers / queue / friendly error)
```

```python
def route_with_failover(request):
    if health.success_rate("primary", window="5m") < 0.90 or \
       health.p95_latency("primary") > LATENCY_CEILING_MS:
        if health.dominant_error("primary") == "rate_limit":
            return backoff_and_retry("primary", request)   # not a failover
        incident = declare_incident(trigger="primary success_rate/latency")
        emit_failover_event(from_="primary", to="secondary",
                            incident_id=incident.id, auto_or_manual="auto")
        page_on_call(incident)
        return call_provider("secondary", request)
    return call_provider("primary", request)
```

## Dashboards & Alerts

- Dashboard: per-provider availability and p95 latency side by side across all configured providers
- Dashboard: failover state board — which features are on primary vs fallback, with the active `incident_id`
- Alert (page): any primary provider's 5-minute success rate below ~90% or p95 latency above the ceiling
- Alert: 429/rate-limit spike with `retry_after` present (backoff, not failover)
- Alert: running on a fallback longer than ~30 minutes without human acknowledgment

## Common Failure Modes

- **No provider-level health signal.** The outage is learned from user reports instead of a success-rate drop that could have triggered failover minutes earlier.
- **Untested failover path.** When it finally triggers, the fallback is misconfigured (wrong model name, missing key, different schema) and the failover itself fails.
- **Silent failover with no alert.** The system runs indefinitely on a weaker/costlier fallback; the quality and cost impact persists unnoticed.
- **Treating 429 as a hard outage.** Triggers a full failover when backoff and quota management were the correct, cheaper response.

## Privacy & Governance

Provider-health and failover events carry provider identity, model, HTTP status, error class, and timing — no prompt or response content — so they require no content redaction and can be shared broadly with on-call and vendor-management stakeholders. Incident records may reference affected `request_id`s for forensic joins but never their payloads. Access is limited to the on-call engineering, incident-management, and vendor-management roles; raw request payloads are never exposed to those roles. Per-call outcomes are retained 90 days for post-incident analysis and provider-SLA reconciliation; daily per-provider availability and failover-event rollups for 13 months to support vendor-reliability trending and contract review.

## Validation Checklist

- [ ] Every external provider call emits an outcome event with `provider`, `outcome`, and `http_status`
- [ ] The failover path has been tested end to end via fault injection (primary forced to 5xx), confirming the fallback actually serves valid responses
- [ ] `429`/rate-limit is handled by backoff (honoring `retry_after`), distinct from the 5xx failover path
- [ ] Every failover emits a `failover_event` and pages on-call — failover is never silent
- [ ] Latency brownouts (slow-but-successful calls) trip the same SLO as hard errors
- [ ] An alert fires if the system stays on a fallback beyond the acknowledgment window
- [ ] The incident timeline (declare → failover → recover) is reconstructable from events via `incident_id`

## Relation to the Arsenal

Specializes the general [Runbook for Agent and RAG Incidents](./runbook-for-agent-and-rag-incidents.md) to the provider-outage failure class. Its provider-health signal is a natural addition to [Alert on Quality and Cost Regressions](../monitoring-alerting/alert-on-quality-and-cost-regressions.md), and its latency ceiling aligns with [Alert on Streaming Latency SLOs](../monitoring-alerting/alert-on-streaming-latency-slos.md). Failover is typically implemented with a routing/gateway layer such as [LiteLLM](../../tools/serving-and-deployment/litellm.md), [OpenRouter](../../tools/model-layer/openrouter.md), or [Portkey](../../tools/serving-and-deployment/portkey.md), and reflects the tip [Define Fallbacks for Tool Failures](../../tips-and-tricks/agent-engineering/define-fallbacks-for-tool-failures.md) applied at the model-provider layer.

## Resources

Evidence for `verification_status: production-verified`: provider-level health monitoring, automatic failover across model providers, and distinguishing rate-limit backoff from outage failover are standard resilience practices, implemented directly by the LLM gateway/router tools referenced below, which expose per-provider fallback and health features.

- [LiteLLM](../../tools/serving-and-deployment/litellm.md)
- [OpenRouter](../../tools/model-layer/openrouter.md)
- [Portkey](../../tools/serving-and-deployment/portkey.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
