import { execFileSync } from 'node:child_process';

export function getChangedFiles({ base = 'origin/main', head = 'HEAD' } = {}) {
  const candidates = [
    ['diff', '--name-only', `${base}...${head}`],
    ['diff', '--name-only', 'HEAD~1...HEAD'],
    ['diff', '--name-only']
  ];
  for (const args of candidates) {
    try {
      const output = execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      return output.split(/\r?\n/).filter(Boolean);
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
