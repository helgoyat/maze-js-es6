class Maze
{
    constructor(maze, start, end)
    {
        this.maze = maze;
        this.start = { x: start.x, y: start.y };
        this.end = { x: end.x, y: end.y };
    }
}

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


// function analyze(maze, start, end)
// {
//     const solutions = [];

//     const solutionTampon = [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];

//     function searchPath(cursor, count, solution)
//     {
//         // Variables
//         const value = maze[cursor.x][cursor.y];

//         const isPath = (value === 0);
//         const isVisited = (solution[cursor.x][cursor.y] > 0);

//         if (isPath && !isVisited)
//         {
//             // Variables
//             const isEnd = ((end.x === cursor.x) && (end.y === cursor.y));
//             const nextCount = count + 1;

//             const nextSolution = solution.map(x => x.map(y => y));
//             nextSolution[cursor.x][cursor.y] = nextCount;

//             if (isEnd)
//             {
//                 solutions.push({ path: nextSolution, pathLength: nextCount });
//             }
//             else
//             {
//                 // TRY GO DOWN
//                 if (cursor.x < limit)
//                 {
//                     const nextCursor = { x: cursor.x, y: cursor.y };
//                     nextCursor.x = cursor.x + 1;
//                     searchPath(nextCursor, nextCount, nextSolution);
//                 }
//                 // TRY GO UP
//                 if (cursor.x > 0)
//                 {
//                     const nextCursor = { x: cursor.x, y: cursor.y };
//                     nextCursor.x = cursor.x - 1;
//                     searchPath(nextCursor, nextCount, nextSolution);
//                 }
//                 // TRY GO RIGHT
//                 if (cursor.y < limit)
//                 {
//                     const nextCursor = { x: cursor.x, y: cursor.y };
//                     nextCursor.y = cursor.y + 1;
//                     searchPath(nextCursor, nextCount, nextSolution);
//                 }
//                 // TRY GO LEFT
//                 if (cursor.y > 0)
//                 {
//                     const nextCursor = { x: cursor.x, y: cursor.y };
//                     nextCursor.y = cursor.y - 1;
//                     searchPath(nextCursor, nextCount, nextSolution);
//                 }
//             }
//         }
//         else
//         {
//             return;
//         }
//     }

//     searchPath(start, 0, solutionTampon);

//     solutions.sort(function (a, b) { return a.pathLength - b.pathLength; });

//     return solutions[0];

// }

// const size = 4;
// const limit = size - 1;

// const sol = analyze(sample, start, end);

// console.log(sol);