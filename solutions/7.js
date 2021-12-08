import { readAsync, unpackCsv, range } from './lib.js';

const input = await readAsync('../inputs/7.input');
const positions = unpackCsv(input);

function cost(positions, n, fuelCostFn) {
    return positions.reduce((total, position) => total + fuelCostFn(Math.abs(position - n)), 0);
}

function minCost(positions, costFn) {
    const max = Math.max(...positions);
    const costs = range(max).map(n => cost(positions, n, costFn));
    return Math.min(...costs);
}

function p1(positions) {
    return minCost(positions, n => n);
}

function p2(positions) {
    return minCost(positions, n => n * (n + 1) / 2);
}

console.log({ 
    part1: p1(positions), 
    part2: p2(positions) 
});