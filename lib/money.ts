import type {Money} from "./shopify/types";
export function money(m:Money){return new Intl.NumberFormat("en-US",{style:"currency",currency:m.currencyCode}).format(Number(m.amount));}
