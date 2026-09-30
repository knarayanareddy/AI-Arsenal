---
id: openphone
name: OpenPhone
version_tracked: null
artifact_type: library
category: llms
subcategory: open-source-models
description: "HKUDS phone-agent models plus PhoneCLI, which exposes Android and iOS app actions as callable commands for mobile agents"
github_url: "https://github.com/HKUDS/OpenPhone"
license: MIT
primary_language: Python
tags: [agents, tool-use, research]
maturity: beta
cost_model: open-source
github_stars: 976
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-26"
docs_url: "https://arxiv.org/abs/2510.22009"
demo_url: null
phase: foundation-model
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Turns brittle screen-tap trajectories into named app operations, so a mobile agent can act through a CLI instead of re-deriving coordinates every step."
best_for:
  - "You are building an agent that operates a real phone and you keep losing steps to brittle coordinate taps on changing UI layouts."
  - "You are evaluating phone agents on AndroidLab-style environments and you want a model and tool interface that plugs into an existing harness rather than a bespoke one."
  - "You have both Android and iOS targets and you need one abstraction over app actions that does not require a screenshot-only interaction loop."
avoid_if:
  - "You cannot provide real device or emulator environments, because the whole premise is grounded action execution against a live OS, not simulated text output."
  - "You need a cloud-hosted phone automation service with device fleets and compliance guarantees, because this is research infrastructure you host yourself."
  - "You assume the models transfer unchanged to a new app without the labelled trajectories; the paper's own framing is that mobile agents need domain adaptation, not just a stronger backbone."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "GitHub API verified stars, license string, primary language, topics, last commit, homepage and issue count; the license field is a non-standard value, not a recognised OSI licence. PhoneCLI, model and dataset links are read from the README; no device run was performed and no benchmark was reproduced."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

OpenPhone comes from HKUDS and was published at ACL 2026 as "OpenPhone: Mobile Agentic Foundation Models for AI Phone". The release has three parts: a phone-agent model and a paired dataset on the Hugging Face Hub, a research environment built on THUDM's AndroidLab, and PhoneCLI, added in September 2026, which reframes mobile app interfaces as callable commands. The paper's argument is that phone agents trained only on natural-language instructions and screenshots plateau quickly, so the contribution is a model trained on structured action traces that map to semantic app operations. The repository covers Android and iOS, ships Chinese documentation alongside the English README, and links an arXiv technical report at 2510.22009. The core research work sits with the HKUDS group, and the project is one of several open efforts in the mobile-agent space alongside the AndroidLab lineage it is built on.

## Why it's in the Arsenal

The bottleneck in phone agents is not the model, it is the action space. Coordinate-based tapping breaks the moment a vendor ships a layout change, an ad shifts the button, or the keyboard covers the target, and an agent that re-derives pixels every step burns its budget on perception rather than intent. PhoneCLI answers this by naming the operation, so a step becomes a call to a known command with declared parameters instead of a screenshot, a reasoning paragraph and a guess. The recurring engineering decision it removes is whether to build and maintain a bespoke interaction layer per app, or to train and serve against a command interface where failures show up as missing commands rather than as mis-clicked pixels.

## Architecture

The stack has three layers. The foundation layer is the OpenPhone model and its dataset, which pairs phone state with structured action traces so the policy learns app semantics rather than pixel geometry. The environment layer is built on THUDM's AndroidLab, providing instrumented Android environments where actions produce real observable state changes and where trajectories can be logged and replayed. The interface layer is PhoneCLI: a command surface that maps app capabilities such as launching an activity, tapping a labelled control, entering text or querying the view hierarchy into named, parameterised operations, with a graphical layer that shows the corresponding UI state so a human or an agent can relate a command to what is on screen. The intended flow is a CLI that knows and a GUI that sees, so the agent reasons over commands and the GUI supplies the grounding evidence.

## Ecosystem Position

It sits in the same space as research phone-agent stacks built on AndroidLab and its descendants, and as commercial device-automation platforms, but its position is a downloadable model and command interface rather than a hosted service with a device fleet. Compared with screenshot-only agent approaches it is an alternative interaction abstraction, not an incremental model upgrade, which is the substantive difference. It complements rather than duplicates the browser-agent entries in content/projects/agent-systems such as browser-use and stagehand, which solve the same grounding problem for web DOMs where structure is already machine-readable; a phone exposes no DOM, so the command layer has to be manufactured. The evaluation harness belongs with the benchmark tooling in content/projects/benchmarks-and-evals, and the training lineage belongs with the multimodal training work in content/projects/training-and-alignment.

## Getting Started

Clone the repository and set up the environment against an Android device or emulator, then pull the released model and dataset from the Hugging Face Hub. Because this drives real devices, the setup is longer than a pip install.

```bash
git clone https://github.com/HKUDS/OpenPhone.git
cd OpenPhone
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

Model weights and the OpenPhone dataset live at huggingface.co/hkuds/OpenPhone_model and huggingface.co/datasets/hkuds/OpenPhone_dataset, and the environment layer derives from THUDM's AndroidLab, which you will need alongside this repository. A Chinese README (README_CN.md) is maintained in parallel with the English one.

## Key Use Cases

1. Robust phone automation: drive messaging, settings or shopping flows through named commands that survive layout changes that would break coordinate tapping.
2. Agent research on grounded action: study how a model trained on structured action traces performs on AndroidLab environments with logged, replayable trajectories.
3. Cross-platform mobile tooling: keep one command vocabulary for Android and iOS targets instead of writing a separate integration per app and per OS.

## Strengths

- Command-level action space removes brittle coordinate dependence, which is the standard failure mode of phone agents.
- Releases model, dataset and environment together, so the training and evaluation setup is reproducible rather than assembled from separate pieces.
- Built on an established research environment lineage, which makes trajectories comparable with existing mobile-agent work.
- Covers Android and iOS behind one abstraction, avoiding a per-platform integration for every app under test.

## Limitations

Everything depends on device availability, and instrumented Android and iOS environments are expensive and awkward to scale compared with a text or web benchmark. The command layer is itself a surface that can be wrong: a missing or mis-mapped command produces a confident failure rather than an obvious error. Research mobile-agent results transfer poorly outside the environments they were measured in, so an AndroidLab number is weak evidence for a production app with different latency, permissions and account state. The project is young, with the paper from late 2025 and PhoneCLI added in September 2026, so the CLI surface should be expected to change. The repository's own licence metadata is non-standard rather than a well-known OSI licence, which is a real adoption blocker for anyone shipping inside a product, and the model card should be read before use.

## Relation to the Arsenal

This is a foundation-model entry in the mobile-agent branch of content/projects/foundation-models, and its runtime partner is the agent harness layer in content/projects/agent-systems, where browser automation lives. For evaluation, the environments pair with the benchmark tooling in content/projects/benchmarks-and-evals, and the failure-mode analysis belongs with the safety and evaluation writing in content/research/evaluation-and-safety. Where content/tools/dx-and-tooling covers the local developer loop, OpenPhone is the remote-control counterpart: it acts on a device you do not hold.

## Resources

- [Repository and PhoneCLI documentation](https://github.com/HKUDS/OpenPhone)
- [Technical report (arXiv 2510.22009)](https://arxiv.org/abs/2510.22009)
- [Model weights on Hugging Face](https://huggingface.co/hkuds/OpenPhone_model)
