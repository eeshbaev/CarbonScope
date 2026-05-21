import type { DeepPartial } from '../../buildLocale';
import type { TranslationKeys } from '../../locales/en';

export const deNotifications: DeepPartial<TranslationKeys> = {
  notifications: {
    section: 'Benachrichtigungen',
    master: 'Erinnerungen & Hinweise',
    masterHint:
      'Hilfreiche lokale Erinnerungen basierend auf Ihren Bewertungen (keine Daten verlassen Ihr Gerät).',
    drafts: 'Unvollständige Bewertungen',
    monthly: 'Monatliche Datenerfassung',
    refresh: 'Erinnerungen zur Datenaktualisierung',
    periodEnd: 'Berichtszeitraum endet',
    reportingCalendar: 'Reporting-Kalender',
    educational: 'Wöchentliche Einblicke (Bericht & Klima)',
    educationalHint:
      'Optional. Ein kurzer Hinweis pro Woche (nur Sonntag, Dienstag oder Donnerstag) zu Standards, Klimawissenschaft, Geschichte und Innovation — ohne Werbung.',
    reengagement: 'Rückkehr-Erinnerungen',
    initiatives: 'Initiativen-Erinnerungen',
    initiativeTitle: 'Reduktionsinitiativen prüfen',
    initiativeBody: 'Sie haben Maßnahmen für {company} geplant. Fortschritt prüfen.',
    permissionTitle: 'Mit Erinnerungen am Ball bleiben',
    permissionBody:
      'CarbonScope kann professionelle Hinweise und Erinnerungen zu Ihren Berichtszeiträumen, monatlichen Einträgen und unvollständigen Bewertungen senden. Jede Kategorie steuern Sie in den Einstellungen.',
    enable: 'Erinnerungen aktivieren',
    notNow: 'Nicht jetzt',
    draftTitle: 'Unvollständige Bewertung',
    draftBody:
      'Sie haben eine unvollständige Bewertung für {company}. Öffnen Sie CarbonScope, um fortzufahren.',
    monthlyTitle: 'Monatliche Datenerfassung',
    monthlyBody: 'Erfassen Sie die Daten für {month} für {company}{categories}.',
    monthlyCategoriesSuffix: ' ({categories})',
    refresh6Title: 'Zeit für eine Datenaktualisierung',
    refresh6Body:
      'Seit 6 Monaten wurde {company} nicht aktualisiert. Berechnen Sie Scope-1- und Scope-2-Emissionen mit aktuellen Kraftstoff- und Stromdaten neu.',
    refresh12Title: 'Jährliche Aktualisierung',
    refresh12Body:
      'Seit 12 Monaten wurde {company} nicht aktualisiert. Aktualisieren Sie die Bewertung für eine präzise Berichterstattung.',
    periodEndTitle: 'Berichtszeitraum endet bald',
    periodEndBody:
      '{company}: Ihr Berichtsfenster für {period} endet in 7 Tagen. Prüfen oder schließen Sie Ihre Eingaben ab.',
    reportingCalendarTitle: 'Reporting-Frist naht',
    reportingCalendarBody:
      '{company}: {period} endet in zwei Wochen. Schließen Sie Scope 1 & 2 ab und exportieren Sie das Nachweispaket.',
    firstSuccessTitle: 'Ihr Emissionsbericht ist fertig',
    firstSuccessBody:
      'Öffnen Sie CarbonScope, um Ergebnisse anzuzeigen und ein PDF zu exportieren. Tipp: Scope 2 ändert sich, wenn Sie Land oder Stromverbrauch aktualisieren.',
    educationalTitle: 'Klima-Einblick',
    insightOfWeekTitle: 'Insight der Woche',
    insightTap: 'Tippen zum Lesen',
    reengagementTitle: 'CO₂-Bewertung aktualisieren',
    reengagementBody:
      'Erfassen Sie {company} weiter? Aktualisieren Sie Kraftstoffe und Strom für diesen Zeitraum — für ein belastbares Scope-1- und Scope-2-Bild.',
    tips: {
      scope1Vs2:
        'Scope 1 umfasst direkt verbrannte Kraftstoffe (Diesel, Benzin, Erdgas). Scope 2 umfasst eingekauften Strom — beides ist zentral für GHG-Protocol-Inventare.',
      utilityBills:
        'Versorger- und Kraftstoffrechnungen sind die zuverlässigste Quelle für kWh, Liter und m³. Führen Sie einen Ordner pro Berichtszeitraum.',
      gridFactor:
        'Scope-2-Emissionen hängen vom Netzfaktor Ihres Landes ab. CarbonScope wendet den Faktor automatisch an, wenn Sie ein Land wählen.',
      monthlyTracking:
        'Bei 6-Monats- oder Jahreszeiträumen hilft die monatliche Erfassung, saisonale Spitzen zu erkennen — nützlich für Energieaudits und ESG-Berichte.',
      scope1Fuels:
        'Flottendiesel und Gas vor Ort dominieren oft Scope 1. Beginnen Sie mit den Kraftstoffkategorien mit den höchsten Ausgaben.',
      scope2Electricity:
        'Strom in Büros und auf Standorten ist Scope 2. Nutzen Sie jährliche kWh aus Rechnungen oder Unterzählern; MWh können eingegeben und werden automatisch umgerechnet.',
      reportingPeriod:
        'Richten Sie das Berichtsstartdatum an Ihr Geschäfts- oder Nachhaltigkeitsjahr aus, damit Ergebnisse zu anderen Angaben passen.',
      saveProgress:
        'Nutzen Sie „Fortschritt speichern“ in Scope 1 oder 2, wenn Sie Daten später sammeln — Ihre Eingaben bleiben auf diesem Gerät, bis Sie Ergebnisse berechnen.',
      whyReportingMatters:
        'Die Messung von Scope-1- und Scope-2-Emissionen hilft Unternehmen, die operative Klimawirkung zu verstehen, Baselines zu setzen und Investoren, Banken und Kunden glaubwürdig zu antworten.',
      whyReportingSME:
        'Kleinere Unternehmen starten oft mit Scope 1 und 2, weil die Daten griffbereit sind (Kraftstoff- und Stromrechnungen). Eine klare Baseline unterstützt Wachstum und Ausschreibungen.',
      whyReportingEnterprise:
        'Größere Organisationen nutzen einheitliche Scope-1- und Scope-2-Methoden standortübergreifend — so bleiben Konsolidierung, Ziele und externe Berichte (CDP, Jahresberichte) jährlich vergleichbar.',
      ghgProtocol:
        'Das GHG Protocol ist der weltweit am häufigsten genutzte Standard für Unternehmensinventare. Es definiert Scope 1, 2 und 3 sowie die Bilanzierung von Kraftstoffen und Strom.',
      iso14064:
        'ISO 14064-1 leitet die Quantifizierung und Berichterstattung von THG-Inventaren auf Organisationsebene. Es ergänzt das GHG Protocol und wird in vielen nationalen Systemen referenziert.',
      csrdEsrs:
        'In der EU verlangen CSRD und ESRS E1 von großen und börsennotierten Unternehmen zunehmend geprüfte Emissionsangaben. Scope 1 und 2 sind der übliche Einstieg.',
      tcfdIfrs:
        'TCFD und ISSB (IFRS S2) fördern die Offenlegung von Klimarisiken und Emissionen. Verlässliche Scope-1- und Scope-2-Daten unterstützen Transformationsplanung und Finanzberichte.',
      parisAgreement:
        'Das Pariser Abkommen (2015) zielt darauf ab, die Erwärmung deutlich unter 2 °C zu halten. Nationale Ziele wirken in Politik — Unternehmen tragen durch messbare Reduktionen im eigenen Betrieb bei.',
      kyotoHistory:
        'Das Kyoto-Protokoll (Ära 1995–2012) führte verbindliche Ziele für viele Industrieländer ein und standardisierte die nationale Emissionsbilanzierung.',
      co2Science:
        'CO₂ und andere Treibhausgase halten Wärme in der Atmosphäre. Menschliche Aktivitäten — besonders die Verbrennung fossiler Brennstoffe — haben atmosphärisches CO₂ weit über das vorindustrielle Niveau gehoben.',
      climateBusinessRisk:
        'Physische und Übergangsrisiken des Klimawandels können Lieferketten, Energiekosten und Regulierung beeinflussen. Emissionsdaten sind eine Grundlage für fundierte Unternehmensplanung.',
      companyActions:
        'Unternehmen können Scope 1 und 2 durch Effizienz, Kraftstoffwechsel, erneuerbaren Strom, Flottenmodernisierung und Einbindung der Gebäudeteams senken — Messung zeigt, was wirkt.',
      energyEfficiency:
        'LED-Beleuchtung, optimierte HVAC-Anlagen und Motorenupgrades senken oft den Strom (Scope 2) mit kurzer Amortisation. Vergleichen Sie kWh vorher und nachher in tCO₂e.',
      renewableElectricity:
        'Ökostrom-Tarife, Solar vor Ort und Strombezugsverträge (PPA) senken Scope 2, wenn marktbasierte Reduktionen glaubhaft belegt sind — bewahren Sie Zertifikate auf.',
      fleetAndHeat:
        'Elektrifizierung leichter Flotten, zertifizierte Biokraftstoffe und effizientere Heizung adressieren Scope 1. Starten Sie mit Fahrzeugen und Wärme, die ganzjährig laufen.',
      industrialTech:
        'Prozesselektrifizierung, Abwärmenutzung und digitales Energiemanagement verbreiten sich in der Industrie — sie senken Kosten und Scope 1 und 2 langfristig.',
      dataQuality:
        'Gute Inventare dokumentieren Quellen (Rechnungen, Zähler), Annahmen und Zeiträume. Notizen in Ihrer Bewertung helfen Prüfern und Ihnen später.',
      scope3Note:
        'Scope 3 umfasst Emissionen in der Wertschöpfungskette (Lieferanten, Reisen, Produkte). Scope-1- und Scope-2-Inventare sind die Basis — viele Rahmenwerke erwarten sie zuerst.',
      assurance:
        'Die unabhängige Prüfung von THG-Daten wird zunehmend erwartet. Einheitliche Methoden und aufbewahrte Rechnungen erleichtern die Assurance, wenn Sie sie brauchen.',
      sectorManufacturing:
        'Hersteller haben oft hohes Scope 1 durch Gas und Diesel und hohes Scope 2 durch Produktionslinien. Unterzähler für Schlüsselprozesse verbessern die Genauigkeit.',
      sectorOffice:
        'Bürobasierte Unternehmen sind meist Scope-2-lastig (Strom) mit geringerem Scope 1 (Notstromaggregate, Dienstwagen). Die Länderwahl bestimmt den Netzfaktor.',
      scienceMethane:
        'Methan und Lachgas erwärmen das Klima ebenfalls, oft pro Einheit über 20 Jahre stärker als CO₂. Kraftstoff- und Gasberichte erfassen einen Teil Ihres direkten THG-Fußabdrucks.',
      keelingCurve:
        'Charles Keelings Messungen auf Mauna Loa (seit 1958) zeigten stetig steigendes CO₂ — eine der klarsten globalen Aufzeichnungen der modernen Klimawissenschaft.',
      ipccScience:
        'Der IPCC fasst begutachtete Wissenschaft für die Politik zusammen. Seine Sachstandsberichte informieren das Pariser Abkommen und nationale Klimapläne weltweit.',
      industrialCo2Rise:
        'Seit der Industriellen Revolution vervielfachte der fossile Energieverbrauch die CO₂-Emissionen. Energie und Industrie bleiben zentral für Scope-1- und Scope-2-Berichte.',
      euEts:
        'Das EU-Emissionshandelssystem (seit 2005) deckelt CO₂ aus Strom und Industrie — ein Modell, das viele Regionen für CO₂-Preise und Offenlegung studieren.',
      nordicHeating:
        'Nordische Länder führten Fernwärme und Erneuerbare voran und senkten Gebäudewärme-Emissionen — relevant beim Vergleich nationaler Netzfaktoren.',
      chinaRenewables:
        'China führt beim globalen Ausbau von Solar und Wind. Netzfaktoren spiegeln weiter den gesamten Strommix — der Standort zählt für Scope 2.',
      greenHydrogen:
        'Grüner Wasserstoff (Elektrolyse mit Erneuerbaren) wird für Stahl, Chemie und schweren Verkehr erprobt — künftige Scope-1-Reduktionen in der Industrie.',
      steelInnovation:
        'Direktreduktion und Lichtbogenöfen können die Kohleabhängigkeit der Stahlindustrie senken. Fachleute verfolgen Pilotanlagen in Europa und Asien.',
      carbonCapture:
        'CO₂-Abscheidung (Nutzung oder Speicherung) wird an Zement- und Energieanlagen eingesetzt. Sie ersetzt keine Effizienz, kann aber schwer reduzierbare Prozessemissionen adressieren.',
      brazilBiofuels:
        'Brasiliens Ethanol-Flottenprogramm senkte über Jahrzehnte die Benzinabhängigkeit — ein Beispiel für Kraftstoffwechsel in nationalen Inventaren.',
      africaSolar:
        'Dezentrale Solaranlagen und Mini-Netze verbessern den Zugang in Afrika und reduzieren Dieselaggregate — ein praktischer Scope-1-Weg für Standorte.',
      copSummits:
        'UN-Klimakonferenzen (COP) koordinieren globale Verhandlungen. Unternehmensdaten zu Scope 1 und 2 stützen nationale Zusagen und Lieferketten-Erwartungen.',
    },
  },
};
