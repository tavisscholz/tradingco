/** Eastern local calendar date; use only deterministic date logic, not browser locale. */
export function easternParts(date = new Date()) {
  const values = new Intl.DateTimeFormat("en-US", {timeZone: "America/New_York",year: "numeric",month: "2-digit",day: "2-digit"}).formatToParts(date);
  const get = (s) => Number(values.find((x) => x.type === s)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}
export function lastMondayInMay(year) {
  const dow = new Date(Date.UTC(year, 4, 31)).getUTCDay();
  return 31 - ((dow + 6) % 7);
}
export function isPatrioticDay({year,month,day}) {
  return (month===5 && day===lastMondayInMay(year)) || (month===6 && day===14) || (month===7 && day===4) || (month===11 && day===11);
}
export function paletteFor(date = new Date()) {return isPatrioticDay(easternParts(date)) ? "patriotic" : "everyday";}
