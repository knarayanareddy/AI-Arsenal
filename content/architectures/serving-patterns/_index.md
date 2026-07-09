---
title: "Serving Patterns Architecture Decisions"
section: "architectures/serving-patterns"
auto_generated: false
---

# Serving Patterns Architecture Decisions

## What belongs here

Decisions about how inference is served and delivered to users once a model is chosen: real-time vs batch inference, edge vs cloud deployment, caching strategies, load-balancing patterns, and rate-limiting approaches. The defining trait is that these decisions are about the request/response delivery mechanics of a system that already has a model and a system design, not about which model or approach to use.

## What does NOT belong here

Choosing which deployment platform or hosting provider to use (Modal vs Fly.io vs Bedrock) for a given serving pattern is a `tools/`-vertical comparison of implementations; this category is about *whether* to serve in real-time vs batch, at the edge vs centrally, etc., independent of vendor. A complete deployment blueprint with working infrastructure code belongs in `build-examples/production-deployment/`.

## Quick-start: highest-signal architecture decisions in this category

_No entries yet. This category folder was created during the Architectures vertical reorganisation (2026-07-06) and is queued for content in a follow-up authoring pass — see the migration completion report._

## Architecture decisions in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Serving Patterns in This Phase

### Recently Added

- [Caching LLM Workloads: Provider Prompt Caching, Gateway Response Caching, Semantic Caching, and Prefix/KV Reuse](./choose-caching-strategy.md)
- [Handling Provider Failures: Retry, Model/Provider Fallback, or a Managed Gateway](./choose-fallback-and-failover-strategy.md)
- [Choosing a Quantization Strategy: How Low Can You Go Before Quality Breaks?](./choose-quantization-strategy.md)
- [Synchronous vs Streaming vs Asynchronous: How Should the Answer Reach the User?](./choose-response-delivery-pattern.md)
- [Choosing an LLM Serving Stack: Managed API, Local Runtime, or Self-Hosted Engine](./choose-serving-stack.md)
- [Choosing a Deployment Target: Separating App Hosting From Model Serving](./choose-deployment-target.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Caching LLM Workloads: Provider Prompt Caching, Gateway Response Caching, Semantic Caching, and Prefix/KV Reuse](./choose-caching-strategy.md) — 
- [Choosing a Deployment Target: Separating App Hosting From Model Serving](./choose-deployment-target.md) — 
- [Handling Provider Failures: Retry, Model/Provider Fallback, or a Managed Gateway](./choose-fallback-and-failover-strategy.md) — 
- [Choosing a Quantization Strategy: How Low Can You Go Before Quality Breaks?](./choose-quantization-strategy.md) — 
- [Synchronous vs Streaming vs Asynchronous: How Should the Answer Reach the User?](./choose-response-delivery-pattern.md) — 
- [Choosing an LLM Serving Stack: Managed API, Local Runtime, or Self-Hosted Engine](./choose-serving-stack.md) — 
