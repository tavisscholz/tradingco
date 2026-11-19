# Codex kickoff — Next.js + Shopify (Smoky Mountain Trading Co.)
**Milestone:** H1 (headless foundation). **The previous Shopify Liquid theme kickoff is superseded for this direction.**

## Objective
Complete a production-minded Next.js App Router storefront that matches the Trading Co. mercantile reference and uses Shopify's Headless sales channel / Storefront GraphQL API for catalog, carts and hosted checkout. No custom payments or independent pricing authority.

## First steps
1. Read `AGENTS.md`, `docs/BRAND.md`, `docs/ACCEPTANCE.md` and the saved visual references. Preserve exact logo and 65vw on mobile.
2. Install dependencies. Run `npm test`, `npm run typecheck`, `npm run build`, `npm run lint` and fix failures. Do not claim an unrun test passed.
3. Keep server-only token in `.env.local`, never in browser. Use Shopify Headless channel credentials for a **development store** only, when explicitly supplied. Storefront API version defaults to `2026-10` until reviewed.
4. Implement/verify live collections, products, variants, availability, search, cart cookies and checkout handoff. Product data must come from Shopify, never JSON mock data masquerading as real inventory.
5. Test desktop/tablet/mobile; capture screenshot comparisons. Verify keyboard and no overflow, title/accessibility and color rules, empty/unavailable states.
6. Leave Build-a-Crate as explanatory preview until a real inventory-aware bundle product/Cart Transform strategy is approved. Do not allow untrusted browser price overrides.
7. Open a **draft GitHub PR**, attach screenshots, tests and blockers, rollback steps. Claude Code reviews independently. No production deploy, Shopify writes or theme publishing without approval.

## Exact source assets
- `public/brand/smoky-mountain-trading-co-logo.jpg` — **exact original user file** (1536×512).
- `reference/interactive-design.html` — Trading Co. interactive showroom reference, including 12 concept SKUs; use as layout reference ONLY.
- `reference/desktop.png`, `tablet.png`, `mobile.png` — earlier tested screenshot references.
- `reference/concept-legacy/` — contains **Supply Co. branding on photographs**; NOT for live public site until replaced.

## Required setup
1. Private GitHub repo and Next.js-capable deployment preview (e.g. Vercel), authorized by owner.
2. Shopify dev store + installed Headless sales channel, dev Storefront API private token, and test SKUs published to channel.
3. Add server-only env from `.env.example`, never commit credentials.
4. Storefront API uses server-side `Shopify-Storefront-Private-Token`. Route to Shopify `checkoutUrl` for checkout.
5. In later milestones, implement Shopify bundle support, logistics, authentication/Customer Account API if needed, email and analytics.

## Verified repository and domain (2026-11-18)

Use GitHub `tavisscholz/tradingco` on `main`. This repository was empty when checked and is PUBLIC: use a feature branch/PR after initial source import, and never commit secrets. Public canonical domain `https://smokymountaintrading.co` is held at GoDaddy; DNS is not yet connected or verified. Preserve this exact spelling. **Do not substitute the site domain for `SHOPIFY_STORE_DOMAIN`; that variable must be the `myshopify.com` shop hostname.** See `docs/REPO_DOMAIN_SETUP.md`.


## Headless storefront status (Nov 18, 2026)

The merchant confirms Shopify Headless was installed and a storefront created and renamed. The API token, permissions, and product publishing have not been independently validated. Obtain the private Storefront API token in Shopify Admin, install it only in a secret environment variable (`SHOPIFY_STOREFRONT_PRIVATE_TOKEN`) in the local or hosting environment, and test actual Storefront API queries before enabling shopping. Never request the token in a pull request, chat, or repository. The canonical site URL is https://smokymountaintrading.co (no e in smoky).
