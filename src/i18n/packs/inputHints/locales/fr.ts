import type { HintCategory, HintSet } from '../types';

export const frHints: Record<HintCategory, HintSet> = {
  other: {
    diesel:
      'Factures de gazole (flotte, groupes électrogènes), rapports des sous-traitants et relevés annuels du fournisseur de carburant.',
    petrol:
      'Cartes carburant, notes de frais kilométriques et relevés de stations-service pour la flotte.',
    naturalGas:
      'Factures de gaz naturel (convertir m³ en kWh si besoin), chaudières et consommation annuelle du distributeur.',
    electricity:
      'Factures d\'électricité annuelles (kWh), sous-compteurs par bâtiment et refacturations du bailleur.',
  },
  office: {
    diesel:
      'Groupes électrogènes de bureaux ou data centers, véhicules d\'entretien et équipements sur site.',
    petrol:
      'Flotte de véhicules de service, remboursements carburant et relevés de cartes essence.',
    naturalGas:
      'Chauffage des bureaux, cuisines et CVC — factures annuelles de gaz par site.',
    electricity:
      'Factures d\'électricité des bureaux, colocation/data center et sous-compteurs salles serveurs.',
  },
  manufacturing: {
    diesel:
      'Chariots élévateurs, engins, générateurs et engins mobiles — synthèses annuelles du fournisseur.',
    petrol:
      'Véhicules de sécurité, voitures de service et flotte légère — rapports de gestion de flotte.',
    naturalGas:
      'Chaleur de procédé, chaudières et fours — consommation annuelle sur factures de gaz.',
    electricity:
      'Moteurs, compresseurs, éclairage et CVC — compteur principal annuel (kWh) ou système énergétique.',
  },
  transport: {
    diesel:
      'Poids lourds, fourgons et manœuvres de cour — cartes carburant et factures en gros.',
    petrol:
      'Utilitaires légers et voitures de service — cartes et journaux de bord.',
    naturalGas:
      'Chauffage d\'entrepôts et flotte GNV le cas échéant — factures de gaz par site.',
    electricity:
      'Éclairage des dépôts, chariots électriques et bureaux — factures d\'électricité consolidées.',
  },
  aviation: {
    diesel:
      'Équipements au sol, véhicules aéroportuaires et groupes électrogènes — journaux d\'exploitation.',
    petrol:
      'Flotte au sol de l\'aéroport — enregistrements carburant annuels.',
    naturalGas:
      'Chauffage des terminaux et cuisines — factures de gaz des installations.',
    electricity:
      'Terminaux, hangars et recharge au sol — comptes d\'électricité aéroport ou locataires.',
  },
  maritime: {
    diesel:
      'Matériel portuaire, remorqueurs et diesel dans le périmètre — notes de livraison de bunkers.',
    petrol:
      'Flotte portuaire et petites embarcations — cartes carburant.',
    naturalGas:
      'Chauffage à quai et installations GNL à terre — factures de gaz.',
    electricity:
      'Alimentation à quai, grues et bâtiments — factures du terminal ou de l\'autorité portuaire.',
  },
  oil_gas: {
    diesel:
      'Forages, groupes électrogènes de terrain, compresseurs et flotte — inventaires carburant des opérations.',
    petrol:
      'Véhicules légers de terrain — rapports d\'exploitation.',
    naturalGas:
      'Gaz de procédé et chauffage des sites — mesures et règlements avec le fournisseur.',
    electricity:
      'Pompes, compresseurs et bureaux de site — compteurs et factures annuelles.',
  },
  mining: {
    diesel:
      'Camions, excavatrices, forage et groupes — rapports du fournisseur de carburant de la mine.',
    petrol:
      'Flotte légère du site — cartes carburant annuelles.',
    naturalGas:
      'Usines de traitement et chauffage — consommation annuelle de gaz.',
    electricity:
      'Convoyeurs, ventilation et traitement — kWh annuels du compteur principal.',
  },
  hospitality: {
    diesel:
      'Groupes électrogènes, fioul de cuisine et navettes — factures de l\'établissement.',
    petrol:
      'Navettes hôtel et véhicules de service — flotte ou remboursements.',
    naturalGas:
      'Cuisines, blanchisserie et eau chaude — factures de gaz (souvent importantes).',
    electricity:
      'CVC des chambres, cuisines, piscines et ascenseurs — factures d\'électricité de l\'hôtel.',
  },
  retail: {
    diesel:
      'Camions de distribution, groupes et entrepôts — données logistiques et magasins.',
    petrol:
      'Flotte magasins et utilitaires — cartes carburant.',
    naturalGas:
      'Chauffage des magasins et boulangeries — gaz par magasin ou compte national.',
    electricity:
      'Éclairage, froid commercial et CVC — factures par point de vente.',
  },
  healthcare: {
    diesel:
      'Groupes électrogènes d\'urgence et ambulances — achats de carburant et journaux de service.',
    petrol:
      'Véhicules administratifs et transport — gestion de flotte.',
    naturalGas:
      'Chaufferies centrales, stérilisation et cuisines — consommation annuelle de gaz.',
    electricity:
      'Équipements médicaux et CVC 24/7 — compteurs principaux de l\'hôpital.',
  },
  construction: {
    diesel:
      'Groupes de chantier, engins et malaxeurs — journaux de chantier et livraisons en vrac.',
    petrol:
      'Véhicules de encadrement — remboursements et cartes.',
    naturalGas:
      'Chauffage temporaire et gaz de séchage — factures de projet.',
    electricity:
      'Bungalows, grues électriques et électricité provisoire — factures du chantier.',
  },
  agriculture: {
    diesel:
      'Tracteurs, moissonneuses et irrigation diesel — relevés annuels du fournisseur.',
    petrol:
      'Véhicules de ferme — achats de carburant.',
    naturalGas:
      'Séchage des grains et serres — factures de gaz.',
    electricity:
      'Irrigation électrique, chambres froides et ventilation — kWh annuels.',
  },
  energy: {
    diesel:
      'Flotte de maintenance et groupes d\'urgence — comptabilité interne du carburant.',
    petrol:
      'Flotte d\'inspection — rapports carburant.',
    naturalGas:
      'Gaz opérationnel dans le périmètre — mesures et factures.',
    electricity:
      'Charges auxiliaires, bureaux et pompage — comptage opérationnel kWh.',
  },
  defense: {
    diesel:
      'Véhicules, groupes d\'entraînement et équipements — registres de carburant (si déclarables).',
    petrol:
      'Flotte administrative — journaux de la période.',
    naturalGas:
      'Chauffage des bases — factures de gaz.',
    electricity:
      'Bases et installations — comptes d\'électricité.',
  },
};
