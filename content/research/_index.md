# Research

> Navigation file for the Research section. This file is auto-generated and is not a content entry.

## Quick Navigation

| Sub-section | Count | Last Updated |
|---|---:|---|
| [agents and reasoning](./agents-and-reasoning/) | 6 entries | 2026-07-02 |
| [architectures](./architectures/) | 0 entries | 2026-07-02 |
| [evaluation and safety](./evaluation-and-safety/) | 2 entries | 2026-07-02 |
| [foundational](./foundational/) | 5 entries | 2026-07-02 |
| [inference and efficiency](./inference-and-efficiency/) | 2 entries | 2026-07-02 |
| [retrieval and memory](./retrieval-and-memory/) | 3 entries | 2026-07-02 |
| [surveys](./surveys/) | 0 entries | 2026-07-02 |
| [training and alignment](./training-and-alignment/) | 7 entries | 2026-07-02 |

## Recently Added

- [Language Models are Few-Shot Learners](./foundational/brown-2020-gpt3.md)
- [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](./foundational/devlin-2018-bert.md)
- [Emerging AI Techniques](./emerging-techniques.md)
- [Must-Read AI Papers](./must-read-papers.md)
- [SOTA Benchmarks](./sota-benchmarks.md)
- [Attention Is All You Need](./foundational/vaswani-2017-attention.md)
- [Weekly ArXiv Picks](./weekly-arxiv-picks.md)
- [Constitutional AI: Harmlessness from AI Feedback](./training-and-alignment/bai-2022-constitutional-ai.md)
- [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](./training-and-alignment/deepseek-ai-2025-r1.md)
- [QLoRA: Efficient Finetuning of Quantized LLMs](./training-and-alignment/dettmers-2023-qlora.md)

## Most Popular

_No star-tracked entries yet._

## Browse All

- [Constitutional AI: Harmlessness from AI Feedback](./training-and-alignment/bai-2022-constitutional-ai.md) — Trained a harmless assistant using AI self-critique and AI-judged preferences instead of human harm labels -- consider RLAIF when human labeling of harmful content is a bottleneck, though no reference code exists to reproduce it directly
- [Language Models are Few-Shot Learners](./foundational/brown-2020-gpt3.md) — Showed scaling a decoder-only Transformer to 175B params produces strong few-shot in-context learning with zero gradient updates, meaning you can often solve a new task via prompting instead of fine-tuning
- [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](./training-and-alignment/deepseek-ai-2025-r1.md) — Showed RL with automated, verifiable rewards (not human labels) can train strong reasoning directly, then distills into smaller dense models -- consider RL-from-verifiable-rewards for reasoning-heavy domains, not just human-feedback alignment
- [QLoRA: Efficient Finetuning of Quantized LLMs](./training-and-alignment/dettmers-2023-qlora.md) — Showed you can fine-tune a 4-bit-quantized frozen base model with LoRA adapters trained in full precision, meaning you should use QLoRA when you need to fine-tune a large model on a single consumer GPU that couldn't otherwise fit it
- [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](./foundational/devlin-2018-bert.md) — Showed bidirectional masked-language-model pretraining beats left-to-right pretraining, meaning you should reach for an encoder-only model (not a decoder-only LLM) for classification/embedding tasks
- [The Llama 3 Herd of Models](./foundational/dubey-2024-llama3.md) — Documented Meta's dense 405B-parameter Llama 3 herd as an open-weight family competitive with GPT-4 -- the reference technical report for an open-weight family, though Meta's current line has moved to Llama 4's MoE design
- [From Local to Global: A Graph RAG Approach to Query-Focused Summarization](./retrieval-and-memory/edge-2024-graphrag.md) — Built a knowledge-graph index with hierarchical community summaries for global, holistic corpus queries -- reach for GraphRAG only for 'summarize the whole dataset' queries, given its indexing cost runs 100x-6000x that of standard vector RAG
- [Emerging AI Techniques](./emerging-techniques.md) — Current techniques worth tracking across reasoning, context, inference, and multimodal systems
- [RAGAS: Automated Evaluation of Retrieval Augmented Generation](./evaluation-and-safety/es-2023-ragas.md) — Defined reference-free metrics (faithfulness, answer relevance, context relevance) for evaluating RAG pipelines with no human-labeled ground truth -- use RAGAS-style metrics as your default RAG evaluation approach rather than building bespoke evaluation
- [GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers](./inference-and-efficiency/frantar-2022-gptq.md) — Showed one-shot post-training quantization to 3-4 bits is feasible for 100B+ param models in hours with minimal accuracy loss -- reach for GPTQ (or AWQ) as a default quantization option before more disruptive approaches
- [Precise Zero-Shot Dense Retrieval without Relevance Labels](./retrieval-and-memory/gao-2022-hyde.md) — Showed you can retrieve well in a zero-shot setting by generating a hypothetical answer first and embedding that instead of the raw query, meaning you should reach for HyDE specifically when you have no labeled relevance data to train or fine-tune a retriever
- [LoRA: Low-Rank Adaptation of Large Language Models](./training-and-alignment/hu-2021-lora.md) — Showed you can fine-tune a large model by training only small low-rank update matrices injected into attention weights, meaning you should use LoRA (not full fine-tuning) whenever GPU memory or storage for many fine-tuned variants is a constraint
- [Fast Inference from Transformers via Speculative Decoding](./inference-and-efficiency/leviathan-2022-speculative-decoding.md) — Showed a small draft model's guesses can be verified in parallel by the full model with zero change to the output distribution, meaning production inference engines should implement speculative decoding to cut generation latency without sacrificing exactness
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](./foundational/lewis-2020-rag.md) — Coined 'RAG': a jointly-trained retriever plus generator beats closed-book generation on knowledge-intensive tasks -- ground generation in retrieved documents, though production RAG today uses a simpler decoupled pipeline
- [Self-Refine: Iterative Refinement with Self-Feedback](./agents-and-reasoning/madaan-2023-self-refine.md) — Showed self-critique-then-revise loops can improve output quality, but later rigorous studies found weak initial-response prompts inflated the reported improvement -- treat this with caution, not as a validated default
- [Must-Read AI Papers](./must-read-papers.md) — Categorized reading guide for foundational and high-leverage AI papers
- [Training Language Models to Follow Instructions with Human Feedback](./training-and-alignment/ouyang-2022-instructgpt.md) — Established the 3-stage RLHF recipe (SFT, reward modeling, PPO) that turned GPT-3 into an assistant -- know this pipeline shape, though most teams now reach for simpler DPO instead of implementing PPO-based RLHF directly
- [Direct Preference Optimization: Your Language Model is Secretly a Reward Model](./training-and-alignment/rafailov-2023-dpo.md) — Showed the RLHF objective can be solved directly with a simple classification loss on preference pairs, with no separate reward model and no online RL -- meaning you should reach for DPO instead of implementing PPO-based RLHF for most alignment/preference-tuning work
- [RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval](./retrieval-and-memory/sarthi-2024-raptor.md) — Showed recursively clustering and summarizing chunks into a multi-level tree lets retrieval pull both fine details and high-level themes -- reach for RAPTOR when queries need cross-document synthesis, not simple fact lookup
- [Toolformer: Language Models Can Teach Themselves to Use Tools](./agents-and-reasoning/schick-2023-toolformer.md) — Showed a model can teach itself which API calls to make via self-supervised annotation and perplexity-based filtering, but this approach is now superseded by native function-calling built into current frontier model APIs
- [SOTA Benchmarks](./sota-benchmarks.md) — Reference table of model, agent, code, math, and safety benchmark leaderboards
- [Attention Is All You Need](./foundational/vaswani-2017-attention.md) — Showed self-attention alone (no recurrence or convolution) can model sequences, enabling fully parallelised training that made today's LLM-scale training runs computationally feasible
- [Weekly ArXiv Picks](./weekly-arxiv-picks.md) — Template for weekly AI engineering paper picks and maintainer review
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](./agents-and-reasoning/wei-2022-chain-of-thought.md) — Showed prompting a large enough model to produce intermediate reasoning steps improves multi-step reasoning accuracy -- use CoT for reasoning-heavy tasks, but don't trust the trace as an accurate explanation of the model's actual computation
- [Qwen2.5-Math Technical Report: Toward Mathematical Expert Model via Self-Improvement](./training-and-alignment/yang-2024-qwen25-math.md) — Documented a self-improvement pipeline (using the model to generate and filter its own better math training data) producing strong math-specific models -- narrow applicability, and Qwen's own successors have since surpassed these results
- [SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering](./agents-and-reasoning/yang-2024-swe-agent.md) — Showed a custom agent-computer interface (simplified LM-friendly commands for editing/testing code) matters as much as model quality -- treat interface design, not just model choice, as a first-class variable for coding agents
- [ReAct: Synergizing Reasoning and Acting in Language Models](./agents-and-reasoning/yao-2022-react.md) — Showed interleaving reasoning traces with external actions and their observations outperforms reasoning-only or acting-only prompting, meaning the reason-act-observe loop should be your default agent architecture pattern before reaching for something more complex
- [Tree of Thoughts: Deliberate Problem Solving with Large Language Models](./agents-and-reasoning/yao-2023-tree-of-thoughts.md) — Showed exploring and backtracking across multiple candidate reasoning paths beats single-chain CoT on hard search-style problems -- reach for ToT for problems needing exploration/backtracking, not as a default CoT replacement
- [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](./evaluation-and-safety/zheng-2023-llm-as-a-judge.md) — Showed strong LLM judges agree with human judgments over 80% of the time, matching human-human agreement -- use LLM-as-judge for scalable open-ended evaluation, but mitigate its documented position, verbosity, and self-enhancement biases
