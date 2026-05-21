import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';
import type { TranslationKeys } from '../i18n/locales/en';
import type { Locale } from '../i18n';
import { getMethodologyLogForAssessment } from '../storage/methodologyLog';
import { buildReportPdfHtml } from './buildReportPdfHtml';
import type { Assessment } from '../types';

const A4_WIDTH = 595;

async function sharePdfFile(uri: string, fileName: string, dialogTitle: string): Promise<void> {
  const canShare = await Sharing.isAvailableAsync();
  if (!canShare) {
    throw new Error('Sharing is not available on this device');
  }

  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle,
    UTI: 'com.adobe.pdf',
  });
}

/** Web: expo-print does not build PDF files — open print dialog with report HTML. */
function printHtmlInBrowser(html: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('Print is not available'));
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.setAttribute(
      'style',
      'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden'
    );
    document.body.appendChild(iframe);

    const win = iframe.contentWindow;
    const doc = win?.document;
    if (!doc || !win) {
      document.body.removeChild(iframe);
      reject(new Error('Print frame unavailable'));
      return;
    }

    const cleanup = () => {
      try {
        document.body.removeChild(iframe);
      } catch {
        /* already removed */
      }
    };

    doc.open();
    doc.write(html);
    doc.close();

    const done = () => {
      cleanup();
      resolve();
    };

    win.onafterprint = done;

    setTimeout(() => {
      try {
        win.focus();
        win.print();
      } catch (err) {
        cleanup();
        reject(err);
        return;
      }
      setTimeout(done, 1500);
    }, 350);
  });
}

export function showPdfError(title: string, message: string, webHint?: string): void {
  const full = Platform.OS === 'web' && webHint ? `${message}\n\n${webHint}` : message;
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.alert(`${title}\n\n${full}`);
    return;
  }
  Alert.alert(title, full);
}

export async function generateAndShareReportPdf(
  assessment: Assessment,
  t: TranslationKeys,
  locale: Locale
): Promise<void> {
  const methodologyLog = await getMethodologyLogForAssessment(assessment.id);
  const html = buildReportPdfHtml(assessment, t, locale, methodologyLog);
  const safeName = assessment.companyName.replace(/[^\w\s-]/g, '').trim() || 'report';
  const fileName = `CarbonScope-${safeName}.pdf`;

  if (Platform.OS === 'web') {
    await printHtmlInBrowser(html);
    return;
  }

  const { uri } = await Print.printToFileAsync({
    html,
    width: A4_WIDTH,
    margins: { top: 28, right: 28, bottom: 28, left: 28 },
  });

  if (!uri) {
    throw new Error('PDF file was not created');
  }

  await sharePdfFile(uri, fileName, t.results.sharePdf);
}
