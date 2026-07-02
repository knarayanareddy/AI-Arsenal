---
id: "separate-model-errors-from-app-errors"
title: "Log Provider, Parser, Timeout, and Business-Rule Failures as Distinct Categories"
category: "debugging-llm-apps"
tags:
  - observability
  - tracing
difficulty: "beginner"
impact: "high"
time_to_implement: "30 minutes"
phase: debugging-and-observability
effort: hours
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (error-category-taxonomy discussions for LLM apps)"
applies_to:
  - observability-pipelines
gotchas:
  - "A single generic 'request failed' error category hides whether the failure was the model provider, your parsing code, a timeout, or a business-rule rejection -- each needs a different fix and a different owner"
  - "Error categorization needs to be applied consistently at the point of failure, not reconstructed after the fact from ambiguous log messages -- retrofitting categories onto unstructured historical logs is much harder than categorizing at write time"
metrics: []
related_tips:
  - classify-failures-before-fixing-prompts
  - log-raw-and-parsed-model-outputs
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Log provider errors, output-parsing errors, timeout errors, and business-rule rejections as distinct, explicitly-tagged categories rather than a single generic failure type. Each category points to a different owner and fix (a provider outage needs a fallback, a parsing error needs a schema fix, a business-rule rejection may be correct behavior) — collapsing them into one bucket hides which fix is actually needed.

## Before / After

**Before:** `log.error("request failed")` for every failure type, with no distinction between a provider timeout, a JSON parse failure, and a legitimate business-rule rejection.

**After:** `log.error("provider_timeout", ...)`, `log.error("parse_failure", ...)`, `log.error("business_rule_rejection", ...)` — each failure type explicitly categorized at the point of failure.

## Implementation

Define an explicit set of error categories relevant to your pipeline (provider error, timeout, parse failure, business-rule rejection, at minimum), tag each failure with its category at the point it occurs, and build dashboards/alerts that break down by category rather than a single aggregate error count.

## Gotchas

- A single generic failure category hides whether the cause was the provider, your parser, a timeout, or a business rule — each needs a different fix and owner
- Categorization needs to happen at the point of failure — retrofitting categories onto unstructured historical logs is much harder

## When NOT to Apply

- Skip elaborate categorization for a very simple pipeline with only one plausible failure mode
- Not necessary if your existing structured logging framework already enforces distinct error types by convention across the codebase

## Verification

Community-reported: distinguishing provider/parser/timeout/business-rule error categories is a widely repeated recommendation in LLM application observability writeups, not independently benchmarked here against a named production system.
