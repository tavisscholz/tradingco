import "server-only";
import {domainIsSafe} from "@/lib/guards.mjs";
export class StorefrontError extends Error {constructor(message: string) {super(message); this.name="StorefrontError";}}
export function isConfigured() {
  return Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN && domainIsSafe(process.env.SHOPIFY_STORE_DOMAIN));
}
export async function storefront<T>(query:string,variables:Record<string,unknown> = {}, revalidate = 0):Promise<T> {
  const host = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
  if (!isConfigured() || !host || !token) throw new StorefrontError("Shopify development store is not configured");
  const version=process.env.SHOPIFY_STOREFRONT_API_VERSION || "2026-10";
  if (!/^20[0-9]{2}-(01|04|07|10)$/.test(version)) throw new StorefrontError("Invalid Storefront API version");
  const url=`https://${host}/api/${version}/graphql.json`;
  const response=await fetch(url,{
    method:"POST",
    headers:{"content-type":"application/json","Shopify-Storefront-Private-Token":token},
    body:JSON.stringify({query,variables}),
    cache: revalidate ? "force-cache" : "no-store",
    ...(revalidate ? {next:{revalidate}} : {})
  });
  if (!response.ok) throw new StorefrontError(`Shopify Storefront API returned HTTP ${response.status}`);
  const result: {data?:T;errors?:{message:string}[]} = await response.json();
  if (result.errors?.length) throw new StorefrontError(result.errors.map(x=>x.message).join("; "));
  if (!result.data) throw new StorefrontError("Shopify Storefront API returned no data");
  return result.data;
}
