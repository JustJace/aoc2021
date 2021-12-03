import { readAsync, unpackLines } from './lib.js';

const input = await readAsync('../inputs/3.input');
const lines = unpackLines(input);
const width = 12;

function countPositionDigits(i, numbers) {
    let zeroes = 0;
    let ones = 0;
    for (let n of numbers) {
        switch (n[i]) {
            case '0': zeroes++; break;
            case '1': ones++; break;
        }
    }
    return { ones, zeroes };
}

function gamma(numbers) {
    const result = [];
    for (let i = 0; i < width; i++) {
        const counts =  countPositionDigits(i, numbers);
        result.push(counts.zeroes < counts.ones ? '0' : '1');
    }
    return parseInt(result.join(''), 2);
}

function epsilon(numbers) {
    const result = [];
    for (let i = 0; i < width; i++) {
        const counts = countPositionDigits(i, numbers);
        result.push(counts.zeroes > counts.ones ? '0' : '1');
    }
    return parseInt(result.join(''), 2);
}

function p1(numbers) {
    return gamma(numbers) * epsilon(numbers);
}

function oxygenRating(numbers) {
    let x = 0;
    while (numbers.length > 1 && x < width) {
        const counts = countPositionDigits(x, numbers);
        const keep = counts.zeroes > counts.ones ? '0' : '1';

        let next = [];
        for (let b of numbers) 
            if (b[x] == keep)
                next.push(b);
        
        numbers = next;
        x++;
    }

    return parseInt(numbers[0], 2);
}

function co2Rating(numbers) {
    let x = 0;
    while (numbers.length > 1 && x < width) {
        const counts = countPositionDigits(x, numbers);
        const keep = counts.zeroes <= counts.ones ? '0' : '1';

        let next = [];
        for (let b of numbers) 
            if (b[x] == keep)
                next.push(b);
        
        numbers = next;
        x++;
    }

    return parseInt(numbers[0], 2);
}

function p2(numbers) {
    return co2Rating(numbers) * oxygenRating(numbers);
}

console.log({ 
    part1: p1(lines), 
    part2: p2(lines) 
});