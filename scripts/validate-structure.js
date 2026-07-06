#!/usr/bin/env node
import chalk from 'chalk';
import { getEntryFiles, readMarkdown, inferEntryType } from './utils/frontmatter.js';
import { REQUIRED_ENTRY_HEADINGS, extractHeadings } from './utils/markdown.js';
import { getChangedMarkdownFiles, isContentEntryCandidate } from './utils/changed-files.js';
import { fixTextFile } from './utils/formatting.js';

const AGENT_FRAMEWORK_HEADINGS = [
  'Overview',
  'Key Features',
  'Architecture Model',
  'Getting Started',
  'Best For',
  'Not Ideal For',
  'Comparison Context',
  'Resources',
  'Community Buzz'
];

// Projects-vertical reorganisation: the canonical body structure for a
// migrated project entry (see the projects-vertical-reorg brief). Applied
// only once an entry carries the new `phase` field, so unmigrated entries
// continue to validate against their pre-migration heading set during the
// folder-by-folder migration. See scripts/check-projects-migration-progress.js.
const PROJECT_HEADINGS_NEW = [
  'Overview',
  "Why it's in the Arsenal",
  'Architecture',
  'Ecosystem Position',
  'Getting Started',
  'Key Use Cases',
  'Strengths',
  'Limitations',
  'Relation to the Arsenal',
  'Resources'
];

const PAPER_HEADINGS = [
  'The Problem It Solved',
  'Key Contribution',
  'Results / Key Numbers',
  'How to Apply This Today',
  'Code / Implementation',
  'Further Reading'
];

// Research-vertical reorganisation: the canonical body structure for a
// migrated research entry (see the research-vertical-reorg brief). Applied
// only once an entry carries the new `phase` field, so unmigrated papers
// continue to validate against PAPER_HEADINGS during the folder-by-folder
// migration. See scripts/check-research-migration-progress.js.
const RESEARCH_HEADINGS_NEW = [
  'Overview',
  "Why it's in the Arsenal",
  'Core Contribution',
  'Key Results',
  'Methodology',
  'Practical Applicability',
  'Limitations & Critiques',
  'Reproductions & Follow-up Work',
  'Relation to the Arsenal',
  'Resources'
];

// Tips-vertical reorganisation: the canonical body structure for a migrated
// tip entry (see the tips-vertical-reorg brief). Applied only once an entry
// carries the new `phase` field, so unmigrated tips continue to validate
// against REQUIRED_ENTRY_HEADINGS during the folder-by-folder migration.
// See scripts/check-tips-migration-progress.js. Deliberately only 6
// sections (vs. 10-11 for other verticals) and a 400-word hard ceiling
// (enforced separately in tipContentChecks below) -- a tip that needs more
// structure than this is a guide or build-example, not a tip.
const TIP_HEADINGS_NEW = [
  'What & Why',
  'Before / After',
  'Implementation',
  'Gotchas',
  'When NOT to Apply',
  'Verification'
];

// Build-examples-vertical reorganisation: the canonical body structure for a
// migrated build example (see .migration/build-examples-audit-report.md and
// the build-examples-vertical-reorg brief). Applied only once an entry
// carries the new `phase` field, so unmigrated build examples continue to
// validate against the pre-existing 8-heading structure during the
// folder-by-folder migration. See
// scripts/check-build-examples-migration-progress.js. "What Can Go Wrong"
// and "Verify It Worked" are mandatory, first-class sections (per Persona
// 3/The Completeness Auditor and Builder Question 3/4) rather than being
// folded into a generic "Gotchas" section, and "Implementation" content is
// checked for a real code:prose ratio (buildExampleContentChecks below) so
// a migrated entry cannot silently regress back into Failure Mode 3 (the
// Disguised Architecture Essay).
const BUILD_EXAMPLE_HEADINGS_NEW = [
  "What You're Building",
  'Prerequisites',
  'Architecture Overview',
  'Implementation',
  'Verify It Worked',
  'What Can Go Wrong',
  'Cost',
  'Extensions',
  'Related Entries'
];

// Architectures-vertical reorganisation: the canonical body structure for
// an architecture entry (see the architectures-vertical-reorg brief). Most
// of the actual decision framework (approaches[], key_factors[],
// decision_tree, tradeoffs_as_of, common_mistakes[]) lives in structured
// frontmatter, not body prose -- unlike every other vertical, where the
// body IS the content. The body's job here is to elaborate on what the
// frontmatter states tersely: why the decision matters, a walkthrough of
// the decision tree in prose, per-approach depth beyond the one-line
// frontmatter description, and elaboration of the common mistakes. See
// architectureContentChecks below for the honesty/rigor checks (Failure
// Modes 1-3) layered on top of mere heading presence.
const ARCHITECTURE_HEADINGS = [
  'Overview',
  'The Decision',
  'Decision Framework',
  'Approach Deep-Dives',
  'Common Mistakes',
  'When This Guidance Might Be Outdated',
  'Related Decisions',
  'Resources'
];

// Observability-vertical reorganisation: the canonical, ORDER-ENFORCED body
// structure for an observability entry (see the observability-vertical-reorg
// brief, which explicitly states "EXACT order, do not reorder/rename").
// Unlike every other vertical's heading check (presence-only, order-
// agnostic), observability entries are checked for exact sequential order
// too -- see the STRICT_ORDER_TYPES set and the order-check logic below.
const OBSERVABILITY_HEADINGS = [
  'Overview',
  'What to Capture',
  'Instrumentation Contract',
  'Implementation',
  'Dashboards & Alerts',
  'Common Failure Modes',
  'Privacy & Governance',
  'Validation Checklist',
  'Relation to the Arsenal',
  'Resources'
];

// Community-vertical reorganisation: the canonical, ORDER-ENFORCED body
// structure for a community entry (see the community-vertical-reorg brief's
// Phase 3, "Markdown body sections (EXACT order)"). Mirrors observability's
// STRICT_ORDER_TYPES treatment rather than every other vertical's
// presence-only check.
const COMMUNITY_HEADINGS = [
  'Overview',
  "Who it's for",
  "What you'll get",
  'How to get value fast',
  'What to avoid',
  'Activity & health',
  'Safety & moderation',
  'Relation to the Arsenal',
  'Resources'
];

// Benchmarks-vertical reorganisation: the canonical, ORDER-ENFORCED body
// structure for a benchmark entry (see the benchmarks-vertical-reorg brief,
// Phase 3). Mirrors observability/community STRICT_ORDER_TYPES treatment.
const BENCHMARK_HEADINGS = [
  'Overview',
  'What it Measures (and what it doesn’t)',
  'Dataset & Protocol',
  'Metrics',
  'How to Run',
  'Known Issues, Leakage & Gaming Risks',
  'How to Interpret Scores',
  'Recommended Usage',
  'Related Benchmarks',
  'Relation to the Arsenal',
  'Resources'
];

// Types whose heading order is enforced strictly (not just presence), per
// their own vertical-reorg brief's explicit requirement.
const STRICT_ORDER_TYPES = new Set(['observability', 'community', 'benchmark']);

const typeHeadings = {
  project: REQUIRED_ENTRY_HEADINGS,
  tool: REQUIRED_ENTRY_HEADINGS,
  paper: PAPER_HEADINGS,
  tip: REQUIRED_ENTRY_HEADINGS,
  'build-example': [
    "What You're Building",
    'Architecture Overview',
    'Stack',
    'Prerequisites',
    'Key Implementation Steps',
    'Gotchas & Tips',
    'Full Reference Implementations',
    'Related Entries'
  ],
  person: ['Overview', 'Why Follow', 'Notable Work', 'Channels', 'Resources'],
  digest: ['TL;DR', 'Top Projects', 'Top Tools', 'Research Highlights', 'Architecture Notes', 'Community Signals', 'What to Watch Next Month'],
  guide: REQUIRED_ENTRY_HEADINGS,
  architecture: ARCHITECTURE_HEADINGS,
  observability: OBSERVABILITY_HEADINGS,
  community: COMMUNITY_HEADINGS,
  benchmark: BENCHMARK_HEADINGS
};


// Research-vertical reorganisation: pull a heading's body text (between this
// heading and the next `## `) so the checks below can look at actual content,
// not just heading presence. Used only for migrated research entries.
function sectionBody(content, heading) {
  const lines = content.split(/\r?\n/);
  const startIdx = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (startIdx === -1) return null;
  const rest = lines.slice(startIdx + 1);
  const endIdx = rest.findIndex((line) => /^##\s+/.test(line));
  return (endIdx === -1 ? rest : rest.slice(0, endIdx)).join('\n').trim();
}

const BANNED_PRACTICAL_APPLICABILITY_PHRASES = [
  'engineers should be aware of this',
  'engineers should read this',
  'read this paper',
  'this paper is important and engineers should read it'
];

const BANNED_LIMITATIONS_PHRASES = ['no known limitations'];

function researchContentChecks(file, content, errors, warnings) {
  const limitations = sectionBody(content, 'Limitations & Critiques');
  if (limitations !== null) {
    if (limitations.length === 0) errors.push(`${file}: "Limitations & Critiques" section must not be empty`);
    const lower = limitations.toLowerCase();
    for (const phrase of BANNED_LIMITATIONS_PHRASES) {
      if (lower.includes(phrase)) errors.push(`${file}: "Limitations & Critiques" must not read "${phrase}" -- state author-acknowledged limitations or "No post-publication challenges identified as of last_reviewed: {date}" instead`);
    }
  }

  const reproductions = sectionBody(content, 'Reproductions & Follow-up Work');
  if (reproductions !== null && reproductions.length === 0) {
    errors.push(`${file}: "Reproductions & Follow-up Work" section must not be empty`);
  }

  const practicalApplicability = sectionBody(content, 'Practical Applicability');
  if (practicalApplicability !== null) {
    if (practicalApplicability.length === 0) errors.push(`${file}: "Practical Applicability" section must not be empty`);
    const lower = practicalApplicability.toLowerCase().trim();
    for (const phrase of BANNED_PRACTICAL_APPLICABILITY_PHRASES) {
      if (lower === phrase || lower === `${phrase}.`) errors.push(`${file}: "Practical Applicability" must answer what an engineer DOES differently, not just "${phrase}"`);
    }
  }

  const overview = sectionBody(content, 'Overview');
  if (overview !== null && overview.length === 0) errors.push(`${file}: "Overview" section must not be empty`);

  // Research-specific integrity check (Phase 4 / Validator checklist item:
  // "No benchmark claim appears without a date"). Heuristic, so this is a
  // warning rather than a hard error -- it flags bullet lines in "Key
  // Results" that look like a benchmark/score claim (contain a percentage,
  // "pass@", "F1", "BLEU", "accuracy", or similar score-shaped text) but do
  // not carry a nearby 4-digit year, so a human can confirm/fix rather than
  // the check silently passing or false-failing on prose that only
  // discusses a benchmark without asserting a specific score.
  const keyResults = sectionBody(content, 'Key Results');
  if (keyResults !== null) {
    const scoreLikePattern = /(\d+(\.\d+)?\s?%|pass@\d+|\bF1\b|\bBLEU\b|\bEM\b|exact match|accuracy|perplexity)/i;
    const yearPattern = /\((19|20)\d{2}\)/;
    for (const line of keyResults.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('-') && !trimmed.startsWith('*')) continue;
      if (scoreLikePattern.test(trimmed) && !yearPattern.test(trimmed)) {
        warnings.push(`${file}: "Key Results" bullet looks like a benchmark/score claim but has no "(YYYY)" year nearby -- verify it is date-stamped: "${trimmed.slice(0, 100)}${trimmed.length > 100 ? '...' : ''}"`);
      }
    }
  }
}

const TIP_BANNED_WORDS = ['simply', 'just', 'easily', 'obviously'];
const TIP_BANNED_GOTCHA_PHRASES = ['none', 'use carefully', 'use with caution', 'be careful'];
const TIP_BANNED_SCOPE_PHRASES = ['applies universally', 'this applies to most systems', 'this applies universally'];
const TIP_VERB_PATTERN = /^(add|adopt|allowlist|ask|avoid|batch|benchmark|budget|cache|cap|checkpoint|choose|chunk|classify|compress|define|deny|detect|do not|don't|drop|enforce|ensure|evaluate|extract|fail|filter|flag|give|group|hash|inspect|keep|label|limit|log|make|match|measure|merge|name|never|order|parallelize|persist|pin|precompute|prefer|put|quantize|rank|reduce|redact|replay|require|reserve|restrict|retry|review|route|run|sandbox|scope|separate|set|skip|split|stream|store|summarize|tag|test|track|treat|tune|use|validate|verify|version|wrap|write)\b/i;

// Tips-vertical reorganisation: content-level checks for a migrated tip
// entry, mirroring researchContentChecks' pattern (heuristic checks beyond
// mere heading presence). Mirrors the Editor's non-negotiable Rules T-1
// through T-9 in the tips-vertical-reorg brief.
function countWords(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*`_-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

function tipContentChecks(file, content, data, errors, warnings) {
  // Rule T-1 / T-7: title and id must start with an imperative verb.
  if (typeof data.title === 'string' && !TIP_VERB_PATTERN.test(data.title.trim())) {
    warnings.push(`${file}: title "${data.title}" does not appear to start with an imperative verb (Rule T-1) -- verify manually, this check is a heuristic`);
  }
  if (typeof data.id === 'string' && !TIP_VERB_PATTERN.test(data.id.replace(/-/g, ' '))) {
    warnings.push(`${file}: id "${data.id}" does not appear to start with an imperative verb (Rule T-7) -- verify manually, this check is a heuristic`);
  }

  // Rule T-2: 400-word hard ceiling on the body (excluding headings/frontmatter).
  const bodyWithoutHeadings = content.replace(/^##.*$/gm, '');
  const wordCount = countWords(bodyWithoutHeadings);
  if (wordCount > 400) errors.push(`${file}: body is ${wordCount} words, exceeds the 400-word hard ceiling (Rule T-2) -- if it cannot be explained in 400 words, it is not a tip`);

  // Rule T-8: banned words signal a hidden gotcha.
  const lowerContent = content.toLowerCase();
  for (const word of TIP_BANNED_WORDS) {
    if (new RegExp(`\\b${word}\\b`).test(lowerContent)) errors.push(`${file}: body contains banned word "${word}" (Rule T-8) -- if it were ${word === 'simply' || word === 'easily' ? 'simple' : word}, engineers would not need the tip`);
  }

  // Rule T-4: Gotchas must be non-trivial.
  const gotchasSection = sectionBody(content, 'Gotchas');
  if (gotchasSection !== null) {
    if (gotchasSection.length === 0) errors.push(`${file}: "Gotchas" section must not be empty (Rule T-4)`);
    const lowerGotchas = gotchasSection.toLowerCase();
    for (const phrase of TIP_BANNED_GOTCHA_PHRASES) {
      if (lowerGotchas.includes(phrase)) errors.push(`${file}: "Gotchas" must not read "${phrase}" -- each gotcha must name a specific, observable failure mode (Rule T-4)`);
    }
  }
  if (Array.isArray(data.gotchas)) {
    if (data.gotchas.length === 0) errors.push(`${file}: frontmatter gotchas[] must not be empty (Rule T-4)`);
    for (const g of data.gotchas) {
      if (typeof g === 'string' && TIP_BANNED_GOTCHA_PHRASES.includes(g.trim().toLowerCase())) {
        errors.push(`${file}: frontmatter gotchas[] contains a non-specific placeholder ("${g}") (Rule T-4)`);
      }
    }
  }

  // Rule T-5: When NOT to Apply must be non-empty and not a universal-scope cop-out.
  const whenNotSection = sectionBody(content, 'When NOT to Apply');
  if (whenNotSection !== null) {
    if (whenNotSection.length === 0) errors.push(`${file}: "When NOT to Apply" section must not be empty (Rule T-5)`);
    const lowerWhenNot = whenNotSection.toLowerCase();
    for (const phrase of TIP_BANNED_SCOPE_PHRASES) {
      if (lowerWhenNot.includes(phrase)) errors.push(`${file}: "When NOT to Apply" must not read "${phrase}" -- if you cannot think of when NOT to apply this, it is a best practice, not a tip (Rule T-5)`);
    }
  }

  // Rule T-3: Before/After must not be the vague "worse/better" cop-out.
  const beforeAfterSection = sectionBody(content, 'Before / After');
  if (beforeAfterSection !== null) {
    if (beforeAfterSection.length === 0) errors.push(`${file}: "Before / After" section must not be empty (Rule T-3)`);
    const lowerBeforeAfter = beforeAfterSection.toLowerCase();
    if (/before:\s*worse/.test(lowerBeforeAfter) && /after:\s*better/.test(lowerBeforeAfter)) {
      errors.push(`${file}: "Before / After" reads as "Before: worse. After: better." -- must be concrete (real code/config or specific numbers), not vague (Rule T-3)`);
    }
  }

  // Rule T-6: verification_status must be reflected honestly in the Verification section.
  const verificationSection = sectionBody(content, 'Verification');
  if (verificationSection !== null && data.verification_status) {
    const lowerVerification = verificationSection.toLowerCase();
    if (data.verification_status === 'production-verified' && !/production/.test(lowerVerification)) {
      warnings.push(`${file}: verification_status is "production-verified" but the Verification section does not mention production evidence (Rule T-6) -- verify manually`);
    }
    if (data.verification_status === 'theoretical' && !/(would confirm|not yet verified|theoretical)/.test(lowerVerification)) {
      warnings.push(`${file}: verification_status is "theoretical" but the Verification section does not state what would confirm it (Rule T-6) -- verify manually`);
    }
  }

  // Rule T-9: metrics values should look measured (not simply asserted with
  // no unit/percentage/number) unless explicitly marked as an estimate (~).
  if (Array.isArray(data.metrics)) {
    for (const m of data.metrics) {
      if (typeof m === 'string' && !/[\d%~]/.test(m)) {
        warnings.push(`${file}: metrics entry "${m}" does not look like a measured value (no number/percent/tilde) -- verify it is not an unmeasured assertion (Rule T-9)`);
      }
    }
  }

  // effort: "day" is the hard ceiling per Tip Effort taxonomy; anything
  // longer belongs in build-examples/ or architectures/, not this catalog.
  if (data.effort && !['minutes', 'hours', 'day'].includes(data.effort)) {
    errors.push(`${file}: effort "${data.effort}" is not one of minutes/hours/day -- if longer than a day, this is not a tip (Rule T-2's scope analog)`);
  }
}

// Build-examples-vertical reorganisation: content-level checks for a
// migrated build example, mirroring researchContentChecks'/
// tipContentChecks' pattern. Encodes the Builder's Six Questions and the
// three named failure modes (Incomplete Blueprint, Moving Target,
// Disguised Architecture Essay) as automatable checks where possible;
// anything that requires judgment (Q1 "can an engineer actually complete
// this?") is left to human/Builder-persona review and is not attempted
// here.
const BUILD_EXAMPLE_BANNED_GOTCHA_PHRASES = ['none', 'no known issues', 'nothing to worry about'];

function countCodeAndProseChars(sectionText) {
  const codeBlocks = sectionText.match(/```[\s\S]*?```/g) ?? [];
  const codeChars = codeBlocks.reduce((sum, block) => sum + block.length, 0);
  const proseChars = sectionText.replace(/```[\s\S]*?```/g, '').length;
  return { codeChars, proseChars };
}

function buildExampleContentChecks(file, content, data, errors, warnings) {
  // Failure Mode 3 (Disguised Architecture Essay): the Implementation
  // section must carry real code, and the code:prose ratio there must not
  // fall below 1:1, per Persona 3's non-negotiable rule.
  const implementation = sectionBody(content, 'Implementation');
  if (implementation !== null) {
    if (implementation.length === 0) errors.push(`${file}: "Implementation" section must not be empty`);
    const fenceCount = (implementation.match(/```/g) ?? []).length;
    if (fenceCount === 0) {
      errors.push(`${file}: "Implementation" section has no fenced code blocks -- a build example must show real, runnable code, not just prose steps (Failure Mode 3: Disguised Architecture Essay)`);
    } else if (fenceCount % 2 !== 0) {
      errors.push(`${file}: "Implementation" section has an unclosed code fence`);
    } else {
      const { codeChars, proseChars } = countCodeAndProseChars(implementation);
      if (codeChars < proseChars) {
        errors.push(`${file}: "Implementation" section code:prose ratio is below 1:1 (${codeChars} code chars vs ${proseChars} prose chars) -- if the ratio of prose to code exceeds 2:1 it is an architecture guide, not a build example (Failure Mode 3)`);
      }
    }
  }

  // Failure Mode 2 (The Moving Target): a build_status: tested entry must
  // show at least one pinned version (==, >=, or a bare semver-shaped
  // string) somewhere in the Implementation section's code, not just in
  // frontmatter tested_on -- otherwise the body text itself goes stale
  // silently even though the frontmatter claims verification.
  if (data.build_status === 'tested' && implementation !== null) {
    const hasPinnedVersion = /==\d|>=\d|\b\d+\.\d+\.\d+\b/.test(implementation);
    if (!hasPinnedVersion) {
      warnings.push(`${file}: build_status is "tested" but no pinned version pattern (e.g. "package==1.2.3") was found in "Implementation" -- verify manually that install commands are actually version-pinned (Builder Question 2 / Failure Mode 2)`);
    }
  }

  // Builder Question 3 / Failure Mode 1: "What Can Go Wrong" must name
  // real, specific failure modes -- at least 3 for intermediate/advanced,
  // at least 1 for starter, and never a non-answer like "None".
  const whatCanGoWrong = sectionBody(content, 'What Can Go Wrong');
  if (whatCanGoWrong !== null) {
    if (whatCanGoWrong.length === 0) errors.push(`${file}: "What Can Go Wrong" section must not be empty -- "None" is never acceptable (Builder Question 3)`);
    const lower = whatCanGoWrong.toLowerCase();
    for (const phrase of BUILD_EXAMPLE_BANNED_GOTCHA_PHRASES) {
      // Word-boundary match, not substring -- a bare "none" as a bullet's
      // entire answer is banned, but prose containing "none" as part of a
      // larger phrase (e.g. "not None", "nonetheless") must not false-flag.
      const pattern = new RegExp(`(^|\\n)\\s*[-*]?\\s*${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*($|\\n)`, 'i');
      if (pattern.test(lower)) errors.push(`${file}: "What Can Go Wrong" must not read "${phrase}" -- name at least one specific, observable failure mode (Builder Question 3)`);
    }
    const bulletCount = whatCanGoWrong.split(/\r?\n/).filter((line) => /^[-*]\s/.test(line.trim())).length;
    const minBullets = data.difficulty === 'starter' ? 1 : 3;
    if (bulletCount > 0 && bulletCount < minBullets) {
      warnings.push(`${file}: "What Can Go Wrong" has ${bulletCount} bullet(s); ${data.difficulty ?? 'intermediate/advanced'} build examples should document at least ${minBullets} failure modes (Builder Question 3) -- verify manually`);
    }
  }

  // Builder Question 4: "Verify It Worked" must state an observable,
  // author-independent success criterion, not just "it should work".
  const verifyItWorked = sectionBody(content, 'Verify It Worked');
  if (verifyItWorked !== null && verifyItWorked.length === 0) {
    errors.push(`${file}: "Verify It Worked" section must not be empty -- state a concrete, checkable success criterion (Builder Question 4)`);
  }

  // Builder Question 5: paid-API/cloud-compute builds must set
  // cost_estimate; "free with local models" is an acceptable value but the
  // field must be present, not silently omitted.
  const costSection = sectionBody(content, 'Cost');
  if (costSection !== null && costSection.length === 0 && !data.cost_estimate) {
    warnings.push(`${file}: "Cost" section is empty and frontmatter cost_estimate is not set -- confirm whether this build uses any paid API/compute (Builder Question 5)`);
  }
}

// Architectures-vertical reorganisation: content-level checks for an
// architecture entry, mirroring researchContentChecks'/tipContentChecks'/
// buildExampleContentChecks' pattern. Encodes the automatable subset of
// the Cartographer's Five Questions and the three named failure modes
// (Abstract Comparison, Outdated Tradeoff, Disguised Advocacy).
// Phrase-based, not bare-substring: "is better" alone false-positives on
// ordinary prose like "the fix is better parsing" (adjective modifying a
// noun, not an unconditional approach preference). Each pattern below
// requires the comparative/superlative construction that actually signals
// unconditional advocacy (a discrete "X is better than Y" or "X is the
// best" claim), not just the word "better" appearing anywhere.
const ARCHITECTURE_ADVOCACY_PATTERNS = [
  /\bis (clearly |definitely |simply )?better than\b/i,
  /\bis (clearly |definitely |simply )?the best\b/i,
  /\bis superior to\b/i,
  /\bis (clearly |definitely |simply )?the right choice\b/i,
  /\byou should always use\b/i,
  /\balways choose\b/i
];
const ARCHITECTURE_VAGUE_FACTOR_PATTERN = /\bit depends\b(?!.*\bon\b.*:)/i;

function architectureContentChecks(file, content, data, errors, warnings) {
  // Failure Mode 1 (The Abstract Comparison) / Cartographer Q3: an
  // architecture entry MUST carry a decision framework. This is already a
  // hard schema requirement (has_decision_framework: true), but re-check
  // here against the actual artifacts (decision_tree, approaches[].
  // tradeoffs, key_factors[]) so a fabricated 'true' with no real content
  // behind it is still caught.
  const hasRealFramework = Boolean(data.decision_tree) || (Array.isArray(data.key_factors) && data.key_factors.length >= 3);
  if (data.has_decision_framework && !hasRealFramework) {
    errors.push(`${file}: has_decision_framework is true but neither decision_tree nor a populated key_factors[] (>=3) was found -- a boolean claim with no underlying artifact is Failure Mode 1 (Cartographer Q3)`);
  }

  // Cartographer Q2: key_factors must read as measurable/specific, not a
  // bare "it depends" cop-out with no named factors following it.
  if (ARCHITECTURE_VAGUE_FACTOR_PATTERN.test(content)) {
    warnings.push(`${file}: body contains "it depends" without an immediately following colon-delimited factor list -- Cartographer Q2 requires "it depends on these specific factors: [list]", not a bare cop-out`);
  }

  // Failure Mode 3 (Disguised Advocacy) / Honesty Auditor rule: never
  // write "Approach A is better" -- only "better when [conditions], worse
  // when [conditions]". Heuristic phrase-based check across the whole body.
  for (const pattern of ARCHITECTURE_ADVOCACY_PATTERNS) {
    const match = content.match(pattern);
    if (match) {
      warnings.push(`${file}: body contains advocacy-shaped phrase "${match[0]}" -- Honesty Auditor rule requires conditional framing ("better when X, worse when Y"), not an unconditional preference (Failure Mode 3) -- verify manually, this check is a heuristic`);
    }
  }

  // Failure Mode 2 (The Outdated Tradeoff): tradeoffs_as_of must not be
  // stale relative to last_reviewed by more than a few days -- if a
  // maintainer reviewed the entry but didn't re-verify tradeoffs in the
  // same pass, that's a real staleness risk worth flagging.
  if (data.tradeoffs_as_of && data.last_reviewed) {
    const tradeoffsDate = new Date(data.tradeoffs_as_of);
    const reviewedDate = new Date(data.last_reviewed);
    if (!Number.isNaN(tradeoffsDate.getTime()) && !Number.isNaN(reviewedDate.getTime()) && tradeoffsDate < reviewedDate) {
      warnings.push(`${file}: tradeoffs_as_of (${data.tradeoffs_as_of}) predates last_reviewed (${data.last_reviewed}) -- confirm tradeoffs were actually re-verified during the last review, not just the prose (Failure Mode 2)`);
    }
  }

  // confidence: evolving should be reflected honestly in the "When This
  // Guidance Might Be Outdated" section, mirroring tipContentChecks' Rule
  // T-6 pattern for verification_status.
  const outdatedSection = sectionBody(content, 'When This Guidance Might Be Outdated');
  if (outdatedSection !== null) {
    if (outdatedSection.length === 0) errors.push(`${file}: "When This Guidance Might Be Outdated" section must not be empty`);
    if (data.confidence === 'evolving' && !/(shift|chang|evolv|new)/i.test(outdatedSection)) {
      warnings.push(`${file}: confidence is "evolving" but "When This Guidance Might Be Outdated" does not name what might shift -- verify manually`);
    }
  }

  // Common mistakes must be specific, not a bare list of restated
  // approach names -- checked as a minimum-length heuristic per entry,
  // mirroring the schema's minItems: 2 with an added specificity signal.
  if (Array.isArray(data.common_mistakes)) {
    for (const mistake of data.common_mistakes) {
      if (typeof mistake === 'string' && mistake.trim().split(/\s+/).length < 5) {
        warnings.push(`${file}: common_mistakes entry "${mistake}" looks too short to explain why the mistake fails (Cartographer Q5 expects the mistake AND why it fails) -- verify manually`);
      }
    }
  }
}

// Observability-vertical reorganisation: content-level checks for an
// observability entry, mirroring the pattern used by every other
// vertical's *ContentChecks function. Encodes the automatable subset of
// the Instrumentation Engineer's Six Questions and the Validator's
// integrity checklist, targeting the vertical's three named failure
// modes: (1) vendor pages disguised as guidance, (2) abstract advice with
// no instrumentation contract, (3) PII-unsafe suggestions.
const OBSERVABILITY_UNSAFE_LOGGING_PATTERN = /\blog(?:ging)?\s+(?:the\s+)?(?:raw\s+)?(?:prompts?|responses?|user (?:input|data|messages?))\b(?!.{0,120}(?:redact|scrub|mask|strip|anonymiz|pii))/i;
const OBSERVABILITY_VENDOR_MARKETING_PATTERN = /\b(industry[- ]leading|best[- ]in[- ]class|revolutioniz\w*|game[- ]chang\w*|cutting[- ]edge|seamlessly|effortlessly)\b/i;
const OBSERVABILITY_VAGUE_INSTRUMENTATION_PATTERN = /\b(?:monitor|log|track)\s+(?:latency|cost|quality|errors?|metrics?)\b(?!.{0,150}(?:field|span|event|schema|`))/i;

function observabilityContentChecks(file, content, data, errors, warnings) {
  // Failure Mode 3 (PII-unsafe suggestions): flag body prose that reads
  // like it's recommending logging raw prompts/responses/user data with
  // no nearby redaction/scrubbing/masking mention. Heuristic proximity
  // check (same paragraph-ish window), not a full NLP parse.
  if (OBSERVABILITY_UNSAFE_LOGGING_PATTERN.test(content)) {
    errors.push(`${file}: body appears to recommend logging raw prompts/responses/user data without nearby redaction guidance -- this vertical must never suggest unsafe logging (see "What You Must Never Do" in the reorg brief); add explicit redaction/retention guidance next to this recommendation or rephrase`);
  }

  // Failure Mode 1 (vendor pages disguised as guidance): flag marketing-
  // register language, which is a strong signal an entry has drifted from
  // "operational pattern" into "product pitch."
  const marketingMatch = content.match(OBSERVABILITY_VENDOR_MARKETING_PATTERN);
  if (marketingMatch) {
    warnings.push(`${file}: body contains marketing-register phrase "${marketingMatch[0]}" -- this vertical must describe operational patterns, not vendor marketing copy (Failure Mode 1) -- verify manually, this check is a heuristic`);
  }

  // Failure Mode 2 (abstract advice with no instrumentation contract):
  // flag generic "monitor X" / "log Y" phrasing with no nearby reference
  // to a concrete field/span/event/schema -- the textbook example named
  // directly in the brief ("monitor latency" without defining spans,
  // dimensions, sampling).
  const vagueMatch = content.match(OBSERVABILITY_VAGUE_INSTRUMENTATION_PATTERN);
  if (vagueMatch) {
    warnings.push(`${file}: body contains abstract instrumentation advice ("${vagueMatch[0]}") with no nearby field/span/event/schema reference -- Failure Mode 2 requires a concrete instrumentation contract, not abstract advice -- verify manually, this check is a heuristic`);
  }

  // Validator rule: no "production-verified" without a described evidence
  // type somewhere in Validation Checklist or Resources.
  if (data.verification_status === 'production-verified') {
    const validationSection = sectionBody(content, 'Validation Checklist') ?? '';
    const resourcesSection = sectionBody(content, 'Resources') ?? '';
    const evidenceHint = /(production|named system|incident|measured|before\/after|case study|deployment)/i;
    if (!evidenceHint.test(validationSection) && !evidenceHint.test(resourcesSection)) {
      errors.push(`${file}: verification_status is "production-verified" but neither "Validation Checklist" nor "Resources" describes an evidence type (named system, incident, measured before/after) -- never claim production-verified without describing the evidence (Validator rule)`);
    }
  }

  // Section-specific rules from Phase 3's "Section rules":
  const whatToCapture = sectionBody(content, 'What to Capture');
  if (whatToCapture !== null) {
    if (whatToCapture.length === 0) errors.push(`${file}: "What to Capture" section must not be empty`);
    const bulletLines = whatToCapture.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const nonBulletLines = bulletLines.filter((l) => !/^\s*[-*]\s/.test(l));
    if (nonBulletLines.length > 0) {
      warnings.push(`${file}: "What to Capture" should be bullets, not prose (Phase 3 section rule) -- verify manually`);
    }
  }

  const instrumentationContractSection = sectionBody(content, 'Instrumentation Contract');
  if (instrumentationContractSection !== null) {
    if (instrumentationContractSection.length === 0) errors.push(`${file}: "Instrumentation Contract" section must not be empty`);
    if (!/```json/i.test(instrumentationContractSection)) {
      errors.push(`${file}: "Instrumentation Contract" section must include at least one example event payload in a \`\`\`json code block (Phase 3 section rule)`);
    }
  }

  const implementationSection = sectionBody(content, 'Implementation');
  if (implementationSection !== null) {
    if (implementationSection.length === 0) errors.push(`${file}: "Implementation" section must not be empty`);
    if (!/```(python|bash|yaml|json|javascript|typescript)/i.test(implementationSection)) {
      errors.push(`${file}: "Implementation" section must include at least one real code or config snippet (Phase 3 section rule: Python preferred)`);
    }
  }

  const dashboardsSection = sectionBody(content, 'Dashboards & Alerts');
  if (dashboardsSection !== null) {
    const hasAlertRuleField = Array.isArray(data.alert_rules) && data.alert_rules.length >= 1;
    const hasAlertRuleInBody = /alert/i.test(dashboardsSection);
    if (!hasAlertRuleField && !hasAlertRuleInBody) {
      errors.push(`${file}: "Dashboards & Alerts" must include at least 1 alert rule, and frontmatter alert_rules[] should be populated (Phase 3 section rule)`);
    }
  }

  const privacySection = sectionBody(content, 'Privacy & Governance');
  if (privacySection !== null) {
    if (privacySection.length === 0) errors.push(`${file}: "Privacy & Governance" section must not be empty (mandatory per the reorg brief, never optional)`);
    else {
      const mentionsRedaction = /redact|scrub|mask|strip|anonymiz/i.test(privacySection);
      const mentionsRetention = /retention|retain\w*|delet\w*|expir\w*|ttl\b/i.test(privacySection);
      const mentionsAccess = /access|who can|permission|role|authoriz/i.test(privacySection);
      if (!mentionsRedaction || !mentionsRetention) {
        errors.push(`${file}: "Privacy & Governance" must state what is redacted AND the retention policy (Phase 3 section rule) -- currently missing ${!mentionsRedaction ? 'redaction' : ''}${!mentionsRedaction && !mentionsRetention ? ' and ' : ''}${!mentionsRetention ? 'retention' : ''} guidance`);
      }
      if (!mentionsAccess) {
        warnings.push(`${file}: "Privacy & Governance" does not clearly state who can access raw traces/logs -- the reorg brief requires stating this explicitly -- verify manually`);
      }
    }
  }

  const validationChecklistSection = sectionBody(content, 'Validation Checklist');
  if (validationChecklistSection !== null) {
    const checkboxCount = (validationChecklistSection.match(/^\s*-\s*\[[ xX]\]/gm) ?? []).length;
    if (checkboxCount < 5 || checkboxCount > 10) {
      errors.push(`${file}: "Validation Checklist" has ${checkboxCount} checkbox item(s); the reorg brief requires 5-10 checkboxes an engineer can actually verify`);
    }
  }

  const relationSection = sectionBody(content, 'Relation to the Arsenal');
  if (relationSection !== null) {
    const hasAnyRelated = ['related_tools', 'related_projects', 'related_build_examples', 'related_tips'].some((f) => Array.isArray(data[f]) && data[f].length > 0);
    if (hasAnyRelated && relationSection.length === 0) {
      errors.push(`${file}: frontmatter declares related_* entries but "Relation to the Arsenal" section is empty -- must include the actual cross-links (Phase 3 section rule)`);
    }
  }

  // Instrumentation Engineer Question 3 (how are prompts/responses handled
  // safely) and Question 5 (failure modes) -- re-verify frontmatter
  // common_failure_modes has at least 2 entries when scope is production,
  // matching the brief's "at least 2 failure modes" requirement.
  if (data.scope === 'production' && (!Array.isArray(data.common_failure_modes) || data.common_failure_modes.length < 2)) {
    warnings.push(`${file}: scope is "production" but common_failure_modes[] has fewer than 2 entries -- Instrumentation Engineer Question 5 requires at least 2 failure modes for production-scope entries -- verify manually`);
  }
}

// Community-vertical reorganisation: content-quality gates targeting the
// vertical's four named failure modes -- (1) stale pointers, (2) vibes-only
// descriptions with no concrete signals, (3) unsafe recommendations without
// caution notes, (4) mixing entity types without clear typing -- plus the
// Phase 3 "Section rules" and the Validator persona's integrity checklist.
const COMMUNITY_VIBES_ONLY_PATTERN = /\b(great|awesome|amazing|excellent|fantastic|wonderful)\s+(community|resource|space|group)\b(?!.{0,150}(?:\d|active|post|member|issue|event|episode))/i;

function communityContentChecks(file, content, data, errors, warnings) {
  // Failure Mode 2 (vibes-only descriptions): flag generic praise adjectives
  // applied to "community"/"resource" with no nearby concrete number/signal
  // word within the same general vicinity. Heuristic, not NLP.
  const vibesMatch = content.match(COMMUNITY_VIBES_ONLY_PATTERN);
  if (vibesMatch) {
    warnings.push(`${file}: body contains vibes-only praise ("${vibesMatch[0]}") with no nearby concrete signal (a number, date, or named activity) -- Failure Mode 2 requires concrete evidence, not adjectives -- verify manually, this check is a heuristic`);
  }

  // Failure Mode 3 (unsafe recommendations without caution notes) is
  // primarily enforced structurally via the schema's allOf/if/then
  // (safety_notes required when safety_level != generally-safe), but also
  // re-verify the body's "Safety & moderation" section actually says
  // something concrete when a caution/avoid rating is set, rather than
  // just satisfying the frontmatter array's minItems.
  const safetySection = sectionBody(content, 'Safety & moderation');
  if (data.safety_level && data.safety_level !== 'generally-safe') {
    if (safetySection === null || safetySection.length === 0) {
      errors.push(`${file}: safety_level is "${data.safety_level}" but "Safety & moderation" section is missing or empty -- must explicitly state the concern (Phase 3 section rule: "must be explicit when safety_level != generally-safe")`);
    }
  }

  // Activity & health section rule: must repeat activity_evidence content
  // and the last_checked date, not just restate activity_level.
  const activitySection = sectionBody(content, 'Activity & health');
  if (activitySection !== null) {
    if (activitySection.length === 0) {
      errors.push(`${file}: "Activity & health" section must not be empty`);
    } else {
      if (data.last_checked && !activitySection.includes(data.last_checked)) {
        errors.push(`${file}: "Activity & health" section must repeat the last_checked date (${data.last_checked}) per the Phase 3 section rule`);
      }
    }
  }

  // "How to get value fast" / "What to avoid" must be concrete, not a pure
  // link dump -- re-check the body sections have actual guidance text, not
  // just a bare list of links (Validator rule: "No entry is a pure link
  // dump; must include actionable guidance").
  const howToSection = sectionBody(content, 'How to get value fast');
  if (howToSection !== null) {
    const nonLinkLines = howToSection.split(/\r?\n/).filter((l) => l.trim().length > 0 && !/^\s*[-*]\s*\[[^\]]*\]\([^)]*\)\s*$/.test(l.trim()));
    if (howToSection.trim().length > 0 && nonLinkLines.length === 0) {
      errors.push(`${file}: "How to get value fast" reads as a pure link dump (only bare links, no guidance text) -- must include actionable steps (Validator rule)`);
    }
  }

  // Overview / Who it's for / What you'll get must be non-empty.
  for (const heading of ['Overview', "Who it's for", "What you'll get", 'What to avoid']) {
    const body = sectionBody(content, heading);
    if (body !== null && body.length === 0) errors.push(`${file}: "${heading}" section must not be empty`);
  }

  // Resources must include the main URL.
  const resourcesSection = sectionBody(content, 'Resources');
  if (resourcesSection !== null && data.url && !resourcesSection.includes(data.url)) {
    errors.push(`${file}: "Resources" section must include the main URL (${data.url}) per the Phase 4 Structure rule`);
  }
}

const changedOnly = process.argv.includes('--changed-only');
const fix = process.argv.includes('--fix');
const errors = [];
const warnings = [];
let fixed = 0;
let checked = 0;

for (const file of await getEntryFiles(changedOnly ? getChangedMarkdownFiles().filter(isContentEntryCandidate) : null)) {
  if (fix && await fixTextFile(file)) fixed += 1;
  const { data, content, hasFrontmatter } = await readMarkdown(file);
  if (!hasFrontmatter) continue;
  const type = inferEntryType(file, data);
  let required;
  if (type === 'project' && data.phase) {
    // Migrated project entry: use the new canonical structure.
    required = PROJECT_HEADINGS_NEW;
  } else if (type === 'project' && data.category === 'agents' && data.subcategory === 'agent-frameworks') {
    required = AGENT_FRAMEWORK_HEADINGS;
  } else if (type === 'paper' && data.phase) {
    // Migrated research entry: use the new canonical structure.
    required = RESEARCH_HEADINGS_NEW;
  } else if (type === 'tip' && data.phase) {
    // Migrated tip entry: use the new canonical structure.
    required = TIP_HEADINGS_NEW;
  } else if (type === 'build-example' && data.phase) {
    // Migrated build example: use the new canonical structure.
    required = BUILD_EXAMPLE_HEADINGS_NEW;
  } else {
    required = typeHeadings[type] ?? REQUIRED_ENTRY_HEADINGS;
  }
  const headings = extractHeadings(content);
  for (const heading of required) {
    if (!headings.includes(heading)) errors.push(`${file}: missing required section "## ${heading}"`);
  }
  // Strict-order check (observability-vertical reorg brief: "EXACT order,
  // do not reorder/rename") -- only applied to types that opt into it,
  // since every other vertical checks presence only, not sequence.
  if (STRICT_ORDER_TYPES.has(type)) {
    const presentRequired = headings.filter((h) => required.includes(h));
    const expectedOrder = required.filter((h) => presentRequired.includes(h));
    for (let i = 0; i < presentRequired.length; i += 1) {
      if (presentRequired[i] !== expectedOrder[i]) {
        errors.push(`${file}: sections are out of order -- expected "## ${expectedOrder[i]}" at this position, found "## ${presentRequired[i]}" (observability entries require the exact canonical section order)`);
        break;
      }
    }
  }
// Benchmarks-vertical: content-level checks
function benchmarkContentChecks(file, content, data, errors, warnings) {
  // No undated SOTA claims – heuristic
  const sotaPattern = /\b(SOTA|state-of-the-art|best model|top model|#1|beats all)\b/i;
  const datePattern = /\b(20\d{2}-\d{2}-\d{2}|as of|20\d{2})\b/;
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    if (sotaPattern.test(line) && !datePattern.test(line)) {
      warnings.push(`${file}: possible undated SOTA/\"best model\" claim: "${line.trim().slice(0,120)}" – benchmark claims must include as_of date + leaderboard + protocol`);
    }
  }
  // Required sections non-empty
  const requiredSections = [
    'Known Issues, Leakage & Gaming Risks',
    'How to Interpret Scores',
    'How to Run',
    'Recommended Usage'
  ];
  for (const heading of requiredSections) {
    const body = sectionBody(content, heading);
    if (body !== null && body.length < 20) {
      errors.push(`${file}: "## ${heading}" section must not be empty – this is a required benchmark contract field`);
    }
  }
}

  if (type === 'paper' && data.phase) researchContentChecks(file, content, errors, warnings);
  if (type === 'tip' && data.phase) tipContentChecks(file, content, data, errors, warnings);
  if (type === 'build-example' && data.phase) buildExampleContentChecks(file, content, data, errors, warnings);
  if (type === 'architecture') architectureContentChecks(file, content, data, errors, warnings);
  if (type === 'observability') observabilityContentChecks(file, content, data, errors, warnings);
  if (type === 'community') communityContentChecks(file, content, data, errors, warnings);
  if (type === 'benchmark') benchmarkContentChecks(file, content, data, errors, warnings);
  checked += 1;
}


if (warnings.length) {
  console.warn(chalk.yellow(`Markdown structure validation warnings (${warnings.length}):`));
  for (const warning of warnings) console.warn(chalk.yellow(`- ${warning}`));
}

if (errors.length) {
  console.error(chalk.red(`Markdown structure validation failed with ${errors.length} error(s):`));
  for (const error of errors) console.error(chalk.red(`- ${error}`));
  process.exit(1);
}

console.log(chalk.green(`Markdown structure validation passed. Checked ${checked} content entr${checked === 1 ? 'y' : 'ies'}.${fix ? ` Fixed ${fixed} file(s).` : ''}`));
