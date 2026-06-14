import test from 'node:test';
import assert from 'node:assert/strict';
import { differenceInDays, parseISO, isValid } from 'date-fns';

test('parseISO handles YYYY-MM-DD format', () => {
  const date = parseISO('2026-06-13');
  assert.ok(isValid(date));
  assert.equal(date.getFullYear(), 2026);
  assert.equal(date.getMonth(), 5); // June is index 5
  assert.equal(date.getDate(), 13);
});

test('parseISO rejects invalid dates', () => {
  assert.equal(isValid(parseISO('not-a-date')), false);
  assert.equal(isValid(parseISO('2026-13-01')), false); // month 13
  assert.equal(isValid(parseISO('2026-02-30')), false); // Feb 30
});

test('differenceInDays computes days between dates', () => {
  const now = parseISO('2026-06-13');
  assert.equal(differenceInDays(now, parseISO('2026-06-13')), 0);
  assert.equal(differenceInDays(now, parseISO('2026-06-12')), 1);
  assert.equal(differenceInDays(now, parseISO('2026-05-13')), 31);
  assert.equal(differenceInDays(now, parseISO('2025-06-13')), 365);
});

test('stale threshold check (90 days)', () => {
  const today = parseISO('2026-06-13');
  const staleThreshold = 90;
  // March 16, 2026 → June 13, 2026 = 89 days: not stale
  assert.ok(differenceInDays(today, parseISO('2026-03-16')) < staleThreshold);
  // March 14, 2026 → June 13, 2026 = 91 days: stale
  assert.ok(differenceInDays(today, parseISO('2026-03-14')) > staleThreshold);
});
