---
id: mind2web
title: "Mind2Web"
entry_type: benchmark
category: agents
modality: [text, vision]
status: active
protocol_confidence: evolving
score_interpretation: higher-is-better
what_it_measures: "Generalist web-agent ability on real websites – 2,350 human-demonstrated tasks across 137 sites and 31 domains, testing cross-site and cross-domain generalization."
metrics:
  - name: "element accuracy"
    direction: higher
    notes: "Correct target element selected per step"
  - name: "step success rate"
    direction: higher
    notes: "Element + operation (click/type/select) both correct"
  - name: "task success rate"
    direction: higher
    notes: "All steps of the task correct – the headline end-to-end number"
protocol:
  dataset: "Mind2Web"
  dataset_url: "https://huggingface.co/datasets/osunlp/Mind2Web"
  evaluation_setup: "Offline: predict next action against cached website snapshots, evaluated on cross-task / cross-website / cross-domain splits. Mind2Web 2 (2025) adds live-web agentic evaluation with Agent-as-a-Judge."
  version: "v1 (2023); Mind2Web 2 live variant (2025)"
leaderboards:
  - name: "Official Mind2Web site + leaderboard"
    url: "https://osu-nlp-group.github.io/Mind2Web/"
    last_checked: "2026-07-08"
known_issues:
  - "Offline v1 grading marks alternative-but-valid action sequences wrong – underestimates real agents"
  - "Cached 2023 snapshots drift ever further from today's live sites"
  - "Cross-domain split is the only strong generalization test; cross-task numbers flatter memorization"
  - "Mind2Web 2's judge-based live grading trades reproducibility for realism – v1 and v2 numbers are not comparable"
recommended_usage:
  - "Report all three splits (cross-task / cross-website / cross-domain) – the gaps between them are the finding"
  - "Use v1 for cheap reproducible iteration; confirm on Mind2Web 2 or WebArena before claiming real-web competence"
  - "State whether HTML-only or HTML+screenshot input was used – multimodal grounding changes results materially"
  - "Never mix v1 and v2 numbers in one comparison"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["webarena", "osworld", "browsecomp"]
enrichment_status: draft
enrichment_notes: "Authored from the Mind2Web paper (arXiv:2306.06070), official site, and HF dataset card; URLs verified 2026-07-08. protocol_confidence=evolving due to the v1→v2 protocol shift."
tags: [evaluation, agents, benchmark]
---

## Overview

Mind2Web (OSU NLP, 2023) was the first generalist web-agent dataset built from real websites rather than simplified sandboxes: 2,350 tasks demonstrated by humans across 137 live sites in 31 domains, from booking flights to managing subscriptions. Its splits deliberately hold out entire websites and domains to test generalization, and it seeded a family of successors including the live-web Mind2Web 2 (2025).

## What it Measures (and what it doesn’t)

Measures grounded action prediction on real web UIs – selecting the right element and operation given a task, and generalizing to unseen sites and domains.

Does not measure (v1): recovery from mistakes, multi-tab workflows, or live-site dynamics – offline snapshots cannot capture them. Long-horizon research synthesis is BrowseComp's territory, not Mind2Web's.

## Dataset & Protocol

- **Dataset:** Mind2Web – 2,350 tasks, 137 websites, 31 domains
- **Dataset URL:** https://huggingface.co/datasets/osunlp/Mind2Web
- **Evaluation setup:** offline next-action prediction on cached snapshots; three generalization splits; Mind2Web 2 evaluates live browsing with Agent-as-a-Judge
- **Version:** v1 (2023); Mind2Web 2 (2025)

## Metrics

- **element accuracy** — higher is better
- **step success rate** — higher is better
- **task success rate** — higher is better — end-to-end headline

## How to Run

```bash
# from datasets import load_dataset
# ds = load_dataset("osunlp/Mind2Web")
# Official evaluation code:
# https://github.com/OSU-NLP-Group/Mind2Web
```

## Known Issues, Leakage & Gaming Risks

- Single-reference grading penalizes valid alternative action paths
- Snapshot staleness: cached DOMs increasingly unlike current sites
- Public demonstrations → contamination for models trained on web-agent data
- Judge-model dependence in Mind2Web 2 live grading

## How to Interpret Scores

- Task success rates remain low – v1 numbers historically sat well under 30% for cross-domain splits, and live Mind2Web 2 tasks stay hard as of **2026-07-08** (see the official leaderboard) – so absolute usefulness claims from these scores are premature.
- The cross-task → cross-domain drop is the generalization signal; a flat profile means genuine transfer.
- Element accuracy without operation correctness inflates perceived competence – prefer step/task success.

## Recommended Usage

- Iterate cheaply on v1 offline splits; validate on live benchmarks before shipping
- Use cross-domain results when choosing a base model for a web agent
- Report input modality (HTML, accessibility tree, screenshots) with every number
- Combine with WebArena/OSWorld for interactive and OS-level coverage

## Related Benchmarks

- [WebArena](./webarena.md) – interactive sandboxed web tasks with execution-based grading
- [OSWorld](./osworld.md) – full desktop-environment agent tasks
- [BrowseComp](./browsecomp.md) – hard-to-find information retrieval via browsing

## Relation to the Arsenal

Web-agent grounding benchmark in the agents category; relevant to browser-automation agents in `content/projects/agent-systems/` (e.g. page-agent, skyvern-class tools).

## Resources

- [Official site and leaderboard](https://osu-nlp-group.github.io/Mind2Web/)
- [Mind2Web paper – Deng et al., 2023](https://arxiv.org/abs/2306.06070)
- [Dataset – Hugging Face](https://huggingface.co/datasets/osunlp/Mind2Web)
