---
id: vercel-ai-sdk
name: "Vercel AI SDK"
version_tracked: null
artifact_type: library
category: agents
subcategory: agent-frameworks
description: "TypeScript toolkit for LLM apps: one provider-agnostic API for text, structured output, tool loops and agents, plus streaming UI hooks for React, Vue and Svelte"
github_url: "https://github.com/vercel/ai"
license: "Apache-2.0"
primary_language: TypeScript
org_or_maintainer: "Vercel"
tags: [agents, structured-output, tool-use]
maturity: production
cost_model: open-source
github_stars: 27506
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-10-25"
docs_url: "https://ai-sdk.dev/docs/introduction"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, general-purpose]
relation_to_stack: [build-on-top]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - "The TypeScript half of the LLM toolchain: `generateText`, `streamText`, `Output.object` and `ToolLoopAgent` behind one provider interface, with UI hooks that turn a token stream into React or Vue state without hand-written parsing"
best_for:
  - Your application is TypeScript and the model is the least stable part of it — a model string like `anthropic/claude-opus-5.5` can be swapped for another provider without touching call sites
  - You need typed structured output from a model — `Output.object` with a Zod schema gives a validated result and a typed error path instead of regex over prose
  - The UI has to stream tool calls, not just text — the `useChat` hook and `createAgentUIStreamResponse` handle the message and part state machine that is genuinely tedious to write
avoid_if:
  - Your services are Python — the SDK is TypeScript-first; `pydantic-ai` or `langchain` cover the same ground there
  - You need checkpointed, resumable, long-running orchestration — the agent loop is deliberately a tool-calling loop, and durable workflow state belongs in `langgraph` or a workflow engine
  - You want the default gateway route for compliance reasons — the convenience path proxies through Vercel's gateway, so direct provider packages are the option when traffic must not leave your account
upstream_dependencies: []
downstream_consumers: []
alternatives: [langchain, mastra, openai-agents-sdk, tanstack-ai]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-25: 27,506 stars, 1,480 open issues, last push 2026-10-25, TypeScript. README confirms Node 22+, `npm install ai`, Vercel AI Gateway as the default provider path, `Output.object` with Zod, `ToolLoopAgent`, `createAgentUIStreamResponse`, `@ai-sdk/react` useChat, and `npx skills add vercel/ai` for coding agents."
added_date: "2026-07-08"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

The AI SDK is the TypeScript answer to a problem Python solved three different ways: making model calls a stable interface rather than a vendor-specific one. `generateText`, `streamText`, `embed`, `Output.object` and `ToolLoopAgent` sit above a provider layer, so the model is an identifier (`'anthropic/claude-opus-5.5'`) that can be resolved through Vercel's AI Gateway or through a direct package such as `@ai-sdk/anthropic`.

The second half is the part Python frameworks keep underestimating: the browser. `@ai-sdk/react` exposes `useChat`, which consumes a streamed response and maintains message parts — text deltas, tool invocations in each of their states, reasoning blocks — as typed React state. `createAgentUIStreamResponse` on the server closes the loop.

## Why it's in the Arsenal

Most agent frameworks are backend frameworks that treat the frontend as a serialisation problem. The AI SDK treats the frontend as the primary consumer of a protocol, and that is the correct call for the way agent products are actually built: a tool call that takes eight seconds needs to show its progress, its arguments and its failure in the interface, not arrive as one blob at the end.

The provider abstraction is the second reason, and it is narrower than LangChain's by design. There is no retriever abstraction, no document loader zoo, no chain algebra — just models, tools, structured output and a UI protocol. A smaller surface means less to learn, fewer transitive dependencies and a stack trace that reaches `fetch` in one or two hops.

It also happens to be the only major TypeScript option with this combination of breadth and a Vue/Svelte/Angular client story, which matters when the frontend team is not on React.

## Architecture

Four packages, and the split is the mental model.

`ai` is the core: model resolution, `generateText`/`streamText`, `Output.object` schema binding, tool definitions, and `ToolLoopAgent` — a loop that calls the model, executes requested tools, feeds results back, and repeats until it stops asking. `@ai-sdk/<provider>` packages are thin adapters, each translating the core request shape into a vendor's HTTP API. `@ai-sdk/react` (plus Vue and Svelte siblings) holds the UI hooks and the streaming state reducer. `@ai-sdk/gateway` is the default routing path: one credential, any provider model string.

The wire format is the interesting design decision. The UI stream is not SSE of raw model chunks; it is a structured protocol of typed parts, which is what lets the client render a tool invocation in `input-available` state before the result exists, and lets the type system infer a message shape from an agent's tool set via `InferAgentUIMessage`. Version skew between server and client is the trade: the client and server packages must move together.

## Ecosystem Position

Compared with `langchain` the difference is scope, not quality. LangChain owns retrieval and integration breadth across Python and JS; the AI SDK owns the TypeScript request path and the browser protocol and stops there. A team building a document-heavy RAG product in TypeScript will reach for LangChain.js; a team building a chat-with-tools interface in Next.js will find this smaller and faster.

`mastra` is the closest direct alternative — same language, agents and workflows as first-class objects, opinionated about durable execution, and further along on evaluation and deployment tooling. The honest split: Mastra when your agent needs workflow state and observability built in, the AI SDK when your agent is a loop inside a product you are already building.

Against `openai-agents-sdk` (TypeScript flavour) the boundary is provider neutrality — that SDK is excellent if you are on OpenAI and awkward if you are not. `tanstack-ai` overlaps on the streaming and chat state side with a lighter, framework-agnostic server/client split, and is worth a look if you object to Vercel-shaped defaults.

The gateway question deserves naming: the default model-string path routes through Vercel's AI Gateway, which adds a hop, a bill and a data-processing question. Direct provider packages are fully supported, and a regulated deployment should start there.

## Getting Started

Node 22 or newer, then:

```bash
npm install ai zod
npm install @ai-sdk/anthropic      # or use the gateway with no provider package
```

```ts
import { generateText, Output } from 'ai';
import { z } from 'zod';

const { output } = await generateText({
  model: 'anthropic/claude-opus-5.5',      // gateway path
  output: Output.object({
    schema: z.object({ sentiment: z.enum(['pos', 'neg', 'mixed']), why: z.string() }),
  }),
  prompt: 'Classify this review: "works, but the setup took a day".',
});

console.log(output.sentiment);
```

An agent is a constructor, not a graph:

```ts
import { ToolLoopAgent, createAgentUIStreamResponse } from 'ai';

const agent = new ToolLoopAgent({
  model: 'anthropic/claude-opus-5.5',
  tools: { /* tool definitions with execute functions */ },
});

// Next.js route handler
export async function POST(req: Request) {
  const { messages } = await req.json();
  return createAgentUIStreamResponse({ agent, messages });
}
```

Add the skill before letting a coding agent write integration code: `npx skills add vercel/ai`. Version drift between `ai`, the provider package and `@ai-sdk/react` is the most common self-inflicted failure, so upgrade them as one unit.

## Key Use Cases

1. **Streaming chat with tool calls in the interface**: a `useChat` client renders partial output, tool arguments and tool results as they arrive, which is what makes an eight-second tool call feel handled rather than hung.
2. **Provider comparison without a rewrite**: the same call site runs against three providers by changing one string, so quality and cost comparisons happen in the product rather than in a notebook.
3. **Schema-bound extraction**: invoices, tickets, support mail — Zod gives runtime validation and a TypeScript type from one declaration, so downstream code cannot receive a half-parsed object.
4. **Agents inside an existing Next.js app**: no separate service, no workflow engine; the agent is a route handler and the state lives in the client, which is often exactly right.
5. **Generative UI**: tool outputs rendered as components rather than text, with each invocation state mapped to a view — the pattern that makes agent output legible to end users.
6. **Multi-framework frontends**: the same server protocol with React, Vue, Svelte or Angular hooks means one backend supports frontend teams that never agreed on a framework.

## Strengths

- The streaming protocol is the strongest part: typed message parts with tool-call states solve a problem that is genuinely hard to retrofit later.
- Provider neutrality is real and cheap — one interface, thin adapters, no rewrite when the model changes.
- `Output.object` with Zod is the cleanest structured-output API in any language, with validation and types from one schema.
- Small dependency footprint compared with chain-style frameworks, and stack traces that reach the HTTP call.
- First-party UI hooks for React, Vue, Svelte and Angular, which is unusual outside React-only ecosystems.
- Actively developed by a well-resourced maintainer; last push the day this was reviewed.

## Limitations

- **Four packages in lockstep.** `ai`, the provider adapter and the UI package must be upgraded together; a mismatched pair produces stream parsing failures that look like model errors.
- **The default path is Vercel-shaped.** Using the gateway is one line and routes traffic through a third party with its own billing and data terms; the neutral configuration takes more setup.
- **The agent loop is minimal on purpose.** No checkpointing, no resumable runs, no human-in-the-loop persistence — the moment a task must survive a process restart, you are building that yourself or moving to Mastra or LangGraph JS.
- **1,480 open issues.** Velocity is high, and so is the chance that the version you pinned six months ago has a migration note you did not read.
- **TypeScript only.** The Python service that does the retrieval has no shared abstraction with it, so a mixed stack ends up with two model-call layers.
- **Streaming state is client state.** Long conversations mean growing client memory unless you add persistence yourself; the SDK does not manage history.

## Relation to the Arsenal

Compare with `langchain` (broader integration surface, weaker UI story), `mastra` (workflow state and evals built in), `openai-agents-sdk` (provider-specific, strong on OpenAI tooling) and `tanstack-ai` (lighter, less opinionated). For the tracing layer, pair it with `langfuse` or `openlit` via their TypeScript SDKs.

For providers to point it at, see [Foundation Models](../foundation-models/_index.md); for self-hosted endpoints that speak the OpenAI schema, see [Inference Engines](../inference-engines/_index.md).

## Resources

- [GitHub](https://github.com/vercel/ai)
- [Documentation](https://ai-sdk.dev/docs)
- [Providers](https://ai-sdk.dev/providers/ai-sdk-providers)
- [AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/overview)
- [Vercel AI Gateway](https://vercel.com/docs/ai-gateway)
