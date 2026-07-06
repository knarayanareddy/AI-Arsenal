---
id: "github-trending"
title: "Source Feed: GitHub Trending"
entry_type: "trend"
kind: "source-feed"
status: "reviewed"
as_of: "2026-07-06"
signals_used:
  - github-stars-velocity
  - github-stars-total
  - github-activity
sources:
  - source: "github"
    url: "https://github.com/trending"
    last_checked: "2026-07-06"
    notes: "Primary upstream page for the GitHub Trending signal."
last_reviewed: "2026-07-06"
added_date: "2026-07-06"
added_by: "maintainer"
enrichment_status: "reviewed"
tags:
  - trending
---

## Overview

GitHub Trending is the daily and weekly list of repositories gaining stars fastest. It is the primary upstream for the `github-stars-velocity` signal used across Arsenal trend entries.

## What this source is

A public GitHub page that ranks repositories by star gain over the last day, week, or month. No API token is required to read it, and it is the most accessible real-time popularity signal for OSS AI projects.

## What signals we extract

- `github-stars-velocity` — star gain rate over the window.
- `github-stars-total` — cumulative stars (used by the Hall of Fame).
- `github-activity` — commit, release, and contributor movement around trending repos.

## Failure modes / bias

- **Survivorship and recency bias:** only surfaces repos already on GitHub and favours English-language, open-source, hype-cycle projects.
- **Star inflation:** bot or astroturfed stars and "star farming" distort velocity.
- **Timezone skew:** daily resets favour US-friendly windows, under-weighting activity elsewhere.

## How it affects the Arsenal

Feeds `trending_score` on project entries (via `scripts/calculate-trending.js`) and the weekly snapshot. Treat a star spike as a pointer to investigate, never as a verdict — always re-verify against release notes and community signals before publishing.

## Sources

- [GitHub Trending](https://github.com/trending) — last_checked 2026-07-06
