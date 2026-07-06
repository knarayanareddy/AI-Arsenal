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
  guide: REQUIRED_ENTRY_HEADINGS
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
      if (lower.includes(phrase)) errors.push(`${file}: "What Can Go Wrong" must not read "${phrase}" -- name at least one specific, observable failure mode (Builder Question 3)`);
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
  if (type === 'paper' && data.phase) researchContentChecks(file, content, errors, warnings);
  if (type === 'tip' && data.phase) tipContentChecks(file, content, data, errors, warnings);
  if (type === 'build-example' && data.phase) buildExampleContentChecks(file, content, data, errors, warnings);
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
