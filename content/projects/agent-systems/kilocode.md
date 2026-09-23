---
id: kilocode
name: "Kilo Code"
version_tracked: null
artifact_type: tool
category: code-generation
subcategory: coding-agents
description: "IDE-based agentic coding platform shipped as a VS Code and JetBrains extension with a model-agnostic gateway"
github_url: "https://github.com/Kilo-Org/kilocode"
license: "MIT"
primary_language: TypeScript
org_or_maintainer: "Kilo"
tags: [code-gen, agents, tool-use, routing]
maturity: beta
cost_model: freemium
github_stars: 27155
github_stars_last_30d: 0
trending_score: 71
last_commit: "2026-09-03"
docs_url: "https://github.com/Kilo-Org/kilocode#readme"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [language, reasoning]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [actively-maintained, community-driven]
ecosystem_role:
  - "The open extension-host alternative in the IDE coding-agent lane: an agent that runs inside VS Code and JetBrains with an optional gateway that bills model calls at provider rates rather than a markup."
best_for:
  - "Your team works in VS Code or JetBrains and wants agent-driven edits, terminal commands, and review inline, with the model chosen per task instead of fixed by vendor"
  - "You want predictable model spend and prefer a gateway that passes provider rates through without a markup over paying a per-seat agent subscription"
avoid_if:
  - "You need the agent to run unattended or in CI — an extension host is bound to an interactive editor session, not a headless pipeline"
  - "Your security policy forbids an editor extension holding repository-wide file access plus shell execution in the developer's own environment"
upstream_dependencies: []
downstream_consumers: []
alternatives: [cline, aider, opencode]
integrates_with: [mcp-servers]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Stars (27,155), forks (3,112), licence (MIT), primary language (TypeScript), and last commit (2026-09-03) verified via the GitHub API on 2026-09-03. Repository topics name vscode, jetbrains, and cli surfaces. Architecture and pricing claims derive from the README and repository description, not hands-on verification."
added_date: "2026-09-03"
last_reviewed: "2026-09-03"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/Kilo-Org/kilocode", "date": "2026-09-03", "description": "27,155 stars on GitHub as of 2026-09-03 (GitHub API)"}]
featured: false
status: active
---

## Overview

Kilo Code is an agentic coding platform distributed as an editor extension for VS Code and JetBrains IDEs, written in TypeScript under the MIT licence. Its distinguishing choice is to treat the model as a swappable dependency rather than a fixed vendor: the agent loop is model-agnostic, and the project ships an optional gateway that routes calls to upstream providers at their published rates. That combination — open extension source, no markup on token pricing — is aimed squarely at teams that want agent capability inside their existing editor without accepting either a proprietary client or a per-seat licence. It reached roughly 27,200 stars by 2026-09-03.

## Why it's in the Arsenal

The IDE coding-agent lane in this catalogue is dominated by proprietary clients whose source is not reviewable. Kilo Code is the counter-example worth having on record: you can read the tool-call loop, the diff application path, and the permission prompts before granting it repository access. It also makes the pricing structure part of the architecture rather than a sales detail, which changes how a team evaluates it — the gateway is a routing decision with a cost consequence, not an upsell. That makes it a useful reference when the actual question is "can we run an open agent inside the editors we already use?"

## Architecture

The extension registers inside the editor's extension host and drives an agent loop that plans a task, emits tool calls, and renders the result back into the editor UI. Tools cover file reads and writes applied as reviewable diffs, terminal command execution, and codebase search, each gated by a user-facing approval prompt before execution. Model requests go either directly to a provider key or through the project's gateway, which normalises providers and passes usage through at upstream rates. Additional capabilities attach through Model Context Protocol servers, so the tool surface can be extended without patching the extension. Session state and approvals are held client-side within the editor session.

## Ecosystem Position

Its closest relative is [Cline](../../tools/dx-and-tooling/cline.md), which shares the VS Code extension shape and BYOK model; Kilo differentiates on multi-IDE support and on a gateway that explicitly avoids a token markup. Against [Aider](../../tools/dx-and-tooling/aider.md) and [opencode](../agent-systems/opencode.md) it trades terminal-first operation for inline editor affordances such as diff review in the gutter. It is not a headless automation tool, so it does not overlap [OpenHands](../frameworks/openhands.md), which runs tasks in a sandboxed runtime. Its MCP support makes it complementary to the [reference servers](../frameworks/mcp-servers.md) rather than a competitor to them.

## Getting Started

```bash
# Install from the VS Code marketplace, or from source:
git clone https://github.com/Kilo-Org/kilocode
cd kilocode
npm install && npm run build
```

Configure either a provider API key directly or the gateway credentials, then invoke the agent from the editor's command palette.

## Key Use Cases

1. **In-editor multi-file edits** — agent-proposed changes reviewed as diffs before they touch the working tree.
2. **Cost-controlled model switching** — routing a cheap model for boilerplate and a frontier model for hard reasoning within the same session.
3. **Policy-gated automation** — running terminal commands only after explicit approval, which suits teams with change-control requirements.

## Strengths

- The agent loop is open source, so the approval and diff paths can be audited before deployment rather than trusted on documentation.
- Multi-IDE coverage means one agent configuration can serve both VS Code and JetBrains users on a team.
- Pass-through pricing removes the token markup that per-seat agent subscriptions bundle in.

## Limitations

- Being an extension-host process ties it to an interactive editor session, so it is not usable as a CI step or an unattended worker.
- File and shell access run with the developer's own permissions, which makes the editor a privileged surface rather than a sandbox.
- The gateway is an optional hosted dependency; teams that route through it take on a third party in the model path even though the extension itself is MIT.

## Relation to the Arsenal

Catalogued as an agent-system because the extension is a deployable runtime rather than an importable library. For terminal-first equivalents, see [Agent Systems](./_index.md); for the tool-side entries in the same lane, see [tools/dx-and-tooling](../../tools/dx-and-tooling/_index.md).

## Resources

- [GitHub](https://github.com/Kilo-Org/kilocode)
- [README](https://github.com/Kilo-Org/kilocode#readme)

---
*GitHub API verification by @maintainer on 2026-09-03 — enrichment_status: draft. 27,155 stars, 3,112 forks, MIT, TypeScript, last commit 2026-09-03.*
