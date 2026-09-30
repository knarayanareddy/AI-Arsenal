---
id: claude-video-vision
name: claude-video-vision
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Claude Code plugin that gives it ffmpeg-extracted video frames plus timestamped audio transcriptions from Whisper, Gemini or OpenAI"
github_url: "https://github.com/jordanrendric/claude-video-vision"
license: MIT
primary_language: TypeScript
tags: [multimodal, code-gen, voice]
maturity: beta
cost_model: open-source
github_stars: 1336
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-08-07"
docs_url: "https://github.com/jordanrendric/claude-video-vision#readme"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Closes the perception gap for video: frames go in as images, audio comes back as timestamped text, and Claude does the interpreting."
best_for:
  - "You are in Claude Code and you need to ask questions about a local video file without leaving the terminal or uploading the file anywhere."
  - "You want a fully local perception path and you prefer to run whisper.cpp or openai-whisper on your own machine rather than sending audio to Gemini or OpenAI."
  - "You have a YouTube URL you need analysed and you want yt-dlp to fetch the media and preserve source metadata and captions as context."
avoid_if:
  - "You need a model to make autonomous decisions about which frames matter, because the plugin is deliberately a perception layer that hands Claude the frames and transcription and lets it adapt parameters itself."
  - "You are working with hour-long 4K footage and you expect it to be cheap, because frame extraction scales with fps, resolution and duration even though the audio backend can be local."
  - "You are not using Claude Code, because the whole surface is a plugin plus an MCP server wired into that harness specifically."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language, topics and issue count came from the GitHub API. Backend table, free-tier quota, slash commands, install flow and the ffmpeg/audio parallel architecture are read from the official README; no video was processed during authoring."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

claude-video-vision is a Claude Code plugin backed by a Node.js MCP server. The server runs ffmpeg to extract frames and, in parallel, hands audio to one of three backends: the Gemini API (free tier of 1,500 requests per day), a local Whisper path via whisper.cpp or Python openai-whisper with models that auto-download on first use, or the OpenAI Whisper API. Frames are delivered to Claude as images and audio as transcription with timestamps. YouTube URLs are handled by yt-dlp inside the MCP server, which preserves source metadata and captions for context, and a slash command plus an interactive wizard cover configuration.

## Why it's in the Arsenal

The recurring problem is that a video is opaque to a text-and-image model unless someone decodes it into frames and a transcript. This plugin splits that work at the seam it controls: extraction and transcription are deterministic subprocess work, while interpretation stays with Claude. The design decision that matters operationally is the three-backend audio choice, because it lets the same workflow run fully offline on a Whisper build or lean on a cloud API when the transcript is not sensitive and speed matters.

## Architecture

The slash command /watch-video routes into a skill named video-perception, which invokes the MCP tool video_watch on the Node server. The server fans out: ffmpeg produces image frames while the selected audio backend transcribes concurrently, then both streams are returned to Claude as multimodal content plus timestamped text. Claude chooses the extraction parameters rather than the user specifying them, so phrases like the first second or summarize this one-hour lecture map to different fps, time-range and resolution combinations. Installation is through the Claude Code plugin marketplace, and the MCP server itself is pulled from npm via npx on first use with no build step.

## Ecosystem Position

This overlaps with the transcription entries in content/projects/inference-engines such as whisper and whisper-cpp, but it is not a transcription tool: those produce audio-to-text, this produces frames plus text and hands both to a coding agent. It competes with GPT-4o-style native video understanding in hosted models, where the vendor handles extraction for you, and it is an alternative to a manual ffmpeg-then-prompt workflow you would otherwise script. Compared with the other agent-system entries in this phase, most of which own a control loop, this one contributes a perception tool to someone else's loop, which is why the MCP server shape matters more than the harness choice.

## Getting Started

Add the marketplace and install the plugin inside Claude Code, one command at a time, then run the setup wizard:

```bash
# inside Claude Code
/plugin marketplace add https://github.com/jordanrendric/claude-video-vision
/plugin install claude-video-vision
/claude-video-vision:setup-video-vision
```

The MCP server auto-installs from npm via npx on first use. For local development, clone the repo and run `claude --plugin-dir /path/to/claude-video-vision`.

## Key Use Cases

1. Bug-repro walkthrough: point Claude at a screen recording and ask what text appears on screen at a specific timestamp, answered from high-resolution frames in a narrow time window.
2. Offline tutorial analysis: analyse a long lecture with local Whisper for audio and low-fps frames for visuals, keeping the whole media on your machine.
3. YouTube summarisation: pass a URL and let yt-dlp fetch the media, preserving captions and metadata so the summary is grounded in the original context.

## Strengths

- Three audio backends including a genuinely local whisper.cpp path, so sensitive recordings never leave the machine.
- Claude adapts fps, time range and resolution to the question instead of forcing one extraction setting on every clip.
- YouTube URLs work directly through yt-dlp without a manual download step.
- Installs as a normal Claude Code plugin with an MCP server fetched from npm, no build step or local toolchain needed.

## Limitations

Frame extraction cost scales with duration, fps and resolution, so long or high-resolution footage produces a large multimodal payload even when audio stays local. Only three audio backends exist, and the Gemini path is capped at 1,500 requests per day on the free tier, which a batch job will exhaust quickly. Local Whisper needs whisper.cpp or openai-whisper installed plus a one-off model download. The plugin is Claude-Code-specific by construction: there is no Codex, Cursor or standalone CLI surface, and the repository's last recorded commit is around a month behind several peers in this phase, so upstream API changes are the main breakage risk.

## Relation to the Arsenal

This entry is the perception-plugin member of content/projects/agent-systems, the one item here that contributes capability to a harness rather than being a harness. Its audio dependencies map directly onto content/projects/inference-engines entries such as whisper-cpp and faster-whisper, and the video frame extraction sits next to the ffmpeg-based tooling you will also find in the data-and-retrieval phase for document parsing. If you want the agent loop as well, the neighbouring coding agents in this phase (Codewhale, Whale, DeepSeek-Reasonix) give you that and would need this MCP server bolted on.

## Resources

- [GitHub — jordanrendric/claude-video-vision](https://github.com/jordanrendric/claude-video-vision)
- [npm package — claude-video-vision](https://www.npmjs.com/package/claude-video-vision)
- [Architecture and backend notes in the README](https://github.com/jordanrendric/claude-video-vision#architecture)
