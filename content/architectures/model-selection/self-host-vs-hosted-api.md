---
id: "self-host-vs-hosted-api"
title: "Self-Host Open Weights vs Hosted Model API: Who Should Run the GPU?"
category: "model-selection"
decision_type: "fork"
decision_summary: "Use a hosted API until a concrete constraint — data residency, sustained-volume economics, or hard control — forces you off it; self-hosting open weights buys control and cheap marginal scaling but you own the GPUs and uptime."
tags:
  - inference
  - self-hosted
  - cloud
  - llm

approaches:
  - name: "Hosted model API"
    description: "Call a provider's managed endpoint (proprietary or open-weights-as-a-service). The provider owns the GPUs, autoscaling, availability, and model updates; you pay per token."
    when_to_use:
      - "You are pre-product-market-fit or pre-scale and want to spend engineering time on the product, not on GPU operations"
      - "Traffic is spiky or low-volume, so paying only for tokens consumed beats paying for idle reserved GPUs"
      - "You want access to frontier proprietary models that are not available as open weights at all"
      - "You have no in-house inference/SRE expertise and no appetite to build it yet"
    when_not_to_use:
      - "Data cannot legally or contractually leave your environment (regulated data, air-gapped, strict residency) and no provider offers an acceptable in-region/private deployment"
      - "Volume is high and sustained enough that per-token pricing exceeds the amortized cost of running your own GPUs at good utilization"
      - "You need model/version pinning guarantees a provider won't give (silent model updates would break your evals)"
    tradeoffs:
      cost: "Zero fixed cost, pure per-token variable cost. Cheapest at low/spiky volume; becomes the most expensive option once volume is high and sustained. As of 2026-07, hosted open-weights inference is often priced well below proprietary frontier models per token."
      latency: "Network round-trip plus provider queueing; generally good but not under your control, and subject to provider-side rate limits and noisy-neighbor variance."
      accuracy: "Access to the strongest proprietary models; but silent version updates can shift behavior under you unless the provider offers pinned snapshots."
      complexity: "Lowest — no GPUs, no autoscaling, no model-server tuning. An API key and a client library."
      flexibility: "Bounded by what the provider exposes: limited quantization/batching control, no custom kernels, and fine-tuning only where the provider supports it."

  - name: "Self-host open weights"
    description: "Run open-weight models on your own (or rented) GPUs behind an inference server (vLLM, TGI, SGLang, TensorRT-LLM, or Ollama for local/dev). You own the model, the serving stack, autoscaling, and uptime."
    when_to_use:
      - "Data residency/privacy requires inference inside your own VPC, on-prem, or air-gapped environment"
      - "Sustained high volume makes amortized GPU cost per token cheaper than API pricing at your achievable utilization"
      - "You need full control: pinned model versions, custom quantization, speculative decoding, structured-output kernels, or LoRA-adapter hot-swapping"
      - "Predictable, controllable tail latency matters more than avoiding ops"
    when_not_to_use:
      - "You lack (and don't want to build) inference/SRE capability to keep GPUs healthy, autoscaled, and available"
      - "Volume is low or spiky enough that GPUs sit idle — you'd pay for capacity you don't use"
      - "The quality gap between the best open weights and the frontier proprietary model you need is decision-critical"
    tradeoffs:
      cost: "High fixed cost (GPUs, whether owned or reserved) with very low marginal cost per token. Wins decisively at high sustained utilization; loses badly at low utilization where GPUs idle. Break-even depends entirely on your utilization, not a universal token threshold."
      latency: "Fully under your control — batching, quantization, and hardware are yours to tune — but you own every millisecond of tail latency and every outage."
      accuracy: "Bounded by open-weights quality (closing fast but historically a step behind frontier proprietary on the hardest tasks); fully customizable via fine-tuning/adapters."
      complexity: "Highest — GPU capacity planning, an inference server to tune, autoscaling, observability, and on-call for a stateful GPU service. See choose-serving-stack."
      flexibility: "Maximum: any model, any quantization, custom decoding, adapter hot-swapping, and no dependence on a vendor's roadmap."

key_factors:
  - "Data governance: a hard residency/privacy constraint can force self-hosting (or a private/in-region provider deployment) regardless of cost — this is the factor that overrides all others when it applies"
  - "Sustained volume × GPU utilization: the cost crossover is a utilization question, not a raw token count — a self-hosted GPU only beats API pricing when it stays busy; idle GPUs make self-hosting the more expensive option"
  - "In-house inference/SRE capability: self-hosting a stateful GPU service with real SLOs is a standing operational commitment, not a one-time setup"
  - "Model-quality requirement: if only a frontier proprietary model clears your quality bar, hosted API is the only path to it"
  - "Control requirements: version pinning, custom quantization/kernels, and adapter hot-swapping are only available when you own the serving stack"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Does data have a hard residency / privacy constraint?"] --> Gov{"Must inference stay in your environment?"}
      Gov -->|"Yes, and no acceptable private/in-region provider"| Self["Self-host open weights (constraint overrides cost)"]
      Gov -->|"No"| Quality{"Does only a frontier proprietary model clear your quality bar?"}
      Quality -->|"Yes"| API["Hosted API — it's the only path to that model"]
      Quality -->|"No, open weights are good enough"| Volume{"Is volume high AND sustained (GPUs would stay busy)?"}
      Volume -->|"No — low or spiky"| APILow["Hosted API — pay per token, don't buy idle GPUs"]
      Volume -->|"Yes"| Ops{"Do you have inference/SRE capability for a GPU service?"}
      Ops -->|"No"| APIorHosted["Hosted API (or hosted open-weights) until you build the capability"]
      Ops -->|"Yes"| SelfHost["Self-host open weights — amortized cost + control win here"]

confidence: "context-dependent"
tradeoffs_as_of: "2026-07-08"

approach_implementations:
  - approach_name: "Hosted model API"
    tool_ids:
      - together-ai
      - openrouter
    project_ids: []
    build_example_ids: []
  - approach_name: "Self-host open weights"
    tool_ids: []
    project_ids:
      - vllm
      - text-generation-inference
      - sglang
      - ollama
    build_example_ids: []

related_decisions:
  - choose-serving-stack
  - choose-llm
  - choose-deployment-target

common_mistakes:
  - "Self-hosting to 'save money' at low or spiky volume: a rented H100 that sits at 10% utilization is far more expensive per token than an API — the savings only materialize at high sustained utilization, and teams routinely underestimate how hard that utilization is to achieve."
  - "Treating self-hosting as a one-time setup rather than a standing operational commitment: a GPU inference service needs capacity planning, autoscaling, observability, and on-call, and the ongoing engineering cost often dwarfs the token-price delta that motivated the move."
  - "Ignoring silent provider model updates: building evals against a hosted model without pinning to a versioned snapshot means a provider-side update can shift behavior under you — pin the version or budget for re-validation."
  - "Underestimating the open-vs-frontier quality gap for the specific task: open weights are excellent and closing fast, but the decision should be made against a task-specific eval, not a general leaderboard, before betting the product on them."

added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: "draft"
---

## Overview

"Should we run our own models?" is asked far too early and answered far too often on vibes about cost. The honest default is a hosted API: it lets a team spend its scarce engineering hours on the product instead of on GPU capacity planning, autoscaling, and 3 a.m. inference outages. Self-hosting open weights is the right move — but only when a *concrete* constraint forces it, and the constraint that most often makes it genuinely worthwhile (unit economics) is a utilization question that teams consistently get wrong.

## The Decision

Start with a hosted API and stay there until a specific constraint pushes you off it. There are four constraints that legitimately justify self-hosting open weights: (1) **data governance** — inference must happen inside your VPC/on-prem/air-gap and no provider offers an acceptable private or in-region deployment; this overrides cost entirely when it applies; (2) **sustained-volume unit economics** — you can keep GPUs busy enough that amortized cost per token beats API pricing; (3) **control** — you need pinned model versions, custom quantization/kernels, speculative decoding, or LoRA-adapter hot-swapping the provider won't give you; (4) **latency control** — you need to own tail latency rather than inherit a provider's. If none of these bind, the API is almost always the better engineering decision, because self-hosting is a standing operational commitment, not a setup task. Conversely, if only a frontier *proprietary* model clears your task-specific quality bar, the hosted API is the only path to it and the decision is made for you.

## Decision Framework

The `decision_tree` in frontmatter encodes the branching. In plain language:

1. **Governance first.** If data legally/contractually cannot leave your environment and no acceptable private/in-region provider exists, self-host — cost is secondary.
2. **Quality gate.** If only a frontier proprietary model clears your task-specific eval, use the hosted API; open weights aren't an option regardless of cost.
3. **Volume × utilization.** If open weights are good enough, ask whether volume is high *and sustained* enough to keep GPUs busy. Low or spiky traffic → hosted API (don't buy idle capacity). The crossover is about achievable utilization, not a universal token count.
4. **Operational capability.** Even at high volume, self-hosting only pays off if you have (or will build) the inference/SRE capability to run a stateful GPU service with real SLOs. If not, use a hosted API — including hosted *open-weights* providers — until you do.

## Approach Deep-Dives

**Hosted API.** Zero fixed cost, pure variable cost, lowest complexity. Best at low/spiky volume and the only route to frontier proprietary models. The two things to watch are silent version updates (pin to a snapshot or budget for re-validation) and per-token cost at scale (it grows linearly with volume, so a runaway-successful product eventually makes the unit economics worth revisiting). Routers/aggregators like [OpenRouter](../../tools/model-layer/openrouter.md) and providers like [Together AI](../../tools/model-layer/together-ai.md) also serve *open* weights as an API — a useful middle ground that gives open-model economics without owning GPUs.

**Self-host open weights.** High fixed cost, near-zero marginal cost, maximum control and complexity. The serving stack ([vLLM](../../projects/inference-engines/vllm.md), [TGI](../../projects/inference-engines/text-generation-inference.md), [SGLang](../../projects/inference-engines/sglang.md), or [Ollama](../../projects/inference-engines/ollama.md) for local/dev) is only the beginning — capacity planning, autoscaling, observability, and on-call are the real cost. It wins decisively when GPUs stay busy and when control (version pinning, custom quantization, adapter hot-swapping) is a hard requirement. See [choose-serving-stack](../serving-patterns/choose-serving-stack.md) for the layer that executes this.

## Common Mistakes

- **Self-hosting to "save money" at low/spiky volume.** An idle rented GPU is more expensive per token than an API; savings need high sustained utilization.
- **Treating self-hosting as one-time setup.** It's a standing operational commitment; ongoing engineering cost often dwarfs the token-price delta that motivated it.
- **Ignoring silent provider model updates.** Build evals against a *pinned* snapshot or budget for periodic re-validation.
- **Underestimating the open-vs-frontier gap for your task.** Decide against a task-specific eval, not a general leaderboard.

## When This Guidance Might Be Outdated

The `context-dependent` confidence is inherent — this decision depends on your data, volume, and team. Two moving parts to re-check every 6-12 months: (1) open-weights quality continues to close on frontier proprietary models, which steadily widens the set of tasks where self-hosting (or hosted open-weights) is viable; (2) hosted open-weights pricing and serverless-GPU options keep improving, eroding the volume threshold at which owning GPUs pays off. Re-run the utilization/cost math against current prices before committing capital to GPUs.

## Related Decisions

Once self-hosting is chosen, [choose-serving-stack](../serving-patterns/choose-serving-stack.md) picks the inference server and [choose-deployment-target](../serving-patterns/choose-deployment-target.md) picks where it runs. [choose-llm](./choose-llm.md) is the parallel decision of *which* model — its outcome (open vs proprietary) partly determines whether self-hosting is even on the table.

## Resources

- [vLLM](../../projects/inference-engines/vllm.md)
- [Text Generation Inference (TGI)](../../projects/inference-engines/text-generation-inference.md)
- [SGLang](../../projects/inference-engines/sglang.md)
- [Ollama](../../projects/inference-engines/ollama.md)
- [Together AI](../../tools/model-layer/together-ai.md)
- [OpenRouter](../../tools/model-layer/openrouter.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
