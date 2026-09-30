---
id: clip
name: CLIP (OpenAI)
version_tracked: null
artifact_type: model
category: multimodal
subcategory: open-source-models
description: "OpenAI's Contrastive Language-Image Pre-training model, MIT-licensed, aligning image and text encoders into one embedding space for zero-shot classification"
github_url: "https://github.com/openai/CLIP"
license: MIT
primary_language: Other
org_or_maintainer: openai
tags: [multimodal, embeddings, vision, foundational]
maturity: production
cost_model: open-source
github_stars: 34382
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-03-25"
docs_url: "https://github.com/openai/CLIP"
demo_url: null
paper_url: "https://arxiv.org/abs/2103.00020"
paper_id: null
phase: foundation-model
domain: [vision, multimodal]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [org-backed, production-proven, research-origin]
ecosystem_role:
  - "The foundational primitive of open multimodality: contrastive pretraining on 400M image-text pairs produced a shared embedding space that made zero-shot vision classification real — and CLIP-family encoders became the standard vision front-end inside LLaVA-class VLMs and the text conditioning inside Stable Diffusion"
best_for: ["You are labelling or filtering images with a set of text prompts and you want zero-shot classification rather than collecting and training a labelled set for each category.", "You are building image search over a catalogue and you want text and images embedded in the same vector space so a query string retrieves relevant pictures.", "You need a baseline to beat, because the reported result is that CLIP matches a ResNet50 on ImageNet zero-shot without using any of the 1.28M labelled examples."]
avoid_if: ["You need fine-grained distinctions between visually similar classes, because the contrastive objective trades that specificity for broad semantic coverage of a 400M-pair training corpus.", "You need a modern multimodal reasoning model, because this is a dual encoder from 2021 with no instruction following, no chain of thought and a fixed 77-token context on the text side.", "You are on Apple Silicon or Windows and want a one-command install, because the documented path is a git install on top of a specific PyTorch 1.7.1 and CUDA 11.0 combination."]
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (33.9k), MIT, last push 2026-03-25 verified via the GitHub API on 2026-07-08. The repo is a stable reference release (2021 weights); currency lives in successors, which the entry states plainly. Paper is Radford et al. 2021.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/openai/CLIP","date":"2026-07-08","description":"33.9k stars; canonical repo of the 2021 model that started open multimodality"}
featured: false
status: active
---

## Overview

CLIP is a neural network trained on a large collection of (image, text) pairs so that it can be instructed in natural language to return the most relevant text for a given image, in the same zero-shot spirit as GPT-2 and GPT-3. It is a dual encoder: a vision tower producing image features and a language tower producing text features, trained contrastively so matching pairs are pulled together in a shared space. The Python package exposes a deliberately small API. `clip.available_models()` lists checkpoints, `clip.load(name, device=..., jit=False)` returns the model plus the TorchVision preprocessing transform and downloads weights as needed, defaulting to the first CUDA device or CPU, and `clip.tokenize(text, context_length=77)` produces the token tensor. The loaded model offers `encode_image`, `encode_text`, and a combined call returning logit tensors whose values are cosine similarities between image and text features times 100. The README ships a worked zero-shot example that predicts among the 100 CIFAR-100 class labels.

## Why it's in the Arsenal

The decision it resolves is whether adding a new category to a vision task needs new training data. Because the model scores an image against arbitrary text, a category is a string, and a product team can ship a classifier in an afternoon with zero examples. That is a genuinely different cost curve from fine-tuning, and it is why CLIP is still the default retrieval backbone years after release. What you give up is specificity: a prompt that distinguishes two similar categories needs carefully worded text, and the model's notion of similarity is broad semantic alignment rather than the fine detail a specialist classifier learns.

## Architecture

Two towers, one objective. The image encoder produces a vector for a preprocessed batch of images and the text encoder produces a vector for tokenised text truncated or padded to 77 tokens; training maximises agreement between paired embeddings and decreases it for mismatched pairs across a large batch, which is what produces a single shared space. At inference, `model(image, text)` computes cosine similarity between every image and every text embedding, scales by 100 and returns a logit matrix, which is exactly the shape a zero-shot classifier consumes after a softmax over candidate prompts. Multiple checkpoints are published in different sizes, and `clip.load` downloads the requested one and returns its paired preprocessing transform so the preprocessing contract is never separated from the weights. Nothing in the API is stateful: there is no server, no batching service and no fine-tuning path, because the value is entirely in the frozen embedding.

## Ecosystem Position

CLIP remains the default dual-encoder backbone against which most open image-text models are compared, and it overlaps with the vision encoders in content/projects/foundation-models such as the Segment Anything family, which reuses CLIP-style image embeddings for its mask decoder. It is an alternative to the hosted vision APIs for zero-shot labelling, with the usual trade of latency and no per-request cost against a much smaller capability ceiling, and it complements rather than competes with the detector entries such as Ultralytics YOLO, because CLIP classifies what is in the frame while a detector finds where it is. Compared with the inference engines in content/projects/inference-engines, ONNX Runtime or OpenVINO would be the route to serving this checkpoint in production, and compared with the agent frameworks in content/projects/frameworks it is a component rather than an orchestration layer. Anything retrieval-shaped built on these embeddings belongs in content/projects/data-and-retrieval.

## Getting Started

Install a CUDA 11.0 build of PyTorch and torchvision, then install the repo as a package and score an image against text prompts:

```bash
conda install --yes -c pytorch pytorch=1.7.1 torchvision cudatoolkit=11.0
pip install ftfy regex tqdm
pip install git+https://github.com/openai/CLIP.git
```

```python
import clip, torch
from PIL import Image
model, preprocess = clip.load("ViT-B/32", device="cuda" if torch.cuda.is_available() else "cpu")
logits, _ = model(preprocess(Image.open("CLIP.png")).unsqueeze(0), clip.tokenize(["a diagram", "a dog", "a cat"]))
print(logits.softmax(dim=-1))
```

Substitute `cpuonly` for the toolkit on a machine with no GPU.

## Key Use Cases

1. Zero-shot labelling: classify images by scoring them against a list of category prompt strings, with no labelled training set for the new categories.

2. Text-driven image retrieval: embed a catalogue and a query string into one space so a natural-language description returns the matching pictures.

3. Caption and alt-text ranking: score a pool of candidate captions against an image and keep the best match, which is a cheap relevance check for a dataset pipeline.

## Strengths

- A category becomes a string, so adding labels costs nothing but prompt wording instead of a labelled dataset and a training run.
- One embedding space for images and text, which makes cross-modal retrieval (text-to-image search, caption ranking, dedupe) a single vector store away.
- The published API is three functions and a tokenizer, with the preprocessing transform returned by clip.load so the contract cannot drift from the weights.
- MIT licensed and old enough that it is thoroughly documented, with a worked CIFAR-100 zero-shot example to copy.

## Limitations

Age is the honest framing. The README documents a PyTorch 1.7.1 and CUDA 11.0 environment, which is several CUDA generations behind current installs, so on a modern machine you are either pinning an old toolchain or fighting compatibility while the underlying model is unchanged. On the modelling side it is a dual encoder with a 77-token text context and no instruction following, so it cannot be prompted, cannot reason and cannot be asked a question about an image; the closest it gets to reasoning is choosing among prompts you wrote. Contrastive training on broad web data gives semantic breadth at the cost of fine-grained discrimination, so distinguishing near-identical product variants or subtle defects is where it falls down, and the README's own claim is parity with a ResNet50 zero-shot, which is a 2021 baseline. It is a frozen model with no training or fine-tuning entry point in the package, and the repository is a Jupyter-Notebook-primary project with the last recorded commit several months behind most entries in this phase.

## Relation to the Arsenal

This is the reference image-text embedding entry in content/projects/foundation-models and the component almost every zero-shot vision workflow starts from. Read it beside the segmentation and detection models in the same phase, which answer different questions about the same pixels, and beside the embeddings and retrieval entries in content/projects/data-and-retrieval if the output is a vector index rather than a label. For serving, the inference-engine entries such as ONNX Runtime are the realistic production path since this package is research-shaped, and the evaluation entries in content/projects/benchmarks-and-evals are where you would score a replacement against it on your own data rather than trusting a paper number.

## Resources

- [GitHub — openai/CLIP](https://github.com/openai/CLIP)
- [Paper — arXiv 2103.00020](https://arxiv.org/abs/2103.00020)
- [Model card with intended and out-of-scope uses](https://github.com/openai/CLIP/blob/main/model-card.md)
