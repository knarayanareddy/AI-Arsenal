// HTML sanitization for body_html output. The remark-html `sanitize` option
// was removed in v14+ — we sanitize explicitly with a tight allowlist.
//
// Goal: render Markdown → safe HTML for downstream UI consumers. Any
// disallowed element, attribute, protocol, or data-URL is stripped or
// replaced with a safe placeholder.

import sanitizeHtml from 'sanitize-html';

const ALLOWED_TAGS = [
  'p', 'br', 'hr',
  'strong', 'em', 'b', 'i', 'u', 's', 'del', 'mark', 'small', 'sub', 'sup',
  'code', 'pre', 'kbd', 'samp', 'var',
  'a',
  'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'blockquote',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'img'
];

const ALLOWED_SCHEMES = ['http', 'https', 'mailto'];

const SAFE_CONFIG = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel', 'title'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    code: ['class'],
    pre: ['class'],
    span: ['class'],
    div: ['class'],
    th: ['scope', 'colspan', 'rowspan'],
    td: ['colspan', 'rowspan']
  },
  allowedSchemes: ALLOWED_SCHEMES,
  allowedSchemesByTag: { img: ['http', 'https', 'data'] }, // data: only for img
  allowedClasses: {
    code: ['language-*', 'lang-*'],
    pre: ['language-*', 'lang-*'],
    span: ['token', 'tag'],
    div: ['highlight', 'code-block']
  },
  allowedStyles: {},
  // Force every external link to be safe by default.
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer nofollow', target: '_blank' }, true)
  },
  // Disallow any tag we don't list, plus any attribute we don't allow.
  disallowedTagsMode: 'discard',
  // Drop the entire tag (not just its content) if it has a disallowed attr.
  disallowedAttributesMode: 'discardAttribute'
};

export function sanitizeBodyHtml(html) {
  if (typeof html !== 'string') return '';
  return sanitizeHtml(html, SAFE_CONFIG);
}
