/**
 * Real AppExchange listing URLs.
 *
 * Kept in a React-free module so both the UI (`layout-v2`, `products`) and the
 * build-time SEO layer (`seo.ts`, consumed by the prerenderer) can import them
 * without pulling in components or image assets.
 */
export const APPX = {
  splashAnnouncements:
    "https://appexchange.salesforce.com/appxListingDetail?listingId=670c3b7a-5a42-465e-8916-47289d357392",
  enhancedFiles:
    "https://appexchange.salesforce.com/appxListingDetail?listingId=bae07232-1a00-4d9e-9f24-2ac1da068062",
  listViewExport:
    "https://appexchange.salesforce.com/appxListingDetail?listingId=2993f924-33e0-4ce5-9463-8ea3f149ab8c",
  edgeConnect:
    "https://appexchange.salesforce.com/appxListingDetail?listingId=d87ee483-c7b5-4eb4-bac3-802c9b24b70a",
  fieldHistoryTracking:
    "https://appexchange.salesforce.com/appxListingDetail?listingId=585cc05c-d49e-4ab7-8583-e4e3b2b85d25",
} as const;
