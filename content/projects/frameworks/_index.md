---
title: "Frameworks"
section: "projects/frameworks"
auto_generated: false
---

# Frameworks

## What belongs here

Libraries and SDKs that other projects and applications build on top of — agent frameworks (LangGraph, CrewAI, Google ADK), RAG/data frameworks (LangChain, LlamaIndex, Haystack), and pipeline-optimization frameworks (DSPy).

## What does NOT belong here

Standalone systems you deploy and run rather than import as a library belong in [Agent Systems](../agent-systems/_index.md); the model weights themselves belong in [Foundation Models](../foundation-models/_index.md).

## Relation to the Tools vertical

Framework entries document the library's architecture, ecosystem position, and when to choose it over an alternative framework at the same layer. For job-based tool shortlists (e.g. "what should I use for orchestration"), see `content/tools/by-job/` and `content/tools/orchestration/`.

## Decision guidance

Before selecting a framework:
- Key question to ask: am I building WITH this library, or deploying it AS a service? If the latter, check [Agent Systems](../agent-systems/_index.md) instead.
- If you need usage guidance rather than architectural depth: see [tools/orchestration/](../../tools/orchestration/_index.md)
- See [Choose an Agent Framework](../../architectures/model-selection/choose-agent-framework.md) and [RAG vs Fine-Tuning](../../architectures/system-design/rag-vs-fine-tuning.md) for cross-cutting selection guidance

## Projects in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Frameworks in This Phase

### Recently Added

- [agent-squad](./2fastlabs-agent-squad.md)
- [instructor](./567-labs-instructor.md)
- [Agent_Memory_Techniques](./agent-memory-techniques.md)
- [agent-rules-books](./agent-rules-books.md)
- [agents-best-practices](./agents-best-practices.md)
- [aim](./aimhubio-aim.md)
- [Anthropic-Cybersecurity-Skills](./anthropic-cybersecurity-skills.md)
- [antigravity-sdk-python](./antigravity-sdk-python.md)
- [autogluon](./autogluon-autogluon.md)
- [catboost](./catboost-catboost.md)

### Most Popular

- [tensorflow](./tensorflow-tensorflow.md) — ⭐ 200583
- [AutoGPT](./autogpt.md) — ⭐ 184931
- [transformers](./huggingface-transformers.md) — ⭐ 166755
- [Stable Diffusion WebUI](./stable-diffusion-webui.md) — ⭐ 164197
- [ponytail](./ponytail.md) — ⭐ 147381
- [Dify](./dify.md) — ⭐ 145081
- [LangChain](./langchain.md) — ⭐ 139206
- [ComfyUI](./comfy-org-comfyui.md) — ⭐ 135314
- [ComfyUI](./comfyui.md) — ⭐ 119901
- [caveman](./caveman.md) — ⭐ 108165

### Browse All

- [agent-squad](./2fastlabs-agent-squad.md) — Multi-agent framework that routes requests across specialised agents with per-agent model selection
- [instructor](./567-labs-instructor.md) — Library that constrains LLM output to a Pydantic model, validating and retrying until it parses
- [Agent_Memory_Techniques](./agent-memory-techniques.md) — Thirty executable notebooks that rebuild one chat assistant on progressively richer memory backends, then score them against the LoCoMo benchmark
- [agent-rules-books](./agent-rules-books.md) — AGENTS.md rule sets distilled from Clean Code, Clean Architecture, DDD, and DDIA, each shipped in mini, nano, and full sizes
- [agents-best-practices](./agents-best-practices.md) — A provider-neutral Agent Skill covering harness design, permission ladders, typed tool contracts, and production-readiness audits
- [AgentScope](./agentscope.md) — Apache-2.0 agent framework pairing composable SDK building blocks with a batteries-included FastAPI agent service, web UI, channels and scheduling
- [aim](./aimhubio-aim.md) — Self-hostable experiment tracker with a fast comparison UI, a terminal client for diffing runs, and RocksDB-backed metric storage
- [Amphion](./amphion.md) — An open toolkit for audio, music, and speech generation that gathers reproducible implementations of TTS, singing-voice, vocoder, and audio-generation models
- [Anthropic-Cybersecurity-Skills](./anthropic-cybersecurity-skills.md) — Eight hundred eighteen agent skills across thirty-four security domains, each mapped to the frameworks that apply to its type
- [antigravity-sdk-python](./antigravity-sdk-python.md) — Google's Python SDK that wraps the Antigravity runtime so one Agent object owns binary discovery, tools, hooks, and policy
- [ArkFlow](./arkflow.md) — High-performance Rust stream-processing engine integrating messaging, databases, SQL/DataFusion, and machine-learning model execution
- [AutoGen](./autogen.md) — Microsoft multi-agent framework now maintained as legacy after Agent Framework convergence
- [autogluon](./autogluon-autogluon.md) — AutoML that fits, tunes, and ensembles models behind a few lines and returns a fitted predictor
- [AutoGPT](./autogpt.md) — Autonomous agent platform and classic agent project for accessible AI automation
- [CAMEL](./camel-ai.md) — Apache-2.0 multi-agent research framework with ChatAgent, agent societies, synthetic data generation and benchmark suites for studying agent behaviour at scale
- [catboost](./catboost-catboost.md) — Gradient-boosting library with native categorical features and ordered target statistics
- [caveman](./caveman.md) — A prompt-shrinking skill and proxy that rewrites agent output into clipped caveman grammar to cut billed tokens
- [Cherry Studio](./cherry-studio.md) — AGPL-3.0 Electron desktop client for many LLM providers, with 300+ preset assistants, local Ollama and LM Studio support, MCP and an enterprise tier
- [ComfyUI](./comfy-org-comfyui.md) — GPL-3.0 node-graph engine for diffusion and video models where a saved workflow is a JSON graph other tools can replay
- [ComfyUI](./comfyui.md) — Node-graph engine for visual generative AI: the standard open-source interface for building diffusion and video-generation pipelines
- [Context7](./context7.md) — Up-to-date code documentation platform for LLMs and AI coding editors through retrieval and MCP access
- [CopilotKit](./copilotkit.md) — React/TypeScript frontend framework for building in-app copilots, agent chat, and generative UI, and the reference implementation of the AG-UI protocol
- [Coqui TTS](./coqui-tts.md) — A deep-learning toolkit for text-to-speech with dozens of pretrained models, training recipes, and the XTTS multilingual voice-cloning model
- [CrewAI](./crewai.md) — Role-based framework for orchestrating collaborative AI agent crews and flows
- [Fabric](./danielmiessler-fabric.md) — MIT-licensed Go binary that runs named AI patterns against piped text from any shell, with a crowdsourced strategy library
- [presidio](./data-privacy-stack-presidio.md) — PII detection and redaction framework with NLP and pattern recognizers plus context-aware scoring
- [dbt](./dbt-labs-dbt.md) — SQL-first transformation tool that compiles a project of models into a warehouse DAG with tests and lineage
- [DeerFlow](./deer-flow.md) — Open-source deep-research multi-agent framework built on LangChain/LangGraph that plans, searches, codes, and synthesizes long-horizon tasks into reports
- [Detectron2 (Meta)](./detectron2.md) — Meta's modular library for detection, segmentation, and visual recognition — the reference research platform behind a decade of detection work
- [Dify](./dify.md) — Visual platform for building agentic workflows, RAG apps, chatbots, and AI automations
- [xgboost](./dmlc-xgboost.md) — Apache-2.0 gradient-boosted decision tree library with a scikit-learn API, GPU support, and distributed training
- [DSPy](./dspy.md) — A framework for programming and optimizing language model pipelines
- [ESPnet](./espnet.md) — An end-to-end speech-processing toolkit covering ASR, TTS, speech translation, and enhancement, with Kaldi-style data pipelines and PyTorch models
- [spaCy](./explosion-spacy.md) — MIT-licensed industrial NLP library with Cython pipelines for tokenization, tagging, NER, parsing, and entity linking
- [MMF](./facebook-mmf.md) — Facebook AI Research's modular PyTorch framework for vision-and-language multimodal research, with datasets, pretrained models, and reproducible task pipelines
- [Gymnasium](./farama-foundation-gymnasium.md) — Standard API for reinforcement-learning environments with spaces, vectorisation, and a curated env registry
- [flue](./flue.md) — A TypeScript agent harness where an agent is a function that composes its own model, sandbox, skills, tools, and durability
- [Flyte](./flyte.md) — A Kubernetes-native workflow orchestration platform for data and ML, offering strongly-typed, versioned
- [FunASR](./funasr.md) — An industrial speech-recognition toolkit from Alibaba DAMO offering ASR, VAD, punctuation, diarization
- [GenAI Processors](./genai-processors.md) — Lightweight Python library from Google for building asynchronous, streaming, multimodal content-processing pipelines around Gemini and other models
- [Genkit](./genkit.md) — Open-source framework for building AI applications and agents in JavaScript, Go, and Python
- [Google ADK](./google-adk.md) — Google code-first Python toolkit for building, evaluating, and deploying AI agents
- [brax](./google-brax.md) — Massively parallel rigid-body simulation library where entire environments are vmapped and jitted on TPU or GPU
- [flax](./google-flax.md) — JAX neural network library whose Linen and nnx module systems keep parameters as explicit pytrees for jit-compatible training
- [scenic](./google-research-scenic.md) — JAX vision research library that expresses data loading, model, loss, and metrics as whole composable functions rather than mutable modules
- [h2o-3](./h2oai-h2o-3.md) — Distributed ML platform spanning AutoML, GLM, GBM, and model serving across data frames and Spark
- [Haystack](./haystack.md) — Modular framework for production search, RAG, agents, routing, and generation pipelines
- [Hugging Face Diffusers](./hf-diffusers.md) — The de facto Python library for diffusion models, providing pipelines, schedulers, and model components for image, video, and audio generation in PyTorch
- [pytorch-image-models](./huggingface-pytorch-image-models.md) — Apache-2.0 collection of PyTorch image encoders with matched training, validation, and ONNX export scripts for fair comparison
- [transformers](./huggingface-transformers.md) — Apache-2.0 model-definition layer exposing one AutoModel API over thousands of text, vision, audio, and multimodal checkpoints
- [jax](./jax-ml-jax.md) — Apache-2.0 composable array framework whose jit, grad, vmap, and pmap transformations differentiate and compile Python programs
- [Jina-serve](./jina-serve.md) — A cloud-native framework for building and serving multimodal AI services and pipelines as scalable microservices with gRPC/HTTP/WebSocket APIs and Kubernetes
- [micrograd](./karpathy-micrograd.md) — Tiny scalar autograd engine plus neural-network layers with a PyTorch-shaped API, in a few hundred lines
- [Kedro](./kedro.md) — A Python framework that applies software-engineering best practices to data science, structuring reproducible, maintainable
- [kestra](./kestra-io-kestra.md) — Apache-2.0 Java orchestration platform with event-driven triggers, durable execution, and a UI for data and AI pipelines
- [Kiln](./kiln.md) — A desktop and library toolkit to build, evaluate, and optimize AI systems, covering evals, synthetic data, fine-tuning, RAG
- [kornia](./kornia-kornia.md) — Differentiable geometric computer-vision library of batched PyTorch operators for warps, homographies, and pose
- [LangChain](./langchain.md) — A framework for composing LLM applications, retrieval flows, tools, and agents
- [LangChain4j](./langchain4j.md) — An idiomatic Java library for building LLM applications on the JVM, with a unified API over providers and vector stores plus tool calling, MCP, agents, and RAG
- [LangGraph](./langgraph.md) — Graph-based framework for building stateful, durable LLM agents and workflows
- [learn-claude-code](./learn-claude-code.md) — A from-scratch teaching build of a coding-agent harness, arguing that agency comes from training and the harness is the vehicle
- [LightAgent](./lightagent.md) — A compact Python agent framework with hooks, durable sessions, graph memory, MCP adapters, and SQLite FTS5 retrieval
- [LightGBM](./lightgbm-org-lightgbm.md) — Histogram-based gradient boosting library with leaf-wise tree growth and GOSS/EFB sampling, written in C++
- [LlamaIndex](./llamaindex.md) — Data framework for building document agents, retrieval pipelines, and production RAG systems
- [Ludwig](./ludwig.md) — A declarative, low-code framework for building custom models and fine-tuning LLMs from a YAML config, without writing training code
- [Mastra](./mastra.md) — TypeScript framework for building AI agents, workflows, evals, and application backends
- [Metaflow](./metaflow.md) — Netflix's human-centric framework for building and managing real-life ML/AI systems, structuring workflows as DAGs with versioning, scaling to cloud
- [MetaGPT](./metagpt.md) — Multi-agent framework that simulates software-company roles for natural-language programming
- [Microsoft Agent Framework](./microsoft-agent-framework.md) — Microsoft framework for Python and .NET agents, workflows, and production orchestration
- [NNI (Neural Network Intelligence)](./microsoft-nni.md) — Microsoft's AutoML toolkit automating hyperparameter tuning, neural architecture search, and model compression across training frameworks and compute
- [mlx](./ml-explore-mlx.md) — MIT-licensed array framework with a NumPy-like API and lazy evaluation built on Apple silicon's unified memory
- [MMagic](./mmagic.md) — OpenMMLab's multimodal generative toolbox for AIGC, covering text-to-image, image/video super-resolution, inpainting, matting
- [MMDetection](./mmdetection.md) — OpenMMLab's PyTorch object-detection toolbox with modular components and hundreds of reproducible detector/segmentation model implementations and pretrained
- [NVIDIA NeMo](./nvidia-nemo.md) — NVIDIA's scalable generative-AI framework for building, training, and fine-tuning speech (ASR/TTS), LLM, and multimodal models with GPU-optimized pipelines
- [NeMo-Agent-Toolkit](./nvidia-nemo-agent-toolkit.md) — NVIDIA's library for connecting LLMs to tools and data, with profiling, guardrails, and evaluation built into the agent workflow
- [mmcv](./open-mmlab-mmcv.md) — Vision operator library and config-runner stack that the OpenMMLab detection and segmentation projects are built on
- [OpenAI Agents SDK](./openai-agents-sdk.md) — Lightweight Python framework for OpenAI-style agents, tools, handoffs, guardrails, and tracing
- [opencv](./opencv-opencv.md) — Apache-2.0 C++/Python computer-vision library covering decode, filtering, geometry, calibration, and DNN inference
- [OpenHands](./openhands.md) — AI software engineering agent platform for coding, terminal work, browser actions, and automation
- [openscience](./openscience.md) — A local-first research agent with a visible trace, real Python and R kernels, and bundled domain skills across biology and chemistry
- [OpenShell](./openshell.md) — NVIDIA's Rust sandboxed runtime for autonomous agents, governed by declarative YAML policies for files, network, and data exfiltration
- [PaddleDetection](./paddlepaddle-paddledetection.md) — PaddlePaddle object-detection toolkit covering detection, instance segmentation, tracking, and pose
- [PaddleNLP](./paddlepaddle-paddlenlp.md) — PaddlePaddle library of pretrained NLP and multimodal models with LLM and SLM training and serving paths
- [PaddleSpeech](./paddlespeech.md) — An easy-to-use speech toolkit on PaddlePaddle covering streaming ASR with punctuation, streaming TTS, speaker verification, speech translation
- [PaddleX](./paddlex.md) — PaddlePaddle's all-in-one, low-code development toolkit offering ready model pipelines for OCR, vision, time series
- [PocketFlow](./pocketflow.md) — A hundred-line Python LLM framework whose Node, Flow, and nested-Flow primitives express multi-agent, RAG, and workflow patterns
- [polyaxon](./polyaxon-polyaxon.md) — Control plane that tracks runs, pipelines, and agents with full lineage from experiment through to deployment and restart
- [ponytail](./ponytail.md) — An agent skill that pushes agents toward the laziest sufficient solution, with a benchmarked code-volume reduction writeup
- [PraisonAI](./praisonai.md) — Python multi-agent framework for building autonomous agents with built-in memory, RAG, and tool support across many LLM providers, configured in code or YAML
- [pyannote-audio](./pyannote-pyannote-audio.md) — Neural building blocks for speaker diarization: activity detection, change detection, and speaker embeddings
- [Pydantic AI](./pydantic-ai.md) — A Python agent framework built around typed models and structured outputs
- [PyOD](./pyod.md) — A comprehensive Python library for anomaly and outlier detection with 60+ algorithms spanning classical, ensemble
- [pyspur](./pyspur.md) — A visual playground for agentic workflows with trace capture, evals, RAG tooling, and one-click deployment as an API
- [audio](./pytorch-audio.md) — TorchAudio's audio I/O, transforms, and metrics, covering backends, effects, and functional DSP for PyTorch pipelines
- [vision](./pytorch-vision.md) — Torchvision's datasets, image transforms, and reference vision models built directly on torch tensors
- [repoprompt-ce](./repoprompt-ce.md) — A native macOS app that assembles reviewable CodeMaps, file selections, and Git diffs, then hands that context to agents via MCP
- [Rerun](./rerun.md) — Visualize, query, and stream multimodal and robotics data for AI development
- [Rig](./rig.md) — A Rust library for building modular, scalable LLM applications with typed abstractions for completions, embeddings, vector stores, tools, and agents
- [scikit-learn](./scikit-learn-scikit-learn.md) — BSD-3-Clause classical ML library defining the estimator, transformer, and Pipeline contracts that tabular and structured stages still use
- [Semantic Kernel](./semantic-kernel.md) — An SDK for integrating AI orchestration into production applications
- [shap](./shap-shap.md) — MIT-licensed explainability library computing Shapley-value attributions for any model, including black-box scorers and rankers
- [pycorrector](./shibing624-pycorrector.md) — Text error-correction toolkit that packages MacBERT, SoftMask, KenLM, and seq2seq correction models behind one short call
- [Smolagents](./smolagents.md) — Hugging Face library for lightweight agents that can reason and act through code
- [Speech To Speech](./speech-to-speech.md) — Hugging Face's modular open-source voice-agent pipeline (VAD→STT→LLM→TTS) exposed via an OpenAI Realtime-compatible WebSocket API
- [SpeechBrain](./speechbrain.md) — A PyTorch-based conversational-AI toolkit spanning ASR, TTS, speaker recognition, enhancement, and spoken-language understanding with reproducible training
- [Spring AI](./spring-ai.md) — The Spring ecosystem's official AI framework: portable LLM, RAG, tool-calling and MCP abstractions with Spring Boot auto-configuration for enterprise Java
- [Stable Diffusion WebUI](./stable-diffusion-webui.md) — AUTOMATIC1111's browser-based application for local Stable Diffusion image generation with an extensive extension ecosystem for control, upscaling
- [CoreNLP](./stanfordnlp-corenlp.md) — Java NLP suite of tokenizers, parsers, and annotators behind a stable pipeline API
- [Supervision](./supervision.md) — Roboflow's model-agnostic CV utilities — one Detections API over any detector, plus annotators, zone/line analytics, tracking, and dataset tools
- [Taipy](./taipy.md) — A Python framework for turning data and AI algorithms into production-ready web applications, pairing an interactive GUI layer with a pipeline/scenario
- [TanStack AI](./tanstack-ai.md) — Type-safe provider-agnostic TypeScript SDK for streaming chat, tool calling, agents, and multimodal apps
- [tensorflow](./tensorflow-tensorflow.md) — Apache-2.0 tensor and autodiff framework with graph execution, distributed strategies, and the broadest export surface of any DL stack
- [toon](./toon.md) — A compact serialization of the JSON data model using CSV-style tabular rows, with a spec, TypeScript SDK, CLI, and benchmarks
- [txtai](./txtai.md) — All-in-one framework for semantic search, LLM orchestration, embeddings, and workflows
- [Uiverse Design](./uiverse-design.md) — Open-source library of community-made CSS/Tailwind UI elements for faster front-end development
- [Ultralytics YOLO](./ultralytics.md) — The YOLO family framework — train, validate, and deploy real-time detection, segmentation, pose, and classification models with a three-line API
- [Ultralytics YOLO](./ultralytics-yolo.md) — The most widely used real-time object detection framework: YOLO models for detection, segmentation, pose, and tracking with a three-line API
- [Vercel AI SDK](./vercel-ai-sdk.md) — The standard TypeScript toolkit for AI apps: one provider-agnostic API for text, structured output, tool calling, and agents with React/Next.js streaming UI
- [wav2letter (Flashlight ASR)](./wav2letter.md) — Facebook AI Research's C++ automatic-speech-recognition toolkit built on the Flashlight library, notable for fully convolutional acoustic models and fast
- [zenml](./zenml-io-zenml.md) — ML pipeline abstraction that keeps pipeline code portable across orchestrators through a stack of swappable integrations
