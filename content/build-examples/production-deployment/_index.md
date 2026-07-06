---
title: "Production Deployment Build Examples"
section: "build-examples/production-deployment"
auto_generated: false
---

# Production Deployment Build Examples

## What belongs here

End-to-end blueprints where the primary challenge is deployment and serving infrastructure around an AI system that already works: inference server setup, load balancing, API gateway configuration, an observability stack, cost monitoring, and A/B testing pipelines. The defining trait is that the hard, novel engineering is in the serving/ops layer, not in the AI system's core logic.

## What does NOT belong here

If the build is primarily about getting a RAG pipeline or agent working correctly and it happens to include a Docker file and a deploy step, it stays in `rag-systems/` or `agent-systems/` — deployment concerns there are secondary. A single tip about batching, caching, or timeout handling for a serving layer that doesn't require a full working deployment belongs in `tips-and-tricks/inference-and-serving/`, not here. Choosing a deployment target in the abstract (Modal vs. Fly.io vs. Bedrock) is a decision tree — see `architectures/decision-trees/choose-deployment-target.md` — not a build example.

## Quick-start: highest-signal build examples in this phase

_No entries yet. This phase folder was created during the Build Examples vertical reorganisation (2026-07-06) and is queued for content in a follow-up authoring pass — see the migration completion report._

## Build examples in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->
