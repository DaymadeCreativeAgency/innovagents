# InnovAgents

Marketing website for InnovAgents — a company that builds affordable, Salesforce-native AppExchange apps for admins, IT leaders, and operations teams.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/web/` — the InnovAgents marketing site (React + Vite, wouter routing). This is the only product artifact.
- `artifacts/web/src/index.css` — theme tokens (brand colors as HSL) and `@font-face` declarations for Barlow Condensed.
- `artifacts/web/public/fonts/` — Barlow Condensed `.ttf` weights served at `/fonts/*`.
- `artifacts/web/src/lib/seo.ts` — **the SEO source of truth.** Per-route title, description, canonical, OG image, and JSON-LD graph, plus the product FAQ copy. Adding a page means adding an entry here *and* a `<Route>` in `App.tsx`, or it won't be prerendered, sitemapped, or listed in `llms.txt`.
- `artifacts/web/src/lib/head.ts` — renders that registry to `<head>` HTML at build time; `src/hooks/use-page-meta.ts` is the client-side twin for SPA navigation. Keep the two in step.
- `artifacts/web/scripts/prerender.mjs` — post-build step that writes one static HTML file per route plus `sitemap.xml`, `llms.txt`, and `llms-full.txt`.
- `artifacts/web/src/content/blog/*.md` — blog posts. Dropping a markdown file here is the only step needed to publish: `src/lib/blog.ts` picks it up, and routes, sitemap, `llms.txt`, and `BlogPosting` JSON-LD all follow automatically.
- `artifacts/web/vite-plugin-markdown.ts` — compiles those `.md` files to HTML at build time, so `marked` stays a devDependency and never ships to the browser.
- The `api-server` and `mockup-sandbox` artifacts are scaffold defaults and unused by this site (no backend needed).

## Architecture decisions

- Presentation-first marketing site with NO backend — newsletter and contact forms are client-side only (validate + success state, no persistence).
- **The site is prerendered, not a plain SPA.** `pnpm --filter @workspace/web run build` runs three steps: client build → SSR build (`src/entry-server.tsx`) → `scripts/prerender.mjs`. The output is one real HTML file per route (`dist/about/index.html`, …) with the page body and its own head tags baked in, because crawlers and AI bots read HTML rather than running JavaScript. React then hydrates that markup.
- Because of the above, `vercel.json` has **no SPA catch-all rewrite**. Vercel serves each prerendered file directly and unmatched paths get `dist/404.html` with a real 404 status. Re-adding a `/(.*)  → /index.html` rewrite would give every URL the homepage's title and canonical again, which is what previously de-indexed the product pages.
- Brand fonts: Barlow Condensed for headings (H1 = weight 900/Black, subheadings = weight 500/Medium), Inter for body (loaded via Google Fonts in `index.html`).
- Brand palette: indigo `#5555e6` (primary), coral `#fe907f` (accent), deep indigo `#413c64`, near-black `#161618`, warm light gray `#e6e1e1`, white.
- Logo files live in `attached_assets/`. Header uses `InnovAgents-Main-Lockup-2color_*.png` (coral mark + blue wordmark, for light backgrounds). Footer uses `InnovAgents-Main-Lockup-white_*.png` (all-white, for dark backgrounds). Imported via the `@assets` Vite alias.

## Product

A 9-page marketing site: Home (`/`), About Us (`/about`), Contact Us (`/contact`), Privacy Policy (`/privacy-policy`), and five product pages under `/products/` (Splash Announcements, Enhanced Files, List View Export, Edge Connect, Unlimited Field Tracking). Conveys InnovAgents' Salesforce-native AppExchange apps with featured products, value props, per-product FAQs, a newsletter signup, and a contact form.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Writing blog posts

- Required front matter: `title`, `description`, `date` (ISO). Optional: `author` (a key from `AUTHORS` in `src/lib/blog.ts`), `updated`, `product` (a product page path, which renders the CTA at the foot of the post), `cluster` (groups related posts), `pillar: true` (adds a contents list; one per cluster).
- Authors alternate between `andre` and `pedro` in publication order. Neither has a `title` set, so `Person` schema carries name and employer only. Add real credentials to `AUTHORS` rather than inventing them: an author box a reader can check is the point of the byline.
- Markdown tables are wrapped in `.md-table-scroll` at build time. `html` has `overflow-x: hidden`, so an unwrapped wide table gets clipped on mobile with no way to scroll to the rest.
- All posts are written under the [humanizer framework](https://github.com/blader/humanizer). The hard constraints: no em or en dashes anywhere, sentence-case headings, straight quotes, no AI-vocabulary words (crucial, pivotal, showcase, landscape, testament, seamless, and the rest of the §7 list), no rule-of-three padding, no bold-header bullet lists, and no generic upbeat closers. Never state a fact that isn't in a cited source.
- Open with the direct answer in the first 40 to 60 words. That serves the reader, and it is also what makes a page quotable by AI search.
- Every post links to its cluster siblings and its product page. The template adds sibling links automatically; put the in-body ones where they actually help.

## Gotchas

- `sitemap.xml`, `llms.txt`, and `llms-full.txt` are **generated** into `dist/` by `scripts/prerender.mjs`. Don't add static copies to `public/` — they'd be silently overwritten. `robots.txt` is still a static file in `public/`.
- Product FAQ copy lives in `PRODUCT_SEO` in `src/lib/seo.ts`, not in the page components. The visible Q&A and the `FAQPage` JSON-LD both read from it; Google requires them to match.
- `vite.config.ts` skips `manualChunks` for the SSR build — Rollup errors out if you try to chunk modules it externalizes.
- Above-the-fold hero entrances use the `.ia-rise` CSS class (`index.css`), **not** framer-motion. framer-motion writes its `initial` values as inline styles during prerender, which left the LCP heading at `opacity: 0` until hydration. Keep heroes on `.ia-rise`; scroll-triggered sections below the fold can stay on framer-motion.
- The CSP in `vercel.json` is deliberately permissive on `script-src`/`connect-src`/`frame-src` (`https:`). GTM fires Google Ads conversion beacons to regional Google TLDs, so a tight allowlist silently breaks conversion tracking — this was verified, not assumed. The strict parts that *do* carry weight are `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'self'`, and `form-action` (locked to Formspree + Mailchimp). If you tighten `script-src`, re-test with the Calendly embed on `/contact` and the Mailchimp newsletter, which loads over **JSONP** (a script tag, not fetch).

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
