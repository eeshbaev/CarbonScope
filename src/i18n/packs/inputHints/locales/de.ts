import type { HintCategory, HintSet } from '../types';

export const deHints: Record<HintCategory, HintSet> = {
  other: {
    diesel: 'Flotten-Dieselrechnungen, Notstromaggregat-Belege, Subunternehmerberichte und jährliche Kraftstoffzusammenfassungen.',
    petrol: 'Tankkarten, Kilometergeldberichte und Flottenabrechnungen der Tankstellen.',
    naturalGas: 'Erdgasrechnungen (m³ in kWh umrechnen), Heizkessel und Jahresverbrauch vom Versorger.',
    electricity: 'Jährliche Stromrechnungen (kWh), Unterzähler und Nebenkostenabrechnungen des Vermieters.',
  },
  office: {
    diesel: 'Notstromaggregate in Büros/Rechenzentren, Facility-Fahrzeuge und Diesel für Geräte vor Ort.',
    petrol: 'Firmenwagenflotte, Erstattungen und Tankkartenabrechnungen.',
    naturalGas: 'Büroheizung, Kantinen und HLK — jährliche Gasrechnungen je Standort.',
    electricity: 'Bürostrom, Colocation-/RZ-kWh-Berichte und Serverraum-Unterzähler.',
  },
  manufacturing: {
    diesel: 'Gabelstapler, Radlader, Generatoren und mobile Anlagen — Kraftstofflieferanten-Jahresübersicht.',
    petrol: 'Werksfahrzeuge und leichte Flotte — Flottenmanagementberichte.',
    naturalGas: 'Prozesswärme, Kessel und Trockner — Gas-Jahresverbrauch laut Rechnung.',
    electricity: 'Motoren, Kompressoren, Licht und HLK — Hauptzähler-kWh oder EMS.',
  },
  transport: {
    diesel: 'LKW, Transporter und Hofgeräte — Tankkarten und Bulk-Dieselrechnungen.',
    petrol: 'Leichte Nutzfahrzeuge — Karten und Fahrtenbücher.',
    naturalGas: 'Lagerheizung und ggf. CNG-Flotte — Gasrechnungen je Depot.',
    electricity: 'Depotbeleuchtung, E-Staplerladung und Bürostrom — Stromrechnungen.',
  },
  aviation: {
    diesel: 'Bodengeräte, Flughafenfahrzeuge und Generatoren — Betriebskraftstoffprotokolle.',
    petrol: 'Bodenfahrzeugflotte — Kraftstoffaufzeichnungen.',
    naturalGas: 'Terminalheizung und Küchen — Gasrechnungen.',
    electricity: 'Terminals, Hangars und Bodenladung — Stromkonten Flughafen/Mieter.',
  },
  maritime: {
    diesel: 'Hafengeräte, Schlepper und Diesel im Organisationsgrenze — Bunker- und Hafenprotokolle.',
    petrol: 'Hafenfahrzeugflotte — Tankkarten.',
    naturalGas: 'Landheizung und LNG-Anlagen — Gasrechnungen.',
    electricity: 'Landstrom, Kräne und Terminalgebäude — Hafen-/Terminalstromrechnungen.',
  },
  oil_gas: {
    diesel: 'Bohrinseln, Feldgeneratoren, Kompressoren — Feld-Kraftstoffinventare.',
    petrol: 'Leichte Feldflotte — Betriebsberichte.',
    naturalGas: 'Prozessgas und Heizung — Messungen und Abrechnungen.',
    electricity: 'Pumpen, Kompressoren und Feldbüros — Zähler und Jahresabrechnungen.',
  },
  mining: {
    diesel: 'Muldenkipper, Bagger, Bohrungen — Kraftstofflieferantenberichte der Mine.',
    petrol: 'Leichte Site-Flotte — Tankkartendaten.',
    naturalGas: 'Aufbereitung und Heizung — Gas-Jahresverbrauch.',
    electricity: 'Förderer, Lüftung und Verarbeitung — Hauptzähler-kWh/Jahr.',
  },
  hospitality: {
    diesel: 'Notstrom, Küchenöl und Shuttle — Objektrechnungen.',
    petrol: 'Hotel-Shuttles und Dienstwagen — Flotte/Erstattungen.',
    naturalGas: 'Küchen, Wäscherei und Warmwasser — Gasrechnungen (oft hoch).',
    electricity: 'Zimmer-HLK, Küchen, Pools — Hotelstromrechnungen.',
  },
  retail: {
    diesel: 'Liefer-LKW, Generatoren und Lager — Logistikdaten.',
    petrol: 'Filial- und Lieferfahrzeuge — Tankkarten.',
    naturalGas: 'Filialheizung und Bäckereien — Gas je Filiale.',
    electricity: 'Beleuchtung, Kühlung und HLK — Strom je Standort.',
  },
  healthcare: {
    diesel: 'Notstrom und Rettungswagen — Kraftstoffeinkäufe.',
    petrol: 'Verwaltungs- und Transportfahrzeuge — Flottenberichte.',
    naturalGas: 'Zentralheizung, Sterilisation — Krankenhaus-Gasverbrauch.',
    electricity: 'Medizintechnik und 24/7-HLK — Hauptstromzähler.',
  },
  construction: {
    diesel: 'Baustromaggregate, Bagger und Betonmischer — Baustellen-Tagebücher.',
    petrol: 'Bauleiterfahrzeuge — Erstattungen und Karten.',
    naturalGas: 'Baustellenheizung und Trocknung — Projektgasrechnungen.',
    electricity: 'Baubüros, Kräne und Baustrom — Rechnungen.',
  },
  agriculture: {
    diesel: 'Traktoren, Erntemaschinen, Dieselbewässerung — Jahresabrechnung Landhandel.',
    petrol: 'Hoffahrzeuge — Kraftstoffnachweise.',
    naturalGas: 'Trocknung und Gewächshaus — Gasrechnungen.',
    electricity: 'Elektrobewässerung, Kühlung — Jahres-kWh.',
  },
  energy: {
    diesel: 'Wartungsflotte und Notaggregate — interne Kraftstoffbuchhaltung.',
    petrol: 'Inspektionsflotte — Berichte.',
    naturalGas: 'Betriebsgas im Scope — Messdaten.',
    electricity: 'Hilfslasten, Büros und Pumpen — Betriebsstrommessung.',
  },
  defense: {
    diesel: 'Fahrzeuge, Übungsgeneratoren — Kraftstoffausgabe (wo meldepflichtig).',
    petrol: 'Verwaltungsflotte — Protokolle.',
    naturalGas: 'Basisheizung — Gasrechnungen.',
    electricity: 'Standorte und Anlagen — Stromkonten.',
  },
};
