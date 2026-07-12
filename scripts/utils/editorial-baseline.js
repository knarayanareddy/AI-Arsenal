import crypto from 'node:crypto';

// Finding-level baseline for the full-catalog editorial gate (`--all`).
//
// A baseline entry suppresses ONE pre-existing editorial finding, identified by
// a stable fingerprint of `path + rule ID + normalized finding` — never by line
// number and never by a blanket file allowlist. This lets historical draft debt
// be tolerated while still failing on newly introduced findings and while a
// file that was allowlisted for one finding stays fully exposed to any other.
//
// Changed-file mode does NOT consult the baseline: added/modified entries must
// fail on every finding regardless of history.

export const BASELINE_VERSION = 1;

// Volatile numerics (character counts, etc.) are collapsed so a finding keeps a
// stable identity across edits that change the number but not the fact that the
// finding still applies. If the finding is actually resolved it disappears and
// becomes prunable; it never silently re-matches a different finding because the
// rule ID and file path are part of the fingerprint.
export function normalizeFinding(message) {
  return String(message ?? '')
    .replace(/\d+/g, '#')
    .replace(/\s+/g, ' ')
    .trim();
}

function hashParts(file, rule, normalized) {
  return crypto.createHash('sha256').update(`${file}\u0000${rule}\u0000${normalized}`).digest('hex').slice(0, 16);
}

export function fingerprintFromParts(file, rule, normalizedFinding) {
  return `${file}::${rule}::${hashParts(file, rule, normalizedFinding)}`;
}

export function computeFingerprint({ file, rule, message }) {
  return fingerprintFromParts(file, rule, normalizeFinding(message));
}

export function findingToBaselineEntry(finding) {
  const normalized = normalizeFinding(finding.message);
  return {
    fingerprint: fingerprintFromParts(finding.file, finding.rule, normalized),
    file: finding.file,
    rule: finding.rule,
    finding: normalized
  };
}

// Parse and validate a baseline document. Throws on malformed structure, on any
// entry whose fingerprint does not match its (file, rule, finding), and on
// duplicate fingerprints. Returns a Map keyed by fingerprint.
export function parseBaseline(raw) {
  let data;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    throw new Error(`editorial baseline is not valid JSON: ${error.message}`);
  }
  if (!data || typeof data !== 'object' || Array.isArray(data) || !Array.isArray(data.entries)) {
    throw new Error('editorial baseline must be an object with an "entries" array');
  }
  const byFingerprint = new Map();
  data.entries.forEach((entry, index) => {
    if (
      !entry ||
      typeof entry.fingerprint !== 'string' ||
      typeof entry.file !== 'string' ||
      typeof entry.rule !== 'string' ||
      typeof entry.finding !== 'string'
    ) {
      throw new Error(`editorial baseline entry ${index} is malformed (needs string fingerprint, file, rule, finding)`);
    }
    const expected = fingerprintFromParts(entry.file, entry.rule, entry.finding);
    if (entry.fingerprint !== expected) {
      throw new Error(`editorial baseline entry ${index} (${entry.file}) has a fingerprint that does not match its (file, rule, finding); regenerate the baseline`);
    }
    if (byFingerprint.has(entry.fingerprint)) {
      throw new Error(`editorial baseline contains a duplicate fingerprint: ${entry.fingerprint}`);
    }
    byFingerprint.set(entry.fingerprint, entry);
  });
  return byFingerprint;
}

// Partition current findings against a baseline map.
//   - newFindings: findings with no baseline entry (must fail CI).
//   - suppressed:  findings tolerated by an existing baseline entry.
//   - stale:       baseline entries whose finding no longer occurs (prunable;
//                  enforcing their removal keeps the baseline shrink-only).
export function applyBaseline(findings, baselineMap) {
  const seen = new Set();
  const suppressed = [];
  const newFindings = [];
  for (const finding of findings) {
    const fingerprint = computeFingerprint(finding);
    seen.add(fingerprint);
    if (baselineMap.has(fingerprint)) suppressed.push(finding);
    else newFindings.push(finding);
  }
  const stale = [...baselineMap.values()].filter((entry) => !seen.has(entry.fingerprint));
  return { newFindings, suppressed, stale };
}

// Deterministic on-disk shape: sorted entries plus a self-documenting _meta.
export function serializeBaseline(entries) {
  const sorted = [...entries].sort((a, b) =>
    a.file.localeCompare(b.file) || a.rule.localeCompare(b.rule) || a.fingerprint.localeCompare(b.fingerprint)
  );
  return `${JSON.stringify(
    {
      _meta: {
        version: BASELINE_VERSION,
        description:
          'Finding-level baseline of PRE-EXISTING full-catalog editorial findings. Each entry suppresses exactly one finding (path + rule + normalized finding). Changed-file validation ignores this file and stays strict.',
        generate: 'pnpm run editorial:baseline',
        prune: 'pnpm run editorial:baseline:prune',
        warning: 'Do not edit by hand. CI fails on findings not listed here and on stale (resolved) entries.',
        count: sorted.length
      },
      entries: sorted
    },
    null,
    2
  )}\n`;
}
