import type { DeepPartial } from '../buildLocale';
import type { TranslationKeys } from '../locales/en';

/** Weekly educational notification copy — all locales. */
export const EDUCATIONAL_TIP_PATCHES: Record<string, DeepPartial<TranslationKeys>> = {
  ru: {
    notifications: {
      educational: 'Еженедельные insights (отчётность и климат)',
      educationalHint:
        'Необязательно. Одна короткая профессиональная заметка в неделю о стандартах, науке и действиях компаний — без рекламы и давления.',
      educationalTitle: 'Обзор по углероду',
      tips: {
        scope1Vs2:
          'Scope 1 — прямые выбросы от топлива (дизель, бензин, газ). Scope 2 — закупаемая электроэнергия. Оба важны для GHG Protocol.',
        utilityBills:
          'Счета за электроэнергию и топливо — самый надёжный источник kWh, литров и м³. Храните их по отчётным периодам.',
        gridFactor:
          'Scope 2 зависит от коэффициента сети страны. CarbonScope применяет его автоматически при выборе страны.',
        monthlyTracking:
          'Для полугодовых и годовых периодов помесячный ввод выявляет сезонные пики — полезно для аудита и ESG.',
        scope1Fuels:
          'Дизель автопарка и газ на площадке часто доминируют в Scope 1. Начните с категорий с наибольшими расходами.',
        scope2Electricity:
          'Электроэнергия офисов и площадок — Scope 2. Используйте годовые kWh со счетов.',
        reportingPeriod:
          'Совместите дату начала отчёта с финансовым или устойчивым годом.',
        saveProgress:
          '«Сохранить черновик», если данных пока нет — ввод останется на устройстве до расчёта.',
        whyReportingMatters:
          'Измерение Scope 1 и 2 помогает понять операционное воздействие на климат, задать базовый уровень и отвечать инвесторам, банкам и клиентам.',
        whyReportingSME:
          'Малый бизнес часто начинает со Scope 1 и 2: данные рядом (счета за топливо и электричество). Базовая линия помогает при росте и тендерах.',
        whyReportingEnterprise:
          'Крупные компании применяют единые методы Scope 1 и 2 по площадкам — так цели, консолидация и внешняя отчётность сопоставимы из года в год.',
        ghgProtocol:
          'GHG Protocol — главный мировой стандарт корпоративных инвентаризаций. Он определяет Scope 1, 2 и 3 и учёт топлива и электроэнергии.',
        iso14064:
          'ISO 14064-1 описывает количественную оценку и отчётность ПГ на уровне организации. Дополняет GHG Protocol и используется во многих странах.',
        csrdEsrs:
          'В ЕС CSRD и ESRS E1 требуют от крупных и публичных компаний раскрывать выбросы с растущей верификацией. Обычно начинают со Scope 1 и 2.',
        tcfdIfrs:
          'TCFD и ISSB (IFRS S2) поощряют раскрытие климатических рисков и выбросов. Надёжные Scope 1 и 2 поддерживают планирование перехода.',
        parisAgreement:
          'Парижское соглашение (2015) ограничивает потепление значительно ниже 2°C. Компании вносят вклад через измеримое снижение в операциях.',
        kyotoHistory:
          'Киотский протокол заложил обязательные цели для ряда стран и стандартизировал национальный учёт выбросов.',
        co2Science:
          'CO₂ и другие ПГ удерживают тепло в атмосфере. Сжигание ископаемого топлива подняло CO₂ далеко выше дориндустриального уровня.',
        climateBusinessRisk:
          'Физические и переходные климатические риски влияют на цепочки поставок, энергозатраты и регулирование. Данные о выбросах помогают планировать.',
        companyActions:
          'Снижать Scope 1 и 2 можно через эффективность, смену топлива, ВИЭ, обновление автопарка и работу с площадками — измерение показывает результат.',
        energyEfficiency:
          'LED, оптимизация HVAC и двигателей часто сокращают Scope 2 с быстрой окупаемостью. Сравнивайте kWh до и после.',
        renewableElectricity:
          'Зелёные тарифы, солнечные станции и PPA снижают Scope 2 при корректном учёте — храните сертификаты.',
        fleetAndHeat:
          'Электрификация лёгкого автопарка и эффективность котлов снижают Scope 1. Начните с круглогодичных потребителей.',
        industrialTech:
          'Электрификация процессов, утилизация тепла и цифровой энергоменеджмент снижают выбросы и затраты в промышленности.',
        dataQuality:
          'Качественный инвентарь фиксирует источники, допущения и периоды. Заметки в оценке помогают аудиторам и вам в будущем.',
        scope3Note:
          'Scope 3 — цепочка создания стоимости. Scope 1 и 2 — основа; большинство framework ожидают их в первую очередь.',
        assurance:
          'Верификация данных о ПГ всё чаще обязательна. Единые методы и счета упрощают проверку.',
        sectorManufacturing:
          'У производителей высокий Scope 1 от газа и дизеля и Scope 2 от линий. Подучёт по процессам повышает точность.',
        sectorOffice:
          'Офисные компании чаще зависят от Scope 2 (электричество). Выбор страны задаёт коэффициент сети.',
        scienceMethane:
          'Метан и закись азота тоже усиливают потепление. Учёт топлива и газа отражает часть прямого следа ПГ.',
      },
    },
  },
  fr: {
    notifications: {
      educational: 'Conseils hebdomadaires (rapport & climat)',
      educationalHint:
        'Optionnel. Une note professionnelle par semaine sur les normes, la science et l\'action des entreprises — sans publicité.',
      tips: {
        whyReportingMatters:
          'Mesurer les Scope 1 et 2 aide à comprendre l\'impact climatique opérationnel et à répondre aux investisseurs et clients avec des données solides.',
        ghgProtocol:
          'Le GHG Protocol est la norme mondiale de référence pour les inventaires d\'émissions. Il définit les scopes et l\'comptabilisation des combustibles et de l\'électricité.',
        parisAgreement:
          'L\'Accord de Paris vise à limiter le réchauffement bien en dessous de 2 °C. Les entreprises contribuent par des réductions mesurées sur leurs opérations.',
        companyActions:
          'Efficacité énergétique, électricité renouvelable et flotte moins carbonée réduisent les Scope 1 et 2 — la mesure montre ce qui fonctionne.',
      },
    },
  },
  de: {
    notifications: {
      educational: 'Wöchentliche Einblicke (Bericht & Klima)',
      educationalHint:
        'Optional. Ein kurzer professioneller Hinweis pro Woche zu Standards, Wissenschaft und Maßnahmen — ohne Werbung.',
      tips: {
        whyReportingMatters:
          'Scope-1- und Scope-2-Messungen zeigen die operative Klimawirkung und schaffen eine belastbare Basis für Investoren und Kunden.',
        ghgProtocol:
          'Das GHG Protocol ist der weltweit führende Standard für Unternehmensinventare und definiert Scopes sowie Brennstoff- und Strombilanzierung.',
        iso14064:
          'ISO 14064-1 unterstützt die Quantifizierung und Berichterstattung von THG auf Organisationsebene und ergänzt das GHG Protocol.',
        companyActions:
          'Effizienz, erneuerbarer Strom und moderne Flotten senken Scope 1 und 2 — Messung zeigt, was wirkt.',
      },
    },
  },
  es: {
    notifications: {
      educational: 'Ideas semanales (informe y clima)',
      educationalHint:
        'Opcional. Una nota breve y profesional por semana sobre normas, ciencia y acción empresarial — sin publicidad.',
      tips: {
        whyReportingMatters:
          'Medir Scope 1 y 2 ayuda a entender el impacto climático operativo y responder con credibilidad a inversores y clientes.',
        ghgProtocol:
          'El GHG Protocol es el estándar global más usado para inventarios corporativos y define los alcances y el conteo de combustibles y electricidad.',
        parisAgreement:
          'El Acuerdo de París busca limitar el calentamiento muy por debajo de 2 °C. Las empresas aportan con reducciones medidas en sus operaciones.',
        renewableElectricity:
          'Tarifas verdes, solar en sitio y PPA reducen Scope 2 cuando se documentan correctamente los certificados.',
      },
    },
  },
  pt: {
    notifications: {
      educational: 'Insights semanais (relatório e clima)',
      educationalHint:
        'Opcional. Uma nota profissional curta por semana sobre normas, ciência e ação — sem promoção.',
      tips: {
        whyReportingMatters:
          'Medir Scope 1 e 2 ajuda a compreender o impacto climático operacional e a responder a investidores e clientes com dados sólidos.',
        ghgProtocol:
          'O GHG Protocol é o padrão global mais usado para inventários corporativos e define os scopes e a contabilização de combustíveis e eletricidade.',
        companyActions:
          'Eficiência, eletricidade renovável e frota mais limpa reduzem Scope 1 e 2 — a medição mostra o que funciona.',
      },
    },
  },
  it: {
    notifications: {
      educational: 'Approfondimenti settimanali',
      educationalHint:
        'Opzionale. Una nota professionale a settimana su norme, scienza e azioni aziendali — senza pubblicità.',
      tips: {
        whyReportingMatters:
          'Misurare Scope 1 e 2 aiuta a capire l\'impatto climatico operativo e a rispondere in modo credibile a investitori e clienti.',
        ghgProtocol:
          'Il GHG Protocol è lo standard globale più usato per gli inventari aziendali e definisce gli scope e la contabilizzazione di carburanti ed elettricità.',
        csrdEsrs:
          'In UE, CSRD ed ESRS E1 richiedono alle grandi imprese di rendicontare le emissioni con assurance crescente — spesso partendo da Scope 1 e 2.',
      },
    },
  },
  ja: {
    notifications: {
      educational: '週間インサイト（報告と気候）',
      educationalHint:
        '任意。基準・科学・企業の取り組みについて週1回の短い専門的メモ（宣伝なし）。',
      tips: {
        whyReportingMatters:
          'Scope 1・2の測定は、事業の気候影響を把握し、投資家や顧客に説明可能なベースラインを作るのに役立ちます。',
        ghgProtocol:
          'GHG Protocolは企業インベントリの世界的標準で、Scope 1・2・3と燃料・電力の算定方法を定めています。',
        parisAgreement:
          'パリ協定は気温上昇を2℃未満に抑えることを目指します。企業は自社事業での削減に貢献できます。',
        energyEfficiency:
          'LEDや空調・モーターの効率化はScope 2を下げ、投資回収も早いことが多いです。',
      },
    },
  },
  zh: {
    notifications: {
      educational: '每周洞察（报告与气候）',
      educationalHint:
        '可选。每周一条关于标准、气候科学与企业行动的简短专业说明，无推销。',
      tips: {
        whyReportingMatters:
          '测算范围1和2有助于了解运营层面的气候影响，建立基准，并向投资者和客户作出可信回应。',
        ghgProtocol:
          'GHG Protocol是全球最广泛使用的企业温室气体盘查标准，界定范围1、2、3及燃料与电力的核算方法。',
        parisAgreement:
          '《巴黎协定》旨在将升温控制在远低于2°C。企业通过可测量的运营减排作出贡献。',
        csrdEsrs:
          '在欧盟，CSRD与ESRS E1要求大型及上市公司披露排放并逐步加强鉴证，通常从范围1和2起步。',
        renewableElectricity:
          '绿色电价、屋顶光伏和购电协议（PPA）可降低范围2，请妥善保存绿证。',
      },
    },
  },
};
