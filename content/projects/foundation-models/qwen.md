---
id: qwen
name: Qwen
version_tracked: "3.8"
artifact_type: model
category: llms
subcategory: open-source-models
description: Alibaba's current open-weight flagship line (Qwen3.5, Qwen3.6, Qwen3.8) — hybrid gated-attention/MoE models with native vision and tunable reasoning depth
github_url: "https://github.com/QwenLM/Qwen3.8"
license: Apache-2.0
primary_language: Python
org_or_maintainer: "Alibaba Qwen team"
tags: [llm, inference, reasoning, code-gen, multimodal]
maturity: production
cost_model: open-source
github_stars: 4324
github_stars_last_30d: 0
trending_score: 60
last_commit: "2026-08-17"
docs_url: "https://qwen.ai/"
demo_url: "https://chat.qwen.ai/"
paper_url: null
paper_id: null
hf_url: "https://huggingface.co/collections/Qwen/qwen38"
model_sizes: ["0.8B", "2B", "4B", "9B", "27B", "35B-A3B", "122B-A10B", "397B-A17B", "2.4T-A95B"]
benchmark_scores: []
supports_quantization: true
supported_formats: [HF, GGUF, FP8]
api_compatible: openai
phase: foundation-model
domain: [language, vision, reasoning]
relation_to_stack: [deploy-as-is, build-on-top, study-and-reference]
health_signals: [org-backed, community-driven]
ecosystem_role:
  - "Alibaba's open-weight flagship line, released every few months with a dense small model and a sparse MoE large model in each generation, and the only major family that ships native vision at every size from 0.8B upward"
best_for:
  - You want one open-weight family that covers a laptop-sized 4B model and a Qwen-Max-class flagship under the same tokenizer and chat template, so prompt work transfers between the two
  - Long-horizon agentic coding is the workload — Qwen3.8-27B reports 61.7 on SWE-bench Pro and 79.0 on Qwen's own QwenSWEBench, both measured with the Claude Code harness rather than a bespoke scaffold
  - You need document, chart or screen understanding inside the same model that writes the code, instead of a separate VLM call per step
avoid_if:
  - Your jurisdiction or procurement rules exclude Chinese-origin models regardless of licence, which is a policy question no benchmark resolves
  - "You want a stable checkpoint to fine-tune once and forget: Alibaba ships a new generation roughly every two months and each one resets the tokenizer's special tokens, chat template and reasoning controls"
  - You need a licence you can pin to a specific artefact long-term — the GitHub repos carry no licence file and the terms live on each model card, so confirm per checkpoint rather than per family
upstream_dependencies: []
downstream_consumers: []
alternatives: [qwen-2-5, qwen3-vl, qwen3-omni, deepseek-v3-r1, kimi-k2]
integrates_with: [vllm, sglang, llama-cpp, transformers]
corresponding_tool_entry: null
enrichment_status: verified
enrichment_notes: "Verified 2026-10-25: QwenLM/Qwen3.8 repo (4,324 stars, 68 open issues, last push 2026-08-17); HF API for Qwen/Qwen3.8-27B shows license apache-2.0, 7.76M downloads, architecture Qwen3_5ForConditionalGeneration; README release timeline and model cards supply sizes, context length and benchmark numbers. Replaces the earlier entry that tracked the retired Qwen1 generation."
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Qwen is Alibaba's open-weight model line, and it now moves in small, frequent steps: Qwen3.5 in February 2026, Qwen3.6 in April, Qwen3.8 in August. Each generation ships a dense small model for local deployment and a sparse mixture-of-experts model for the top end — Qwen3.8 pairs a 27B dense model with a 2.4T-parameter, 95B-active model that the release notes describe as the first Qwen-Max-class model to be open-weighted.

The architecture is the part that changed most. Qwen3.5 replaced the plain transformer stack with a hybrid: Gated DeltaNet linear-attention blocks interleaved with gated full attention, in a 3:1 ratio (the 27B card shows sixteen repetitions of three DeltaNet-plus-FFN blocks followed by one gated-attention block), plus multi-token prediction during training. Vision is fused in pre-training rather than bolted on, so the 27B dense model takes images and video natively and reports 84.3 on OSWorld-Verified and 91.1 on OmniDocBench 1.5.

Context is 262,144 tokens natively and extensible to 1,000,000, and thinking is a per-request control: on by default, disableable, with `reasoning_effort` at `xhigh` (default), `medium` or `low`, and `preserve_thinking` deciding whether earlier reasoning stays in the conversation.

## Why it's in the Arsenal

Three properties make this line worth a catalog entry rather than a line in a model list.

It spans the deployment range with one vocabulary. The same family reaches from a 0.8B model that runs on a phone to a 2.4T MoE that needs a cluster, sharing a tokenizer and chat template. Prompt engineering, tool-call formats and evaluation harnesses transfer across that range, which is worth more in practice than a per-size leaderboard win.

Agentic coding is measured on someone else's harness. The Qwen3.8 card reports SWE-bench Pro at 61.7, Terminal-Bench 2.1 at 73.0 and DeepSWE 1.1 at 42.2 — all with the Claude Code harness at temperature 1.0, top-p 0.95 and a 256K window, with baselines re-run on the corrected task set. Numbers produced inside a vendor's own scaffold are the ones to discount; these at least name a harness you can reproduce.

The licence is permissive. Apache-2.0 on the Qwen3.8-27B card, no gate, 7.7M monthly downloads on that checkpoint alone — the widest quantisation and serving support of any open family, with 1,547 derivative quantisations listed for that single model.

## Architecture

Hybrid attention is the technical bet. Full attention over 256K tokens is quadratic in cost; Gated DeltaNet blocks are linear and carry state, and interleaving them 3:1 with gated attention keeps recall on long context at a fraction of the KV cache. The 27B model's layout is 64 layers: sixteen groups of three DeltaNet-plus-FFN blocks and one gated-attention block, with 48 linear-attention heads for values, 16 for queries-keys, and 24 query / 4 KV heads in the attention blocks (four-to-one GQA).

The vision encoder is native, not a projector on a frozen language model: the card lists the architecture as a causal language model with vision encoder, trained end-to-end on multimodal tokens. That is why vision benchmarks land close to text benchmarks rather than trailing them.

MoE at the top end is extremely sparse — 2.4T total with 95B active, and 397B-A17B before it — so the hardware question is memory capacity, not FLOPs. A 27B dense model is the sane starting point for a single 80GB node; the MoE checkpoints need multi-node serving.

Serving is not the vendor's problem to solve and Qwen knows it: the cards name Transformers, vLLM, SGLang and TokenSpeed as compatible, publish an FP8 checkpoint, and the README points at ModelScope mirrors with `VLLM_USE_MODELSCOPE=true` for networks that cannot reach Hugging Face.

## Ecosystem Position

The comparison that matters is against `deepseek-v3-r1` and `kimi-k2` — the other Chinese open-weight lines with strong agentic coding — and against `llama-3` and `gemma-3` for teams that need a Western provenance. Qwen's differentiator is cadence plus breadth: no other family ships a new generation every two months across 0.8B to 2.4T with native vision throughout, so the reason to pick it is coverage rather than any single benchmark row.

Inside this catalog, `qwen-2-5` covers the previous generation (Qwen2.5 and QwQ) and `qwen3-vl`, `qwen3-omni` and `qwen3-tts` cover specialised modalities. Those are narrower entries; this one is the general line.

Against hosted frontier models the honest framing is cost per completed task, not per token. A 27B dense model on your own GPU is cheap per call and expensive per engineer-hour of operations; the Qwen Cloud API exists for teams that want to skip the operations, and it is deliberately OpenAI- and Anthropic-compatible so switching costs stay low.

## Getting Started

```bash
pip install -U transformers accelerate
```

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_id = "Qwen/Qwen3.8-27B"
tok = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, dtype="bfloat16", device_map="auto")

messages = [{"role": "user", "content": "Summarise this stack trace and name the failing invariant."}]
text = tok.apply_chat_template(messages, tokenize=False, add_generation_prompt=True,
                               enable_thinking=True, reasoning_effort="medium")
out = model.generate(**tok([text], return_tensors="pt").to(model.device), max_new_tokens=1024)
print(tok.decode(out[0][len(tok(text)["input_ids"]):], skip_special_tokens=True))
```

For anything beyond a single request, serve it instead — the chat template is not something to reimplement in application code:

```bash
vllm serve Qwen/Qwen3.8-27B --max-model-len 262144 --reasoning-parser qwen3
```

The 27B dense model fits one 80GB accelerator at BF16 with limited context, or comfortably at FP8. Start with `reasoning_effort="low"` and raise it only where quality fails; the default `xhigh` spends a lot of tokens on problems that do not need them.

## Key Use Cases

1. **One model for the agent and the screenshot**: a browser or computer-use agent that both reads the rendered page and writes the patch avoids handing state between a VLM and a coder, which is where most agent pipelines lose the thread.
2. **Repo-level work at 27B**: SWE-bench Pro and Terminal-Bench numbers measured under Claude Code mean the model is usable inside an existing terminal agent rather than only through a bespoke harness.
3. **Sovereign or air-gapped deployment**: Apache-2.0 weights plus ModelScope mirrors mean a deployment with no access to US-hosted services is possible end to end, including the download.
4. **Long-document and video analysis**: a native 256K window with vision handles hour-scale video and multi-hundred-page documents without a chunking layer.
5. **Laptop-to-cluster parity**: prototype against the 4B or 9B, then move the same prompts and tool schemas to 27B or the MoE once the workload justifies the hardware.
6. **Fine-tuning base**: dense 27B under Apache-2.0 is a practical post-training target, and the 0.8B–9B sizes are small enough to iterate on a single GPU.

## Strengths

- Generation cadence is the strongest signal: three generations in seven months, each shipping both a dense and a sparse model, which means the line is not going to be abandoned mid-project.
- Native vision from 0.8B to 2.4T with early-fusion training, so document and screen understanding is a property of the family rather than a separate checkpoint choice.
- `reasoning_effort` and `preserve_thinking` expose the cost-quality dial per request; most open families make thinking a model variant rather than a runtime parameter.
- 262K native context with hybrid attention is a real architectural answer to long-context cost, not a positional-encoding stretch.
- Benchmarks reported on a named third-party harness (Claude Code, temp 1.0, 256K) with baselines re-run on corrected tasks — more honest than vendor-scaffold numbers.
- Apache-2.0 with no gate and enormous quantisation coverage, so llama.cpp, vLLM, SGLang and every consumer runtime support it on day one.

## Limitations

- **Fast cadence breaks things.** Special tokens, chat template variables and reasoning controls changed between 3.5, 3.6 and 3.8; prompt code written against one generation will misbehave on the next, often by silently dropping thinking blocks.
- **Benchmark table needs reading.** Several rows (QwenSWEBench, CoWorkBench, JobBench) are in-house benchmarks from the same organisation that ships the model; only the third-party rows should carry weight in a decision.
- **MoE checkpoints are a cluster purchase.** 2.4T parameters with 95B active is not a two-GPU deployment; the interesting sizes for most teams are the 27B dense and the 35B-A3B, and the flagship's numbers do not transfer down.
- **Licence is per-artefact.** The GitHub repositories have no licence file; terms live on each model card and have varied across Qwen generations, so a compliance review has to read the card for the exact checkpoint.
- **Provenance is a real procurement constraint.** Several jurisdictions and regulated sectors exclude Chinese-origin weights outright; that is a policy decision made before any technical comparison starts.
- **Vision quality is benchmark-shaped.** OSWorld and chart benchmarks improve faster than the long tail of scanned, rotated or low-resolution documents that production actually contains.

## Relation to the Arsenal

Deploy it with an inference engine in [Inference Engines](../inference-engines/_index.md) — `vllm` or `sglang` for throughput, `llama-cpp` for a single machine, `mlc-llm` for edge targets. Serve an OpenAI-compatible endpoint and the rest of the stack in [Frameworks](../frameworks/_index.md) treats it as a drop-in provider.

For the previous generation see `qwen-2-5`; for specialised modality siblings see `qwen3-vl`, `qwen3-omni` and `qwen3-tts`. For agent harnesses that consume this model well, see [Frameworks](../frameworks/_index.md) and [tools/dx-and-tooling/](../../tools/dx-and-tooling/_index.md).

## Resources

- [GitHub (Qwen3.8 release repository)](https://github.com/QwenLM/Qwen3.8)
- [Qwen3.8-27B model card](https://huggingface.co/Qwen/Qwen3.8-27B)
- [Qwen3.8-2.4T-A95B model card](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)
- [Qwen release blog](https://qwen.ai/blog)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
