---
id: exa
name: Exa
type: tool
job: [web-scraping]
description: "Hosted MCP server exposing Exa web search and page fetch as two default tools for any MCP client"
url: "https://exa.ai"
cost_model: usage-based
pricing_detail: Free API credits to start; usage-based pricing per search/content request above the free allowance
tags: [data, tool-use, retrieval]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free starter API credits; usage-based billing beyond them
self_hostable: false
open_source: false
source_url: "https://github.com/exa-labs"
docs_url: "https://github.com/exa-labs/exa-mcp-server#readme"
github_url: "https://github.com/exa-labs"
alternatives: [tavily, jina-reader]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype, production]
best_when: ["You want an agent to search the web and read pages without running a browser or maintaining a scraper, because the default tools are one search call and one fetch call.", "You are adding a capability to a client that already speaks MCP, because installation is a URL in a config block and most clients are listed with the exact file to edit.", "You want multi-step research as a single higher-level call, because an optional agent_run tool handles research, list-building and enrichment when you enable it."]
avoid_when: ["You need the search to run entirely on your infrastructure, because this is a hosted service and every call leaves your process for the vendor's API.", "You need a crawler you control, because the whole integration is a remote endpoint rather than something you can fork, patch or run beside your data.", "You are hitting a rate or budget you cannot predict, because the API key is metered and the README publishes no tier or cost figures."]
version_tracked: null
enrichment_status: draft
enrichment_notes: Python SDK (exa-labs/exa-py) verified at ~217 stars, MIT, last push 2026-07-08 via GitHub API. Neural-vs-keyword advantage is claimed by the vendor and depends on query type; free-credit amounts are directional (confirm on pricing page).
verdict: recommended
verdict_rationale: A distinctive embeddings-native search API whose meaning-based matching and find-similar endpoint fill a gap keyword search APIs cannot, with clean SDKs and content retrieval built in
status: active
---

## Overview

Exa MCP Server is a thin integration that makes Exa's web search and content fetching available to any MCP-compatible client. Two tools are on by default: web_search_exa, which searches the web and returns clean ready-to-use content, and web_fetch_exa, which reads a page's full content as clean markdown from one or more URLs. An optional third tool, agent_run, is enabled through a tools parameter and executes a multi-step hosted agent for research, list-building, enrichment and structured output. Installation is a hosted streamable-http endpoint, an Agent Plugin for clients that support one, or a plugin command per client, and the README carries a table naming the config file for a dozen-plus clients including Kiro, LM Studio, Replit, Gemini CLI, Windsurf, Zed, Warp and v0.

## Why It's in the Arsenal

The decision it addresses is prompt budget versus capability. A search provider that exposes fifty indexed tools is unusable in most agents, because the schemas alone crowd out the task; two verbs that return clean content keeps the tool list at a size a model can actually use. Putting it behind MCP means the same endpoint serves a dozen-plus clients without per-client work, and the markdown return means the content lands in context ready to reason over rather than as raw HTML. The cost is that you have bought a dependency: a hosted API in the request path with its own pricing, its own retention, and results you cannot reproduce locally.

## Key Features

- Two default tools keeps the tool list small enough that the schemas do not crowd out the task in the prompt.
- One hosted endpoint serves a dozen-plus clients, so adding web access is a config edit rather than an integration project.
- Fetch returns clean markdown, which means the result is ready for reasoning or chunking without a parsing step.
- An optional agent_run tool escalates to multi-step research when the simple two-call path is not enough.

## Architecture / How It Works

There is almost no architecture on the client side, which is the point - the repository is a server definition and configuration, not a library. The MCP transport is streamable HTTP to a single endpoint, so a client registers a url and a bearer key and the tool schemas are discovered from the server at connect time. Each tool maps to a vendor API operation: search returns results with extracted content, fetch returns markdown for one or more URLs, and the optional agent_run delegates a multi-step task to a hosted agent that returns structured output. Because the client holds no state, the tool surface is the entire contract, which is why the default set is deliberately two.

## Getting Started

Point any MCP client at the hosted endpoint. For a client with a plugin system, it is one command:

```bash
claude plugin install exa@claude-plugins-official
```

```bash
codex mcp add exa --url https://mcp.exa.ai/mcp
```

For everything else, add the standard mcpServers block with type streamable-http and the same url, with your key in the headers. The README's table names the exact config file for each client.

## Use Cases

1. Agent research on demand: give a coding agent the ability to check a library's current documentation instead of relying on its training data.
2. Fresh-fact questions: any question where a hallucinated current fact is worse than an admission, since one search call resolves it.
3. Content ingestion: fetch a set of URLs as clean markdown and push the result straight into a chunking pipeline.

## Strengths

Exa MCP competes with self-hosted crawling - the crawl4ai entry in the same folder - and the split is ownership: here the vendor runs the crawlers and you hold a key, there you run a browser and manage the proxies. It overlaps with the Firecrawl MCP surface in content/projects/data-and-retrieval, which offers a broader endpoint set including crawl and map but is AGPL for the server and metered per request. Compared with the browser-driving agents such as stagehand, this is stateless search and fetch with no session, no login and no interaction, which is exactly why it is cheap. It complements rather than replaces a retrieval pipeline - the content it returns is what you would chunk and embed, and agent-reach in the same data-ingestion phase takes the routing view of the same problem.

## Limitations / When NOT to Use

It is a hosted dependency with a metered key: latency, availability and cost are outside your control, and the README publishes no tier information, so budget forecasting is guesswork. Every query leaves your environment, which is a data-residency decision for any query containing customer or user content. The optional agent_run path delegates multi-step reasoning to a hosted agent, which means less visibility into how an answer was reached than doing the loop yourself. Because the repository is a thin integration, there is nothing here to patch - custom search behaviour, custom ranking or a self-hosted deployment all mean going around it.

## Integration Patterns

This is a data-ingestion tool and the cheapest web-access option in the Arsenal: pair it with a coding agent in content/tools/developer-experience such as mistral-vibe or context7, which consume exactly this kind of lookup tool. The heavier alternatives live in content/projects/data-and-retrieval - Firecrawl for crawling at scale and crawl4ai in this same folder when you want the browser on your own machine. Downstream, whatever it returns flows into the chunking and embedding layers; for local-first memory, mempalace in content/projects/agent-systems consumes search results as stored text.

## Resources

- [GitHub - exa-labs/exa-mcp-server](https://github.com/exa-labs/exa-mcp-server)
- [Exa API and account](https://exa.ai)
- [Client-specific configuration table in the README](https://github.com/exa-labs/exa-mcp-server#readme)

## Buzz & Reception

Two tools instead of a catalogue keeps the prompt small, and the whole integration is a URL in a config file, which is the cheapest possible way to give an agent working web access
