import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';
import { loadAssessments, saveAllAssessments } from '../storage';
import { loadCustomElectricityFactors, saveCustomElectricityFactors } from '../storage/customFactors';
import { loadMethodologyLog, saveMethodologyLog } from '../storage/methodologyLog';
import { assessmentsToCsv, buildBackup, mergeBackup, parseBackup } from './backup';

function stamp(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Save a text file: share sheet on iOS/Android, download on web. */
async function deliverFile(name: string, content: string, mimeType: string, uti: string): Promise<void> {
  if (Platform.OS === 'web') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return;
  }
  const dir = FileSystem.cacheDirectory ?? FileSystem.documentDirectory;
  const path = `${dir}${name}`;
  await FileSystem.writeAsStringAsync(path, content, { encoding: FileSystem.EncodingType.UTF8 });
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(path, { mimeType, UTI: uti, dialogTitle: name });
  }
}

/** Export a full backup (reports, methodology log, custom factors). */
export async function exportBackup(): Promise<number> {
  const [assessments, methodologyLog, customFactors] = await Promise.all([
    loadAssessments(),
    loadMethodologyLog(),
    loadCustomElectricityFactors(),
  ]);
  const file = buildBackup({ assessments, methodologyLog, customFactors });
  await deliverFile(
    `carbonscope-backup-${stamp()}.json`,
    JSON.stringify(file, null, 2),
    'application/json',
    'public.json'
  );
  return assessments.length;
}

/** Export one CSV row per report. */
export async function exportCsv(): Promise<number> {
  const assessments = await loadAssessments();
  await deliverFile(`carbonscope-reports-${stamp()}.csv`, assessmentsToCsv(assessments), 'text/csv', 'public.comma-separated-values-text');
  return assessments.length;
}

/**
 * Pick a backup file and merge it in. Returns null if the user cancelled.
 * Throws BackupError for invalid files.
 */
export async function importBackup(): Promise<{ added: number; updated: number } | null> {
  const picked = await DocumentPicker.getDocumentAsync({
    type: ['application/json', 'text/plain', '*/*'],
    copyToCacheDirectory: true,
    multiple: false,
  });
  if (picked.canceled || !picked.assets?.length) return null;
  const asset = picked.assets[0];
  const text =
    Platform.OS === 'web'
      ? await (asset.file ? asset.file.text() : fetch(asset.uri).then((r) => r.text()))
      : await FileSystem.readAsStringAsync(asset.uri, { encoding: FileSystem.EncodingType.UTF8 });
  const backup = parseBackup(text);
  const [assessments, methodologyLog, customFactors] = await Promise.all([
    loadAssessments(),
    loadMethodologyLog(),
    loadCustomElectricityFactors(),
  ]);
  const merged = mergeBackup({ assessments, methodologyLog, customFactors }, backup);
  await saveAllAssessments(merged.assessments);
  await saveMethodologyLog(merged.methodologyLog);
  await saveCustomElectricityFactors(merged.customFactors);
  return { added: merged.added, updated: merged.updated };
}
