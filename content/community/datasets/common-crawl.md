---
id: "common-crawl"
title: "Common Crawl"
entry_type: community
kind: dataset
url: "https://commoncrawl.org/"
topics:
  - open-source
  - research
  - infra
audience:
  - researcher
  - practitioner
access: public
activity_level: active
activity_evidence: "The project blog shows posts dated 2026-07-03, 2026-06-30, and 2026-06-29, and the organization continues publishing new monthly-cadence crawl archives (checked 2026-07-08)"
last_checked: "2026-07-08"
safety_level: caution
safety_notes:
  - "Raw web-crawl data contains PII, copyrighted text, and toxic content by construction -- any training or analysis use requires your own filtering pipeline and a legal review appropriate to your jurisdiction and use case"
how_to_get_value:
  - "Don't download blindly -- each crawl is hundreds of terabytes; use the columnar index (or the CDX API) to select the domains/URL patterns you need before fetching WARC records"
  - "For LLM training use, start from an existing filtered derivative (e.g. FineWeb) rather than raw WARC files -- the filtering pipeline is most of the work and has been done well in public"
what_to_avoid:
  - "Don't treat crawl coverage as 'the whole web' -- politeness rules, robots.txt, and crawl-budget decisions mean coverage is broad but systematically incomplete, which biases any analysis that assumes completeness"
owner_org: "Common Crawl Foundation"
cost: "free (AWS Open Data; egress costs outside AWS)"
related_communities:
  - "laion"
last_reviewed: "2026-07-08"
enrichment_status: draft
enrichment_notes: "Activity evidence from dated blog posts fetched at check time; the derivative-first guidance cross-links to the fineweb entry added in the same batch."
---

## Overview

Common Crawl is the nonprofit web-scale crawl archive underlying much of modern LLM pretraining: monthly-cadence crawls of the public web published as WARC/WET/WAT files on AWS Open Data, with indexes for selective access. Most major open pretraining corpora (C4, RefinedWeb, FineWeb) are filtered derivatives of it.

## Who it's for

Researchers building or studying pretraining corpora, and practitioners who need large-scale web text or domain-specific web extractions.

## What you'll get

- Petabyte-scale, regularly refreshed raw web crawl data, free on AWS Open Data
- Columnar and CDX indexes enabling selective retrieval by domain or URL pattern without bulk download
- The common substrate for reproducing or extending public pretraining-corpus work

## How to get value fast

Decide first whether you need raw crawl data at all: for LLM training, filtered derivatives like FineWeb encode years of cleaning work and are the better starting point. If you do need raw data, use the columnar index with Athena/DuckDB to select records, then fetch only the matching WARC ranges.

## What to avoid

Don't assume completeness -- crawl coverage is broad but shaped by robots.txt and crawl-budget policy, so absence from the crawl is not absence from the web. And don't skip content filtering: raw crawl text is unusable for most purposes without it.

## Activity & health

The project blog shows recent posts dated 2026-07-03, 2026-06-30, and 2026-06-29, and new crawl archives continue to be published on the established monthly-style cadence (checked 2026-07-08). This supports `activity_level: active`.

## Safety & moderation

Rated `caution` for the data itself rather than the community: raw web crawls contain PII, copyrighted material, and toxic content by construction. Any downstream use needs a filtering pipeline and use-case-appropriate legal review.

## Relation to the Arsenal

The upstream substrate for the pretraining-data entries in this catalog; pairs directly with the `fineweb` dataset entry (a filtered derivative) and the data-strategy architecture decisions.

## Resources

- [Common Crawl](https://commoncrawl.org/)
- [Getting started / data access docs](https://commoncrawl.org/get-started)
- [Project blog (release announcements)](https://commoncrawl.org/blog)
