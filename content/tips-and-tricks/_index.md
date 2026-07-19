# Tips And Tricks

> Navigation file for the Tips And Tricks section. This file is auto-generated and is not a content entry.

## Quick Navigation

| Sub-section | Count | Last Updated |
|---|---:|---|
| [agents and orchestration](./agents-and-orchestration/) | 27 entries | 2026-07-19 |
| [cost and performance](./cost-and-performance/) | 17 entries | 2026-07-19 |
| [debugging and observability](./debugging-and-observability/) | 22 entries | 2026-07-19 |
| [evaluation](./evaluation/) | 19 entries | 2026-07-19 |
| [fine tuning](./fine-tuning/) | 14 entries | 2026-07-19 |
| [inference and serving](./inference-and-serving/) | 28 entries | 2026-07-19 |
| [prompting](./prompting/) | 21 entries | 2026-07-19 |
| [rag and retrieval](./rag-and-retrieval/) | 23 entries | 2026-07-19 |

## Recently Added

- [Block SSRF by Validating Outbound URLs From Tools](./agents-and-orchestration/block-ssrf-by-validating-outbound-urls.md)
- [Rate-Limit and Cap Spend Per User](./inference-and-serving/rate-limit-and-cap-spend-per-user.md)
- [Redact PII Before Sending Prompts to Third-Party APIs](./inference-and-serving/redact-pii-before-sending-to-third-party-apis.md)
- [Sandbox Model-Generated Code Execution](./agents-and-orchestration/sandbox-model-generated-code-execution.md)
- [Scope and Rotate LLM API Keys With Least Privilege](./inference-and-serving/scope-and-rotate-api-keys-with-least-privilege.md)
- [Validate Tool Arguments Server-Side Before Execution](./agents-and-orchestration/validate-tool-arguments-server-side-before-execution.md)
- [Alarm on Empty and Unparseable Responses](./debugging-and-observability/alarm-on-empty-and-unparseable-responses.md)
- [Batch Embedding Requests During Ingestion Instead of Embedding One Chunk at a Time](./cost-and-performance/batch-embedding-requests-during-ingestion.md)
- [Cache Embeddings Keyed by a Content Hash](./rag-and-retrieval/cache-embeddings-keyed-by-content-hash.md)
- [Cache Idempotent Tool Results Within an Agent Run](./agents-and-orchestration/cache-idempotent-tool-results-within-a-run.md)

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
- [Block SSRF by Validating Outbound URLs From Tools](./agents-and-orchestration/block-ssrf-by-validating-outbound-urls.md) — 
- [Budget Context Before Adding More Tools to an Agent](./agents-and-orchestration/budget-context-before-adding-tools.md) — 
- [Cache Embeddings Keyed by Content Hash to Avoid Duplicate Calls](./cost-and-performance/cache-embeddings-by-content-hash.md) — 
- [Cache Embeddings Keyed by a Content Hash](./rag-and-retrieval/cache-embeddings-keyed-by-content-hash.md) — 
- [Cache Idempotent Tool Results Within an Agent Run](./agents-and-orchestration/cache-idempotent-tool-results-within-a-run.md) — 
- [Use Prompt Caching for Long, Stable System Prompt Prefixes](./cost-and-performance/cache-stable-system-prompts.md) — 
- [Cap Agent Tool Retries at a Fixed Count Per Tool](./agents-and-orchestration/cap-agent-tool-retries.md) — 
- [Cap Concurrent Requests With Admission Control](./inference-and-serving/cap-concurrent-requests-with-admission-control.md) — 
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
- [Enable Prefix Caching for Shared System Prompts](./inference-and-serving/enable-prefix-caching-for-shared-system-prompts.md) — 
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
- [Store Source Page and Section Metadata With Every Chunk](./rag-and-retrieval/keep-source-page-and-section-metadata.md) — 
- [Log Every Agent State Transition, Not Just Final Output](./agents-and-orchestration/log-agent-state-transitions.md) — 
- [Log Judge Rationales, Not Only Scores](./evaluation/log-judge-rationales-not-only-scores.md) — 
- [Break Down Latency by Pipeline Stage Before Optimizing Anything](./debugging-and-observability/log-latency-by-pipeline-stage.md) — 
- [Log Both the Raw Model Output and the Parsed Result](./debugging-and-observability/log-raw-and-parsed-model-outputs.md) — 
- [Log the Retrieved Context for Every RAG Answer](./debugging-and-observability/log-retrieved-context.md) — 
- [Log Token Counts and Cost Per Request](./debugging-and-observability/log-token-counts-and-cost-per-request.md) — 
- [Make Agent Success Criteria Machine-Checkable, Not Self-Reported](./agents-and-orchestration/make-success-criteria-machine-checkable.md) — 
- [Make Side-Effecting Tools Idempotent So Retries Are Safe](./agents-and-orchestration/make-tools-idempotent-so-retries-are-safe.md) — 
- [Mask Prompt Tokens So Loss Trains Only on the Completion](./fine-tuning/mask-prompt-tokens-in-the-training-loss.md) — 
- [Match Configured Context Length to Available RAM Before Demos](./inference-and-serving/match-context-length-to-ram.md) — 
- [Match the Vector Distance Metric to Your Embedding Model](./rag-and-retrieval/match-the-distance-metric-to-your-embedding-model.md) — 
- [Match Training and Inference Prompt Formats Exactly](./fine-tuning/match-training-and-inference-prompt-formats.md) — 
- [Measure Time-to-First-Token Separately From Total Generation Time](./cost-and-performance/measure-first-token-latency.md) — 
- [Track KV Cache Hit Rate for Long-Context Serving Economics](./inference-and-serving/measure-kv-cache-hit-rate.md) — 
- [Measure Queue Time Separately From Model Generation Time](./cost-and-performance/measure-queue-time-separately.md) — 
- [Measure Retrieval Recall Before Blaming Answer Quality](./rag-and-retrieval/measure-retrieval-recall-before-answer-quality.md) — 
- [Mix In General Data to Prevent Catastrophic Forgetting](./fine-tuning/mix-in-general-data-to-prevent-forgetting.md) — 
- [Name the Audience Explicitly in the Prompt](./prompting/name-the-audience-in-the-prompt.md) — 
- [Order Few-Shot Examples by Similarity to the Actual Task](./prompting/order-few-shot-examples-by-similarity.md) — 
- [Pair Every Eval Score With a Baseline](./evaluation/pair-every-eval-score-with-a-baseline.md) — 
- [Run Independent Retrieval or Tool Calls Concurrently, Not Sequentially](./cost-and-performance/parallelize-independent-retrieval-calls.md) — 
- [Pin and Log the Model Version in Every Trace](./debugging-and-observability/pin-and-log-the-model-version-in-traces.md) — 
- [Pin Runtime, CUDA, Driver, and Model Versions in Inference Container Images](./inference-and-serving/pin-dependencies-for-inference-images.md) — 
- [Pin Model and Runtime Versions Before Running Any Benchmark](./inference-and-serving/pin-model-and-runtime-versions.md) — 
- [Pin Model Versions in Prompt Regression Tests](./prompting/pin-model-versions-in-prompt-regression-tests.md) — 
- [Precompute Summaries, Embeddings, and Metadata Offline Instead of at Request Time](./cost-and-performance/precompute-expensive-static-context.md) — 
- [Prefer Continuous Batching Over Static Batching for Online Serving](./inference-and-serving/prefer-continuous-batching-for-online-serving.md) — 
- [Prefer Data Quality Over Quantity for Instruction Tuning](./fine-tuning/prefer-data-quality-over-quantity.md) — 
- [Prefer GGUF Format for llama.cpp and Ollama-Style Local Runtimes](./inference-and-serving/prefer-gguf-for-llama-cpp-workflows.md) — 
- [Prefer ID References Over Copying Metadata Into Log Records](./debugging-and-observability/prefer-id-references-over-copying.md) — 
- [Prefer Pairwise Comparison When Absolute Scoring Is Noisy](./evaluation/prefer-pairwise-comparison-when-scoring-is-noisy.md) — 
- [Add a Reranker Before Changing Your Chunking Strategy](./rag-and-retrieval/prefer-reranking-before-rechunking.md) — 
- [Prepend the Document Title and Section Heading to Each Chunk](./rag-and-retrieval/prepend-document-title-and-section-to-each-chunk.md) — 
- [Place Task Inputs After Stable Instructions, Not Before](./prompting/put-task-inputs-after-instructions.md) — 
- [Tune Chunk Overlap Only After Chunk Size Is Set](./rag-and-retrieval/rag-chunk-overlap-tuning.md) — 
- [Rank Context Sections by Expected Usefulness, Not Chronology](./prompting/rank-context-by-expected-usefulness.md) — 
- [Rate-Limit and Cap Spend Per User](./inference-and-serving/rate-limit-and-cap-spend-per-user.md) — 
- [Read a Sample of Production Traces Every Week](./debugging-and-observability/read-a-sample-of-production-traces-every-week.md) — 
- [Record the Fully Rendered Prompt Sent to the Model](./debugging-and-observability/record-the-fully-rendered-prompt-sent-to-the-model.md) — 
- [Redact PII Before Sending Prompts to Third-Party APIs](./inference-and-serving/redact-pii-before-sending-to-third-party-apis.md) — 
- [Redact Secrets and Sensitive Data Before Writing to Traces](./debugging-and-observability/redact-secrets-before-tracing.md) — 
- [Replay a Failing Trace With Exactly One Variable Changed](./debugging-and-observability/replay-the-same-trace-with-one-variable-changed.md) — 
- [Report Confidence Intervals on Small-Set Eval Scores](./evaluation/report-confidence-intervals-on-eval-scores.md) — 
- [Require Human Approval Before Irreversible Agent Actions](./agents-and-orchestration/require-human-approval-for-irreversible-actions.md) — 
- [Reserve Output Token Budget Before Filling Context With Input](./prompting/reserve-output-tokens-before-adding-context.md) — 
- [Return Structured Errors From Tools So the Agent Can Recover](./agents-and-orchestration/return-structured-errors-from-tools-so-the-agent-can-recover.md) — 
- [Set an Explicit Data Retention Policy for Stored Prompts Before Launch](./debugging-and-observability/review-data-retention-for-prompts.md) — 
- [Route Easy Requests to a Smaller Model First](./inference-and-serving/route-easy-requests-to-a-smaller-model-first.md) — 
- [Classify Task Difficulty and Route Easy Requests to Cheaper Models](./cost-and-performance/route-simple-tasks-to-smaller-models.md) — 
- [Run a Fast Eval Per Commit and a Full Eval Nightly](./evaluation/run-a-fast-eval-per-commit-and-a-full-eval-nightly.md) — 
- [Run Evals Multiple Times Before Trusting Small Deltas](./evaluation/run-evals-multiple-times-before-trusting-deltas.md) — 
- [Run a Prompt-Injection Regression Suite on Every CI Run](./evaluation/run-prompt-injection-regression-tests.md) — 
- [Continuously Sample Production Traffic Into Your Eval Sets](./evaluation/sample-production-traffic-into-eval-sets.md) — 
- [Add Resource and Network Limits to Sandboxed Code Execution Calls](./agents-and-orchestration/sandbox-code-execution-tools.md) — 
- [Sandbox Model-Generated Code Execution](./agents-and-orchestration/sandbox-model-generated-code-execution.md) — 
- [Scope and Rotate LLM API Keys With Least Privilege](./inference-and-serving/scope-and-rotate-api-keys-with-least-privilege.md) — 
- [Separate a Frozen Holdout From Your Dev Eval Set](./evaluation/separate-a-frozen-holdout-from-your-dev-eval-set.md) — 
- [Log Provider, Parser, Timeout, and Business-Rule Failures as Distinct Categories](./debugging-and-observability/separate-model-errors-from-app-errors.md) — 
- [Separate Offline Batch Generation From Interactive Chat Serving](./inference-and-serving/separate-offline-batch-jobs-from-chat-serving.md) — 
- [Separate Planner and Executor Permissions in Multi-Step Agents](./agents-and-orchestration/separate-planner-and-executor-permissions.md) — 
- [Separate System Rules From Task-Specific Instructions](./prompting/separate-system-and-task-prompts.md) — 
- [Separate User Content From System Instructions With Roles and Delimiters](./prompting/separate-user-content-from-system-instructions.md) — 
- [Set a Token and Cost Budget Per Agent Run, Not Only a Step Limit](./agents-and-orchestration/set-a-token-and-cost-budget-per-agent-run.md) — 
- [Set Explicit Stop Sequences to Prevent Generation Overrun](./inference-and-serving/set-explicit-stop-sequences-to-prevent-overrun.md) — 
- [Set max_tokens to Bound Tail Latency and Cost](./inference-and-serving/set-max-tokens-to-bound-tail-latency-and-cost.md) — 
- [Set Pass/Fail Thresholds Before Running Evals, Not After Seeing Results](./evaluation/set-pass-fail-thresholds-before-running-evals.md) — 
- [Set Temperature by the Cost of Being Wrong, Not a Generic Default](./prompting/set-temperature-by-decision-risk.md) — 
- [Set Temperature to Zero When Reproducing Bugs](./debugging-and-observability/set-temperature-to-zero-when-reproducing-bugs.md) — 
- [Set a Maximum Input/Output Token Budget Per Feature and Alert on Overruns](./cost-and-performance/set-token-budgets-per-feature.md) — 
- [Set Wall-Clock Timeouts for Agent Runs, Not Just Step Budgets](./agents-and-orchestration/set-wall-clock-timeouts-for-agent-runs.md) — 
- [Slice Eval Metrics by Input Segment Instead of Trusting the Average](./evaluation/slice-eval-metrics-by-input-segment.md) — 
- [Start With a Low Learning Rate and Few Epochs](./fine-tuning/start-with-a-low-learning-rate-and-few-epochs.md) — 
- [Validate the Workflow With a Smaller Quantized Model Before Downloading Larger Weights](./inference-and-serving/start-with-a-smaller-quantized-model.md) — 
- [Start With LoRA Before Full-Parameter Fine-Tuning](./fine-tuning/start-with-lora-before-full-fine-tuning.md) — 
- [Start With Zero Chunk Overlap, Then Add It Where Needed](./rag-and-retrieval/start-with-zero-chunk-overlap.md) — 
- [State Negative Constraints as Testable Rules, Not Vague Warnings](./prompting/state-negative-constraints-as-testable-rules.md) — 
- [Store Parser and Chunker Version With Every Chunk](./rag-and-retrieval/store-parser-version-with-every-chunk.md) — 
- [Store the Exact Prompt Version in Every Trace](./debugging-and-observability/store-prompt-version-in-every-trace.md) — 
- [Store Prompts With Explicit Release Version Identifiers](./prompting/store-prompts-with-release-versions.md) — 
- [Stream Tokens to the User Even When Total Generation Time Is Unchanged](./inference-and-serving/stream-user-facing-responses.md) — 
- [Summarize Long-Running Agent State Instead of Keeping Full History](./agents-and-orchestration/summarize-long-running-agent-state.md) — 
- [Summarize Repeated or Stale Conversation Blocks Instead of Repeating Them Verbatim](./prompting/summarize-repeated-conversation-blocks.md) — 
- [Test for Regressions Outside the Tuned Task After Every Fine-Tune](./fine-tuning/test-for-regressions-outside-the-tuned-task.md) — 
- [Test Prompts Against Adversarial Inputs, Not Only Well-Formed Ones](./evaluation/test-prompts-with-adversarial-inputs.md) — 
- [Trace Tool Call Arguments and Return Values, Not Just Final Answers](./debugging-and-observability/trace-tool-inputs-and-outputs.md) — 
- [Track LLM Cost Broken Down Per Feature, Not Only in Aggregate](./cost-and-performance/track-cost-per-feature.md) — 
- [Track Cost Per Successful Outcome, Not Just Cost Per Model Call](./cost-and-performance/track-cost-per-successful-outcome.md) — 
- [Track Refusal and Non-Answer Rates as a First-Class Regression Signal](./debugging-and-observability/track-refusal-rates-as-a-regression-signal.md) — 
- [Treat Retrieved Text as Untrusted Input](./rag-and-retrieval/treat-retrieved-text-as-untrusted.md) — 
- [Increase Batch Size Only Until Tail Latency Becomes Unacceptable](./inference-and-serving/tune-batch-size-against-tail-latency.md) — 
- [Allocate a Fixed Token Budget to Each Prompt Section](./prompting/use-context-budgets-per-section.md) — 
- [Wrap Retrieved Context in Explicit Delimiters](./prompting/use-delimiters-around-retrieved-context.md) — 
- [Add the Failing Question to Your Eval Set Before Fixing the Bug](./evaluation/use-golden-questions-for-every-bug-fix.md) — 
- [Prefer INT8 Over INT4 When Quality Risk Matters More Than Maximum Compression](./inference-and-serving/use-int8-for-safer-compression.md) — 
- [Request JSON Only When a Parser Will Consume the Output](./prompting/use-json-only-for-machine-parsed-outputs.md) — 
- [Constrain Critical Outputs With a JSON Schema, Not Prose Instructions](./prompting/use-json-schema-for-outputs.md) — 
- [Default to Local Models When Prototyping With Sensitive Data](./inference-and-serving/use-local-models-for-sensitive-prototyping.md) — 
- [Apply Metadata Filters Before Similarity Search](./rag-and-retrieval/use-metadata-filters-before-similarity-search.md) — 
- [Use Parent-Child Chunking to Balance Precision and Context](./rag-and-retrieval/use-parent-child-chunking-for-long-documents.md) — 
- [Use Provider Batch APIs for Offline Workloads to Halve Token Costs](./cost-and-performance/use-provider-batch-apis-for-offline-workloads.md) — 
- [Use QLoRA to Fit Larger Models on a Single GPU](./fine-tuning/use-qlora-to-fit-larger-models-on-one-gpu.md) — 
- [Rewrite Vague Queries Before Embedding Them](./rag-and-retrieval/use-query-rewriting-for-vague-questions.md) — 
- [Use Rubric-Anchored Prompts for LLM Judges, Not Bare Score Requests](./evaluation/use-rubric-anchored-llm-judges.md) — 
- [Cache Answers for Semantically Similar Repeated Questions](./cost-and-performance/use-semantic-cache-for-repeated-questions.md) — 
- [Return Sentence Windows for Dense Manuals and Policy Docs](./rag-and-retrieval/use-sentence-windows-for-dense-manuals.md) — 
- [Use Small Models or Rules for Routing, Classification, and Extraction Sub-Steps](./cost-and-performance/use-smaller-models-for-classification-steps.md) — 
- [Use Speculative Decoding When a Cheap Draft Model Is Available and Latency Dominates](./inference-and-serving/use-speculative-decoding-for-latency-critical-paths.md) — 
- [Wrap Long Prompt Sections in XML Tags for Clear Parsing](./prompting/use-xml-tags-for-long-prompt-sections.md) — 
- [Validate LLM Judges Against Human Labels Before Trusting Their Scores](./evaluation/validate-llm-judges-against-human-labels.md) — 
- [Validate Tool Arguments Before Execution, Not Inside the Tool](./agents-and-orchestration/validate-tool-arguments-before-execution.md) — 
- [Validate Tool Arguments Server-Side Before Execution](./agents-and-orchestration/validate-tool-arguments-server-side-before-execution.md) — 
- [Verify Tool Side Effects Instead of Trusting the Tool's Response](./agents-and-orchestration/verify-tool-side-effects-instead-of-trusting-the-response.md) — 
- [Version Datasets and Adapters Together as One Artifact Pair](./fine-tuning/version-datasets-and-adapters-together.md) — 
- [Version System Prompts With the Same Discipline as Application Code](./prompting/version-system-prompts-like-code.md) — 
- [Version Eval Datasets the Same Way You Version Code](./evaluation/version-your-eval-datasets.md) — 
- [Warm Up Model Servers Before Routing Production Traffic to Them](./inference-and-serving/warm-up-model-servers-before-routing-traffic.md) — 
- [Write Tool Descriptions for the Model, Not the Codebase](./agents-and-orchestration/write-tool-descriptions-for-the-model-not-the-codebase.md) — 
