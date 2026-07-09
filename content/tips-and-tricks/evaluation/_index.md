---
title: "Evaluation Tips & Tricks"
section: "tips-and-tricks/evaluation"
auto_generated: false
---

# Evaluation Tips & Tricks

## What belongs here

Interventions for eval harness setup, metric selection, golden dataset construction, LLM-as-judge calibration, and regression detection — anything that changes how you measure whether the system is working, not the system itself.

## What does NOT belong here

Building an entire evaluation framework or LLM-as-judge pipeline from scratch is a disguised architecture decision and belongs in `build-examples/` or `architectures/`, not here. A tip about tracing or logging infrastructure belongs in `debugging-and-observability/` unless the failure mode is specifically about growing or versioning an eval dataset.

## Quick-start: highest impact tips in this phase

- [Add an Eval Harness Before Refactoring Prompts or Retrieval Logic](./add-evals-before-refactors.md) — establish a baseline before changing anything, so regressions are measurable
- [Add the Failing Question to Your Eval Set Before Fixing the Bug](./use-golden-questions-for-every-bug-fix.md) — turn every production failure into a permanent regression test
- [Version Eval Datasets the Same Way You Version Code](./version-your-eval-datasets.md) — keep score comparisons meaningful across dataset changes

## Tips in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Evaluation in This Phase

### Recently Added

- [Evaluate the End-to-End Task, Not Only Components](./evaluate-the-end-to-end-task-not-only-components.md)
- [Log Judge Rationales, Not Only Scores](./log-judge-rationales-not-only-scores.md)
- [Pair Every Eval Score With a Baseline](./pair-every-eval-score-with-a-baseline.md)
- [Prefer Pairwise Comparison When Absolute Scoring Is Noisy](./prefer-pairwise-comparison-when-scoring-is-noisy.md)
- [Report Confidence Intervals on Small-Set Eval Scores](./report-confidence-intervals-on-eval-scores.md)
- [Run a Fast Eval Per Commit and a Full Eval Nightly](./run-a-fast-eval-per-commit-and-a-full-eval-nightly.md)
- [Continuously Sample Production Traffic Into Your Eval Sets](./sample-production-traffic-into-eval-sets.md)
- [Set Pass/Fail Thresholds Before Running Evals, Not After Seeing Results](./set-pass-fail-thresholds-before-running-evals.md)
- [Slice Eval Metrics by Input Segment Instead of Trusting the Average](./slice-eval-metrics-by-input-segment.md)
- [Run Evals Multiple Times Before Trusting Small Deltas](./run-evals-multiple-times-before-trusting-deltas.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Add an Eval Harness Before Refactoring Prompts or Retrieval Logic](./add-evals-before-refactors.md) — 
- [Fail Tests When Important Context Sections Are Truncated](./detect-context-truncation-in-tests.md) — 
- [Evaluate the End-to-End Task, Not Only Components](./evaluate-the-end-to-end-task-not-only-components.md) — 
- [Log Judge Rationales, Not Only Scores](./log-judge-rationales-not-only-scores.md) — 
- [Pair Every Eval Score With a Baseline](./pair-every-eval-score-with-a-baseline.md) — 
- [Prefer Pairwise Comparison When Absolute Scoring Is Noisy](./prefer-pairwise-comparison-when-scoring-is-noisy.md) — 
- [Report Confidence Intervals on Small-Set Eval Scores](./report-confidence-intervals-on-eval-scores.md) — 
- [Run a Fast Eval Per Commit and a Full Eval Nightly](./run-a-fast-eval-per-commit-and-a-full-eval-nightly.md) — 
- [Run Evals Multiple Times Before Trusting Small Deltas](./run-evals-multiple-times-before-trusting-deltas.md) — 
- [Run a Prompt-Injection Regression Suite on Every CI Run](./run-prompt-injection-regression-tests.md) — 
- [Continuously Sample Production Traffic Into Your Eval Sets](./sample-production-traffic-into-eval-sets.md) — 
- [Separate a Frozen Holdout From Your Dev Eval Set](./separate-a-frozen-holdout-from-your-dev-eval-set.md) — 
- [Set Pass/Fail Thresholds Before Running Evals, Not After Seeing Results](./set-pass-fail-thresholds-before-running-evals.md) — 
- [Slice Eval Metrics by Input Segment Instead of Trusting the Average](./slice-eval-metrics-by-input-segment.md) — 
- [Test Prompts Against Adversarial Inputs, Not Only Well-Formed Ones](./test-prompts-with-adversarial-inputs.md) — 
- [Add the Failing Question to Your Eval Set Before Fixing the Bug](./use-golden-questions-for-every-bug-fix.md) — 
- [Use Rubric-Anchored Prompts for LLM Judges, Not Bare Score Requests](./use-rubric-anchored-llm-judges.md) — 
- [Validate LLM Judges Against Human Labels Before Trusting Their Scores](./validate-llm-judges-against-human-labels.md) — 
- [Version Eval Datasets the Same Way You Version Code](./version-your-eval-datasets.md) — 
