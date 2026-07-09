---
id: "choose-response-delivery-pattern"
title: "Synchronous vs Streaming vs Asynchronous: How Should the Answer Reach the User?"
category: "serving-patterns"
decision_type: "fork"
decision_summary: "Stream tokens for interactive human chat, return one synchronous response for short machine-to-machine calls needing a complete result, and go async (job + webhook/poll) for long or batch work that outlives a request timeout."
tags:
  - inference
  - llm
  - agents

approaches:
  - name: "Synchronous (single response)"
    description: "The client sends a request and blocks until the full response is generated and returned in one payload. Simplest possible contract."
    when_to_use:
      - "Machine-to-machine calls where the consumer needs the complete, parseable result before it can act (structured output, a tool result feeding another step)"
      - "Short outputs where total generation time is comfortably within the client's and any proxy's timeout"
      - "Simplicity matters and there is no human watching a cursor blink"
    when_not_to_use:
      - "A human is waiting and the full-response latency (multiple seconds for long generations) would feel unresponsive"
      - "Generation can exceed request/proxy timeouts (long outputs, agentic multi-step runs)"
    tradeoffs:
      cost: "No extra infrastructure — a plain request/response. Cheapest to build and operate."
      latency: "Worst *perceived* latency for humans: they wait for the entire generation with no feedback. Actual total latency is the same as streaming, but it all lands at the end."
      accuracy: "No effect on quality; the consumer gets a complete result it can validate in one piece (easiest for schema-validated structured output)."
      complexity: "Lowest — one request, one response, trivial error handling."
      flexibility: "Rigid: no partial results, no cancellation mid-generation, and vulnerable to timeouts on long work."

  - name: "Streaming (token-by-token / SSE)"
    description: "The server emits tokens as they are generated over a persistent connection (Server-Sent Events or WebSocket). The user sees output begin within a few hundred milliseconds."
    when_to_use:
      - "Interactive, human-facing chat or assistants where perceived responsiveness dominates the experience"
      - "Long outputs where showing progressive text keeps the user engaged instead of staring at a spinner"
      - "You want to support mid-generation cancellation (user stops a bad answer early, saving tokens)"
    when_not_to_use:
      - "The consumer is a machine that needs the whole result before acting — streaming partial JSON to a parser is a common anti-pattern that complicates the consumer for no benefit"
      - "Your infrastructure (proxies, API gateways, serverless platforms) doesn't cleanly support long-lived streaming connections"
    tradeoffs:
      cost: "Modest added complexity in the serving path and client; token cost is identical to synchronous."
      latency: "Best *perceived* latency — time-to-first-token (a few hundred ms) is what the user feels, not total generation time. This is the entire point."
      accuracy: "No effect on output quality; but the client must handle partial output, and validating structured output mid-stream is harder."
      complexity: "Moderate — SSE/WebSocket handling, backpressure, partial-output rendering, and stream-aware error handling (an error can arrive after a 200 OK and partial content)."
      flexibility: "Supports progressive rendering and cancellation; harder to cache and to treat as an atomic result."

  - name: "Asynchronous (job submission + webhook/poll)"
    description: "The client submits a job and gets an ID immediately; the work runs in the background and the result is delivered later via webhook callback or client polling. Decouples request lifetime from work lifetime."
    when_to_use:
      - "Work that exceeds any reasonable request timeout: long agentic runs, batch document processing, multi-minute generations, video/audio pipelines"
      - "Batch/offline workloads where throughput and cost matter more than immediacy (overnight evals, bulk enrichment)"
      - "You need durability — the job must survive a client disconnect or a server restart"
    when_not_to_use:
      - "The interaction is genuinely interactive and a human is waiting in real time — async's submit-then-wait UX is wrong for chat"
      - "The work is short enough that the queue/worker/callback machinery is pure overhead"
    tradeoffs:
      cost: "Highest infrastructure cost — a queue, worker pool, job store, and delivery mechanism — but enables batching for the best cost-per-token at scale."
      latency: "Highest time-to-result by design; optimized for throughput and durability, not immediacy."
      accuracy: "No effect on quality; results are complete and durable, easy to validate and retry."
      complexity: "Highest — job state management, idempotency, retries, dead-letter handling, and webhook/poll delivery with its own failure modes."
      flexibility: "Most robust for long/batch work and the natural substrate for scheduled and event-driven pipelines; wrong shape for real-time chat."

key_factors:
  - "Is a human waiting in real time? If yes, perceived latency dominates and streaming almost always wins; if the consumer is a machine, perceived latency is irrelevant and a complete result is usually simpler"
  - "Does the work fit inside a request timeout? Long agentic runs and batch jobs must go async regardless of who's waiting, or they die on proxy/gateway timeouts"
  - "Does the consumer need a complete, parseable result before acting? Structured output feeding another step favors synchronous (or async), not mid-stream partial JSON"
  - "Throughput vs immediacy: batch/offline work optimizes cost-per-token via async batching; interactive work optimizes time-to-first-token via streaming"
  - "Infrastructure support: serverless/proxy environments vary in how cleanly they support long-lived streaming vs background jobs — the platform can constrain the choice"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Is a human waiting on the output in real time?"] --> Human{"Human in the loop?"}
      Human -->|"Yes"| Fits1{"Does generation finish within a request timeout?"}
      Fits1 -->|"Yes"| Stream["Streaming (SSE) — hide latency behind time-to-first-token"]
      Fits1 -->|"No — long agentic/multi-step run"| AsyncStream["Async job with streamed progress updates (or async + status UI)"]
      Human -->|"No — machine consumer"| NeedsWhole{"Does the consumer need the complete result before acting?"}
      NeedsWhole -->|"Yes, and it's short"| Sync["Synchronous single response"]
      NeedsWhole -->|"Yes, but it's long / batch"| Async["Asynchronous job + webhook/poll"]
      NeedsWhole -->|"No, can consume incrementally"| StreamM["Streaming (rare for M2M, but valid for pipelines)"]

confidence: "established"
tradeoffs_as_of: "2026-07-08"

approach_implementations:
  - approach_name: "Synchronous (single response)"
    tool_ids: []
    project_ids:
      - vllm
    build_example_ids: []
  - approach_name: "Streaming (token-by-token / SSE)"
    tool_ids: []
    project_ids:
      - vllm
      - text-generation-inference
    build_example_ids: []
  - approach_name: "Asynchronous (job submission + webhook/poll)"
    tool_ids: []
    project_ids: []
    build_example_ids: []

related_decisions:
  - choose-serving-stack
  - single-agent-vs-multi-agent

common_mistakes:
  - "Streaming to a machine consumer that needs a complete result: parsing partial JSON as it streams complicates the consumer, invites mid-parse errors, and buys nothing — machines don't perceive latency, so stream only when something incrementally consumes the tokens."
  - "Using synchronous responses for long agentic runs: a multi-step agent or a long generation will blow through proxy/gateway/serverless request timeouts, failing intermittently in a way that's maddening to debug — long work belongs in an async job."
  - "Measuring only total latency and ignoring time-to-first-token: for streaming, TTFT is the number users actually feel, and a system with great total throughput but slow TTFT feels sluggish — instrument TTFT separately."
  - "Forgetting that a streaming error can arrive after a 200 OK: because headers are sent before generation completes, mid-stream failures need explicit in-band error handling, not just HTTP status codes — a naive client treats a truncated stream as success."

added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: "draft"
---

## Overview

The same generated tokens can reach a consumer three very different ways, and the right choice is dictated almost entirely by two questions: *is a human waiting?* and *does the work fit inside a request timeout?* Getting this wrong is a classic source of "it works in the demo, fails in production" bugs — synchronous responses that time out on long agentic runs, or token streaming bolted onto a machine consumer that just needs a complete JSON object. This decision is about the delivery contract, not the model or the serving engine underneath it.

## The Decision

**Stream** (Server-Sent Events) for interactive, human-facing chat: the user feels *time-to-first-token* (a few hundred milliseconds), not total generation time, so streaming hides latency behind perceived responsiveness — this is its entire justification and it applies specifically when a human is watching. **Return a synchronous single response** for short machine-to-machine calls where the consumer needs a complete, parseable result before it can act (structured output feeding a next step, a tool result) — machines don't perceive latency, so streaming partial JSON to them is complexity for no gain. Go **asynchronous** (submit a job, deliver via webhook or polling) whenever the work can outlive a request timeout — long agentic runs, batch document processing, multi-minute generations — or when throughput and durability matter more than immediacy. The boundary cases resolve cleanly: a human waiting on a *long* agentic run gets an async job with a streamed progress/status UI, because neither pure streaming nor pure sync fits.

## Decision Framework

The `decision_tree` in frontmatter encodes the branching. In plain language:

1. **Human in the loop?** If yes, perceived latency dominates. If generation fits within a request timeout, **stream**. If it's a long multi-step run, use an **async job with streamed progress** or a status UI.
2. **Machine consumer?** Perceived latency is irrelevant. If it needs the complete result before acting and the work is short, go **synchronous**; if the work is long or batch, go **asynchronous**. Only stream to a machine if something genuinely consumes tokens incrementally (rare).
3. **Always check the timeout.** Long work dies on proxy/gateway/serverless request timeouts regardless of who's waiting — that alone forces async.

## Approach Deep-Dives

**Synchronous** is the simplest contract — one request, one complete response — and the right default for short machine-to-machine calls and schema-validated structured output, which is easiest to validate as one atomic payload. Its weakness is that total latency lands all at once (bad for humans) and it's fragile against timeouts on long work.

**Streaming** emits tokens over SSE/WebSocket so output starts within a few hundred milliseconds. The metric that matters is *time-to-first-token*, which is what the user perceives — see [Measure First-Token Latency Separately](../../tips-and-tricks/cost-and-performance/measure-first-token-latency.md) and the production view in [Alert on Streaming Latency SLOs](../../observability/monitoring-alerting/alert-on-streaming-latency-slos.md). The subtle cost is error handling: because a `200 OK` header is sent before generation finishes, a mid-stream failure must be signaled *in-band*, and a naive client treats a truncated stream as success. Engines like [vLLM](../../projects/inference-engines/vllm.md) and [TGI](../../projects/inference-engines/text-generation-inference.md) stream natively.

**Asynchronous** decouples request lifetime from work lifetime with a job ID, a worker pool, and webhook/poll delivery. It's the only correct shape for work that exceeds a timeout, the substrate for batch/offline pipelines (where batching yields the best cost-per-token), and the durable choice when a job must survive a disconnect. The price is the most infrastructure — queue, job store, idempotency, retries, dead-letter handling.

## Common Mistakes

- **Streaming to a machine consumer.** Parsing partial JSON mid-stream adds complexity and mid-parse errors for no benefit; machines don't perceive latency.
- **Synchronous responses for long agentic runs.** They blow through proxy/serverless timeouts and fail intermittently — long work belongs in async jobs.
- **Measuring only total latency.** For streaming, time-to-first-token is what users feel; instrument it separately.
- **Assuming a 200 OK means success on a stream.** Mid-stream errors arrive after the header — handle them in-band, or a truncated stream looks like a complete answer.

## When This Guidance Might Be Outdated

The `established` rating reflects that these three delivery contracts are stable web-architecture patterns. What shifts underneath them: (1) agentic systems increasingly need a *hybrid* — an async job that also streams intermediate reasoning/tool-progress to a watching human — and framework support for that pattern is still maturing; (2) serverless and edge platforms keep changing how cleanly they support long-lived streaming vs background jobs, which can constrain the choice on a given platform. Re-check platform streaming/timeout limits when you change hosting.

## Related Decisions

The delivery pattern rides on top of [choose-serving-stack](./choose-serving-stack.md) (which engine generates the tokens) and interacts with [single-agent-vs-multi-agent](../system-design/single-agent-vs-multi-agent.md), since long multi-agent runs are the canonical case that forces the async-with-progress hybrid.

## Resources

- [vLLM](../../projects/inference-engines/vllm.md)
- [Text Generation Inference (TGI)](../../projects/inference-engines/text-generation-inference.md)
- [Measure First-Token Latency Separately](../../tips-and-tricks/cost-and-performance/measure-first-token-latency.md)
- [Alert on Streaming Latency SLOs](../../observability/monitoring-alerting/alert-on-streaming-latency-slos.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
