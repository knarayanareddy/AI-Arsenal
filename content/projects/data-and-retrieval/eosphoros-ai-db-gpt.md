---
id: eosphoros-ai-db-gpt
name: "DB-GPT"
version_tracked: null
artifact_type: platform
category: rag
subcategory: advanced-rag
description: "Agentic data platform connecting LLMs to enterprise databases via text-to-SQL, RAG, and multi-agent roles"
github_url: "https://github.com/eosphoros-ai/DB-GPT"
license: "MIT"
primary_language: Python
org_or_maintainer: "eosphoros-ai"
tags: [agents, data, rag, orchestration]
maturity: beta
cost_model: open-source
github_stars: 20058
github_stars_last_30d: 0
trending_score: 34
last_commit: "2026-09-28"
docs_url: "http://docs.dbgpt.cn"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [language]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Agentic data assistant connecting LLMs to enterprise databases through text-to-SQL and multi-agent execution, with database metadata grounding the generated queries."
best_for:
  - "You operate a MySQL or PostgreSQL warehouse and want an internal chat assistant that answers analyst questions against live tables rather than a static export."
  - "You need a custom data application built on LLM agents over multiple sources and want the AWEL workflow engine, plugin registry, and web UI already assembled."
  - "You are prototyping a text-to-SQL feature and want a reference implementation of schema linking, query execution, and multi-agent data analysis to fork."
avoid_if:
  - "You need guarantees that generated SQL is safe, because a text-to-SQL agent with a live connection will eventually run an unintended write unless you bolt on a read-only proxy."
  - "Your team will not operate a service stack, since DB-GPT expects a running database, cache, and web process rather than a pip install."
  - "You want a small, current codebase: the repository history spans many framework generations and the plugin surface is broad and unevenly maintained."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (20058), MIT license, last commit 2026-09-28, Python as primary language and the topic list were API-verified. AWEL operator semantics, connector behaviour, and the RAG/Text2SQL module structure come from the official docs and README; the read-only-safety and schema-scaling warnings are engineering judgement about this class of tool, not claims from the project."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/eosphoros-ai/DB-GPT", "date": "2026-09-28", "description": "20,058 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

DB-GPT is a Python server that exposes LLMs as a data platform. A Model Adapter layer normalises many providers and local backends behind one interface; a RAG module handles chunking, embedding, and vector storage for unstructured sources; a Connector layer registers relational and non-relational datasources and can infer a schema over them; and AWEL, the Agentic Workflow Expression Language, provides DAG-style operators that agents execute, including a class of name-defined Agent operators alongside the built-in parameter and IO operators. On top sit Text2SQL, the DBChat agent for natural-language database questions, a ChatDB multi-agent collaboration mode, a gpts plugin system, an AWEL flow builder UI, and observability hooks. The architecture is the interesting part: rather than a single prompt-and-tool loop, it gives each capability a named node in a versioned workflow graph you can compose and run step by step.

## Why it's in the Arsenal

The recurring decision is how to let a language model touch a real database without the project collapsing into a pile of bespoke prompt scripts. Each analytics question has a slightly different join, a different time window, and a different permission expectation, so a single general-purpose text-to-SQL prompt fails on exactly the queries that matter. DB-GPT makes the resolution explicit: schema is registered as a first-class object, the agent resolves against that registered structure, and the resulting SQL execution is a named node in a workflow that can be reviewed, re-run, and instrumented — which is what an enterprise data team actually needs to sign off on.

## Architecture

A request enters through the API server, hits an agent or AWEL workflow, and the workflow's operator graph decides what to invoke. Data access is funnelled through a Connector abstraction that wraps SQLAlchemy-style drivers, extracts table and column metadata, and exposes it both to schema-linking prompts and to the Text2SQL execution node; results flow back as tabular data that a charting operator can render. AWEL supplies the execution model: operators declare input and output schemas, the framework topologically sorts them into a DAG, and streaming operators emit intermediate results so a human can watch or interrupt. Agents are themselves operators, which is what lets a Text2SQL call, a Python data-science call, and a knowledge-base retrieval be sequenced in one flow. A model adapter sits beneath everything, translating provider-specific chat and tool-calling APIs into a common request shape, and an observability layer records each operator's inputs and outputs for later audit.

## Ecosystem Position

DB-GPT overlaps with langchain's SQL agent and the many thin text-to-SQL wrappers, but it is a platform rather than a library: where langchain gives you a component, this ships a web UI, a plugin marketplace, and a flow builder. Against Vanna-style semantic-layer tools, DB-GPT takes the opposite approach — it grounds on live schema introspection instead of curated documentation, which is easier to start and harder to trust. It competes directly with the text-to-SQL halves of Chat2DB and DB-GPT's commercial cousins, and it complements dbt in the analytics stack: dbt owns the transformation layer, DB-GPT owns the conversational read path above it. If you need a general agent runtime rather than a data one, langgraph or the openai-agents-sdk entries are the closer comparison.

## Getting Started

Stand the server up from a clone, keeping the default development datasource pointed at a local database:

```bash
git clone https://github.com/eosphoros-ai/DB-GPT && cd DB-GPT
pip install -e "[all]"
export OPENAI_API_KEY=sk-...
python dbgpt_server/cli.py --port 5670
```

Open the web UI, register a datasource under Data Sources, then start with the built-in Text2SQL or DBChat agent to confirm the model can resolve against your real schema.

## Key Use Cases

1. An internal analyst assistant that answers natural-language questions over a MySQL or PostgreSQL warehouse and renders the result as a chart, with the generated SQL shown for review.
2. A composed data workflow where a Text2SQL node, a Python data-science node, and a knowledge-base retrieval node run in one AWEL DAG and stream intermediate results to a human.
3. A forked foundation for a domain data product, with the connector, model adapter, and web shell reused while the agent roles and plugin set are replaced.

## Strengths

- Ships the whole stack — connectors, agents, workflow engine, web UI — so a text-to-SQL demo is a configuration task rather than an integration project.
- AWEL makes multi-step data work explicit and inspectable instead of hiding it inside a single reasoning prompt.
- A Model Adapter layer means a provider change is configuration, not a rewrite of every agent.
- Plugin and datasource registries let teams add domain capability without forking the core.

## Limitations

Generated SQL is unverified by construction, so shipping this against a writable connection is a real risk unless you force a read-only role and add a statement-level allowlist. Installation is heavy: the server, model provider, vector store, and database all have to come up together, which is a lot of moving parts for a library user. Connector coverage is uneven across non-relational stores, and prompt templates for schema linking degrade badly on wide tables with cryptic column names. The plugin ecosystem and documentation reflect a primarily Chinese-language user base, and the project's rapid iteration means examples in the docs age faster than in most repos of this size.

## Relation to the Arsenal

This is the data-phase entry in content/projects/data-and-retrieval that assumes the corpus already exists upstream — huggingface-datasets and the document parsers feed it, and the vector-database entries are the retrieval substrate its RAG module sits on. For the agent mechanics it composes, read the agent-system entries in content/projects/agent-systems, and for the general-purpose orchestration pattern behind AWEL, look at langgraph and n8n-style flow tooling. Where it is deliberately not a fit is pure unstructured retrieval: llamaindex and graphrag are the better reads for that half.

## Resources

- [DB-GPT documentation](http://docs.dbgpt.cn)
- [DB-GPT GitHub repository](https://github.com/eosphoros-ai/DB-GPT)
- [AWEL workflow documentation](http://docs.dbgpt.cn/docs/awel/introduction)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (20,058 stars, last commit 2026-09-28, license MIT, verified via GitHub API on 2026-09-28)*
