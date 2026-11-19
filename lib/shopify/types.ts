export type Money = {amount: string; currencyCode: string};
export type Image = {url: string; altText: string|null; width?: number; height?: number};
export type Variant = {id:string; title:string; availableForSale:boolean; price:Money};
export type Product = {id:string; handle:string; title:string; description:string; availableForSale:boolean; featuredImage:Image|null; variants:{nodes:Variant[]}; priceRange:{minVariantPrice:Money}; collections?:{nodes:{handle:string;title:string}[]}};
export type CartLine = {id:string;quantity:number;merchandise:{id:string;title:string;product:{title:string;handle:string;featuredImage:Image|null};price:Money}; attributes:{key:string;value:string}[]};
export type Cart = {id:string;checkoutUrl:string;lines:{nodes:CartLine[]};estimatedCost:{subtotalAmount:Money};totalQuantity:number};
export type ShopifyGraphQLError = {message:string};
