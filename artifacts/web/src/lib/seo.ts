export const SITE_URL = "https://innovagentsai.com";
export const SITE_NAME = "InnovAgents";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const DEFAULT_DESCRIPTION =
  "Powerful Salesforce-native apps built by veterans. Streamline release comms, file management, list exports, and integrations — install in minutes on AppExchange.";

export const PAGE_DESCRIPTIONS = {
  home: DEFAULT_DESCRIPTION,
  about:
    "InnovAgents builds Salesforce-native apps from real consulting experience. Learn how we help admins and IT teams fill platform gaps without heavy setup or enterprise pricing.",
  contact:
    "Questions about InnovAgents apps or your Salesforce org? Contact our team — real people, fast replies. Email support@innovagentsai.com or send a message.",
  notFound: "The page you're looking for doesn't exist. Browse InnovAgents Salesforce apps on AppExchange.",
} as const;

export function pageUrl(path: string): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
