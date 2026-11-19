import {getProducts} from "@/lib/shopify/catalog";
import {ProductGrid} from "@/components/ProductGrid";
import {ShopState} from "@/components/ShopState";
export default async function SearchPage({searchParams}:{searchParams:Promise<{q?:string}>}){
 const query=(await searchParams).q?.trim().slice(0,80)||'';
 let products=[];try{products=await getProducts(24,query)}catch{}
 return <main className="wrap content"><span className="kicker">BROWSE THE STORE</span><h1>{query?`Search: ${query}`:'All Goods'}</h1><form action="/search" className="search-large"><label htmlFor="shop-search">Search the shelves</label><input id="shop-search" name="q" type="search" defaultValue={query}/><button type="submit">Search</button></form>{products.length?<ProductGrid products={products}/>:<ShopState message="No matching published items yet."/>}</main>
}
