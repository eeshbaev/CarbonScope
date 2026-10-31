import { buildLocale } from '../buildLocale';

export const fr = buildLocale({
  slogan: 'Calculateur rapide des émissions Scope 1, 2 et 3',
  common: {
    continue: 'Continuer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    letsStart: 'Commencer',
    backHome: 'Accueil',
    search: 'Rechercher',
    settings: 'Paramètres',
    selectLanguage: 'Choisir la langue',
  },
  delete: {
    confirmTitle: 'Supprimer l\'évaluation ?',
    confirmMessage: 'Voulez-vous vraiment supprimer cette évaluation ?',
  },
  onboarding: {
    title: 'Bienvenue sur CarbonScope',
    subtitle: 'Calcul simple de l\'empreinte carbone pour entreprises et professionnels ESG.',
    scope1Title: 'Qu\'est-ce que les émissions Scope 1 ?',
    scope1Body:
      'Émissions directes du carburant de l\'entreprise : diesel, essence et gaz naturel.',
    scope2Title: 'Qu\'est-ce que les émissions Scope 2 ?',
    scope2Body: 'Émissions indirectes de l\'électricité achetée.',
    whyTitle: 'Pourquoi CarbonScope ?',
    whyBody:
      'CarbonScope aide entreprises, consultants, banques et professionnels ESG à estimer rapidement les émissions selon le GHG Protocol.',
  },
  home: {
    ghgAligned: 'Aligné GHG Protocol',
    scopeCalculator: 'Calculateur Scope 1, 2 et 3 CO₂',
    emptyTitle: 'Aucune évaluation',
    emptyText: 'Appuyez sur le bouton ci-dessous pour créer une évaluation.',
    quickEditTitle: 'Mise à jour rapide',
    quickEditSubtitle:
      'Modifier une ligne de carburant ou d’électricité sans ouvrir les écrans Scope 1 ou 2 complets.',
    quickEditCategory: 'Catégorie',
    quickEditMonth: 'Mois',
    quickEditNeedDates:
      'Définissez une date de début de reporting dans les informations société pour les valeurs mensuelles.',
    quickEditSave: 'Enregistrer',
    quickEditSaving: 'Enregistrement…',
    quickEditSaved: 'Enregistré.',
    quickEditFailed: 'Enregistrement impossible. Réessayez.',
    quickEditAddData: 'Ajouter ou modifier des données',
  },
  company: {
    selectCountry: 'Choisir un pays',
    searchCountry: 'Rechercher un pays...',
    reportingPeriod: 'Période de reporting',
    industryRequired: 'Le secteur est obligatoire',
    periodRequired: 'La période est obligatoire',
  },
  reportingPeriods: { '6_months': '6 mois', '1_year': '1 an' },
  results: { reportingPeriod: 'Période de reporting' },
});
