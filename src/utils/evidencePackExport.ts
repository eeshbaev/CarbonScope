import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import JSZip from 'jszip';
import { Platform } from 'react-native';
import type { TranslationKeys } from '../i18n/locales/en';
import type { Assessment } from '../types';
import { getMethodologyLogForAssessment } from '../storage/methodologyLog';
import { buildReportPdfHtml } from './buildReportPdfHtml';
import { readEvidenceAsBase64 } from '../storage/evidence';
import type { Locale } from '../i18n';

export async function exportEvidencePack(
  assessment: Assessment,
  t: TranslationKeys,
  locale: Locale
): Promise<void> {
  if (Platform.OS === 'web') {
    throw new Error('web');
  }

  const zip = new JSZip();
  const manifest: string[] = [
    `CarbonScope Evidence Pack`,
    `Company: ${assessment.companyName}`,
    `Generated: ${new Date().toISOString()}`,
    '',
    'Files:',
  ];

  const methodologyLog = await getMethodologyLogForAssessment(assessment.id);
  const pdfHtml = buildReportPdfHtml(assessment, t, locale, methodologyLog);
  zip.file('report.html', pdfHtml);
  manifest.push('- report.html (open in browser → Print to PDF)');

  const checklist = assessment.evidenceChecklist ?? {};
  zip.file(
    'checklist.json',
    JSON.stringify({ checklist, notes: assessment.notes, lineItemNotes: assessment.lineItemNotes }, null, 2)
  );
  manifest.push('- checklist.json');

  for (const item of assessment.evidence ?? []) {
    const b64 = await readEvidenceAsBase64(item);
    if (b64) {
      zip.file(`attachments/${item.fileName}`, b64, { base64: true });
      manifest.push(`- attachments/${item.fileName}`);
    }
  }

  zip.file('README.txt', manifest.join('\n'));

  const base64 = await zip.generateAsync({ type: 'base64' });
  const dir = FileSystem.cacheDirectory ?? FileSystem.documentDirectory;
  if (!dir) throw new Error('No cache directory');

  const safeName = assessment.companyName.replace(/[^a-z0-9_-]/gi, '_').slice(0, 40);
  const outPath = `${dir}evidence_${safeName}_${Date.now()}.zip`;
  await FileSystem.writeAsStringAsync(outPath, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const canShare = await Sharing.isAvailableAsync();
  if (!canShare) throw new Error('share');
  await Sharing.shareAsync(outPath, {
    mimeType: 'application/zip',
    dialogTitle: t.enterprise.evidence.exportPack,
  });
}
