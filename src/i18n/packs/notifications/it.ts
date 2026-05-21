import type { TranslationKeys } from '../../locales/en';

export const itNotifications: TranslationKeys['notifications'] = {
  section: 'Notifiche',
  master: 'Promemoria e suggerimenti',
  masterHint:
    'Promemoria locali utili basati sulle tue valutazioni (i dati non lasciano il dispositivo).',
  drafts: 'Valutazioni incomplete',
  monthly: 'Inserimento dati mensile',
  refresh: 'Promemoria aggiornamento dati',
  periodEnd: 'Fine del periodo di rendicontazione',
  reportingCalendar: 'Calendario reporting',
  educational: 'Approfondimenti settimanali (report e clima)',
  educationalHint:
    'Opzionale. Una breve nota a settimana (solo domenica, martedì o giovedì) su norme, scienza del clima, storia e innovazione — mai promozionale.',
  reengagement: 'Promemoria di ritorno',
  initiatives: 'Follow-up iniziative',
  initiativeTitle: 'Controlla le iniziative di riduzione',
  initiativeBody: 'Hai impostato azioni per {company}. Verifica i progressi.',
  permissionTitle: 'Resta aggiornato con i promemoria',
  permissionBody:
    'CarbonScope può inviare orientamento professionale e promemoria sui periodi di report, inserimenti mensili e valutazioni incomplete. Controlla ogni categoria in Impostazioni.',
  enable: 'Attiva promemoria',
  notNow: 'Non ora',
  draftTitle: 'Valutazione incompleta',
  draftBody: 'Hai una valutazione incompleta per {company}. Apri CarbonScope per continuare.',
  monthlyTitle: 'Inserimento dati mensile',
  monthlyBody: 'Aggiungi i dati di {month} per {company}{categories}.',
  monthlyCategoriesSuffix: ' ({categories})',
  refresh6Title: 'È il momento di aggiornare i dati',
  refresh6Body:
    'Sono passati 6 mesi dall’ultimo aggiornamento di {company}. Ricalcola le emissioni Scope 1 e 2 con l’uso attuale di carburante ed elettricità.',
  refresh12Title: 'Promemoria aggiornamento annuale',
  refresh12Body:
    'Sono passati 12 mesi dall’ultimo aggiornamento di {company}. Aggiorna la valutazione per un report accurato.',
  periodEndTitle: 'Il periodo di report termina presto',
  periodEndBody:
    '{company}: la finestra di report {period} si chiude tra 7 giorni. Rivedi o chiudi le voci.',
  reportingCalendarTitle: 'Scadenza reporting in avvicinamento',
  reportingCalendarBody:
    '{company}: il periodo {period} chiude tra due settimane. Finalizza Scope 1 e 2 ed esporta il pacchetto prove.',
  firstSuccessTitle: 'Il report sulle emissioni è pronto',
  firstSuccessBody:
    'Apri CarbonScope per vedere i risultati ed esportare un PDF. Suggerimento: Scope 2 cambia quando aggiorni paese o consumo elettrico.',
  educationalTitle: 'Approfondimento carbonio',
  insightOfWeekTitle: 'Insight della settimana',
  insightTap: 'Tocca per leggere',
  reengagementTitle: 'Aggiorna la valutazione carbonio',
  reengagementBody:
    'Stai ancora monitorando {company}? Aggiorna carburanti ed elettricità di questo periodo per un quadro accurato di Scope 1 e 2.',
  tips: {
    scope1Vs2:
      'Scope 1 copre i combustibili che bruci direttamente (diesel, benzina, gas naturale). Scope 2 copre l’elettricità acquistata — entrambi sono essenziali negli inventari GHG Protocol.',
    utilityBills:
      'Bollette di utenze e carburante sono la fonte più affidabile di kWh, litri e m³. Tieni una cartella per periodo di report.',
    gridFactor:
      'Le emissioni Scope 2 dipendono dal fattore di rete del paese. CarbonScope applica il fattore automaticamente alla selezione del paese.',
    monthlyTracking:
      'Nei periodi semestrali o annuali, l’inserimento mensile aiuta a individuare picchi stagionali — utile per audit energetici e disclosure ESG.',
    scope1Fuels:
      'Diesel di flotta e gas in sede spesso dominano Scope 1. Inizia dalle categorie di carburante con la spesa maggiore.',
    scope2Electricity:
      'L’elettricità di uffici e impianti è Scope 2. Usa kWh annuali da bollette o sottometer; puoi inserire MWh e vengono convertiti automaticamente.',
    reportingPeriod:
      'Allinea la data di inizio del report all’esercizio fiscale o all’anno di sostenibilità così i risultati coincidono con altre disclosure.',
    saveProgress:
      'Usa Salva progresso in Scope 1 o 2 se devi raccogliere dati più tardi — le voci restano su questo dispositivo fino al calcolo dei risultati.',
    whyReportingMatters:
      'Misurare le emissioni Scope 1 e 2 aiuta le aziende a capire l’impatto climatico operativo, fissare baseline e rispondere con credibilità a investitori, banche e clienti.',
    whyReportingSME:
      'Le PMI spesso iniziano da Scope 1 e 2 perché i dati sono a portata di mano (bollette carburante ed elettricità). Una baseline chiara supporta crescita e requisiti di gara.',
    whyReportingEnterprise:
      'Le grandi organizzazioni applicano metodi coerenti di Scope 1 e 2 su tutte le sedi così consolidamento, obiettivi e report esterni (CDP, bilanci) sono comparabili anno su anno.',
    ghgProtocol:
      'Il GHG Protocol è lo standard globale più usato per inventari aziendali. Definisce Scope 1, 2 e 3 e come contabilizzare carburanti ed elettricità.',
    iso14064:
      'ISO 14064-1 guida quantificazione e report di inventari GHG a livello di organizzazione. Integra il GHG Protocol ed è citata in molti schemi nazionali.',
    csrdEsrs:
      'Nell’UE, CSRD e ESRS E1 richiedono a grandi imprese e quotate di riportare emissioni con verifica crescente. Scope 1 e 2 sono spesso il punto di partenza.',
    tcfdIfrs:
      'TCFD e ISSB (IFRS S2) promuovono disclosure su rischi climatici ed emissioni. Dati affidabili di Scope 1 e 2 supportano pianificazione di transizione e report finanziari.',
    parisAgreement:
      'L’Accordo di Parigi (2015) mira a limitare il riscaldamento ben al di sotto di 2 °C. Gli obiettivi nazionali arrivano alle politiche — le imprese contribuiscono con riduzioni misurate nelle operazioni.',
    kyotoHistory:
      'Il Protocollo di Kyoto (era 1995–2012) introdusse obiettivi vincolanti per molti paesi industrializzati e aiutò a standardizzare la contabilità nazionale delle emissioni.',
    co2Science:
      'CO₂ e altri gas serra trattengono calore nell’atmosfera. Le attività umane — soprattutto la combustione di fossili — hanno elevato il CO₂ atmosferico molto sopra i livelli preindustriali.',
    climateBusinessRisk:
      'Rischi fisici e di transizione del cambiamento climatico possono colpire catene di fornitura, costi energetici e regolamentazione. I dati sulle emissioni sono un input per pianificazione aziendale informata.',
    companyActions:
      'Le aziende possono ridurre Scope 1 e 2 con efficienza, cambio carburante, elettricità rinnovabile, rinnovo flotte e collaborazione con facility — la misurazione mostra cosa funziona.',
    energyEfficiency:
      'LED, ottimizzazione HVAC e motori spesso riducono l’elettricità (Scope 2) con payback brevi. Confronta kWh prima e dopo per vedere l’impatto in tCO₂e.',
    renewableElectricity:
      'Tariffe rinnovabili, solare in sede e PPA riducono Scope 2 quando puoi rivendicare riduzioni basate sul mercato con credibilità — conserva i certificati.',
    fleetAndHeat:
      'Elettrificare flotte leggere, usare biocarburanti certificati e migliorare l’efficienza delle caldaie affrontano Scope 1. Inizia da veicoli e riscaldamento attivi tutto l’anno.',
    industrialTech:
      'Elettroficazione dei processi, recupero calore residuo e gestione energetica digitale si diffondono in industria — riducono costi e Scope 1 e 2 nel tempo.',
    dataQuality:
      'Buoni inventari documentano fonti (bollette, contatori), ipotesi e periodi. Le note nella valutazione aiutano auditor e te stesso in futuro.',
    scope3Note:
      'Scope 3 copre emissioni della catena del valore (fornitori, viaggi, prodotti). Gli inventari Scope 1 e 2 sono la base — molti framework li richiedono per primi.',
    assurance:
      'La verifica esterna dei dati GHG è sempre più attesa. Metodi coerenti e bollette conservate facilitano l’assurance quando serve.',
    sectorManufacturing:
      'I produttori spesso hanno Scope 1 elevato da gas e diesel e Scope 2 elevato dalle linee. La sottomisurazione dei processi chiave migliora l’accuratezza.',
    sectorOffice:
      'Le aziende d’ufficio dipendono spesso più da Scope 2 (elettricità) con Scope 1 minore (generatori di backup, auto aziendali). La scelta del paese determina il fattore di rete.',
    scienceMethane:
      'Metano e ossido nitroso riscaldano il clima, spesso più per unità del CO₂ su 20 anni. Il report di carburanti e gas cattura parte della loro impronta GHG diretta.',
    keelingCurve:
      'Le misure di Charles Keeling a Mauna Loa (dal 1958) mostrarono CO₂ in costante aumento — uno dei registri globali più chiari a sostegno della scienza climatica attuale.',
    ipccScience:
      'L’IPCC sintetizza scienza peer-reviewed per i decisori. I rapporti di valutazione informano l’Accordo di Parigi e i piani climatici nazionali nel mondo.',
    industrialCo2Rise:
      'L’uso di combustibili fossili dalla Rivoluzione industriale ha moltiplicato le emissioni di CO₂. Oggi energia e industria restano centrali nel report Scope 1 e 2.',
    euEts:
      'Il sistema EU ETS (dal 2005) limita il CO₂ di elettricità e industria — un modello che molte regioni studiano per carbon pricing e disclosure.',
    nordicHeating:
      'I paesi nordici hanno promosso teleriscaldamento e rinnovabili, riducendo emissioni per il riscaldamento degli edifici — rilevante nel confronto dei fattori di rete nazionali.',
    chinaRenewables:
      'La Cina guida il dispiegamento mondiale di capacità solare ed eolica. I fattori di rete riflettono ancora il mix completo — la posizione conta per Scope 2.',
    greenHydrogen:
      'Idrogeno verde (elettrolisi con rinnovabili) è in prova in acciaio, chimica e trasporto pesante — future riduzioni di Scope 1 in industria.',
    steelInnovation:
      'DRI e forni ad arco elettrico possono ridurre la dipendenza dal carbone nell’acciaio. Gli specialisti seguono impianti pilota in Europa e Asia.',
    carbonCapture:
      'La cattura del carbonio (uso o stoccaggio) si dispiega in alcuni impianti di cemento ed energia. Non sostituisce l’efficienza, ma può affrontare emissioni di processo difficili.',
    brazilBiofuels:
      'Il programma brasiliano di etanolo per flotte ha ridotto la dipendenza dalla benzina per decenni — esempio di cambio carburante nel trasporto negli inventari nazionali.',
    africaSolar:
      'Solare distribuito e minigrid espandono l’accesso in Africa e riducono generatori diesel — via pratica per ridurre Scope 1 negli impianti.',
    copSummits:
      'Le conferenze climatiche ONU (COP) coordinano i negoziati globali. I dati aziendali Scope 1 e 2 supportano impegni nazionali e aspettative della supply chain.',
  },
};
