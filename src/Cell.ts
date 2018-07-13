type Neighbour = Cell | undefined;

export default class Cell {

    private top: Neighbour;
    private right: Neighbour;
    private bottom: Neighbour;
    private left: Neighbour;
    private visited: boolean = false;
    private boundaries = [true, true, true, true];

    constructor(readonly position: Position) { }

    topNeighbour(top: Neighbour) {
        this.top = top;
    }

    rightNeighbour(right: Neighbour) {
        this.right = right;
    }

    bottomNeighbour(bottom: Neighbour) {
        this.bottom = bottom;
    }

    leftNeighbour(left: Neighbour) {
        this.left = left;
    }

    hasBeenVisited() {
        return this.visited;
    }

    visit() {
        this.visited = true;
    }

    unvisitedNeighbour() {
        const unvisited = [this.top, this.right, this.bottom, this.left].filter(neighbour => (neighbour instanceof Cell && !neighbour.visited));
        return unvisited.length > 0
            ? unvisited[Math.floor(Math.random() * unvisited.length)]
            : undefined;
    }

    hasBoundary(boundary: Boundary) {
        return this.boundaries[boundary]
    }

    removeBoundary(neighbour: Cell) {
        const pos = this.computeNeighbourBoundary(neighbour);
        this.boundaries[pos] = false;
    }

    private computeNeighbourBoundary(cell: Cell): Boundary {
        const xDiff = cell.position.x - this.position.x;
        if (xDiff === 1) {
            return Boundary.RIGHT;
        }
        if (xDiff === -1) {
            return Boundary.LEFT;
        }
        const yDiff = cell.position.y - this.position.y;
        if (yDiff === -1) {
            return Boundary.TOP;
        }
        if (yDiff === 1) {
            return Boundary.BOTTOM;
        }
    }

}

export class Position {
    constructor(readonly x: number, readonly y: number) { }

    eqauls(other: Position) {
        return this.x === other.x && this.y === other.y
    }
}

export enum Boundary {
    TOP = 0, RIGHT = 1, BOTTOM = 2, LEFT = 3
}