import type { TranslationKeys } from './locales/en';
import { en } from './locales/en';

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/** Merge partial locale over English for missing nested keys. */
export function buildLocale(partial: DeepPartial<TranslationKeys>): TranslationKeys {
  return deepMerge(en, partial) as TranslationKeys;
}

/** Deep-merge multiple locale patch objects (order matters: later patches win per key). */
export function mergeLocalePatches(
  ...partials: (DeepPartial<TranslationKeys> | undefined)[]
): DeepPartial<TranslationKeys> {
  let acc: DeepPartial<TranslationKeys> = {};
  for (const partial of partials) {
    if (partial) {
      acc = deepMerge(acc as Record<string, unknown>, partial as Record<string, unknown>) as DeepPartial<TranslationKeys>;
    }
  }
  return acc;
}

function deepMerge<T extends Record<string, unknown>>(
  base: T,
  patch: DeepPartial<T>
): T {
  const out = { ...base };
  for (const key of Object.keys(patch) as (keyof T)[]) {
    const pv = patch[key];
    const bv = base[key];
    if (
      pv &&
      typeof pv === 'object' &&
      !Array.isArray(pv) &&
      bv &&
      typeof bv === 'object' &&
      !Array.isArray(bv)
    ) {
      out[key] = deepMerge(
        bv as Record<string, unknown>,
        pv as DeepPartial<Record<string, unknown>>
      ) as T[keyof T];
    } else if (pv !== undefined) {
      out[key] = pv as T[keyof T];
    }
  }
  return out;
}
