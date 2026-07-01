# Research

> Navigation file for the Research section. This file is auto-generated and is not a content entry.

## Quick Navigation

| Sub-section | Count | Last Updated |
|---|---:|---|
| [agents and reasoning](./agents-and-reasoning/) | 0 entries | 2026-07-01 |
| [architectures](./architectures/) | 0 entries | 2026-07-01 |
| [evaluation and safety](./evaluation-and-safety/) | 0 entries | 2026-07-01 |
| [foundational](./foundational/) | 5 entries | 2026-07-01 |
| [inference and efficiency](./inference-and-efficiency/) | 2 entries | 2026-07-01 |
| [papers](./papers/) | 11 entries | 2026-07-01 |
| [retrieval and memory](./retrieval-and-memory/) | 0 entries | 2026-07-01 |
| [surveys](./surveys/) | 0 entries | 2026-07-01 |
| [training and alignment](./training-and-alignment/) | 7 entries | 2026-07-01 |

## Recently Added

- [Language Models are Few-Shot Learners](./foundational/brown-2020-gpt3.md)
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](./papers/chain-of-thought-prompting.md)
- [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](./foundational/devlin-2018-bert.md)
- [Emerging AI Techniques](./emerging-techniques.md)
- [From Local to Global: A Graph RAG Approach to Query-Focused Summarization](./papers/graphrag.md)
- [Precise Zero-Shot Dense Retrieval without Relevance Labels](./papers/hyde.md)
- [Must-Read AI Papers](./must-read-papers.md)
- [RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval](./papers/raptor.md)
- [ReAct: Synergizing Reasoning and Acting in Language Models](./papers/react.md)
- [SOTA Benchmarks](./sota-benchmarks.md)

## Most Popular

_No star-tracked entries yet._

## Browse All

- [Constitutional AI: Harmlessness from AI Feedback](./training-and-alignment/bai-2022-constitutional-ai.md) — Trained a harmless assistant using AI self-critique and AI-judged preferences instead of human harm labels -- consider RLAIF when human labeling of harmful content is a bottleneck, though no reference code exists to reproduce it directly
- [Language Models are Few-Shot Learners](./foundational/brown-2020-gpt3.md) — Showed scaling a decoder-only Transformer to 175B params produces strong few-shot in-context learning with zero gradient updates, meaning you can often solve a new task via prompting instead of fine-tuning
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](./papers/chain-of-thought-prompting.md) — Showed that prompting models to produce intermediate reasoning improves multi-step reasoning tasks
- [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](./training-and-alignment/deepseek-ai-2025-r1.md) — Showed RL with automated, verifiable rewards (not human labels) can train strong reasoning directly, then distills into smaller dense models -- consider RL-from-verifiable-rewards for reasoning-heavy domains, not just human-feedback alignment
- [QLoRA: Efficient Finetuning of Quantized LLMs](./training-and-alignment/dettmers-2023-qlora.md) — Showed you can fine-tune a 4-bit-quantized frozen base model with LoRA adapters trained in full precision, meaning you should use QLoRA when you need to fine-tune a large model on a single consumer GPU that couldn't otherwise fit it
- [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](./foundational/devlin-2018-bert.md) — Showed bidirectional masked-language-model pretraining beats left-to-right pretraining, meaning you should reach for an encoder-only model (not a decoder-only LLM) for classification/embedding tasks
- [The Llama 3 Herd of Models](./foundational/dubey-2024-llama3.md) — Documented Meta's dense 405B-parameter Llama 3 herd as an open-weight family competitive with GPT-4 -- the reference technical report for an open-weight family, though Meta's current line has moved to Llama 4's MoE design
- [Emerging AI Techniques](./emerging-techniques.md) — Current techniques worth tracking across reasoning, context, inference, and multimodal systems
- [GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers](./inference-and-efficiency/frantar-2022-gptq.md) — Showed one-shot post-training quantization to 3-4 bits is feasible for 100B+ param models in hours with minimal accuracy loss -- reach for GPTQ (or AWQ) as a default quantization option before more disruptive approaches
- [From Local to Global: A Graph RAG Approach to Query-Focused Summarization](./papers/graphrag.md) — Introduced a graph-based RAG approach for global summarization over private datasets
- [LoRA: Low-Rank Adaptation of Large Language Models](./training-and-alignment/hu-2021-lora.md) — Showed you can fine-tune a large model by training only small low-rank update matrices injected into attention weights, meaning you should use LoRA (not full fine-tuning) whenever GPU memory or storage for many fine-tuned variants is a constraint
- [Precise Zero-Shot Dense Retrieval without Relevance Labels](./papers/hyde.md) — Introduced HyDE, which retrieves by embedding a hypothetical answer/document generated from the query
- [Fast Inference from Transformers via Speculative Decoding](./inference-and-efficiency/leviathan-2022-speculative-decoding.md) — Showed a small draft model's guesses can be verified in parallel by the full model with zero change to the output distribution, meaning production inference engines should implement speculative decoding to cut generation latency without sacrificing exactness
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](./foundational/lewis-2020-rag.md) — Coined 'RAG': a jointly-trained retriever plus generator beats closed-book generation on knowledge-intensive tasks -- ground generation in retrieved documents, though production RAG today uses a simpler decoupled pipeline
- [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](./papers/llm-as-a-judge.md) — Evaluates using LLMs as judges for open-ended model comparison
- [Must-Read AI Papers](./must-read-papers.md) — Categorized reading guide for foundational and high-leverage AI papers
- [Training Language Models to Follow Instructions with Human Feedback](./training-and-alignment/ouyang-2022-instructgpt.md) — Established the 3-stage RLHF recipe (SFT, reward modeling, PPO) that turned GPT-3 into an assistant -- know this pipeline shape, though most teams now reach for simpler DPO instead of implementing PPO-based RLHF directly
- [Direct Preference Optimization: Your Language Model is Secretly a Reward Model](./training-and-alignment/rafailov-2023-dpo.md) — Showed the RLHF objective can be solved directly with a simple classification loss on preference pairs, with no separate reward model and no online RL -- meaning you should reach for DPO instead of implementing PPO-based RLHF for most alignment/preference-tuning work
- [RAGAS: Automated Evaluation of Retrieval Augmented Generation](./papers/ragas-paper.md) — Defines reference-free metrics for evaluating RAG pipelines
- [RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval](./papers/raptor.md) — Introduced hierarchical retrieval over recursively summarized document clusters
- [ReAct: Synergizing Reasoning and Acting in Language Models](./papers/react.md) — Combined reasoning traces with actions so language models can think and use tools interleaved
- [Self-Refine: Iterative Refinement with Self-Feedback](./papers/self-refine.md) — Explores iterative self-feedback for improving generated outputs
- [SOTA Benchmarks](./sota-benchmarks.md) — Reference table of model, agent, code, math, and safety benchmark leaderboards
- [SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering](./papers/swe-agent.md) — Studies agent-computer interfaces for software engineering tasks
- [Toolformer: Language Models Can Teach Themselves to Use Tools](./papers/toolformer.md) — Showed that language models can learn to call tools using self-supervised API-call annotations
- [Tree of Thoughts: Deliberate Problem Solving with Large Language Models](./papers/tree-of-thoughts.md) — Introduced search over multiple reasoning paths instead of a single left-to-right chain
- [Attention Is All You Need](./foundational/vaswani-2017-attention.md) — Showed self-attention alone (no recurrence or convolution) can model sequences, enabling fully parallelised training that made today's LLM-scale training runs computationally feasible
- [Weekly ArXiv Picks](./weekly-arxiv-picks.md) — Template for weekly AI engineering paper picks and maintainer review
- [Qwen2.5-Math Technical Report: Toward Mathematical Expert Model via Self-Improvement](./training-and-alignment/yang-2024-qwen25-math.md) — Documented a self-improvement pipeline (using the model to generate and filter its own better math training data) producing strong math-specific models -- narrow applicability, and Qwen's own successors have since surpassed these results
