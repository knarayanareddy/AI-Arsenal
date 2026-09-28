---
id: agent-reach
name: Agent Reach
type: tool
job: [web-scraping]
description: "Open-source CLI that gives an agent read and search access to Twitter, Reddit, YouTube, Bilibili, Xiaohongshu and GitHub without paid APIs or per-site"
url: "https://github.com/Panniantong/Agent-Reach"
cost_model: open-source
pricing_detail: Free and open source (MIT); some backends rely on free public endpoints with their own limits
tags: [retrieval, agents]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Relies on free/public endpoints for some platforms; rate limits and breakage risk vary by source
self_hostable: true
open_source: true
source_url: "https://github.com/Panniantong/Agent-Reach"
docs_url: "https://github.com/Panniantong/Agent-Reach/blob/main/docs/README_en.md"
github_url: "https://github.com/Panniantong/Agent-Reach"
alternatives: [firecrawl-tool, crawl4ai-tool, jina-reader]
integrates_with: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype]
best_when: ["You are running an agent that needs to read a tweet, summarise a YouTube video or search Reddit for prior reports, and you want that working without signing up for five separate scraping services.", "You want to keep research out of a metered API, because the project ships free upstream tools and its own cost model is a few dollars a month at most for a server-side proxy if you need one.", "You need one diagnostic surface for a multi-platform setup, because the doctor command reports which channels are working and which are not in a single pass instead of failing per integration."]
avoid_when: ["You have a data-residency requirement that forbids session cookies on your machine, because several channels work by reusing an existing browser session and the project states cookies stay local but persist.", "You need guaranteed long-term stability, because this layer sits on public interfaces that break when a platform changes, and the maintainer treats absorbing that churn as a standing obligation rather than a solved problem.", "You are standing this up as production infrastructure with an SLA, because the project is an agent capability installer maintained primarily by one person, not a service with a support commitment."]
version_tracked: null
enrichment_status: draft
enrichment_notes: Star count (52.5k), MIT license, and recent activity (last push 2026-07-03) verified via the GitHub API on 2026-07-07; on GitHub monthly trending. Source coverage claims from the project's own README; per-platform reliability not independently verified.
verdict: watching
verdict_rationale: Very fast-growing and genuinely broad source coverage, but built partly on unofficial endpoints — reliability and ToS posture need per-source verification before production use
status: active
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending?since=monthly","date":"2026-07-07","description":"On GitHub monthly trending; 52.5k stars"}
---

## Overview

Agent Reach installs a command-line tool plus agent-facing skill files so an AI coding assistant can reach the open web. The design principle stated in the README is that the integration method for any platform will change over time, and the project absorbs that churn on the user's behalf - each channel has a preferred path and a fallback, and when one dies the maintainer swaps it. Coverage spans plain web page reading, YouTube subtitles and search, RSS and Atom feeds, semantic web search over MCP, GitHub including private repositories and issue and PR creation, Twitter, Bilibili, Reddit, Facebook, Instagram, Xiaohongshu, LinkedIn, Boss Zhipin, V2EX, Xueqiu and podcast transcription. Installation and update are both delivered as a single prompt aimed at the agent rather than a command you run, and the README explicitly warns against installing the same-named package from PyPI because it is not this project.

## Why It's in the Arsenal

The problem is asymmetric effort: making an agent read a tweet takes a day, making it read a platform that blocks datacenter IPs reliably takes weeks of intermittent maintenance, and the breakage is silent until a task fails. Consolidating that behind one CLI means the maintenance cost is paid once by someone who wants to maintain it, and the diagnostic command turns an opaque failure into a list of which channels are down. The tradeoff is that you now depend on a single-maintainer tool for capability you could have built narrowly yourself, and on upstream tools whose interfaces are not contractually stable.

## Key Features

- Zero API spend for most channels, since the upstream tools are open source and the documented marginal cost is a low-cost server proxy only when you deploy remotely.
- A preferred-plus-fallback path per platform means a single upstream tool breaking is a maintainer problem rather than a user outage.
- The doctor command turns a class of silent, hard-to-diagnose failures into a status list you can act on directly.
- Cookies and tokens stay local, and the code is MIT licensed so the whole integration path is auditable.

## Architecture / How It Works

The project is a Python package whose install path writes a CLI plus agent skill files into the directories Claude Code, Cursor and similar tools read. Channels are implemented by delegating to existing open-source tools rather than reimplementing scraping: yt-dlp handles video and subtitles, feedparser handles RSS, gh handles GitHub, Exa supplies semantic search over MCP, and platform-specific CLIs including bili-cli, rdt-cli and OpenCLI cover the Chinese and Western social platforms. Credentials live in a local config directory as cookies or tokens, and the tool deliberately will not perform a login on your behalf where that would mean reading a session it was not given - the README is explicit that users export cookies manually, and that the configure command does not inject cookies into a browser. Diagnosis is a first-class command that probes each configured channel and reports status, which is the mechanism that turns a failed fetch into an actionable message. Uninstall is symmetrical, with a dry-run and a keep-config flag.

## Getting Started

Installation is delivered as a prompt you hand to the agent rather than a command you memorise:

```bash
agent-reach install
agent-reach doctor
```

By default install only checks the environment and writes no configuration; pass --system only when you explicitly want system packages installed and Exa wired in over MCP. Update is the same shape through the update prompt in the repository docs.

## Use Cases

1. Cross-platform research from one agent: ask for public sentiment on a product across Twitter, Reddit and Xiaohongshu without provisioning three API keys.
2. Video and feed ingestion: pull subtitles from a YouTube or Bilibili tutorial and read RSS or Atom sources so a briefing assembles from mixed media.
3. Triage a broken integration: run the doctor command to learn which channel died after a platform change, then act on the specific one instead of debugging the whole stack.

## Strengths

It competes with paid scraping and search APIs - Exa is one of its own dependencies, and services selling the same outcome attach an SLA - and the difference is entirely cost and maintenance responsibility. It overlaps with the ingestion tools in content/tools/data-ingestion such as unstructured or trafilatura for the plain-HTML case, but reaches well past document parsing into the authenticated and anti-bot platforms a general scraper will not touch. Compared with browser-automation entries such as browser-use or stagehand, which drive a real browser for anything, this is a set of purpose-built narrow adapters: cheaper and faster for a known site, hopeless for an unknown one. It complements entries in content/projects/agent-systems by supplying a capability most of them lack rather than replacing the agent itself.

## Limitations / When NOT to Use

The reliability ceiling is set by platforms that actively resist automation, and the README is candid that several channels have no zero-configuration path at all because anonymous interfaces have been closed. Several integrations depend on reusing a browser session you control, which makes the setup personal rather than reproducible and puts it at odds with unattended or shared deployments. Being a thin layer over upstream tools means breaking changes upstream surface directly, and the project has no compatibility contract to fall back on. There is also a naming hazard the README calls out: a same-named package on PyPI is not this project, and installing it produces a confusing broken state. Sponsor sections in the README name several commercial scraping and model services, which is worth weighing when the incentive structure of a free tool matters to you.

## Integration Patterns

This is the web-reach capability layer in content/tools/data-ingestion, and it differs from the document parsers in the same phase because its unit of work is a platform rather than a file format. Pair it with the retrieval entries in content/projects/data-and-retrieval once the fetched text needs to be indexed, and contrast it against the browser-automation tools in content/projects/agent-systems when the question is whether to drive a real browser or call a narrow adapter.

## Resources

- [GitHub — Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach)
- [English README](https://github.com/Panniantong/Agent-Reach/blob/main/docs/README_en.md)
- [Install and update prompts](https://github.com/Panniantong/Agent-Reach/blob/main/docs/install.md)

## Buzz & Reception

Packages the per-platform scraping work into one CLI with a diagnostic command, so an agent reaches sites that block anonymous server requests without you maintaining site-specific integrations.
