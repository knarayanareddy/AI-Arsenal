---
id: trendradar
name: TrendRadar
version_tracked: null
artifact_type: library
category: rag
subcategory: vector-databases
description: "A self-hosted trend and news aggregator with AI filtering, translation, push delivery to chat platforms, and an MCP server"
github_url: "https://github.com/sansan0/TrendRadar"
license: GPL-3.0
primary_language: Python
tags: [data, tool-use, self-hosted]
maturity: production
cost_model: self-hostable
github_stars: 62598
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-13"
docs_url: "https://trendradar.sandev.cc/zh/"
demo_url: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Aggregates many sources, ranks them by your keywords, then pushes only what matches instead of another feed to scroll."
best_for:
  - "You are drowning in platform feeds and need one filtered stream of items matching keywords you actually care about."
  - "You need multilingual coverage where a Chinese-language item is translated before it reaches your team chat."
  - "You want a trend monitor you host yourself, with data staying local or on infrastructure you control."
avoid_if:
  - "You need guaranteed coverage of a niche source, because aggregation depth per platform varies and the list is not exhaustive."
  - "You have a policy against outbound webhooks, since delivery targets WeChat, Feishu, DingTalk, Telegram, Slack, and email."
  - "You need archival or analytical tooling, since this is a monitoring and alerting surface rather than a search system."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 62598, GPL-3.0, Python, last commit 2026-09-13, topics, homepage. From README: v6.10.0, MCP v4.1.0, RSS v4.5.0, AI push v5.0.0, multilingual v5.2.0, screening v6.5.0, push channels, GitHub Actions and Docker deployment, wantcat images. Source list unverified."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

TrendRadar's pitch is information-overload avoidance rather than aggregation volume: it pulls multi-platform hot lists plus RSS subscriptions, applies keyword filtering, and applies AI on top in three ways - intelligent news screening, AI translation for multilingual delivery, and an AI analysis briefing pushed straight to a phone or chat client. Delivery is the widest part of the design: WeCom and personal WeChat, Feishu, DingTalk, Telegram, email, ntfy, Bark, Slack, and a generic webhook, so a single filtered item can land wherever your team already reads. Versioning is tracked per feature - MCP at v4.1.0, RSS support from v4.5.0, AI analysis push from v5.0.0, multi-language AI push from v5.2.0, AI news screening from v6.5.0, with the app itself at v6.10.0 - which shows the filtering and translation layers are relatively recent. The MCP server, published as its own wantcat/trendradar-mcp image, lets an agent query the aggregated trends conversationally for sentiment insight and trend prediction.

## Why it's in the Arsenal

The recurring problem is that platform-native feeds optimize for engagement rather than for your attention, so the actual reading happens in a chat app where you have no filter, no history, and no query interface. Centralizing the sources means the keyword filter runs once instead of per platform, and the same filter can apply to RSS that you do not follow in any reader. Adding translation at the delivery step is the piece that changes who can participate - a Chinese-language source item reaching an English-speaking team in English, rather than being skipped. The MCP surface then makes the accumulated history queryable, which turns a push-only feed into something an agent can interrogate.

## Architecture

A Python collector runs on a schedule, pulling hot lists from a set of platforms and RSS feeds, normalizing each item into a common record with title, source, URL, and timestamp. Keyword rules filter the set, after which optional LLM calls perform screening relevance, translation into a target language, and generation of the analysis brief. Push adapters fan out per configured channel with per-channel formatting, and an ntfy-style store keeps recent items so the MCP server can answer questions over history rather than only what was just delivered. Deployment is deliberately multi-path - GitHub Actions for a scheduled free-tier run, GitHub Pages, Cloudflare Pages, Docker, or local execution - and state is local or your own cloud storage, which is the property the GPL project is really selling.

## Ecosystem Position

TrendRadar competes with RSS readers such as Feedly and Inoreader, with Chinese-market aggregators, and with the platform-native trending tabs it aggregates, but its niche is keyword-filtered push rather than reading-list management. Compared with Feedly, it adds AI screening, translation, and MCP queryability while giving up the mature foldering and dedup tooling. Compared with a self-hosted n8n or changedetection.io workflow you would build yourself, it ships the source list, filter DSL, and channel adapters instead of asking you to wire them. It overlaps with the news and web-search connectors in content/projects/data-and-retrieval as another external-data source an agent can consume, and its MCP endpoint is the same integration surface those entries expose. It complements content/projects/frameworks as a data feed for an agent and touches nothing in content/projects/inference-engines except as an LLM caller for its AI steps.

## Getting Started

Deploy with Docker, or run it on GitHub Actions for a scheduled free-tier job. Docker images exist for both the app and the MCP server.

```bash
docker pull wantcat/trendradar
docker run -d -p 8080:8080 -v $(pwd)/config:/app/config wantcat/trendradar
# MCP server variant
docker pull wantcat/trendradar-mcp
```

The documentation site covers quick start, self-hosted sources for AI-built hot lists, and per-channel configuration.

## Key Use Cases

1. Filter a noisy feed: define keywords and receive only matching items across many platforms in one chat channel.
2. Bridge language gaps: have a Chinese-language item translated before it is pushed to an English-speaking team's channel.
3. Query trends from an agent: register the MCP server and ask for sentiment insight and trend analysis over the accumulated history rather than scrolling.

## Strengths

- Nine-plus push destinations from one filtered stream, so delivery lands where the team already reads.
- AI translation integrated at delivery rather than as a separate step, which is what makes non-English sources usable.
- Self-hosted with local or self-managed cloud state, so the collected corpus is not someone else's dataset.
- MCP server published as its own image, turning the push history into a queryable source for an agent.

## Limitations

GPL-3.0 rules out linking it into a proprietary product without care, which is a real constraint for anyone embedding the collector. Aggregation depth is platform-dependent and scrapes are brittle by nature - a source that changes its HTML or tightens access silently disappears from coverage. Source lists are partly community-maintained, so completeness varies by region and there is no published coverage matrix. AI screening and translation cost model API calls on every item, so a broad keyword set can get expensive quickly, and the AI features arrived only in recent versions. Being trend-focused rather than archival, it does not keep a queryable long-term history out of the box.

## Relation to the Arsenal

This data-and-retrieval-phase entry is a live external-feed collector rather than a document or vector store, which places it alongside the search and connector entries in this phase. Its MCP server is what makes it usable by the harnesses in content/projects/frameworks, and its AI screening step is a downstream consumer of content/projects/inference-engines. It performs no evaluation of models, so anything about output quality needs content/projects/benchmark-and-eval.

## Resources

- [Repository](https://github.com/sansan0/TrendRadar)
- [Documentation site](https://trendradar.sandev.cc/zh/)
- [Docker Hub image](https://hub.docker.com/r/wantcat/trendradar)
