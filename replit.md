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
- The `api-server` and `mockup-sandbox` artifacts are scaffold defaults and unused by this site (no backend needed).

## Architecture decisions

- Presentation-first marketing site with NO backend — newsletter and contact forms are client-side only (validate + success state, no persistence).
- Brand fonts: Barlow Condensed for headings (H1 = weight 900/Black, subheadings = weight 500/Medium), Inter for body (loaded via Google Fonts in `index.html`).
- Brand palette: indigo `#5555e6` (primary), coral `#fe907f` (accent), deep indigo `#413c64`, near-black `#161618`, warm light gray `#e6e1e1`, white.
- No logo file was supplied — header/footer use an "InnovAgents" text wordmark in Barlow Condensed Black. Swap in real logo files when provided.

## Product

A 5-page marketing site: Home (`/`), About Us (`/about`), Contact Us (`/contact`), and two product pages (`/products/splash-announcements`, `/products/enhanced-files`). Conveys InnovAgents' Salesforce-native AppExchange apps with featured products, value props, a newsletter signup, and a contact form.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
