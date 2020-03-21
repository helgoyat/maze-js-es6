class Maze
{
    constructor(maze, start, end)
    {
        this.size = 4;
        this.maze = maze;
        this.start = { x: start.x, y: start.y };
        this.end = { x: end.x, y: end.y };
        this.solutions = [];
    }

    validate()
    {
        if ((this.maze.length === this.size) && (this.maze[0].length === this.size))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    solve()
    {
        const isValid = this.validate();

        if (isValid)
        {
            const trace = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];

            this.findPath(this.start, 0, trace);

            this.sortSolutions();

            return this.solutions[0];
        }
        else
        {
            return null;
        }
    }

    findPath(cursor, count, trace)
    {
        const value = this.maze[cursor.x][cursor.y];

        const isPath = (value === 0);
        const isVisited = (trace[cursor.x][cursor.y] > 0);

        if (isPath && !isVisited)
        {
            const isEnd = ((this.end.x === cursor.x) && (this.end.y === cursor.y));
            const nextCount = count + 1;
            const limit = this.size - 1;

            const nextTrace = trace.map(x => x.map(y => y));
            nextTrace[cursor.x][cursor.y] = nextCount;

            if (isEnd)
            {
                this.addSolution(nextTrace, nextCount);
            }
            else
            {
                // TRY GO DOWN
                if (cursor.x < limit)
                {
                    const nextCursor = this.moveCursor(cursor, 1, 0);
                    this.findPath(nextCursor, nextCount, nextTrace);
                }

                // TRY GO UP
                if (cursor.x > 0)
                {
                    const nextCursor = this.moveCursor(cursor, -1, 0);
                    this.findPath(nextCursor, nextCount, nextTrace);
                }

                // TRY GO RIGHT
                if (cursor.y < limit)
                {
                    const nextCursor = this.moveCursor(cursor, 0, 1);
                    this.findPath(nextCursor, nextCount, nextTrace);
                }

                // TRY GO LEFT
                if (cursor.y > 0)
                {
                    const nextCursor = this.moveCursor(cursor, 0, -1);
                    this.findPath(nextCursor, nextCount, nextTrace);
                }
            }
        }
        else
        {
            return;
        }
    }

    moveCursor(prevCursor, x = 0, y = 0)
    {
        const cursor = { x: prevCursor.x, y: prevCursor.y };
        cursor.x += x;
        cursor.y += y;
        return cursor;
    }

    addSolution(trace, count)
    {
        const sols = [...this.solutions];
        sols.push({ path: trace, pathLength: count });
        this.solutions = sols;
    }

    sortSolutions()
    {
        const sols = this.solutions;
        sols.sort(function (a, b) { return a.pathLength - b.pathLength; });
        this.solutions = sols;
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

const solution = maze.solve();

console.log(solution);