# Smoky Mountain Trading Co. — Next.js + Shopify headless starter
**This is the replacement for the Liquid-theme Codex kickoff.** Shopify remains the backend for products, inventory, carts, orders, taxes, shipping and hosted checkout. Next.js owns frontend design, page rendering, server actions and data orchestration.

## Run
```
cp .env.example .env.local
npm install
npm test
npm run typecheck
npm run build
npm run dev
```
Set real Headless sales channel values in `.env.local` only when the development store is available. An unconfigured site shows a **not open for orders** placeholder; it does not invent products or pricing. `npm run dev` is a local design preview, not a deployed store.

## Scope
Pages: `/` merchandising, `/collections/[handle]`, `/products/[handle]`, `/search`, `/cart`, `/build-a-crate` (nontransactional preview), `/makers` (verification placeholder). GraphQL operations are isolated in `lib/shopify`. Cart ID is kept in an HttpOnly SameSite=Lax cookie. Gift notes are Shopify cart line attributes. Checkout delegates to Shopify `cart.checkoutUrl`.

## Constraints
- Original Trading Co. logo provided, complete: no cropping, mobile 65vw.
- Shopify API version default `2026-10`; review current API against dev store before PR.
- Existing Supply Co. photo mockups excluded from `public` and retained in `reference/concept-legacy` solely for visual comparison.
- No real merchant name/trademark approval, genuine product inventory, vendor imagery rights, fulfillment, customer auth or live orders yet.
- Shopify private token server only; never expose it in browser bundles. Price, SKU stock and taxes are always Shopify-owned.
- **Not production-ready:** tests with a live store, security audit, anti-abuse safeguards, shipping/tax, customer accounts, asset replacement and builder fulfillment must be done before launch.

## Collaboration
Codex implements code in PRs. Claude Code independent review. Notion owns strategy and scope. See `docs/KICKOFF.md`, `docs/BRAND.md`, `docs/ACCEPTANCE.md`.

## Repo and domain

Repository: https://github.com/tavisscholz/tradingco.git  
Planned storefront domain: https://smokymountaintrading.co (GoDaddy-managed, not yet deployed)  
See `docs/REPO_DOMAIN_SETUP.md`. Keep Shopify credentials outside source control.
