const recommendation = (a: string, b: string, c: string) => [a, b, c] as [string, string, string];

export const en = {
  appName: 'CarbonScope',
  slogan: 'Fast Scope 1, 2 & 3 Emissions Calculator',
  tagline: 'GHG Protocol · Scope 1 & 2',
  common: {
    continue: 'Continue',
    save: 'Save',
    cancel: 'Cancel',
    error: 'Something went wrong',
    yes: 'Yes',
    no: 'No',
    delete: 'Delete',
    loading: 'Loading...',
    required: 'Required',
    perYear: '/year',
    tco2eYear: 'tCO₂e/year',
    tco2eByPeriod: {
      '6_months': 'tCO₂e/6 months',
      '1_year': 'tCO₂e/year',
    },
    kgCo2e: 'kg CO₂e',
    learnMore: 'Learn More',
    settings: 'Settings',
    language: 'Language',
    selectLanguage: 'Select Language',
    letsStart: "Let's Start",
    backHome: 'Back Home',
    editCalculation: 'Edit Calculation',
    startNew: 'Start New Calculation',
    search: 'Search',
    select: 'Select',
    gotIt: 'Got it',
    done: 'Done',
  },
  inputHints: {
    modalTitle: 'Where to find this data',
  },
  rateApp: {
    title: 'Enjoying CarbonScope?',
    message:
      'If this calculator helped with your Scope 1 & 2 assessment, a quick rating or review helps us improve the app for companies and ESG professionals.',
    rateNow: 'Rate now',
    maybeLater: 'Maybe later',
    noThanks: 'No thanks',
  },
  settings: {
    aboutSection: 'About',
    rateApp: 'Rate CarbonScope',
    privacyPolicy: 'Privacy Policy',
    version: 'Version',
    dataSection: 'Data',
    clearAllData: 'Clear all data',
    clearAllDataTitle: 'Clear all data?',
    clearAllDataMessage:
      'This permanently deletes all saved company assessments on this device. Language, accessibility, and other app preferences are kept.',
    clearAllDataDone: 'All assessment data cleared',
    clearAllDataFailed: 'Could not clear data. Please try again.',
    factorsSection: 'Emission factors',
    factorsHint:
      'Grid electricity factors (kg CO₂e/kWh) by country. Defaults from public datasets; you may override any country.',
    factorsVersion: 'Dataset version {version} · reference year {year}',
    factorsSources: 'Sources',
    fuelFactorsTitle: 'Fuel, refrigerant & heat factors',
    fuelFactorsVersion: 'Dataset {version} · reference year {year} · {gwp}',
    fuelFactorsSplit: 'CO₂ {co2} + CH₄ {ch4} + N₂O {n2o}',
    gridFactorsTitle: 'Grid electricity by country (Scope 2, location-based)',
    editFactor: 'Edit',
    resetFactor: 'Reset to default',
    factorEditTitle: 'Grid factor for {country}',
    factorEditHint: 'Enter kg CO₂e per kWh (e.g. 0.35). Used for Scope 2 when this country is selected.',
    factorInvalid: 'Enter a positive number',
    factorSaved: 'Custom factor saved',
    factorReset: 'Reset to default factor',
    factorCustomBadge: 'custom',
    accessibilitySection: 'Accessibility',
    accessibilityHint:
      'Adjust text and spacing in the app. These settings are saved on this device and are separate from your phone’s system display settings.',
    fontSizeLabel: 'Font size',
    displaySizeLabel: 'Display size',
    fontSizeSmall: 'Small',
    fontSizeDefault: 'Default',
    fontSizeLarge: 'Large',
    fontSizeExtraLarge: 'Extra large',
    displaySizeCompact: 'Compact',
    displaySizeDefault: 'Default',
    displaySizeComfortable: 'Comfortable',
    displaySizeLarge: 'Large',
    accessibilityPreview: 'Preview',
    accessibilityPreviewBody:
      'Sample text at your chosen size. Lists, buttons, and forms across CarbonScope follow these settings.',
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: May 2026',
    openWebVersion: 'Open web version',
    sections: [
      {
        title: 'Overview',
        body:
          'CarbonScope is an offline-first calculator. Your company assessments, inputs, and results are stored only on your device. We do not operate user accounts, cloud sync, analytics, advertising, or tracking in this app.',
      },
      {
        title: 'Data on your device',
        body:
          'Information you enter (such as company name, country, industry, fuel use, and electricity use) is saved locally on your device so you can view, edit, or delete assessments. Optional evidence files (PDFs or images) you attach are also stored locally in the app’s private storage.',
      },
      {
        title: 'Optional features',
        body:
          'If you enable notifications, reminders are scheduled on your device using your assessment data — nothing is sent to our servers. PDF export and file sharing use your device’s share sheet. Rating the app may open the Google Play or App Store review flow.',
      },
      {
        title: 'Data we do not collect',
        body:
          'We do not collect, transmit, or sell personal data to our servers. The app does not request location, contacts, photos library, or microphone access for its core functionality.',
      },
      {
        title: 'Deletion',
        body:
          'Delete individual assessments in the app, or use Settings → Clear all data to remove all saved assessments. Uninstalling the app removes locally stored data from your device.',
      },
      {
        title: 'Third parties',
        body:
          'Emission factors and calculations run inside the app. When you choose to rate the app, your device may open the Apple App Store or Google Play in-app review flow, which is governed by those platforms’ policies.',
      },
      {
        title: 'Children',
        body: 'CarbonScope is a business tool and is not directed at children under 13.',
      },
      {
        title: 'Contact',
        body:
          'Questions about privacy can be sent to the developer contact email listed on the App Store or Google Play listing.',
      },
    ],
  },
  delete: {
    confirmTitle: 'Delete assessment?',
    confirmMessage: 'Are you sure you want to delete this assessment?',
    deletedInList: 'Deleted',
  },
  onboarding: {
    title: 'Welcome to CarbonScope',
    subtitle: 'Simple carbon footprint calculation for companies and ESG professionals.',
    scope1Title: 'What are Scope 1 emissions?',
    scope1Body:
      'Direct emissions from company-owned fuel usage such as diesel, gasoline, and natural gas.',
    scope2Title: 'What are Scope 2 emissions?',
    scope2Body: 'Indirect emissions from purchased electricity consumption.',
    whyTitle: 'Why CarbonScope?',
    whyBody:
      'CarbonScope helps companies, consultants, banks, and ESG professionals quickly estimate operational carbon emissions aligned with GHG Protocol methodology.',
  },
  welcome: {
    description:
      'Calculate Scope 1 & 2 greenhouse gas emissions using internationally recognized GHG Protocol methods.',
    feature1: 'Instant calculations',
    feature2: 'Visual charts',
    feature3: 'Save calculation history',
    feature4: 'ESG-ready reports',
  },
  learnMore: {
    title: 'About CarbonScope',
    body:
      'CarbonScope provides fast Scope 1 and Scope 2 estimates aligned with the GHG Protocol — ideal for SMEs and ESG consultants.\n\nAll results are in tCO₂e.\n\nElectricity factors update automatically by country.',
    libraryTitle: 'Knowledge library',
    librarySubtitle: 'Offline reference for reporting specialists',
    openLibrary: 'Open knowledge library',
    articles: {
      ghgProtocol: {
        title: 'GHG Protocol overview',
        body:
          'The Greenhouse Gas Protocol Corporate Standard is the most widely used framework for company-level inventories. Scope 1 covers direct combustion; Scope 2 covers purchased electricity (location-based factors by grid). Scope 3 covers the value chain and is outside this app.\n\nCarbonScope implements Scope 1 fuel factors and Scope 2 grid factors suitable for SME baselines and internal reporting — not a substitute for third-party assurance.',
      },
      scope1vs2: {
        title: 'Scope 1 vs Scope 2',
        body:
          'Scope 1: diesel, petrol, and natural gas burned in assets you control (fleet, boilers, generators).\n\nScope 2: electricity purchased from the grid — emissions depend on the country or region generation mix (kg CO₂e/kWh).\n\nTip: keep utility and fuel invoices for each reporting period; they are the primary evidence for audits.',
      },
      csrd: {
        title: 'CSRD & ESRS E1 (EU)',
        body:
          'The EU Corporate Sustainability Reporting Directive (CSRD) requires large and listed companies to disclose sustainability information, including climate (ESRS E1). Scope 1 and 2 are typically reported first, with increasing expectations for data quality and assurance over time.\n\nSMEs often prepare Scope 1 & 2 data for customers, banks, or supply-chain questionnaires before full CSRD applies to them directly.',
      },
      iso14064: {
        title: 'ISO 14064-1',
        body:
          'ISO 14064-1 sets principles for quantifying and reporting greenhouse gas inventories at the organisation level. It complements the GHG Protocol and is often referenced in tenders, bank questionnaires, and national schemes.\n\nFor SMEs, a consistent Scope 1 and 2 inventory with documented sources is often enough. CarbonScope provides indicative estimates — not a substitute for ISO verification.',
      },
      scope2Methods: {
        title: 'Scope 2: location-based vs market-based',
        body:
          'Location-based: electricity emissions use the average grid emission factor for the country where consumption occurs (kg CO₂e/kWh). This is how CarbonScope works when you select a country.\n\nMarket-based: reflects green tariffs, RECs/GOs, and PPAs where you can claim credible certificates. That needs separate tools and documentation. CarbonScope applies the GHG Protocol location-based approach.',
      },
      dataEvidence: {
        title: 'Evidence checklist for reporting',
        body:
          'Keep for each reporting period:\n• electricity bills (kWh or MWh);\n• fuel and gas invoices or fleet cards (litres, m³);\n• period dates and organisational boundary;\n• assumptions in assessment notes.\n\nYour PDF export records factors and dataset version. External assurance needs primary documents and a consistent methodology.',
      },
      gridFactors: {
        title: 'Grid factors & Settings',
        body:
          'Scope 2 in CarbonScope uses public average grid factors by country (from sources such as IEA, eGRID, and DEFRA). Results and Settings show the dataset version and reference year.\n\nIn Settings → Emission factors you can enter a custom kg CO₂e/kWh for any country — for example a contractual or regional factor. Reset restores the default.',
      },
      firstAssessment: {
        title: 'Your first assessment: step by step',
        body:
          '1. Add company details: name, country, industry, reporting period, and start date.\n2. Scope 1: enter diesel, petrol, and natural gas — period total or monthly.\n3. Scope 2: enter electricity (kWh from bills).\n4. Tap Calculate Results to finalise the report.\n5. Export PDF; optionally pick reduction initiatives on the results screen.\n\nFor the next period, use New period (copy structure) — amounts clear but company profile is kept.',
      },
    },
  },
  home: {
    ghgAligned: 'GHG Protocol Aligned',
    scopeCalculator: 'Scope 1, 2 & 3 CO₂ Calculator',
    emptyTitle: 'No assessments yet',
    emptyText: 'Tap the button below to create your first company assessment.',
    totalGhg: 'Total GHG',
    insightTitle: 'Insight of the week',
    insightTap: 'Tap to read',
    viewTrends: 'View emission history',
    targetGapShort: '{gap} to target',
    onTrack: 'On track',
    quickEditTitle: 'Quick update',
    quickEditSubtitle:
      'Change one fuel or electricity line without opening the full Scope 1 or 2 screens.',
    quickEditCategory: 'Category',
    quickEditMonth: 'Month',
    quickEditNeedDates:
      'Set a reporting start date in Company Information to edit monthly values.',
    quickEditSave: 'Save',
    quickEditSaving: 'Saving…',
    quickEditSaved: 'Saved.',
    quickEditFailed: 'Could not save. Please try again.',
    quickEditAddData: 'Add or edit data',
    draftBadge: 'In progress',
    unnamedCompany: 'Unnamed company',
  },
  company: {
    title: 'Company Information',
    subtitle: 'Enter details for the legal entity or business unit being assessed.',
    name: 'Company Name',
    nameHint: 'Legal entity or business unit being assessed.',
    namePlaceholder: 'e.g. Acme Corp',
    country: 'Country',
    selectCountry: 'Select country',
    searchCountry: 'Search countries...',
    industry: 'Industry / Sector',
    reportingPeriod: 'Reporting Period',
    electricityFactor: 'Electricity emission factor',
    continueScope1: 'Continue to Scope 1',
    nameRequired: 'Company name is required',
    countryRequired: 'Country is required',
    industryRequired: 'Industry is required',
    periodRequired: 'Reporting period is required',
    reportingStartDate: 'Reporting start date',
    selectStartDate: 'Select start date',
    startDateRequired: 'Reporting start date is required',
    periodFromTo: 'From {from} to {to}',
    periodWithRange: '{period} ({fromTo})',
    periodPreview: 'Reporting period',
    clientTag: 'Client tag (optional)',
    clientTagHint: 'For consultants: label this assessment (e.g. client name or project code).',
    clientTagPlaceholder: 'e.g. Client ABC',
  },
  reportingPeriods: {
    '6_months': '6 Months',
    '1_year': '1 Year',
  },
  industries: {
    manufacturing: 'Manufacturing',
    chemical: 'Chemical Industry',
    banking: 'Banking',
    insurance: 'Insurance',
    mining: 'Mining',
    oil_gas: 'Oil & Gas',
    technology: 'Technology',
    telecommunications: 'Telecommunications',
    financial_services: 'Financial Services',
    agriculture: 'Agriculture',
    healthcare: 'Healthcare',
    energy: 'Energy',
    agriculture_food: 'Agriculture & Food',
    food_beverage: 'Food & Beverage',
    retail: 'Retail & Consumer Goods',
    construction: 'Construction & Real Estate',
    logistics: 'Transportation & Logistics',
    media: 'Media & Entertainment',
    education: 'Education',
    hospitality: 'Tourism & Hospitality',
    government: 'Government & Public Sector',
    professional_services: 'Professional Services',
    ngo: 'NGO',
    consulting: 'Consulting',
    textile: 'Textile',
    automotive: 'Automotive',
    aviation: 'Aviation',
    maritime: 'Maritime',
    pharmaceuticals: 'Pharmaceuticals',
    cement: 'Cement',
    steel: 'Steel',
    ecommerce: 'E-commerce',
    utilities: 'Utilities',
    defense: 'Defense & Security',
    other: 'Other',
  },
  scope1: {
    title: 'Scope 1 — Direct Emissions',
    subtitle: 'Emissions from fuels directly owned or controlled by the company.',
    source: 'Source: fuel purchase records, fleet records, or utility invoices.',
    diesel: 'Diesel',
    petrol: 'Petrol / Gasoline',
    naturalGas: 'Natural Gas',
    preview: 'Scope 1 preview',
    continueScope2: 'Continue to Scope 2',
    lpg: 'LPG (propane / butane)',
    heatingOil: 'Heating oil / kerosene',
    coal: 'Coal',
    otherFuelsTitle: 'Other fuels',
    otherFuelsHint: 'Only fill these in if your company burns them on site or in its own vehicles.',
    refrigerantsTitle: 'Refrigerant leaks (fugitive emissions)',
    refrigerantsShort: 'Refrigerant leaks',
    refrigerantsHint:
      'Enter the kg of refrigerant topped up into air conditioning, heat pumps, chillers and fridges during the period (from service records). Top-ups replace gas that leaked out.',
    refrigerantGwp: 'GWP {gwp} — 1 kg = {gwp} kg CO₂e',
    refrigerantMontreal:
      'R-22 and other HCFCs/CFCs are controlled under the Montreal Protocol and are reported separately, not in Scope 1.',
  },
  lineHints: {
    lpg: 'Litres of LPG delivered or bottles bought (a 47 kg bottle ≈ 90 L). Use supplier invoices; forklifts and patio heaters count too.',
    heatingOil:
      'Litres of heating oil, kerosene or gas oil burned in boilers, heaters or generators, from delivery notes.',
    coal: 'Kilograms or tonnes of coal burned on site, from delivery tickets or weighbridge records.',
    evKm:
      'Kilometres driven by company-owned electric vehicles that were charged away from your own meters (public chargers, employees’ homes). Charging on your site is already in your electricity bill. Converted at 0.205 kWh/km.',
    districtHeat:
      'kWh of heat delivered by a district heating network, from the heat meter or supplier invoice. Default factor 0.175 kg CO₂e/kWh (UK average) — use the market-based section below for your supplier’s own factor.',
    steam: 'kWh of purchased steam (convert from tonnes using your supplier’s energy content). Default factor 0.175 kg CO₂e/kWh (UK average).',
    districtCooling:
      'kWh of chilled water / cooling delivered by a district cooling network. Estimated as electric chillers: grid factor ÷ 4.',
  },
  scope2: {
    title: 'Scope 2 — Indirect Emissions',
    subtitle: 'Emissions from purchased electricity consumption.',
    source: 'Source: electricity bills or utility invoices.',
    electricity: 'Electricity',
    basedOnCountry: 'Based on selected country',
    factorAuto: 'Coefficient (auto by country)',
    preview: 'Scope 2 preview',
    calculate: 'Calculate Results',
    continueScope3: 'Continue to Scope 3',
    evKm: 'Company EVs — km (charged off-site)',
    districtHeat: 'District heating',
    steam: 'Purchased steam',
    districtCooling: 'District cooling',
    otherEnergyTitle: 'Other purchased energy',
    otherEnergyHint: 'District heating, steam, cooling, and company EVs charged away from your premises.',
    previewLocation: 'Location-based',
    previewMarket: 'Market-based',
    market: {
      title: 'Market-based method (optional)',
      intro:
        'The GHG Protocol asks for Scope 2 to be reported two ways. Location-based uses the grid average above. Market-based reflects what you buy: renewable certificates, your supplier’s factor, or a residual mix. Leave empty if you don’t have this information — market-based then equals location-based.',
      renewableKwh: 'Electricity covered by renewable certificates / PPA',
      renewableKwhHint:
        'kWh matched by Guarantees of Origin, RECs, I-RECs or a PPA, with certificates retired for your company. Counted as 0 kg CO₂e.',
      supplierFactor: 'Supplier emission factor',
      supplierFactorHint:
        'From your electricity supplier’s fuel-mix disclosure. Applied to kWh not covered by certificates.',
      residualMixFactor: 'Residual mix factor',
      residualMixFactorHint:
        'Used when no supplier factor is given (e.g. AIB residual mix in Europe). If empty, the grid average is used.',
      heatSupplierFactor: 'Heat / steam supplier factor',
      heatSupplierFactorHint: 'Your heat network’s published factor. If empty, the default factor is used.',
      notProvided: 'optional',
    },
  },
  scope3: {
    title: 'Scope 3 — Value Chain',
    subtitle:
      'Optional: indirect emissions from purchases, freight, fuel and energy supply chains, waste, business travel and commuting.',
    optionalNote:
      'Scope 3 is optional for most SME reporting. Leave a line at 0 to exclude it — if everything is 0, results cover Scope 1 & 2 only.',
    source:
      'Source: travel booking reports, expense claims, staff commuting surveys, waste contractor reports, and water bills.',
    preview: 'Scope 3 preview',
    calculate: 'Calculate Results',
    categoryTitle: 'Category {number} — {name}',
    subtotal: 'Subtotal',
    factorLine: '{factor} kg CO₂e per {unit}',
    categories: {
      cat1Purchased: 'Purchased goods & services',
      cat3FuelEnergy: 'Fuel- and energy-related activities',
      cat4Transport: 'Upstream transportation',
      cat5Waste: 'Waste generated in operations',
      cat6Travel: 'Business travel',
      cat7Commuting: 'Employee commuting',
    },
    fields: {
      spendOfficeSupplies: 'Office supplies & paper',
      spendItHardware: 'IT hardware & electronics',
      spendServices: 'Professional, IT & software services',
      spendFoodCatering: 'Food & catering',
      spendConstruction: 'Building materials & construction work',
      freightRoadTkm: 'Road freight (trucks)',
      freightRailTkm: 'Rail freight',
      freightSeaTkm: 'Sea freight (container ship)',
      freightAirTkm: 'Air freight',
      flightShortHaulKm: 'Flights — short haul (< 3,700 km)',
      flightLongHaulKm: 'Flights — long haul',
      railKm: 'Rail travel',
      carKm: 'Car travel (rental, taxi, private car claims)',
      hotelNights: 'Hotel stays',
      commuteCarKm: 'Commuting by car',
      commutePublicTransportKm: 'Commuting by bus',
      commuteRailKm: 'Commuting by train / metro',
      wasteLandfillTonnes: 'Waste to landfill',
      wasteRecycledTonnes: 'Waste recycled',
      waterM3: 'Water supply & wastewater',
    },
    units: {
      m3: 'm³',
      tonnes: 'tonne',
      passengerKm: 'passenger-km',
      km: 'km',
      roomNights: 'room-night',
      tonneKm: 'tonne-km',
      currency: 'USD',
    },
    currencyLabel: 'Currency for spend',
    spendTitle: 'Spend-based (where you have no activity data)',
    spendHint:
      'Annual spend excluding VAT / sales tax. Spend-based factors are US sector averages (US EPA v1.3, 2022 dollars) — use activity data where you have it. Converted at 2025 average exchange rates and adjusted for US inflation since 2022.',
    otherCurrency: 'Other currency (enter rate)',
    customRate: 'Exchange rate',
    customRateUnit: 'USD per 1 unit',
    customRateHint: 'How many US dollars one unit of your currency was worth on average during the reporting period.',
    missingRateWarning: 'Enter an exchange rate — spend lines are not counted until you do.',
    spendFactorLine: '{factor} kg CO₂e per USD',
    freightHint:
      'tonne-km = weight shipped (tonnes) × distance (km). Include freight you pay for that is run by other companies.',
    cat3Toggle: 'Include automatic estimate',
    cat3Hint:
      'Upstream emissions of the fuels and energy already entered in Scope 1 & 2: extraction, refining and transport of fuels (well-to-tank), plus grid losses and upstream power generation. No extra data needed.',
    notCovered:
      'Not yet covered: capital goods, downstream transport, use and end-of-life of sold products, leased assets, franchises and investments.',
  },
  notifications: {
    section: 'Notifications',
    master: 'Reminders & guidance',
    masterHint: 'Helpful local reminders based on your assessments (no data leaves your device).',
    drafts: 'Unfinished assessments',
    monthly: 'Monthly data entry',
    refresh: 'Data refresh reminders',
    periodEnd: 'Reporting period ending',
    reportingCalendar: 'Reporting calendar (compliance)',
    educational: 'Weekly insights (reporting & climate)',
    educationalHint:
      'Optional. One short note per week (Sunday, Tuesday, or Thursday only) on standards, climate science, history, and innovation — never promotional.',
    reengagement: 'Return reminders',
    initiatives: 'Initiative follow-ups',
    initiativeTitle: 'Check your reduction initiatives',
    initiativeBody:
      'You set actions for {company}. Review progress on efficiency, renewables, or fleet upgrades.',
    permissionTitle: 'Stay on track with reminders',
    permissionBody:
      'CarbonScope can send professional guidance and reminders about your reporting periods, monthly entries, and unfinished assessments. You control each category in Settings.',
    enable: 'Enable reminders',
    notNow: 'Not now',
    draftTitle: 'Unfinished assessment',
    draftBody: 'You have an unfinished assessment for {company}. Open CarbonScope to continue.',
    monthlyTitle: 'Monthly data entry',
    monthlyBody: 'Add {month} data for {company}{categories}.',
    monthlyCategoriesSuffix: ' ({categories})',
    refresh6Title: 'Time to update your data',
    refresh6Body:
      'It has been 6 months since you updated {company}. Recalculate Scope 1 & 2 emissions with current fuel and electricity use.',
    refresh12Title: 'Annual update reminder',
    refresh12Body:
      'It has been 12 months since you updated {company}. Refresh your assessment for accurate reporting.',
    periodEndTitle: 'Reporting period ending soon',
    periodEndBody:
      '{company}: your {period} reporting window ends in 7 days. Review or finalize your inputs.',
    reportingCalendarTitle: 'Reporting deadline approaching',
    reportingCalendarBody:
      '{company}: {period} reporting closes in two weeks. Finalize Scope 1 & 2 data and export your evidence pack.',
    firstSuccessTitle: 'Your emissions report is ready',
    firstSuccessBody:
      'Open CarbonScope to view results and export a PDF. Tip: Scope 2 changes when you update country or electricity use.',
    educationalTitle: 'Carbon insight',
    insightOfWeekTitle: 'Insight of the week',
    insightTap: 'Tap to read',
    reengagementTitle: 'Update your carbon assessment',
    reengagementBody:
      'Still tracking {company}? Update this period\'s fuels and electricity for an accurate Scope 1 & 2 picture.',
    tips: {
      scope1Vs2:
        'Scope 1 covers fuels you burn directly (diesel, petrol, natural gas). Scope 2 covers purchased electricity — both are core to GHG Protocol inventories.',
      utilityBills:
        'Utility and fuel invoices are the most reliable source for kWh, liters, and m³. Keep one folder per reporting period.',
      gridFactor:
        'Scope 2 emissions depend on your country\'s grid factor. CarbonScope applies the factor automatically when you select a country.',
      monthlyTracking:
        'For 6-month or annual periods, monthly entry helps spot seasonal peaks — useful for energy audits and ESG disclosure.',
      scope1Fuels:
        'Fleet diesel and on-site gas often dominate Scope 1. Start with the fuel categories that represent the largest spend.',
      scope2Electricity:
        'Office and site electricity is Scope 2. Use annual kWh from bills or sub-meters; MWh can be entered and is converted automatically.',
      reportingPeriod:
        'Align your reporting start date with your fiscal or sustainability reporting year so results match other disclosures.',
      saveProgress:
        'Use Save progress on Scope 1 or 2 if you need to gather data later — your inputs stay on this device until you calculate results.',
      whyReportingMatters:
        'Measuring Scope 1 and 2 emissions helps companies understand operational climate impact, set baselines, and respond credibly to investors, banks, and customers.',
      whyReportingSME:
        'Smaller companies often start with Scope 1 & 2 because data is close at hand (fuel and electricity bills). A clear baseline supports growth and tender requirements.',
      whyReportingEnterprise:
        'Larger organisations use consistent Scope 1 & 2 methods across sites so consolidation, targets, and external reporting (CDP, annual reports) stay comparable year to year.',
      ghgProtocol:
        'The GHG Protocol is the most widely used global standard for corporate inventories. It defines Scope 1, 2, and 3 and how to account for fuels and electricity.',
      iso14064:
        'ISO 14064-1 guides quantification and reporting of organisation-level GHG inventories. It complements the GHG Protocol and is referenced in many national schemes.',
      csrdEsrs:
        'In the EU, the CSRD and ESRS E1 require large and listed companies to report emissions with increasing assurance. Scope 1 & 2 are the usual starting point.',
      tcfdIfrs:
        'TCFD and ISSB (IFRS S2) encourage disclosure of climate risks and emissions. Reliable Scope 1 & 2 data supports transition planning and financial filings.',
      parisAgreement:
        'The Paris Agreement (2015) aims to limit warming well below 2°C. National targets flow to policies — companies contribute through measured reductions in their own operations.',
      kyotoHistory:
        'The Kyoto Protocol (1995–2012 era) introduced binding targets for many industrialised countries and helped standardise how nations account for emissions.',
      co2Science:
        'CO₂ and other GHGs trap heat in the atmosphere. Human activities — especially burning fossil fuels — have raised atmospheric CO₂ well above pre-industrial levels.',
      climateBusinessRisk:
        'Physical and transition risks from climate change can affect supply chains, energy costs, and regulation. Emissions data is one input to informed business planning.',
      companyActions:
        'Companies can reduce Scope 1 & 2 through efficiency, fuel switching, renewable electricity, fleet upgrades, and engaging facilities teams — measurement shows what works.',
      energyEfficiency:
        'LED lighting, HVAC optimisation, and motor upgrades often cut electricity (Scope 2) with short paybacks. Track kWh before and after to see the impact in tCO₂e.',
      renewableElectricity:
        'Renewable tariffs, on-site solar, and power purchase agreements (PPAs) lower Scope 2 where you can credibly claim market-based reductions — keep certificates on file.',
      fleetAndHeat:
        'Electrifying light fleets, using biofuels where certified, and improving boiler efficiency address Scope 1. Start with vehicles and heating that run year-round.',
      industrialTech:
        'Process electrification, waste-heat recovery, and digital energy management are spreading in industry — they cut both cost and Scope 1 & 2 over time.',
      dataQuality:
        'Good inventories document sources (bills, meters), assumptions, and periods. Notes in your assessment help auditors and your future self.',
      scope3Note:
        'Scope 3 covers value-chain emissions (suppliers, travel, products). Scope 1 & 2 inventories are the foundation — many frameworks expect them first.',
      assurance:
        'Third-party verification of GHG data is increasingly expected. Consistent methods and retained invoices make assurance smoother when you need it.',
      sectorManufacturing:
        'Manufacturers often see high Scope 1 from gas and diesel and high Scope 2 from production lines. Sub-metering key processes improves accuracy.',
      sectorOffice:
        'Office-based firms are usually Scope 2-heavy (electricity) with smaller Scope 1 (backup generators, company cars). Country selection drives the grid factor.',
      scienceMethane:
        'Methane and nitrous oxide also warm the climate, often per unit more than CO₂ over 20 years. Fuel and gas reporting captures part of your direct GHG footprint.',
      keelingCurve:
        'Charles Keeling\'s Mauna Loa measurements (from 1958) showed CO₂ rising steadily — one of the clearest global records underpinning modern climate science.',
      ipccScience:
        'The IPCC synthesises peer-reviewed science for policymakers. Its assessment reports inform the Paris Agreement and national climate plans worldwide.',
      industrialCo2Rise:
        'Fossil fuel use since the Industrial Revolution multiplied CO₂ emissions. Today, energy and industry remain central to Scope 1 & 2 reporting.',
      euEts:
        'The EU Emissions Trading System (since 2005) caps CO₂ from power and industry — a model many regions study for carbon pricing and disclosure.',
      nordicHeating:
        'Nordic countries pioneered district heating and renewables, cutting building heat emissions — relevant when comparing national grid factors.',
      chinaRenewables:
        'China leads global solar and wind capacity deployment. Grid factors still reflect the full generation mix — location matters for Scope 2.',
      greenHydrogen:
        'Green hydrogen (electrolysis with renewables) is piloted for steel, chemicals, and heavy transport — future Scope 1 reductions in industry.',
      steelInnovation:
        'Direct reduced iron and electric arc furnaces can cut steel\'s coal dependence. Specialists track pilot plants in Europe and Asia.',
      carbonCapture:
        'Carbon capture (use or storage) is deployed at some cement and energy sites. It does not replace efficiency but can address hard-to-abate process emissions.',
      brazilBiofuels:
        'Brazil\'s ethanol fleet programme reduced petrol dependence over decades — an example of transport fuel switching in national inventories.',
      africaSolar:
        'Distributed solar and mini-grids expand access across Africa, lowering diesel generator use — a practical Scope 1 reduction pathway for sites.',
      copSummits:
        'UN climate conferences (COP) coordinate global negotiations. Corporate Scope 1 & 2 data supports national pledges and supply-chain expectations.',
    },
  },
  scopeInputs: {
    monthlyBreakdown: 'Monthly breakdown',
    monthlyEntries: 'By month',
    periodTotal: 'Period total',
    autoFromMonthly: 'Calculated from your monthly entries (not editable).',
    saveProgress: 'Save progress',
    saved: 'Saved',
    saveFailed: 'Could not save your progress. Please try again.',
    fromMonthly: 'monthly breakdown',
    notesTitle: 'Notes (optional)',
    notesPlaceholder: 'Add any context for this assessment (e.g. data sources or assumptions)…',
    notesWordCount: '{used} / {max} words',
    progressTitle: 'Data entry progress',
    progressFilled: 'Filled',
    progressNotFilled: 'Not filled',
    progressMonths: '{filled} / {total} months filled',
  },
  results: {
    titles: {
      '6_months': '6-Month Emissions Report',
      '1_year': 'Annual Emissions Report',
    },
    totalGhg: 'TOTAL GHG EMISSIONS',
    totalGhgFullByPeriod: {
      '6_months': 'Total GHG Emissions (tCO₂e/6 months)',
      '1_year': 'Total GHG Emissions (tCO₂e/year)',
    },
    scope1Direct: 'SCOPE 1 — DIRECT',
    scope2Indirect: 'SCOPE 2 — INDIRECT',
    scope3ValueChain: 'SCOPE 3 — VALUE CHAIN',
    scope2MarketLine: 'Market-based: {value}',
    scope2DualTitle: 'Scope 2 — dual reporting',
    scope2DualBody:
      'Totals use location-based Scope 2 ({location} {unit}). Market-based Scope 2, reflecting your contracts and certificates: {market} {unit}.',
    scope1ByGasTitle: 'Scope 1 by greenhouse gas',
    gwpBasis: 'CO₂e using {basis}',
    gases: {
      co2: 'CO₂ — carbon dioxide',
      ch4: 'CH₄ — methane',
      n2o: 'N₂O — nitrous oxide',
      hfc: 'HFCs — refrigerants',
    },
    pdfFuelDataset: 'Fuel & refrigerant factor dataset',
    pdfHeatFactors: 'Heat, steam & cooling factors',
    pdfMarketBasis: 'Scope 2 market-based basis',
    marketCertificates: '{kwh} kWh covered by certificates (0 kg CO₂e)',
    marketSupplier: 'supplier factor {factor} kg CO₂e/kWh',
    marketResidual: 'residual mix {factor} kg CO₂e/kWh',
    marketGrid: 'grid average for uncovered kWh (no supplier or residual mix factor)',
    marketHeat: 'heat/steam supplier factor {factor} kg CO₂e/kWh',
    pdfRefrigerants: 'Refrigerant GWPs applied',
    pdfSpendConversion: 'Spend-based conversion',
    spendConversion: '1 {currency} = {rate} USD (2025 average), × {deflator} to 2022 dollars (US CPI-U)',
    pdfCat3Basis: 'Category 3 estimate',
    cat3Basis:
      'DESNZ well-to-tank fuel factors; grid losses and upstream generation at 40.8% of the grid factor (DESNZ UK ratio); heat/steam 0.0446 kg CO₂e/kWh.',
    legacyFactorsNote:
      'Calculated before the gas split was recorded — recalculate to see Scope 1 by gas.',
    scope3Breakdown: 'Scope 3 by category',
    comparisonLabels: {
      total: 'Total',
      scope1: 'Scope 1',
      scope2: 'Scope 2',
      scope3: 'Scope 3',
    },
    breakdown: 'Scope Breakdown',
    recommendations: 'Recommendations',
    inputSummary: 'Input Summary',
    country: 'Country',
    reportingPeriod: 'Reporting Period',
    reportingDates: 'Reporting dates',
    updated: 'Updated',
    storedAs: 'Stored internally as',
    deleteCalculation: 'Delete calculation',
    generatePdf: 'Generate PDF report',
    sharePdf: 'Share PDF report',
    pdfGenerated: 'Generated on',
    pdfError: 'Could not create the PDF. Please try again.',
    pdfWebHint: 'In the print dialog, choose “Save as PDF” (or “Microsoft Print to PDF”) as the destination.',
    pdfDraftWatermark: 'DRAFT — NOT FOR EXTERNAL REPORTING',
    pdfMethodologyTitle: 'Methodology & factors',
    pdfFactorVersion: 'Factor dataset version',
    pdfFactorYear: 'Reference year (grid averages)',
    pdfScope1Factors: 'Scope 1 combustion factors',
    pdfScope2Factor: 'Scope 2 grid factor applied',
    pdfScope3Factors: 'Scope 3 activity factors',
    pdfDisclaimer:
      'Indicative estimates for internal use. Factors are public averages; verify against your national guidance and contractual instruments before regulated disclosure.',
    duplicatePeriod: 'New period (copy structure)',
    comparisonsTitle: 'Compared to prior period',
    vsPriorPeriod: '{percent} vs prior period',
    vsPriorYear: '{percent} vs prior year',
    electricityMonth: '{percent} electricity in {month} vs previous month',
    percentUp: '+{value}%',
    percentDown: '−{value}%',
    benchmarkTitle: 'Sector context',
    benchmarkOffice:
      'Typical office-heavy SME in {country}: Scope 2 (electricity) often dominates; Scope 1 is usually smaller (backup generators, company cars).',
    benchmarkManufacturing:
      'Typical manufacturing SME in {country}: Scope 1 (fuels, gas) and Scope 2 (production electricity) both matter — sub-metering improves accuracy.',
    benchmarkLogistics:
      'Typical transport & logistics SME in {country}: fleet diesel (Scope 1) is often the largest driver; electricity at depots is Scope 2.',
    benchmarkGeneral:
      'For SMEs in {country}, purchased electricity (Scope 2) and on-site fuels (Scope 1) are the usual starting point for GHG inventories.',
    trendsTitle: 'Emission history',
    trendsSubtitle: 'Finalized reports for this company',
    largestDriver: 'Largest driver this period',
    driverDiesel: 'Diesel',
    driverPetrol: 'Petrol / gasoline',
    driverNaturalGas: 'Natural gas',
    driverElectricity: 'Purchased electricity',
    factorSourceTitle: 'Grid emission factor',
    factorSourceBody:
      'Location-based factor: {factor} kg CO₂e/kWh. Source: {sources}. Reference year: {year}. Dataset: {version}.',
    factorCustomNote: 'You set a custom factor for this country in Settings.',
    initiativesTitle: 'Reduction initiatives',
    initiativesSubtitle: 'Select up to 3 actions (indicative impact ranges)',
    initiativeReminder: 'Remind me in 2 weeks',
    initiativeImpact: 'Indicative impact: {min}–{max}% of relevant emissions (varies by site)',
    saveInitiatives: 'Save initiatives',
    initiativesSaved: 'Initiatives saved',
    initiativesFinalizeHint:
      'Finalize this report (Calculate Results) to include initiatives in reminders and exports.',
  },
  initiatives: {
    energy_audit: {
      title: 'Energy audit',
      description: 'Identify efficiency opportunities across fuels and electricity.',
    },
    renewable_electricity: {
      title: 'Renewable electricity',
      description: 'Green tariff, on-site solar, or PPA where credible certificates exist.',
    },
    led_hvac: {
      title: 'LED & HVAC optimisation',
      description: 'Lighting and heating/cooling upgrades with short paybacks.',
    },
    fleet_efficiency: {
      title: 'Fleet efficiency',
      description: 'Route planning, maintenance, and gradual electrification where feasible.',
    },
    boiler_optimization: {
      title: 'Boiler & process heat',
      description: 'Improve combustion efficiency and reduce gas use.',
    },
    sub_metering: {
      title: 'Sub-metering',
      description: 'Track electricity and gas by line or building for targeted reductions.',
    },
    methane_leak_repair: {
      title: 'Methane leak detection',
      description: 'Survey and repair leaks in gas systems (high impact per unit).',
    },
    process_electrification: {
      title: 'Process electrification',
      description: 'Shift selected heat processes from gas to grid electricity where low-carbon grid.',
    },
  },
  units: {
    liters: 'liters',
    gallons: 'gallons',
    kwh: 'kWh',
    m3: 'm³',
    mwh: 'MWh',
    literAbbr: 'L',
    perKwh: '/kWh',
    amountPeriodSuffix: {
      '6_months': '/6 months',
      '1_year': '/year',
    },
    litersPerYear: 'liters/year',
    gallonsPerYear: 'gallons/year',
    kwhPerYear: 'kWh/year',
    m3PerYear: 'm³/year',
    mwhPerYear: 'MWh/year',
    litersPerMonth: 'liters/month',
    gallonsPerMonth: 'gallons/month',
    kwhPerMonth: 'kWh/month',
    m3PerMonth: 'm³/month',
    mwhPerMonth: 'MWh/month',
    kgAbbr: 'kg',
    kmAbbr: 'km',
    kgPerYear: 'kg/year',
    tonnesPerYear: 'tonnes/year',
    kmPerYear: 'km/year',
    milesPerYear: 'miles/year',
    kgPerMonth: 'kg/month',
    tonnesPerMonth: 'tonnes/month',
    kmPerMonth: 'km/month',
    milesPerMonth: 'miles/month',
  },
  enterprise: {
    targets: {
      title: 'Reduction target',
      editTitle: 'Set reduction target',
      editHint: 'Track progress vs a prior finalized period or your baseline.',
      typePercent: '% reduction',
      typeAbsolute: 'Absolute cap (tCO₂e)',
      placeholderPercent: 'e.g. 10',
      placeholderAbsolute: 'e.g. 45.5',
      saveTarget: 'Save target',
      clearTarget: 'Clear target',
      targetPercent: '{value}% reduction vs prior period',
      targetAbsolute: 'Cap at {value} tCO₂e',
      noBaseline: 'No prior finalized period — target uses current total as baseline.',
      noTargetSet: 'No target set. Add one below to see gap-to-target.',
      current: 'Current',
      target: 'Target',
      gap: 'Gap',
      onTrack: 'On track — at or below target',
      aboveTarget: 'Above target — review reduction initiatives',
    },
    scenarios: {
      title: 'What-if scenario',
      hint: 'Explore changes without saving a new assessment. Indicative only.',
      electricity: 'Electricity use',
      diesel: 'Diesel',
      petrol: 'Petrol / gasoline',
      gas: 'Natural gas',
      fleetEv: 'Fleet EV shift (reduces petrol)',
      scenarioTotal: 'Scenario total',
      disclaimer: 'Not saved to your official inventory. Use for internal planning.',
    },
    evidence: {
      attachFile: 'Attach bill or invoice',
      monthlyInvoices: 'Invoices by month',
      uploaded: 'Uploaded: {fileName}',
      viewDocument: 'View document',
      viewFailed: 'Could not open this file.',
      deleteDocument: 'Remove document',
      deleteAreYouSure: 'Are you sure?',
      deleteConfirm: 'Remove “{fileName}” from this line?',
      deleteFailed: 'Could not remove this file.',
      saveCompanyFirst: 'Enter a company name on the previous screen, then try again.',
      attachFailed: 'Could not attach this file. Try again or pick a different file.',
      exportPack: 'Export evidence pack',
      exportFailed: 'Could not create evidence pack.',
      webNoZip: 'Evidence pack export is available in the mobile app.',
      checklist: {
        electricityBills: 'Electricity bills (kWh / MWh)',
        fuelInvoices: 'Fuel & gas invoices',
        periodDates: 'Period dates documented',
      },
    },
    methodologyLog: {
      title: 'Methodology log',
      hint: 'Record of factor versions used when results were calculated on this device.',
      empty: 'No entries yet. Calculate results to record methodology for this company.',
      factorLine: 'Grid factor: {factor} kg CO₂e/kWh · custom override: {custom}',
      customYes: 'yes',
      customNo: 'no',
      actions: {
        finalized: 'Finalized',
        recalculated: 'Recalculated',
        saved: 'Saved',
      },
    },
  },
  recommendations: {
    manufacturing: recommendation(
      'Energy efficiency upgrades and renewable electricity procurement may substantially lower operational emissions.',
      'Optimize natural gas use in boilers and consider electrification of process heat.',
      'Install sub-metering to track Scope 1 and 2 by production line.'
    ),
    chemical: recommendation(
      'Process optimization and catalyst efficiency can reduce direct fuel-related emissions.',
      'Evaluate combined heat and power with lower-carbon fuels.',
      'Engage suppliers on Scope 3 data for a complete inventory.'
    ),
    banking: recommendation(
      'Office electricity efficiency and green procurement are key reduction opportunities.',
      'Achieve net-zero operations through renewable electricity contracts.',
      'Integrate financed emissions into portfolio climate strategy.'
    ),
    insurance: recommendation(
      'Digitize operations to reduce office energy intensity per policy issued.',
      'Procure renewable electricity for major office locations.',
      'Embed climate criteria in underwriting and investment policies.'
    ),
    mining: recommendation(
      'Diesel use in mobile equipment is typically dominant — prioritize fleet efficiency.',
      'On-site renewable generation can offset high electricity loads.',
      'Strengthen methane management across extraction assets.'
    ),
    oil_gas: recommendation(
      'Methane leak detection and repair is critical for Scope 1 reductions.',
      'Reduce flaring and improve combustion efficiency on-site.',
      'Publish transparent emissions intensity metrics aligned with GHG Protocol.'
    ),
    technology: recommendation(
      'Source renewable electricity through PPAs or green tariffs for data centers.',
      'Right-size cooling and enable smart building controls.',
      'Set science-based targets and disclose via CDP or equivalent.'
    ),
    telecommunications: recommendation(
      'Improve network equipment energy efficiency and data center PUE.',
      'Procure renewable electricity for exchanges and offices.',
      'Retire legacy high-power network hardware on a planned cycle.'
    ),
    financial_services: recommendation(
      'Office electricity efficiency and green procurement reduce operational footprint.',
      'Achieve net-zero operations through renewable electricity.',
      'Require ESG data from high-emission investee companies.'
    ),
    agriculture: recommendation(
      'Improve fertilizer application to reduce N₂O-related impacts.',
      'Adopt precision irrigation powered by renewable energy.',
      'Explore biogas capture from organic waste streams.'
    ),
    healthcare: recommendation(
      'Replace aging heating systems with high-efficiency units or heat pumps.',
      'Pilot on-site solar for facilities with high electricity use.',
      'Establish an energy management system (ISO 50001).'
    ),
    energy: recommendation(
      'Methane leak detection and repair for gas infrastructure.',
      'Accelerate grid decarbonization to lower downstream Scope 2.',
      'Publish transparent emissions intensity metrics.'
    ),
    agriculture_food: recommendation(
      'Cold chain efficiency and renewable electricity reduce Scope 2.',
      'Optimize fleet fuel use across distribution networks.',
      'Work with primary producers on energy data collection.'
    ),
    food_beverage: recommendation(
      'Optimize refrigeration systems and recover waste heat.',
      'Switch to renewable electricity for processing plants.',
      'Reduce food waste to lower embedded energy per unit sold.'
    ),
    retail: recommendation(
      'Retrofit stores with LED lighting and demand-controlled HVAC.',
      'Optimize delivery routes to reduce diesel fleet emissions.',
      'Engage suppliers on Scope 3 disclosure and reduction plans.'
    ),
    construction: recommendation(
      'Conduct building energy audits and retrofit insulation.',
      'Install heat pumps to displace natural gas heating.',
      'Pursue green building certifications (LEED, BREEAM).'
    ),
    logistics: recommendation(
      'Fuel consumption is often the largest source. Fleet optimization and efficient routing may significantly reduce emissions.',
      'Transition fleet to electric or biofuel where infrastructure allows.',
      'Report emissions per tonne-km for transparent benchmarking.'
    ),
    media: recommendation(
      'Studio and office renewable sourcing reduce Scope 2.',
      'Audit on-location diesel generators for Scope 1.',
      'Embed carbon criteria into production planning.'
    ),
    education: recommendation(
      'Campus LED retrofits and building management systems lower electricity demand.',
      'Replace aging gas heating with efficient heat pumps.',
      'Engage students through visible energy reduction campaigns.'
    ),
    hospitality: recommendation(
      'HVAC optimization and energy-efficient appliances can reduce electricity demand.',
      'Optimize kitchen equipment and water heating efficiency.',
      'Switch to renewable electricity contracts for properties.'
    ),
    government: recommendation(
      'Lead with public building retrofits and fleet electrification pilots.',
      'Procure renewable electricity for municipal operations.',
      'Publish annual GHG inventories aligned with national requirements.'
    ),
    professional_services: recommendation(
      'Office electricity efficiency and hybrid work policies lower emissions.',
      'Procure renewable electricity for major offices.',
      'Set internal reduction targets in sustainability reports.'
    ),
    ngo: recommendation(
      'Prioritize renewable electricity for offices and field operations.',
      'Minimize travel emissions through virtual programs where possible.',
      'Transparently report operational footprint to donors.'
    ),
    consulting: recommendation(
      'Lead by example with net-zero office operations.',
      'Digital-first delivery reduces travel-related Scope 1.',
      'Help clients set science-based targets using robust inventories.'
    ),
    textile: recommendation(
      'Efficient motors and heat recovery in dyeing processes cut energy use.',
      'Source renewable electricity for manufacturing facilities.',
      'Reduce water heating loads through process innovation.'
    ),
    automotive: recommendation(
      'Manufacturing energy efficiency and renewable power lower plant emissions.',
      'Optimize paint shop and curing oven energy consumption.',
      'Electrify facility fleets and material handling equipment.'
    ),
    aviation: recommendation(
      'Ground support equipment electrification reduces airport Scope 1.',
      'Improve terminal energy efficiency and renewable sourcing.',
      'Support SAF adoption for owned or contracted operations.'
    ),
    maritime: recommendation(
      'Port electrification and shore power reduce berthed vessel emissions.',
      'Fleet fuel efficiency and slow-steaming lower fuel consumption.',
      'Track emissions per nautical mile for benchmarking.'
    ),
    pharmaceuticals: recommendation(
      'Clean room HVAC optimization offers significant electricity savings.',
      'Replace gas boilers with efficient alternatives where validated.',
      'Green chemistry initiatives can reduce process energy intensity.'
    ),
    cement: recommendation(
      'Kiln fuel efficiency and alternative fuels lower direct emissions.',
      'Waste heat recovery improves overall energy productivity.',
      'Explore supplementary cementitious materials to reduce process CO₂.'
    ),
    steel: recommendation(
      'Electric arc furnaces powered by renewables reduce carbon intensity.',
      'Optimize blast furnace operations and capture waste heat.',
      'Increase scrap recycling rates where feasible.'
    ),
    ecommerce: recommendation(
      'Optimize last-mile delivery routes and packaging weight.',
      'Retrofit fulfillment centers with LED and smart HVAC.',
      'Procure renewable electricity for warehouses.'
    ),
    utilities: recommendation(
      'Grid decarbonization is the primary lever for sector-wide impact.',
      'Methane management remains critical for gas utilities.',
      'Publish transparent grid emission factors for customers.'
    ),
    defense: recommendation(
      'Fuel efficiency in vehicles and generators offers near-term Scope 1 gains.',
      'Evaluate renewable microgrids for fixed installations where permitted.',
      'Align reporting with national defense sustainability guidance.'
    ),
    other: recommendation(
      'Conduct a full energy audit to identify quick-win reductions.',
      'Set a near-term target to reduce Scope 1 and 2 emissions.',
      'Consider third-party verification for GHG inventories.'
    ),
  },
};

type DeepString<T> = {
  [K in keyof T]: T[K] extends object ? DeepString<T[K]> : string;
};

export type TranslationKeys = DeepString<typeof en>;
