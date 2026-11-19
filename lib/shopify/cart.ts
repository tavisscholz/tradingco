import "server-only";
import {storefront} from "./client";
import type {Cart} from "./types";
const CART_FIELDS=`
 id checkoutUrl totalQuantity
 estimatedCost {subtotalAmount {amount currencyCode}}
 lines(first:50) {nodes {id quantity attributes {key value} merchandise { ... on ProductVariant {id title price {amount currencyCode} product {title handle featuredImage {url altText}}} }}}
`;
type CartPayload={cart:Cart|null;userErrors:{field:string[]|null;message:string}[]};
function check(payload:CartPayload):Cart {
 if(payload.userErrors?.length) throw new Error(payload.userErrors.map(x=>x.message).join('; '));
 if(!payload.cart) throw new Error('No cart was returned');
 return payload.cart;
}
export async function getCart(id:string):Promise<Cart|null> {
 const query=`query Cart($id:ID!){cart(id:$id){${CART_FIELDS}}}`;
 return (await storefront<{cart:Cart|null}>(query,{id})).cart;
}
export async function createCart(variantId:string,quantity:number,note:string):Promise<Cart> {
 const query=`mutation CreateCart($input:CartInput!){cartCreate(input:$input){cart{${CART_FIELDS}} userErrors{field message}}}`;
 const attributes=note ? [{key:'Gift note',value:note}] : [];
 const result=await storefront<{cartCreate:CartPayload}>(query,{input:{lines:[{merchandiseId:variantId,quantity,attributes}]}});
 return check(result.cartCreate);
}
export async function addCartLines(id:string,variantId:string,quantity:number,note:string):Promise<Cart> {
 const query=`mutation AddLines($id:ID!,$lines:[CartLineInput!]!){cartLinesAdd(cartId:$id,lines:$lines){cart{${CART_FIELDS}} userErrors{field message}}}`;
 const lines=[{merchandiseId:variantId,quantity,attributes:note?[{key:'Gift note',value:note}]:[]}];
 return check((await storefront<{cartLinesAdd:CartPayload}>(query,{id,lines})).cartLinesAdd);
}
export async function updateCartLine(id:string,lineId:string,quantity:number):Promise<Cart> {
 const query=`mutation UpdateLine($id:ID!,$lines:[CartLineUpdateInput!]!){cartLinesUpdate(cartId:$id,lines:$lines){cart{${CART_FIELDS}} userErrors{field message}}}`;
 return check((await storefront<{cartLinesUpdate:CartPayload}>(query,{id,lines:[{id:lineId,quantity}]})).cartLinesUpdate);
}
export async function removeCartLine(id:string,lineId:string):Promise<Cart> {
 const query=`mutation RemoveLine($id:ID!,$lineIds:[ID!]!){cartLinesRemove(cartId:$id,lineIds:$lineIds){cart{${CART_FIELDS}} userErrors{field message}}}`;
 return check((await storefront<{cartLinesRemove:CartPayload}>(query,{id,lineIds:[lineId]})).cartLinesRemove);
}
