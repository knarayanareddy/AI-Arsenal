---
id: fastapi
name: FastAPI
type: tool
job: [prototyping, production-serving]
description: Async Python API framework over Starlette and Pydantic — typed request models, generated OpenAPI docs and streaming responses for LLM endpoints
url: "https://github.com/fastapi/fastapi"
cost_model: open-source
pricing_detail: MIT and free; deployment cost is the ASGI server and infrastructure you run
tags: [llm, cloud, serverless]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Unlimited; the only cost is the host running uvicorn
self_hostable: true
open_source: true
source_url: "https://github.com/fastapi/fastapi"
docs_url: "https://fastapi.tiangolo.com"
github_url: "https://github.com/fastapi/fastapi"
alternatives: [chainlit, gradio, mesop, streamlit]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
phase: serving-and-deployment
audience: [prototype, production]
best_when:
  - You are putting an HTTP contract in front of a model call and want the request and response schema to be the validation, the docs and the client types from one Pydantic declaration
  - The endpoint must stream — token-by-token SSE or a proxied provider stream — which needs an async framework and an ASGI server, not a WSGI one
  - "The service is small and must stay readable: a few dozen lines with dependency injection is enough, and there is no framework-shaped structure to learn first"
avoid_when:
  - The application needs an admin UI, ORM migrations and session auth out of the box — Django exists, and assembling those on FastAPI is a project
  - You want the serving layer to manage model loading, batching and GPU lifecycle — that is a model server's job (vLLM, TGI, BentoML), not an HTTP framework's
  - Your team writes Go or Java — the ecosystem advantage here is Python-specific
verdict: recommended
verdict_rationale: The default Python HTTP layer for model endpoints; it does not serve models, it exposes them, and understanding that boundary is what keeps a deployment simple
status: active
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-25: fastapi/fastapi 104,138 stars, 62 open issues, MIT, last push 2026-10-23. Capability claims — Starlette/ASGI base, Pydantic validation, generated OpenAPI and Swagger UI, dependency injection, StreamingResponse, lifespan handlers, TestClient — are from the official documentation."
---

> **TL;DR:** An HTTP framework, not an inference server — it gives a model endpoint validation, docs and token streaming, and leaves scheduling and GPU memory to the thing behind it.

## Overview

FastAPI is a web framework built on two libraries: Starlette for the ASGI plumbing and Pydantic for data validation. A route handler is a plain Python function with type annotations; the annotations become request parsing, response serialisation, validation errors and an OpenAPI schema, which is then rendered as interactive documentation.

For model serving that combination hits an unusually good seam. A generation request is a structured object with fields that need validating; a response is another; the endpoint often streams; and the service needs to be called from a frontend or another service that would like a typed client. FastAPI derives all four from one declaration.

It is deliberately not a model server. It does not load weights, batch requests, manage GPU memory or provide a model registry — it exposes a process that does those things, and confusing the two is how a simple wrapper turns into a fragile inference platform.

## Why It's in the Arsenal

Every stack in this catalog eventually needs one thin service in front of a model: to add authentication, to normalise three providers behind one schema, to enforce rate limits, to log prompts with the user's identity attached, or to hide a vendor key from the browser. FastAPI is what that service is written in, most of the time, and the reason is that the alternative — Flask with manual validation and hand-written docs, or Django with an ORM nobody needs — is more code for the same result.

The streaming story is the part that matters most in practice. LLM responses are long and slow, and a non-streaming endpoint turns a good experience into a spinner. Because FastAPI is ASGI-native and async, `StreamingResponse` with an SSE media type proxies a provider's token stream in a few lines, including pass-through of the connection lifecycle that a synchronous framework makes awkward.

And it stays small. A service with four endpoints and a lifespan-managed client is roughly a hundred lines, which means the code review is about the AI logic rather than the framework wiring.

## Key Features

- **Type-driven request and response models**: Pydantic classes validate input, serialise output and generate the schema, with 422 responses for free.
- **Automatic OpenAPI and interactive docs**: `/docs` and `/openapi.json` exist without configuration, and clients can be generated from the schema.
- **Native async**: `async def` handlers on an ASGI server, which is required for proxying a slow upstream without holding a worker thread.
- **Dependency injection**: `Depends` and `Annotated` share a database session, an authenticated user, a provider client or a rate limiter across handlers, with overrides for tests.
- **Streaming responses**: `StreamingResponse` for SSE or chunked text, which is how a token stream reaches a browser.
- **Lifespan handlers**: `@asynccontextmanager` startup and shutdown for loading a client, warming a model or closing a pool — the correct replacement for the deprecated startup events.
- **Background tasks** for post-response work that does not need to block the reply, such as logging an evaluation row.
- **`TestClient`**: an in-process client that exercises the real app, including streaming, without running a server.
- **Middleware and exception handlers**: CORS, request IDs, structured error bodies and timing, all as ordinary ASGI middleware.
- **Validation-first configuration**: environment settings via `pydantic-settings`, so misconfiguration fails at boot rather than on first request.

## Architecture / How It Works

ASGI is the substrate: the server (uvicorn, or hypercorn) speaks the async interface, Starlette routes and handles middleware, and FastAPI adds the dependency system and the schema generation on top. Each request is parsed into Pydantic models, dependencies are resolved, the handler runs, and the result is serialised against the declared response model.

The detail that catches people is the sync/async boundary. An `async def` handler runs on the event loop and must not block; a plain `def` handler runs in a threadpool, which is the safe place for blocking library calls. A single synchronous client call inside an async handler stalls every concurrent request on that worker, and it presents as intermittent latency rather than an error.

Scaling happens at the process level: uvicorn workers, one per CPU core, each with its own event loop. A model loaded inside the worker is loaded once per worker, which is why a service that holds a large model in memory is usually deployed as a single worker behind a queue, or outsourced to a dedicated inference server.

Streaming adds two obligations. The upstream connection must have a timeout and a disconnect handler, because a client that closes the tab should cancel the provider request; and the response must not be buffered by an intermediary, which means the proxy in front has to be configured for it.

## Getting Started

```bash
pip install fastapi uvicorn[standard] httpx pydantic-settings
```

```python
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
import httpx, os

class ChatRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=8000)
    model: str = "gpt-6-astra"

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.client = httpx.AsyncClient(timeout=httpx.Timeout(60, connect=5))
    yield
    await app.state.client.aclose()

app = FastAPI(lifespan=lifespan)

@app.post("/chat")
async def chat(req: ChatRequest):
    async def tokens():
        async with app.state.client.stream(
            "POST", "https://api.openai.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}"},
            json={"model": req.model, "stream": True,
                  "messages": [{"role": "user", "content": req.prompt}]},
        ) as r:
            async for chunk in r.aiter_bytes():
                yield chunk
    return StreamingResponse(tokens(), media_type="text/event-stream")
```

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

Three things to set before this is a real service: a timeout on the upstream (a hung provider connection is indistinguishable from a hung service), a disconnect check so an abandoned stream stops billing, and `/healthz` plus structured logs, because a streaming endpoint that fails mid-stream returns 200 and an empty body.

## Use Cases

1. **Provider facade with a stable schema**: one endpoint that normalises OpenAI, Anthropic and a self-hosted vLLM model behind a single request model, so the product team stops caring which provider answered.
2. **Token streaming to a browser**: SSE pass-through with a disconnect handler, which is the minimum viable shape for a chat interface.
3. **API key custody**: the browser calls your service, the service holds the provider key — the reason most AI products have a backend at all.
4. **Structured extraction service**: a Pydantic response model turns an LLM call into a validated object or a 422, and the schema doubles as documentation for callers.
5. **Webhook receiver for provider events**: signature verification, idempotency keys and a background task to enqueue real work.
6. **Evaluation harness endpoint**: given an input, run it through three variants and return the outputs plus latency and cost, which is how an experiment becomes testable.
7. **Admin and internal tooling**: small CRUD endpoints over datasets, prompt versions or annotation queues, where the auto-generated docs are enough of a UI.

## Strengths

- One code path produces validation, serialisation, docs and client generation — the highest leverage per line in Python web tooling.
- ASGI and async support make streaming and upstream proxying a first-class pattern rather than a workaround.
- Dependency injection is genuinely useful for AI services: a provider client, a rate limiter, an auth check and a request-scoped logger compose cleanly.
- The `TestClient` and dependency overrides make an LLM endpoint testable without a network call, which is usually the hardest part of testing such a service.
- 104,000 stars and 62 open issues: an unusually supported project with a small bug surface and an enormous answer corpus.
- Small enough that the framework does not become the architecture — a reviewer sees the model logic.

## Limitations / When NOT to Use

- **It is not an inference server.** No batching, no KV-cache management, no GPU scheduling; wrapping a model directly in an endpoint gives you one request at a time and an OOM at the second concurrent call. Use a model server behind it.
- **Async discipline is on you.** A blocking client call in an async handler collapses concurrency, and nothing in the framework prevents it.
- **Streaming has sharp edges.** Errors mid-stream arrive after a 200; cancellation, back-pressure and proxy buffering all need explicit handling.
- **The ecosystem assumes you assemble the rest.** No ORM, no migrations, no admin, no session auth — SQLModel, Alembic and an auth library are separate decisions with their own trapdoors.
- **Per-worker memory.** Every worker duplicates in-process state, so a locally loaded model multiplied by four workers is four models in RAM.
- **Timeouts are not a default.** Upstream and request timeouts must be set, and the framework's own defaults will accept a connection that never answers.
- **Not a UI framework.** The `gradio`, `streamlit` and `chainlit` entries exist because a demo interface is a different problem.

## Integration Patterns

- *Split serving from exposing*: run `vllm` or `tgi` (or the provider API) behind this service; the FastAPI process handles auth, rate limits, schema and logging, and never loads weights.
- *Streaming contract*: fix the wire format early (SSE with a documented event schema), send a heartbeat comment so intermediaries do not close an idle connection, and end the stream with an explicit terminator event the client can rely on.
- *Configuration*: `pydantic-settings` for keys and endpoints, failing at startup, with the provider client created in a lifespan handler so tests can override it.
- *Observability*: a request ID in middleware, prompt and completion logged with the token counts and the resolved model, and the same trace context propagated to the tracing tool (`openlit`, `langfuse`) if you run one.
- *Alternatives in the same job*: `gradio` or `streamlit` when the interface is the deliverable, `chainlit` for a conversational UI, and a dedicated model server when the endpoint has to serve many users of one model.
- *Before production*: set timeouts at three levels (client, upstream, total request), cap request size, pin the uvicorn worker count to CPU rather than assuming it scales, and verify that the proxy in front does not buffer SSE.

## Resources

- [Documentation](https://fastapi.tiangolo.com)
- [GitHub](https://github.com/fastapi/fastapi)
- [Streaming responses](https://fastapi.tiangolo.com/advanced/custom-response/#streamingresponse)
- [Dependencies](https://fastapi.tiangolo.com/tutorial/dependencies/)
- [Lifespan events](https://fastapi.tiangolo.com/advanced/events/)

## Buzz & Reception

- The standard choice for wrapping a model in an API, adopted because the typed-and-documented endpoint is the shortest path from notebook to callable service.
- The recurring criticism is not about the framework but about misuse: people put a model in an endpoint and discover that HTTP frameworks do not schedule GPUs.

---
*Last reviewed: 2026-10-25 by @maintainer*
