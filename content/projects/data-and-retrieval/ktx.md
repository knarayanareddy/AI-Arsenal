---
id: ktx
name: ktx
version_tracked: null
artifact_type: library
category: rag
subcategory: vector-databases
description: "An executable context layer that ingests warehouse metadata and company docs, then serves approved metrics as read-only SQL to agents"
github_url: "https://github.com/Kaelio/ktx"
license: Apache-2.0
primary_language: TypeScript
tags: [data, tool-use]
maturity: beta
cost_model: self-hostable
github_stars: 1603
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-11"
docs_url: "https://docs.kaelio.com/ktx/docs/"
demo_url: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Replaces hand-maintained semantic-layer YAML with an ingestion engine that derives joinable columns and flags contradictions."
best_for:
  - "You are letting a coding agent query your warehouse and need it constrained to approved metric definitions rather than free-form SQL."
  - "You are tired of maintaining a semantic layer by hand and want metric logic plus business knowledge derived from the stack you already have."
  - "You need chasm and fan traps resolved automatically, because these are join-graph problems a static YAML layer will not catch for you."
avoid_if:
  - "You need write access to the warehouse, because the serving path compiles read-only SQL by design."
  - "You are on a warehouse ktx cannot connect to, since ingestion depends on the supported source connectors."
  - "You cannot let an agent query production data at all, since the whole purpose is to grant scoped read access with approved semantics."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 1603, Apache-2.0, TypeScript, last commit 2026-09-11, topics, homepage. From README: ingestion and serving flows, context-engine stages, wiki Markdown and semantic-layer YAML outputs, join graph with chasm/fan trap resolution, MCP serving, no extra billing. Connectors untested."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

ktx has two halves described as ingestion and serving. Ingestion pulls in databases, BI tools, modeling code, and documentation through a context engine made of source connectors, a context builder, reconciliation, and validation, and the output is two artifacts: wiki Markdown for business knowledge and semantic-layer YAML for metric definitions. The engine samples tables, captures metadata and usage patterns, detects joinable columns, annotates sources, deduplicates ingested content, and flags contradictions for human review instead of silently picking a winner. It builds a join graph that combines raw tables with high-level metrics and resolves chasm and fan traps automatically. Serving exposes the result over MCP: an agent queries ktx, the runtime searches the wiki and the semantic layer, returns approved metrics, and compiles them into read-only SQL executed against your warehouse. Billing is deliberately off - you bring your own LLM API keys or sign in through Claude Code or Codex.

## Why it's in the Arsenal

The recurring problem is that general-purpose agents re-explore a warehouse on every question, invent their own metric definitions, and return numbers that disagree with the ones your dashboards show. Neither side of the usual fix works: a hand-written semantic layer demands constant upkeep, and dumping documentation into the prompt gives the agent prose without the join structure it needs. Deriving the semantic layer from live metadata plus detected joinable columns removes the upkeep, and refusing to answer from anything other than the compiled semantic layer removes the invented-numbers failure mode - at the cost of an agent that can only answer what has been modeled.

## Architecture

The ingestion engine is a pipeline of connectors feeding a context builder, then reconciliation and validation stages, writing to a wiki store of Markdown plus a semantic layer of YAML. Join inference happens during ingestion: candidate keys are detected from column naming, type coincidence, and observed usage patterns, and the join graph they form is walked to detect chasm traps requiring intermediate tables and fan traps requiring dimension filtering. At query time an MCP server exposes search over both stores, resolves a question into the approved metric set, and generates SQL that references those metrics as read-only. Serving runs on the same agent credentials the user already has, so ktx bills nothing itself, and the CLI plus docs cover the whole path from first connect to compiled query.

## Ecosystem Position

ktx competes with dbt Semantic Layer, Cube, and Looker for the semantic-layer slot and with the hand-rolled schema-documentation approaches an agent invents for itself. Compared with a traditional semantic layer, the distinguishing claim is that ktx derives the layer automatically instead of requiring a team to declare metrics by hand - which is a genuine advantage when nobody has the time, and a genuine liability when you want explicit human control over a metric's definition. Compared with a pure RAG index over documentation, it emits structured YAML and a join graph rather than prose chunks, so it answers with constrained SQL instead of retrieved text. It overlaps with the warehouse-facing connectors in content/projects/data-and-retrieval and targets the same agents whose harnesses live in content/projects/frameworks; it issues queries rather than model calls, so content/projects/inference-engines is a dependency only through whatever model parses its MCP responses.

## Getting Started

Install the CLI from npm, point it at your warehouse and documentation sources, then connect it to your agent as an MCP server.

```bash
npm install -g @kaelio/ktx
ktx init                 # configure sources and the agent connection
ktx mcp                 # serve the context layer over MCP
```

Start with the documented quickstart at docs.kaelio.com/ktx/docs/getting-started/quickstart, which walks first connect through first compiled query.

## Key Use Cases

1. Constrain an analytics agent: let Claude Code or Codex query the warehouse only through approved metric definitions and read-only SQL.
2. Replace manual semantic upkeep: point the ingestion engine at your BI tool, modeling code, and docs and let it emit the layer.
3. Catch join traps early: rely on join-graph analysis to surface chasm and fan traps that would otherwise produce silently wrong aggregates.

## Strengths

- Semantic layer derived from live metadata and usage patterns instead of hand-authored YAML, which removes the upkeep tax.
- Chasm and fan traps resolved through join-graph analysis, a class of error that hand-written layers routinely miss.
- Compiled read-only SQL from approved metrics, which structurally prevents the invented-number failure mode.
- No usage billing of its own - it reuses your existing Claude Code or Codex authentication, so evaluation is cheap.

## Limitations

Ingestion quality is entirely a function of what your connectors can reach. A warehouse ktx cannot sample, a BI tool it cannot parse, or documentation it cannot crawl yields a thin semantic layer, and the agent will then be confidently limited rather than usefully broad. Contradictions in documentation are flagged for human review rather than resolved, so someone has to own that queue. Serving is read-only SQL by construction, which rules out data-modification workflows entirely. The MCP-only interface means non-agent consumers need an extra hop. Coverage is newest-generation: the npm package, Y Combinator backing, and Slack community all point to a young project with a changing surface.

## Relation to the Arsenal

This data-and-retrieval-phase entry occupies the analytical-retrieval slot that document and vector stores leave open. It is the context source a data agent consumes, so it pairs with the harnesses in content/projects/frameworks that hold the agent loop, and its YAML metric layer is a different artifact from anything in content/projects/data-and-retrieval that stores documents. No model is hosted here, so content/projects/inference-engines is relevant only where ktx parses natural-language questions into SQL.

## Resources

- [Repository](https://github.com/Kaelio/ktx)
- [Documentation and quickstart](https://docs.kaelio.com/ktx/docs/getting-started/quickstart)
- [npm package](https://www.npmjs.com/package/@kaelio/ktx)
