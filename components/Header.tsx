import Image from "next/image";
import Link from "next/link";
const departments=[['Gift Crates','gift-crates'],['Pantry & Provisions','pantry-provisions'],['Home & Camp','home-camp'],['Art & Woodcraft','art-woodcraft']];
export function Header(){return <>
 <div className="announcement">A MODERN GENERAL STORE FOR THE SMOKIES &nbsp; ✦ &nbsp; ARTISAN GIFTS · CAMP GOODS · LOCAL FLAVORS</div>
 <header className="mast"><div className="wrap mast-inner">
 <form className="mast-search" role="search" action="/search" method="get"><label className="sr-only" htmlFor="top-search">Search the store</label><input id="top-search" type="search" name="q" placeholder="Search the store…"/><button aria-label="Search" type="submit">⌕</button></form>
 <Link className="logo" href="/" aria-label="Smoky Mountain Trading Co. homepage"><Image unoptimized preload src="/brand/smoky-mountain-trading-co-logo.jpg" alt="Smoky Mountain Trading Co. — General Mercantile · Local Goods" width={1536} height={512}/></Link>
 <Link href="/cart" className="bag">YOUR BAG <span aria-hidden="true">▣</span></Link></div></header>
 <nav className="department-nav" aria-label="Shop departments"><div className="wrap nav-inner"><div className="nav-scroll">{departments.map(([name,handle])=><Link href={`/collections/${handle}`} key={handle}>{name}</Link>)}<Link href="/makers">Our Makers</Link></div><Link className="build-nav" href="/build-a-crate">BUILD YOUR CRATE ↗</Link></div></nav>
 </>}
