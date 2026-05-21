import type { TranslationKeys } from '../../locales/en';

export const jaNotifications: TranslationKeys['notifications'] = {
  section: '通知',
  master: 'リマインダーとガイダンス',
  masterHint:
    '評価内容に基づくローカルリマインダーです（データは端末外に送信されません）。',
  drafts: '未完了の評価',
  monthly: '月次データ入力',
  refresh: 'データ更新リマインダー',
  periodEnd: '報告期間の終了',
  reportingCalendar: '報告カレンダー',
  educational: '週次インサイト（報告・気候）',
  educationalHint:
    '任意です。週に1回、短い専門的なメモをお届けします（配信は日・火・木のみ）。標準、気候科学、歴史、イノベーションに関する内容で、宣伝はありません。',
  reengagement: '再開リマインダー',
  initiatives: 'イニシアチブフォロー',
  initiativeTitle: '削減イニシアチブを確認',
  initiativeBody: '{company} のアクションを設定しました。進捗を確認してください。',
  permissionTitle: 'リマインダーで報告を継続',
  permissionBody:
    'CarbonScopeは、報告期間、月次入力、未完了の評価について、専門的なガイダンスとリマインダーを送信できます。各カテゴリは設定で個別に制御できます。',
  enable: 'リマインダーを有効にする',
  notNow: '後で',
  draftTitle: '未完了の評価',
  draftBody: '{company}の評価が未完了です。CarbonScopeを開いて続行してください。',
  monthlyTitle: '月次データ入力',
  monthlyBody: '{company}の{month}分のデータを追加してください{categories}。',
  monthlyCategoriesSuffix: '（{categories}）',
  refresh6Title: 'データの更新時期です',
  refresh6Body:
    '{company}のデータを更新してから6か月が経過しました。最新の燃料・電力使用量でScope 1・2を再計算してください。',
  refresh12Title: '年次更新リマインダー',
  refresh12Body:
    '{company}のデータを更新してから12か月が経過しました。正確な報告のため、評価を更新してください。',
  periodEndTitle: '報告期間がまもなく終了',
  periodEndBody:
    '{company}：{period}の報告期間はあと7日で終了します。入力内容を確認または確定してください。',
  reportingCalendarTitle: '報告期限が近づいています',
  reportingCalendarBody:
    '{company}：{period} の報告が2週間後に終了します。Scope 1・2を完了し、証拠パックをエクスポートしてください。',
  firstSuccessTitle: '排出量レポートの準備完了',
  firstSuccessBody:
    'CarbonScopeを開いて結果を確認し、PDFをエクスポートできます。ヒント：国や電力使用量を更新するとScope 2が変わります。',
  educationalTitle: 'カーボンインサイト',
  insightOfWeekTitle: '今週のインサイト',
  insightTap: 'タップして読む',
  reengagementTitle: 'カーボン評価を更新',
  reengagementBody:
    '{company}の追跡を続けていますか？今期の燃料・電力を更新し、Scope 1・2の状況を正確に把握しましょう。',
  tips: {
    scope1Vs2:
      'Scope 1は直接燃焼する燃料（ディーゼル、ガソリン、天然ガス）を対象とします。Scope 2は購入電力です。いずれもGHG Protocolインベントリの中核です。',
    utilityBills:
      '光熱費・燃料の請求書は、kWh、リットル、m³の最も信頼できる情報源です。報告期間ごとにフォルダを分けて保管しましょう。',
    gridFactor:
      'Scope 2の排出量は国の電力係数に依存します。CarbonScopeは国を選択すると係数を自動適用します。',
    monthlyTracking:
      '6か月または年次の期間では、月次入力により季節的なピークを把握できます。エネルギー監査やESG開示に有用です。',
    scope1Fuels:
      '車両用ディーゼルや敷地内ガスはScope 1の主要因になりがちです。支出規模の大きい燃料カテゴリから着手しましょう。',
    scope2Electricity:
      'オフィス・拠点の電力はScope 2です。請求書やサブメーターから年間kWhを使用してください。MWh入力も可能で、自動換算されます。',
    reportingPeriod:
      '報告開始日を会計年度またはサステナビリティ報告年度に合わせると、他の開示内容と整合しやすくなります。',
    saveProgress:
      'データ収集に時間がかかる場合はScope 1・2で「進捗を保存」を使用してください。結果を計算するまで、入力はこの端末に保持されます。',
    whyReportingMatters:
      'Scope 1・2の測定は、事業の気候影響の把握、ベースライン設定、投資家・金融機関・顧客への信頼ある対応に役立ちます。',
    whyReportingSME:
      '中小企業は燃料・電力の請求書など手元のデータからScope 1・2で始めることが多く、明確なベースラインは成長や入札要件を支えます。',
    whyReportingEnterprise:
      '大企業は拠点横断で一貫したScope 1・2手法を用い、統合・目標・外部報告（CDP、年次報告書）の年次比較を可能にします。',
    ghgProtocol:
      'GHG Protocolは企業インベントリで最も広く使われる国際標準です。Scope 1・2・3と燃料・電力の算定方法を定義しています。',
    iso14064:
      'ISO 14064-1は組織レベルのGHGインベントリの定量化・報告を示します。GHG Protocolを補完し、多くの国の制度で参照されます。',
    csrdEsrs:
      'EUではCSRDとESRS E1により、大企業・上場企業は保証水準を高めながら排出を開示します。Scope 1・2が通常の出発点です。',
    tcfdIfrs:
      'TCFDおよびISSB（IFRS S2）は気候リスクと排出の開示を促します。信頼できるScope 1・2データは移行計画と財務報告を支えます。',
    parisAgreement:
      'パリ協定（2015年）は気温上昇を2℃未満に抑えることを目指します。各国目標は政策に反映され、企業は自社事業での削減に貢献します。',
    kyotoHistory:
      '京都議定書（1995–2012年頃の時代）は多くの先進国に拘束目標を導入し、国別排出算定の標準化を進めました。',
    co2Science:
      'CO₂などの温室効果ガスは大気中で熱を閉じ込めます。化石燃料燃焼などの人間活動により、大気中CO₂は産業革命前を大きく上回っています。',
    climateBusinessRisk:
      '気候変動の物理・移行リスクはサプライチェーン、エネルギーコスト、規制に影響します。排出データは事業計画の一要素です。',
    companyActions:
      '効率化、燃料転換、再エネ電力、車両更新、施設チームとの連携でScope 1・2を削減できます。測定が効果を示します。',
    energyEfficiency:
      'LED、空調最適化、モーター更新はScope 2（電力）を短期回収で削減しやすいことが多いです。前後のkWhを追跡し、tCO₂eへの影響を確認しましょう。',
    renewableElectricity:
      '再エネ電力プラン、敷地内太陽光、PPAは、市場ベース削減を正当に主張できる場合にScope 2を下げます。証書類は保管してください。',
    fleetAndHeat:
      '軽量車両の電動化、認証バイオ燃料、ボイラー効率改善はScope 1に効きます。通年稼働の車両・暖房から着手しましょう。',
    industrialTech:
      'プロセス電化、廃熱回収、デジタルエネルギー管理は産業で広がり、コストとScope 1・2を長期的に削減します。',
    dataQuality:
      '質の高いインベントリは情報源（請求書、メーター）、前提、期間を記録します。評価内のメモは監査と将来の自分に役立ちます。',
    scope3Note:
      'Scope 3はバリューチェーン（調達、出張、製品）の排出です。Scope 1・2インベントリが基盤であり、多くの枠組みはまずこれを求めます。',
    assurance:
      'GHGデータの第三者検証はますます期待されています。一貫した手法と請求書の保管は、必要時の保証を円滑にします。',
    sectorManufacturing:
      '製造業ではガス・ディーゼルによるScope 1と生産ラインによるScope 2が高くなりがちです。主要プロセスのサブメーターで精度が上がります。',
    sectorOffice:
      'オフィス中心の企業はScope 2（電力）が主でScope 1（非常用発電機、社用車）は小さめです。国選択が電力係数を決めます。',
    scienceMethane:
      'メタンや亜酸化窒素も気候を温暖化させ、20年スケールでは単位あたりCO₂より強いことがあります。燃料・ガス報告は直接GHGフットプリントの一部を捉えます。',
    keelingCurve:
      'チャールズ・キーリングのマウナロア観測（1958年～）はCO₂の安定上昇を示し、現代気候科学の基盤となる記録の一つです。',
    ipccScience:
      'IPCCは査読付き科学を政策立案者向けに統合します。評価報告書はパリ協定や各国の気候計画に影響します。',
    industrialCo2Rise:
      '産業革命以降の化石燃料利用でCO₂排出は急増しました。今日もエネルギー・産業はScope 1・2報告の中心です。',
    euEts:
      'EU排出量取引制度（2005年～）は発電・産業のCO₂に上限を設け、炭素価格と開示のモデルとして各地域で参照されています。',
    nordicHeating:
      '北欧諸国は地域暖房と再エネを先駆的に導入し、建物熱の排出を削減しました。国別電力係数の比較に関連します。',
    chinaRenewables:
      '中国は太陽光・風力の導入容量で世界をリードします。係数は発電ミックス全体を反映するため、Scope 2では立地が重要です。',
    greenHydrogen:
      'グリーン水素（再エネ電解）は鉄鋼・化学・重輸送で試験導入中です。将来の産業Scope 1削減につながります。',
    steelInnovation:
      '直接還元鉄や電気アーク炉は石炭依存の削減に寄与します。欧州・アジアの実証プラントが追跡されています。',
    carbonCapture:
      '炭素回収（利用・貯留）は一部のセメント・エネルギー拠点で導入されています。効率化の代替ではなく、削減困難なプロセス排出への手段です。',
    brazilBiofuels:
      'ブラジルのエタノール車プログラムは数十年かけてガソリン依存を下げました。国別インベントリにおける輸送燃料転換の事例です。',
    africaSolar:
      '分散型太陽光とミニグリッドはアフリカで普及し、ディーゼル発電機の使用を減らします。拠点のScope 1削減の実践的経路です。',
    copSummits:
      '国連気候変動会議（COP）は国際交渉を調整します。企業のScope 1・2データは国の公約とサプライチェーンの期待を支えます。',
  },
};
