/** Salesforce Web-to-Lead configuration generated for the InnovAgents org. */
export const SALESFORCE_WEB_TO_LEAD_URL =
  "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DfK00000K7YNk";

export const SALESFORCE_ORG_ID = "00DfK00000K7YNk";
export const SALESFORCE_PRODUCT_INTEREST_FIELD = "00Nam000019ZcRP";
export const SALESFORCE_RECAPTCHA_SITE_KEY =
  "6LesmY4tAAAAAB1KpCP8CZOtjcjzEtIMDCYc7CH4";
export const SALESFORCE_RETURN_URL =
  "https://innovagentsai.com/contact?submitted=true";

/**
 * Salesforce validates `ts` as a freshness token; an empty or stale value makes
 * it silently discard the lead while still honouring retURL. Build this at
 * submit time rather than mutating the DOM on a timer -- React re-renders
 * (e.g. the reCAPTCHA callback setting state) clobber imperative writes.
 */
export function salesforceCaptchaSettings(now: number = Date.now()): string {
  return JSON.stringify({
    keyname: "InnovAgents",
    fallback: "true",
    orgId: SALESFORCE_ORG_ID,
    ts: JSON.stringify(now),
  });
}

export const SALESFORCE_CAPTCHA_SETTINGS = salesforceCaptchaSettings();

/** Submit the exact picklist values configured in Salesforce. */
const SALESFORCE_PRODUCT_VALUES: Record<string, string> = {
  "Enhanced Files": "Enhanced Files List",
  "Splash Announcements": "Splash Announcements",
  "Edge Connect": "Edge Connect",
  "Unlimited Field History Tracking": "Unlimited Field History Tracking",
  "List View Export": "List View Export",
  "Not sure yet": "Not Sure Yet",
};

export function salesforceProductValue(productInterest: string): string {
  return SALESFORCE_PRODUCT_VALUES[productInterest] ?? productInterest;
}

export function salesforceDescription(
  subject: string,
  message: string,
): string {
  return `Subject: ${subject.trim()}\n\nMessage:\n${message.trim()}`;
}
