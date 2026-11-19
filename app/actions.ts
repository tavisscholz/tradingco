"use server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {addCartLines,createCart,getCart,removeCartLine,updateCartLine} from "@/lib/shopify/cart";
import {isShopifyGid,validQuantity,validGiftNote} from "@/lib/guards.mjs";
import {isConfigured} from "@/lib/shopify/client";
const CART_COOKIE="smt_headless_cart";
const COOKIE_OPTIONS={httpOnly:true,secure:process.env.NODE_ENV === "production",sameSite:"lax" as const,path:"/",maxAge:60*60*24*14};
function fail(message:string):never {redirect(`/cart?error=${encodeURIComponent(message)}`);}
export async function addToCart(formData:FormData) {
 if(!isConfigured()) return fail('Connect a Shopify development store first');
 const variantId=String(formData.get('variantId')||'');
 const quantity=validQuantity(formData.get('quantity'));
 const giftNote=validGiftNote(formData.get('giftNote'));
 if(!isShopifyGid(variantId,'ProductVariant') || quantity === null || quantity === 0) return fail('Invalid product or quantity');
 const store=await cookies();let id=store.get(CART_COOKIE)?.value;
 try {
  if(id){const existing=await getCart(id);if(!existing) id=undefined;}
  const result=id ? await addCartLines(id,variantId,quantity,giftNote) : await createCart(variantId,quantity,giftNote);
  store.set(CART_COOKIE,result.id,COOKIE_OPTIONS);
 }catch {return fail('Unable to update your bag. Please try again.');}
 redirect('/cart');
}
export async function changeCartQuantity(formData:FormData) {
 const store=await cookies();const id=store.get(CART_COOKIE)?.value;
 const lineId=String(formData.get('lineId')||'');const quantity=validQuantity(formData.get('quantity'));
 if(!id || !isShopifyGid(lineId,'CartLine') || quantity === null) return fail('Invalid cart update');
 try { if(quantity===0) await removeCartLine(id,lineId); else await updateCartLine(id,lineId,quantity); }
 catch {return fail('Could not change cart quantity');}
 redirect('/cart');
}
export async function checkout() {
 const id=(await cookies()).get(CART_COOKIE)?.value;
 if(!id) return fail('Your bag is empty');
 const cart=await getCart(id).catch(()=>null);
 if(!cart?.checkoutUrl || cart.totalQuantity===0) return fail('Your bag is empty or unavailable');
 const url=new URL(cart.checkoutUrl);
 if(url.protocol!=="https:") return fail('Invalid Shopify checkout URL');
 redirect(url.href);
}
