import fs from 'fs/promises';

function readAsync(path) {
    return fs.readFile(path, 'utf-8');
}

function unpackLines(s) {
    return s.split('\r\n');
}

function unpackLinesAsNumbers(s) {
    return s.split('\r\n').map(l => isNaN(l) ? l : +l);
}

function unpackSections(s) {
    return s.split('\r\n\r\n');
}

function unpackRegex(s, expectedCount = 1, pattern) {
    const match = s.match(pattern);
    const groups = [];
    for (let i = 1; i <= expectedCount; i++) {
        const value = match[i];
        groups.push(isNaN(value) ? value : +value);
    }
    return groups;
}

function unpackCsv(s) {
    const split = s.split(',');
    return split.map(v => isNaN(v) ? v : +v);
}

function range(n) {
    return [...Array(n).keys()];
}

export {
    readAsync,
    unpackLines,
    unpackLinesAsNumbers,
    unpackSections,
    unpackRegex,
    unpackCsv,
    range
}