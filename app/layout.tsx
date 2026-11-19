import type {Metadata} from "next";
import {paletteFor} from "@/lib/holiday.mjs";
import {Header} from "@/components/Header";
import "./globals.css";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:{default:"Smoky Mountain Trading Co.",template:"%s | Smoky Mountain Trading Co."},description:"A modern general store for the Smokies. Local-inspired goods and curated gift crates."};
export default function RootLayout({children}:{children:React.ReactNode}){
 const palette=paletteFor();
 return <html lang="en" data-palette={palette}><body><Header/>{children}<footer className="footer"><div className="wrap footer-inner"><div><strong className="footer-brand">SMOKY MOUNTAIN<br/>TRADING CO.</strong><p>A concept for good things from the mountains.</p></div><div><a href="/collections/gift-crates">Gift Crates</a><a href="/collections/pantry-provisions">Pantry & Provisions</a><a href="/makers">Our Makers</a></div><div><p>Storefront prototype. Items, prices, availability, and supplier claims require verification.</p></div></div></footer></body></html>;
}
