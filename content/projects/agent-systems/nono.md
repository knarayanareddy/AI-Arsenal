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
org_or_maintainer: nolabs-ai
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
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: nono
name: nono
artifact_type: platform
category: tooling
subcategory: platforms
description: "Rust sandbox from the Sigstore team that confines coding agents with least-privilege policy and no daemon or container"
github_url: "https://github.com/nolabs-ai/nono"
license: Apache-2.0
primary_language: Rust
tags: [security, agents]
maturity: beta
cost_model: open-source
github_stars: 4262
last_commit: "2026-09-28"
docs_url: "https://nono.sh"
phase: agent-system
domain:
  - language
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - fork-and-adapt
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A process and syscall sandbox candidate for constraining agent-created commands, files, network connections, and descendants.
best_for: ["You run Claude Code, Codex, Pi, Copilot, Hermes or OpenCode on a workstation and want the agent's shell confined without paying a container image build.", "You need per-command policies plus scoped credential handling for an agent that will run against a real repository with real secrets.", "You want to publish a hardened agent profile to your team through the nono registry instead of maintaining a bespoke sandbox image."]
avoid_if: ["You need a pre-1.0 stable API surface, because the README notes the project is stabilising APIs ahead of 1.0 and changes may still occur.", "Your automation already runs agents inside hardened containers and you would rather not maintain two isolation layers.", "You are still referencing packs under the always-further namespace, because the official registry namespace has moved to nolabs-ai and the old one will be retired."]
enrichment_notes: Official repository, Apache-2.0 license, Rust implementation, and 2026-07-10 activity were reviewed on 2026-07-11. Isolation guarantees remain draft pending hands-on threat-model testing.
---

## Overview

nono is a Rust agent sandbox from the team behind Sigstore, the attestation standard used by PyPI, npm, Homebrew and Maven Central. It enforces a least-privilege sandbox around an agent's shell with no daemon, no container, no VM and no disk footprint, on macOS, Linux and Windows under WSL2. The model is fork the config, adjust it, then share it through the nono registry as a pack, which is how team-wide policies propagate. Agents named in the README include Claude Code, Codex, Pi, CoPilot, Hermes, OpenCode and OpenClaw, and the cited production users are Datadog and Okta engineers.

## Why it's in the Arsenal

The decision it removes is whether letting a coding agent run shell commands on your machine is acceptable. Every local coding agent has the credentials of the user running it, and a prompt-injected command can read a cloud config file or an SSH key. nono makes confinement a launch-time property rather than a code-review promise, with per-command policy so the agent can read the repo and nothing else, without the cold-start tax of a container.

## Architecture

The sandbox intercepts process execution and enforces a declarative allowlist keyed on the command, so a shell command that does not match policy fails before it runs rather than being caught afterwards. Credential handling is scoped: an agent can be given specific secrets without inheriting the ambient environment of the user. Because enforcement is done through the OS layer with no supervising daemon, startup is measured in seconds and there is no image to build or disk state to clean up. Packs distribute policy plus theming through the nono registry.

## Ecosystem Position

It competes with container and microVM agent sandboxes such as E2B and Docker-based agent runners, and the pitch is explicitly anti-container: zero latency to start and zero disk usage, where a sandboxed-execution service bills per session. It overlaps with content/projects/agent-systems entries whose threat model is agent code execution, and it complements the MCP and tool-serving entries in content/tools/serving-and-deployment by constraining what a served tool can reach. Compared with a CI-only containment story, nono is the local workstation layer, not a hosted service.

## Getting Started

The install is a single script, or a Homebrew formula:

```bash
curl -fsSL https://nono.sh/install.sh | sh
```

Or `brew install nono`. Migrating off the retired namespace is `nono remove always-further/claude` followed by `nono pull nolabs-ai/claude`.

## Key Use Cases

1. Untrusted repo triage: point a coding agent at a repository you just cloned and let it read code without exposing your shell credentials.
2. Team policy distribution: publish a hardened pack to the registry so every engineer launches the agent under the same allowlist.
3. CI-adjacent agent review: run an agent that proposes patches under a policy that permits edits in the worktree but blocks network egress and secret reads.

## Strengths

- Starts in seconds with no daemon, container, VM or disk footprint, so it does not slow down the interactive loop.
- Per-command policy is granular enough to permit repo reads while denying credential paths, which a blunt container boundary cannot express.
- Built by the Sigstore maintainers, so the team's day job is software supply-chain attestation rather than agent tooling.
- Apache-2.0 with packs shareable through a registry rather than only as local config files.

## Limitations

APIs are still moving ahead of 1.0, and the README is explicit that changes may still occur, which is a real cost for a security control you intend to pin in CI. The registry namespace has already migrated once from always-further to nolabs-ai, so scripts and CI references need auditing and the old namespace will be retired. Being a local confinement layer, it does not by itself bound model spend, and its enforcement is local to the OS it supports, so Windows coverage is limited to WSL2. The credential-management story is the part that most needs your own review before you trust it with production keys.

## Relation to the Arsenal

This belongs in content/projects/agent-systems as the security boundary every other agent entry in this catalog implicitly assumes. Read it alongside the coding agents in content/tools/dx-and-tooling such as cline, openai-codex-cli and goose, and alongside hermes-agent if you run an always-on agent with shell access. It complements the MCP and tool-serving entries in content/tools/serving-and-deployment by constraining what a served tool can reach.

## Resources

- [GitHub — nolabs-ai/nono](https://github.com/nolabs-ai/nono)
- [Site — nono.sh](https://nono.sh)
- [Registry packs and profiles](https://nono.sh)
