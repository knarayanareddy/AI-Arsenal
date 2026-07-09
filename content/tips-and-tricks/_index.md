# Tips And Tricks

> Navigation file for the Tips And Tricks section. This file is auto-generated and is not a content entry.

## Quick Navigation

| Sub-section | Count | Last Updated |
|---|---:|---|
| [agents and orchestration](./agents-and-orchestration/) | 24 entries | 2026-07-09 |
| [cost and performance](./cost-and-performance/) | 17 entries | 2026-07-09 |
| [debugging and observability](./debugging-and-observability/) | 22 entries | 2026-07-09 |
| [evaluation](./evaluation/) | 19 entries | 2026-07-09 |
| [fine tuning](./fine-tuning/) | 14 entries | 2026-07-09 |
| [inference and serving](./inference-and-serving/) | 19 entries | 2026-07-09 |
| [prompting](./prompting/) | 21 entries | 2026-07-09 |
| [rag and retrieval](./rag-and-retrieval/) | 23 entries | 2026-07-09 |

## Recently Added

- [Alarm on Empty and Unparseable Responses](./debugging-and-observability/alarm-on-empty-and-unparseable-responses.md)
- [Batch Embedding Requests During Ingestion Instead of Embedding One Chunk at a Time](./cost-and-performance/batch-embedding-requests-during-ingestion.md)
- [Cache Embeddings Keyed by a Content Hash](./rag-and-retrieval/cache-embeddings-keyed-by-content-hash.md)
- [Cache Idempotent Tool Results Within an Agent Run](./agents-and-orchestration/cache-idempotent-tool-results-within-a-run.md)
- [Set an Explicit max_tokens Cap Per Request Type Instead of Using Defaults](./cost-and-performance/cap-max-output-tokens-per-request.md)
- [Truncate or Summarize Tool Outputs Before They Enter Agent Context](./agents-and-orchestration/compact-tool-outputs-before-adding-to-context.md)
- [Propagate Application Request IDs Into Every LLM Trace](./debugging-and-observability/correlate-llm-traces-with-request-ids.md)
- [Deduplicate Near-Duplicate Chunks Before Indexing](./rag-and-retrieval/deduplicate-near-duplicate-chunks-before-indexing.md)
- [Deduplicate Training Data Before Fine-Tuning](./fine-tuning/deduplicate-training-data-before-fine-tuning.md)
- [Drop Low-Similarity Chunks With a Score Threshold](./rag-and-retrieval/drop-low-similarity-chunks-with-a-score-threshold.md)

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
- [Alarm on Empty and Unparseable Responses](./debugging-and-observability/alarm-on-empty-and-unparseable-responses.md) — 
- [Allowlist Tools Per Agent Role](./agents-and-orchestration/allowlist-tools-per-agent-role.md) — 
- [Instruct the Model to Ask for Missing Inputs Instead of Guessing](./prompting/ask-for-missing-inputs-before-solving.md) — 
- [Ask for Supporting Quotes Before Answers in RAG Prompts](./prompting/ask-for-quotes-before-answers-in-rag-prompts.md) — 
- [Batch Embedding Requests During Ingestion Instead of Embedding One Chunk at a Time](./cost-and-performance/batch-embedding-requests-during-ingestion.md) — 
- [Benchmark Local Models on the Actual Hardware Class Users Will Run](./inference-and-serving/benchmark-on-the-user-hardware.md) — 
- [Benchmark With Production-Shaped Inputs, Not Synthetic Toy Prompts](./inference-and-serving/benchmark-with-production-shaped-inputs.md) — 
- [Benchmark Using Real Production Context Lengths, Not Short Toy Prompts](./inference-and-serving/benchmark-with-real-context-lengths.md) — 
- [Budget Context Before Adding More Tools to an Agent](./agents-and-orchestration/budget-context-before-adding-tools.md) — 
- [Cache Embeddings Keyed by Content Hash to Avoid Duplicate Calls](./cost-and-performance/cache-embeddings-by-content-hash.md) — 
- [Cache Embeddings Keyed by a Content Hash](./rag-and-retrieval/cache-embeddings-keyed-by-content-hash.md) — 
- [Cache Idempotent Tool Results Within an Agent Run](./agents-and-orchestration/cache-idempotent-tool-results-within-a-run.md) — 
- [Use Prompt Caching for Long, Stable System Prompt Prefixes](./cost-and-performance/cache-stable-system-prompts.md) — 
- [Cap Agent Tool Retries at a Fixed Count Per Tool](./agents-and-orchestration/cap-agent-tool-retries.md) — 
- [Set an Explicit max_tokens Cap Per Request Type Instead of Using Defaults](./cost-and-performance/cap-max-output-tokens-per-request.md) — 
- [Checkpoint Agent State After Each Side-Effecting Tool Call](./agents-and-orchestration/checkpoint-agent-state-after-each-tool-call.md) — 
- [Choose Chunk Size by Expected Answer Span Length, Not a Default](./rag-and-retrieval/choose-chunk-size-by-answer-span-length.md) — 
- [Choose INT4 Quantization Only After Explicit Task-Quality Testing](./inference-and-serving/choose-int4-only-after-quality-tests.md) — 
- [Classify Failures by Root Cause Before Changing Prompts](./debugging-and-observability/classify-failures-before-fixing-prompts.md) — 
- [Truncate or Summarize Tool Outputs Before They Enter Agent Context](./agents-and-orchestration/compact-tool-outputs-before-adding-to-context.md) — 
- [Compress or Filter Retrieved Chunks When Context Cost Dominates](./cost-and-performance/compress-retrieved-context-before-generation.md) — 
- [Propagate Application Request IDs Into Every LLM Trace](./debugging-and-observability/correlate-llm-traces-with-request-ids.md) — 
- [Deduplicate Near-Duplicate Chunks Before Indexing](./rag-and-retrieval/deduplicate-near-duplicate-chunks-before-indexing.md) — 
- [Deduplicate Training Data Before Fine-Tuning](./fine-tuning/deduplicate-training-data-before-fine-tuning.md) — 
- [Define Explicit Fallbacks for Tool Failures](./agents-and-orchestration/define-fallbacks-for-tool-failures.md) — 
- [Fail Tests When Important Context Sections Are Truncated](./evaluation/detect-context-truncation-in-tests.md) — 
- [Classify Multi-Hop Questions Before Relying on Single-Pass Retrieval](./rag-and-retrieval/detect-multi-hop-questions-explicitly.md) — 
- [Detect and Stop Repeated Identical Tool Calls](./agents-and-orchestration/detect-repeated-tool-calls.md) — 
- [Capture Sampled Traces Before Real Users Hit the System](./debugging-and-observability/do-not-launch-without-trace-sampling.md) — 
- [Drop Low-Similarity Chunks With a Score Threshold](./rag-and-retrieval/drop-low-similarity-chunks-with-a-score-threshold.md) — 
- [Keep Only Relevant Conversation History, Not the Whole Transcript](./cost-and-performance/drop-unused-conversation-history.md) — 
- [Establish a Prompting Baseline Before Fine-Tuning](./fine-tuning/establish-a-prompting-baseline-before-fine-tuning.md) — 
- [Evaluate Checkpoints on Task Metrics, Not Training Loss](./fine-tuning/evaluate-checkpoints-on-task-metrics-not-loss.md) — 
- [Compare Embedding Models Before Changing Your Chunking Strategy](./rag-and-retrieval/evaluate-embedding-models-before-rechunking.md) — 
- [Evaluate the End-to-End Task, Not Only Components](./evaluation/evaluate-the-end-to-end-task-not-only-components.md) — 
- [Give the Agent a Scratchpad Instead of Carrying Everything in Context](./agents-and-orchestration/give-the-agent-a-scratchpad-for-intermediate-results.md) — 
- [Hold Out an Eval Set Before Any Training Run Touches the Data](./fine-tuning/hold-out-an-eval-set-before-any-training.md) — 
- [Inspect Retrieved Chunks Alongside the Answer When Debugging Hallucinations](./debugging-and-observability/inspect-retrieved-chunks-beside-the-answer.md) — 
- [Inspect a Random Sample of Training Data by Hand Before Every Run](./fine-tuning/inspect-your-training-data-by-hand.md) — 
- [Instruct the Model to Answer Only From Retrieved Context, With a No-Answer Escape Hatch](./rag-and-retrieval/instruct-the-model-to-answer-only-from-retrieved-context.md) — 
- [Keep a Kill Switch for Risky Agent Tools](./agents-and-orchestration/keep-a-kill-switch-for-agent-actions.md) — 
- [Keep Instructions Outside Retrieved Context](./rag-and-retrieval/keep-instructions-outside-retrieved-context.md) — 
- [Keep Local Model Weight Files Out of Git](./inference-and-serving/keep-model-files-out-of-git.md) — 
