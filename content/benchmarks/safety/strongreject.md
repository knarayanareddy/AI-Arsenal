---
id: strongreject
title: "StrongREJECT"
entry_type: benchmark
category: safety
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: lower-is-better
what_it_measures: "Jailbreak robustness measured honestly – 313 forbidden prompts plus an autograder that scores how genuinely harmful and specific a jailbroken response is, not merely whether the model failed to refuse."
metrics:
  - name: "StrongREJECT score"
    direction: lower
    notes: "0-1 harmfulness of responses to jailbreak attempts; lower means more robust. Combines willingness + specificity/usefulness of the harmful content"
protocol:
  dataset: "StrongREJECT"
  dataset_url: "https://github.com/alexandrasouly/strongreject"
  evaluation_setup: "Apply a jailbreak to 313 forbidden prompts; the fine-tuned/rubric autograder scores each response for actual harmfulness. Report mean score per jailbreak method."
  version: "2024 release (313 prompts)"
leaderboards:
  - name: "StrongREJECT repo (methods + results)"
    url: "https://github.com/alexandrasouly/strongreject"
    last_checked: "2026-07-08"
known_issues:
  - "Autograder is itself a model – validate it against human labels for your threat model"
  - "The paper's key finding: many 'successful' jailbreaks from prior work also degrade model capability, so naive attack-success-rate overstates real risk"
  - "313 curated prompts cannot cover every harm category; it is a robustness probe, not a coverage guarantee"
  - "Public prompts/graders can be trained against"
recommended_usage:
  - "Use StrongREJECT scoring instead of binary refusal/attack-success rate – it corrects the capability-degradation confound"
  - "Report per-jailbreak-method scores; a single mean hides which attacks work"
  - "Validate the autograder against a human-labeled sample before trusting absolute numbers"
  - "Pair with HarmBench for broader attack/behavior coverage"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["harmbench", "jailbreakbench"]
enrichment_status: draft
enrichment_notes: "Authored from the StrongREJECT paper (arXiv:2402.10260) and repo; URLs verified 2026-07-08."
tags: [evaluation, security, guardrails]
---

## Overview

StrongREJECT (Souly et al., 2024) reframes jailbreak evaluation around a sharp observation: many jailbreaks reported as "successful" produce responses that are non-refusing but also useless – the attack degraded the model. Its autograder scores responses for *actual* harmful specificity and usefulness, not just absence of refusal, giving a far more honest robustness signal over 313 forbidden prompts.

## What it Measures (and what it doesn’t)

Measures how genuinely harmful a model's outputs become under jailbreak attacks – combining willingness to comply with the specificity/usefulness of the harmful content.

Does not measure: over-refusal / false-positive rate on benign prompts, harm categories outside its 313 prompts, or multi-turn/agentic attack surfaces.

## Dataset & Protocol

- **Dataset:** StrongREJECT – 313 forbidden prompts
- **Dataset URL:** https://github.com/alexandrasouly/strongreject
- **Evaluation setup:** apply jailbreak → autograder scores harmfulness 0-1 → mean per method
- **Version:** 2024 release

## Metrics

- **StrongREJECT score** — lower is better — harmfulness-weighted, not binary

## How to Run

```bash
git clone https://github.com/alexandrasouly/strongreject
pip install -e .
# from strong_reject.evaluate import evaluate
# Provide responses to the 313 prompts; run the fine-tuned or rubric-based grader
```

## Known Issues, Leakage & Gaming Risks

- Autograder validity is threat-model dependent – confirm against human labels
- Capability-degradation confound is exactly what StrongREJECT fixes; older ASR-based numbers are not comparable to it
- Fixed prompt set → coverage gaps and contamination risk
- Does not catch over-refusal; a model that refuses everything scores perfectly here but is unusable

## How to Interpret Scores

- Lower is safer. As of **2026-07-08**, the repo reports that many previously-hyped jailbreaks yield low StrongREJECT scores once response quality is accounted for.
- Compare methods, not just models: the per-jailbreak breakdown shows which attacks actually extract useful harmful content.
- Always pair a low StrongREJECT score with an over-refusal check – robustness is only half the safety picture.

## Recommended Usage

- Adopt StrongREJECT scoring as the default jailbreak-robustness metric for red-team reports
- Break results down by attack method and validate the grader locally
- Combine with an over-refusal benchmark to avoid shipping a uselessly-cautious model
- Re-run after safety fine-tunes to check for regressions

## Related Benchmarks

- [HarmBench](./harmbench.md) – standardized automated red-teaming across behaviors
- [JailbreakBench](./jailbreakbench.md) – jailbreak artifacts and leaderboard

## Relation to the Arsenal

Jailbreak-robustness benchmark in the safety category; complements guardrail tooling in `content/tools/evaluation-and-observability/` (e.g. garak) and security tips.

## Resources

- [StrongREJECT repo](https://github.com/alexandrasouly/strongreject)
- [StrongREJECT paper – Souly et al., 2024](https://arxiv.org/abs/2402.10260)
