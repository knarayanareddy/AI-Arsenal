---
id: paddlepaddle-paddlenlp
name: "PaddleNLP"
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "PaddlePaddle library of pretrained NLP and multimodal models with LLM and SLM training and serving paths"
github_url: "https://github.com/PaddlePaddle/PaddleNLP"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "PaddlePaddle"
tags: [llm, multimodal]
maturity: production
cost_model: open-source
github_stars: 12979
github_stars_last_30d: 0
trending_score: 29
last_commit: "2026-05-23"
docs_url: "https://paddlenlp.readthedocs.io"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, multimodal]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [org-backed]
ecosystem_role:
  - "PaddlePaddle NLP and large-model library with a broad model zoo plus a unified LLM/SLM serving path, notable as a non-PyTorch full stack."
best_for:
  - "You are deploying on Paddle Inference or a Paddle-supported accelerator and want pretrained language models already in that framework's format and serving path."
  - "You need a broad task model zoo — classification, sequence labelling, question answering, semantic retrieval, document intelligence — without assembling each separately."
  - "You want fine-tuning and serving recipes for a specific open LLM on Paddle, including compression options, in one place rather than across a conversion pipeline."
avoid_if:
  - "You are a PyTorch shop, since adopting this means adopting PaddlePaddle and accepting a thinner third-party tooling ecosystem."
  - "You need the newest model releases fastest, since new open models typically land in transformers first and reach this library later."
  - "You need a portable serving layer, where an ONNX export path plus onnxruntime is a smaller commitment than a full framework switch."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (12979), Apache-2.0, last commit 2026-05-23, Python, and the topic list were API-verified. LLM collection classes, the inference library with HTTP and gRPC plus streaming, the compression utilities, retrieval components, and AutoModel factories come from the official docs. Framework-commitment and release-lag caveats are engineering judgement."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/PaddlePaddle/PaddleNLP", "date": "2026-09-28", "description": "12,979 stars and last commit 2026-05-23 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

PaddleNLP is PaddlePaddle's natural-language and large-model library. Under its ai-nlp and legacy nlp module groups it provides pretrained models and task heads for text classification, token classification, sequence labelling, question answering, semantic similarity and retrieval, and generation, plus a document-intelligence set built on UIE-style extraction and a retrieval stack with dense, lexical, and hybrid components. Its large-model side is separate and explicit: LLM collection classes for continued pretraining, supervised fine-tuning, and alignment, a model zoo of supported architectures, an inference library that serves a loaded model behind HTTP or gRPC with streaming generation, a smaller-model path, and compression utilities for pruning and quantisation. AutoTokenizer, AutoModel, and AutoModelForCausalLM style classes give the familiar transformers-shaped entry points, so moving to a new model family is a config change rather than a rewrite.

## Why it's in the Arsenal

The recurring decision in a large model project is whether to keep training and deployment inside one framework's supported paths or convert at the boundary. Conversion is where LLM deployments quietly lose support: a fused kernel you rely on may not exist in the runtime, a quantisation scheme may round differently, and a tokenizer's special-token handling can differ. This library resolves the decision by keeping the whole path — continued pretraining, fine-tuning, compression, and serving — in Paddle format with the model zoo and inference library covering the transition, so a team already committed to Paddle Inference can move from a fine-tune to a served endpoint without a conversion step and its accuracy risk. The secondary value is breadth of task models behind one consistent API.

## Architecture

The library is layered by task. Base building blocks are tokenizers, embeddings, encoders, decoders, and pooling, wrapped by AutoModel factories that assemble an architecture from a pretrained checkpoint's config. Task modules add a head and a loss on top, with loaders yielding the padded id sequences and label tensors a head expects. The LLM side mirrors that pattern with a collection class per architecture: it owns the model definition, the data pipeline, and the training configuration, so fine-tuning and continued pretraining run through the same object the inference library later loads. The inference library holds a loaded model in memory, tokenises and batches incoming requests, decodes with a configurable sampling strategy, and streams partial results through a queue when streaming is requested, which is what makes it a server rather than a Python API. Compression utilities sit between training and serving, applying post-training quantisation or structured pruning to a checkpoint and re-saving it in the format the server accepts. Retrieval components embed documents with a trained bi-encoder, build a dense index, and rerank lexical and vector hits together for hybrid search.

## Ecosystem Position

PaddleNLP competes with Hugging Face transformers and its ecosystem, and the split is largely a question of framework commitment: transformers is the default because the tooling, the model zoo, and the fine-tuning libraries around it are broader, while PaddleNLP wins when your deployment target is Paddle. It overlaps with FastChat and other serving frameworks, but the differentiator here is that the model zoo, the training code, and the server are one project, which is unusual. Against LangChain and LlamaIndex it is a model-layer rather than application-framework component, so it is a complement to them where they support Paddle models. Compared to ONNX export plus onnxruntime, which is more portable and lower-friction, this stack is the better fit only when Paddle Inference is a stated deployment requirement rather than a default.

## Getting Started

Install the Paddle stack and run a supported model through the inference server:

```bash
python -m pip install paddlepaddle-gpu paddlenlp
paddlenlp_server --model_name_or_path <model-dir> --port 8080 --device gpu:0
```

```python
# then talk to it like any HTTP generate endpoint
import requests
resp = requests.post("http://127.0.0.1:8080/generate", json={
    "prompt": "Summarise this contract in one line:",
    "max_new_tokens": 128,
    "temperature": 0.3,
})
print(resp.json())
```

For a task model, the shortest path is the transformers-shaped class: `from paddlenlp import AutoModelForSequenceClassification` then `from_pretrained(...)` on a checkpoint from the model zoo.

## Key Use Cases

1. Serving a fine-tuned open LLM on Paddle Inference in a deployment where the runtime is fixed and cross-framework conversion is not acceptable.
2. Building a domain model across several task types — classification, extraction, retrieval — from one zoo with a consistent API rather than separate libraries.
3. Compressing a checkpoint to meet a device or latency budget through the provided quantisation or pruning utilities before handing it to the serving library.

## Strengths

- One project covers the LLM model zoo, the training recipes, compression, and the inference server, so a Paddle deployment avoids a conversion step.
- Transformers-shaped AutoModel factories keep the transition between frameworks small when swapping model families.
- Broad task coverage for classic NLP and document intelligence, beyond the LLM focus of most of the field.
- Streaming generation and an HTTP or gRPC service in the box, so a serving path exists without writing a custom loop.

## Limitations

Framework commitment is the real cost: outside PyTorch the surrounding tooling, examples, and community support are thinner, and onboarding is harder. New open models usually appear in transformers first, so support lags and you may fine-tune a slightly older architecture. The inference server, model zoo, and compression utilities are maintained at different rates, so feature sets are not perfectly aligned across them, and the GPU support matrix is narrower than the CUDA ecosystem generally. The community and documentation are primarily Chinese-language, which is a practical obstacle for many teams, and the release cadence is slower than the frameworks it parallels.

## Relation to the Arsenal

This is the language-model entry in content/projects/frameworks for the Paddle stack, and it is the natural companion to the PaddleDetection entry in the same folder: one for language, one for vision, same underlying framework. The model families it serves are catalogued in content/projects/foundation-models, and the serving library is the Paddle counterpart to the vllm and sglang entries in content/projects/inference-engines. For the portable alternative, read the onnx and onnxruntime entries — exporting to ONNX is how a Paddle-trained model reaches a non-Paddle runtime — and for evaluating what you fine-tune, the entries in content/projects/evaluation.

## Resources

- [PaddleNLP documentation](https://paddlenlp.readthedocs.io)
- [PaddleNLP GitHub repository](https://github.com/PaddlePaddle/PaddleNLP)
- [PaddleNLP large model development guide](https://paddlenlp.readthedocs.io/zh/latest/llm/index.html)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (12,979 stars, last commit 2026-05-23, license Apache-2.0, verified via GitHub API on 2026-09-28)*
