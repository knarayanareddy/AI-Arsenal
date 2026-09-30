---
id: swe-agent-swe-agent
name: "SWE-agent"
version_tracked: null
artifact_type: tool
category: agents
subcategory: coding-agents
description: "Agent harness that attempts a real fix for a GitHub issue using a chosen LM inside a shell sandbox"
github_url: "https://github.com/SWE-agent/SWE-agent"
license: "MIT"
primary_language: Python
org_or_maintainer: "SWE-agent"
tags: [code-gen, evaluation, research, agents]
maturity: beta
cost_model: open-source
github_stars: 20433
github_stars_last_30d: 0
trending_score: 34
last_commit: "2026-09-21"
docs_url: "https://swe-agent.com"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [language, reasoning]
relation_to_stack: [study-and-reference, deploy-as-is]
health_signals: [actively-maintained]
ecosystem_role:
  - "Agent harness that takes a GitHub issue and attempts a real fix with an LM of choice, and the reference design behind most subsequent SWE agent loops."
best_for:
  - "You are researching agent loop design and want one readable implementation of the edit-run-observe cycle to instrument, replay, and ablate."
  - "You run an internal bug-fix backlog and want to pre-filter issues with a model before a human writes the patch, accepting a partial hit rate."
  - "You maintain a benchmark harness and want the same agent harness pinned across two model providers so a comparison measures the model, not the loop."
avoid_if:
  - "You need a production fixing service with a success guarantee, since patch acceptance rates on real issues are low even with strong models."
  - "Your environment has no container isolation story, because the agent executes arbitrary shell commands against the checkout you point it at."
  - "Token budget is the binding constraint, since a single attempt routinely burns tens of thousands of tokens in failed edit-and-retry cycles."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (20433), MIT license, last commit 2026-09-21, Python as primary language and the topic list were API-verified. ACI commands, YAML config fields, batch mode, and the NeurIPS 2024 venue come from the official README and docs; the low hit-rate and token-cost claims are read from the project's own results, not reproduced here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/SWE-agent/SWE-agent", "date": "2026-09-28", "description": "20,433 stars and last commit 2026-09-21 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

SWE-agent wraps a language model in an Agent-Computer Interface: instead of emitting tool JSON, the model edits and runs inside a real shell, and the harness parses those commands, executes them in the repository, and folds stdout, stderr, and diffs back into the prompt. Configuration is a YAML file that names the model and cost limits, the number of steps, the environment image, and the exact command set the agent is allowed — a `create` command that opens a file, `edit`, `run` to execute a shell line, and `submit` to end the attempt — so a run is fully described by a config plus a task instance. The package exposes batch mode over a dataset of issue specifications, writes every trajectory to disk as a structured log, and a trajectory-rendering path that replays the step-by-step history for human review. mini-swe-agent in the same lineage shows the same architecture compressed to roughly a hundred lines, and the project was published at NeurIPS 2024.

## Why it's in the Arsenal

The engineering question this codebase answers is how to make a self-modifying coding loop inspectable. Naive agent scripts interleave prompts, tool dispatch, and environment setup in one function, so a failure is a wall of interleaved text and you cannot tell whether the model gave up, the parser mis-read its output, or the test suite was never run. Separating the loop into a fixed command grammar, a per-step trajectory record, and a declarative config means every failure is a specific broken step in a replayable file, which is what makes batch evaluation and cross-model comparison meaningful rather than anecdotal.

## Architecture

Three components do the work. The environment layer is a Docker image per task instance with the repository at a known commit plus the language toolchain, and shell commands run inside it; images and task setup are declared in config so a run is reproducible. The agent layer is a loop: it renders the history into a prompt, calls the model through a pluggable model wrapper, passes the completion to a command parser that recognises `edit`, `run`, `submit`, and a `ls`/`view` family, executes the recognised commands, and appends the observations. The batch layer reads a dataset of issue instances, forks one run per instance, and records each trajectory. Crucially the model never calls tools directly — the ACI is the only channel, which is precisely the constraint that makes trajectories comparable across models.

## Ecosystem Position

SWE-agent sits in the coding-agent segment alongside OpenHands, aider, Cline, and Claude Code, and it competes with them on loop design rather than shipping convenience: where aider is an interactive pair programmer and Cline is a VS Code extension, SWE-agent is a batch research harness with a paper attached. It overlaps with mini-swe-agent, a deliberate line-for-line reduction of the same design, and sits in the same evaluation lane as SWE-bench and SWE-smith, which supply the task instances rather than the agent. Compared with Aider's edit-format protocol, the ACI here is shell-centric and more fragile on malformed output, which is a real reason teams migrate toward OpenHands's container-per-task model when they need production durability.

## Getting Started

Install from a clone and run the bundled config against one instance:

```bash
git clone https://github.com/SWE-agent/SWE-agent && cd SWE-agent
pip install -e .
swe-agent run --config config/default.yaml -t astropy__astropy-12907
```

Then read `sweagent/trajectories/` for the recorded trajectory, and copy the config to change the model, step limit, or command set before batching over a dataset.

## Key Use Cases

1. Reproducing the SWE-agent paper numbers on a new model by swapping only the model field in the YAML config and rerunning the batch mode.
2. Building an internal issue-triage bot that runs this loop nightly, collects the produced diffs, and routes them to human review rather than merging them.
3. Teaching a team how an LM agent loop fails, by reading one trajectory file that shows exactly which step went wrong after a bad edit, a bad command, or a misread test failure.

## Strengths

- The trajectory record makes every run auditable step by step, which is unusual for agent code and turns anecdote into evidence.
- A declarative YAML config pins model, budget, step limit, environment image, and command set, so experiments are diffable.
- The ACI grammar forces a single, comparable tool channel across providers, keeping cross-model comparisons about the model.
- Batch mode over standard issue datasets means it drops into an existing benchmark harness with little glue code.

## Limitations

The success rate on real issues is low enough that the tool is a research instrument, not a delivery mechanism, and a full run burns a large token budget to reach a wrong patch. The environment layer assumes Docker and a per-task container, which is friction in locked-down CI and a genuine risk if you point it at a machine you care about. Parsing free-form model output into the command grammar is brittle; a model that drifts from format fails silently as an unparseable step. Results are strongly model-dependent, so config and model must be versioned together, and the shell-centric ACI gives the model more destructive capability than a scoped file-edit protocol would.

## Relation to the Arsenal

Read this next to the other agent-system entries in content/projects/agent-systems — it is the design ancestor of most of them, and the clearest statement of the loop contract that openai-agents-sdk, langgraph, and pydantic-ai each choose differently. For the runtime side of the same problem, the inference-engine entries in content/projects/inference-engines matter because agent loops are token-bound. Against coding tooling in content/projects/frameworks, this is the autonomous counterpart to aider-style interactive work, and the evaluation entries are where the same benchmark instances get reused.

## Resources

- [SWE-agent project site and paper](https://swe-agent.com)
- [SWE-agent GitHub repository](https://github.com/SWE-agent/SWE-agent)
- [Configuration reference and command set](https://swe-agent.com/latest/config/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (20,433 stars, last commit 2026-09-21, license MIT, verified via GitHub API on 2026-09-28)*
