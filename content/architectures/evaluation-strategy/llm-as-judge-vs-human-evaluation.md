---
id: "llm-as-judge-vs-human-evaluation"
title: "LLM-as-Judge vs Human Evaluation vs Reference-Based Metrics: How Should You Grade Outputs?"
category: "evaluation-strategy"
decision_type: "composition"
decision_summary: "Use reference-based metrics where a ground truth exists, LLM-as-judge to scale subjective grading, and human evaluation to calibrate and audit the judge — mature setups compose all three rather than bet on one."
tags:
  - evaluation
  - llm
  - observability

approaches:
  - name: "Reference-based / programmatic metrics"
    description: "Grade outputs against a known ground truth with deterministic code: exact match, F1, ROUGE/BLEU, JSON-schema validity, unit tests for generated code, or retrieval recall@k. No model judgment involved."
    when_to_use:
      - "A correct answer is well-defined and checkable (classification labels, extraction fields, code that must pass tests, structured output that must validate)"
      - "You need cheap, deterministic, reproducible scores that never drift and can gate CI"
      - "Retrieval or ranking quality is being measured against labeled relevance judgments"
    when_not_to_use:
      - "Quality is subjective or open-ended (helpfulness, tone, coherence, summary quality) where no single reference answer exists"
      - "Surface-form metrics (ROUGE/BLEU) would penalize a correct answer for using different words than the reference"
    tradeoffs:
      cost: "Cheapest — pure computation, no model calls, runs in CI for free."
      latency: "Instant and fully parallelizable."
      accuracy: "Exact where a ground truth exists; misleading for open-ended tasks (n-gram overlap correlates poorly with human quality judgments on generation)."
      complexity: "Low — but requires a labeled dataset with references, which is the real cost."
      flexibility: "Rigid: only measures what a reference or checker can express."

  - name: "LLM-as-judge"
    description: "Use a strong LLM to score or compare outputs against a rubric or each other (pointwise scoring or pairwise preference). Scales subjective grading to thousands of examples for the price of inference."
    when_to_use:
      - "Quality is subjective/open-ended and no reference answer captures it (helpfulness, tone, faithfulness to retrieved context, instruction-following)"
      - "You need to grade thousands of outputs continuously (regression evals, online quality monitoring) where human grading can't keep pace"
      - "Pairwise A/B comparison of two system versions, where relative preference is more reliable than absolute scores"
    when_not_to_use:
      - "The judge has not been calibrated against human labels for your task — an uncalibrated judge produces confident, systematically biased scores"
      - "The dimension being judged is one LLMs are known to be unreliable on (fine-grained factual verification without sources, safety-critical calls) without strong guardrails and human backstop"
    tradeoffs:
      cost: "Cheap relative to humans (cents per judgment), but non-zero and scales with eval volume; a strong judge model is the usual choice and costs more per call."
      latency: "Seconds per judgment, fully parallelizable — fast enough for CI and online sampling."
      accuracy: "Good correlation with human judgment on many tasks WHEN calibrated, but carries known biases: position bias (favoring the first option), verbosity/length bias, self-preference (favoring its own family's style), and rubric-sensitivity. Must be measured, not assumed."
      complexity: "Moderate — rubric design, bias mitigations (randomize position, control for length), and periodic re-calibration against human labels."
      flexibility: "High — a rubric can express almost any quality dimension in natural language."

  - name: "Human evaluation"
    description: "People grade outputs directly — expert review, annotator panels, or real end-user feedback (thumbs, ratings, edits). The ground truth for subjective quality."
    when_to_use:
      - "Establishing the calibration baseline that reference metrics and LLM judges are validated against"
      - "Safety-critical, high-stakes, or nuanced-domain outputs where a mistake is expensive and expertise is required"
      - "Capturing real preference signal from actual users (implicit feedback, edits, acceptance rate) as the ultimate quality measure"
    when_not_to_use:
      - "You need to grade thousands of outputs per day continuously — human throughput and cost don't scale to CI-frequency evaluation"
      - "The judgment is objective and a programmatic check would be faster, cheaper, and equally correct"
    tradeoffs:
      cost: "Most expensive per judgment (labor); does not scale to continuous high-volume evaluation."
      latency: "Slowest — hours to days for a labeling round; unsuitable for inline CI gating."
      accuracy: "The gold standard for subjective quality (with good guidelines and inter-annotator agreement); but humans are inconsistent without clear rubrics and are themselves subject to fatigue and bias."
      complexity: "High operationally — recruiting, guidelines, adjudication, inter-annotator agreement tracking."
      flexibility: "Highest judgment quality on nuance; lowest throughput."

key_factors:
  - "Is there a checkable ground truth? If yes, reference-based metrics are the cheapest correct answer; if no, the choice is judge + human calibration"
  - "Evaluation volume and frequency: CI-frequency and online monitoring demand automation (metrics or judge); humans are for calibration, audit, and high-stakes cases, not continuous grading"
  - "Judge calibration status: an LLM judge is only trustworthy after its agreement with human labels is measured on YOUR task — calibration is the price of using a judge at all"
  - "Stakes of a wrong grade: safety-critical or high-cost decisions warrant human review regardless of throughput cost"
  - "Known LLM-judge biases (position, verbosity, self-preference): these must be actively mitigated (randomized position, length controls) and re-checked, not ignored"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Is there a checkable ground-truth answer?"] --> GT{"Ground truth exists?"}
      GT -->|"Yes (labels, code tests, schema, relevance judgments)"| Ref["Use reference-based / programmatic metrics — cheapest, deterministic, CI-gating"]
      GT -->|"No — quality is subjective/open-ended"| Vol{"Do you need to grade at high volume / continuously?"}
      Vol -->|"Yes"| Judge["LLM-as-judge — but first calibrate against human labels on your task"]
      Vol -->|"No, occasional or high-stakes"| Human["Human evaluation (expert / user feedback)"]
      Judge --> Cal{"Has judge-human agreement been measured?"}
      Cal -->|"No"| Calibrate["Calibrate: sample, human-label, measure agreement, mitigate position/length bias"]
      Cal -->|"Yes, agreement acceptable"| Compose["Run judge at scale + periodic human audit + reference metrics where applicable"]
      Human --> Compose

confidence: "emerging-consensus"
tradeoffs_as_of: "2026-07-08"

approach_implementations:
  - approach_name: "Reference-based / programmatic metrics"
    tool_ids:
      - promptfoo
      - openai-evals
    project_ids:
      - deepeval
    build_example_ids: []
  - approach_name: "LLM-as-judge"
    tool_ids:
      - ragas
      - promptfoo
    project_ids:
      - deepeval
      - braintrust
      - phoenix
    build_example_ids: []
  - approach_name: "Human evaluation"
    tool_ids:
      - langsmith
    project_ids:
      - langfuse
    build_example_ids: []

related_decisions:
  - choose-eval-framework
  - choose-observability-tool

common_mistakes:
  - "Trusting an LLM judge's scores without ever measuring its agreement with human labels: an uncalibrated judge produces confident, systematically biased numbers, and teams optimize against those numbers — calibration against a human-labeled sample is the non-negotiable first step of using a judge."
  - "Using ROUGE/BLEU or exact-match on open-ended generation: n-gram overlap penalizes correct answers phrased differently from the reference and correlates poorly with human quality judgments — these metrics belong to tasks with genuine reference answers, not free-form generation."
  - "Ignoring LLM-judge biases (position, verbosity, self-preference): a judge that favors the first option or the longer answer will systematically mis-rank A/B tests unless you randomize position and control for length."
  - "Treating human evaluation as the continuous eval loop: humans are the calibration and audit layer, not the CI gate — trying to human-grade every release doesn't scale and starves the fast feedback loop that automation provides."

added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: "draft"
---

## Overview

"How good is the output?" has three fundamentally different answers depending on whether a correct answer is *checkable*, *subjective*, or *high-stakes* — and the biggest evaluation mistakes come from applying one method's tool to another method's problem: grading open-ended summaries with ROUGE, or trusting an LLM judge's scores without ever checking them against a human. This is a `composition` decision, not a fork: mature evaluation stacks run reference-based metrics where ground truth exists, an LLM judge to scale subjective grading, and human evaluation to calibrate the judge and handle the high-stakes tail.

## The Decision

First ask whether a **checkable ground truth** exists. If it does — classification labels, extraction fields, code that must pass tests, schema that must validate, relevance judgments for retrieval — use **reference-based programmatic metrics**: they are the cheapest correct answer, deterministic, and can gate CI. If quality is **subjective or open-ended** (helpfulness, tone, faithfulness, instruction-following), you need judgment, and the question becomes volume: at CI-frequency or for online monitoring, use an **LLM-as-judge**, but only *after* measuring its agreement with human labels on your task — an uncalibrated judge produces confident, biased numbers that teams then optimize against. **Human evaluation** is the calibration baseline the judge is validated against, the audit layer that periodically checks the judge hasn't drifted, and the required reviewer for safety-critical or high-stakes outputs. The end state composes all three; the failure mode is betting the whole eval strategy on one.

## Decision Framework

The `decision_tree` in frontmatter encodes the branching. In plain language:

1. **Ground-truth check.** Checkable answer? Use reference/programmatic metrics — cheapest, deterministic, CI-gating.
2. **Subjective → volume check.** No reference? If you must grade at high volume/continuously, use an LLM judge; if it's occasional or high-stakes, use human evaluation.
3. **Calibrate the judge before trusting it.** Sample outputs, human-label them, measure judge-human agreement, and mitigate position/verbosity/self-preference bias (randomize option order, control for length). An uncalibrated judge is not evidence.
4. **Compose.** Run the judge at scale for the fast loop, keep a periodic human audit to catch drift, and keep reference metrics wherever a checkable sub-task exists.

## Approach Deep-Dives

**Reference-based metrics** are pure computation against a labeled dataset — exact match, F1, code unit tests, schema validity, retrieval recall@k. Correct and free where ground truth exists; actively misleading (ROUGE/BLEU) on open-ended generation. Frameworks like [promptfoo](../../tools/evaluation-and-observability/promptfoo.md), [OpenAI Evals](../../tools/evaluation-and-observability/openai-evals.md), and [DeepEval](../../projects/benchmarks-and-evals/deepeval.md) express these as assertions.

**LLM-as-judge** scores outputs against a natural-language rubric (pointwise) or compares two outputs (pairwise). It scales subjective grading to CI frequency, and pairwise preference is generally more reliable than absolute scores. Its Achilles' heel is bias — position bias (favoring the first option), verbosity bias (favoring longer answers), and self-preference (favoring its own family's style) — all of which must be measured and mitigated. [Ragas](../../tools/evaluation-and-observability/ragas.md) (for RAG faithfulness/relevance), [DeepEval](../../projects/benchmarks-and-evals/deepeval.md), [Braintrust](../../projects/benchmarks-and-evals/braintrust.md), and [Phoenix](../../projects/benchmarks-and-evals/phoenix.md) implement judge-based scoring.

**Human evaluation** — expert review, annotator panels, or real end-user feedback (thumbs, edits, acceptance rate) — is the gold standard for subjective quality and the only acceptable grader for safety-critical outputs. It doesn't scale to continuous grading, so its job is calibration and audit. Feedback-capture platforms like [LangSmith](../../tools/evaluation-and-observability/langsmith.md) and [Langfuse](../../projects/benchmarks-and-evals/langfuse.md) collect the human signal that calibrates everything else.

## Common Mistakes

- **Trusting an uncalibrated LLM judge.** Measure judge-human agreement on your task first; otherwise you optimize against confident, biased numbers.
- **ROUGE/BLEU/exact-match on open-ended generation.** N-gram overlap penalizes correct-but-differently-phrased answers and correlates poorly with human judgment.
- **Ignoring judge biases.** Randomize option order and control for length, or your A/B rankings are systematically skewed.
- **Making humans the CI loop.** Humans calibrate and audit; automation gates CI. Human-grading every release doesn't scale.

## When This Guidance Might Be Outdated

The `emerging-consensus` rating reflects that LLM-as-judge is now standard practice but its reliability envelope is still being mapped. Re-check every 6-12 months: (1) judge models and debiasing techniques improve, widening the set of dimensions a judge can be trusted on; (2) research continues to quantify and mitigate judge biases, so today's mandatory mitigations may be built into tooling tomorrow. The invariant: calibrate against humans on your own task before trusting any automated judge.

## Related Decisions

Which tool executes this is [choose-eval-framework](./choose-eval-framework.md); the online-monitoring half (capturing user feedback and judge scores in production) overlaps with [choose-observability-tool](./choose-observability-tool.md). Guardrail and quality monitoring in production consume the same judge/metric machinery.

## Resources

- [Ragas](../../tools/evaluation-and-observability/ragas.md)
- [promptfoo](../../tools/evaluation-and-observability/promptfoo.md)
- [DeepEval](../../projects/benchmarks-and-evals/deepeval.md)
- [Braintrust](../../projects/benchmarks-and-evals/braintrust.md)
- [Phoenix](../../projects/benchmarks-and-evals/phoenix.md)
- [OpenAI Evals](../../tools/evaluation-and-observability/openai-evals.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
