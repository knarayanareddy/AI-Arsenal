export const REQUIRED_ENTRY_HEADINGS = [
  'Overview',
  "Why It's in the Arsenal",
  'Key Features',
  'Architecture / How It Works',
  'Getting Started',
  'Use Cases',
  'Strengths',
  'Limitations / When NOT to Use',
  'Integration Patterns',
  'Resources',
  'Buzz & Reception'
];

export function extractHeadings(markdown) {
  return markdown
    .split(/\r?\n/)
    .map((line) => line.match(/^##\s+(.+?)\s*$/)?.[1])
    .filter(Boolean);
}

export function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~\-|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractUrls(markdown) {
  const urls = new Set();
  for (const match of markdown.matchAll(/\bhttps?:\/\/[^\s)>'"]+/g)) urls.add(match[0]);
  for (const match of markdown.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)) urls.add(match[1]);
  return [...urls];
}
