---
id: mini-swe-agent
name: "mini-swe-agent"
version_tracked: null
artifact_type: tool
category: code-generation
subcategory: coding-agents
description: "Deliberately minimal software-engineering agent: bash as the only tool, linear message history, stateless action execution"
github_url: "https://github.com/SWE-agent/mini-swe-agent"
license: "MIT"
primary_language: Python
org_or_maintainer: "SWE-agent (Princeton & Stanford)"
tags: [code-gen, agents, tool-use, docker]
maturity: production
cost_model: open-source
github_stars: 6933
github_stars_last_30d: 0
trending_score: 55
last_commit: "2026-09-03"
docs_url: "https://mini-swe-agent.com/latest/"
demo_url: null
paper_url: "https://arxiv.org/abs/2405.15793"
paper_id: null
phase: agent-system
domain: [language, reasoning]
relation_to_stack: [build-on-top, deploy-as-is, study-and-reference]
health_signals: [actively-maintained, research-origin, production-proven]
ecosystem_role:
  - "The minimal-scaffold counterweight in the coding-agent lane: roughly a hundred lines of agent logic, bash as the sole tool, and a message history that is identical to the trajectory it sends to the model."
best_for:
  - "You need a legible baseline agent whose entire behaviour you can read in one file, so that measured differences are attributable to the model rather than to scaffolding"
  - "You are generating or replaying trajectories for training and want the recorded history to be exactly what the model saw, with no scaffold-side transformation in between"
avoid_if:
  - "You want rich editor affordances, multi-file planning UI, or a curated tool registry — the design deliberately has none, and adding them is a rewrite rather than a configuration change"
  - "You need a persistent interactive shell across steps; each action runs independently, so shell state does not survive between commands by design"
upstream_dependencies: []
downstream_consumers: []
alternatives: [openhands, cline]
integrates_with: [litellm, e2b]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Stars (6,933), forks (964), licence (MIT), language (Python), created 2025-06-28, last commit (2026-09-03) verified via the GitHub API on 2026-09-03. The >74% SWE-bench Verified figure and the list of adopting organisations are maintainer-reported in the README, not independently reproduced here. production-proven rests on those named adopters rather than on verification by this catalogue."
added_date: "2026-09-03"
last_reviewed: "2026-09-03"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/SWE-agent/mini-swe-agent", "date": "2026-09-03", "description": "6,933 stars on GitHub as of 2026-09-03 (GitHub API); created 2025-06-28 by the team behind SWE-bench"}]
featured: false
status: active
---

## Overview

mini-swe-agent is a software-engineering agent built as a deliberate counter-proposal to growing agent scaffolds. Its agent class is on the order of a hundred lines of Python, it exposes exactly one tool — bash — and it does not use the model's tool-calling interface at all, which means it runs against any model that can produce text. Its history is strictly linear: each step appends to a message list, and that same list is what gets sent back to the model, so there is no divergence between the recorded trajectory and the prompt. It reports above 74% on SWE-bench Verified, and its maintainers state that most current development has moved here from the larger SWE-agent project.

## Why it's in the Arsenal

Every other coding agent in this catalogue adds scaffolding: planning structures, tool registries, file-editing affordances, session state. This entry is the control condition that makes those choices measurable. When a benchmark result improves, the question is always whether the model improved or the harness did, and a hundred-line agent with one tool leaves nowhere for the difference to hide. That is also why it earns its own entry alongside the [SWE-bench dataset](../../benchmarks/code/swe-bench.md) rather than being folded into it: one is the task set, the other is the minimal system evaluated against it.

## Architecture

The agent loop is a linear accumulation. A task description becomes the first message; the model replies with a bash command; the command runs; its output is appended; repeat. There is no branching, no summarisation step, and no scratchpad separate from the message list. Action execution is stateless — each command is an independent `subprocess.run` call rather than a persistent shell session, which the maintainers call out as the design's most consequential choice: it makes sandboxing a matter of swapping the execution call for `docker exec`, and it makes parallel fan-out trivial because no action depends on a prior one's shell state. Environments cover local execution plus Docker, Podman, Singularity, and other sandbox backends. Model access goes through litellm, OpenRouter, or Portkey, so provider choice is a configuration detail.

## Ecosystem Position

It sits opposite [OpenHands](../frameworks/openhands.md) and [Cline](../../tools/dx-and-tooling/cline.md), which invest in containerised runtimes and editor integration respectively; this project argues that investment is no longer necessary at current model capability, which is a claim worth having on record either way. Its stateless execution model overlaps sandbox providers such as [E2B](../../tools/orchestration/e2b.md) in intent — both make safe execution swappable — but it ships its own environment abstraction rather than depending on one. Model routing is delegated to [LiteLLM](../../tools/serving-and-deployment/litellm.md) rather than reimplemented. It is not a framework for composing multi-agent systems, so there is nothing to compare against [LangGraph](../frameworks/langgraph.md).

## Getting Started

```bash
pip install mini-swe-agent
export OPENAI_API_KEY=sk-...
mini-swe-agent   # or drive it from Python with a task string
```

Pointing it at a sandbox is a change of environment class, not a change to the agent loop.

## Key Use Cases

1. **Baseline evaluation** — measuring a model's engineering ability with scaffold effects minimised.
2. **Trajectory generation** — capturing histories that are already in the exact form needed for fine-tuning.
3. **Parallel issue resolution** — fanning independent actions across many sandboxes, since no action holds state another needs.

## Strengths

- The agent fits in one readable file, so behaviour can be audited rather than inferred from a framework's abstractions.
- Avoiding the tool-calling interface means any text-completion model works, removing a provider capability requirement.
- Recorded trajectory equals model input, which eliminates a whole class of train/eval mismatch in downstream use.

## Limitations

- No tool beyond bash means the model must express every action as shell text, which loses structured-argument validation a tool schema would provide.
- The absence of a persistent shell is a real constraint for workflows that build up environment state across commands.
- The headline benchmark figure is maintainer-reported; independent reproduction is not established here, and `production-proven` rests on named adopters rather than on this catalogue's own verification.

## Relation to the Arsenal

Catalogued as an agent-system because it is a runnable system rather than an importable orchestration library. For the benchmark it is measured against, see [SWE-bench](../../benchmarks/code/swe-bench.md); for agents that invest in scaffolding instead, see [Agent Systems](./_index.md).

## Resources

- [GitHub](https://github.com/SWE-agent/mini-swe-agent)
- [Documentation](https://mini-swe-agent.com/latest/)
- [SWE-agent paper (arXiv 2405.15793)](https://arxiv.org/abs/2405.15793)

---
*Facts from the GitHub API on 2026-09-03 by @maintainer — enrichment_status: draft. 6,933 stars, 964 forks, MIT, Python, created 2025-06-28, last commit 2026-09-03. Benchmark and adopter claims are maintainer-reported.*
