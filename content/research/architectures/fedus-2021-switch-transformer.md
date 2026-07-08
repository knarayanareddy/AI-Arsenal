---
id: fedus-2021-switch-transformer
title: "Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity"
phase: architectures
venue: other
year: 2021
authors:
  - "Fedus, W."
  - "Zoph, B."
  - "Shazeer, N."
arxiv_id: "2101.03961"
arxiv_url: "https://arxiv.org/abs/2101.03961"
pdf_url: "https://arxiv.org/pdf/2101.03961"
code_url: "https://github.com/google-research/t5x"
venue_url: "https://jmlr.org/papers/v23/21-0998.html"

practical_applicability: high
reproduction_status: reproduced
result_status: foundational
has_code: true
citation_count_approx: 4000

tldr: "Simplified mixture-of-experts to top-1 routing (one expert per token), showing sparse models reach the same quality as dense ones up to 7× faster per FLOP — the recipe that made MoE the standard architecture for frontier-scale efficiency"
key_contribution: "Proved that MoE routing can be radically simple: route each token to a single expert, stabilize with an auxiliary load-balancing loss, selective float32 in the router, and expert dropout — decoupling parameter count from per-token compute and setting the template DeepSeek-V3, Mixtral, and frontier MoEs elaborate"

builds_on:
  - "raffel-2019-t5"
  - "vaswani-2017-attention"

tags:
  - "transformers"
  - "efficiency"
  - "training"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Mixture-of-experts predates this paper (Shazeer's 2017 top-2 MoE), but Switch made it practical: route each token to exactly *one* expert FFN, keep everything else a standard transformer, and add three stabilization tricks. The result — same quality as dense T5 with up to 7× pretraining speedup at equal FLOPs, and a functioning 1.6T-parameter model — established the decoupling that now defines frontier economics: total parameters (knowledge capacity) can scale far beyond per-token compute (serving cost).

## Why it's in the Arsenal

- Nearly every current frontier-efficient model (Mixtral, DeepSeek-V3, GPT-4-class systems per credible reporting) is a sparse MoE; Switch is where the practical recipe and its failure modes (load imbalance, training instability, transfer gaps) were first worked out
- The parameters-vs-FLOPs decoupling it demonstrated is the mental model needed to read modern model cards ("671B total, 37B active") and their serving-cost implications correctly

## Core Contribution

Top-1 ("switch") routing: a learned router sends each token to one of N expert FFNs, with an auxiliary loss encouraging uniform expert utilization, capacity factors bounding per-expert batch size (overflowed tokens skip the layer via residual), float32 precision inside the router only, and truncated-normal init — jointly turning MoE from notoriously unstable to trainable at trillion-parameter scale on bfloat16 hardware.

## Key Results

- Switch-Base matches T5-Base quality with 7× faster pretraining at equal FLOPs per token; Switch-Large shows 2.5× speedup over T5-Large (2021)
- Switch-C (1.6T parameters, 2048 experts) trains stably — the first trillion-parameter-class transformer — with 4× speedup over T5-XXL (2021)
- Sparse models distill back into dense ones retaining ~30% of the quality gain, an early answer to "how do you serve this?" (2021)

## Methodology

T5-style encoder-decoder models pretrained on C4 with span corruption, comparing dense vs. switch variants at matched FLOPs; scaling studies across expert counts (8→2048); stability ablations (precision, init, expert dropout); evaluation on GLUE/SuperGLUE/SQuAD after fine-tuning and on multilingual mC4.

## Practical Applicability

For model consumers: MoE models price by *active* parameters for compute but by *total* parameters for memory — they need the full parameter set resident (or expert-parallel sharding), which is why MoE dominates at API scale but is awkward for single-GPU self-hosting. For anyone training at scale: Switch's load-balancing loss, capacity factor, and router-precision fixes remain the baseline MoE hygiene, and its distill-to-dense result is still the standard fallback when serving constraints rule sparsity out.

## Limitations & Critiques

Fine-tuning transfer initially lagged pretraining gains (sparse models overfit small downstream sets — later mitigated by expert dropout and better recipes); token-dropping at capacity overflow degrades quality subtly; load-balancing pushes toward uniform routing, which later work (expert-choice routing, DeepSeek's auxiliary-loss-free balancing) showed is not optimal; and encoder-decoder T5-era results required re-validation in the decoder-only era — which Mixtral and DeepSeek provided.

## Reproductions & Follow-up Work

Checkpoints and T5X/Mesh-TensorFlow code released; independently reproduced and extended across labs. Descendants: GLaM, expert-choice routing, ST-MoE (stability), `jiang-2024-mixtral` (open decoder-only MoE), and `deepseek-ai-2024-deepseek-v3` (fine-grained experts, aux-loss-free balancing) — the current state of the lineage.

## Relation to the Arsenal

Architectural ancestor of `jiang-2024-mixtral` and `deepseek-ai-2024-deepseek-v3` (architectures/); the active-vs-total-parameter economics it introduced inform the model-selection and serving-cost guidance in architectures/serving-patterns/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2101.03961)
- [arXiv](https://arxiv.org/abs/2101.03961)
- [JMLR version](https://jmlr.org/papers/v23/21-0998.html)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
