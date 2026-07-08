---
title: "Instrumentation"
section: "observability/instrumentation"
auto_generated: false
---

# Instrumentation

## What belongs here

Patterns for what to capture from an AI system: event schemas, required/optional fields, correlation IDs, sampling strategy, and redaction rules — the foundational layer every other observability category (tracing, evaluation, monitoring, cost, privacy, incident response) depends on. If an entry's primary content is "here is exactly what fields to log and when," it belongs here.

## What does NOT belong here

How those captured events are assembled into traces/spans belongs in `tracing/`. How captured signals are evaluated for quality belongs in `evaluation-quality/`. A specific tool's setup docs (e.g. "how to configure the Langfuse SDK") belong in `content/tools/`, cross-linked from here, not duplicated here.

## Start here

_To be populated once category content is authored._

## Entries in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Instrumentation in This Phase

### Recently Added

- [Capture Explicit and Implicit User Feedback as Structured Events Joined to Traces](./capture-user-feedback-events.md)
- [Capture a Structured Event for Every LLM Call, Not Just an Access Log Line](./capture-the-llm-call-event.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Capture a Structured Event for Every LLM Call, Not Just an Access Log Line](./capture-the-llm-call-event.md) — 
- [Capture Explicit and Implicit User Feedback as Structured Events Joined to Traces](./capture-user-feedback-events.md) — 
