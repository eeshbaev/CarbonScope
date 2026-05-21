/** Normalized key for matching assessments of the same company. */
export function normalizeCompanyKey(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}
