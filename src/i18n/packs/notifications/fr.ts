import type { DeepPartial } from '../../buildLocale';
import type { TranslationKeys } from '../../locales/en';

export const frNotifications: DeepPartial<TranslationKeys> = {
  notifications: {
    section: 'Notifications',
    master: 'Rappels et conseils',
    masterHint:
      'Rappels locaux utiles basés sur vos évaluations (aucune donnée ne quitte votre appareil).',
    drafts: 'Évaluations inachevées',
    monthly: 'Saisie mensuelle des données',
    refresh: 'Rappels de mise à jour des données',
    periodEnd: 'Fin de période de reporting',
    reportingCalendar: 'Calendrier de reporting',
    educational: 'Conseils hebdomadaires (reporting et climat)',
    educationalHint:
      'Facultatif. Une courte note par semaine (dimanche, mardi ou jeudi uniquement) sur les normes, la science climatique, l\'histoire et l\'innovation — jamais promotionnelle.',
    reengagement: 'Rappels de reprise',
    initiatives: 'Suivi des initiatives',
    initiativeTitle: 'Vérifiez vos initiatives de réduction',
    initiativeBody: 'Vous avez défini des actions pour {company}. Faites le point.',
    permissionTitle: 'Restez à jour avec des rappels',
    permissionBody:
      'CarbonScope peut envoyer des conseils professionnels et des rappels sur vos périodes de reporting, vos saisies mensuelles et vos évaluations inachevées. Vous contrôlez chaque catégorie dans les Paramètres.',
    enable: 'Activer les rappels',
    notNow: 'Plus tard',
    draftTitle: 'Évaluation inachevée',
    draftBody:
      'Vous avez une évaluation inachevée pour {company}. Ouvrez CarbonScope pour continuer.',
    monthlyTitle: 'Saisie mensuelle des données',
    monthlyBody: 'Ajoutez les données de {month} pour {company}{categories}.',
    monthlyCategoriesSuffix: ' ({categories})',
    refresh6Title: 'Il est temps de mettre à jour vos données',
    refresh6Body:
      'Cela fait 6 mois depuis votre dernière mise à jour pour {company}. Recalculez les émissions Scope 1 et 2 avec les données actuelles de combustibles et d\'électricité.',
    refresh12Title: 'Rappel de mise à jour annuelle',
    refresh12Body:
      'Cela fait 12 mois depuis votre dernière mise à jour pour {company}. Actualisez votre évaluation pour un reporting précis.',
    periodEndTitle: 'Fin de période de reporting proche',
    periodEndBody:
      '{company} : votre fenêtre de reporting {period} se termine dans 7 jours. Vérifiez ou finalisez vos saisies.',
    reportingCalendarTitle: 'Échéance de reporting proche',
    reportingCalendarBody:
      '{company} : clôture du {period} dans deux semaines. Finalisez Scope 1 & 2 et exportez le dossier de preuves.',
    firstSuccessTitle: 'Votre rapport d\'émissions est prêt',
    firstSuccessBody:
      'Ouvrez CarbonScope pour consulter les résultats et exporter un PDF. Conseil : le Scope 2 évolue lorsque vous modifiez le pays ou la consommation d\'électricité.',
    educationalTitle: 'Conseil carbone',
    insightOfWeekTitle: 'Insight de la semaine',
    insightTap: 'Appuyer pour lire',
    reengagementTitle: 'Mettez à jour votre évaluation carbone',
    reengagementBody:
      'Vous suivez toujours {company} ? Mettez à jour les combustibles et l\'électricité de cette période pour une image Scope 1 et 2 précise.',
    tips: {
      scope1Vs2:
        'Le Scope 1 couvre les combustibles brûlés directement (gazole, essence, gaz naturel). Le Scope 2 couvre l\'électricité achetée — les deux sont au cœur des inventaires GHG Protocol.',
      utilityBills:
        'Les factures d\'énergie et de combustible sont la source la plus fiable pour les kWh, litres et m³. Conservez un dossier par période de reporting.',
      gridFactor:
        'Les émissions Scope 2 dépendent du facteur d\'émission du réseau de votre pays. CarbonScope applique ce facteur automatiquement lorsque vous sélectionnez un pays.',
      monthlyTracking:
        'Pour les périodes semestrielles ou annuelles, la saisie mensuelle aide à repérer les pics saisonniers — utile pour les audits énergétiques et la publication ESG.',
      scope1Fuels:
        'Le gazole de flotte et le gaz sur site dominent souvent le Scope 1. Commencez par les catégories de combustible aux dépenses les plus élevées.',
      scope2Electricity:
        'L\'électricité des bureaux et des sites relève du Scope 2. Utilisez les kWh annuels des factures ou sous-compteurs ; les MWh peuvent être saisis et sont convertis automatiquement.',
      reportingPeriod:
        'Alignez votre date de début de reporting sur votre exercice fiscal ou votre année de reporting durable afin que les résultats concordent avec vos autres publications.',
      saveProgress:
        'Utilisez Enregistrer la progression sur Scope 1 ou 2 si vous devez rassembler des données plus tard — vos saisies restent sur cet appareil jusqu\'au calcul des résultats.',
      whyReportingMatters:
        'Mesurer les émissions Scope 1 et 2 aide les entreprises à comprendre leur impact climatique opérationnel, à établir des références et à répondre de façon crédible aux investisseurs, banques et clients.',
      whyReportingSME:
        'Les PME commencent souvent par les Scope 1 et 2, car les données sont à portée de main (factures de combustible et d\'électricité). Une référence claire soutient la croissance et les exigences d\'appels d\'offres.',
      whyReportingEnterprise:
        'Les grandes organisations appliquent des méthodes Scope 1 et 2 cohérentes sur l\'ensemble des sites afin que la consolidation, les objectifs et le reporting externe (CDP, rapports annuels) restent comparables d\'une année sur l\'autre.',
      ghgProtocol:
        'Le GHG Protocol est la norme mondiale la plus utilisée pour les inventaires d\'entreprise. Il définit les Scope 1, 2 et 3 et la comptabilisation des combustibles et de l\'électricité.',
      iso14064:
        'L\'ISO 14064-1 guide la quantification et le reporting des inventaires de GES au niveau de l\'organisation. Il complète le GHG Protocol et est référencé dans de nombreux dispositifs nationaux.',
      csrdEsrs:
        'Dans l\'UE, la CSRD et l\'ESRS E1 exigent des grandes entreprises et des sociétés cotées de publier leurs émissions avec une assurance croissante. Les Scope 1 et 2 constituent le point de départ habituel.',
      tcfdIfrs:
        'Le TCFD et l\'ISSB (IFRS S2) encouragent la publication des risques climatiques et des émissions. Des données Scope 1 et 2 fiables soutiennent la planification de transition et les dépôts financiers.',
      parisAgreement:
        'L\'Accord de Paris (2015) vise à limiter le réchauffement bien en dessous de 2 °C. Les objectifs nationaux se traduisent en politiques — les entreprises contribuent par des réductions mesurées dans leurs opérations.',
      kyotoHistory:
        'Le Protocole de Kyoto (ère 1995–2012) a introduit des objectifs contraignants pour de nombreux pays industrialisés et a contribué à standardiser la comptabilisation nationale des émissions.',
      co2Science:
        'Le CO₂ et d\'autres GES retiennent la chaleur dans l\'atmosphère. Les activités humaines — notamment la combustion de combustibles fossiles — ont porté le CO₂ atmosphérique bien au-dessus des niveaux préindustriels.',
      climateBusinessRisk:
        'Les risques physiques et de transition liés au changement climatique peuvent affecter les chaînes d\'approvisionnement, les coûts énergétiques et la réglementation. Les données d\'émissions sont un levier pour une planification d\'entreprise éclairée.',
      companyActions:
        'Les entreprises peuvent réduire les Scope 1 et 2 par l\'efficacité énergétique, le changement de combustible, l\'électricité renouvelable, la modernisation de flotte et l\'engagement des équipes sites — la mesure montre ce qui fonctionne.',
      energyEfficiency:
        'L\'éclairage LED, l\'optimisation CVC et la modernisation des moteurs réduisent souvent l\'électricité (Scope 2) avec des retours sur investissement rapides. Suivez les kWh avant et après pour voir l\'impact en tCO₂e.',
      renewableElectricity:
        'Les offres vertes, le solaire sur site et les contrats d\'achat d\'électricité (PPA) abaissent le Scope 2 lorsque vous pouvez revendiquer crédiblement des réductions market-based — conservez les certificats.',
      fleetAndHeat:
        'L\'électrification des flottes légères, les biocarburants certifiés et l\'amélioration des chaudières ciblent le Scope 1. Commencez par les véhicules et le chauffage utilisés toute l\'année.',
      industrialTech:
        'L\'électrification des procédés, la récupération de chaleur fatale et la gestion énergétique numérique se diffusent dans l\'industrie — ils réduisent coûts et Scope 1 et 2 à terme.',
      dataQuality:
        'Un inventaire de qualité documente les sources (factures, compteurs), les hypothèses et les périodes. Les notes dans votre évaluation aident les auditeurs et votre futur vous.',
      scope3Note:
        'Le Scope 3 couvre les émissions de la chaîne de valeur (fournisseurs, déplacements, produits). Les inventaires Scope 1 et 2 en sont la base — la plupart des référentiels les attendent en premier.',
      assurance:
        'La vérification tierce des données GES est de plus en plus attendue. Des méthodes cohérentes et des factures conservées facilitent l\'assurance lorsque vous en avez besoin.',
      sectorManufacturing:
        'Les industriels ont souvent un Scope 1 élevé (gaz, gazole) et un Scope 2 élevé (lignes de production). Le sous-comptage des procédés clés améliore la précision.',
      sectorOffice:
        'Les entreprises de bureau sont généralement dominées par le Scope 2 (électricité) avec un Scope 1 plus faible (groupes électrogènes, véhicules de société). Le choix du pays détermine le facteur réseau.',
      scienceMethane:
        'Le méthane et l\'oxyde nitreux réchauffent aussi le climat, souvent plus que le CO₂ sur 20 ans par unité. Le reporting combustibles et gaz capture une partie de votre empreinte GES directe.',
      keelingCurve:
        'Les mesures de Charles Keeling à Mauna Loa (depuis 1958) ont montré une hausse régulière du CO₂ — l\'un des registres mondiaux les plus clairs à la base de la science climatique moderne.',
      ipccScience:
        'Le GIEC synthétise la science évaluée par les pairs pour les décideurs. Ses rapports d\'évaluation éclairent l\'Accord de Paris et les plans climatiques nationaux dans le monde.',
      industrialCo2Rise:
        'L\'usage des combustibles fossiles depuis la révolution industrielle a multiplié les émissions de CO₂. Aujourd\'hui, l\'énergie et l\'industrie restent au cœur du reporting Scope 1 et 2.',
      euEts:
        'Le système européen d\'échange de quotas d\'émission (depuis 2005) plafonne le CO₂ de la production d\'électricité et de l\'industrie — un modèle étudié pour la tarification du carbone et la publication.',
      nordicHeating:
        'Les pays nordiques ont pionné le chauffage urbain et les renouvelables, réduisant les émissions liées au chauffage des bâtiments — pertinent pour comparer les facteurs réseau nationaux.',
      chinaRenewables:
        'La Chine mène le déploiement mondial de capacités solaire et éolienne. Les facteurs réseau reflètent toutefois le mix de production complet — la localisation compte pour le Scope 2.',
      greenHydrogen:
        'L\'hydrogène vert (électrolyse alimentée par des renouvelables) est testé pour l\'acier, la chimie et les transports lourds — de futures réductions Scope 1 dans l\'industrie.',
      steelInnovation:
        'La réduction directe du fer et les fours à arc électrique peuvent réduire la dépendance au charbon de l\'acier. Les spécialistes suivent les usines pilotes en Europe et en Asie.',
      carbonCapture:
        'Le captage du carbone (utilisation ou stockage) est déployé sur certains sites ciment et énergie. Il ne remplace pas l\'efficacité mais peut traiter des émissions de procédé difficiles à abattre.',
      brazilBiofuels:
        'Le programme brésilien d\'éthanol pour les flottes a réduit la dépendance à l\'essence sur des décennies — un exemple de changement de combustible transport dans les inventaires nationaux.',
      africaSolar:
        'Le solaire distribué et les mini-réseaux élargissent l\'accès en Afrique et réduisent l\'usage de groupes diesel — une voie concrète de réduction Scope 1 pour les sites.',
      copSummits:
        'Les conférences climat de l\'ONU (COP) coordonnent les négociations mondiales. Les données Scope 1 et 2 des entreprises soutiennent les engagements nationaux et les attentes des chaînes d\'approvisionnement.',
    },
  },
};
