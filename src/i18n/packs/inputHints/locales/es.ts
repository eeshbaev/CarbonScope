import type { HintCategory, HintSet } from '../types';

export const esHints: Record<HintCategory, HintSet> = {
  other: {
    diesel: 'Facturas de diésel de flota, generadores, informes de contratistas y resúmenes anuales del proveedor.',
    petrol: 'Tarjetas de combustible, reembolsos por kilometraje y extractos de la flota.',
    naturalGas: 'Facturas de gas natural (convertir m³ a kWh), calderas y consumo anual del suministrador.',
    electricity: 'Facturas eléctricas anuales (kWh), subcontadores y refacturación del arrendador.',
  },
  office: {
    diesel: 'Generadores de oficinas/datacenter, vehículos de mantenimiento y equipos en sitio.',
    petrol: 'Flota de vehículos, reembolsos y extractos de tarjetas de combustible.',
    naturalGas: 'Calefacción de oficinas, cocinas y HVAC — facturas anuales de gas.',
    electricity: 'Electricidad de oficinas, informes de colocation y submedición de servidores.',
  },
  manufacturing: {
    diesel: 'Carretillas, cargadoras, generadores y maquinaria móvil — resúmenes anuales del proveedor.',
    petrol: 'Vehículos de planta y flota ligera — informes de gestión de flota.',
    naturalGas: 'Calor de proceso, calderas y secadores — consumo anual en facturas.',
    electricity: 'Motores, compresores, iluminación y HVAC — kWh anual del contador principal.',
  },
  transport: {
    diesel: 'Camiones, furgonetas y equipos de patio — tarjetas y facturas de diésel a granel.',
    petrol: 'Vehículos comerciales ligeros — tarjetas y registros.',
    naturalGas: 'Calefacción de almacenes y flota GNC — facturas de gas.',
    electricity: 'Iluminación de depósitos, cargadores de montacargas y oficinas.',
  },
  aviation: {
    diesel: 'Equipos en tierra, vehículos aeroportuarios y generadores — registros operativos.',
    petrol: 'Flota terrestre del aeropuerto — registros de combustible.',
    naturalGas: 'Calefacción de terminales y cocinas — facturas de gas.',
    electricity: 'Terminales, hangares y carga en tierra — cuentas eléctricas.',
  },
  maritime: {
    diesel: 'Equipos portuarios, remolcadores y diésel en el límite organizacional — notas de bunkering.',
    petrol: 'Flota portuaria — tarjetas de combustible.',
    naturalGas: 'Calefacción en tierra e instalaciones GNL — facturas de gas.',
    electricity: 'Energía en puerto, grúas y edificios — facturas del terminal.',
  },
  oil_gas: {
    diesel: 'Perforación, generadores de campo y compresores — inventarios de combustible.',
    petrol: 'Flota ligera de campo — informes de operaciones.',
    naturalGas: 'Gas de proceso y calefacción — mediciones y liquidaciones.',
    electricity: 'Bombas, compresores y oficinas de campo — medidores y facturas anuales.',
  },
  mining: {
    diesel: 'Camiones, excavadoras, perforación y generadores — informes del proveedor de la mina.',
    petrol: 'Flota ligera del sitio — tarjetas anuales.',
    naturalGas: 'Procesamiento y calefacción — consumo anual de gas.',
    electricity: 'Cintas, ventilación y procesamiento — kWh anual del medidor principal.',
  },
  hospitality: {
    diesel: 'Generadores, combustible de cocina y vehículos del hotel — facturas.',
    petrol: 'Shuttles y vehículos de servicio — flota o reembolsos.',
    naturalGas: 'Cocinas, lavandería y agua caliente — facturas de gas.',
    electricity: 'HVAC de habitaciones, cocinas y piscinas — facturas eléctricas del hotel.',
  },
  retail: {
    diesel: 'Camiones de distribución, generadores y almacén — datos logísticos.',
    petrol: 'Flota de tiendas y furgonetas — tarjetas.',
    naturalGas: 'Calefacción de tiendas y panaderías — gas por tienda.',
    electricity: 'Iluminación, refrigeración y HVAC — facturas por punto de venta.',
  },
  healthcare: {
    diesel: 'Generadores de emergencia y ambulancias — compras de combustible.',
    petrol: 'Vehículos administrativos y de transporte — gestión de flota.',
    naturalGas: 'Calderas centrales y esterilización — consumo anual de gas.',
    electricity: 'Equipos médicos y HVAC 24/7 — contadores principales del hospital.',
  },
  construction: {
    diesel: 'Generadores de obra, excavadoras y hormigoneras — diarios de obra.',
    petrol: 'Vehículos de jefes de obra — reembolsos y tarjetas.',
    naturalGas: 'Calefacción temporal y gas de secado — facturas del proyecto.',
    electricity: 'Oficinas de obra, grúas y electricidad provisional — facturas.',
  },
  agriculture: {
    diesel: 'Tractores, cosechadoras e irrigación diésel — estados anuales del proveedor.',
    petrol: 'Vehículos de la finca — registros de combustible.',
    naturalGas: 'Secado de grano e invernaderos — facturas de gas.',
    electricity: 'Riego eléctrico, frío y ventilación — kWh anual.',
  },
  energy: {
    diesel: 'Flota de mantenimiento y generadores — contabilidad interna.',
    petrol: 'Flota de inspección — informes.',
    naturalGas: 'Gas operativo en el límite — medición.',
    electricity: 'Cargas auxiliares, oficinas y bombeo — medición operativa.',
  },
  defense: {
    diesel: 'Vehículos y generadores de entrenamiento — registros de combustible.',
    petrol: 'Flota administrativa — registros del período.',
    naturalGas: 'Calefacción de bases — facturas de gas.',
    electricity: 'Bases e instalaciones — cuentas eléctricas.',
  },
};
