---
id: e2b
name: "E2B"
type: tool
job: [orchestration]
description: "Firecracker-microVM sandboxes for running model-generated code, plus code-interpreter and desktop-control SDKs for agents"
url: "https://e2b.dev"
cost_model: usage-based
pricing_detail: "Free hobby tier with usage credits; usage-based pro plans; open-source infra self-hostable"
tags: [agents, llm]
maturity: production
stack: [typescript, python, go]
free_tier: true
free_tier_limits: "Hobby tier includes monthly sandbox-hours credit"
self_hostable: true
open_source: true
source_url: "https://github.com/e2b-dev/E2B"
docs_url: "https://docs.e2b.dev"
github_url: "https://github.com/e2b-dev/E2B"
alternatives: [cubesandbox, modal]
integrates_with: [langchain, langgraph]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [production, prototype]
best_when: ["You are building an agent that runs model-written code and you need each run isolated in a disposable environment that a stray rm or fork bomb cannot escape.", "You are shipping a code-execution feature and you need a supported SDK in both TypeScript and Python with the same sandbox lifecycle underneath.", "You want an agent to drive a real desktop or browser for a visual task, because the Desktop SDK exposes launch, screenshot and mouse-keyboard streaming."]
avoid_when: ["You need a zero-setup local sandbox, because the quickstart requires signing up for E2B and setting an E2B_API_KEY before the first sandbox starts.", "Your workload is latency-critical per-token, because every command crosses the network into a remote microVM rather than running beside your process.", "You have a hard requirement that code never leave your own infrastructure, because the hosted product is the documented path even though the client libraries are open source."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (12,897), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The category leader for agent code-execution sandboxes; microVM isolation is the right default for untrusted code"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/e2b-dev/E2B", "date": "2026-07-08", "description": "12,897 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

E2B provides secure, isolated sandboxes in the cloud for running AI-generated code, described in the README as open-source infrastructure controlled through a JavaScript SDK and a Python SDK. The core surface is a Sandbox object whose commands.run method executes shell commands and returns stdout and stderr. Two additional SDKs build on that: a Code Interpreter package with runCode / run_code for direct code execution that returns a text result, and a Desktop package that launches applications such as google-chrome, takes screenshots and exposes mouse, keyboard, application and desktop streaming APIs. The self-described purpose is real-world tools for enterprise-grade agents, with Python and JavaScript SDKs published to PyPI and npm.

## Why It's in the Arsenal

The decision this removes is how much trust an agent's generated code deserves. A model that writes a script, a build step, or an exploit attempt will eventually write one, and running it on the host or inside a container that shares the host kernel are both weak answers. E2B's answer is a microVM boundary per sandbox, with a short-lived lifecycle designed to be created, used and destroyed inside an agent loop. The commercial framing matters too: because sandboxes are metered, the cost of letting an agent experiment is a line item you can cap rather than a class of incident.

## Key Features

- MicroVM-level isolation rather than shared-kernel containers, which is the right boundary for code a language model wrote five seconds ago.
- One lifecycle abstraction in both Python and TypeScript, so a polyglot team does not maintain two different sandboxing models.
- Composable packages: the base command runner, the code interpreter and the desktop controller are separate installs, so you only pay for the surface you use.
- Metered per-sandbox runtime, which maps directly onto a budget line for agent experimentation.

## Architecture / How It Works

The client libraries are thin: a Sandbox instance, a commands namespace that executes processes and streams output, and higher-level packages for code interpretation and desktop interaction. Control and data both travel over the network to a remote execution layer, so the sandbox is genuinely off-host and its lifecycle is managed by the platform rather than by a local runtime. The README shows the same shape in both languages, creating a sandbox, running a command, and reading result.stdout, which is the abstraction your agent code should target. MicroVM isolation is what makes the security claim meaningful compared with a plain container, and the destroy-on-end lifecycle is what keeps per-execution overhead bounded when you run thousands of agent steps.

## Getting Started

Install the SDK for your language, export an API key from the E2B dashboard, then create a sandbox and run a command:

```bash
pip install e2b
export E2B_API_KEY=e2b_***
```

```python
from e2b import Sandbox

with Sandbox.create() as sandbox:
    result = sandbox.commands.run('echo "Hello from E2B!"')
    print(result.stdout)
```

The TypeScript SDK is the same shape with `npm i e2b` and `await Sandbox.create()`. Add `@e2b/code-interpreter` for runCode and `@e2b/desktop` for screenshot and input control.

## Use Cases

1. Agent code execution: let a model write and run Python, JavaScript or shell inside a disposable sandbox and feed the output back into the reasoning loop.
2. Data and file analysis: hand a generated script a CSV or PDF inside the sandbox and retrieve the computed result without exposing a production filesystem.
3. Visual computer use: launch a browser or application in the Desktop sandbox, screenshot the screen and drive mouse and keyboard input to complete a task that needs a GUI.

## Strengths

E2B competes with the in-process execution tools that agent frameworks reach for, and it is a hosted-service alternative to the local container or microVM runtimes you would otherwise wire up yourself. It overlaps with Agent-Sea and Modal in the general shape of remote code execution for agents, and with the browser-driving entries in content/projects/agent-systems at the point where an agent needs to see a rendered page, though E2B's Desktop SDK is about a whole machine rather than a DOM. Compared with Docker on your own host, E2B trades control for isolation: you get a real VM boundary you do not have to patch, and you give up locality and predictable flat cost. It complements the coding agents in content/projects/dx-and-tooling, several of which assume a sandbox service is wired in behind them.

## Limitations / When NOT to Use

The quickstart requires an E2B account and API key, so the open-source client libraries alone are not a self-hosted story: the README documents signing up to the service to get a key before the first sandbox runs. Every command is a network round trip into a remote microVM, which adds latency to each agent step and makes the tool a poor fit for tight interactive loops. Being metered means a runaway agent loop is a cost incident, so you need concurrency and budget caps in your own code. The client libraries being Apache-2.0 does not make the sandboxing fabric open source, so the security boundary is a vendor claim that must be assessed rather than audited by you.

## Integration Patterns

This belongs in content/projects/orchestration as the execution substrate that agent loops in content/projects/agent-systems assume exists, and it pairs with the coding agents in content/projects/dx-and-tooling that would otherwise shell out unsafely. Read it beside the browser-automation entries in content/projects/agent-systems when the question is whether an agent needs a DOM or a whole desktop, and against the sandbox entries in content/projects/serving-and-deployment for the isolation-versus-locality trade-off. Whatever inference stack sits behind your agent, the entries in content/projects/inference-engines are unchanged by this choice; E2B governs the code side of the loop only.

## Resources

- [GitHub — e2b-dev/E2B](https://github.com/e2b-dev/E2B)
- [Documentation — docs.e2b.dev](https://docs.e2b.dev)
- [Code Interpreter SDK reference](https://e2b.dev/docs/code-interpreting)

## Buzz & Reception

Lets an agent execute generated code in a real OS sandbox instead of your host, and meters the cost per sandbox runtime.
