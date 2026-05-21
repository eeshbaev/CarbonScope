import type { TranslationKeys } from '../../locales/en';

export const esNotifications: TranslationKeys['notifications'] = {
  section: 'Notificaciones',
  master: 'Recordatorios y orientación',
  masterHint:
    'Recordatorios locales útiles basados en sus evaluaciones (los datos no salen del dispositivo).',
  drafts: 'Evaluaciones incompletas',
  monthly: 'Entrada de datos mensual',
  refresh: 'Recordatorios de actualización de datos',
  periodEnd: 'Fin del período de informe',
  reportingCalendar: 'Calendario de informes',
  educational: 'Ideas semanales (informe y clima)',
  educationalHint:
    'Opcional. Una nota breve por semana (solo domingo, martes o jueves) sobre normas, ciencia climática, historia e innovación — nunca promocional.',
  reengagement: 'Recordatorios de regreso',
  initiatives: 'Seguimiento de iniciativas',
  initiativeTitle: 'Revise sus iniciativas de reducción',
  initiativeBody: 'Planificó acciones para {company}. Revise el progreso.',
  permissionTitle: 'Manténgase al día con recordatorios',
  permissionBody:
    'CarbonScope puede enviar orientación profesional y recordatorios sobre sus períodos de informe, entradas mensuales y evaluaciones incompletas. Controla cada categoría en Ajustes.',
  enable: 'Activar recordatorios',
  notNow: 'Ahora no',
  draftTitle: 'Evaluación incompleta',
  draftBody: 'Tiene una evaluación incompleta para {company}. Abra CarbonScope para continuar.',
  monthlyTitle: 'Entrada de datos mensual',
  monthlyBody: 'Añada los datos de {month} para {company}{categories}.',
  monthlyCategoriesSuffix: ' ({categories})',
  refresh6Title: 'Es momento de actualizar sus datos',
  refresh6Body:
    'Han pasado 6 meses desde que actualizó {company}. Recalcule las emisiones de Scope 1 y 2 con el uso actual de combustible y electricidad.',
  refresh12Title: 'Recordatorio de actualización anual',
  refresh12Body:
    'Han pasado 12 meses desde que actualizó {company}. Actualice su evaluación para un informe preciso.',
  periodEndTitle: 'El período de informe termina pronto',
  periodEndBody:
    '{company}: su ventana de informe de {period} finaliza en 7 días. Revise o cierre sus entradas.',
  reportingCalendarTitle: 'Plazo de informe próximo',
  reportingCalendarBody:
    '{company}: el período {period} cierra en dos semanas. Finalice Scope 1 y 2 y exporte el paquete de pruebas.',
  firstSuccessTitle: 'Su informe de emisiones está listo',
  firstSuccessBody:
    'Abra CarbonScope para ver los resultados y exportar un PDF. Consejo: Scope 2 cambia cuando actualiza el país o el uso de electricidad.',
  educationalTitle: 'Insight sobre carbono',
  insightOfWeekTitle: 'Insight de la semana',
  insightTap: 'Pulse para leer',
  reengagementTitle: 'Actualice su evaluación de carbono',
  reengagementBody:
    '¿Sigue haciendo seguimiento de {company}? Actualice los combustibles y la electricidad de este período para una imagen precisa de Scope 1 y 2.',
  tips: {
    scope1Vs2:
      'Scope 1 cubre los combustibles que quema directamente (diésel, gasolina, gas natural). Scope 2 cubre la electricidad comprada — ambos son esenciales en inventarios del GHG Protocol.',
    utilityBills:
      'Las facturas de suministros y combustible son la fuente más fiable de kWh, litros y m³. Mantenga una carpeta por período de informe.',
    gridFactor:
      'Las emisiones de Scope 2 dependen del factor de red de su país. CarbonScope aplica el factor automáticamente al seleccionar el país.',
    monthlyTracking:
      'En períodos de 6 meses o anuales, la entrada mensual ayuda a detectar picos estacionales — útil para auditorías energéticas y divulgación ESG.',
    scope1Fuels:
      'El diésel de flota y el gas en sitio suelen dominar Scope 1. Empiece por las categorías de combustible con mayor gasto.',
    scope2Electricity:
      'La electricidad de oficinas e instalaciones es Scope 2. Use kWh anuales de facturas o subcontadores; puede introducir MWh y se convierten automáticamente.',
    reportingPeriod:
      'Alinee la fecha de inicio del informe con su ejercicio fiscal o año de sostenibilidad para que los resultados coincidan con otras divulgaciones.',
    saveProgress:
      'Use Guardar progreso en Scope 1 o 2 si necesita reunir datos más tarde — sus entradas permanecen en este dispositivo hasta calcular resultados.',
    whyReportingMatters:
      'Medir las emisiones de Scope 1 y 2 ayuda a las empresas a comprender el impacto climático operativo, fijar líneas base y responder con credibilidad a inversores, bancos y clientes.',
    whyReportingSME:
      'Las pymes suelen empezar por Scope 1 y 2 porque los datos están a mano (facturas de combustible y electricidad). Una línea base clara apoya el crecimiento y los requisitos de licitación.',
    whyReportingEnterprise:
      'Las grandes organizaciones aplican métodos coherentes de Scope 1 y 2 en todas las sedes para que la consolidación, los objetivos y el informe externo (CDP, memorias anuales) sean comparables año a año.',
    ghgProtocol:
      'El GHG Protocol es el estándar global más usado para inventarios corporativos. Define Scope 1, 2 y 3 y cómo contabilizar combustibles y electricidad.',
    iso14064:
      'La ISO 14064-1 orienta la cuantificación y el informe de inventarios de GEI a nivel de organización. Complementa el GHG Protocol y se cita en muchos esquemas nacionales.',
    csrdEsrs:
      'En la UE, la CSRD y la ESRS E1 exigen a grandes empresas y cotizadas informar emisiones con verificación creciente. Scope 1 y 2 suelen ser el punto de partida.',
    tcfdIfrs:
      'TCFD e ISSB (IFRS S2) fomentan la divulgación de riesgos climáticos y emisiones. Datos fiables de Scope 1 y 2 apoyan la planificación de transición y los informes financieros.',
    parisAgreement:
      'El Acuerdo de París (2015) busca limitar el calentamiento muy por debajo de 2 °C. Los objetivos nacionales llegan a las políticas — las empresas aportan con reducciones medidas en sus operaciones.',
    kyotoHistory:
      'El Protocolo de Kioto (era 1995–2012) introdujo objetivos vinculantes para muchos países industrializados y ayudó a estandarizar la contabilidad nacional de emisiones.',
    co2Science:
      'El CO₂ y otros GEI retienen calor en la atmósfera. Las actividades humanas — sobre todo la quema de combustibles fósiles — han elevado el CO₂ atmosférico muy por encima de los niveles preindustriales.',
    climateBusinessRisk:
      'Los riesgos físicos y de transición del cambio climático pueden afectar cadenas de suministro, costes energéticos y regulación. Los datos de emisiones son un insumo para una planificación empresarial informada.',
    companyActions:
      'Las empresas pueden reducir Scope 1 y 2 mediante eficiencia, cambio de combustible, electricidad renovable, renovación de flotas y trabajo con equipos de instalaciones — la medición muestra qué funciona.',
    energyEfficiency:
      'Iluminación LED, optimización de HVAC y motores suelen reducir la electricidad (Scope 2) con amortizaciones cortas. Compare kWh antes y después para ver el impacto en tCO₂e.',
    renewableElectricity:
      'Tarifas renovables, solar en sitio y acuerdos de compra de energía (PPA) reducen Scope 2 cuando puede reclamar reducciones basadas en mercado con credibilidad — conserve los certificados.',
    fleetAndHeat:
      'Electrificar flotas ligeras, usar biocombustibles certificados y mejorar la eficiencia de calderas abordan Scope 1. Empiece por vehículos y calefacción que operan todo el año.',
    industrialTech:
      'La electrificación de procesos, la recuperación de calor residual y la gestión energética digital se extienden en la industria — reducen costes y Scope 1 y 2 con el tiempo.',
    dataQuality:
      'Los buenos inventarios documentan fuentes (facturas, contadores), supuestos y períodos. Las notas en su evaluación ayudan a auditores y a usted en el futuro.',
    scope3Note:
      'Scope 3 cubre emisiones de la cadena de valor (proveedores, viajes, productos). Los inventarios de Scope 1 y 2 son la base — muchos marcos los exigen primero.',
    assurance:
      'Se espera cada vez más la verificación externa de datos de GEI. Métodos coherentes y facturas conservadas facilitan la assurance cuando la necesite.',
    sectorManufacturing:
      'Los fabricantes suelen tener Scope 1 elevado por gas y diésel y Scope 2 elevado por líneas de producción. El submedición de procesos clave mejora la precisión.',
    sectorOffice:
      'Las empresas de oficinas suelen depender más de Scope 2 (electricidad) con Scope 1 menor (generadores de respaldo, vehículos de empresa). La selección del país determina el factor de red.',
    scienceMethane:
      'El metano y el óxido nitroso también calientan el clima, a menudo más por unidad que el CO₂ en 20 años. El informe de combustibles y gas captura parte de su huella directa de GEI.',
    keelingCurve:
      'Las mediciones de Charles Keeling en Mauna Loa (desde 1958) mostraron un CO₂ en ascenso constante — uno de los registros globales más claros que sustentan la ciencia climática actual.',
    ipccScience:
      'El IPCC sintetiza ciencia revisada por pares para responsables políticos. Sus informes de evaluación informan el Acuerdo de París y los planes climáticos nacionales en todo el mundo.',
    industrialCo2Rise:
      'El uso de combustibles fósiles desde la Revolución Industrial multiplicó las emisiones de CO₂. Hoy, energía e industria siguen siendo centrales en el informe de Scope 1 y 2.',
    euEts:
      'El Sistema de Comercio de Emisiones de la UE (desde 2005) limita el CO₂ de la electricidad y la industria — un modelo que muchas regiones estudian para fijación de precios al carbono y divulgación.',
    nordicHeating:
      'Los países nórdicos impulsaron calefacción urbana y renovables, reduciendo emisiones por calefacción de edificios — relevante al comparar factores de red nacionales.',
    chinaRenewables:
      'China lidera el despliegue mundial de capacidad solar y eólica. Los factores de red siguen reflejando la mezcla generadora completa — la ubicación importa para Scope 2.',
    greenHydrogen:
      'El hidrógeno verde (electrólisis con renovables) se prueba en acero, química y transporte pesado — futuras reducciones de Scope 1 en la industria.',
    steelInnovation:
      'El hierro reducido directo y los hornos de arco eléctrico pueden reducir la dependencia del carbón en el acero. Los especialistas siguen plantas piloto en Europa y Asia.',
    carbonCapture:
      'La captura de carbono (uso o almacenamiento) se despliega en algunas plantas de cemento y energía. No sustituye la eficiencia, pero puede abordar emisiones de proceso difíciles de reducir.',
    brazilBiofuels:
      'El programa brasileño de etanol para flotas redujo la dependencia de la gasolina durante décadas — un ejemplo de cambio de combustible en transporte en inventarios nacionales.',
    africaSolar:
      'La solar distribuida y las minirredes amplían el acceso en África y reducen el uso de generadores diésel — una vía práctica de reducción de Scope 1 en instalaciones.',
    copSummits:
      'Las conferencias climáticas de la ONU (COP) coordinan las negociaciones globales. Los datos corporativos de Scope 1 y 2 apoyan compromisos nacionales y expectativas de la cadena de suministro.',
  },
};
