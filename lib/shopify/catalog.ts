import "server-only";
import {storefront,isConfigured} from "./client";
import type {Product} from "./types";
const PRODUCT_FIELDS=`
  id handle title description availableForSale
  featuredImage { url altText width height }
  priceRange { minVariantPrice {amount currencyCode} }
  variants(first: 15) { nodes {id title availableForSale price {amount currencyCode}} }
  collections(first: 6) {nodes {handle title}}
`;
export async function getProducts(first=12,search?:string):Promise<Product[]> {
  if (!isConfigured()) return [];
  const query=`query Products($first:Int!,$query:String){ products(first:$first,query:$query) { nodes {${PRODUCT_FIELDS}} } }`;
  const result=await storefront<{products:{nodes:Product[]}}>(query,{first:Math.min(24,Math.max(1,first)),query:search||null});
  return result.products.nodes;
}
export async function getProduct(handle:string):Promise<Product|null> {
  if (!isConfigured()) return null;
  const query=`query Product($handle:String!){product(handle:$handle){${PRODUCT_FIELDS}}}`;
  return (await storefront<{product:Product|null}>(query,{handle})).product;
}
export async function getCollection(handle:string):Promise<{title:string;description:string;products:Product[]}|null> {
  if (!isConfigured()) return null;
  const query=`query Collection($handle:String!){collection(handle:$handle){ title description products(first:24){nodes{${PRODUCT_FIELDS}}} }}`;
  const value=(await storefront<{collection:{title:string;description:string;products:{nodes:Product[]}}|null}>(query,{handle})).collection;
  return value ? {...value, products:value.products.nodes} : null;
}
