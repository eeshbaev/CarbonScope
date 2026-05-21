import * as Linking from 'expo-linking';
import * as StoreReview from 'expo-store-review';
import { Platform } from 'react-native';
import { STORE_CONFIG } from '../constants/store';

/** Opens the native in-app review dialog when available. */
export async function requestInAppReview(): Promise<boolean> {
  try {
    const available = await StoreReview.isAvailableAsync();
    if (available) {
      await StoreReview.requestReview();
      return true;
    }
    const hasAction = await StoreReview.hasAction();
    if (hasAction) {
      await StoreReview.requestReview();
      return true;
    }
  } catch {
    // Fall through to store listing.
  }
  return openStoreListing();
}

/** Opens the public store listing (fallback for simulators / web). */
export async function openStoreListing(): Promise<boolean> {
  try {
    const url = await StoreReview.storeUrl();
    if (url) {
      await Linking.openURL(url);
      return true;
    }
  } catch {
    // Use manual URLs below.
  }

  const { androidPackage, iosAppStoreId } = STORE_CONFIG;
  const manualUrl =
    Platform.OS === 'ios' && iosAppStoreId
      ? `https://apps.apple.com/app/id${iosAppStoreId}?action=write-review`
      : Platform.OS === 'android' && androidPackage
        ? `https://play.google.com/store/apps/details?id=${androidPackage}`
        : null;

  if (manualUrl) {
    await Linking.openURL(manualUrl);
    return true;
  }
  return false;
}
