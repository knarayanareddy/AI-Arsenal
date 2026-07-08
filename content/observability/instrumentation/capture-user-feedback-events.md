---
id: "capture-user-feedback-events"
title: "Capture Explicit and Implicit User Feedback as Structured Events Joined to Traces"
entry_type: observability
category: instrumentation
scope: production
signal_types:
  - user-satisfaction
  - quality
verification_status: production-verified
data_sensitivity:
  - internal
  - pii
last_reviewed: "2026-07-07"

instrumentation_contract:
  sampling: "100% of explicit feedback events (thumbs, ratings, corrections); 100% of the defined implicit signal set (regeneration, copy, abandonment, edit-after-copy) — feedback is sparse enough that sampling it defeats the purpose"
  retention: "180 days for feedback events with content fields hashed or scrubbed; feedback joined into curated eval datasets is retained indefinitely under the eval-dataset governance process, not the telemetry retention"
  correlation:
    - trace_id
    - request_id
    - session_id
    - message_id
  redaction: "Free-text feedback comments are the highest-PII field in this contract and are scrubbed for known PII patterns at ingestion; user corrections (edited text) are stored only for traces already under full content capture, inheriting that pipeline's redaction rules"
  events:
    - name: "user_feedback"
      when_emitted: "When a user takes an explicit feedback action (thumbs up/down, rating, report, correction submission) on a specific model response"
      required_fields:
        - trace_id
        - message_id
        - feedback_type
        - feedback_value
        - timestamp
      optional_fields:
        - comment_text (scrubbed)
        - correction_text (scrubbed)
        - ui_surface
      pii_risk: pii
    - name: "implicit_signal"
      when_emitted: "When a user behavior from the defined implicit set occurs: regenerate requested, response copied, conversation abandoned mid-task, or copied text substantially edited"
      required_fields:
        - trace_id
        - message_id
        - signal_type
        - timestamp
      optional_fields:
        - time_to_action_ms
        - edit_distance_ratio
      pii_risk: internal

related_projects:
  - langfuse
  - opik
  - phoenix
related_tips:
  - version-your-eval-datasets
dashboards: []
alert_rules:
  - "Alert if the thumbs-down rate or regeneration rate for a given prompt_version exceeds its 7-day baseline by a configured margin over a 6-hour window — gated per prompt_version so prompt rollouts are compared against their own baseline, not the fleet's"
common_failure_modes:
  - "Collecting thumbs up/down into a product analytics tool with no trace_id, making feedback unjoinable to the prompt version, retrieved context, and model that produced the response -- the signal exists but cannot be attributed, which is indistinguishable from not having it"
  - "Treating explicit feedback as representative -- feedback rates are typically low single-digit percentages and heavily biased toward extremes, so aggregate satisfaction claims built on thumbs data alone misread the silent majority; implicit signals (regeneration, abandonment) cover the users who never click anything"
added_date: "2026-07-07"
added_by: "maintainer"
status: "active"
enrichment_status: draft
---

## Overview

User feedback is the only quality signal generated at production scale for free, and most teams throw away its value at the moment of capture: a thumbs-down stored in product analytics without a `trace_id` cannot be joined back to the prompt version, retrieved context, or model that caused it. This entry defines the event contract that makes feedback attributable and therefore actionable — as regression signal, eval-dataset source, and (eventually) preference-training data.

## What to Capture

- Explicit events: thumbs up/down, ratings, "report this answer", and user-submitted corrections — each tied to the specific `message_id` and `trace_id` it judges
- Implicit events from a small, defined set: regenerate requests (the strongest cheap negative), response copied (weak positive), conversation abandoned mid-task (weak negative), copied-then-heavily-edited (moderate negative, with `edit_distance_ratio`)
- The `ui_surface` the feedback came from, because feedback semantics differ between a chat thread, an inline suggestion, and a search result
- `time_to_action_ms` on implicit events — an instant regeneration means something different from one after careful reading
- Enough join keys (`trace_id`, `message_id`, `session_id`) that every feedback event reaches the full trace: prompt version, model, retrieved chunks, tool calls

## Instrumentation Contract

One event per feedback action, joined to the trace that produced the judged response:

```json
{
  "event_name": "user_feedback",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "message_id": "msg_0193",
  "session_id": "sess_77aa",
  "feedback_type": "thumbs",
  "feedback_value": -1,
  "ui_surface": "chat-thread",
  "comment_text": "cited the wrong policy document",
  "timestamp": "2026-07-07T09:14:02.331Z"
}
```

```json
{
  "event_name": "implicit_signal",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "message_id": "msg_0193",
  "signal_type": "regenerate",
  "time_to_action_ms": 2200,
  "timestamp": "2026-07-07T09:14:09.877Z"
}
```

## Implementation

```python
def record_feedback(trace_id, message_id, session_id, feedback_type,
                    feedback_value, comment=None, ui_surface=None, emit=None):
    emit({
        "event_name": "user_feedback",
        "trace_id": trace_id,
        "message_id": message_id,
        "session_id": session_id,
        "feedback_type": feedback_type,   # "thumbs" | "rating" | "report" | "correction"
        "feedback_value": feedback_value,
        "comment_text": scrub_pii(comment) if comment else None,
        "ui_surface": ui_surface,
        "timestamp": utc_now_iso(),
    })
```

Langfuse, Opik, and Phoenix all expose first-class score/feedback APIs (`langfuse.score(trace_id=...)` and equivalents) that implement this join for you — the essential requirement is only that the frontend threads `trace_id` and `message_id` through to wherever the feedback button lives.

## Dashboards & Alerts

- Dashboard: explicit feedback rate and thumbs-down share, segmented by `prompt_version`, `model_id`, and `ui_surface` (all obtained via the trace join, not duplicated onto the feedback event)
- Dashboard: regeneration rate and abandonment rate as the implicit-signal counterparts, on the same segmentation
- Dashboard: feedback-to-trace join success rate — the meta-metric that catches frontend changes silently dropping `trace_id`
- Alert rule: per-`prompt_version` thumbs-down or regeneration rate above its own 7-day baseline over a 6-hour window (frontmatter rule) — the fastest user-visible detector of a bad prompt rollout

## Common Failure Modes

- **Feedback without join keys.** Stored in product analytics with user/session context but no `trace_id`, feedback cannot be attributed to prompt, model, or retrieval version — the single most common way this signal is wasted.
- **Reading explicit feedback as a satisfaction survey.** Click-through rates on feedback buttons are low and extreme-biased; the defined implicit set exists to cover the silent majority, and both streams should be read as regression detectors rather than absolute satisfaction measures.

## Privacy & Governance

Free-text comments and user corrections are the `pii`-dense fields here — users type names, account numbers, and grievances into comment boxes — and are scrubbed for known PII patterns at ingestion, before storage. Feedback events retained 180 days; events promoted into curated eval datasets cross into the eval-dataset governance process (with its own review and retention rules) rather than living under telemetry retention indefinitely by accident. If feedback data may later train models (preference tuning), that use must be covered by the product's data-use terms explicitly — telemetry consent and training consent are not the same thing. Access to raw feedback events with comment/correction text is restricted to the product engineering team that owns the surface; aggregate feedback metrics are readable org-wide.

## Validation Checklist

- [ ] Every feedback event in the store joins successfully to a trace (join success rate monitored, target >99%)
- [ ] Thumbs-down events can be filtered by `prompt_version` and `model_id` in the analytics store via the trace join
- [ ] Regeneration events fire correctly and carry `time_to_action_ms` (verified against a manual session)
- [ ] PII scrubbing on `comment_text` is verified against stored production samples, not just unit tests
- [ ] A deliberately degraded prompt in staging moves the regeneration-rate metric within one window
- [ ] The eval-dataset promotion path from thumbs-down traces exists and is documented (who reviews, where it lands, per [Version Your Eval Datasets](../../tips-and-tricks/evaluation/version-your-eval-datasets.md))

## Relation to the Arsenal

The feedback join depends on the trace tree from [Trace Every Retrieval, Tool Call, and Agent Transition](../tracing/trace-every-agent-and-rag-step.md) and the per-call event from [Capture a Structured Event for Every LLM Call](./capture-the-llm-call-event.md). Downstream, feedback-flagged traces are the highest-value input to [Monitor Retrieval Quality Continuously](../evaluation-quality/monitor-retrieval-quality-in-production.md) (which judges them at 100% rather than sample rate) and to the release gates in [Gate Releases on Eval Regression](../evaluation-quality/gate-releases-on-eval-regression.md), via curated datasets maintained per [Version Your Eval Datasets](../../tips-and-tricks/evaluation/version-your-eval-datasets.md).

## Resources

Evidence for `verification_status: production-verified`: trace-joined user feedback is a first-class, documented production feature of multiple named systems in this catalog — Langfuse scores, Opik feedback scores, and Phoenix annotations all implement exactly this event-to-trace join — and the regeneration-rate-as-negative-signal pattern is standard practice in production LLM product teams' quality dashboards.

- [Langfuse](../../projects/benchmarks-and-evals/langfuse.md) — scores API joining feedback to traces
- [Opik](../../projects/benchmarks-and-evals/opik.md) — feedback scores on traces and threads
- [Phoenix](../../projects/benchmarks-and-evals/phoenix.md) — annotations on spans/traces, human and programmatic

---
*Last reviewed: 2026-07-07 by @maintainer*
