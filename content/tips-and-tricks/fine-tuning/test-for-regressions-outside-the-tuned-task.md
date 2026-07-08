---
id: "test-for-regressions-outside-the-tuned-task"
title: "Test for Regressions Outside the Tuned Task After Every Fine-Tune"
category: "production-gotchas"
tags:
  - fine-tuning
  - evaluation
  - llm
difficulty: "intermediate"
impact: "high"
time_to_implement: "half a day"
phase: fine-tuning
effort: day
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "community reports (catastrophic-forgetting reports in practice)"
applies_to:
  - fine-tuning-workflows
gotchas:
  - "A general-capability smoke suite that shares format with the tuned task under-detects forgetting -- include tasks in different formats (reasoning, coding, safety refusals)"
  - "Safety behavior regressions from narrow fine-tuning are documented even for benign training data -- include refusal probes, not only capability probes"
metrics: []
related_tips:
  - hold-out-an-eval-set-before-any-training
  - start-with-lora-before-full-fine-tuning
added_date: "2026-07-07"
added_by: maintainer
last_reviewed: "2026-07-07"
enrichment_status: draft
---

## What & Why

After every fine-tune, run a fixed smoke suite of general-capability and safety probes alongside the task eval: reasoning, instruction-following in other formats, and refusal behavior on clearly harmful prompts. Narrow fine-tuning measurably degrades out-of-domain capability and can weaken safety training even when the training data is benign — and the task eval set, by construction, cannot see it. Teams that only measure the tuned task ship models that got better at one thing and quietly worse at everything else.

## Before / After

**Before:** A support-summarization fine-tune ships on a strong task score. Weeks later, users report the same deployment handling general Q&A noticeably worse, and a red-team check finds weakened refusals.

**After:** The post-tune gate runs task evals plus a ~100-item general suite and a refusal probe set; the regression appears before deployment and the mitigation (lower rank, mixed general data, fewer epochs) is applied.

## Implementation

Assemble a fixed suite once: a slice of general benchmarks in varied formats, plus refusal probes. Score the base model to establish the baseline, then score every fine-tune against it. Gate deployment on regression thresholds. Standard mitigations when the gate fails: mix general instruction data into training, reduce epochs or LoRA rank, or scope the fine-tune to a narrower adapter.

## Gotchas

- Format-similar probes under-detect forgetting; diversity of task format is the point of the suite
- Include safety probes explicitly — capability suites do not measure refusal regressions

## When NOT to Apply

- Less critical for adapters served only behind a single narrow endpoint where no general traffic reaches the tuned model — though safety probes still apply
- Skip duplicating the suite when your eval platform already runs an equivalent regression gate

## Verification

Community-reported: task-specific tuning degrading general and safety behavior is documented in published research and vendor guidance; the smoke-suite gate is standard practice at LLM-serving teams, thresholds vary.
