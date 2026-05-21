import type { DeepPartial } from '../buildLocale';
import type { TranslationKeys } from '../locales/en';

/** Translated library articles (non-English). Merges over en.ts. */
export const LEARN_LIBRARY_PACKS: Record<string, DeepPartial<TranslationKeys>> = {
  ru: {
    learnMore: {
      articles: {
        iso14064: {
          title: 'ISO 14064-1',
          body:
            'ISO 14064-1 задаёт принципы количественной оценки и отчётности по парниковым газам на уровне организации. Она дополняет GHG Protocol и часто упоминается в тендерах, банковских анкетах и национальных схемах.\n\nДля МСП обычно достаточно согласованного инвентаря Scope 1 и 2 с документированными источниками данных. CarbonScope даёт оценочную базу — не заменяет верификацию по ISO.',
        },
        scope2Methods: {
          title: 'Scope 2: по месту потребления и по рынку',
          body:
            'По месту потребления: выбросы от электроэнергии считаются по среднему коэффициенту сети страны (кг CO₂э/кВт·ч). Именно так работает CarbonScope при выборе страны.\n\nПо методу рынка: учитываются договоры на «зелёную» электроэнергию, REC/GO и PPA — при наличии подтверждённых сертификатов. Для этого метода нужны отдельные инструменты и документы; в приложении используется подход по месту потребления согласно GHG Protocol.',
        },
        dataEvidence: {
          title: 'Доказательная база для отчёта',
          body:
            'Храните по каждому отчётному периоду:\n• счета за электроэнергию (кВт·ч или МВт·ч);\n• счета и карты на дизель, бензин, газ (литры, м³);\n• даты периода и границы организации;\n• допущения и заметки в оценке.\n\nPDF из CarbonScope фиксирует коэффициенты и версию набора данных. Для assurance нужны первичные документы и согласованная методология.',
        },
        gridFactors: {
          title: 'Сетевые коэффициенты и настройки',
          body:
            'Scope 2 в CarbonScope использует публичные средние коэффициенты по стране (IEA, eGRID, DEFRA и др.). В отчёте и в Настройках указаны версия набора и справочный год.\n\nВ Настройках → Коэффициенты выбросов можно задать свой кг CO₂э/кВт·ч для любой страны, если у вас контрактный или региональный фактор. Сброс возвращает значение по умолчанию.',
        },
        firstAssessment: {
          title: 'Первая оценка: пошагово',
          body:
            '1. Создайте компанию: название, страна, отрасль, период и дата начала.\n2. Scope 1: дизель, бензин, газ — итог за период или помесячно.\n3. Scope 2: электроэнергия (кВт·ч с счетов).\n4. Рассчитайте результаты — сохранится финальный отчёт.\n5. Экспортируйте PDF, при необходимости выберите инициативы по снижению.\n\nДля следующего периода используйте «Новый период (копировать структуру)» — данные обнулятся, профиль компании сохранится.',
        },
      },
    },
  },
  fr: {
    learnMore: {
      articles: {
        iso14064: {
          title: 'ISO 14064-1',
          body:
            'La norme ISO 14064-1 fixe les principes de quantification et de reporting des GES au niveau de l\'organisation. Elle complète le GHG Protocol et est souvent citée dans les appels d\'offres et les questionnaires bancaires.\n\nPour les PME, un inventaire Scope 1 et 2 cohérent avec des sources documentées suffit souvent. CarbonScope fournit une base indicative — pas un substitut à la vérification ISO.',
        },
        scope2Methods: {
          title: 'Scope 2 : location-based et market-based',
          body:
            'Location-based : les émissions d\'électricité utilisent le facteur moyen du réseau du pays (kg CO₂e/kWh). C\'est l\'approche de CarbonScope.\n\nMarket-based : tient compte des contrats verts, REC/GO et PPA avec certificats crédibles. CarbonScope applique le location-based selon le GHG Protocol.',
        },
        dataEvidence: {
          title: 'Preuves pour le reporting',
          body:
            'Conservez par période :\n• factures d\'électricité (kWh ou MWh) ;\n• factures et cartes carburant (litres, m³) ;\n• dates et périmètre ;\n• hypothèses dans les notes.\n\nLe PDF CarbonScope documente facteurs et version du jeu de données. L\'assurance exige les pièces sources.',
        },
        gridFactors: {
          title: 'Facteurs réseau et réglages',
          body:
            'Scope 2 utilise des moyennes publiques par pays. Le rapport et les Paramètres indiquent la version et l\'année de référence.\n\nDans Paramètres → Facteurs d\'émission, vous pouvez saisir un kg CO₂e/kWh personnalisé par pays. Réinitialiser restaure la valeur par défaut.',
        },
        firstAssessment: {
          title: 'Première évaluation : étapes',
          body:
            '1. Créez l\'entreprise (pays, secteur, période).\n2. Scope 1 : carburants.\n3. Scope 2 : électricité des factures.\n4. Calculez les résultats.\n5. Exportez le PDF ; initiatives optionnelles.\n\nPour la période suivante : « Nouvelle période (copier la structure) ».',
        },
      },
    },
  },
  de: {
    learnMore: {
      articles: {
        iso14064: {
          title: 'ISO 14064-1',
          body:
            'ISO 14064-1 legt Grundsätze für die Quantifizierung und Berichterstattung von THG auf Organisationsebene fest. Sie ergänzt das GHG Protocol und wird in Ausschreibungen und Bankfragebögen genannt.\n\nFür KMU reicht oft ein konsistenter Scope-1- und Scope-2-Inventar mit Belegen. CarbonScope liefert Schätzwerte — kein Ersatz für ISO-Prüfung.',
        },
        scope2Methods: {
          title: 'Scope 2: location-based und market-based',
          body:
            'Location-based: Stromemissionen mit dem Netzstromfaktor des Landes (kg CO₂e/kWh). So arbeitet CarbonScope.\n\nMarket-based: berücksichtigt Ökostromverträge, REC/GO und PPA mit Nachweisen. CarbonScope nutzt location-based nach GHG Protocol.',
        },
        dataEvidence: {
          title: 'Nachweise für den Bericht',
          body:
            'Pro Berichtszeitraum aufbewahren:\n• Stromrechnungen (kWh/MWh);\n• Kraftstoff- und Gasbelege;\n• Zeitraum und Organisationsgrenze;\n• Annahmen in Notizen.\n\nDas PDF dokumentiert Faktoren und Datensatzversion. Assurance braucht Originalbelege.',
        },
        gridFactors: {
          title: 'Netzfaktoren und Einstellungen',
          body:
            'Scope 2 nutzt öffentliche Länderdurchschnitte. Bericht und Einstellungen zeigen Version und Referenzjahr.\n\nUnter Einstellungen → Emissionsfaktoren können Sie kg CO₂e/kWh pro Land anpassen. Zurücksetzen stellt den Standard wieder her.',
        },
        firstAssessment: {
          title: 'Erste Bewertung: Ablauf',
          body:
            '1. Unternehmen anlegen.\n2. Scope 1: Kraftstoffe.\n3. Scope 2: Strom aus Rechnungen.\n4. Ergebnisse berechnen.\n5. PDF exportieren.\n\nNächste Periode: «Neue Periode (Struktur kopieren)».',
        },
      },
    },
  },
  es: {
    learnMore: {
      articles: {
        iso14064: {
          title: 'ISO 14064-1',
          body:
            'La ISO 14064-1 establece principios para cuantificar e informar GEI a nivel de organización. Complementa el GHG Protocol y aparece en licitaciones y cuestionarios bancarios.\n\nPara pymes suele bastar un inventario coherente de Scope 1 y 2 con evidencia documental. CarbonScope ofrece estimaciones indicativas, no sustituye la verificación ISO.',
        },
        scope2Methods: {
          title: 'Scope 2: location-based y market-based',
          body:
            'Location-based: emisiones de electricidad con el factor medio de red del país (kg CO₂e/kWh). Es el enfoque de CarbonScope.\n\nMarket-based: considera tarifas verdes, REC/GO y PPA con certificados creíbles. CarbonScope aplica location-based según GHG Protocol.',
        },
        dataEvidence: {
          title: 'Evidencia para el informe',
          body:
            'Guarde por período:\n• facturas eléctricas (kWh/MWh);\n• combustible y gas (litros, m³);\n• fechas y perímetro;\n• supuestos en notas.\n\nEl PDF documenta factores y versión del conjunto de datos.',
        },
        gridFactors: {
          title: 'Factores de red y ajustes',
          body:
            'Scope 2 usa promedios públicos por país. En Ajustes → Factores de emisión puede editar kg CO₂e/kWh por país o restablecer el valor predeterminado.',
        },
        firstAssessment: {
          title: 'Primera evaluación: pasos',
          body:
            '1. Crear empresa.\n2. Scope 1: combustibles.\n3. Scope 2: electricidad de facturas.\n4. Calcular resultados.\n5. Exportar PDF.\n\nSiguiente período: «Nuevo período (copiar estructura)».',
        },
      },
    },
  },
  pt: {
    learnMore: {
      articles: {
        iso14064: {
          title: 'ISO 14064-1',
          body:
            'A ISO 14064-1 define princípios para quantificar e reportar GEE ao nível da organização. Complementa o GHG Protocol e é citada em concursos e questionários bancários.\n\nPara PMEs, um inventário coerente de Scope 1 e 2 com evidências costuma bastar. O CarbonScope fornece estimativas indicativas.',
        },
        scope2Methods: {
          title: 'Scope 2: location-based e market-based',
          body:
            'Location-based: emissões com o fator médio da rede do país. É a abordagem do CarbonScope.\n\nMarket-based: contratos verdes, REC/GO e PPA com certificados. CarbonScope usa location-based.',
        },
        dataEvidence: {
          title: 'Evidência para o relatório',
          body:
            'Guarde por período: faturas de eletricidade, combustível e gás, datas, perímetro e notas com suposições. O PDF documenta fatores e versão do conjunto.',
        },
        gridFactors: {
          title: 'Fatores de rede e definições',
          body:
            'Scope 2 usa médias públicas por país. Em Definições → Fatores de emissão pode editar kg CO₂e/kWh ou repor o predefinido.',
        },
        firstAssessment: {
          title: 'Primeira avaliação: passos',
          body:
            '1. Criar empresa.\n2. Scope 1: combustíveis.\n3. Scope 2: eletricidade.\n4. Calcular resultados.\n5. Exportar PDF. Próximo período: «Novo período (copiar estrutura)».',
        },
      },
    },
  },
  it: {
    learnMore: {
      articles: {
        iso14064: {
          title: 'ISO 14064-1',
          body:
            'La ISO 14064-1 definisce i principi per quantificare e rendicontare i GHG a livello di organizzazione. Integra il GHG Protocol ed è citata in gare e questionari bancari.\n\nPer le PMI spesso basta un inventario Scope 1 e 2 coerente con evidenze documentali.',
        },
        scope2Methods: {
          title: 'Scope 2: location-based e market-based',
          body:
            'Location-based: fattore medio di rete del paese (kg CO₂e/kWh), come in CarbonScope.\n\nMarket-based: tariffe verdi, REC/GO e PPA con certificati credibili.',
        },
        dataEvidence: {
          title: 'Evidenze per il report',
          body:
            'Conservare per periodo: bollette elettriche, carburante e gas, date, perimetro e note. Il PDF documenta fattori e versione del dataset.',
        },
        gridFactors: {
          title: 'Fattori di rete e impostazioni',
          body:
            'In Impostazioni → Fattori di emissione è possibile modificare kg CO₂e/kWh per paese o ripristinare il predefinito.',
        },
        firstAssessment: {
          title: 'Prima valutazione: passi',
          body:
            '1. Creare azienda.\n2. Scope 1: combustibili.\n3. Scope 2: elettricità.\n4. Calcolare risultati.\n5. Esportare PDF. Periodo successivo: «Nuovo periodo (copia struttura)».',
        },
      },
    },
  },
  ja: {
    learnMore: {
      articles: {
        iso14064: {
          title: 'ISO 14064-1',
          body:
            'ISO 14064-1は組織レベルのGHG算定・報告の原則を定めます。GHG Protocolを補完し、入札や銀行アンケートで引用されます。\n\n中小企業はScope 1・2の一貫したインベントリと証憑が多くの場合十分です。CarbonScopeは参考値であり、ISO検証の代替ではありません。',
        },
        scope2Methods: {
          title: 'Scope 2：ロケーション／マーケット',
          body:
            'ロケーションベース：国の平均系統係数（kg CO₂e/kWh）を使用。CarbonScopeの方式です。\n\nマーケットベース：再エネ契約・REC/GO・PPAと証書。CarbonScopeはGHG Protocolに沿ったロケーションベースです。',
        },
        dataEvidence: {
          title: '報告の証拠',
          body:
            '期間ごとに：電力請求書（kWh/MWh）、燃料・ガス、期間・境界、メモの前提。PDFに係数とデータセット版を記録。',
        },
        gridFactors: {
          title: '系統係数と設定',
          body:
            '設定→排出係数で国別kg CO₂e/kWhを上書き可能。リセットで既定値に戻します。',
        },
        firstAssessment: {
          title: '初回評価の手順',
          body:
            '1.企業作成 2.Scope 1燃料 3.Scope 2電力 4.結果計算 5.PDF出力。次期間は「新しい期間（構造をコピー）」。',
        },
      },
    },
  },
  zh: {
    learnMore: {
      articles: {
        iso14064: {
          title: 'ISO 14064-1',
          body:
            'ISO 14064-1 规定组织层面温室气体量化与报告原则，补充 GHG Protocol，常见于招标和银行问卷。\n\n中小企业通常只需一致、有凭证的 Scope 1 和 2 清单。CarbonScope 提供参考估算，不能替代 ISO 核查。',
        },
        scope2Methods: {
          title: 'Scope 2：基于位置与市场',
          body:
            '基于位置：使用该国电网平均因子（kg CO₂e/kWh），即 CarbonScope 方式。\n\n基于市场：考虑绿电合同、REC/GO 和 PPA 及可信证书。本应用采用 GHG Protocol 的位置法。',
        },
        dataEvidence: {
          title: '报告证据清单',
          body:
            '每报告期保留：电费账单（kWh/MWh）、燃料与燃气账单、期间与组织边界、备注中的假设。PDF 记录因子与数据集版本。',
        },
        gridFactors: {
          title: '电网因子与设置',
          body:
            '在设置→排放因子中可按国家编辑 kg CO₂e/kWh，或恢复默认值。',
        },
        firstAssessment: {
          title: '首次评估步骤',
          body:
            '1. 创建企业 2. Scope 1 燃料 3. Scope 2 电力 4. 计算结果 5. 导出 PDF。下期使用「新期间（复制结构）」。',
        },
      },
    },
  },
};
