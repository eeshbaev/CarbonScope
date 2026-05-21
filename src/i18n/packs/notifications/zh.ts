import type { TranslationKeys } from '../../locales/en';

export const zhNotifications: TranslationKeys['notifications'] = {
  section: '通知',
  master: '提醒与指导',
  masterHint: '基于您评估内容的本地提醒（数据不会离开您的设备）。',
  drafts: '未完成的评估',
  monthly: '月度数据录入',
  refresh: '数据更新提醒',
  periodEnd: '报告期即将结束',
  reportingCalendar: '报告日历',
  educational: '每周洞察（报告与气候）',
  educationalHint:
    '可选。每周一条简短的专业提示（仅在周日、周二或周四发送），涵盖标准、气候科学、历史与创新——不含推广内容。',
  reengagement: '回访提醒',
  initiatives: '倡议跟进',
  initiativeTitle: '查看减排倡议',
  initiativeBody: '您为 {company} 设定了行动。请检查进展。',
  permissionTitle: '用提醒保持报告进度',
  permissionBody:
    'CarbonScope 可就报告期、月度录入和未完成的评估发送专业指导与提醒。您可在设置中分别控制各类通知。',
  enable: '启用提醒',
  notNow: '暂不',
  draftTitle: '未完成的评估',
  draftBody: '您有 {company} 的评估尚未完成。请打开 CarbonScope 继续。',
  monthlyTitle: '月度数据录入',
  monthlyBody: '请为 {company} 添加 {month} 的数据{categories}。',
  monthlyCategoriesSuffix: '（{categories}）',
  refresh6Title: '该更新数据了',
  refresh6Body:
    '距您上次更新 {company} 已满 6 个月。请根据当前燃料与用电量重新计算 Scope 1 和 2 排放。',
  refresh12Title: '年度更新提醒',
  refresh12Body:
    '距您上次更新 {company} 已满 12 个月。请刷新评估以确保报告准确。',
  periodEndTitle: '报告期即将结束',
  periodEndBody:
    '{company}：您的 {period} 报告窗口将在 7 天内结束。请审阅或完成录入。',
  reportingCalendarTitle: '报告截止临近',
  reportingCalendarBody:
    '{company}：{period} 报告两周后截止。请完成范围 1 和 2 并导出证据包。',
  firstSuccessTitle: '排放报告已就绪',
  firstSuccessBody:
    '打开 CarbonScope 查看结果并导出 PDF。提示：更新国家或用电量后，Scope 2 会发生变化。',
  educationalTitle: '碳洞察',
  insightOfWeekTitle: '本周洞察',
  insightTap: '点击查看',
  reengagementTitle: '更新碳评估',
  reengagementBody:
    '仍在跟踪 {company}？请更新本期的燃料与电力数据，以获得准确的 Scope 1 和 2 概况。',
  tips: {
    scope1Vs2:
      'Scope 1 涵盖直接燃烧的燃料（柴油、汽油、天然气）。Scope 2 涵盖外购电力——二者均为 GHG Protocol 盘查的核心。',
    utilityBills:
      '水电燃料账单是 kWh、升和 m³ 最可靠的来源。建议按报告期分别归档。',
    gridFactor:
      'Scope 2 排放取决于所在国家的电网排放因子。选择国家后，CarbonScope 会自动应用相应因子。',
    monthlyTracking:
      '对于 6 个月或年度报告期，按月录入有助于发现季节性峰值——对能源审计和 ESG 披露很有价值。',
    scope1Fuels:
      '车队柴油和现场天然气往往占 Scope 1 的主要部分。建议从支出最大的燃料类别开始。',
    scope2Electricity:
      '办公与现场用电属于 Scope 2。请使用账单或分表的年用电量（kWh）；也可输入 MWh，系统会自动换算。',
    reportingPeriod:
      '将报告起始日与财年或可持续发展报告年度对齐，有助于与其他披露保持一致。',
    saveProgress:
      '若需稍后收集数据，可在 Scope 1 或 2 使用“保存进度”——在计算结果前，输入会保留在本设备上。',
    whyReportingMatters:
      '测量 Scope 1 和 2 有助于企业了解运营气候影响、设定基准，并向投资者、银行和客户作出可信回应。',
    whyReportingSME:
      '中小企业常从 Scope 1 和 2 起步，因为数据就近可得（燃料与电费账单）。清晰的基准线有助于成长与投标要求。',
    whyReportingEnterprise:
      '大型企业跨站点采用一致的 Scope 1 和 2 方法，使合并、目标与外部报告（CDP、年报）可逐年比较。',
    ghgProtocol:
      'GHG Protocol 是全球使用最广泛的企业温室气体盘查标准，定义 Scope 1、2、3 及燃料与电力的核算方式。',
    iso14064:
      'ISO 14064-1 指导组织层面温室气体盘查的量化与报告，与 GHG Protocol 互补，并被多国制度引用。',
    csrdEsrs:
      '在欧盟，CSRD 与 ESRS E1 要求大型及上市公司逐步提高保证水平披露排放。通常从 Scope 1 和 2 开始。',
    tcfdIfrs:
      'TCFD 与 ISSB（IFRS S2）鼓励披露气候风险与排放。可靠的 Scope 1 和 2 数据支撑转型规划与财务申报。',
    parisAgreement:
      '《巴黎协定》（2015 年）旨在将升温控制在远低于 2°C。国家目标转化为政策——企业通过可衡量的运营减排作出贡献。',
    kyotoHistory:
      '《京都议定书》（约 1995–2012 年时期）为许多工业化国家引入约束性目标，并推动国家排放核算标准化。',
    co2Science:
      'CO₂ 等温室气体在大气中滞留热量。人类活动——尤其是化石燃料燃烧——已将大气 CO₂ 推高至远高于工业化前水平。',
    climateBusinessRisk:
      '气候变化的物理与转型风险可能影响供应链、能源成本和监管。排放数据是审慎商业规划的一项输入。',
    companyActions:
      '企业可通过能效、燃料转换、可再生电力、车队升级及与设施团队协作降低 Scope 1 和 2——测量可显示成效。',
    energyEfficiency:
      'LED、暖通优化和电机升级常能以较短回收期降低电力（Scope 2）。跟踪前后 kWh 以观察对 tCO₂e 的影响。',
    renewableElectricity:
      '绿色电力套餐、屋顶光伏和购电协议（PPA）在可合理主张基于市场的减排时可降低 Scope 2——请保留证书。',
    fleetAndHeat:
      '轻型车队电动化、经认证的生物燃料及锅炉效率提升针对 Scope 1。建议从全年运行的车辆与供暖入手。',
    industrialTech:
      '工艺电气化、余热回收和数字化能源管理在工业中日益普及，长期可降低成本与 Scope 1、2。',
    dataQuality:
      '高质量盘查应记录来源（账单、表计）、假设与期间。评估中的备注有助于审计及日后查阅。',
    scope3Note:
      'Scope 3 涵盖价值链排放（供应商、差旅、产品）。Scope 1 和 2 盘查是基础——多数框架优先要求二者。',
    assurance:
      '第三方对温室气体数据的鉴证日益受到期待。一致的方法与留存的发票可使鉴证更顺畅。',
    sectorManufacturing:
      '制造业的 Scope 1 常来自天然气与柴油，Scope 2 来自生产线。对关键工艺分表可提高准确性。',
    sectorOffice:
      '以办公为主的企业通常 Scope 2（电力）占主导，Scope 1（备用发电机、公务车）较小。国家选择决定电网因子。',
    scienceMethane:
      '甲烷和氧化亚氮也会加剧变暖，在 20 年尺度上单位效应常强于 CO₂。燃料与天然气报告反映部分直接温室气体足迹。',
    keelingCurve:
      '查尔斯·基林在冒纳罗阿的观测（自 1958 年）显示 CO₂ 持续上升——是现代气候科学最清晰的全球记录之一。',
    ipccScience:
      'IPCC 为决策者综合同行评议科学，其评估报告影响《巴黎协定》及各国气候计划。',
    industrialCo2Rise:
      '自工业革命以来，化石燃料使用使 CO₂ 排放成倍增长。能源与工业仍是 Scope 1 和 2 报告的核心。',
    euEts:
      '欧盟排放交易体系（自 2005 年）对电力与工业 CO₂ 设上限——许多地区将其作为碳定价与披露的参考模式。',
    nordicHeating:
      '北欧国家率先发展区域供热与可再生能源，降低建筑供热排放——与比较各国电网因子相关。',
    chinaRenewables:
      '中国引领全球太阳能与风电装机部署。电网因子仍反映整体发电结构——区位对 Scope 2 很重要。',
    greenHydrogen:
      '绿氢（可再生电力电解）在钢铁、化工和重载运输中试点——未来可降低工业 Scope 1。',
    steelInnovation:
      '直接还原铁与电弧炉可减少钢铁对煤炭的依赖。欧洲与亚洲的试点工厂受到关注。',
    carbonCapture:
      '碳捕集（利用或封存）已在部分水泥与能源站点部署。它不能替代能效，但可应对难减排的工艺排放。',
    brazilBiofuels:
      '巴西乙醇车队计划数十年间降低了对汽油的依赖——是国家盘查中交通燃料转换的范例。',
    africaSolar:
      '分布式光伏与微电网在非洲扩大覆盖，减少柴油发电机使用——是站点降低 Scope 1 的务实路径。',
    copSummits:
      '联合国气候大会（COP）协调全球谈判。企业的 Scope 1 和 2 数据支撑国家承诺与供应链预期。',
  },
};
