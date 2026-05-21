import type { DeepPartial } from '../buildLocale';
import type { TranslationKeys } from '../locales/en';

/** In-app accessibility settings (font size, display density). */
export const ACCESSIBILITY_PACKS: Record<string, DeepPartial<TranslationKeys>> = {
  ru: {
    settings: {
      accessibilitySection: 'Специальные возможности',
      accessibilityHint:
        'Настройте размер текста и отступы в приложении. Эти настройки сохраняются на этом устройстве и не зависят от системных параметров экрана телефона.',
      fontSizeLabel: 'Размер шрифта',
      displaySizeLabel: 'Размер интерфейса',
      fontSizeSmall: 'Мелкий',
      fontSizeDefault: 'Обычный',
      fontSizeLarge: 'Крупный',
      fontSizeExtraLarge: 'Очень крупный',
      displaySizeCompact: 'Компактный',
      displaySizeDefault: 'Обычный',
      displaySizeComfortable: 'Удобный',
      displaySizeLarge: 'Большой',
      accessibilityPreview: 'Предпросмотр',
      accessibilityPreviewBody:
        'Пример текста выбранного размера. Списки, кнопки и формы в CarbonScope следуют этим настройкам.',
    },
  },
  fr: {
    settings: {
      accessibilitySection: 'Accessibilité',
      accessibilityHint:
        'Ajustez la taille du texte et l’espacement dans l’application. Ces réglages sont enregistrés sur cet appareil et sont indépendants des paramètres d’affichage du téléphone.',
      fontSizeLabel: 'Taille de police',
      displaySizeLabel: 'Taille d’affichage',
      fontSizeSmall: 'Petite',
      fontSizeDefault: 'Par défaut',
      fontSizeLarge: 'Grande',
      fontSizeExtraLarge: 'Très grande',
      displaySizeCompact: 'Compact',
      displaySizeDefault: 'Par défaut',
      displaySizeComfortable: 'Confortable',
      displaySizeLarge: 'Grande',
      accessibilityPreview: 'Aperçu',
      accessibilityPreviewBody:
        'Exemple de texte à la taille choisie. Listes, boutons et formulaires dans CarbonScope suivent ces réglages.',
    },
  },
  de: {
    settings: {
      accessibilitySection: 'Bedienhilfen',
      accessibilityHint:
        'Passen Sie Textgröße und Abstände in der App an. Diese Einstellungen werden auf diesem Gerät gespeichert und sind unabhängig von den Systemanzeigeeinstellungen Ihres Telefons.',
      fontSizeLabel: 'Schriftgröße',
      displaySizeLabel: 'Anzeigegröße',
      fontSizeSmall: 'Klein',
      fontSizeDefault: 'Standard',
      fontSizeLarge: 'Groß',
      fontSizeExtraLarge: 'Sehr groß',
      displaySizeCompact: 'Kompakt',
      displaySizeDefault: 'Standard',
      displaySizeComfortable: 'Komfortabel',
      displaySizeLarge: 'Groß',
      accessibilityPreview: 'Vorschau',
      accessibilityPreviewBody:
        'Beispieltext in gewählter Größe. Listen, Schaltflächen und Formulare in CarbonScope folgen diesen Einstellungen.',
    },
  },
  es: {
    settings: {
      accessibilitySection: 'Accesibilidad',
      accessibilityHint:
        'Ajuste el tamaño del texto y el espaciado en la aplicación. Estos ajustes se guardan en este dispositivo y son independientes de la configuración de pantalla del teléfono.',
      fontSizeLabel: 'Tamaño de fuente',
      displaySizeLabel: 'Tamaño de pantalla',
      fontSizeSmall: 'Pequeña',
      fontSizeDefault: 'Predeterminado',
      fontSizeLarge: 'Grande',
      fontSizeExtraLarge: 'Muy grande',
      displaySizeCompact: 'Compacto',
      displaySizeDefault: 'Predeterminado',
      displaySizeComfortable: 'Cómodo',
      displaySizeLarge: 'Grande',
      accessibilityPreview: 'Vista previa',
      accessibilityPreviewBody:
        'Texto de ejemplo con el tamaño elegido. Listas, botones y formularios en CarbonScope siguen estos ajustes.',
    },
  },
  pt: {
    settings: {
      accessibilitySection: 'Acessibilidade',
      accessibilityHint:
        'Ajuste o tamanho do texto e o espaçamento na aplicação. Estas definições são guardadas neste dispositivo e são independentes das definições de ecrã do telemóvel.',
      fontSizeLabel: 'Tamanho da letra',
      displaySizeLabel: 'Tamanho do ecrã',
      fontSizeSmall: 'Pequeno',
      fontSizeDefault: 'Predefinido',
      fontSizeLarge: 'Grande',
      fontSizeExtraLarge: 'Muito grande',
      displaySizeCompact: 'Compacto',
      displaySizeDefault: 'Predefinido',
      displaySizeComfortable: 'Confortável',
      displaySizeLarge: 'Grande',
      accessibilityPreview: 'Pré-visualização',
      accessibilityPreviewBody:
        'Texto de exemplo no tamanho escolhido. Listas, botões e formulários no CarbonScope seguem estas definições.',
    },
  },
  it: {
    settings: {
      accessibilitySection: 'Accessibilità',
      accessibilityHint:
        'Regola dimensione del testo e spaziatura nell’app. Queste impostazioni sono salvate su questo dispositivo e sono separate dalle impostazioni di visualizzazione del telefono.',
      fontSizeLabel: 'Dimensione carattere',
      displaySizeLabel: 'Dimensione schermo',
      fontSizeSmall: 'Piccolo',
      fontSizeDefault: 'Predefinito',
      fontSizeLarge: 'Grande',
      fontSizeExtraLarge: 'Molto grande',
      displaySizeCompact: 'Compatto',
      displaySizeDefault: 'Predefinito',
      displaySizeComfortable: 'Comodo',
      displaySizeLarge: 'Grande',
      accessibilityPreview: 'Anteprima',
      accessibilityPreviewBody:
        'Testo di esempio nella dimensione scelta. Elenchi, pulsanti e moduli in CarbonScope seguono queste impostazioni.',
    },
  },
  ja: {
    settings: {
      accessibilitySection: 'アクセシビリティ',
      accessibilityHint:
        'アプリ内の文字サイズと間隔を調整します。設定はこの端末に保存され、スマートフォンのシステム表示設定とは別です。',
      fontSizeLabel: '文字サイズ',
      displaySizeLabel: '表示サイズ',
      fontSizeSmall: '小',
      fontSizeDefault: '標準',
      fontSizeLarge: '大',
      fontSizeExtraLarge: '特大',
      displaySizeCompact: 'コンパクト',
      displaySizeDefault: '標準',
      displaySizeComfortable: 'ゆったり',
      displaySizeLarge: '大',
      accessibilityPreview: 'プレビュー',
      accessibilityPreviewBody:
        '選択したサイズのサンプルテキストです。CarbonScope の一覧、ボタン、フォームはこれらの設定に従います。',
    },
  },
  zh: {
    settings: {
      accessibilitySection: '无障碍',
      accessibilityHint:
        '调整应用内的文字大小和间距。这些设置保存在本设备上，与手机的系统显示设置无关。',
      fontSizeLabel: '字体大小',
      displaySizeLabel: '显示大小',
      fontSizeSmall: '小',
      fontSizeDefault: '默认',
      fontSizeLarge: '大',
      fontSizeExtraLarge: '特大',
      displaySizeCompact: '紧凑',
      displaySizeDefault: '默认',
      displaySizeComfortable: '舒适',
      displaySizeLarge: '大',
      accessibilityPreview: '预览',
      accessibilityPreviewBody:
        '按所选大小显示的示例文字。CarbonScope 中的列表、按钮和表单均遵循这些设置。',
    },
  },
};
