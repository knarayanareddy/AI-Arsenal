---
id: continue
name: Continue
version_tracked: null
artifact_type: platform
category: code-generation
subcategory: coding-agents
description: "Open-source coding agent shipped as a CLI, VS Code extension and JetBrains plugin, now frozen at a final 2.0.0 release"
github_url: "https://github.com/continuedev/continue"
license: Apache-2.0
primary_language: TypeScript
org_or_maintainer: continuedev
tags: [agents, chunking]
maturity: production
cost_model: open-source
github_stars: 36053
github_stars_last_30d: 0
trending_score: 60
last_commit: "2026-09-28"
docs_url: "https://docs.continue.dev"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [deploy-as-is, fork-and-adapt]
health_signals: [actively-maintained, org-backed, community-driven]
ecosystem_role:
  - "The open-source, bring-your-own-model counterpart to Copilot/Cursor: the reference choice when the constraint is model control (local models, self-hosted endpoints, no code leaving the network) rather than maximum assistant capability"
best_for: ["You are reviving an existing fork of Continue and you need the exact 2.0.0 extension, CLI or plugin surface to work against rather than an actively developed main branch.", "You are studying how an editor-agnostic coding agent was packaged across three surfaces, because the CLI and VS Code extension remain readable reference implementations under Apache-2.0.", "You have a team that standardised on this agent before the sunset and you need to plan a migration, since no further fixes will ship to the repository."]
avoid_if: ["You are starting a new editor-agent project, because the README states plainly that the repository is no longer actively maintained and is read-only for all users.", "You need security patches, model-provider updates or a bug fix from upstream, because the final 2.0.0 release already shipped and nothing will follow it.", "You are choosing an actively maintained JetBrains integration, because the README recommends the Continue CLI over the JetBrains plugin."]
upstream_dependencies: []
downstream_consumers: []
alternatives: [aider, cline, tabby]
integrates_with: [ollama, vllm]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (34.7k), Apache-2.0, and active development (last push 2026-07-08) verified via the GitHub API on 2026-07-08. Capability descriptions from official docs; comparative capability claims are qualitative, not benchmarked here.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/continuedev/continue","date":"2026-07-08","description":"34.7k stars, Apache-2.0, active development"}
featured: false
status: active
---

## Overview

Continue is a coding agent delivered as three surfaces over one codebase: a CLI, a VS Code extension and a JetBrains plugin. The README documents the final 2.0.0 release of all three, describing the work as a polish pass that removed anonymous telemetry, pulled authentication out of the project, and fixed a set of accumulated bugs. The repository itself now carries an explicit maintenance notice stating it is no longer actively maintained and is read-only for all users, and the maintainers frame the artifact as a foundation the community built that others can carry forward. Configuration and customisation detail moved to the hosted documentation site rather than the repository.

## Why it's in the Arsenal

The pattern this resolved was provider neutrality at the editor layer: an open-source coding agent that a team could point at whichever model provider it had credentials for, and that did not require surrendering the editor to a vendor's own assistant. The 2.0.0 pass then resolved the two things that most often stop a team adopting such a tool, anonymous telemetry and built-in authentication, by removing both from the open-source artifact. The decision is now inverted: because the repository is frozen, the relevant question for a new adopter is migration, not evaluation of roadmap.

## Architecture

The repository is a TypeScript monorepo with a per-surface layout visible in the README structure, holding the CLI, the extensions/vscode package and the JetBrains plugin, each released together as version 2.0.0. The CLI is published to npm as @continuedev/cli and the VS Code extension is distributed through the Visual Studio Code Marketplace and OpenVSX. Removing authentication from the repository moved credential handling to the user's own environment or the hosted service, and removing anonymous telemetry means the open-source build collects nothing by default. The internal agent loop, provider adapters and context assembly are documented on the Continue Docs site rather than in this repository's README, so anyone reverse-engineering the design should read the docs and the 2.0.0 tag directly.

## Ecosystem Position

Continue is a direct alternative to the vendor-locked coding assistants in content/projects/dx-and-tooling, and it now sits alongside them as a frozen option rather than a live competitor. It overlaps with Gemini CLI and Claude Code on the terminal-agent surface, but those ship with an active release cadence and a first-party model, whereas Continue's distinguishing property was working against providers you chose yourself. Compared with the framework entries in content/projects/framework, Continue is an end-user developer tool rather than a library you embed, so the two rarely appear in the same stack. It is worth remembering for its packaging decisions rather than for a feature race, and the maintainers' own recommendation points new JetBrains users at the CLI instead.

## Getting Started

The released CLI installs globally from npm, and the editor surfaces come from their marketplaces rather than from a build of this repository:

```bash
npm install -g @continuedev/cli
continue --help
```

For the editor experience, install the Continue extension from the VS Code Marketplace or OpenVSX, or the plugin from the JetBrains marketplace, then point it at your model provider using the configuration guide in the docs. Note that the repository is read-only, so any local edits are your own fork from the moment you clone it.

## Key Use Cases

1. Editor agent in an air-gapped or provider-restricted team: point the extension at a self-hosted OpenAI-compatible endpoint and keep model choice independent of the editor vendor.
2. Reference implementation study: read the TypeScript monorepo to see one agent loop packaged consistently across CLI, VS Code and JetBrains surfaces.
3. Migration planning: enumerate the configuration surface of a 2.0.0 install and decide what a maintained successor must reproduce before you move off it.

## Strengths

- Provider neutrality: the agent was designed to run against whichever model backend a team already had access to.
 - Three surfaces from one codebase, so behaviour does not drift badly between the CLI and the editor plugins.
- Telemetry and authentication were both removed from the 2.0.0 open-source build, which removes two common procurement objections.
- Apache-2.0 licensed, so the frozen code remains usable as a starting point for an internal fork.

## Limitations

The defining limitation is that the project is finished: the README states the repository is no longer actively maintained and is read-only, and the 2.0.0 release is the final one, so there are no upstream security patches, provider updates or bug fixes. The JetBrains plugin is explicitly deprioritised by the project's own note recommending the CLI instead, so IDE parity is already uneven. Configuration and customisation knowledge now lives on an external documentation site rather than in the repository, which means the in-repo self-service story a self-hosting team would want is thinner than it was. Anyone starting fresh should treat this as a codebase to read or fork, not a tool to deploy and depend on.

## Relation to the Arsenal

This sits in content/projects/dx-and-tooling as the sunset reference point for open-source coding agents, and reads most usefully next to the actively maintained terminal agents in the same phase such as Gemini CLI or Claude Code. It is also a useful comparison against the agent frameworks in content/projects/framework: Continue is a shipped end-user tool, while those are libraries you embed and own the loop for. If you are building an editor integration today, the packaging and telemetry-removal decisions are the parts worth extracting. For model serving and provider routing behind whatever agent you choose, the entries in content/projects/agent-systems and content/projects/serving-and-deployment are the ones that stay in the path.

## Resources

- [GitHub — continuedev/continue](https://github.com/continuedev/continue)
- [Documentation — docs.continue.dev](https://docs.continue.dev)
- [Continue CLI on npm — @continuedev/cli](https://www.npmjs.com/package/@continuedev/cli)
