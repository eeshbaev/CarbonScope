import { buildLocale } from '../buildLocale';

export const es = buildLocale({
  slogan: 'Calculadora rápida de emisiones Scope 1 y 2',
  common: {
    continue: 'Continuar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    letsStart: 'Empezar',
    backHome: 'Inicio',
    search: 'Buscar',
    settings: 'Ajustes',
    selectLanguage: 'Seleccionar idioma',
  },
  delete: {
    confirmTitle: '¿Eliminar evaluación?',
    confirmMessage: '¿Está seguro de que desea eliminar esta evaluación?',
  },
  onboarding: {
    title: 'Bienvenido a CarbonScope',
    subtitle: 'Cálculo simple de huella de carbono para empresas y profesionales ESG.',
    scope1Title: '¿Qué son las emisiones Scope 1?',
    scope1Body: 'Emisiones directas de diésel, gasolina y gas natural.',
    scope2Title: '¿Qué son las emisiones Scope 2?',
    scope2Body: 'Emisiones indirectas de electricidad comprada.',
    whyTitle: '¿Por qué CarbonScope?',
    whyBody:
      'CarbonScope ayuda a empresas, consultores y bancos a estimar emisiones según el GHG Protocol.',
  },
  home: {
    ghgAligned: 'Alineado con GHG Protocol',
    scopeCalculator: 'Calculadora Scope 1 y 2 CO₂',
    emptyTitle: 'Sin evaluaciones',
    emptyText: 'Pulse el botón inferior para crear su primera evaluación.',
    quickEditTitle: 'Actualización rápida',
    quickEditSubtitle:
      'Cambie una línea de combustible o electricidad sin abrir las pantallas completas de Scope 1 o 2.',
    quickEditCategory: 'Categoría',
    quickEditMonth: 'Mes',
    quickEditNeedDates:
      'Defina la fecha de inicio del informe en Datos de la empresa para editar valores mensuales.',
    quickEditSave: 'Guardar',
    quickEditSaving: 'Guardando…',
    quickEditSaved: 'Guardado.',
    quickEditFailed: 'No se pudo guardar. Inténtelo de nuevo.',
    quickEditAddData: 'Añadir o editar datos',
  },
  company: {
    selectCountry: 'Seleccionar país',
    searchCountry: 'Buscar países...',
    reportingPeriod: 'Período de informe',
    industryRequired: 'El sector es obligatorio',
    periodRequired: 'El período es obligatorio',
  },
  reportingPeriods: { '6_months': '6 meses', '1_year': '1 año' },
  results: { reportingPeriod: 'Período de informe' },
});
