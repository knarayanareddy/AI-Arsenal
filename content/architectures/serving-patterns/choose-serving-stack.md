---
id: "choose-serving-stack"
title: "Choosing an LLM Serving Stack: Managed API, Local Runtime, or Self-Hosted Engine"
category: "serving-patterns"
decision_type: "fork"
decision_summary: "Use a managed API until cost, latency, or data constraints force a change; a local runtime for dev and edge; a dedicated engine (vLLM, SGLang, TGI) once you self-host at real throughput."
tags:
  - inference
  - self-hosted
  - llm
  - efficiency

approaches:
  - name: "Managed API (provider or gateway)"
    description: "Call a hosted model API directly (OpenAI, Anthropic, Google) or through a gateway/router (LiteLLM) that normalizes providers behind one interface, with no model infrastructure to operate."
    when_to_use:
      - "You are validating a product and iteration speed matters more than unit cost — frontier capability with zero infrastructure is the fastest possible start"
      - "Traffic is spiky or low-volume, where paying per token beats paying for idle GPU reservations"
      - "You need frontier-model quality that no open-weight model currently matches for your task"
    when_not_to_use:
      - "Data residency, compliance, or IP constraints prohibit sending prompts to third-party infrastructure"
      - "Sustained high token volume makes per-token pricing materially more expensive than amortized GPU cost — the crossover is workload-specific and must be calculated, not assumed"
    tradeoffs:
      cost: "Zero fixed cost, linear per-token cost — cheapest at low volume, most expensive at sustained high volume."
      complexity: "Lowest — no GPUs, no model lifecycle, no capacity planning; a gateway adds provider portability for one config file of effort."
      latency: "Network round-trip plus provider queueing; no control over tail latency or throughput prioritization."
      flexibility: "No control over model weights, quantization, decoding internals, or deprecation schedules — providers retire models on their timeline, not yours."

  - name: "Local runtime (Ollama, llama.cpp)"
    description: "Run open-weight models on local or edge hardware via llama.cpp-family runtimes, optimized for single-user or low-concurrency use on consumer hardware including CPUs and laptops."
    when_to_use:
      - "Development, prototyping, and offline/air-gapped or edge deployments where data never leaving the machine is the requirement"
      - "Single-user or low-concurrency workloads (individual tools, on-device assistants) where GGUF quantization makes capable models fit consumer hardware"
    when_not_to_use:
      - "Serving many concurrent users — llama.cpp-family runtimes lack the continuous batching and paged KV management that give server engines an order of magnitude more throughput per GPU"
      - "You need the highest-quality open models at full precision, which exceed consumer-hardware memory"
    tradeoffs:
      cost: "Free beyond hardware you already own; no per-token fees."
      complexity: "Minimal for one machine (Ollama is a single install); quantization choice (GGUF variants) is the main knob to understand."
      scalability: "Not designed for concurrent production serving — throughput per device is the hard ceiling."
      accuracy: "Aggressive quantization (below ~4-bit) measurably degrades quality; test on your task rather than trusting benchmark deltas."

  - name: "Self-hosted inference engine (vLLM, SGLang, TGI)"
    description: "Operate a dedicated GPU serving engine with continuous batching, paged KV caching, and OpenAI-compatible endpoints, running open-weight (or licensed) models on infrastructure you control."
    when_to_use:
      - "Sustained token volume where amortized GPU cost undercuts per-token API pricing"
      - "Data constraints require prompts to stay on your infrastructure while still serving many concurrent users"
      - "You need serving-level control: custom models or fine-tunes, structured-output constraints, prefix caching for shared system prompts, latency SLO tuning"
    when_not_to_use:
      - "Your team cannot own GPU capacity planning, engine upgrades, and model lifecycle — the operational burden is real and continuous"
      - "Traffic is too low or too spiky to keep reserved GPUs busy — idle GPU hours erase the unit-cost advantage"
    tradeoffs:
      cost: "High fixed cost (GPUs, ops time) with low marginal cost — wins at sustained utilization, loses at low or spiky volume."
      complexity: "Highest — capacity planning, engine and CUDA version management, model updates, and multi-replica routing are yours to run."
      latency: "Best achievable control: you tune batching, prefix caching, and quantization against your own SLOs rather than a provider's queue."
      scalability: "Scales with your GPU fleet; continuous batching and paged KV caches (the PagedAttention lineage) are what make high-concurrency serving economical."

key_factors:
  - "Data constraints: prompts containing regulated or proprietary data that cannot leave your infrastructure rule out managed APIs regardless of economics"
  - "Sustained utilization: reserved GPUs only beat per-token pricing when kept busy — calculate the crossover from your actual token volume, since idle GPU hours invert the comparison"
  - "Concurrency profile: single-user/edge favors local runtimes; many concurrent users on your own hardware requires a batching server engine, not a local runtime scaled up"
  - "Capability requirement: if only a frontier proprietary model handles your task acceptably, self-hosting open weights is not yet an option for that workload"
  - "Team capacity: a self-hosted engine is a production database-grade operational commitment — teams without GPU ops experience should price that in explicitly"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Choosing an LLM serving stack"] --> Data{"Can prompts leave your infrastructure?"}
      Data -->|"No — compliance/residency/IP"| Conc{"Concurrent users?"}
      Data -->|"Yes"| Vol{"Sustained high token volume?"}
      Vol -->|"No — spiky or low volume"| API["Managed API (optionally via LiteLLM gateway)"]
      Vol -->|"Yes — calculate the GPU crossover"| Cap{"Does an open-weight model meet the quality bar?"}
      Cap -->|"No"| API
      Cap -->|"Yes, and team can operate GPUs"| Engine["Self-hosted engine: vLLM / SGLang / TGI"]
      Conc -->|"Single user / edge / dev"| Local["Local runtime: Ollama / llama.cpp"]
      Conc -->|"Many users"| Engine

confidence: "established"
tradeoffs_as_of: "2026-07-07"

approach_implementations:
  - approach_name: "Managed API (provider or gateway)"
    tool_ids:
      - litellm
    project_ids: []
    build_example_ids: []
  - approach_name: "Local runtime (Ollama, llama.cpp)"
    project_ids:
      - ollama
      - llama-cpp
    tool_ids: []
    build_example_ids: []
  - approach_name: "Self-hosted inference engine (vLLM, SGLang, TGI)"
    project_ids:
      - vllm
      - sglang
      - text-generation-inference
    tool_ids: []
    build_example_ids: []

related_decisions:
  - choose-llm
  - rag-vs-fine-tuning

common_mistakes:
  - "Scaling a local runtime into production serving — llama.cpp-family runtimes lack continuous batching and paged KV management, so per-GPU throughput is roughly an order of magnitude below a server engine, and the shortfall surfaces as latency collapse under concurrency rather than a clean error."
  - "Self-hosting for cost reasons without calculating utilization — reserved GPUs beat per-token pricing only when kept busy; teams with spiky traffic frequently end up paying for idle hardware plus new operational burden while their effective unit cost rises."
  - "Treating OpenAI-compatible endpoints as full portability — the request surface is compatible, but sampling behavior, tool-calling reliability, and structured-output support differ across engines and providers, so switching still requires re-running evals rather than just changing a base URL."
  - "Committing to a managed provider without an abstraction layer, then discovering model deprecations or pricing changes force a migration under time pressure — a gateway costs little upfront and converts provider changes from emergencies into config edits."

added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
enrichment_status: "draft"
---

## Overview

Where model inference physically runs is the highest-leverage infrastructure decision in an LLM system: it determines unit economics, latency ceilings, data-governance posture, and how much operational burden the team carries. It is also a decision most teams make twice — nearly everyone correctly starts on a managed API, and the real decision is recognizing when (and whether) the crossover to self-hosting arrives.

## The Decision

The fork has three stable positions. A managed API is the right default while validating a product: zero infrastructure, frontier capability, and per-token pricing that is cheapest precisely when volume is low and unpredictable. A local runtime (Ollama, llama.cpp) serves a different job — development, offline/edge deployment, and single-user tools — and should not be mistaken for a production serving tier. A self-hosted engine (vLLM, SGLang, TGI) becomes the right answer when one of two forces makes it so: data that cannot leave your infrastructure, or sustained token volume high enough that amortized GPU cost undercuts per-token pricing while the team can genuinely operate GPU infrastructure. Absent either force, staying on a managed API is not a failure to graduate — it is usually the correct steady state.

## Decision Framework

The decision tree in frontmatter encodes the branching; condensed:

| Constraint | Recommended Start | Canonical Entry |
|---|---|---|
| Validating a product, spiky traffic | Managed API via a gateway | [LiteLLM](../../tools/serving-and-deployment/litellm.md) |
| Dev machine, offline, edge, single user | Ollama / llama.cpp | [Ollama](../../projects/inference-engines/ollama.md), [llama.cpp](../../projects/inference-engines/llama-cpp.md) |
| Self-hosted, high concurrency, general | vLLM | [vLLM](../../projects/inference-engines/vllm.md) |
| Self-hosted, heavy structured output / agentic multi-call | SGLang | [SGLang](../../projects/inference-engines/sglang.md) |
| Self-hosted, Hugging Face ecosystem alignment | TGI | [Text Generation Inference](../../projects/inference-engines/text-generation-inference.md) |

## Approach Deep-Dives

**Managed APIs** convert a capital and operations problem into a variable cost, which is the right shape early: capability arrives instantly and scales to zero. The structural costs surface later — model deprecations on the provider's schedule, no control of tail latency, and a per-token bill that grows linearly while self-hosted marginal cost approaches flat. A gateway such as LiteLLM is cheap insurance from day one. **Local runtimes** exploit quantized GGUF weights to make capable models run on consumer hardware; their design center is one user per device, which is why they excel at development loops and edge privacy and degrade badly when concurrency arrives. **Self-hosted engines** are where the serving research of the last few years (continuous batching, paged KV caching, prefix reuse) is productized: vLLM is the general-purpose default with the broadest model support, SGLang differentiates on structured output and multi-call agentic workloads via RadixAttention prefix caching, and TGI fits teams already standardized on the Hugging Face stack. All three expose OpenAI-compatible endpoints, which eases migration mechanics but does not remove the need to re-validate behavior with your evals.

## Common Mistakes

- **Promoting a local runtime into a production serving tier.** Throughput collapses under concurrency because the engine architecture, not the hardware, is the bottleneck.
- **Self-hosting on cost intuition rather than a utilization calculation.** Idle reserved GPUs plus new ops burden frequently raise effective unit cost; run the crossover math on real traffic first.
- **Assuming OpenAI-compatibility means behavioral equivalence.** Tool calling, sampling, and structured-output behavior differ across engines and providers; migrations need eval re-runs.
- **Hard-coding one provider with no abstraction layer.** Deprecations and price changes then become migration emergencies instead of config edits.

## When This Guidance Might Be Outdated

Confidence is `established` for the fork structure, but two inputs move quickly: open-weight model quality (each generation shrinks the set of tasks that require a proprietary frontier model, expanding the self-hosting option space) and per-token API pricing (which has fallen repeatedly, pushing the self-hosting crossover point higher). Re-verify the economics roughly every six months against current pricing and current open-model quality on your task rather than reusing last year's crossover calculation.

## Related Decisions

Upstream of this decision is [Choosing an LLM](../model-selection/choose-llm.md) — model choice constrains where it can be served, since proprietary frontier models remove the self-hosting branch entirely. [RAG vs Fine-Tuning](../system-design/rag-vs-fine-tuning.md) interacts through fine-tuned weights: a custom fine-tune typically implies the self-hosted branch (or a provider's hosted fine-tuning tier).

## Resources

- [vLLM](../../projects/inference-engines/vllm.md)
- [SGLang](../../projects/inference-engines/sglang.md)
- [Text Generation Inference](../../projects/inference-engines/text-generation-inference.md)
- [Ollama](../../projects/inference-engines/ollama.md)
- [llama.cpp](../../projects/inference-engines/llama-cpp.md)
- [LiteLLM](../../tools/serving-and-deployment/litellm.md)

---
*Last reviewed: 2026-07-07 by @maintainer*
