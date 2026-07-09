---
id: he-2015-resnet
title: "Deep Residual Learning for Image Recognition"
phase: foundational
venue: other
year: 2015
authors:
  - "He, K."
  - "Zhang, X."
  - "Ren, S."
  - "Sun, J."
arxiv_id: "1512.03385"
arxiv_url: "https://arxiv.org/abs/1512.03385"
pdf_url: "https://arxiv.org/pdf/1512.03385"
code_url: null
venue_url: "https://openaccess.thecvf.com/content_cvpr_2016/html/He_Deep_Residual_Learning_CVPR_2016_paper.html"

practical_applicability: theoretical
reproduction_status: reproduced
result_status: foundational
has_code: false
citation_count_approx: 250000

tldr: "Introduced residual connections (skip connections) that let networks learn residual functions relative to the identity, making very deep networks trainable and unblocking the depth scaling that later architectures — including Transformers — depend on"
key_contribution: "Reframed each layer block to learn a residual F(x) added back to its input x, so gradients flow through identity shortcuts; this fixed the degradation problem that had made naively-deeper networks train worse, enabling 100+ layer networks"

builds_on: []
implemented_in: []

tags:
  - foundational
  - transformers
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

ResNet introduced the residual connection: instead of asking a stack of layers to learn a target mapping `H(x)` directly, you have it learn the residual `F(x) = H(x) - x` and add the input back via a shortcut, so the block computes `F(x) + x`. This small change is one of the most consequential architectural primitives in modern deep learning — the same skip-connection idea is inside every Transformer block in this catalog (each attention and MLP sub-layer is wrapped in a residual add). `result_status: foundational` here means "still the reference point," not "superseded": residual connections are load-bearing in current LLMs, not a historical curiosity.

## Why it's in the Arsenal

- Every model in the catalog's model-layer is a deep residual network under the hood. Understanding why deep Transformers train stably — why you can stack dozens of blocks without the network degrading — requires this paper's core insight, not the Transformer paper alone.
- It grounds a recurring practical intuition: normalization placement (pre-norm vs post-norm) and residual scaling, which matter when you fine-tune or modify architectures, are direct descendants of the residual-learning framing introduced here.
- `practical_applicability: theoretical` is not a demotion — you never implement ResNet from scratch for LLM work, but the mechanism explains gradient flow behavior you will hit when training or adapting deep models.

## Core Contribution

The paper identified and solved the *degradation problem*: adding more layers to a plain deep network made both training and test error worse, which is not what overfitting predicts — it meant deeper plain networks were harder to *optimize*, not just to generalize. The fix was to change what each block is asked to learn. If the optimal transformation for a block is close to the identity (common in very deep nets), a plain block must laboriously learn to approximate identity through nonlinearities, whereas a residual block only has to drive `F(x)` toward zero, which is far easier for gradient descent. Concretely, a residual block computes `y = F(x, {W_i}) + x`, where the `+ x` shortcut carries the input forward unchanged and provides an uninterrupted path for gradients during backpropagation. This is why extremely deep networks became trainable at all.

## Key Results

- Trained networks up to 152 layers on ImageNet — roughly 8× deeper than the previous VGG networks — while remaining easier to optimize than shallower plain counterparts
- Won the ILSVRC 2015 classification task; the residual ensemble reported a 3.57% top-5 error on the ImageNet test set (2015)
- Demonstrated the degradation problem empirically: plain 34-layer networks had higher training error than plain 18-layer ones, while residual versions reversed this — the deeper residual net trained better
- These are 2015 computer-vision benchmark numbers; they are historical context, not a claim about anything in the current LLM stack. The lasting significance is the residual primitive (see Core Contribution), not the leaderboard result.

## Methodology

The authors built plain convolutional baselines and their residual counterparts (identical layer counts, with shortcut connections added) and compared optimization behavior on CIFAR-10 and ImageNet across depths. Shortcuts were parameter-free identity mappings where input and output dimensions matched, with projection shortcuts used to match dimensions when they changed. Bottleneck blocks (1×1 → 3×3 → 1×1 convolutions) were introduced to keep very deep variants computationally feasible. The comparison design isolates the effect of the residual connection itself, since everything else about the plain and residual networks was held constant.

## Practical Applicability

You will essentially never implement ResNet directly in LLM engineering. Its applicability is conceptual but high-leverage: residual connections are the reason deep Transformers train, and knowing this explains behaviors you will encounter — why removing or misplacing a residual/normalization breaks training, why very deep stacks stay stable, and why architecture tweaks (pre-norm, residual scaling like in some large-model recipes) are framed as changes to the residual path. Treat this paper as vocabulary for reasoning about deep-network trainability, not as a component you ship.

## Limitations & Critiques

- The paper is about convolutional vision networks; the specific architecture (conv bottlenecks, ImageNet-scale image classification) is not what you use for language modeling — only the residual primitive transfers.
- It does not fully explain *why* residual learning works; subsequent work (loss-landscape analyses, identity-mapping variants) refined the theory and showed the original post-activation placement was suboptimal.
- Residual connections alone do not solve all depth problems — normalization and initialization choices interact with them, which later architectures had to work out.

## Reproductions & Follow-up Work

ResNet is one of the most reproduced results in deep learning; residual blocks ship in every major framework. Direct follow-ups include Identity Mappings in Deep Residual Networks (pre-activation ResNets), Wide ResNets, DenseNet, and — most relevant to this catalog — the residual-wrapped sub-layers of the Transformer ([Attention Is All You Need](../foundational/vaswani-2017-attention.md)), where residual connections around attention and feed-forward blocks are what make deep stacks trainable.

## Relation to the Arsenal

- Underpins the model-layer of the catalog: every foundation model here (Llama, Qwen, Gemma, DeepSeek) relies on residual connections inside its Transformer blocks.
- Pairs with [Attention Is All You Need](../foundational/vaswani-2017-attention.md) as the two architectural primitives — attention and residual connections — that jointly make today's deep LLMs both expressive and trainable.

## Resources

- [arXiv abstract](https://arxiv.org/abs/1512.03385)
- [PDF](https://arxiv.org/pdf/1512.03385)
- [CVPR 2016 paper page](https://openaccess.thecvf.com/content_cvpr_2016/html/He_Deep_Residual_Learning_CVPR_2016_paper.html)
