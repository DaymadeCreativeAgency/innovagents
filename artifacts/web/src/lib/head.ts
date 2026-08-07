import {
  DEFAULT_OG_IMAGE,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  getRouteMeta,
  jsonLdForRoute,
  pageUrl,
} from "@/lib/seo";

/**
 * Renders the <head> SEO block for a route as an HTML string.
 *
 * Used by `scripts/prerender.mjs` to bake per-route tags into the static HTML
 * that crawlers and AI bots read. The client-side equivalent lives in
 * `usePageMeta`, which reads the same registry.
 */

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** `</script` is the only sequence that can break out of a JSON-LD block. */
function escapeJsonLd(json: string): string {
  return json.replace(/</g, "\\u003c");
}

export function renderHead(path: string): string {
  const meta = getRouteMeta(path);
  const url = pageUrl(meta.path);
  const image = meta.image || DEFAULT_OG_IMAGE;

  const tags: string[] = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="robots" content="${meta.noIndex ? "noindex, follow" : "index, follow"}" />`,
    `<link rel="canonical" href="${escapeAttr(url)}" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    `<meta property="og:image" content="${escapeAttr(image)}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(image)}" />`,
    `<script type="application/ld+json">${escapeJsonLd(jsonLdForRoute(meta.path))}</script>`,
  ];

  return tags.join("\n    ");
}
