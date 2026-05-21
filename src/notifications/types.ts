export type NotificationPrefs = {
  /** User granted OS permission and opted in. */
  masterEnabled: boolean;
  drafts: boolean;
  monthly: boolean;
  refresh: boolean;
  periodEnd: boolean;
  reportingCalendar: boolean;
  educational: boolean;
  reengagement: boolean;
  initiatives: boolean;
};

export const DEFAULT_NOTIFICATION_PREFS: NotificationPrefs = {
  masterEnabled: false,
  drafts: true,
  monthly: true,
  refresh: true,
  periodEnd: true,
  reportingCalendar: true,
  educational: false,
  reengagement: true,
  initiatives: true,
};

export type NotificationKind =
  | 'draft'
  | 'monthly'
  | 'refresh_6'
  | 'refresh_12'
  | 'period_end'
  | 'reporting_calendar'
  | 'first_success'
  | 'educational'
  | 'reengagement'
  | 'initiative';

export type NotificationPayload = {
  kind: NotificationKind;
  assessmentId?: string;
};
