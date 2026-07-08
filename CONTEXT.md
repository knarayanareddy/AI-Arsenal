# AI Arsenal — Dense Context Summary

Generated: 2026-07-08T20:07:00.905Z | Entries: 673 | Schema version: 1.0.0

AI Arsenal is a Markdown-first, schema-enforced knowledge base for AI engineering. It is designed for humans browsing GitHub, LLMs ingesting context, autonomous agents routing to files, and future UI/API consumers.

## Counts

- Projects: 103
- Tools: 171
- Papers: 80
- Tips: 129
- People: 25
- Digests: 1
- Guides: 59
- Build examples: 8
- Architectures: 21
- Observability: 10
- Community: 32

## Navigation

- Agent map: /AGENT.md
- Taxonomy: /TAXONOMY.md
- Data API: /data/index.json, /data/projects.json, /data/tools.json, /data/search-index.json
- Architecture decisions: /content/architectures/{system-design,data-strategy,model-selection,serving-patterns,evaluation-strategy}/
- Reference stacks: /content/architectures/reference-stacks/
- Observability playbooks: /content/observability/{instrumentation,tracing,evaluation-quality,monitoring-alerting,cost-usage,privacy-governance,incident-response}/
- Community directory: /content/community/{forums,chat,newsletters,events,meetups,creators,datasets}/
- Tool jobs: /content/tools/by-job/
- Tool phases: /content/tools/data-ingestion/, /content/tools/model-layer/, /content/tools/orchestration/, /content/tools/serving-and-deployment/, /content/tools/evaluation-and-observability/, /content/tools/dx-and-tooling/
- Observability: /content/observability/
- Research papers: /content/research/papers/

## Top Projects by Category

### agents
- Strix (⭐38354, score:70) — Open-source autonomous AI penetration-testing agent that finds and validates application vulnerabilities
- Semantic Kernel (⭐28114, score:70) — An SDK for integrating AI orchestration into production applications
- Pydantic AI (⭐17738, score:70) — A Python agent framework built around typed models and structured outputs
- PageAgent (⭐24812, score:65) — JavaScript in-page GUI agent from Alibaba that controls web interfaces with natural language
- Browser Use (⭐103506, score:50) — The most-starred open-source browser agent: connects LLMs to a real browser so agents can navigate, fill forms and complete web tasks autonomously

### computer-vision
- PaddleOCR (⭐85010, score:50) — Baidu's industrial OCR and document-AI toolkit: 80+ language text recognition, layout parsing, and lightweight models that run from server to edge
- Ultralytics YOLO (⭐59255, score:50) — The most widely used real-time object detection framework: YOLO models for detection, segmentation, pose, and tracking with a three-line API
- Surya (⭐21057, score:50) — Modern OCR toolkit with 90+ language text recognition, layout analysis, reading-order detection, and table recognition — the models behind Marker

### data-pipelines
- Marker (⭐37280, score:50) — Deep-learning PDF-to-markdown converter that handles tables, equations, and layout with optional LLM-assisted accuracy boosts

### evaluation
- MTEB (⭐3344, score:50) — The Massive Text Embedding Benchmark — the standard evaluation suite and leaderboard for embedding and reranker models across 1000+ tasks
- Terminal-Bench (⭐2427, score:50) — Benchmark measuring AI agents on real end-to-end tasks in a sandboxed terminal environment, from compiling code to training models
- BigCodeBench (⭐513, score:50) — Code-generation benchmark testing diverse function calls and complex instructions across 139 libraries — the harder successor to HumanEval

### llms
- Qwen (⭐21281, score:70) — Alibaba open-weight model family covering language, coding, and multimodal use cases
- Gemma (⭐5410, score:70) — Google open model family designed for efficient language and multimodal applications
- Phi Cookbook (⭐3750, score:70) — Microsoft examples and recipes for building with the Phi model family
- nanoGPT (⭐60962, score:50) — Karpathy's minimal ~600-line GPT training repository — the canonical starting point for understanding LLM pretraining
- MLC LLM (⭐22917, score:50) — Machine-learning-compilation stack that runs LLMs natively on iOS, Android, WebGPU, Metal, Vulkan and CUDA from one codebase

### multimodal
- ComfyUI (⭐119901, score:50) — Node-graph engine for visual generative AI: the standard open-source interface for building diffusion and video-generation pipelines

### observability
- DeepEval (⭐16140, score:70) — An open-source evaluation framework for testing LLM applications in CI
- Langfuse (⭐29021, score:30) — Open-source LLM observability platform for traces, evals, prompts, metrics, and datasets
- Opik (⭐19609, score:30) — Open-source Comet platform for LLM tracing, evaluation, prompt optimization, and dashboards
- Phoenix (⭐10124, score:30) — Arize Phoenix open-source observability and evaluation platform for LLM, RAG, and agent systems
- OpenLLMetry (⭐7000, score:30) — OpenTelemetry instrumentation for GenAI and LLM applications from Traceloop

### rag
- LangChain (⭐139206, score:70) — A framework for composing LLM applications, retrieval flows, tools, and agents
- DSPy (⭐35010, score:70) — A framework for programming and optimizing language model pipelines
- SurrealDB (⭐28000, score:60) — Multi-model database combining graph, document, vector, and time-series for AI agents
- zvec (⭐13891, score:60) — Lightweight, in-process vector database from Alibaba for local RAG and agent memory
- Graphiti (⭐28508, score:50) — Framework for building real-time, temporally-aware knowledge graphs that serve as queryable memory for agents

### tooling
- Supabase (⭐74300, score:50) — Open-source backend platform: Postgres database, auth, storage, and realtime APIs
- Uiverse Design (⭐11000, score:40) — Open-source library of community-made CSS/Tailwind UI elements for faster front-end development

### voice-audio
- Speech To Speech (⭐5654, score:60) — Hugging Face's modular open-source voice-agent pipeline (VAD→STT→LLM→TTS) exposed via an OpenAI Realtime-compatible WebSocket API
- Whisper (⭐104543, score:50) — OpenAI's open-source speech recognition model: robust multilingual transcription and translation trained on 680k hours of audio

## Top Tools by Job

### data-labeling
- Airbyte — Open-source data-integration platform with 600+ connectors, increasingly used to feed context into LLM/RAG pipelines
- Argilla — Open-source platform for human and AI feedback, data curation, and evaluation datasets
- dlt — Python-native ELT library: declarative, schema-evolving data pipelines as code, popular with AI/agent workflows
- Label Studio — An open-source data labeling platform for ML and AI datasets
- MarkItDown — Microsoft's utility for converting Office files, PDFs, images, and audio into LLM-friendly Markdown

### deployment
- AWS Bedrock — AWS managed service for accessing foundation models and building generative AI apps
- Azure AI Studio — Microsoft Azure platform for building, evaluating, and deploying AI applications
- BentoML — A framework for packaging, deploying, and scaling AI model services
- CubeSandbox — Self-hostable, hardware-isolated sandbox service for AI agent code execution with tens-of-milliseconds startup and an E2B-compatible API
- Empromptu AI — Build, deploy, and manage custom AI applications that improve over time

### evaluation
- AgentOps — Observability and debugging platform purpose-built for AI agents: session replays, cost tracking, and multi-framework tracing
- Argilla — Open-source platform for human and AI feedback, data curation, and evaluation datasets
- Astra Autonomous Pentest — Continuous AI-powered penetration testing for applications, APIs, and cloud infrastructure
- Code Arena — Benchmark and compare AI models in a competitive coding environment
- Deepchecks — Testing-first validation for ML models and LLM apps: prebuilt check suites from data integrity to LLM quality

### fine-tuning
- Axolotl — Configuration-driven fine-tuning framework for many open-weight LLM families
- DeepSpeed — Microsoft's distributed-training library: ZeRO sharding, offloading, and pipeline parallelism for training beyond single-GPU memory
- LLaMA-Factory — Unified fine-tuning framework and UI for many LLMs and training methods
- Megatron-LM — NVIDIA's reference framework for training transformer models at scale with tensor, pipeline, and sequence parallelism
- MLX-LM — Apple MLX library for running and fine-tuning LLMs on Apple Silicon

### memory-management
- Codebase Memory MCP — MCP server that indexes codebases into a persistent knowledge graph for fast agent code intelligence
- Letta — Stateful agent framework and memory system formerly known as MemGPT
- Mem0 — Memory layer for AI agents and assistants with long-term user and session memory
- Memoriq — Private AI memory layer that learns from your conversations and documents
- Redis — In-memory data store commonly used for caching, session memory, queues, and vector search

### model-registry
- ClearML — Open-source, self-hostable MLOps suite covering experiment tracking, data versioning, pipelines, and orchestration
- DVC — Open-source data and model versioning tool for ML projects and pipelines
- Hugging Face Hub — Model, dataset, and Space hosting platform for sharing and versioning AI artifacts
- MLflow — Open-source platform for experiment tracking, model registry, and ML lifecycle management
- Weights & Biases — Experiment tracking and model management platform for ML and AI teams

### monitoring
- AgentOps — Observability and debugging platform purpose-built for AI agents: session replays, cost tracking, and multi-framework tracing
- Conan — Live HUD for monitoring and interacting with AI agent sessions on macOS
- Deepchecks — Testing-first validation for ML models and LLM apps: prebuilt check suites from data integrity to LLM quality
- Evidently — Open-source evaluation and monitoring for ML and LLM systems: 100+ metrics from data drift to LLM-as-judge
- LangSmith — A managed platform for tracing, evaluating, and monitoring LangChain applications

### orchestration
- Agno — High-performance Python framework (formerly Phidata) for building multi-agent systems with memory, knowledge, and its own runtime
- AGNT.Hub — Build and manage secure, private AI agents with custom skills and policies
- Apache Airflow — Mature workflow scheduler for batch data, ML, and AI pipeline orchestration
- ClearML — Open-source, self-hostable MLOps suite covering experiment tracking, data versioning, pipelines, and orchestration
- Cloudskill — Manage, govern, and distribute skills for AI agents across teams

### production-serving
- BentoML — A framework for packaging, deploying, and scaling AI model services
- Cerebras Inference — Wafer-scale-engine inference API claiming the fastest open-model token rates available
- Cloudflare Workers AI — Serverless GPU inference on Cloudflare's global edge network, billed per request with zero infrastructure
- Cohere — Enterprise AI platform: Command models plus best-in-class Embed and Rerank APIs for search and RAG
- FastAPI — Python web framework for building APIs around AI services and model workflows

### prompt-management
- Cloudskill — Manage, govern, and distribute skills for AI agents across teams
- Humanloop — A platform for prompt management, evaluation, and product feedback workflows
- Langfuse Prompts — Prompt management and versioning workflows inside the Langfuse observability platform
- LangSmith Hub — LangSmith prompt and dataset workflows for LangChain and LangGraph applications
- LiteLLM — A proxy and SDK for routing requests across many LLM providers

### prototyping
- Agent Skills (Addy Osmani) — Production-grade engineering skills for AI coding agents, organized as 8 slash commands mapping to the development lifecycle
- Aider — Open-source AI pair-programming CLI that edits your local git repo with any LLM and auto-commits changes
- Chainlit — A framework for building conversational AI interfaces and debugging LLM apps
- Chrome DevTools MCP — Official MCP server exposing Chrome DevTools to coding agents for live browser debugging
- Claude Code — Anthropic's terminal-based agentic coding assistant that edits files, runs commands, and works across whole repositories

### security-and-guardrails
- Agent Browser Shield — Secure AI web browsing by cleaning content and masking PII during agent runs
- AGNT.Hub — Build and manage secure, private AI agents with custom skills and policies
- Astra Autonomous Pentest — Continuous AI-powered penetration testing for applications, APIs, and cloud infrastructure
- CubeSandbox — Self-hostable, hardware-isolated sandbox service for AI agent code execution with tens-of-milliseconds startup and an E2B-compatible API
- garak — NVIDIA's open-source LLM vulnerability scanner: automated probes for jailbreaks, leakage, injection, and toxicity

### structured-output
- Basedash — AI-native platform for generating dashboards, reports, and insights from natural-language queries
- Claude Artifact Player — Interact with and manage AI-generated artifacts from Claude and similar models
- Google Pomelli 2.0 — Explore and interact with large datasets through a visual, intuitive interface
- Guardrails AI — A framework for validating, correcting, and constraining LLM outputs
- Guidance — Microsoft guidance library for controlling and constraining language model generation

### tracing
- AgentOps — Observability and debugging platform purpose-built for AI agents: session replays, cost tracking, and multi-framework tracing
- Conan — Live HUD for monitoring and interacting with AI agent sessions on macOS
- LangSmith — A managed platform for tracing, evaluating, and monitoring LangChain applications
- Spotlight by Backplanes — Understand, improve, and track AI agent sessions with observability tooling
- Superlog — Real-time log aggregation platform designed for serverless debugging

### vector-search
- Elasticsearch — Distributed search and analytics engine with mature BM25, dense-vector kNN, and hybrid retrieval for RAG workloads
- FAISS — Meta's foundational library for efficient similarity search over billions of dense vectors
- Meilisearch — Lightning-fast open-source search engine with built-in hybrid keyword+vector search and typo tolerance
- Pinecone — A managed vector database for production semantic search applications
- RAGatouille — Library that makes ColBERT late-interaction retrieval usable in any RAG pipeline in a few lines

### web-scraping
- Agent Browser Shield — Secure AI web browsing by cleaning content and masking PII during agent runs
- Agent Reach — Toolkit giving AI agents read and search access to Twitter/X, Reddit, YouTube, GitHub, and the wider web
- Airbyte — Open-source data-integration platform with 600+ connectors, increasingly used to feed context into LLM/RAG pipelines
- Browserbase — Hosted cloud browser platform for AI agents and automated browser workflows
- Crawl4AI — Python crawler and scraper designed for LLM-friendly web content extraction

## Architecture Quick Refs

- Enterprise-Scale AI Stack vs Production RAG Stack: When Governance Overhead Is Justified — 
- Lean MVP Stack vs Production RAG Stack: Speed vs Durability Tradeoff — 
- Local-First Stack vs Cloud API Stack: Privacy and Cost Control vs Capability Ceiling — 
- Multi-Agent System Stack vs Single-Agent Loop: When Role Decomposition Is Worth It — 
- Production RAG Stack vs Lean MVP Stack: When Ingestion, Eval, and Observability Earn Their Cost — 
- Research Platform Stack vs Product Stack: Reproducibility vs Shipping Speed — 

## Architecture Decisions by Category

### data-strategy
- Choosing a Chunking Strategy: Fixed, Structure-Aware, Parent-Child, or Semantic — 
- Choosing an Embedding Model: Managed API, Open-Weight Self-Hosted, or Domain-Adapted — 
- Choosing Vector Storage: Postgres-Native, Embedded, Self-Hosted, or Managed — 

### evaluation-strategy
- Choosing an Evaluation Strategy: Golden Datasets, Model-Graded Evals, and Human Review — 
- Choosing an Observability Approach: Integration Model First, Feature List Second — 

### model-selection
- Choosing an Agent Framework: State Model, Language, and Provider Constraints — 
- Choosing a Model: Local vs Cloud, and Routing by Primary Need — 

### reference-stacks
- Enterprise-Scale AI Stack vs Production RAG Stack: When Governance Overhead Is Justified — 
- Lean MVP Stack vs Production RAG Stack: Speed vs Durability Tradeoff — 
- Local-First Stack vs Cloud API Stack: Privacy and Cost Control vs Capability Ceiling — 
- Multi-Agent System Stack vs Single-Agent Loop: When Role Decomposition Is Worth It — 
- Production RAG Stack vs Lean MVP Stack: When Ingestion, Eval, and Observability Earn Their Cost — 

### serving-patterns
- Caching LLM Workloads: Provider Prompt Caching, Gateway Response Caching, Semantic Caching, and Prefix/KV Reuse — 
- Choosing a Deployment Target: Separating App Hosting From Model Serving — 
- Choosing an LLM Serving Stack: Managed API, Local Runtime, or Self-Hosted Engine — 

### system-design
- Layering LLM Guardrails: Prompt Hardening, Validation Frameworks, Classifier Screens, and Human Gates — 
- Choosing an Agent Memory Architecture: Session, Long-Term, and Semantic — 
- Getting Structured Output from LLMs: Prompt-and-Parse, Provider-Native, or Constrained Decoding — 
- RAG vs Fine-Tuning: Knowledge Injection vs Behavior Adaptation — 
- Single Agent vs Multi-Agent: When Splitting the Work Actually Helps — 

## Observability Playbooks by Category

### cost-usage
- Attribute Every LLM Call's Cost to a Feature, User, and Prompt Version, Not Just a Monthly Invoice Total — 

### evaluation-quality
- Gate Prompt, Model, and Retriever Changes on a Versioned Eval Dataset Before They Ship — 
- Monitor Retrieval Quality Continuously with Reference-Free Signals, Not Just Offline Benchmarks — 

### incident-response
- Triage, Kill-Switch, and Postmortem Runbook for Agent Loops, RAG Regressions, and Cost Blowouts — 

### instrumentation
- Capture a Structured Event for Every LLM Call, Not Just an Access Log Line — 
- Capture Explicit and Implicit User Feedback as Structured Events Joined to Traces — 

### monitoring-alerting
- Alert on SLO Burn Rate, Not Raw Thresholds, for Latency, Cost, and Quality Regressions — 
- Define Streaming Latency SLOs on TTFT and Inter-Token Time, Not Total Request Duration — 

### privacy-governance
- Detect and Redact PII in Traces at the Gateway Boundary, Before It Reaches Any Store — 

### tracing
- Trace Every Retrieval, Tool Call, and Agent Transition as a Child Span, Not Just the Final Answer — 

## Community Directory by Kind

### chat
- EleutherAI Discord — 
- GPU MODE Discord — 
- Hugging Face Discord — 
- LangChain Community Slack — 
- LlamaIndex Discord — 

### creator
- AssemblyAI (YouTube) — 
- DeepLearning.AI (YouTube) — 
- fast.ai — 
- Gradient Dissent (Weights & Biases) — 
- Hugging Face (YouTube) — 

### dataset
- Common Crawl — 
- FineWeb (Hugging Face) — 
- LAION (Large-scale Artificial Intelligence Open Network) — 

### event
- AI Engineer World's Fair — 
- NeurIPS (Conference on Neural Information Processing Systems) — 

### forum
- Hugging Face Forums — 
- LangChain Forum — 
- OpenAI Developer Community — 
- r/LocalLLaMA (Reddit) — 
- r/MachineLearning (Reddit) — 

### meetup
- AI Tinkerers — 

### newsletter
- Import AI (Jack Clark) — 
- Interconnects (Nathan Lambert) — 
- Last Week in AI — 
- Latent Space (Newsletter) — 
- The Batch (DeepLearning.AI) — 

## Decision Heuristics

- Need local/private LLMs? → inspect Ollama, llama.cpp, local-first stack, and choose-llm.
- Need fast inference at scale? → inspect vLLM, TGI, production-serving, and choose-deployment-target.
- Simple RAG? → inspect LlamaIndex, LangChain, Chroma, pgvector, and rag-vs-fine-tuning.
- Complex multi-step agents? → inspect LangGraph and choose-agent-framework.
- Tracing/observability? → inspect Langfuse, Phoenix, LangSmith, and observability overview.
- Evaluation before launch? → inspect DeepEval, RAGAS, promptfoo, evaluation pipelines, and choose-eval-framework.

## Must-Read Papers

- GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints — Introduced grouped-query attention — sharing each key/value head across a group of query heads — cutting KV-cache memory several-fold with near-zero quality loss; now the default attention configuration in almost every open LLM
- Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection — Trains an LM to emit reflection tokens deciding when to retrieve and whether retrieved passages support its output — making retrieval adaptive and self-critiqued instead of always-on, and improving factuality over standard RAG
- Constitutional AI: Harmlessness from AI Feedback — Trained a harmless assistant using AI self-critique and AI-judged preferences instead of human harm labels -- consider RLAIF when human labeling of harmful content is a bottleneck, though no reference code exists to reproduce it directly
- Language Models are Few-Shot Learners — Showed scaling a decoder-only Transformer to 175B params produces strong few-shot in-context learning with zero gradient updates, meaning you can often solve a new task via prompting instead of fine-tuning
- Evaluating Large Language Models Trained on Code (Codex / HumanEval) — Introduced Codex (the model behind GitHub Copilot) and HumanEval with the pass@k metric — establishing execution-based functional correctness, not text similarity, as the way to evaluate code generation
- Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference — Formalized the crowdsourced pairwise-battle leaderboard: anonymous side-by-side model comparisons on live user prompts, ranked with Bradley-Terry statistics — the methodology behind LMArena, the de facto public preference ranking for frontier models
- PaLM: Scaling Language Modeling with Pathways — 540B dense transformer trained across two TPU pods — the era's peak few-shot results, the canonical documentation of emergent abilities at scale, and the demonstration that chain-of-thought unlocks reasoning at sufficient size
- Deep Reinforcement Learning from Human Preferences — The origin of RLHF: learn a reward model from human comparisons of trajectory pairs, then optimize a policy against it — solving tasks where the objective is easier to recognize than to specify, with under 1% of interactions needing human feedback
- Training Verifiers to Solve Math Word Problems — The GSM8K paper: released the 8.5K grade-school math benchmark that anchored LLM reasoning evaluation for years, and introduced verifier-guided sampling — train a model to judge candidate solutions, sample many, pick the best — the seed of verification-based test-time compute
- FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness — Reframed attention as an IO problem: tiling and online softmax keep the computation in GPU SRAM, avoiding materializing the N×N matrix — exact attention, 2-4x faster and linear memory, now compiled into effectively all training and serving stacks

## High-Impact Tips

- Add A Max Step Budget To Every Agent Loop — 
- Keep the Smallest Failing Prompt for Every Recurring Issue — 
- Add an Eval Harness Before Refactoring Prompts or Retrieval Logic — 
- Add Hybrid Search for Exact-Match Terms — 
- Add Explicit Timeout, Retry, and Fallback Behavior to Every Provider Call — 
- Allowlist Tools Per Agent Role — 
- Benchmark With Production-Shaped Inputs, Not Synthetic Toy Prompts — 
- Benchmark Using Real Production Context Lengths, Not Short Toy Prompts — 
- Cache Embeddings Keyed by Content Hash to Avoid Duplicate Calls — 
- Use Prompt Caching for Long, Stable System Prompt Prefixes — 
