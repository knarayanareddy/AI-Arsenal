---
id: headroom
name: headroom
type: tool
job: [prototyping]
description: "Local compression layer for agent context that shrinks tool output, logs, files and RAG chunks before they hit the model"
url: "https://docs.headroomlabs.ai/docs"
cost_model: open-source
pricing_detail: "Free and self-hostable; no paid tier required"
tags: [efficiency, memory, agents, routing]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "Free while in beta; no hosted seat cap."
self_hostable: true
open_source: true
docs_url: "https://docs.headroomlabs.ai/docs"
github_url: "https://github.com/headroomlabs-ai/headroom"
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
verdict: recommended
verdict_rationale: "Shrinks the largest, most redundant slice of an agent's input tokens at a single chokepoint, locally and reversibly."
status: active
phase: dx-and-tooling
audience: [prototype]
best_when:
  - "You run Claude Code, Cursor, Codex or Cline and your input token bill is dominated by tool output rather than by your prompt."
  - "You are piping long log dumps, JSON responses or file reads into an agent and you need the significant lines to survive while the noise does not."
  - "You want to cut context cost across several agents at once with one shared store and no changes to your own application code."
avoid_when:
  - "You cannot host a proxy or sidecar in the request path, since every supported mode either wraps a tool, runs a local listener or imports the library into your code."
  - "You need provably lossless transformation of every byte, because compression is a lossy judgement call and only some patterns are explicitly protected."
  - "You are handling regulated data under a strict third-party processing constraint, since the compression model is a separate dependency you must review even though the run itself is local."
---

## Overview

Headroom sits between an agent and its context window and compresses the material the agent reads: tool outputs, log dumps, file contents, retrieved RAG chunks and prior conversation turns. It ships four integration shapes so the same engine can be used from a Python or TypeScript library, a local HTTP proxy, a one-command wrapper around a coding agent, and an MCP server exposing compress, retrieve and stats tools. The project reports concrete measurements in its README: a 55,957-token agent prompt compressed to 24,340 tokens sent to the model with a specific FATAL log line preserved byte for byte, and a 10,144-token log dump reduced to 1,260 tokens while keeping the same FATAL line. It is published as the headroom-ai package on both PyPI and npm, and a kompress-v2-base model is published on Hugging Face. Compression is described as running locally, with no prompt or file content leaving the machine, and the original payloads are cached locally for on-demand retrieval, which the README calls reversible CCR.

## Why It's in the Arsenal

The economics of long-running agents are dominated by one thing nobody plans for: tool output. A single ls, git diff or pytest invocation can emit thousands of tokens of formatting, passing-test names and repeated structure, and it arrives again on every subsequent turn of the trajectory. Prompt engineering does not touch it, and a larger context window only moves the problem. Headroom's bet is that this content is highly redundant and can be reduced at a single chokepoint before the provider prices it, with a shared cache so the same output is compressed once across many turns and many agents. The recurring decision it removes is whether to spend engineering time hand-trimming tool output at each call site, or install one layer that handles it uniformly.

## Key Features

- Four integration shapes, so it fits as a library call, a transparent proxy, an agent wrapper or an MCP server without rewriting the client.
- Reversible by design: originals are cached locally and retrievable, which makes lossy compression safe in debugging workflows.
- Runs locally, so compressing prompts and files does not require trusting a hosted service with their contents.
- The README's measurements are specific and falsifiable, quoting exact token counts and which log line survived.

## Architecture / How It Works

The pipeline intercepts outbound context, classifies each payload, and rewrites it according to type before it reaches the provider. The library form exposes a compress(messages) call that takes a message array and returns a smaller one; the proxy form listens locally and rewrites traffic without application changes; the wrap form launches a coding agent with a shim in front of it; and the MCP form registers headroom_compress, headroom_retrieve and headroom_stats for any MCP client. Because compression is lossy, originals are written to a local cache and can be fetched on demand, which is what makes a summarising or structural rewrite safe to use in a debugging workflow. Beyond input, the project also trims what the model writes back, and a headroom learn subcommand mines failed sessions and writes corrections into a project instruction file such as CLAUDE.local.md, CLAUDE.md, AGENTS.md, GEMINI.md or GROK.md. A cross-agent memory store is shared between Claude, Codex, Gemini and Grok with automatic deduplication.

## Getting Started

Install the Python or Node package and either call the library directly or start the local proxy, then wrap a coding agent so compression applies without editing its configuration.

```bash
pip install headroom-ai
```

```bash
# zero-code path: start the proxy and point a client at port 8787
headroom proxy --port 8787

# or wrap an existing agent
headroom wrap claude
```

From Python, compression is a single call over the message array:

```python
from headroom import compress

small = compress(messages)
```

The MCP server exposes the same capability to any MCP client, and `headroom learn` writes mined corrections into your project's instruction file so failures stop repeating.

## Use Cases

1. Agent context economics: cut input tokens on long trajectories where tool output dominates, without editing each tool call site.
2. Log triage: push multi-megabyte error logs through the proxy and let the significant line survive while noise is dropped.
3. Cross-agent continuity: keep one deduplicated memory store shared by Claude, Codex, Gemini and Grok so context survives switching tools.

## Strengths

It occupies the same territory as general LLM gateways such as LiteLLM, Portkey and Helicone, but it is not a gateway: those route and observe, while Headroom rewrites content. Its closest neighbour in function is rtk, which compresses shell command output at the CLI layer in a single Rust binary, and the two overlap substantially for coding agents, with Headroom being broader in scope across logs, files and RAG chunks and rtk being faster and narrower. It is an alternative to hand-written truncation in application code, and it complements rather than replaces the retrieval stack in content/projects/data-and-retrieval: compressing a retrieved chunk reduces its token cost but does nothing for whether it was the right chunk. The counterpoint in the ecosystem is provider-side prompt caching, which is cheaper to enable but only pays off for repeated identical prefixes, whereas compression helps on first contact with new content.

## Limitations / When NOT to Use

Compression is a lossy judgement, and the survival of one cited FATAL line is a demonstration rather than a guarantee across payload types: an unusual structure or a signal the heuristics miss can be dropped. Adding a proxy or wrapper to the request path introduces a component you now own operationally, including its cache directory and its local credentials. The kompress model on Hugging Face is a separate supply chain to review even if inference never leaves the machine. Token reduction is not cost reduction, since output tokens, cached prefixes and provider pricing vary independently, and the README is careful to separate the two. The project is young, created in January 2026, and its headline numbers come from its own documentation rather than independent evaluation.

## Integration Patterns

This is a dx-and-tooling entry that attacks input-token cost at the context layer, and its nearest neighbour in this catalogue is rtk, which does a narrower version of the same job at the shell layer. It sits downstream of the retrieval entries in content/projects/data-and-retrieval, since a compressed RAG chunk still has to be retrieved correctly first. The observability tools in content/tools/evaluation-and-observability are the natural companion, since a token-saving layer is only trustworthy if you can observe what it dropped. Nothing here changes what a model is capable of, so it complements rather than competes with the serving entries in content/projects/inference-engines.

## Resources

- [Repository and quickstart](https://github.com/headroomlabs-ai/headroom)
- [Documentation](https://docs.headroomlabs.ai/docs)
- [PyPI package headroom-ai](https://pypi.org/project/headroom-ai/)

## Buzz & Reception

Shrinks the largest, most redundant slice of an agent's input tokens at a single chokepoint, locally and reversibly.

