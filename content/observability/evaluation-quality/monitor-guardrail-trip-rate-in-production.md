---
id: "monitor-guardrail-trip-rate-in-production"
title: "Monitor Guardrail Trip Rate as a First-Class Quality Signal, Because a Guardrail That Never Fires and One That Fires Constantly Are Both Broken"
entry_type: observability
category: evaluation-quality
scope: production
signal_types:
  - safety
  - quality
  - reliability
verification_status: production-verified
data_sensitivity:
  - internal
  - pii
last_reviewed: "2026-07-08"

instrumentation_contract:
  sampling: "100% of guardrail evaluations for the outcome fields (guardrail_name, decision, stage) -- a trip is a safety-relevant event and sampling would blind you to rare-but-critical blocks; the flagged content snippet is captured only on blocks/flags and only after redaction, never on the pass path"
  retention: "90 days of per-evaluation guardrail outcomes for incident forensics and false-positive review; 13 months of daily trip-rate and decision-distribution rollups per guardrail for trend and drift analysis"
  correlation:
    - request_id
    - trace_id
    - guardrail_name
    - prompt_version
    - user_id
  redaction: "The optional flagged_snippet is the highest-risk field, since content that trips a safety guardrail (PII, prompt-injection payloads, unsafe requests) is by definition sensitive; it is captured only on block/flag decisions, truncated, and passed through secret/PII scrubbing before storage, and access is restricted to the trust-and-safety review boundary rather than general engineering"
  events:
    - name: "guardrail_evaluation"
      when_emitted: "Every time a guardrail runs, on both input (pre-model) and output (post-model) stages, recording the decision regardless of whether it passed, flagged, or blocked"
      required_fields:
        - request_id
        - guardrail_name
        - stage
        - decision
        - latency_ms
      optional_fields:
        - trace_id
        - prompt_version
        - rule_id
        - confidence
        - flagged_snippet
        - user_id
      pii_risk: pii
related_tools:
  - guardrails-ai
  - nemo-guardrails
related_projects: []
related_tips:
  - validate-tool-arguments-before-execution
related_build_examples: []
dashboards:
  - "Trip rate per guardrail over time (fraction of evaluations that flag or block), split by input vs output stage, so a sudden rise or a drop to zero is immediately visible"
  - "Decision distribution per guardrail (pass / flag / block) and per prompt_version, so a prompt change that starts tripping a guardrail more or less often is attributable"
alert_rules:
  - "Alert if any guardrail's trip rate drops to zero over a rolling day when it has historically fired, since a guardrail that suddenly never fires usually means it silently broke (a dependency error being swallowed as 'pass') rather than that the world got safer"
  - "Alert if any guardrail's block rate spikes above a per-guardrail threshold (e.g. 3x its trailing 7-day baseline) within an hour, indicating either an attack, a prompt regression producing unsafe output, or an over-eager rule change causing mass false positives"
common_failure_modes:
  - "Treating guardrail failures (the guardrail's own dependency erroring or timing out) as a pass, so the guardrail silently stops protecting anything while every dashboard shows green -- fail-open on an evaluation error must itself be recorded and alerted, distinct from a genuine pass"
  - "Only counting blocks and never flags or passes, so you cannot compute a trip rate or detect drift; the denominator (total evaluations) is as important as the numerator"
  - "Logging the raw content that tripped a safety guardrail without redaction, turning the safety log into the single most sensitive data store in the system and a liability of its own"
added_date: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: draft
---

## Overview

Guardrails — input filters, output validators, PII detectors, injection classifiers, schema validators — are only useful if you can see them working. Two failure shapes are common and both are silent: a guardrail that quietly stopped firing (its model dependency started erroring and the error was swallowed as "pass"), and a guardrail that started firing on everything (an over-eager rule change producing mass false positives that push users onto degraded fallback paths). Neither raises an application error. This entry makes guardrail behavior a measured, alertable quality signal rather than a black box you assume is fine.

## What to Capture

- `guardrail_name` and `stage` (`input` pre-model vs `output` post-model) on every evaluation — the same guardrail behaves differently at each stage and they must be counted separately
- `decision` as a three-way `pass` / `flag` / `block` (plus a distinct `error` when the guardrail itself failed), never a bare boolean — the denominator of total evaluations is what makes trip rate computable
- `latency_ms` — guardrails sit on the critical path, and a slow guardrail is a latency regression in disguise
- `rule_id` / `confidence` where the guardrail is rule- or model-based, so you can see *which* rule fired and how confidently
- `flagged_snippet` (optional, redacted, block/flag only) — a truncated, scrubbed excerpt for forensic review, never captured on the pass path
- An explicit `error` decision when the guardrail's own dependency times out or errors, so fail-open behavior is visible rather than masquerading as a pass

## Instrumentation Contract

Example `guardrail_evaluation` event on the output stage:

```json
{
  "event_name": "guardrail_evaluation",
  "timestamp": "2026-07-08T15:20:44.000Z",
  "request_id": "req_a71b0c33",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "guardrail_name": "pii-output-filter",
  "stage": "output",
  "decision": "block",
  "rule_id": "email-address",
  "confidence": 0.98,
  "latency_ms": 34,
  "prompt_version": "support-triage-v4",
  "flagged_snippet": "...contact me at [REDACTED-EMAIL]..."
}
```

Trip-rate and health math:

```text
trip_rate   = (flags + blocks) / total_evaluations
error_rate  = errors / total_evaluations   # fail-open exposure
block_rate  = blocks / total_evaluations
# a guardrail is 'silently broken' when error_rate rises while trip_rate falls to ~0
```

## Implementation

```python
from enum import Enum
from dataclasses import dataclass


class Decision(str, Enum):
    PASS = "pass"
    FLAG = "flag"
    BLOCK = "block"
    ERROR = "error"


@dataclass
class GuardrailEvaluation:
    request_id: str
    guardrail_name: str
    stage: str          # "input" | "output"
    decision: Decision
    latency_ms: float
    rule_id: str | None = None
    confidence: float | None = None
    flagged_snippet: str | None = None


def run_guardrail(name, stage, check, text, redact) -> GuardrailEvaluation:
    start = now_ms()
    try:
        result = check(text)  # may call a model or rules engine
        decision = Decision.BLOCK if result.blocked else (
            Decision.FLAG if result.flagged else Decision.PASS)
        snippet = redact(result.excerpt) if decision in (Decision.FLAG, Decision.BLOCK) else None
    except Exception:
        # Fail-open is a policy choice, but it MUST be recorded as ERROR,
        # never silently downgraded to PASS.
        decision, snippet = Decision.ERROR, None
    ev = GuardrailEvaluation(
        request_id=request_id_var.get(), guardrail_name=name, stage=stage,
        decision=decision, latency_ms=now_ms() - start, snippet=snippet)
    write_observability_event(ev)
    return ev
```

## Dashboards & Alerts

- Dashboard: trip rate per guardrail over time, split by input vs output stage
- Dashboard: decision distribution (pass/flag/block/error) per guardrail and per `prompt_version`
- Dashboard: guardrail latency percentiles, since guardrails are on the critical path
- Alert rule: a historically-firing guardrail's trip rate drops to zero over a rolling day (silently broken)
- Alert rule: a guardrail's block rate spikes above ~3x its trailing 7-day baseline within an hour (attack, regression, or over-eager rule)
- Alert rule: `error_rate` (fail-open exposure) for any guardrail exceeds a small threshold

## Common Failure Modes

- **Swallowing guardrail errors as passes.** The guardrail silently stops protecting anything while dashboards stay green; fail-open must be recorded as `error` and alerted.
- **Counting only blocks.** Without flags and passes there is no denominator, so trip rate and drift are uncomputable.
- **Logging raw tripped content unredacted.** The safety log becomes the most sensitive store in the system and a liability in its own right.

## Privacy & Governance

`flagged_snippet` is the highest-risk field in this contract: content that trips a safety guardrail (PII, injection payloads, unsafe requests) is sensitive by definition. It is captured only on flag/block decisions, truncated, passed through PII/secret scrubbing before storage, and access is limited to a trust-and-safety review boundary rather than general engineering. The pass path never captures content. Per-evaluation outcomes are retained 90 days for false-positive review and incident forensics; daily trip-rate and decision-distribution rollups (counts only, no content) for 13 months. This data classification is `pii` precisely because the flagged snippet can contain it even after best-effort redaction.

## Validation Checklist

- [ ] Every guardrail run emits an evaluation event, including on the pass path (so trip rate has a denominator)
- [ ] Guardrail self-errors are recorded as a distinct `error` decision, never downgraded to `pass`
- [ ] Input-stage and output-stage evaluations are counted separately per guardrail
- [ ] `flagged_snippet` is captured only on flag/block, is truncated, and is redacted before storage (verified by attempting to log a known secret and confirming it is scrubbed)
- [ ] The "trip rate dropped to zero" alert has been dry-run against a simulated guardrail outage
- [ ] The block-rate spike alert does not fire on normal traffic but does fire in a red-team burst test
- [ ] Access to the flagged-snippet store is restricted to the trust-and-safety boundary, verified by an access review

## Relation to the Arsenal

Complements [Monitor Retrieval Quality in Production](./monitor-retrieval-quality-in-production.md) and [Gate Releases on Eval Regression](./gate-releases-on-eval-regression.md) by covering the safety dimension of quality rather than relevance or accuracy. Its block/error signal is a natural input to [Alert on Quality and Cost Regressions](../monitoring-alerting/alert-on-quality-and-cost-regressions.md), and a guardrail-trip spike is a common trigger for the [Runbook for Agent and RAG Incidents](../incident-response/runbook-for-agent-and-rag-incidents.md). Instrumented with tools such as [Guardrails AI](../../tools/evaluation-and-observability/guardrails-ai.md) and [NeMo Guardrails](../../tools/evaluation-and-observability/nemo-guardrails.md), and supports the tip [Validate Tool Arguments Before Execution](../../tips-and-tricks/agent-engineering/validate-tool-arguments-before-execution.md).

## Resources

Evidence for `verification_status: production-verified`: measuring guardrail firing rates, distinguishing fail-open errors from genuine passes, and alerting on both zero-firing and spike conditions are established practices in production LLM safety engineering, directly supported by the block/flag/pass outcomes exposed by the guardrail libraries referenced below.

- [Guardrails AI](../../tools/evaluation-and-observability/guardrails-ai.md)
- [NeMo Guardrails](../../tools/evaluation-and-observability/nemo-guardrails.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
