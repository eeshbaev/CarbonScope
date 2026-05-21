import type { TranslationKeys } from '../../locales/en';

export const ptNotifications: TranslationKeys['notifications'] = {
  section: 'Notificações',
  master: 'Lembretes e orientação',
  masterHint:
    'Lembretes locais úteis com base nas suas avaliações (os dados não saem do dispositivo).',
  drafts: 'Avaliações por concluir',
  monthly: 'Entrada de dados mensal',
  refresh: 'Lembretes de atualização de dados',
  periodEnd: 'Fim do período de reporte',
  reportingCalendar: 'Calendário de reporte',
  educational: 'Insights semanais (reporte e clima)',
  educationalHint:
    'Opcional. Uma nota breve por semana (apenas domingo, terça ou quinta) sobre normas, ciência climática, história e inovação — nunca promocional.',
  reengagement: 'Lembretes de regresso',
  initiatives: 'Acompanhamento de iniciativas',
  initiativeTitle: 'Revise as iniciativas de redução',
  initiativeBody: 'Definiu ações para {company}. Verifique o progresso.',
  permissionTitle: 'Mantenha-se em dia com lembretes',
  permissionBody:
    'O CarbonScope pode enviar orientação profissional e lembretes sobre os seus períodos de reporte, entradas mensais e avaliações por concluir. Controla cada categoria em Definições.',
  enable: 'Ativar lembretes',
  notNow: 'Agora não',
  draftTitle: 'Avaliação por concluir',
  draftBody: 'Tem uma avaliação por concluir para {company}. Abra o CarbonScope para continuar.',
  monthlyTitle: 'Entrada de dados mensal',
  monthlyBody: 'Adicione os dados de {month} para {company}{categories}.',
  monthlyCategoriesSuffix: ' ({categories})',
  refresh6Title: 'É altura de atualizar os seus dados',
  refresh6Body:
    'Passaram 6 meses desde que atualizou {company}. Recalcule as emissões de Scope 1 e 2 com o consumo atual de combustível e eletricidade.',
  refresh12Title: 'Lembrete de atualização anual',
  refresh12Body:
    'Passaram 12 meses desde que atualizou {company}. Atualize a sua avaliação para um reporte preciso.',
  periodEndTitle: 'O período de reporte termina em breve',
  periodEndBody:
    '{company}: a sua janela de reporte de {period} termina em 7 dias. Reveja ou finalize as suas entradas.',
  reportingCalendarTitle: 'Prazo de reporte próximo',
  reportingCalendarBody:
    '{company}: o período {period} fecha em duas semanas. Finalize Scope 1 e 2 e exporte o pacote de provas.',
  firstSuccessTitle: 'O seu relatório de emissões está pronto',
  firstSuccessBody:
    'Abra o CarbonScope para ver os resultados e exportar um PDF. Dica: Scope 2 muda quando atualiza o país ou o consumo de eletricidade.',
  educationalTitle: 'Insight sobre carbono',
  insightOfWeekTitle: 'Insight da semana',
  insightTap: 'Toque para ler',
  reengagementTitle: 'Atualize a sua avaliação de carbono',
  reengagementBody:
    'Ainda acompanha {company}? Atualize os combustíveis e a eletricidade deste período para uma imagem precisa de Scope 1 e 2.',
  tips: {
    scope1Vs2:
      'Scope 1 abrange os combustíveis que queima diretamente (gasóleo, gasolina, gás natural). Scope 2 abrange a eletricidade comprada — ambos são centrais nos inventários do GHG Protocol.',
    utilityBills:
      'As faturas de utilities e combustível são a fonte mais fiável de kWh, litros e m³. Mantenha uma pasta por período de reporte.',
    gridFactor:
      'As emissões de Scope 2 dependem do fator de rede do seu país. O CarbonScope aplica o fator automaticamente ao selecionar o país.',
    monthlyTracking:
      'Em períodos de 6 meses ou anuais, a entrada mensal ajuda a detetar picos sazonais — útil para auditorias energéticas e divulgação ESG.',
    scope1Fuels:
      'O gasóleo de frota e o gás no local costumam dominar Scope 1. Comece pelas categorias de combustível com maior despesa.',
    scope2Electricity:
      'A eletricidade de escritórios e instalações é Scope 2. Use kWh anuais das faturas ou subcontadores; pode introduzir MWh e são convertidos automaticamente.',
    reportingPeriod:
      'Alinhe a data de início do reporte com o seu exercício fiscal ou ano de sustentabilidade para que os resultados coincidam com outras divulgações.',
    saveProgress:
      'Use Guardar progresso em Scope 1 ou 2 se precisar de reunir dados mais tarde — as suas entradas permanecem neste dispositivo até calcular resultados.',
    whyReportingMatters:
      'Medir as emissões de Scope 1 e 2 ajuda as empresas a compreender o impacto climático operacional, definir linhas de base e responder com credibilidade a investidores, bancos e clientes.',
    whyReportingSME:
      'As PME costumam começar por Scope 1 e 2 porque os dados estão à mão (faturas de combustível e eletricidade). Uma linha de base clara apoia o crescimento e requisitos de concurso.',
    whyReportingEnterprise:
      'As grandes organizações aplicam métodos consistentes de Scope 1 e 2 em todos os sites para que consolidação, metas e reporte externo (CDP, relatórios anuais) sejam comparáveis ano após ano.',
    ghgProtocol:
      'O GHG Protocol é o padrão global mais usado para inventários corporativos. Define Scope 1, 2 e 3 e como contabilizar combustíveis e eletricidade.',
    iso14064:
      'A ISO 14064-1 orienta a quantificação e o reporte de inventários de GEE ao nível da organização. Complementa o GHG Protocol e é referenciada em muitos regimes nacionais.',
    csrdEsrs:
      'Na UE, a CSRD e a ESRS E1 exigem que grandes empresas e cotadas reportem emissões com verificação crescente. Scope 1 e 2 são o ponto de partida habitual.',
    tcfdIfrs:
      'TCFD e ISSB (IFRS S2) incentivam a divulgação de riscos climáticos e emissões. Dados fiáveis de Scope 1 e 2 apoiam o planeamento de transição e os reportes financeiros.',
    parisAgreement:
      'O Acordo de Paris (2015) visa limitar o aquecimento bem abaixo de 2 °C. As metas nacionais chegam às políticas — as empresas contribuem com reduções medidas nas suas operações.',
    kyotoHistory:
      'O Protocolo de Quioto (era 1995–2012) introduziu metas vinculativas para muitos países industrializados e ajudou a padronizar a contabilidade nacional de emissões.',
    co2Science:
      'O CO₂ e outros GEE retêm calor na atmosfera. As atividades humanas — sobretudo a queima de combustíveis fósseis — elevaram o CO₂ atmosférico muito acima dos níveis pré-industriais.',
    climateBusinessRisk:
      'Os riscos físicos e de transição das alterações climáticas podem afetar cadeias de abastecimento, custos energéticos e regulação. Os dados de emissões são um contributo para um planeamento empresarial informado.',
    companyActions:
      'As empresas podem reduzir Scope 1 e 2 através de eficiência, mudança de combustível, eletricidade renovável, renovação de frotas e envolvimento das equipas de instalações — a medição mostra o que funciona.',
    energyEfficiency:
      'Iluminação LED, otimização de AVAC e motores costumam reduzir a eletricidade (Scope 2) com retornos rápidos. Compare kWh antes e depois para ver o impacto em tCO₂e.',
    renewableElectricity:
      'Tarifas renováveis, solar no local e acordos de compra de energia (PPA) reduzem Scope 2 quando pode reclamar reduções baseadas no mercado com credibilidade — conserve os certificados.',
    fleetAndHeat:
      'Eletrificar frotas ligeiras, usar biocombustíveis certificados e melhorar a eficiência de caldeiras abordam Scope 1. Comece por veículos e aquecimento que operam todo o ano.',
    industrialTech:
      'A eletrificação de processos, a recuperação de calor residual e a gestão energética digital estendem-se na indústria — reduzem custos e Scope 1 e 2 ao longo do tempo.',
    dataQuality:
      'Bons inventários documentam fontes (faturas, contadores), pressupostos e períodos. As notas na sua avaliação ajudam auditores e si no futuro.',
    scope3Note:
      'Scope 3 abrange emissões da cadeia de valor (fornecedores, viagens, produtos). Os inventários de Scope 1 e 2 são a base — muitos enquadramentos exigem-nos primeiro.',
    assurance:
      'Espera-se cada vez mais a verificação externa de dados de GEE. Métodos consistentes e faturas conservadas facilitam a assurance quando a precisar.',
    sectorManufacturing:
      'Os fabricantes costumam ter Scope 1 elevado por gás e gasóleo e Scope 2 elevado por linhas de produção. A submedição de processos-chave melhora a precisão.',
    sectorOffice:
      'Empresas de escritório dependem sobretudo de Scope 2 (eletricidade) com Scope 1 menor (geradores de reserva, viaturas da empresa). A seleção do país determina o fator de rede.',
    scienceMethane:
      'O metano e o óxido nitroso também aquecem o clima, muitas vezes mais por unidade que o CO₂ em 20 anos. O reporte de combustíveis e gás capta parte da sua pegada direta de GEE.',
    keelingCurve:
      'As medições de Charles Keeling em Mauna Loa (desde 1958) mostraram um CO₂ em ascensão constante — um dos registos globais mais claros que sustentam a ciência climática atual.',
    ipccScience:
      'O IPCC sintetiza ciência revista por pares para decisores. Os seus relatórios de avaliação informam o Acordo de Paris e os planos climáticos nacionais em todo o mundo.',
    industrialCo2Rise:
      'O uso de combustíveis fósseis desde a Revolução Industrial multiplicou as emissões de CO₂. Hoje, energia e indústria continuam centrais no reporte de Scope 1 e 2.',
    euEts:
      'O Sistema de Comércio de Emissões da UE (desde 2005) limita o CO₂ da eletricidade e da indústria — um modelo que muitas regiões estudam para fixação de preços do carbono e divulgação.',
    nordicHeating:
      'Os países nórdicos pioneiros em aquecimento urbano e renováveis reduziram emissões de aquecimento de edifícios — relevante ao comparar fatores de rede nacionais.',
    chinaRenewables:
      'A China lidera a implementação mundial de capacidade solar e eólica. Os fatores de rede continuam a refletir a mistura geradora completa — a localização importa para Scope 2.',
    greenHydrogen:
      'O hidrogénio verde (eletrólise com renováveis) está em piloto no aço, química e transporte pesado — futuras reduções de Scope 1 na indústria.',
    steelInnovation:
      'O ferro reduzido direto e fornos de arco elétrico podem reduzir a dependência do carvão no aço. Os especialistas acompanham plantas-piloto na Europa e na Ásia.',
    carbonCapture:
      'A captura de carbono (utilização ou armazenamento) está implementada em algumas unidades de cimento e energia. Não substitui a eficiência, mas pode abordar emissões de processo difíceis de reduzir.',
    brazilBiofuels:
      'O programa brasileiro de etanol para frotas reduziu a dependência da gasolina ao longo de décadas — um exemplo de mudança de combustível no transporte em inventários nacionais.',
    africaSolar:
      'A solar distribuída e as minirredes expandem o acesso em África e reduzem o uso de geradores a gasóleo — uma via prática de redução de Scope 1 em instalações.',
    copSummits:
      'As conferências climáticas da ONU (COP) coordenam as negociações globais. Os dados corporativos de Scope 1 e 2 apoiam compromissos nacionais e expectativas da cadeia de abastecimento.',
  },
};
