import { buildLocale } from '../buildLocale';

export const it = buildLocale({
  slogan: 'Calcolatore rapido emissioni Scope 1 e 2',
  common: {
    continue: 'Continua',
    cancel: 'Annulla',
    delete: 'Elimina',
    letsStart: 'Inizia',
    backHome: 'Home',
    search: 'Cerca',
    settings: 'Impostazioni',
    selectLanguage: 'Seleziona lingua',
  },
  delete: {
    confirmTitle: 'Eliminare la valutazione?',
    confirmMessage: 'Sei sicuro di voler eliminare questa valutazione?',
  },
  onboarding: {
    title: 'Benvenuto in CarbonScope',
    subtitle: 'Calcolo semplice dell\'impronta di carbonio per aziende e professionisti ESG.',
    scope1Title: 'Cosa sono le emissioni Scope 1?',
    scope1Body: 'Emissioni dirette da diesel, benzina e gas naturale.',
    scope2Title: 'Cosa sono le emissioni Scope 2?',
    scope2Body: 'Emissioni indirette dall\'elettricità acquistata.',
    whyTitle: 'Perché CarbonScope?',
    whyBody:
      'CarbonScope aiuta aziende, consulenti e banche a stimare le emissioni secondo il GHG Protocol.',
  },
  home: {
    ghgAligned: 'Allineato al GHG Protocol',
    scopeCalculator: 'Calcolatore Scope 1 e 2 CO₂',
    emptyTitle: 'Nessuna valutazione',
    emptyText: 'Tocca il pulsante in basso per creare la prima valutazione.',
    quickEditTitle: 'Aggiornamento rapido',
    quickEditSubtitle:
      'Modifica una voce di carburante o elettricità senza aprire le schermate complete Scope 1 o 2.',
    quickEditCategory: 'Categoria',
    quickEditMonth: 'Mese',
    quickEditNeedDates:
      'Imposta la data di inizio del reporting nelle Informazioni azienda per i valori mensili.',
    quickEditSave: 'Salva',
    quickEditSaving: 'Salvataggio…',
    quickEditSaved: 'Salvato.',
    quickEditFailed: 'Impossibile salvare. Riprova.',
    quickEditAddData: 'Aggiungi o modifica dati',
  },
  company: {
    selectCountry: 'Seleziona paese',
    searchCountry: 'Cerca paesi...',
    reportingPeriod: 'Periodo di rendicontazione',
    industryRequired: 'Il settore è obbligatorio',
    periodRequired: 'Il periodo è obbligatorio',
  },
  reportingPeriods: { '6_months': '6 mesi', '1_year': '1 anno' },
  results: { reportingPeriod: 'Periodo di rendicontazione' },
});
