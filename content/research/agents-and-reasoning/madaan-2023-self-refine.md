---
id: madaan-2023-self-refine
title: "Self-Refine: Iterative Refinement with Self-Feedback"
phase: agents-and-reasoning
venue: neurips
year: 2023
authors:
  - "Madaan, A."
  - "Tandon, N."
  - "Gupta, P."
  - "Hallinan, S."
  - "et al."
arxiv_id: "2303.17651"
arxiv_url: "https://arxiv.org/abs/2303.17651"
pdf_url: "https://arxiv.org/pdf/2303.17651"
code_url: null
venue_url: "https://papers.nips.cc/paper_files/paper/2023"

practical_applicability: low
reproduction_status: no-code
result_status: challenged
has_code: false
citation_count_approx: 1500

tldr: "Showed self-critique-then-revise loops can improve output quality, but later rigorous studies found weak initial-response prompts inflated the reported improvement -- treat this with caution, not as a validated default"
key_contribution: "Proposed an iterative loop where a model generates output, critiques its own output, and revises based on that self-critique, with no additional training and no external feedback signal, reporting quality improvements across several generation tasks"

builds_on:
  - wei-2022-chain-of-thought
implemented_in: []

tags:
  - reasoning
  - llm
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper proposed an iterative self-feedback loop — generate output, critique it, revise based on that critique — with no additional training and no external ground-truth signal, reporting quality improvements across several generation tasks. Note: this specific paper's findings have been directly and substantively challenged. A more rigorous, carefully controlled 2023 study ("Large Language Models Cannot Self-Correct Reasoning Yet," Huang et al.) found that intrinsic self-correction (correction using no external feedback, exactly Self-Refine's setting) often does not improve — and can even worsen — reasoning task performance, and specifically identified that Self-Refine's own experimental setup used deliberately weak prompts for generating the *initial* response, which inflates the apparent improvement from the self-correction step. This is a `result_status: challenged` entry, and that challenge should be read before adopting this technique.

## Why it's in the Arsenal

- Self-Refine represents an important, widely-cited claim in the "can LLMs improve their own output through self-critique" debate, and understanding both the original claim and its subsequent, credible challenge is necessary context for evaluating any system design that relies on model self-correction without external verification.
- `practical_applicability: low` is a deliberately honest, non-inflated classification given the credible challenge to this paper's own experimental methodology: the technique's demonstrated benefit is narrower and less reliable than the original paper's headline framing suggests, and should not be treated as a default reasoning-improvement technique without independent verification for your specific task.

## Core Contribution

This paper's proposed technique is straightforward: given an initial model-generated output for a task, prompt the same model to critique its own output (identify specific flaws or areas for improvement), then prompt it again to revise the output based on that self-generated critique — repeating this generate-critique-revise loop for several iterations, with no external feedback, ground truth, or additional training involved at any step. The paper reported this loop improving output quality across a range of generation tasks (dialogue response generation, code optimization, and others) as measured by both automated metrics and human evaluation in its own experiments.

## Key Results

- Self-Refine reportedly improved task performance across the paper's evaluated generation tasks (including dialogue response generation and code optimization) using GPT-3.5 and GPT-4-class models, based on both automated metrics and human evaluation in the paper's own study (2023) — the paper's own headline claim
- A subsequent, more rigorous and specifically controlled study (Huang et al., "Large Language Models Cannot Self-Correct Reasoning Yet," 2023) directly examined self-correction methods including Self-Refine and found that when initial responses are generated with reasonably strong prompts (not the paper's original, deliberately weaker prompts), the apparent improvement from self-correction substantially diminishes or disappears entirely on reasoning tasks
- The same critical follow-up study identified that Self-Refine's original experimental design used prompts for the *initial* response generation step that were weaker than necessary, which has the effect of inflating the measured improvement attributable to the subsequent self-correction step — a methodological critique of how the original paper measured its own claimed effect, not merely a disagreement about interpretation

## Methodology

The loop has three repeated steps (paper Section 3): first, the model generates an initial output for the given task; second, the same model is prompted to produce feedback critiquing specific aspects of that output; third, the model is prompted again to produce a revised output incorporating that feedback. This repeats for a fixed number of iterations or until the model's own feedback indicates no further improvement is needed. Critically, at no point in this loop is there any external, ground-truth signal telling the model whether its critique or revision is actually correct — the entire process relies on the model's own judgment of its own output, applied recursively to itself.

## Practical Applicability

Given the credible methodological challenge to this paper's own findings, the honest practical guidance is: intrinsic self-correction (a model critiquing and revising its own output with no external verification signal) should not be assumed to reliably improve reasoning-task quality, and if you are building a system that depends on this kind of self-correction loop, you should independently verify the improvement on your specific task and with your specific initial-response prompting, rather than assuming this paper's reported gains transfer directly — the follow-up critique specifically shows that stronger initial prompting can eliminate the apparent benefit. If your use case can incorporate genuine external feedback (test execution results for code, retrieved facts for factual claims, a separate verifier model, or human feedback) rather than relying purely on the model's own unaided self-judgment, that is a meaningfully different and more reliably validated setting — the broader self-correction literature (including the critical follow-up work cited here) consistently finds that self-correction with real external signal is more robust than intrinsic, unaided self-correction.

## Limitations & Critiques

The central limitation here is not a minor caveat but a direct, credible methodological challenge to the original paper's own claims: Huang et al.'s "Large Language Models Cannot Self-Correct Reasoning Yet" (2023) specifically identifies that Self-Refine's initial-response prompts were weaker than they needed to be, meaning some or much of the paper's reported improvement reflects fixing an artificially weakened starting point rather than a genuine, generalizable self-correction capability. A broader survey of the self-correction literature ("When Can LLMs Actually Correct Their Own Mistakes?") found that across many self-correction studies including this one, either oracle/ground-truth information was used during the self-correction process in ways that wouldn't be available in real deployment, or initial responses were deliberately weakened — concluding that no major work has shown successful self-correction of responses using only the model's own unaided feedback under genuinely fair experimental conditions. `has_code: false` and `reproduction_status: no-code` reflect that no official code was released for this paper; separately, and more significantly, `result_status: challenged` reflects that independent attempts to verify the technique's core claim under more rigorous conditions have found the effect substantially weaker or absent, not merely "not yet checked."

## Reproductions & Follow-up Work

The most significant and directly relevant follow-up work is a direct challenge rather than a confirming reproduction: Huang et al.'s "Large Language Models Cannot Self-Correct Reasoning Yet" specifically re-examined self-correction methods including Self-Refine under more carefully controlled conditions and found the reported improvements do not hold up when initial responses are generated with reasonably strong prompts. A broader critical survey, "When Can LLMs Actually Correct Their Own Mistakes? A Critical Survey," extends this critique across the wider self-correction literature, identifying similar methodological issues (oracle information, weak initial prompts) in several other self-correction papers beyond just this one, and concludes no major work has yet shown successful intrinsic self-correction (no external feedback) under fair experimental conditions.

## Relation to the Arsenal

This paper builds on `wei-2022-chain-of-thought` (this phase folder) in the general sense of using the model's own generated text as an input to further reasoning, though its specific technique (self-critique-then-revise with no external signal) is architecturally distinct from CoT's single-pass reasoning-elicitation approach. It is a useful cautionary contrast to `bai-2022-constitutional-ai` (training-and-alignment/): both rely on a model judging or critiquing its own or another model's output, but Constitutional AI's judgments are used to construct training data for a subsequent training stage (with the resulting model then evaluated by external human raters), whereas Self-Refine's self-judgments are used directly and repeatedly at inference time with no external check at all — a structural difference in how much "self-referential" judgment the technique relies on without independent verification, which may help explain why one has held up better under scrutiny than the other.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2303.17651)
- [arXiv](https://arxiv.org/abs/2303.17651)
- [Venue Proceedings](https://papers.nips.cc/paper_files/paper/2023)
- [Papers With Code](https://paperswithcode.com/paper/self-refine-iterative-refinement-with-self)
- [Key Reproduction / Analysis](https://arxiv.org/pdf/2310.01798) — Huang et al.'s "Large Language Models Cannot Self-Correct Reasoning Yet," the direct, credible methodological challenge to this paper's claims, specifically identifying weak initial-response prompting as a confound in the original results
