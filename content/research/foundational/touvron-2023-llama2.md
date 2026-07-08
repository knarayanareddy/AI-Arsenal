---
id: touvron-2023-llama2
title: "Llama 2: Open Foundation and Fine-Tuned Chat Models"
phase: foundational
venue: arxiv-preprint
year: 2023
authors:
  - "Touvron, H."
  - "Martin, L."
  - "Stone, K."
  - "Albert, P."
  - "et al. (Meta)"
arxiv_id: "2307.09288"
arxiv_url: "https://arxiv.org/abs/2307.09288"
pdf_url: "https://arxiv.org/pdf/2307.09288"
code_url: "https://github.com/meta-llama/llama"
venue_url: null

practical_applicability: high
reproduction_status: code-available
result_status: superseded
superseded_by: "dubey-2024-llama3"
has_code: true
citation_count_approx: 15000

tldr: "The release that created the open-weight LLM ecosystem: commercially licensed 7B-70B models plus the most detailed public documentation of the RLHF chat-tuning pipeline at the time — the paper that taught the community how aligned chat models are actually made"
key_contribution: "First commercially usable open-weight model family competitive with closed chat models, with an unusually complete disclosure of the alignment recipe: SFT data curation, iterative RLHF with two separate reward models (helpfulness/safety), rejection sampling, and Ghost Attention for multi-turn consistency"

builds_on:
  - "ouyang-2022-instructgpt"
  - "hoffmann-2022-chinchilla"

tags:
  - "llm"
  - "foundational"
  - "rlhf"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Llama 2 is where the open-weight ecosystem actually starts: the first Llama leaked under a research-only license, but Llama 2 shipped 7B/13B/70B base and chat models under a commercial license, with a 77-page paper documenting the alignment pipeline in a detail no frontier lab had offered. For most of the community, this paper — not InstructGPT — was the first complete, followable description of how a raw pretrained model becomes a safe, helpful chat assistant.

## Why it's in the Arsenal

- The commercial license created the fine-tuning, quantization, and local-inference ecosystem — llama.cpp's rise, the adapter economy, and the "open-weight baseline" norm all date from this release
- Its alignment chapters remain one of the best public references on practical RLHF: reward-model data collection, iterative refinement across five RLHF versions, and the measured trade-offs between helpfulness and safety

## Core Contribution

Beyond the weights themselves (2T-token pretraining, doubled 4K context, GQA at 70B), the paper's lasting contribution is the alignment disclosure: quality-over-quantity SFT (~27K curated examples beating larger noisy sets), two separate reward models to resolve the helpfulness/safety tension, iterative RLHF alternating rejection sampling and PPO across successive data collections, and Ghost Attention (GAtt) for making system instructions persist across multi-turn dialogue.

## Key Results

- Llama-2-70B-chat rated comparable to ChatGPT (GPT-3.5) on human helpfulness evaluations — the first open model to credibly reach that bar (2023)
- Base 70B outperformed all open predecessors (Llama 1, Falcon, MPT) across standard benchmarks (2023)
- The SFT finding that tens of thousands of high-quality examples beat millions of noisy ones became standard practice for instruction tuning (2023)

## Methodology

Pretraining: 2T tokens of public data with up-sampled factual sources, standard Llama architecture plus GQA at 70B. Alignment: staged SFT then five iterative RLHF rounds, each collecting fresh human preference data (~1.4M comparisons total) to retrain twin reward models, applying rejection sampling then PPO. Safety: separate safety-focused data collection, red-teaming, and context distillation, with helpfulness/safety measured jointly to document the trade-off rather than hide it.

## Practical Applicability

As a model, superseded (Llama 3 and successors replaced it); as a document, still highly applicable — it remains a canonical reference when building an RLHF or preference-tuning pipeline, and its data-quality findings transfer directly to modern SFT/DPO workflows. The release also established the ecosystem norms (open weights + acceptable-use license + paper) that every subsequent open release follows.

## Limitations & Critiques

The "open" license drew criticism: usage restrictions and a 700M-MAU clause mean it is not open-source by OSI standards, and training data composition was not disclosed — openness of weights, not of process inputs. The chat models' safety tuning was widely criticized as over-refusal in practice (excessively cautious responses), becoming the community's standard example of the helpfulness/safety trade-off tipped too far. Benchmark gap to GPT-4 remained large.

## Reproductions & Follow-up Work

Weights and inference code are public (training data and pipeline are not, so full reproduction is closed), and the models were validated by an enormous derivative ecosystem — thousands of fine-tunes, quantizations, and merges. Superseded in the same line by `dubey-2024-llama3`; its RLHF documentation was the practical bridge between `ouyang-2022-instructgpt` and the simpler preference methods (`rafailov-2023-dpo`) that largely replaced PPO in open practice.

## Relation to the Arsenal

The ecosystem seed for the local/self-hosted stack: `llama-cpp` and `ollama` (projects/) grew around these weights, and `hu-2021-lora`/`dettmers-2023-qlora` (training-and-alignment/) became mainstream as the cheap way to fine-tune them. Superseded by `dubey-2024-llama3` (foundational/) as the current open-weight reference.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2307.09288)
- [arXiv](https://arxiv.org/abs/2307.09288)
- [Code (meta-llama/llama)](https://github.com/meta-llama/llama)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
