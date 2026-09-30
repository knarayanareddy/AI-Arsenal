---
id: ii-agent
name: ii-agent
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Apache-2.0 agent framework and web app for building apps, slides, storybooks and research briefs, out of beta with BYOK model config"
github_url: "https://github.com/Intelligent-Internet/ii-agent"
license: Apache-2.0
primary_language: Python
tags: [agents, data, research, inference]
maturity: beta
cost_model: open-source
github_stars: 3390
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-08-16"
docs_url: "https://ii.inc/web/blog/post/ii-agent"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Packages an agent product end to end with its own web UI, integrations and skills, and asks you to bring your own provider keys."
best_for:
  - "You want a deployable agent product rather than a library, because this ships backend, frontend and infrastructure together with make dev-all starting everything."
  - "You build mobile or web apps from prompts and you want the agent to produce a real project, not a scaffold you finish by hand."
  - "You need research that ends in a deliverable, because the documented flow goes from fast or deep research through interactive website generation with citations and embedded Q&A."
avoid_if:
  - "You want to embed the agent in your own Python service, because this is deployed as a stack (backend plus frontend plus infra) rather than imported as a module."
  - "You need multiple providers configured easily, because model configuration goes through a MODEL_CONFIGS JSON blob or a YAML file you fill in by hand."
  - "You have no Docker, uv and Node available, because all three are stated prerequisites for the quick start."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license (Apache-2.0), last commit, primary language, topics, issue count and creation date came from the GitHub API. Feature list, MODEL_CONFIGS format, install commands, port numbers and integration names are read from the official README; the stack was not deployed here."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

II-Agent is a Python agent framework that arrived out of beta under Apache-2.0 with a companion web app. Its feature set is product-shaped: mobile and website app generation from a short prompt, storybook generation, video and image generation inside one workflow, live collaborative editing for websites, slides and storybooks, and a visual plan mode. For research it offers fast and deep modes plus interactive website generation that turns a research brief into a structured site with visuals, citations and embedded Q&A. It includes built-in and custom skills, integrations for Gmail, Slack, GitHub, Notion, Google Calendar, Discord and Dropbox, and document handling for PDF, Excel, Word and PowerPoint alongside multi-model chat with a code interpreter. Model configuration is BYOK through MODEL_CONFIGS.

## Why it's in the Arsenal

The recurring decision is whether to assemble an agent product from components or adopt one. II-Agent's bet is that most people who want an agent want a finished product with document handling, integrations and live editing, not a library they must wrap themselves. That makes adoption fast and customisation shallow: you get the whole stack, and you get their assumptions about workflow. The second consequence is BYOK everywhere, so cost control and provider choice are yours to manage.

## Architecture

The stack is backend, frontend and infrastructure, brought up together by make dev-all, with the backend on port 8000. Model routing is declarative: MODEL_CONFIGS holds inline JSON entries with model_id, provider, api_key, display_name and an is_default flag, or MODEL_CONFIGS_FILE points at a YAML file with the same shape, which lets you swap providers without touching code. The agent core delegates to skills and to app integrations, and the live-editing surface for sites and decks implies a persistent document model rather than one-shot generation. Docker, uv and Node are all required, so the runtime is containerised rather than a single-process tool.

## Ecosystem Position

II-Agent competes with Dify, Flowise and Langflow for the no-code agent-app space, and with Manus-style general agents for the end-to-end task shape, but with an Apache-2.0 codebase you can fork rather than the closed product those names usually denote. Compared with content/projects/frameworks entries such as LangChain or CrewAI, it is a deployable product rather than an import. It complements entries in content/projects/agent-systems by being an opinionated vertical for building artefacts, and it depends on the inference-engines layer only if you self-host a model behind an OpenAI-compatible endpoint.

## Getting Started

Docker, uv and Node.js are prerequisites. The quick start clones, initialises, configures keys and starts everything:

```bash
git clone https://github.com/Intelligent-Internet/ii-agent.git
cd ii-agent
make setup
# edit .env with MODEL_CONFIGS (inline JSON) or MODEL_CONFIGS_FILE
make dev-all
```

Backend comes up at http://localhost:8000 with the frontend alongside it. A hosted web app is available at agent.ii.inc for trying it first.

## Key Use Cases

1. Prompt-to-app: go from a short description to a working mobile or web application, then keep editing it live rather than regenerating from scratch.
2. Research to artefact: run deep research and convert the brief into an interactive website with citations and embedded Q&A rather than a wall of text.
3. Slide and document work: generate a deck from a prompt and continue editing it with templates and live collaboration.

## Strengths

- Out of beta with Apache-2.0 licensing, so forking and self-hosting are explicitly permitted rather than a grey area.
- Ships backend, frontend and infrastructure together, so there is no assembly step before you can use it.
- Live editing for websites, slides and storybooks, which closes the gap between generation and iteration.
- Real integrations (Gmail, Slack, GitHub, Notion, Calendar, Discord, Dropbox) plus a code interpreter and multi-model chat.

## Limitations

BYOK model configuration is manual and awkward: a JSON array or a YAML file with provider, key and default flags is more friction than a provider picker, and the example uses a specific Anthropic model id that will age. Requiring Docker, uv and Node together is a heavy prerequisite set for something people may want to run locally once. The product surface is wide (apps, research, slides, storybooks, documents, integrations), which means each area is less deep than a focused tool, and the released GAIA results live on a separate hosted leaderboard rather than in the repo. Forking a full stack with a web frontend raises the maintenance cost relative to adopting a library.

## Relation to the Arsenal

This is the full-stack, artefact-producing agent in content/projects/agent-systems, closest in shape to Dify or Flowise but with a permissively licensed codebase. Compare with ii-agent's neighbours in this phase: AionUi and CowAgent also target general assistants but ship as personal harnesses, whereas this one is oriented at producing documents and applications. The interactive-site and live-deck features overlap with content/projects/data-and-retrieval work on ingestion and citation handling, and if you want to build on an agent framework rather than run one, the frameworks phase is the layer to use instead.

## Resources

- [GitHub — Intelligent-Internet/ii-agent](https://github.com/Intelligent-Internet/ii-agent)
- [Launch blog post](https://ii.inc/web/blog/post/ii-agent)
- [Hosted web app — agent.ii.inc](https://agent.ii.inc/)
