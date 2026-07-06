---
id: "redact-and-govern-trace-data"
title: "Detect and Redact PII in Traces at the Gateway Boundary, Before It Reaches Any Store"
entry_type: observability
category: privacy-governance
scope: production
signal_types:
  - safety
  - reliability
verification_status: production-verified
data_sensitivity:
  - pii
  - secrets
  - regulated
last_reviewed: "2026-07-06"

instrumentation_contract:
  sampling: "100% of traces pass through the redaction layer before any persistence -- this is not a sampled control, since even one unredacted trace reaching storage is the failure this entry exists to prevent"
  retention: "Redacted traces: per-category retention as defined by the consuming observability category (14 days for content-carrying instrumentation events, 30 days for full trace trees, indefinitely for the redacted golden eval dataset); raw pre-redaction buffers: seconds to low minutes, held only in-memory or in a short-lived queue during the detect-and-redact pass, never durably persisted in raw form"
  correlation:
    - request_id
    - trace_id
    - redaction_policy_version
  redaction: "This entry IS the redaction mechanism other entries reference -- described in full below, not summarized here to avoid circularity"
  events:
    - name: "redaction_pass"
      when_emitted: "Every time a trace, prompt, response, or tool payload passes through the redaction layer, before being written to any persistent store"
      required_fields:
        - request_id
        - redaction_policy_version
        - entities_detected_count
        - status
      optional_fields:
        - entity_types_detected
        - detection_method
        - false_positive_reported
      pii_risk: internal

related_tools: []
related_projects: []
related_build_examples: []
related_tips:
  - redact-secrets-before-tracing
  - review-data-retention-for-prompts
dashboards: []
alert_rules:
  - "Alert if entities_detected_count is 0 across an entire deployment for more than 24 hours while traffic volume is nonzero -- this is far more likely to indicate the detector silently broke than that genuinely zero sensitive data appeared, and should be treated as a detector-health signal, not a good-news signal"
  - "Alert (page, not ticket) if any redaction_pass event has status: failed and the corresponding trace was persisted anyway -- this is a direct instance of the failure mode this entire entry exists to prevent"
common_failure_modes:
  - "Redacting after data is already written to the trace store instead of before, so a bug or outage in the redaction step results in raw sensitive data landing in storage anyway, and deleting it after the fact is unreliable (replicated copies, backups, cached reads)"
  - "Relying on regex-only detection for a fixed pattern list, missing PII in formats the patterns don't anticipate -- pure regex catches emails and structured IDs well but misses names, addresses, and free-text PII that requires an NER-based detector layered on top"
added_date: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: reviewed
---

## Overview

An observability system that captures prompts, tool calls, and user data for debugging can become a second, ungoverned copy of sensitive production data if its own handling of that data isn't itself governed — this is the gap the Phase 1 audit of this vertical found across every pre-existing entry (none of them mentioned redaction, retention, or access control despite discussing exactly this kind of capture). This entry is the redaction and governance mechanism that every other observability category in this catalog references rather than re-describes.

## What to Capture

- A `redaction_policy_version` on every redaction pass, so a change in redaction behavior (a new entity type added, a detector upgrade) is traceable
- `entities_detected_count` and, optionally, `entity_types_detected` — not the entities themselves, which would defeat the purpose, but metadata about what was found and removed
- A `status` field (`success`/`failed`) for the redaction pass itself — a failed redaction pass must never result in the underlying trace being persisted anyway
- The `detection_method` (regex, NER, LLM-based) when multiple layers are used, since different methods have different false-negative profiles worth tracking separately

## Instrumentation Contract

Example `redaction_pass` event:

```json
{
  "event_name": "redaction_pass",
  "timestamp": "2026-07-06T17:02:00.000Z",
  "request_id": "req_8f3a1c2b",
  "redaction_policy_version": "policy-v7",
  "entities_detected_count": 2,
  "entity_types_detected": ["EMAIL_ADDRESS", "PHONE_NUMBER"],
  "detection_method": "regex+ner",
  "status": "success"
}
```

## Implementation

The redaction pass runs at the gateway/middleware boundary — before a prompt, tool argument, or response reaches any persistence layer — using a layered detection approach (regex for structured patterns like emails/API keys, NER for free-text PII like names and addresses):

```python
from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine

analyzer = AnalyzerEngine()
anonymizer = AnonymizerEngine()

SECRET_PATTERNS = {
    "API_KEY": r"\b(sk|pk)-[A-Za-z0-9]{20,}\b",
    "AWS_KEY": r"\bAKIA[0-9A-Z]{16}\b",
}


def redact_before_persist(text: str, policy_version: str = "policy-v7") -> tuple[str, dict]:
    """Runs before ANY write to a trace/logging store. Never called after."""
    import re
    entities_found = []

    # Layer 1: regex for secrets and structured identifiers.
    for name, pattern in SECRET_PATTERNS.items():
        if re.search(pattern, text):
            text = re.sub(pattern, f"[REDACTED:{name}]", text)
            entities_found.append(name)

    # Layer 2: NER for free-text PII (names, addresses, phone numbers).
    results = analyzer.analyze(text=text, language="en")
    if results:
        anonymized = anonymizer.anonymize(text=text, analyzer_results=results)
        text = anonymized.text
        entities_found.extend([r.entity_type for r in results])

    redaction_event = {
        "event_name": "redaction_pass",
        "redaction_policy_version": policy_version,
        "entities_detected_count": len(entities_found),
        "entity_types_detected": list(set(entities_found)),
        "detection_method": "regex+ner",
        "status": "success",
    }
    emit_event(redaction_event)
    return text, redaction_event


def persist_trace(request_id: str, raw_prompt: str, raw_response: str):
    # Redact BEFORE persisting -- never the other order.
    safe_prompt, _ = redact_before_persist(raw_prompt)
    safe_response, _ = redact_before_persist(raw_response)
    trace_store.write(request_id=request_id, prompt=safe_prompt, response=safe_response)
```

## Dashboards & Alerts

- Dashboard: redaction pass volume and entity-type breakdown over time, to spot shifts in what kind of sensitive data is flowing through the system
- Dashboard: redaction pass failure rate — should be effectively zero; any nonzero rate needs investigation
- Alert rule: `entities_detected_count` is 0 across an entire deployment for more than 24 hours while traffic is nonzero — treat this as a likely detector-health failure, not good news, since real traffic almost always contains some detectable PII/secrets over that time window
- Alert rule (page): any `redaction_pass` event with `status: failed` where the corresponding trace was persisted anyway — a direct instance of this entry's core failure mode

## Common Failure Modes

- **Redacting after data is already written to the trace store instead of before.** A bug or outage in the redaction step then results in raw sensitive data landing in storage regardless, and deleting it after the fact is unreliable — replicated copies, backups, and cached reads can all retain the original. Redaction must happen at the gateway boundary, before persistence, with no code path that persists first and redacts later.
- **Relying on regex-only detection.** Regex catches structured patterns (emails, API keys, national ID formats) reliably but misses free-text PII — names, addresses, indirect identifiers — that requires an NER-based detector layered on top, per the implementation above.

## Privacy & Governance

This entry is itself the redaction and retention mechanism, so its own governance is about the redaction pipeline's integrity rather than a downstream policy referencing it: the redaction pass runs on 100% of traces (not sampled), before any persistence, using a layered regex-plus-NER detection approach; a failed redaction pass must block persistence of the corresponding trace rather than allow it through unredacted; and retention of the resulting redacted data follows whatever the consuming category specifies (14 days for content-carrying instrumentation events per [Capture a Structured Event for Every LLM Call](../instrumentation/capture-the-llm-call-event.md), 30 days for full trace trees per [Trace Every Agent and RAG Step](../tracing/trace-every-agent-and-rag-step.md), indefinitely for the redacted golden eval dataset per [Gate Releases on Eval Regression](../evaluation-quality/gate-releases-on-eval-regression.md)). Access to the brief, in-memory pre-redaction buffer (which exists only for seconds to low minutes during the detect-and-redact pass and is never durably persisted in raw form) is restricted to the redaction service process itself — no human access path exists to this buffer by design, which is a stronger control than access-controlling a durable raw copy.

## Validation Checklist

- [ ] No code path exists that persists a trace, prompt, or response before the redaction pass runs
- [ ] A failed redaction pass blocks persistence of the corresponding data, verified by a test that simulates a detector failure
- [ ] Both regex (structured patterns) and NER (free-text PII) detection layers are active, not regex alone
- [ ] `entities_detected_count` is tracked and dashboarded, with an alert for suspicious zero-detection periods
- [ ] The raw pre-redaction buffer is confirmed to be in-memory/short-lived only, verified by checking it does not appear in any durable store
- [ ] A redaction policy version is recorded on every pass, so a policy change is traceable to a specific before/after detection-rate shift
- [ ] A sample of redacted output is periodically reviewed by a human to check for both false negatives (missed PII) and false positives (over-redaction destroying debugging value)

## Relation to the Arsenal

This entry is referenced by, rather than duplicated in, every other observability category that captures potentially sensitive content: [Capture a Structured Event for Every LLM Call](../instrumentation/capture-the-llm-call-event.md), [Trace Every Agent and RAG Step](../tracing/trace-every-agent-and-rag-step.md), and [Gate Releases on Eval Regression](../evaluation-quality/gate-releases-on-eval-regression.md) each point back here for the redaction mechanics rather than restating them. Complementary tips: [Redact Secrets and Sensitive Data Before Writing to Traces](../../tips-and-tricks/debugging-and-observability/redact-secrets-before-tracing.md) and [Set an Explicit Data Retention Policy for Stored Prompts Before Launch](../../tips-and-tricks/debugging-and-observability/review-data-retention-for-prompts.md), both of which this entry operationalizes into a full playbook.

## Resources

Evidence for `verification_status: production-verified`: gateway-boundary PII detection and redaction using a layered regex-plus-NER approach (commonly implemented with Microsoft Presidio, an MIT-licensed, widely adopted open-source tool with 8,800+ GitHub stars as of 2026) is a standard, extensively documented production pattern for LLM systems handling user data, cited across multiple independent 2026 practitioner sources.

- [Microsoft Presidio PII Detection Guide (2026)](https://explainx.ai/blog/microsoft-presidio-pii-detection-anonymization-guide-2026) — the detection/anonymization library this entry's implementation is based on
- [PII Redaction for LLMs in 2026](https://pctechmag.com/2026/06/pii-redaction-for-llms-in-2026-how-to-strip-sensitive-data-before-it-leaves-your-perimeter/) — corroborates the gateway-boundary-before-persistence pattern this entry follows

---
*Last reviewed: 2026-07-06 by @maintainer*
