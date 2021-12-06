import { readAsync, unpackCsv } from './lib.js';

const input = await readAsync('../inputs/6.input');
const ages = unpackCsv(input);

function simulate(ages, days) {
    let ageMap = new Array(9).fill(0);

    for (let age of ages)
        ageMap[age]++;

    for (let i = 0; i < days; i++) {
        const reproducingFish = ageMap[0];
        
        for (let i = 0; i <= 7; i++)
            ageMap[i] = ageMap[i+1];

        ageMap[8] = reproducingFish;
        ageMap[6] += reproducingFish;
    }

    let count = 0;
    for (let i = 0; i <= 8; i++)
        count += ageMap[i];
    return count;
}

function p1(ages) {
    return simulate([...ages], 80);
}

function p2(ages) {
    return simulate([...ages], 256);
}

console.log({ 
    part1: p1(ages), 
    part2: p2(ages) 
});