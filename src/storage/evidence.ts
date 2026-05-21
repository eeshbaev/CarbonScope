import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { Platform } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import type { Assessment } from '../types';
import type { EvidenceCategory, EvidenceItem } from '../types/enterprise';
import { updateAssessmentEvidence } from '../storage';
import {
  buildEvidenceSlotKey,
  itemSlotKey,
  mergeEvidenceItems,
} from '../utils/evidenceHelpers';

const EVIDENCE_DIR = 'evidence';
const WEB_EVIDENCE_KEY = '@carbonscope/evidence-blob/';

function evidenceRoot(): string {
  const base = FileSystem.documentDirectory;
  if (!base) throw new Error('No document directory');
  return `${base}${EVIDENCE_DIR}/`;
}

function webStorageKey(assessmentId: string, itemId: string): string {
  return `${WEB_EVIDENCE_KEY}${assessmentId}/${itemId}`;
}

async function ensureDir(assessmentId: string): Promise<string> {
  const dir = `${evidenceRoot()}${assessmentId}/`;
  const info = await FileSystem.getInfoAsync(dir);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
  return dir;
}

async function uriToBase64(uri: string): Promise<string> {
  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1];
      if (base64) resolve(base64);
      else reject(new Error('Could not read file'));
    };
    reader.onerror = () => reject(reader.error ?? new Error('Could not read file'));
    reader.readAsDataURL(blob);
  });
}

async function copyPickedFile(assetUri: string, storagePath: string): Promise<void> {
  if (Platform.OS === 'web') {
    const base64 = await uriToBase64(assetUri);
    const match = storagePath.match(/^web:\/\/([^/]+)\/(.+)$/);
    if (!match) throw new Error('Invalid web storage path');
    await AsyncStorage.setItem(webStorageKey(match[1], match[2]), base64);
    return;
  }
  await FileSystem.copyAsync({ from: assetUri, to: storagePath });
}

type PickedAsset = { uri: string; name: string; mimeType: string };

/** Native `<input type="file">` — more reliable than expo-document-picker for many picks on web. */
function pickDocumentOnWeb(): Promise<PickedAsset | null> {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve(null);
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf,.pdf,image/jpeg,image/png,image/*';
    input.multiple = false;
    input.style.cssText =
      'position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none;';

    let settled = false;
    const finish = (asset: PickedAsset | null) => {
      if (settled) return;
      settled = true;
      window.removeEventListener('focus', onWindowFocus);
      try {
        input.remove();
      } catch {
        /* ignore */
      }
      resolve(asset);
    };

    const onWindowFocus = () => {
      window.setTimeout(() => {
        if (!settled && !input.files?.length) finish(null);
      }, 400);
    };

    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (!file) {
        finish(null);
        return;
      }
      finish({
        uri: URL.createObjectURL(file),
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
      });
    });

    document.body.appendChild(input);
    window.addEventListener('focus', onWindowFocus);
    input.click();
  });
}

async function pickDocumentAsset(): Promise<PickedAsset | null> {
  if (Platform.OS === 'web') {
    return pickDocumentOnWeb();
  }

  const result = await DocumentPicker.getDocumentAsync({
    type: ['application/pdf', 'image/*', 'image/jpeg', 'image/png'],
    copyToCacheDirectory: true,
    multiple: false,
  });
  if (result.canceled || !result.assets?.[0]?.uri) return null;
  const asset = result.assets[0];
  return {
    uri: asset.uri,
    name: asset.name ?? 'evidence',
    mimeType: asset.mimeType ?? 'application/octet-stream',
  };
}

export async function pickAndAttachEvidence(
  assessment: Assessment,
  category: EvidenceCategory,
  monthKey?: string
): Promise<EvidenceItem | null> {
  if (!assessment.id || assessment.id === 'draft-evidence') {
    throw new Error('Assessment must be saved before attaching evidence');
  }

  const picked = await pickDocumentAsset();
  if (!picked) return null;

  const objectUrl = Platform.OS === 'web' && picked.uri.startsWith('blob:') ? picked.uri : null;

  try {
    const id = uuidv4();
    const ext = picked.name.includes('.') ? picked.name.split('.').pop() : 'bin';
    const storagePath =
      Platform.OS === 'web'
        ? `web://${assessment.id}/${id}`
        : `${await ensureDir(assessment.id)}${id}.${ext}`;

    await copyPickedFile(picked.uri, storagePath);

    const item: EvidenceItem = {
      id,
      fileName: picked.name,
      mimeType: picked.mimeType,
      storagePath,
      category,
      slotKey: buildEvidenceSlotKey(category, monthKey),
      ...(monthKey ? { monthKey } : {}),
      uploadedAt: new Date().toISOString(),
    };

    return item;
  } finally {
    if (objectUrl) {
      try {
        URL.revokeObjectURL(objectUrl);
      } catch {
        /* ignore */
      }
    }
  }
}

export async function deleteEvidenceFile(item: EvidenceItem): Promise<void> {
  try {
    if (item.storagePath.startsWith('web://')) {
      const match = item.storagePath.match(/^web:\/\/([^/]+)\/(.+)$/);
      if (match) await AsyncStorage.removeItem(webStorageKey(match[1], match[2]));
      return;
    }
    const info = await FileSystem.getInfoAsync(item.storagePath);
    if (info.exists) await FileSystem.deleteAsync(item.storagePath, { idempotent: true });
  } catch {
    /* ignore */
  }
}

export async function deleteAllEvidenceForAssessment(assessmentId: string): Promise<void> {
  if (Platform.OS === 'web') {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const prefix = `${WEB_EVIDENCE_KEY}${assessmentId}/`;
      const toRemove = keys.filter((k) => k.startsWith(prefix));
      if (toRemove.length) await AsyncStorage.multiRemove(toRemove);
    } catch {
      /* ignore */
    }
    return;
  }
  const dir = `${evidenceRoot()}${assessmentId}/`;
  try {
    const info = await FileSystem.getInfoAsync(dir);
    if (info.exists) await FileSystem.deleteAsync(dir, { idempotent: true });
  } catch {
    /* ignore */
  }
}

/** Append or replace one evidence item for a slot; merges with DB + optional in-memory list. */
export async function upsertAssessmentEvidenceItem(
  assessmentId: string,
  item: EvidenceItem,
  inMemoryEvidence?: EvidenceItem[]
): Promise<Assessment> {
  const targetSlot = itemSlotKey(item);
  return updateAssessmentEvidence(assessmentId, (dbItems) => {
    const base = mergeEvidenceItems(dbItems, inMemoryEvidence);
    return [...base.filter((e) => itemSlotKey(e) !== targetSlot), item];
  });
}

export async function removeAssessmentEvidenceItem(
  assessmentId: string,
  itemId: string
): Promise<Assessment> {
  return updateAssessmentEvidence(assessmentId, (items) => items.filter((e) => e.id !== itemId));
}

export function addEvidenceToAssessment(
  assessment: Assessment,
  item: EvidenceItem
): Assessment {
  const targetSlot = itemSlotKey(item);
  const evidence = [
    ...(assessment.evidence ?? []).filter((e) => itemSlotKey(e) !== targetSlot),
    item,
  ];
  return { ...assessment, evidence, updatedAt: new Date().toISOString() };
}

export function removeEvidenceFromAssessment(
  assessment: Assessment,
  itemId: string
): Assessment {
  const evidence = (assessment.evidence ?? []).filter((e) => e.id !== itemId);
  return { ...assessment, evidence, updatedAt: new Date().toISOString() };
}

export async function readEvidenceAsBase64(item: EvidenceItem): Promise<string | null> {
  try {
    if (item.storagePath.startsWith('web://')) {
      const match = item.storagePath.match(/^web:\/\/([^/]+)\/(.+)$/);
      if (!match) return null;
      return await AsyncStorage.getItem(webStorageKey(match[1], match[2]));
    }
    return await FileSystem.readAsStringAsync(item.storagePath, {
      encoding: FileSystem.EncodingType.Base64,
    });
  } catch {
    return null;
  }
}
