export function doAsyncthing(num: number): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Doing the async thing')
            if (num % 2 === 0) {
                resolve('done with async thing')
            } else {
                reject('error with async thing')
            }
        }, 1000)
    })
}


export function someThing(x: string) {
    return {
        then: (cb: (result: string) => void) => {
            cb(x);
        }
    }
}