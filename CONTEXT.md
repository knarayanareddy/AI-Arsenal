# AI Arsenal — Dense Context Summary

Generated: 2026-07-06T17:09:38.325Z | Entries: 392 | Schema version: 1.0.0

AI Arsenal is a Markdown-first, schema-enforced knowledge base for AI engineering. It is designed for humans browsing GitHub, LLMs ingesting context, autonomous agents routing to files, and future UI/API consumers.

## Counts

- Projects: 68
- Tools: 92
- Papers: 25
- Tips: 102
- People: 25
- Digests: 0
- Guides: 28
- Build examples: 8
- Architectures: 14
- Observability: 7
- Community: 23

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
- Semantic Kernel (⭐28114, score:70) — An SDK for integrating AI orchestration into production applications
- Pydantic AI (⭐17738, score:70) — A Python agent framework built around typed models and structured outputs
- Microsoft Agent Framework (⭐11311, score:50) — Microsoft framework for Python and .NET agents, workflows, and production orchestration
- Stagehand (⭐5400, score:50) — Open-source browser-AI framework for reliable AI agent web interactions
- AutoGPT (⭐184931, score:40) — Autonomous agent platform and classic agent project for accessible AI automation

### llms
- Qwen (⭐21281, score:70) — Alibaba open-weight model family covering language, coding, and multimodal use cases
- Gemma (⭐5410, score:70) — Google open model family designed for efficient language and multimodal applications
- Phi Cookbook (⭐3750, score:70) — Microsoft examples and recipes for building with the Phi model family
- TranslateGemma (⭐5000, score:50) — Open translation model family built on Gemma 3 supporting 55 languages efficiently
- Ollama (⭐174059, score:30) — Local runtime for downloading, running, and serving open-weight models on developer machines

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
- Firecrawl (⭐132342, score:30) — Open-source and hosted web scraping API that turns websites into LLM-ready markdown/data
- RAGFlow (⭐82655, score:30) — Open-source RAG engine combining document understanding, retrieval, and agent capabilities

### tooling
- Uiverse Design (⭐11000, score:40) — Open-source library of community-made CSS/Tailwind UI elements for faster front-end development

## Top Tools by Job

### data-labeling
- Argilla — Open-source platform for human and AI feedback, data curation, and evaluation datasets
- Label Studio — An open-source data labeling platform for ML and AI datasets
- Prodigy — Scriptable annotation tool for NLP, data labeling, and model-in-the-loop workflows
- Scale AI — Managed data labeling and data engine platform for enterprise AI datasets

### deployment
- AWS Bedrock — AWS managed service for accessing foundation models and building generative AI apps
- Azure AI Studio — Microsoft Azure platform for building, evaluating, and deploying AI applications
- BentoML — A framework for packaging, deploying, and scaling AI model services
- Empromptu AI — Build, deploy, and manage custom AI applications that improve over time
- Fly.io — Application hosting platform with global machines and GPU options for AI services

### evaluation
- Argilla — Open-source platform for human and AI feedback, data curation, and evaluation datasets
- Astra Autonomous Pentest — Continuous AI-powered penetration testing for applications, APIs, and cloud infrastructure
- Code Arena — Benchmark and compare AI models in a competitive coding environment
- Giskard — Testing platform for evaluating and scanning ML and LLM applications
- Humanloop — A platform for prompt management, evaluation, and product feedback workflows

### fine-tuning
- Axolotl — Configuration-driven fine-tuning framework for many open-weight LLM families
- LLaMA-Factory — Unified fine-tuning framework and UI for many LLMs and training methods
- MLX-LM — Apple MLX library for running and fine-tuning LLMs on Apple Silicon
- OrchestraML — Automate end-to-end ML workflows from data prep to deployment using AI agents
- PEFT — Hugging Face library for parameter-efficient fine-tuning methods

### memory-management
- Letta — Stateful agent framework and memory system formerly known as MemGPT
- Mem0 — Memory layer for AI agents and assistants with long-term user and session memory
- Memoriq — Private AI memory layer that learns from your conversations and documents
- Redis — In-memory data store commonly used for caching, session memory, queues, and vector search
- Zep — Memory and context engineering platform for AI agents and assistants

### model-registry
- DVC — Open-source data and model versioning tool for ML projects and pipelines
- Hugging Face Hub — Model, dataset, and Space hosting platform for sharing and versioning AI artifacts
- MLflow — Open-source platform for experiment tracking, model registry, and ML lifecycle management
- Weights & Biases — Experiment tracking and model management platform for ML and AI teams

### monitoring
- Conan — Live HUD for monitoring and interacting with AI agent sessions on macOS
- LangSmith — A managed platform for tracing, evaluating, and monitoring LangChain applications
- Monako Glass — Visualize and understand AI model outputs with dynamic Pulse Rings and overlays
- Portkey — An AI gateway for routing, observability, guardrails, and prompt management
- Spotlight by Backplanes — Understand, improve, and track AI agent sessions with observability tooling

### orchestration
- AGNT.Hub — Build and manage secure, private AI agents with custom skills and policies
- Apache Airflow — Mature workflow scheduler for batch data, ML, and AI pipeline orchestration
- Cloudskill — Manage, govern, and distribute skills for AI agents across teams
- Dagster — Data orchestration platform for assets, pipelines, schedules, and observability
- Dropstone 3 — Collaborative AI workspace for teams to build, describe, and ship software together

### production-serving
- BentoML — A framework for packaging, deploying, and scaling AI model services
- FastAPI — Python web framework for building APIs around AI services and model workflows
- Fireworks AI — A managed platform for fast inference and fine-tuning of open models
- Fly.io — Application hosting platform with global machines and GPU options for AI services
- Hugging Face Inference Endpoints — Managed Hugging Face service for deploying models as production inference endpoints

### prompt-management
- Cloudskill — Manage, govern, and distribute skills for AI agents across teams
- Humanloop — A platform for prompt management, evaluation, and product feedback workflows
- Langfuse Prompts — Prompt management and versioning workflows inside the Langfuse observability platform
- LangSmith Hub — LangSmith prompt and dataset workflows for LangChain and LangGraph applications
- LiteLLM — A proxy and SDK for routing requests across many LLM providers

### prototyping
- Chainlit — A framework for building conversational AI interfaces and debugging LLM apps
- Dropstone 3 — Collaborative AI workspace for teams to build, describe, and ship software together
- FastAPI — Python web framework for building APIs around AI services and model workflows
- Gradio — A Python library for building and sharing machine learning demos quickly
- Manus — AI-powered platform for building full-stack web applications and automating tasks

### security-and-guardrails
- Agent Browser Shield — Secure AI web browsing by cleaning content and masking PII during agent runs
- AGNT.Hub — Build and manage secure, private AI agents with custom skills and policies
- Astra Autonomous Pentest — Continuous AI-powered penetration testing for applications, APIs, and cloud infrastructure
- Giskard — Testing platform for evaluating and scanning ML and LLM applications
- Guardrails AI — A framework for validating, correcting, and constraining LLM outputs

### structured-output
- Basedash — AI-native platform for generating dashboards, reports, and insights from natural-language queries
- Claude Artifact Player — Interact with and manage AI-generated artifacts from Claude and similar models
- Google Pomelli 2.0 — Explore and interact with large datasets through a visual, intuitive interface
- Guardrails AI — A framework for validating, correcting, and constraining LLM outputs
- Guidance — Microsoft guidance library for controlling and constraining language model generation

### tracing
- Conan — Live HUD for monitoring and interacting with AI agent sessions on macOS
- LangSmith — A managed platform for tracing, evaluating, and monitoring LangChain applications
- Spotlight by Backplanes — Understand, improve, and track AI agent sessions with observability tooling
- Superlog — Real-time log aggregation platform designed for serverless debugging
- TruLens — An evaluation and tracking toolkit for LLM and RAG applications

### vector-search
- Pinecone — A managed vector database for production semantic search applications

### web-scraping
- Agent Browser Shield — Secure AI web browsing by cleaning content and masking PII during agent runs
- Crawl4AI — Python crawler and scraper designed for LLM-friendly web content extraction
- Firecrawl — API and open-source project for scraping and crawling websites into LLM-ready Markdown
- Jina AI Reader — Reader endpoint for converting web pages into LLM-friendly text and Markdown
- Playwright — Browser automation framework for reliable end-to-end tests and web scraping workflows

## Architecture Quick Refs

- Enterprise-Scale AI Stack vs Production RAG Stack: When Governance Overhead Is Justified — 
- Lean MVP Stack vs Production RAG Stack: Speed vs Durability Tradeoff — 
- Local-First Stack vs Cloud API Stack: Privacy and Cost Control vs Capability Ceiling — 
- Multi-Agent System Stack vs Single-Agent Loop: When Role Decomposition Is Worth It — 
- Production RAG Stack vs Lean MVP Stack: When Ingestion, Eval, and Observability Earn Their Cost — 
- Research Platform Stack vs Product Stack: Reproducibility vs Shipping Speed — 

## Architecture Decisions by Category

### data-strategy
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
- Choosing a Deployment Target: Separating App Hosting From Model Serving — 

### system-design
- Choosing an Agent Memory Architecture: Session, Long-Term, and Semantic — 
- RAG vs Fine-Tuning: Knowledge Injection vs Behavior Adaptation — 

## Observability Playbooks by Category

### cost-usage
- Attribute Every LLM Call's Cost to a Feature, User, and Prompt Version, Not Just a Monthly Invoice Total — 

### evaluation-quality
- Gate Prompt, Model, and Retriever Changes on a Versioned Eval Dataset Before They Ship — 

### incident-response
- Triage, Kill-Switch, and Postmortem Runbook for Agent Loops, RAG Regressions, and Cost Blowouts — 

### instrumentation
- Capture a Structured Event for Every LLM Call, Not Just an Access Log Line — 

### monitoring-alerting
- Alert on SLO Burn Rate, Not Raw Thresholds, for Latency, Cost, and Quality Regressions — 

### privacy-governance
- Detect and Redact PII in Traces at the Gateway Boundary, Before It Reaches Any Store — 

### tracing
- Trace Every Retrieval, Tool Call, and Agent Transition as a Child Span, Not Just the Final Answer — 

## Community Directory by Kind

### chat
- EleutherAI Discord — 
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
- LAION (Large-scale Artificial Intelligence Open Network) — 

### event
- AI Engineer World's Fair — 

### forum
- LangChain Forum — 
- OpenAI Developer Community — 
- r/LocalLLaMA (Reddit) — 

### meetup
- AI Tinkerers — 

### newsletter
- Import AI (Jack Clark) — 
- Interconnects (Nathan Lambert) — 
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

- Constitutional AI: Harmlessness from AI Feedback — Trained a harmless assistant using AI self-critique and AI-judged preferences instead of human harm labels -- consider RLAIF when human labeling of harmful content is a bottleneck, though no reference code exists to reproduce it directly
- Language Models are Few-Shot Learners — Showed scaling a decoder-only Transformer to 175B params produces strong few-shot in-context learning with zero gradient updates, meaning you can often solve a new task via prompting instead of fine-tuning
- DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning — Showed RL with automated, verifiable rewards (not human labels) can train strong reasoning directly, then distills into smaller dense models -- consider RL-from-verifiable-rewards for reasoning-heavy domains, not just human-feedback alignment
- QLoRA: Efficient Finetuning of Quantized LLMs — Showed you can fine-tune a 4-bit-quantized frozen base model with LoRA adapters trained in full precision, meaning you should use QLoRA when you need to fine-tune a large model on a single consumer GPU that couldn't otherwise fit it
- BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding — Showed bidirectional masked-language-model pretraining beats left-to-right pretraining, meaning you should reach for an encoder-only model (not a decoder-only LLM) for classification/embedding tasks
- The Llama 3 Herd of Models — Documented Meta's dense 405B-parameter Llama 3 herd as an open-weight family competitive with GPT-4 -- the reference technical report for an open-weight family, though Meta's current line has moved to Llama 4's MoE design
- From Local to Global: A Graph RAG Approach to Query-Focused Summarization — Built a knowledge-graph index with hierarchical community summaries for global, holistic corpus queries -- reach for GraphRAG only for 'summarize the whole dataset' queries, given its indexing cost runs 100x-6000x that of standard vector RAG
- RAGAS: Automated Evaluation of Retrieval Augmented Generation — Defined reference-free metrics (faithfulness, answer relevance, context relevance) for evaluating RAG pipelines with no human-labeled ground truth -- use RAGAS-style metrics as your default RAG evaluation approach rather than building bespoke evaluation
- GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers — Showed one-shot post-training quantization to 3-4 bits is feasible for 100B+ param models in hours with minimal accuracy loss -- reach for GPTQ (or AWQ) as a default quantization option before more disruptive approaches
- Precise Zero-Shot Dense Retrieval without Relevance Labels — Showed you can retrieve well in a zero-shot setting by generating a hypothetical answer first and embedding that instead of the raw query, meaning you should reach for HyDE specifically when you have no labeled relevance data to train or fine-tune a retriever

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
