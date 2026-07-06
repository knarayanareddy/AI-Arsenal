# TAXONOMY.md — AI Arsenal Vocabulary Reference

This file is the single source of truth for controlled vocabulary used by schemas, templates, validation scripts, and future UI filters. Values not listed here must not appear in content frontmatter.

## Entry Types

`project` | `tool` | `paper` | `tip` | `build-example` | `person` | `digest` | `architecture` | `observability` | `community` | `benchmark`

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

## Research Phases

The lifecycle/topic classification that determines a research entry's canonical folder under `content/research/`. Field: `phase`. This mirrors the `phase` field on tool and project entries (see Tool Phases, Project Phases above) so all three verticals share one "what stage/area of the stack is this" query axis, even though the three enums differ — for research, `phase` classifies by the paper's PRIMARY contribution area, not every topic it touches.

`foundational` — seminal works that redefined the field (Attention Is All You Need, BERT, GPT-3-style scaling papers, foundational technical reports for widely-used model families). Reserved for genuinely field-defining works, not merely "important" or "influential" papers.
`architectures` — model design: attention variants, MoE, positional encodings, context extension, efficient transformers, state-space models (Mamba etc.)
`training-and-alignment` — pretraining objectives, RLHF, DPO, instruction tuning, PEFT, LoRA/QLoRA, constitutional AI, reward modeling
`inference-and-efficiency` — quantization, distillation, pruning, speculative decoding, batching, KV cache optimisation, flash attention
`retrieval-and-memory` — RAG, dense retrieval, hybrid search, long-context memory, knowledge graphs, vector indexing, ColBERT, HyDE
`agents-and-reasoning` — chain-of-thought, tool use, ReAct, multi-agent, planning, self-reflection, code generation, function calling
`evaluation-and-safety` — benchmark design, red-teaming, alignment evals, factuality, hallucination, bias measurement, safety frameworks
`surveys` — comprehensive literature surveys of a subfield, included only when the survey itself functions as a primary engineering reference (engineers use it as a navigational map, not merely a reading list)

## Research Venues

`neurips` | `icml` | `iclr` | `acl` | `emnlp` | `arxiv-preprint` | `blog-post` | `technical-report` | `other`

## Practical Applicability

Field: `practical_applicability` (papers only). Be honest — most papers are `medium` or `low`; inflating this value degrades catalog usefulness.

`high` — engineers should change how they build things NOW
`medium` — useful context; applies in specific scenarios
`low` — narrow application; most engineers won't use directly
`theoretical` — foundational understanding; rarely applied directly (not a demotion — an honest classification, see Rule R-9 in the research-vertical authoring prompt)

## Reproduction Status

Field: `reproduction_status` (papers only). Reflects whether a paper's results have been independently validated, checked at authoring/review time against Papers With Code, official code releases, and independent reimplementations.

`reproduced` — independently reproduced by a third party
`partially-reproduced` — some results reproduced, not all
`not-reproduced` — no known independent reproduction
`code-available` — official code released but no known third-party reproduction
`no-code` — no code released

## Research Result Status

Field: `result_status` (papers only). Whether a paper's central claims still represent current best practice.

`current` — results still represent good practice
`superseded` — a better approach now exists in the catalog (must set `superseded_by`)
`challenged` — results disputed or failed to replicate elsewhere
`foundational` — baseline; superseded in practice but still taught/required knowledge

## Tip Categories

`prompting` | `inference-optimization` | `rag-tuning` | `cost-reduction` | `debugging-llm-apps` | `latency-optimization` | `context-window-management` | `agent-reliability` | `production-gotchas` | `local-model-tips` | `security-best-practices`

## Tip Phases

The lifecycle/problem-area classification that determines a tip's canonical folder under `content/tips-and-tricks/`. Field: `phase`. This mirrors the `phase` field on tool, project, and research entries (see Tool Phases, Project Phases, Research Phases above) so all four verticals share one "what stage/area of the stack is this" query axis, even though the enums differ. Assign by the PROBLEM the tip solves, not the technology it uses. `category` (above) is retained unchanged as the pre-existing free-text-adjacent classification; `phase` is the new, folder-driving axis — the two are not required to be identical for a given entry (a `rag-tuning`-categorized tip can live in `rag-and-retrieval/`).

`prompting` — system prompt design, few-shot construction, instruction clarity, output format control, prompt compression, template patterns
`rag-and-retrieval` — chunking strategies, embedding choices, reranking, hybrid search, query transformation, context window management specific to retrieved content, metadata filtering
`agents-and-orchestration` — tool definitions, step budgets, error recovery, memory management, loop termination, parallelisation, handoff patterns
`evaluation` — eval harness setup, metric selection, golden dataset construction, LLM-as-judge calibration, regression detection
`inference-and-serving` — batching, caching, quantisation tradeoffs, streaming, timeout handling, fallback routing, cost controls specific to serving infrastructure
`fine-tuning` — dataset preparation, learning rate schedules, LoRA rank selection, validation split strategy, catastrophic forgetting prevention
`debugging-and-observability` — tracing setup, log structuring, prompt/response capture, error classification, latency profiling, cost attribution
`cost-and-performance` — token budgeting, model selection for cost, caching strategies, request batching, prompt compression for cost

## Tip Effort

Field: `effort` (new). Time-to-implement bucket — the axis that gates whether something qualifies as a tip at all. `day` is a hard ceiling: if a practice takes longer than one engineer-day to implement, it is not a tip and belongs in `build-examples/` or `architectures/` instead.

`minutes` — < 30 minutes
`hours` — 30 minutes to 4 hours
`day` — 4 hours to 1 day (hard ceiling — if longer, not a tip)

## Tip Verification Status

Field: `verification_status` (new). Tracks how a tip's claimed effect has actually been confirmed — distinct from `enrichment_status` (below), which tracks the catalog entry's own editorial confidence.

`production-verified` — confirmed working in production system(s), with evidence
`lab-verified` — confirmed working in a controlled test, not yet production
`community-reported` — reported by community, not independently verified by Arsenal maintainers
`theoretical` — sound in principle, not yet verified

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

## Build Example Phases

The lifecycle/system-type classification that determines a build example's canonical folder under `content/build-examples/`. Field: `phase`. This mirrors the `phase` field on tool, project, research, and tip entries (see Tool Phases, Project Phases, Research Phases, Tip Phases above) so all five verticals share one "what stage/area of the stack is this" query axis, even though the five enums differ. Assign by the PRIMARY system being built, not the tools used — a RAG system with an evaluation step still belongs in `rag-systems`, not `evaluation-pipelines`, unless the evaluation harness itself is the primary artifact being built. Never duplicate a build example across two phase folders; if a build genuinely spans multiple phases, assign it to the phase representing the hardest and most novel part of the build, and note the non-obvious placement decision in the entry's `enrichment_notes`.

`rag-systems` — retrieval-augmented generation systems: basic RAG, advanced/production RAG, hybrid search, multi-document RAG, agentic RAG, RAG with reranking or self-correction
`agent-systems` — autonomous agents, multi-agent systems, tool-using agents, coding agents, research agents, human-in-the-loop agent workflows
`fine-tuning-workflows` — LoRA/QLoRA fine-tuning, instruction tuning, DPO/RLHF pipelines, dataset preparation, fine-tune-plus-eval-plus-deploy loops
`evaluation-pipelines` — builds where the PRIMARY artifact is the evaluation system itself: LLM-as-judge setups, golden dataset construction, automated regression testing, benchmark harnesses, eval dashboards
`production-deployment` — builds where the PRIMARY challenge is deployment/serving rather than the AI system's own logic: inference server setup, load balancing, gateway configuration, an observability stack, cost monitoring, A/B testing pipelines
`multimodal` — vision+language, audio+language, document-image understanding, image-generation pipelines, speech systems
`data-pipelines` — ingestion, chunking, and embedding pipelines; document processing; knowledge-base construction; data-quality and deduplication systems

## Build Example Difficulty

Field: `difficulty`. Time/complexity bucket describing how much an engineer needs to already know and how much infrastructure the build touches — distinct from `estimated_time`, which is the concrete hour/day range for this specific build.

`starter` — engineer new to this pattern; uses high-level abstractions; ~2-8 hours
`intermediate` — engineer familiar with the pattern; touches infrastructure; ~1-3 days
`advanced` — experienced engineer; custom components, production concerns; ~3-5 days

## Build Example Status

Field: `build_status`. Tracks whether a build example has actually been run end-to-end by a named author/maintainer, distinct from `enrichment_status` (below), which tracks general editorial confidence.

`tested` — author verified end-to-end on the stated environment; versions pinned
`untested` — structure is correct but not end-to-end verified by Arsenal maintainers
`outdated` — was tested but stack versions have changed significantly since the last review
`community-built` — contributed by the community; not yet verified by maintainers

## Build Example Outcome

Field: `outcome`. What kind of finished system the build produces — sets the reader's expectations for how much further work is required before shipping.

`working-prototype` — a running system, not production-ready
`production-ready` — includes error handling, logging, config management, and has been tested under load
`learning-reference` — optimised for understanding over production use

## Architecture Categories

The category classification that determines an architecture entry's canonical folder under `content/architectures/`. Field: `category`. This mirrors the `phase`/`category` field on every other vertical (see Tool Phases, Project Phases, Research Phases, Tip Phases, Build Example Phases above) so all six verticals share one "what stage/area of the stack is this" query axis, even though the six enums differ. Assign by the PRIMARY architectural decision being made, never by the tools mentioned in the entry. `model-selection` is for choosing WHICH model/provider once a category has already decided WHETHER to use one — that "whether" decision belongs in `system-design`. `reference-stacks` is exclusively for complete, multi-tool stack recommendations; a comparison of two individual tools belongs in the `tools/` vertical, not here.

`system-design` — approach-level forks that determine the fundamental shape of a system: RAG vs fine-tuning, monolithic vs microservices, synchronous vs asynchronous, stateless vs stateful, client-side vs server-side
`data-strategy` — SQL vs vector vs hybrid storage, online vs offline processing, streaming vs batch, data warehouse vs data lake
`model-selection` — open-weight vs API, model size tradeoffs, local vs cloud, general vs domain-specific, single-model vs ensemble, agent-framework selection
`serving-patterns` — real-time vs batch inference, edge vs cloud, caching strategies, load-balancing patterns, rate-limiting approaches
`evaluation-strategy` — LLM-as-judge vs human eval, offline vs online eval, regression vs exploration testing, benchmark selection
`reference-stacks` — end-to-end, multi-tool stack recommendations for common patterns (a full production RAG stack, an agent-observability stack) — never a single-tool comparison, which belongs in `tools/`

## Architecture Decision Type

Field: `decision_type`. Describes the *shape* of the choice this entry helps make, distinct from `category` (which describes the subject-matter area of the decision).

`fork` — mutually exclusive choices (RAG XOR fine-tuning for a given knowledge-injection need)
`spectrum` — a sliding scale rather than a binary choice (model size, cost vs quality)
`composition` — compatible choices that are typically combined, not chosen between (RAG + function calling + structured output)
`progressive` — staged decisions that change over a system's lifecycle (prototype first, then optimize, then scale)

## Architecture Tradeoff Dimensions

The controlled set of dimensions an architecture entry's `approaches[].tradeoffs` object may score approaches against. Not every entry uses every dimension — use only the dimensions that are actually relevant to the decision being described.

`cost` | `latency` | `accuracy` | `complexity` | `flexibility` | `scalability` | `reliability` | `interpretability` | `data-requirements` | `compute-requirements`

## Architecture Confidence

Field: `confidence`. An honest signal of how settled the tradeoffs in this entry actually are — this is the primary defense against Failure Mode 2 (the outdated tradeoff): an entry marked `evolving` is telling the reader to weight `tradeoffs_as_of` more heavily and re-verify before relying on it, while `established` signals the tradeoffs are unlikely to have shifted materially since `tradeoffs_as_of`.

`established` — consensus best practices, proven at scale, unlikely to shift soon
`emerging-consensus` — the pattern is spreading and gaining adoption but is not yet a standard default
`context-dependent` — no field-wide consensus exists; the right choice genuinely depends heavily on the specific system, and this entry's job is to name the deciding factors, not to pick a winner
`evolving` — the landscape is actively shifting (new techniques, changing cost curves) such that tradeoffs stated today may not hold in 6-12 months

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

## Observability Categories

The category classification that determines an observability entry's canonical folder under `content/observability/`. Field: `category`. This mirrors the category/phase field on every other vertical (see Tool Phases, Project Phases, Research Phases, Tip Phases, Build Example Phases, Architecture Categories above) so all seven verticals share one "what stage/area of the stack is this" query axis, even though the enums differ. Assign by the PRIMARY operational intent (debug vs evaluate vs govern vs respond), never by which tool is mentioned. Never duplicate an entry across categories; use `related_*` cross-links in frontmatter instead.

`instrumentation` — what to capture: event schemas, required/optional fields, correlation IDs, sampling strategy, redaction rules
`tracing` — assembling captured events into traces/spans: OpenTelemetry/OpenInference patterns, agent-graph tracing
`evaluation-quality` — offline/online evaluation loops, golden dataset promotion from production failures, LLM-as-judge calibration, drift detection
`monitoring-alerting` — SLOs, alert rules, canary deployments, regression monitors, dashboards
`cost-usage` — cost attribution, token accounting, caching impact, budget/anomaly alerting
`privacy-governance` — PII handling in telemetry, retention policy, access controls for raw traces/logs, compliance checklists
`incident-response` — runbooks, triage, rollback, kill-switches, postmortems specific to AI system failure modes

## Signal Types

Field: `signal_types` (array, min 1). The operational signal(s) an observability entry's pattern is designed to improve or protect.

`latency` | `cost` | `quality` | `safety` | `reliability` | `throughput` | `user-satisfaction`

## Data Sensitivity

Field: `data_sensitivity` (array, min 1). The sensitivity level(s) of data an observability pattern's captured events may contain — drives whether `## Privacy & Governance` guidance is load-bearing or largely inapplicable for a given entry. An entry touching `pii`, `secrets`, or `regulated` data must state concrete redaction/retention/access guidance, not a generic disclaimer.

`public` — no sensitivity concern (e.g. aggregate latency counts with no user-identifying context)
`internal` — not public, but not personally identifying or regulated (e.g. internal feature names, environment tags)
`pii` — may contain personally identifying information (e.g. raw user prompts, session content)
`secrets` — may contain credentials, API keys, or tokens (e.g. unredacted tool call arguments)
`regulated` — subject to specific regulatory regimes (health, financial, or similar regulated data categories)

## Deployment Scope

Field: `scope`. Whether an observability pattern's requirements (particularly around privacy/governance and alerting rigor) assume a prototype or a production deployment. A `production` entry must satisfy the full instrumentation-contract and privacy-governance bar; a `prototype` entry may reasonably defer some of that rigor, but must say so explicitly rather than silently omitting it.

`prototype` | `production`

## Verification Status (Observability)

Field: `verification_status` (observability entries). Distinct from the Tip Verification Status enum above (same value set, but tracked separately since it applies to a different entry type with its own schema) — tracks how an observability pattern's claimed effectiveness has actually been confirmed.

`production-verified` — confirmed working in a named production system, with the evidence type described in the entry's Validation Checklist or Resources section
`lab-verified` — confirmed working in a controlled test, not yet production
`community-reported` — reported by the community, not independently verified by Arsenal maintainers
`theoretical` — sound in principle, not yet verified

## Community Entity Kinds

The entity-kind classification that determines a community entry's canonical folder under `content/community/`. Field: `kind`. This mirrors the category/phase field on every other vertical (see Observability Categories, Architecture Categories, Build Example Phases, Tip Phases, Research Phases, Project Phases, Tool Phases above) so all eight verticals share one "what folder does this belong in" query axis. Assign by where the PRIMARY interaction actually happens (e.g. a Slack-based community is `chat` even if it also has a public forum), never by which platform brand is best known. Never duplicate an entry across kinds; use `related_communities` cross-links in frontmatter instead. Distinct from the pre-existing `person` entry type (`content/community/people/`), which is out of scope for this classification — an individual educator with a newsletter/podcast/YouTube channel is a `person` entry, not a `creator`-kind community entry, unless the channel/publication is run by an organisation or a channel not already tracked as a named person's `channels[]`.

`forum` — Discourse forums, web forums, subreddits: primarily asynchronous, threaded, searchable discussion
`chat` — Discord, Slack, Matrix, Telegram: primarily synchronous or near-synchronous messaging
`newsletter` — email/Substack-style newsletters and weekly digests published by an organisation or outlet (not an individually-tracked person's own newsletter channel — see `person.channels[]`)
`event` — recurring conferences or workshop series (not a one-off, non-recurring event)
`meetup` — local or globally-federated recurring in-person/hybrid meetup networks
`creator` — high-signal organisational or multi-person educational channels (podcast, YouTube, blog) not already tracked as an individual `person` entry's `channels[]`
`dataset` — community-maintained datasets or data collections that are not tool/project catalog entries in their own right

## Community Topics

Field: `topics` (array, min 1). The subject-matter focus area(s) a community entry serves.

`llm-engineering` | `rag` | `agents` | `fine-tuning` | `evals` | `observability` | `open-source` | `safety` | `multimodal` | `infra` | `research`

## Community Audience

Field: `audience` (array, min 1). Who a community entry is realistically useful for.

`beginner` | `practitioner` | `researcher` | `founder` | `enterprise`

## Community Activity Level

Field: `activity_level`. How frequently a community is genuinely active, based on the most reliable public signal observable at `last_checked` (see the activity_level rubric in `docs/automation-policy.md`). Must be re-derived from a concrete, dated signal every time `last_checked` is updated, never carried forward unverified.

`very-active` — daily posts/messages, or weekly-or-more newsletter/event cadence
`active` — activity every few days to roughly weekly
`intermittent` — activity in bursts, roughly 15-90 days between signals depending on kind
`quiet` — last signal is older than 60-90 days but the space is not dead
`unknown` — no credible public activity signal could be found, or the space is private/invite-only with no public indicators

## Community Safety Level

Field: `safety_level`. Whether a community can be recommended without caveats. An entry with `safety_level` other than `generally-safe` must carry a non-empty `safety_notes[]` explaining why, per the Validator rule in this vertical's reorganisation brief.

`generally-safe` — no material safety, moderation, or trust concerns identified
`caution` — has a documented concern (e.g. past moderation failure, low-signal/spam activity, a specific data-safety incident) that a reader should know about before joining/using, but the community/resource is still net-recommendable with that context
`avoid` — overwhelming spam, scam activity, or harassment-prone moderation; recommending this space without a strong caveat would actively mislead a reader

## Community Access

Field: `access`. What it costs (in access terms, not necessarily money) to participate.

`public` — open to anyone, no approval or payment required
`invite-only` — requires an invitation, application, or approval step
`paid` — requires a paid subscription or membership to fully participate

## Benchmark Categories

The category classification that determines a benchmark entry's canonical folder under `content/benchmarks/`. Field: `category`.

`general-llm` — broad capability benchmarks (reasoning, knowledge, instruction-following)
`code` — coding benchmarks
`retrieval-rag` — retrieval + RAG evaluation benchmarks
`agents` — agent / tool-use benchmarks
`safety` — harmfulness / jailbreak / bias / safety evals
`multimodal` — vision+language, doc understanding, video/audio multimodal
`evaluation-methods` — meta: benchmark design, judge calibration, contamination detection

## Benchmark Modalities

Field: `modality` (array, min 1).

`text` | `code` | `vision` | `audio` | `multimodal`

## Benchmark Status

Field: `status`.

`active` — benchmark is actively maintained and widely used
`deprecated` — benchmark is no longer recommended for new evaluations
`superseded` — a better benchmark now exists (set `superseded_by`)
`contested` — validity disputed / heavy gaming / broken protocol
`contaminated` — known leakage or training contamination concerns

## Protocol Confidence

Field: `protocol_confidence`.

`well-specified` — protocol is clear and widely replicated
`ambiguous` — multiple incompatible variants exist
`evolving` — protocol/versions changing rapidly

## Score Interpretation

Field: `score_interpretation`.

`higher-is-better` | `lower-is-better` | `mixed`

## Enrichment Status (Tools, Projects, Research, Tips, Build Examples, Architectures, Observability, Community, and Benchmark)

Tracks editorial confidence in a catalog entry's research depth. For tools, this covers the `phase`/`audience`/`best_when`/`avoid_when` fields introduced by the tools-vertical reorganisation. For projects, this covers `phase`/`domain`/`relation_to_stack`/`health_signals`/`ecosystem_role`/`best_for`/`avoid_if` plus the sourced-architecture and named-ecosystem-position claims introduced by the projects-vertical reorganisation. For research, this covers the point-in-time claims introduced by the research-vertical reorganisation: `result_status`, `reproduction_status`, `citation_count_approx`, and post-publication critique/reproduction findings in the Reproductions & Follow-up Work section. For tips, this covers `verification_status` and any `metrics` claims introduced by the tips-vertical reorganisation — a tip with `verification_status: theoretical` should also carry `enrichment_status: draft` per Q4 of the Practitioner's Five Questions. For build examples, this covers whether `build_status: tested` is backed by a real, named `tested_on` environment versus asserted without verification — a build example with `build_status: untested` or `community-built` should also carry `enrichment_status: draft` until a maintainer has independently run it end-to-end. For architectures, this covers whether `tradeoffs_as_of` reflects a genuine, current re-verification of the stated tradeoffs versus an inherited or unverified date — an entry with `confidence: evolving` should also carry `enrichment_status: draft` or `reviewed` (not `verified`) unless the tradeoffs were checked against current evidence within the last few months. For observability, this covers whether an entry's `verification_status: production-verified` claim is backed by a described evidence type (a named production system, an incident retro, a measured before/after) versus asserted without evidence — an entry with `verification_status: theoretical` or `community-reported` should also carry `enrichment_status: draft` until a maintainer independently confirms the pattern against a real system. For community entries, this covers whether `activity_level`/`activity_evidence` reflect an independently re-checked, dated public signal versus an inherited or stale claim — an entry with `activity_level: unknown` should also carry `enrichment_status: draft` until a maintainer finds and records a concrete signal. For benchmarks, this covers whether `protocol_confidence`, `known_issues`, and `leaderboards[].last_checked` reflect a live verification pass versus inherited claims — a benchmark with `protocol_confidence: ambiguous` should also carry `enrichment_status: draft` until protocol details, dataset URLs, and leaderboard accessibility are independently confirmed. This is distinct from `verdict`/`maturity` (tools), `health_signals`/`maturity` (projects), `importance` (papers), `verification_status` (tips and observability), `build_status`/`outcome` (build examples), `confidence` (architectures), `activity_level`/`safety_level` (community), or `status`/`protocol_confidence` (benchmarks), which describe the entry's subject, not the catalog entry's research depth.

`draft` — written from the project/tool's own docs or marketing copy only; no third-party production usage evidence, paper citation, or dependency-graph verification reviewed yet
`reviewed` — a maintainer has read the official docs/paper and at least one third-party source (blog post, case study, issue thread, dependent-repo evidence)
`verified` — hands-on production usage, or a maintainer-confirmed architecture/ecosystem claim backed by a primary source, confirms the entry's claims

## Verdict Values (Tools only)

`best-in-class` | `recommended` | `solid-choice` | `use-with-caution` | `deprecated` | `watching`

## Importance Values (Papers only)

`foundational` | `sota` | `incremental` | `benchmark` | `survey`

## Impact Values (Tips only)

Field: `impact`. Extended additively during the tips-vertical reorganisation to add `transformative` as a fourth tier above `high` — the existing three values keep their original meaning unchanged; no existing entry needs updating for this addition since none had `transformative` available to set before.

`low` — marginal improvement, specific edge cases
`medium` — noticeable improvement in most systems
`high` — significant improvement, most teams should apply
`transformative` — changes the character of the system, not just its performance

## Difficulty Values (Tips only)

Field: `difficulty`. Skill-level required to correctly apply a tip — distinct from `effort` (below), which measures time-to-implement, not skill. A tip can be `beginner` difficulty but `hours` effort (straightforward to implement but tedious), or `advanced` difficulty but `minutes` effort (a one-line change that requires deep system understanding to apply correctly). Kept unchanged (not renamed, not re-enumerated) during the tips-vertical reorganisation: the reorganisation's own `effort` field (minutes/hours/day) covers the "how long does this take" axis the reorganisation brief also called `difficulty` with a different easy/medium/hard enum — since that concept is redundant with `effort`, only `effort` was added as a new field, and this pre-existing `difficulty` field (skill level) was left exactly as it was.

`beginner` | `intermediate` | `advanced`

## Status Values

`active` | `archived` | `deprecated` | `watching`

## Buzz Sources

`x-twitter` | `youtube` | `hackernews` | `reddit` | `arxiv` | `github-trending` | `newsletter` | `conference` | `podcast`

## Trend Kinds

The `kind` of a Trending entry (`kind` field). Drives which required body sections and frontmatter fields apply.
`weekly-snapshot` | `hall-of-fame` | `source-feed`

## Trend Status

Editorial lifecycle of a Trending entry (`status` field). Distinct from the global `Status Values` enum because trending entries are time-bounded snapshots/feeds, not durable catalog records.
`draft` | `reviewed` | `published` | `deprecated`

## Trend Signal Types

The signals a Trending entry aggregates (`signals_used` array, min 1).
`github-stars-velocity` | `github-stars-total` | `github-activity` | `newsletter-feature` | `release` | `paper-attention` | `community-buzz` | `breaking-change` | `security-issue`

## Trend Sources

The upstream source a Trending entry or source-feed draws from (`sources[].source`).
`github` | `toolradar-techpresso` | `arxiv` | `papers-with-code` | `hackernews` | `reddit` | `x` | `blog` | `other`

## Reserved IDs

`index` | `registry` | `overview` | `introduction` | `readme` | `agent` | `context` | `taxonomy` | `contributing` | `governance` | `changelog` | `security` | `template` | `all` | `none` | `undefined` | `null` | `true` | `false`

