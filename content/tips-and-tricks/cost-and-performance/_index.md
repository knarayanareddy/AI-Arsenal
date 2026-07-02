---
title: "Cost and Performance Tips & Tricks"
section: "tips-and-tricks/cost-and-performance"
auto_generated: false
---

# Cost and Performance Tips & Tricks

## What belongs here

Interventions for token budgeting, model selection for cost, caching strategies, request batching, and prompt compression at the application-feature level -- optimizing what an LLM application spends and how fast it feels to users, independent of the underlying inference/serving infrastructure.

## What does NOT belong here

A tip about batching, caching, or quantization at the serving/inference-engine layer belongs in `inference-and-serving/`, even though it's related to cost, since the mechanism operates at a different layer. Redesigning an entire cost-governance or FinOps system for LLM spend is a disguised architecture decision and belongs in `build-examples/` or `architectures/`, not here.

## Quick-start: highest impact tips in this phase

- [Classify Task Difficulty and Route Easy Requests to Cheaper Models](./route-simple-tasks-to-smaller-models.md) — send straightforward requests to a smaller model without degrading quality on hard cases
- [Track Cost Per Successful Outcome, Not Just Cost Per Model Call](./track-cost-per-successful-outcome.md) — measure the true cost of a resolved task, including retries and failures
- [Cache Answers for Semantically Similar Repeated Questions](./use-semantic-cache-for-repeated-questions.md) — skip generation entirely for near-duplicate queries in high-repeat-rate workloads

## Tips in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Cost And Performance in This Phase

### Recently Added

- [Cache Embeddings Keyed by Content Hash to Avoid Duplicate Calls](./cache-embeddings-by-content-hash.md)
- [Compress or Filter Retrieved Chunks When Context Cost Dominates](./compress-retrieved-context-before-generation.md)
- [Keep Only Relevant Conversation History, Not the Whole Transcript](./drop-unused-conversation-history.md)
- [Measure Time-to-First-Token Separately From Total Generation Time](./measure-first-token-latency.md)
- [Measure Queue Time Separately From Model Generation Time](./measure-queue-time-separately.md)
- [Run Independent Retrieval or Tool Calls Concurrently, Not Sequentially](./parallelize-independent-retrieval-calls.md)
- [Precompute Summaries, Embeddings, and Metadata Offline Instead of at Request Time](./precompute-expensive-static-context.md)
- [Classify Task Difficulty and Route Easy Requests to Cheaper Models](./route-simple-tasks-to-smaller-models.md)
- [Set a Maximum Input/Output Token Budget Per Feature and Alert on Overruns](./set-token-budgets-per-feature.md)
- [Track LLM Cost Broken Down Per Feature, Not Only in Aggregate](./track-cost-per-feature.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Cache Embeddings Keyed by Content Hash to Avoid Duplicate Calls](./cache-embeddings-by-content-hash.md) — 
- [Use Prompt Caching for Long, Stable System Prompt Prefixes](./cache-stable-system-prompts.md) — 
- [Compress or Filter Retrieved Chunks When Context Cost Dominates](./compress-retrieved-context-before-generation.md) — 
- [Keep Only Relevant Conversation History, Not the Whole Transcript](./drop-unused-conversation-history.md) — 
- [Measure Time-to-First-Token Separately From Total Generation Time](./measure-first-token-latency.md) — 
- [Measure Queue Time Separately From Model Generation Time](./measure-queue-time-separately.md) — 
- [Run Independent Retrieval or Tool Calls Concurrently, Not Sequentially](./parallelize-independent-retrieval-calls.md) — 
- [Precompute Summaries, Embeddings, and Metadata Offline Instead of at Request Time](./precompute-expensive-static-context.md) — 
- [Classify Task Difficulty and Route Easy Requests to Cheaper Models](./route-simple-tasks-to-smaller-models.md) — 
- [Set a Maximum Input/Output Token Budget Per Feature and Alert on Overruns](./set-token-budgets-per-feature.md) — 
- [Track LLM Cost Broken Down Per Feature, Not Only in Aggregate](./track-cost-per-feature.md) — 
- [Track Cost Per Successful Outcome, Not Just Cost Per Model Call](./track-cost-per-successful-outcome.md) — 
- [Cache Answers for Semantically Similar Repeated Questions](./use-semantic-cache-for-repeated-questions.md) — 
- [Use Small Models or Rules for Routing, Classification, and Extraction Sub-Steps](./use-smaller-models-for-classification-steps.md) — 
