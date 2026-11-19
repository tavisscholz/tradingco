export function isShopifyGid(value, type) {
  if (typeof value !== "string" || value.length > 400) return false;
  if (type === "CartLine") return /^gid:\/\/shopify\/CartLine\/[A-Za-z0-9_-]+(?:\?[A-Za-z0-9_=&-]+)?$/.test(value);
  return typeof type === "string" && /^[A-Za-z]+$/.test(type) && new RegExp(`^gid://shopify/${type}/[0-9]+$`).test(value);
}
export function validQuantity(raw, max = 25) {
  const value = Number(raw);
  return Number.isInteger(value) && value >= 0 && value <= max ? value : null;
}
export function validGiftNote(value) {return typeof value === "string" ? value.trim().slice(0,220) : "";}
export function domainIsSafe(host) {
  return typeof host === "string" && /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i.test(host);
}
