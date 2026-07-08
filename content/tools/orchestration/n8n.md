---
id: n8n
name: "n8n"
type: tool
job: [orchestration, prototyping]
description: "Source-available visual workflow automation platform with first-class AI-agent nodes and 400+ integrations"
url: "https://n8n.io"
cost_model: freemium
pricing_detail: "Fair-code license: free self-hosted; paid cloud from ~$24/mo"
tags: [orchestration, agents, tool-use]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: "Self-hosted community edition is free and unmetered"
self_hostable: true
open_source: true
source_url: "https://github.com/n8n-io/n8n"
docs_url: "https://docs.n8n.io"
github_url: "https://github.com/n8n-io/n8n"
alternatives: [langflow, flowise, dify]
integrates_with: [langchain]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, production]
best_when:
  - "You want business-automation plumbing (CRMs, email, webhooks, DBs) and LLM agents in one visual canvas"
  - "Semi-technical teams need to ship AI workflows without owning a Python service — with code nodes as the escape hatch"
avoid_when:
  - "Complex agent logic with intricate state — a code-first framework (LangGraph, Mastra) stays maintainable longer"
  - "You require a strictly OSI open-source license; n8n's fair-code license restricts offering it as a competing SaaS"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (195,670), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The workflow-automation platform that captured the AI wave; unmatched integration breadth for glue-plus-agents jobs"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/n8n-io/n8n", "date": "2026-07-08", "description": "195,670 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

One of the most popular repositories on GitHub: a visual workflow builder combining 400+ app integrations with LangChain-based AI nodes, so teams wire triggers, data transforms, and multi-step AI agents on one canvas and self-host the whole thing.

## Why It's in the Arsenal

n8n earns a place in the Arsenal because it directly addresses a recurring decision point: you want business-automation plumbing (CRMs, email, webhooks, DBs) and LLM agents in one visual canvas. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Visual editor with 400+ integrations and webhook/cron triggers
- AI agent nodes (tools, memory, RAG) built on LangChain
- Self-hostable single container; queue mode for scale

## Architecture / How It Works

Workflows are JSON graphs executed by a Node.js engine; each node is an integration or function, AI nodes wrap LangChain primitives, and executions persist to a database so runs are inspectable and retryable. Queue mode splits webhook ingestion from workers for horizontal scale.

## Getting Started

```bash
docker run -it --rm -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

## Use Cases

1. **Scenario**: you want business-automation plumbing (CRMs, email, webhooks, DBs) and LLM agents in one visual canvas
2. **Scenario**: semi-technical teams need to ship AI workflows without owning a Python service — with code nodes as the escape hatch
3. **Scenario where this is NOT the right fit**: complex agent logic with intricate state — a code-first framework (LangGraph, Mastra) stays maintainable longer — evaluate an alternative instead

## Strengths

- You want business-automation plumbing (CRMs, email, webhooks, DBs) and LLM agents in one visual canvas
- Semi-technical teams need to ship AI workflows without owning a Python service — with code nodes as the escape hatch

## Limitations / When NOT to Use

- Complex agent logic with intricate state — a code-first framework (LangGraph, Mastra) stays maintainable longer
- You require a strictly OSI open-source license; n8n's fair-code license restricts offering it as a competing SaaS

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `langflow`, `flowise`, `dify` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `n8n`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://n8n.io)
- [Documentation](https://docs.n8n.io)
- [GitHub](https://github.com/n8n-io/n8n)

## Buzz & Reception

- 195,670 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
