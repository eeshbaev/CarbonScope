import type { HintCategory, HintSet } from '../types';

export const ptHints: Record<HintCategory, HintSet> = {
  other: {
    diesel: 'Faturas de gasóleo da frota, geradores, relatórios de contratados e resumos anuais do fornecedor.',
    petrol: 'Cartões de combustível, reembolsos de quilometragem e extratos da frota.',
    naturalGas: 'Faturas de gás natural (converter m³ para kWh), caldeiras e consumo anual.',
    electricity: 'Faturas de eletricidade anuais (kWh), subcontadores e repasses do senhorio.',
  },
  office: {
    diesel: 'Geradores de escritórios/data center, veículos de facilities e equipamentos no local.',
    petrol: 'Frota de viaturas, reembolsos e cartões de combustível.',
    naturalGas: 'Aquecimento de escritórios, cozinhas e AVAC — faturas anuais de gás.',
    electricity: 'Eletricidade de escritórios, colocation e submedição de servidores.',
  },
  manufacturing: {
    diesel: 'Empilhadores, carregadoras, geradores e equipamento móvel — resumo anual do fornecedor.',
    petrol: 'Viaturas da fábrica e frota ligeira — relatórios de gestão de frota.',
    naturalGas: 'Calor de processo, caldeiras e secadores — consumo anual nas faturas.',
    electricity: 'Motores, compressores, iluminação e AVAC — kWh anual do contador principal.',
  },
  transport: {
    diesel: 'Camiões, carrinhas e equipamento de pátio — cartões e faturas de gasóleo a granel.',
    petrol: 'Veículos comerciais ligeiros — cartões e registos.',
    naturalGas: 'Aquecimento de armazéns e frota GNC — faturas de gás.',
    electricity: 'Iluminação de depósitos, carregamento de empilhadores elétricos e escritórios.',
  },
  aviation: {
    diesel: 'Equipamento de rampa, veículos aeroportuários e geradores — registos operacionais.',
    petrol: 'Frota terrestre do aeroporto — registos de combustível.',
    naturalGas: 'Aquecimento de terminais e cozinhas — faturas de gás.',
    electricity: 'Terminais, hangares e carregamento em terra — contas de eletricidade.',
  },
  maritime: {
    diesel: 'Equipamento portuário, reboqueadores e gasóleo no limite organizacional — notas de bunkering.',
    petrol: 'Frota portuária — cartões de combustível.',
    naturalGas: 'Aquecimento em terra e instalações GNL — faturas de gás.',
    electricity: 'Energia em porto, gruas e edifícios — faturas do terminal.',
  },
  oil_gas: {
    diesel: 'Perfuração, geradores de campo e compressores — inventários de combustível.',
    petrol: 'Frota ligeira de campo — relatórios de operações.',
    naturalGas: 'Gás de processo e aquecimento — medições e liquidações.',
    electricity: 'Bombas, compressores e escritórios — contadores e faturas anuais.',
  },
  mining: {
    diesel: 'Camiões, escavadoras, perfuração e geradores — relatórios do fornecedor da mina.',
    petrol: 'Frota ligeira do site — cartões anuais.',
    naturalGas: 'Processamento e aquecimento — consumo anual de gás.',
    electricity: 'Correias, ventilação e processamento — kWh anual do contador principal.',
  },
  hospitality: {
    diesel: 'Geradores, combustível de cozinha e shuttles — faturas do estabelecimento.',
    petrol: 'Shuttles e viaturas de serviço — frota ou reembolsos.',
    naturalGas: 'Cozinhas, lavandaria e água quente — faturas de gás.',
    electricity: 'AVAC de quartos, cozinhas e piscinas — faturas de eletricidade do hotel.',
  },
  retail: {
    diesel: 'Camiões de distribuição, geradores e armazém — dados logísticos.',
    petrol: 'Frota de lojas e carrinhas — cartões.',
    naturalGas: 'Aquecimento de lojas e padarias — gás por loja.',
    electricity: 'Iluminação, refrigeração e AVAC — faturas por loja.',
  },
  healthcare: {
    diesel: 'Geradores de emergência e ambulâncias — compras de combustível.',
    petrol: 'Viaturas administrativas e de transporte — gestão de frota.',
    naturalGas: 'Caldeiras centrais e esterilização — consumo anual de gás.',
    electricity: 'Equipamento médico e AVAC 24/7 — contadores principais do hospital.',
  },
  construction: {
    diesel: 'Geradores de obra, escavadoras e betoneiras — diários de obra.',
    petrol: 'Viaturas de encarregados — reembolsos e cartões.',
    naturalGas: 'Aquecimento temporário e gás de secagem — faturas do projeto.',
    electricity: 'Escritórios de obra, gruas e eletricidade provisória — faturas.',
  },
  agriculture: {
    diesel: 'Tratores, colheitadoras e rega a gasóleo — extratos anuais do fornecedor.',
    petrol: 'Viaturas da exploração — registos de combustível.',
    naturalGas: 'Secagem de cereais e estufas — faturas de gás.',
    electricity: 'Rega elétrica, frio e ventilação — kWh anual.',
  },
  energy: {
    diesel: 'Frota de manutenção e geradores — contabilidade interna.',
    petrol: 'Frota de inspeção — relatórios.',
    naturalGas: 'Gás operacional no limite — medição.',
    electricity: 'Cargas auxiliares, escritórios e bombagem — medição operacional.',
  },
  defense: {
    diesel: 'Veículos e geradores de treino — registos de combustível.',
    petrol: 'Frota administrativa — registos do período.',
    naturalGas: 'Aquecimento de bases — faturas de gás.',
    electricity: 'Bases e instalações — contas de eletricidade.',
  },
};
