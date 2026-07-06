---
id: swe-bench
title: "SWE-bench"
entry_type: benchmark
category: code
modality: [text, code]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Repo-scale software engineering – resolve real GitHub issues from popular Python repos by editing code so the full test suite passes."
metrics:
  - name: "resolved_rate"
    direction: higher
    notes: "Fraction of issues whose tests pass after the model's patch"
protocol:
  dataset: "SWE-bench (Princeton / Univ. of Chicago, 2023)"
  dataset_url: "https://github.com/SWE-bench/SWE-bench"
  evaluation_setup: "Model receives an issue + repo snapshot, produces a code patch, which is applied and validated against FAIL_TO_PASS / PASS_TO_PASS tests in a sandboxed environment. Report resolved rate. SWE-bench Verified (500 hand-checked issues) is the stricter, preferred variant."
  version: null
leaderboards:
  - name: "SWE-bench Leaderboard"
    url: "https://www.swebench.com/"
    last_checked: "2026-07-06"
  - name: "CodeSOTA – SWE-bench"
    url: "https://www.codesota.com/browse/computer-code/code-generation/swe-bench"
    last_checked: "2026-07-06"
known_issues:
  - "Scores depend heavily on the agent scaffold (mini-SWE-agent, Claude Code, Rovo Dev, etc.) – a model's number is not isolated from its harness; always report the scaffold"
  - "Original SWE-bench (2,294 issues) contains some ambiguous/broken tests; SWE-bench Verified (500) is stricter and typically 5-10 points lower – never mix the two"
  - "Strong contamination/leakage risk – the underlying PRs are public and likely in pretraining corpora; some 'resolutions' may reflect memorization"
  - "Test-suite gaming: passing FAIL_TO_PASS can be shortcut by weak or incomplete tests; a high resolved rate does not guarantee general engineering skill"
recommended_usage:
  - "Use SWE-bench Verified (500) as the primary, comparable variant; report the exact split"
  - "Always state the agent scaffold and number of samples/passes per issue"
  - "Treat it as an end-to-end engineering signal, not a pure model-capability score – the harness matters"
  - "Pair with function-level benchmarks (HumanEval, MBPP) to separate local edits from repo-scale reasoning"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [humaneval, mbpp]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official SWE-bench repo, swebench.com leaderboard, and the primary paper. Scaffold/protocol-variant and contamination notes emphasized per expansion-PR policy."
tags: [evaluation, code-gen, agents, benchmark]
---

## Overview

SWE-bench tests a model's ability to act as a software engineer: read a real GitHub issue, localize the bug or required change in a large codebase, and produce a patch that makes the repository's test suite pass. It is the de-facto repo-scale coding benchmark.

## What it Measures (and what it doesn’t)

Measures: codebase comprehension, bug localization, multi-file editing, and passing real regression tests.

Does not measure: open-ended feature design quality, security posture of the patch, or non-Python engineering (the canonical set is Python repos).

## Dataset & Protocol

- **Dataset:** SWE-bench – 2,294 issues across 12 Python repos; SWE-bench Verified – 500 hand-checked issues
- **Dataset URL:** https://github.com/SWE-bench/SWE-bench
- **Evaluation setup:** issue + repo snapshot → patch → apply → run FAIL_TO_PASS / PASS_TO_PASS tests in a sandbox. Resolved rate.
- **Version:** – (original and Verified variants)

## Metrics

- **resolved_rate** — higher is better — fraction of issues whose tests pass after the patch

## How to Run

```bash
# Official harness
git clone https://github.com/SWE-bench/SWE-bench
cd SWE-bench
python -m swebench.harness.run_evaluation \
  --model_name_or_path your-model \
  --dataset_name princeton-nlp/SWE-bench_Verified \
  --split test
```

## Known Issues, Leakage & Gaming Risks

- Heavy dependence on the agent scaffold / harness
- Original vs Verified are not comparable (Verified is stricter)
- Public PRs → contamination / memorization risk
- Test-suite shortcuts can inflate resolved rate

## How to Interpret Scores

- Report SWE-bench Verified (500), not just the original 2,294-issue set
- Always state the agent scaffold (mini-SWE-agent, Claude Code, etc.) and samples/pass
- Above ~80% resolved on Verified is frontier-class as of mid-2026; the top cluster is tight
- A model-only number is meaningless without its harness – compare like-for-like

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **SWE-bench Verified** leaderboard for **SWE-bench** (protocol: **SWE-bench Verified, 500 issues, agent + tests**) shows frontier systems around **80% resolved** — e.g., Claude Opus 4.7 at **87.6%** and Claude Opus 4.5 at **80.9%** under specific agent scaffolds (reported 2025-2026). This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Use SWE-bench Verified as the primary variant
- State the agent scaffold and samples/pass
- Treat as an end-to-end engineering signal, not a pure model score
- Pair with HumanEval / MBPP for local-edit skill

## Related Benchmarks

- [HumanEval](./humaneval.md) – function-level synthesis
- [MBPP](./mbpp.md) – entry-level function synthesis

## Relation to the Arsenal

Repo-scale coding benchmark. Complements agent frameworks in `content/projects/frameworks/` and coding-agent tips.

## Resources

- [Leaderboard – SWE-bench](https://www.swebench.com/)
- [GitHub – SWE-bench](https://github.com/SWE-bench/SWE-bench)
- Paper: Jimenez et al., "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?", arXiv:2310.06770

---

*Last reviewed: 2026-07-06 by @maintainer*
