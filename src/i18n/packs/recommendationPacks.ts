import type { IndustryKey } from '../../data/industries';
import { INDUSTRY_KEYS } from '../../data/industries';
import type { Locale } from '../index';
import { en } from '../locales/en';

type Rec = [string, string, string];
const r = (a: string, b: string, c: string): Rec => [a, b, c];

const GENERIC: Record<Exclude<Locale, 'en'>, Rec> = {
  ru: r(
    'Проведите энергоаудит для выявления возможностей снижения выбросов.',
    'Рассмотрите закупку возобновляемой электроэнергии.',
    'Установите цели по сокращению выбросов Scope 1 и 2.'
  ),
  fr: r(
    'Réalisez un audit énergétique pour identifier des réductions.',
    'Envisagez l\'achat d\'électricité renouvelable.',
    'Fixez des objectifs de réduction des émissions Scope 1 et 2.'
  ),
  de: r(
    'Führen Sie ein Energieaudit zur Identifikation von Einsparpotenzialen durch.',
    'Beziehen Sie erneuerbaren Strom ein.',
    'Setzen Sie Reduktionsziele für Scope 1 und 2.'
  ),
  es: r(
    'Realice una auditoría energética para identificar reducciones.',
    'Considere la compra de electricidad renovable.',
    'Establezca objetivos de reducción de emisiones Scope 1 y 2.'
  ),
  pt: r(
    'Realize uma auditoria energética para identificar reduções.',
    'Considere a compra de eletricidade renovável.',
    'Defina metas de redução de emissões Scope 1 e 2.'
  ),
  it: r(
    'Effettuate un audit energetico per individuare riduzioni.',
    'Valutate l\'acquisto di elettricità rinnovabile.',
    'Stabilite obiettivi di riduzione delle emissioni Scope 1 e 2.'
  ),
  ja: r(
    'エネルギー監査を実施し、削減機会を特定してください。',
    '再生可能電力の調達を検討してください。',
    'Scope 1・2の削減目標を設定してください。'
  ),
  zh: r(
    '进行能源审计以识别减排机会。',
    '考虑采购可再生电力。',
    '设定 Scope 1 和 2 减排目标。'
  ),
};

const SPECIFIC: Record<Exclude<Locale, 'en'>, Partial<Record<IndustryKey, Rec>>> = {
  ru: {
    logistics: r(
      'Расход топлива часто является основным источником. Оптимизация автопарка и маршрутов может значительно снизить выбросы.',
      'Переход на электротранспорт или биотопливо там, где это возможно.',
      'Отчитывайтесь о выбросах на тонно-километр для прозрачного сравнения.'
    ),
    manufacturing: r(
      'Повышение энергоэффективности и закупка возобновляемой электроэнергии могут существенно снизить выбросы.',
      'Оптимизируйте использование природного газа в котлах.',
      'Установите субучёт по производственным линиям.'
    ),
    banking: r(
      'Энергоэффективность офисов и зелёные закупки — ключевые возможности снижения.',
      'Достигните net-zero за счёт возобновляемой электроэнергии.',
      'Интегрируйте выбросы финансирования в климатическую стратегию.'
    ),
    hospitality: r(
      'Оптимизация HVAC и энергоэффективного оборудования снижает потребление электроэнергии.',
      'Оптимизируйте кухонное оборудование и водонагрев.',
      'Перейдите на возобновляемую электроэнергию для объектов.'
    ),
    oil_gas: r(
      'Обнаружение и устранение утечек метана критично для Scope 1.',
      'Сократите факелинг и повысьте эффективность сжигания.',
      'Публикуйте прозрачные показатели интенсивности выбросов.'
    ),
    technology: r(
      'Закупайте возобновляемую электроэнергию для дата-центров и офисов.',
      'Оптимизируйте охлаждение и умное управление зданиями.',
      'Установите научно обоснованные цели и раскрывайте данные.'
    ),
  },
  fr: {
    logistics: r(
      'La consommation de carburant est souvent la principale source. L\'optimisation de la flotte et des itinéraires peut réduire significativement les émissions.',
      'Électrifiez la flotte lorsque l\'infrastructure le permet.',
      'Déclarez les émissions par tonne-kilomètre.'
    ),
    manufacturing: r(
      'L\'efficacité énergétique et l\'électricité renouvelable peuvent réduire fortement les émissions.',
      'Optimisez l\'usage du gaz naturel dans les chaudières.',
      'Installez un sous-comptage par ligne de production.'
    ),
    banking: r(
      'L\'efficacité électrique des bureaux et les achats verts sont des leviers clés.',
      'Visez des opérations net-zero via l\'électricité renouvelable.',
      'Intégrez les émissions financées dans la stratégie climat.'
    ),
    hospitality: r(
      'L\'optimisation CVC et des équipements efficaces réduit la demande électrique.',
      'Optimisez les cuisines et l\'eau chaude.',
      'Passez à des contrats d\'électricité renouvelable.'
    ),
    oil_gas: r(
      'La détection et réparation des fuites de méthane est critique.',
      'Réduisez le torchage et améliorez l\'efficacité de combustion.',
      'Publiez des indicateurs d\'intensité transparents.'
    ),
    technology: r(
      'Approvisionnez-vous en électricité renouvelable pour data centers et bureaux.',
      'Optimisez le refroidissement et les bâtiments intelligents.',
      'Fixez des objectifs science-based.'
    ),
  },
  de: {
    logistics: r(
      'Kraftstoffverbrauch ist oft die größte Quelle. Flotten- und Routenoptimierung reduziert Emissionen deutlich.',
      'Elektrifizieren Sie die Flotte wo möglich.',
      'Berichten Sie Emissionen pro Tonne-km.'
    ),
    manufacturing: r(
      'Energieeffizienz und erneuerbarer Strom senken Emissionen erheblich.',
      'Optimieren Sie Erdgas in Kesseln.',
      'Sub-Metering nach Produktionslinie einführen.'
    ),
    banking: r(
      'Büro-Effizienz und grüne Beschaffung sind zentrale Hebel.',
      'Net-zero durch erneuerbaren Strom anstreben.',
      'Finanzierte Emissionen in die Klimastrategie einbeziehen.'
    ),
    hospitality: r(
      'HVAC-Optimierung und effiziente Geräte senken Strombedarf.',
      'Küchen- und Warmwasseroptimierung.',
      'Erneuerbare Stromverträge für Objekte.'
    ),
    oil_gas: r(
      'Methanleck-Erkennung und -Reparatur ist kritisch.',
      'Fackeln reduzieren, Verbrennungseffizienz steigern.',
      'Transparente Emissionsintensität veröffentlichen.'
    ),
    technology: r(
      'Erneuerbaren Strom für Rechenzentren und Büros beziehen.',
      'Kühlung und Smart Building optimieren.',
      'Science-based Targets setzen.'
    ),
  },
  es: {
    logistics: r(
      'El combustible suele ser la mayor fuente. Optimizar flota y rutas reduce emisiones significativamente.',
      'Electrifique la flota donde sea posible.',
      'Informe emisiones por tonelada-km.'
    ),
    manufacturing: r(
      'La eficiencia energética y electricidad renovable reducen emisiones sustancialmente.',
      'Optimice el gas natural en calderas.',
      'Instale submedición por línea de producción.'
    ),
    banking: r(
      'La eficiencia de oficinas y compras verdes son oportunidades clave.',
      'Logre net-zero con electricidad renovable.',
      'Integre emisiones financiadas en la estrategia climática.'
    ),
    hospitality: r(
      'La optimización HVAC y equipos eficientes reducen la electricidad.',
      'Optimice cocinas y agua caliente.',
      'Contratos de electricidad renovable.'
    ),
    oil_gas: r(
      'La detección y reparación de fugas de metano es crítica.',
      'Reduzca el quemado en antorcha.',
      'Publique métricas de intensidad transparentes.'
    ),
    technology: r(
      'Compre electricidad renovable para centros de datos y oficinas.',
      'Optimice refrigeración y edificios inteligentes.',
      'Establezca objetivos basados en la ciencia.'
    ),
  },
  pt: {
    logistics: r(
      'O combustível é frequentemente a maior fonte. Otimizar frota e rotas reduz emissões significativamente.',
      'Eletrifique a frota onde possível.',
      'Reporte emissões por tonelada-km.'
    ),
    manufacturing: r(
      'Eficiência energética e eletricidade renovável reduzem emissões.',
      'Otimize gás natural em caldeiras.',
      'Submedição por linha de produção.'
    ),
    banking: r(
      'Eficiência de escritórios e compras verdes são oportunidades-chave.',
      'Net-zero com eletricidade renovável.',
      'Integre emissões financiadas na estratégia climática.'
    ),
    hospitality: r(
      'Otimização HVAC e equipamentos eficientes reduzem eletricidade.',
      'Otimize cozinhas e água quente.',
      'Contratos de eletricidade renovável.'
    ),
    oil_gas: r(
      'Deteção e reparação de fugas de metano é crítica.',
      'Reduza flaring e melhore eficiência de combustão.',
      'Publique métricas de intensidade.'
    ),
    technology: r(
      'Adquira eletricidade renovável para data centers e escritórios.',
      'Otimize arrefecimento e edifícios inteligentes.',
      'Defina metas baseadas na ciência.'
    ),
  },
  it: {
    logistics: r(
      'Il carburante è spesso la fonte principale. Ottimizzare flotta e percorsi riduce le emissioni.',
      'Elettrificare la flotta dove possibile.',
      'Riportare emissioni per tonnellata-km.'
    ),
    manufacturing: r(
      'Efficienza energetica ed elettricità rinnovabile riducono le emissioni.',
      'Ottimizzare il gas naturale nelle caldaie.',
      'Sub-metering per linea di produzione.'
    ),
    banking: r(
      'Efficienza degli uffici e acquisti verdi sono leve chiave.',
      'Net-zero con elettricità rinnovabile.',
      'Integrare emissioni finanziate nella strategia climatica.'
    ),
    hospitality: r(
      'Ottimizzazione HVAC e apparecchi efficienti riducono l\'elettricità.',
      'Ottimizzare cucine e acqua calda.',
      'Contratti di elettricità rinnovabile.'
    ),
    oil_gas: r(
      'Rilevamento e riparazione fughe di metano è critico.',
      'Ridurre il flaring.',
      'Pubblicare metriche di intensità trasparenti.'
    ),
    technology: r(
      'Acquistare elettricità rinnovabile per data center e uffici.',
      'Ottimizzare raffreddamento e smart building.',
      'Obiettivi science-based.'
    ),
  },
  ja: {
    logistics: r(
      '燃料消費が最大の排出源であることが多い。車両とルートの最適化で大幅に削減できます。',
      '可能な場合は車両の電動化を検討してください。',
      'トンキロあたりの排出量を報告してください。'
    ),
    manufacturing: r(
      '省エネと再生可能電力で運用排出を大幅に削減できます。',
      'ボイラーのガス使用を最適化してください。',
      '生産ライン別のサブメータリングを導入してください。'
    ),
    banking: r(
      'オフィスの電力効率とグリーン調達が重要な削減手段です。',
      '再生可能電力でネットゼロを目指してください。',
      'ファイナンス排出を気候戦略に統合してください。'
    ),
    hospitality: r(
      'HVACと高効率機器の最適化で電力需要を削減できます。',
      '厨房設備と給湯の効率化を行ってください。',
      '再生可能電力契約への切り替えを検討してください。'
    ),
    oil_gas: r(
      'メタン漏れ検知・修復が Scope 1 削減に不可欠です。',
      'フレアリングを削減してください。',
      '透明な排出原単位を公開してください。'
    ),
    technology: r(
      'データセンターとオフィスに再生可能電力を調達してください。',
      '冷却とスマートビル制御を最適化してください。',
      'SBTを設定し開示してください。'
    ),
  },
  zh: {
    logistics: r(
      '燃料消耗通常是最大排放源。优化车队和路线可显著减排。',
      '在条件允许时推进车队电动化。',
      '按吨公里报告排放以便对标。'
    ),
    manufacturing: r(
      '能效提升和可再生电力可大幅降低运营排放。',
      '优化锅炉天然气使用。',
      '按生产线建立分项计量。'
    ),
    banking: r(
      '办公用电效率和绿色采购是重要减排途径。',
      '通过可再生电力实现净零运营。',
      '将融资排放纳入气候战略。'
    ),
    hospitality: r(
      '优化暖通空调和高效设备可降低电力需求。',
      '优化厨房设备与热水系统。',
      '切换至可再生电力合同。'
    ),
    oil_gas: r(
      '甲烷泄漏检测与修复对 Scope 1 至关重要。',
      '减少火炬燃烧并提高燃烧效率。',
      '公开透明的排放强度指标。'
    ),
    technology: r(
      '为数据中心和办公室采购可再生电力。',
      '优化冷却与智能楼宇控制。',
      '设定并披露科学碳目标。'
    ),
  },
};

function buildPack(locale: Exclude<Locale, 'en'>): typeof en.recommendations {
  const out = { ...en.recommendations };
  const specific = SPECIFIC[locale];
  const generic = GENERIC[locale];
  for (const key of INDUSTRY_KEYS) {
    out[key] = specific[key] ?? generic;
  }
  return out;
}

export const RECOMMENDATION_PACKS: Record<Locale, typeof en.recommendations> = {
  en: en.recommendations,
  ru: buildPack('ru'),
  fr: buildPack('fr'),
  de: buildPack('de'),
  es: buildPack('es'),
  pt: buildPack('pt'),
  it: buildPack('it'),
  ja: buildPack('ja'),
  zh: buildPack('zh'),
};
