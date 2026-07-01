---
id: schick-2023-toolformer
title: "Toolformer: Language Models Can Teach Themselves to Use Tools"
phase: agents-and-reasoning
venue: neurips
year: 2023
authors:
  - "Schick, T."
  - "Dwivedi-Yu, J."
  - "Dessì, R."
  - "Raileanu, R."
  - "et al."
arxiv_id: "2302.04761"
arxiv_url: "https://arxiv.org/abs/2302.04761"
pdf_url: "https://arxiv.org/pdf/2302.04761"
code_url: "https://github.com/lucidrains/toolformer-pytorch"
venue_url: "https://papers.nips.cc/paper_files/paper/2023"

practical_applicability: theoretical
reproduction_status: partially-reproduced
result_status: foundational
has_code: true
citation_count_approx: 1400

tldr: "Showed a model can teach itself which API calls to make via self-supervised annotation and perplexity-based filtering, but this approach is now superseded by native function-calling built into current frontier model APIs"
key_contribution: "Showed a language model can self-supervise its own training data for tool use: generating candidate API calls, filtering them by whether they reduce the perplexity of the following text, and fine-tuning on the filtered examples -- with no human-labeled tool-use annotations required"

builds_on:
  - brown-2020-gpt3
implemented_in: []

tags:
  - agents
  - tool-use
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper showed that a language model can teach itself when and how to call external tools (a calculator, a search engine, a calendar, a translation system) through a self-supervised process: generating candidate API calls at various points in text, checking whether executing that call and inserting its result actually helps predict the following text (measured via perplexity reduction), and fine-tuning on the filtered examples that pass this check — with no human-labeled tool-use data required. Note: this specific self-supervised training approach has been superseded in practice, not by a competing research technique, but by native function-calling support built directly into current frontier model APIs (OpenAI, Anthropic, and others), which achieves the same practical goal — a model deciding when and how to call a tool — far more directly, without requiring this paper's self-supervised annotation-and-filtering training pipeline.

## Why it's in the Arsenal

- Understanding this paper's approach is useful for understanding *why* native function-calling capability exists as a trained-in model feature today rather than something every application must implement itself via prompting or fine-tuning — Toolformer is the research lineage that demonstrated tool-use could be taught to a model at all, which model providers then built directly into their models' training and APIs.
- `practical_applicability: theoretical` is an honest, non-inflated classification given `result_status: superseded`: almost no engineer today needs to implement Toolformer's self-supervised annotation pipeline themselves, since virtually every frontier model now ships built-in function-calling support that solves the same problem more directly — this paper's value is understanding the underlying idea, not implementing its specific method.

## Core Contribution

Prior approaches for giving a language model tool-use ability either required extensive human-labeled examples of correct tool use, or relied purely on prompting a model to output tool calls in a specific format with no training to reinforce when that's actually helpful. This paper's contribution is a self-supervised technique for generating tool-use training data automatically: sample candidate positions in a text corpus where an API call might help, generate several candidate calls at each position, execute them, and measure whether inserting the result actually reduces the model's perplexity on the text that follows compared to not calling the tool — keeping only the candidate calls that pass this filter as training examples, then fine-tuning the model on this self-generated, self-filtered dataset. In engineering terms: this is a way to bootstrap tool-use training data with zero human annotation, using the model's own next-token prediction objective as the filtering signal for whether a given tool call was actually useful.

## Key Results

- A GPT-J model fine-tuned with Toolformer's self-supervised approach substantially improved zero-shot performance on tasks including question answering, mathematical reasoning, and fact-checking, compared to a much larger unmodified GPT-3-scale base model, in the paper's own evaluation (2023) — the paper's central efficiency claim, that self-taught tool use closes gaps that raw scale alone does not
- The paper's own ablations showed the perplexity-reduction filtering step was important to result quality — training on all generated candidate calls without this filter, including ones that didn't actually help, degraded performance relative to the filtered approach (2023)
- These specific benchmark improvements are dated to 2023-era model comparisons (GPT-J and GPT-3-class models); they should not be read as current comparisons, both because those specific models are no longer current and because the broader approach itself has been superseded by built-in function calling, as discussed in Limitations

## Methodology

Given a corpus of unlabeled text, the model (prompted with a small number of hand-written demonstrations for each tool type) generates candidate positions and API calls that might plausibly help predict the surrounding text — for example, inserting a calculator call before a numerical result, or a search-engine call before a factual claim (paper Section 2). Each candidate call is actually executed against the real tool, and the resulting output is inserted into the text at that position. The model then computes the perplexity of the text that follows both with and without the inserted API call and its result; if the call sufficiently reduces perplexity (indicating it genuinely helped predict subsequent tokens, not just added noise), that example is kept as a training instance. The model is then fine-tuned on this dataset of self-generated, self-filtered (input-text, API-call, output, continuation) examples using a standard language-modeling objective — no reinforcement learning or human feedback is involved, this is a self-supervised data-generation-then-fine-tuning pipeline.

## Practical Applicability

If you are trying to understand the conceptual origin of "a model that decides for itself when to call a tool," this paper's self-supervised approach is the key early demonstration that tool-use is a learnable, bootstrappable capability rather than something that must be hand-engineered per application — but you should not implement this paper's specific technique for a production system today. Instead, use native function-calling support built directly into current frontier model APIs (OpenAI's function calling, Anthropic's tool use, and similar), which achieves the same practical outcome (a model deciding when and how to call a tool) through the model provider's own training pipeline, without requiring you to build Toolformer's self-supervised annotation-and-filtering process yourself. This is a clean example of a research technique being superseded not by a better version of the same technique, but by the underlying capability being absorbed directly into the base model training process by providers, making the original bootstrapping technique largely unnecessary for downstream users.

## Limitations & Critiques

`code_url` here points to an unofficial, third-party PyTorch reimplementation (there are in fact several independent community reimplementations, none of which is Meta's own official code, since Meta never released official Toolformer training code or weights) — `has_code: true` is defensible because working implementations do exist and are usable, but this should be understood as community reimplementation rather than the original authors' own release, and `reproduction_status: partially-reproduced` reflects that community reimplementations exist and are usable, but no large-scale, fully faithful reproduction of the paper's exact original results with the original proprietary training setup has been independently confirmed. The paper's own approach is also inherently limited by what kinds of tool use can be effectively bootstrapped via a perplexity-reduction signal — tasks where a tool's usefulness only becomes apparent much later in a conversation or task, rather than in the immediately following tokens, are not well-suited to this specific self-supervision signal, a limitation the paper's scope (fairly local, next-few-tokens-relevant tool calls like calculators and short factual lookups) does not need to address but which matters for more complex, longer-horizon agentic tool use. The most significant limitation, though not a "failure" of the paper's own claims, is that the field has moved on: native function-calling built into frontier model APIs has made this paper's specific bootstrapping technique largely unnecessary for practitioners, which is why `result_status: superseded` and `practical_applicability: theoretical` are the honest classifications here.

## Reproductions & Follow-up Work

No official code or model weights were released by the original authors; several independent community reimplementations exist (in PyTorch, by different authors/maintainers), constituting partial, not fully verified-at-scale, reproduction of the paper's approach. The most significant "follow-up," though not a research paper per se, is the broad industry adoption of native function-calling as a built-in model capability by essentially every major LLM provider since this paper's publication — a real-world validation that the underlying idea (models deciding when to call tools) was sound and valuable, even as the specific self-supervised bootstrapping mechanism this paper proposed was superseded by providers building the capability directly into model training.

## Relation to the Arsenal

This paper builds on `brown-2020-gpt3` (foundational/) for its base language model and self-supervised training approach. It is a useful contrasting case alongside `yao-2022-react` (this phase folder): both address language models using external tools, but ReAct's approach (interleaving reasoning with actions at inference time via prompting) has remained current practice, while Toolformer's approach (training the model itself via self-supervised bootstrapping to decide when to call tools) has been superseded by providers building equivalent capability directly into model training — a useful illustration that not every early tool-use research direction ages the same way, even when both address genuinely related problems.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2302.04761)
- [arXiv](https://arxiv.org/abs/2302.04761)
- [Official Code](https://github.com/lucidrains/toolformer-pytorch) — unofficial third-party PyTorch reimplementation; no official code was released by the original authors
- [Venue Proceedings](https://papers.nips.cc/paper_files/paper/2023)
- [Papers With Code](https://paperswithcode.com/paper/toolformer-language-models-can-teach)
- [Key Reproduction / Analysis](https://github.com/conceptofmind/toolformer) — a second independent community reimplementation, useful for cross-checking behavior given no official reference implementation exists
