


export function sumThem(a: number, b: number): number;
export function sumThem(a: string, b: string): number;
export function sumThem(a: number[], b: number[]): number;
export function sumThem(a: unknown, b: unknown) {

    if(typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    if(typeof a === 'string' && typeof b === 'string') {
        return a + b;
    }
    if(Array.isArray(a) && Array.isArray(b)) {
        
        return [...a, ...b].reduce((l,r) => l +r)
    }
    
}


export function sumThemWithUnknowns(a: unknown, b: unknown) {

    if(typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    if(typeof a === 'string' && typeof b === 'string') {
        return a + b;
    }
    if(Array.isArray(a) && Array.isArray(b)) {
        
        return [...a, ...b].reduce((l,r) => l +r)
    }
    
}
type SummableItems = number | string | number[];
export function sumThemWithUnions(a: SummableItems, b: SummableItems) {

    if(typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    if(typeof a === 'string' && typeof b === 'string') {
        return a + b;
    }
    if(Array.isArray(a) && Array.isArray(b)) {
        
        return [...a, ...b].reduce((l,r) => l +r)
    }
}


export const calculateTaxForFullTime = (n:number) => n * .2;
export const calculateTaxForContractor = (n: number) => n * 0;
type TaxablePayCalculation = (n:number) => number;
export function calculateWeeklyPay(
    annualPay: number, 
    taxableFn: TaxablePayCalculation )
    {
   const pay = annualPay / 12;
    return {
        weeklyPay: Math.round(annualPay / 12),
        taxableAmount: Math.round(taxableFn(pay))
    }
}

export function tagMaker(tag:string) {
    return (content:string) => `<${tag}>${content}</${tag}>`;
}

export function tagMakerOldSkool(tag:string, content: string) {
    return `<${tag}>${content}</${tag}>`
}

export class TagMaker {

    #tag:string;
   
    constructor(tag:string) {
        this.#tag = tag;
    }

    make(content:string) {
        return  `<${this.#tag}>${content}</${this.#tag}>`
    }
}