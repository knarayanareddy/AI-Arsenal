// Catalogue-wide frontmatter parse guard.
//
// Why this exists: a single entry with a plain YAML scalar containing ": "
// (e.g. `verdict_rationale: ... workflows: managing OAuth`) makes js-yaml
// throw. Because every validator and every generator parses the whole
// catalogue up front, one such file aborted `validate`, `validate:taxonomy`,
// `validate:structure`, `validate:paths`, `validate:refs`, every migration
// checker and three unit tests with an unhandled YAMLException stack trace --
// a red `main` whose failure gave no actionable per-file diagnosis.
//
// The per-file validators cannot catch this class: they never get to run. So
// the guard lives here, parses every Markdown surface consumed by the
// toolchain with the same hardened engine the validators use, and reports
// every unparseable file at once with the line that broke.
//
// Usage: node --test tests/catalogue-frontmatter.test.js

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';
import matter from '../scripts/utils/safe-matter.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Every Markdown surface that is parsed as frontmatter somewhere in the
// toolchain: shipped content, entry templates (scaffold output), and the
// meta/ prompt library.
const PATTERNS = ['content/**/*.md', 'templates/*.md', 'meta/**/*.md'];

function catalogueMarkdown() {
  const files = new Set();
  for (const pattern of PATTERNS) {
    for (const file of globSync(pattern, { cwd: REPO, nodir: true, posix: true })) files.add(file);
  }
  return [...files].sort();
}

test('every content/template/meta Markdown file has parseable frontmatter', () => {
  const files = catalogueMarkdown();
  assert.ok(files.length > 1000, `expected the catalogue, found ${files.length} files`);

  const failures = [];
  for (const file of files) {
    const source = fs.readFileSync(path.join(REPO, file), 'utf8');
    try {
      matter(source);
    } catch (error) {
      const line = error.mark ? `:${error.mark.line + 1}` : '';
      failures.push(`${file}${line} -- ${error.reason ?? error.message}`);
    }
  }

  assert.deepEqual(
    failures,
    [],
    'Unparseable YAML frontmatter. Quote any value containing ": " (e.g. \'a: b\').\n' +
      failures.map((failure) => `  - ${failure}`).join('\n')
  );
});
