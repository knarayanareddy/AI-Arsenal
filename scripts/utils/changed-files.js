import { execFileSync } from 'node:child_process';

function inCI() {
  return process.env.GITHUB_ACTIONS === 'true' || process.env.CI === 'true';
}

// Resolve the comparison base. An explicit `base` wins; otherwise prefer the
// GitHub-provided base SHA (set in CI from the PR's base commit) before falling
// back to the local `origin/main` tracking ref.
function resolveBase(base) {
  if (base) return base;
  if (process.env.GITHUB_BASE_SHA) return process.env.GITHUB_BASE_SHA;
  return 'origin/main';
}

function runDiff(args) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
    .split(/\r?\n/)
    .filter(Boolean);
}

// Compute the list of files changed between `base` and `head`.
//
// In CI we FAIL CLOSED: if the merge-base diff cannot be computed we throw,
// rather than silently returning [] (which would let a changed-file validator
// report "0 changed entries" and pass a PR without inspecting anything). Set
// `strict: false` to opt into the local-developer fallbacks (HEAD~1, then the
// working-tree diff).
export function getChangedFiles({ base, head = 'HEAD', strict = inCI(), run = runDiff } = {}) {
  const resolvedBase = resolveBase(base);
  const primary = ['diff', '--name-only', `${resolvedBase}...${head}`];

  if (strict) {
    try {
      return run(primary);
    } catch (error) {
      throw new Error(
        `Unable to compute changed files against base "${resolvedBase}" (${error.message}). ` +
          'Refusing to fail open in CI — ensure the base ref is fetched ' +
          '(actions/checkout with fetch-depth: 0) and GITHUB_BASE_SHA is set.'
      );
    }
  }

  for (const args of [primary, ['diff', '--name-only', 'HEAD~1...HEAD'], ['diff', '--name-only']]) {
    try {
      return run(args);
    } catch {}
  }
  return [];
}

export function getChangedMarkdownFiles(options = {}) {
  return getChangedFiles(options).filter((file) => file.endsWith('.md'));
}

export function isContentEntryCandidate(file) {
  return file.startsWith('content/') && file.endsWith('.md') && !file.endsWith('/_index.md') && !file.endsWith('/_registry.md');
}
