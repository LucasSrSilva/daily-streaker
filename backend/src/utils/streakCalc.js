export function computeStreaks(dates) {
  if (!dates || dates.length === 0) return { current: 0, longest: 0 };
  const normalized = Array.from(new Set(dates.map(d => toDateString(d)))).sort();
  let longest = 0;
  let currentRun = 1;
  for (let i = 1; i < normalized.length; i++) {
    const prev = normalized[i - 1];
    const curr = normalized[i];
    if (isNextDay(prev, curr)) {
      currentRun += 1;
    } else {
      longest = Math.max(longest, currentRun);
      currentRun = 1;
    }
  }
  longest = Math.max(longest, currentRun);

  const today = toDateString(new Date());
  let current = 0;
  const set = new Set(normalized);
  let cursor = today;
  while (set.has(cursor)) {
    current += 1;
    cursor = previousDay(cursor);
  }
  return { current, longest };
}

function toDateString(d) {
  if (typeof d === 'string') return d;
  return d.toISOString().slice(0, 10);
}

function isNextDay(a, b) {
  const ad = new Date(a + 'T00:00:00Z');
  const bd = new Date(b + 'T00:00:00Z');
  return (bd - ad) === 24 * 60 * 60 * 1000;
}

function previousDay(s) {
  const d = new Date(s + 'T00:00:00Z');
  const prev = new Date(d.getTime() - 24 * 60 * 60 * 1000);
  return prev.toISOString().slice(0, 10);
}
