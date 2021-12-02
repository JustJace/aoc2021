import { readAsync, unpackLines } from './lib.js';

const input = await readAsync('../inputs/2.input');
const lines = unpackLines(input);
const instructions = lines.map(l => {
    const [direction, amount] = l.split(' ');
    return { direction, amount: +amount };
});

function p1(instructions) {
    let depth = 0;
    let horizontal = 0;
    
    for (let instruction of instructions) {
        switch (instruction.direction) {
            case 'down': depth += instruction.amount; break;
            case 'up': depth -= instruction.amount; break;
            case 'forward': horizontal += instruction.amount; break;
        }
    }
    
    
    return depth * horizontal;
}

function p2(instructions) {
    let depth = 0;
    let horizontal = 0;
    let aim = 0;

    for (let instruction of instructions) {
        switch (instruction.direction) {
            case 'down': aim += instruction.amount; break;
            case 'up': aim -= instruction.amount; break;
            case 'forward': 
                horizontal += instruction.amount; 
                depth += instruction.amount * aim; break;
        }
    }

    return depth * horizontal;
}

console.log({ part1: p1(instructions), part2: p2(instructions) });