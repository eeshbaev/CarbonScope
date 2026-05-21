import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Linking, Platform } from 'react-native';
import { readEvidenceAsBase64 } from '../storage/evidence';
import type { EvidenceItem } from '../types/enterprise';

function base64ToBlob(base64: string, mimeType: string): Blob {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mimeType });
}

async function resolveNativeUri(item: EvidenceItem): Promise<string> {
  if (!item.storagePath.startsWith('web://')) {
    return item.storagePath;
  }
  const base64 = await readEvidenceAsBase64(item);
  if (!base64) throw new Error('File not found');
  const ext = item.fileName.includes('.') ? item.fileName.split('.').pop() : 'bin';
  const uri = `${FileSystem.cacheDirectory ?? FileSystem.documentDirectory}view_${item.id}.${ext}`;
  if (!uri) throw new Error('No cache directory');
  await FileSystem.writeAsStringAsync(uri, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return uri;
}

export async function openEvidenceDocument(item: EvidenceItem): Promise<void> {
  if (Platform.OS === 'web') {
    if (typeof window === 'undefined') throw new Error('Unavailable');
    const base64 = await readEvidenceAsBase64(item);
    if (!base64) throw new Error('File not found');
    const blob = base64ToBlob(base64, item.mimeType);
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }

  const uri = await resolveNativeUri(item);
  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(uri, {
      mimeType: item.mimeType,
      dialogTitle: item.fileName,
      UTI: item.mimeType === 'application/pdf' ? 'com.adobe.pdf' : undefined,
    });
    return;
  }

  const opened = await Linking.canOpenURL(uri);
  if (opened) await Linking.openURL(uri);
  else throw new Error('Cannot open file');
}
