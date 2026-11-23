import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getCollection} from "@/lib/shopify/catalog";
import {ProductGrid} from "@/components/ProductGrid";
import {ShopState} from "@/components/ShopState";
export default async function Collection({params}:{params:Promise<{handle:string}>}){
 const {handle}=await params;if(!/^[a-z0-9-]{2,80}$/.test(handle)) notFound();
 let collection=null;try{collection=await getCollection(handle)}catch{return <main className="wrap content"><ShopState message="Collection temporarily unavailable."/></main>}
 if(!collection) return <main className="wrap content"><h1>Department not yet stocked</h1><ShopState message="This collection isn't published to Shopify Headless yet."/></main>;
 return <main className="wrap content"><span className="kicker">BROWSE A DEPARTMENT</span><h1>{collection.title}</h1><p>{collection.description}</p>{collection.products.length?<ProductGrid products={collection.products}/>:<ShopState message="No available goods in this collection yet."/>}</main>
}
export async function generateMetadata({params}:{params:Promise<{handle:string}>}):Promise<Metadata>{const {handle}=await params;return {title:handle.replaceAll('-',' ')}}
