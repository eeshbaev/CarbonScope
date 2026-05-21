import { buildLocale } from '../buildLocale';

export const de = buildLocale({
  slogan: 'Schneller Scope-1- und Scope-2-Rechner',
  common: {
    continue: 'Weiter',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    letsStart: 'Loslegen',
    backHome: 'Startseite',
    search: 'Suchen',
    settings: 'Einstellungen',
    selectLanguage: 'Sprache wählen',
  },
  delete: {
    confirmTitle: 'Bewertung löschen?',
    confirmMessage: 'Möchten Sie diese Bewertung wirklich löschen?',
  },
  onboarding: {
    title: 'Willkommen bei CarbonScope',
    subtitle: 'Einfache CO₂-Bilanzierung für Unternehmen und ESG-Profis.',
    scope1Title: 'Was sind Scope-1-Emissionen?',
    scope1Body: 'Direkte Emissionen aus Diesel, Benzin und Erdgas.',
    scope2Title: 'Was sind Scope-2-Emissionen?',
    scope2Body: 'Indirekte Emissionen aus eingekauftem Strom.',
    whyTitle: 'Warum CarbonScope?',
    whyBody:
      'CarbonScope hilft Unternehmen, Beratern und Banken, Emissionen nach GHG Protocol schnell zu schätzen.',
  },
  home: {
    ghgAligned: 'GHG Protocol konform',
    scopeCalculator: 'Scope-1- und Scope-2-CO₂-Rechner',
    emptyTitle: 'Noch keine Bewertungen',
    emptyText: 'Tippen Sie unten, um die erste Bewertung zu erstellen.',
    quickEditTitle: 'Schnell aktualisieren',
    quickEditSubtitle:
      'Eine Brennstoff- oder Stromzeile ändern, ohne die vollen Scope-1/2-Bildschirme zu öffnen.',
    quickEditCategory: 'Kategorie',
    quickEditMonth: 'Monat',
    quickEditNeedDates:
      'Legen Sie in den Unternehmensdaten ein Berichtsstartdatum fest, um Monatswerte zu bearbeiten.',
    quickEditSave: 'Speichern',
    quickEditSaving: 'Speichern…',
    quickEditSaved: 'Gespeichert.',
    quickEditFailed: 'Speichern fehlgeschlagen. Bitte erneut versuchen.',
    quickEditAddData: 'Daten hinzufügen oder bearbeiten',
  },
  company: {
    selectCountry: 'Land wählen',
    searchCountry: 'Länder suchen...',
    reportingPeriod: 'Berichtszeitraum',
    industryRequired: 'Branche ist erforderlich',
    periodRequired: 'Zeitraum ist erforderlich',
  },
  reportingPeriods: { '6_months': '6 Monate', '1_year': '1 Jahr' },
  results: { reportingPeriod: 'Berichtszeitraum' },
});
