/** Salesforce Web-to-Lead configuration generated for the InnovAgents org. */
export const SALESFORCE_WEB_TO_LEAD_URL =
  "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DfK00000K7YNk";

export const SALESFORCE_ORG_ID = "00DfK00000K7YNk";
export const SALESFORCE_PRODUCT_INTEREST_FIELD = "00Nam000019ZcRP";
export const SALESFORCE_RECAPTCHA_SITE_KEY =
  "6LesmY4tAAAAAB1KpCP8CZOtjcjzEtIMDCYc7CH4";
export const SALESFORCE_RETURN_URL =
  "https://innovagentsai.com/contact?submitted=true";

export const SALESFORCE_CAPTCHA_SETTINGS = JSON.stringify({
  keyname: "InnovAgents",
  fallback: "true",
  orgId: SALESFORCE_ORG_ID,
  ts: "",
});

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
