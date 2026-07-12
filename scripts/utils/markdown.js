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

export function stripNonRenderedMarkdown(markdown) {
  return String(markdown ?? '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .replace(/`[^`\n]*`/g, '');
}

function cleanExtractedUrl(url) {
  // A closing backtick is Markdown syntax, not part of the URL. Keep other
  // punctuation unchanged for compatibility with URLs that legitimately use
  // punctuation in their path/query; URL validation will handle the result.
  return url.replace(/[`]+$/g, '');
}

export function extractUrls(markdown) {
  const urls = new Set();
  for (const match of markdown.matchAll(/\bhttps?:\/\/[^\s)>'"]+/g)) urls.add(cleanExtractedUrl(match[0]));
  for (const match of markdown.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)) urls.add(cleanExtractedUrl(match[1]));
  return [...urls].filter(Boolean);
}
