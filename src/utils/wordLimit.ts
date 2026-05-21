export const MAX_NOTES_WORDS = 100;

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

/** Keeps at most `maxWords` words; preserves trailing space behavior for in-progress typing. */
export function limitToWordCount(text: string, maxWords: number): string {
  const trimmed = text.trim();
  if (!trimmed) return text.startsWith(' ') || text.includes('\n') ? text : '';
  const words = trimmed.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ');
}
