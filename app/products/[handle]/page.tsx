import Image from "next/image";
import {notFound} from "next/navigation";
import {getProduct} from "@/lib/shopify/catalog";
import {addToCart} from "@/app/actions";
import {money} from "@/lib/money";
import {ShopState} from "@/components/ShopState";
export default async function ProductDetail({params}:{params:Promise<{handle:string}>}){
 const {handle}=await params;if(!/^[a-z0-9-]{2,120}$/.test(handle))notFound();
 let product=null;try{product=await getProduct(handle)}catch{return <main className="wrap content"><ShopState message="Product temporarily unavailable."/></main>}
 if(!product)return <main className="wrap content"><ShopState message="This product is not published to the Headless channel."/></main>;
 return <main className="wrap content product-page"><div className="pdp-media">{product.featuredImage?<Image width={product.featuredImage.width ?? 800} height={product.featuredImage.height ?? 800} sizes="(max-width: 760px) 100vw, 50vw" src={product.featuredImage.url} alt={product.featuredImage.altText||product.title}/>:<div className="photo-placeholder">Product image pending</div>}</div><div className="pdp-info"><span className="kicker">THE TRADING POST</span><h1>{product.title}</h1><p>{product.description}</p><strong className="big-price">{money(product.priceRange.minVariantPrice)}</strong>{product.availableForSale?<form action={addToCart} className="purchase-form"><label htmlFor="variantId">Choose an option</label><select id="variantId" name="variantId" required>{product.variants.nodes.map(v=><option key={v.id} value={v.id} disabled={!v.availableForSale}>{v.title} — {money(v.price)}{v.availableForSale?'':' (Sold out)'}</option>)}</select><label htmlFor="quantity">Quantity</label><input id="quantity" name="quantity" type="number" min="1" max="25" defaultValue="1" required/><label htmlFor="giftNote">Gift message (optional)</label><textarea id="giftNote" name="giftNote" maxLength={220} rows={3} placeholder="Add a little note…"/><button className="red-button" type="submit">ADD TO BAG →</button></form>:<div className="unconfigured">Currently unavailable</div>}<p className="fineprint">Shipping, applicable taxes, and final availability are calculated through Shopify.</p></div></main>
}
