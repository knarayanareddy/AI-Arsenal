---
id: yang-2024-qwen25-math
title: "Qwen2.5-Math Technical Report: Toward Mathematical Expert Model via Self-Improvement"
phase: training-and-alignment
venue: arxiv-preprint
year: 2024
authors:
  - "Yang, A."
  - "Zhang, B."
  - "Hui, B."
  - "Zhang, Z."
  - "et al."
arxiv_id: "2409.12122"
arxiv_url: "https://arxiv.org/abs/2409.12122"
pdf_url: "https://arxiv.org/pdf/2409.12122"
code_url: "https://github.com/QwenLM/Qwen2.5-Math"
venue_url: null

practical_applicability: low
reproduction_status: code-available
result_status: foundational
has_code: true
citation_count_approx: 200

tldr: "Documented a self-improvement pipeline (using the model to generate and filter its own better math training data) producing strong math-specific models -- narrow applicability, and Qwen's own successors have since surpassed these results"
key_contribution: "Showed an iterative self-improvement loop -- using earlier model checkpoints to generate synthetic training data, reward models, and verification signal for later checkpoints -- can train a small, math-specialized model family that outperforms much larger general-purpose models on math benchmarks"

builds_on: []
implemented_in: []
corresponding_project_entry: qwen-2-5

tags:
  - training
  - reasoning
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: draft
---

## Overview

This technical report documents Qwen2.5-Math, a family of math-specialized models trained via an iterative self-improvement pipeline: earlier checkpoints of the model generate synthetic training data, reward-model signal, and verification feedback used to train stronger later checkpoints, all within the Qwen model family itself. Note: this paper's results are narrow in scope by design (math-specific benchmarks) and have been superseded by Alibaba's own subsequent Qwen model generations (Qwen3 and later math-capable releases), consistent with this catalog's `qwen-2-5` project entry's own finding that the broader Qwen2.5 generation has been surpassed by Qwen3.x/3.5/3.6/3.7. This entry carries `enrichment_status: draft` because a full independent-citation-and-critique search for this narrower, more specialized paper was not exhaustively pursued beyond the checks below, consistent with the timeboxed research policy for less prominent papers.

## Why it's in the Arsenal

- The self-improvement training loop this paper documents (use the model's own earlier checkpoints to generate and filter training data for later checkpoints) is a reusable pattern for building domain-expert models beyond just mathematics, even though this specific paper's benchmark results are math-specific and narrow.
- `practical_applicability: low` is an honest, non-inflated classification: this paper's direct relevance is narrow — useful specifically if you are building a specialized math-reasoning model — and most engineers in this catalog's broader audience will not directly apply this paper's specific pipeline, even if the general self-improvement pattern is worth knowing about.

## Core Contribution

Prior approaches to building domain-specialized models typically relied on either large amounts of human-curated domain data or distillation from a larger general-purpose teacher model. This paper's contribution is a self-improvement loop specific to mathematical reasoning: an earlier Qwen2.5-Math checkpoint is used to generate synthetic math problems and solutions, a reward model (also part of the pipeline) filters and scores this synthetic data for quality and correctness, and the filtered data trains the next checkpoint — iterated multiple times, using the model's own growing capability to bootstrap better training data rather than requiring ever-larger amounts of human-curated math content. In engineering terms: this is a recipe for using an existing capable model to generate its own improved training signal in a domain where correctness is at least partially automatically verifiable (math), reducing dependence on human-authored training data for that specific domain.

## Key Results

- Qwen2.5-Math models reportedly outperformed several larger general-purpose contemporary models on math-specific benchmarks including GSM8K and MATH, per the paper's own evaluation (2024) — the paper's headline claim, that domain specialization via self-improvement can beat raw scale for math tasks specifically
- The self-improvement pipeline showed measurable per-iteration improvement across successive checkpoints in the paper's own ablation studies (2024), evidence supporting the core self-improvement claim rather than the specific benchmark scores being the main contribution
- These 2024-era GSM8K/MATH benchmark numbers are now dated: per the Qwen3 Technical Report's own published comparison table, Qwen3-32B substantially outperforms Qwen2.5-32B on the same class of math and STEM benchmarks (GPQA, GSM8K, MATH), confirming Alibaba's own subsequent generation has surpassed this paper's specific results — cite this paper's numbers as historical context for the self-improvement technique, not as current SOTA

## Methodology

The pipeline begins with an initial Qwen2.5-Math checkpoint and a reward model trained on math-specific preference or correctness data; the checkpoint generates candidate solutions to a large set of math problems (both existing and synthetically generated), the reward model filters and scores these generations for quality and correctness, and the resulting high-quality filtered dataset trains the next model checkpoint (paper Section 3). This loop repeats for multiple rounds, with the reward model itself also potentially being refined using signal from later, stronger checkpoints, creating a co-evolving improvement cycle rather than a single one-shot data-generation-then-training step. The paper reports this self-improvement approach as more sample-efficient for the math domain specifically than relying purely on human-curated datasets, since automatically checkable correctness (a numeric or symbolic final answer) provides a strong, scalable filtering signal that doesn't require additional human labeling per iteration.

## Practical Applicability

If you are specifically building a domain-expert model for mathematical reasoning, this paper's self-improvement pipeline is a validated, concrete recipe worth adapting, though you should expect to combine it with more current base models than the original Qwen2.5 checkpoints this paper used, since Qwen's own newer generations have already surpassed these results. If your domain has similarly automatically-verifiable correctness (some code tasks, logic puzzles, certain structured-output tasks), the general self-improvement pattern — bootstrap training data quality using the model's own generation-plus-verification capability rather than relying purely on human-curated data — is the transferable lesson here, even though this paper's specific implementation is math-only. For most other use cases (general-purpose model selection, non-math reasoning tasks), this paper's direct applicability is limited, which is why `practical_applicability: low` rather than `medium` or `high` is the honest classification.

## Limitations & Critiques

This catalog's own `qwen-2-5` project entry has an already-documented, unresolved data-quality issue directly relevant to this paper: the project entry's `github_url` points to the `QwenLM/Qwen3` repository rather than a genuine Qwen2.5 repository, an inherited bug from an earlier population sprint flagged for maintainer review rather than fixed unilaterally. This research entry does not attempt to independently resolve that data-quality issue; it is noted here only so a reader cross-referencing `corresponding_project_entry: qwen-2-5` understands the existing caveat rather than assuming this paper's own scope resolves it. The self-improvement pipeline's reliance on automatically-verifiable correctness limits how directly it generalizes beyond math and similarly-checkable domains — the paper's own scope is explicit about this, but it is worth restating since the pipeline concept is sometimes cited more broadly than the paper's own evidence supports. `enrichment_status: draft` reflects that a full timeboxed search for independent post-publication critique of this narrower technical report did not surface substantive findings beyond direct benchmark comparisons already covered above; deeper critique, if any exists, was not identified within the search budget applied.

## Reproductions & Follow-up Work

Qwen2.5-Math's code and models were officially released by the QwenLM team (`github.com/QwenLM/Qwen2.5-Math`), and the broader Qwen model lineage's continued development (Qwen3 and its own math-capable variants, per the Qwen3 Technical Report's published benchmark comparisons) constitutes the most direct and authoritative "follow-up," since it is the same organization iterating on and surpassing this paper's own results. No independent third-party reproduction specifically validating this paper's self-improvement training pipeline (as opposed to simply using the released model weights) has been identified as of `last_reviewed: 2026-07-01`.

## Relation to the Arsenal

This paper's `corresponding_project_entry`, `qwen-2-5` (in `content/projects/foundation-models/`), documents the broader Qwen2.5 model family's ecosystem position, including the already-flagged `github_url` data-quality caveat noted above — this research entry covers this specific math-specialized technical report's training methodology, not the broader Qwen2.5 family's general capabilities, which is why the two entries' scopes are deliberately narrower and broader respectively rather than duplicative.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2409.12122)
- [arXiv](https://arxiv.org/abs/2409.12122)
- [Official Code](https://github.com/QwenLM/Qwen2.5-Math)
- [Papers With Code](https://paperswithcode.com/paper/qwen2-5-math-technical-report-toward)
- [Key Reproduction / Analysis](https://arxiv.org/html/2505.09388v1) — the Qwen3 Technical Report's own published benchmark comparison table, confirming Qwen3-32B surpasses Qwen2.5-32B on the same class of math/STEM benchmarks this paper reports
