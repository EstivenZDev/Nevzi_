


export const averageCalculator = (array:number[]):number => {
    const divider = array.length
    const sumNumbers = array.reduce((accumulator,num) => accumulator + num, 0)
    const result = sumNumbers/divider
    return result
}

export const multiplicator = (a:number, b:number):number => {
    const result = a * b
    return result
}



