# Tips And Tricks

> Navigation file for the Tips And Tricks section. This file is auto-generated and is not a content entry.

## Quick Navigation

| Sub-section | Count | Last Updated |
|---|---:|---|
| [agents and orchestration](./agents-and-orchestration/) | 15 entries | 2026-07-08 |
| [cost and performance](./cost-and-performance/) | 14 entries | 2026-07-08 |
| [debugging and observability](./debugging-and-observability/) | 13 entries | 2026-07-08 |
| [evaluation](./evaluation/) | 10 entries | 2026-07-08 |
| [fine tuning](./fine-tuning/) | 8 entries | 2026-07-08 |
| [inference and serving](./inference-and-serving/) | 18 entries | 2026-07-08 |
| [prompting](./prompting/) | 21 entries | 2026-07-08 |
| [rag and retrieval](./rag-and-retrieval/) | 17 entries | 2026-07-08 |

## Recently Added

- [Ask for Supporting Quotes Before Answers in RAG Prompts](./prompting/ask-for-quotes-before-answers-in-rag-prompts.md)
- [Establish a Prompting Baseline Before Fine-Tuning](./fine-tuning/establish-a-prompting-baseline-before-fine-tuning.md)
- [Evaluate Checkpoints on Task Metrics, Not Training Loss](./fine-tuning/evaluate-checkpoints-on-task-metrics-not-loss.md)
- [Hold Out an Eval Set Before Any Training Run Touches the Data](./fine-tuning/hold-out-an-eval-set-before-any-training.md)
- [Inspect a Random Sample of Training Data by Hand Before Every Run](./fine-tuning/inspect-your-training-data-by-hand.md)
- [Match Training and Inference Prompt Formats Exactly](./fine-tuning/match-training-and-inference-prompt-formats.md)
- [Pin Model Versions in Prompt Regression Tests](./prompting/pin-model-versions-in-prompt-regression-tests.md)
- [Run Evals Multiple Times Before Trusting Small Deltas](./evaluation/run-evals-multiple-times-before-trusting-deltas.md)
- [Separate a Frozen Holdout From Your Dev Eval Set](./evaluation/separate-a-frozen-holdout-from-your-dev-eval-set.md)
- [Start With LoRA Before Full-Parameter Fine-Tuning](./fine-tuning/start-with-lora-before-full-fine-tuning.md)

## Most Popular

_No star-tracked entries yet._

## Browse All

- [Add A Max Step Budget To Every Agent Loop](./agents-and-orchestration/add-a-max-step-budget-to-every-agent.md) — 
- [Keep the Smallest Failing Prompt for Every Recurring Issue](./debugging-and-observability/add-a-minimal-reproduction-prompt.md) — 
- [Add an Eval Harness Before Refactoring Prompts or Retrieval Logic](./evaluation/add-evals-before-refactors.md) — 
- [Add Hybrid Search for Exact-Match Terms](./rag-and-retrieval/add-hybrid-search-for-exact-terms.md) — 
- [Add Few-Shot Examples for Edge Cases, Not Just the Happy Path](./prompting/add-output-examples-for-edge-cases.md) — 
- [Add Explicit Timeout, Retry, and Fallback Behavior to Every Provider Call](./inference-and-serving/add-provider-timeout-and-retry-policies.md) — 
- [Add a Reranker Only After First-Stage Recall Is Acceptable](./rag-and-retrieval/add-reranking-after-recall-is-acceptable.md) — 
- [Allowlist Tools Per Agent Role](./agents-and-orchestration/allowlist-tools-per-agent-role.md) — 
- [Instruct the Model to Ask for Missing Inputs Instead of Guessing](./prompting/ask-for-missing-inputs-before-solving.md) — 
- [Ask for Supporting Quotes Before Answers in RAG Prompts](./prompting/ask-for-quotes-before-answers-in-rag-prompts.md) — 
- [Benchmark Local Models on the Actual Hardware Class Users Will Run](./inference-and-serving/benchmark-on-the-user-hardware.md) — 
- [Benchmark With Production-Shaped Inputs, Not Synthetic Toy Prompts](./inference-and-serving/benchmark-with-production-shaped-inputs.md) — 
- [Benchmark Using Real Production Context Lengths, Not Short Toy Prompts](./inference-and-serving/benchmark-with-real-context-lengths.md) — 
- [Budget Context Before Adding More Tools to an Agent](./agents-and-orchestration/budget-context-before-adding-tools.md) — 
- [Cache Embeddings Keyed by Content Hash to Avoid Duplicate Calls](./cost-and-performance/cache-embeddings-by-content-hash.md) — 
- [Use Prompt Caching for Long, Stable System Prompt Prefixes](./cost-and-performance/cache-stable-system-prompts.md) — 
- [Cap Agent Tool Retries at a Fixed Count Per Tool](./agents-and-orchestration/cap-agent-tool-retries.md) — 
- [Checkpoint Agent State After Each Side-Effecting Tool Call](./agents-and-orchestration/checkpoint-agent-state-after-each-tool-call.md) — 
- [Choose Chunk Size by Expected Answer Span Length, Not a Default](./rag-and-retrieval/choose-chunk-size-by-answer-span-length.md) — 
- [Choose INT4 Quantization Only After Explicit Task-Quality Testing](./inference-and-serving/choose-int4-only-after-quality-tests.md) — 
- [Classify Failures by Root Cause Before Changing Prompts](./debugging-and-observability/classify-failures-before-fixing-prompts.md) — 
- [Compress or Filter Retrieved Chunks When Context Cost Dominates](./cost-and-performance/compress-retrieved-context-before-generation.md) — 
- [Define Explicit Fallbacks for Tool Failures](./agents-and-orchestration/define-fallbacks-for-tool-failures.md) — 
- [Fail Tests When Important Context Sections Are Truncated](./evaluation/detect-context-truncation-in-tests.md) — 
- [Classify Multi-Hop Questions Before Relying on Single-Pass Retrieval](./rag-and-retrieval/detect-multi-hop-questions-explicitly.md) — 
- [Detect and Stop Repeated Identical Tool Calls](./agents-and-orchestration/detect-repeated-tool-calls.md) — 
- [Capture Sampled Traces Before Real Users Hit the System](./debugging-and-observability/do-not-launch-without-trace-sampling.md) — 
- [Keep Only Relevant Conversation History, Not the Whole Transcript](./cost-and-performance/drop-unused-conversation-history.md) — 
- [Establish a Prompting Baseline Before Fine-Tuning](./fine-tuning/establish-a-prompting-baseline-before-fine-tuning.md) — 
- [Evaluate Checkpoints on Task Metrics, Not Training Loss](./fine-tuning/evaluate-checkpoints-on-task-metrics-not-loss.md) — 
- [Compare Embedding Models Before Changing Your Chunking Strategy](./rag-and-retrieval/evaluate-embedding-models-before-rechunking.md) — 
- [Hold Out an Eval Set Before Any Training Run Touches the Data](./fine-tuning/hold-out-an-eval-set-before-any-training.md) — 
- [Inspect Retrieved Chunks Alongside the Answer When Debugging Hallucinations](./debugging-and-observability/inspect-retrieved-chunks-beside-the-answer.md) — 
- [Inspect a Random Sample of Training Data by Hand Before Every Run](./fine-tuning/inspect-your-training-data-by-hand.md) — 
- [Keep a Kill Switch for Risky Agent Tools](./agents-and-orchestration/keep-a-kill-switch-for-agent-actions.md) — 
- [Keep Instructions Outside Retrieved Context](./rag-and-retrieval/keep-instructions-outside-retrieved-context.md) — 
- [Keep Local Model Weight Files Out of Git](./inference-and-serving/keep-model-files-out-of-git.md) — 
- [Store Source Page and Section Metadata With Every Chunk](./rag-and-retrieval/keep-source-page-and-section-metadata.md) — 
- [Log Every Agent State Transition, Not Just Final Output](./agents-and-orchestration/log-agent-state-transitions.md) — 
- [Log Both the Raw Model Output and the Parsed Result](./debugging-and-observability/log-raw-and-parsed-model-outputs.md) — 
- [Log the Retrieved Context for Every RAG Answer](./debugging-and-observability/log-retrieved-context.md) — 
- [Make Agent Success Criteria Machine-Checkable, Not Self-Reported](./agents-and-orchestration/make-success-criteria-machine-checkable.md) — 
- [Match Configured Context Length to Available RAM Before Demos](./inference-and-serving/match-context-length-to-ram.md) — 
- [Match Training and Inference Prompt Formats Exactly](./fine-tuning/match-training-and-inference-prompt-formats.md) — 
- [Measure Time-to-First-Token Separately From Total Generation Time](./cost-and-performance/measure-first-token-latency.md) — 
- [Track KV Cache Hit Rate for Long-Context Serving Economics](./inference-and-serving/measure-kv-cache-hit-rate.md) — 
- [Measure Queue Time Separately From Model Generation Time](./cost-and-performance/measure-queue-time-separately.md) — 
- [Measure Retrieval Recall Before Blaming Answer Quality](./rag-and-retrieval/measure-retrieval-recall-before-answer-quality.md) — 
- [Name the Audience Explicitly in the Prompt](./prompting/name-the-audience-in-the-prompt.md) — 
- [Order Few-Shot Examples by Similarity to the Actual Task](./prompting/order-few-shot-examples-by-similarity.md) — 
