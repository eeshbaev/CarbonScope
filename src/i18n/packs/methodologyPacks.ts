import type { DeepPartial } from '../buildLocale';
import type { TranslationKeys } from '../locales/en';

/**
 * Strings for the 2026 methodology update: base-period targets, like-for-like comparisons,
 * and corrected educational content. Merged last so it overrides older packs.
 */
export const METHODOLOGY_PACKS: Record<string, DeepPartial<TranslationKeys>> = {
  ru: {
    settings: {
      recalcAllTitle: 'Обновить отчёты до последних коэффициентов',
      recalcAllHint: 'Пересчитывает сохранённые отчёты по текущим наборам коэффициентов ({version}), чтобы сравнения и цели опирались на одну методологию. Каждый финальный отчёт сохраняет запись о прежнем результате.',
      recalcAllOutdated: 'Отчётов со старыми коэффициентами: {count}.',
      recalcAllNone: 'Все отчёты используют последние коэффициенты.',
      recalcAllButton: 'Пересчитать все отчёты',
      recalcAllConfirmTitle: 'Пересчитать все отчёты?',
      recalcAllConfirmMessage: 'Отчётов к пересчёту по последним коэффициентам: {count}. Данные о деятельности не меняются, а каждый финальный отчёт сохраняет прежний результат как примечание о пересчёте.',
      recalcAllDone: 'Пересчитано отчётов: {count}.',
    },
    home: { ghgAligned: 'На основе GHG Protocol' },
    onboarding: {
      scope2Body: 'Косвенные выбросы от покупной электроэнергии, тепла, пара и холода.',
      scope3Title: 'Что такое выбросы Scope 3?',
      scope3Body: 'Прочие косвенные выбросы в цепочке создания стоимости — закупки, грузоперевозки, командировки, поездки сотрудников и отходы. Необязательно, но всё чаще запрашивается.',
    },
    learnMore: {
      body: 'CarbonScope оценивает выбросы Scope 1, 2 и 3 на основе GHG Protocol — для МСП и ESG-консультантов.\n\nВсе результаты — в тCO₂э с потенциалами глобального потепления IPCC AR6.\n\nКоэффициенты сети задаются автоматически по стране (выбросы при генерации, локационный метод). Добавьте данные договоров, чтобы получить и рыночный результат.',
      articles: {
        ghgProtocol: { body: 'Корпоративный стандарт GHG Protocol — самая распространённая основа для корпоративной инвентаризации. Scope 1 — прямые выбросы от топлива и хладагентов. Scope 2 — покупные электроэнергия, тепло, пар и холод, отражаемые локационным и рыночным методами. Scope 3 — цепочка создания стоимости.\n\nCarbonScope охватывает Scope 1, Scope 2 (оба метода) и категории Scope 3 1, 3, 4, 5, 6 и 7 с документированными публичными коэффициентами. Подходит для базовой линии МСП и внутренней отчётности, но не заменяет внешнее заверение.' },
        scope1vs2: { body: 'Scope 1: топливо, сжигаемое в контролируемых вами активах (транспорт, котлы, генераторы), и утечки хладагентов из кондиционеров и холодильного оборудования.\n\nScope 2: покупные электроэнергия, тепло, пар и холод. Локационные выбросы зависят от структуры генерации сети, где вы потребляете энергию (кг CO₂э/кВт·ч).\n\nСовет: храните счета за энергию, топливо и услуги за каждый отчётный период — это основное подтверждение для аудита.' },
        csrd: { body: 'Директива ЕС о корпоративной отчётности в области устойчивого развития (CSRD) требует климатического раскрытия по ESRS E1, включая Scope 1, Scope 2 и существенные выбросы Scope 3. После поправок Omnibus I (Директива (ЕС) 2026/470) CSRD применяется к компаниям с численностью более 1 000 сотрудников и оборотом свыше 450 млн евро; листинговые МСП больше не охвачены.\n\nМелкие компании по-прежнему получают запросы данных от клиентов и банков, которые отчитываются. Для таких запросов предназначен добровольный стандарт для МСП (VSME).' },
        scope2Methods: { body: 'Локационный метод: выбросы от электроэнергии рассчитываются по среднему коэффициенту генерации сети в месте потребления (кг CO₂э/кВт·ч). CarbonScope задаёт его по вашей стране.\n\nРыночный метод: отражает то, что вы покупаете, — сертификаты ВИЭ (GO, REC, I-REC), PPA, коэффициент поставщика или остаточный микс. Введите эти данные на экране Scope 2; CarbonScope показывает оба результата, как требует GHG Protocol. Храните сертификаты и договоры.\n\nGHG Protocol пересматривает руководство по Scope 2 (консультация завершилась в январе 2026 г.); для рыночных заявлений предлагаются более строгие правила, например почасовое сопоставление.' },
        gridFactors: { body: 'Для Scope 2 CarbonScope использует коэффициенты сети по странам, основанные на выбросах при генерации: официальные национальные коэффициенты, где они есть (DESNZ — Великобритания, EPA eGRID — США, CEA — Индия, NGA — Австралия), а в остальных случаях — рассчитанные по последней годовой структуре генерации страны. Добыча топлива и сетевые потери учитываются отдельно в Scope 3, категория 3. Версия набора данных и базовый год показаны в результатах и настройках.\n\nВ «Настройки → Коэффициенты выбросов» можно задать собственный кг CO₂э/кВт·ч для любой страны, например национальный или коэффициент поставщика. Сохранённые отчёты сохраняют коэффициент, использованный при расчёте.' },
      },
    },
    notifications: {
      refresh6Body: 'Прошло 6 месяцев с обновления данных {company}. Пересчитайте выбросы с актуальными данными о топливе, энергии и деятельности.',
      reportingCalendarBody: '{company}: отчётность за {period} закрывается через две недели. Завершите ввод данных и экспортируйте пакет подтверждений.',
      reengagementBody: 'Продолжаете вести учёт для {company}? Обновите данные о топливе, энергии и деятельности за этот период.',
      tips: {
        csrdEsrs: 'В ЕС CSRD и ESRS E1 теперь применяются к компаниям с более чем 1 000 сотрудников и оборотом свыше 450 млн евро (Omnibus I, 2026). Такие компании часто запрашивают у поставщиков данные Scope 1 и 2.',
        parisAgreement: 'Парижское соглашение (2015) направлено на удержание потепления значительно ниже 2 °C и на усилия по его ограничению 1,5 °C. Сокращения компаний вносят вклад в национальные цели.',
        kyotoHistory: 'Киотский протокол (принят в 1997 г., вступил в силу в 2005 г.) установил обязательные цели для промышленно развитых стран на 2008–2012 гг., а по Дохинской поправке — на 2013–2020 гг. Он помог стандартизировать национальный учёт выбросов.',
        scienceMethane: 'Метан и закись азота удерживают гораздо больше тепла на килограмм, чем CO₂: примерно в 30 и 273 раза больше за 100 лет (IPCC AR6), а метан — около 80 раз за 20 лет. Сжигание топлива и утечки хладагентов входят в ваш прямой след.',
        scope3Note: 'Scope 3 охватывает выбросы цепочки создания стоимости: закупки, грузоперевозки, командировки, поездки сотрудников и отходы. В CarbonScope можно добавить самые распространённые категории вместе со Scope 1 и 2.',
      },
    },
    enterprise: {
      targets: {
        editHint: 'Прогресс относительно базового периода — самого раннего финального отчёта той же длительности.',
        targetPercent: 'Снижение на {value}% к базовому периоду',
        noBaseline: 'Нет более раннего финального отчёта той же длительности — этот отчёт является базовым.',
        basisScope12: 'Сравнение по Scope 1 + 2, так как охват Scope 3 отличается от базового периода.',
      },
    },
    results: {
      comparisonLabels: { scope12: 'Scope 1 + 2' },
      restatementTitle: 'Пересчитано с обновлёнными коэффициентами',
      restatementBody: 'Ранее {previous} {unit} ({stamp}). Сейчас {current} {unit}: {factor} за счёт обновлённых коэффициентов и {activity} за счёт изменённых данных о деятельности.',
      mixedFactorsNote: 'Эти отчёты рассчитаны по разным наборам коэффициентов. Пересчитайте все отчёты в «Настройки → Коэффициенты выбросов» для сопоставимого сравнения.',
    },
  },
  fr: {
    settings: {
      recalcAllTitle: 'Mettre les rapports à jour avec les derniers facteurs',
      recalcAllHint: 'Recalcule les rapports enregistrés avec les jeux de facteurs actuels ({version}) afin que comparaisons et objectifs reposent sur une seule méthode. Chaque rapport finalisé conserve une note de son résultat précédent.',
      recalcAllOutdated: '{count} rapports utilisent d’anciens facteurs.',
      recalcAllNone: 'Tous les rapports utilisent les derniers facteurs.',
      recalcAllButton: 'Recalculer tous les rapports',
      recalcAllConfirmTitle: 'Recalculer tous les rapports ?',
      recalcAllConfirmMessage: '{count} rapports seront recalculés avec les derniers facteurs d’émission. Les données d’activité ne changent pas et chaque rapport finalisé conserve son résultat précédent dans une note de retraitement.',
      recalcAllDone: '{count} rapports recalculés.',
    },
    home: { ghgAligned: 'Basé sur le GHG Protocol' },
    onboarding: {
      scope2Body: 'Émissions indirectes de l’électricité, de la chaleur, de la vapeur et du froid achetés.',
      scope3Title: 'Que sont les émissions Scope 3 ?',
      scope3Body: 'Autres émissions indirectes de votre chaîne de valeur : achats, fret, déplacements professionnels, trajets domicile-travail et déchets. Facultatif, mais de plus en plus demandé.',
    },
    learnMore: {
      body: 'CarbonScope estime les émissions des Scopes 1, 2 et 3 sur la base du GHG Protocol, pour les PME et les consultants ESG.\n\nTous les résultats sont en tCO₂e avec les potentiels de réchauffement global de l’AR6 du GIEC.\n\nLes facteurs du réseau électrique sont définis automatiquement selon le pays (émissions de production, méthode location-based). Ajoutez vos contrats pour obtenir aussi le résultat market-based.',
      articles: {
        ghgProtocol: { body: 'Le Corporate Standard du GHG Protocol est le cadre le plus utilisé pour les inventaires d’entreprise. Le Scope 1 couvre les émissions directes des combustibles et des fluides frigorigènes. Le Scope 2 couvre l’électricité, la chaleur, la vapeur et le froid achetés, déclarés en location-based et en market-based. Le Scope 3 couvre la chaîne de valeur.\n\nCarbonScope couvre le Scope 1, le Scope 2 (deux méthodes) et les catégories 1, 3, 4, 5, 6 et 7 du Scope 3 avec des facteurs publics documentés. Il convient aux bilans de référence des PME et au reporting interne — sans remplacer une vérification par un tiers.' },
        scope1vs2: { body: 'Scope 1 : combustibles brûlés dans les actifs que vous contrôlez (véhicules, chaudières, groupes électrogènes) et fuites de fluides frigorigènes de la climatisation et de la réfrigération.\n\nScope 2 : électricité, chaleur, vapeur et froid achetés. Les émissions location-based dépendent du mix de production du réseau où vous consommez (kg CO₂e/kWh).\n\nConseil : conservez les factures d’énergie, de carburant et de services de chaque période ; ce sont les principales preuves pour un audit.' },
        csrd: { body: 'La directive européenne sur la publication d’informations en matière de durabilité (CSRD) exige des informations climatiques selon l’ESRS E1, dont les Scopes 1, 2 et les émissions significatives du Scope 3. Depuis les amendements Omnibus I (directive (UE) 2026/470), la CSRD s’applique aux entreprises de plus de 1 000 salariés et de plus de 450 millions d’euros de chiffre d’affaires net ; les PME cotées ne sont plus concernées.\n\nLes petites entreprises reçoivent toujours des demandes de données de clients et de banques soumis au reporting. La norme volontaire pour les PME (VSME) est conçue pour ces demandes.' },
        scope2Methods: { body: 'Location-based : les émissions de l’électricité utilisent le facteur moyen de production du réseau où a lieu la consommation (kg CO₂e/kWh). CarbonScope le définit selon votre pays.\n\nMarket-based : reflète vos achats — certificats renouvelables (GO, REC, I-REC), PPA, facteur d’émission de votre fournisseur ou mix résiduel. Saisissez-les sur l’écran Scope 2 ; CarbonScope présente les deux résultats, comme l’exige le GHG Protocol. Conservez certificats et contrats.\n\nLe GHG Protocol révise ses lignes directrices Scope 2 (consultation close en janvier 2026) ; des règles plus strictes, comme l’appariement horaire, sont proposées pour les déclarations market-based.' },
        gridFactors: { body: 'Pour le Scope 2, CarbonScope utilise des facteurs réseau par pays fondés sur les émissions de production : facteurs nationaux officiels lorsqu’ils existent (DESNZ au Royaume-Uni, EPA eGRID aux États-Unis, CEA en Inde, NGA en Australie), sinon des facteurs calculés à partir du dernier mix annuel de production du pays. L’amont des combustibles et les pertes réseau sont comptés séparément en Scope 3, catégorie 3. Les résultats et les réglages indiquent la version du jeu de données et l’année de référence.\n\nDans Réglages → Facteurs d’émission, vous pouvez saisir un facteur personnalisé en kg CO₂e/kWh pour tout pays, par exemple un facteur national ou de fournisseur. Les rapports enregistrés conservent le facteur utilisé lors du calcul.' },
      },
    },
    notifications: {
      refresh6Body: 'Cela fait 6 mois que {company} n’a pas été mis à jour. Recalculez vos émissions avec des données actuelles de carburant, d’énergie et d’activité.',
      reportingCalendarBody: '{company} : le reporting {period} se clôt dans deux semaines. Finalisez vos données et exportez votre dossier de preuves.',
      reengagementBody: 'Vous suivez toujours {company} ? Mettez à jour les données de carburant, d’énergie et d’activité de cette période.',
      tips: {
        csrdEsrs: 'Dans l’UE, la CSRD et l’ESRS E1 s’appliquent désormais aux entreprises de plus de 1 000 salariés et de plus de 450 millions d’euros de chiffre d’affaires (Omnibus I, 2026). Ces entreprises demandent souvent à leurs fournisseurs des données Scope 1 et 2.',
        parisAgreement: 'L’Accord de Paris (2015) vise à contenir le réchauffement nettement en dessous de 2 °C et à poursuivre les efforts pour le limiter à 1,5 °C. Les réductions des entreprises contribuent aux objectifs nationaux.',
        kyotoHistory: 'Le Protocole de Kyoto (adopté en 1997, en vigueur en 2005) a fixé des objectifs contraignants aux pays industrialisés pour 2008–2012 puis, avec l’amendement de Doha, pour 2013–2020. Il a aidé à harmoniser la comptabilité nationale des émissions.',
        scienceMethane: 'Le méthane et le protoxyde d’azote retiennent bien plus de chaleur par kilogramme que le CO₂ : environ 30 et 273 fois plus sur 100 ans (GIEC AR6), et le méthane environ 80 fois plus sur 20 ans. La combustion et les fuites de frigorigènes font partie de votre empreinte directe.',
        scope3Note: 'Le Scope 3 couvre les émissions de la chaîne de valeur : achats, fret, déplacements professionnels, trajets domicile-travail et déchets. CarbonScope permet d’ajouter les catégories les plus courantes aux Scopes 1 et 2.',
      },
    },
    enterprise: {
      targets: {
        editHint: 'Suivi par rapport à votre période de référence : le premier rapport finalisé de même durée.',
        targetPercent: '−{value} % vs période de référence',
        noBaseline: 'Aucun rapport finalisé antérieur de même durée — ce rapport est votre période de référence.',
        basisScope12: 'Comparaison sur les Scopes 1 + 2, car le périmètre Scope 3 diffère de la période de référence.',
      },
    },
    results: {
      comparisonLabels: { scope12: 'Scope 1 + 2' },
      restatementTitle: 'Recalculé avec des facteurs mis à jour',
      restatementBody: 'Auparavant {previous} {unit} ({stamp}). Désormais {current} {unit} : {factor} dû aux facteurs d’émission mis à jour et {activity} dû aux données d’activité modifiées.',
      mixedFactorsNote: 'Ces rapports utilisent des jeux de facteurs différents. Recalculez tous les rapports dans Réglages → Facteurs d’émission pour une comparaison homogène.',
    },
  },
  de: {
    settings: {
      recalcAllTitle: 'Berichte auf die neuesten Faktoren aktualisieren',
      recalcAllHint: 'Berechnet gespeicherte Berichte mit den aktuellen Faktordatensätzen ({version}) neu, damit Vergleiche und Ziele auf einer Methodik beruhen. Jeder abgeschlossene Bericht behält einen Hinweis auf sein vorheriges Ergebnis.',
      recalcAllOutdated: '{count} Berichte verwenden ältere Faktoren.',
      recalcAllNone: 'Alle Berichte verwenden die neuesten Faktoren.',
      recalcAllButton: 'Alle Berichte neu berechnen',
      recalcAllConfirmTitle: 'Alle Berichte neu berechnen?',
      recalcAllConfirmMessage: '{count} Berichte werden mit den neuesten Emissionsfaktoren neu berechnet. Die Aktivitätsdaten bleiben unverändert; jeder abgeschlossene Bericht behält sein vorheriges Ergebnis als Korrekturhinweis.',
      recalcAllDone: '{count} Berichte neu berechnet.',
    },
    home: { ghgAligned: 'Auf Basis des GHG Protocol' },
    onboarding: {
      scope2Body: 'Indirekte Emissionen aus eingekauftem Strom, Wärme, Dampf und Kälte.',
      scope3Title: 'Was sind Scope-3-Emissionen?',
      scope3Body: 'Weitere indirekte Emissionen in Ihrer Wertschöpfungskette – Einkauf, Fracht, Geschäftsreisen, Pendeln und Abfall. Optional, aber zunehmend gefragt.',
    },
    learnMore: {
      body: 'CarbonScope schätzt Scope-1-, -2- und -3-Emissionen auf Basis des GHG Protocol – für KMU und ESG-Berater.\n\nAlle Ergebnisse in tCO₂e mit den Treibhauspotenzialen des IPCC AR6.\n\nNetzstromfaktoren werden automatisch nach Land gesetzt (Erzeugungsemissionen, standortbasiert). Ergänzen Sie Ihre Vertragsdaten, um zusätzlich den marktbasierten Wert zu erhalten.',
      articles: {
        ghgProtocol: { body: 'Der Corporate Standard des GHG Protocol ist das am weitesten verbreitete Rahmenwerk für Unternehmensbilanzen. Scope 1 umfasst direkte Emissionen aus Brennstoffen und Kältemitteln. Scope 2 umfasst eingekauften Strom, Wärme, Dampf und Kälte, berichtet standort- und marktbasiert. Scope 3 umfasst die Wertschöpfungskette.\n\nCarbonScope deckt Scope 1, Scope 2 (beide Methoden) und die Scope-3-Kategorien 1, 3, 4, 5, 6 und 7 mit dokumentierten öffentlichen Faktoren ab. Geeignet für KMU-Basisjahre und interne Berichte – kein Ersatz für eine externe Prüfung.' },
        scope1vs2: { body: 'Scope 1: Brennstoffe, die in von Ihnen kontrollierten Anlagen verbrannt werden (Fahrzeuge, Kessel, Generatoren), sowie Kältemittelverluste aus Klima- und Kälteanlagen.\n\nScope 2: eingekaufter Strom, Wärme, Dampf und Kälte. Standortbasierte Emissionen hängen vom Erzeugungsmix des Netzes ab, aus dem Sie beziehen (kg CO₂e/kWh).\n\nTipp: Bewahren Sie Energie-, Brennstoff- und Dienstleistungsrechnungen je Berichtszeitraum auf; sie sind der wichtigste Nachweis für Prüfungen.' },
        csrd: { body: 'Die EU-Richtlinie zur Nachhaltigkeitsberichterstattung (CSRD) verlangt Klimaangaben nach ESRS E1, einschließlich Scope 1, Scope 2 und wesentlicher Scope-3-Emissionen. Seit den Omnibus-I-Änderungen (Richtlinie (EU) 2026/470) gilt die CSRD für Unternehmen mit mehr als 1.000 Beschäftigten und über 450 Mio. € Nettoumsatz; börsennotierte KMU fallen nicht mehr darunter.\n\nKleinere Unternehmen erhalten weiterhin Datenanfragen von berichtspflichtigen Kunden und Banken. Der freiwillige KMU-Standard (VSME) ist für solche Anfragen gedacht.' },
        scope2Methods: { body: 'Standortbasiert: Stromemissionen nutzen den durchschnittlichen Erzeugungsfaktor des Netzes am Verbrauchsort (kg CO₂e/kWh). CarbonScope setzt ihn anhand Ihres Landes.\n\nMarktbasiert: bildet ab, was Sie einkaufen – Herkunftsnachweise (GO, REC, I-REC), PPAs, den Emissionsfaktor Ihres Versorgers oder einen Residualmix. Erfassen Sie diese im Scope-2-Bildschirm; CarbonScope weist beide Werte aus, wie es das GHG Protocol verlangt. Bewahren Sie Nachweise und Verträge auf.\n\nDas GHG Protocol überarbeitet seine Scope-2-Leitlinien (Konsultation im Januar 2026 abgeschlossen); für marktbasierte Angaben werden strengere Regeln wie stündliches Matching vorgeschlagen.' },
        gridFactors: { body: 'Für Scope 2 nutzt CarbonScope erzeugungsbasierte (direkte) Netzfaktoren je Land: offizielle nationale Faktoren, wo verfügbar (DESNZ für Großbritannien, EPA eGRID für die USA, CEA für Indien, NGA für Australien), ansonsten aus dem jüngsten Jahreserzeugungsmix des Landes abgeleitete Faktoren. Brennstoffvorketten und Netzverluste werden separat in Scope 3, Kategorie 3, erfasst. Ergebnisse und Einstellungen zeigen Datensatzversion und Bezugsjahr.\n\nUnter Einstellungen → Emissionsfaktoren können Sie für jedes Land einen eigenen Wert in kg CO₂e/kWh eingeben, z. B. einen nationalen oder Versorgerfaktor. Gespeicherte Berichte behalten den bei der Berechnung verwendeten Faktor.' },
      },
    },
    notifications: {
      refresh6Body: '{company} wurde seit 6 Monaten nicht aktualisiert. Berechnen Sie Ihre Emissionen mit aktuellen Brennstoff-, Energie- und Aktivitätsdaten neu.',
      reportingCalendarBody: '{company}: Die Berichterstattung für {period} schließt in zwei Wochen. Schließen Sie Ihre Daten ab und exportieren Sie Ihr Nachweispaket.',
      reengagementBody: 'Erfassen Sie {company} weiterhin? Aktualisieren Sie die Brennstoff-, Energie- und Aktivitätsdaten dieses Zeitraums.',
      tips: {
        csrdEsrs: 'In der EU gelten CSRD und ESRS E1 jetzt für Unternehmen mit mehr als 1.000 Beschäftigten und über 450 Mio. € Umsatz (Omnibus I, 2026). Diese Unternehmen fragen ihre Lieferanten oft nach Scope-1- und -2-Daten.',
        parisAgreement: 'Das Pariser Abkommen (2015) zielt darauf, die Erwärmung deutlich unter 2 °C zu halten, und strebt Anstrengungen zur Begrenzung auf 1,5 °C an. Reduktionen von Unternehmen tragen zu nationalen Zielen bei.',
        kyotoHistory: 'Das Kyoto-Protokoll (1997 verabschiedet, 2005 in Kraft) legte verbindliche Ziele für Industrieländer für 2008–2012 und mit der Doha-Änderung für 2013–2020 fest. Es half, die nationale Emissionsbilanzierung zu vereinheitlichen.',
        scienceMethane: 'Methan und Lachgas halten pro Kilogramm weit mehr Wärme zurück als CO₂: etwa 30- bzw. 273-mal mehr über 100 Jahre (IPCC AR6), Methan über 20 Jahre rund 80-mal mehr. Verbrennung und Kältemittelverluste gehören zu Ihrem direkten Fußabdruck.',
        scope3Note: 'Scope 3 umfasst Emissionen der Wertschöpfungskette wie Einkauf, Fracht, Geschäftsreisen, Pendeln und Abfall. In CarbonScope können Sie die häufigsten Kategorien zusätzlich zu Scope 1 und 2 erfassen.',
      },
    },
    enterprise: {
      targets: {
        editHint: 'Fortschritt gegenüber Ihrer Basisperiode: dem frühesten abgeschlossenen Bericht gleicher Länge.',
        targetPercent: '−{value} % gegenüber Basisperiode',
        noBaseline: 'Kein früherer abgeschlossener Bericht gleicher Länge — dieser Bericht ist Ihre Basisperiode.',
        basisScope12: 'Vergleich auf Basis Scope 1 + 2, da die Scope-3-Abdeckung von der Basisperiode abweicht.',
      },
    },
    results: {
      comparisonLabels: { scope12: 'Scope 1 + 2' },
      restatementTitle: 'Mit aktualisierten Faktoren neu berechnet',
      restatementBody: 'Vorher {previous} {unit} ({stamp}). Jetzt {current} {unit}: {factor} durch aktualisierte Emissionsfaktoren und {activity} durch geänderte Aktivitätsdaten.',
      mixedFactorsNote: 'Diese Berichte nutzen unterschiedliche Faktordatensätze. Berechnen Sie alle Berichte unter Einstellungen → Emissionsfaktoren neu, um vergleichbar zu bleiben.',
    },
  },
  it: {
    settings: {
      recalcAllTitle: 'Aggiorna i report agli ultimi fattori',
      recalcAllHint: 'Ricalcola i report salvati con i dataset di fattori attuali ({version}) così confronti e obiettivi usano un’unica metodologia. Ogni report finalizzato conserva una nota del risultato precedente.',
      recalcAllOutdated: '{count} report usano fattori meno recenti.',
      recalcAllNone: 'Tutti i report usano gli ultimi fattori.',
      recalcAllButton: 'Ricalcola tutti i report',
      recalcAllConfirmTitle: 'Ricalcolare tutti i report?',
      recalcAllConfirmMessage: '{count} report verranno ricalcolati con gli ultimi fattori di emissione. I dati di attività non cambiano e ogni report finalizzato conserva il risultato precedente come nota di rideterminazione.',
      recalcAllDone: '{count} report ricalcolati.',
    },
    home: { ghgAligned: 'Basato sul GHG Protocol' },
    onboarding: {
      scope2Body: 'Emissioni indirette da elettricità, calore, vapore e freddo acquistati.',
      scope3Title: 'Cosa sono le emissioni Scope 3?',
      scope3Body: 'Altre emissioni indirette nella catena del valore: acquisti, trasporto merci, viaggi di lavoro, pendolarismo e rifiuti. Facoltative, ma sempre più richieste.',
    },
    learnMore: {
      body: 'CarbonScope stima le emissioni Scope 1, 2 e 3 sulla base del GHG Protocol, per PMI e consulenti ESG.\n\nTutti i risultati sono in tCO₂e con i potenziali di riscaldamento globale IPCC AR6.\n\nI fattori della rete elettrica sono impostati automaticamente per paese (emissioni di generazione, location-based). Aggiungi i dati contrattuali per ottenere anche il valore market-based.',
      articles: {
        ghgProtocol: { body: 'Il Corporate Standard del GHG Protocol è il quadro più diffuso per gli inventari aziendali. Lo Scope 1 copre le emissioni dirette da combustibili e refrigeranti. Lo Scope 2 copre elettricità, calore, vapore e freddo acquistati, rendicontati con metodo location-based e market-based. Lo Scope 3 copre la catena del valore.\n\nCarbonScope copre Scope 1, Scope 2 (entrambi i metodi) e le categorie Scope 3 1, 3, 4, 5, 6 e 7 con fattori pubblici documentati. È adatto a baseline di PMI e reporting interno, non sostituisce la verifica di terzi.' },
        scope1vs2: { body: 'Scope 1: combustibili bruciati in beni che controlli (veicoli, caldaie, generatori) e perdite di refrigerante da climatizzazione e refrigerazione.\n\nScope 2: elettricità, calore, vapore e freddo acquistati. Le emissioni location-based dipendono dal mix di generazione della rete in cui consumi (kg CO₂e/kWh).\n\nConsiglio: conserva fatture di energia, carburante e servizi per ogni periodo; sono la prova principale per gli audit.' },
        csrd: { body: 'La direttiva UE sulla rendicontazione di sostenibilità (CSRD) richiede informazioni climatiche secondo l’ESRS E1, incluse Scope 1, Scope 2 e le emissioni Scope 3 significative. Con le modifiche Omnibus I (direttiva (UE) 2026/470) la CSRD si applica alle imprese con oltre 1.000 dipendenti e oltre 450 milioni di euro di fatturato netto; le PMI quotate non rientrano più.\n\nLe imprese più piccole ricevono comunque richieste di dati da clienti e banche soggetti a rendicontazione. Lo standard volontario per le PMI (VSME) è pensato per queste richieste.' },
        scope2Methods: { body: 'Location-based: le emissioni dell’elettricità usano il fattore medio di generazione della rete in cui avviene il consumo (kg CO₂e/kWh). CarbonScope lo imposta in base al tuo paese.\n\nMarket-based: riflette ciò che acquisti — certificati rinnovabili (GO, REC, I-REC), PPA, il fattore del fornitore o un mix residuo. Inseriscili nella schermata Scope 2; CarbonScope riporta entrambi i valori, come richiede il GHG Protocol. Conserva certificati e contratti.\n\nIl GHG Protocol sta rivedendo la guida Scope 2 (consultazione chiusa a gennaio 2026); per le dichiarazioni market-based sono proposte regole più severe, come l’abbinamento orario.' },
        gridFactors: { body: 'Per lo Scope 2 CarbonScope usa fattori di rete per paese basati sulle emissioni di generazione: fattori nazionali ufficiali dove disponibili (DESNZ per il Regno Unito, EPA eGRID per gli USA, CEA per l’India, NGA per l’Australia), altrimenti fattori ricavati dal mix annuale di generazione più recente del paese. Filiera dei combustibili e perdite di rete sono contate a parte nello Scope 3, categoria 3. Risultati e impostazioni mostrano versione del dataset e anno di riferimento.\n\nIn Impostazioni → Fattori di emissione puoi inserire un fattore personalizzato in kg CO₂e/kWh per qualsiasi paese, ad esempio un fattore nazionale o del fornitore. I report salvati mantengono il fattore usato al momento del calcolo.' },
      },
    },
    notifications: {
      refresh6Body: 'Sono passati 6 mesi dall’ultimo aggiornamento di {company}. Ricalcola le emissioni con dati attuali su carburanti, energia e attività.',
      reportingCalendarBody: '{company}: la rendicontazione {period} si chiude tra due settimane. Completa i dati ed esporta il pacchetto di evidenze.',
      reengagementBody: 'Stai ancora monitorando {company}? Aggiorna i dati su carburanti, energia e attività di questo periodo.',
      tips: {
        csrdEsrs: 'Nell’UE CSRD ed ESRS E1 si applicano ora alle imprese con oltre 1.000 dipendenti e oltre 450 milioni di euro di fatturato (Omnibus I, 2026). Queste imprese chiedono spesso ai fornitori dati Scope 1 e 2.',
        parisAgreement: 'L’Accordo di Parigi (2015) mira a mantenere il riscaldamento ben al di sotto di 2 °C e a proseguire gli sforzi per limitarlo a 1,5 °C. Le riduzioni delle imprese contribuiscono agli obiettivi nazionali.',
        kyotoHistory: 'Il Protocollo di Kyoto (adottato nel 1997, in vigore dal 2005) ha fissato obiettivi vincolanti per i paesi industrializzati per il 2008–2012 e, con l’emendamento di Doha, per il 2013–2020. Ha contribuito a uniformare la contabilità nazionale delle emissioni.',
        scienceMethane: 'Metano e protossido di azoto trattengono molto più calore per chilogrammo rispetto alla CO₂: circa 30 e 273 volte di più su 100 anni (IPCC AR6), e il metano circa 80 volte su 20 anni. Combustione e perdite di refrigerante fanno parte della tua impronta diretta.',
        scope3Note: 'Lo Scope 3 copre le emissioni della catena del valore: acquisti, trasporto merci, viaggi di lavoro, pendolarismo e rifiuti. CarbonScope consente di aggiungere le categorie più comuni insieme a Scope 1 e 2.',
      },
    },
    enterprise: {
      targets: {
        editHint: 'Progressi rispetto al periodo base: il primo report finalizzato di pari durata.',
        targetPercent: '−{value}% vs periodo base',
        noBaseline: 'Nessun report finalizzato precedente di pari durata: questo report è il periodo base.',
        basisScope12: 'Confronto su Scope 1 + 2 perché la copertura Scope 3 differisce dal periodo base.',
      },
    },
    results: {
      comparisonLabels: { scope12: 'Scope 1 + 2' },
      restatementTitle: 'Ricalcolato con fattori aggiornati',
      restatementBody: 'In precedenza {previous} {unit} ({stamp}). Ora {current} {unit}: {factor} dovuto ai fattori di emissione aggiornati e {activity} ai dati di attività modificati.',
      mixedFactorsNote: 'Questi report usano dataset di fattori diversi. Ricalcola tutti i report in Impostazioni → Fattori di emissione per un confronto omogeneo.',
    },
  },
  ja: {
    settings: {
      recalcAllTitle: '報告を最新の係数に更新',
      recalcAllHint: '保存済みの報告を現在の係数データセット（{version}）で再計算し、比較や目標を同じ方法論にそろえます。確定済みの各報告には以前の結果が記録されます。',
      recalcAllOutdated: '古い係数を使っている報告：{count} 件',
      recalcAllNone: 'すべての報告が最新の係数を使用しています。',
      recalcAllButton: 'すべての報告を再計算',
      recalcAllConfirmTitle: 'すべての報告を再計算しますか？',
      recalcAllConfirmMessage: '{count} 件の報告を最新の排出係数で再計算します。活動量データは変わらず、確定済みの各報告には以前の結果が再表示の注記として残ります。',
      recalcAllDone: '{count} 件の報告を再計算しました。',
    },
    home: { ghgAligned: 'GHGプロトコルに基づく' },
    onboarding: {
      scope2Body: '購入した電力・熱・蒸気・冷熱による間接排出。',
      scope3Title: 'Scope 3 排出とは？',
      scope3Body: 'バリューチェーンにおけるその他の間接排出 — 購入品、貨物輸送、出張、通勤、廃棄物。任意ですが、求められる機会が増えています。',
    },
    learnMore: {
      body: 'CarbonScope は GHG プロトコルに基づき、Scope 1・2・3 の排出量を推計します。中小企業や ESG コンサルタント向けです。\n\nすべての結果は IPCC AR6 の地球温暖化係数を用いた tCO₂e で表示されます。\n\n系統電力の係数は国に応じて自動設定されます（発電時の排出、ロケーション基準）。契約情報を追加すると、マーケット基準の値も得られます。',
      articles: {
        ghgProtocol: { body: 'GHG プロトコルのコーポレート基準は、企業の排出量算定で最も広く使われている枠組みです。Scope 1 は燃料と冷媒による直接排出、Scope 2 は購入した電力・熱・蒸気・冷熱で、ロケーション基準とマーケット基準の両方で報告します。Scope 3 はバリューチェーンです。\n\nCarbonScope は Scope 1、Scope 2（両手法）、Scope 3 のカテゴリ 1・3・4・5・6・7 を、出典を明示した公開係数で扱います。中小企業の基準年設定や社内報告に適していますが、第三者保証の代わりにはなりません。' },
        scope1vs2: { body: 'Scope 1：自社が管理する設備（車両、ボイラー、発電機）で燃焼する燃料と、空調・冷凍設備からの冷媒漏えい。\n\nScope 2：購入した電力・熱・蒸気・冷熱。ロケーション基準の排出量は、消費地の系統の電源構成によって決まります（kg CO₂e/kWh）。\n\nヒント：報告期間ごとにエネルギー・燃料・サービスの請求書を保管してください。監査の主要な証拠になります。' },
        csrd: { body: 'EU の企業持続可能性報告指令（CSRD）は、ESRS E1 に基づく気候関連開示を求めており、Scope 1、Scope 2、重要な Scope 3 排出を含みます。Omnibus I 改正（指令 (EU) 2026/470）以降、CSRD の対象は従業員 1,000 人超かつ純売上高 4 億 5,000 万ユーロ超の企業となり、上場中小企業は対象外になりました。\n\n小規模企業も、報告義務のある顧客や銀行からデータを求められます。こうした依頼向けに任意の中小企業基準（VSME）があります。' },
        scope2Methods: { body: 'ロケーション基準：電力の排出量は、消費地の系統の平均発電排出係数（kg CO₂e/kWh）で算定します。CarbonScope は国に応じて設定します。\n\nマーケット基準：購入内容を反映します — 再エネ証書（GO、REC、I-REC）、PPA、電力会社の排出係数、残余ミックス。Scope 2 画面で入力すると、GHG プロトコルの要求どおり両方の値を表示します。証書や契約書は保管してください。\n\nGHG プロトコルは Scope 2 ガイダンスを改訂中です（意見募集は 2026 年 1 月に終了）。マーケット基準の主張には、時間単位のマッチングなどより厳しいルールが提案されています。' },
        gridFactors: { body: 'CarbonScope の Scope 2 は、発電時の排出に基づく（直接）国別系統係数を使います。公式の国別係数がある場合はそれを使用し（英国 DESNZ、米国 EPA eGRID、インド CEA、豪州 NGA）、それ以外は各国の最新年の電源構成から算出した係数を使います。燃料の上流と送配電ロスは Scope 3 カテゴリ 3 で別途計上します。データセットのバージョンと基準年は結果と設定に表示されます。\n\n設定 → 排出係数 で、任意の国について独自の kg CO₂e/kWh（国や電力会社の係数など）を入力できます。保存済みの報告は算定時の係数を保持します。' },
      },
    },
    notifications: {
      refresh6Body: '{company} の更新から 6 か月が経過しました。最新の燃料・エネルギー・活動データで排出量を再計算してください。',
      reportingCalendarBody: '{company}：{period} の報告期限まで 2 週間です。データを確定し、証拠パッケージをエクスポートしてください。',
      reengagementBody: '{company} の記録を続けていますか？今期の燃料・エネルギー・活動データを更新しましょう。',
      tips: {
        csrdEsrs: 'EU では、CSRD と ESRS E1 の対象が従業員 1,000 人超かつ売上高 4 億 5,000 万ユーロ超の企業になりました（Omnibus I、2026 年）。こうした企業はサプライヤーに Scope 1・2 のデータを求めることがよくあります。',
        parisAgreement: 'パリ協定（2015 年）は、気温上昇を 2°C を十分下回る水準に抑え、1.5°C に抑える努力を追求することを目指しています。企業の削減は各国の目標に貢献します。',
        kyotoHistory: '京都議定書（1997 年採択、2005 年発効）は、先進国に 2008〜2012 年、ドーハ改正により 2013〜2020 年の拘束力ある目標を定めました。各国の排出量算定の標準化にも役立ちました。',
        scienceMethane: 'メタンと一酸化二窒素は 1 kg あたり CO₂ よりはるかに多くの熱を閉じ込めます。100 年では約 30 倍と 273 倍（IPCC AR6）、メタンは 20 年では約 80 倍です。燃料の燃焼や冷媒の漏えいは直接排出に含まれます。',
        scope3Note: 'Scope 3 は購入品、貨物輸送、出張、通勤、廃棄物などバリューチェーンの排出を対象とします。CarbonScope では主なカテゴリを Scope 1・2 と合わせて追加できます。',
      },
    },
    enterprise: {
      targets: {
        editHint: '基準期間（同じ期間長で最初に確定した報告）に対する進捗を確認します。',
        targetPercent: '基準期間比 {value}% 削減',
        noBaseline: '同じ期間長の以前の確定報告がありません — この報告が基準期間です。',
        basisScope12: 'Scope 3 の対象範囲が基準期間と異なるため、Scope 1 + 2 で比較しています。',
      },
    },
    results: {
      comparisonLabels: { scope12: 'Scope 1 + 2' },
      restatementTitle: '更新された係数で再計算済み',
      restatementBody: '以前は {previous} {unit}（{stamp}）。現在は {current} {unit}：係数の更新による変化 {factor}、活動量データの変更による変化 {activity}。',
      mixedFactorsNote: 'これらの報告は異なる係数データセットで計算されています。同じ条件で比較するには、設定 → 排出係数ですべての報告を再計算してください。',
    },
  },
  zh: {
    settings: {
      recalcAllTitle: '将报告更新为最新因子',
      recalcAllHint: '使用当前因子数据集（{version}）重新计算已保存的报告，使比较和目标基于同一方法。每份已定稿报告都会保留其先前结果的说明。',
      recalcAllOutdated: '{count} 份报告使用旧因子。',
      recalcAllNone: '所有报告均使用最新因子。',
      recalcAllButton: '重新计算所有报告',
      recalcAllConfirmTitle: '重新计算所有报告？',
      recalcAllConfirmMessage: '将使用最新排放因子重新计算 {count} 份报告。活动数据不变，每份已定稿报告会将先前结果保留为重述说明。',
      recalcAllDone: '已重新计算 {count} 份报告。',
    },
    home: { ghgAligned: '基于 GHG Protocol' },
    onboarding: {
      scope2Body: '外购电力、热力、蒸汽和冷量产生的间接排放。',
      scope3Title: '什么是 Scope 3 排放？',
      scope3Body: '价值链中的其他间接排放——采购、货运、商务差旅、员工通勤和废弃物。可选，但越来越多地被要求提供。',
    },
    learnMore: {
      body: 'CarbonScope 基于 GHG Protocol 估算 Scope 1、2 和 3 排放，适用于中小企业和 ESG 顾问。\n\n所有结果均以 tCO₂e 表示，采用 IPCC AR6 全球变暖潜能值。\n\n电网电力因子按国家自动设置（发电排放，基于位置）。补充合同信息即可同时得到基于市场的结果。',
      articles: {
        ghgProtocol: { body: 'GHG Protocol 企业标准是企业温室气体盘查最广泛使用的框架。Scope 1 涵盖燃料和制冷剂的直接排放；Scope 2 涵盖外购电力、热力、蒸汽和冷量，按基于位置和基于市场两种方法报告；Scope 3 涵盖价值链。\n\nCarbonScope 使用有据可查的公开因子，覆盖 Scope 1、Scope 2（两种方法）以及 Scope 3 的第 1、3、4、5、6、7 类。适用于中小企业基准和内部报告，但不能替代第三方鉴证。' },
        scope1vs2: { body: 'Scope 1：在您控制的资产（车辆、锅炉、发电机）中燃烧的燃料，以及空调和制冷设备的制冷剂泄漏。\n\nScope 2：外购的电力、热力、蒸汽和冷量。基于位置的排放取决于您用电所在电网的发电结构（kg CO₂e/kWh）。\n\n提示：请保存每个报告期的能源、燃料和服务发票，它们是审核的主要依据。' },
        csrd: { body: '欧盟《企业可持续发展报告指令》（CSRD）要求按 ESRS E1 披露气候信息，包括 Scope 1、Scope 2 和重大的 Scope 3 排放。Omnibus I 修订（指令 (EU) 2026/470）后，CSRD 适用于员工超过 1,000 人且净营业额超过 4.5 亿欧元的企业；上市中小企业不再适用。\n\n较小的企业仍会收到负有报告义务的客户和银行的数据请求。自愿性中小企业标准（VSME）就是为这类请求设计的。' },
        scope2Methods: { body: '基于位置：电力排放采用用电所在电网的平均发电排放因子（kg CO₂e/kWh）。CarbonScope 根据您的国家设置。\n\n基于市场：反映您的采购——可再生能源证书（GO、REC、I-REC）、PPA、供应商排放因子或剩余组合。请在 Scope 2 页面填写；CarbonScope 按 GHG Protocol 的要求同时报告两个结果。请保存证书和合同。\n\nGHG Protocol 正在修订 Scope 2 指南（征求意见已于 2026 年 1 月结束），并提议对基于市场的声明采用更严格的规则，如逐小时匹配。' },
        gridFactors: { body: 'CarbonScope 的 Scope 2 采用基于发电排放（直接排放）的各国电网因子：有官方国家因子时采用官方值（英国 DESNZ、美国 EPA eGRID、印度 CEA、澳大利亚 NGA），否则根据该国最新年度发电结构推算。燃料上游和电网损耗在 Scope 3 第 3 类中单独计算。结果和设置中会显示数据集版本和参考年份。\n\n在“设置 → 排放因子”中，您可以为任意国家输入自定义的 kg CO₂e/kWh，例如国家或供电商因子。已保存的报告保留计算时使用的因子。' },
      },
    },
    notifications: {
      refresh6Body: '{company} 已有 6 个月未更新。请使用最新的燃料、能源和活动数据重新计算排放。',
      reportingCalendarBody: '{company}：{period} 报告将在两周后截止。请完成数据并导出证据包。',
      reengagementBody: '还在跟踪 {company} 吗？请更新本期的燃料、能源和活动数据。',
      tips: {
        csrdEsrs: '在欧盟，CSRD 和 ESRS E1 现适用于员工超过 1,000 人且营业额超过 4.5 亿欧元的企业（Omnibus I，2026 年）。这些企业经常向供应商索取 Scope 1 和 2 数据。',
        parisAgreement: '《巴黎协定》（2015 年）旨在将升温控制在远低于 2°C，并努力限制在 1.5°C 以内。企业减排有助于实现国家目标。',
        kyotoHistory: '《京都议定书》（1997 年通过，2005 年生效）为工业化国家设定了 2008–2012 年、以及经多哈修正案后 2013–2020 年的约束性目标，并推动了各国排放核算的标准化。',
        scienceMethane: '甲烷和氧化亚氮每千克截留的热量远多于 CO₂：100 年尺度上分别约为 30 倍和 273 倍（IPCC AR6），甲烷在 20 年尺度上约为 80 倍。燃料燃烧和制冷剂泄漏属于您的直接排放。',
        scope3Note: 'Scope 3 涵盖价值链排放，如采购、货运、商务差旅、员工通勤和废弃物。CarbonScope 可在 Scope 1 和 2 之外添加最常见的类别。',
      },
    },
    enterprise: {
      targets: {
        editHint: '对照基准期跟踪进度：即同等时长中最早的已定稿报告。',
        targetPercent: '较基准期减 {value}%',
        noBaseline: '没有同等时长的更早定稿报告——本报告即为基准期。',
        basisScope12: '由于 Scope 3 覆盖范围与基准期不同，按 Scope 1 + 2 比较。',
      },
    },
    results: {
      comparisonLabels: { scope12: 'Scope 1 + 2' },
      restatementTitle: '已使用更新后的因子重新计算',
      restatementBody: '此前为 {previous} {unit}（{stamp}）。现在为 {current} {unit}：其中 {factor} 来自排放因子更新，{activity} 来自活动数据变化。',
      mixedFactorsNote: '这些报告使用了不同的因子数据集。请在“设置 → 排放因子”中重新计算所有报告，以便同口径比较。',
    },
  },
  es: {
    settings: {
      recalcAllTitle: 'Actualizar los informes a los últimos factores',
      recalcAllHint: 'Recalcula los informes guardados con los conjuntos de factores actuales ({version}) para que comparaciones y objetivos usen una sola metodología. Cada informe finalizado conserva una nota de su resultado anterior.',
      recalcAllOutdated: '{count} informes usan factores anteriores.',
      recalcAllNone: 'Todos los informes usan los últimos factores.',
      recalcAllButton: 'Recalcular todos los informes',
      recalcAllConfirmTitle: '¿Recalcular todos los informes?',
      recalcAllConfirmMessage: 'Se recalcularán {count} informes con los últimos factores de emisión. Los datos de actividad no cambian y cada informe finalizado conserva su resultado anterior como nota de reexpresión.',
      recalcAllDone: '{count} informes recalculados.',
    },
    home: { ghgAligned: 'Basado en el GHG Protocol' },
    onboarding: {
      scope2Body: 'Emisiones indirectas de la electricidad, el calor, el vapor y el frío comprados.',
      scope3Title: '¿Qué son las emisiones de Scope 3?',
      scope3Body: 'Otras emisiones indirectas de su cadena de valor: compras, transporte de mercancías, viajes de negocio, desplazamientos al trabajo y residuos. Opcional, pero cada vez más solicitado.',
    },
    learnMore: {
      body: 'CarbonScope estima las emisiones de Scope 1, 2 y 3 según el GHG Protocol, para pymes y consultores ESG.\n\nTodos los resultados están en tCO₂e con los potenciales de calentamiento global del IPCC AR6.\n\nLos factores de la red eléctrica se fijan automáticamente por país (emisiones de generación, basado en ubicación). Añada sus contratos para obtener también el resultado basado en mercado.',
      articles: {
        ghgProtocol: { body: 'El Corporate Standard del GHG Protocol es el marco más utilizado para los inventarios corporativos. Scope 1 cubre las emisiones directas de combustibles y refrigerantes. Scope 2 cubre la electricidad, el calor, el vapor y el frío comprados, informados con los métodos basado en ubicación y basado en mercado. Scope 3 cubre la cadena de valor.\n\nCarbonScope cubre Scope 1, Scope 2 (ambos métodos) y las categorías 1, 3, 4, 5, 6 y 7 de Scope 3 con factores públicos documentados. Es adecuado para líneas base de pymes e informes internos, sin sustituir la verificación de terceros.' },
        scope1vs2: { body: 'Scope 1: combustibles quemados en activos que usted controla (vehículos, calderas, generadores) y fugas de refrigerante de climatización y refrigeración.\n\nScope 2: electricidad, calor, vapor y frío comprados. Las emisiones basadas en ubicación dependen del mix de generación de la red donde consume (kg CO₂e/kWh).\n\nConsejo: guarde las facturas de energía, combustible y servicios de cada periodo; son la principal evidencia para auditorías.' },
        csrd: { body: 'La Directiva de la UE sobre información corporativa en materia de sostenibilidad (CSRD) exige divulgaciones climáticas según la ESRS E1, incluidas Scope 1, Scope 2 y las emisiones significativas de Scope 3. Desde las modificaciones Omnibus I (Directiva (UE) 2026/470), la CSRD se aplica a empresas con más de 1.000 empleados y más de 450 millones de euros de volumen de negocio neto; las pymes cotizadas ya no están incluidas.\n\nLas empresas más pequeñas siguen recibiendo solicitudes de datos de clientes y bancos que informan. La norma voluntaria para pymes (VSME) está pensada para estas solicitudes.' },
        scope2Methods: { body: 'Basado en ubicación: las emisiones de la electricidad usan el factor medio de generación de la red donde se consume (kg CO₂e/kWh). CarbonScope lo fija según su país.\n\nBasado en mercado: refleja lo que compra — certificados renovables (GO, REC, I-REC), PPA, el factor de emisión de su comercializadora o un mix residual. Introdúzcalos en la pantalla de Scope 2; CarbonScope muestra ambos resultados, como exige el GHG Protocol. Conserve certificados y contratos.\n\nEl GHG Protocol está revisando su guía de Scope 2 (consulta cerrada en enero de 2026); se proponen reglas más estrictas, como la correspondencia horaria, para las declaraciones basadas en mercado.' },
        gridFactors: { body: 'Para Scope 2, CarbonScope usa factores de red por país basados en las emisiones de generación (directas): factores nacionales oficiales cuando existen (DESNZ en Reino Unido, EPA eGRID en EE. UU., CEA en India, NGA en Australia) y, si no, factores derivados del último mix anual de generación del país. La cadena de suministro de combustibles y las pérdidas de red se cuentan por separado en Scope 3, categoría 3. Los resultados y los ajustes muestran la versión del conjunto de datos y el año de referencia.\n\nEn Ajustes → Factores de emisión puede introducir un factor propio en kg CO₂e/kWh para cualquier país, por ejemplo uno nacional o de su comercializadora. Los informes guardados conservan el factor usado al calcularlos.' },
      },
    },
    notifications: {
      refresh6Body: 'Han pasado 6 meses desde la última actualización de {company}. Recalcule sus emisiones con datos actuales de combustible, energía y actividad.',
      reportingCalendarBody: '{company}: el informe de {period} cierra en dos semanas. Finalice sus datos y exporte su paquete de evidencias.',
      reengagementBody: '¿Sigue registrando {company}? Actualice los datos de combustible, energía y actividad de este periodo.',
      tips: {
        csrdEsrs: 'En la UE, la CSRD y la ESRS E1 se aplican ahora a empresas con más de 1.000 empleados y más de 450 millones de euros de facturación (Omnibus I, 2026). Estas empresas suelen pedir a sus proveedores datos de Scope 1 y 2.',
        parisAgreement: 'El Acuerdo de París (2015) busca mantener el calentamiento muy por debajo de 2 °C y proseguir los esfuerzos para limitarlo a 1,5 °C. Las reducciones de las empresas contribuyen a los objetivos nacionales.',
        kyotoHistory: 'El Protocolo de Kioto (adoptado en 1997, en vigor desde 2005) fijó objetivos vinculantes para los países industrializados para 2008–2012 y, con la Enmienda de Doha, para 2013–2020. Ayudó a estandarizar la contabilidad nacional de emisiones.',
        scienceMethane: 'El metano y el óxido nitroso retienen mucho más calor por kilogramo que el CO₂: unas 30 y 273 veces más a 100 años (IPCC AR6), y el metano unas 80 veces más a 20 años. La combustión y las fugas de refrigerante forman parte de su huella directa.',
        scope3Note: 'Scope 3 cubre las emisiones de la cadena de valor, como compras, transporte de mercancías, viajes de negocio, desplazamientos al trabajo y residuos. CarbonScope permite añadir las categorías más comunes junto a Scope 1 y 2.',
      },
    },
    enterprise: {
      targets: {
        editHint: 'Progreso frente a su periodo base: el primer informe finalizado de la misma duración.',
        targetPercent: '−{value} % vs periodo base',
        noBaseline: 'No hay un informe finalizado anterior de la misma duración: este informe es su periodo base.',
        basisScope12: 'Comparado en Scope 1 + 2 porque la cobertura de Scope 3 difiere del periodo base.',
      },
    },
    results: {
      comparisonLabels: { scope12: 'Scope 1 + 2' },
      restatementTitle: 'Recalculado con factores actualizados',
      restatementBody: 'Antes {previous} {unit} ({stamp}). Ahora {current} {unit}: {factor} por los factores de emisión actualizados y {activity} por cambios en los datos de actividad.',
      mixedFactorsNote: 'Estos informes usan conjuntos de factores distintos. Recalcule todos los informes en Ajustes → Factores de emisión para comparar en igualdad de condiciones.',
    },
  },
  pt: {
    settings: {
      recalcAllTitle: 'Atualizar relatórios para os fatores mais recentes',
      recalcAllHint: 'Recalcula os relatórios salvos com os conjuntos de fatores atuais ({version}) para que comparações e metas usem uma só metodologia. Cada relatório finalizado mantém uma nota do resultado anterior.',
      recalcAllOutdated: '{count} relatórios usam fatores antigos.',
      recalcAllNone: 'Todos os relatórios usam os fatores mais recentes.',
      recalcAllButton: 'Recalcular todos os relatórios',
      recalcAllConfirmTitle: 'Recalcular todos os relatórios?',
      recalcAllConfirmMessage: '{count} relatórios serão recalculados com os fatores de emissão mais recentes. Os dados de atividade não mudam, e cada relatório finalizado mantém o resultado anterior como nota de reapresentação.',
      recalcAllDone: '{count} relatórios recalculados.',
    },
    home: { ghgAligned: 'Baseado no GHG Protocol' },
    onboarding: {
      scope2Body: 'Emissões indiretas de eletricidade, calor, vapor e frio comprados.',
      scope3Title: 'O que são emissões de Scope 3?',
      scope3Body: 'Outras emissões indiretas da sua cadeia de valor — compras, frete, viagens a negócios, deslocamento de funcionários e resíduos. Opcional, mas cada vez mais solicitado.',
    },
    learnMore: {
      body: 'O CarbonScope estima emissões de Scope 1, 2 e 3 com base no GHG Protocol, para PMEs e consultores ESG.\n\nTodos os resultados estão em tCO₂e com os potenciais de aquecimento global do IPCC AR6.\n\nOs fatores da rede elétrica são definidos automaticamente pelo país (emissões de geração, por localização). Adicione os dados dos seus contratos para obter também o resultado baseado em mercado.',
      articles: {
        ghgProtocol: { body: 'O Corporate Standard do GHG Protocol é o referencial mais usado para inventários corporativos. O Scope 1 abrange emissões diretas de combustíveis e refrigerantes. O Scope 2 abrange eletricidade, calor, vapor e frio comprados, relatados por localização e baseados em mercado. O Scope 3 abrange a cadeia de valor.\n\nO CarbonScope cobre Scope 1, Scope 2 (ambos os métodos) e as categorias 1, 3, 4, 5, 6 e 7 do Scope 3 com fatores públicos documentados. É adequado para linhas de base de PMEs e relatórios internos — não substitui a verificação por terceiros.' },
        scope1vs2: { body: 'Scope 1: combustíveis queimados em ativos que você controla (veículos, caldeiras, geradores) e vazamentos de refrigerante de ar-condicionado e refrigeração.\n\nScope 2: eletricidade, calor, vapor e frio comprados. As emissões por localização dependem da matriz de geração da rede onde você consome (kg CO₂e/kWh).\n\nDica: guarde as faturas de energia, combustível e serviços de cada período; elas são a principal evidência para auditorias.' },
        csrd: { body: 'A Diretiva da UE de relato de sustentabilidade corporativa (CSRD) exige divulgações climáticas segundo a ESRS E1, incluindo Scope 1, Scope 2 e emissões significativas de Scope 3. Desde as alterações Omnibus I (Diretiva (UE) 2026/470), a CSRD aplica-se a empresas com mais de 1.000 funcionários e mais de 450 milhões de euros de faturamento líquido; PMEs cotadas deixaram de estar abrangidas.\n\nEmpresas menores continuam recebendo pedidos de dados de clientes e bancos que relatam. O padrão voluntário para PMEs (VSME) foi criado para esses pedidos.' },
        scope2Methods: { body: 'Por localização: as emissões de eletricidade usam o fator médio de geração da rede onde ocorre o consumo (kg CO₂e/kWh). O CarbonScope define-o pelo seu país.\n\nBaseado em mercado: reflete o que você compra — certificados renováveis (GO, REC, I-REC), PPAs, o fator de emissão do fornecedor ou um mix residual. Informe-os na tela de Scope 2; o CarbonScope apresenta os dois resultados, como exige o GHG Protocol. Guarde certificados e contratos.\n\nO GHG Protocol está revisando sua orientação de Scope 2 (consulta encerrada em janeiro de 2026), com regras mais rígidas, como correspondência horária, propostas para alegações baseadas em mercado.' },
        gridFactors: { body: 'No Scope 2, o CarbonScope usa fatores de rede por país baseados nas emissões de geração (diretas): fatores nacionais oficiais quando disponíveis (DESNZ no Reino Unido, EPA eGRID nos EUA, CEA na Índia, NGA na Austrália) e, caso contrário, fatores derivados da matriz anual de geração mais recente do país. A cadeia de combustíveis e as perdas na rede são contadas separadamente no Scope 3, categoria 3. Resultados e configurações mostram a versão do conjunto de dados e o ano de referência.\n\nEm Configurações → Fatores de emissão você pode informar um fator próprio em kg CO₂e/kWh para qualquer país, por exemplo um fator nacional ou do fornecedor. Relatórios salvos mantêm o fator usado no cálculo.' },
      },
    },
    notifications: {
      refresh6Body: 'Faz 6 meses desde a última atualização de {company}. Recalcule suas emissões com dados atuais de combustível, energia e atividade.',
      reportingCalendarBody: '{company}: o relato de {period} fecha em duas semanas. Finalize seus dados e exporte seu pacote de evidências.',
      reengagementBody: 'Ainda acompanhando {company}? Atualize os dados de combustível, energia e atividade deste período.',
      tips: {
        csrdEsrs: 'Na UE, a CSRD e a ESRS E1 aplicam-se agora a empresas com mais de 1.000 funcionários e mais de 450 milhões de euros de faturamento (Omnibus I, 2026). Essas empresas costumam pedir dados de Scope 1 e 2 aos fornecedores.',
        parisAgreement: 'O Acordo de Paris (2015) visa manter o aquecimento bem abaixo de 2 °C e envidar esforços para limitá-lo a 1,5 °C. As reduções das empresas contribuem para as metas nacionais.',
        kyotoHistory: 'O Protocolo de Quioto (adotado em 1997, em vigor desde 2005) estabeleceu metas vinculantes para países industrializados para 2008–2012 e, com a Emenda de Doha, para 2013–2020. Ajudou a padronizar a contabilidade nacional de emissões.',
        scienceMethane: 'O metano e o óxido nitroso retêm muito mais calor por quilograma do que o CO₂: cerca de 30 e 273 vezes mais em 100 anos (IPCC AR6), e o metano cerca de 80 vezes mais em 20 anos. A combustão e os vazamentos de refrigerante fazem parte da sua pegada direta.',
        scope3Note: 'O Scope 3 abrange emissões da cadeia de valor, como compras, frete, viagens a negócios, deslocamento de funcionários e resíduos. O CarbonScope permite adicionar as categorias mais comuns junto com Scope 1 e 2.',
      },
    },
    enterprise: {
      targets: {
        editHint: 'Progresso em relação ao período-base: o primeiro relatório finalizado de mesma duração.',
        targetPercent: '−{value}% vs período-base',
        noBaseline: 'Nenhum relatório finalizado anterior de mesma duração — este relatório é o seu período-base.',
        basisScope12: 'Comparado em Scope 1 + 2 porque a cobertura do Scope 3 difere do período-base.',
      },
    },
    results: {
      comparisonLabels: { scope12: 'Scope 1 + 2' },
      restatementTitle: 'Recalculado com fatores atualizados',
      restatementBody: 'Antes {previous} {unit} ({stamp}). Agora {current} {unit}: {factor} pelos fatores de emissão atualizados e {activity} pelas mudanças nos dados de atividade.',
      mixedFactorsNote: 'Estes relatórios usam conjuntos de fatores diferentes. Recalcule todos os relatórios em Configurações → Fatores de emissão para uma comparação equivalente.',
    },
  },
};
