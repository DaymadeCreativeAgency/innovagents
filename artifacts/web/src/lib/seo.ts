import { APPX } from "@/lib/appexchange";
import { BLOG_BASE, POSTS, type Author, type BlogPost } from "@/lib/blog";

/**
 * Single source of truth for everything that goes in <head>.
 *
 * Both consumers read from `ROUTE_META`:
 *  - `scripts/prerender.mjs` bakes it into the static HTML for each route at
 *    build time (this is what crawlers and AI bots actually see)
 *  - `usePageMeta` re-applies it on client-side navigation
 *
 * If a route isn't listed here it won't be prerendered or in the sitemap, so
 * adding a page means adding an entry here and a <Route> in App.tsx.
 */

export const SITE_URL = "https://innovagentsai.com";
export const SITE_NAME = "InnovAgents";

/** 1200×630 social card. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-cover.png`;
export const OG_IMAGE_WIDTH = "1200";
export const OG_IMAGE_HEIGHT = "630";

/** Wordmark lockup — used as Organization.logo, not as the social card. */
export const LOGO_URL = `${SITE_URL}/og-image.png`;

export const SUPPORT_EMAIL = "support@innovagentsai.com";
export const LINKEDIN_URL = "https://www.linkedin.com/company/innovagents-ai";

/** Stable @id values so every graph node can reference the same entities. */
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BLOG_ID = `${SITE_URL}${BLOG_BASE}#blog`;

export const DEFAULT_DESCRIPTION =
  "Salesforce-native AppExchange apps for admins and ops teams: announcements, file management, CSV list view exports, field history, and integrations.";

export function pageUrl(path: string): string {
  // The root keeps its trailing slash so canonical, og:url, and sitemap <loc>
  // all agree on one spelling of the homepage.
  if (!path || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/* ───────────────────────── shared entities ───────────────────────── */

export const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 1000,
    height: 165,
  },
  image: DEFAULT_OG_IMAGE,
  email: SUPPORT_EMAIL,
  description:
    "InnovAgents builds affordable, 100% Salesforce-native apps for admins, IT leaders, and operations teams, distributed on the Salesforce AppExchange.",
  slogan: "Smarter Salesforce starts here",
  knowsAbout: [
    "Salesforce administration",
    "Salesforce AppExchange apps",
    "Salesforce field history tracking",
    "Salesforce file management",
    "Salesforce integrations",
    "Salesforce release communication",
  ],
  sameAs: [LINKEDIN_URL],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: SUPPORT_EMAIL,
    url: `${SITE_URL}/contact`,
    availableLanguage: ["English"],
  },
} as const;

export const WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  inLanguage: "en-US",
  publisher: { "@id": ORG_ID },
} as const;

/* ───────────────────────── product catalog ───────────────────────── */

export interface FaqItem {
  q: string;
  a: string;
}

interface ProductSeo {
  /** Marketing page path. */
  path: string;
  name: string;
  /** AppExchange listing (install / view). */
  appxUrl: string;
  /** Short capability list surfaced in SoftwareApplication.featureList. */
  featureList: string[];
  /** Free products get a priced Offer; paid ones omit it (price not published here). */
  free?: boolean;
  faq: FaqItem[];
}

export const PRODUCT_SEO: ProductSeo[] = [
  {
    path: "/products/splash-announcements",
    name: "Splash Announcements",
    appxUrl: APPX.splashAnnouncements,
    featureList: [
      "Smart redirect shows new announcements at login",
      "Instant or scheduled announcements with start and end dates",
      "Audience targeting by queue, public group, profile, and permission set",
      "Real-time acknowledgment tracking and reporting",
      "Urgent announcement alerts",
      "100% Salesforce native — no external services",
    ],
    faq: [
      {
        q: "What is Splash Announcements?",
        a: "Splash Announcements is a 100% Salesforce-native app that lets admins send targeted, scheduled in-app announcements across their org. Users see and acknowledge messages the moment they log in, and admins can track acknowledgments in real time.",
      },
      {
        q: "How do users see announcements in Salesforce?",
        a: "New announcements are shown through a smart redirect at login, so they appear front and center instead of getting lost in email. You can also send urgent alerts for messages that need immediate attention.",
      },
      {
        q: "Can I target announcements to specific teams?",
        a: "Yes. You can build reusable audiences from queues, public groups, profiles, and permission sets, so each message only reaches the people it applies to.",
      },
      {
        q: "Does Splash Announcements store data outside Salesforce?",
        a: "No. It is 100% Salesforce native, with no external services, and it respects your org's existing security model, profiles, and permissions.",
      },
      {
        q: "Is there a free trial?",
        a: "Yes. Splash Announcements offers a 7-day free trial you can start from its AppExchange listing, where current pricing is also shown.",
      },
    ],
  },
  {
    path: "/products/enhanced-files",
    name: "Enhanced Files",
    appxUrl: APPX.enhancedFiles,
    free: true,
    featureList: [
      "Download every file on a record in one click",
      "Scrollable files related list",
      "Instant search filter across record files",
      "Total file count indicator",
      "Administrator UI configuration",
      "Respects native Salesforce file permissions and sharing rules",
    ],
    faq: [
      {
        q: "What is Enhanced Files?",
        a: "Enhanced Files is a Salesforce-native app that upgrades the standard files related list with bulk downloads, instant search, smooth scrolling, and a live file count directly on the record page.",
      },
      {
        q: "How much does Enhanced Files cost?",
        a: "Enhanced Files is free. You can install it directly from its AppExchange listing — there is no trial period and no paid tier to upgrade to.",
      },
      {
        q: "Can I download all files on a record at once?",
        a: "Yes. Enhanced Files adds a one-click download for every file attached to a record, instead of downloading them one at a time.",
      },
      {
        q: "Does Enhanced Files respect Salesforce file permissions?",
        a: "Yes. It runs natively inside Salesforce and honors all standard file permissions and sharing rules. There are no external servers and no API limits to manage.",
      },
    ],
  },
  {
    path: "/products/list-view-export",
    name: "List View Export",
    appxUrl: APPX.listViewExport,
    featureList: [
      "Export any Salesforce list view directly to CSV",
      "Works across all standard and custom objects",
      "Record count preview before export",
      "Supports large data volumes",
      "Follows list view visibility and field-level security",
      "One-click export from the list view toolbar",
    ],
    faq: [
      {
        q: "What is List View Export?",
        a: "List View Export is a Salesforce-native app that exports any list view straight to a CSV file, without rebuilding the same filters as a report.",
      },
      {
        q: "Do I need to build a report to export list view data?",
        a: "No. You export directly from the list view toolbar, and the CSV matches exactly what the list view already shows.",
      },
      {
        q: "Which objects does List View Export support?",
        a: "All standard and custom objects, with no additional per-object setup.",
      },
      {
        q: "Does exporting bypass field-level security?",
        a: "No. Exports follow list view visibility and field-level security automatically, so users only export data they already have access to.",
      },
      {
        q: "Is there a free trial?",
        a: "Yes. List View Export offers a 7-day free trial you can start from its AppExchange listing.",
      },
    ],
  },
  {
    path: "/products/edge-connect",
    name: "Edge Connect",
    appxUrl: APPX.edgeConnect,
    featureList: [
      "200+ prebuilt connectors",
      "Drag-and-drop integration flow designer",
      "Custom connectors written in JavaScript",
      "Reusable integration templates",
      "Full request logs and error monitoring",
      "Runs natively in Salesforce — no middleware to host",
    ],
    faq: [
      {
        q: "What is Edge Connect?",
        a: "Edge Connect is a low-code integration platform that runs inside Salesforce. Admins and developers design, build, test, and deploy integrations using a drag-and-drop flow designer instead of external middleware.",
      },
      {
        q: "Do I need middleware to use Edge Connect?",
        a: "No. Everything runs natively inside your Salesforce org, so there is no separate integration platform to host, secure, or license.",
      },
      {
        q: "How many connectors does Edge Connect include?",
        a: "Over 200 prebuilt connectors, plus the ability to build custom connectors in JavaScript directly inside the platform.",
      },
      {
        q: "Can I monitor and troubleshoot integrations?",
        a: "Yes. Full request logs and error visibility show what ran, when, and why, so failures are traceable without guesswork.",
      },
      {
        q: "Is there a free trial?",
        a: "Yes. Edge Connect offers a 30-day free trial from its AppExchange listing. You can also book a discovery call to review your integration requirements first.",
      },
    ],
  },
  {
    path: "/products/unlimited-field-tracking",
    name: "Unlimited Field Tracking",
    appxUrl: APPX.fieldHistoryTracking,
    featureList: [
      "Track field history beyond standard Salesforce field limits",
      "Complete change timeline with old value, new value, user, and timestamp",
      "Searchable audit history by object, field, user, or time period",
      "Admin-friendly configuration with no custom code",
      "Long-term retention of business-critical changes",
      "Runs inside Salesforce and respects your existing access model",
    ],
    faq: [
      {
        q: "What is Unlimited Field Tracking?",
        a: "Unlimited Field Tracking is a Salesforce-native app that records field change history beyond the platform's standard field history limits, with a searchable timeline showing who changed what, when, and from which value.",
      },
      {
        q: "Why not just use standard Salesforce field history?",
        a: "Standard field history caps how many fields you can track per object, which forces teams to choose which critical fields get audit coverage. Unlimited Field Tracking removes that tradeoff.",
      },
      {
        q: "Can I search past field changes?",
        a: "Yes. You can filter change history by object, field, user, or time period instead of digging through scattered related lists.",
      },
      {
        q: "Where is the tracked history stored?",
        a: "Inside your own Salesforce org. The app runs natively and respects your existing access model, so no external tracking tool holds your data.",
      },
      {
        q: "Is there a free trial?",
        a: "Yes. Unlimited Field Tracking offers a 7-day free trial from its AppExchange listing.",
      },
    ],
  },
];

export const PRODUCT_SEO_BY_PATH: Record<string, ProductSeo> = Object.fromEntries(
  PRODUCT_SEO.map((p) => [p.path, p]),
);

/* ───────────────────────── schema builders ───────────────────────── */

type Json = Record<string, unknown>;

function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: pageUrl(crumb.path),
    })),
  };
}

function faqSchema(faq: FaqItem[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function softwareApplicationSchema(product: ProductSeo, description: string): Json {
  const schema: Json = {
    "@type": "SoftwareApplication",
    "@id": `${pageUrl(product.path)}#software`,
    name: product.name,
    url: pageUrl(product.path),
    description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Salesforce AppExchange application",
    operatingSystem: "Salesforce (web-based)",
    installUrl: product.appxUrl,
    featureList: product.featureList,
    publisher: { "@id": ORG_ID },
    provider: { "@id": ORG_ID },
    isAccessibleForFree: Boolean(product.free),
  };
  // Only Enhanced Files has a price we can state. Paid apps publish pricing on
  // their AppExchange listing, so we link the offer rather than invent a number.
  if (product.free) {
    schema.offers = {
      "@type": "Offer",
      url: product.appxUrl,
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    };
  }
  return schema;
}

/* ───────────────────────── route registry ───────────────────────── */

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  image: string;
  noIndex: boolean;
  /** Excluded from sitemap.xml and llms.txt when false. */
  inSitemap: boolean;
  /**
   * Sitemap <lastmod>. Set for content that knows its own date (blog posts);
   * the prerenderer falls back to the source file's last commit date.
   */
  lastmod?: string;
  /** Route-specific JSON-LD nodes, merged into the site-wide @graph. */
  graph: Json[];
}

interface RouteInput {
  path: string;
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  inSitemap?: boolean;
  lastmod?: string;
  breadcrumb?: { name: string; path: string }[];
  graph?: Json[];
}

function route(input: RouteInput): RouteMeta {
  const graph = [...(input.graph ?? [])];
  if (input.breadcrumb) graph.push(breadcrumbSchema(input.breadcrumb));
  return {
    path: input.path,
    title: input.title,
    description: input.description,
    image: input.image ?? DEFAULT_OG_IMAGE,
    noIndex: input.noIndex ?? false,
    inSitemap: input.inSitemap ?? !input.noIndex,
    lastmod: input.lastmod,
    graph,
  };
}

/** Company byline resolves to the Organization node; a person gets their own. */
function authorSchema(author: Author): Json {
  if (author.organization) return { "@id": ORG_ID };
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#author-${author.id}`,
    name: author.name,
    worksFor: { "@id": ORG_ID },
    // Only claim a role once a real one is on file.
    ...(author.title ? { jobTitle: author.title } : {}),
    ...(author.url ? { sameAs: [author.url] } : {}),
  };
}

function blogPostingSchema(post: BlogPost): Json {
  const url = pageUrl(post.path);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    wordCount: post.words,
    inLanguage: "en-US",
    author: authorSchema(post.author),
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": BLOG_ID },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    image: DEFAULT_OG_IMAGE,
  };
}

function blogPostRoute(post: BlogPost): RouteMeta {
  return route({
    path: post.path,
    title: post.title,
    description: post.description,
    lastmod: post.updated ?? post.date,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Blog", path: BLOG_BASE },
      { name: post.title, path: post.path },
    ],
    graph: [blogPostingSchema(post)],
  });
}

function productRoute(path: string, title: string, description: string): RouteMeta {
  const product = PRODUCT_SEO_BY_PATH[path];
  return route({
    path,
    title,
    description,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: product.name, path },
    ],
    graph: [
      softwareApplicationSchema(product, description),
      faqSchema(product.faq),
    ],
  });
}

const ROUTES: RouteMeta[] = [
  route({
    path: "/",
    title: "Salesforce-Native AppExchange Apps for Admins | InnovAgents",
    description: DEFAULT_DESCRIPTION,
    graph: [
      {
        "@type": "ItemList",
        name: "InnovAgents Salesforce apps",
        itemListElement: PRODUCT_SEO.map((product, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: pageUrl(product.path),
          name: product.name,
        })),
      },
    ],
  }),
  route({
    path: "/about",
    title: "About InnovAgents — Salesforce App Builders",
    description:
      "InnovAgents builds Salesforce-native AppExchange apps from real consulting experience — filling platform gaps without heavy setup or enterprise pricing.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about" },
    ],
    graph: [{ "@type": "AboutPage", url: pageUrl("/about"), name: "About InnovAgents" }],
  }),
  route({
    path: "/contact",
    title: "Contact InnovAgents — Salesforce App Support",
    description:
      "Questions about InnovAgents apps or your Salesforce org? Contact our team — real people, fast replies. Email support@innovagentsai.com or send a message.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Contact Us", path: "/contact" },
    ],
    graph: [
      {
        "@type": "ContactPage",
        url: pageUrl("/contact"),
        name: "Contact InnovAgents",
        mainEntity: { "@id": ORG_ID },
      },
    ],
  }),
  route({
    path: "/privacy-policy",
    title: "Privacy Policy | InnovAgents",
    description:
      "InnovAgents privacy policy — how we collect, use, and protect your information when you visit our site, subscribe to updates, or contact us.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy-policy" },
    ],
  }),
  productRoute(
    "/products/splash-announcements",
    "Splash Announcements — Salesforce In-App Announcements",
    "Send targeted, scheduled in-app announcements across your Salesforce org and track acknowledgments in real time. 100% native. Free 7-day trial on AppExchange.",
  ),
  productRoute(
    "/products/enhanced-files",
    "Enhanced Files — Salesforce Files Related List App",
    "Upgrade the Salesforce files related list with bulk downloads, instant search, smart previews, and live file counts on every record page. Free on AppExchange.",
  ),
  productRoute(
    "/products/list-view-export",
    "List View Export — Export Salesforce List Views to CSV",
    "Export any Salesforce list view to CSV in one click — no reports, no rebuilt filters. Works on every standard and custom object. Free 7-day trial.",
  ),
  productRoute(
    "/products/edge-connect",
    "Edge Connect — Low-Code Salesforce Integration Platform",
    "Build Salesforce integrations with a drag-and-drop flow designer and 200+ prebuilt connectors — no middleware to host. Free 30-day trial on AppExchange.",
  ),
  productRoute(
    "/products/unlimited-field-tracking",
    "Unlimited Field Tracking — Salesforce Field History",
    "Track Salesforce field history beyond the standard per-object limit, with a searchable audit timeline of who changed what and when. Free 7-day trial.",
  ),
  route({
    path: BLOG_BASE,
    title: "Salesforce Admin Guides and Platform Limits | InnovAgents",
    description:
      "Practical guides for Salesforce admins on field history, exports, file management, org communication, and integrations, written by the team behind the apps.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Blog", path: BLOG_BASE },
    ],
    graph: [
      {
        "@type": "Blog",
        "@id": BLOG_ID,
        url: pageUrl(BLOG_BASE),
        name: "InnovAgents Blog",
        description: "Guides for Salesforce admins on working around platform limits.",
        publisher: { "@id": ORG_ID },
        inLanguage: "en-US",
      },
    ],
  }),
  ...POSTS.map(blogPostRoute),
  route({
    path: "/404",
    title: "Page Not Found | InnovAgents",
    description:
      "The page you're looking for doesn't exist. Browse InnovAgents Salesforce apps on AppExchange.",
    noIndex: true,
  }),
];

export const ROUTE_META: Record<string, RouteMeta> = Object.fromEntries(
  ROUTES.map((r) => [r.path, r]),
);

/** Every indexable route, in sitemap order. */
export const SITEMAP_ROUTES = ROUTES.filter((r) => r.inSitemap);

/** Routes the prerenderer emits HTML for (includes the noindex 404 shell). */
export const PRERENDER_ROUTES = ROUTES;

/**
 * Reduces a browser location to a registry key: drops any query string, hash,
 * and trailing slash. Without this, `/products/enhanced-files/` would miss the
 * registry and render a page whose visible FAQ and FAQPage JSON-LD disagree.
 */
export function normalizePath(path: string): string {
  const clean = (path || "/").split(/[?#]/)[0].replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

export function getRouteMeta(path: string): RouteMeta {
  return ROUTE_META[normalizePath(path)] ?? ROUTE_META["/404"];
}

export function getProductSeo(path: string) {
  return PRODUCT_SEO_BY_PATH[normalizePath(path)];
}

/**
 * The full JSON-LD @graph for a route: shared entities plus route-specific
 * nodes. One script tag per page keeps every node cross-referenced by @id.
 */
export function jsonLdForRoute(path: string): string {
  const meta = getRouteMeta(path);
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION_SCHEMA,
      WEBSITE_SCHEMA,
      {
        "@type": "WebPage",
        "@id": `${pageUrl(meta.path)}#webpage`,
        url: pageUrl(meta.path),
        name: meta.title,
        description: meta.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        inLanguage: "en-US",
      },
      ...meta.graph,
    ],
  });
}
