---
id: graphiti
name: "Graphiti"
version_tracked: null
artifact_type: framework
category: rag
subcategory: vector-databases
description: "Framework for temporal knowledge graphs that track how facts change over time with provenance, incremental updates and hybrid retrieval"
github_url: "https://github.com/getzep/graphiti"
license: Apache-2.0
primary_language: Python
org_or_maintainer: "Zep AI"
tags: [retrieval, agents]
maturity: production
cost_model: open-source
github_stars: 31273
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-09-28"
docs_url: "https://help.getzep.com/graphiti"
demo_url: null
paper_url: "https://arxiv.org/abs/2501.13956"
paper_id: null
phase: data-and-retrieval
domain: [language, general-purpose]
relation_to_stack: [build-on-top]
health_signals: [org-backed, actively-maintained, research-origin]
ecosystem_role:
  - "The temporal-knowledge-graph approach to agent memory: instead of appending embeddings to a vector store, Graphiti incrementally builds an entity-relationship graph where every edge carries validity intervals, so agents can ask what was true when — the engine underneath Zep's memory platform."
best_for: ["You need an agent that answers questions about how facts changed over time, because the context graph records validity intervals rather than overwriting a fact when it stops being true.", "Your corpus is enterprise or interaction data that arrives continuously, because incremental updates avoid complete graph recomputation on every write.", "You need to know where a fact came from, because the graph maintains provenance back to source data rather than storing assertions without attribution."]
avoid_if: ["You need a one-shot static knowledge graph or a plain vector search, because temporal validity and provenance are the features you are paying for in complexity.", "You cannot afford the extraction step, because getting facts and relationships out of unstructured text is model work that happens before anything is stored.", "Your data rarely changes, because incremental update machinery and edge invalidation earn their cost only when facts actually evolve."]
upstream_dependencies: []
downstream_consumers: []
alternatives: [mem0]
integrates_with: [letta, zep]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (28,508), primary language, license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/getzep/graphiti", "date": "2026-07-08", "description": "28,508 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

Graphiti is a framework for building and querying temporal context graphs for AI agents. Its distinguishing claim is that unlike static knowledge graphs, the context graph tracks how facts change over time, maintains provenance to source data, and supports both prescribed and learned ontology, which the README says makes it purpose-built for agents operating on evolving real-world data. Against conventional RAG it continuously integrates user interactions, structured and unstructured enterprise data and external information into a coherent, queryable graph. The listed use cases are building temporal knowledge graphs that evolve with every interaction while tracking what is true now and what was true before, representing rich structured context instead of flat document chunks or raw event streams, and querying across time, meaning and relationships with hybrid retrieval combining semantic, keyword and graph traversal. The framework supports incremental data updates, efficient retrieval and precise historical queries without requiring complete graph recomputation.

## Why it's in the Arsenal

The decision it addresses is what happens to a stored fact when it stops being true. A vector index holds a chunk; when the underlying information changes, the old chunk is either deleted or left to compete with the new one, and the agent can answer with either. A temporal graph records that a fact held from one time to another and invalidates it when contradicted, so both the current state and the history are answerable and the provenance trail explains why. That is what makes it usable for the class of agent that operates on data that actually moves, rather than a fixed corpus that is indexed once.

## Architecture

Ingestion extracts entities and relationships from source data with a model, then writes them as edges carrying a validity interval, a provenance pointer and an ontology assignment. Because edges are time-bounded rather than replaced, a contradicting new fact closes the validity interval of the existing edge and opens a new one, which is the mechanism behind historical queries and incremental update: new information touches the affected subgraph rather than rebuilding the graph. Prescribed versus learned ontology means you can impose a schema or let the extraction define one. Retrieval is hybrid by design, combining semantic vector search over the graph's content, keyword search for exact identifiers, and traversal for relationship and multi-hop questions, which is how a question about a person or an incident becomes a path query rather than a nearest-neighbour guess. The store itself is a graph database with a vector index alongside it, since the two retrieval modes need both.

## Ecosystem Position

Graphiti sits alongside the graph-based retrieval entries in content/projects/data-and-retrieval, and the differentiator is that temporal validity is the data model rather than a timestamp column you add yourself. It compares to LightRAG and GraphRAG, which build derived structure over a corpus, with the distinction that those optimise a static index and this one is designed around a stream of updates, so the answer depends on whether your data changes after you index it. It also overlaps with the agent-memory projects in content/projects/agent-systems such as mem0, where the question is whether you want a memory API or a queryable graph of facts and intervals. Against a plain vector database in the same phase, this wins on provenance and multi-hop and loses on simplicity and operational maturity. It is developed alongside Zep's hosted product, so the open-source library and the commercial offering have different terms.

## Getting Started

Install the library, point it at a Neo4j instance, and ingest a passage so edges with validity intervals are written:

```bash
pip install graphiti-core
```

```python
import asyncio
from graphiti import Graphiti
from graphiti_llm.openai import OpenAILLM

async def main():
    g = Graphiti("bolt://localhost:7687", "neo4j", "neo4j",
                llm_client=OpenAILLM(model="gpt-4.1"))
    await g.add_episode(name="meeting-1",
        episode_body="Acme signed the Zenith contract in Q3 at a 28% discount.")
    await g.close()

asyncio.run(main())
```

The library ships a helper to build the graph schema and its constraints before ingestion. Neo4j is the expected graph database, and an LLM client is required for extraction, so this is not a zero-infrastructure deployment.

## Key Use Cases

1. Question answering over changing facts: ask what a customer's pricing was in a given quarter and get an answer with the validity interval and source behind it.
2. Continuous ingestion from interaction logs: feed new conversations, tickets or documents in incrementally so the graph tracks evolution without a full rebuild.
3. Multi-hop relationship questions: traverse the graph for questions about who introduced whom or which entities share an incident, which nearest-neighbour retrieval answers badly.

## Strengths

- Time-bounded facts with invalidation, so both the current state and the history of a fact are answerable rather than only the latest text.
 - Provenance attached to edges, so a claim in an answer traces back to the source data that produced it.
- Incremental update design that touches affected subgraph areas rather than requiring full graph recomputation on every write.
- Hybrid retrieval combining semantic, keyword and traversal, which covers exact identifiers and multi-hop questions that vector search handles poorly.

## Limitations

Extraction is model work per episode, so ingestion cost and latency are real and a bulk backfill is a bill rather than a job, and that cost recurs on every new episode. Running a graph database alongside a vector index is two stores to operate, back up and version, which is more surface than a vector database alone. Temporal edges accumulate, so the graph grows with the history of the data and pruning policy becomes your problem, with the trade that pruning loses exactly the history that was the point. The ontology question has no free answer: prescribed means you must design the schema, learned means you accept whatever the extraction produced and lose the ability to ask precise structural questions. Development is fast-moving, so treat version compatibility between the library, the graph database and the LLM client as a real integration cost, and note that Zep's commercial product sits next to the open-source library with different terms.

## Relation to the Arsenal

This belongs in content/projects/data-and-retrieval as the temporal graph entry, and it is the most direct comparison to the other graph-based retrieval projects in the same phase, where the deciding question is whether your data changes after indexing. It feeds the agent-memory question in content/projects/agent-systems, since a graph of time-bounded facts is a memory model, and the Zep entry there is the same lineage. In a pipeline it consumes extracted text from the ingestion and document-processing entries in the same phase, and its graph database is an operational dependency the vector-store entries do not have. For evaluation, the retrieval-quality tooling in content/projects/benchmark-and-eval is the honest place to compare it against plain vector retrieval on your own corpus.

## Resources

- [GitHub — getzep/graphiti](https://github.com/getzep/graphiti)
- [Documentation — help.getzep.com/graphiti](https://help.getzep.com/graphiti)
- [Zep platform](https://www.getzep.com)
