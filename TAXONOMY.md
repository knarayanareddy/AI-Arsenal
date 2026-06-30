# TAXONOMY.md — AI Arsenal Vocabulary Reference

This file is the single source of truth for controlled vocabulary used by schemas, templates, validation scripts, and future UI filters. Values not listed here must not appear in content frontmatter.

## Entry Types

`project` | `tool` | `paper` | `tip` | `build-example` | `person` | `digest`

## Project Categories

`agents` | `llms` | `rag` | `observability` | `multimodal` | `voice-audio` | `computer-vision` | `code-generation` | `data-pipelines` | `tooling` | `evaluation`

## Project Subcategories

`frameworks` | `agent-frameworks` | `multi-agent` | `autonomous` | `browser-agents` | `coding-agents` | `open-source-models` | `inference-engines` | `fine-tuning` | `quantization` | `vector-databases` | `document-processing` | `advanced-rag` | `tracing` | `monitoring` | `evaluation` | `models` | `libraries` | `platforms` | `datasets` | `tools`

## Project Types

`framework` | `model` | `tool` | `dataset` | `library` | `platform` | `service`

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

## Enrichment Status (Tools only)

Tracks editorial confidence for the new `phase`/`audience`/`best_when`/`avoid_when` fields introduced by the tools-vertical reorganisation. This is distinct from `verdict`/`maturity`, which describe the tool itself, not the catalog entry's research depth.

`draft` — best_when/avoid_when written from docs/marketing copy only; no third-party production usage evidence reviewed yet
`reviewed` — a maintainer has read the official docs and at least one third-party usage report (blog post, case study, issue thread)
`verified` — hands-on production usage by a maintainer or trusted contributor confirms the best_when/avoid_when conditions

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

