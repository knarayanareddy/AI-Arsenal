---
id: "choose-quantization-strategy"
title: "Choosing a Quantization Strategy: How Low Can You Go Before Quality Breaks?"
category: "serving-patterns"
decision_type: "spectrum"
decision_summary: "Serve at the highest precision your budget allows, quantizing down only as far as a task-specific eval shows quality holds: 8-bit is near-lossless, 4-bit is the memory-bound sweet spot, sub-4-bit is measure-don't-assume territory."
tags:
  - inference
  - efficiency
  - self-hosted
  - local

approaches:
  - name: "Full precision (FP16 / BF16)"
    description: "Serve the model in 16-bit floating point — the default weight format most open models ship in. No quantization error; maximum memory footprint."
    when_to_use:
      - "The model already fits your GPU memory with room for the KV cache at your target batch size and context length"
      - "Quality is the binding constraint and you cannot spend even a small eval-measured quality delta"
      - "You are still establishing the quality baseline that quantized variants will be measured against"
    when_not_to_use:
      - "The model does not fit memory, or fits so tightly that KV cache for real batch/context sizes is squeezed out"
      - "You are memory-bound and could serve a larger, stronger model at 4-bit within the same VRAM"
    tradeoffs:
      cost: "Highest VRAM footprint, so the most GPU capacity per served model — directly the most expensive to host."
      latency: "For memory-bandwidth-bound decoding, 16-bit weights move the most bytes per token, so per-token latency is often higher than a well-implemented low-bit kernel."
      accuracy: "The reference — zero quantization error. This is the baseline every other option is measured against."
      complexity: "Lowest — the shipped format, no calibration or special kernels."
      flexibility: "Universally supported by every serving stack."

  - name: "8-bit (INT8 / FP8)"
    description: "Quantize weights (and sometimes activations) to 8-bit. Roughly halves memory versus FP16 with quality that is near-lossless on most tasks."
    when_to_use:
      - "You need to roughly halve memory or increase throughput with minimal quality risk"
      - "You want the safest first step down from full precision before considering 4-bit"
      - "Hardware has native FP8 support (recent datacenter GPUs), making FP8 nearly free in both quality and speed"
    when_not_to_use:
      - "You need 4-bit-level memory savings to fit the model at all — 8-bit may not be aggressive enough"
      - "Your task is unusually sensitive and even small deltas fail the eval (rare at 8-bit, but measure)"
    tradeoffs:
      cost: "~2x memory reduction versus FP16 — meaningfully cheaper to host, often the difference between one GPU and two."
      latency: "Usually improves decode latency and throughput by moving fewer bytes; FP8 on supporting hardware is close to free."
      accuracy: "Near-lossless on the large majority of tasks — the lowest-risk quantization step. Still verify on your own eval."
      complexity: "Low — well-supported in mainstream serving stacks; some methods need a short calibration pass."
      flexibility: "Broadly supported; FP8 requires recent hardware."

  - name: "4-bit (GPTQ / AWQ / bitsandbytes NF4)"
    description: "Quantize weights to 4-bit using a calibrated post-training method (GPTQ, AWQ) or on-the-fly (bitsandbytes NF4). Roughly quarters weight memory; the aggressive sweet spot for fitting big models on modest GPUs."
    when_to_use:
      - "You are memory-bound and need to fit a large model on a single or smaller GPU (the classic case for self-hosting a 70B-class model on one card)"
      - "Serving a stronger 4-bit model beats a weaker model at full precision within the same VRAM budget"
      - "Throughput/cost per token matters and your eval confirms 4-bit holds quality for your task"
    when_not_to_use:
      - "Your task is precision-sensitive and the eval shows a 4-bit quality drop you cannot accept"
      - "You have not run a calibrated method or verified against a baseline — 4-bit quality varies by method, model, and task and must never be assumed"
    tradeoffs:
      cost: "~4x weight-memory reduction versus FP16 — the biggest practical win for fitting large models on limited hardware."
      latency: "Often improves decode throughput (fewer bytes moved), though dequantization overhead and kernel quality vary by implementation."
      accuracy: "Small but real quality cost — frequently a few points on hard tasks, sometimes negligible on easy ones. AWQ/GPTQ (calibrated) generally beat naive rounding. Must be measured per task."
      complexity: "Moderate — calibrated methods (GPTQ/AWQ) need a calibration dataset and produce a quantized checkpoint; NF4 is simpler but typically slightly lower quality."
      flexibility: "Widely supported by modern serving stacks; the specific method and kernel affect both speed and quality."

  - name: "Sub-4-bit (3-bit / 2-bit / extreme)"
    description: "Push below 4-bit. Maximum compression, but quality degradation becomes steep and highly model/method-dependent — specialist territory."
    when_to_use:
      - "Extreme memory constraints (edge/on-device) make sub-4-bit the only way the model fits at all"
      - "You have measured that your specific model+method+task tolerates it, using a recent extreme-quantization technique"
    when_not_to_use:
      - "You have any less-aggressive option that fits — the quality cliff below 4-bit is real and often not worth it"
      - "You are assuming rather than measuring — sub-4-bit quality is the least predictable of all"
    tradeoffs:
      cost: "Maximum memory reduction — enables models on hardware nothing else fits."
      latency: "Can help via bandwidth, but immature kernels sometimes erase the gain."
      accuracy: "Quality degradation is steep and unpredictable; only recent, careful methods make specific models usable, and only for tolerant tasks."
      complexity: "Highest — bleeding-edge methods, fragile kernels, heavy eval burden."
      flexibility: "Least supported; narrow hardware/model/method combinations."

key_factors:
  - "Task-specific eval is non-negotiable: quantization quality varies by model, method, and task, so the only valid basis for going lower is a measured quality delta on YOUR eval against an FP16 baseline — never a general claim that '4-bit is fine'"
  - "Memory-bound vs compute-bound: decoding is usually memory-bandwidth-bound, so lower-bit weights can improve latency, not just fit — but dequant overhead and kernel quality can offset this"
  - "Bigger-model-at-lower-bit vs smaller-model-at-higher-bit: within a fixed VRAM budget, a stronger model quantized to 4-bit frequently beats a weaker model at FP16 — evaluate this trade explicitly"
  - "Calibrated (GPTQ/AWQ) vs on-the-fly (NF4): calibrated methods generally preserve more quality at 4-bit but require a calibration pass and produce a fixed checkpoint"
  - "Hardware support: FP8 is near-free on recent datacenter GPUs; some low-bit kernels are fast only on specific hardware, so measure speed on your target device"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Does the model fit VRAM at FP16 with KV cache for your batch/context?"] --> Fits{"Fits comfortably?"}
      Fits -->|"Yes, and quality is paramount"| FP16["Serve FP16/BF16 (baseline)"]
      Fits -->|"Yes, but want throughput/cost headroom"| INT8["Try 8-bit (INT8/FP8) — near-lossless, safe first step"]
      Fits -->|"No — memory-bound"| Bigger{"Would a stronger model at 4-bit fit and beat a weaker FP16 model?"}
      Bigger -->|"Yes"| Q4["Use 4-bit (AWQ/GPTQ calibrated) and eval vs FP16 baseline"]
      Bigger -->|"Still doesn't fit even at 4-bit"| Sub4["Sub-4-bit ONLY if eval tolerates it; else pick a smaller model"]
      INT8 --> Eval["Run task-specific eval vs FP16 baseline"]
      Q4 --> Eval
      Sub4 --> Eval
      Eval -->|"Quality holds"| Ship["Ship at the lowest precision that passed"]
      Eval -->|"Quality drops unacceptably"| StepUp["Step back up one precision level"]

confidence: "emerging-consensus"
tradeoffs_as_of: "2026-07-08"

approach_implementations:
  - approach_name: "Full precision (FP16 / BF16)"
    tool_ids: []
    project_ids:
      - vllm
    build_example_ids: []
  - approach_name: "8-bit (INT8 / FP8)"
    tool_ids: []
    project_ids:
      - vllm
      - tensorrt-llm
    build_example_ids: []
  - approach_name: "4-bit (GPTQ / AWQ / bitsandbytes NF4)"
    tool_ids:
      - unsloth
    project_ids:
      - vllm
      - llama-cpp
    build_example_ids: []
  - approach_name: "Sub-4-bit (3-bit / 2-bit / extreme)"
    tool_ids: []
    project_ids:
      - llama-cpp
    build_example_ids: []

related_decisions:
  - choose-serving-stack
  - self-host-vs-hosted-api
  - choose-llm

common_mistakes:
  - "Assuming '4-bit is basically free' from a blog post and shipping without an eval: quantization quality is model-, method-, and task-dependent, and the only valid evidence is a measured delta against an FP16 baseline on your own task — an assumption here can silently ship a quality regression."
  - "Quantizing a model that already fits comfortably in VRAM: if you're not memory-bound, you're trading measurable quality for a saving you didn't need — quantize to fit or to hit a throughput/cost target, not reflexively."
  - "Using naive round-to-nearest 4-bit when a calibrated method (AWQ/GPTQ) was available: calibration meaningfully preserves quality at 4-bit for a modest one-time cost, and skipping it leaves quality on the table."
  - "Ignoring the KV cache: quantizing weights frees VRAM, but a long-context, high-batch workload can be KV-cache-bound rather than weight-bound — solve the actual bottleneck (which may call for KV-cache quantization or paged attention) rather than only shrinking weights."

added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: "draft"
---

## Overview

Quantization is the highest-leverage knob for fitting a capable model onto affordable hardware, and it is a spectrum, not a switch: FP16 → 8-bit → 4-bit → below. Each step down roughly halves (then quarters) weight memory and often *improves* decode latency, because LLM decoding is usually memory-bandwidth-bound — fewer bytes per weight means fewer bytes to move per token. The catch is that quality degrades as precision drops, and the degradation is model-, method-, and task-specific. The entire discipline of this decision is refusing to trust a general claim and instead measuring the quality delta against a full-precision baseline on your own task.

## The Decision

Serve at the **highest precision your memory and latency budget allows**, and quantize downward only as far as a task-specific eval shows quality holds. In practice: if the model fits comfortably at FP16 and quality is paramount, stay there. If you want throughput or cost headroom, **8-bit (INT8/FP8) is the safe first step** — near-lossless on most tasks, and FP8 is nearly free on recent hardware. If you are **memory-bound**, **4-bit (calibrated AWQ/GPTQ)** is the aggressive sweet spot that fits 70B-class models on a single card, and the key reframe is that a *stronger model at 4-bit frequently beats a weaker model at FP16* within the same VRAM. **Below 4-bit is specialist territory** — the quality cliff is real and unpredictable, justified only when extreme memory limits leave no alternative and your eval confirms the specific model tolerates it. Whatever level you pick, ship the *lowest precision that passed your eval*, not the lowest precision you read was fine.

## Decision Framework

The `decision_tree` in frontmatter encodes the logic. In plain language:

1. **Fit check.** Does the model fit VRAM at FP16 *with KV cache* for your real batch size and context length? If yes and quality is paramount, serve FP16. If yes but you want headroom, try 8-bit.
2. **Memory-bound path.** If it doesn't fit, ask whether a stronger model at 4-bit would fit and beat a weaker FP16 model — usually yes. Use calibrated 4-bit (AWQ/GPTQ).
3. **Extreme path.** If it doesn't fit even at 4-bit, consider sub-4-bit *only* if your eval tolerates it; otherwise choose a smaller model.
4. **Always eval.** Run a task-specific eval against the FP16 baseline. Ship the lowest precision that passed; if quality drops unacceptably, step back up one level.

## Approach Deep-Dives

**FP16/BF16** is the baseline and the reference for every eval — zero quantization error, highest VRAM cost. **8-bit (INT8/FP8)** halves memory at near-lossless quality and is the lowest-risk step down; FP8 on recent datacenter GPUs is effectively free in both quality and speed. **4-bit (AWQ/GPTQ/NF4)** quarters weight memory and is the practical enabler of large-model self-hosting; calibrated methods (AWQ, GPTQ) preserve more quality than naive NF4 rounding for a one-time calibration cost, and [Unsloth](../../tools/model-layer/unsloth.md), [vLLM](../../projects/inference-engines/vllm.md), and [llama.cpp](../../projects/inference-engines/llama-cpp.md) all support 4-bit serving. **Sub-4-bit** maximizes compression for edge/on-device but hits a steep, unpredictable quality cliff — [llama.cpp](../../projects/inference-engines/llama-cpp.md)'s k-quant family is the most battle-tested route, and even then it demands heavy per-model evaluation.

## Common Mistakes

- **Assuming "4-bit is basically free" and shipping without an eval.** Quality is model/method/task-dependent; the only valid evidence is a measured delta vs FP16 on your task.
- **Quantizing a model that already fits.** If you're not memory-bound, you're trading measurable quality for a saving you didn't need.
- **Naive 4-bit when calibrated AWQ/GPTQ was available.** Calibration preserves meaningful quality for a modest one-time cost.
- **Ignoring the KV cache.** A long-context, high-batch workload can be KV-cache-bound, not weight-bound — solve the real bottleneck (paged attention, KV-cache quantization), not just weight size.

## When This Guidance Might Be Outdated

The `emerging-consensus` rating reflects fast-moving methods. Re-check every 6-12 months: (1) new low-bit techniques and better kernels keep pushing the quality-preserving frontier lower, so the "sub-4-bit is specialist" line may soften for specific model families; (2) hardware-native formats (FP8, and emerging FP4/MXFP formats) change which precisions are "free" on current GPUs; (3) KV-cache quantization is maturing and increasingly shares the memory budget with weight quantization. The invariant that does *not* go stale: measure against an FP16 baseline on your own task before trusting any precision level.

## Related Decisions

Quantization is executed by the [serving stack](./choose-serving-stack.md) (which inference server and kernels you run), and it is often what makes [self-hosting open weights](../model-selection/self-host-vs-hosted-api.md) economically viable in the first place. Which base model you quantize is set by [choose-llm](../model-selection/choose-llm.md) — and the "bigger model at 4-bit vs smaller at FP16" trade links the two decisions directly.

## Resources

- [vLLM](../../projects/inference-engines/vllm.md)
- [TensorRT-LLM](../../projects/inference-engines/tensorrt-llm.md)
- [llama.cpp](../../projects/inference-engines/llama-cpp.md)
- [Unsloth](../../tools/model-layer/unsloth.md)
- [GPTQ: Post-Training Quantization for Generative Transformers](../../research/inference-and-efficiency/frantar-2022-gptq.md)
- [AWQ: Activation-aware Weight Quantization](../../research/inference-and-efficiency/lin-2023-awq.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
