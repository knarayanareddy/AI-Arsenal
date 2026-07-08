---
title: "Data Strategy Architecture Decisions"
section: "architectures/data-strategy"
auto_generated: false
---

# Data Strategy Architecture Decisions

## What belongs here

Decisions about how data is stored, moved, and processed at the system level: SQL vs vector vs hybrid storage, online vs offline processing, streaming vs batch pipelines, data warehouse vs data lake patterns for AI workloads. The defining trait is that these decisions shape how data flows through the system before any model is involved, and are typically expensive to reverse once a corpus or pipeline is built around them.

## What does NOT belong here

Choosing a specific vector database product (Qdrant vs Weaviate vs pgvector) is a `tools/`-vertical or `model-selection/`-adjacent comparison of implementations, not a data-strategy fork — data-strategy is about *whether* to use vector storage, streaming, or a lake pattern at all. A complete data pipeline blueprint with working code belongs in `build-examples/data-pipelines/`, not here.

## Quick-start: highest-signal architecture decisions in this category

_No entries yet. This category folder was created during the Architectures vertical reorganisation (2026-07-06) and is queued for content in a follow-up authoring pass — see the migration completion report._

## Architecture decisions in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Data Strategy in This Phase

### Recently Added

- [Choosing an Embedding Model: Managed API, Open-Weight Self-Hosted, or Domain-Adapted](./choose-embedding-model.md)
- [Choosing Vector Storage: Postgres-Native, Embedded, Self-Hosted, or Managed](./choose-vector-db.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Choosing an Embedding Model: Managed API, Open-Weight Self-Hosted, or Domain-Adapted](./choose-embedding-model.md) — 
- [Choosing Vector Storage: Postgres-Native, Embedded, Self-Hosted, or Managed](./choose-vector-db.md) — 
