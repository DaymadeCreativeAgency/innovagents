import { renderToString } from "react-dom/server";
import App from "./App";
import { renderHead } from "./lib/head";
import { PRERENDER_ROUTES, SITEMAP_ROUTES, SITE_URL, SITE_NAME, pageUrl } from "./lib/seo";

/**
 * Server entry used only by `scripts/prerender.mjs` at build time.
 *
 * It is never shipped to the browser — Vite builds it separately with
 * `--ssr` and the prerenderer imports the result from Node.
 */

export function render(path: string): { html: string; head: string } {
  return {
    html: renderToString(<App ssrPath={path} />),
    head: renderHead(path),
  };
}

export { PRERENDER_ROUTES, SITEMAP_ROUTES, SITE_URL, SITE_NAME, pageUrl };
