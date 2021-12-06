import { readAsync, unpackLines, unpackLinesAsNumbers, unpackSections, unpackRegex, unpackCsv } from './lib.js';

const input = await readAsync('../inputs/5.input');

function lineType(x1, y1, x2, y2) {
    if (x1 == x2) return 'horizontal';
    if (y1 == y2) return 'vertical';
    return 'diagonal'
}

const lines = unpackLines(input).map(l => {
    const [x1, y1, x2, y2] = unpackRegex(l, 4, /(\d+),(\d+)\s+->\s+(\d+),(\d+)/);
    return { x1, y1, x2, y2, type: lineType(x1, y1, x2, y2) };
});

function key(x, y) {
    return `${x},${y}`;
}

function orderRange(a, b) {
    return a < b ? [a, b] : [b, a];
}

function increment(grid, x, y) {
    const k = key(x, y);
    if (!grid[k]) grid[k] = 0;
    grid[k]++;
}

function drawHorizontal(grid, line) {
    const x = line.x1;
    const [minY, maxY] = orderRange(line.y1, line.y2);
    for (let y = minY; y <= maxY; y++)
        increment(grid, x, y);
}

function drawVertical(grid, line) {
    const y = line.y1;
    const [minX, maxX] = orderRange(line.x1, line.x2);
    for (let x = minX; x <= maxX; x++)
        increment(grid, x, y);
}

function countGridIntersections(grid) {
    let count = 0;
    Object.keys(grid).forEach(key => {
        if (grid[key] >= 2)
            count++;
    });
    return count;
}

function p1(lines) {
    const straightLines = lines.filter(l => l.type != 'diagonal');
    const grid = {};

    for (let line of straightLines) {
        switch (line.type) {
            case 'vertical':
                drawVertical(grid, line);
                break;
            case 'horizontal':
                drawHorizontal(grid, line);
                break;
        }
    }

    return countGridIntersections(grid);
}

function drawDiagonal(grid, line) {
    const dx = line.x1 < line.x2 ? 1 : -1;
    const dy = line.y1 < line.y2 ? 1 : -1;
    let x = line.x1;
    let y = line.y1;
    while (x != line.x2 + dx && y != line.y2 + dy) {
        increment(grid, x, y);
        x += dx;
        y += dy;
    }
}

function p2(lines) {
    const grid = {};

    for (let line of lines) {
        switch (line.type) {
            case 'vertical':
                drawVertical(grid, line);
                break;
            case 'horizontal':
                drawHorizontal(grid, line);
                break;
            case 'diagonal':
                drawDiagonal(grid, line);
                break;
        }
    }

    return countGridIntersections(grid);
}
console.log({ 
    part1: p1(lines), 
    part2: p2(lines)
});