---
id: chainlit
name: Chainlit
type: tool
job: [prototyping]
description: "Python framework for building chat and agent front ends, with decorators for steps, tool calls and message handlers over a bundled React UI"
url: "https://chainlit.io"
cost_model: open-source
pricing_detail: Open-source with cloud options
tags: [llm, tool-use, streaming, battle-tested]
maturity: beta
stack: [python, typescript]
free_tier: true
free_tier_limits: See official pricing page; limits may change
self_hostable: true
open_source: true
source_url: "https://github.com/Chainlit/chainlit"
docs_url: "https://docs.chainlit.io"
github_url: "https://github.com/Chainlit/chainlit"
alternatives: [fastapi, gradio, mesop, streamlit]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype]
best_when: ["You have a working retrieval or agent backend in Python and you need a usable interface in front of it before you invest in product design.", "You are debugging a multi-step chain and you want each tool call, intermediate message and latency rendered as a distinct step rather than folded into one blob of text.", "You are handing a prototype to non-engineers for evaluation and you want step-level feedback elements, user confirmation prompts and a stop button without writing front-end code."]
avoid_when: ["You need a company-backed release cadence with a support contract, because the README states plainly that the original team stepped back on 1 May 2025 and that Chainlit SAS provides no warranties on future updates.", "You are building a chat interface with pixel-level design requirements, because the built-in UI is a framework convention you style around rather than a component library you compose.", "You need a mobile-native front end, because this is a web UI served by a Python process and there is no native client surface in the project."]
version_tracked: null
verdict: recommended
verdict_rationale: Useful option for prototyping workflows when it matches your stack and cost constraints
status: active
enrichment_status: draft
---

## Overview

Chainlit is an Apache-2.0 Python framework whose pitch is building production-ready conversational AI in minutes rather than weeks. The programming model is decorator-based: `@cl.on_message` registers the handler invoked on every user message, `@cl.step(type="tool")` wraps a function so its execution renders as a labelled step, and `cl.Message(content=...).send()` pushes an intermediate response before the final answer. The package ships a FastAPI backend and a bundled React front end, with a `chainlit hello` sanity check and `chainlit run demo.py -w` (the `-w` flag auto-opens the browser with watch mode) as the documented paths. The separate cookbook repository carries worked examples against OpenAI, Anthropic, LangChain, LlamaIndex, ChromaDB and Pinecone, which is the fastest way to see how the decorators compose with a real stack. Development installs come from GitHub and require Node and pnpm, because the front end is built from source.

## Why It's in the Arsenal

The decision it removes is how much front-end work stands between a working Python function and something a stakeholder can click. Every LLM backend ends up needing the same things: streaming, step visualisation, tool-call approval, source citation display, feedback capture and conversation persistence, and hand-rolling those in raw WebSockets is a week of work that Chainlit makes a decorator. The cost is a dependency on a project whose README now opens with a community-maintenance notice, so you are adopting a mature codebase with a thinner corporate safety net than its star count suggests.

## Key Features

- Decorator-level primitives for the parts demos usually get wrong: labelled steps, streaming intermediate messages, user confirmation and feedback capture.
- A cookbook repository with working examples against OpenAI, Anthropic, LangChain, LlamaIndex, ChromaDB and Pinecone, so integration cost is copy-and-adapt.
- Apache-2.0, and the front end is a separate workspace directory you can fork if the bundled UI is not enough.
- Works with no front-end code at all, which is the point: `chainlit run file.py` is the entire deployment story for a prototype.

## Architecture / How It Works

Your Python module is loaded by the Chainlit CLI, which starts a FastAPI application and a websocket channel to the bundled front end. Decorators register callbacks rather than wrapping a request handler, so `@cl.on_message` maps one user turn to one async function, and `@cl.step` pushes lifecycle events for the UI to render as a running, completed or failed step. Intermediate `cl.Message` objects are streamed independently of the final response, which is what makes tool output visible before the answer arrives. The front end is a React application served by the same process, with Playwright-based functional tests in the `cypress/` and `frontend/` trees, and the repository is a pnpm workspace split into `backend/`, `frontend/`, `libs/`, `docs/` and `scripts/`.

## Getting Started

Install, run the bundled hello app to confirm the UI works, then wrap your own handler:

```bash
pip install chainlit
chainlit hello
# write demo.py with @cl.on_message and @cl.step(type="tool")
chainlit run demo.py -w
```

The `-w` flag watches the file and reopens the app on change. Development installs use `pip install git+https://github.com/Chainlit/chainlit.git#subdirectory=backend/` and need Node and pnpm.

## Use Cases

1. Agent demo in an afternoon: point the framework at an existing tool-calling loop and get a chat UI with step traces, streaming and a stop button the same day.
2. Human-in-the-loop approval: render a confirmation step before an irreversible tool runs, so the operator approves rather than the model deciding.
3. Evaluation sessions: have a domain expert converse with a RAG backend and capture feedback on individual messages while watching which sources were retrieved.

## Strengths

Chainlit competes with Streamlit, Gradio and Dify for the same slot, and the distinction is in how much you can steer: Streamlit reruns a script on every interaction, Gradio is built around forms and components, and Chainlit owns a conversation model with streaming, steps and approvals, which is why the cookbook leans on LangChain and LlamaIndex rather than treating them as optional. It also overlaps with the visual builder tools in content/projects/frameworks such as Flowise and Langflow, but as a code-first surface rather than a drag-and-drop canvas. Compared with a plain FastAPI plus React build, it saves the websocket plumbing and the streaming edge cases and costs you a framework opinion. Where content/tools/dx-and-tooling holds the agent harnesses that produce the traces this UI renders, Chainlit is the surface above them.

## Limitations / When NOT to Use

The maintenance notice is the headline: the original team stepped back on 1 May 2025, the project is now run by a maintainer group under a formal Maintainer Agreement, and the company explicitly disclaims warranties on future updates. Security is now the maintainers' responsibility rather than a company's, which is worth weighing for anything internet-facing. The bundled React UI is a convention, not a component library, so heavy branding work means forking `frontend/`. Contributing to the front end requires Node and pnpm on top of Python, which is friction for a Python-only team. Conversation persistence and user management are deliberately not the product, so production auth and multi-tenancy are yours to build.

## Integration Patterns

This is the chat front-end tool in content/tools/dx-and-tooling, and it sits above everything in content/projects/frameworks rather than beside it: LangChain, LlamaIndex or a hand-written tool loop produces the behaviour, Chainlit renders it. Its cookbook integrations point at the retrieval stacks in content/projects/data-and-retrieval and the model endpoints in content/projects/inference-engines, so read those entries when you are choosing what sits behind the UI. The no-code builders in content/projects/frameworks (Flowise, Langflow, Dify) are the alternative if nobody on the team will write Python, and the coding agents in content/tools/dx-and-tooling are the alternative if the interface you need is a terminal rather than a browser.

## Resources

- [GitHub — Chainlit/chainlit](https://github.com/Chainlit/chainlit)
- [Documentation — docs.chainlit.io](https://docs.chainlit.io)
- [Cookbook of worked integrations](https://github.com/Chainlit/cookbook)

## Buzz & Reception

Turns a bare callback function into a debuggable chat app with per-step traces, streaming and approvals, which is the part every LLM demo hand-rolls badly.
