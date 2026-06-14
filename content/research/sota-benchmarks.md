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

1. **Scenario**: You need a fast research reading path for AI engineering decisions
2. **Scenario**: You want to map papers to practical architecture and evaluation choices

## Strengths

- Organizes research by engineering relevance rather than publication date alone
- Links canonical paper entries where available
- Keeps benchmark and technique tracking separate from implementation guides

## Limitations / When NOT to Use

- Does not replace reading the original papers
- Benchmark leaderboards change frequently and should be verified before claims

## Integration Patterns

- Use paper entries as background context for architecture decisions.
- Link papers from projects, tools, tips, and reference stacks only when the connection is direct.
- Convert repeated research takeaways into tips or decision-tree updates.

## Resources

- [HELM](https://crfm.stanford.edu/helm/)
- [SWE-bench](https://www.swebench.com/)
- [LiveBench](https://livebench.ai/)

## Buzz & Reception

Research guide pages should be reviewed regularly because SOTA claims and active topics change quickly.

---
*Last reviewed: 2026-06-14 by @maintainer*

