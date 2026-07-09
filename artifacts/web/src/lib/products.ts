import { APPX } from "@/components/layout-v2";

/**
 * Central source of truth for product conversion paths.
 *
 * Each product exposes:
 *  - `appxUrl`  → the normal AppExchange listing page ("View on AppExchange")
 *  - `trialUrl` → the AppExchange "Try It Now" sandbox install form
 *  - a set of CTAs (primary / secondary / optional tertiary) with the exact
 *    button copy and a unique tracking `verb` used to build event names.
 *
 * Event names are built as `${pagePrefix}_${slug}_${verb}_click`, e.g.
 * `homepage_edge_connect_trial_click` or `product_edge_connect_demo_click`.
 */

/** Andre's Calendly discovery / demo link — the demo path for the whole site. */
export const CALENDLY_URL =
  "https://calendly.com/andre-fernandes-innovagentsai/edge-connect-discovery-clone";

/** "Try It Now" sandbox install forms (collect the lead + start the trial). */
export const TRIAL = {
  enhancedFiles:
    "https://appexchange.salesforce.com/try?listingId=bae07232-1a00-4d9e-9f24-2ac1da068062&type=Sandbox",
  fieldHistoryTracking:
    "https://appexchange.salesforce.com/try?listingId=585cc05c-d49e-4ab7-8583-e4e3b2b85d25&type=Sandbox",
  splashAnnouncements:
    "https://appexchange.salesforce.com/try?listingId=670c3b7a-5a42-465e-8916-47289d357392&type=Sandbox",
  listViewExport:
    "https://appexchange.salesforce.com/try?listingId=2993f924-33e0-4ce5-9463-8ea3f149ab8c&type=Sandbox",
  edgeConnect:
    "https://appexchange.salesforce.com/try?listingId=d87ee483-c7b5-4eb4-bac3-802c9b24b70a&type=Sandbox",
} as const;

export type CtaKind = "trial" | "appexchange" | "demo";

export interface Cta {
  kind: CtaKind;
  /** Button copy. */
  label: string;
  /** Destination URL (always external / new tab for these). */
  href: string;
  /** Event verb segment, e.g. "trial", "get_free", "appexchange", "demo". */
  verb: string;
}

export interface ProductConfig {
  /** Event slug, e.g. "edge_connect". */
  slug: string;
  name: string;
  /** Marketing product page path. */
  path: string;
  appxUrl: string;
  trialUrl: string;
  /** Primary conversion action (free trial / get it free). */
  primary: Cta;
  /** Secondary action (view on AppExchange, or demo for Edge Connect). */
  secondary: Cta;
  /** Optional tertiary text link (Edge Connect gets an extra AppExchange link). */
  tertiary?: Cta;
}

const appExchangeCta = (href: string): Cta => ({
  kind: "appexchange",
  label: "View on AppExchange",
  href,
  verb: "appexchange",
});

export const DEMO_CTA: Cta = {
  kind: "demo",
  label: "Schedule Demo",
  href: CALENDLY_URL,
  verb: "demo",
};

export const PRODUCTS = {
  enhancedFiles: {
    slug: "enhanced_files",
    name: "Enhanced Files",
    path: "/products/enhanced-files",
    appxUrl: APPX.enhancedFiles,
    trialUrl: TRIAL.enhancedFiles,
    // Enhanced Files is genuinely free — send straight to the AppExchange
    // listing to install, no separate sandbox trial signup needed.
    primary: { kind: "appexchange", label: "Get It Free", href: APPX.enhancedFiles, verb: "get_free" },
    secondary: appExchangeCta(APPX.enhancedFiles),
  },
  splashAnnouncements: {
    slug: "splash",
    name: "Splash Announcements",
    path: "/products/splash-announcements",
    appxUrl: APPX.splashAnnouncements,
    trialUrl: TRIAL.splashAnnouncements,
    primary: { kind: "trial", label: "Start 7-Day Free Trial", href: TRIAL.splashAnnouncements, verb: "trial" },
    secondary: appExchangeCta(APPX.splashAnnouncements),
  },
  edgeConnect: {
    slug: "edge_connect",
    name: "Edge Connect",
    path: "/products/edge-connect",
    appxUrl: APPX.edgeConnect,
    trialUrl: TRIAL.edgeConnect,
    // Higher-consideration, technical product: trial + guided demo path.
    primary: { kind: "trial", label: "Start 30-Day Free Trial", href: TRIAL.edgeConnect, verb: "trial" },
    secondary: DEMO_CTA,
    tertiary: appExchangeCta(APPX.edgeConnect),
  },
  unlimitedFieldTracking: {
    slug: "unlimited_field_history",
    name: "Unlimited Field Tracking",
    path: "/products/unlimited-field-tracking",
    appxUrl: APPX.fieldHistoryTracking,
    trialUrl: TRIAL.fieldHistoryTracking,
    primary: { kind: "trial", label: "Start 7-Day Free Trial", href: TRIAL.fieldHistoryTracking, verb: "trial" },
    secondary: appExchangeCta(APPX.fieldHistoryTracking),
  },
  listViewExport: {
    slug: "list_view_export",
    name: "List View Export",
    path: "/products/list-view-export",
    appxUrl: APPX.listViewExport,
    trialUrl: TRIAL.listViewExport,
    primary: { kind: "trial", label: "Start 7-Day Free Trial", href: TRIAL.listViewExport, verb: "trial" },
    secondary: appExchangeCta(APPX.listViewExport),
  },
} satisfies Record<string, ProductConfig>;

export type ProductKey = keyof typeof PRODUCTS;

/** Build a unique event name for a CTA, e.g. `homepage_splash_trial_click`. */
export function ctaEvent(pagePrefix: string, slug: string, verb: string): string {
  return `${pagePrefix}_${slug}_${verb}_click`;
}

/** Product interest options for demo / contact forms. */
export const PRODUCT_INTEREST_OPTIONS = [
  "Enhanced Files",
  "Splash Announcements",
  "Edge Connect",
  "Unlimited Field History Tracking",
  "List View Export",
  "Not sure yet",
] as const;
