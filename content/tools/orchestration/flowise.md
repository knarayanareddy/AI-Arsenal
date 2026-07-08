---
id: flowise
name: "Flowise"
type: tool
job: [orchestration, prototyping]
description: "Open-source drag-and-drop builder for chatbots, RAG, and multi-agent workflows on the JavaScript stack"
url: "https://flowiseai.com"
cost_model: freemium
pricing_detail: "Apache-2.0 self-hosted free; Flowise Cloud from ~$35/mo"
tags: [orchestration, agents, rag]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: "Self-hosting is free; cloud has prediction/storage quotas per tier"
self_hostable: true
open_source: true
source_url: "https://github.com/FlowiseAI/Flowise"
docs_url: "https://docs.flowiseai.com"
github_url: "https://github.com/FlowiseAI/Flowise"
alternatives: [langflow, n8n, dify]
integrates_with: [langchain]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype]
best_when:
  - "Your team is Node.js-native and wants a visual agent/RAG builder that embeds easily into JS products"
  - "You want prebuilt chat widgets/embeds so a working assistant can go into an app or site in hours"
avoid_when:
  - "Heavy Python-ecosystem dependencies (custom models, scientific libs) — Langflow fits the Python stack better"
  - "Large-scale production agents with complex control flow; move to code-first frameworks as complexity grows"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (54,424), license, and last push (2026-07-06) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: solid-choice
verdict_rationale: "The JS-ecosystem counterpart to Langflow; the fastest path from idea to embeddable chatbot for Node teams"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/FlowiseAI/Flowise", "date": "2026-07-08", "description": "54,424 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A visual LLM-app builder on Node.js: three builder modes (assistants, simple chatflows, and multi-agent agentflows) over LangChain.js components, with embeddable chat widgets, REST APIs, and self-hosting — a favorite for shipping customer-facing bots quickly.

## Why It's in the Arsenal

Flowise earns a place in the Arsenal because it directly addresses a recurring decision point: your team is Node.js-native and wants a visual agent/RAG builder that embeds easily into JS products. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Assistant, Chatflow, and Agentflow visual builders
- Embeddable chat widget + REST/SDK access to every flow
- 100+ integrations (vector stores, models, tools) via LangChain.js

## Architecture / How It Works

Flows serialize to JSON and execute on an Express backend instantiating LangChain.js components per node; agentflows add supervisor/worker orchestration, and the embed script drops a configurable chat UI onto any page pointing at your flow's endpoint.

## Getting Started

```bash
npm install -g flowise && npx flowise start
# open localhost:3000 in a browser
```

## Use Cases

1. **Scenario**: your team is Node.js-native and wants a visual agent/RAG builder that embeds easily into JS products
2. **Scenario**: you want prebuilt chat widgets/embeds so a working assistant can go into an app or site in hours
3. **Scenario where this is NOT the right fit**: heavy Python-ecosystem dependencies (custom models, scientific libs) — Langflow fits the Python stack better — evaluate an alternative instead

## Strengths

- Your team is Node.js-native and wants a visual agent/RAG builder that embeds easily into JS products
- You want prebuilt chat widgets/embeds so a working assistant can go into an app or site in hours

## Limitations / When NOT to Use

- Heavy Python-ecosystem dependencies (custom models, scientific libs) — Langflow fits the Python stack better
- Large-scale production agents with complex control flow; move to code-first frameworks as complexity grows

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `langflow`, `n8n`, `dify` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `flowise`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://flowiseai.com)
- [Documentation](https://docs.flowiseai.com)
- [GitHub](https://github.com/FlowiseAI/Flowise)

## Buzz & Reception

- 54,424 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
