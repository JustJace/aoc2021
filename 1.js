import { readAsync } from './lib.js';

const input = await readAsync('1.input');
const lines = unpackLines(input);

let part1 = 0;

for (let i = 0; i < lines.length - 1 ; i++)
    if (lines[i+1]>lines[i]) 
        part1++;

const groups = [];

for (let i = 0; i < lines.length - 2; i++)
    groups.push(lines[i] + lines[i+1] + lines[i+2]);

let part2 = 0;

for (let i = 0; i < groups.length - 1; i++) {
    if (groups[i+1] > groups[i])
        part2++;
}

console.log({ part1, part2 });