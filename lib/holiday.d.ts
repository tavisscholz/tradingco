export type EasternParts = {year:number;month:number;day:number};
export function easternParts(date?: Date): EasternParts;
export function lastMondayInMay(year: number): number;
export function isPatrioticDay(parts: EasternParts): boolean;
export function paletteFor(date?: Date): "patriotic" | "everyday";
