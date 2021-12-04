import { readAsync, unpackLines, unpackSections, unpackCsv } from './lib.js';

const input = await readAsync('../inputs/4.input');
const sections = unpackSections(input);

function parseBoard(section) {
    const lines = unpackLines(section);
    const board = [];
    for (let i = 0; i < lines.length; i++) {
        const rowNums = lines[i].split(' ').map(s => parseInt(s)).filter(s => !isNaN(s));
        const row = [];
        for (let j = 0; j < rowNums.length; j++) {
            row.push({
                val: rowNums[j],
                marked: false
            });
        }
        board.push(row);
    }
    return board;
}

function isWinner(board) {
    for (let i = 0; i < board.length; i++) {
        let winner = true;
        for (let j = 0; j < board[i].length; j++) {
            if (!board[i][j].marked) {
                winner = false;
                break;
            }
        }
        if (winner) return true;
    }

    for (let j = 0; j < board.length; j++) {
        let winner = true;
        for (let i = 0; i < board[0].length; i++) {
            if (!board[i][j].marked) {
                winner = false;
                break;
            }
        }
        if (winner) return true;
    }

    return false;
}

function markNumbers(board, n) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].val == n)
                board[i][j].marked = true;
        }
    }
}

function score(board, number) {
    let sum = 0;

    for (let i = 0; i < board.length; i++)
        for (let j = 0; j < board[i].length; j++)
            if (!board[i][j].marked)
                sum += board[i][j].val;

    return sum * number;
}

function p1(sections) {
    const callNumbers = unpackCsv(sections[0]);
    const boards = [];
    for (let i = 1; i < sections.length; i++) {
        boards.push(parseBoard(sections[i]));
    }

    for (let number of callNumbers) {
        for (let board of boards) {
            markNumbers(board, number);
            const isWinning = isWinner(board);
            if (isWinning) {
                return score(board, number);
            }
        }
    }

    return -1;
}

function p2(sections) {
    const callNumbers = unpackCsv(sections[0]);
    let boards = [];
    for (let i = 1; i < sections.length; i++) {
        boards.push(parseBoard(sections[i]));
    }

    for (let number of callNumbers) {
        const winningIndicies = [];

        for (let i = 0; i < boards.length; i++) {
            const board = boards[i];
            markNumbers(board, number);
            const isWinning = isWinner(board);
            if (isWinning) {
                if (boards.length == 1) {
                    return score(board, number);
                }
                winningIndicies.push(i);
            }
        }

        winningIndicies.reverse().forEach(idx => boards.splice(idx, 1));
    }

    return -1;
}

console.log({ 
    part1: p1(sections), 
    part2: p2(sections)
});