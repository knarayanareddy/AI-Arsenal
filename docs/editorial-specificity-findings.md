# Specificity rules — investigated and rejected (2026-09-28)

## What was asked

Add per-section specificity rules so the catalog's quality bar is higher for
current entries and for future contributions.

## What was built and measured

Four candidate probes, run against the whole catalog (1254 entries) and then
validated against a hand-picked set of known-good hand-written entries
(`agenticseek`, `candle`, `camel-ai`, `markitdown`, `bigcodebench`) versus known
weak ones (`jina-reader`, `vercel`):

1. `sectionLacksDetail` — section under a character/word floor
2. `sectionNoQuantifiedClaim` — no number, size, threshold or year in the section
3. `sectionNoNamedEntity` — fewer than 3 API fields, filenames, config keys,
   module names, protocol names or proper nouns
4. `sectionHedgeOnly` — two or more superlative/marketing adjectives

## Why they were rejected

**Probe 2 (`noQuantifiedClaim`) flags the best writing in the catalog.** 81-99%
of tool sections and 67-89% of project sections have no numeral. The
`agenticseek` Architecture section is unambiguously excellent — it names
`provider_name`, `provider_server_address`, `LM Studio`, `Selenium`,
`stealth_mode`, `config.ini`, `start_services.sh`, `cli.py` — and contains zero
digits. Requiring a number would reject it. The reason is structural: the
entries that are *good* say things ("this config key must be set to X"), while
the entries that are *weak* restate. Numerals are not the discriminator.

**Probe 3 (`noNamedEntity`) is worse than useless as a threshold.** Measured
flag rates against the hand-picked set:

| threshold   | known-good flagged | known-weak flagged |
|-------------|--------------------|--------------------|
| ids >= 2    | 10/51              | 9/19               |
| ids >= 3    | 19/51              | 13/19              |
| ids >= 4    | 26/51              | 16/19              |
| ids >= 5    | 28/51              | 19/19              |

At every threshold it flags *more* good entries than weak ones. It measures
technical vocabulary density, which hand-written entries do not need more of
than a generated entry happens to contain. It also penalises the correct style
for prose sections (Ecosystem Position is a comparison, not a spec sheet).

**Probe 4 (`hedgeOnly`) fires on 0/1254 entries** — it never fires at all, so it
adds no signal. The existing `SECTION_VIBES` rule already covers the real case
(two unbacked superlatives in one section), and its own comment records that
including words like "robust"/"powerful" produced false positives on
well-written entries.

**Probe 1 (`sectionLacksDetail`) duplicates rules that already pass.** The
current validator already enforces per-section length floors (160/180 chars,
80-char minimum) and those were what cleared the original 499 findings.

## Conclusion

A mechanical specificity bar cannot be added without making it worse than the
problem it solves. The failure mode is concrete: contributors would learn to
sprinkle identifiers and numerals into prose to pass a check, which produces
exactly the filler this whole effort removed — a section that satisfies
`ids >= 3` and `noQuantifiedClaim` while saying nothing is a *better* fake than
one that fails a length check.

The existing catalog-wide rules already catch the failure modes that are
mechanically detectable:

- `body-section-echoes-frontmatter` (a body section restating a frontmatter field)
- `generator-verdict-sentence` (the canned "included as a comparison point")
- `tldr-echoes-frontmatter` (a TL;DR assembled by concatenation)
- `repeated-paragraph` (identical prose across entries)
- `section-too-short` / `*-section-length` (below the analysis floor)
- `section-generic-praise` (unbacked superlatives)

What is left uncatchable by rule is the thing that actually matters: whether the
claims in a section are *true and useful for the named entry*. That is a
review question, not a lint question, and the repo already has a manual review
path (the editorial baseline, `last_reviewed` / `reviewed_by` frontmatter).

## If this is revisited

Do not add a specificity threshold to `validate-editorial-quality.js`. The
correct shape, if one is wanted, is a *review checklist* rather than a lint:
- does the section name a mechanism, a field, a file, a protocol or a threshold?
- could it be pasted onto a sibling entry with only the name changed?
- does it say what breaks, and at what threshold?

Those three questions catch what the probes above cannot, and they do not
penalise good prose for lacking numerals.
