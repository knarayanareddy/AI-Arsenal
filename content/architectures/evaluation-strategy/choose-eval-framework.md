---
id: "choose-eval-framework"
title: "Choosing an Evaluation Strategy: Golden Datasets, Model-Graded Evals, and Human Review"
category: "evaluation-strategy"
decision_type: "composition"
decision_summary: "Start with a golden dataset and deterministic assertions; add model-graded (LLM-as-judge) evaluation only for qualities a deterministic check can't capture, and reserve human review for what model-graded eval can't yet judge reliably."
tags:
  - evaluation
  - rag
  - agents
  - observability

approaches:
  - name: "Golden Dataset + Deterministic Assertions"
    description: "A fixed set of representative input/expected-output pairs, checked with exact-match, regex, schema-validation, or other deterministic assertions rather than model judgment."
    when_to_use:
      - "The correctness criterion is checkable without judgment: exact values, valid JSON against a schema, presence/absence of specific content, latency/cost thresholds"
      - "You need a fast, cheap, deterministic regression signal that runs on every change (CI-gate-shaped)"
    when_not_to_use:
      - "Correctness is genuinely a matter of degree or subjective quality (tone, helpfulness, coherence) that a deterministic rule can't capture"
    tradeoffs:
      cost: "Lowest of any approach — no LLM calls required for the grading step itself, only for the system under test."
      accuracy: "Perfectly precise for what it checks, but blind to anything outside its deterministic rules — a system can pass every assertion and still produce unhelpful or incoherent output."
      complexity: "Low to build; the ongoing cost is dataset curation and keeping assertions in sync with intentional behavior changes."

  - name: "LLM-as-Judge (Model-Graded Evaluation)"
    description: "Use a model (often a stronger one than the system under test) to score outputs against a rubric, capturing qualities deterministic assertions can't check directly."
    when_to_use:
      - "The quality dimension is genuinely subjective or holistic (helpfulness, faithfulness to retrieved context, tone) and a deterministic rule can't express it"
      - "You need to evaluate at a volume where human review doesn't scale, but still want signal beyond pass/fail assertions"
    when_not_to_use:
      - "The judge model itself hasn't been calibrated against human judgment on a sample — an uncalibrated judge can be confidently wrong in a consistent direction, which is worse than no automated signal at all"
      - "The property being measured is actually checkable deterministically — using an LLM judge for something a regex could verify adds cost and judge-variance noise for no benefit"
    tradeoffs:
      cost: "An additional LLM call per evaluated example, on top of the system-under-test's own cost — scales with eval-set size and evaluation frequency."
      accuracy: "Only as reliable as the judge's calibration against actual human judgment for your specific task — must be validated, not assumed."
      complexity: "Requires rubric design and periodic recalibration against human-labeled samples to catch judge drift."

  - name: "Human Review"
    description: "Direct human judgment on a sample of outputs, either as the primary evaluation method or as a calibration/audit layer for automated evaluation."
    when_to_use:
      - "Calibrating an LLM-as-judge rubric against ground truth before trusting it at scale"
      - "The quality dimension is high-stakes, nuanced, or novel enough that even a calibrated judge model's reliability is unproven for this specific task"
      - "Auditing automated evaluation results periodically to catch judge drift or systematic blind spots"
    when_not_to_use:
      - "Volume is high enough that human review cannot keep pace with the required evaluation frequency (e.g. every CI run) — use it as a periodic calibration/audit layer instead of the primary gate in that case"
    tradeoffs:
      cost: "Highest per-example cost of any approach — human time doesn't scale the way automated evaluation does."
      accuracy: "Ground truth for calibration purposes, but slow and expensive to apply at the volume automated systems need for continuous regression testing."
      complexity: "Requires reviewer guidelines, inter-rater reliability checks if multiple reviewers are involved, and a process for feeding findings back into automated eval calibration."

key_factors:
  - "Is the correctness criterion deterministically checkable, or does it require judgment? This is the first fork and eliminates a large share of the design space immediately"
  - "Evaluation frequency needed: CI-gate-shaped (every change) requires fast, cheap, deterministic or LLM-graded checks; periodic audits can afford human review"
  - "Stakes of an evaluation miss: higher-stakes domains justify more human-review calibration and auditing of any automated judge"
  - "Judge calibration status: has the LLM-as-judge rubric been validated against a human-labeled sample for this specific task, or is it unvalidated?"
  - "Volume: eval-set size and run frequency multiplied together determine whether an approach's cost profile is sustainable"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Choosing an evaluation approach for a quality dimension"] --> Deterministic{"Is correctness deterministically checkable?"}
      Deterministic -->|"Yes (exact match, schema, threshold)"| Golden["Use golden dataset + deterministic assertions"]
      Deterministic -->|"No, requires judgment"| Volume{"Evaluation volume/frequency?"}
      Volume -->|"Low enough for human review to keep pace"| Human["Use human review directly"]
      Volume -->|"Too high for human review at required frequency"| Judge{"Is an LLM-as-judge rubric already calibrated for this task?"}
      Judge -->|"No"| Calibrate["Calibrate the rubric against a human-labeled sample first"]
      Judge -->|"Yes"| LLMJudge["Use LLM-as-judge for ongoing evaluation, with periodic human audit"]

confidence: "emerging-consensus"
tradeoffs_as_of: "2026-07-06"

approach_implementations:
  - approach_name: "Golden Dataset + Deterministic Assertions"
    project_ids:
      - ragas-rag-evaluation
      - deepeval
    tool_ids: []
    build_example_ids: []
  - approach_name: "LLM-as-Judge (Model-Graded Evaluation)"
    project_ids:
      - langfuse
      - langsmith-platform
      - phoenix
      - braintrust
      - opik
      - agenta
    tool_ids: []
    build_example_ids: []
  - approach_name: "Human Review"
    project_ids: []
    tool_ids: []
    build_example_ids: []

related_decisions:
  - choose-observability-tool
  - rag-vs-fine-tuning

common_mistakes:
  - "Deploying an LLM-as-judge rubric without calibrating it against human judgment first — an uncalibrated judge can be confidently and consistently wrong, producing a false sense of evaluation coverage that is arguably worse than having no automated evaluation at all, since it actively hides the problem."
  - "Using LLM-as-judge for properties that are actually deterministically checkable (valid JSON, presence of a required field, a numeric threshold) — this adds cost and judge-to-judge variance for a property a regex or schema check would verify perfectly and for free."
  - "Treating 'we have an eval suite' as equivalent to 'we have evaluation coverage' without checking what the golden dataset actually represents — a golden set that doesn't cover your actual production distribution of inputs gives false confidence about regressions in exactly the cases it doesn't cover."
  - "Running evaluation only offline before launch, with no online/production monitoring signal — offline eval-set performance does not guarantee production performance on the live input distribution, which can drift from the eval set over time."

added_date: "2026-06-13"
last_reviewed: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: "reviewed"
---

## Overview

Evaluation strategy should be introduced before production traffic and tied to regression tests, not treated as a dashboard added after launch. This entry replaces an earlier version of this guidance that stated "use the constraints first: privacy, latency, budget..." without ever naming the actual decision criteria or thresholds that determine which evaluation approach fits which situation — a textbook example of the Abstract Comparison failure mode this vertical exists to eliminate. The rewritten version below states a concrete decision framework instead.

## The Decision

The first and most consequential fork is whether a given quality dimension is deterministically checkable at all. Many things engineers reach for LLM-as-judge to evaluate — valid JSON output, presence of a required field, a numeric threshold, an exact-match fact — are actually checkable with a regular assertion, and should be, since deterministic checks are cheaper, faster, and have zero judge-variance noise. Reserve model-graded evaluation for genuinely subjective or holistic qualities (helpfulness, faithfulness to retrieved context, tone) that a deterministic rule cannot express. Reserve human review for calibrating those model-graded rubrics against ground truth, and for auditing automated evaluation on a periodic basis to catch drift — not as the primary gate for every change, since human review does not scale to CI-frequency evaluation.

## Decision Framework

The decision tree in this entry's frontmatter encodes the full branching logic. In prose: for any specific quality dimension you need to evaluate, first ask whether it's deterministically checkable — if yes, write an assertion, not a judge prompt. If it requires judgment, check whether your evaluation volume and frequency allow human review to keep pace; if so, use human review directly. If volume is too high for that (e.g. you need a signal on every CI run), the correct approach is LLM-as-judge — but only once the judge's rubric has been calibrated against a human-labeled sample for your specific task. An uncalibrated judge is not a cheaper substitute for human review; it is a potentially misleading signal that looks like coverage without providing it.

## Approach Deep-Dives

**Golden dataset + deterministic assertions** should be the default starting point for any quality dimension that can be expressed as a rule — they are the cheapest, fastest, and most precise signal available, and the temptation to reach for an LLM judge for convenience should be resisted whenever a deterministic check would do. **LLM-as-judge** genuinely earns its place for qualities that resist deterministic expression, but its value is entirely contingent on calibration: an LLM-as-judge rubric that has never been checked against actual human judgment for your specific task is providing an unvalidated signal, not a validated one, regardless of how confident its outputs look. **Human review** remains the ground truth against which any automated evaluation approach should periodically be checked, and is irreplaceable for genuinely novel or high-stakes quality dimensions where even a calibrated judge's reliability for that specific case hasn't been established — its role is calibration and audit, not (usually) the primary continuous gate, purely because of throughput.

## Common Mistakes

- **Deploying an uncalibrated LLM-as-judge rubric.** This produces a false sense of coverage that can be worse than no automated evaluation, since it actively hides the problem.
- **Using LLM-as-judge for deterministically checkable properties.** A regex, schema check, or threshold assertion is cheaper and has zero judge-variance for these.
- **Confusing "we have an eval suite" with "we have evaluation coverage."** A golden set that doesn't represent your actual production input distribution gives false confidence about exactly the cases it doesn't cover.
- **Running evaluation only offline before launch, with no production monitoring.** Offline performance doesn't guarantee production performance as the live input distribution drifts.

## When This Guidance Might Be Outdated

Confidence is rated `emerging-consensus` because LLM-as-judge calibration practices are still maturing as a field discipline — the specific tools and calibration workflows referenced here should be re-checked periodically as best practices around judge calibration (and judge models themselves) continue to develop, and this entry's framework should be revisited if a fundamentally more reliable automated-judgment approach emerges.

## Related Decisions

This decision interacts closely with [Choosing an Observability Tool](./choose-observability-tool.md), since several tools in this catalog (Langfuse, Braintrust, Opik) combine tracing/observability with evaluation-harness features — choosing one often means choosing both together, though the decisions are conceptually separate.

## Resources

- [AI Arsenal Taxonomy](../../../TAXONOMY.md)
- [AI Arsenal Agent Map](../../../AGENT.md)
- [RAGAS](../../projects/benchmarks-and-evals/ragas-rag-evaluation.md)
- [DeepEval](../../projects/benchmarks-and-evals/deepeval.md)
- [Langfuse](../../projects/benchmarks-and-evals/langfuse.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
