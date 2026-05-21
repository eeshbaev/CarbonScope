import type { DeepPartial } from '../buildLocale';
import type { TranslationKeys } from '../locales/en';

/** Notification copy per locale (merged over English). */
export const NOTIFICATION_PATCHES: Record<string, DeepPartial<TranslationKeys>> = {
  ru: {
    notifications: {
      section: 'Уведомления',
      master: 'Напоминания и подсказки',
      masterHint:
        'Локальные напоминания по вашим оценкам (данные не покидают устройство).',
      drafts: 'Незавершённые оценки',
      monthly: 'Помесячный ввод',
      refresh: 'Обновление данных',
      periodEnd: 'Окончание отчётного периода',
      educational: 'Еженедельные insights (отчётность и климат)',
      educationalHint:
        'Необязательно. Одна короткая профессиональная заметка в неделю — без рекламы и давления.',
      reengagement: 'Напоминания вернуться',
      permissionTitle: 'Напоминания и профессиональные подсказки',
      permissionBody:
        'CarbonScope может напоминать об отчётных периодах, помесячном вводе и незавершённых оценках. Каждый тип можно отключить в настройках.',
      enable: 'Включить напоминания',
      notNow: 'Не сейчас',
      draftTitle: 'Незавершённая оценка',
      draftBody: 'У вас есть незавершённая оценка для {company}. Откройте CarbonScope, чтобы продолжить.',
      monthlyTitle: 'Помесячный ввод',
      monthlyBody: 'Добавьте данные за {month} для {company}{categories}.',
      refresh6Title: 'Пора обновить данные',
      refresh6Body:
        'Прошло 6 месяцев с последнего обновления {company}. Пересчитайте Scope 1 и 2 по актуальным данным.',
      refresh12Title: 'Годовое обновление',
      refresh12Body:
        'Прошло 12 месяцев с последнего обновления {company}. Обновите оценку для точной отчётности.',
      periodEndTitle: 'Скоро конец отчётного периода',
      periodEndBody:
        '{company}: отчётный период {period} заканчивается через 7 дней. Проверьте или завершите ввод.',
      firstSuccessTitle: 'Отчёт о выбросах готов',
      firstSuccessBody:
        'Откройте CarbonScope для просмотра и экспорта PDF. Совет: Scope 2 меняется при смене страны или объёма электроэнергии.',
      educationalTitle: 'Совет CarbonScope',
      reengagementTitle: 'Обновите углеродную оценку',
      reengagementBody:
        'Всё ещё отслеживаете {company}? Обновите топливо и электроэнергию за текущий период.',
    },
  },
};
