---
id: agenticseek
name: agenticSeek
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Self-hosted Python agent that routes browsing, coding and planning work to a local Ollama or LM Studio model through a bundled SearXNG instance"
github_url: "https://github.com/Fosowl/agenticSeek"
license: GPL-3.0
primary_language: Python
tags: [local, planning]
maturity: beta
cost_model: self-hostable
github_stars: 27362
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-25"
docs_url: "https://github.com/Fosowl/agenticSeek#readme"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Runs a Manus-style autonomous agent loop against a model you host, so no API key, no cloud egress and no per-token bill."
best_for:
  - "You are on a workstation with a 24 GB GPU and you want an always-on agent that searches the web, writes code and plans multi-step jobs without sending a prompt to a hosted API."
  - "You are trialling local reasoning models and you want one application that actually exercises DeepSeek-R1 or Magistral across browsing and code paths instead of a bare chat window."
  - "You are behind a restrictive network and you need web search available to an agent, which the bundled SearXNG metasearch container supplies in place of a paid search API."
avoid_if:
  - "You are on a laptop with no discrete GPU and you need dependable planning, because the project FAQ puts a 14B model at 12 GB VRAM with visible struggle on browsing and planning tasks."
  - "You need a team-supported production service with an SLA, because the maintainer states plainly that this started as a side project with zero roadmap and zero funding."
  - "You cannot pin a Python 3.10.x environment, because the README hard-recommends 3.10 and warns that other interpreter versions lead to dependency errors."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language, topics, open-issue count and creation date came from the GitHub API. Install commands, the Docker service list, config.ini keys, the provider table and the VRAM figures are read from the official README; agent quality on local models was not tested here."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

AgenticSeek splits a request across named specialised agents: a browser agent that drives undetected Selenium in headless Chrome, a coding agent that writes and executes Python, C, Go and Java programs, and a planner that decomposes long jobs and picks the agent for each step. Inference is pointed at Ollama, LM Studio or any OpenAI-compatible server through config.ini, with deepseek-r1:14b as the documented starting recommendation. Search comes from a bundled SearXNG instance backed by Redis, so browsing needs no commercial search key. Docker Compose starts searxng, redis, frontend and backend together, while a host-side CLI mode runs the same agent core outside the container.

## Why it's in the Arsenal

The decision it removes is whether an autonomous research-and-code agent has to be a rented subscription. Every dependency here is local: Ollama or LM Studio for tokens, SearXNG for search, and an explicit provider_name in config.ini. The tradeoff is that the cost moves from an API line item to hardware you size once, and the README's own hardware table says 32B-class models need 24 GB or more of VRAM and 70B-plus wants 48 GB.

## Architecture

A Python backend dispatches to the model through a provider adapter keyed on provider_name, with provider_server_address pointing at the local server port; LM Studio needs an explicit http:// prefix in that address. Browser work runs through headless Chrome under Selenium with stealth_mode enabled to reduce bot detection, and extracted page content feeds the planner's step list. Docker Compose brings up searxng, redis, frontend and backend via start_services.sh, while CLI mode runs cli.py on the host and leaves only search and Redis in containers. Session state persists when save_session and recover_last_session are true in config.ini.

## Ecosystem Position

It is a local alternative to hosted Manus-style agents and overlaps with OpenHands and browser-use in the same territory: both need a browser driver and both write code on your machine. Compared with Ollama or LM Studio, which are bare inference servers with no loop, AgenticSeek supplies the agent loop, planner and tool wiring on top. It complements rather than replaces entries in content/projects/inference-engines such as ollama and llama-cpp, either of which can sit behind the OpenAI-compatible provider setting.

## Getting Started

Clone, rename the env template, and start the full service set. The web interface comes up on port 3000 once the backend reports healthy:

```bash
git clone https://github.com/Fosowl/agenticSeek.git
cd agenticSeek
mv .env.example .env
./start_services.sh full
```

Then open http://localhost:3000 and set provider_name plus provider_model in config.ini.

## Key Use Cases

1. Offline competitive research: the agent queries SearXNG, reads the result pages, and ranks candidate CVs extracted from a local zip with no outbound API call.
2. Scripted prototyping: ask for a program in Python, C, Go or Java and let the coding agent write, run and debug it inside the configured WORK_DIR.
3. Multi-step planning: hand over a trip or project brief and let the planner decompose it across the browsing and coding agents before reporting back.

## Strengths

- Zero API keys required: Ollama, LM Studio and the bundled SearXNG instance cover both model and search, so the running cost is electricity.
- Agent selection is automatic, so you are not hand-picking between browsing and coding on every request.
- Session recovery keeps a long task alive across restarts when recover_last_session is enabled.
- GPL-3.0 with README translations into Chinese, French, Japanese, Portuguese, Spanish and Turkish.

## Limitations

This is a weekend-scale codebase that outgrew its own maintainers: one founder plus two volunteer maintainers, with roughly 27k stars arriving far faster than engineering capacity. Quality is entirely hardware-bound, and the project's own FAQ says a 14B model at 12 GB VRAM is usable for simple tasks but struggles with browsing and planning. Docker is mandatory even for a purely local install because SearXNG and Redis run as containers, and the SEARXNG_BASE_URL value in .env differs between web mode and CLI mode, which is a recurring support surface. Voice input and the Jarvis personality are both explicitly marked experimental, and config.ini does not tolerate comments.

## Relation to the Arsenal

This belongs in content/projects/agent-systems as the local-inference counterpart to the hosted coding agents sitting in the same phase. Pair it with content/projects/inference-engines entries such as ollama, which AgenticSeek consumes as a backend rather than reimplements, and contrast it against content/projects/frameworks entries such as LangGraph when you are weighing an explicit graph runtime over automatic agent selection.

## Resources

- [GitHub — Fosowl/agenticSeek](https://github.com/Fosowl/agenticSeek)
- [README quick start, config keys and hardware FAQ](https://github.com/Fosowl/agenticSeek#readme)
- [Project site — agenticseek.tech](http://agenticseek.tech)
