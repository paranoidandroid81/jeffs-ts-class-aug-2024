import { describe, expect, test } from "vitest";

describe('Union Stuff', () => {
    test('Literal Unions', () => {
        type Handler = 'click' | 'hover' | 'scroll';

        const setHandler = (event: Handler, callback: () => void) => {
            // the code tohook this up.
        }

        setHandler('click', () => console.log('Did it'));

       
    })

    test('Narrowing Unions', () => {

        type ApiResponse = 
            | { data: string}
            | { error: string}

        function doApiCall(n:number): ApiResponse {
            return n % 2 === 0 ? { data: 'Good Stuff'} : { error: 'That blew up'}
        }

        const result = doApiCall(2);

        if('data' in result) {
            // I got a good response back   
            console.log(result.data);
        } 
        if('error' in result) {
            // I got an error back.
            console.log(result.error);

        }

    })

    test('Narrowing with a function', () => {

        type Person = { name: string, age: number};
        const someJson = `{"name": "Bob", "age": 35}`;

        const obj = JSON.parse(someJson);

        const hasAge = (value: unknown): value is Person  =>{
            return (typeof value === 'object' && value !== null && 'age' in value && typeof value.age === 'number' && 'name' in value && typeof value.name === 'string')
        }
        // expect(obj.name).toBe('Bob')
        if(hasAge(obj)) {
            expect(obj.age).toBe(35);
            expect(obj.name).toBe('Bob')
        } else {
            expect(true).toBe(false);
        }
        
    })

    test('intro to discriminated unions', () => {
        type ApiResponse = 
        | { kind: 'success', data: string}
        | { kind: 'error', error: string}
        | { kind: 'colorful', color: string}

    function doApiCall(n:number): ApiResponse {
        return n % 2 === 0 ? { kind : 'success', data: 'Good Stuff'} : { kind: 'error', error: 'That blew up'}
    }

    const result = doApiCall(2);

    // if('data' in result) {
    //     // I got a good response back   
    //     console.log(result.data);
    // } 
    // if('error' in result) {
    //     // I got an error back.
    //     console.log(result.error);

    // }
    switch (result.kind) {
        case 'error': {
            console.log(result.error );
            break;
        }
        case 'success': {
            console.log(result.data); 
            break;
        }
    }
    })
})