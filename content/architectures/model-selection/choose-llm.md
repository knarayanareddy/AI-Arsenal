---
id: "choose-llm"
title: "Choosing a Model: Local vs Cloud, and Routing by Primary Need"
category: "model-selection"
decision_type: "spectrum"
decision_summary: "Choose the smallest model and hosting path that satisfies your privacy, latency, and cost constraints — resolve local-vs-cloud first as the hardest constraint, then route by primary need (reasoning, code, long-context, multimodal, or cost)."
tags:
  - llm
  - inference
  - local
  - cloud

approaches:
  - name: "Self-Hosted Open-Weight (local or GPU server)"
    description: "Run an open-weight model (Llama, Qwen, Gemma, Phi, DeepSeek) on hardware you control, via a local runtime (Ollama, llama.cpp) or a production inference engine (vLLM, SGLang)."
    when_to_use:
      - "Data cannot leave your environment for regulatory, contractual, or data-residency reasons"
      - "Query volume is high enough that per-token API costs would exceed the cost of owning/renting GPU capacity"
      - "You need full control over model versioning and are willing to accept responsibility for keeping it current"
    when_not_to_use:
      - "Query volume is low and unpredictable — GPU capacity sits idle between bursts, making self-hosting cost-inefficient versus pay-per-token APIs"
      - "You need frontier-level reasoning or multimodal capability that open-weight models do not yet match as of the current landscape check"
    tradeoffs:
      cost: "No per-token fee, but requires GPU capital or rental cost regardless of utilization — favors high, steady query volume; disfavors low or bursty volume."
      latency: "Can be tuned aggressively (batching, quantization, speculative decoding) since you control the full serving stack, but requires real engineering investment to get right."
      compute-requirements: "Ranges from a laptop (small quantized models via Ollama/llama.cpp) to multi-GPU servers (vLLM/SGLang for high-throughput serving) depending on model size and required throughput."
      flexibility: "High control over model choice, quantization, and serving configuration; low flexibility to instantly access a new frontier model the moment it's released, since you must obtain and serve the weights yourself."

  - name: "Cloud API (hosted, closed or open-weight)"
    description: "Call a hosted model through a provider API (OpenAI, Anthropic, Google, or a hosted-open-weight provider like Together/Fireworks), paying per token with no infrastructure to operate."
    when_to_use:
      - "Query volume is low, unpredictable, or bursty, making pay-per-token pricing more cost-effective than owning idle GPU capacity"
      - "You need access to frontier reasoning, coding, or multimodal capability that isn't yet matched by open-weight models you could self-host"
      - "Time-to-first-working-system matters more than long-run per-token cost"
    when_not_to_use:
      - "Data residency, regulatory, or contractual constraints prohibit sending data to third-party infrastructure"
      - "Sustained query volume is high enough that self-hosting the equivalent open-weight model would be cheaper over a realistic time horizon"
    tradeoffs:
      cost: "No upfront infrastructure cost, but per-token pricing means cost scales linearly with usage with no ceiling from idle capacity — can exceed self-hosted cost at high sustained volume."
      latency: "Provider-dependent and outside your direct control; generally competitive for common models, but you cannot apply serving-level optimizations yourself."
      flexibility: "Instant access to newly released models with no infrastructure change; zero control over exact serving configuration or quantization."
      reliability: "Inherits provider uptime/rate-limit behavior — a real dependency risk distinct from your own infrastructure's reliability."

key_factors:
  - "Data residency/regulatory constraint: a hard requirement to keep data on-premises or in a specific jurisdiction rules out most cloud APIs regardless of other factors"
  - "Query volume and predictability: high, steady volume favors self-hosting on cost; low or bursty volume favors pay-per-token APIs"
  - "Capability ceiling needed: frontier reasoning/coding/multimodal tasks may currently require cloud APIs if open-weight models haven't yet closed the gap for your specific task"
  - "Latency requirement: sub-second requirements are achievable both ways, but self-hosting gives you direct control over the serving stack to hit aggressive targets"
  - "Team capacity to operate inference infrastructure: self-hosting well (batching, quantization, autoscaling) is a real engineering investment, not a one-line deployment"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Choosing a model and hosting path"] --> Residency{"Must data stay in your environment?"}
      Residency -->|"Yes, regulated or contractual"| SelfHost["Self-host open weights"]
      Residency -->|"No"| Volume{"Query volume high and steady, or low/bursty?"}
      Volume -->|"High and steady"| CostCompare{"Would self-hosting be cheaper at this volume?"}
      CostCompare -->|"Yes"| SelfHost
      CostCompare -->|"No, or unsure"| CloudAPI["Use a cloud API"]
      Volume -->|"Low or bursty"| CloudAPI
      SelfHost --> Hardware{"What hardware?"}
      Hardware -->|"Laptop/workstation"| LocalSimple["Ollama + llama.cpp with a small quantized model"]
      Hardware -->|"GPU server, high throughput needed"| ProdServe["vLLM or SGLang"]
      CloudAPI --> Need{"Primary need?"}
      Need -->|"Best available reasoning"| Reasoning["Frontier/reasoning-capable model route"]
      Need -->|"Code generation"| Code["Code-specialized model"]
      Need -->|"Long context (>128K)"| LongCtx["Hosted long-context model -- but evaluate RAG first per rag-vs-fine-tuning"]
      Need -->|"Vision/multimodal"| Multimodal["Multimodal-capable model"]
      Need -->|"Lowest cost"| CostRoute["Start with the smallest model that passes your eval set; escalate only on failure"]

confidence: "evolving"
tradeoffs_as_of: "2026-07-06"

approach_implementations:
  - approach_name: "Self-Hosted Open-Weight (local or GPU server)"
    project_ids:
      - ollama
      - llama-cpp
      - vllm
      - sglang
      - llama-3
      - qwen-2-5
      - deepseek-v3-r1
      - phi-4
      - gemma-3
      - command-r-plus
    tool_ids: []
    build_example_ids:
      - starter-local-llm-chat
  - approach_name: "Cloud API (hosted, closed or open-weight)"
    project_ids: []
    tool_ids: []
    build_example_ids: []

related_decisions:
  - choose-agent-framework
  - choose-deployment-target
  - rag-vs-fine-tuning

common_mistakes:
  - "Defaulting to the largest/most capable model available without first checking whether a smaller model passes your actual evaluation set — most production tasks do not require frontier-model capability, and the cost/latency difference at scale is substantial."
  - "Self-hosting an open-weight model for low, unpredictable query volume, where the idle GPU capacity cost exceeds what pay-per-token API pricing would have cost for the same workload."
  - "Choosing a long-context hosted model as a substitute for RAG without first checking whether retrieval would be both cheaper and more accurate for the actual corpus size — long context is not a free replacement for retrieval quality."
  - "Assuming self-hosted serving will be simple: getting competitive latency and throughput out of vLLM/SGLang requires real batching, quantization, and capacity-planning work, not just installing the engine and pointing it at a model checkpoint."

added_date: "2026-06-13"
last_reviewed: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: "reviewed"
---

## Overview

Model choice is the root decision for most AI applications, and getting it wrong makes every subsequent choice — RAG design, fine-tuning strategy, serving architecture, cost control, observability — harder. The decision resolves cleanly if approached as two sequential forks rather than one large comparison: first resolve local-vs-cloud, which is usually the hardest and least reversible constraint, then route by primary need once that's settled.

## The Decision

Resolve data residency and regulatory constraints first — if data cannot leave your environment, self-hosting is not optional, and the decision collapses to "which open-weight model and which local/server hardware." If there is no hard residency constraint, the next question is query volume and predictability: cloud APIs win on cost for low or bursty volume because there's no idle-capacity cost, while high, steady volume can make self-hosting cheaper over a realistic time horizon — but only if your team can actually operate the serving infrastructure well, which is a real, ongoing engineering cost, not a one-time setup task. Once local-vs-cloud is settled, route by primary need: reasoning-heavy tasks, code generation, long-context requirements, multimodal inputs, and cost-sensitive routing each favor different specific models within whichever hosting path was chosen.

## Decision Framework

The decision tree in this entry's frontmatter encodes the full branching logic. As a quick-reference table for the local-hosting path specifically:

| Need | Start With | Canonical Entries |
|---|---|---|
| Local laptop development | Ollama + llama.cpp | [Ollama](../../projects/inference-engines/ollama.md), [llama.cpp](../../projects/inference-engines/llama-cpp.md) |
| Production open-model serving | vLLM or SGLang | [vLLM](../../projects/inference-engines/vllm.md), [SGLang](../../projects/inference-engines/sglang.md) |
| Broad open-weight default | Llama or Qwen | [Llama 3.x](../../projects/foundation-models/llama-3.md), [Qwen 2.5](../../projects/foundation-models/qwen-2-5.md) |
| Reasoning-focused open-weight | DeepSeek-R1 route | [DeepSeek-V3/R1](../../projects/foundation-models/deepseek-v3-r1.md) |
| Small-model routing | Phi/Gemma small variants | [Phi-4](../../projects/foundation-models/phi-4.md), [Gemma 3](../../projects/foundation-models/gemma-3.md) |
| Enterprise RAG-oriented model | Command R+ | [Command R+](../../projects/foundation-models/command-r-plus.md) |

## Approach Deep-Dives

**Self-hosted open-weight** models give you full control over versioning, quantization, and serving configuration, at the cost of owning that operational surface yourself. The gap between open-weight and closed frontier model capability has narrowed substantially and continues to shift — checking this gap for your specific task category (not a general "open-weight is/isn't competitive" belief) is worth doing at decision time, since it changes materially over periods as short as a few months. **Cloud APIs** remove infrastructure ownership entirely and provide instant access to newly released models, but introduce a real dependency risk (rate limits, pricing changes, deprecation timelines) that self-hosting does not carry, and per-token pricing has no ceiling the way idle self-hosted capacity does — the crossover point where self-hosting becomes cheaper depends on your actual sustained volume and is worth calculating rather than assuming.

## Common Mistakes

- **Defaulting to the largest/most capable model without checking whether a smaller model passes your eval set.** Most production tasks do not need frontier capability, and the cost/latency gap at scale is substantial.
- **Self-hosting for low, unpredictable query volume.** Idle GPU capacity cost can exceed what pay-per-token pricing would have cost for the same workload.
- **Substituting a long-context hosted model for RAG without checking whether retrieval would be cheaper and more accurate.** Long context is not a free replacement for retrieval quality — see [RAG vs Fine-Tuning](../system-design/rag-vs-fine-tuning.md).
- **Underestimating self-hosted serving complexity.** Competitive latency/throughput from vLLM/SGLang requires real batching, quantization, and capacity-planning investment, not just installing the engine.

## When This Guidance Might Be Outdated

This entry's `evolving` confidence rating reflects the fact that the open-weight-vs-closed-frontier capability gap, per-token API pricing, and open-weight model release cadence are all moving targets — the specific model recommendations in the Decision Framework table should be re-checked at each review cycle against current benchmark standings and current pricing, not assumed to remain accurate for more than a few months at a time. The local-vs-cloud cost crossover point is also sensitive to GPU rental pricing, which has shifted meaningfully over the past two years and should be re-verified against current provider rates before relying on it for a specific volume estimate.

## Related Decisions

This decision precedes and constrains [Choosing an Agent Framework](./choose-agent-framework.md) (framework choice often assumes a specific provider or hosting model) and [Choosing a Deployment Target](../serving-patterns/choose-deployment-target.md) (serving infrastructure differs substantially between self-hosted and API-based model access). It also interacts directly with [RAG vs Fine-Tuning](../system-design/rag-vs-fine-tuning.md): model choice affects both retrieval-context-following quality and fine-tuning predictability.

## Resources

- [Ollama](../../projects/inference-engines/ollama.md)
- [vLLM](../../projects/inference-engines/vllm.md)
- [Llama 3.x](../../projects/foundation-models/llama-3.md)
- [Qwen 2.5](../../projects/foundation-models/qwen-2-5.md)
- [DeepSeek-V3/R1](../../projects/foundation-models/deepseek-v3-r1.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
