---
id: llamafactory
name: LLaMA-Factory
type: tool
job: [fine-tuning]
description: "No-code and CLI fine-tuning for 100+ open LLMs and VLMs — SFT, DPO and PPO with a Gradio web UI, merge/export and quantised deployment"
url: "https://github.com/hiyouga/LlamaFactory"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [fine-tuning, llm, pytorch]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/hiyouga/LlamaFactory"
docs_url: "https://github.com/hiyouga/LlamaFactory"
github_url: "https://github.com/hiyouga/LlamaFactory"
alternatives: [axolotl, mlx-lm, peft, torchtune, unsloth]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-10-26"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [research, prototype]
best_when:
  - You want a unified UI plus CLI to fine-tune a very wide range of open models without writing custom training code
  - You're prototyping and want to compare fine-tuning methods (LoRA, full, RLHF-style) quickly via the web UI
avoid_when:
  - You need a minimal, scriptable, CI-friendly fine-tuning pipeline (the broad UI surface adds overhead)
  - You require long-term, narrowly-scoped production training infra rather than a general-purpose toolkit
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** the fastest path from a dataset to a fine-tuned checkpoint. A Gradio UI and one CLI cover SFT, DPO and PPO over 100+ model templates, with merge and export built in; the UI is for exploration, not for production runs.

## Overview

A unified fine-tuning framework with both a web UI and CLI, supporting a very broad set of open models and training methods so teams can experiment without building custom training scripts.

## Why It's in the Arsenal

The barrier to a first fine-tune is rarely the maths; it is the day spent wiring a trainer, a dataset format and an export path. LLaMA-Factory is in the Arsenal because it collapses that day into a CLI call and a browser UI over 100+ model templates, which makes fine-tuning something a team can evaluate before it commits to infrastructure — and the merge/export path means the result reaches a runtime instead of stopping at a checkpoint.

## Key Features

- Web UI for no-code fine-tuning experiments
- Broad model-family and training-method coverage
- Built-in evaluation and export tooling

## Architecture / How It Works

Training jobs are configured through the UI or CLI and dispatched to underlying Transformers/PEFT/DeepSpeed training loops, with results exportable as merged or adapter checkpoints.

## Getting Started

Install the Python package and its runtime dependencies first, then make one call to confirm the credentials, network path and configuration are reachable before wiring LLaMA-Factory into anything else. The command below runs against the `fine-tuning` job and returns a result you can inspect directly.

```bash
pip install llamafactory
```

Follow the official documentation at https://github.com/hiyouga/LlamaFactory for the authentication and configuration options, because the defaults in the quickstart are the ones most likely to need changing for real traffic.

## Use Cases

1. **Getting a first fine-tune running the same day**: `llamafactory-cli` plus LlamaBoard means SFT, DPO or PPO on a supported model without writing a training loop, which is the right trade for a team testing whether fine-tuning helps at all.
2. **Teams where the trainer is not an ML engineer**: the web UI exposes dataset selection, method and hyperparameters, so a domain expert can run an experiment and hand the config back.
3. **One interface across a large model zoo**: 100+ model templates, including vision-language models, behind the same CLI removes the per-family script sprawl that accumulates in research repos.
4. **Adapter experiments before committing to infrastructure**: LoRA and QLoRA runs on a single GPU are cheap enough to answer "is this dataset any good" before anyone books a cluster.
5. **Exporting to the runtime you deploy on**: merging adapters or exporting quantised checkpoints is part of the tool, so the trained artefact reaches llama.cpp or an inference server without a second pipeline.
6. **Teaching and workshops**: a browser UI and a Colab notebook that actually train something are a better introduction than a config schema.

## Strengths

- Zero-code entry point with a real CLI underneath: the UI configures the same run the CLI executes, so a UI experiment is reproducible as a command.
- Model coverage is the widest in this phase — 100+ families plus multimodal support, updated quickly after upstream releases.
- One tool for SFT, DPO and PPO, with merge and export built in, which collapses three scripts into one.
- Credible industrial adoption: the README cites Amazon SageMaker HyperPod, NVIDIA and Aliyun PAI usage, and the accompanying paper has over 1,000 citations.
- Docker images, Colab and ModelScope/Demo links make the first run a five-minute affair rather than a dependency project.
- Apache-2.0 and 75.7k stars: the community answers questions that the docs do not.

## Limitations / When NOT to Use

- **1,205 open issues.** Adoption this broad outruns triage; expect to diagnose your own failures, and expect some model templates to be stale relative to upstream.
- **The UI hides what still has to be understood.** Multi-GPU, DeepSpeed configs and ZeRO stages are advanced settings a beginner will eventually need to reason about — the UI delays that learning rather than removing it.
- **Less control over exotic configurations.** Techniques that Axolotl exposes as first-class keys (expert parallelism variants, NVFP4 MoE LoRA, selective activation checkpointing) may need code changes here.
- **It is a training front end, not a serving stack.** Merge, export and then hand off; nothing here runs inference for you.
- **Rapid release cadence with a broad surface.** Pin the version and read the changelog: option names and defaults move between releases.
- **The "zero-code" promise ends at a custom dataset format.** Non-trivial data (multi-turn tool traces, interleaved images) still requires reading the dataset documentation carefully.

## Integration Patterns

- *Wiring*: `llamafactory-cli train config.yaml` in CI or on a workstation, with the exported checkpoint as the artefact; LlamaBoard for exploration only, never as the system of record.
- *Underneath*: Transformers, PEFT and DeepSpeed do the work — `deepspeed` for ZeRO and offload, `peft` for adapter maths, and `axolotl` is the closest configuration-first alternative.
- *Alternatives*: `mlx-lm` on Apple Silicon, `torchtune` for a readable PyTorch recipe, hosted fine-tuning APIs when the dataset is small and the schedule matters more than control.
- *Downstream*: export to GGUF for llama.cpp and Ollama, or serve adapters through `vllm` and `sglang` multi-LoRA endpoints.

## Resources

- [Primary site](https://github.com/hiyouga/LlamaFactory)
- [Documentation](https://github.com/hiyouga/LlamaFactory)
- [Source](https://github.com/hiyouga/LlamaFactory)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for fine-tuning.

---
*Last reviewed: 2026-06-30 by @maintainer*

