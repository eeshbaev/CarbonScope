import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const WORKSPACES_KEY = '@carbonscope/workspaces';
const ACTIVE_WORKSPACE_KEY = '@carbonscope/active_workspace';
const PASSCODE_KEY = 'carbonscope_consultant_passcode';

export const DEFAULT_WORKSPACE_ID = 'default';

/** Legacy: all assessments use the default workspace. */
export async function getActiveWorkspaceId(): Promise<string> {
  return DEFAULT_WORKSPACE_ID;
}

/** Clears legacy workspace / passcode storage from older app versions. */
export async function clearWorkspaceData(): Promise<void> {
  await AsyncStorage.multiRemove([WORKSPACES_KEY, ACTIVE_WORKSPACE_KEY]);
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(PASSCODE_KEY);
    } else {
      await SecureStore.deleteItemAsync(PASSCODE_KEY);
    }
  } catch {
    /* ignore */
  }
}
