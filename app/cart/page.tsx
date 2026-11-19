import Link from "next/link";
import {cookies} from "next/headers";
import {getCart} from "@/lib/shopify/cart";
import {money} from "@/lib/money";
import {changeCartQuantity,checkout} from "@/app/actions";
export default async function CartPage({searchParams}:{searchParams:Promise<{error?:string|string[]}>}){
 const {error: errorParam}=await searchParams;const error=Array.isArray(errorParam)?errorParam[0]:errorParam;const id=(await cookies()).get('smt_headless_cart')?.value;
 const cart=id?await getCart(id).catch(()=>null):null;
 return <main className="wrap content"><span className="kicker">THE TRADING POST</span><h1>Your Shopping Bag</h1>{error?<p className="form-error" role="alert">{error.slice(0,160)}</p>:null}{cart?.lines.nodes.length?<div className="cart-layout"><div>{cart.lines.nodes.map(line=><article className="cart-line" key={line.id}><div><h2>{line.merchandise.product.title}</h2><p>{line.merchandise.title}</p>{line.attributes.map(a=><p key={a.key}>{a.key}: {a.value}</p>)}</div><form action={changeCartQuantity} className="quantity-form"><input type="hidden" name="lineId" value={line.id}/><label htmlFor={`q-${line.id}`}>Quantity</label><input id={`q-${line.id}`} type="number" name="quantity" min="0" max="25" defaultValue={line.quantity}/><button type="submit">Update</button><small>Set 0 to remove.</small></form><strong>{money(line.cost.totalAmount)}</strong></article>)}</div><aside className="cart-summary"><h2>Subtotal</h2><strong>{money(cart.cost.subtotalAmount)}</strong><p>Delivery and taxes calculated at Shopify checkout.</p><form action={checkout}><button className="red-button" type="submit">SECURE CHECKOUT →</button></form></aside></div>:<div className="unconfigured"><p>Your bag is empty.</p><Link href="/search">Browse products →</Link></div>}</main>
}
