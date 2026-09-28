---
id: openosint
name: OpenOSINT
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Python OSINT agent wrapping 20 real investigation tools behind a REPL, CLI, MCP server and web UI, with a statement-layer entity graph"
github_url: "https://github.com/OpenOSINT/OpenOSINT"
license: MIT
primary_language: Python
tags: [security, tool-use, data]
maturity: beta
cost_model: open-source
github_stars: 1662
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-26"
docs_url: "https://openosint.tech"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Makes hallucinated findings structurally impossible by having the model emit tool calls while your code executes the actual binary."
best_for:
  - "You are a security researcher with an authorised investigation and you want a natural-language front end over existing OSINT binaries rather than learning each tool's flags."
  - "You want to use these lookups from Claude or Cursor directly, because the tool set is published as an MCP server so any MCP client can call it without the REPL."
  - "You need to see where a finding came from, because every entity statement records its dataset, extractor, run id and confidence in a graph you can audit."
avoid_if:
  - "You do not have explicit authorisation for the target, because the project states it is for authorized security research only and the tools include username and email enumeration."
  - "You need the tool catalogue to be the largest available, because twenty tools is a curated set, not a wrapper around every OSINT project."
  - "You cannot supply a model key or run Ollama locally, because the natural-language layer needs one even though the underlying tools work standalone from the CLI."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license (MIT), last commit, primary language, topics and issue count came from the GitHub API. Tool count, install commands, REPL/CLI/web surfaces, MCP registry entry and the statement-layer graph description are read from the official README; no investigation was run during authoring."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

OpenOSINT exposes twenty investigation tools (including wrappers around Sherlock for username search, holehe for email enumeration, maigret and whois/DNS-style lookups) behind four surfaces: an interactive Python REPL, a direct CLI, an MCP server, and a browser web UI. Its correctness argument is structural rather than prompt-level: the model can only issue hard-stop tool calls, and a real subprocess produces each result, so an invented finding is not reachable. Beyond single lookups it maintains a statement-layer entity graph where two datasets observing the same organisation are linked by a same_as candidate edge with a score, and a human review card compares the two records field by field before the reviewer accepts the merge. It is MIT, published to the MCP registry, with a paid Apify-hosted variant for teams who do not want to install anything.

## Why it's in the Arsenal

In OSINT the dangerous failure is a confident invention, and LLMs make it easy to produce one that looks exactly like a real finding. OpenOSINT's answer is architectural: the model never writes the answer, it chooses a tool, and the tool's real output becomes the answer. That is why the tool list is deliberately curated and wrapped at the subprocess level rather than reimplemented. The cost is that the tool surface is fixed, and enrichment quality depends entirely on the underlying binaries and on network access to their targets.

## Architecture

Each tool is a thin Python wrapper around an installed binary or library; invoking it shells out and captures stdout, so the model never fabricates tool output. A statement layer records what each extractor asserted (dataset, extractor, run id, confidence) rather than a single merged record, which is what allows two independent observations of the same entity to be compared. The graph UI renders those statements as nodes with candidate same_as edges scored by a feature match; accepting an edge clusters the pair and converts the dashed candidate into a solid verified link. Four front ends (REPL, CLI, MCP server, web UI) all sit on that same tool layer.

## Ecosystem Position

It is a natural-language and agentic layer over the existing OSINT toolchain rather than a replacement for it: Sherlock, holehe, maigret and whois still do the work, so it competes with the plain CLIs only on usability, not on coverage. Compared with SpiderFoot and theHarvester, which are Python tools with their own collectors, OpenOSINT adds an LLM interface plus the statement-level provenance graph, which is the distinguishing feature. It complements content/projects/agent-systems entries by being an MCP server any agent can call, and its graph and provenance model overlaps with the data-and-retrieval phase, where entity resolution is otherwise handled by dedicated tooling.

## Getting Started

pip install, then pick a surface. The REPL is the default and the CLI bypasses the model entirely:

```bash
pip install openosint
# interactive AI REPL
openosint
# web interface
openosint web
# direct tool, no AI involved
openosint email target@example.com
```

Bring an Anthropic, OpenRouter or Ollama key. A live demo exists if you would rather not install first.

## Key Use Cases

1. Authorised account enumeration: investigate whether a username exists across platforms or an email appears in breaches, through natural language instead of tool-specific flags.
2. Provenance-first entity research: build an entity graph from two independent datasets and review the candidate merge field by field before treating it as fact.
3. Agent-driven reconnaissance: register the MCP server with Claude or Cursor and call the tool set from inside an existing investigation workflow.

## Strengths

- Hard-stop tool calls with real subprocess execution make hallucinated findings structurally impossible rather than merely discouraged.
- Statement-layer provenance records dataset, extractor, run id and confidence per assertion, which is rare in this category.
- Four surfaces over one tool layer, including an MCP server so no OpenOSINT-specific client is required.
- MIT licensed with a published MCP registry entry and a no-install hosted option for evaluation.

## Limitations

This is for authorised research only, and the tool set includes username and email enumeration, so misuse is a legal rather than a technical problem; the constraint is on the operator. Coverage is a curated twenty tools, which will be narrower than a full collection pipeline. Usability gains depend on the wrapper binaries being installed and on network reachability of their targets, and many OSINT sites rate-limit aggressively, so results degrade under repeated querying. Attribution claims from third-party datasets inherit whatever those datasets are worth, and the provenance graph tells you where a fact came from without telling you whether it is true. The hosted Apify variant is priced per run, which changes the cost model for teams that would otherwise self-host for free.

## Relation to the Arsenal

This is the security-research agent in content/projects/agent-systems, and the only entry with an explicit dual-use framing and an authorised-use requirement. Its MCP packaging puts it alongside browser-harness and open-codex-computer-use as capability servers other agents call, and its entity-resolution provenance model has more in common with the data-and-retrieval phase than with the other agent-system entries. The underlying tools are the same ones a practitioner would run by hand; what this adds is a model interface and an audit trail, not new collection capability.

## Resources

- [GitHub — OpenOSINT/OpenOSINT](https://github.com/OpenOSINT/OpenOSINT)
- [Project site — openosint.tech](https://openosint.tech)
- [MCP registry entry](https://registry.modelcontextprotocol.io/servers/io.github.OpenOSINT/openosint)
