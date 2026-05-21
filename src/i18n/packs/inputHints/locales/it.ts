import type { HintCategory, HintSet } from '../types';

export const itHints: Record<HintCategory, HintSet> = {
  other: {
    diesel: 'Fatture gasolio flotta, generatori, report appaltatori e riepiloghi annuali del fornitore.',
    petrol: 'Carte carburante, rimborsi chilometrici ed estratti della flotta.',
    naturalGas: 'Bollette gas naturale (convertire m³ in kWh), caldaie e consumo annuo.',
    electricity: 'Bollette elettriche annuali (kWh), sottocontatori e ripartizioni del locatore.',
  },
  office: {
    diesel: 'Generatori uffici/data center, veicoli facility e attrezzature in sede.',
    petrol: 'Flotta aziendale, rimborsi e carte carburante.',
    naturalGas: 'Riscaldamento uffici, cucine e HVAC — bollette gas annuali.',
    electricity: 'Elettricità uffici, report colocation e sottometer server.',
  },
  manufacturing: {
    diesel: 'Carrelli elevatori, pale, generatori e impianti mobili — riepilogo annuale fornitore.',
    petrol: 'Veicoli di stabilimento e flotta leggera — report gestione flotta.',
    naturalGas: 'Calore di processo, caldaie e essiccatori — consumo annuo in bolletta.',
    electricity: 'Motori, compressori, illuminazione e HVAC — kWh annui contatore principale.',
  },
  transport: {
    diesel: 'Camion, furgoni e mezzi di piazzale — carte e fatture gasolio sfuso.',
    petrol: 'Veicoli commerciali leggeri — carte e registri.',
    naturalGas: 'Riscaldamento magazzini e flotta CNG — bollette gas.',
    electricity: 'Illuminazione depositi, carica carrelli elettrici e uffici.',
  },
  aviation: {
    diesel: 'Attrezzature a terra, veicoli aeroportuali e generatori — registri operativi.',
    petrol: 'Flotta a terra aeroporto — registri carburante.',
    naturalGas: 'Riscaldamento terminal e cucine — bollette gas.',
    electricity: 'Terminal, hangar e ricarica a terra — utenze elettriche.',
  },
  maritime: {
    diesel: 'Attrezzature portuali, rimorchiatori e gasolio nel perimetro — note bunkering.',
    petrol: 'Flotta portuale — carte carburante.',
    naturalGas: 'Riscaldamento a terra e impianti GNL — bollette gas.',
    electricity: 'Energia in banchina, gru e edifici — bollette terminal.',
  },
  oil_gas: {
    diesel: 'Perforazione, generatori di campo e compressori — inventari carburante.',
    petrol: 'Flotta leggera di campo — report operativi.',
    naturalGas: 'Gas di processo e riscaldamento — misure e conguagli.',
    electricity: 'Pompe, compressori e uffici — contatori e bollette annuali.',
  },
  mining: {
    diesel: 'Camion, escavatori, perforazione e generatori — report fornitore miniera.',
    petrol: 'Flotta leggera sito — carte annuali.',
    naturalGas: 'Trattamento e riscaldamento — consumo gas annuo.',
    electricity: 'Nastri, ventilazione e trattamento — kWh annui contatore principale.',
  },
  hospitality: {
    diesel: 'Generatori, combustibile cucina e navette — fatture struttura.',
    petrol: 'Navette hotel e veicoli servizio — flotta o rimborsi.',
    naturalGas: 'Cucine, lavanderia e acqua calda — bollette gas.',
    electricity: 'HVAC camere, cucine e piscine — bollette elettriche hotel.',
  },
  retail: {
    diesel: 'Camion distribuzione, generatori e magazzino — dati logistica.',
    petrol: 'Flotta negozi e furgoni — carte.',
    naturalGas: 'Riscaldamento negozi e panetterie — gas per punto vendita.',
    electricity: 'Illuminazione, refrigerazione e HVAC — bollette per store.',
  },
  healthcare: {
    diesel: 'Generatori emergenza e ambulanze — acquisti carburante.',
    petrol: 'Veicoli amministrativi e trasporto — gestione flotta.',
    naturalGas: 'Caldaie centrali e sterilizzazione — consumo gas annuo.',
    electricity: 'Apparecchiature mediche e HVAC 24/7 — contatori principali.',
  },
  construction: {
    diesel: 'Generatori cantiere, escavatori e betoniere — giornali di cantiere.',
    petrol: 'Veicoli capocantiere — rimborsi e carte.',
    naturalGas: 'Riscaldamento temporaneo e gas per essiccazione — fatture progetto.',
    electricity: 'Uffici cantiere, gru e energia provvisoria — bollette.',
  },
  agriculture: {
    diesel: 'Trattori, mietitrebbie e irrigazione diesel — estratti annuali fornitore.',
    petrol: 'Veicoli azienda agricola — registri carburante.',
    naturalGas: 'Essiccazione cereali e serre — bollette gas.',
    electricity: 'Irrigazione elettrica, freddo e ventilazione — kWh annui.',
  },
  energy: {
    diesel: 'Flotta manutenzione e generatori — contabilità interna.',
    petrol: 'Flotta ispezione — report.',
    naturalGas: 'Gas operativo nel perimetro — misurazione.',
    electricity: 'Carichi ausiliari, uffici e pompaggio — misurazione operativa.',
  },
  defense: {
    diesel: 'Veicoli e generatori addestramento — registri carburante.',
    petrol: 'Flotta amministrativa — registri del periodo.',
    naturalGas: 'Riscaldamento basi — bollette gas.',
    electricity: 'Basi e installazioni — utenze elettriche.',
  },
};
