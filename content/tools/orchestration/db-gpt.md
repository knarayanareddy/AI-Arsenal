---
id: db-gpt
name: "DB-GPT"
type: tool
job: [orchestration, structured-output, vector-search]
description: "Agentic data framework for private text-to-SQL, schema-linked RAG and multi-model serving"
url: "https://github.com/eosphoros-ai/DB-GPT"
cost_model: open-source
pricing_detail: "MIT-licensed source; spend is hardware or hosted inference rather than licensing"
tags: [agents, rag, llm, self-hosted, data, security, local]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "MIT source with no usage limits; local inference requires your own GPU capacity"
self_hostable: true
open_source: true
source_url: "https://github.com/eosphoros-ai/DB-GPT"
docs_url: null
github_url: "https://github.com/eosphoros-ai/DB-GPT"
alternatives: [docsgpt, dust]
integrates_with: []
added_date: "2026-10-11"
last_reviewed: "2026-10-11"
added_by: repo-maintainer
reviewed_by: null
verdict: recommended
verdict_rationale: "Schema indexing, query repair and model routing are the hard parts of text-to-SQL, and DB-GPT ships all three; the cost is a heavyweight stack to operate"
status: active
phase: orchestration
audience: [production, research]
best_when:
  - "Database schemas and row data cannot leave your network, so the model and the query path both have to run locally"
  - "Users need natural-language analytics across several engines — MySQL, Postgres, ClickHouse, Snowflake — from one interface"
avoid_when:
  - "Queries must complete in well under a second and multi-step deliberation cannot fit the latency budget"
  - "You want a thin client over a hosted model and nothing else to operate"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Capabilities described from the repository and project documentation; the stack was not deployed for this entry and no accuracy benchmark was reproduced."
buzz_sources: []
---

## Overview

DB-GPT is an agentic data framework built around one constraint: the database and its metadata must not leave the building. Where most text-to-SQL work starts from a hosted model and treats schema access as an afterthought, this project puts the data plane first and treats model access as swappable.

That inversion shows up throughout. Schemas, column comments and business glossaries are indexed into vectors so retrieval happens against database metadata rather than documents. Generated SQL runs through a repair loop that re-prompts on execution errors. Multiple models — local vLLM instances, Ollama, cloud APIs — sit behind one OpenAI-compatible surface managed by the project's multi-model layer, so an air-gapped deployment and a cloud-backed one share the same application code.

Guardrails are treated as architecture: query execution is isolated, access control applies to connectors, and masking is configurable before results reach the model context.

## Why It's in the Arsenal

The Arsenal documents text-to-SQL as a recurring decision because the failure modes are not obvious from a demo. A model that writes plausible SQL against a schema it half-remembers produces wrong answers confidently, and the fix is mechanical rather than prompt-shaped: retrieve the right DDL, validate the query, execute it, and repair from the error.

DB-GPT is the reference implementation of that loop with enterprise data constraints attached. It is also a useful counterweight to hosted analytics agents: it shows what you gain and what you must operate when the schema cannot be sent to a vendor.

## Key Features

- A multi-model serving layer exposing concurrent local and remote models behind one OpenAI-compatible API, with load balancing and failover.
- Text-to-SQL with vector indexing of DDL, column comments and glossary terms, plus schema linking and iterative query repair.
- Data-centric agents — SQL, chart and plugin roles — that decompose an analytical request into query, visualisation and narrative steps.
- Connectors for MySQL, PostgreSQL, ClickHouse, Spark, Oracle and the common vector stores.
- Local execution sandboxes, masking utilities and configurable input/output guardrails.

## Architecture / How It Works

Ingestion indexes schema metadata rather than rows: table and column definitions, comments and business terms become embeddings stored in a vector store. At query time the agent retrieves the candidate tables, assembles a narrowed schema context, generates SQL, validates it, executes it against a read-only connection and feeds any database error back for another attempt. Results then pass to a charting or summarisation agent that produces the final artefact.

The multi-model layer sits beneath all of this and presents every backend as an OpenAI-compatible endpoint, which is what allows the same agent definition to run on a local vLLM instance or a hosted API. Guardrail hooks wrap the tool boundary, so masking and rejection happen before data reaches the model context.

## Getting Started

The project ships an installer and Docker Compose stack that brings up the web UI, the model-serving layer and the metadata store; the practical first step is pointing it at one small, well-documented PostgreSQL database and confirming the schema index covers the tables a user would actually ask about. Add a second engine and a local model only after the single-database loop produces SQL you would accept in review.

## Use Cases

1. Business analysts querying a production warehouse in natural language when schema details cannot be exported to a third-party API.
2. Internal dashboards where a chart agent turns a validated SQL result into a visual without a separate BI tool.
3. Multi-database investigations that join context across Postgres and ClickHouse through one conversational interface.
4. Evaluation work: generating candidate SQL against a known schema and measuring execution accuracy before deploying an agent.

## Strengths

- Schema metadata indexing targets the actual failure mode of text-to-SQL: the model guessing at column names it never saw.
- The repair loop uses the database's own error messages as feedback, which is a stronger signal than self-critique.
- A local-first default means the whole path — model, retrieval, execution — can stay inside a private network.
- One OpenAI-compatible surface across backends keeps agent definitions portable between hosted and air-gapped deployments.

## Limitations / When NOT to Use

- Full stack deployment means a model runtime, vector store, metadata database and application tier; that is substantial infrastructure before the first query.
- Indexing thousands of tables is slow and must be refreshed as schemas evolve, or retrieval degrades toward stale DDL.
- Multi-step deliberation adds latency that rules out sub-second interactive use without aggressive caching.
- Accuracy is workload-dependent: the project's claims are not a substitute for measuring execution accuracy on your own schema before trusting it with decisions.

## Integration Patterns

Point read-only database roles at the execution layer and keep write paths firmly outside the agent; the repair loop should never be able to retry against a connection that can mutate data. Expose the SQL agent through your existing service mesh and log every generated statement with the retrieved schema context that produced it, which is what makes a wrong answer diagnosable. Where a hosted model is acceptable, route only non-sensitive summarisation to it and keep schema retrieval local.

## Resources

- [GitHub — eosphoros-ai/DB-GPT](https://github.com/eosphoros-ai/DB-GPT)

## Buzz & Reception

This entry is based on the repository and project documentation; no independent execution-accuracy benchmark on a third-party schema is recorded here. The claim worth testing yourself is the repair loop's effect on correctness for your schema — it is measurable, and it is the number that decides adoption.
