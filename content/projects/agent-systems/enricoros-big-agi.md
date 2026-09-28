---
id: enricoros-big-agi
name: "big-AGI"
version_tracked: null
artifact_type: tool
category: agents
subcategory: tools
description: "Browser-and-server AI workbench bundling multi-provider chat, personas, image generation, voice, and sandboxed code execution behind one local interface"
github_url: "https://github.com/enricoros/big-AGI"
license: "MIT"
primary_language: TypeScript
org_or_maintainer: "enricoros"
tags: [llm, self-hosted, multimodal, agents]
maturity: production
cost_model: open-source
github_stars: 7133
github_stars_last_30d: 0
trending_score: 31
last_commit: "2026-09-28"
docs_url: "https://big-agi.com"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [language, vision]
relation_to_stack: [deploy-as-is]
health_signals: [actively-maintained]
ecosystem_role:
  - "Self-hostable multi-model AI suite for local-first use, notable for the breadth of providers and modalities exposed behind a single interface."
best_for:
  - "You want to compare several vendors on the same prompt and need true side-by-side streaming rather than switching browser tabs."
  - "You are prototyping multi-modal features such as image generation, text-to-speech, or vision input and want one client that speaks all of them."
  - "You need a self-hostable team AI front end where credentials and conversation history stay on infrastructure you control."
avoid_if:
  - "You need a hardened, audited deployment with SSO and role-based access, since this is a fast-moving product rather than a governed enterprise platform."
  - "You are building a programmable backend service, because the interface is human-facing and offers no stable SDK contract for programmatic callers."
  - "You cannot use third-party model APIs at all, where the local-inference entries in the catalog are the correct starting point."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (7133), MIT license, last commit 2026-09-28, primary language TypeScript, and all listed topics were read from the GitHub API. Beam multi-model comparison, personas, modalities, code execution, and the Docker deployment path come from the official README; the app was not run here and provider behavior was not tested."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/enricoros/big-AGI", "date": "2026-09-28", "description": "7,133 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

big-AGI is a TypeScript web application that can be run as a static site, a Node server, or Docker container, giving a single graphical interface over many commercial model providers. It supports multiple personas per conversation so you can hold divergent threads on one task, and its Beam feature renders responses from several models concurrently in aligned columns for direct comparison. On top of chat it adds text-to-image generation, text-to-speech and speech input, PDF import, code highlighting with a sandboxed execution path, and a preset system for saving and sharing prompt configurations. Provider keys are stored locally and can be supplied through an environment proxy for shared deployments.

## Why it's in the Arsenal

The decision this tool resolves is provider fragmentation during model selection. Comparing vendors normally means four browser tabs, four copies of the prompt, and a mental model of which answer came from where. big-AGI makes the comparison the primary interaction, so prompt engineering and model routing decisions happen in one screen with aligned output. It also removes the aggregator problem: a hosted multi-model chat product sees every prompt and every key, whereas a self-hosted build keeps credentials and conversation history on infrastructure you already trust and pay for.

## Architecture

The client is a Vite and React application in TypeScript that talks to each provider through its own adapter module, normalizing streaming, tool calls, and multimodal parts behind a common internal message shape. A React context store holds the conversation, provider configuration, personas, and presets, and a Node Express layer serves the built assets and can inject provider keys from server-side environment variables so the browser never sees them. Code execution runs in a sandboxed iframe or worker rather than on the host, and document import goes through a PDF parsing step in the browser. Deployment is a single container with a configurable base URL, and optional server-side proxying keeps CORS and key handling out of the client bundle.

## Ecosystem Position

big-AGI overlaps with Open WebUI and LibreChat, the other self-hostable chat front ends, and it competes with them on breadth of modalities rather than on model-serving capability, since none of the three runs weights itself. Compared to Open WebUI it is lighter and more focused on multi-model comparison, while LibreChat leans harder into a configurable agent and RAG feature set. It is a rather than an alternative to the inference-engine entries: a local model served by Ollama or llama.cpp can be pointed at from the same interface, which is the usual pairing. It complements the observability phase poorly, since there is no tracing layer, so a production deployment needs one bolted on separately.

## Getting Started

Run it locally with Node, or use the published container image:

```bash
git clone https://github.com/enricoros/big-AGI.git && cd big-AGI
npm install
npm run dev            # dev server with hot reload on http://localhost:5173
```

```bash
# production build and container run with server-side provider keys
npm run build
docker run -p 3000:3000 -e OPENAI_API_KEY=sk-... ghcr.io/enricoros/big-agi:latest
```

Provider keys can also be entered in the app's settings panel, which stores them in local browser storage.

## Key Use Cases

1. Model selection work, where Beam mode shows the same prompt answered by several vendors side by side before you commit to one.
2. Multi-modal prototyping, pairing text-to-image, voice input, and document import in one workspace instead of three separate tools.
3. A self-hosted internal chat front end for a small team that wants provider keys on their own infrastructure without building a UI.

## Strengths

- Genuine parallel multi-model comparison, which is unusual outside hosted products and directly speeds up vendor selection.
- MIT licensing and a simple container deployment, so self-hosting has no per-seat cost or vendor lock-in.
- Broad modality coverage in one client, including image generation, speech, PDF import, and sandboxed code execution.
- Server-side key injection, so a shared deployment can proxy provider calls without exposing credentials to the browser.

## Limitations

This is a single-maintainer-led product moving quickly, so expect breaking interface changes, limited enterprise controls, and no SSO, RBAC, audit log, or data-retention policy out of the box. It holds no evaluation or tracing layer, so prompt-level debugging in production is manual. Provider support is uneven, since the newest endpoints and reasoning-token fields land for some vendors before others, and cost controls are limited to whatever the underlying APIs enforce. Local model support means pointing at an OpenAI-compatible server, which forces you to run the serving stack yourself rather than a true all-in-one.

## Relation to the Arsenal

This belongs to the agent-systems phase as a deployable end-user surface, sitting next to platform-style agent entries rather than to libraries you import. Its local-model story points back at the inference-engine phase, where Ollama, llama.cpp, and vLLM provide the OpenAI-compatible endpoints it talks to. For programmatic agent construction the framework entries in agent-systems and frameworks are the relevant comparison, and the observability phase supplies the tracing it lacks.

## Resources

- [big-AGI GitHub repository](https://github.com/enricoros/big-AGI)
- [big-AGI site and hosted demo](https://big-agi.com)
- [big-AGI Docker image on GitHub Packages](https://github.com/enricoros/big-AGI/pkgs/container/big-agi)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (7,133 stars, last commit 2026-09-28, license MIT, verified via GitHub API on 2026-09-28)*
