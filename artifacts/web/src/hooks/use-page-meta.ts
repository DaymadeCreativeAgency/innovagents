import { useEffect } from "react";
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
 * Keeps <head> in sync during client-side navigation.
 *
 * The first paint of every route is already correct — `scripts/prerender.mjs`
 * bakes the same tags into the static HTML from the same `ROUTE_META` registry.
 * This only matters once wouter takes over routing, but it must stay in step
 * with `renderHead` in `lib/head.ts` or SPA navigation will drift from the
 * prerendered truth.
 */

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Replaces the JSON-LD block rather than appending a second, stale one. */
function upsertJsonLd(json: string) {
  let el = document.querySelector('script[type="application/ld+json"]');
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    document.head.appendChild(el);
  }
  el.textContent = json;
}

export function usePageMeta(path: string) {
  useEffect(() => {
    const meta = getRouteMeta(path);
    const url = pageUrl(meta.path);
    const image = meta.image || DEFAULT_OG_IMAGE;

    document.title = meta.title;

    upsertMeta("name", "description", meta.description);
    upsertMeta("name", "robots", meta.noIndex ? "noindex, follow" : "index, follow");

    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:locale", "en_US");
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:width", OG_IMAGE_WIDTH);
    upsertMeta("property", "og:image:height", OG_IMAGE_HEIGHT);
    upsertMeta("property", "og:image:alt", `${SITE_NAME} — ${meta.title}`);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);
    upsertMeta("name", "twitter:image", image);

    upsertLink("canonical", url);
    upsertJsonLd(jsonLdForRoute(meta.path));
  }, [path]);
}
