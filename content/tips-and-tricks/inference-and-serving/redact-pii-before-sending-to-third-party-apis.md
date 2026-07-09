---
id: "redact-pii-before-sending-to-third-party-apis"
title: "Redact PII Before Sending Prompts to Third-Party APIs"
category: "security-best-practices"
tags:
  - security
  - guardrails
  - llm
difficulty: "intermediate"
impact: "high"
time_to_implement: "half a day"
phase: inference-and-serving
effort: day
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "community reports (data-privacy / DLP practice for hosted LLM usage)"
applies_to:
  - production-llm-systems
  - chat-applications
  - rag-pipelines
gotchas:
  - "Redaction that loses the reference breaks the answer -- replace PII with stable placeholders (`<PERSON_1>`, `<EMAIL_1>`) and re-hydrate on the way back, rather than deleting it, or the model loses the entities it needs to reason about"
  - "Detectors miss things -- regex catches emails and card numbers but not names, addresses, or context-dependent identifiers, so a model/NER-based detector plus regex catches more than either alone, and neither is perfect"
  - "PII also arrives via retrieved documents and tool outputs, not only the user's message -- redact on every path that reaches the third-party API, not only the chat input box"
metrics: []
related_tips:
  - redact-secrets-before-tracing
  - treat-retrieved-text-as-untrusted
  - use-local-models-for-sensitive-prototyping
added_date: "2026-07-09"
added_by: maintainer
last_reviewed: "2026-07-09"
enrichment_status: draft
---

## What & Why

When you call a hosted LLM API, the prompt leaves your trust boundary. If prompts can contain personal data (names, emails, account IDs, health/financial details), detect and mask it before the request, then re-insert it in the response if needed. This limits regulatory exposure (GDPR/CCPA/HIPAA) and the blast radius if the request is logged, cached, or breached provider-side.

## Before / After

**Before:** the raw user turn plus retrieved context is sent verbatim: `client.responses.create(input=user_text + context)`.

**After:** a redaction pass replaces detected PII with stable placeholders before the call — `"email <EMAIL_1> about order <ORDER_1>"` — and a re-hydration pass swaps the real values back into the model's answer for the end user.

## Implementation

Insert a redaction step in the request path that runs a PII detector (regex for structured identifiers plus an NER/model-based detector for names/addresses), replaces each match with a stable, reversible placeholder, and stores the mapping for the request's duration only. Re-hydrate placeholders in the response before returning it. Apply the same step to retrieved chunks and tool outputs, and keep the mapping in short-lived storage, never in long-term logs.

## Gotchas

- Redaction that loses the reference breaks the answer — replace PII with stable placeholders (`<PERSON_1>`, `<EMAIL_1>`) and re-hydrate on the way back, rather than deleting it, or the model loses the entities it needs to reason about
- Detectors miss things — regex catches emails and card numbers but not names, addresses, or context-dependent identifiers, so a model/NER-based detector plus regex catches more than either alone, and neither is perfect
- PII also arrives via retrieved documents and tool outputs, not only the user's message — redact on every path that reaches the third-party API, not only the chat input box

## When NOT to Apply

- If you run the model fully in your own trust boundary (self-hosted, no data leaving), the third-party exposure this addresses doesn't exist — though internal logging/retention controls still apply
- If a data-processing agreement plus provider zero-retention already satisfies your compliance obligations, redaction may be optional — but it still reduces breach blast radius, so weigh it

## Verification

Community-reported: pre-send PII redaction / DLP for hosted LLM calls is standard data-privacy practice, offered by several LLM gateways and guardrail libraries. Not tied to a specific named deployment here, so flagged `enrichment_status: draft`.
