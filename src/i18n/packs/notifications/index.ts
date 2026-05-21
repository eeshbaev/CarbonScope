import type { DeepPartial } from '../../buildLocale';
import type { TranslationKeys } from '../../locales/en';
import { deNotifications } from './de';
import { esNotifications } from './es';
import { frNotifications } from './fr';
import { itNotifications } from './it';
import { jaNotifications } from './ja';
import { ptNotifications } from './pt';
import { ruNotifications } from './ru';
import { zhNotifications } from './zh';

function wrapNotifications(
  notifications: TranslationKeys['notifications']
): DeepPartial<TranslationKeys> {
  return { notifications };
}

/** Full notification strings per locale (UI + all educational tips). */
export const FULL_NOTIFICATION_LOCALES: Record<string, DeepPartial<TranslationKeys>> = {
  ru: wrapNotifications(ruNotifications),
  fr: frNotifications,
  de: deNotifications,
  es: wrapNotifications(esNotifications),
  pt: wrapNotifications(ptNotifications),
  it: wrapNotifications(itNotifications),
  ja: wrapNotifications(jaNotifications),
  zh: wrapNotifications(zhNotifications),
};
