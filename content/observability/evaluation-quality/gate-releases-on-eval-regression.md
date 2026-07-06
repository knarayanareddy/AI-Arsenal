---
id: "gate-releases-on-eval-regression"
title: "Gate Prompt, Model, and Retriever Changes on a Versioned Eval Dataset Before They Ship"
entry_type: observability
category: evaluation-quality
scope: production
signal_types:
  - quality
  - reliability
verification_status: production-verified
data_sensitivity:
  - internal
  - pii
last_reviewed: "2026-07-06"

instrumentation_contract:
  sampling: "100% of CI-gate eval runs (every prompt/model/retriever change triggers a full run against the golden dataset); 1-5% of production traffic sampled continuously into a candidate pool for promotion into the golden dataset after review"
  retention: "Golden dataset and all historical eval-run results retained indefinitely (versioned, not time-expired) since they are the basis for detecting long-term regressions and are typically small relative to raw production trace volume"
  correlation:
    - eval_run_id
    - dataset_version
    - git_commit_sha
    - prompt_version
  redaction: "Production traces promoted into the golden dataset are redacted for PII/secrets before being added, using the same redaction pass as instrumentation/capture-the-llm-call-event.md, since the golden dataset is retained indefinitely and reviewed by more people over a longer time horizon than a typical trace"
  events:
    - name: "eval_run"
      when_emitted: "Every time a prompt, model, or retriever change triggers a CI eval run, and on each scheduled continuous production-sampling pass"
      required_fields:
        - eval_run_id
        - dataset_version
        - pass_rate
        - git_commit_sha
      optional_fields:
        - per_example_scores
        - failing_example_ids
        - baseline_pass_rate
        - score_delta
      pii_risk: internal

related_tools: []
related_projects:
  - ragas-rag-evaluation
  - deepeval
related_build_examples:
  - advanced-self-correcting-rag
related_tips:
  - inspect-retrieved-chunks-beside-the-answer
  - classify-failures-before-fixing-prompts
dashboards: []
alert_rules:
  - "Fail the CI build (block merge/deploy) if pass_rate drops more than 5 percentage points below the golden dataset's current baseline_pass_rate for the affected category of examples"
  - "Open a review ticket (non-blocking) if any single example's score changes by more than 2 standard deviations from its historical value, even if the aggregate pass_rate is unaffected -- this catches a change that trades one failure mode for another without moving the aggregate number"
common_failure_modes:
  - "Treating 'we have an eval suite' as equivalent to 'we have evaluation coverage' -- a golden dataset that doesn't represent the actual production input distribution gives false confidence about regressions in exactly the cases it doesn't cover"
  - "Gating only on the aggregate pass_rate and ignoring per-example score deltas, which lets a change that fixes some examples while breaking others ship unnoticed as long as the net pass_rate looks unchanged"
added_date: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: reviewed
---

## Overview

Evaluation pipelines turn AI quality expectations into repeatable checks that run before and after deployment, converting the vague goal of "don't let quality regress" into a specific, automatable gate. This entry defines that gate concretely: a versioned golden dataset, a CI-blocking pass-rate threshold, and a continuous production-sampling loop that keeps the dataset representative over time — the operational mechanics behind [Choosing an Evaluation Strategy](../../architectures/evaluation-strategy/choose-eval-framework.md)'s decision to use deterministic assertions and LLM-as-judge together.

## What to Capture

- A `dataset_version` identifier for the golden dataset used in every eval run, so a regression can be attributed to either a code/prompt change or a dataset change
- `pass_rate` and `per_example_scores` for every eval run, not just the aggregate number — per-example data is what lets you distinguish "broke something new" from "fixed something else"
- The `git_commit_sha` or equivalent that triggered the run, so a regression can be bisected to a specific change
- A `baseline_pass_rate` computed from the dataset's stable-period performance, refreshed periodically, not fixed once at dataset creation
- Failing example IDs specifically, so a human reviewer can inspect exactly which cases regressed rather than re-deriving them from the raw pass rate

## Instrumentation Contract

Example `eval_run` event for a PR that changes a retrieval prompt:

```json
{
  "event_name": "eval_run",
  "timestamp": "2026-07-06T16:10:00.000Z",
  "eval_run_id": "run_2f8b91",
  "dataset_version": "golden-v14",
  "git_commit_sha": "a3f9c21",
  "prompt_version": "retrieval-query-rewrite-v5",
  "pass_rate": 0.87,
  "baseline_pass_rate": 0.91,
  "score_delta": -0.04,
  "failing_example_ids": ["ex_0042", "ex_0118", "ex_0203"],
  "per_example_scores": {
    "ex_0042": { "current": 0.2, "baseline": 0.9 },
    "ex_0118": { "current": 0.4, "baseline": 0.85 }
  }
}
```

## Implementation

```python
import json
import subprocess
import sys

def run_eval_gate(dataset_path: str, baseline_pass_rate: float, threshold_pp: float = 5.0) -> bool:
    """Run the golden dataset against the current build; return True if it
    passes the gate, False if it should block the merge/deploy."""
    results = run_eval_suite(dataset_path)  # your eval harness of choice
    pass_rate = sum(r.passed for r in results) / len(results)
    score_delta = pass_rate - baseline_pass_rate

    failing = [r.example_id for r in results if not r.passed]

    eval_run_event = {
        "event_name": "eval_run",
        "eval_run_id": generate_run_id(),
        "dataset_version": get_dataset_version(dataset_path),
        "git_commit_sha": subprocess.check_output(["git", "rev-parse", "HEAD"]).decode().strip(),
        "pass_rate": pass_rate,
        "baseline_pass_rate": baseline_pass_rate,
        "score_delta": score_delta,
        "failing_example_ids": failing,
    }
    emit_event(eval_run_event)

    if (baseline_pass_rate - pass_rate) * 100 > threshold_pp:
        print(f"EVAL GATE FAILED: pass_rate {pass_rate:.2%} is more than {threshold_pp}pp below baseline {baseline_pass_rate:.2%}")
        print(f"Failing examples: {failing}")
        return False
    return True


if __name__ == "__main__":
    ok = run_eval_gate("datasets/golden-v14.jsonl", baseline_pass_rate=0.91)
    sys.exit(0 if ok else 1)
```

## Dashboards & Alerts

- Dashboard: pass rate trend over time per dataset category, with deployment markers to correlate regressions with specific releases
- Dashboard: per-example score history for the golden dataset, to spot examples that oscillate (indicating a flaky eval, not a real quality signal) versus examples with a genuine step-change
- Alert rule: fail the CI build if `pass_rate` drops more than 5 percentage points below `baseline_pass_rate` for the affected example category — a hard block, not a warning
- Alert rule: open a non-blocking review ticket if any single example's score changes by more than 2 standard deviations from its historical value, even when the aggregate pass rate is unaffected

## Common Failure Modes

- **Treating "we have an eval suite" as equivalent to "we have evaluation coverage."** A golden dataset that doesn't represent the actual production input distribution gives false confidence specifically about the cases it doesn't cover — the continuous production-sampling loop in this entry's `instrumentation_contract.sampling` exists to keep the dataset representative over time, not just accurate at creation.
- **Gating only on aggregate pass_rate.** This lets a change that fixes some examples while breaking others ship unnoticed if the net number looks unchanged — the per-example score-delta alert rule exists specifically to catch this.

## Privacy & Governance

Production traces promoted into the golden dataset are `pii`-risk and are redacted for PII/secrets before being added, using the same redaction pass described in [Capture a Structured Event for Every LLM Call](../instrumentation/capture-the-llm-call-event.md) — this matters more here than for a typical trace because the golden dataset is retained indefinitely and reviewed by more people (anyone debugging an eval regression) over a longer time horizon. The dataset itself, once redacted, is retained indefinitely (not time-expired) since it is the basis for detecting long-term regressions and is typically small relative to raw trace volume. Access to the raw, pre-redaction candidate pool (production traces awaiting review before promotion) is restricted to the small set of engineers responsible for dataset curation, not open to whoever wants to browse it; access to the final, redacted golden dataset itself is broader, matching its lower sensitivity.

## Validation Checklist

- [ ] The golden dataset is versioned, and every eval run records which version it ran against
- [ ] Every eval run is triggered automatically by a prompt/model/retriever change, not run manually and inconsistently
- [ ] A pass-rate drop beyond the configured threshold actually blocks the merge/deploy, not just logs a warning
- [ ] Per-example scores are recorded, not just the aggregate pass rate
- [ ] A production-sampling loop continuously adds new candidate examples to the dataset, reviewed and redacted before promotion
- [ ] Failing example IDs are surfaced directly in the CI output, so a developer doesn't have to re-derive them
- [ ] The baseline_pass_rate is refreshed periodically against actual stable-period performance, not fixed once and forgotten
- [ ] A dry run against a deliberately broken change (e.g. an intentionally bad prompt) confirms the gate actually blocks it

## Relation to the Arsenal

Operationalizes the decision framework in [Choosing an Evaluation Strategy](../../architectures/evaluation-strategy/choose-eval-framework.md), specifically its guidance to combine deterministic assertions with calibrated LLM-as-judge scoring rather than relying on either alone. Its `eval_run` events feed the eval-pass-rate signal consumed by [Alert on Quality and Cost Regressions](../monitoring-alerting/alert-on-quality-and-cost-regressions.md) for continuous (not just CI-time) monitoring. Demonstrated in context by [Self-Correcting RAG](../../build-examples/rag-systems/advanced-self-correcting-rag.md), whose context-sufficiency grader is exactly the kind of component this gate should have a golden-dataset regression test for. Complementary tips: [Inspect Retrieved Chunks Beside the Answer](../../tips-and-tricks/debugging-and-observability/inspect-retrieved-chunks-beside-the-answer.md) and [Classify Failures Before Fixing Prompts](../../tips-and-tricks/debugging-and-observability/classify-failures-before-fixing-prompts.md).

## Resources

Evidence for `verification_status: production-verified`: CI-gated evaluation against a versioned golden dataset, with production-traffic sampling to keep the dataset representative, is a standard and widely documented production ML/LLM engineering practice (see the RAGAS and DeepEval project entries below, both of which are purpose-built for exactly this workflow and are used this way by teams across the industry).

- [RAGAS for RAG Evaluation](../../projects/benchmarks-and-evals/ragas-rag-evaluation.md)
- [DeepEval](../../projects/benchmarks-and-evals/deepeval.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
