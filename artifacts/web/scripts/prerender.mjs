/**
 * Build-time prerenderer.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server) and turns
 * the single-page shell into one real HTML file per route, each with its own
 * <title>, description, canonical, Open Graph tags, JSON-LD, and — critically —
 * the fully rendered page body. Crawlers and AI bots read HTML, not JavaScript.
 *
 * Also emits sitemap.xml, llms.txt, and llms-full.txt from the same registry so
 * they can't drift from the routes that actually exist.
 *
 * Usage: node scripts/prerender.mjs
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const HEAD_START = "<!--seo-head-start-->";
const HEAD_END = "<!--seo-head-end-->";
const APP_SLOT = "<!--app-html-->";

/** Source file whose last commit date represents each route's content. */
const ROUTE_SOURCE = {
  "/": "src/pages/home.tsx",
  "/about": "src/pages/about.tsx",
  "/contact": "src/pages/contact.tsx",
  "/privacy-policy": "src/pages/privacy-policy.tsx",
  "/products/splash-announcements": "src/pages/products/splash-announcements.tsx",
  "/products/enhanced-files": "src/pages/products/enhanced-files.tsx",
  "/products/list-view-export": "src/pages/products/list-view-export.tsx",
  "/products/edge-connect": "src/pages/products/edge-connect.tsx",
  "/products/unlimited-field-tracking": "src/pages/products/unlimited-field-tracking.tsx",
};

const buildDate = new Date().toISOString().slice(0, 10);

/**
 * Last commit date for a route's source, so <lastmod> reflects real content
 * changes instead of "everything changed" on every deploy. Falls back to the
 * build date when git isn't available (e.g. a shallow CI checkout).
 */
function lastModified(route) {
  const routePath = route.path;
  // Blog posts carry their own date in front matter; trust that over git.
  if (route.lastmod) return route.lastmod;
  const file = ROUTE_SOURCE[routePath];
  if (!file) return buildDate;
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out ? out.slice(0, 10) : buildDate;
  } catch {
    return buildDate;
  }
}

/** Where a route's HTML file lands inside dist/. */
function outputFile(routePath) {
  if (routePath === "/") return join(distDir, "index.html");
  // Vercel serves dist/404.html for unmatched paths, with a 404 status.
  if (routePath === "/404") return join(distDir, "404.html");
  return join(distDir, routePath.replace(/^\//, ""), "index.html");
}

/** Plain text of a rendered page, for llms-full.txt. */
function htmlToText(html) {
  return html
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/(p|div|section|li|h[1-6]|tr)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, "—")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

const template = readFileSync(join(distDir, "index.html"), "utf8");

if (!template.includes(HEAD_START) || !template.includes(APP_SLOT)) {
  throw new Error(
    "dist/index.html is missing the prerender markers. Check that index.html still " +
      `contains ${HEAD_START} … ${HEAD_END} and ${APP_SLOT}.`,
  );
}

const server = await import(pathToFileURL(join(ssrDir, "entry-server.js")).href);
const { render, PRERENDER_ROUTES, SITEMAP_ROUTES, SITE_URL, SITE_NAME, pageUrl } = server;

const headStart = template.indexOf(HEAD_START);
const headEnd = template.indexOf(HEAD_END) + HEAD_END.length;
const beforeHead = template.slice(0, headStart);
const afterHead = template.slice(headEnd);

const pageText = new Map();

for (const route of PRERENDER_ROUTES) {
  const { html, head } = render(route.path);
  const document = (beforeHead + head + afterHead).replace(APP_SLOT, html);

  const file = outputFile(route.path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, document);

  pageText.set(route.path, htmlToText(html));
  console.log(`  prerendered ${route.path.padEnd(36)} → ${file.replace(`${root}/`, "")}`);
}

/* ── sitemap.xml ── */

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  // <priority> and <changefreq> are ignored by Google and Bing — omitted on purpose.
  ...SITEMAP_ROUTES.map(
    (route) =>
      `  <url>\n    <loc>${pageUrl(route.path)}</loc>\n    <lastmod>${lastModified(route)}</lastmod>\n  </url>`,
  ),
  "</urlset>",
  "",
].join("\n");

writeFileSync(join(distDir, "sitemap.xml"), sitemap);
console.log(`  wrote sitemap.xml (${SITEMAP_ROUTES.length} urls)`);

/* ── llms.txt — the index AI crawlers read first ── */

const productRoutes = SITEMAP_ROUTES.filter((r) => r.path.startsWith("/products/"));
const blogRoutes = SITEMAP_ROUTES.filter((r) => r.path.startsWith("/blog/"));
const otherRoutes = SITEMAP_ROUTES.filter(
  (r) => !r.path.startsWith("/products/") && !r.path.startsWith("/blog/") && r.path !== "/",
);

const llms = [
  `# ${SITE_NAME}`,
  "",
  "> InnovAgents builds affordable, 100% Salesforce-native apps for admins, IT leaders,",
  "> and operations teams. Every app is distributed on the Salesforce AppExchange and runs",
  "> inside your own org — no external services, no middleware to host.",
  "",
  "## Products",
  "",
  ...productRoutes.map((r) => `- [${r.title.split(" — ")[0]}](${pageUrl(r.path)}): ${r.description}`),
  "",
  "## Guides",
  "",
  ...blogRoutes.map((r) => `- [${r.title}](${pageUrl(r.path)}): ${r.description}`),
  "",
  "## Company",
  "",
  `- [Home](${pageUrl("/")}): ${SITEMAP_ROUTES[0].description}`,
  ...otherRoutes.map((r) => `- [${r.title.split(/ [—|] /)[0]}](${pageUrl(r.path)}): ${r.description}`),
  "",
  "## Optional",
  "",
  `- [Full site text](${SITE_URL}/llms-full.txt): Complete text of every page on this site.`,
  "",
].join("\n");

writeFileSync(join(distDir, "llms.txt"), llms);

/* ── llms-full.txt — complete page text, extracted from the rendered HTML ── */

const llmsFull = [
  `# ${SITE_NAME} — full site text`,
  "",
  `> Generated at build time from ${SITE_URL}. Last updated ${buildDate}.`,
  "",
  ...SITEMAP_ROUTES.flatMap((route) => [
    "---",
    "",
    `# ${route.title}`,
    `URL: ${pageUrl(route.path)}`,
    "",
    pageText.get(route.path) ?? "",
    "",
  ]),
].join("\n");

writeFileSync(join(distDir, "llms-full.txt"), llmsFull);
console.log("  wrote llms.txt + llms-full.txt");

/* The SSR bundle is a build artifact — never ship it. */
rmSync(ssrDir, { recursive: true, force: true });

console.log(`\n✓ prerendered ${PRERENDER_ROUTES.length} routes`);
