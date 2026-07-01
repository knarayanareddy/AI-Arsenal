# TAXONOMY.md — AI Arsenal Vocabulary Reference

This file is the single source of truth for controlled vocabulary used by schemas, templates, validation scripts, and future UI filters. Values not listed here must not appear in content frontmatter.

## Entry Types

`project` | `tool` | `paper` | `tip` | `build-example` | `person` | `digest`

## Project Categories

`agents` | `llms` | `rag` | `observability` | `multimodal` | `voice-audio` | `computer-vision` | `code-generation` | `data-pipelines` | `tooling` | `evaluation`

## Project Subcategories

`frameworks` | `agent-frameworks` | `multi-agent` | `autonomous` | `browser-agents` | `coding-agents` | `open-source-models` | `inference-engines` | `fine-tuning` | `quantization` | `vector-databases` | `document-processing` | `advanced-rag` | `tracing` | `monitoring` | `evaluation` | `models` | `libraries` | `platforms` | `datasets` | `tools`

## Project Artifact Types

What kind of software artifact a project fundamentally is. Field: `artifact_type`. (Renamed from the original `Project Types` heading / `type` field during the Projects Vertical Reorganisation to free up `type` — now `phase` — for the folder-driving lifecycle classification below, which is a different axis: a project can be an artifact_type `library` and simultaneously a `phase` of `inference-engine`.)

`framework` | `model` | `tool` | `dataset` | `library` | `platform` | `service`

## Project Phases

The lifecycle-stage classification that determines a project's canonical folder under `content/projects/`. Field: `phase`. This mirrors the `phase` field on tool entries (see Tool Phases above) so both verticals share one "what stage of the stack is this" query axis, even though the two enums differ.

`foundation-model` — open-weight LLMs, embedding models, multimodal models, speech models: the weights themselves plus training code
`framework` — libraries and SDKs that other projects build on top of (PyTorch, Transformers, LangChain, LlamaIndex, JAX, etc.)
`inference-engine` — runtimes optimised for serving model weights (llama.cpp, vLLM, TGI, Ollama, ExLlamaV2, etc.)
`agent-system` — standalone agent platforms, multi-agent systems, autonomous coding agents: systems you deploy or run, not frameworks you build with
`data-and-retrieval` — vector DBs, embedding pipelines, RAG platforms, document processing systems, knowledge graph projects
`training-and-alignment` — fine-tuning frameworks, RLHF toolkits, alignment research implementations, dataset curation tools
`benchmark-and-eval` — evaluation harnesses, benchmark suites, leaderboard infrastructure, safety eval frameworks

## Project Domains

The subject-matter domain(s) a project addresses. Field: `domain` (array, min 1).

`language` | `vision` | `audio` | `multimodal` | `reinforcement-learning` | `reasoning` | `safety-and-alignment` | `general-purpose`

## Project Relation to Stack

What an engineer would actually DO with this project. Field: `relation_to_stack` (array, min 1).

`build-on-top` — use its API/library to build your own system
`deploy-as-is` — run it as a standalone service
`contribute-to` — extend or contribute to the project itself
`study-and-reference` — architecture reference, research baseline
`fork-and-adapt` — designed to be forked and customised

## Project Health Signals

Evidence-backed signals about a project's maintenance and adoption status. Field: `health_signals` (array, min 1). Never include `production-proven` without a named evidence source in the entry's Resources section; never include `actively-maintained` without checking commit recency at authoring time.

`actively-maintained` — commits in last 30 days, issues responded to
`community-driven` — primarily community contributors, not one org
`org-backed` — backed by a named org or company
`research-origin` — started as a paper implementation
`production-proven` — documented production deployments at scale
`experimental` — proof of concept, not stable API

## Ecosystem Position

Where a project sits relative to the rest of the stack. These values are used in prose within the Ecosystem Position body section (not a separate enum-constrained frontmatter array field), and every named project must resolve to a catalog entry or carry a TODO.

`upstream-dependency` — other major projects depend on this
`downstream-consumer` — consumes other projects as dependencies
`standalone` — minimal external AI dependencies
`competing` — direct alternative to named projects
`complementary` — designed to work alongside named projects

## Paper Categories

`architecture` | `training` | `inference` | `rag` | `agents` | `evaluation` | `alignment` | `multimodal` | `efficiency`

## Tip Categories

`prompting` | `inference-optimization` | `rag-tuning` | `cost-reduction` | `debugging-llm-apps` | `latency-optimization` | `context-window-management` | `agent-reliability` | `production-gotchas` | `local-model-tips` | `security-best-practices`

## Tool Jobs

`prototyping` | `production-serving` | `fine-tuning` | `evaluation` | `deployment` | `orchestration` | `vector-search` | `memory-management` | `web-scraping` | `structured-output` | `prompt-management` | `data-labeling` | `model-registry` | `security-and-guardrails` | `tracing` | `monitoring`

## Tool Phases

The lifecycle stage a tool primarily serves in an AI engineering system. Every tool entry has exactly one primary `phase`, which also determines its folder under `content/tools/`. A tool may still carry multiple `job` tags (its specific functions); `phase` is the higher-level "where does a new engineer look first" placement.

`data-ingestion` — loaders, scrapers, parsers, chunkers, embedding/annotation pipelines, vector search
`model-layer` — LLM/image providers, local runners, fine-tuning, model hubs and registries, structured generation libraries
`orchestration` — agent frameworks, workflow/pipeline schedulers, routers, memory, tool-use
`serving-and-deployment` — inference servers, gateways, containerization, scaling, hosting platforms, proxies
`evaluation-and-observability` — evals, tracing, monitoring, security/guardrail scanning, drift detection, logging
`dx-and-tooling` — SDKs, CLIs, notebooks/demo UIs, prompt management, IDE/terminal assistants, testing utilities

## Tool Audience

The primary context a tool is built for. A tool may serve more than one audience.

`prototype` — speed of setup is the priority; PoC / hackathon / early exploration context
`production` — reliability, scalability, SLA, and support matter
`research` — benchmarking, comparison, academic, or experimental use

## Build Example Difficulty Levels

`starter` | `intermediate` | `advanced`

## Maturity Levels

`experimental` — <1 month old or early alpha, use at your own risk
`alpha` — Active development, API unstable
`beta` — Feature complete, production use possible
`production` — Stable, widely used in production

## Cost Models

`open-source` — Free, open source code
`freemium` — Free tier plus paid tiers
`paid` — Requires payment, no meaningful free tier
`self-hostable` — Can run on your own infrastructure
`usage-based` — Pay per use (tokens, API calls)

## Stack / Language

`python` | `typescript` | `rust` | `go` | `java` | `cpp` | `julia` | `polyglot`

## Primary Languages

`Python` | `TypeScript` | `Rust` | `Go` | `Java` | `C++` | `Julia` | `Other`

## Tag Taxonomy

### Domain Tags

`agents` | `rag` | `llm` | `fine-tuning` | `embeddings` | `evaluation` | `inference` | `multimodal` | `voice` | `vision` | `code-gen` | `data` | `observability` | `research` | `training`

### Capability Tags

`streaming` | `batching` | `caching` | `quantization` | `distillation` | `alignment` | `rlhf` | `reasoning` | `tool-use` | `structured-output` | `memory` | `planning` | `routing` | `orchestration` | `graphs` | `stateful` | `retrieval` | `chunking` | `tracing` | `monitoring` | `guardrails` | `security` | `transformers` | `attention` | `efficiency`

### Infrastructure Tags

`self-hosted` | `cloud` | `serverless` | `edge` | `local` | `docker` | `kubernetes`

### Stack Tags

`langchain` | `llamaindex` | `openai` | `anthropic` | `huggingface` | `pytorch` | `jax` | `onnx` | `triton`

### Quality Tags

`trending` | `featured` | `foundational` | `sota` | `benchmark` | `experimental` | `battle-tested` | `community-favorite` | `new-arrival`

## Enrichment Status (Tools and Projects)

Tracks editorial confidence in a catalog entry's research depth. For tools, this covers the `phase`/`audience`/`best_when`/`avoid_when` fields introduced by the tools-vertical reorganisation. For projects, this covers `phase`/`domain`/`relation_to_stack`/`health_signals`/`ecosystem_role`/`best_for`/`avoid_if` plus the sourced-architecture and named-ecosystem-position claims introduced by the projects-vertical reorganisation. This is distinct from `verdict`/`maturity` (tools) or `health_signals`/`maturity` (projects), which describe the entry's subject, not the catalog entry's research depth.

`draft` — written from the project/tool's own docs or marketing copy only; no third-party production usage evidence, paper citation, or dependency-graph verification reviewed yet
`reviewed` — a maintainer has read the official docs/paper and at least one third-party source (blog post, case study, issue thread, dependent-repo evidence)
`verified` — hands-on production usage, or a maintainer-confirmed architecture/ecosystem claim backed by a primary source, confirms the entry's claims

## Verdict Values (Tools only)

`best-in-class` | `recommended` | `solid-choice` | `use-with-caution` | `deprecated` | `watching`

## Importance Values (Papers only)

`foundational` | `sota` | `incremental` | `benchmark` | `survey`

## Impact Values (Tips only)

`low` | `medium` | `high`

## Difficulty Values (Tips only)

`beginner` | `intermediate` | `advanced`

## Status Values

`active` | `archived` | `deprecated` | `watching`

## Buzz Sources

`x-twitter` | `youtube` | `hackernews` | `reddit` | `arxiv` | `github-trending` | `newsletter` | `conference` | `podcast`

## Reserved IDs

`index` | `registry` | `overview` | `introduction` | `readme` | `agent` | `context` | `taxonomy` | `contributing` | `governance` | `changelog` | `security` | `template` | `all` | `none` | `undefined` | `null` | `true` | `false`

