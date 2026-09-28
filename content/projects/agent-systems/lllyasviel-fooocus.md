---
id: lllyasviel-fooocus
name: "Fooocus"
version_tracked: null
artifact_type: tool
category: multimodal
subcategory: tools
description: "GPL-3.0 minimal UI over SDXL and Flux that reduces image generation to prompt, style, aspect ratio, and advanced knobs"
github_url: "https://github.com/lllyasviel/Fooocus"
license: "GPL-3.0"
primary_language: Python
org_or_maintainer: "lllyasviel"
tags: [vision, multimodal]
maturity: beta
cost_model: open-source
github_stars: 53209
github_stars_last_30d: 0
trending_score: 28
last_commit: "2025-12-01"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [vision]
relation_to_stack: [deploy-as-is, fork-and-adapt]
health_signals: [community-driven]
ecosystem_role:
  - "Opinionated image-generation UI that strips SDXL/Flux workflows down to prompt, style, and aspect — the reference for how little UI a diffusion model actually needs."
best_for:
  - "You are a model developer who wants the fastest path to evaluating a new SDXL or Flux checkpoint without learning a graph interface."
  - "You are building a demo or internal tool where a single-page form is a better fit than a node canvas, and you can live with a smaller feature surface."
  - "You want to fork an image-generation UI: the codebase is small, opinionated, and structured so the sampling internals are easy to read and change."
avoid_if:
  - "You need control composition workflows - ControlNet graphs, inpainting chains, or multi-stage pipelines - because the UI deliberately hides that structure."
  - "You need permissive licensing for a closed commercial product, because the project is GPL-3.0 and derivative distributions inherit those terms."
  - "You expect active development against new model families, since the repository's last commit is dated 2025-12-01 and release cadence has effectively stopped."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 53209 stars, GPL-3.0 license, Python primary language, last commit 2025-12-01 (noted as effectively frozen), empty topics, no homepage field. Supported model families and the three-control design come from the repository README; the Flux path and advanced-panel contents were read from code and docs, not run."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/lllyasviel/Fooocus", "date": "2026-09-28", "description": "53,209 stars and last commit 2025-12-01 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Fooocus is a deliberately small image-generation interface over Stable Diffusion XL and later the Flux family of models. Its premise is that most of the diffusion pipeline's parameters - scheduler, guidance internals, latent handling, base-model resolution buckets, refiner placement - can be chosen for the user once, leaving three visible controls: a prompt, a style selection, and an aspect ratio, with the rest tucked behind an advanced panel. Underneath, the model definition and sampling path are kept close to the upstream diffusers-style structure so the pipeline can be modified directly, which is why it also serves as a readable fork base. The project is GPL-3.0 licensed and distributed as a desktop application with a local web interface.

## Why it's in the Arsenal

The recurring decision Fooocus resolves is interface surface. Node graphs are powerful precisely because they expose everything, which means a first-time user has to make twenty decisions before seeing a picture. Fooocus hard-codes those twenty, and the visible surface collapses to prompt, style, and aspect ratio - the parameters that actually change what the picture looks like. For model developers this cuts evaluation latency to under a minute per checkpoint, and for a demo or internal tool it removes the training curve entirely. The cost is the honest mirror image of that design: composition workflows are gone, and a project that reduces the surface this aggressively stops moving when the underlying models do.

## Architecture

The application is a Python backend that owns model loading and sampling, paired with a browser-based front end served locally. The default pipeline loads a base SDXL checkpoint with its refiner, and a Flux path uses the single-model latent-diffusion flow with its own guidance handling. Sampling runs a KSampler-equivalent loop with a configurable scheduler and step count that are chosen by preset rather than exposed directly, and results go through a VAE decode with the model's expected latent format. The aspect-ratio control selects a matching generation resolution from a table of preset dimensions rather than accepting arbitrary pixel sizes, which is what keeps the model's composition behaving as trained. The front end posts a generate request with prompt, style, and aspect, and receives a returned image plus a metadata block the same UI can rehydrate. Advanced settings expose the negative prompt, seed, guidance, and the model variant switch, and the codebase keeps model definitions, styles, and default settings in separate, easily forked files.

## Ecosystem Position

Fooocus competes with the Automatic1111 WebUI and with InvokeAI for the single-user desktop image-generation slot, and compared with those it wins on first-run simplicity while losing on asset management, batch queues, and extensibility. Each points at a diffusers-format checkpoint, so switching backends does not mean re-downloading weights. It overlaps with ComfyUI in this batch on the same underlying checkpoints, but it is deliberately rather than the graph-based alternative: ComfyUI is the reproducibility tool where an exact pipeline is the artifact, and Fooocus is the form. A custom-node-style extension ecosystem exists for both, though ComfyUI's is far larger. It is an alternative to calling diffusers from a notebook when you want pictures back in under a minute without writing a sampling loop, and for the training counterpart to these checkpoints the fine-tuning entries in content/projects/training-and-alignment/ are where to look.

## Getting Started

Install the dependencies and run the bundled launcher, which serves the local UI:

```bash
cd Fooocus
python -m pip install -r requirements_versions.txt
python entry_with_update.py
```

Put SDXL or Flux checkpoints in the checkpoints folder before launching; the interface opens in a browser once the model is loaded.

## Key Use Cases

1. Evaluate a newly released SDXL or Flux checkpoint in under a minute per image, with no pipeline configuration step between the download and a result.
2. Ship a single-page image generation demo where the audience will not learn a node graph and the model is the only variable being demonstrated.
3. Fork a minimal image-generation UI: the model definition and default-settings files are small and clearly separated, so a divergent sampler path is a local edit.

## Strengths

- Lowest time-to-first-image of the desktop tools, since the model is loaded and the defaults already chosen when the window opens.
- Very small, readable codebase, which makes it a practical base for forking a purpose-built generation UI.
- Direct support for both the SDXL and Flux paths behind the same three controls, so a model-family swap does not mean a new interface.
- Runs locally with no account, telemetry, or hosted dependency, which keeps generated images inside the machine.

## Limitations

The project is effectively frozen - the last commit is dated 2025-12-01 - so expect no fixes for new hardware, new driver stacks, or model architectures released since, and plan on maintaining your own fork. GPL-3.0 rules out embedding it in a closed commercial product without accepting those terms. The minimal design is genuinely minimal: no asset database, no batch queue, no multi-user accounts, no reproducible pipeline export beyond the metadata block, and no inpainting or ControlNet composition. Prompt handling is model-appropriate rather than general, and quality is bounded by whatever checkpoint you supply, with no upscaling or face-restoration path built in. Because it depends on specific diffusers-era dependency versions, resolving them into an existing environment is often the first real task.

## Relation to the Arsenal

The deliberately minimal end of the image-generation surface represented in content/projects/agent-systems/, sitting alongside ComfyUI and InvokeAI in this batch as the reproducibility-first and asset-managed counterparts respectively. The checkpoints it runs are distributed through content/projects/foundation-models/ and their adaptation recipes live in content/projects/training-and-alignment/. Its local-inference analogue for text is the tool entry in content/projects/inference-engines/, which faces the same interface-versus-control trade-off. Given the frozen commit date, treat it as a fork base and reference implementation rather than an active dependency.

## Resources

- [GitHub — lllyasviel/Fooocus](https://github.com/lllyasviel/Fooocus)
- [Repository README with install and model notes](https://github.com/lllyasviel/Fooocus/blob/main/README.md)
- [Community discussion index for model-specific guidance](https://github.com/lllyasviel/Fooocus/discussions)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (53,209 stars, last commit 2025-12-01, license GPL-3.0, verified via GitHub API on 2026-09-28)*
