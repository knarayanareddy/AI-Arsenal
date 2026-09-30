---
id: airllm
name: airllm
version_tracked: null
artifact_type: library
category: llms
subcategory: inference-engines
description: Runs 70B-plus checkpoints by streaming transformer layers from host RAM into a few GB of VRAM instead of quantizing weights
github_url: "https://github.com/lyogavin/airllm"
license: Apache-2.0
primary_language: Other
tags: [efficiency, inference, training]
maturity: beta
cost_model: open-source
github_stars: 35151
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: null
demo_url: null
phase: inference-engine
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Moves the weight-capacity problem to host memory and I/O bandwidth so a 4GB card can execute models no quantizer would leave intact."
best_for:
  - "You have a workstation with tens of gigabytes of system RAM and a small consumer GPU, and you want to execute a full-precision checkpoint that simply does not fit in VRAM."
  - "You are benchmarking a new release whose weights have no quantized derivative yet, and you need an answer before someone publishes a GGUF conversion."
  - "You are experimenting with training a very large model on a single card by keeping frozen weights streamed and adapters resident in device memory."
avoid_if:
  - "You need interactive latency, because per-token layer streaming makes generation I/O bound and roughly two to three orders of magnitude slower than a resident-weight runtime."
  - "You need throughput or concurrency, since AirLLM is a single-sequence, single-process inference path with no continuous batching, paged attention or OpenAI server."
  - "You have a storage-constrained machine, since large checkpoints can demand hundreds of gigabytes of disk during the splitting and conversion steps."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "GitHub API verified stars, license, primary language, topics, last commit, open-issue count and creation date. VRAM figures, disk requirements, dependency pins and code snippets come from the README and were not measured on this machine; no model was run."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

AirLLM is a Python library that changes where weights live rather than what they weigh. The checkpoint is split on disk into per-layer blocks, and during a forward pass only the layers needed for the current computation are resident in VRAM; everything else is read from host RAM or memory-mapped storage on demand. The README reports end-to-end measurements of Kimi K3 at 2.8T parameters running in 3.72GB of VRAM on an RTX 6000 Ada, Qwen3.8-Flash-Next at 125B in 5.95GB on an RTX 4090, and DeepSeek-V3 at 671B in roughly 12GB. For mixture-of-experts models it applies per-expert streaming, loading only the experts a token actually routes to. Since the 2026/09 release the same streaming strategy extends to training: frozen base weights are streamed one layer at a time while trainable adapters stay on the GPU, which the project reports lets Qwen3.8-27B train in about 2GB of VRAM at sequence length 512.

## Why it's in the Arsenal

The default answer to a model that will not fit is quantization: round weights to four bits, or distill, or prune. All three change the model's numerics, and on a release day a new checkpoint may have no conversion available at all. AirLLM takes the other route and treats host RAM as an extension of VRAM, accepting slow execution in exchange for exact full-precision weights. That trade is worth making in a narrow band of situations: evaluating a model you cannot afford to serve, confirming that a quantization did not damage a capability you care about, or getting a first training signal from a checkpoint that no accelerator can hold. The recurring decision it removes is the false choice between not running the model and running a degraded copy.

## Architecture

The pipeline starts offline, where a checkpoint is split into sequential layer blocks written as separate files; the README notes that roughly 360GB of disk is involved for a 125B-class model and that a delete_original option reclaims the source files after splitting. At inference time a scheduler walks the model's layer graph, issuing host-to-device copies for the weights a layer needs, executing that layer's matmuls, and evicting the block once the layer completes. Mixture-of-experts models take a more selective path: the router selects top-k experts per token and only those expert weight blocks are streamed, so activation parameters scale with the number of routed experts rather than total parameters. Large embedding tables are handled by file-mapping them on the host instead of loading them. The training path reuses the same machinery with a different residency policy: the frozen backbone is streamed layer by layer and gradients accumulate only into adapter parameters that stay resident in VRAM.

## Ecosystem Position

It is an alternative to the quantization-first path that llama.cpp, ollama and gguf take, and to the hardware-first path that vLLM and SGLang take. Those runtimes buy speed by shrinking or parallelizing weights; AirLLM buys reach by accepting a full-precision checkpoint on undersized hardware, so it competes with them only when the model does not fit under any quantization you would accept. It overlaps with candle for the small-model case and with LM Studio for the interactive case, but it is not a server: there is no HTTP surface to compare against vLLM's OpenAI-compatible endpoint. In practice it complements rather than replaces the serving engines in content/projects/inference-engines, since the interesting question is often whether a model passes a capability test at all before you spend GPU weeks on the compressed deployment path.

## Getting Started

Install the package, place the checkpoint where the library can split it, and load the model. The split step writes per-layer files and is the slow, disk-hungry part of the workflow.

```bash
pip install airllm
```

```python
from airllm import AutoModel

model = AutoModel.from_pretrained(
    "openai-community/gpt2-large",
    load_in_4bit=False,
    compression_level=None,
)
out = model.generate(prompt=[{"role": "user", "content": "hello"}], max_length=64)
print(out[0]["choices"][0]["message"]["content"])
```

Note the pin requirements in the README: Kimi K3 needs compressed-tensors and flash-attn, a CUDA 12 build of torch, and transformers 4.56.x, while Qwen3.8 support needs transformers 5.8 or newer. A Jupyter notebook is the primary artifact in the repository, so expect to work from the example notebooks first.

## Key Use Cases

1. Capability triage on a brand-new release: confirm a 70B or larger checkpoint behaves as its model card claims before committing GPU time to a quantized deployment.
2. Memory-constrained research laptops: execute a large model on a 4GB consumer card by accepting host-RAM and disk I/O as the bottleneck.
3. Adapter-only experimentation: train small adapters against a 125B-class backbone that never fully resides on the GPU, keeping only trainable parameters in device memory.

## Strengths

- No quantization, distillation or pruning, so results reflect the released weights rather than a lossy derivative.
- Per-expert streaming makes mixture-of-experts models tractable, since only routed experts are fetched.
- Host RAM and disk become the scaling axis, which is the resource most workstations have in surplus.
- The same streaming machinery now covers training, letting adapters be fit against backbones that no single accelerator can hold.

## Limitations

Speed is the trade you pay, and it is severe: each layer block crosses the PCIe bus on every forward pass, so generation is bound by storage bandwidth rather than FLOPs, making interactive use impractical. AirLLM is a library, not a serving system, so there is no continuous batching, no paged KV cache, no multi-client endpoint and no tensor or pipeline parallelism to recover throughput. The operational profile is unpleasant: hundreds of gigabytes of intermediate checkpoint files, host RAM sized to the whole model, and a per-model matrix of dependency pins that frequently conflict, since the README lists different transformers versions for different checkpoints. Version support is reactive, and anything not yet on the update list simply does not run. There is no quantization path to fall back on when even host RAM is insufficient.

## Relation to the Arsenal

This entry belongs next to the serving engines in content/projects/inference-engines, where vLLM and SGLang assume weights are resident and fast, and next to content/projects/foundation-models, where the checkpoint being streamed usually lives. In the model-layer tooling that content/tools/model-layer covers, tools like llmfit answer which quantized model fits your hardware, while AirLLM answers a narrower question: what runs at all when the answer is none of them. Compare it with the training entries in content/projects/training-and-alignment when the streamed-backbone adapter path is the real interest, since mainstream trainers assume a different memory hierarchy.

## Resources

- [Repository and quickstart](https://github.com/lyogavin/airllm)
- [PyPI package airllm](https://pypi.org/project/airllm/)
- [FAQ and configuration notes in the README](https://github.com/lyogavin/airllm#faq)
