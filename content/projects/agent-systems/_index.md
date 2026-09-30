---
title: "Agent Systems"
section: "projects/agent-systems"
auto_generated: false
---

# Agent Systems

## What belongs here

Standalone agent platforms and systems you deploy and run — not frameworks you build with. Browser-automation agents, agent-native backend platforms, autonomous coding-agent products.

## What does NOT belong here

Libraries/SDKs for building your own agent belong in [Frameworks](../frameworks/_index.md); a framework used as a deployable product (e.g. a hosted version of a framework) still belongs in Frameworks unless the standalone-system framing is truly primary.

## Relation to the Tools vertical

Agent-system entries document the system's architecture and deployment model. For job-based comparisons against alternatives, see `content/tools/by-job/` and `content/tools/orchestration/`.

## Decision guidance

Before selecting an agent system:
- Key question to ask: am I deploying this as a running system, or importing it as a library to build my own agent? If the latter, see [Frameworks](../frameworks/_index.md) instead.
- If you need usage guidance rather than architectural depth: see [tools/by-job/](../../tools/by-job/_index.md)

## Projects in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Agent Systems in This Phase

### Recently Added

- [goose](./aaif-goose-goose.md)
- [agenticSeek](./agenticseek.md)
- [AionUi](./aionui.md)
- [airunner](./airunner.md)
- [opencode](./anomalyco-opencode.md)
- [AstrBot](./astrbot.md)
- [atomic-agent](./atomic-agent.md)
- [browser-harness](./browser-harness.md)
- [claude-video-vision](./claude-video-vision.md)
- [Codewhale](./codewhale.md)

### Most Popular

- [ECC](./ecc.md) — ⭐ 268797
- [Hermes Agent](./hermes-agent.md) — ⭐ 249768
- [opencode](./anomalyco-opencode.md) — ⭐ 210538
- [Browser Use](./browser-use.md) — ⭐ 116618
- [LobeChat (LobeHub)](./lobe-chat.md) — ⭐ 82874
- [screenshot-to-code](./screenshot-to-code.md) — ⭐ 73211
- [AnythingLLM](./anythingllm.md) — ⭐ 66555
- [Strix](./strix.md) — ⭐ 65378
- [OpenMontage](./openmontage.md) — ⭐ 61695
- [MemPalace](./mempalace.md) — ⭐ 59335

### Browse All

- [goose](./aaif-goose-goose.md) — Apache-2.0 Rust agent that installs dependencies, edits files, and runs commands locally, extended through provider-agnostic MCP tools
- [agenticSeek](./agenticseek.md) — Self-hosted Python agent that routes browsing, coding and planning work to a local Ollama or LM Studio model through a bundled SearXNG instance
- [AionUi](./aionui.md) — Electron desktop client that drives dozens of external CLI coding agents plus a bundled Office-document agent behind one visual workspace
- [airunner](./airunner.md) — PySide6 desktop application bundling a local chat companion and a layered image canvas over llama.cpp and whisper.cpp sidecar processes
- [opencode](./anomalyco-opencode.md) — MIT-licensed terminal coding agent in TypeScript that edits files, runs shell commands, and exposes a client/server session protocol
- [AnythingLLM](./anythingllm.md) — All-in-one desktop and Docker chat workspace bundling document RAG, agents and multi-user access
- [AstrBot](./astrbot.md) — Python IM-platform bot framework that fronts many LLM providers, a plugin marketplace, MCP servers and a code sandbox behind chat adapters
- [atomic-agent](./atomic-agent.md) — TypeScript terminal agent whose control loop runs on a TurboQuant-patched llama.cpp, with SQLite FTS5 memory and Playwright browser control
- [BISHENG](./bisheng.md) — Enterprise LLM devops platform pairing a flowchart workflow canvas with RAG pipelines, agent tools and model management in one console
- [browser-harness](./browser-harness.md) — Python harness that attaches a coding agent to your real Chrome over an editable CDP websocket and lets the agent write reusable helpers
- [Browser Use](./browser-use.md) — Open-source browser agent that drives Chrome for LLM, available as a Python library, a CLI, or hosted cloud browsers
- [claude-video-vision](./claude-video-vision.md) — Claude Code plugin that gives it ffmpeg-extracted video frames plus timestamped audio transcriptions from Whisper, Gemini or OpenAI
- [Codewhale](./codewhale.md) — Rust terminal agent that reads a repo, edits files and runs commands on hosted or local models, with fleet mode for multi-agent work
- [codexpro](./codexpro.md) — Local MCP server that hands a ChatGPT session bounded access to repositories you explicitly allow, over a local tunnel
- [conductor](./conductor-oss-conductor.md) — Apache-2.0 Java workflow engine giving long-running agent and microservice tasks durable retries, timers, and human steps
- [Continue](./continue.md) — Open-source coding agent shipped as a CLI, VS Code extension and JetBrains plugin, now frozen at a final 2.0.0 release
- [CowAgent](./cowagent.md) — Python agent harness with three-tier memory, a knowledge wiki, self-evolution loops and multi-agent teams on any major LLM provider
- [dao-code](./dao-code.md) — TypeScript terminal coding agent built around DeepSeek V4's prefix cache, keeping the system prefix and tool table byte-stable
- [DeepAnalyze](./deepanalyze.md) — Agentic LLM research system that runs the full data-science pipeline and writes analyst-grade reports
- [deepcode-cli](./deepcode-cli.md) — TypeScript terminal assistant tuned specifically for DeepSeek V4, exposing thinking mode, reasoning effort and agent skills
- [DeepSeek-Reasonix](./deepseek-reasonix.md) — Single-binary Go coding agent organised around prefix-cache stability, with plan mode, checkpoints and one engine reachable four ways
- [ECC](./ecc.md) — MIT-licensed harness layer installing 68 agents, 286 skills, hooks, memory and AgentShield scanning into Claude Code, Codex and others
- [big-AGI](./enricoros-big-agi.md) — Browser-and-server AI workbench bundling multi-provider chat, personas, image generation, voice, and sandboxed code execution behind one local interface
- [gini-agent](./gini-agent.md) — Bun-runtime personal agent whose gateway is the system of record, serving web, CLI, mobile, MCP and messaging clients over one API contract
- [GPT Engineer](./gpt-engineer.md) — Archived Python CLI that specified software in natural language and let a model write and execute it
- [GPT Researcher](./gpt-researcher.md) — Autonomous research agent that plans questions, fans out parallel scrapers, and publishes a cited report from web or local sources
- [harness-anything](./harness-anything.md) — Windows-only Python toolset driving WPS, Microsoft Office, Zotero, Illustrator and Photoshop through 47 CLI commands over COM automation
- [Hermes Agent](./hermes-agent.md) — Nous Research's self-improving personal agent with a TUI, messaging gateway, skill authoring and seven terminal backends
- [hive](./hive.md) — Python agent harness where a Queen agent loop spawns worker clones coordinated through a shared ledger, with crash-safe park and resume
- [huginn](./huginn-huginn.md) — MIT-licensed Ruby event-driven platform where agents watch sites, feeds, files, and webhooks and react on a schedule
- [ii-agent](./ii-agent.md) — Apache-2.0 agent framework and web app for building apps, slides, storybooks and research briefs, out of beta with BYOK model config
- [InsForge](./insforge.md) — Backend-as-a-service that exposes Postgres, auth, storage and edge functions to coding agents over MCP
- [InvokeAI](./invoke-ai-invokeai.md) — Apache-2.0 creative engine for Stable Diffusion with a managed asset database, board, and metadata stored per generation
- [kagent](./kagent-dev-kagent.md) — Kubernetes-native platform that runs AI agents as cluster workloads with declared tools, scheduled tasks, and event-driven triggers
- [Khoj](./khoj.md) — Self-hostable personal AI that searches your documents and the web, answers with citations, and runs scheduled automations from any surface
- [Leon](./leon.md) — TypeScript and Python personal assistant with native skills, layered memory and progressive computer use
- [LibreChat](./librechat.md) — Self-hostable ChatGPT-style web client with multi-user auth, agents, MCP, skills and a sandboxed code interpreter
- [browser](./lightpanda-io-browser.md) — AGPL-3.0 headless browser written in Zig that speaks CDP for fast agent navigation without a full rendering engine
- [Fooocus](./lllyasviel-fooocus.md) — GPL-3.0 minimal UI over SDXL and Flux that reduces image generation to prompt, style, aspect ratio, and advanced knobs
- [LobeChat (LobeHub)](./lobe-chat.md) — Self-hostable chat and agent workspace that hires, schedules and reports on a fleet of configured agents
- [loop-engineering](./loop-engineering.md) — Pattern library and npx CLI for running recurring agent loops around a codebase, with autonomy levels, cost tiers and a Loop Ready score
- [MaxKB](./maxkb.md) — Open-source knowledge-base agent platform with built-in RAG chunking, a workflow engine and MCP tool use in one Docker image
- [meetily](./meetily.md) — Tauri desktop app that captures meetings, transcribes locally with Parakeet or Whisper and summarises through Ollama or a hosted provider
- [MemPalace](./mempalace.md) — Local-first memory system that stores conversation history verbatim and retrieves it with scoped semantic search
- [Memvid](./memvid.md) — Single-file memory layer for agents that packs content, embeddings and search structure into an append-only sequence of Smart Frames
- [Mistral Vibe](./mistral-vibe.md) — Mistral's open-source terminal coding agent with subagent delegation, a trust-folder model and MCP support
- [ml-intern](./ml-intern.md) — Retired Hugging Face agent that researched, wrote and shipped ML code, now archived with its CLI and hosted app shut down
- [Mobile-Agent](./mobileagent.md) — Alibaba Tongyi Lab's GUI agent family pairing Mobile-Agent orchestration with GUI-Owl vision-language models
- [nanobot](./nanobot.md) — Lightweight self-hosted Python agent runtime with WebUI, chat channels, MCP tools, memory and an OpenAI-compatible API in one small core
- [nono](./nono.md) — Rust sandbox from the Sigstore team that confines coding agents with least-privilege policy and no daemon or container
- [omnigent](./omnigent.md) — Python meta-harness giving one orchestration, policy and sandboxing layer over Claude Code, Codex, Cursor, OpenCode, Hermes and custom agents
- [Open-AutoGLM](./open-autoglm.md) — Z.ai's Phone Agent framework that uses AutoGLM, VLM screen perception, planning, and ADB to control Android applications with confirmation and takeover paths
- [Open Code Review](./open-code-review.md) — Alibaba's open-sourced code review CLI that pairs deterministic rules pipelines with an LLM agent emitting line-level review comments
- [open-codex-computer-use](./open-codex-computer-use.md) — MCP server giving Codex, Claude Code and Gemini CLI non-intrusive desktop control through the OS accessibility API
- [OpenAI Swarm](./openai-swarm.md) — OpenAI's educational Python framework built on two primitives: an Agent and a handoff to another agent
- [OpenGUI](./opengui.md) — Kotlin backend and Android accessibility client that lets a vision-language agent read and operate real Android app interfaces
- [OpenMontage](./openmontage.md) — AGPL-3.0 agentic video production system driving twelve pipelines, 100+ tools and Remotion composition from a coding assistant
- [OpenOSINT](./openosint.md) — Python OSINT agent wrapping 20 real investigation tools behind a REPL, CLI, MCP server and web UI, with a statement-layer entity graph
- [opensquilla](./opensquilla.md) — Python microkernel agent whose local SquillaRouter picks the cheapest capable model per turn, with tool compression and one shared runtime
- [PageAgent](./page-agent.md) — JavaScript in-page GUI agent from Alibaba that controls web interfaces with natural language
- [parlor](./parlor.md) — Python FastAPI voice stack giving a browser full-duplex-feel conversation with Gemma 4 via llama.cpp, Kokoro TTS and smart-turn detection
- [Photo-agents](./photo-agents.md) — Python package with a perceive-reason-act loop, layered memory and CDP browser control, shipped with Streamlit, PyQt and IM bot clients
- [Portkey AI Gateway](./portkey-gateway.md) — Open-source AI gateway routing to 1,600+ language, vision, audio and image models with retries, fallbacks, guardrails and load balancing
- [Qwen-Agent](./qwen-agent.md) — Alibaba's agent framework for Qwen models with RAG, code interpreter, MCP and a Gradio demo application
- [QwenPaw](./qwenpaw.md) — AgentScope-based personal assistant with three-layer memory, kernel sandboxing, sub-agents and channels from DingTalk to Discord
- [RD-Agent](./rd-agent.md) — Microsoft agent framework that automates R&D — proposing ideas, writing and running code, and iterating on data-science/quant modeling and factor mining
- [re_gent](./re-gent.md) — Go CLI that version-controls agent activity in .regent/, so any line can be blamed to the prompt that wrote it
- [Refact.ai](./refact.md) — Archived Rust coding agent that planned, executed and iterated on engineering tasks inside the IDE
- [screenshot-to-code](./screenshot-to-code.md) — Converts screenshots, mockups, and Figma designs into working frontend code (HTML/Tailwind, React, Vue) using multimodal LLMs — with video-to-prototype support
- [SillyTavern](./sillytavern.md) — Local LLM front end unifying text, image and TTS backends with lorebooks, Visual Novel mode and a large extension ecosystem
- [Skyvern](./skyvern.md) — Vision-LLM browser automation with a Playwright-compatible SDK and a no-code workflow builder
- [Stagehand](./stagehand.md) — Browser agent SDK whose observe() returns real CSS selectors so credentials never reach the model
- [storm](./stanford-oval-storm.md) — MIT-licensed research system that researches a topic through perspective-guided questioning and writes a cited, Wikipedia-style article
- [harness-sdk](./strands-agents-harness-sdk.md) — Agent harness SDK that owns the control loop, session state, and tool routing for agents in Python and TypeScript
- [Strix](./strix.md) — Autonomous multi-agent penetration tester that runs your code dynamically and validates findings with working exploits
- [SuperAGI](./superagi.md) — Dev-first autonomous agent platform with a GUI, action console, toolkit marketplace and vector-backed memory
- [SWE-agent](./swe-agent-swe-agent.md) — Agent harness that attempts a real fix for a GitHub issue using a chosen LM inside a shell sandbox
- [Symphony](./symphony.md) — OpenAI engineering preview that monitors a work tracker and spawns isolated agent runs that deliver pull requests with proof of work
- [Tabby](./tabby.md) — Self-hosted coding assistant that runs completion and chat on your own GPU with no DBMS or cloud dependency
- [TensorZero](./tensorzero.md) — Rust LLMOps platform unifying a unified LLM gateway, observability, evaluation, optimization and experimentation in one deployment
- [thClaws](./thclaws.md) — Rust agent harness whose workspace holds several agents side by side, each isolated in its own folder and supervised process
- [trpc-agent-go](./trpc-agent-go.md) — Go-native agent framework with graph workflows, session memory, A2A, AG-UI, MCP and OpenTelemetry built in
- [UI-TARS Desktop](./ui-tars-desktop.md) — ByteDance multimodal agent stack shipping an MCP-based CLI and a native GUI agent for desktop control
- [Upsonic](./upsonic.md) — Python framework for autonomous and traditional agents with workspace-confined file and shell access plus a layered OCR interface
- [wesight](./wesight.md) — Electron control console for local coding agents, with one-click setup, model routing, IM channels and per-task runtime metrics
- [Whale](./whale.md) — Go terminal coding agent for DeepSeek with a claimed 98% prompt cache hit rate and JavaScript multi-agent workflows
- [zero](./zero-agent.md) — Go terminal coding agent supporting 25+ providers, scriptable exec mode, permission policies and durable local sessions
