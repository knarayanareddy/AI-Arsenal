---
id: deepseek-harness
name: "DeepSeek Harness"
version_tracked: null
artifact_type: platform
category: agents
subcategory: coding-agents
description: "DeepSeek's open agent harness (dsh): every component — model adapter, tool registry, agent loop — is a replaceable plugin on the Cordis framework"
github_url: "https://github.com/deepseek-ai/deepseek-harness"
license: "MIT"
primary_language: TypeScript
org_or_maintainer: "DeepSeek AI"
tags: [agents, tool-use, code-gen]
maturity: beta
cost_model: open-source
github_stars: 260425
github_stars_last_30d: 0
trending_score: 95
last_commit: "2026-10-23"
docs_url: "https://deepseek-harness.github.io/deepseek-harness/"
demo_url: null
paper_url: "https://arxiv.org/abs/2608.25512"
paper_id: null
phase: agent-system
domain: [general-purpose, language]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, actively-maintained, community-driven]
ecosystem_role:
  - "The first agent harness from a frontier-model lab that treats its own agent loop as an unprivileged plugin: model adapters, the tool registry, the session log and the loop itself are all mounted modules, so a team can replace the parts it disagrees with instead of forking the product."
best_for:
  - "You want to assemble an agent runtime from parts you control — swap the model adapter, replace the tool registry, or mount your own approval policy — rather than configure a fixed product"
  - "You need the same agent definition to run as a local web UI, a headless one-shot job, an SDK-driven service, or an ACP endpoint for an editor, without maintaining four forks"
  - "You are building a DeepSeek-model workflow and want the vendor's own harness, including its sandbox and approval defaults, rather than wiring the API yourself"
avoid_if:
  - "You need a stable plugin API to build a product on: the project is in developer preview and its README states plainly that compatibility-breaking changes will happen"
  - "You want a finished coding assistant for a team today — the web UI is young, the ecosystem of third-party plugins is small, and the documentation is still catching up with the architecture"
  - "Your security review requires an audited permission model out of the box; sandbox and approval behaviour is plugin configuration, so the defaults are the starting point rather than a guarantee"
upstream_dependencies: []
downstream_consumers: []
alternatives: [claude-code, openai-codex-cli, gemini-cli, opencode]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (260,425), forks (31,458), licence (MIT), primary language (TypeScript), contributors (48) and last push (2026-10-23) verified via the GitHub API on 2026-10-24 for a repository created 2026-08-13. Behavioural claims come from the README and docs/architecture.md; nothing here was run hands-on, and the developer-preview warning means the plugin surface should be expected to move."
added_date: "2026-10-24"
last_reviewed: "2026-10-24"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/deepseek-ai/deepseek-harness", "date": "2026-10-24", "description": "260,425 stars and 31,458 forks within ten weeks of the 2026-08-13 repository creation (GitHub API)"}]
featured: false
status: active
---

## Overview

DeepSeek Harness (`dsh`) is an open-source agent harness from DeepSeek AI, written in TypeScript under MIT. Its organising idea is that nothing in the product is privileged: the model adapter, the tool registry, the session log and the agent loop itself are Cordis plugins that contribute services and typed events to a shared context, and each can be replaced from configuration. A running `dsh` is a plugin tree composed at boot from ordered layers, so "customising the agent" and "patching the boot configuration" are the same operation.

## Why it's in the Arsenal

Most coding agents here ask you to accept their loop, their tool set and their permission model, and to extend them at the edges. `dsh` is the entry that makes the loop itself addressable: a team that needs a different tool-routing policy, a different session log or a non-DeepSeek model adapter can mount a replacement rather than fork. That matters for the specific decision of whether to adopt an agent runtime you can audit and modify, or a product you can only configure — and it is the first harness from a frontier lab that takes the modular position explicitly.

## Architecture

Cordis supplies the plugin substrate: plugins register services, listen to typed events, and produce reversible effects that unwind when the plugin unloads. On top of it, `dsh` composes a *profile* — `web`, `headless`, `sdk`, `sdk-minimal` or `acp` — from ordered *bundles*, then applies the profile's `cordis.patch.yml`, a home-level patch and any `--patch` overlay. `dsh-base` carries the shared layer for the web, headless, SDK and ACP profiles: model adapters, tools, persistence, sandbox and approval policy, settings, credentials and telemetry. Because a patch addresses a configuration row by id and replaces its whole config, the boot tree printed by `dsh --profile web --dump-config` is the actual inventory of what you are running.

## Ecosystem Position

Upstream, it is built on Cordis, the plugin framework described in the accompanying paper on spatiotemporal composability. Downstream, it defines a plugin distribution format — repositories opt in with the `dsh-plugin` topic — and ships a TypeScript and a Python SDK plus an ACP server for editor clients. It competes with the vendor harnesses around it: `claude-code`, `openai-codex-cli` and `gemini-cli` each pair a lab's model with a fixed agent product, while `opencode` is the closest architectural relative among open tools, with a client/server split but a monolith rather than a plugin tree. `dsh` is complementary to a serving stack rather than a replacement for one: the model still arrives through a provider or a local runtime adapter.

## Getting Started

```bash
# Run the prebuilt web UI (Node.js required); serves http://127.0.0.1:3080
npx @deepseek-ai/dsh web --no-open
```

```bash
# From a checkout, when you intend to modify or mount plugins
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness && pnpm install && pnpm run build
pnpm dsh web
```

Read `SAFETY.md` before the first run: the base bundle installs a sandbox and an approval policy, and the harness can execute commands on your machine.

## Key Use Cases

1. **A team-specific agent runtime**: mount your own tool registry and approval policy over `dsh-base`, keep the shipped model adapters, and ship the profile to laptops as one command instead of maintaining a fork of a coding agent.
2. **One agent definition, four execution surfaces**: the same profile can be driven as a browser UI for interactive work, as `headless` for a CI job, through the SDK's JSON-RPC server for an application, or as an ACP endpoint inside an editor.
3. **Evaluating plugin architectures against monoliths**: if you are deciding how to structure an internal agent platform, `dsh` is a working example of the trade-off — replaceable parts, at the cost of an indirection layer between you and the loop.

## Strengths

- The plugin boundary is real rather than nominal: the agent loop, session log and tool registry are mounted modules, so replacement is configuration rather than a patch to a core file.
- Profiles let one repository serve interactive, headless, SDK and editor use cases from shared bundles, which removes the usual drift between a demo build and a production build.
- Layered patches (`--patch`, home patch, profile patch) give a reviewable customisation trail: you can see the exact rows a deployment changed with `--dump-config`.
- Vendor backing shows in the operational surface: a published architecture document, a Cordis primer and tutorial, TypeScript and Python SDKs, an ACP server and a desktop application in the same tree.

## Limitations

- Developer preview, stated in the README as a warning: compatibility-breaking changes are expected, so anything built on the plugin API should be pinned to a commit rather than a version range.
- The Cordis model is the barrier to entry. Understanding profiles, bundles, patch precedence and effect unwinding is prerequisite knowledge, and the ecosystem of people who have it is small.
- Extensibility is not the same as fitness: the shipped tools and permission defaults are tuned for general software work, and a constrained tool budget still has to be configured deliberately.
- Community and third-party plugins are early — the `dsh-plugin` topic is the discovery mechanism, not a registry with review or versioning — so supply-chain review is on you.
- The repository is ten weeks old at the time of writing, with no long-running release history to judge stability against.

## Relation to the Arsenal

The harness layer above the model entries: pair it with a DeepSeek-family model from the foundation-model section or any provider you mount an adapter for, and compare it against `opencode` and `goose` when the question is which open agent runtime to standardise on. The serving side stays where it is — `dsh` is a client of a model endpoint, not an inference stack.

## Resources

- [GitHub repository](https://github.com/deepseek-ai/deepseek-harness)
- [Documentation](https://deepseek-harness.github.io/deepseek-harness/)
- [Architecture guide](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md)
- [Safety notice](https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.md)
- [Cordis framework](https://github.com/cordiverse/cordis)
- [Paper: A Programming Paradigm for Spatiotemporal Composability](https://arxiv.org/abs/2608.25512)
