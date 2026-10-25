---
id: phi-cookbook
name: Phi Cookbook
version_tracked: null
artifact_type: library
category: llms
subcategory: open-source-models
description: "Microsoft's Phi course: inference, quantization and fine-tuning recipes for the Phi family across ONNX, MLX, Ollama, NIM and mobile"
github_url: "https://github.com/microsoft/PhiCookBook"
license: MIT
primary_language: Python
org_or_maintainer: null
tags: [llm, inference, quantization, edge, local]
maturity: production
cost_model: open-source
github_stars: 3902
github_stars_last_30d: 0
trending_score: 40
last_commit: "2026-10-21"
docs_url: "https://github.com/microsoft/PhiCookBook#readme"
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain: [language, vision]
relation_to_stack: [study-and-reference, fork-and-adapt]
health_signals: [org-backed, actively-maintained, community-driven]
ecosystem_role:
  - "The vendor's own worked examples for putting a small model on an unusual target: Phi on iOS, Android, Jetson, an AI PC, or quantized to 4 bits with llama.cpp"
best_for:
  - You are deploying a Phi model to an edge target (iOS, Android, Jetson, AI PC, Rust binary) and want the vendor's own worked example instead of deriving the export path from three other projects' READMEs
  - You need to pick a quantization route for Phi — llama.cpp, ONNX Runtime GenAI, OpenVINO or MLX — and want the same model exercised through each before committing
  - You want a self-contained local RAG sample (SQLite FTS5 plus phi-4-mini) that runs with no cloud dependency as a starting point
avoid_if:
  - You want the weights, the model card or a changelog — this repository contains none of those, and the models ship from Hugging Face and Foundry catalogues
  - You need recipes for a non-Phi model family; the paths assume Phi's ONNX and GGUF conversions, its chat templates and its tokenizer
  - You need a supported library with an API contract, since sample notebooks are updated in place and carry no compatibility promise
upstream_dependencies: []
downstream_consumers: []
alternatives: [phi-4]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Re-verified 2026-10-25: GitHub API 3902 stars, 18 open issues, last push 2026-10-21, MIT. Read against the README's table of contents, which lists the inference targets (HF, Foundry, Ollama, AITK, NIM, Foundry Local, iOS, Android, Jetson, AI PC, MLX, Rust, Kaito) and the four quantization routes. artifact_type corrected from model to library: this repository ships no weights."
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Phi Cookbook is Microsoft's course-shaped sample repository for the Phi family: markdown modules and Jupyter notebooks arranged as Introduction, Application, QuickStart, Fine-tuning and Hands-On Labs. It is not a library and it ships no weights. What it contains is the answer to "how does this small model actually get onto that device" — an inference module per target, a quantization module per toolchain, and application samples that put the result behind a UI.

The scope is wider than "notebooks for a language model" suggests. The inference section covers Hugging Face Transformers, GitHub Models, the Foundry model catalogue, Ollama, the AI Toolkit for VS Code, NVIDIA NIM and Foundry Local, then goes to iOS, Android, Jetson, AI PCs, Apple MLX, a local server, Rust, and Phi-Vision. The quantization section does the same for llama.cpp, ONNX Runtime GenAI, Intel OpenVINO and MLX.

## Why it's in the Arsenal

Small-model deployment fails at the edges, not in the middle: the model runs fine in a Python notebook and then the iOS build needs a tokenizer conversion, the Jetson needs a specific CUDA and TensorRT combination, and the AI PC needs an NPU-aware runtime. Those steps are documented nowhere in a model card and are usually reconstructed from three unrelated blog posts.

This is the entry that carries them, from the vendor, for one family. It is also the most honest comparison surface for quantization on Phi: four toolchains, the same checkpoints, with the trade-offs stated per route rather than as a leaderboard. Read it beside `phi-4` — that entry covers the model, this one covers what it takes to run it somewhere unusual.

## Architecture

The repository is a document tree with code attached, and the split is deliberate. `md/01.Introduction` holds the narrative modules — the family overview, environment setup, key technologies, AI safety, hardware support, platform availability, and a Guidance-constrained generation example. Each numbered module links out to a `code/` directory containing the notebook or project that implements it: `01.Introduce`, `03.Inference`, `03.Finetuning`, `04.Finetuning`, `06.E2E`, `07.Lab`, `08.RAG`, `09.UpdateSamples`.

The hands-on labs under `md/04.HOL` are the part that behaves like software rather than prose: .NET console applications that load a Phi-4 ONNX model through ONNX Runtime and, in a second lab, through Semantic Kernel. Both are ordinary projects you build and run, so they double as a smoke test that the ONNX export and the runtime version agree.

A GitHub Action translates the whole tree into 50+ languages and commits the results to `translations/`, which is why the README recommends a sparse checkout — cloning everything pulls the translated images too and is measurably slower.

## Ecosystem Position

Against the model entries themselves (`phi-4`, `qwen`, `gemma`) this is a different artifact class: those document weights and capabilities, this documents deployment mechanics, and the two are complementary rather than competing. Against generic inference stacks such as `llama-cpp` or `onnxruntime`, it is a consumer of them — the llama.cpp quantization module is a Phi-specific walkthrough of a tool that entry catalogues generally.

The closest thing to a competitor is Microsoft's own AI Toolkit and Foundry Local documentation, which overlap on the local-server and model-catalogue paths; the cookbook's advantage is that every path is executed against a named checkpoint rather than described abstractly. The boundary worth knowing is the family boundary: an application built from these samples inherits Phi's chat template and tokenizer, and swapping in a Llama or Qwen checkpoint means redoing the export, not just changing a model id.

## Getting Started

```bash
# Sparse clone: skips the 50+ translated trees, which dominate the download
git clone --filter=blob:none --sparse https://github.com/microsoft/PhiCookBook.git
cd PhiCookBook
git sparse-checkout set --no-cone '/*' '!translations' '!translated_images'
```

Open `md/01.Introduction/01/01.EnvironmentSetup.md` first, then pick a single target rather than reading breadth-first — the paths are independent and the notebooks assume different environments. For the fastest end-to-end check, `code/06.E2E/E2E_Phi-4-mini_Local_Hybrid_RAG_SQLite_FTS5.ipynb` runs a local retrieval pipeline with no cloud account, and the dev container or Codespaces badge at the top of the README avoids installing ONNX Runtime or the MLX toolchain by hand.

## Key Use Cases

1. **Getting Phi onto a phone or an embedded board**: the iOS, Android, Jetson and AI PC modules name the runtime, the export step and the known constraints for each target, which is the part that costs days when derived from scratch.
2. **Choosing a quantization route with evidence**: the same Phi-3.5/Phi-4 checkpoints are quantized through llama.cpp, ONNX Runtime GenAI, OpenVINO and MLX, so the choice can be made on measured behaviour on your target rather than on a comparison table written for a different workload.
3. **A self-contained RAG starting point**: the SQLite FTS5 hybrid sample builds retrieval and generation on one machine with no external service, which is useful both as a demo and as a way to isolate retrieval quality before adding a hosted vector store.
4. **Verifying an ONNX export in .NET**: the hands-on labs are buildable console apps, so they answer "does this exported model load and generate in the runtime we actually ship" before the application code exists.
5. **Teaching or onboarding on small-model deployment**: the modules are written as a course, with the environment setup and hardware-support pages covering the questions a new team member asks first.

## Strengths

- Coverage of awkward edges: iOS, Android, Jetson, AI PC, Rust and MLX in one place, each with a working example rather than a paragraph of prose.
- Four quantization toolchains exercised against the same checkpoints, which turns "should we use ONNX or GGUF" into a measurable question.
- Vendor-authored and current — pushed to within four days of this review, with 18 open issues, so the samples track the model releases rather than lagging them.
- The hands-on labs are real projects, not snippets: they compile, run, and therefore verify the whole export-to-runtime chain.
- MIT-licensed with a dev container and Codespaces support, so the evaluation cost is a clone rather than an environment build.

## Limitations

- **Samples, not software.** Nothing here has an API contract or a version promise. Notebooks are updated in place as models change, so a pinned commit is the only way to reproduce a working setup months later.
- **Microsoft-stack gravity.** Foundry, AI Toolkit, Kaito on AKS and Azure AI Search appear as first-class paths, and several modules assume them. The genuinely local routes exist, but they are not the ones the tree is organised around, so a team off Azure reads past a fair amount of it.
- **No weights, no model card, no benchmarks.** Capability questions belong to `phi-4`; this repository cannot answer whether Phi is good enough for a task, only how to run it.
- **Phi-specific throughout.** The tokenizer, the chat template and the ONNX exports are all Phi artifacts; the transferable knowledge is the shape of the process, not the code.
- **Translation volume bloats the clone.** 50+ translated trees with their own images make a full clone large enough that the README itself recommends sparse checkout, which is a strange thing for a reference repository to require.
- **The laboratory notebooks drift with the toolchain.** ONNX Runtime, OpenVINO and MLX all move on their own schedules, and a notebook that pins nothing breaks quietly when one of them ships a breaking change; treat the pinned versions as part of the sample.

## Relation to the Arsenal

Read it beside `phi-4` for the model itself, `llama-cpp` and `onnxruntime` for the runtimes it drives, and `mlx-lm` for the Apple-silicon path. It is a foundation-model entry only by placement: the artifact is deployment knowledge, and the useful comparison is against other vendors' equivalents rather than against other weight releases.

## Resources

- [GitHub](https://github.com/microsoft/PhiCookBook)
- [Environment setup module](https://github.com/microsoft/PhiCookBook/blob/main/md/01.Introduction/01/01.EnvironmentSetup.md)
- [Quantization module](https://github.com/microsoft/PhiCookBook/blob/main/md/01.Introduction/04/QuantifyingPhi.md)
- [Zero-cloud local RAG sample](https://github.com/microsoft/PhiCookBook/blob/main/code/06.E2E/E2E_Phi-4-mini_Local_Hybrid_RAG_SQLite_FTS5.ipynb)
