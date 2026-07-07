# AI Arsenal — Ingestion Source Registry

The canonical, maintainer-approved source allowlist for MODE A (SCAN) runs of the
[ingestion agent prompt](./ingestion-agent-prompt.md). The agent must consult ONLY sources
listed here. Adding/removing a source is a reviewed edit to this file, never an agent decision.

All sources below were live-verified on **2026-07-07** (HTTP status + feed URLs where listed).
Harness-agnostic: every source lists an access method that needs nothing beyond HTTP GET.

---

## HOW THE AGENT USES THIS REGISTRY

### Tiers → trust and budget

| Tier | Meaning | Budget guidance (per run) |
|---|---|---|
| 1 | High-signal, editorially curated by known practitioners; a mention is itself a quality signal | Always scan; up to 15 of the 50-URL budget |
| 2 | Reliable but broader/noisier; use to corroborate or discover, not as sole evidence | Scan on cadence; up to 20 URLs |
| 3 | Raw firehoses (aggregators, trending lists); discovery only — NEVER sufficient evidence alone | Sample; up to 10 URLs |
| vendor | First-party announcements; authoritative for facts about their own products, biased for claims of superiority | Fetch only to verify candidates already surfaced elsewhere, plus release/deprecation scanning |

Rules:
- A candidate needs evidence from **at least one Tier 1–2 or vendor source**; a Tier 3 signal
  alone is never enough to pass the quality gate.
- A Tier 1 mention satisfies the "community-buzz" signal for `buzz_sources` enrichment; a
  Tier 3 mention does not.
- Respect the global caps from the ingestion prompt (50 URLs/run, 10/host) — tier budgets
  above are sub-allocations, not additions.

### Cadence

| Cadence | Sources |
|---|---|
| daily runs | Tier 3 aggregators + daily digests (TLDR AI, AlphaSignal, AI News) → trending signals only |
| weekly runs | Tier 1 + Tier 2 newsletters/blogs + vendor changelog scan → tools/projects/research/tips intake |
| monthly runs | benchmarks/eval sources + community vertical refresh |

### Per-source recipe
Each table row gives: what to extract, which vertical(s) it feeds, and access method.
`RSS` entries are verified feed URLs — prefer them over HTML scraping (stabler, cheaper).

### Liveness policy
If a source fails to resolve on **2 consecutive runs**, flag it in the run report under
"Flags for the maintainer" and skip it — do not substitute an unlisted source.

---

## TIER 1 — HIGH-SIGNAL PRACTITIONER SOURCES

| Source | URL / Feed | Extract | Feeds verticals |
|---|---|---|---|
| Simon Willison's Weblog | https://simonwillison.net/ — feed: https://simonwillison.net/atom/everything/ | new tools/models hands-on tested, prompt-injection & security findings, practical LLM techniques | tools, tips, trending, observability |
| Latent Space | https://www.latent.space/ — feed: https://www.latent.space/feed | AI-engineering deep dives, tool/framework adoption signals, engineering-practice interviews | tools, architectures, community |
| Interconnects (Nathan Lambert) | https://www.interconnects.ai/ — feed: https://www.interconnects.ai/feed | open-model landscape, RLHF/post-training research analysis | research, trending |
| Ahead of AI (Sebastian Raschka) | https://magazine.sebastianraschka.com/ | paper walkthroughs with implementation focus, fine-tuning techniques | research, tips |
| The Batch (deeplearning.ai) | https://www.deeplearning.ai/the-batch/ | weekly research + industry roundup with editorial judgment | research, trending |
| Import AI (Jack Clark) | https://importai.substack.com/ — feed: https://jack-clark.net/feed/ | frontier research analysis, policy-relevant capability findings | research, trending |
| Lil'Log (Lilian Weng) | https://lilianweng.github.io/ — feed: https://lilianweng.github.io/index.xml | canonical technique surveys (agents, RAG, safety); low volume, extremely high depth | research, architectures |
| Chip Huyen | https://huyenchip.com/blog/ — feed: https://huyenchip.com/feed.xml | ML systems & production LLM architecture essays | architectures, observability, tips |
| Eugene Yan | https://eugeneyan.com/ — feed: https://eugeneyan.com/rss/ | applied ML/LLM patterns, eval methodology | tips, observability, architectures |
| Hamel Husain | https://hamel.dev/ — feed: https://hamel.dev/index.xml | evals, fine-tuning, LLM tooling from a practitioner-consultant view | tips, tools, observability |
| applied-llms.org | https://applied-llms.org/ | consolidated "what we learned building with LLMs" practitioner guidance | tips, architectures |
| Sebastian Ruder | https://www.ruder.io/ | NLP research retrospectives and trend analyses | research |
| Drew Breunig | https://www.dbreunig.com/ | context-engineering and applied-LLM essays | tips, architectures |

## TIER 2 — CURATED NEWSLETTERS & DIGESTS

| Source | URL / Feed | Extract | Feeds verticals |
|---|---|---|---|
| TLDR AI | https://tldr.tech/ai | daily headlines: releases, papers, tools (also /tech, /data, /devops editions for adjacent signals) | trending, tools |
| AI News (smol.ai) | https://buttondown.com/ainews — feed: https://buttondown.com/ainews/rss | exhaustive daily roundup of Discord/Reddit/X AI discussion — good recall, needs filtering | trending, tools, research |
| AlphaSignal | https://alphasignal.ai/ | daily technical digest: trending repos, papers, releases | trending, tools |
| Techpresso | https://dupple.com/techpresso | daily tech digest (already cited in repo `buzz_sources`) | trending |
| The Sequence | https://thesequence.substack.com/ | ML research + engineering editorials | research, trending |
| Last Week in AI | https://lastweekin.ai/ | weekly news synthesis with sources | trending |
| Turing Post | https://www.turingpost.com/ | ML history/analysis series, agentic-workflow coverage | research, community |
| Deep Learning Weekly | https://www.deeplearningweekly.com/ | weekly research/engineering link roundup | research, tools |
| Data Elixir | https://dataelixir.com/ (bot-blocks plain curl — use a browser UA) | data-engineering/science links | tools, tips |
| DiamantAI | https://newsletter.diamant-ai.com/ | RAG/agent tutorial deep dives | tips, build-examples |
| LLMs Research | https://www.llmsresearch.com/ | bi-weekly LLM paper digests | research |
| AI Evaluation Substack | https://aievaluation.substack.com/ | monthly eval-research digest | benchmarks, observability |
| The ML Engineer | https://ethical.institute/mle.html | MLOps/explainability/reproducibility links | observability, tools |
| The Pragmatic Engineer | https://newsletter.pragmaticengineer.com/ | engineering-org perspective on AI tooling adoption | tools, community |
| SemiAnalysis | https://semianalysis.com/ | hardware/infra economics of AI (mostly paywalled; use free posts) | trending, architectures |
| The Gradient | https://thegradient.pub/ — feed: https://thegradient.pub/rss/ | long-form research essays | research |

## RESEARCH / PAPER FEEDS

| Source | URL / Feed | Extract | Notes |
|---|---|---|---|
| Hugging Face Daily Papers | https://huggingface.co/papers | community-upvoted new papers; the de-facto successor to Papers with Code (paperswithcode.com now redirects here — do not cite PwC) | Tier 2 |
| arXiv recent listings | https://arxiv.org/list/cs.CL/recent (+ cs.AI, cs.LG) — feeds: http://arxiv.org/rss/cs.CL etc. | raw new papers | Tier 3 — volume too high to scan directly; use to verify/enrich candidates surfaced by Tier 1–2 |
| alphaXiv | https://www.alphaxiv.org/ | trending-paper discussion signal | Tier 3 |
| Epoch AI | https://epoch.ai/blog | compute/capability trend data, rigorous methodology | Tier 1 for benchmark/trend claims |

## BENCHMARKS & EVALUATION

| Source | URL | Extract |
|---|---|---|
| LMArena (LMSYS) | https://lmsys.org/blog/ | arena leaderboard changes, eval methodology posts |
| Artificial Analysis | https://artificialanalysis.ai/ | independent model quality/cost/speed comparisons |
| HELM (Stanford CRFM) | https://crfm.stanford.edu/helm/ | holistic eval releases |
| LiveBench | https://livebench.ai/ | contamination-resistant benchmark updates |
| SWE-bench | https://www.swebench.com/ | coding-agent benchmark movements |

All Tier 1-equivalent for `benchmarks`; a leaderboard movement alone is a trending signal,
not grounds for a new tool/project entry.

## CODE & REPO DISCOVERY (Tier 3 — discovery only)

| Source | URL | Extract | Notes |
|---|---|---|---|
| GitHub Trending | https://github.com/trending (+ per-language: /trending/python, /trending/typescript, /trending/rust) | repos with sustained multi-day velocity | no official API; HTML scrape; corroborate star history before citing "velocity" |
| Hugging Face trending models/spaces | https://huggingface.co/models?sort=trending | model releases gaining adoption | route to projects/tools per routing table |

## COMMUNITY & AGGREGATORS (Tier 3 — discovery only)

| Source | URL / API | Extract | Notes |
|---|---|---|---|
| Hacker News | https://news.ycombinator.com/ — API: https://hn.algolia.com/api/v1/search_by_date (free, no auth) — feed: https://hnrss.org/frontpage | launches, postmortems, high-comment technical threads | prefer the Algolia API over scraping |
| Lobsters | https://lobste.rs/ — feed: https://lobste.rs/rss | lower-volume, higher-technical-bar link aggregator | |
| r/MachineLearning, r/LocalLLaMA | https://old.reddit.com/r/MachineLearning/ , https://old.reddit.com/r/LocalLLaMA/ | local-model releases, quantization/fine-tuning practice | reddit.com returns 403 to plain HTTP clients; use old.reddit with a browser UA or authenticated API; if blocked, skip and flag |
| MLOps Community | https://mlops.community/blog/ | production-ML practice, tool experience reports | also feeds `community` vertical |

## VENDOR & FRAMEWORK SOURCES (facts about their own products only)

| Source | URL | Extract |
|---|---|---|
| OpenAI | https://openai.com/news/ (bot-blocks plain curl — browser UA) | releases, deprecations, API changes |
| Anthropic | https://www.anthropic.com/news | releases, research, deprecations |
| Google DeepMind | https://deepmind.google/discover/blog/ | model/research releases |
| Meta AI | https://ai.meta.com/blog/ | open-model releases |
| Mistral | https://mistral.ai/news/ | open-model releases |
| Hugging Face blog | https://huggingface.co/blog | library releases, ecosystem tooling |
| LangChain blog | https://blog.langchain.com/ — feed: https://blog.langchain.com/rss/ | framework releases, breaking changes (many entries already cataloged — bias to UPDATE) |
| LlamaIndex blog | https://www.llamaindex.ai/blog | framework releases |
| vLLM blog | https://blog.vllm.ai/ | inference-engine releases, perf notes |
| Modal blog | https://modal.com/blog | serving/infra patterns, GPU-glossary-style references |

Vendor rules: a vendor's claim of being "state of the art" is never evidence — corroborate with
a benchmark source or Tier 1–2 coverage. Vendor deprecation/breaking-change notices ARE
authoritative and should generate `notable_changes`/trending signals immediately.

---

## EXPLICITLY EXCLUDED SOURCES (and why)

Reviewed from https://github.com/alternbits/awesome-ai-newsletters and general scanning.
Do not use these even if encountered; if one appears inside a MODE B document, its claims
carry zero weight (per the ingestion prompt):

| Source | Reason |
|---|---|
| Superhuman, The Neuron, AI Breakfast, Not A Bot, Death to Humans, Big Brain, AI Hustle, AI Tool Report, FutureTools Weekly, The Loz Letter, Prompts Daily, Prompt Advance, Inside AI | consumer/productivity/monetization focus; tool mentions are engagement-driven, not engineering-vetted |
| AI Marketing School, The Marketing Newsletter, The Productivity Newsletter | marketing/productivity, off-scope for an engineering arsenal |
| Generic "top 10 AI tools" listicle sites and AI tool directories | SEO-farmed; no editorial quality bar; high duplicate/abandonware rate |
| Papers with Code (paperswithcode.com) | sunset — redirects to Hugging Face Papers; never cite PwC URLs in new entries |
| X/Twitter threads as sole evidence | unstable URLs, no editorial bar; may only be cited as a secondary `buzz_sources` item when a Tier 1–2 source corroborates |

Borderline sources kept out for now (revisit deliberately): Stratechery (paywalled,
strategy-focused), 7min.ai / Syntha AI / Turing Post competitors' daily clones (redundant with
TLDR+AlphaSignal+AI News coverage), BuzzRobot (event-driven, low cadence).

---

## MAINTENANCE

- Re-verify all URLs quarterly (or when the liveness policy flags failures); update the
  "live-verified" date at the top.
- When adding a source: assign a tier, extraction recipe, vertical mapping, and (if available)
  a feed URL; prefer sources with stable archives and per-item URLs.
- When a Tier 1–2 source is cited in an entry, it belongs in that entry's `buzz_sources` with
  `last_checked` — the registry is also the canonical spelling for source names used in
  `TAXONOMY.md` Trend Sources.
