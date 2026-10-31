import { buildLocale } from '../buildLocale';

export const ja = buildLocale({
  slogan: 'Scope 1・2・3 排出量の迅速計算',
  common: {
    continue: '続ける',
    cancel: 'キャンセル',
    delete: '削除',
    letsStart: '始める',
    backHome: 'ホームへ',
    search: '検索',
    settings: '設定',
    selectLanguage: '言語を選択',
  },
  delete: {
    confirmTitle: '評価を削除しますか？',
    confirmMessage: 'この評価を削除してもよろしいですか？',
  },
  onboarding: {
    title: 'CarbonScopeへようこそ',
    subtitle: '企業とESG専門家のためのシンプルなカーボンフットプリント計算。',
    scope1Title: 'Scope 1排出とは？',
    scope1Body: 'ディーゼル、ガソリン、天然ガスなど自社燃料の直接排出。',
    scope2Title: 'Scope 2排出とは？',
    scope2Body: '購入電力による間接排出。',
    whyTitle: 'なぜCarbonScope？',
    whyBody:
      'GHG Protocolに沿った運用排出量を素早く見積もれます。',
  },
  home: {
    ghgAligned: 'GHG Protocol準拠',
    scopeCalculator: 'Scope 1・2・3 CO₂計算機',
    emptyTitle: '評価がありません',
    emptyText: '下のボタンで最初の評価を作成してください。',
    quickEditTitle: 'クイック更新',
    quickEditSubtitle:
      'Scope 1・2の全画面を開かずに、燃料または電力の1行だけを変更できます。',
    quickEditCategory: 'カテゴリ',
    quickEditMonth: '月',
    quickEditNeedDates: '月次値を編集するには、企業情報で報告開始日を設定してください。',
    quickEditSave: '保存',
    quickEditSaving: '保存中…',
    quickEditSaved: '保存しました。',
    quickEditFailed: '保存できませんでした。もう一度お試しください。',
    quickEditAddData: 'データの追加・編集',
  },
  company: {
    selectCountry: '国を選択',
    searchCountry: '国を検索...',
    reportingPeriod: '報告期間',
    industryRequired: '業種は必須です',
    periodRequired: '期間は必須です',
  },
  reportingPeriods: { '6_months': '6か月', '1_year': '1年' },
  results: { reportingPeriod: '報告期間' },
});
