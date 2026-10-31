import { buildLocale } from '../buildLocale';

export const pt = buildLocale({
  slogan: 'Calculadora rápida de emissões Scope 1, 2 e 3',
  common: {
    continue: 'Continuar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    letsStart: 'Começar',
    backHome: 'Início',
    search: 'Pesquisar',
    settings: 'Definições',
    selectLanguage: 'Selecionar idioma',
  },
  delete: {
    confirmTitle: 'Eliminar avaliação?',
    confirmMessage: 'Tem a certeza de que deseja eliminar esta avaliação?',
  },
  onboarding: {
    title: 'Bem-vindo ao CarbonScope',
    subtitle: 'Cálculo simples da pegada de carbono para empresas e profissionais ESG.',
    scope1Title: 'O que são emissões Scope 1?',
    scope1Body: 'Emissões diretas de gasóleo, gasolina e gás natural.',
    scope2Title: 'O que são emissões Scope 2?',
    scope2Body: 'Emissões indiretas de eletricidade comprada.',
    whyTitle: 'Porquê CarbonScope?',
    whyBody:
      'O CarbonScope ajuda empresas, consultores e bancos a estimar emissões segundo o GHG Protocol.',
  },
  home: {
    ghgAligned: 'Alinhado com GHG Protocol',
    scopeCalculator: 'Calculadora Scope 1, 2 e 3 CO₂',
    emptyTitle: 'Sem avaliações',
    emptyText: 'Toque no botão abaixo para criar a primeira avaliação.',
    quickEditTitle: 'Atualização rápida',
    quickEditSubtitle:
      'Altere uma linha de combustível ou eletricidade sem abrir os ecrãs completos Scope 1 ou 2.',
    quickEditCategory: 'Categoria',
    quickEditMonth: 'Mês',
    quickEditNeedDates:
      'Defina a data de início do reporte em Informações da empresa para valores mensais.',
    quickEditSave: 'Guardar',
    quickEditSaving: 'A guardar…',
    quickEditSaved: 'Guardado.',
    quickEditFailed: 'Não foi possível guardar. Tente novamente.',
    quickEditAddData: 'Adicionar ou editar dados',
  },
  company: {
    selectCountry: 'Selecionar país',
    searchCountry: 'Pesquisar países...',
    reportingPeriod: 'Período de reporte',
    industryRequired: 'O setor é obrigatório',
    periodRequired: 'O período é obrigatório',
  },
  reportingPeriods: { '6_months': '6 meses', '1_year': '1 ano' },
  results: { reportingPeriod: 'Período de reporte' },
});
