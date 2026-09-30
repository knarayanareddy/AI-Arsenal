---
id: photo-agents
name: Photo-agents
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Python package with a perceive-reason-act loop, layered memory and CDP browser control, shipped with Streamlit, PyQt and IM bot clients"
github_url: "https://github.com/jmerelnyc/Photo-agents"
license: MIT
primary_language: Python
tags: [memory, tool-use, research, pytorch]
maturity: beta
cost_model: open-source
github_stars: 674
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-07-03"
docs_url: "https://github.com/jmerelnyc/Photo-agents#readme"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Treats agent memory as layered storage of bounded visual observations rather than a growing transcript, and lets the agent write its own skills."
best_for:
  - "You want an agent that grounds itself in what is on screen rather than in a growing chat log, because observations are stored in explicit layers."
  - "You want a single Python package that bundles an agent loop, a provider router, browser automation and several frontends, without assembling four projects."
  - "You want to experiment with self-written skills, because the agent promotes procedures it has actually succeeded at into reusable SOPs."
avoid_if:
  - "You want a fully offline runtime, because the agent loop needs a network-reachable LLM provider even though memory and skills stay local."
  - "You need an unlicensed or unattended deployment, because the whole runtime is gated behind a remote-validated Photo Agents API key checked on every start."
  - "You need a stable 1.0 API, because the project is labelled beta with an explicit note that APIs may change before 1.0."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license (MIT), last commit, primary language, topics and issue count came from the GitHub API. Install commands, memory layers, client list, on-disk state table, credential flow and the beta status note are read from the official README; the package was not installed or run."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Photo Agents is a single pip-installable Python package organised around a streaming agent loop that drives any tool-calling LLM through a perceive, reason, act cycle. On top of that sits a multi-provider router with native Anthropic and OpenAI support plus a mixin failover session, and a physical-execution toolset: file I/O, sandboxed code execution across Python, PowerShell and bash, browser automation through a Chrome DevTools Protocol bridge with a DOM simplifier, and a four-level memory system (working, global, SOP, session archive). Clients are pluggable, including a Streamlit web app, a PyQt desktop app, a desktop companion and ready-to-run bots for Telegram, QQ, Feishu, WeCom and DingTalk, with optional Langfuse observability and a cron-style scheduler. State lives under ~/.photoagents/ with a vector index for skill and SOP search.

## Why it's in the Arsenal

The design bet is that memory should behave like layered storage rather than a transcript: bound what the agent observes, file it into working, global, SOP or session levels, and let retrieval pull only what the current task needs. Skills are then written from real success rather than authored up front, which is the self-evolving part. The cost is that this is a beta package with a remote licence gate, so it is not the choice for a fully air-gapped or unattended deployment, and the layered memory model needs tuning before it is an advantage.

## Architecture

The core agent loop streams tool calls from the selected provider and dispatches them through the tool registry; the LLM router picks native Anthropic or OpenAI sessions based on keyword rules in credentials.py, with a mixin mode that fails over between them. Perception comes from the CDP bridge plus a DOM simplifier that reduces pages before they reach the model. Memory is four-layered: working context for the current task, a global facts file, SOP-level reusable procedures, and a raw session archive, with a vector index over skills and SOPs for retrieval. Reflection runs through the evolution scheduler, whose check() function fires the next task, which is how the self-evolving loop advances without external prompting. Clients launch the same API.

## Ecosystem Position

Photo Agents overlaps with AutoGen and CrewAI on the loop and with LangGraph on multi-provider routing, but is distributed as a monolithic local package with frontends rather than a library, so it competes with agentic desktop tools rather than with frameworks. Compared with content/projects/agent-systems entries such as CowAgent, the memory design is the distinguishing feature: layered bound observations versus wiki-plus-graph distillation. The CDP browser layer overlaps with browser-harness in the same phase, and the multi-client IM bots overlap with AstrBot, though here they are conveniences rather than the product. If you want memory as a service you call from your own code, the data-and-retrieval phase holds the dedicated frameworks instead.

## Getting Started

pip install, set the API key, and run the REPL or a one-shot task:

```bash
pip install photoagents
# or with every optional client and integration
pip install "photoagents[all]"
python -m photoagents
python -m photoagents --task my_task --input "List the largest files in this directory."
```

Provide the key via PHOTOAGENTS_API_KEY, ~/.photoagents/config.json, or the first-run prompt, and copy credentials.py from the template for your provider.

## Key Use Cases

1. Screen-grounded automation: run a task that perceives the live browser or desktop through CDP, acts, and stores what it observed in the right memory layer rather than a transcript.
2. Self-authored skills: let the agent promote a procedure it succeeded at into an SOP that later tasks retrieve through the vector index.
3. Multi-channel personal agent: reach the same loop from Telegram, QQ, Feishu, WeCom or DingTalk, or from the Streamlit or PyQt frontends.

## Strengths

- Layered memory with a vector index over skills and SOPs, so recall is scoped rather than a growing context dump.
- Self-written skills derived from real success, which is a harder and more useful thing to get right than prompt templates.
- One package covers the loop, provider routing, sandboxed execution, CDP browser control and five IM clients.
- Optional Langfuse observability and a cron-style reflection scheduler for observability and unattended progression.

## Limitations

The remote-validated API key gate is the most consequential design choice and the least conventional: the runtime refuses to start without it, which rules out air-gapped and unattended deployment and means the licence check is a network dependency at every launch. Beta status with pre-1.0 API volatility means integration work will need revisiting. Self-authored skills and reflection are powerful and hard to constrain; the agent deciding what to remember and what to promote needs supervision. Memory growth on disk is unbounded in practice with session archiving, and the vector index adds a component to keep consistent. A single open issue on a 674-star repository suggests either excellent hygiene or a very small user base.

## Relation to the Arsenal

This is the memory-and-perception experiment in content/projects/agent-systems, closest in spirit to the agent-memory entries in content/projects/data-and-retrieval but shipped as a whole runtime rather than a memory library. Its CDP browser layer sits beside browser-harness in this same phase, and its IM clients overlap with AstrBot and CowAgent, which approach the same reach problem differently. If you want to build the loop yourself with memory as a swappable component, the frameworks phase plus the data-and-retrieval memory frameworks are the composition this package hides.

## Resources

- [GitHub — jmerelnyc/Photo-agents](https://github.com/jmerelnyc/Photo-agents)
- [PyPI — photoagents](https://pypi.org/project/photoagents/)
- [Project README with client and state layout](https://github.com/jmerelnyc/Photo-agents#readme)
