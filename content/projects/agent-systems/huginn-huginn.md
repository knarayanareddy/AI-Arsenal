---
id: huginn-huginn
name: "huginn"
version_tracked: null
artifact_type: platform
category: agents
subcategory: autonomous
description: "MIT-licensed Ruby event-driven platform where agents watch sites, feeds, files, and webhooks and react on a schedule"
github_url: "https://github.com/huginn/huginn"
license: "MIT"
primary_language: Other
org_or_maintainer: "huginn"
tags: [monitoring, agents]
maturity: production
cost_model: open-source
github_stars: 50005
github_stars_last_30d: 0
trending_score: 38
last_commit: "2026-09-26"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [deploy-as-is, fork-and-adapt]
health_signals: [actively-maintained, community-driven]
ecosystem_role:
  - "Long-running event-driven agent platform whose agents watch websites, APIs, and files on a schedule and act on changes — the pre-LLM precedent for autonomous monitoring loops."
best_for:
  - "You need alerts when a vendor status page, a competitor's pricing page, or a scraped listing changes, and a deterministic rule is enough to decide what counts as a change."
  - "You want to see exactly what an automated agent fetched and did, because every event and payload is stored in the database and rendered in a web interface rather than hidden in a model context."
  - "You are wiring many small automations across RSS, webhooks, and file drops and want a visual graph of agent-to-agent communication with rate limits and deduplication built in."
avoid_if:
  - "You need open-ended reasoning, because agents here follow fixed rules and cannot summarize, classify, or decide anything the scenario does not already express."
  - "You need a modern developer experience, since the Ruby on Rails codebase carries long-standing conventions and a large surface of inherited UI that most teams have to work around."
  - "You are deploying a multi-tenant product, because the design assumes a trusted single-user or small-team installation with a shared credential store."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 50005 stars, MIT license, primary language reported as Other (Ruby-dominant repo), last commit 2026-09-26, 12 GitHub topics, no homepage. Agent types, change-detection modes, and the V8 JavaScriptAgent sandbox are read from official docs; the platform was not deployed in this session."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/huginn/huginn", "date": "2026-09-28", "description": "50,005 stars and last commit 2026-09-26 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Huginn is a platform for building agents that watch things and act on them, in the tradition of IFTTT rather than of an LLM framework. An agent is a configured unit - a WebsiteAgent that polls a page and emits an event when a CSS selector's text changes, a PostAgent that delivers events to a webhook, an RSSAgent, a TriggerAgent that fires on incoming events, a DeDuplicator, a DelayAgent, an EventFormattingAgent, a HumanAgent, or a JavaScriptAgent running custom code. Agents share a unified event format and communicate by passing events to each other, so a pipeline is a directed graph of these units configured through a web interface. The whole thing is a Ruby on Rails application with a database of agents, events, and credentials, and it predates the LLM era by about a decade.

## Why it's in the Arsenal

The recurring decision Huginn resolves is durable, auditable, rule-based automation. Chat-style assistants forget what they did; a scheduled webhook integration silently stops checking; a cron job that polls a page and emails you has no history. Here every fetch produces a stored event with its payload, every action is a visible link between two agents, and the state is queryable, because the platform's design assumption is that automation should be inspectable months later by someone who was not present when it was configured. That is also why it predates LLM agents: for a large class of monitoring and notification problems, deterministic rules are cheaper, faster, and more reliable than a model, and Huginn makes those rules composable instead of a pile of scripts.

## Architecture

The Rails app models Agents as rows with typed configuration, a scheduling mechanism that periodically enqueues agents due for a check, and an event bus over ActiveRecord where each agent consumes matching events and emits its own. Each agent type implements a check or receive method and declares an Event schema describing the fields it emits, so downstream agents can be configured against structured payloads rather than free-form hashes. A WebsiteAgent fetches a URL, stores page snapshots, evaluates a CSS selector with change-detection options - a text diff, regex, or a silence count - and emits an event carrying the new and old value. A JavaScriptAgent runs user-supplied code in a sandboxed V8 context per invocation, which is the extension point for anything the built-in agents do not cover. Deduplication happens in the event creation path with configurable scoping, delay is a first-class agent rather than a sleep in code, and a HumanAgent sends a question and waits for a form response, which is how the platform does human-in-the-loop. Credentials live in the database encrypted at rest, and every agent type ships with a form that validates its configuration.

## Ecosystem Position

Huginn competes with Zapier, IFTTT, and n8n in the connective-automation space, and compared with those it is a self-hosted server you operate rather than a hosted product, with full data ownership as the tradeoff. It overlaps with the newer LLM agent frameworks in content/projects/agent-systems/ only in shape - both compose small units that emit and consume events - and differs fundamentally in that Huginn's units make no model calls, so it is rather than a reasoning system. It complements the scrapers in content/projects/data-and-retrieval/ by providing the schedule-and-act half of a monitoring pipeline those tools fetch for. It is an alternative to writing a bespoke cron-and-diff script per source, and where a workflow engine such as the Conductor entry in this batch handles durable execution of a defined process, Huginn handles long-lived monitoring of many independent sources.

## Getting Started

Run the Rails app with Docker Compose, which brings up Postgres and the web interface:

```bash
git clone https://github.com/huginn/huginn.git
cd huginn
docker compose up
```

The interface comes up on the mapped port; sign in, create a WebsiteAgent pointed at a URL with a CSS selector and change-detection mode, then connect it to a PostAgent or the built-in delivery agent.

## Key Use Cases

1. Change detection on pages with no API: a WebsiteAgent polls a pricing or changelog page and emits an event when a selector's text changes under diff mode.
2. Chaining many small automations - dedupe, delay, reformat, branch - with a visual graph and a queryable event history instead of a growing pile of scripts.
3. Human-in-the-loop escalation where a long-running automation pauses, asks a person through the UI, and resumes on the response.

## Strengths

- Full auditability: every fetched page, emitted event, and action is stored and viewable, which is rare for automation platforms at any price tier.
- Rich library of composable agent types out of the box, covering dedupe, delay, formatting, scheduling, and delivery.
- JavaScriptAgent escape hatch in a sandboxed V8 context, so custom logic is possible without forking the platform.
- Ruby on Rails base with a familiar ORM, migrations, and test conventions, and MIT licensing with no vendor lock-in.

## Limitations

There is no LLM reasoning in the platform, so anything requiring summarization, classification, or open-ended interpretation must be wired in from outside, which reintroduces the integration problem the platform otherwise avoids. Being a long-lived Rails application, it has accumulated UI and schema complexity, and the codebase conventions reflect a decade of evolution rather than a clean modern design. Agents execute as Ruby code in-process under a shared credential store, so a misconfigured or hostile page plus a JavaScriptAgent is a real risk in a multi-tenant setting. Scraping-based agents are only as reliable as the site's markup, and rate-limit and robots handling is on you. The activity stream retains a lot of data and needs pruning, and there is no hosted tier, so you own backups, upgrades, and the Ruby dependency chain.

## Relation to the Arsenal

The pre-LLM precedent in the agent-systems phase, and the clearest example in the Arsenal of durable, event-driven, rule-based agent architecture. It pairs with the retrieval side: the Scrapling entry in this batch or the crawling frameworks in content/projects/data-and-retrieval/ produce the data Huginn's agents watch. Where the durable-execution entry in this batch wraps a single long-running process in retries and timers, Huginn manages many independent monitoring sources. The LLM-native agents in content/projects/agent-systems/ are the natural next step for the cases Huginn structurally cannot handle, and the observability tooling in content/projects/evaluation/ is a modern alternative for the alerting subset.

## Resources

- [GitHub — huginn/huginn](https://github.com/huginn/huginn)
- [Public demo instance with agent descriptions](https://demo.huginn.io)
- [Agent development guide](https://github.com/huginn/huginn/blob/master/CONTRIBUTING.md)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (50,005 stars, last commit 2026-09-26, license MIT, verified via GitHub API on 2026-09-28)*
