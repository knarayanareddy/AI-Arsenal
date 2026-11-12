---
id: sglang
name: SGLang
version_tracked: null
artifact_type: platform
category: llms
subcategory: inference-engines
description: LMSYS inference framework with RadixAttention prefix caching, compressed-FSM constrained decoding and rollouts for RL — LLM, VLM and diffusion in one package
github_url: "https://github.com/sgl-project/sglang"
license: Apache-2.0
primary_language: Python
org_or_maintainer: "LMSYS"
tags: [llm, inference, batching, multimodal]
maturity: production
cost_model: open-source
github_stars: 38200
github_stars_last_30d: 0
trending_score: 60
last_commit: "2026-10-26"
docs_url: "https://docs.sglang.io/"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: true
supported_formats: [HF, FP8, AWQ, GPTQ]
api_compatible: openai
phase: inference-engine
domain: [language, vision]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, community-driven, actively-maintained]
ecosystem_role:
  - "The serving engine for workloads where the prompt, not the model, is the shared resource: a radix tree over the KV cache makes repeated system prompts, RAG context and agent prefixes nearly free, and the same engine now covers image generation and RL rollouts"
best_for:
  - Your traffic shares long prefixes — a fixed system prompt, a repeated document, a multi-turn conversation, an agent loop with the same tool schemas — and you want the second and later requests to skip that prefill work entirely
  - "Structured output is on the critical path: JSON schemas and grammars are compiled to a compressed finite-state machine and decoding jumps over deterministic spans, so constraint enforcement does not collapse throughput at batch"
  - You are generating rollouts for RL post-training — `verl`, Miles, slime, AReaL and Tunix all drive SGLang as the generation backend, which makes it the default in that loop
avoid_if:
  - You want the least surprising, most widely documented serving path — `vllm` has the larger tutorial corpus and the more predictable integration story, at the cost of some prefix-cache efficiency
  - You need AWS Trainium today — it is listed as an integration in progress, not a supported platform, and an in-progress backend is not a deployment target
  - You want a small, single-purpose serving dependency — this package now carries diffusion and audio engines alongside the LLM path, and you install all of it
upstream_dependencies: []
downstream_consumers: [verl]
alternatives: [vllm, tensorrt-llm, lmdeploy, lightllm, exllamav2]
integrates_with: [vllm, guidance, outlines, flashinfer-ai-flashinfer]
corresponding_tool_entry: null
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-26: 38,200 stars, 6,202 open issues, Apache-2.0, pushed same day. README now lists NVIDIA (Blackwell/GB200/H100/MI-series rivals aside), AMD MI355X, Google TPU v6e/v7, Intel Arc and Xeon, Apple Silicon and Huawei Ascend as supported — the earlier 'no Intel/TPU/Trainium' claim was wrong. CLI is `sglang serve`; docs moved to docs.sglang.io."
added_date: "2026-06-13"
last_reviewed: "2026-10-26"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"hackernews","url":"https://techsy.io/en/blog/vllm-vs-sglang","date":"2026-06-13","description":"Independent 2026 benchmark comparison: SGLang shows ~29% higher throughput than vLLM on 7B-8B models on H100 GPUs, with lower tail latency and better structured-output performance"}
featured: false
status: active
---

## Overview

SGLang is LMSYS's open-source serving framework, and its original thesis is still the one to evaluate it on: in real deployments the prompt is what repeats. A fixed system prompt, a retrieved document, a growing conversation history, a tool schema — the same tokens arrive at the front of request after request. RadixAttention keeps the KV cache in a radix tree indexed by token, so a new request matches the longest existing prefix and resumes computation from there instead of re-running prefill.

Around that core the project has grown well past a chat-completions server. The same repository now contains SGLang Diffusion for image and video generation, and SGLang Omni for text-to-speech and speech recognition, with the package positioning itself for "agentic workloads, large-scale serving, and RL rollouts". That last phrase is doing real work: `verl`, Miles, slime, AReaL and Tunix all use SGLang as their rollout generator, which means a large share of open RL post-training runs through this engine.

Governance is worth noting: it is hosted by LMSYS, a non-profit, with Apache-2.0 licensing and enterprise contact channels — a different shape from a vendor-led project.

## Why it's in the Arsenal

Two mechanisms, both measurable, separate SGLang from the serving crowd.

Prefix reuse attacks a cost that scales with traffic rather than with model size. If 90% of your prompt is identical across requests, vLLM's automatic prefix caching helps and SGLang's radix-indexed cache helps more, because it matches at token granularity across many requests and keeps the tree rather than evicting per block with a simpler policy. For an agent that sends the same 4,000-token tool preamble on every step, this is not a micro-optimisation — it is the difference between paying for 4,000 tokens of prefill repeatedly and paying once.

Constrained decoding is the second. Grammar- and schema-bound output usually forces a trade: you either accept invalid generations and retry, or you mask logits with a finite-state machine and watch throughput drop as the mask work serialises against the GPU. SGLang compiles the grammar to a compressed FSM and jumps over deterministic spans, overlapping mask construction with inference. Teams that serve JSON-mode at volume report the difference as throughput, not latency — which is the metric that decides whether the endpoint is affordable.

## Architecture

The engine is a Python frontend over a C++/CUDA runtime with attention kernels from FlashInfer among others; the project acknowledges design and code reuse from Guidance, vLLM, LightLLM, FlashInfer, Outlines and LMQL, which is an unusually honest lineage note and explains why its structured-output and scheduling behaviour resembles several predecessors.

RadixAttention is the scheduling idea: the KV cache is not a set of per-request blocks but a tree of shared prefixes, and eviction, matching and reuse operate on that tree. Continuous batching sits on top, so new requests join a running batch and finished ones leave.

Serving is a single command on port 30000, and the launch surface is the CLI rather than a Python module path: `sglang serve <model> --host 0.0.0.0 --port 30000`. Multi-node and expert-parallel launches are expressed as additional flags, and the cookbook publishes a per-model, per-hardware launch line rather than asking you to derive one.

Hardware coverage in late 2026 is much broader than the earlier version of this entry claimed: NVIDIA Blackwell through Jetson, AMD MI300X–MI355X, Google TPU v6e/v7 through SGLang-TorchTPU and SGL-JAX, Intel Arc and Xeon, Apple Silicon via Metal/MLX, Huawei Ascend and Moore Threads. AWS Trainium, Qualcomm QAIC, Cambricon and several others are listed as in progress.

## Ecosystem Position

Against `vllm` the honest framing is that they are converging on features and diverging on defaults. vLLM has broader documentation, more third-party integrations and the safer adoption story; SGLang tends to be faster on prefix-heavy and constrained-output workloads and is now the engine RL frameworks reach for. Benchmark claims in both directions should be reproduced on your own traffic — the published comparisons, including the one cited here, are harness-dependent.

Against `tensorrt-llm` the split is compilation versus portability: TensorRT buys peak throughput on NVIDIA by compiling per model and per GPU generation, while SGLang trades some of that ceiling for running the same code across eight hardware families.

`lmdeploy` and `lightllm` occupy similar ground with smaller ecosystems. `exllamav2` is the single-user NVIDIA speed option. Inside this catalog, `verl` and `openrlhf` consume SGLang as a rollout backend, `lmsys`-adjacent tooling shares its assumptions, and `vllm` remains the entry most teams compare against first.

The scope decision is the new variable: a diffusion engine and an audio engine inside the same package make SGLang a plausible single backend for a multimodal product, and a heavier dependency for a team that only wanted text.

## Getting Started

```bash
docker pull lmsysorg/sglang:latest

docker run --rm --gpus all --ipc=host -p 30000:30000 \
  lmsysorg/sglang:latest \
  sglang serve Qwen/Qwen3-0.6B --host 0.0.0.0 --port 30000
```

Or in a Python environment — note that the project itself tells you to allow pre-releases:

```bash
uv pip install --prerelease=allow sglang
sglang serve Qwen/Qwen3.6-27B --host 0.0.0.0 --port 30000
```

```bash
curl http://localhost:30000/v1/chat/completions -H "Content-Type: application/json" \
  -d '{"model":"Qwen/Qwen3.6-27B","messages":[{"role":"user","content":"hello"}]}'
```

`--ipc=host` is not optional for multi-GPU work: the engine shares KV cache between processes and the default shared-memory limit will fail it. For per-model launch flags — tensor parallelism, expert parallelism, attention backend — use the cookbook rather than guessing, and wait for the `fired up and ready to roll` line before benchmarking anything.

## Key Use Cases

1. **Agent loops with large fixed preambles**: the same tool definitions and system prompt on every step, where radix caching converts a repeated prefill cost into a tree lookup.
2. **RAG with shared context**: one document fanned out into many questions — the document's KV entries are computed once and reused across the batch.
3. **JSON-mode and grammar-bound extraction at volume**: compressing the grammar to an FSM keeps constrained decoding from becoming the bottleneck once the batch grows.
4. **RL rollout generation**: the rollout half of GRPO/PPO training, which is why the RL frameworks in this catalog integrate it directly.
5. **Multi-hardware deployment**: one serving stack across NVIDIA, AMD, TPU, Intel and Ascend, which matters when procurement gives you what it gives you.
6. **Image and video generation from the same service**: SGLang Diffusion inside the same package means a multimodal product does not need a second inference stack.
7. **Multi-turn chat with growing histories**: each turn's prefix is a prefix of the next, which is the workload the radix tree was designed around.

## Strengths

- RadixAttention is a genuine architectural advantage on prefix-heavy traffic, not a tuning flag — it changes the cost curve rather than the constant.
- Compressed-FSM constrained decoding keeps structured output affordable at batch sizes where logit-masking implementations collapse.
- Hardware breadth is now exceptional: NVIDIA, AMD, Google TPU, Intel GPU and CPU, Apple Silicon, Huawei Ascend and Moore Threads from one codebase.
- It is the de facto rollout backend for open RL post-training, so the integration work for that loop is already done.
- LMSYS non-profit hosting with Apache-2.0 is a governance shape that survives an acquisition or a commercial pivot.
- The cookbook publishes ready-to-run launch commands per model and hardware, which removes the most common source of failed first attempts.

## Limitations

- **6,202 open issues.** The largest backlog in the catalog, and it reflects both velocity and a support model where the community answers most questions. A niche bug on unusual hardware can sit for a long time.
- **Release discipline asks you to accept pre-releases.** Installing with `--prerelease=allow` is the documented path, which tells you how often breaking changes land; pin the exact version in production.
- **Scope creep makes the dependency heavy.** Diffusion and audio engines ship in the same package as the LLM server, so a text-only deployment still installs and configures them.
- **Primary path assumes recent Linux and CUDA.** The documented quickstart targets Linux with a CUDA 13-compatible driver; the other backends exist but carry their own setup burden.
- **Performance claims need reproduction.** Published comparisons, favourable and unfavourable, use different harnesses, batch sizes and prefix ratios; the win on your traffic may be large, small, or absent.
- **Prefix caching rewards repetition and punishes diversity.** If every request carries a unique long prompt and no shared preamble, the radix advantage largely evaporates and the comparison with vLLM becomes a wash.
- **Trainium is not there yet.** It appears as an integration in progress; a plan that depends on it is a plan without a supported backend.

## Relation to the Arsenal

The direct comparison is `vllm` — read both before choosing, and treat the decision as depending on your prefix-sharing ratio and whether structured output is load-bearing. `tensorrt-llm` is the peak-throughput, NVIDIA-only alternative; `lmdeploy` and `lightllm` are the smaller-ecosystem options; `llama-cpp` is the single-machine path.

For the RL loop that consumes it, see `verl` and `openrlhf` in [Training and Alignment](../training-and-alignment/_index.md). For structured-output libraries it compiles from, see `outlines` and `guidance`; for the attention kernels, `flashinfer-ai-flashinfer`.

## Resources

- [GitHub](https://github.com/sgl-project/sglang)
- [Documentation](https://docs.sglang.io/)
- [Cookbook (per-model launch commands)](https://cookbook.sglang.io/)
- [Quickstart](https://docs.sglang.io/docs/get-started/quickstart)
- [SGLang Diffusion](https://docs.sglang.io/docs/sglang-diffusion)
- [Roadmap](https://roadmap.sglang.io/)
