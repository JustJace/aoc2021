import { readAsync, unpackLines, range, unpackLinesAsNumbers, unpackSections, unpackRegex, unpackCsv } from './lib.js';

const input = await readAsync('../inputs/8.input');
const lines = unpackLines(input).map(l => {
    const [inp, out] = l.split(' | ');
    return {
        input: inp.split(' '),
        output: out.split(' ')
    }
});

const sumMap = {
    '0,1': 0,
    '0,2': 8,
    '0,3': 8,
    '0,4': 8,
    '0,5': 8,
    '0,6': 8,
    '0,7': 0,
    '0,8': 8,
    '0,9': 8,
    '1,2': NaN,
    '1,3': 3,
    '1,4': 4,
    '1,5': 9,
    '1,6': 8,
    '1,7': 7,
    '1,8': 8,
    '1,9': 9,
    '2,3': NaN,
    '2,4': 8,
    '2,5': 8,
    '2,6': 8,
    '2,7': 9,
    '2,8': 8,
    '2,9': 8,
    '3,4': 9,
    '3,5': 8,
    '3,6': 8,
    '3,7': 3,
    '3,8': 8,
    '3,9': 9,
    '4,5': 9,
    '4,6': 8,
    '4,7': NaN,
    '4,8': 8,
    '4,9': 9,
    '5,6': 6,
    '5,7': 9,
    '5,8': 8,
    '5,9': 9,
    '6,7': 8,
    '6,8': 8,
    '6,9': 8,
    '7,8': 8,
    '7,9': 9,
    '8,9': 8
};

function p1(lines) {
    let count = 0;
    for (let line of lines) {
        for (let out of line.output) {
            switch (out.length) {
                case 2:
                case 3:
                case 4:
                case 7:
                    count++;
                    break;
                default: break;
            }
        }
    }
    return count;
}

function decode(patterns) {
    const known = {};

    const possibilities = {};
    for (let i = 0; i <= 9; i++) {
        possibilities[i] = new Set(patterns);
    }

    const one = patterns.filter(signals => signals.length == 2)[0];
    known[1] = one;
    possibilities[1] = new Set([one]);
    for (let i = 0; i <= 9; i++) {
        if (i == 1) continue;
            possibilities[i].delete(one);
    }

    const four = patterns.filter(signals => signals.length == 4)[0];
    known[4] = four;
    possibilities[4] = new Set([four]);
    for (let i = 0; i <= 9; i++) {
        if (i == 4) continue;
            possibilities[i].delete(four);
    }

    const seven = patterns.filter(signals => signals.length == 3)[0];
    known[7] = seven;
    possibilities[7] = new Set([seven]);
    for (let i = 0; i <= 9; i++) {
        if (i == 7) continue;
            possibilities[i].delete(seven);
    }

    const eight = patterns.filter(signals => signals.length == 7)[0];
    possibilities[8] = new Set([eight]);
    known[8] = eight;
    for (let i = 0; i <= 9; i++) {
        if (i == 8) continue;
            possibilities[i].delete(eight);
    }

    for (let possibility of possibilities[0]) {
        if (possibility.length != 6)
            possibilities[0].delete(possibility);
    }

    for (let possibility of possibilities[2]) {
        if (possibility.length != 5)
            possibilities[2].delete(possibility);
    }

    for (let possibility of possibilities[3]) {
        if (possibility.length != 5)
            possibilities[3].delete(possibility);
    }

    for (let possibility of possibilities[5]) {
        if (possibility.length != 5)
            possibilities[5].delete(possibility);
    }

    for (let possibility of possibilities[6]) {
        if (possibility.length != 6)
            possibilities[6].delete(possibility);
    }

    for (let possibility of possibilities[9]) {
        if (possibility.length != 6)
            possibilities[9].delete(possibility);
    }

    for (let i = 0; i <= 9; i++) {
        if (possibilities[i].length == 1) continue;
        for (let k of Object.keys(known)) {
            if (i == k) continue;
            const [a,b] = i < k ? [i, k] : [k, i];
            const key = `${a},${b}`;
            const expectedNum = sumMap[key];
            if (expectedNum == NaN) continue;
            if (!known[expectedNum]) continue;
            const expected = known[expectedNum];
            for (let possibility of possibilities[i]) {
                const combined = [...new Set((possibility + known[k]).split(''))].sort().join('');
                if (combined != expected.split('').sort().join('')) {
                    possibilities[i].delete(possibility);
                }
            }
        }
    }

    known[6] = [...possibilities[6]][0];

    for (let i = 0; i <= 9; i++) {
        if (i == 6) continue;
        possibilities[i].delete(known[6]);
    }

    known[0] = [...possibilities[0]][0];

    for (let i = 0; i <= 9; i++) {
        if (i == 0) continue;
        possibilities[i].delete(known[0]);
    }

    known[2] = [...possibilities[2]][0];

    for (let i = 0; i <= 9; i++) {
        if (i == 2) continue;
        possibilities[i].delete(known[2]);
    }

    known[9] = [...possibilities[9]][0];

    for (let i = 0; i <= 9; i++) {
        if (i == 9) continue;
        possibilities[i].delete(known[9]);
    }

    for (let i = 0; i <= 9; i++) {
        if ([...possibilities[i]].length == 1) continue;
        for (let k of Object.keys(known)) {
            if (i == k) continue;
            const [a,b] = i < k ? [i, k] : [k, i];
            const key = `${a},${b}`;
            const expectedNum = sumMap[key];
            if (expectedNum == NaN) continue;
            if (!known[expectedNum]) continue;
            const expected = known[expectedNum].split('').sort().join('');
            for (let possibility of possibilities[i]) {
                const combined = [...new Set((possibility + known[k]).split(''))].sort().join('');
                if (combined != expected) {
                    possibilities[i].delete(possibility);
                }
            }
        }
    }

    known[3] = [...possibilities[3]][0];
    known[5] = [...possibilities[5]][0];

    const decodeMap = [];

    for (let key of Object.keys(known)) {
        const value = known[key];
        decodeMap[value.split('').sort().join('')] = +key;
    }

    return decodeMap;
}

function value(decodedMap, patterns) {
    let value = '';

    for (let pattern of patterns) {
        value += decodedMap[pattern.split('').sort().join('')];
    }

    return +value;
}

function p2(lines) {
    let total = 0;
    for (let line of lines) {
        const decodeMap = decode(line.input);
        total += value(decodeMap, line.output);
    }
    return total;
}

console.log({ 
    part1: p1(lines), 
    part2: p2(lines) 
});