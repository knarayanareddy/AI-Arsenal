---
title: "Tracing"
section: "observability/tracing"
auto_generated: false
---

# Tracing

## What belongs here

Patterns for assembling captured events (see `instrumentation/`) into traces and spans that show the sequence of model calls, retrieval calls, tool calls, and agent-graph transitions that produced a given output — including OpenTelemetry/OpenInference-style span conventions and agent-graph-specific tracing patterns.

## What does NOT belong here

What fields to capture in the first place belongs in `instrumentation/`. Turning traces into dashboards and alert thresholds belongs in `monitoring-alerting/`. A specific vendor's tracing product comparison belongs in `content/tools/` or `content/architectures/evaluation-strategy/`, not here — this category is about the tracing *pattern*, not which product implements it.

## Start here

_To be populated once category content is authored._

## Entries in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Tracing in This Phase

### Recently Added

- [Trace Every Retrieval, Tool Call, and Agent Transition as a Child Span, Not Just the Final Answer](./trace-every-agent-and-rag-step.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Trace Every Retrieval, Tool Call, and Agent Transition as a Child Span, Not Just the Final Answer](./trace-every-agent-and-rag-step.md) — 
