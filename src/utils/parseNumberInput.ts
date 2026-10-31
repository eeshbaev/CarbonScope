/**
 * Parse a user-typed non-negative number, accepting both "1,234.5" and "1.234,5" styles.
 * A lone comma followed by anything other than exactly three digits is treated as a
 * decimal separator ("2,5" → 2.5), otherwise as a thousands separator ("1,000" → 1000).
 */
export function parseNumberInput(raw: string): number {
  let s = raw.replace(/[\s  ']/g, '');
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma >= 0 && lastDot >= 0) {
    if (lastComma > lastDot) {
      s = s.replace(/\./g, '').replace(',', '.');
    } else {
      s = s.replace(/,/g, '');
    }
  } else if (lastComma >= 0) {
    const commaCount = (s.match(/,/g) ?? []).length;
    const decimals = s.length - lastComma - 1;
    s = commaCount === 1 && decimals !== 3 ? s.replace(',', '.') : s.replace(/,/g, '');
  }
  const n = parseFloat(s);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}
