---
id: llamafile
name: Llamafile
version_tracked: '0.10'
artifact_type: library
category: llms
subcategory: inference-engines
description: 'Single-file LLM distribution: llama.cpp plus Cosmopolitan Libc in one executable that runs uninstalled on Windows, macOS, Linux and BSD'
github_url: https://github.com/mozilla-ai/llamafile
license: Apache-2.0
primary_language: C++
org_or_maintainer: Mozilla.ai
tags:
  - llm
  - inference
  - local
  - edge
maturity: production
cost_model: open-source
github_stars: 26491
github_stars_last_30d: 6
trending_score: 15
last_commit: '2026-10-12'
docs_url: https://docs.mozilla.ai/llamafile
demo_url: null
paper_url: null
paper_id: null
hf_url: https://huggingface.co/mozilla-ai/llamafile_0.10
model_sizes: []
benchmark_scores: []
supports_quantization: true
supported_formats:
  - GGUF
api_compatible: openai
phase: inference-engine
domain:
  - language
  - audio
relation_to_stack:
  - deploy-as-is
health_signals:
  - org-backed
  - community-driven
ecosystem_role:
  - 'The distribution format for local models rather than a serving engine: llama.cpp''s runtime and the weights welded into one executable, so the deliverable is a file someone double-clicks instead of an install procedure'
best_for:
  - You need to hand a working model to a non-engineer — one download, `chmod +x`, run; no Python, no CUDA toolkit, no package manager, no network afterwards
  - You want offline speech-to-text as well as chat from the same packaging trick, which is what whisperfile provides
  - Your target is a machine you cannot administer — a locked-down Windows desktop, an air-gapped laptop, a BSD box — and you need to know the binary itself will start
avoid_if:
  - 'You are serving concurrent traffic: this is one process with a modest server attached, not a scheduler, and there is no continuous batching to tune'
  - Your model exceeds 4GB and the target is Windows — the executable form will not run, so you fall back to the binary plus external GGUF and lose most of the reason to use this at all
  - 'You need the newest llama.cpp features: the 0.10 build system tracks upstream closely but deliberately drops some older capabilities, so check the release notes before assuming parity'
upstream_dependencies:
  - llama-cpp
downstream_consumers: []
alternatives:
  - llama-cpp
  - ollama
  - localai
integrates_with:
  - whisper-cpp
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: 'Re-verified 2026-10-25: repo is now mozilla-ai/llamafile (26,485 stars, 216 open issues, last push 2026-10-12), README states it is a Mozilla Builders project now revamped by Mozilla.ai. 0.10.x moved to a new build system aligned with upstream llama.cpp; pre-built llamafiles are published under huggingface.co/mozilla-ai/llamafile_0.10.'
added_date: '2026-06-13'
last_reviewed: '2026-10-25'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Llamafile is a packaging idea with an inference engine inside it. Take llama.cpp, link it against Cosmopolitan Libc — a libc that emits a single binary addressing several operating systems and CPU architectures — and append the quantised weights. The output is one file that runs on Windows, macOS, Linux and BSD, on x86-64 or ARM64, with no installation step and no runtime dependencies.

The project began under Mozilla Builders in 2023 and has since been revamped by Mozilla.ai, which is now the canonical home. The current 0.10 line rebuilt the packaging against a recent llama.cpp commit rather than carrying a long-lived fork, so new models and features arrive sooner, at the cost of a few older conveniences. Whisperfile, the same trick applied to whisper.cpp, ships alongside it and does speech-to-text and translation from a single executable.

## Why it's in the Arsenal

The catalog has plenty of engines that are better at serving. Llamafile is here because it solves a different problem, and it is the only entry that solves it: how to give somebody a model.

Every other runtime assumes an environment. `ollama` assumes a daemon and a model pull. `vllm` assumes CUDA, Python and a model cache. `llama-cpp` assumes a compiled binary and a GGUF path. A llamafile assumes nothing — double-click it and it serves an OpenAI-compatible endpoint on port 8080. That is the difference between a demo that survives being emailed to a colleague and one that dies at `pip install`.

It is also the most direct answer to the offline question. Once the file is on disk, no network call is made: no model download, no telemetry, no licence check. For a regulated environment where the review board wants to know exactly what crosses the boundary, "one file, here is its hash" is an unusually clean answer.

## Architecture

Cosmopolitan Libc is the unusual part. Rather than cross-compiling a binary per platform, it produces an executable that carries enough of an operating-system abstraction to load natively on several — the same APE (Actually Portable Executable) format that makes a single artifact runnable without a container. Weights are appended to the executable as a ZIP archive, and llama.cpp's loader reads them from that archive rather than from a separate path.

The served surface is llama.cpp's HTTP API — an OpenAI-compatible `/v1/chat/completions` route with token streaming — so application code does not need to know it is talking to a packaged file, though CPU inference latency, not protocol, is what bounds throughput. Version transparency was designed into distribution: every pre-built llamafile records which server build is bundled inside it, so a download from six months ago is identifiable rather than a mystery blob. Mozilla.ai publishes pre-built files per release under a Hugging Face org, and the 0.10 line lists which llama.cpp commit it is based on in the project badge.

Whisperfile reuses the same machinery for audio: whisper.cpp plus Cosmopolitan, one file, transcription and translation, no install. Having both means an offline box can transcribe a recording and then answer questions about it with no shared runtime beyond the two executables.

## Ecosystem Position

Against `llama-cpp` this is a distribution layer, not a competitor — the inference core is the same code, and llamafile adds portability and a bundled artifact. If you control the machine and can install a binary, llama.cpp alone is smaller and more current.

Against `ollama` the boundary is architecture: Ollama runs a background daemon with a model registry and a Docker-like workflow, which is better for a developer machine that will pull many models, and worse for anything that must be self-contained or offline by construction. Against `localai` the difference is scope — LocalAI aims to be a drop-in API server with many backends; llamafile is one model, one file, no service to manage.

The Windows constraint is the sharpest boundary in the comparison: executables above 4GB cannot run there, so a 7B model at Q8 or anything larger forces the external-GGUF path, at which point `llama-cpp` with a separate weights file is the simpler deployment and llamafile's packaging advantage evaporates.

## Getting Started

```bash
# small enough to run anywhere, including Windows
curl -LO https://huggingface.co/mozilla-ai/llamafile_0.10/resolve/main/Qwen3.5-0.8B-Q8_0.llamafile
chmod +x Qwen3.5-0.8B-Q8_0.llamafile
./Qwen3.5-0.8B-Q8_0.llamafile        # OpenAI-compatible server on http://localhost:8080
```

On Windows, rename to add `.exe` before running. For a model over 4GB on Windows, download the `llamafile` binary from the releases instead and pass external GGUF weights — the single-file property does not survive that route.

Two flags are worth knowing immediately: `--chat` drops into an interactive session instead of serving, and `--gpu` (with the accelerator's runtime present) offloads layers; without it you are on CPU. Creating your own llamafile from an existing GGUF is documented and works, but it requires building the toolchain on the target OS family, which is where most people stop.

## Key Use Cases

1. **Emailed demos**: an executable that a product manager can run on a locked-down laptop, with the model, the runtime and the weights in one attachment-able file.
2. **Air-gapped review**: a security team can hash a single file, run it in a sandbox, and know nothing else was fetched — a simpler audit story than a Python environment with transitive downloads.
3. **Offline transcription then analysis**: whisperfile turns an audio file into text on the same machine, and a second llamafile summarises it, with no service dependency between them.
4. **Kiosk and field deployment**: a Windows or BSD machine that nobody administers can carry a fixed model version indefinitely, because the executable pins the runtime as well as the weights.
5. **Reproducible model distribution**: because the server build is recorded in the artifact, a support engineer can identify exactly which inference version produced an output months later.
6. **Teaching and workshops**: every participant ends up with the same running endpoint regardless of laptop OS, which removes the setup failure that eats the first hour of a tutorial.

## Strengths

- One file really does run on Windows, macOS, Linux and BSD on both x86-64 and ARM64 — an engineering claim most "portable" tools do not meet.
- Zero dependency, zero network: the model, the runtime and the libc are all inside the artifact, which is the strongest offline story in the catalog.
- Version transparency is baked into distribution; each pre-built llamafile names the bundled server build rather than appearing as an anonymous binary.
- The OpenAI-compatible endpoint means application code does not need to know it is running against a packaged file.
- Whisperfile extends the same approach to speech, which makes an offline audio pipeline two downloads rather than a dependency tree.
- Genuinely MIT/Apache-licensed and Mozilla-backed through two organisational homes, so it has outlived the average single-file-model project.

## Limitations

- **The 4GB Windows ceiling is structural.** Bigger models cannot be a single executable there, so the flagship use case — here is one file, run it — fails exactly when the model gets interesting.
- **0.10 traded features for currency.** The rebuild against upstream llama.cpp supports newer models but dropped some of the 0.9 experience; releases document it, and anyone upgrading a working 0.9 deployment should read that note first.
- **Single-process, no batching.** One model, one queue; concurrency behaviour is llama.cpp's, with no scheduler to tune. Do not put this behind a team.
- **Building your own requires the target platform toolchain.** The distribution artifact is portable; producing it is not, and cross-building is not the supported path.
- **Model choice is whatever has been packaged.** The pre-built set is curated and lags the GGUF ecosystem; anything unusual means building it yourself.
- **Six-hundred-plus open issues against a small team.** Mozilla.ai's revamp revived activity, but support bandwidth is limited and the issue tracker reflects it.

## Relation to the Arsenal

Read it as the distribution counterpart to `llama-cpp`, which supplies the inference core, and as the offline extreme of the local-serving cluster that includes `ollama` and `localai`. Whisperfile pairs with `whisper-cpp` for the speech path.

For weights worth packaging, see [Foundation Models](../foundation-models/_index.md); for the general engine comparison, see [Inference Engines](../inference-engines/_index.md).

## Resources

- [GitHub](https://github.com/mozilla-ai/llamafile)
- [Documentation](https://docs.mozilla.ai/llamafile)
- [Pre-built llamafiles](https://huggingface.co/mozilla-ai/llamafile_0.10)
- [Quickstart](https://docs.mozilla.ai/llamafile/getting-started/quickstart)
- [Introducing llamafile (Mozilla Hacks)](https://hacks.mozilla.org/2023/11/introducing-llamafile/)
