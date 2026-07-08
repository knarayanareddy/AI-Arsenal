---
id: sutskever-2014-seq2seq
title: "Sequence to Sequence Learning with Neural Networks"
phase: foundational
venue: neurips
year: 2014
authors:
  - "Sutskever, I."
  - "Vinyals, O."
  - "Le, Q. V."
arxiv_id: "1409.3215"
arxiv_url: "https://arxiv.org/abs/1409.3215"
pdf_url: "https://arxiv.org/pdf/1409.3215"
code_url: null
venue_url: "https://papers.nips.cc/paper/5346-sequence-to-sequence-learning-with-neural-networks"

practical_applicability: theoretical
reproduction_status: reproduced
result_status: foundational
has_code: false
citation_count_approx: 30000

tldr: "Framed generation as mapping an input sequence to an output sequence with an encoder-decoder RNN, establishing the seq2seq paradigm that every generative LLM (as prompt-in, text-out) still instantiates"
key_contribution: "Showed a single neural network could read a variable-length input into a fixed vector and decode it into a variable-length output, learning tasks like translation end-to-end without task-specific pipelines"

builds_on: []
implemented_in: []

tags:
  - foundational
  - llm
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Sequence-to-sequence (seq2seq) learning established the framing that every generative language model still uses: read an input sequence, produce an output sequence, trained end-to-end as one model. The original implementation used an LSTM encoder to compress the input into a fixed-length vector and an LSTM decoder to generate the output token by token. The specific RNN machinery has since been fully replaced by Transformers, but the *paradigm* — conditional generation of one sequence given another — is exactly what "prompt in, completion out" is. `result_status: foundational` means it is the conceptual ancestor of the catalog's generative models, not that its LSTM architecture is used today.

## Why it's in the Arsenal

- Every instruction-tuned or chat model in this catalog is a seq2seq system in behavior: it conditions on an input sequence (the prompt) and autoregressively produces an output sequence. This paper named and demonstrated that framing.
- It clarifies why later ideas were needed: the fixed-length bottleneck vector this paper relied on is precisely the limitation that attention (and then the Transformer) removed, so this paper is the necessary setup for understanding why attention mattered.
- `practical_applicability: theoretical` — you never build an LSTM seq2seq model for LLM work now, but the encoder-decoder vs decoder-only distinction and the autoregressive decoding loop trace directly to this work.

## Core Contribution

The paper's central demonstration was that a general neural network, with no task-specific structure, could learn to map arbitrary input sequences to arbitrary output sequences. The architecture used one multilayer LSTM to encode the input into a fixed-dimensional vector representation and a second LSTM to decode the target sequence from that vector, generating one token at a time and feeding each prediction back as input for the next step (autoregressive decoding). A now-famous practical trick was reversing the order of the source tokens, which shortened the effective distance between corresponding input and output positions and markedly improved learning. Crucially, the whole system was trained end-to-end to maximize the likelihood of the correct output sequence, replacing hand-engineered translation pipelines with a single learned model.

## Key Results

- Achieved a BLEU score of 34.8 on the WMT'14 English-to-French translation task (2014) using an LSTM ensemble, competitive with strong phrase-based statistical systems of the era
- Reversing source-sentence word order gave a substantial BLEU improvement, one of the paper's most-cited empirical findings
- Showed the learned sentence representations captured word order and were relatively invariant to voice (active/passive), evidence the fixed vector encoded meaningful structure
- These are 2014 machine-translation numbers included for historical context; they say nothing about current model quality. The enduring contribution is the seq2seq framing (see Core Contribution), not the leaderboard standing, which attention-based models soon surpassed.

## Methodology

The authors trained deep LSTMs (4 layers) on WMT'14 En–Fr, using an ensemble and beam search during decoding. Inputs were tokenized and the source order reversed; the model maximized log-likelihood of the reference translation. They analyzed the geometry of the learned fixed-length sentence vectors to argue the encoder captured semantic and syntactic structure. The comparison against contemporaneous statistical machine-translation baselines isolates the value of end-to-end neural sequence modeling.

## Practical Applicability

There is no scenario in modern LLM engineering where you would implement this LSTM architecture. Its value is conceptual: it defines the input-sequence-to-output-sequence contract that all generative models honor, and it makes the encoder-decoder vs decoder-only design axis legible. When you reason about why a chat model is autoregressive, why decoding uses beam search or sampling, or why encoder-decoder models (T5) differ from decoder-only ones (GPT-style), you are working within the frame this paper established.

## Limitations & Critiques

- The fixed-length encoding vector is an information bottleneck: long inputs are compressed into a single vector, degrading quality — the exact problem attention mechanisms were introduced to fix shortly after.
- RNN/LSTM sequence processing is inherently sequential and does not parallelize across positions, which is why Transformers displaced it for large-scale training.
- The specific architecture is obsolete; only the paradigm survives.

## Reproductions & Follow-up Work

Seq2seq with attention (Bahdanau et al., 2014) directly addressed the fixed-vector bottleneck, and the Transformer ([Attention Is All You Need](../foundational/vaswani-2017-attention.md)) replaced recurrence entirely while keeping the encoder-decoder framing. Encoder-decoder LLMs like T5 ([Raffel et al.](../foundational/raffel-2019-t5.md)) are modern descendants; decoder-only models (GPT lineage) specialize the decoder half.

## Relation to the Arsenal

- Conceptual ancestor of every generative model in the catalog's model-layer, all of which perform conditional sequence generation.
- Pairs with [Attention Is All You Need](../foundational/vaswani-2017-attention.md) and [T5](../foundational/raffel-2019-t5.md) to trace the arc from RNN seq2seq → attention → Transformer encoder-decoder/decoder-only designs.

## Resources

- [arXiv abstract](https://arxiv.org/abs/1409.3215)
- [PDF](https://arxiv.org/pdf/1409.3215)
- [NeurIPS 2014 paper page](https://papers.nips.cc/paper/5346-sequence-to-sequence-learning-with-neural-networks)
