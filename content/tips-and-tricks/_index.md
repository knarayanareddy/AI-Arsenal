# Tips And Tricks

> Navigation file for the Tips And Tricks section. This file is auto-generated and is not a content entry.

## Quick Navigation

| Sub-section | Count | Last Updated |
|---|---:|---|
| [agents and orchestration](./agents-and-orchestration/) | 18 entries | 2026-07-08 |
| [cost and performance](./cost-and-performance/) | 17 entries | 2026-07-08 |
| [debugging and observability](./debugging-and-observability/) | 16 entries | 2026-07-08 |
| [evaluation](./evaluation/) | 9 entries | 2026-07-08 |
| [fine tuning](./fine-tuning/) | 0 entries | 2026-07-08 |
| [inference and serving](./inference-and-serving/) | 19 entries | 2026-07-08 |
| [prompting](./prompting/) | 19 entries | 2026-07-08 |
| [rag and retrieval](./rag-and-retrieval/) | 17 entries | 2026-07-08 |

## Recently Added

- [Batch Embedding Requests During Ingestion Instead of Embedding One Chunk at a Time](./cost-and-performance/batch-embedding-requests-during-ingestion.md)
- [Cache Idempotent Tool Results Within an Agent Run](./agents-and-orchestration/cache-idempotent-tool-results-within-a-run.md)
- [Set an Explicit max_tokens Cap Per Request Type Instead of Using Defaults](./cost-and-performance/cap-max-output-tokens-per-request.md)
- [Truncate or Summarize Tool Outputs Before They Enter Agent Context](./agents-and-orchestration/compact-tool-outputs-before-adding-to-context.md)
- [Propagate Application Request IDs Into Every LLM Trace](./debugging-and-observability/correlate-llm-traces-with-request-ids.md)
- [Break Down Latency by Pipeline Stage Before Optimizing Anything](./debugging-and-observability/log-latency-by-pipeline-stage.md)
- [Continuously Sample Production Traffic Into Your Eval Sets](./evaluation/sample-production-traffic-into-eval-sets.md)
- [Set Pass/Fail Thresholds Before Running Evals, Not After Seeing Results](./evaluation/set-pass-fail-thresholds-before-running-evals.md)
- [Set Wall-Clock Timeouts for Agent Runs, Not Just Step Budgets](./agents-and-orchestration/set-wall-clock-timeouts-for-agent-runs.md)
- [Slice Eval Metrics by Input Segment Instead of Trusting the Average](./evaluation/slice-eval-metrics-by-input-segment.md)

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
- [Batch Embedding Requests During Ingestion Instead of Embedding One Chunk at a Time](./cost-and-performance/batch-embedding-requests-during-ingestion.md) — 
- [Benchmark Local Models on the Actual Hardware Class Users Will Run](./inference-and-serving/benchmark-on-the-user-hardware.md) — 
- [Benchmark With Production-Shaped Inputs, Not Synthetic Toy Prompts](./inference-and-serving/benchmark-with-production-shaped-inputs.md) — 
- [Benchmark Using Real Production Context Lengths, Not Short Toy Prompts](./inference-and-serving/benchmark-with-real-context-lengths.md) — 
- [Budget Context Before Adding More Tools to an Agent](./agents-and-orchestration/budget-context-before-adding-tools.md) — 
- [Cache Embeddings Keyed by Content Hash to Avoid Duplicate Calls](./cost-and-performance/cache-embeddings-by-content-hash.md) — 
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
- [Define Explicit Fallbacks for Tool Failures](./agents-and-orchestration/define-fallbacks-for-tool-failures.md) — 
- [Fail Tests When Important Context Sections Are Truncated](./evaluation/detect-context-truncation-in-tests.md) — 
- [Classify Multi-Hop Questions Before Relying on Single-Pass Retrieval](./rag-and-retrieval/detect-multi-hop-questions-explicitly.md) — 
- [Detect and Stop Repeated Identical Tool Calls](./agents-and-orchestration/detect-repeated-tool-calls.md) — 
- [Capture Sampled Traces Before Real Users Hit the System](./debugging-and-observability/do-not-launch-without-trace-sampling.md) — 
- [Keep Only Relevant Conversation History, Not the Whole Transcript](./cost-and-performance/drop-unused-conversation-history.md) — 
- [Compare Embedding Models Before Changing Your Chunking Strategy](./rag-and-retrieval/evaluate-embedding-models-before-rechunking.md) — 
- [Inspect Retrieved Chunks Alongside the Answer When Debugging Hallucinations](./debugging-and-observability/inspect-retrieved-chunks-beside-the-answer.md) — 
- [Keep a Kill Switch for Risky Agent Tools](./agents-and-orchestration/keep-a-kill-switch-for-agent-actions.md) — 
- [Keep Instructions Outside Retrieved Context](./rag-and-retrieval/keep-instructions-outside-retrieved-context.md) — 
- [Keep Local Model Weight Files Out of Git](./inference-and-serving/keep-model-files-out-of-git.md) — 
- [Store Source Page and Section Metadata With Every Chunk](./rag-and-retrieval/keep-source-page-and-section-metadata.md) — 
- [Log Every Agent State Transition, Not Just Final Output](./agents-and-orchestration/log-agent-state-transitions.md) — 
- [Break Down Latency by Pipeline Stage Before Optimizing Anything](./debugging-and-observability/log-latency-by-pipeline-stage.md) — 
- [Log Both the Raw Model Output and the Parsed Result](./debugging-and-observability/log-raw-and-parsed-model-outputs.md) — 
- [Log the Retrieved Context for Every RAG Answer](./debugging-and-observability/log-retrieved-context.md) — 
- [Make Agent Success Criteria Machine-Checkable, Not Self-Reported](./agents-and-orchestration/make-success-criteria-machine-checkable.md) — 
- [Match Configured Context Length to Available RAM Before Demos](./inference-and-serving/match-context-length-to-ram.md) — 
- [Measure Time-to-First-Token Separately From Total Generation Time](./cost-and-performance/measure-first-token-latency.md) — 
- [Track KV Cache Hit Rate for Long-Context Serving Economics](./inference-and-serving/measure-kv-cache-hit-rate.md) — 
- [Measure Queue Time Separately From Model Generation Time](./cost-and-performance/measure-queue-time-separately.md) — 
- [Measure Retrieval Recall Before Blaming Answer Quality](./rag-and-retrieval/measure-retrieval-recall-before-answer-quality.md) — 
- [Name the Audience Explicitly in the Prompt](./prompting/name-the-audience-in-the-prompt.md) — 
- [Order Few-Shot Examples by Similarity to the Actual Task](./prompting/order-few-shot-examples-by-similarity.md) — 
