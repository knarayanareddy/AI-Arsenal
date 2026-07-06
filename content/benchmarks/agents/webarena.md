---
id: webarena
title: "WebArena"
entry_type: benchmark
category: agents
modality: [text, code, multimodal]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Autonomous web agents – end-to-end task completion across self-hosted replicas of real websites (shopping, forums, Git, CMS, maps) using a browser + tool environment."
metrics:
  - name: "success_rate"
    direction: higher
    notes: "Exact-match task success over the task set"
protocol:
  dataset: "WebArena (Princeton et al., 2023)"
  dataset_url: "https://github.com/web-arena-x/webarena"
  evaluation_setup: "Agent observes web pages (HTML + accessibility tree + optional screenshots) and issues browser actions (click, type, scroll) to complete a natural-language task. 812 tasks across 5 sites. Exact-match success rate."
  version: null
leaderboards:
  - name: "WebArena Leaderboard"
    url: "https://webarena.dev/"
    last_checked: "2026-07-06"
  - name: "CodeSOTA – WebArena"
    url: "https://www.codesota.com/benchmark/webarena"
    last_checked: "2026-07-06"
known_issues:
  - "Scores depend on the agent architecture and prompt engineering (e.g., HITL site-specific tips pushed top agents from ~55% to ~72%) – a raw model number ignores the scaffold"
  - "Many tasks are web-dependent and break when target sites change – results are not perfectly reproducible over time"
  - "Small, fixed task set (812) – variance and saturation are real concerns at the top"
  - "Human baseline is ~78% – agents have closed most of the gap but long-horizon / CAPTCHA / pop-up failures remain"
recommended_usage:
  - "Use to compare end-to-end web-agent systems, not base LLMs"
  - "Report the agent scaffold (planner, memory, HITL tips) alongside any score"
  - "Run against the public task set; beware site-drift when reproducing older numbers"
  - "Pair with a domain-specific agent benchmark if your use case is narrow"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [gaia]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official WebArena repo, webarena.dev, and the primary paper. Scaffold/protocol-variant notes emphasized per expansion-PR policy."
tags: [evaluation, agents, benchmark]
---

## Overview

WebArena is a realistic, self-hosted web environment for building autonomous web agents. It provides interactive replicas of five common website types and 812 tasks requiring planning, tool use, and memory across page transitions.

## What it Measures (and what it doesn’t)

Measures: end-to-end web-agent capability – planning, browser tool use, multi-step navigation, and state tracking.

Does not measure: base LLM knowledge alone, offline reasoning, or safety/policy compliance (see safety benchmarks).

## Dataset & Protocol

- **Dataset:** WebArena – 812 tasks across 5 websites
- **Dataset URL:** https://github.com/web-arena-x/webarena
- **Evaluation setup:** agent issues browser actions from page observations; exact-match success rate.
- **Version:** –

## Metrics

- **success_rate** — higher is better — exact-match task success

## How to Run

```bash
git clone https://github.com/web-arena-x/webarena
cd webarena
# Follow the repo README to launch the site containers and run an agent.
```

## Known Issues, Leakage & Gaming Risks

- Heavy dependence on agent scaffold / prompt engineering
- Web-dependent tasks break as target sites change – reproducibility drift
- Small fixed task set (812) – variance at the top
- Human baseline ~78%; long-horizon failures persist

## How to Interpret Scores

- Report the agent scaffold, not just the model
- Top agents reached ~71-73% success (e.g., OpAgent 71.6%, Agent-E 73%) vs human ~78%
- A base-model number without its agent stack is misleading
- Re-check the live leaderboard – web tasks drift

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **WebArena** leaderboard for **WebArena** (protocol: **end-to-end web tasks, success rate**) shows top agents around **71-73% success** — e.g., OpAgent at **71.6%** and Agent-E at **73%** — versus a human baseline near **78%** (reported 2023-2026). This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Compare end-to-end web-agent systems, not base LLMs
- Report the agent scaffold and prompt setup
- Beware site-drift when reproducing numbers
- Pair with a domain-specific agent benchmark

## Related Benchmarks

- [GAIA](./gaia.md) – general AI assistant tasks (web + files + tools)

## Relation to the Arsenal

Web-agent evaluation benchmark. Complements agent frameworks in `content/projects/frameworks/` and agent tips in `content/tips-and-tricks/agents-and-orchestration/`.

## Resources

- [Leaderboard – WebArena](https://webarena.dev/)
- [GitHub – WebArena](https://github.com/web-arena-x/webarena)
- Paper: Zhou et al., "WebArena: A Realistic Web Environment for Building Autonomous Agents", arXiv:2307.13854

---

*Last reviewed: 2026-07-06 by @maintainer*
