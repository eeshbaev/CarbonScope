import type { Locale } from '../index';
import type { TranslationKeys } from '../locales/en';

type LegalPack = Pick<TranslationKeys, 'rateApp' | 'privacy'> & {
  settings: Partial<TranslationKeys['settings']>;
};

const enLegal: LegalPack = {
  rateApp: {
    title: 'Enjoying CarbonScope?',
    message:
      'If this calculator helped with your Scope 1 & 2 assessment, a quick rating or review helps us improve the app for companies and ESG professionals.',
    rateNow: 'Rate now',
    maybeLater: 'Maybe later',
    noThanks: 'No thanks',
  },
  settings: {
    aboutSection: 'About',
    rateApp: 'Rate CarbonScope',
    privacyPolicy: 'Privacy Policy',
    version: 'Version',
    dataSection: 'Data',
    clearAllData: 'Clear all data',
    clearAllDataTitle: 'Clear all data?',
    clearAllDataMessage:
      'This permanently deletes all saved company assessments on this device. Language, accessibility, and other app preferences are kept.',
    clearAllDataDone: 'All assessment data cleared',
    clearAllDataFailed: 'Could not clear data. Please try again.',
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: May 2026',
    openWebVersion: 'Open web version',
    sections: [
      {
        title: 'Overview',
        body:
          'CarbonScope is an offline-first calculator. Your company assessments, inputs, and results are stored only on your device. We do not operate user accounts, cloud sync, analytics, advertising, or tracking in this app.',
      },
      {
        title: 'Data on your device',
        body:
          'Information you enter (such as company name, country, industry, fuel use, and electricity use) is saved locally on your device so you can view, edit, or delete assessments. Optional evidence files (PDFs or images) you attach are also stored locally in the app’s private storage.',
      },
      {
        title: 'Optional features',
        body:
          'If you enable notifications, reminders are scheduled on your device using your assessment data — nothing is sent to our servers. PDF export and file sharing use your device’s share sheet. Rating the app may open the Google Play or App Store review flow.',
      },
      {
        title: 'Data we do not collect',
        body:
          'We do not collect, transmit, or sell personal data to our servers. The app does not request location, contacts, photos library, or microphone access for its core functionality.',
      },
      {
        title: 'Deletion',
        body:
          'Delete individual assessments in the app, or use Settings → Clear all data to remove all saved assessments. Uninstalling the app removes locally stored data from your device.',
      },
      {
        title: 'Third parties',
        body:
          'Emission factors and calculations run inside the app. When you choose to rate the app, your device may open the Apple App Store or Google Play in-app review flow, which is governed by those platforms’ policies.',
      },
      {
        title: 'Children',
        body: 'CarbonScope is a business tool and is not directed at children under 13.',
      },
      {
        title: 'Contact',
        body:
          'Questions, help, or privacy inquiries: eeshbaev@outlook.com',
      },
    ],
  },
};

export const LEGAL_PACKS: Record<Locale, LegalPack> = {
  en: enLegal,
  ru: {
    rateApp: {
      title: 'Нравится CarbonScope?',
      message:
        'Если калькулятор помог с оценкой Scope 1 и 2, оценка или отзыв помогут нам улучшить приложение для компаний и ESG-специалистов.',
      rateNow: 'Оценить',
      maybeLater: 'Позже',
      noThanks: 'Нет, спасибо',
    },
    settings: {
      aboutSection: 'О приложении',
      rateApp: 'Оценить CarbonScope',
      privacyPolicy: 'Политика конфиденциальности',
      version: 'Версия',
      dataSection: 'Данные',
      clearAllData: 'Удалить все данные',
      clearAllDataTitle: 'Удалить все данные?',
      clearAllDataMessage:
        'Безвозвратно удаляются все сохранённые оценки компаний на этом устройстве. Язык, специальные возможности и другие настройки приложения сохраняются.',
      clearAllDataDone: 'Данные оценок удалены',
      clearAllDataFailed: 'Не удалось удалить данные. Попробуйте снова.',
    },
    privacy: {
      title: 'Политика конфиденциальности',
      lastUpdated: 'Обновлено: май 2026',
      openWebVersion: 'Открыть веб-версию',
      sections: [
        {
          title: 'Обзор',
          body:
            'CarbonScope работает офлайн. Оценки компаний, вводимые данные и результаты хранятся только на вашем устройстве. Мы не используем учётные записи, облачную синхронизацию, аналитику, рекламу или отслеживание.',
        },
        {
          title: 'Данные на устройстве',
          body:
            'Введённая информация (название компании, страна, отрасль, топливо, электроэнергия) сохраняется локально. Удаление оценки в приложении удаляет её из локального хранилища.',
        },
        {
          title: 'Что мы не собираем',
          body:
            'Мы не собираем, не передаём и не продаём персональные данные на наши серверы. Приложение не запрашивает геолокацию, контакты, фото или микрофон для основных функций.',
        },
        {
          title: 'Третьи стороны',
          body:
            'Расчёты выполняются в приложении. При оценке приложения может открыться встроенный диалог App Store или Google Play.',
        },
        {
          title: 'Дети',
          body: 'CarbonScope — деловой инструмент, не предназначенный для детей младше 13 лет.',
        },
        {
          title: 'Контакты',
          body: 'Вопросы, помощь и запросы по конфиденциальности: eeshbaev@outlook.com',
        },
      ],
    },
  },
  fr: {
    rateApp: {
      title: 'Vous aimez CarbonScope ?',
      message:
        'Si ce calculateur vous a aidé pour Scope 1 et 2, une note ou un avis nous aide à améliorer l’app pour les entreprises et les professionnels ESG.',
      rateNow: 'Noter',
      maybeLater: 'Plus tard',
      noThanks: 'Non merci',
    },
    settings: {
      aboutSection: 'À propos',
      rateApp: 'Noter CarbonScope',
      privacyPolicy: 'Politique de confidentialité',
      version: 'Version',
      dataSection: 'Données',
      clearAllData: 'Effacer toutes les données',
      clearAllDataTitle: 'Effacer toutes les données ?',
      clearAllDataMessage:
        'Supprime définitivement toutes les évaluations enregistrées sur cet appareil. La langue, l’accessibilité et les autres préférences de l’app sont conservées.',
      clearAllDataDone: 'Données d’évaluation effacées',
      clearAllDataFailed: 'Impossible d’effacer les données. Réessayez.',
    },
    privacy: {
      title: 'Politique de confidentialité',
      lastUpdated: 'Dernière mise à jour : mai 2026',
      openWebVersion: 'Version web',
      sections: [
        {
          title: 'Aperçu',
          body:
            'CarbonScope fonctionne hors ligne. Vos évaluations, saisies et résultats restent sur votre appareil. Pas de comptes, synchronisation cloud, analytique, publicité ni suivi.',
        },
        {
          title: 'Données sur l’appareil',
          body:
            'Les informations saisies sont enregistrées localement. La suppression d’une évaluation la retire du stockage local.',
        },
        {
          title: 'Données non collectées',
          body:
            'Nous ne collectons ni ne vendons de données personnelles sur nos serveurs. Pas d’accès localisation, contacts, photos ou micro pour les fonctions principales.',
        },
        {
          title: 'Tiers',
          body:
            'Les calculs s’exécutent dans l’app. Le choix de noter peut ouvrir l’avis intégré App Store ou Google Play.',
        },
        { title: 'Enfants', body: 'Outil professionnel, non destiné aux moins de 13 ans.' },
        {
          title: 'Contact',
          body: 'Questions : email du développeur sur la fiche App Store ou Google Play.',
        },
      ],
    },
  },
  de: {
    rateApp: {
      title: 'Gefällt Ihnen CarbonScope?',
      message:
        'Wenn der Rechner bei Scope 1 und 2 geholfen hat, hilft eine Bewertung uns, die App für Unternehmen und ESG-Profis zu verbessern.',
      rateNow: 'Bewerten',
      maybeLater: 'Später',
      noThanks: 'Nein danke',
    },
    settings: {
      aboutSection: 'Über',
      rateApp: 'CarbonScope bewerten',
      privacyPolicy: 'Datenschutz',
      version: 'Version',
      dataSection: 'Daten',
      clearAllData: 'Alle Daten löschen',
      clearAllDataTitle: 'Alle Daten löschen?',
      clearAllDataMessage:
        'Löscht dauerhaft alle gespeicherten Unternehmensbewertungen auf diesem Gerät. Sprache, Bedienhilfen und andere App-Einstellungen bleiben erhalten.',
      clearAllDataDone: 'Bewertungsdaten gelöscht',
      clearAllDataFailed: 'Daten konnten nicht gelöscht werden. Bitte erneut versuchen.',
    },
    privacy: {
      title: 'Datenschutz',
      lastUpdated: 'Stand: Mai 2026',
      openWebVersion: 'Webversion öffnen',
      sections: [
        {
          title: 'Überblick',
          body:
            'CarbonScope arbeitet offline. Bewertungen und Ergebnisse bleiben auf Ihrem Gerät. Keine Konten, Cloud-Sync, Analyse, Werbung oder Tracking.',
        },
        {
          title: 'Daten auf dem Gerät',
          body: 'Eingegebene Daten werden lokal gespeichert. Löschen entfernt sie aus dem lokalen Speicher.',
        },
        {
          title: 'Keine Erhebung',
          body:
            'Wir erheben oder verkaufen keine personenbezogenen Daten auf Servern. Kein Standort-, Kontakt- oder Mikrofonzugriff für Kernfunktionen.',
        },
        {
          title: 'Dritte',
          body: 'Berechnungen in der App. Bewertung kann den Store-Dialog öffnen.',
        },
        { title: 'Kinder', body: 'Geschäftstool, nicht für unter 13 Jahren.' },
        { title: 'Kontakt', body: 'Fragen an die Entwickler-E-Mail im Store-Eintrag.' },
      ],
    },
  },
  es: {
    rateApp: {
      title: '¿Le gusta CarbonScope?',
      message:
        'Si esta calculadora le ayudó con Scope 1 y 2, una valoración nos ayuda a mejorar la app para empresas y profesionales ESG.',
      rateNow: 'Valorar',
      maybeLater: 'Más tarde',
      noThanks: 'No, gracias',
    },
    settings: {
      aboutSection: 'Acerca de',
      rateApp: 'Valorar CarbonScope',
      privacyPolicy: 'Política de privacidad',
      version: 'Versión',
      dataSection: 'Datos',
      clearAllData: 'Borrar todos los datos',
      clearAllDataTitle: '¿Borrar todos los datos?',
      clearAllDataMessage:
        'Elimina permanentemente todas las evaluaciones guardadas en este dispositivo. Se conservan el idioma, la accesibilidad y otras preferencias de la app.',
      clearAllDataDone: 'Datos de evaluación borrados',
      clearAllDataFailed: 'No se pudieron borrar los datos. Inténtelo de nuevo.',
    },
    privacy: {
      title: 'Política de privacidad',
      lastUpdated: 'Actualizado: mayo 2026',
      openWebVersion: 'Versión web',
      sections: [
        {
          title: 'Resumen',
          body:
            'CarbonScope funciona sin conexión. Las evaluaciones se guardan solo en su dispositivo. Sin cuentas, nube, analítica, publicidad ni seguimiento.',
        },
        {
          title: 'Datos en el dispositivo',
          body: 'La información introducida se guarda localmente. Eliminar una evaluación la borra del almacenamiento local.',
        },
        {
          title: 'Datos que no recopilamos',
          body: 'No recopilamos ni vendemos datos personales en nuestros servidores.',
        },
        {
          title: 'Terceros',
          body: 'Los cálculos se ejecutan en la app. Valorar puede abrir el flujo de reseñas de la tienda.',
        },
        { title: 'Menores', body: 'Herramienta empresarial, no dirigida a menores de 13 años.' },
        { title: 'Contacto', body: 'Preguntas al email del desarrollador en la ficha de la tienda.' },
      ],
    },
  },
  pt: {
    rateApp: {
      title: 'Gostando do CarbonScope?',
      message:
        'Se esta calculadora ajudou com Scope 1 e 2, uma avaliação ajuda a melhorar o app para empresas e profissionais ESG.',
      rateNow: 'Avaliar',
      maybeLater: 'Depois',
      noThanks: 'Não, obrigado',
    },
    settings: {
      aboutSection: 'Sobre',
      rateApp: 'Avaliar CarbonScope',
      privacyPolicy: 'Política de privacidade',
      version: 'Versão',
      dataSection: 'Dados',
      clearAllData: 'Apagar todos os dados',
      clearAllDataTitle: 'Apagar todos os dados?',
      clearAllDataMessage:
        'Elimina permanentemente todas as avaliações guardadas neste dispositivo. Mantêm-se idioma, acessibilidade e outras preferências da app.',
      clearAllDataDone: 'Dados de avaliação apagados',
      clearAllDataFailed: 'Não foi possível apagar os dados. Tente novamente.',
    },
    privacy: {
      title: 'Política de privacidade',
      lastUpdated: 'Atualizado: maio de 2026',
      openWebVersion: 'Versão web',
      sections: [
        {
          title: 'Visão geral',
          body:
            'O CarbonScope funciona offline. Avaliações ficam apenas no seu dispositivo. Sem contas, nuvem, análise, anúncios ou rastreamento.',
        },
        {
          title: 'Dados no dispositivo',
          body: 'As informações inseridas são salvas localmente. Excluir remove do armazenamento local.',
        },
        {
          title: 'Dados que não coletamos',
          body: 'Não coletamos nem vendemos dados pessoais em nossos servidores.',
        },
        {
          title: 'Terceiros',
          body: 'Cálculos no app. Avaliar pode abrir o fluxo da loja.',
        },
        { title: 'Crianças', body: 'Ferramenta empresarial, não destinada a menores de 13 anos.' },
        { title: 'Contato', body: 'Dúvidas ao e-mail do desenvolvedor na loja.' },
      ],
    },
  },
  it: {
    rateApp: {
      title: 'Ti piace CarbonScope?',
      message:
        'Se questo calcolatore ti ha aiutato con Scope 1 e 2, una valutazione ci aiuta a migliorare l’app per aziende e professionisti ESG.',
      rateNow: 'Valuta',
      maybeLater: 'Più tardi',
      noThanks: 'No grazie',
    },
    settings: {
      aboutSection: 'Informazioni',
      rateApp: 'Valuta CarbonScope',
      privacyPolicy: 'Informativa sulla privacy',
      version: 'Versione',
      dataSection: 'Dati',
      clearAllData: 'Cancella tutti i dati',
      clearAllDataTitle: 'Cancellare tutti i dati?',
      clearAllDataMessage:
        'Elimina definitivamente tutte le valutazioni salvate su questo dispositivo. Restano lingua, accessibilità e altre preferenze dell’app.',
      clearAllDataDone: 'Dati delle valutazioni cancellati',
      clearAllDataFailed: 'Impossibile cancellare i dati. Riprova.',
    },
    privacy: {
      title: 'Informativa sulla privacy',
      lastUpdated: 'Aggiornato: maggio 2026',
      openWebVersion: 'Versione web',
      sections: [
        {
          title: 'Panoramica',
          body:
            'CarbonScope funziona offline. Valutazioni e risultati restano sul dispositivo. Nessun account, cloud, analisi, pubblicità o tracciamento.',
        },
        {
          title: 'Dati sul dispositivo',
          body: 'I dati inseriti sono salvati localmente. Eliminare rimuove dalla memoria locale.',
        },
        {
          title: 'Dati non raccolti',
          body: 'Non raccogliamo né vendiamo dati personali sui nostri server.',
        },
        {
          title: 'Terze parti',
          body: 'I calcoli avvengono nell’app. Valutare può aprire il flusso dello store.',
        },
        { title: 'Minori', body: 'Strumento aziendale, non per under 13.' },
        { title: 'Contatto', body: 'Domande all’email dello sviluppatore nello store.' },
      ],
    },
  },
  ja: {
    rateApp: {
      title: 'CarbonScopeはいかがですか？',
      message:
        'Scope 1・2の算定に役立った場合、評価やレビューでアプリ改善にご協力ください。',
      rateNow: '評価する',
      maybeLater: 'あとで',
      noThanks: 'いいえ',
    },
    settings: {
      aboutSection: 'アプリについて',
      rateApp: 'CarbonScopeを評価',
      privacyPolicy: 'プライバシーポリシー',
      version: 'バージョン',
      dataSection: 'データ',
      clearAllData: 'すべてのデータを消去',
      clearAllDataTitle: 'すべてのデータを消去しますか？',
      clearAllDataMessage:
        'この端末に保存された企業評価をすべて完全に削除します。言語、アクセシビリティ、その他のアプリ設定は保持されます。',
      clearAllDataDone: '評価データを消去しました',
      clearAllDataFailed: 'データを消去できませんでした。もう一度お試しください。',
    },
    privacy: {
      title: 'プライバシーポリシー',
      lastUpdated: '最終更新：2026年5月',
      openWebVersion: 'Web版を開く',
      sections: [
        {
          title: '概要',
          body:
            'CarbonScopeはオフライン優先です。評価データは端末内のみに保存されます。アカウント、クラウド同期、分析、広告、追跡はありません。',
        },
        {
          title: '端末上のデータ',
          body: '入力情報はローカルに保存されます。削除すると端末から除去されます。',
        },
        {
          title: '収集しないデータ',
          body: '個人データをサーバーに送信・販売しません。位置情報等は基本機能で要求しません。',
        },
        {
          title: '第三者',
          body: '計算はアプリ内で実行。評価時にストアのレビュー画面が開く場合があります。',
        },
        { title: '子ども', body: '13歳未満向けではないビジネスツールです。' },
        { title: 'お問い合わせ', body: 'ストア掲載の開発者連絡先へ。' },
      ],
    },
  },
  zh: {
    rateApp: {
      title: '喜欢 CarbonScope 吗？',
      message: '如果本计算器帮助您完成了 Scope 1 和 2 评估，欢迎评分或留言，帮助我们改进应用。',
      rateNow: '去评分',
      maybeLater: '以后再说',
      noThanks: '不用了',
    },
    settings: {
      aboutSection: '关于',
      rateApp: '为 CarbonScope 评分',
      privacyPolicy: '隐私政策',
      version: '版本',
      dataSection: '数据',
      clearAllData: '清除所有数据',
      clearAllDataTitle: '清除所有数据？',
      clearAllDataMessage:
        '将永久删除此设备上所有已保存的公司评估。语言、无障碍设置及其他应用偏好设置将保留。',
      clearAllDataDone: '评估数据已清除',
      clearAllDataFailed: '无法清除数据，请重试。',
    },
    privacy: {
      title: '隐私政策',
      lastUpdated: '更新日期：2026年5月',
      openWebVersion: '打开网页版',
      sections: [
        {
          title: '概述',
          body: 'CarbonScope 以离线为主。评估数据仅保存在您的设备上。无账户、云同步、分析、广告或跟踪。',
        },
        {
          title: '设备上的数据',
          body: '您输入的信息保存在本地。删除评估将从本地存储中移除。',
        },
        {
          title: '我们不收集的数据',
          body: '我们不会向服务器收集或出售个人数据。核心功能不请求位置、联系人等权限。',
        },
        {
          title: '第三方',
          body: '计算在应用内完成。评分可能打开应用商店评价流程。',
        },
        { title: '儿童', body: '本应用为商业工具，不面向13岁以下儿童。' },
        { title: '联系', body: '请通过商店页面的开发者邮箱联系。' },
      ],
    },
  },
};
