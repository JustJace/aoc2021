import { readAsync, unpackCsv, range } from './lib.js';

const input = await readAsync('../inputs/7.input');
const positions = unpackCsv(input);

function testCost(positions, n) {
    return positions.reduce((total, position) => total + Math.abs(position - n), 0);
}

function p1(positions) {
    const max = Math.max(...positions);
    const costs = range(max).map(n => testCost(positions, n));
    return Math.min(...costs);
}

function testCost2(positions, n) {
    return positions.reduce((total, position) => {
        let [min, max] = position < n ? [position, n] : [n, position];
        let f = 1;
        for (let i = min; i < max; i++)
            total += f++;
        return total;
    }, 0);
}

function p2(positions) {
    const max = Math.max(...positions);
    const costs = range(max).map(n => testCost2(positions, n));
    return Math.min(...costs);
}

console.log({ 
    part1: p1(positions), 
    part2: p2(positions) 
});