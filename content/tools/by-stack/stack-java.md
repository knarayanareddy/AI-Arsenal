---
id: "stack-java"
title: "Tools by Stack — Java"
entry_type: "guide"
section: "tools"
description: "Tools in the Arsenal filtered by Stack facet Java, with an auto-generated routing table that keeps this page current"
tags:
  - llm
  - data
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

The shortlist for a JVM codebase, filtered to what fits an existing Spring or similar deployment. The defining constraint is memory: on-JVM inference is credible at some model sizes but competes with a heap tuned for request latency, which is the failure mode to watch.

## Why It's in the Arsenal

An existing JVM deployment constrains the options severely, and the honest answer is often that the ML work belongs behind a service boundary rather than in the heap. Grouping by stack makes the memory trade of on-JVM inference visible before someone tries it in a latency-tuned process.

## Key Features

- Every entry fits an existing JVM deployment, which is the constraint that removes most ML options outright.
- On-JVM memory requirements are stated where applicable, because they compete with a latency-tuned heap.
- Entries that wrap an HTTP API say so, so the service boundary is visible before you design around it.

## Architecture / How It Works

Each entry records its JVM memory profile where it runs on-JVM, because that is the number that determines whether it is safe in a latency-tuned heap. The page is generated from the stack facet, and the sizing detail lives in the tool entry.

## Getting Started

Pick a tool from the table below and validate it with a small proof of concept before adoption.

## Use Cases

1. **Scenario**: you are adding AI capability to a Spring service and need to know how the options fit an existing JVM deployment.
2. **Scenario**: you are deciding whether an on-JVM inference runtime is acceptable for your latency and memory budget.
3. **Scenario**: you are standardising on a JVM stack and need tooling that does not require a separate Python service for the hot path.

## Strengths

- Filters to what fits an existing JVM deployment, which is the constraint that removes most ML options outright.
- Treats on-JVM inference honestly: credible at some model sizes, memory-hungry, and in tension with a latency-tuned JVM.
- Makes the service-boundary question explicit, since most JVM options wrap an API rather than embed a model.

## Limitations / When NOT to Use

- On-JVM inference runtimes exist and are credible for some model sizes, but they are memory-hungry and compete with the JVM heap in ways that need sizing before commitment.
- The JVM ecosystem here tends to wrap HTTP APIs rather than embed models, so the architectural question is usually service boundary rather than library choice.
- GC pressure from large inference workloads interacts badly with a JVM tuned for request latency, which is the failure mode to watch.

## Integration Patterns

- Link a JVM-native option here from Spring-oriented build examples and from serving entries with an on-JVM path.
- When an option's JVM memory requirements change, revisit the sizing guidance in the entries that cite it.

## Resources

- Linked tool entries in the table below carry the authoritative detail

## Buzz & Reception

This page is a maintained routing surface; the tool table below is auto-refreshed and is not a popularity ranking.

<!-- AUTO-GENERATED TOOL TABLE BELOW — do not edit -->
| Tool | Phase | Jobs | Cost model | Free tier | Self-hostable | Open source | Stack | Verdict |
|---|---|---|---|---|---|---|---|---|
| [Airbyte](../data-ingestion/airbyte.md) | data ingestion | data-labeling, web-scraping | open-source | Yes | Yes | Yes | java, python | solid-choice |
| [Elasticsearch](../data-ingestion/elasticsearch.md) | data ingestion | vector-search | freemium | Yes | Yes | Yes | java | solid-choice |
| [Vespa](../data-ingestion/vespa.md) | data ingestion | vector-search | open-source | Yes | Yes | Yes | java, cpp | solid-choice |
