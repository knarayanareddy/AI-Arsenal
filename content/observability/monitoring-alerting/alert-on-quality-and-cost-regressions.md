---
id: "alert-on-quality-and-cost-regressions"
title: "Alert on SLO Burn Rate, Not Raw Thresholds, for Latency, Cost, and Quality Regressions"
entry_type: observability
category: monitoring-alerting
scope: production
signal_types:
  - latency
  - cost
  - quality
  - reliability
verification_status: community-reported
data_sensitivity:
  - internal
last_reviewed: "2026-07-06"

instrumentation_contract:
  sampling: "100% of aggregate metrics (latency percentiles, error rate, cost per feature, eval pass rate) computed from the underlying trace/event data defined in instrumentation/capture-the-llm-call-event.md; no separate sampling decision needed since these are rollups, not raw event capture"
  retention: "13 months of daily rollup metrics (for year-over-year comparison and seasonal baseline calculation); 90 days of 5-minute-resolution metrics for incident investigation"
  correlation:
    - feature_name
    - model
    - prompt_version
    - deployment_environment
  redaction: "Aggregate metrics (percentiles, rates, counts) carry no prompt/response content and require no redaction; only the underlying per-request events they're computed from (see instrumentation/capture-the-llm-call-event.md) carry that risk"
  events:
    - name: "slo_evaluation"
      when_emitted: "On a fixed schedule (e.g. every 5 minutes) per (feature, model) pair, evaluating current rolling-window metrics against their SLO thresholds"
      required_fields:
        - feature_name
        - metric_name
        - current_value
        - threshold_value
        - burn_rate
      optional_fields:
        - deployment_environment
        - triggered_alert_id
      pii_risk: internal

related_tools:
  - langfuse
related_projects:
  - braintrust
related_build_examples:
  - intermediate-production-rag-api
related_tips:
  - measure-first-token-latency
  - measure-queue-time-separately
dashboards: []
alert_rules:
  - "Page on-call if the latency SLO's error budget burn rate exceeds 14.4x over a 1-hour window (equivalent to exhausting a 30-day budget in ~2 hours) -- a fast-burn signal requiring immediate response"
  - "Open a ticket (not a page) if the latency SLO's burn rate exceeds 3x over a 6-hour window -- a slow-burn signal requiring investigation within the day, not immediate response"
  - "Alert if cost-per-feature-request moves more than 2 standard deviations above its 14-day rolling baseline for 3 consecutive evaluation windows"
  - "Alert if eval pass rate (from evaluation-quality/gate-releases-on-eval-regression.md's CI gate, applied continuously to a sampled slice of production traffic) drops more than 10 percentage points below its 7-day rolling baseline"
common_failure_modes:
  - "Alerting on a fixed raw threshold (e.g. 'p95 latency > 2000ms') instead of a burn-rate-against-SLO calculation, producing constant noisy alerts during naturally higher-traffic periods and missing genuinely severe but proportionally smaller regressions on quieter days"
  - "Monitoring only latency and cost while treating quality and safety as secondary, creating a blind spot where a quality regression (a prompt change that degrades answer accuracy) ships and is only caught by user complaints, not monitoring"
added_date: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: draft
enrichment_notes: "verification_status is honestly community-reported, not production-verified: burn-rate SLO alerting is standard SRE practice, applied here to LLM signals, but not independently confirmed against one named production AI system by an Arsenal maintainer."
---

## Overview

Detection is the layer between instrumentation/tracing (which capture what happened) and incident response (which acts once something is known to be wrong) — this entry is about turning captured signals into alerts that page the right person at the right time, not so often that alerts get ignored, and not so rarely that a real regression goes unnoticed for hours. The single most important design choice here is alerting on SLO error-budget burn rate rather than a fixed raw threshold, which adapts to natural traffic variation instead of firing constantly during busy periods and missing proportionally severe issues during quiet ones.

## What to Capture

- Rolling-window latency percentiles (p50/p95/p99) per (feature, model) pair, not a single global latency number
- Cost per feature request against its own rolling baseline, not an absolute dollar figure that doesn't account for legitimate traffic growth
- Eval pass rate against a stable-period baseline, sampled continuously on production traffic, not only run once before each deployment
- Error rate broken out by failure type (timeout, rate limit, provider error, application error) — a single "error rate" number hides which failure mode is actually occurring
- The burn rate of each SLO's error budget, computed as (actual failure rate) / (SLO's allowed failure rate), not the raw failure rate alone

## Instrumentation Contract

The `slo_evaluation` event is a periodic rollup computed from the underlying per-request events already captured (see [Capture a Structured Event for Every LLM Call](../instrumentation/capture-the-llm-call-event.md)), not a new capture point on the request path itself. Example payload for a latency SLO check:

```json
{
  "event_name": "slo_evaluation",
  "timestamp": "2026-07-06T15:00:00.000Z",
  "feature_name": "support-triage",
  "metric_name": "latency_p95_ms",
  "current_value": 2340,
  "threshold_value": 2000,
  "burn_rate": 16.2,
  "deployment_environment": "production",
  "triggered_alert_id": "alert_7f2a"
}
```

A `burn_rate` above 1.0 means the error budget is being consumed faster than the SLO's target window allows; the specific alert-routing thresholds (14.4x for a fast-burn page, 3x for a slow-burn ticket) follow the widely used multi-window burn-rate alerting pattern from SRE practice, adapted here to LLM-specific SLOs (latency, cost, quality) rather than only classic availability SLOs.

## Implementation

```python
from dataclasses import dataclass
from datetime import datetime, timedelta

@dataclass
class SLOConfig:
    feature_name: str
    metric_name: str
    threshold_value: float
    budget_window_days: int = 30


def compute_burn_rate(current_value: float, slo: SLOConfig, window_hours: float) -> float:
    """
    Burn rate: how fast the error budget is being consumed relative to the
    rate that would exactly exhaust it over the full budget_window_days.
    """
    allowed_fraction_per_window = window_hours / (slo.budget_window_days * 24)
    actual_fraction_exceeded = max(0.0, (current_value - slo.threshold_value) / slo.threshold_value)
    if allowed_fraction_per_window == 0:
        return 0.0
    return actual_fraction_exceeded / allowed_fraction_per_window


def evaluate_slo(slo: SLOConfig, current_value: float, window_hours: float) -> dict:
    burn_rate = compute_burn_rate(current_value, slo, window_hours)
    return {
        "event_name": "slo_evaluation",
        "timestamp": datetime.utcnow().isoformat(),
        "feature_name": slo.feature_name,
        "metric_name": slo.metric_name,
        "current_value": current_value,
        "threshold_value": slo.threshold_value,
        "burn_rate": burn_rate,
    }


# Fast-burn: page immediately.
FAST_BURN_THRESHOLD = 14.4  # 1-hour window
# Slow-burn: ticket, investigate within the day.
SLOW_BURN_THRESHOLD = 3.0   # 6-hour window
```

## Dashboards & Alerts

- Dashboard: per-feature SLO status (latency, cost, quality) with current burn rate and remaining error budget for the current window
- Dashboard: cost-per-feature-request trend against its 14-day rolling baseline, annotated with deployment events so a cost spike can be correlated with a specific release
- Alert rule: page on-call if any SLO's burn rate exceeds 14.4x over a 1-hour window (fast burn, budget exhausted in ~2 hours at that rate)
- Alert rule: open a ticket (not a page) if burn rate exceeds 3x over a 6-hour window (slow burn, investigate within the day)
- Alert rule: cost-per-feature-request more than 2 standard deviations above its 14-day baseline for 3 consecutive windows
- Alert rule: eval pass rate drops more than 10 percentage points below its 7-day baseline

## Common Failure Modes

- **Alerting on a fixed raw threshold instead of burn rate.** A fixed "p95 > 2000ms" alert fires constantly during legitimately higher-traffic periods and can miss a smaller, proportionally severe regression during quiet periods — burn-rate calculation normalizes for this by comparing against the SLO's own allowed budget, not an absolute number.
- **Monitoring only latency and cost while treating quality as secondary.** This creates a blind spot where a quality-degrading prompt or model change ships and is caught only by user complaints, not monitoring — quality and safety signals need the same alerting rigor as performance metrics, not an afterthought status.

## Privacy & Governance

This category's own data (aggregate metrics — percentiles, rates, counts, burn rates) carries no prompt or response content and requires no redaction; the underlying per-request events these rollups are computed from carry that risk and are governed separately, per [Redact and Govern Trace Data](../privacy-governance/redact-and-govern-trace-data.md). Rollup metrics are retained for 13 months (to support year-over-year and seasonal baseline comparison) since they contain no sensitive content, while the higher-resolution 5-minute metrics used for incident investigation are retained for only 90 days. Access to the monitoring dashboards themselves can be broader than access to raw trace content, since aggregate metrics carry substantially lower sensitivity — but dashboard drill-downs that link into individual trace content must still respect the trace-level access controls defined in the instrumentation and tracing entries.

## Validation Checklist

- [ ] SLO thresholds are defined and agreed upon for latency, cost, and quality, not just latency alone
- [ ] Alerts fire based on burn rate against a defined budget window, not a fixed raw threshold
- [ ] Fast-burn and slow-burn thresholds route to different response urgency (page vs. ticket), not the same channel
- [ ] Cost-per-feature baselines are recalculated on a rolling window, not fixed once and never updated
- [ ] Eval pass rate is monitored continuously on a sampled slice of production traffic, not only checked once before each deployment
- [ ] Every alert includes enough context (feature, model, prompt version, recent deployment) to support fast diagnosis without an additional lookup step
- [ ] A dry run of each alert rule against historical data confirms it would have fired for a known past incident and would not have fired constantly during normal operation

## Relation to the Arsenal

Consumes the trace/event data captured by [Capture a Structured Event for Every LLM Call](../instrumentation/capture-the-llm-call-event.md) and [Trace Every Agent and RAG Step](../tracing/trace-every-agent-and-rag-step.md). Its eval-pass-rate signal is produced by the CI gate described in [Gate Releases on Eval Regression](../evaluation-quality/gate-releases-on-eval-regression.md), applied continuously rather than only at deploy time. When an alert here fires, [Runbook for Agent and RAG Incidents](../incident-response/runbook-for-agent-and-rag-incidents.md) is the next step. Complementary tips: [Measure First-Token Latency](../../tips-and-tricks/cost-and-performance/measure-first-token-latency.md) and [Measure Queue Time Separately](../../tips-and-tricks/cost-and-performance/measure-queue-time-separately.md).

## Resources

- [What is LLM Monitoring? (Braintrust, 2026)](https://www.braintrust.dev/articles/what-is-llm-monitoring) — "alerting works best when tied to SLO burn rates rather than raw thresholds," corroborating this entry's core design choice
- [How to Track LLM Costs (2026)](https://www.braintrust.dev/articles/how-to-track-llm-costs-2026) — feature-level cost alerting and kill-switch patterns referenced above
- [Braintrust](../../projects/benchmarks-and-evals/braintrust.md)
- [Langfuse](../../projects/benchmarks-and-evals/langfuse.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
