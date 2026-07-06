---
id: tau-bench
title: "TAU-bench"
entry_type: benchmark
category: agents
modality: [text, code]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Tool-agent-user interaction – an agent must solve customer-service tasks by calling tools against a database while a simulated user (LLM) interacts and may change requirements mid-conversation."
metrics:
  - name: "pass_rate"
    direction: higher
    notes: "Task success rate, often reported as pass@1..pass@4 across trials"
protocol:
  dataset: "τ-bench (Sierra Research, 2024)"
  dataset_url: "https://github.com/sierra-research/tau-bench"
  evaluation_setup: "Agent operates in retail / airline (and later telecom) domains with a tool API and a simulated user. Tasks require policy compliance and multi-turn tool use. Scored by an LLM judge against golden trajectories. Report pass@k."
  version: null
leaderboards:
  - name: "τ-bench Leaderboard"
    url: "https://github.com/sierra-research/tau-bench"
    last_checked: "2026-07-06"
  - name: "CodeSOTA – τ2-bench"
    url: "https://www.codesota.com/browse/agentic/tool-use/tau2-bench"
    last_checked: "2026-07-06"
known_issues:
  - "Scores depend heavily on the user simulator and the judge model – swapping the simulator (e.g., GPT-4.1 vs GPT-5.2) shifts the whole ranking"
  - "The simulated user can be inconsistent across runs; pass@k variance is large, so report trials, not a single number"
  - "Domain-specific policies must be provided verbatim – an agent's pass rate partly measures instruction-following on the policy text"
  - "τ-bench (original) vs τ2-bench (expanded domains) are different task sets – keep them distinct"
recommended_usage:
  - "Report the user simulator and judge model used – the score is meaningless without them"
  - "Report pass@1..pass@4 over multiple trials – single-run numbers are noisy"
  - "Use to test tool-use reliability and policy compliance under changing requirements"
  - "Pair with WebArena / OSWorld for GUI-action agents and GAIA for general assistance"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [gaia]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official τ-bench repo, the public leaderboard, and the primary paper. User-simulator / judge-protocol variance emphasized per expansion-PR policy."
tags: [evaluation, agents, tool-use, benchmark]
---

## Overview

τ-bench (TAU-bench) evaluates tool-using agents in realistic customer-service conversations. The agent must call tools against a database while a simulated user interacts, sometimes revising their request mid-task, demanding both tool competence and policy compliance.

## What it Measures (and what it doesn’t)

Measures: multi-turn tool use, policy compliance, and robustness to changing user requirements.

Does not measure: GUI/visual action grounding (see WebArena/OSWorld), open-ended reasoning, or safety under adversarial users.

## Dataset & Protocol

- **Dataset:** τ-bench – retail / airline (and telecom) domains with tool APIs + simulated users
- **Dataset URL:** https://github.com/sierra-research/tau-bench
- **Evaluation setup:** agent + tool API + simulated user; LLM-judge scoring vs golden trajectories. pass@k over trials.
- **Version:** – (original τ-bench and τ2-bench variants)

## Metrics

- **pass_rate** — higher is better — task success, often pass@1..pass@4

## How to Run

```bash
git clone https://github.com/sierra-research/tau-bench
cd tau-bench
# Follow repo README to run an agent against the retail/airline tasks.
```

## Known Issues, Leakage & Gaming Risks

- Heavy dependence on user simulator + judge model
- Simulated-user inconsistency → large pass@k variance
- Policy text provided verbatim; partly measures instruction-following
- τ-bench vs τ2-bench are different sets

## How to Interpret Scores

- Always report the user simulator + judge model
- Report pass@1..pass@4 over trials – single runs are noisy
- Above ~85% pass is frontier-class as of mid-2026 under a given simulator
- Scores are not comparable across different simulators

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **τ-bench** leaderboard for **TAU-bench** (protocol: **tool-agent-user, retail/airline, pass^1**) shows frontier models around **85-88%** — e.g., Step-3.5-Flash at **88.2%** and GLM-4.7 at **87.4%** under the GPT-5.2 user simulator (reported 2025-2026). This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Report the user simulator and judge model
- Report pass@1..pass@4 over multiple trials
- Test tool-use reliability + policy compliance
- Pair with WebArena / OSWorld / GAIA

## Related Benchmarks

- [GAIA](./gaia.md) – general AI assistant tasks

## Relation to the Arsenal

Tool-use agent benchmark. Complements agent frameworks and orchestration tips.

## Resources

- [GitHub – τ-bench](https://github.com/sierra-research/tau-bench)
- [CodeSOTA – τ2-bench](https://www.codesota.com/browse/agentic/tool-use/tau2-bench)
- Paper: Yao et al., "τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains", arXiv:2406.12045

---

*Last reviewed: 2026-07-06 by @maintainer*
