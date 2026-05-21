import type { HintCategory, HintSet } from '../types';

/** Long-form GHG guidance appended after industry-specific openers. */
const DET: Record<'diesel' | 'petrol' | 'naturalGas' | 'electricity', string> = {
  diesel:
    'GHG Protocol Scope 1 includes CO₂, CH₄, and N₂O from combustion of diesel you purchase and burn in equipment or vehicles your organization owns or controls (operational/financial control per your consolidation approach). Capture volumetric data in litres (convert US gallons × 3.785). Strong sources: fuel-card exports with site or vehicle ID, bulk delivery dockets reconciled to tank dips or flow meters, annual supplier summaries, contractor invoices where you reimburse diesel for your own machinery, and generator service logs with refill volumes. Prefer readings that fall inside your selected reporting window. Exclude fuel you only resell as product, fuel paid for without evidence it was combusted by you, and third-party logistics where you do not operate the vehicle (often Scope 3 downstream/upstream transport). If you blend biodiesel, use the volume your supplier states was actually delivered to you; do not double-count the same tank draw with both a delivery ticket and a duplicate card transaction.',
  petrol:
    'Petrol and gasoline (Scope 1) cover spark-ignition engines in cars, vans, motorcycles, light plant, and portable equipment where your organization controls the fuel. Gather litres from fleet fuel cards, pooled purchasing accounts, mileage reimbursement reports that include purchase receipts, and retail receipts for cash purchases (annotate business use). Align dates with your reporting period; annualize partial-year fleets if your policy is full-year reporting. Exclude personal use of company cash cards without mileage substantiation, and fuel for customer-owned vehicles you never title or operate. Where hybrid plug-ins use both fuels and grid electricity, count petrol here and purchased charging under Scope 2 only if you meter workplace chargers or have utility bills for those kWh.',
  naturalGas:
    'Natural gas in Scope 1 is on-site combustion for heat, steam, direct-fired processes, CHP fuel input attributed to thermal output, and sometimes fuel gas used as chemical feedstock if combusted. Utilities usually bill in m³, kWh, or therms—convert consistently to kWh for this app (use your bill’s stated conversion factor or national standard). Include boiler plant meters, landlord recharges that are clearly for gas burned by you, and LPG/propane vaporizer systems if they are stationary combustion you control. Exclude gas purchased purely as resale, and pure electricity purchases (those are Scope 2). If invoices show only costs, obtain an energy column or apply a tariff-to-kWh factor from the supplier letter. Watch for biogas or biomethane certificates: volume may still be fossil; note assumptions in your methodology log.',
  electricity:
    'Scope 2 (location-based) covers indirect emissions from purchased electricity, steam, heating, or cooling consumed by your organization. Use utility invoices in kWh (or MWh × 1000). Include landlord pass-through charges where kWh are itemized, colocation bills, aggregated half-hourly data from suppliers, and sub-meters behind the main meter that you operate. This app applies a grid-average factor for your selected country—appropriate for many SME inventories; regulated disclosure may additionally require market-based methods (RECs, PPAs) which are not modeled here. Exclude on-site fuel generation (that is Scope 1) and electricity you resell without using. If you have multiple sites, sum each account; if dates straddle your period, prorate by days or use supplier period totals that best match your boundary.',
};

function withDetail(
  field: keyof typeof DET,
  industryIntro: string
): string {
  return `${industryIntro}\n\n${DET[field]}`;
}

export const enHints: Record<HintCategory, HintSet> = {
  other: {
    diesel: withDetail(
      'diesel',
      'Typical SME sources: fleet fuel invoices, backup generators, contractor plant refuelled by you, and annual fuel-supplier statements for all sites.'
    ),
    petrol: withDetail(
      'petrol',
      'Typical SME sources: company car fuel cards, mileage reimbursement packs, and petrol station fleet accounts consolidated for the reporting year.'
    ),
    naturalGas: withDetail(
      'naturalGas',
      'Typical SME sources: gas utility bills, landlord gas recharges with kWh or m³, and boiler service records that note annual consumption.'
    ),
    electricity: withDetail(
      'electricity',
      'Typical SME sources: electricity utility bills, half-hourly exports if available, and landlord electricity recharge schedules with metered kWh.'
    ),
  },
  office: {
    diesel: withDetail(
      'diesel',
      'Office and campus context: backup generators, data-centre diesels, facilities maintenance vehicles, and diesel for on-site tools or pumps.'
    ),
    petrol: withDetail(
      'petrol',
      'Office context: company car schemes, pool cars, parking or mail-run vehicles, and executive fuel reimbursements tied to business mileage.'
    ),
    naturalGas: withDetail(
      'naturalGas',
      'Office context: gas-fired boilers, CHP where gas is on-site combustion, staff catering kitchens, and humidification or absorption chillers using gas.'
    ),
    electricity: withDetail(
      'electricity',
      'Office context: landlord-included base building power, tenant meter reads, data-hall IT load, server-room sub-meters, and EV fleet charging billed to you.'
    ),
  },
  manufacturing: {
    diesel: withDetail(
      'diesel',
      'Manufacturing context: forklifts, shunters, mobile cranes, emergency gensets, diesel-fired dryers or ovens, and bulk storage with inventory reconciliation.'
    ),
    petrol: withDetail(
      'petrol',
      'Manufacturing context: plant security patrol vehicles, staff cars, light commercial run-arounds, and small spark-ignition tools or pumps.'
    ),
    naturalGas: withDetail(
      'naturalGas',
      'Manufacturing context: process furnaces, steam boilers, combined heat and power fuel input, paint curing ovens, and direct-fired drying lines.'
    ),
    electricity: withDetail(
      'electricity',
      'Manufacturing context: main plant incomers, large motor loads, compressed air, electrolysis or induction where grid-powered, and EMS/BMS exported annual kWh.'
    ),
  },
  transport: {
    diesel: withDetail(
      'diesel',
      'Transport context: HGVs, rigids, refrigerated units (including TRU diesel if in your boundary), rail shunt if diesel, and yard tractors.'
    ),
    petrol: withDetail(
      'petrol',
      'Transport context: last-mile vans, car-derived vans, motorcycle couriers, and sales fleets where petrol is the dominant fuel.'
    ),
    naturalGas: withDetail(
      'naturalGas',
      'Transport context: depot space heating, workshop gas, and CNG/LNG refuelling assets you operate (stationary and vehicle fuel per your boundary rules).'
    ),
    electricity: withDetail(
      'electricity',
      'Transport context: warehouse and hub lighting, cold-store grids, electric forklift charging, office blocks at hubs, and on-site truck charging if metered to you.'
    ),
  },
  aviation: {
    diesel: withDetail(
      'diesel',
      'Aviation context: ground-support equipment, de-icing rigs, airside buses, fire-training burns if metered, and emergency generators.'
    ),
    petrol: withDetail(
      'petrol',
      'Aviation context: airside patrol and maintenance cars, small utility vehicles, and non-jet avgas uses if in organizational boundary.'
    ),
    naturalGas: withDetail(
      'naturalGas',
      'Aviation context: terminal heating, catering kitchens, hangar comfort heating, and support-building gas boilers.'
    ),
    electricity: withDetail(
      'electricity',
      'Aviation context: passenger bridges, hangar power, MRO shops, ramp floodlighting, and fixed electric GPU where purchased from grid.'
    ),
  },
  maritime: {
    diesel: withDetail(
      'diesel',
      'Maritime context: port tugs, yard handlers, straddle carriers, gensets, and any marine gasoil bunkers attributable to your operations in boundary.'
    ),
    petrol: withDetail(
      'petrol',
      'Maritime context: port car pools, pilot boats with petrol outboards if applicable, and small service craft.'
    ),
    naturalGas: withDetail(
      'naturalGas',
      'Maritime context: shore LNG/LPG vaporizers, regas support utilities, and terminal heating loads billed as natural gas.'
    ),
    electricity: withDetail(
      'electricity',
      'Maritime context: shore power supplies to vessels you meter, reefer racks, crane motors, cold-chain warehouses, and terminal offices.'
    ),
  },
  oil_gas: {
    diesel: withDetail(
      'diesel',
      'Oil & gas context: drilling power packs, workover rigs, frac pumps where diesel prime movers, field pickups, and camp generators.'
    ),
    petrol: withDetail(
      'petrol',
      'Oil & gas context: light field supervision vehicles and airport-style runabouts on lease to operations.'
    ),
    naturalGas: withDetail(
      'naturalGas',
      'Oil & gas context: fuel gas consumed as energy on-site, dehydration reboilers, gas-powered compressors where combustion is yours, and facility heating.'
    ),
    electricity: withDetail(
      'electricity',
      'Oil & gas context: artificial lift, processing plant motors, instrument air, control rooms, and telecom sites on utility power.'
    ),
  },
  mining: {
    diesel: withDetail(
      'diesel',
      'Mining context: haul fleets, loaders, drills, dewatering pumps, and mine-site gensets with refuel logs or weighbridge data.'
    ),
    petrol: withDetail(
      'petrol',
      'Mining context: light vehicles for supervisors, survey crews, and explosive escort vehicles where petrol-fuelled.'
    ),
    naturalGas: withDetail(
      'naturalGas',
      'Mining context: processing heaters, leach heating, site accommodation boilers, and any pipeline gas burned for thermal duty.'
    ),
    electricity: withDetail(
      'electricity',
      'Mining context: hoists, conveyors, ventilation fans, crushing/grinding, and camp power from grid or imported kWh statements.'
    ),
  },
  hospitality: {
    diesel: withDetail(
      'diesel',
      'Hospitality context: backup generators, kitchen gas-oil backups if diesel, and delivery vehicles owned by the property.'
    ),
    petrol: withDetail(
      'petrol',
      'Hospitality context: guest shuttles, concierge cars, and engineering vans for multi-property operators.'
    ),
    naturalGas: withDetail(
      'naturalGas',
      'Hospitality context: laundry tumble dryers, pool heating, domestic hot water, and banquet kitchen lines—often a top Scope 1 line.'
    ),
    electricity: withDetail(
      'electricity',
      'Hospitality context: guest rooms HVAC, kitchens, vertical transport, cold rooms, and spa loads—usually dominant Scope 2.'
    ),
  },
  retail: {
    diesel: withDetail(
      'diesel',
      'Retail context: own-fleet delivery trucks, DC yard shunters, backup generators, and construction diesels for refits if capitalized to you.'
    ),
    petrol: withDetail(
      'petrol',
      'Retail context: regional van pools, store manager vehicles, and customer home-delivery fleets using petrol.'
    ),
    naturalGas: withDetail(
      'naturalGas',
      'Retail context: store HVAC gas, in-store bakeries, food halls, and distribution centre space heating.'
    ),
    electricity: withDetail(
      'electricity',
      'Retail context: open-front HVAC, refrigerated cases (large share in food retail), lighting retrofits, and EV charger rollouts at stores.'
    ),
  },
  healthcare: {
    diesel: withDetail(
      'diesel',
      'Healthcare context: life-safety generators, owned ambulance diesels, mobile clinics, and plant boilers if oil-fired—map fuel type carefully.'
    ),
    petrol: withDetail(
      'petrol',
      'Healthcare context: non-emergency patient transport, outreach cars, and security patrol vehicles.'
    ),
    naturalGas: withDetail(
      'naturalGas',
      'Healthcare context: steam for sterilization, kitchen lines, laundry boilers, and district steam if sourced from on-site gas boilers you operate.'
    ),
    electricity: withDetail(
      'electricity',
      'Healthcare context: imaging suites, OR HVAC, blood fridges, data centres for EHR, and 24/7 base building loads—dominant Scope 2.'
    ),
  },
  construction: {
    diesel: withDetail(
      'diesel',
      'Construction context: tower crane gensets, excavators, piling rigs, concrete pumps, and site bulk tanks with dip reconciliation.'
    ),
    petrol: withDetail(
      'petrol',
      'Construction context: site supervisor pickups, light vans, and small plant where petrol engines are used.'
    ),
    naturalGas: withDetail(
      'naturalGas',
      'Construction context: temporary drying or curing heat, propane for ground thaw, and site accommodation boilers if on natural gas.'
    ),
    electricity: withDetail(
      'electricity',
      'Construction context: site cabins, electric tower cranes, batch plant weighers, and temporary builder supply meters.'
    ),
  },
  agriculture: {
    diesel: withDetail(
      'diesel',
      'Agriculture context: tractors, combines, forage harvesters, irrigation engines, grain dryers with diesel burners, and mobile feed mills.'
    ),
    petrol: withDetail(
      'petrol',
      'Agriculture context: ATVs, utility task vehicles, staff pickups, and light orchard sprayers if petrol-powered.'
    ),
    naturalGas: withDetail(
      'naturalGas',
      'Agriculture context: grain dryers on gas, greenhouse heating, and on-farm biogas upgrading only where you still purchase supplemental fossil gas.'
    ),
    electricity: withDetail(
      'electricity',
      'Agriculture context: irrigation pumps, cold stores, packhouses, vertical farms, and dairy parlour vacuum pumps on grid power.'
    ),
  },
  energy: {
    diesel: withDetail(
      'diesel',
      'Energy-sector context: O&M road fleet, emergency diesels at substations, and construction support vehicles for your workforce.'
    ),
    petrol: withDetail(
      'petrol',
      'Energy-sector context: inspection and survey light vehicles where petrol is still used in the fleet mix.'
    ),
    naturalGas: withDetail(
      'naturalGas',
      'Energy-sector context: operational fuel gas purchases for plants you operate, peaker turbines on gas, and auxiliary boilers—follow your consolidation rules for JVs.'
    ),
    electricity: withDetail(
      'electricity',
      'Energy-sector context: parasitic load at generation sites is often out of sold-electricity boundary; include office campuses and pumping stations clearly in your inventory boundary.'
    ),
  },
  defense: {
    diesel: withDetail(
      'diesel',
      'Defense context: tactical and support vehicles, training area generators, and plant diesels—only where data are reportable under your policies.'
    ),
    petrol: withDetail(
      'petrol',
      'Defense context: administrative fleet and training vehicles on petrol where disclosure is permitted.'
    ),
    naturalGas: withDetail(
      'naturalGas',
      'Defense context: base heating plants, dining facilities, and workshops on gas where metered.'
    ),
    electricity: withDetail(
      'electricity',
      'Defense context: installation utility accounts, datacentres, and training simulators on purchased power where shareable.'
    ),
  },
};
