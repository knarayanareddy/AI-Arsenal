---
id: chrome-devtools-mcp
name: Chrome DevTools MCP
type: tool
job: [prototyping]
description: "Google's MCP server that gives a coding agent Chrome DevTools itself: trace recording, network and console inspection, heap snapshots and Puppeteer-driven input"
url: "https://github.com/ChromeDevTools/chrome-devtools-mcp"
cost_model: open-source
pricing_detail: Free and open source (Apache-2.0)
tags: [tool-use, observability, monitoring, battle-tested]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: Fully free and self-hostable; no paid tier exists
self_hostable: true
open_source: true
source_url: "https://github.com/ChromeDevTools/chrome-devtools-mcp"
docs_url: "https://developer.chrome.com/docs/devtools/agents"
github_url: "https://github.com/ChromeDevTools/chrome-devtools-mcp"
alternatives: [playwright, puppeteer]
integrates_with: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when: ["You are debugging a front-end defect and you want the agent to record a real performance trace and read the network waterfall and console stack traces, not speculate about them.", "You are chasing a memory leak and you want the agent to take heap snapshots, compare them and read dominators, retainers and duplicate strings through tools rather than a manual DevTools session.", "You want browser automation that waits for real results and can be pointed at a Chrome you already have open, and you also need a CLI path for scripting the same inspection without an MCP client."]
avoid_when: ["You are on anything other than Google Chrome or Chrome for Testing, because the README supports those two only and says other Chromium browsers may work but are unsupported.", "You cannot allow browser content to reach the model, because the disclaimer is explicit that the server exposes page content and any data in the browser or DevTools to the MCP client.", "You have a policy against outbound telemetry to Google, because usage statistics are on by default and performance tools can send trace URLs to the Chrome UX Report API unless you pass the opt-out flags."]
version_tracked: null
enrichment_status: draft
enrichment_notes: Star count (46.2k), Apache-2.0 license, Chrome team ownership, and active development (last push 2026-07-07) verified via the GitHub API on 2026-07-07; on GitHub weekly trending the same day.
verdict: recommended
verdict_rationale: First-party Chrome team MCP server; closes the "agent can't see its own frontend bugs" loop with official DevTools capabilities
status: active
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending?since=weekly","date":"2026-07-07","description":"On GitHub weekly trending; 46.2k stars"}
---

## Overview

Chrome DevTools MCP is a Google-maintained Model Context Protocol server, Apache-2.0, that hands an MCP client (Antigravity, Claude, Cursor, Copilot) the full DevTools surface plus Puppeteer-driven input automation, and it also ships a standalone CLI. The tool reference is much wider than browser control: 10 input tools (click, drag, fill, fill_form, handle_dialog, hover, press_key, type_text, upload_file, click_at), 6 navigation tools, 2 emulation tools, 3 performance tools (performance_start_trace, performance_stop_trace, performance_analyze_insight), 2 network tools, 9 debugging tools (evaluate_script, get_console_message, get_css_styles, lighthouse_audit, list_console_messages, take_screenshot, take_snapshot, screencast_start, screencast_stop), 14 memory tools covering the full heap-snapshot workflow including dominators, retainers, retaining paths, duplicate strings and snapshot comparison, 5 extension tools, third-party developer-tool bridges, WebMCP and four PWA tools. Several categories are opt-in behind flags such as `--experimentalVision`, `--categoryExperimentalWebmcp` and `--categoryPwa`.

## Why It's in the Arsenal

The decision it settles is whether an agent should be allowed to look at the browser's internals. Most browser automation gives an agent a click-and-type surface and no telemetry, so when a page is slow or a listener is leaking, the agent is guessing. Wiring DevTools itself into the tool set changes the economics: the same trace, console message and heap graph a senior engineer would open become three tool calls. The cost is a much larger blast radius than a click library, because every tool here can read and modify anything in the browser instance, and because two default-on behaviours send data outward.

## Key Features

- The tool surface covers input, navigation, network, console, performance, heap, extensions, WebMCP and PWAs, so the agent gets a full diagnostic rather than just input events.
- Element addressing by snapshot uid survives DOM churn that breaks selector-based automation, and fill_form batches form interaction in one call to cut turn count.
- A 14-tool memory workflow including snapshot comparison, dominators, retainers and duplicate strings is a level of introspection most agent browser stacks do not expose.
- Telemetry is configurable rather than unavoidable, with explicit --no-usage-statistics and --no-performance-crux flags plus environment-variable overrides.

## Architecture / How It Works

The server is an npm package launched over stdio by an MCP client, with puppeteer driving the actions and the Chrome DevTools frontend supplying traces, network, console and memory data. Input tools address elements by `uid` from a page content snapshot rather than by selector or coordinates, which is what makes the calls stable across DOM changes; `click_at` exists as a coordinate escape hatch behind `--experimentalVision`. Navigation is multi-tab and `new_page` accepts an `isolatedContext` so a test can get clean cookies and storage. Performance flows in three steps, start a trace, interact, stop and analyse, and `performance_analyze_insight` can optionally consult the CrUX API for field data. Memory is a separate loop of take-heapsnapshot, query objects, read dominators and retainers, then compare two snapshots. Requirements are Node.js LTS, a current stable Chrome or newer, and npm; update checks poll the npm registry unless `CHROME_DEVTOOLS_MCP_NO_UPDATE_CHECKS` is set.

## Getting Started

Register the server with any MCP client; the recommended config pins to latest so the tools track new DevTools releases:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

Run the server through npx, or use the bundled CLI directly for scripted inspection. Add `--no-usage-statistics` to the args to opt out of telemetry and `--no-performance-crux` to keep traces local.

## Use Cases

1. Performance regression triage: have the agent record a trace while reproducing the interaction, then read the analysis instead of describing a hunch about a slow render.
2. Leak hunting: take a baseline heap snapshot, exercise the suspect code path, take a second, then let compare_heapsnapshots and the dominator and retainer tools narrow it to the growing allocation.
3. Flaky interaction repair: drive the flow with fill_form and click against snapshot uids, then read console messages with source-mapped stack traces to find the handler that throws.

## Strengths

This is the browser-side counterpart to the MCP servers in content/tools/dx-and-tooling that are application-specific, and it competes with Playwright MCP and Puppeteer MCP for the automation slot while being the only one of the three that also exposes DevTools traces, network, console and heap data. It overlaps with browser-use and Stagehand in content/projects/agent-systems, but those are Python libraries that own a browser instance and reason over accessibility snapshots, whereas this is a TypeScript MCP server that hands the harness a diagnostic instrument. Compared with the desktop-control entries in that same phase, this is browser-scoped rather than OS-scoped. It complements rather than duplicates the coding agents: Claude Code, Cline and Codex in content/tools/dx-and-tooling are the harnesses that call these tools.

## Limitations / When NOT to Use

The README's own disclaimer is the biggest operational fact: this server exposes the content of the browser instance, so anything the agent inspects leaves into the model context, and you should not point it at a profile with sensitive sessions. Chrome-only support is a hard boundary, with other Chromium browsers explicitly unsupported. Two defaults work against a locked-down deployment, since usage statistics are on unless you pass a flag and performance analysis can send trace URLs to the CrUX API for field data. The tool count is itself a cost, because roughly sixty tools across nine categories inflate the tool schema every MCP client has to carry and can crowd out the context a coding agent needs. Data freshness matters too: `@latest` in the config means a DevTools release can change tool behaviour without you changing anything.

## Integration Patterns

This is the browser-instrumentation tool in content/tools/dx-and-tooling, and it is a capability provider for the coding agents in the same phase rather than a harness in itself. Compare it against the browser-automation entries in content/projects/agent-systems when the question is who owns the browser session, and against the desktop-control entries there when the question extends past the browser viewport. Anything that consumes the network and console data it returns, such as a performance regression suite, belongs in content/projects/benchmarks-and-evals, and the traces it records are the raw material for the monitoring surfaces covered there. It shares the MCP extension surface with agents that already speak the protocol, which is why no separate integration is needed.

## Resources

- [GitHub — ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Agent documentation — developer.chrome.com](https://developer.chrome.com/docs/devtools/agents)
- [Generated tool reference](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md)

## Buzz & Reception

Replaces an agent's guesswork about why the page is slow or throwing with the same performance trace, console output and heap graph a human developer would read.
