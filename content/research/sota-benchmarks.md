---
id: "sota-benchmarks"
title: "SOTA Benchmarks"
entry_type: "guide"
section: "research"
description: "Reference table of model, agent, code, math, and safety benchmark leaderboards"
tags:
  - benchmark
  - evaluation
  - llm
related_entries: []
added_date: "2026-06-14"
last_reviewed: "2026-06-14"
added_by: "maintainer"
status: "active"
---

## Overview

This page lists benchmark leaderboards worth checking before making claims about model quality. It intentionally links to benchmark references rather than copying fast-changing scores.

## Why It's in the Arsenal

SOTA numbers age quickly. Linking to live benchmark sources is more trustworthy than freezing scores in Markdown without a refresh process.

## Key Features

| Benchmark | What It Tests | Link to Leaderboard / Reference |
|---|---|---|
| MMLU | Broad academic knowledge | [Papers with Code MMLU](https://paperswithcode.com/sota/multi-task-language-understanding-on-mmlu) |
| HumanEval | Python code generation | [OpenAI HumanEval](https://github.com/openai/human-eval) |
| SWE-Bench | Real GitHub issue resolution | [SWE-bench](https://www.swebench.com/) |
| GAIA | General AI assistant tasks | [GAIA benchmark](https://huggingface.co/gaia-benchmark) |
| LiveBench | Contamination-resistant live model evals | [LiveBench](https://livebench.ai/) |
| MATH | Competition-style math reasoning | [Papers with Code MATH](https://paperswithcode.com/dataset/math) |
| GPQA | Graduate-level science Q&A | [GPQA paper](https://arxiv.org/abs/2311.12022) |
| BigBenchHard | Hard BIG-bench tasks | [BIG-bench Hard](https://github.com/suzgunmirac/BIG-Bench-Hard) |
| MT-Bench | Chatbot multi-turn judging | [FastChat / MT-Bench](https://github.com/lm-sys/FastChat/tree/main/fastchat/llm_judge) |
| HELM | Holistic model evaluation | [Stanford HELM](https://crfm.stanford.edu/helm/) |

## Architecture / How It Works

Benchmark use should follow this order:

1. Identify the user-facing task.
2. Pick the closest public benchmark only as a coarse signal.
3. Build a private eval set that matches your workload.
4. Use public leaderboards to shortlist models, not to make final production decisions.

## Getting Started

```bash
# Use public leaderboards for shortlisting.
# Use private evals for deployment decisions.
```

## Use Cases

1. **Scenario**: a model-selection decision needs a current leaderboard rather than a benchmark number quoted from a launch post.
2. **Scenario**: you want to know which benchmarks are close to saturated and therefore no longer able to separate candidates.
3. **Scenario**: a vendor claims a score improvement and you need the benchmark definition to check whether the comparison was like-for-like.

## Strengths

- Records benchmark definitions alongside scores, which is what makes a comparison checkable rather than decorative.
- Flags near-saturated benchmarks, so a reader knows when a number has stopped discriminating between candidates.
- Distinguishes the leaderboard value from the claim it can support, which is the distinction vendor posts omit.

## Limitations / When NOT to Use

- Leaderboard entries are point-in-time and change without notice; a number recorded here may be several model generations old.
- Benchmark comparability is the hard part: different harnesses, prompts and few-shot settings make cross-row comparison unreliable even when a table looks uniform.
- SOTA on a public leaderboard is evidence about a benchmark, not about your workload.

## Integration Patterns

- Link a benchmark from a model-selection decision and state the harness and prompt conditions, since a score without its protocol is not comparable.
- When a benchmark is deprecated, remove it from selection advice rather than leaving a stale row to be quoted.

## Resources

- [HELM](https://crfm.stanford.edu/helm/)
- [SWE-bench](https://www.swebench.com/)
- [LiveBench](https://livebench.ai/)

## Buzz & Reception

Research guide pages should be reviewed regularly because SOTA claims and active topics change quickly.

---
*Last reviewed: 2026-06-14 by @maintainer*

