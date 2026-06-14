# Source: ToolRadar "Featured in Techpresso"

This source file documents the third-party content used as research material for the entries populated on 2026-06-14.

## Citation

- **Source URL:** <https://toolradar.com/featured/techpresso>
- **Curator:** Techpresso editorial (Dupple)
- **Publication:** Techpresso daily newsletter (~500K+ subscribers)
- **Catalogue:** ToolRadar lists 1,126 hand-picked tools across 18 dated sections, with tool blurbs and categorization
- **Captured at:** 2026-06-14

## Use in AI Arsenal

We used this page as research material to:

1. Identify candidate AI/AI-adjacent engineering tools not yet in the Arsenal.
2. Confirm that already-listed tools (Playwright, Firecrawl, Instructor, Vercel) are still actively discussed.
3. Add a `buzz_sources` citation (for project entries) or a `Buzz & Reception` body section (for tool entries) linking back to the source.

## What we did NOT do

- We did **not** copy tool descriptions verbatim. Each Arsenal entry paraphrases the source's one-line description in our own words.
- We did **not** add tools whose category was outside AI/AI-adjacent engineering (personal finance, sports alarms, fitness tracking, etc.) — those would dilute the corpus.
- We did **not** make up GitHub URLs. Open-source projects were added only after web search verified their canonical GitHub repository.
- We did **not** set `cost_model: "free"` because that is not a value in our controlled vocabulary (`TAXONOMY.md`); we used `freemium` or `open-source` instead.

## Licensing and reuse

The ToolRadar / Techpresso page is a marketing/editorial product. We treated it as research material (analogous to a search engine result or RSS feed) and produced original derivative work, not verbatim reproduction. The licence of each tool listed on the page belongs to its respective vendor; the page's text itself was not copied into our Markdown files.

## Reproducibility

To re-run the population script:

```bash
node scripts/populate-from-toolradar.js
node scripts/enrich-with-buzz-sources.js
node scripts/generate:all
```

## Statistics

| Metric | Value |
|---|---:|
| Source tools reviewed | 1,126 |
| Candidate set (AI/AI-adjacent only) | ~120 |
| Project entries added (verified open-source) | 5 |
| Tool entries added (closed-source/SaaS) | 30 |
| Existing entries enriched with `buzz_sources` | 3 |
| Conflicts (entries already in repo) | 0 |
