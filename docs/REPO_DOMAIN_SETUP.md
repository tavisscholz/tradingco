# GitHub, deployment, and domain — verified inputs

- Repository: `https://github.com/tavisscholz/tradingco.git`
- Repository name: `tavisscholz/tradingco`
- Default branch: `main`
- Visibility at verification: **public**. Keep Shopify credentials and nonpublic vendor records OUT OF GIT.
- Registered domain (GoDaddy): `smokymountaintrading.co` — note **smoky** (no **e**) and `.co`.
- Storefront architecture: **Next.js App Router + Shopify Storefront API + Shopify-hosted checkout**, not Shopify Liquid themes.

## Environment and DNS

1. Keep `SHOPIFY_STORE_DOMAIN` as the Shopify **`*.myshopify.com` shop hostname**; do not replace it with the public `.co` domain.
2. Keep `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` in host server-side secrets only, never in GitHub.
3. Set `NEXT_PUBLIC_SITE_URL=https://smokymountaintrading.co` for canonical URL generation, open-graph metadata and absolute links as appropriate. It is a non-secret.
4. Deploy previews through a Next.js-compatible host (Vercel is one option). First verify the preview and Shopify development-store connectivity. Do not change public GoDaddy DNS until launch approval.
5. After the deployment host supplies actual records, configure GoDaddy DNS for apex `smokymountaintrading.co` and `www.smokymountaintrading.co`, with canonical redirect, TLS and domain verification. **Do not guess A/CNAME values.**
6. Shopify should be configured as a headless backend; its domain does not replace the Next.js primary site. Ensure checkout handles the merchant's intended domain, cookies, and return-to-shop URL.
7. Do not activate real commerce without validated assortment, product/brand imagery rights, tax, shipping, and return rules.

## Git push to empty repository

Extract the package, open a terminal **inside** `smoky-mountain-trading-nextjs-codex-starter` and execute:

```bash
git init
git branch -M main
git remote add origin https://github.com/tavisscholz/tradingco.git
git add .
git commit -m "Initialize Trading Co headless Next.js storefront"
git push -u origin main
```

Never commit `.env.local`. Do not commit a real private Shopify token into `.env.example`.

## Codex handoff

Select `tavisscholz/tradingco`, read `AGENTS.md` and `docs/KICKOFF.md`, and implement the H1 scope in a **draft PR**. Run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`. Validate responsive UX at 390/768/1440 and the Shopify sandbox checkout redirect. If secrets/development store are absent, report blockers rather than fabricating success. Do not deploy to production or change DNS.
