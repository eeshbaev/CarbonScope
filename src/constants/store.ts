/** Update after App Store / Play Console listing is live. */
export const STORE_CONFIG = {
  androidPackage: 'com.carbonscope.app',
  iosBundleId: 'com.carbonscope.app',
  /** Numeric App Store ID (e.g. from App Store Connect). */
  iosAppStoreId: '',
  /** Support / privacy contact — also use in Play Console and App Store Connect. */
  supportEmail: 'eeshbaev@outlook.com',
  /**
   * Public privacy policy URL for Google Play / App Store Connect.
   * Hosted via GitHub Pages from the /docs folder.
   * If your GitHub username or repo name differs, update this URL to match.
   */
  privacyPolicyUrl: 'https://eeshbaev.github.io/CarbonScope/privacy/',
} as const;
