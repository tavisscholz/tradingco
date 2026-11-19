# Headless acceptance gates
M1: `npm test`, `npm run typecheck`, `npm run build` where dependencies available. Responsive screenshots at 390px,768px,1440px, no overflow, logo full 65vw mobile, keyboard and screenreader basics. Fallback when Shopify config absent MUST NOT allow fake checkout.
M2: Test Headless sales channel credentials/server-only; only published Shopify products. Add available variant with quantity and gift note, check Shopify-owned subtotal, update/remove cart, redirect to Shopify's real `checkoutUrl` for authenticated test checkout; show no locally calculated price as authoritative.
M3: Verify bundle app/customization integration, inventory/variants, server-side price, line-item detail and packing list in two dev-store orders; untrusted client pricing cannot override Shopify.
M4: Shipping, tax, refunds, accessibility, creator rights, origin claims, returns, legal name/domain, photo rights and test order emails. Never publish without explicit authorization.
No Shopify dev store, credentials, real SKUs or deployed preview supplied yet. Report them as blockers rather than marking as passed.
