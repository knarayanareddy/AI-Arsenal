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

- [Run Evals Multiple Times Before Trusting Small Deltas](./run-evals-multiple-times-before-trusting-deltas.md)
- [Separate a Frozen Holdout From Your Dev Eval Set](./separate-a-frozen-holdout-from-your-dev-eval-set.md)
- [Use Rubric-Anchored Prompts for LLM Judges, Not Bare Score Requests](./use-rubric-anchored-llm-judges.md)
- [Validate LLM Judges Against Human Labels Before Trusting Their Scores](./validate-llm-judges-against-human-labels.md)
- [Fail Tests When Important Context Sections Are Truncated](./detect-context-truncation-in-tests.md)
- [Run a Prompt-Injection Regression Suite on Every CI Run](./run-prompt-injection-regression-tests.md)
- [Add the Failing Question to Your Eval Set Before Fixing the Bug](./use-golden-questions-for-every-bug-fix.md)
- [Add an Eval Harness Before Refactoring Prompts or Retrieval Logic](./add-evals-before-refactors.md)
- [Test Prompts Against Adversarial Inputs, Not Only Well-Formed Ones](./test-prompts-with-adversarial-inputs.md)
- [Version Eval Datasets the Same Way You Version Code](./version-your-eval-datasets.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Add an Eval Harness Before Refactoring Prompts or Retrieval Logic](./add-evals-before-refactors.md) — 
- [Fail Tests When Important Context Sections Are Truncated](./detect-context-truncation-in-tests.md) — 
- [Run Evals Multiple Times Before Trusting Small Deltas](./run-evals-multiple-times-before-trusting-deltas.md) — 
- [Run a Prompt-Injection Regression Suite on Every CI Run](./run-prompt-injection-regression-tests.md) — 
- [Separate a Frozen Holdout From Your Dev Eval Set](./separate-a-frozen-holdout-from-your-dev-eval-set.md) — 
- [Test Prompts Against Adversarial Inputs, Not Only Well-Formed Ones](./test-prompts-with-adversarial-inputs.md) — 
- [Add the Failing Question to Your Eval Set Before Fixing the Bug](./use-golden-questions-for-every-bug-fix.md) — 
- [Use Rubric-Anchored Prompts for LLM Judges, Not Bare Score Requests](./use-rubric-anchored-llm-judges.md) — 
- [Validate LLM Judges Against Human Labels Before Trusting Their Scores](./validate-llm-judges-against-human-labels.md) — 
- [Version Eval Datasets the Same Way You Version Code](./version-your-eval-datasets.md) — 
