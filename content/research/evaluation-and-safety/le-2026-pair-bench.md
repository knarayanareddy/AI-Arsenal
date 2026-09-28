---
id: le-2026-pair-bench
title: "Benchmarking Code Improvement with Progressive, Adaptive, and Interactive Feedback"
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2026
authors:
  - Cuong Chi Le
  - Aashish Yadavally
  - Minh Le-Anh
  - Tien N. Nguyen
arxiv_id: "2607.01360"
arxiv_url: "https://arxiv.org/abs/2607.01360"
pdf_url: "https://arxiv.org/pdf/2607.01360"
code_url: null
venue_url: null
practical_applicability: medium
reproduction_status: not-reproduced
result_status: current
has_code: false
tldr: "A repair benchmark that scores feedback-guided code improvement on trajectories rather than a single pass/fail verdict."
key_contribution: "The two orthogonal controls separate what the feedback points at from how much it reveals, which is the confound that makes binary repair scores uninterpretable."
tags:
  - code-gen
  - benchmark
  - evaluation
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
enrichment_status: draft
---

## Overview

PAIR-Bench measures code improvement: turning an incorrect or incomplete program into a more correct one through feedback-guided refinement. The critique it starts from is that conventional code-generation and program-repair evaluation is binary, a patch either passes a test suite or it does not, and that binary outcome discards partial progress, feedback use, regression risk and the shape of the refinement trajectory. The design replaces that with progressive hinting plus a structured feedback protocol with two independent controls. Failure-region control groups hidden failing tests into failure scenarios, which determines what the feedback targets, so a model can be pointed at a specific class of defect rather than a random error. Hint-depth control determines how much repair-relevant information the feedback reveals, ranging from coarse symptoms up to implementation-level guidance. Scoring repair-trajectory metrics rather than only the final verdict lets the benchmark distinguish a model that fixed the targeted failure, a model that generalised beyond the hint, a model that preserved already-correct behaviour, and how much assistance each required along the way. The authors are Cuong Chi Le, Aashish Yadavally, Minh Le-Anh and Tien N. Nguyen.

## Why it's in the Arsenal

The pass/fail protocol that dominates code-model evaluation cannot answer the question an engineering team actually has, which is whether a model is improving a codebase or overfitting to a test. A model that rewrites half the module and happens to pass has demonstrated something quite different from one that makes a targeted two-line fix, and the binary score says they are equal. Worse, a benchmark that reveals the failing assertion has told the model where to look, so a high pass rate may be measuring how much of the answer the harness leaked. PAIR-Bench makes both of those confounds explicit as controlled variables. The recurring decision it resolves is how to tell a genuinely repairing model from one exploiting a leaked test, and how much hinting your own agent loop has to supply before results stop meaning anything.

## Core Contribution

- The two orthogonal controls separate what the feedback points at from how much it reveals, which is the confound that makes binary repair scores uninterpretable.
- Trajectory metrics expose generalisation and regression, two properties a terminal pass/fail score cannot represent at all.
- Test-based scoring means no judge model, so results are reproducible and cheap compared with LLM-as-judge benchmarks.
- Hint depth is an explicit capability measure, which directly answers how much assistance a model needs.

## Key Results

1. Model comparison under leakage control: sweep hint depth and check whether the ranking survives once the feedback stops naming the fix.
2. Regression testing for agent loops: use the already-passing-behaviour metric to see whether iterative repair breaks code that worked before.
3. Prompt-engineering validation: measure how much your agent's own scaffolding contributes by comparing performance at coarse versus implementation-level hints.

## Methodology

The benchmark has three components. The task layer supplies programs that are incorrect or incomplete together with a hidden test suite, so the model does not know in advance which assertions will fail. The feedback layer is the protocol with two orthogonal controls: failure-region control clusters the hidden failing tests into failure scenarios and decides which scenario the emitted feedback describes, while hint-depth control sets the granularity of that feedback from a coarse symptom such as a failing assertion with no detail through to implementation-level guidance naming the function and the fix. The scoring layer then computes trajectory metrics over the refinement sequence rather than a terminal pass or fail, covering four things: whether the targeted failure was repaired, whether the improvement generalises to failures outside the hinted region, whether already-passing behaviour was preserved, and how many hint escalations were needed to get there. That structure is what lets the same task instance be replayed at different hint depths and produce a capability profile instead of a single number.

## Practical Applicability

The artefact is a benchmark design, so read the paper, then build a task instance from an existing repository and a hidden test suite before you can score anything with it.

```bash
curl -L -o pair-bench.pdf https://arxiv.org/pdf/2607.01360
```

```python
# the scoring distinction the design turns on: trajectory, not terminal state
metrics = {
    "targeted_repair": passes(hidden_tests[fail_region]),
    "generalisation": passes(hidden_tests[other_regions]),
    "regression_free": passes(passing_tests_before),
    "assistance_used": hint_depths_consumed,
}
```

For a reproduction, hold the model, decoding settings and test suite fixed and sweep hint depth from zero upward, which is the axis that reveals how much of the score was leakage in the first place.

## Limitations & Critiques

This is a preprint read from its abstract, with arXiv metadata verified through the API; the full paper, task inventory, language distribution and metric definitions were not read, and no score was reproduced. Designing a benchmark is not the same as releasing a runnable harness, and the abstract describes no package, dataset URL or leaderboard, so adoption means implementing the protocol yourself. Grouping hidden failing tests into failure scenarios requires per-repository annotation, which is labour-intensive and is the main hidden cost of running it. Trajectory scoring is a different measurement with different failure modes, including partial-credit metrics that reward timid edits, and it is not obviously comparable to published binary numbers. The design also says nothing about languages, repository sizes or real-world task distribution, none of which appear in the summary.

## Reproductions & Follow-up Work

The catalog records no third-party reproduction of Benchmarking Code Improvement with Progressive, Adaptive, and Interactive Feedback (arXiv:2607.01360). The reported numbers are author-reported: they have not been rerun on an independent implementation, so treat the effect sizes as a claim awaiting confirmation rather than an established result. A replication would need the same task set, the same scoring script, and a model family comparable to the one the authors evaluated.


## Relation to the Arsenal

This sits in content/research/evaluation-and-safety with the other measurement papers in this batch, and unlike the creativity or medical-judge instruments it needs no external judge, which makes it the cheapest of the group to reproduce. The models it scores are the coding-capable entries in content/projects/foundation-models, and its results would be a corrective lens on the SWE-bench-style numbers quoted there. The harness machinery comes from content/projects/benchmarks-and-evals, while the agent loops that consume its feedback profile are the frameworks in content/projects/frameworks and the harnesses in content/projects/agent-systems. Read it alongside the training-and-alignment research in content/research/training-and-alignment, since refinement under feedback is exactly the capability RL recipes claim to improve.

## Resources

- [arXiv abstract page](https://arxiv.org/abs/2607.01360)
- [PDF](https://arxiv.org/pdf/2607.01360)
