---
id: osworld
title: "OSWorld"
entry_type: benchmark
category: agents
modality: [text, code, multimodal]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "OS-level GUI agents – complete real computer tasks across desktop applications (browser, VS Code, OS file system, Office-style apps) from screenshots + accessibility trees."
metrics:
  - name: "success_rate"
    direction: higher
    notes: "Exact-match task success, often reported at a fixed max-step budget"
protocol:
  dataset: "OSWorld (CMU et al., 2024)"
  dataset_url: "https://github.com/xlang-ai/OSWorld"
  evaluation_setup: "Agent observes screenshots + a11y tree and issues UI actions (click, type, drag) within a virtual machine to finish tasks. 369 tasks across apps/domains. Exact-match success rate, typically at 15/50 steps."
  version: null
leaderboards:
  - name: "OSWorld Leaderboard"
    url: "https://osworld.dev/"
    last_checked: "2026-07-06"
  - name: "CodeSOTA – OSWorld"
    url: "https://www.codesota.com/benchmark/osworld"
    last_checked: "2026-07-06"
known_issues:
  - "Scores depend on the step budget (15 vs 50 steps changes results by ~10+ points) and on the agent's perception backbone (screenshot-only vs a11y-tree)"
  - "Tasks are long-horizon and environment-sensitive – minor UI/version drift breaks reproductions"
  - "Human baseline is ~72.4%; even the best agents remain below it on the hardest multi-app workflows"
  - "Heavy compute cost (full VM per task) makes exhaustive evaluation expensive and a source of variance"
recommended_usage:
  - "Use to compare OS/GUI agents, not base VLMs"
  - "Always report the step budget and whether a11y-tree vs screenshot input was used"
  - "Run on the verified subset when available for stricter, less noisy comparisons"
  - "Pair with WebArena (web) and TAU-bench (tool-use) for broader agent coverage"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [gaia]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official OSWorld repo, osworld.dev, and the primary paper. Step-budget / perception-backbone protocol notes emphasized per expansion-PR policy."
tags: [evaluation, agents, benchmark]
---

## Overview

OSWorld is a benchmark for autonomous GUI agents operating at the operating-system level. Agents see screenshots and accessibility trees of a real desktop environment and must perform tasks spanning the browser, code editor, file system, and office applications.

## What it Measures (and what it doesn’t)

Measures: OS-level GUI grounding, long-horizon planning, and tool/UI manipulation.

Does not measure: pure reasoning, safety/policy compliance, or non-visual tool use (see WebArena / TAU-bench / safety benchmarks).

## Dataset & Protocol

- **Dataset:** OSWorld – 369 tasks across desktop apps/domains
- **Dataset URL:** https://github.com/xlang-ai/OSWorld
- **Evaluation setup:** screenshot + a11y-tree observation → UI actions in a VM; exact-match success. Reported at 15/50 steps.
- **Version:** –

## Metrics

- **success_rate** — higher is better — exact-match task success

## How to Run

```bash
git clone https://github.com/xlang-ai/OSWorld
cd OSWorld
# Follow the repo README to launch the VM environment and run an agent.
```

## Known Issues, Leakage & Gaming Risks

- Step budget (15 vs 50) changes scores by 10+ points
- Perception backbone (screenshot vs a11y-tree) matters
- Long-horizon, environment-sensitive – reproducibility drift
- Expensive (full VM per task) → variance

## How to Interpret Scores

- Report the step budget and input modality
- Best agents ~60-73% vs human ~72.4% (early 2026)
- Use the verified subset for stricter comparison
- Pair with WebArena and TAU-bench

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **OSWorld** leaderboard for **OSWorld** (protocol: **OS tasks, success rate, 50 steps**) shows frontier agents around **60-73% success** — e.g., Claude Opus 4.6 at **72.7%** and CoAct-1 at **60.76%** (verified, early 2026), versus a human baseline near **72.4%**. This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Compare OS/GUI agents, not base VLMs
- Report step budget + a11y-tree vs screenshot
- Use the verified subset for stricter comparison
- Pair with WebArena / TAU-bench

## Related Benchmarks

- [GAIA](./gaia.md) – general AI assistant tasks
- [WebArena](./webarena.md) – web agents

## Relation to the Arsenal

GUI-agent evaluation benchmark. Complements agent frameworks and orchestration tips.

## Resources

- [Leaderboard – OSWorld](https://osworld.dev/)
- [GitHub – OSWorld](https://github.com/xlang-ai/OSWorld)
- Paper: Xie et al., "OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments", arXiv:2404.07972

---

*Last reviewed: 2026-07-06 by @maintainer*
