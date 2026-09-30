# AI Arsenal — Dense Context Summary

Generated: 2026-09-28T21:43:55.012Z | Entries: 1254 | Schema version: 1.0.0

AI Arsenal is a Markdown-first, schema-enforced knowledge base for AI engineering. It is designed for humans browsing GitHub, LLMs ingesting context, autonomous agents routing to files, and future UI/API consumers.

## Counts

- Projects: 500
- Tools: 218
- Papers: 138
- Tips: 171
- People: 25
- Digests: 1
- Guides: 59
- Build examples: 8
- Architectures: 29
- Observability: 16
- Community: 33
- Benchmarks: 52
- Trending: 4

## Navigation

- Agent map: /AGENT.md
- Taxonomy: /TAXONOMY.md
- Data API: /data/index.json, all collection JSON files from scripts/utils/collections.js, and /data/search-index.json
- Architecture decisions: /content/architectures/{system-design,data-strategy,model-selection,serving-patterns,evaluation-strategy}/
- Reference stacks: /content/architectures/reference-stacks/
- Observability playbooks: /content/observability/{instrumentation,tracing,evaluation-quality,monitoring-alerting,cost-usage,privacy-governance,incident-response}/
- Community directory: /content/community/{forums,chat,newsletters,events,meetups,creators,datasets}/
- Tool jobs: /content/tools/by-job/
- Tool phases: /content/tools/data-ingestion/, /content/tools/model-layer/, /content/tools/orchestration/, /content/tools/serving-and-deployment/, /content/tools/evaluation-and-observability/, /content/tools/dx-and-tooling/
- Observability: /content/observability/
- Research papers: /content/research/{foundational,architectures,training-and-alignment,inference-and-efficiency,retrieval-and-memory,agents-and-reasoning,evaluation-and-safety,surveys}/
- Benchmarks: /content/benchmarks/{general-llm,code,retrieval-rag,agents,safety,multimodal,evaluation-methods}/
- Trending: /content/trending/{this-week,this-month,hall-of-fame,by-source}/

## Top Projects by Category

### agents
- Strix (⭐65378, score:70) — Autonomous multi-agent penetration tester that runs your code dynamically and validates findings with working exploits
- Semantic Kernel (⭐28114, score:70) — An SDK for integrating AI orchestration into production applications
- Pydantic AI (⭐17738, score:70) — A Python agent framework built around typed models and structured outputs
- PageAgent (⭐24812, score:65) — JavaScript in-page GUI agent from Alibaba that controls web interfaces with natural language
- Skyvern (⭐23090, score:60) — Vision-LLM browser automation with a Playwright-compatible SDK and a no-code workflow builder

### code-generation
- screenshot-to-code (⭐73211, score:60) — Converts screenshots, mockups, and Figma designs into working frontend code (HTML/Tailwind, React, Vue) using multimodal LLMs — with video-to-prototype support
- Continue (⭐36053, score:60) — Open-source coding agent shipped as a CLI, VS Code extension and JetBrains plugin, now frozen at a final 2.0.0 release
- Tabby (⭐33890, score:55) — Self-hosted coding assistant that runs completion and chat on your own GPU with no DBMS or cloud dependency
- GPT Engineer (⭐55073, score:0) — Archived Python CLI that specified software in natural language and let a model write and execute it
- Open Code Review (⭐42251, score:0) — Alibaba's open-sourced code review CLI that pairs deterministic rules pipelines with an LLM agent emitting line-level review comments

### computer-vision
- Ultralytics YOLO (⭐59255, score:62) — The YOLO family framework — train, validate, and deploy real-time detection, segmentation, pose, and classification models with a three-line API
- Supervision (⭐47365, score:58) — Roboflow's model-agnostic CV utilities — one Detections API over any detector, plus annotators, zone/line analytics, tracking, and dataset tools
- Detectron2 (Meta) (⭐34599, score:55) — Meta's modular library for detection, segmentation, and visual recognition — the reference research platform behind a decade of detection work
- SAM 2 (Segment Anything Model 2) (⭐19492, score:55) — Meta's promptable segmentation foundation model unified across images and video — click/box prompts yield masks tracked through time via streaming memory
- PaddleOCR (⭐85010, score:50) — Baidu's industrial OCR and document-AI toolkit: 80+ language text recognition, layout parsing, and lightweight models that run from server to edge

### data-pipelines
- Marker (⭐37280, score:50) — Deep-learning PDF-to-markdown converter that handles tables, equations, and layout with optional LLM-assisted accuracy boosts
- cleanlab (⭐11682, score:50) — Data-centric AI library that finds label errors, duplicates and outliers using your own trained model's predictions
- Scrapling (⭐84212, score:39) — BSD-3-Clause adaptive scraping framework that detects blocking, escalates to a stealth browser, and re-locates selectors when markup shifts
- ClickHouse (⭐50123, score:38) — Apache-2.0 columnar OLAP engine with vectorized execution, MergeTree storage, and sub-second scans over event and trace data
- datasets (⭐22014, score:35) — Loads, caches, and streams Hugging Face Hub corpora as Arrow-backed map-style or iterable datasets

### evaluation
- MTEB (⭐3344, score:50) — The Massive Text Embedding Benchmark — the standard evaluation suite and leaderboard for embedding and reranker models across 1000+ tasks
- Terminal-Bench (⭐2427, score:50) — Benchmark measuring AI agents on real end-to-end tasks in a sandboxed terminal environment, from compiling code to training models
- BigCodeBench (⭐513, score:50) — Code-generation benchmark testing diverse function calls and complex instructions across 139 libraries — the harder successor to HumanEval
- scikit-learn (⭐67407, score:38) — BSD-3-Clause classical ML library defining the estimator, transformer, and Pipeline contracts that tabular and structured stages still use
- xgboost (⭐28801, score:36) — Apache-2.0 gradient-boosted decision tree library with a scikit-learn API, GPU support, and distributed training

### llms
- LobeChat (LobeHub) (⭐82874, score:72) — Self-hostable chat and agent workspace that hires, schedules and reports on a fleet of configured agents
- exo (exo-explore) (⭐46087, score:72) — Clusters your everyday devices — phones, laptops, desktops — into one inference pool, sharding a model too big for any single machine
- Qwen (⭐21281, score:70) — Alibaba open-weight model family covering language, coding, and multimodal use cases
- Gemma (⭐5410, score:70) — Google open model family designed for efficient language and multimodal applications
- Phi Cookbook (⭐3750, score:70) — Microsoft examples and recipes for building with the Phi model family

### multimodal
- Qwen3-VL (⭐19555, score:55) — Alibaba's open vision-language model family — image, video, and document understanding with strong OCR and GUI-grounding across sizes from edge to flagship
- ComfyUI (⭐119901, score:50) — Node-graph engine for visual generative AI: the standard open-source interface for building diffusion and video-generation pipelines
- FLUX (Black Forest Labs) (⭐25700, score:45) — Black Forest Labs' rectified-flow image generation family — FLUX.1 [dev]/[schnell] set the open-weights quality bar after Stable Diffusion's momentum stalled
- MiniCPM-V (⭐25801, score:42) — Efficient open vision-language model series from OpenBMB that runs strong image/video/OCR understanding on-device, including phones
- ComfyUI (⭐135314, score:41) — GPL-3.0 node-graph engine for diffusion and video models where a saved workflow is a JSON graph other tools can replay

### observability
- DeepEval (⭐16140, score:70) — An open-source evaluation framework for testing LLM applications in CI
- Langfuse (⭐29021, score:30) — Open-source LLM observability platform for traces, evals, prompts, metrics, and datasets
- Opik (⭐19609, score:30) — Open-source Comet platform for LLM tracing, evaluation, prompt optimization, and dashboards
- Phoenix (⭐10124, score:30) — Arize Phoenix open-source observability and evaluation platform for LLM, RAG, and agent systems
- OpenLLMetry (⭐7000, score:30) — OpenTelemetry instrumentation for GenAI and LLM applications from Traceloop

### rag
- LangChain (⭐139206, score:70) — A framework for composing LLM applications, retrieval flows, tools, and agents
- DSPy (⭐35010, score:70) — A framework for programming and optimizing language model pipelines
- AnythingLLM (⭐66555, score:68) — All-in-one local AI workspace for chatting with documents, running agents, and multi-user setups with minimal setup friction
- GraphRAG (⭐34257, score:65) — Microsoft's knowledge-graph RAG — LLM-extracted entity graphs with hierarchical community summaries that answer global questions vector RAG can't
- Onyx (formerly Danswer) (⭐32271, score:62) — Self-hostable enterprise context layer that indexes 50-plus connected apps with permissions preserved

### tooling
- Supabase (⭐74300, score:50) — Open-source backend platform: Postgres database, auth, storage, and realtime APIs
- Cherry Studio (⭐52215, score:46) — AGPL-3.0 Electron desktop client for many LLM providers, with 300+ preset assistants, local Ollama and LM Studio support, MCP and an enterprise tier
- Uiverse Design (⭐11000, score:40) — Open-source library of community-made CSS/Tailwind UI elements for faster front-end development
- kestra (⭐28401, score:36) — Apache-2.0 Java orchestration platform with event-driven triggers, durable execution, and a UI for data and AI pipelines
- spaCy (⭐33927, score:35) — MIT-licensed industrial NLP library with Cython pipelines for tokenization, tagging, NER, parsing, and entity linking

### voice-audio
- AudioCraft (Meta) (⭐23456, score:60) — Meta's audio-generation library and open models — MusicGen for text-conditioned music, AudioGen for sound effects, built on the EnCodec codec
- Speech To Speech (⭐5654, score:60) — Hugging Face's modular open-source voice-agent pipeline (VAD→STT→LLM→TTS) exposed via an OpenAI Realtime-compatible WebSocket API
- Chatterbox (Resemble AI) (⭐26600, score:55) — Resemble AI's open-source zero-shot TTS family in sizes from 110M to 500M, covering CPU-real-time Nano, one-step Turbo and 23-language Multilingual V3
- faster-whisper (⭐24114, score:55) — Whisper reimplemented on CTranslate2 — up to 4x faster transcription than openai/whisper at equal accuracy, with int8 quantization for CPU and modest GPUs
- WhisperX (⭐22968, score:55) — Whisper transcription with accurate word-level timestamps (forced phoneme alignment) and speaker diarization, at 70x-realtime batched throughput

## Top Tools by Job

### data-labeling
- Airbyte — Open-source ELT platform with a 600+ connector catalogue for moving data from APIs, databases, files and warehouses into destinations
- Argilla — Human feedback and dataset curation UI in maintenance mode, with script-defined annotation and evaluation workflows
- dlt — Python ELT library that turns APIs, files and databases into declarative pipelines with schema inference
- Hugging Face AI Sheets — Spreadsheet-style web app for building, enriching and transforming datasets with LLM columns, deployable from Docker or pnpm against Hub or local models
- Label Studio — An open-source data labeling platform for ML and AI datasets

### deployment
- Anyscale — Managed platform from the creators of Ray for running distributed AI workloads — training, batch inference, and serving — on autoscaling Ray clusters
- AWS Bedrock — AWS managed service for accessing foundation models and building generative AI apps
- Azure AI Studio — Microsoft Azure platform for building, evaluating, and deploying AI applications
- Baseten — Managed platform to deploy and autoscale ML/LLM models in production, built on the open-source Truss packaging format with scale-to-zero
- BentoML — A framework for packaging, deploying, and scaling AI model services

### evaluation
- Agentic Security — Open-source scanner and fuzzer that probes LLM endpoints with multimodal, multi-step jailbreak and reinforcement-learning attack suites
- AgentOps — Python SDK and MIT-licensed dashboard for tracing agent runs, LLM cost, session replays and evals across CrewAI, LangGraph, Autogen and the OpenAI Agents SDK
- AI Infra Guard — Tencent Zhuque Lab's full-stack red-teaming platform covering agent, skill, MCP, AI-infrastructure and jailbreak scanning in one deployable product
- any-agent — Mozilla AI's thin adapter layer that runs one agent interface across six different agent frameworks
- Argilla — Human feedback and dataset curation UI in maintenance mode, with script-defined annotation and evaluation workflows

### fine-tuning
- Axolotl — Configuration-driven fine-tuning framework for many open-weight LLM families
- DeepSpeed — Microsoft's distributed-training library: ZeRO sharding, offloading, and pipeline parallelism for training beyond single-GPU memory
- Hugging Face Accelerate — Thin PyTorch wrapper that runs an existing training loop on CPU, TPU, or single and multi-GPU with fp8, fp16 and bf16 mixed precision
- Liger Kernel — Fused Triton kernels for LLM training (RMSNorm, RoPE, SwiGLU, fused cross-entropy) that cut memory and raise throughput as near drop-in layer replacements
- LLaMA-Factory — Unified fine-tuning framework and UI for many LLMs and training methods

### memory-management
- Codebase Memory MCP — MCP server that indexes codebases into a persistent knowledge graph for fast agent code intelligence
- Letta — Stateful agent runtime that gives agents persistent memory and identity, distributed today as a letta-code CLI, App Server and SDK
- Mem0 — Memory layer for agents using add-only fact extraction with entity linking and fused multi-signal retrieval
- Memoriq — Private AI memory layer that learns from your conversations and documents
- Redis — In-memory data structure server with multiple eviction policies, TTL expiry, and document and vector query engines on top of key-value storage

### model-registry
- ClearML — Open-source MLOps suite bundling experiment tracking, dataset versioning, remote execution, pipelines, orchestration, Triton-backed serving and fractional GPUs
- DVC — Open-source data and model versioning tool for ML projects and pipelines
- Hugging Face Hub — Model, dataset, and Space hosting platform for sharing and versioning AI artifacts
- MLflow — Open-source platform for experiment tracking, model registry, and ML lifecycle management
- Weights & Biases — Experiment tracking and model management platform for ML and AI teams

### monitoring
- AgentOps — Python SDK and MIT-licensed dashboard for tracing agent runs, LLM cost, session replays and evals across CrewAI, LangGraph, Autogen and the OpenAI Agents SDK
- Conan — Live HUD for monitoring and interacting with AI agent sessions on macOS
- Deepchecks — Testing-first validation for ML models and LLM apps: prebuilt check suites from data integrity to LLM quality
- Evidently — Open-source evaluation and monitoring for ML and LLM systems: 100+ metrics from data drift to LLM-as-judge
- Galileo — Commercial LLM evaluation and observability platform with research-backed, label-free metrics for hallucination, factuality, and guardrails

### orchestration
- Agno — Python SDK plus AgentOS runtime for building, serving and operating self-hosted agent platforms
- AGNT.Hub — Build and manage secure, private AI agents with custom skills and policies
- any-agent — Mozilla AI's thin adapter layer that runs one agent interface across six different agent frameworks
- Apache Airflow — Batch DAG orchestrator that schedules Python workflows, retries failed tasks and records lineage across data platforms
- ClearML — Open-source MLOps suite bundling experiment tracking, dataset versioning, remote execution, pipelines, orchestration, Triton-backed serving and fractional GPUs

### production-serving
- Anyscale — Managed platform from the creators of Ray for running distributed AI workloads — training, batch inference, and serving — on autoscaling Ray clusters
- Baseten — Managed platform to deploy and autoscale ML/LLM models in production, built on the open-source Truss packaging format with scale-to-zero
- BentoML — A framework for packaging, deploying, and scaling AI model services
- Cerebras Inference — Wafer-scale-engine inference API claiming the fastest open-model token rates available
- Cloudflare Workers AI — Serverless GPU inference on Cloudflare's global edge network, billed per request with zero infrastructure

### prompt-management
- AdalFlow — PyTorch-style library that makes LLM prompts differentiable parameters so RAG and agent pipelines can be auto-optimised rather than hand-prompted
- Cloudskill — Manage, govern, and distribute skills for AI agents across teams
- Humanloop — A platform for prompt management, evaluation, and product feedback workflows
- Langfuse Prompts — Prompt management and versioning workflows inside the Langfuse observability platform
- LangSmith Hub — LangSmith prompt and dataset workflows for LangChain and LangGraph applications

### prototyping
- AdalFlow — PyTorch-style library that makes LLM prompts differentiable parameters so RAG and agent pipelines can be auto-optimised rather than hand-prompted
- Agent Skills (Addy Osmani) — Collection of roughly two dozen markdown SKILL.md workflows and slash commands that install process gates into Claude Code, Cursor, Codex and 70 other agents
- Aider — Terminal pair-programming tool that maps your codebase, edits files in place and auto-commits each change so you can diff and undo with git
- Chainlit — Python framework for building chat and agent front ends, with decorators for steps, tool calls and message handlers over a bundled React UI
- Chrome DevTools MCP — Google's MCP server that gives a coding agent Chrome DevTools itself: trace recording, network and console inspection, heap snapshots and Puppeteer-driven input

### security-and-guardrails
- Agent Browser Shield — Secure AI web browsing by cleaning content and masking PII during agent runs
- Agentic Security — Open-source scanner and fuzzer that probes LLM endpoints with multimodal, multi-step jailbreak and reinforcement-learning attack suites
- AGNT.Hub — Build and manage secure, private AI agents with custom skills and policies
- AI Infra Guard — Tencent Zhuque Lab's full-stack red-teaming platform covering agent, skill, MCP, AI-infrastructure and jailbreak scanning in one deployable product
- Astra Autonomous Pentest — Continuous AI-powered penetration testing for applications, APIs, and cloud infrastructure

### structured-output
- BAML — DSL for LLM functions: define typed prompts/schemas in .baml files and generate type-safe clients with parsing that repairs malformed model output
- Basedash — AI-native platform for generating dashboards, reports, and insights from natural-language queries
- Claude Artifact Player — Interact with and manage AI-generated artifacts from Claude and similar models
- Google Pomelli 2.0 — Explore and interact with large datasets through a visual, intuitive interface
- Guardrails AI — A framework for validating, correcting, and constraining LLM outputs

### tracing
- AgentOps — Python SDK and MIT-licensed dashboard for tracing agent runs, LLM cost, session replays and evals across CrewAI, LangGraph, Autogen and the OpenAI Agents SDK
- Conan — Live HUD for monitoring and interacting with AI agent sessions on macOS
- Laminar — OpenTelemetry-based tracing, evaluation, datasets, and monitoring for LLM and agent applications
- LangSmith — A managed platform for tracing, evaluating, and monitoring LangChain applications
- LangWatch — Open-source LLM observability and evaluation platform — OpenTelemetry-based tracing plus online/offline evals and datasets, self-hostable or cloud

### vector-search
- Elasticsearch — Distributed search and analytics engine with a vector database, full-text search and near-real-time indexing
- FAISS — C++ similarity search and clustering library for dense vectors with full Python and numpy wrappers and GPU implementations of key indexes
- FastEmbed — A lightweight ONNX Runtime library for embedding and reranking without PyTorch
- Marqo — Deprecated open-source ecommerce search engine; the product now lives at marqo.ai
- Meilisearch — Lightning-fast open-source search engine with built-in hybrid keyword+vector search and typo tolerance

### web-scraping
- Agent Browser Shield — Secure AI web browsing by cleaning content and masking PII during agent runs
- Agent Reach — Open-source CLI that gives an agent read and search access to Twitter, Reddit, YouTube, Bilibili, Xiaohongshu and GitHub without paid APIs or per-site
- Airbyte — Open-source ELT platform with a 600+ connector catalogue for moving data from APIs, databases, files and warehouses into destinations
- Browserbase — Stagehand browser SDK with observe, act and extract primitives plus CUA models, MIT licensed and multi-language
- Crawl4AI — Open-source crawler that returns LLM-ready Markdown from any page, with a paid cloud tier behind the same API

## Architecture Quick Refs

- Enterprise-Scale AI Stack vs Production RAG Stack: When Governance Overhead Is Justified
- Lean MVP Stack vs Production RAG Stack: Speed vs Durability Tradeoff
- Local-First Stack vs Cloud API Stack: Privacy and Cost Control vs Capability Ceiling
- Multi-Agent System Stack vs Single-Agent Loop: When Role Decomposition Is Worth It
- Production RAG Stack vs Lean MVP Stack: When Ingestion, Eval, and Observability Earn Their Cost
- Research Platform Stack vs Product Stack: Reproducibility vs Shipping Speed

## Architecture Decisions by Category

### data-strategy
- Choosing a Chunking Strategy: Fixed, Structure-Aware, Parent-Child, or Semantic
- Choosing an Embedding Model: Managed API, Open-Weight Self-Hosted, or Domain-Adapted
- Choosing a Reranking Strategy: Dense-Only, Cross-Encoder, or LLM Reranker
- Dense vs Sparse vs Hybrid Retrieval: How Should You Actually Find the Right Chunks?
- Choosing Vector Storage: Postgres-Native, Embedded, Self-Hosted, or Managed

### evaluation-strategy
- Choosing an Evaluation Strategy: Golden Datasets, Model-Graded Evals, and Human Review
- Choosing an Observability Approach: Integration Model First, Feature List Second
- LLM-as-Judge vs Human Evaluation vs Reference-Based Metrics: How Should You Grade Outputs?

### model-selection
- Choosing an Agent Framework: State Model, Language, and Provider Constraints
- Choosing a Model: Local vs Cloud, and Routing by Primary Need
- Self-Host Open Weights vs Hosted Model API: Who Should Run the GPU?

### reference-stacks
- Enterprise-Scale AI Stack vs Production RAG Stack: When Governance Overhead Is Justified
- Lean MVP Stack vs Production RAG Stack: Speed vs Durability Tradeoff
- Local-First Stack vs Cloud API Stack: Privacy and Cost Control vs Capability Ceiling
- Multi-Agent System Stack vs Single-Agent Loop: When Role Decomposition Is Worth It
- Production RAG Stack vs Lean MVP Stack: When Ingestion, Eval, and Observability Earn Their Cost

### serving-patterns
- Caching LLM Workloads: Provider Prompt Caching, Gateway Response Caching, Semantic Caching, and Prefix/KV Reuse
- Choosing a Deployment Target: Separating App Hosting From Model Serving
- Handling Provider Failures: Retry, Model/Provider Fallback, or a Managed Gateway
- Choosing a Quantization Strategy: How Low Can You Go Before Quality Breaks?
- Synchronous vs Streaming vs Asynchronous: How Should the Answer Reach the User?

### system-design
- Managing a Growing Context Window: Truncation, Summarization, or Retrieval Offload
- Layering LLM Guardrails: Prompt Hardening, Validation Frameworks, Classifier Screens, and Human Gates
- Choosing an Agent Memory Architecture: Session, Long-Term, and Semantic
- Getting Structured Output from LLMs: Prompt-and-Parse, Provider-Native, or Constrained Decoding
- RAG vs Fine-Tuning: Knowledge Injection vs Behavior Adaptation

## Observability Playbooks by Category

### cost-usage
- Attribute Every LLM Call's Cost to a Feature, User, and Prompt Version, Not Just a Monthly Invoice Total
- Monitor Cache Hit Rate and Realized Token Savings Per Cache Layer, So a Silently Ineffective Cache Stops Costing You Money It Was Supposed to Save

### evaluation-quality
- Gate Prompt, Model, and Retriever Changes on a Versioned Eval Dataset Before They Ship
- Monitor Guardrail Trip Rate as a First-Class Quality Signal, Because a Guardrail That Never Fires and One That Fires Constantly Are Both Broken
- Monitor Retrieval Quality Continuously with Reference-Free Signals, Not Just Offline Benchmarks

### incident-response
- Triage, Kill-Switch, and Postmortem Runbook for Agent Loops, RAG Regressions, and Cost Blowouts
- Runbook: Detect and Fail Over a Model-Provider Outage in Minutes, Because Your Uptime Is Now Capped by a Dependency You Do Not Control

### instrumentation
- Capture Context-Window Utilization and Truncation on Every Call, So Silent Prompt Clipping Is Visible Before It Degrades Output
- Capture a Structured Event for Every LLM Call, Not Just an Access Log Line
- Capture Explicit and Implicit User Feedback as Structured Events Joined to Traces

### monitoring-alerting
- Alert on SLO Burn Rate, Not Raw Thresholds, for Latency, Cost, and Quality Regressions
- Define Streaming Latency SLOs on TTFT and Inter-Token Time, Not Total Request Duration
- Alert on Tool-Call Error and Retry Rate Per Tool, Because an Agent That Retries Around a Broken Tool Looks Healthy While Cost and Latency Climb

### privacy-governance
- Detect and Redact PII in Traces at the Gateway Boundary, Before It Reaches Any Store

### tracing
- Propagate a Single Trace Context Across Service Hops and Streaming Responses, So One User Request Is One Trace
- Trace Every Retrieval, Tool Call, and Agent Transition as a Child Span, Not Just the Final Answer

## Community Directory by Kind

### chat
- EleutherAI Discord
- GPU MODE Discord
- Hugging Face Discord
- LangChain Community Slack
- LlamaIndex Discord

### creator
- AssemblyAI (YouTube)
- DeepLearning.AI (YouTube)
- fast.ai
- Gradient Dissent (Weights & Biases)
- Hugging Face (YouTube)

### dataset
- Common Crawl
- FineWeb (Hugging Face)
- LAION (Large-scale Artificial Intelligence Open Network)

### event
- AI Engineer World's Fair
- NeurIPS (Conference on Neural Information Processing Systems)

### forum
- Hugging Face Forums
- LangChain Forum
- OpenAI Developer Community
- r/LocalLLaMA (Reddit)
- r/MachineLearning (Reddit)

### meetup
- AI Tinkerers

### newsletter
- AI Weekly — Ranks and explains AI developments using signals from what influential experts and organizations are reading and sharing
- Import AI (Jack Clark)
- Interconnects (Nathan Lambert)
- Last Week in AI
- Latent Space (Newsletter)

## Benchmark Catalog

- AgentBench
- AgentDojo
- AgentHarm
- Aider Polyglot Coding Benchmark
- AlpacaEval 2.0 (Length-Controlled)
- ARC-AGI (Abstraction and Reasoning Corpus)
- Arena-Hard-Auto
- BEIR
- BIG-Bench Hard (BBH)
- BIRD (Big Bench for Large-Scale Database Grounded Text-to-SQL)

## Trending Signals

- Source Feed: GitHub Trending
- AI Arsenal Hall of Fame
- This Week in AI Arsenal
- Source Feed: ToolRadar / Techpresso

## Decision Heuristics

- Need local/private LLMs? → inspect Ollama, llama.cpp, local-first stack, and choose-llm.
- Need fast inference at scale? → inspect vLLM, TGI, production-serving, and choose-deployment-target.
- Simple RAG? → inspect LlamaIndex, LangChain, Chroma, pgvector, and rag-vs-fine-tuning.
- Complex multi-step agents? → inspect LangGraph and choose-agent-framework.
- Tracing/observability? → inspect Langfuse, Phoenix, LangSmith, and observability overview.
- Evaluation before launch? → inspect DeepEval, RAGAS, promptfoo, evaluation pipelines, and choose-eval-framework.

## Must-Read Papers

- GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints — Introduced grouped-query attention — sharing each key/value head across a group of query heads — cutting KV-cache memory several-fold with near-zero quality loss; now the default attention configuration in almost every open LLM
- Flamingo: a Visual Language Model for Few-Shot Learning — Bridged a frozen vision encoder and a frozen LLM with trainable cross-attention (Perceiver Resampler + gated cross-attention), enabling few-shot vision-language tasks from interleaved image-text prompts — the template most modern VLMs follow.
- Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection — Trains an LM to emit reflection tokens deciding when to retrieve and whether retrieved passages support its output — making retrieval adaptive and self-critiqued instead of always-on, and improving factuality over standard RAG
- K9-Bench: Evaluating Multimodal LLMs on Canine-Centric Videos — A 5,000-pair question set over 907 home dog videos, built to test long-horizon reasoning about canine actions and interactions.
- Constitutional AI: Harmlessness from AI Feedback — Trained a harmless assistant using AI self-critique and AI-judged preferences instead of human harm labels -- consider RLAIF when human labeling of harmful content is a bottleneck, though no reference code exists to reproduce it directly
- AGC-Bench: Measuring Artificial General Creativity — An 78-dataset creativity benchmark paired with AGC-Judge, an open-weight judge calibrated to remove leniency bias.
- Managing Procedural Memory in LLM Agents: Control, Adaptation, and Evaluation — Introduces AFTER, a 382-task benchmark for testing whether procedural skills learned by agents transfer across tasks, roles, and model backbones.
- Graph of Thoughts: Solving Elaborate Problems with Large Language Models — Generalizes chain- and tree-of-thought by modeling reasoning as an arbitrary graph, where thoughts can be aggregated, refined, and looped -- enabling operations like merging partial solutions that a tree cannot express
- Improving Language Models by Retrieving from Trillions of Tokens — RETRO augments a Transformer with chunk-level retrieval from a trillions-of-tokens database via cross-attention, letting a small model match much larger ones -- retrieval as a way to move knowledge out of parameters and into an index
- Language Models are Few-Shot Learners — Showed scaling a decoder-only Transformer to 175B params produces strong few-shot in-context learning with zero gradient updates, meaning you can often solve a new task via prompting instead of fine-tuning

## High-Impact Tips

- Add A Max Step Budget To Every Agent Loop
- Keep the Smallest Failing Prompt for Every Recurring Issue
- Add an Eval Harness Before Refactoring Prompts or Retrieval Logic
- Add Hybrid Search for Exact-Match Terms
- Add Explicit Timeout, Retry, and Fallback Behavior to Every Provider Call
- Alarm on Empty and Unparseable Responses
- Allowlist Tools Per Agent Role
- Benchmark With Production-Shaped Inputs, Not Synthetic Toy Prompts
- Benchmark Using Real Production Context Lengths, Not Short Toy Prompts
- Block SSRF by Validating Outbound URLs From Tools
