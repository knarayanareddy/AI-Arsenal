// Internal (relative) link resolution helpers.
//
// Two validators already exist and neither covers this case:
//   - scripts/check-links.js extracts only absolute `https?://` URLs
//     (see extractUrls in utils/markdown.js), so it never looks at links
//     between entries;
//   - scripts/validate-references.js resolves frontmatter *ID* references
//     (alternatives, integrates_with, related_entries, ...), never body links.
//
// As a result a folder rename silently rotted 46 relative links across 33
// content files (architectures/decision-trees/ -> the five current
// architecture categories, tips-and-tricks/agent-engineering/ ->
// agents-and-orchestration/, plus repo-root-relative links that never
// resolved from the linking file at all). These helpers close that gap;
// scripts/validate-internal-links.js is the CLI that fails CI on them.

import fs from 'node:fs';
import path from 'node:path';
import { stripNonRenderedMarkdown } from './markdown.js';

// `scheme://host`, protocol-relative `//host`, and non-file schemes are the
// network checker's business, not ours. A bare `#fragment` is an in-page
// anchor; anchors are not validated here (heading slugs are a separate
// concern and GitHub's slug rules differ from ours).
const EXTERNAL_TARGET = /^(?:[a-z][a-z0-9+.-]*:)?\/\//i;
const NON_FILE_SCHEME = /^(?:mailto:|tel:|sms:|data:|blob:|javascript:)/i;

// HTML comments are not rendered, so template text inside them must not be
// link-checked (same rule as scripts/check-links.js). Re-applied until stable
// so overlapping comment markers cannot survive a single pass.
export function stripHtmlComments(markdown) {
  let previous;
  let current = String(markdown ?? '');
  do {
    previous = current;
    current = current.replace(/<!--[\s\S]*?-->/g, '');
  } while (current !== previous);
  return current;
}

export function isExternalTarget(target) {
  const value = String(target ?? '').trim();
  return value.startsWith('#') || EXTERNAL_TARGET.test(value) || NON_FILE_SCHEME.test(value);
}

// Inline links and images: [text](target), ![alt](target), with optional
// <angle brackets> and an optional "title". Code fences, inline code, and HTML
// comments are removed first so documentation snippets cannot produce findings.
export function extractInternalLinkTargets(markdown) {
  const source = stripHtmlComments(stripNonRenderedMarkdown(markdown));
  const targets = [];
  const pattern = /!?\[[^\]]*\]\(\s*(<[^>]*>|[^)\s]+)(?:\s+["'][^)]*["'])?\s*\)/g;
  for (const match of source.matchAll(pattern)) {
    let target = match[1].trim();
    if (target.startsWith('<') && target.endsWith('>')) target = target.slice(1, -1).trim();
    if (!target || isExternalTarget(target)) continue;
    targets.push(target);
  }
  return targets;
}

// Resolve a link target the way a Markdown renderer on GitHub would: relative
// to the linking file, with any fragment/query dropped. Returns null when the
// target carries no path at all (pure anchor), which callers skip.
export function resolveInternalTarget(fromFile, target) {
  let value = String(target ?? '').trim();
  if (value.startsWith('<') && value.endsWith('>')) value = value.slice(1, -1).trim();
  value = value.split('#')[0].split('?')[0];
  if (!value) return null;
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // A malformed percent-escape is not a decoding error we should swallow
    // silently: fall back to the raw bytes so the link is still checked.
  }
  return path.resolve(path.dirname(fromFile), decoded);
}

/**
 * Resolve every internal link in `files` and report the ones that do not exist.
 *
 * `readFile` / `exists` are injectable so tests can exercise the real logic
 * against an in-memory tree instead of fixtures on disk.
 *
 * @returns {{broken: Array<{file: string, target: string, resolved: string}>, checkedFiles: number, checkedLinks: number}}
 */
export function findBrokenInternalLinks(files, { readFile, exists } = {}) {
  const read = readFile ?? ((file) => fs.readFileSync(file, 'utf8'));
  const existsFn = exists ?? ((target) => fs.existsSync(target));
  const broken = [];
  const seen = new Set();
  let checkedLinks = 0;
  let checkedFiles = 0;

  for (const file of files) {
    let text;
    try {
      text = read(file);
    } catch {
      // Unreadable/absent file: the changed-file validator can legitimately be
      // handed a path that was deleted in the same commit. Not a link finding.
      continue;
    }
    checkedFiles += 1;
    for (const target of extractInternalLinkTargets(text)) {
      checkedLinks += 1;
      const resolved = resolveInternalTarget(file, target);
      if (!resolved) continue;
      if (existsFn(resolved)) continue;
      const key = `${file}::${target}`;
      if (seen.has(key)) continue;
      seen.add(key);
      broken.push({ file, target, resolved });
    }
  }

  return { broken, checkedFiles, checkedLinks };
}
