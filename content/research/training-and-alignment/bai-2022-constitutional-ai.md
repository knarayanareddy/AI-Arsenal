---
id: bai-2022-constitutional-ai
title: "Constitutional AI: Harmlessness from AI Feedback"
phase: training-and-alignment
venue: arxiv-preprint
year: 2022
authors:
  - "Bai, Y."
  - "Kadavath, S."
  - "Kundu, S."
  - "Askell, A."
  - "et al."
arxiv_id: "2212.08073"
arxiv_url: "https://arxiv.org/abs/2212.08073"
pdf_url: "https://arxiv.org/pdf/2212.08073"
code_url: null
venue_url: null

practical_applicability: medium
reproduction_status: no-code
result_status: current
has_code: false
citation_count_approx: 2200

tldr: "Trained a harmless assistant using AI self-critique and AI-judged preferences instead of human harm labels -- consider RLAIF when human labeling of harmful content is a bottleneck, though no reference code exists to reproduce it directly"
key_contribution: "Showed a model can be trained to be harmless using only a written list of principles (a 'constitution') plus its own self-critique and self-generated preference judgments, replacing human-labeled harm data with AI-generated feedback (RLAIF)"

builds_on:
  - ouyang-2022-instructgpt
implemented_in: []

tags:
  - alignment
  - rlhf
  - training
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper showed that a model can be trained to be harmless using a two-phase self-supervision process — generating and revising its own responses against a written set of principles, then training a preference model from the AI's own comparisons of response pairs — replacing the human-labeled harm data that `ouyang-2022-instructgpt`-style RLHF requires for the harmlessness portion of alignment. The technique (RLAIF, reinforcement learning from AI feedback) remains current practice conceptually, and is the general approach underlying later Claude models' alignment work, though this specific paper's exact training code and constitution were never publicly released, which is an important and honest caveat on how directly reproducible it is.

## Why it's in the Arsenal

- This paper established RLAIF (AI-generated feedback replacing human-labeled feedback for a specific alignment sub-problem) as a viable alternative to pure RLHF specifically for harmlessness training, which matters whenever human labeling of harmful/toxic content is a bottleneck (due to cost, labeler wellbeing concerns, or the need for principles to scale faster than a labeling pipeline can).
- `practical_applicability: medium` is an honest classification given `reproduction_status: no-code`: the conceptual technique (write principles, have the model critique/revise against them, train preferences from AI judgments) is broadly reusable and has influenced how later alignment work approaches harmlessness, but the paper's own specific implementation was never released, so most engineers encounter this idea through its influence on later systems rather than by directly running this paper's code.

## Core Contribution

Standard RLHF for harmlessness (as used in InstructGPT-style pipelines) requires human labelers to identify harmful outputs and rank response pairs by harmfulness — a process that scales linearly with labeling effort and exposes human labelers to harmful content. This paper's contribution is a two-phase alternative: in the supervised phase, the model generates a response, then critiques its own response against a randomly selected principle from a written "constitution," then revises the response based on that self-critique — iterated multiple times to produce a supervised fine-tuning dataset with no human harm labels at all. In the RL phase, the model itself judges which of two sampled responses better satisfies the constitution's principles, producing an AI-generated preference dataset that trains a preference model, which then drives RL exactly as in standard RLHF — except the preference labels come from the model itself rather than human raters. In engineering terms: this replaces the harm-labeling human labor cost with model-generated judgments guided by an explicit, inspectable set of written principles.

## Key Results

- The resulting "RL-CAI" model was preferred by crowdworkers over models trained with human-feedback-labeled harmfulness data from the paper's own prior work (Bai et al., 2022a) and related work (Ganguli et al., 2022), per the paper's own human preference evaluation (2022) — the paper's central claim, that AI-feedback-driven harmlessness training can match or exceed human-feedback-driven harmlessness training
- The technique produced a "non-evasive" harmless assistant — one that explains its objections to harmful requests rather than simply refusing or deflecting — a qualitative behavioral property the paper highlights as distinct from purely refusal-trained models (2022)
- Chain-of-thought-style reasoning during the self-critique step improved both human-judged response quality and transparency of the model's decision-making process, per the paper's own ablations (2022) — this specific finding predates and foreshadows the broader adoption of explicit reasoning traces in later alignment and reasoning-model work

## Methodology

The supervised phase samples an initial response from a helpful-only model, generates a self-critique of that response against one of several principles drawn from a written constitution, then generates a revision incorporating that critique — repeated for multiple critique-revision rounds — and the original model is then fine-tuned on the resulting (prompt, revised-response) pairs (paper Section 3.1). The RL phase samples two responses from this fine-tuned model for a given (typically harm-adjacent) prompt, presents the model itself with a multiple-choice comparison asking which response better satisfies a randomly chosen constitutional principle, and uses these AI-generated preference judgments to train a preference model exactly as a human-labeled preference model would be trained in standard RLHF — the resulting preference model then drives a standard RL fine-tuning stage (paper Section 3.4). Both phases can incorporate explicit chain-of-thought reasoning before the model produces its critique or preference judgment, which the paper reports improves both the quality and interpretability of the resulting behavior.

## Practical Applicability

If you are building an alignment pipeline where human labeling of harmful content is a genuine bottleneck — due to cost, scale, or the psychological toll of exposing human labelers to harmful material — this paper's core idea (write explicit principles, have the model self-critique and self-judge against them) is a validated alternative worth adapting, even though you cannot directly reuse this paper's own code or exact constitution since neither was released. If you are evaluating why a production assistant model explains its refusals rather than simply deflecting, this paper's "non-evasive harmlessness" framing is often the underlying design goal, even in systems that don't use this exact RLAIF technique. This is not a plug-and-play recipe: implementing a Constitutional-AI-style pipeline requires writing your own constitution and building your own self-critique/self-judgment loop from the paper's description, since no reference implementation exists.

## Limitations & Critiques

`has_code: false` and `reproduction_status: no-code` reflect a genuine, significant limitation: Anthropic never publicly released the training code, the exact constitution used, or model weights for this paper, meaning no independent, faithful reproduction of the exact system described exists — this is a meaningfully bigger reproducibility gap than papers with released code but limited third-party validation, since here the core method itself must be reimplemented from the paper's text alone. The paper's own evaluation, like `ouyang-2022-instructgpt`'s, relies on Anthropic's internal crowdworker preference judgments and internal harm-adjacent prompt sets, which are not independently auditable. A structural risk the paper's own framing does not fully resolve: since both the self-critique and self-judgment steps are performed by variants of the same or a related model, there is an inherent risk of the technique reinforcing the base model's existing blind spots or biases rather than correcting them, since no external (human or differently-trained) signal is present to catch failures the model itself cannot recognize as failures. No independent, direct challenge to this paper's core empirical claims has been identified as of `last_reviewed: 2026-07-01` — the main limitation is the lack of independent reproducibility, not a documented failed replication.

## Reproductions & Follow-up Work

No independent, faithful reproduction of this paper's exact system exists, consistent with `reproduction_status: no-code` — the training code, constitution text, and model weights were never released. The general RLAIF concept (AI-generated feedback replacing or supplementing human feedback) has influenced subsequent alignment approaches broadly, including reported aspects of later Claude models' alignment work, though Anthropic has not published a direct, fully specified successor paper in this catalog as of `last_reviewed: 2026-07-01`. `deepseek-ai-2025-r1` (this phase folder) uses a different but conceptually related idea — training via automated, verifiable reward signals rather than human labels — worth reading as a parallel case of reducing dependence on human-labeled training signal, applied to reasoning rather than harmlessness.

## Relation to the Arsenal

This paper builds on `ouyang-2022-instructgpt` (this phase folder), explicitly positioning itself as improving upon and partially replacing the human-feedback-labeled harmfulness training that paper's RLHF pipeline requires — read `ouyang-2022-instructgpt` first for the baseline RLHF pipeline this paper modifies specifically for the harmlessness sub-problem. `deepseek-ai-2025-r1` (this phase folder) is a useful contrasting case: both papers reduce dependence on human-labeled training signal, but via different mechanisms (AI self-judgment here, verifiable automated rewards there).

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2212.08073)
- [arXiv](https://arxiv.org/abs/2212.08073)
- [Papers With Code](https://paperswithcode.com/paper/constitutional-ai-harmlessness-from-ai)
- [Key Reproduction / Analysis](https://queirozf.com/entries/paper-summary-constitutional-ai) — independent third-party technical summary of the method's supervised and RL phases, useful given no official code was released to consult directly
