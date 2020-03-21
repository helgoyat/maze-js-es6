const Maze = require('./maze');

// Maze has to be size 4
const sample = [
    [0, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 0, 1, 1]
];

// Variables
const start = { x: 0, y: 0 };
const end = { x: 3, y: 0 };

// Create maze
const maze = new Maze(sample, start, end);

const solution = maze.solve();

console.log(solution);