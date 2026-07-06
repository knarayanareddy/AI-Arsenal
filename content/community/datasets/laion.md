---
id: "laion"
title: "LAION (Large-scale Artificial Intelligence Open Network)"
entry_type: community
kind: dataset
url: "https://laion.ai/"
topics:
  - open-source
  - multimodal
  - safety
audience:
  - researcher
  - practitioner
access: public
activity_level: intermittent
activity_evidence: "Most recent major, confirmed release is Re-LAION-5B (2024-08-30); no dated 2026 major release found, though the org's dataset is still actively referenced in 2026-era third-party technical coverage (checked 2026-07-06)"
last_checked: "2026-07-06"
safety_level: caution
safety_notes:
  - "The original LAION-5B dataset was found by Stanford Internet Observatory researcher David Thiel (December 2023) to contain approximately 1,008 links to suspected child sexual abuse material (CSAM) among its 5.8 billion image-text pairs; LAION immediately took the dataset offline upon notification."
  - "LAION subsequently partnered with the Internet Watch Foundation (IWF), the Canadian Centre for Child Protection (C3P), and Stanford Internet Observatory to release a cleaned version, Re-LAION-5B (August 2024), removing 2,236 flagged links (a superset including the original 1,008)."
  - "Only use the audited Re-LAION-5B (or later) releases. Do not use pre-2024 mirrors or copies of the original LAION-5B dataset that predate the safety revision -- these are known to contain links to illegal material."
how_to_get_value:
  - "Only download Re-LAION-5B (research or research-safe variant) or later safety-revised releases directly from LAION's own site or Hugging Face -- never a pre-2024 third-party mirror of the original LAION-5B, which is known to contain flagged links"
  - "Understand the dataset's actual structure before using it: LAION datasets are index files of URLs and alt-text pairs, not hosted images -- you must fetch images yourself from the original (often no-longer-live) web sources, and budget significant storage/compute for any serious use (LAION-5B-scale work requires hundreds of GB of RAM and GPU infrastructure per multiple independent technical guides)"
what_to_avoid:
  - "Do not use or redistribute pre-2024 copies of the original (non-Re-LAION) LAION-5B dataset -- these are documented to contain links to suspected CSAM per the Stanford Internet Observatory's December 2023 report"
  - "Do not assume the cleaned Re-LAION-5B is risk-free for all use cases -- LAION's own release notes describe the 2,236 removed links as an upper bound based on partner organizations' known-hash databases, not a guarantee that all problematic content has been found; treat this as harm-reduction, not a zero-risk certification"
owner_org: "LAION (non-profit, Germany)"
cost: "free"
related_communities:
  - "eleutherai-discord"
last_reviewed: "2026-07-06"
enrichment_status: reviewed
enrichment_notes: "The CSAM finding and subsequent Re-LAION-5B remediation are corroborated across multiple independent, dated sources (Ars Technica, the-decoder.com, 404 Media, and LAION's own blog post), all describing consistent facts and figures (1,008 original flagged links, 2,236 removed in the cleaned release). This is treated as well-established, not a single-source claim."
---

## Overview

LAION is a German non-profit that builds and publishes large-scale, openly-licensed AI training datasets -- most notably the LAION-5B family of image-text pair datasets that underpinned early open text-to-image models such as Stable Diffusion. This entry is this vertical's deliberate `safety_level: caution` example: LAION's flagship dataset had a serious, well-documented safety incident, and using it responsibly requires specific, non-obvious precautions.

## Who it's for

Researchers and practitioners doing large-scale multimodal (image-text) training or research who need an open, non-proprietary dataset at web scale. Not a good fit for anyone without the infrastructure to work with multi-terabyte, industrial-scale data, and not a fit for anyone unwilling to follow the safety precautions below.

## What you'll get

- Free, openly-licensed (Creative-Commons-style), commercially-usable web-scale image-text pair datasets
- Transparent documentation of the dataset's construction pipeline (Common Crawl scraping, CLIP-based filtering) and, since 2024, of its safety-remediation process
- A track record of responding to a serious safety finding with a real, partnered remediation (not just a statement) -- see Activity & health

## How to get value fast

Only download the Re-LAION-5B (research or research-safe variant) or later safety-revised releases, obtained directly from LAION's own site or their official Hugging Face presence -- never a pre-2024 third-party mirror of the original LAION-5B. Understand before you start that LAION datasets are index files of URLs and alt-text, not hosted images; you fetch the images yourself from (often now-dead) original web sources, and serious use requires substantial storage and compute infrastructure.

## What to avoid

**Do not use or redistribute pre-2024 copies of the original, non-Re-LAION LAION-5B dataset.** Stanford Internet Observatory researcher David Thiel's December 2023 investigation found approximately 1,008 links to suspected CSAM among LAION-5B's 5.8 billion image-text pairs. Also do not treat the cleaned Re-LAION-5B as a zero-risk guarantee -- LAION's own release notes describe the 2,236 removed links as an upper bound derived from partner organizations' known-hash databases, which is harm reduction, not a certification that no problematic content remains.

## Activity & health

The most recent major, independently-confirmed release is Re-LAION-5B (2024-08-30). No dated 2026 major new dataset release from LAION was found within a reasonable search effort during this review, though multiple 2026-era third-party technical guides continue to actively reference and use Re-LAION-5B, indicating the dataset remains a live, in-use resource even without a confirmed new release this year (checked 2026-07-06). Rated `intermittent` to reflect this: the organization and dataset remain relevant and referenced, but no recent (2026) release activity could be confirmed.

## Safety & moderation

`safety_level: caution` -- see the `safety_notes` in the frontmatter and the "What to avoid" section above for the specific, actionable guidance. In summary: the original LAION-5B contained links to CSAM (found by Stanford Internet Observatory, December 2023, ~1,008 flagged links out of 5.8 billion pairs); LAION took it offline immediately and, partnering with the Internet Watch Foundation, the Canadian Centre for Child Protection, and Stanford Internet Observatory, released a cleaned Re-LAION-5B (August 2024) removing 2,236 flagged links. This is a caution, not an avoid: the organization's response (immediate takedown, transparent multi-partner remediation, ongoing invitation for community scrutiny) is a credible, verifiable safety process, and the cleaned dataset is currently used in legitimate 2026-era research. The caution is specifically about ensuring you use the correct (post-2024, safety-revised) version and are aware of the history, not a recommendation to avoid the organization or dataset entirely.

## Relation to the Arsenal

Related to [EleutherAI Discord](../chat/eleutherai-discord.md) as another community-driven open-AI-research organization with its own dataset work (e.g. the Common Pile), though LAION and EleutherAI are independent organizations with no formal affiliation.

## Resources

- [LAION (official site)](https://laion.ai/)
- [LAION's own blog post announcing Re-LAION-5B and describing the remediation process](https://laion.ai/blog/relaion-5b/)
- [Ars Technica: "Nonprofit scrubs illegal content from controversial AI training dataset"](https://arstechnica.com/tech-policy/2024/08/nonprofit-scrubs-illegal-content-from-controversial-ai-training-dataset/)
- [404 Media: independent corroborating report on the CSAM finding and cleanup](https://www.404media.co/massive-ai-dataset-back-online-after-being-cleaned-of-child-sexual-abuse-material/)

---
*Last reviewed: 2026-07-06 by @migration-agent*
