---
id: "route-simple-tasks-to-smaller-models"
title: "Classify Task Difficulty and Route Easy Requests to Cheaper Models"
category: "cost-reduction"
tags:
  - inference
  - routing
difficulty: "intermediate"
impact: "high"
time_to_implement: "2 hours"
phase: cost-and-performance
effort: hours
estimated_time: "~2 hours"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (model-routing-by-task-difficulty cost optimization)"
applies_to:
  - multi-tier-model-deployments
gotchas:
  - "This absorbs a narrower, latency-framed version of the same routing practice -- the underlying mechanism (classify difficulty, route to the cheapest model that can handle it) is the same whether the framing is cost or latency"
  - "A difficulty classifier that misroutes hard tasks to the smaller model produces silently worse answers, not an obvious error -- validate routing accuracy against a labeled set, in addition to cost savings"
  - "Routing adds an extra classification step (and its own latency/cost) before the main call -- for very low-volume features, the routing overhead can exceed the savings"
metrics: []
related_tips:
  - use-smaller-models-for-classification-steps
  - track-cost-per-successful-outcome
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Classify incoming task difficulty and route straightforward requests to a smaller, cheaper model while reserving the larger model for genuinely complex requests. Not every request needs the largest available model's capability; a classifier that reliably identifies easy cases lets you cut cost on the majority of traffic without degrading quality on the harder tail.

## Before / After

**Before:** every request, regardless of complexity, is sent to the largest available model.

**After:** a lightweight classifier (a small model or rule-based heuristic) tags each request's difficulty, routing "easy" requests to a smaller model and "hard" requests to the larger one.

## Implementation

Build or reuse a difficulty classifier (often a small model or a rule set based on request features), validate its routing accuracy against a labeled sample before deployment, and route based on its output — reserving the larger model only for requests it flags as complex.

## Gotchas

- The underlying routing mechanism is the same whether framed as a cost or latency optimization — this absorbs a narrower, latency-framed version of the same practice
- A misrouting classifier produces silently worse answers on hard tasks routed to the smaller model — validate routing accuracy, in addition to cost savings
- Routing adds its own classification step and overhead — for very low-volume features, this overhead can exceed the savings

## When NOT to Apply

- Skip this for low-volume features where the routing infrastructure overhead isn't justified by the modest absolute cost savings
- Not appropriate if you can't build or validate a difficulty classifier with acceptable accuracy — a bad classifier's quality risk outweighs the cost benefit

## Verification

Production-verified: routing simple tasks to smaller/cheaper models based on classified difficulty is a standard, widely documented cost-optimization pattern in production LLM application design.
