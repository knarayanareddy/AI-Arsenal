---
id: blinkdl-rwkv-lm
name: "RWKV-LM"
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: "RNN-architecture language model that trains in parallel and decodes one token at a time with no KV cache"
github_url: "https://github.com/BlinkDL/RWKV-LM"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "BlinkDL"
tags: [attention, llm]
maturity: beta
cost_model: open-source
github_stars: 14729
github_stars_last_30d: 0
trending_score: 33
last_commit: "2026-09-21"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain: [language]
relation_to_stack: [deploy-as-is, study-and-reference]
health_signals: [actively-maintained]
ecosystem_role:
  - "RNN-architecture language model with constant-memory decoding per token, positioned as the alternative to attention when inference cost per token must stay flat."
best_for:
  - "You are serving a long-context or streaming workload and need per-token latency that does not grow with sequence length."
  - "You have fixed memory and want a model whose state is O(1) in context length, so one GPU holds a much longer effective context than attention would allow."
  - "You are interested in non-transformer sequence modelling and want a trained model family plus reference implementations to study the design."
avoid_if:
  - "You need the strongest quality on short, prompt-heavy tasks, where dense attention models generally lead on benchmarks and tool-calling reliability."
  - "Your serving stack depends on standard transformers-compatible tensor layouts, because the architecture needs its own kernels and conversion path."
  - "You need the deepest pretrained open-weight ecosystem, since available RWKV checkpoints and quantisations number in the low tens rather than thousands."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (14729), Apache-2.0, last commit 2026-09-21, Python, and the topic list were API-verified; no homepage field. The RWKV-7 delta-rule update, parallel training formulation, infctx trainer, and no-KV-cache decoding come from the official README and repo code. Benchmark-gap statements are read from published comparisons, not reproduced here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/BlinkDL/RWKV-LM", "date": "2026-09-28", "description": "14,729 stars and last commit 2026-09-21 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

RWKV is a decoder-only language model whose architecture replaces self-attention with a linear-attention formulation expressed as a recurrence, so each layer maintains a fixed-size state vector rather than materialising keys and values for the whole prefix. Because the recurrence is associative, training parallelises exactly like a transformer — every position in a batch computes in parallel — while inference unrolls the recurrence one step at a time. The repository is the reference implementation of the model family rather than a training framework: it contains the model definitions, checkpoints, the infctx trainer, and the rwkv.cpp and related inference paths. The generation is at RWKV-7, called Goose, which evolves the state update with a per-channel learned decay and a delta-rule formulation so the recurrent state can rewrite itself rather than only decay. Sentence embeddings come free by running the model over text and reading the state, which is why the architecture shows up in retrieval experiments that avoid a separate encoder.

## Why it's in the Arsenal

The recurring decision is whether inference cost may grow with context length. In a transformer, every new token attends over the entire prefix, so latency rises and the key-value cache grows without bound — a long-context deployment pays in both speed and memory until limits like paged attention or sliding windows intervene. RWKV removes that term: the state is a fixed vector per layer, so cost per token is constant and memory is flat no matter how far the context runs. That is what makes single-token streaming, very long documents, and tiny-memory edge deployment structurally possible rather than a matter of optimisation tricks.

## Architecture

Each block replaces attention with a channel-mixing and time-mixing structure over the hidden dimension. The channel mix is a position-wise feed-forward pass driven by the current token embedding; the time mix is where the recurrence lives, computing keys, values, receptances, and a per-channel decay rate so the output is a gated combination of the previous state and the current value, with the state carried forward. Because the update is a fixed function of state, input, and a token-dependent modulation, the whole sequence can be evaluated in parallel during training using a cumulative formulation, and the same weights unroll step by step at inference with no cache. RWKV-7's contribution is making that update a delta rule with an explicit learned erase and write per channel, so the state performs a key-value lookup against its own content rather than only blending, which is what narrows the quality gap on recall-heavy tasks. Conversion tooling maps trained weights into the format the C inference paths use, and the infctx trainer addresses memory during parallel training of very long sequences.

## Ecosystem Position

RWKV is the main non-attention alternative inside the decoder-only space, competing with Mamba and other state-space models as well as with the transformer it deliberately steps around. It overlaps with the llama.cpp ecosystem only indirectly, since the architecture needs its own kernels rather than the standard tensor path, though ports exist. Against Mamba, RWKV has the longer public track record and more published checkpoints; against Mamba-2 and newer hybrids, RWKV's parallel training story is more mature while its inference-kernel ecosystem is thinner. It is an alternative to attention rather than a complement to it, and for ordinary chat quality today a dense attention model of the same size class is usually the safer default; where RWKV wins is specifically flat per-token cost at long context.

## Getting Started

Load a published checkpoint through the official usage snippet, then sample a continuation:

```bash
git clone https://github.com/BlinkDL/RWKV-LM && cd RWKV-LM
pip install -r requirements.txt
```

```python
import torch
from transformers import AutoTokenizer
from rwkv.model import RWKV

tokenizer = AutoTokenizer.from_pretrained("BlinkDL/rwkv-7-world", trust_remote_code=True)
model = RWKV.from_pretrained("Blinkdl/rwkv-7-world", strategy="cuda:8", precision="bf16")

ids = tokenizer("The history of computing began", return_tensors="pt").input_ids.cuda()
state = None
for tok in model.generate(ids[:, :1], max_new_tokens=200, state=state, temperature=0.7):
    print(tokenizer.decode(tok[0]), end="", flush=True)
```

Generation unrolls the recurrence one step at a time, so there is no `kv_cache` argument to pass — that absence is the architecture talking.

## Key Use Cases

1. A streaming long-document assistant where tokens must be produced at a constant rate and a long context must fit on one modest GPU.
2. Edge or on-device language tasks with a hard memory ceiling where an attention model's key-value cache would dominate footprint.
3. Research on linear-attention and state-space sequence models, using the released checkpoints as a working reference alongside Mamba-style implementations.

## Strengths

- Constant per-token inference cost and O(1) memory in context length, which no KV-caching decoder can match.
- Training parallelises like a transformer despite the recurrent formulation, so wall-clock training is comparable to dense attention.
- A public checkpoint family spanning multiple sizes and languages, plus a documented generation contract.
- State vectors double as sentence embeddings, giving a free encoder for retrieval experiments.


## Limitations

Quality on knowledge, reasoning, and instruction-following benchmarks trails same-size dense attention models, particularly on recall and multi-step reasoning, which matters for agent and tool-calling workloads. The ecosystem is far thinner: fewer checkpoints, fewer quantisations, and fewer maintained serving integrations, so you own more of the runtime work. Parallel training of long contexts still needs the specialised infctx trainer and its memory tricks, and HF integration relies on custom remote code rather than a native architecture in the standard library. The parallel formulation is mathematically subtle, so bugs in a custom port are hard to spot, and the model's benefits are concentrated in exactly the workloads where the tooling is least mature.

## Relation to the Arsenal

This is the foundation-model entry that answers the same question llama-3, qwen, and mistral-models answer with attention, and reading it alongside those is the useful comparison: same interface, different cost profile. In the inference-engine folder, llama-cpp and the rwkv.cpp ports matter for what exists of the local runtime story, and ollama is the packaging comparison for how much of a new model family you get for free. Upstream in content/projects/training-and-alignment, the training entries cover the fine-tuning path this family lacks relative to attention-based models, which is the practical reason most teams stay on transformers.

## Resources

- [RWKV-LM GitHub repository](https://github.com/BlinkDL/RWKV-LM)
- [RWKV official site and model zoo](https://rwkv.ai)
- [RWKV Hugging Face organisation](https://huggingface.co/blinkdl)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (14,729 stars, last commit 2026-09-21, license Apache-2.0, verified via GitHub API on 2026-09-28)*
