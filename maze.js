module.exports = class Maze
{
    constructor(maze, start, end)
    {
        this.size = 4;
        this.maze = maze;
        this.start = { x: start.x, y: start.y };
        this.end = { x: end.x, y: end.y };
        this.solutions = [];
    }

    /**
     * Verify that maze, start and end points are valid
     */
    validate()
    {
        // Verify maze size
        if (
            (this.maze.length === this.size) &&
            (this.maze[0].length === this.size)
        )
        {
            // Verify that start and end points are in the maze
            if (
                (this.start.x >= 0) && (this.start.x <= this.size) &&
                (this.start.y >= 0) && (this.start.y <= this.size) &&
                (this.end.x >= 0) && (this.end.x <= this.size) &&
                (this.end.y >= 0) && (this.end.y <= this.size)
            )
            {
                // Verify start and end points are values 0 (path)
                if (
                    (this.maze[this.start.x][this.start.y] === 0) &&
                    (this.maze[this.end.x][this.end.y] === 0)
                )
                {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Main method used to solve maze
     */
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

            if (this.solutions.length > 0)
            {
                this.sortSolutions();
                return this.solutions[0];
            }
        }
        return null;
    }

    /**
     * Find possible paths from a given point
     * @param {obj} cursor 
     * @param {int} count 
     * @param {array} trace 
     */
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

    /**
     * Move cursor position
     * @param {obj} prevCursor 
     * @param {int} x diff between prev and new pos
     * @param {int} y diff between prev and new pos
     */
    moveCursor(prevCursor, x = 0, y = 0)
    {
        const cursor = { x: prevCursor.x, y: prevCursor.y };
        cursor.x += x;
        cursor.y += y;
        return cursor;
    }

    /**
     * Add maze found solution to all solutions array
     * @param {array} trace 
     * @param {int} count 
     */
    addSolution(trace, count)
    {
        const sols = [...this.solutions];
        sols.push({ path: trace, pathLength: count });
        this.solutions = sols;
    }

    /**
     * Sort solutions from shortest to longest path
     */
    sortSolutions()
    {
        const sols = this.solutions;
        sols.sort(function (a, b) { return a.pathLength - b.pathLength; });
        this.solutions = sols;
    }

}