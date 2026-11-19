# Codex instructions — Smoky Mountain Trading Co. HEADLESS
- **Stack locked:** Next.js App Router + Shopify Storefront API, Shopify hosted checkout. Do not build or submit a Liquid theme or use the older Supply Co. kickoff.
- Read `docs/KICKOFF.md`, `docs/BRAND.md`, `docs/ACCEPTANCE.md` before editing.
- Keep original logo at `public/brand/smoky-mountain-trading-co-logo.jpg` uncropped; mobile exactly `65vw` width preserving 3:1 ratio.
- **No public order flow until real Shopify access, published verified SKUs, tax/shipping and bundle fulfillment have been validated.**
- Server-only Shopify private token; never commit `.env` or use `NEXT_PUBLIC_` for the private token.
- Shopify owns catalog, variants, prices, stock, carts, checkout and order processing. No fake local pricing or self-hosted checkout.
- Preserve the cream masthead, forest-green nav, oxblood CTA, product-first merchandising, craft story, and holiday colors.
- Historic Supply Co. product photos are in `reference/concept-legacy/`, deliberately NOT `public/`. Do not republish without rebranding and provenance review.
- On each PR: tests, responsive screenshots (390,768,1440), security and commerce checks, rollback, blocked integrations. No publish or production store change.
