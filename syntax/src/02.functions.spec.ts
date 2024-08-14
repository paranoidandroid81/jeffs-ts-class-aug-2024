import { describe, expect, test } from "vitest";
import { add, doubleAndSumIt} from "./stuff/02.stuff";
import { calculateTaxForContractor, calculateTaxForFullTime, calculateWeeklyPay, sumThem, sumThemWithUnions, sumThemWithUnknowns, TagMaker, tagMaker, tagMakerOldSkool } from "./stuff/02.stuff2";

describe('functions and arguments and stuff', () => {
    test('params need typing', () => {
        expect(add(2,2)).toBe(4)
        expect(add(2,2,1)).toBe(5)
        expect(add(1,2,3,4,5,6,7,8,9)).toBe(45);
        doubleAndSumIt(2,2);
        doubleAndSumIt(2,2);
        doubleAndSumIt(2,2);
        doubleAndSumIt(2,2);
        doubleAndSumIt(2,2);
    doubleAndSumIt('pizza', [])


        
    })
    test('summing - overloads', () => {
        expect(sumThem(2,2)).toBe(4);
        expect(sumThem('dog', 'cat')).toBe('dogcat')
        
        expect(sumThem([1,2,3], [1,2,3])).toBe(12);
       // expect(sumThem([1,2,3], ['1', '2', 'cat'])).toBe(99);

       //expect(sumThemWithUnknowns(['dog'], [1,2,3])).toBe(25);
       sumThemWithUnions(1,2);
       sumThemWithUnions('dog', 'cat');

    });

});

describe('Object Literals and Functions', () => {
    test('Plain Object Literals', () => {

        type Actor = {
            firstName: string;
            lastName: string;
            age: number;
            jedi: boolean;
            getInfo: () => string;
        }
        const luke = {
            firstName: 'Luke',
            lastName: 'Skywalker',
            age: 22,
            jed: true,
            getInfo: function() {
                return `This is ${this.firstName} ${this.lastName}`
            }
        }

        const han: Actor = {
            firstName: 'Han',
            lastName: 'Solo',
            age: 33,
            jedi: false,
            getInfo:  function() { return `This is ${this.firstName} ${this.lastName}` }
        }

        const mailMan = {
            lastName: 'Smith', 
            getInfo: () => 'This is a mailman'
        }
        expect(luke.firstName).toBe('Luke');
        expect(luke.getInfo()).toBe('This is Luke Skywalker');

        doSomething(luke);
        doSomething(han);
        doSomething(mailMan);
        // this is structural typing.
        function doSomething(who: { lastName: string, getInfo: () => string}) {
           console.log(who.lastName);
           console.log(who.getInfo())
        }
    })

    test('Higher Ordered Functions', () => {
        // These are functions that take one or more functions as an argument and/or return a function.
        const numbers = [1,2,3,4,5];


        const doubler = (n:number) => n * 2;
        // const doubled = numbers.map(n => doubler(n));
        const doubled = numbers.map(doubler);

        expect(doubled).toEqual([2,4,6,8,10]);
        expect(numbers).toEqual([1,2,3,4,5]);

        const payInfo = calculateWeeklyPay(1000, calculateTaxForFullTime);

        expect(payInfo.weeklyPay).toBe(83);
        expect(payInfo.taxableAmount).toBe(17);

        const payInfo2 = calculateWeeklyPay(1000, calculateTaxForContractor);
        expect(payInfo2.weeklyPay).toBe(83);
        expect(payInfo2.taxableAmount).toBe(0);
    })

    test('returning a function', () => {
        const h1Maker = tagMaker('h1'); // partial application
        const h2Maker = tagMaker('h2');

        expect(h1Maker("Hello")).toEqual("<h1>Hello</h1>");
        expect(h2Maker("Goodbye")).toEqual("<h2>Goodbye</h2>");
        expect(h2Maker('Bird')).toEqual('<h2>Bird</h2>');

        expect(tagMakerOldSkool('p', 'tacos')).toBe('<p>tacos</p>');
        expect(tagMakerOldSkool('p', 'eggs')).toBe('<p>eggs</p>');

        const pMaker = new TagMaker('p');

        
        expect(pMaker.make('weirdo')).toBe('<p>weirdo</p>')


    })

    test('Arrays and Tuple Types', () => {
        const friends = ['Sean', 'Billy', 'Ed', 'Mo', 1138] as const;

        // let myAssociates: Array<string | number>;
        // let myAssociates: (string | number)[];
        
       expect(friends[0].length).toBe(4);
       expect(friends[4] * 2).toBe(1138 * 2)
        expect(typeof friends[0]).toBe('string');
        expect(typeof friends[4]).toBe('number');

        
        type Entry = [number, string, string[]];

        const entry:Entry  = [18, 'dog', ['birds']]
    });
})
