import Image from "next/image";
import Link from "next/link";
import type {Product} from "@/lib/shopify/types";
import {money} from "@/lib/money";
export function ProductGrid({products}:{products:Product[]}){
 return <div className="product-grid">{products.map(p=><article className="product-card" key={p.id}><Link className="product-photo" href={`/products/${p.handle}`}>{p.featuredImage?<Image fill sizes="(max-width: 380px) 100vw, (max-width: 760px) 50vw, (max-width: 1080px) 33vw, 25vw" src={p.featuredImage.url} alt={p.featuredImage.altText || p.title} loading="lazy"/>:<span className="photo-placeholder">Product photography pending</span>}</Link><div className="product-text"><span className="kicker">ON THE SHELVES</span><h3><Link href={`/products/${p.handle}`}>{p.title}</Link></h3><p>{p.description.slice(0,110)}</p><div className="product-bottom"><strong>{money(p.priceRange.minVariantPrice)}</strong><Link className="product-button" href={`/products/${p.handle}`}>{p.availableForSale?'VIEW & SHOP':'VIEW DETAILS'} ↗</Link></div></div></article>)}</div>
}
