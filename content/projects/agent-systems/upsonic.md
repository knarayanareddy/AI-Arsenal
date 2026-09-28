---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: "Upsonic"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: upsonic
name: "Upsonic"
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: "Python framework for autonomous and traditional agents with workspace-confined file and shell access plus a layered OCR interface"
github_url: "https://github.com/Upsonic/Upsonic"
license: MIT
primary_language: Python
tags: [agents, llm]
maturity: beta
cost_model: open-source
github_stars: 7955
last_commit: "2026-06-18"
docs_url: "https://docs.upsonic.ai"
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "build-on-top"
  - "deploy-as-is"
health_signals:
  - "actively-maintained"
  - "community-driven"
ecosystem_role:
  - "An agent framework emphasizing reliability through task typing, structured outputs, and verification of results."
best_for: ["You want an autonomous agent that operates on real files and shell commands and you need its reach confined to a directory you declare, because path traversal and dangerous commands are blocked.", "You need a document-processing step in the same framework as your agent, because the OCR interface is a layered pipeline rather than a separate tool you wire up.", "You want to start from an existing agent definition, because the prebuilt collection packages a skill, system prompt and first message per agent and accepts community contributions."]
avoid_if: ["You need a framework with a large published ecosystem and long support history, because this project is a comparatively young MIT-licensed framework with a much smaller footprint.", "You want unconstrained agent execution across your machine, because the workspace restriction is a deliberate default you would have to work around.", "You need typed, schema-validated model output as the primary contract, because the API here is task-and-tool oriented rather than typed end to end."]
enrichment_notes: "Repository, MIT license, and 2026-06-18 activity verified via the GitHub API on 2026-07-12. Reliability features help but do not guarantee correctness."
---

## Overview

Upsonic is a Python framework for building autonomous agents in the style it names as OpenClaw and Claude Cowork, as well as more traditional agent systems. Two agent classes are documented. An AutonomousAgent takes a model, a workspace path and a Task, then executes the task with file and shell operations restricted to that workspace, with path traversal and dangerous commands blocked; the documented next step is attaching a sandbox provider such as E2B for isolated cloud execution. A traditional Agent takes a model, a name and a Task, and supports custom tools declared with a decorator and passed into the task. A prebuilt collection packages a skill, system prompt and first message per agent so a runnable agent is close to install, and the collection is open to community pull requests. The framework also ships a unified OCR interface built as a layered pipeline, with Layer 0 handling document preparation such as PDF to image conversion and preprocessing and Layer 1 running the OCR engine, with EasyOCR named as an engine.

## Why it's in the Arsenal

The decision it addresses is how much freedom an agent that touches your filesystem should have. A coding agent that can run shell commands anywhere is convenient and dangerous, so the framework makes the boundary a constructor argument: the workspace is where file and shell operations are allowed to land, and traversal and dangerous commands are refused. That is a coarser, more legible model than a per-tool permission system, and it is well suited to a defined project directory. The second choice is offering an autonomous agent and a traditional tool-calling agent in one package, so the same team can prototype a long-running task and then tighten it into explicit tools.

## Architecture

The Python package exposes an Agent class that takes a model identifier and an optional name, and a Task object carrying a description plus a tool list; tools are ordinary Python functions decorated with a tool marker and supplied to the task, and the agent executes them as the model requests. The AutonomousAgent variant adds a workspace parameter that becomes the enforcement boundary for its file and shell operations, with path traversal and dangerous commands blocked rather than merely discouraged, and the documented extension is a sandbox provider for isolated remote execution. Model identifiers are strings such as a provider-prefixed model name, so provider choice is configuration. The OCR subsystem is separate but shipped in the same package: a unified OCR interface over a pipeline where Layer 0 prepares documents by rasterising and preprocessing and Layer 1 dispatches to a concrete engine, with EasyOCR shown as one implementation. Install extras, such as the OCR extra, gate which parts you pull in.

## Ecosystem Position

Upsonic overlaps with the agent frameworks in content/projects/framework, and the closest comparison is against the general tool-calling designs: where those tend to give you a configurable loop and a memory layer, Upsonic's distinctive surface is a workspace-jailed autonomous agent with a matching traditional agent in the same package. It competes with the coding agents in content/projects/dx-and-tooling at the point where an agent operates on a project directory, but it is a library you import rather than a tool you run. The bundled OCR pipeline meets the document-processing entries in content/projects/data-and-retrieval, which would otherwise be a separate dependency in the same pipeline. MCP tool support is documented as a next step rather than a first-class surface here, so treat MCP-native tools in content/projects/agent-systems as the comparison point if that matters.

## Getting Started

Install the package, construct an agent with a model and a workspace, and run a task:

```bash
uv pip install upsonic
# or: pip install upsonic
```

```python
from upsonic import AutonomousAgent, Task

agent = AutonomousAgent(
    model="anthropic/claude-sonnet-4-5",
    workspace="/path/to/logs",
)
result = agent.print_do(Task("Analyze server logs and detect anomaly patterns"))
```

Add the OCR extra with `uv pip install "upsonic[ocr]"` when you need the layered document pipeline, and attach a sandbox provider if you want execution isolated from your machine.

## Key Use Cases

1. Confined log and file analysis: point an autonomous agent at a log directory and have it hunt anomalies without giving it the rest of the filesystem.
2. Tool-augmented task agents: declare small Python functions as tools and hand them to a traditional agent for repeatable analysis tasks rather than open-ended work.
3. Document-heavy agent pipelines: run the layered OCR interface over PDFs to get text into a task before the agent reasons over it, without adding a separate OCR dependency.

## Strengths

- Workspace-scoped autonomy is the default rather than an opt-in, so an agent that runs shell commands has a stated boundary.
- Both an autonomous and a traditional agent in one package, letting a long-running task graduate into explicit tool calls.
- Layered OCR pipeline with a document-preparation stage, so rasterising and preprocessing are separated from the OCR engine.
- Prebuilt agent collection with skill, system prompt and first message packaged per agent, so a working runnable agent is close to install.

## Limitations

The project is young and small, with roughly eight thousand stars and a last commit in mid-2026, so the ecosystem, examples and maintenance cadence behind it are thinner than the established frameworks it resembles. Workspace confinement is coarse: a single directory boundary is easier to reason about than a per-tool permission model, and it is not a substitute for a real sandbox, which the project itself points at as a separate provider. The autonomous agent still calls a hosted model in the documented example, so autonomy is not free even though execution is local. Documentation and examples live on a separate docs site rather than in the repository, and the OCR subsystem is a nice consolidation that is unrelated to the agent core, so treat the package as two products sharing a distribution.

## Relation to the Arsenal

This belongs in content/projects/agent-systems as the workspace-jailed autonomous agent and compares against the coding agents in content/projects/dx-and-tooling, which is where the same directory-scoped execution shows up as a shipped tool rather than a library. The framework entries in content/projects/framework are the alternative when you want a configurable loop you control explicitly. Its bundled OCR meets the document-processing entries in content/projects/data-and-retrieval, and the sandbox provider it points at for isolation is the kind of boundary the agent-system entries in the same phase also rely on. If your requirement is typed model output rather than a task-and-tool API, read the pydantic-ai entries instead.

## Resources

- [GitHub — Upsonic/Upsonic](https://github.com/Upsonic/Upsonic)
- [Documentation — docs.upsonic.ai](https://docs.upsonic.ai)
- [llms-full.txt for IDE indexing](https://docs.upsonic.ai/llms-full.txt)
