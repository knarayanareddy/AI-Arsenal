---
id: xiao-2023-streamingllm
title: "Efficient Streaming Language Models with Attention Sinks"
phase: inference-and-efficiency
venue: iclr
year: 2023
authors:
  - "Xiao, G."
  - "Tian, Y."
  - "Chen, B."
  - "Han, S."
  - "Lewis, M."
arxiv_id: "2309.17453"
arxiv_url: "https://arxiv.org/abs/2309.17453"
pdf_url: "https://arxiv.org/pdf/2309.17453"
code_url: "https://github.com/mit-han-lab/streaming-llm"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 1500

tldr: "Discovered 'attention sinks': models dump attention mass on the first few tokens regardless of content, so evicting them collapses windowed attention — keeping just 4 initial tokens plus a sliding window enables stable million-token streaming with no retraining"
key_contribution: "Diagnosed why sliding-window KV eviction fails (softmax must put its probability mass somewhere, and models learn to park it on initial positions) and turned the diagnosis into a zero-training fix: retain the first ~4 tokens' KV alongside the recent window — 22× faster than recomputation with stable perplexity over 4M+ tokens"

builds_on:
  - "vaswani-2017-attention"
  - "kwon-2023-pagedattention"

tags:
  - "inference"
  - "efficiency"
  - "attention"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

The obvious way to bound KV-cache growth in long-running generation — keep only the most recent tokens — catastrophically breaks perplexity the moment the first tokens are evicted. This paper explained why: softmax attention must allocate its mass somewhere, and trained models learn to park excess attention on the earliest positions ("attention sinks") independent of their content. Keep those few tokens' KV entries forever, slide a window over the rest, and models stream stably over millions of tokens with no fine-tuning. A rare paper whose contribution is equal parts interpretability finding and deployable systems trick.

## Why it's in the Arsenal

- Attention sinks became load-bearing infrastructure knowledge: the mechanism ships in HF Transformers, TensorRT-LLM, and vLLM-adjacent stacks, and explains real production failures ("model went incoherent after the cache filled")
- It is the cleanest example of an interpretability observation converting directly into a serving optimization — the pattern (diagnose where attention actually goes, then exploit it) recurs across KV-compression research

## Core Contribution

Two pieces: (1) the attention-sink phenomenon — visualization across Llama-2, MPT, Falcon, and Pythia showing strong attention to initial tokens in most layers, with the paper's dislocation experiment (replacing initial tokens with newlines still works) proving it's positional, not semantic; (2) StreamingLLM — retain sink-token KVs plus a rolling window, with positions assigned by cache slot rather than absolute index, enabling unbounded-length generation from finite cache with no retraining.

## Key Results

- Stable perplexity streaming over 4M+ tokens on Llama-2/MPT/Falcon/Pythia where sliding-window eviction diverges immediately (2023)
- Up to 22.2× per-token speedup versus the sliding-window-with-recomputation baseline at matched quality (2023)
- Pretraining with a dedicated learnable sink token lets models stream with a single sink instead of four — evidence the phenomenon is trainable-in by design (2023)

## Methodology

Attention-map analysis across four open model families; language-modeling evaluation on long concatenated corpora comparing dense, window, recompute, and StreamingLLM cache policies; ablations on sink count, window size, and cache-relative position assignment; a from-scratch 160M-parameter pretraining run testing the dedicated-sink hypothesis.

## Practical Applicability

Directly usable: the technique is implemented in mainstream serving stacks and applies wherever generation length exceeds cache budget — persistent assistants, streaming transcription/summarization, long agent loops. The critical caveat is equally practical: StreamingLLM bounds *memory*, it does not extend *memory of content* — evicted middle tokens are gone, so it suits continuous-operation workloads, not "recall fact from hour one" workloads (that's retrieval's job). Sink awareness also matters diagnostically when interpreting attention-based relevance scores, which sinks distort.

## Limitations & Critiques

No long-range recall by construction — frequently misread as a context-extension method, which it is not; quality within the window can still drift on tasks needing global coherence; the sink-token account has been refined by later interpretability work (massive activations / register-token analyses) suggesting sinks are one manifestation of a broader phenomenon; and modern very-long-context models reduce (but don't eliminate) the streaming niche it serves.

## Reproductions & Follow-up Work

Reproduced immediately across model families via released code; upstreamed into HF Transformers (`attention_sinks`-style cache), NVIDIA TensorRT-LLM, and inspired SnapKV, H2O, and the broader KV-eviction-policy literature; the dedicated-sink pretraining idea appears in several subsequent open-model training recipes.

## Relation to the Arsenal

Complements `kwon-2023-pagedattention` (inference-and-efficiency/) — paging manages KV growth, sinks make bounded caches viable — and pairs with `liu-2023-lost-in-the-middle` (retrieval-and-memory/) as the two essential correctives to naive long-context intuitions in the serving guidance of architectures/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2309.17453)
- [arXiv](https://arxiv.org/abs/2309.17453)
- [Code](https://github.com/mit-han-lab/streaming-llm)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
