import type { HintCategory, HintSet } from '../types';

export const zhHints: Record<HintCategory, HintSet> = {
  other: {
    diesel: '查看车队柴油发票、备用发电机收据、承包商燃料报告及供应商年度汇总。',
    petrol: '查看公司车辆加油卡、里程报销报告和加油站车队对账单。',
    naturalGas: '查看天然气账单（如需将立方米换算为千瓦时）、锅炉/供暖发票及供应商年度用量。',
    electricity: '收集年度电费账单（千瓦时）、各楼宇分表读数及房东分摊电费。',
  },
  office: {
    diesel: '查看办公室/数据中心备用发电机、物业车辆及现场设备用柴油发票与记录。',
    petrol: '查看公司车队、燃油报销和汽油卡对账单。',
    naturalGas: '查看办公室供暖、食堂及暖通空调年度燃气账单（按地点）。',
    electricity: '查看办公室电费、托管/数据中心千瓦时报告及机房分表。',
  },
  manufacturing: {
    diesel: '查看叉车、装载机、发电机及移动设备 — 柴油供应商年度汇总与内部记录。',
    petrol: '查看厂区车辆、安保车及轻型商用车队管理报告。',
    naturalGas: '查看工艺用热、锅炉、干燥设备 — 燃气账单年度消耗（千瓦时或立方米）。',
    electricity: '查看生产线电机、空压机、照明及空调 — 厂区总表年度千瓦时或能源管理系统。',
  },
  transport: {
    diesel: '查看重型卡车、配送车及场站设备 — 燃油卡和散装柴油发票。',
    petrol: '查看轻型商用车及公司用车 — 油卡与行车记录。',
    naturalGas: '查看仓库供暖及CNG车队（如有）燃气账单。',
    electricity: '查看场站照明、电动叉车充电及办公室电费（各站点汇总）。',
  },
  aviation: {
    diesel: '查看地面支持设备、机场车辆及发电机 — 机场运营燃料日志。',
    petrol: '查看机场地面车队燃料记录。',
    naturalGas: '查看航站楼供暖及厨房燃气账单。',
    electricity: '查看航站楼、机库及地面充电 — 机场或租户电费账户。',
  },
  maritime: {
    diesel: '查看港口设备、拖轮及组织边界内柴油 — 加油单与港口燃料日志。',
    petrol: '查看港口车队加油卡记录。',
    naturalGas: '查看岸基供暖及LNG相关设施燃气账单。',
    electricity: '查看岸电、岸桥及码头建筑电费。',
  },
  oil_gas: {
    diesel: '查看钻机、现场发电机、压缩机及车队 — 作业燃料库存与供应商汇总。',
    petrol: '查看现场轻型车队作业报告。',
    naturalGas: '查看工艺用气及设施供暖 — 计量与结算数据。',
    electricity: '查看泵、压缩机及现场办公室 — 年度电力结算。',
  },
  mining: {
    diesel: '查看矿用卡车、挖掘机、钻机及发电机 — 矿山燃料供应商报告。',
    petrol: '查看矿区轻型车队油卡年度数据。',
    naturalGas: '查看选矿及供暖年度燃气消耗。',
    electricity: '查看输送、通风、加工及营地 — 主表年度千瓦时。',
  },
  hospitality: {
    diesel: '查看备用发电机、厨房用油及酒店穿梭车燃料发票。',
    petrol: '查看酒店班车及服务车辆 — 车队或报销记录。',
    naturalGas: '查看厨房、洗衣及热水燃气账单（通常用量较大）。',
    electricity: '查看客房空调、厨房、泳池及电梯 — 酒店电费（常为最大Scope 2来源）。',
  },
  retail: {
    diesel: '查看配送卡车、发电机及仓库设备 — 物流与门店燃料记录。',
    petrol: '查看门店车队及配送面包车油卡。',
    naturalGas: '查看门店供暖及店内烘焙燃气 — 分门店或全国账户。',
    electricity: '查看照明、冷藏展示柜（食品零售重要）及空调 — 各门店电费。',
  },
  healthcare: {
    diesel: '查看应急发电机及自有救护车燃料采购记录。',
    petrol: '查看行政及转运车辆车队管理数据。',
    naturalGas: '查看中央锅炉、灭菌及厨房 — 医院年度燃气消耗。',
    electricity: '查看医疗设备及全天候空调 — 医院主电表（通常为Scope 2主导）。',
  },
  construction: {
    diesel: '查看工地发电机、挖掘机及搅拌车 — 工地燃料日志、承包商报告及散装供应。',
    petrol: '查看工长车辆 — 报销及油卡。',
    naturalGas: '查看临时供暖及养护用气 — 项目燃气发票。',
    electricity: '查看工地办公室、塔吊及临时用电 — 承包商电费账单。',
  },
  agriculture: {
    diesel: '查看拖拉机、收割机及柴油灌溉设备 — 农资/燃料供应商年度明细。',
    petrol: '查看农场实用车辆燃料记录。',
    naturalGas: '查看粮食烘干及温室供暖燃气账单。',
    electricity: '查看电灌、冷库及畜舍通风 — 农场年度千瓦时。',
  },
  energy: {
    diesel: '查看维护车队及应急发电机 — 内部燃料核算。',
    petrol: '查看巡检车队报告。',
    naturalGas: '查看边界内作业用气 — 计量与账单。',
    electricity: '查看辅助负荷、办公室及泵站 — 作业电力计量。',
  },
  defense: {
    diesel: '查看车辆、训练发电机 — 燃料发放记录（可报告范围内）。',
    petrol: '查看行政车队 — 报告期内记录。',
    naturalGas: '查看基地供暖燃气账单。',
    electricity: '查看基地及设施电费账户。',
  },
};
