# Research

> Navigation file for the Research section. This file is auto-generated and is not a content entry.

## Quick Navigation

| Sub-section | Count | Last Updated |
|---|---:|---|
| [agents and reasoning](./agents-and-reasoning/) | 0 entries | 2026-07-01 |
| [architectures](./architectures/) | 0 entries | 2026-07-01 |
| [evaluation and safety](./evaluation-and-safety/) | 0 entries | 2026-07-01 |
| [foundational](./foundational/) | 5 entries | 2026-07-01 |
| [inference and efficiency](./inference-and-efficiency/) | 0 entries | 2026-07-01 |
| [papers](./papers/) | 20 entries | 2026-07-01 |
| [retrieval and memory](./retrieval-and-memory/) | 0 entries | 2026-07-01 |
| [surveys](./surveys/) | 0 entries | 2026-07-01 |
| [training and alignment](./training-and-alignment/) | 0 entries | 2026-07-01 |

## Recently Added

- [Language Models are Few-Shot Learners](./foundational/brown-2020-gpt3.md)
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](./papers/chain-of-thought-prompting.md)
- [Constitutional AI: Harmlessness from AI Feedback](./papers/constitutional-ai.md)
- [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](./papers/deepseek-r1.md)
- [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](./foundational/devlin-2018-bert.md)
- [Emerging AI Techniques](./emerging-techniques.md)
- [GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers](./papers/gptq.md)
- [From Local to Global: A Graph RAG Approach to Query-Focused Summarization](./papers/graphrag.md)
- [Precise Zero-Shot Dense Retrieval without Relevance Labels](./papers/hyde.md)
- [Training Language Models to Follow Instructions with Human Feedback](./papers/instructgpt.md)

## Most Popular

_No star-tracked entries yet._

## Browse All

- [Language Models are Few-Shot Learners](./foundational/brown-2020-gpt3.md) — Showed scaling a decoder-only Transformer to 175B params produces strong few-shot in-context learning with zero gradient updates, meaning you can often solve a new task via prompting instead of fine-tuning
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](./papers/chain-of-thought-prompting.md) — Showed that prompting models to produce intermediate reasoning improves multi-step reasoning tasks
- [Constitutional AI: Harmlessness from AI Feedback](./papers/constitutional-ai.md) — Introduced a framework for training helpful and harmless assistants using constitutional principles and AI feedback
- [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](./papers/deepseek-r1.md) — Presented DeepSeek-R1, an open reasoning model trained with reinforcement learning and distilled variants
- [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](./foundational/devlin-2018-bert.md) — Showed bidirectional masked-language-model pretraining beats left-to-right pretraining, meaning you should reach for an encoder-only model (not a decoder-only LLM) for classification/embedding tasks
- [Direct Preference Optimization](./papers/direct-preference-optimization.md) — Simplifies preference optimization for aligning language models
- [The Llama 3 Herd of Models](./foundational/dubey-2024-llama3.md) — Documented Meta's dense 405B-parameter Llama 3 herd as an open-weight family competitive with GPT-4 -- the reference technical report for an open-weight family, though Meta's current line has moved to Llama 4's MoE design
- [Emerging AI Techniques](./emerging-techniques.md) — Current techniques worth tracking across reasoning, context, inference, and multimodal systems
- [GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers](./papers/gptq.md) — Introduced accurate post-training quantization methods for large generative transformers
- [From Local to Global: A Graph RAG Approach to Query-Focused Summarization](./papers/graphrag.md) — Introduced a graph-based RAG approach for global summarization over private datasets
- [Precise Zero-Shot Dense Retrieval without Relevance Labels](./papers/hyde.md) — Introduced HyDE, which retrieves by embedding a hypothetical answer/document generated from the query
- [Training Language Models to Follow Instructions with Human Feedback](./papers/instructgpt.md) — Introduced the InstructGPT RLHF recipe for making language models follow user instructions better
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](./foundational/lewis-2020-rag.md) — Coined 'RAG': a jointly-trained retriever plus generator beats closed-book generation on knowledge-intensive tasks -- ground generation in retrieved documents, though production RAG today uses a simpler decoupled pipeline
- [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](./papers/llm-as-a-judge.md) — Evaluates using LLMs as judges for open-ended model comparison
- [LoRA: Low-Rank Adaptation of Large Language Models](./papers/lora.md) — Introduced low-rank adapters for parameter-efficient fine-tuning of large models
- [Must-Read AI Papers](./must-read-papers.md) — Categorized reading guide for foundational and high-leverage AI papers
- [QLoRA: Efficient Finetuning of Quantized LLMs](./papers/qlora.md) — Enabled fine-tuning quantized LLMs with low memory using 4-bit quantization plus LoRA
- [Qwen2.5-Math Technical Report](./papers/qwen2-5-math.md) — Presented Qwen2.5-Math models and a self-improvement pipeline for mathematical reasoning
- [RAGAS: Automated Evaluation of Retrieval Augmented Generation](./papers/ragas-paper.md) — Defines reference-free metrics for evaluating RAG pipelines
- [RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval](./papers/raptor.md) — Introduced hierarchical retrieval over recursively summarized document clusters
- [ReAct: Synergizing Reasoning and Acting in Language Models](./papers/react.md) — Combined reasoning traces with actions so language models can think and use tools interleaved
- [Self-Refine: Iterative Refinement with Self-Feedback](./papers/self-refine.md) — Explores iterative self-feedback for improving generated outputs
- [SOTA Benchmarks](./sota-benchmarks.md) — Reference table of model, agent, code, math, and safety benchmark leaderboards
- [Fast Inference from Transformers via Speculative Decoding](./papers/speculative-decoding.md) — Introduced speculative decoding to accelerate generation using a faster draft model verified by a larger model
- [SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering](./papers/swe-agent.md) — Studies agent-computer interfaces for software engineering tasks
- [Toolformer: Language Models Can Teach Themselves to Use Tools](./papers/toolformer.md) — Showed that language models can learn to call tools using self-supervised API-call annotations
- [Tree of Thoughts: Deliberate Problem Solving with Large Language Models](./papers/tree-of-thoughts.md) — Introduced search over multiple reasoning paths instead of a single left-to-right chain
- [Attention Is All You Need](./foundational/vaswani-2017-attention.md) — Showed self-attention alone (no recurrence or convolution) can model sequences, enabling fully parallelised training that made today's LLM-scale training runs computationally feasible
- [Weekly ArXiv Picks](./weekly-arxiv-picks.md) — Template for weekly AI engineering paper picks and maintainer review
