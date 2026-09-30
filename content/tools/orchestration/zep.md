---
id: zep
name: Zep
type: tool
job: [memory-management]
description: "Zep Cloud's examples and integration packages for temporal knowledge-graph agent memory, with the OSS engine in Graphiti"
url: "https://github.com/getzep/zep"
cost_model: usage-based
pricing_detail: Open source or free to start
tags: [agents, evaluation]
maturity: production
stack: [python, typescript]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/getzep/zep"
docs_url: "https://help.getzep.com"
github_url: "https://github.com/getzep/zep"
alternatives: [letta, mem0, redis-memory]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, production]
best_when: ["You are building on Zep Cloud and want working examples in Python, TypeScript and Go before writing your own ingestion and retrieval code.", "You want the first-party integration packages for LangGraph, CrewAI, AutoGen, Pydantic AI or Mastra rather than wiring Zep memory yourself.", "You are evaluating whether a temporal knowledge graph beats vector search for your memory problem and want the benchmark harness to run the comparison."]
avoid_when: ["You want self-hosted Zep without a managed service, because the Community Edition is deprecated and its code has been moved to an unsupported legacy folder.", "You want to start from the open-source engine itself, because Graphiti is the repository that holds it, not this one.", "You cannot send conversation data to a hosted service, because Zep Cloud is a managed platform and the integration packages here are built around that assumption."]
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
enrichment_status: draft
---

## Overview

The zep repository is explicitly not the product: it holds example code, framework integrations and tooling for building agent memory on Zep Cloud, with official SDKs published separately as zep-cloud for Python, the npm package for TypeScript and zep-go/v3 for Go. Contents include examples across three languages, independently released integration packages, a zep-ingest bulk pipeline for Slack, documents, email, JSON or CSV and fact triples, default ontology definitions, agent plugins for Claude Code, Codex and Cursor, memory benchmarks for LoCoMo and LongMemEval, and a zep-eval-harness. The underlying open-source temporal knowledge graph framework is Graphiti.

## Why It's in the Arsenal

The decision it addresses is how to structure memory so that time is a first-class dimension. Vector search over messages answers what was said; a temporal knowledge graph records what was true, when it became true and what superseded it, which is the difference between a support agent recalling a customer's address and recalling the address they moved from. This repository is where you see that model expressed as runnable integrations against frameworks you already use.

## Key Features

- Temporal validity intervals let a system answer questions about past and current state instead of only nearest text.
- Integration packages cover Google ADK, LangGraph, CrewAI, AutoGen, AG2, Pydantic AI, Strands, Mastra and the Vercel AI SDK, releasing independently.
- Bulk ingestion beyond chat history, including Slack, documents, email and fact triples, which most memory layers do not handle.
- The open-source engine is available separately as Graphiti, so the graph approach is inspectable outside the managed tier.

## Architecture / How It Works

Ingestion extracts entities and relationships into a temporal knowledge graph, where edges carry validity intervals so superseded facts are still retrievable with their timestamps. The zep-ingest pipeline bulk-loads Slack, documents, email and structured records, and default ontology definitions constrain what entity types the graph accepts. Retrieval queries traverse that graph rather than ranking message chunks. Framework integration packages wrap a small client against Zep Cloud and release independently, with Go, Python and TypeScript coverage per framework.

## Getting Started

The official SDKs are separate packages, one per language:

```bash
pip install zep-cloud
```

```bash
npm install @getzep/zep-cloud
```

Zep Cloud itself is a signup at getzep.com; this repository supplies the examples and integrations you build against.

## Use Cases

1. Customer-support memory where an answer depends on when a fact changed, which the temporal validity intervals on graph edges are built for.
2. Bulk agent onboarding: load months of Slack, documents, email or CSV through zep-ingest rather than replaying conversations one turn at a time.
3. Framework evaluation: run LoCoMo and LongMemEval through zep-eval-harness to compare graph retrieval against a vector baseline on your own data shape.

## Strengths

It competes with mem0 and Letta in agent memory, and the axis is explicitness: Zep's temporal knowledge graph makes relationships and validity intervals first-class, while mem0's approach is embedding-centric with entity linking. It is distinct from content/projects/data-and-retrieval entries in this catalog, and graphiti is not a competitor but the open-source engine underneath, so citing one implies the other. Compared with a plain vector store, Zep answers temporal questions a vector index structurally cannot.

## Limitations / When NOT to Use

This repository is not the product, which trips people up constantly: installing from here gets you examples and integrations, not a memory server. The Community Edition is deprecated and its code sits in an unsupported legacy directory, so the self-hosted path means Graphiti rather than this project. Zep Cloud is a hosted service, so the whole design assumes your conversation data can leave your environment. And a knowledge graph is operationally heavier than a vector store: ingestion cost, ontology design and graph queries all add work a pure embedding pipeline avoids.

## Integration Patterns

This entry in content/tools/orchestration is the integration face of a memory platform; the substance sits in the graph engine and the managed service. Read it against mem0, which is the other entry in this folder with an embedding-centric memory model, and treat Graphiti as the related project rather than an alternative. Its integration packages target the frameworks in content/projects/frameworks, and the LoCoMo and LongMemEval numbers are directly comparable to the entries in content/tools/evaluation-and-observability.

## Resources

- [GitHub — getzep/zep (examples and integrations)](https://github.com/getzep/zep)
- [Zep Cloud docs — help.getzep.com](https://help.getzep.com)
- [Graphiti, the open-source temporal knowledge graph engine](https://github.com/getzep/graphiti)

## Buzz & Reception

This repo is integration glue, not the product: the temporal knowledge graph that powers Zep Cloud memory is open source separately as Graphiti.
