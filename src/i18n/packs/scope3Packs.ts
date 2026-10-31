import type { DeepPartial } from '../buildLocale';
import type { TranslationKeys } from '../locales/en';

/** Scope 3 (value chain) screen, results and PDF strings per locale. */
export const SCOPE3_PACKS: Record<string, DeepPartial<TranslationKeys>> = {
  ru: {
    scope2: { continueScope3: 'Перейти к Scope 3' },
    scope3: {
      title: 'Scope 3 — цепочка создания стоимости',
      subtitle:
        'Необязательно: косвенные выбросы от командировок, поездок сотрудников, отходов и воды.',
      optionalNote:
        'Для большинства отчётов МСП Scope 3 необязателен. Оставьте строку равной 0, чтобы исключить её; если всё по нулям, результаты охватывают только Scope 1 и 2.',
      source:
        'Источник: отчёты о бронировании поездок, авансовые отчёты, опросы сотрудников о поездках на работу, отчёты подрядчика по отходам и счета за воду.',
      preview: 'Предпросмотр Scope 3',
      calculate: 'Рассчитать результаты',
      categoryTitle: 'Категория {number} — {name}',
      subtotal: 'Промежуточный итог',
      factorLine: '{factor} кг CO₂э на {unit}',
      categories: {
        cat5Waste: 'Отходы операционной деятельности',
        cat6Travel: 'Деловые поездки',
        cat7Commuting: 'Поездки сотрудников на работу',
      },
      fields: {
        flightShortHaulKm: 'Авиаперелёты — ближнемагистральные (< 3 700 км)',
        flightLongHaulKm: 'Авиаперелёты — дальнемагистральные',
        railKm: 'Поездки на поезде',
        carKm: 'Поездки на автомобиле (аренда, такси, личные авто)',
        hotelNights: 'Проживание в гостиницах',
        commuteCarKm: 'Дорога на работу на автомобиле',
        commutePublicTransportKm: 'Дорога на работу на автобусе / метро / поезде',
        wasteLandfillTonnes: 'Отходы на полигон',
        wasteRecycledTonnes: 'Отходы на переработку',
        waterM3: 'Водоснабжение и водоотведение',
      },
      units: {
        m3: 'м³',
        tonnes: 'т',
        passengerKm: 'пасс.-км',
        km: 'км',
        roomNights: 'ночь',
      },
      notCovered:
        'Пока не охвачено: закупаемые товары (по затратам), капитальные товары, входящая логистика, деятельность, связанная с топливом и энергией, и последующие категории.',
    },
    results: {
      scope3ValueChain: 'SCOPE 3 — ЦЕПОЧКА СТОИМОСТИ',
      scope3Breakdown: 'Scope 3 по категориям',
      comparisonLabels: { total: 'Итого', scope1: 'Scope 1', scope2: 'Scope 2', scope3: 'Scope 3' },
      pdfScope3Factors: 'Коэффициенты Scope 3',
    },
  },
  fr: {
    scope2: { continueScope3: 'Continuer vers Scope 3' },
    scope3: {
      title: 'Scope 3 — Chaîne de valeur',
      subtitle:
        'Facultatif : émissions indirectes liées aux déplacements professionnels, aux trajets domicile-travail, aux déchets et à l’eau.',
      optionalNote:
        'Le Scope 3 est facultatif pour la plupart des PME. Laissez une ligne à 0 pour l’exclure ; si tout est à 0, les résultats couvrent uniquement les Scopes 1 et 2.',
      source:
        'Source : rapports de réservation de voyages, notes de frais, enquêtes de mobilité du personnel, rapports du prestataire déchets et factures d’eau.',
      preview: 'Aperçu Scope 3',
      calculate: 'Calculer les résultats',
      categoryTitle: 'Catégorie {number} — {name}',
      subtotal: 'Sous-total',
      factorLine: '{factor} kg CO₂e par {unit}',
      categories: {
        cat5Waste: 'Déchets générés par les activités',
        cat6Travel: 'Déplacements professionnels',
        cat7Commuting: 'Trajets domicile-travail',
      },
      fields: {
        flightShortHaulKm: 'Vols — court-courrier (< 3 700 km)',
        flightLongHaulKm: 'Vols — long-courrier',
        railKm: 'Train',
        carKm: 'Voiture (location, taxi, véhicules personnels)',
        hotelNights: 'Nuits d’hôtel',
        commuteCarKm: 'Trajets en voiture',
        commutePublicTransportKm: 'Trajets en bus / métro / train',
        wasteLandfillTonnes: 'Déchets mis en décharge',
        wasteRecycledTonnes: 'Déchets recyclés',
        waterM3: 'Eau potable et eaux usées',
      },
      units: {
        m3: 'm³',
        tonnes: 'tonne',
        passengerKm: 'passager-km',
        km: 'km',
        roomNights: 'nuitée',
      },
      notCovered:
        'Pas encore couvert : achats (méthode monétaire), immobilisations, transport amont, activités liées aux combustibles et à l’énergie, et catégories aval.',
    },
    results: {
      scope3ValueChain: 'SCOPE 3 — CHAÎNE DE VALEUR',
      scope3Breakdown: 'Scope 3 par catégorie',
      comparisonLabels: { total: 'Total', scope1: 'Scope 1', scope2: 'Scope 2', scope3: 'Scope 3' },
      pdfScope3Factors: 'Facteurs d’activité Scope 3',
    },
  },
  de: {
    scope2: { continueScope3: 'Weiter zu Scope 3' },
    scope3: {
      title: 'Scope 3 — Wertschöpfungskette',
      subtitle:
        'Optional: indirekte Emissionen aus Geschäftsreisen, Pendeln, Abfall und Wasser.',
      optionalNote:
        'Scope 3 ist für die meisten KMU-Berichte optional. Lassen Sie eine Zeile auf 0, um sie auszuschließen – ist alles 0, umfassen die Ergebnisse nur Scope 1 und 2.',
      source:
        'Quelle: Reisebuchungsberichte, Spesenabrechnungen, Pendlerumfragen, Berichte des Entsorgers und Wasserrechnungen.',
      preview: 'Scope-3-Vorschau',
      calculate: 'Ergebnisse berechnen',
      categoryTitle: 'Kategorie {number} — {name}',
      subtotal: 'Zwischensumme',
      factorLine: '{factor} kg CO₂e pro {unit}',
      categories: {
        cat5Waste: 'Abfall aus dem Betrieb',
        cat6Travel: 'Geschäftsreisen',
        cat7Commuting: 'Pendeln der Mitarbeitenden',
      },
      fields: {
        flightShortHaulKm: 'Flüge — Kurzstrecke (< 3.700 km)',
        flightLongHaulKm: 'Flüge — Langstrecke',
        railKm: 'Bahnreisen',
        carKm: 'Autofahrten (Mietwagen, Taxi, Privat-Pkw)',
        hotelNights: 'Hotelübernachtungen',
        commuteCarKm: 'Pendeln mit dem Auto',
        commutePublicTransportKm: 'Pendeln mit Bus / U-Bahn / Zug',
        wasteLandfillTonnes: 'Abfall zur Deponie',
        wasteRecycledTonnes: 'Recycelter Abfall',
        waterM3: 'Wasserversorgung und Abwasser',
      },
      units: {
        m3: 'm³',
        tonnes: 'Tonne',
        passengerKm: 'Personen-km',
        km: 'km',
        roomNights: 'Zimmernacht',
      },
      notCovered:
        'Noch nicht abgedeckt: eingekaufte Waren (ausgabenbasiert), Investitionsgüter, vorgelagerter Transport, brennstoff- und energiebezogene Aktivitäten sowie nachgelagerte Kategorien.',
    },
    results: {
      scope3ValueChain: 'SCOPE 3 — WERTSCHÖPFUNGSKETTE',
      scope3Breakdown: 'Scope 3 nach Kategorie',
      comparisonLabels: { total: 'Gesamt', scope1: 'Scope 1', scope2: 'Scope 2', scope3: 'Scope 3' },
      pdfScope3Factors: 'Scope-3-Aktivitätsfaktoren',
    },
  },
  it: {
    scope2: { continueScope3: 'Continua a Scope 3' },
    scope3: {
      title: 'Scope 3 — Catena del valore',
      subtitle:
        'Facoltativo: emissioni indirette da viaggi di lavoro, pendolarismo, rifiuti e acqua.',
      optionalNote:
        'Lo Scope 3 è facoltativo per la maggior parte delle PMI. Lascia una riga a 0 per escluderla: se tutto è 0, i risultati coprono solo Scope 1 e 2.',
      source:
        'Fonte: report di prenotazione viaggi, note spese, sondaggi sul pendolarismo, report del gestore rifiuti e bollette dell’acqua.',
      preview: 'Anteprima Scope 3',
      calculate: 'Calcola risultati',
      categoryTitle: 'Categoria {number} — {name}',
      subtotal: 'Subtotale',
      factorLine: '{factor} kg CO₂e per {unit}',
      categories: {
        cat5Waste: 'Rifiuti generati dalle attività',
        cat6Travel: 'Viaggi di lavoro',
        cat7Commuting: 'Pendolarismo dei dipendenti',
      },
      fields: {
        flightShortHaulKm: 'Voli — corto raggio (< 3.700 km)',
        flightLongHaulKm: 'Voli — lungo raggio',
        railKm: 'Treno',
        carKm: 'Auto (noleggio, taxi, auto private)',
        hotelNights: 'Pernottamenti in hotel',
        commuteCarKm: 'Pendolarismo in auto',
        commutePublicTransportKm: 'Pendolarismo in bus / metro / treno',
        wasteLandfillTonnes: 'Rifiuti in discarica',
        wasteRecycledTonnes: 'Rifiuti riciclati',
        waterM3: 'Fornitura idrica e acque reflue',
      },
      units: {
        m3: 'm³',
        tonnes: 'tonnellata',
        passengerKm: 'passeggero-km',
        km: 'km',
        roomNights: 'notte',
      },
      notCovered:
        'Non ancora coperti: acquisti (metodo basato sulla spesa), beni strumentali, trasporto a monte, attività legate a combustibili ed energia e categorie a valle.',
    },
    results: {
      scope3ValueChain: 'SCOPE 3 — CATENA DEL VALORE',
      scope3Breakdown: 'Scope 3 per categoria',
      comparisonLabels: { total: 'Totale', scope1: 'Scope 1', scope2: 'Scope 2', scope3: 'Scope 3' },
      pdfScope3Factors: 'Fattori di attività Scope 3',
    },
  },
  ja: {
    scope2: { continueScope3: 'Scope 3へ' },
    scope3: {
      title: 'Scope 3 — バリューチェーン',
      subtitle: '任意：出張、通勤、廃棄物、水に由来する間接排出量。',
      optionalNote:
        '多くの中小企業の報告ではScope 3は任意です。除外する項目は0のままにしてください。すべて0の場合、結果はScope 1・2のみとなります。',
      source: '出典：出張手配レポート、経費精算、従業員の通勤調査、廃棄物処理業者の報告書、水道料金の請求書。',
      preview: 'Scope 3 プレビュー',
      calculate: '結果を計算',
      categoryTitle: 'カテゴリ{number} — {name}',
      subtotal: '小計',
      factorLine: '{unit}あたり {factor} kg CO₂e',
      categories: {
        cat5Waste: '事業から出る廃棄物',
        cat6Travel: '出張',
        cat7Commuting: '雇用者の通勤',
      },
      fields: {
        flightShortHaulKm: '航空機 — 短距離（3,700 km未満）',
        flightLongHaulKm: '航空機 — 長距離',
        railKm: '鉄道',
        carKm: '自動車（レンタカー、タクシー、私有車）',
        hotelNights: 'ホテル宿泊',
        commuteCarKm: '自動車通勤',
        commutePublicTransportKm: 'バス・地下鉄・電車での通勤',
        wasteLandfillTonnes: '埋立処分の廃棄物',
        wasteRecycledTonnes: 'リサイクルされた廃棄物',
        waterM3: '上水道・下水道',
      },
      units: {
        m3: 'm³',
        tonnes: 'トン',
        passengerKm: '人キロ',
        km: 'km',
        roomNights: '泊',
      },
      notCovered:
        '未対応：購入した製品（支出ベース）、資本財、上流の輸送、燃料・エネルギー関連活動、下流カテゴリ。',
    },
    results: {
      scope3ValueChain: 'SCOPE 3 — バリューチェーン',
      scope3Breakdown: 'カテゴリ別Scope 3',
      comparisonLabels: { total: '合計', scope1: 'Scope 1', scope2: 'Scope 2', scope3: 'Scope 3' },
      pdfScope3Factors: 'Scope 3 活動係数',
    },
  },
  zh: {
    scope2: { continueScope3: '继续 Scope 3' },
    scope3: {
      title: 'Scope 3 — 价值链',
      subtitle: '可选：来自商务差旅、员工通勤、废弃物和用水的间接排放。',
      optionalNote:
        '对于大多数中小企业报告，Scope 3为可选项。将某行保留为 0 即可排除；若全部为 0，结果仅涵盖Scope 1 和 Scope 2。',
      source: '来源：差旅预订报告、费用报销、员工通勤调查、废弃物处理商报告和水费账单。',
      preview: 'Scope 3预览',
      calculate: '计算结果',
      categoryTitle: '类别 {number} — {name}',
      subtotal: '小计',
      factorLine: '每{unit} {factor} kg CO₂e',
      categories: {
        cat5Waste: '运营中产生的废弃物',
        cat6Travel: '商务差旅',
        cat7Commuting: '员工通勤',
      },
      fields: {
        flightShortHaulKm: '航班 — 短途（< 3,700 公里）',
        flightLongHaulKm: '航班 — 长途',
        railKm: '铁路出行',
        carKm: '汽车出行（租车、出租车、私家车报销）',
        hotelNights: '酒店住宿',
        commuteCarKm: '驾车通勤',
        commutePublicTransportKm: '公交 / 地铁 / 火车通勤',
        wasteLandfillTonnes: '填埋废弃物',
        wasteRecycledTonnes: '回收废弃物',
        waterM3: '供水和污水处理',
      },
      units: {
        m3: '立方米',
        tonnes: '吨',
        passengerKm: '人公里',
        km: '公里',
        roomNights: '间夜',
      },
      notCovered:
        '暂未涵盖：外购商品（基于支出）、资本货物、上游运输、燃料和能源相关活动以及下游类别。',
    },
    results: {
      scope3ValueChain: 'SCOPE 3 — 价值链',
      scope3Breakdown: 'Scope 3分类别',
      comparisonLabels: { total: '合计', scope1: 'Scope 1', scope2: 'Scope 2', scope3: 'Scope 3' },
      pdfScope3Factors: 'Scope 3活动排放因子',
    },
  },
  es: {
    scope2: { continueScope3: 'Continuar a Scope 3' },
    scope3: {
      title: 'Scope 3 — Cadena de valor',
      subtitle:
        'Opcional: emisiones indirectas de viajes de negocio, desplazamientos al trabajo, residuos y agua.',
      optionalNote:
        'El Scope 3 es opcional para la mayoría de las pymes. Deje una línea en 0 para excluirla; si todo es 0, los resultados cubren solo los Scope 1 y 2.',
      source:
        'Fuente: informes de reservas de viaje, notas de gastos, encuestas de movilidad del personal, informes del gestor de residuos y facturas de agua.',
      preview: 'Vista previa del Scope 3',
      calculate: 'Calcular resultados',
      categoryTitle: 'Categoría {number} — {name}',
      subtotal: 'Subtotal',
      factorLine: '{factor} kg CO₂e por {unit}',
      categories: {
        cat5Waste: 'Residuos generados en las operaciones',
        cat6Travel: 'Viajes de negocio',
        cat7Commuting: 'Desplazamiento de empleados',
      },
      fields: {
        flightShortHaulKm: 'Vuelos — corta distancia (< 3.700 km)',
        flightLongHaulKm: 'Vuelos — larga distancia',
        railKm: 'Tren',
        carKm: 'Coche (alquiler, taxi, vehículos particulares)',
        hotelNights: 'Noches de hotel',
        commuteCarKm: 'Desplazamiento en coche',
        commutePublicTransportKm: 'Desplazamiento en autobús / metro / tren',
        wasteLandfillTonnes: 'Residuos a vertedero',
        wasteRecycledTonnes: 'Residuos reciclados',
        waterM3: 'Suministro de agua y aguas residuales',
      },
      units: {
        m3: 'm³',
        tonnes: 'tonelada',
        passengerKm: 'pasajero-km',
        km: 'km',
        roomNights: 'noche',
      },
      notCovered:
        'Aún no incluido: compras (basado en gasto), bienes de capital, transporte aguas arriba, actividades relacionadas con combustibles y energía, y categorías aguas abajo.',
    },
    results: {
      scope3ValueChain: 'SCOPE 3 — CADENA DE VALOR',
      scope3Breakdown: 'Scope 3 por categoría',
      comparisonLabels: { total: 'Total', scope1: 'Scope 1', scope2: 'Scope 2', scope3: 'Scope 3' },
      pdfScope3Factors: 'Factores de actividad del Scope 3',
    },
  },
  pt: {
    scope2: { continueScope3: 'Continuar para Scope 3' },
    scope3: {
      title: 'Scope 3 — Cadeia de valor',
      subtitle:
        'Opcional: emissões indiretas de viagens a negócios, deslocamento de funcionários, resíduos e água.',
      optionalNote:
        'O Scope 3 é opcional para a maioria das PMEs. Deixe uma linha em 0 para excluí-la; se tudo estiver em 0, os resultados cobrem apenas os Scope 1 e 2.',
      source:
        'Fonte: relatórios de reservas de viagem, reembolsos de despesas, pesquisas de deslocamento, relatórios do gestor de resíduos e contas de água.',
      preview: 'Prévia do Scope 3',
      calculate: 'Calcular resultados',
      categoryTitle: 'Categoria {number} — {name}',
      subtotal: 'Subtotal',
      factorLine: '{factor} kg CO₂e por {unit}',
      categories: {
        cat5Waste: 'Resíduos gerados nas operações',
        cat6Travel: 'Viagens a negócios',
        cat7Commuting: 'Deslocamento de funcionários',
      },
      fields: {
        flightShortHaulKm: 'Voos — curta distância (< 3.700 km)',
        flightLongHaulKm: 'Voos — longa distância',
        railKm: 'Trem',
        carKm: 'Carro (aluguel, táxi, veículos particulares)',
        hotelNights: 'Diárias de hotel',
        commuteCarKm: 'Deslocamento de carro',
        commutePublicTransportKm: 'Deslocamento de ônibus / metrô / trem',
        wasteLandfillTonnes: 'Resíduos para aterro',
        wasteRecycledTonnes: 'Resíduos reciclados',
        waterM3: 'Abastecimento de água e esgoto',
      },
      units: {
        m3: 'm³',
        tonnes: 'tonelada',
        passengerKm: 'passageiro-km',
        km: 'km',
        roomNights: 'diária',
      },
      notCovered:
        'Ainda não coberto: compras (baseado em gastos), bens de capital, transporte a montante, atividades relacionadas a combustíveis e energia e categorias a jusante.',
    },
    results: {
      scope3ValueChain: 'SCOPE 3 — CADEIA DE VALOR',
      scope3Breakdown: 'Scope 3 por categoria',
      comparisonLabels: { total: 'Total', scope1: 'Scope 1', scope2: 'Scope 2', scope3: 'Scope 3' },
      pdfScope3Factors: 'Fatores de atividade do Scope 3',
    },
  },
};
